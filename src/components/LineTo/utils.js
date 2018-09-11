import { mapObjIndexed } from 'ramda';

/**
 * 将对象格式化值为字符串，如：{1：'C', 2: 'D', 3: 'B', 4: 'A'} => 1C2D3B4A
 */
export const formatCorrespondingValue = (value) => {
  let strArr = '';
  mapObjIndexed((val, key) => {
    strArr = strArr + key + val;
  }, value);
  return strArr;
};

/**
 * 从字符串格式化成组件标准值，如：1C2D3B4A => {1：'C', 2: 'D', 3: 'B', 4: 'A'}
 */
export const parseCorrespondingValue = (strValue) => {
  if (!strValue) {
    return {};
  }
  const objValue = {};
  let tmp;
  for (let i = 0; i < strValue.length; i += 2) {
    tmp = strValue.substr(i, 2).split('');
  }

  for (let i = 0; i < strValue.length; i += 2) {
    tmp = strValue.substr(i, 2).split('');
    const { key, value } = tmp;
    objValue[key] = tmp[value];
  }
  return objValue;
};


// 将大写字母A、B、B、C映射为数字1、2、3、4。大写字母ascll对应数字65
export const letterMapNum = letter => letter.charCodeAt() - 65 + 1;

// 将数字1、2、3、4映射为大写字母A、B、B、C
export const numMapLetter = num => String.fromCharCode(num + 65);
