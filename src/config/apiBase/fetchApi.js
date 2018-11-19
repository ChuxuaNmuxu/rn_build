const apiDefault = 'test';
const cjyun = 'cjyun-api.ecaicn.com';
const cjhms = 'cjhms-api.ecaicn.com';

const fetchApi = (hostname = cjhms, environ = apiDefault) => {
  const protocol = 'https://';
  return {
    dev: `${protocol}dev-${hostname}`,
    test: `${protocol}test-${hostname}`,
    uat: `${protocol}uat-${hostname}`,
    forma: `${protocol}${hostname}`,
  }[environ];
};

fetchApi.label = {
  dev: '开发',
  test: '测试',
  uat: '体验',
  forma: '正式',
};

fetchApi.default = apiDefault;
fetchApi.cjyun = cjyun;
fetchApi.cjhms = cjhms;

export default fetchApi;
