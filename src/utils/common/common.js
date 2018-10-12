// 工具方法

// import moment from 'moment';
import moment from 'moment';
import R from 'ramda';

export const exampleOne = a => a + 1;

export const exampleTwo = a => ({ a });

// 秒数转换成00'00"格式
export const formatSeconds = (value) => {
  let theTime = parseInt(value);
  let theTime1 = 0;
  let result;
  if (theTime >= 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
  }
  if (theTime < 10 && theTime1 === 0) {
    result = `00'0${parseInt(theTime)}"`;
  } else if (theTime < 10) {
    result = `0${parseInt(theTime)}"`;
  } else if (theTime1 === 0 && theTime >= 10) {
    result = `00'${parseInt(theTime)}"`;
  } else {
    result = `${parseInt(theTime)}"`;
  }
  if (theTime1 > 0 && theTime1 < 10) {
    result = `0${parseInt(theTime1)}'${result}`;
  } else if (theTime1 >= 10) {
    result = `${parseInt(theTime1)}'${result}`;
  }
  return result;
};

// 秒数转换成00:00:00的格式
export const handleFormattingTime = (time) => { // 格式化计时
  let theTime = parseInt(time);
  let theTime1 = 0;// 分
  let theTime2 = 0;// 小时
  let result;
  if (theTime >= 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 >= 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  if (theTime < 10 && theTime1 === 0) {
    result = ` 00 : 0${parseInt(theTime)}`;
  } else if (theTime < 10) {
    result = ` 0${parseInt(theTime)}`;
  } else if (theTime1 === 0 && theTime >= 10) {
    result = ` 00 : ${parseInt(theTime)}`;
  } else {
    result = `${parseInt(theTime)}`;
  }
  if (theTime1 > 0 && theTime1 < 10) {
    result = `0${parseInt(theTime1)} : ${result}`;
  } else if (theTime1 >= 10) {
    result = `${parseInt(theTime1)} : ${result}`;
  }
  if (theTime2 > 0 && theTime2 < 10) {
    result = `0${parseInt(theTime2)} : ${result}`;
  } else if (theTime2 > 10) {
    result = `${parseInt(theTime2)} : ${result}`;
  }
  return result;
};

// 对时间进行处理：两天以内用今天和昨天表示；超过两天且在当前周用星期X表示，再往前则按照日期显示。
export const formatTimeToshow = (timeData) => {
  const today = new Date();
  const yesterday = moment(new Date()).subtract(1, 'days');
  const weekOfday = parseInt(moment().format('E')); // 计算今天是这周第几天
  const lastSunday = moment().subtract(weekOfday, 'days').format('YYYY/MM/DD'); // 上周日日期
  let finalTime;
  // 还要判断下今天星期几，计算当前周要往前推几天
  const weekData = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const chineseWeekName = ['星期一', '星期二', '星期三', '星期四', '星期五'];
  if (moment(today).isSame(timeData, 'day')) { // 判断 isSame方法
    finalTime = '今天';
  } else if (moment(yesterday).isSame(timeData, 'day')) {
    finalTime = '昨天';
  } else if (moment(timeData).isAfter(lastSunday)) {
    // 本周内--将英文的星期转中文
    const index = weekData.indexOf(moment(timeData).format('dddd'));
    finalTime = chineseWeekName[index];
  } else {
    finalTime = moment(timeData).format('YYYY/MM/DD');
  }
  return finalTime;
};

// 各类题型
export const subjectType = ['单选题', '多选题', '判断题', '对应题', '填空题', '主观题', '综合题'];

/**
 * 根据小题类型转成对应的题型名称
 * @param {number} type
 */
export const getQuestionTypeName = (type) => {
  switch (type) {
    case 1:
      return subjectType[0];
    case 2:
      return subjectType[1];
    case 3:
      return subjectType[2];
    case 4:
      return subjectType[3];
    case 10:
      return subjectType[4];
    case 11:
      return subjectType[5];
    default:
      return subjectType[6];
  }
};

/**
 * 根据难易程度的值返回对应的难易程度
 * @param {num} difficultyLevel--难易程度的值
 * @param {bool} needColor--是否只需根据难易程度值返回对应的颜色
 */
export const convertToDifficultyLevel = (difficultyLevel, needColor) => {
  const level = parseInt(difficultyLevel);
  if (needColor) {
    switch (level) {
      case 1: return '#30bf6c';
      case 5: return '#f5a623';
      case 9: return '#fa5656';
      default: return '#fa5656';
    }
  } else {
    switch (level) {
      case 1: return '易';
      case 3: return '偏易';
      case 5: return '适中';
      case 7: return '偏难';
      case 9: return '难';
      default: return '未标';
    }
  }
};

/**
 * 渲染同类型元素不带key只会产生性能问题，如果渲染的是不同类型的状态性组件，组件将会被替换，状态丢失。
 * @param {string} fnName
 * @param {number} index
 */
export const createOnlyKey = (fnName, index) => `${fnName}-${index}`;

/**
 * 数字转字母
 * @param {num} num
 */
export const numMapLetter = num => String.fromCharCode(num);
/**
 * 数字转大写字母
 * @param {num} num
 */
export const numMapCapitalLetter = num => numMapLetter(num + 65);
/**
 * 数字转小写字母
 * @param {num} num
 */
export const numMapLowercase = num => numMapLetter(num + 97);


/**
 * 利用递归和尾递归将数组，对象，数组嵌套对象嵌套数据转为数组。
 * params 接收一个数组。数组里的各项元素只能是对象或者数组，比如 paramsFlat([{a:1}, [{b:2, [{c: 3}]}]])
 * 最终将嵌套数据转为一维数组。[{a:1}, {b:2}, {c:3}]
 * @param {params} array
 */
export const paramsFlat = (params) => {
  if (!params.length) return [];

  const head = params[0];
  const rest = R.tail(params);

  if (R.type(head) === 'Object') return [head].concat(paramsFlat(rest));
  return paramsFlat(head).concat(paramsFlat(rest));
};

/**
 * 参数只能为数组，数组里的各项只能为对象
 * 最终返回一个对象，后面会覆盖前面的值.
 * 只能合并一层嵌套的对象
 * @param {params} array
 */
export const mergeDeepAll = (params) => {
  if (!params.length) return {};
  let a = {};
  R.forEach((x) => {
    a = R.mergeDeepRight(a, x);
  }, params);
  return a;
};

/**
 * 合并样式，无论样式是数组还是对象都统一合并为对象
 * 参数个数不限，但只能是数组或字符串
 * ...params 将参数自动转化为数组
 * @param {params} 类似于 argnments
 */
export const mergeStyles = (...params) => {
  const arr = paramsFlat(params);
  return mergeDeepAll(arr);
};

/**
 * 格式化半小时时间段，num的值为0-47，48个时间段
 * @param {num} number
 */
const formatPeriod = (num) => {
  let hour = parseInt(num * 30 / 60);
  let min = (num * 30) % 60;
  // 小时不足十位补零
  if (hour < 10) {
    hour = `0${hour}`;
  }
  // 24点转为 0点
  if (hour === 24) {
    hour = '00';
  }
  // 分钟只会出现0或30，未0时补一位
  if (min === 0) {
    min = '00';
  }
  return `${hour}:${min}`;
};

/**
 * 生成半小时时间段
 * 思路：将24小时分为48段每段为30分钟
 */
export const createHalfHourPeriod = () => (
  Array(48).fill().map((v, i) => {
    const startTime = formatPeriod(i);
    const endTime = formatPeriod(i + 1);
    return `${startTime}-${endTime}`;
  })
);

/**
 * 将当前时间与时间段对应
 */
export const currentTimeToPeriod = () => {
  const hour = moment().hour();
  const minute = moment().minute();
  // 整点算两个时间段，分钟大于30算一个时间段
  const periodIndex = hour * 2 + (minute > 30 ? 1 : 0);
  return periodIndex;
};

/**
 * 后端不给回对应的科目icon名称 语文 => yuwen2
 */
export const strFormatterIconName = (str) => {
  switch (str) {
    case '物理':
      return 'wuli1';
    case '语文':
      return 'yuwen2';
    case '英语':
      return 'yingyu1';
    case '思品':
      return 'sixiangpinde';
    case '思想品德':
      return 'sixiangpinde';
    case '音乐':
      return 'yinyue';
    case '数学':
      return 'shuxue1';
    case '地理':
      return 'dili1';
    case '化学':
      return 'huaxue1';
    case '美术':
      return 'meishu';
    case '生物':
      return 'shengwu1';
    case '计算机':
      return 'jisuanji';
    case '历史':
      return 'lishi1';
    default:
      return '';
  }
};

// 任务类型对应的颜色 taskType (string, optional): 任务类型[1:作业任务,2:补做任务3:订正任务,4:批阅任务]
export const taskTypeMapColor = (num) => {
  switch (num) {
    case 1:
      return '#1ad982';
    case 2:
      return '#1ad982';
    case 3:
      return '#f86471';
    case 4:
      return '';
    default:
  }
};
