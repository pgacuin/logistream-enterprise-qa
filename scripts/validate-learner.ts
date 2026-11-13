import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('====================================================');
console.log('  LogiStream Mid-Level Lab - Mission 01 Validator');
console.log('====================================================\n');

let score = 0;
const totalPoints = 100;

const requiredFiles = [
  'tsconfig.json',
  'playwright.config.ts',
  'tests/auth.setup.ts',
  'src/pages/DispatchPage.ts',
  'src/fixtures/baseFixtures.ts',
  'tests/dispatch-dashboard.spec.ts'
];

for (const file of requiredFiles) {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes('TODO FOR LEARNER')) {
    console.error(`❌ Incomplete implementation in ${file}: Remove all TODO FOR LEARNER markers.`);
    process.exit(1);
  }
  if (content.includes('waitForTimeout')) {
    console.error(`❌ Anti-pattern detected in ${file}: Hardcoded page.waitForTimeout() is strictly forbidden.`);
    process.exit(1);
  }
}

console.log('✅ All required TypeScript files present and free of TODOs or hardcoded waits.');
score += 20;

console.log('🔍 Running TypeScript compiler check (tsc --noEmit)...');
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript strict type-checking passed.');
  score += 20;
} catch {
  console.error('❌ TypeScript compilation failed. Fix type errors before validating.');
  process.exit(1);
}

const fixtureContent = fs.readFileSync(path.join(__dirname, '..', 'src/fixtures/baseFixtures.ts'), 'utf8');
if (!fixtureContent.includes('base.extend') || !fixtureContent.includes('new DispatchPage')) {
  console.error('❌ Architecture Check Failed: baseFixtures.ts must extend Playwright base test and instantiate DispatchPage.');
  process.exit(1);
}
console.log('✅ Custom Playwright Fixture architecture verified (METL).');
score += 10;

console.log('\n🚀 Executing Auth Setup & Authenticated Chromium Project...');
try {
  execSync('npx playwright test', { stdio: 'inherit' });
  score += 50;
} catch {
  console.error('\n❌ Playwright test execution failed.');
}

console.log(`\n====================================================`);
console.log(`  FINAL GRADE: ${score} / ${totalPoints}`);
console.log(`====================================================`);

if (score === 100) {
  console.log('\n🏆 MISSION 01 ACHIEVED (SFIA Level 3–4: METL & TEST)');
  process.exit(0);
} else {
  process.exit(1);
}
