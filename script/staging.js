#!/usr/bin/env node

const program = require('commander');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

program
  .version('0.1.0')
  .option('-s --server [server]', '服务器地址')
  .option('-n --appName [name]', '项目名称')
  .option('-v --appVersion [a]', '项目版本号')
  .option('-m --commit [commit]', '项目更新描述')
  .parse(process.argv);

const exec = (command) => {
  console.log(`----------${command}----------`);
  const rst = shell.exec(command);
  if (rst.code) {
    process.exit(1);
  }
  return rst;
};

const post = (url, params) => {
  const stringParams = Object.keys(params).reduce((accu, k) => `${accu}${accu ? '&' : ''}${k}=${params[k]}`, '');
  const res = exec(`curl -X POST -d "${stringParams}" ${url}`);

  const rst = res.stdout ? JSON.parse(res.stdout) : {};
  return rst;
};

const rootDir = path.join(__dirname, '..');
const server = program.server || '10.0.3.19';
const serverUrl = `http://${server}:3000`;

// 获取token
// 登录
const loginUrl = `${serverUrl}/auth/login`;
const loginRes = post(loginUrl, { account: 'admin', password: '123456' });
if (loginRes.status !== 'OK') {
  process.exit(2);
}
const { tokens } = loginRes.results;

// 获取accessKey
const accessKeyUrl = `${serverUrl}/accessKeys?access_token=${tokens}`;
const timestamp = new Date().getTime();
const mes = `login-${timestamp}`;
// const fromData = `createdBy=${mes}&friendlyName=${mes}&ttl=2592000000&description=${mes}&isSession=true`;
// const accessKeyRes = exec(`curl -d '${fromData}' ${accessKeyUrl}`);
const accessKeyRes = post(accessKeyUrl, {
  createdBy: mes,
  friendlyName: mes,
  ttl: '2592000000',
  description: mes,
  isSession: 'true',
});

console.log('登录', accessKeyRes);
if (!accessKeyRes.accessKey) {
  process.exit(2);
}
const accessKey = accessKeyRes.accessKey.name;

// 写入 process.env.LOCALAPPDATA || process.env.HOME/.code-push.config
const configFilePath = `${process.env.LOCALAPPDATA || process.env.HOME}/.code-push.config`;
const configContent = `{"accessKey":"${accessKey}","preserveAccessKeyOnLogout":false,"proxy":null,"noProxy":false,"customServerUrl":"${server}:3000"}`;
console.log('获取accessKey', configContent);
fs.writeFileSync(configFilePath, configContent);

// 推送代码到code-push server
// code-push release-react cjhms_app android -t 1.0.0 --des 2018.11.22-测试热更新模态与指引、战绩播报模态 -d Staging -m false

const appName = program.appName || '课业';
if (program.appVersion || program.appName) {
  const appVersion = program.appVersion || '1.0.0';
  const appDes = program.commit || `热更新-${timestamp}`;
  exec(`code-push release-react ${appName} android -t ${appVersion}  --des ${appDes} -d Staging`);
} else {
  exec(`cd ${rootDir}`);
  exec('npm run deploy');
}
exec(`code-push deployment history ${appName} Staging`);

console.log('success !');
