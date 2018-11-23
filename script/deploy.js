const shelljs = require('shelljs');
const path = require('path');

const exec = shelljs.exec;

exec(`cd /myrepo/rn_build`);

exec('pwd')

exec('npm i')

exec('npm run build');

console.log('build success');

// exec('chmod +x /myrepo/rn_build/android/gradlew')

// exec('/myrepo/rn_build/android/gradlew clean aR -b /myrepo/rn_build/android/app/build.gradle')