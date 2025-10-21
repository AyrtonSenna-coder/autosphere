import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Copy 404.html to dist after build
const distPath = path.resolve('dist');
const source404 = path.resolve('public/404.html');
const dest404 = path.resolve('dist/404.html');

// Ensure dist directory exists
if (!fs.existsSync(distPath)) {
  console.log('Building project...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Copy 404.html
if (fs.existsSync(source404)) {
  fs.copyFileSync(source404, dest404);
  console.log('✅ 404.html copied to dist folder');
}

console.log('🚀 Ready for deployment!');