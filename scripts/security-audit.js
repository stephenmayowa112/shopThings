#!/usr/bin/env node

/**
 * Security audit script
 * Tests various security measures and configurations
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 ShopThings Security Audit\n');

// Test 1: Environment Variables Security
function testEnvironmentSecurity() {
  console.log('🔍 Testing environment variable security...');
  
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found');
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const issues = [];
  
  // Check for weak secrets
  if (envContent.includes('your-secret-key') || envContent.includes('change-me')) {
    issues.push('Default secret keys detected');
  }
  
  // Check for exposed secrets in git
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    if (!gitignoreContent.includes('.env.local')) {
      issues.push('.env.local not in .gitignore');
    }
  }
  
  if (issues.length > 0) {
    console.log('❌ Environment security issues:', issues);
    return false;
  }
  
  console.log('✅ Environment variables are secure');
  return true;
}

// Test 2: Dependencies Security
function testDependencySecurity() {
  console.log('🔍 Testing dependency security...');
  
  const packagePath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packagePath)) {
    console.log('❌ package.json not found');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  // Check for known vulnerable packages (simplified check)
  const vulnerablePackages = ['lodash@4.17.20', 'axios@0.21.0'];
  const issues = [];
  
  Object.entries(dependencies).forEach(([name, version]) => {
    const packageVersion = `${name}@${version}`;
    if (vulnerablePackages.some(vuln => packageVersion.includes(vuln))) {
      issues.push(`Vulnerable package: ${packageVersion}`);
    }
  });
  
  if (issues.length > 0) {
    console.log('❌ Dependency security issues:', issues);
    return false;
  }
  
  console.log('✅ Dependencies appear secure');
  return true;
}

// Test 3: File Permissions and Structure
function testFileStructureSecurity() {
  console.log('🔍 Testing file structure security...');
  
  const issues = [];
  
  // Check for sensitive files in public directory
  const publicPath = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicPath)) {
    const publicFiles = fs.readdirSync(publicPath, { recursive: true });
    const sensitiveFiles = publicFiles.filter(file => 
      file.toString().includes('.env') || 
      file.toString().includes('.key') ||
      file.toString().includes('config.json')
    );
    
    if (sensitiveFiles.length > 0) {
      issues.push(`Sensitive files in public directory: ${sensitiveFiles}`);
    }
  }
  
  // Check for backup files
  const backupExtensions = ['.bak', '.backup', '.old', '.tmp'];
  const findBackupFiles = (dir) => {
    if (!fs.existsSync(dir)) return [];
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let backupFiles = [];
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
        backupFiles = backupFiles.concat(findBackupFiles(fullPath));
      } else if (backupExtensions.some(ext => file.name.endsWith(ext))) {
        backupFiles.push(fullPath);
      }
    });
    
    return backupFiles;
  };
  
  const backupFiles = findBackupFiles(process.cwd());
  if (backupFiles.length > 0) {
    issues.push(`Backup files found: ${backupFiles.slice(0, 5).join(', ')}`);
  }
  
  if (issues.length > 0) {
    console.log('❌ File structure security issues:', issues);
    return false;
  }
  
  console.log('✅ File structure is secure');
  return true;
}

// Test 4: Code Security Patterns
function testCodeSecurity() {
  console.log('🔍 Testing code security patterns...');
  
  const issues = [];
  
  // Check for hardcoded secrets in source files
  const checkDirectory = (dir) => {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
        checkDirectory(fullPath);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx') || file.name.endsWith('.js')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          
          // Check for potential security issues
          const securityPatterns = [
            { pattern: /password\s*=\s*['"][^'"]+['"]/, message: 'Hardcoded password' },
            { pattern: /api[_-]?key\s*=\s*['"][^'"]+['"]/, message: 'Hardcoded API key' },
            { pattern: /secret\s*=\s*['"][^'"]+['"]/, message: 'Hardcoded secret' },
            { pattern: /eval\s*\(/, message: 'Use of eval() function' },
            { pattern: /innerHTML\s*=/, message: 'Direct innerHTML assignment' },
            { pattern: /document\.write\s*\(/, message: 'Use of document.write()' },
          ];
          
          securityPatterns.forEach(({ pattern, message }) => {
            if (pattern.test(content)) {
              issues.push(`${message} in ${fullPath}`);
            }
          });
        } catch (error) {
          // Skip files that can't be read
        }
      }
    });
  };
  
  checkDirectory(path.join(process.cwd(), 'src'));
  
  if (issues.length > 0) {
    console.log('❌ Code security issues:', issues.slice(0, 10)); // Limit output
    return false;
  }
  
  console.log('✅ Code security patterns look good');
  return true;
}

// Test 5: Configuration Security
function testConfigurationSecurity() {
  console.log('🔍 Testing configuration security...');
  
  const issues = [];
  
  // Check Next.js configuration
  const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
  if (fs.existsSync(nextConfigPath)) {
    const configContent = fs.readFileSync(nextConfigPath, 'utf8');
    
    // Check for security headers
    if (!configContent.includes('X-Frame-Options') && !configContent.includes('security')) {
      issues.push('Security headers not configured in Next.js config');
    }
  }
  
  // Check TypeScript configuration
  const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');
  if (fs.existsSync(tsConfigPath)) {
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
    
    if (tsConfig.compilerOptions && tsConfig.compilerOptions.strict !== true) {
      issues.push('TypeScript strict mode not enabled');
    }
  }
  
  if (issues.length > 0) {
    console.log('❌ Configuration security issues:', issues);
    return false;
  }
  
  console.log('✅ Configuration security is good');
  return true;
}

// Test 6: Database Security (basic checks)
function testDatabaseSecurity() {
  console.log('🔍 Testing database security configuration...');
  
  const issues = [];
  
  // Check for RLS policies in migration files
  const migrationsPath = path.join(process.cwd(), 'supabase', 'migrations');
  if (fs.existsSync(migrationsPath)) {
    const migrationFiles = fs.readdirSync(migrationsPath);
    const rlsFiles = migrationFiles.filter(file => 
      file.includes('rls') || file.includes('policies')
    );
    
    if (rlsFiles.length === 0) {
      issues.push('No RLS policy files found in migrations');
    }
  }
  
  if (issues.length > 0) {
    console.log('❌ Database security issues:', issues);
    return false;
  }
  
  console.log('✅ Database security configuration looks good');
  return true;
}

// Run all security tests
async function runSecurityAudit() {
  const tests = [
    { name: 'Environment Security', fn: testEnvironmentSecurity },
    { name: 'Dependency Security', fn: testDependencySecurity },
    { name: 'File Structure Security', fn: testFileStructureSecurity },
    { name: 'Code Security', fn: testCodeSecurity },
    { name: 'Configuration Security', fn: testConfigurationSecurity },
    { name: 'Database Security', fn: testDatabaseSecurity },
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    console.log(`\n--- ${test.name} ---`);
    const result = test.fn();
    if (result) {
      passed++;
    } else {
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('🔒 SECURITY AUDIT RESULTS');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Security Score: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 Security audit passed! Your application appears secure.');
  } else {
    console.log('\n⚠️  Security issues found. Please address the issues above.');
    console.log('\n📋 Security Recommendations:');
    console.log('- Use strong, unique secrets in production');
    console.log('- Keep dependencies updated');
    console.log('- Implement proper input validation');
    console.log('- Use HTTPS in production');
    console.log('- Regular security audits');
    console.log('- Monitor for vulnerabilities');
  }
  
  return failed === 0;
}

// Run audit if this script is executed directly
if (require.main === module) {
  runSecurityAudit().catch(error => {
    console.error('💥 Security audit failed:', error);
    process.exit(1);
  });
}

module.exports = { runSecurityAudit };