const shelljs = require('shelljs');
const path = require('path');

const exec = shelljs.exec;

exec(`cd ${__dirname}`);

exec('cd ..');

// exec('npm i')

exec('npm run build');

console.log('build success');

exec(`cd ${__dirname}/..`);

exec('chmod +x /myrepo/rn_build/android/gradlew')

exec('/myrepo/rn_build/android/gradlew clean aR -b /myrepo/rn_build/android/app/build.gradle')