// 工具方法

import dayjs from 'dayjs';
import R from 'ramda';

export const exampleOne = (a) => a + 1;

export const exampleTwo= (a) => {return {a: a} }

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
  const yesterday = dayjs(new Date()).subtract(1, 'days');
  const weekOfday = parseInt(dayjs().format('E')); // 计算今天是这周第几天
  const lastSunday = dayjs().subtract(weekOfday, 'days').format('YYYY/MM/DD'); // 上周日日期
  let finalTime;
  // 还要判断下今天星期几，计算当前周要往前推几天
  const weekData = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const chineseWeekName = ['星期一', '星期二', '星期三', '星期四', '星期五'];
  if (dayjs(today).isSame(timeData, 'day')) { // 判断 isSame方法
    finalTime = '今天';
  } else if (dayjs(yesterday).isSame(timeData, 'day')) {
    finalTime = '昨天';
  } else if (dayjs(timeData).isAfter(lastSunday)) {
    // 本周内--将英文的星期转中文
    const index = weekData.indexOf(dayjs(timeData).format('dddd'));
    finalTime = chineseWeekName[index];
  } else {
    finalTime = dayjs(timeData).format('YYYY/MM/DD');
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
 */
export const mergeStyles = (...params) => {
  const arr = paramsFlat(params);
  return mergeDeepAll(arr);
};
