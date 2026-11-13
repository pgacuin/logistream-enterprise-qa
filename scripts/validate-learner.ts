import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('====================================================');
console.log('  LogiStream Mid-Level Lab - Mission 02 Validator');
console.log('====================================================\n');

let score = 0;

const requiredFiles = [
  'src/pages/CustomsGatePage.ts',
  'src/fixtures/baseFixtures.ts',
  'tests/customs-uat.spec.ts'
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

const specContent = fs.readFileSync(path.join(__dirname, '..', 'tests/customs-uat.spec.ts'), 'utf8');
if (!specContent.includes('request.post') || !specContent.includes('page.route')) {
  console.error('❌ Architecture Check Failed: customs-uat.spec.ts must use request.post() for seeding and page.route() for fault injection.');
  process.exit(1);
}
console.log('✅ API State Seeding (request.post) & Fault Injection (page.route) verified.');
score += 20;

console.log('\n🚀 Executing Customs UAT & Network Resilience Suite...');
try {
  execSync('npx playwright test tests/customs-uat.spec.ts', { stdio: 'inherit' });
  score += 40;
} catch {
  console.error('\n❌ Playwright test execution failed.');
}

console.log(`\n====================================================`);
console.log(`  FINAL GRADE: ${score} / 100`);
console.log(`====================================================`);

if (score === 100) {
  console.log('\n🏆 MISSION 02 ACHIEVED (SFIA Level 3–4: BPTS & TEST)');
  process.exit(0);
} else {
  process.exit(1);
}
