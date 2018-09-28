export const TEST = 'TEST';

/**
 * ---------------基础配置ACTIONS-----------------------
 */
// 初始化配置
export const INITIAL_CONFIG = 'INITIAL_CONFIG';
// 更改主题
// export const CHANGE_THEME = 'CHANGE_THEME';
// 更改语言
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

/**
 * ---------------公共组件ACTIONS-----------------------
 */
export const COMMON_MODAL_OPPEN_OR_CLOSE = 'COMMON_MODAL_OPPEN_OR_CLOSE';

/**
 * 错题本
 */
export const FETCH_PROBLEM_OVERVIEW = 'FETCH_PROBLEM_OVERVIEW';

/**
 * 做作业
 */
export const FETCH_DOHOMEWORK_QUESTION = 'FETCH_DOHOMEWORK_QUESTION';

/**
 * -------------任务计划----------------
 */
// 更改模拟移动位置的坐标
export const CHANGE_DROP_POSITION = 'CHANGE_DROP_POSITION';
// 是否重新获取时间段的监听范围
export const IS_GET_DROP_LISTENER_RANGE = 'IS_GET_DROP_LISTENER_RANGE';
// 重新获取时间段的监听范围
export const GET_DROP_LISTENER_RANGE = 'GET_DROP_LISTENER_RANGE';

/**
 *------------------------作业与考试详情页面-----------------------------------------
 */
// '考试或者作业页面--请求考试数据--全部返回'
export const FETCH_RECORD_DETAIL_EXAM = 'FETCH_RECORD_DETAIL_EXAM';
// '考试或者作业页面--请求作业数据--单次请求'
export const FETCH_RECORD_DETAIL_HOMEWORK = 'FETCH_RECORD_DETAIL_HOMEWORK';
// '考试或者作业页面--请求作业数据--作业题号list请求'
export const FETCH_RECORD_DETAIL_HOMEWORK_LIST = 'FETCH_RECORD_DETAIL_HOMEWORK_LIST';

/**
 * 错题重做
 */
export const FETCH_MISTAKE = 'FETCH_MISTAKE';
export const MISTAKE_SELECT_ANSWER = 'MISTAKE_SELECT_ANSWER';
export const MISTAKE_SUBMIT_ANSWER = 'MISTAKE_SUBMIT_ANSWER';
export const MISTAKE_SUBMIT_ANSWER_CORRECT = 'MISTAKE_SUBMIT_ANSWER_CORRECT';
export const MISTAKE_SUBMIT_ANSWER_ERROR = 'MISTAKE_SUBMIT_ANSWER_ERROR';
