const shelljs = require('shelljs');

const exec = shelljs.exec;

exec('cd ..');

// exec('npm i')

exec('npm run build');

console.log('build success');

exec('chmod +x ./android/gradlew')

exec('./android/gradlew clean aR -b ./android/app/build.gradle')