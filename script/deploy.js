const shelljs = require('shelljs');

const exec = shelljs.exec;

exec('cd ..');

// exec('npm i')

exec('npm run build');

console.log('build success');

// exec('chmod +x ./android/gradlew')
exec('gradle -v')
exec('TERM -v')

exec('gradle clean aR')