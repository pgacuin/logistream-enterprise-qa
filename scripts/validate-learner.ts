import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('====================================================');
console.log('  LogiStream Mid-Level Lab - Mission 03 Validator');
console.log('====================================================\n');

let score = 0;

const requiredFiles = [
  'src/pages/ShipmentLedgerPage.ts',
  'src/fixtures/baseFixtures.ts',
  'tests/shipment-state-machine.spec.ts'
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

try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('✅ TypeScript strict type-checking passed (tsc --noEmit).');
  score += 20;
} catch {
  console.error('❌ TypeScript compilation failed.');
  process.exit(1);
}

const specContent = fs.readFileSync(path.join(__dirname, '..', 'tests/shipment-state-machine.spec.ts'), 'utf8');
if (!specContent.includes('page.route') || !specContent.includes('telemetryEvents')) {
  console.error('❌ Architecture Check Failed: shipment-state-machine.spec.ts must use page.route() to capture asynchronous telemetry payloads.');
  process.exit(1);
}
console.log('✅ State Machine & Telemetry Tracking verified.');
score += 20;

console.log('\n🚀 Executing Shipment State Machine & NFTS Suite...');
try {
  execSync('npx playwright test tests/shipment-state-machine.spec.ts', { stdio: 'inherit' });
  score += 40;
} catch {
  console.error('\n❌ Playwright test execution failed.');
}

console.log(`\n====================================================`);
console.log(`  FINAL GRADE: ${score} / 100`);
console.log(`====================================================`);

if (score === 100) {
  console.log('\n🏆 MISSION 03 ACHIEVED (SFIA Level 3–4: PRTS & NFTS)');
  process.exit(0);
} else {
  process.exit(1);
}
