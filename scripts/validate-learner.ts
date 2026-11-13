import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('====================================================');
console.log('  LogiStream Mid-Level Lab - Universal Validator');
console.log('====================================================\n');

let score = 0;
const totalPoints = 100;

// Determine active mission based on existing workflow or spec files
const isMission06 = fs.existsSync(path.join(__dirname, '..', '.github/workflows/playwright-ci.yml'));
const isMission05 = fs.existsSync(path.join(__dirname, '..', 'tests/accessibility-contract.spec.ts'));
const isMission04 = fs.existsSync(path.join(__dirname, '..', 'tests/performance-budget.spec.ts'));
const isMission03 = fs.existsSync(path.join(__dirname, '..', 'tests/shipment-state-machine.spec.ts'));
const isMission02 = fs.existsSync(path.join(__dirname, '..', 'tests/customs-uat.spec.ts'));

let missionName = 'Mission 01';
let specFile = 'tests/dispatch-dashboard.spec.ts';

if (isMission06) {
  missionName = 'Mission 06';
  specFile = 'tests/dispatch-dashboard.spec.ts';
} else if (isMission05) {
  missionName = 'Mission 05';
  specFile = 'tests/accessibility-contract.spec.ts';
} else if (isMission04) {
  missionName = 'Mission 04';
  specFile = 'tests/performance-budget.spec.ts';
} else if (isMission03) {
  missionName = 'Mission 03';
  specFile = 'tests/shipment-state-machine.spec.ts';
} else if (isMission02) {
  missionName = 'Mission 02';
  specFile = 'tests/customs-uat.spec.ts';
}

console.log(`🎯 Active Mission Detected: ${missionName}\n`);

// Common configuration checks
const tsConfigPath = path.join(__dirname, '..', 'tsconfig.json');
if (!fs.existsSync(tsConfigPath)) {
  console.error(`❌ Missing required file: tsconfig.json`);
  process.exit(1);
}

// Check for TODOs or hardcoded waits in source/tests
const srcDir = path.join(__dirname, '..', 'src');
const testsDir = path.join(__dirname, '..', 'tests');

function scanDirectory(dir: string) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('TODO FOR LEARNER')) {
        console.error(`❌ Incomplete implementation in ${path.relative(path.join(__dirname, '..'), fullPath)}: Remove all TODO markers.`);
        process.exit(1);
      }
      if (content.includes('waitForTimeout')) {
        console.error(`❌ Anti-pattern detected: Hardcoded page.waitForTimeout() is strictly forbidden.`);
        process.exit(1);
      }
    }
  }
}

scanDirectory(srcDir);
scanDirectory(testsDir);

console.log('✅ All TypeScript files present and free of TODOs or hardcoded waits.');
score += 30;

console.log('🔍 Running TypeScript compiler check (tsc --noEmit)...');
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript strict type-checking passed.');
  score += 20;
} catch {
  console.error('❌ TypeScript compilation failed.');
  process.exit(1);
}

console.log(`\n🚀 Executing Playwright Test Suite for ${missionName}...`);
try {
  execSync(`npx playwright test ${specFile}`, { stdio: 'inherit' });
  score += 50;
} catch {
  console.error(`\n❌ Playwright test execution failed for ${missionName}.`);
}

console.log(`\n====================================================`);
console.log(`  FINAL GRADE: ${score} / ${totalPoints}`);
console.log(`====================================================`);

if (score === 100) {
  console.log(`\n🏆 ${missionName.toUpperCase()} ACHIEVED (SFIA Level 3–4)`);
  process.exit(0);
} else {
  process.exit(1);
}
