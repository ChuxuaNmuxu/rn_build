// 工具方法
import dayjs from 'dayjs';

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
