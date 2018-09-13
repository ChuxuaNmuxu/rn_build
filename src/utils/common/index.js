// 支持以下两种导入写法
/**
 * import common from './common';
 * const { sum } = common;
 */
import * as common from './common';

export default common;

/**
 * import { sum } from './common';
 */
export * from './common';
