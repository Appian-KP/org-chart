import { exec } from 'child_process';
import browserSync from 'browser-sync';
import chokidar from 'chokidar';

const bs = browserSync.create();

// Run `_prepublish` and reload the browser once done
const runBuildAndReload = () => {
  console.log('Running _prepublish...');
  exec('npm run prepublish', (err, _, stderr) => {
    if (err) {
      console.error(`Error during _prepublish: ${stderr}`);
    } else {
      console.log('Build completed. Reloading browser...');
      bs.reload();
    }
  });
};

// Initialize BrowserSync
bs.init({
  server: '.',
  files: ['test.html'],
  open: true,
});

// Watch for changes in your source files
const watcher = chokidar.watch('src/**/*', { ignoreInitial: true });

watcher.on('change', (filePath) => {
  console.log(`File changed: ${filePath}`);
  runBuildAndReload();
});
