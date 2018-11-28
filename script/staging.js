#!/usr/bin/env node

const program = require('commander');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

program
  .version('0.1.0')
  .option('-s --server [server]', '服务器地址')
  .option('-n --name [name]', '项目名称')
  .option('-v --version [version]', '项目版本号')
  .option('-d --des [description]', '项目更新描述')
  .parse(process.argv);

const exec = (command) => {
  console.log(`----------${command}----------`);
  const rst = shell.exec(command);
  if (rst.code) {
    process.exit(1);
  }
  return rst;
};

const rootDir = path.join(__dirname, '..');

// 获取token
const server = program.server || '119.23.68.231';
const serverUrl = `http://${server}:3000`;
const data = 'account=admin&password=123456';
const res = exec(`curl -X POST -d '${data}' ${serverUrl}/auth/login`);

console.log(25, res);
if (!res.results) {
  process.exit(2);
}

const token = res.results.tokens;
const accessKeyUrl = `${serverUrl}/accessKeys?access_token=${token}`;
const timestamp = new Date().getTime();
const mes = `login-${timestamp}`;
const fromData = `createdBy=${mes}&friendlyName=${mes}&ttl=2592000000&description=${mes}&isSession=true`;
const accessKeyRes = exec(`curl -d '${fromData}' ${accessKeyUrl}`);

console.log(40, accessKeyRes);
if (!accessKeyRes.accessKey) {
  process.exit(3);
}
const accessKey = accessKeyRes.accessKey.name;

// 写入 process.env.LOCALAPPDATA || process.env.HOME/.code-push.config
const configFilePath = `${process.env.LOCALAPPDATA || process.env.HOME}/.code-push.config`;
const configContent = `{"accessKey":"${accessKey}","preserveAccessKeyOnLogout":false,"proxy":null,"noProxy":false,"customServerUrl":"${server}:3000"}`;
fs.writeFileSync(configFilePath, configContent);

// 推送代码到code-push server
// code-push release-react cjhms_app android -t 1.0.0 --des 2018.11.22-测试热更新模态与指引、战绩播报模态 -d Staging -m false
if (program.version || program.name) {
  const appName = program.name || '课业';
  const appVersion = program.version || '1.0.0';
  const appDes = program.description || `热更新-${timestamp}`;
  exec(`code-push release-react ${appName} android -t ${appVersion}  --des ${appDes} -d Staging`);
} else {
  exec(`cd ${rootDir}`);
  exec('npm run deploy');
}

console.log('success !');
