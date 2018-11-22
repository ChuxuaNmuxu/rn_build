const shelljs = require('shelljs');
const path = require('path');

const exec = shelljs.exec;

exec(`cd ${__dirname}`);

exec('cd ..');

// exec('npm i')

exec('npm run build');

console.log('build success');

exec(`cd ${__dirname}`);

exec('chmod +x ./android/gradlew')

exec('./android/gradlew clean aR -b ./android/app/build.gradle')