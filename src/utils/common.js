// 工具方法

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
