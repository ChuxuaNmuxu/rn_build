// 支持两种导入方式
// 第一种
import common from './index';
const { exampleOne } = common;
// 第二种
import { exampleTwo } from './common';
test('测试 exampleOne 函数', () => {
  expect(exampleOne(1)).toBe(2);
})
test('测试 exampleTwo 函数', () => {
  expect(exampleTwo(2)).toEqual({a: 2})
})
// 注:toBe() 是针对于 number 等简单类型, toEqual() 是用于 json、array等引用类型
// 除了toBe()、toEqual()，官网还提供了许多返回格式
// https://jestjs.io/docs/zh-Hans/using-matchers

// 在下面写函数测试 ↓
import { formatTimeToshow } from './common';
test('测试 formatTimeToshow 函数', () => {
  // new Date() === 今天的日期，如果是传入它的话，转换出来是'今天'
  expect(formatTimeToshow(new Date())).toBe('今天');
  // 因为测试这些比较尴尬，每天的日期都是不一样，接下来的两个测试是：假设今天是2018-10-11(星期四)
  // 在这个基础上写的下面两个测试
  // expect(formatTimeToshow(new Date(2018, 9, 12))).toBe('星期五');
  // expect(formatTimeToshow(new Date(2018, 9, 10))).toBe('昨天');
})
