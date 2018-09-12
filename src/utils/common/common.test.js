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