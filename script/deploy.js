const shelljs = require('shelljs');
const path = require('path');

exec(`cd ${__dirname}`);

exec('cd ..');

// exec('npm i')

exec('npm run build');

console.log('build success');

exec('chmod +x ./android/gradlew')

exec('./android/gradlew clean aR -b ./android/app/build.gradle')