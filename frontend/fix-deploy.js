import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing deployment...');

// Clean previous builds
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
  console.log('✅ Cleaned previous build');
}

// Build project
console.log('📦 Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Verify build
const distPath = path.resolve('dist');
if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath);
  console.log('📁 Build files:', files);
  
  // Check index.html
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    let content = fs.readFileSync(indexPath, 'utf8');
    console.log('✅ index.html exists');
    
    // Ensure base path is correct
    if (!content.includes('/autosphere/')) {
      console.log('⚠️  Base path might be incorrect in index.html');
    }
  }
  
  // Check assets folder
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    const assets = fs.readdirSync(assetsPath);
    console.log('📦 Assets:', assets);
  }
}

console.log('🚀 Ready to deploy: npm run deploy');