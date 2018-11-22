const shelljs = require('shelljs');

const exec = shelljs.exec;

exec('cd ..');

// exec('npm i')

const res = exec('npm run build');

console.log(11, res)

console.log('build success');

// exec('chmod +x ./android/gradlew')
exec('gradle -v')
exec('TERM -v')

exec('gradle clean aR')