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
export const FIRST_GET_DROP_LISTENER_RANGE = 'FIRST_GET_DROP_LISTENER_RANGE';
// 重新获取时间段的监听范围
export const GET_DROP_LISTENER_RANGE = 'GET_DROP_LISTENER_RANGE';
// 更改计划任务
export const CHANGE_PLAN_TASK = 'CHANGE_PLAN_TASK';
// 取消计划任务
export const CHANGE_TODO_TASK = 'CHANGE_TODO_TASK';

/**
 *------------------------作业与考试详情页面-----------------------------------------
 */
// '考试或者作业页面--请求考试数据--全部返回'
export const FETCH_RECORD_DETAIL_EXAM = 'FETCH_RECORD_DETAIL_EXAM';
// '考试或者作业页面--请求作业数据--单次请求'
export const FETCH_RECORD_DETAIL_HOMEWORK = 'FETCH_RECORD_DETAIL_HOMEWORK';
// '考试或者作业页面--请求作业数据--作业题号list请求'
export const FETCH_RECORD_DETAIL_HOMEWORK_LIST = 'FETCH_RECORD_DETAIL_HOMEWORK_LIST';
// 清空缓存，以免下次进来出现缓存
export const INIT_RECORD_DETAIL_ALL_DATA = 'INIT_RECORD_DETAIL_ALL_DATA';
/**
 * 错题重做
 */
export const FETCH_MISTAKE = 'FETCH_MISTAKE';
export const MISTAKE_SELECT_ANSWER = 'MISTAKE_SELECT_ANSWER';
export const MISTAKE_SUBMIT_ANSWER = 'MISTAKE_SUBMIT_ANSWER';
export const MISTAKE_SUBMIT_ANSWER_CORRECT = 'MISTAKE_SUBMIT_ANSWER_CORRECT';
export const MISTAKE_SUBMIT_ANSWER_CORRECT_CONFIRM = 'MISTAKE_SUBMIT_ANSWER_CORRECT_CONFIRM';
export const MISTAKE_SUBMIT_ANSWER_ERROR = 'MISTAKE_SUBMIT_ANSWER_ERROR';

/**
 * -----------------------------------做题记录------------------------------------------------------
 */
// 做题记录--初始化--一系列请求（目测五个）
export const FETCH_PROBLEM_RECORDS_INITIAL_FETCH = 'FETCH_PROBLEM_RECORDS_INITIAL_FETCH';
// 做题记录--下拉获取记录数据
export const FETCH_PROBLEM_RECORDS_DROP_DOWN_REFRESH_DATA = 'FETCH_PROBLEM_RECORDS_DROP_DOWN_REFRESH_DATA';
// 筛选条件发生改变
export const FETCH_PROBLEM_RECORDS_CHANGE_PARAMS_REFRESH_DATA = 'FETCH_PROBLEM_RECORDS_CHANGE_PARAMS_REFRESH_DATA';
export const MISTAKE_SUBMIT_ANSWER_ERROR_SHOW_RADIO = 'MISTAKE_SUBMIT_ANSWER_ERROR_SHOW_RADIO';
export const MISTAKE_SUBMIT_ANSWER_ERROR_SUBMIT_RADIO = 'MISTAKE_SUBMIT_ANSWER_ERROR_SUBMIT_RADIO';
export const MISTAKE_UPLOAD_IMAGE = 'MISTAKE_UPLOAD_IMAGE';
export const MISTAKE_CHANGE_SUBJECTIVE_SHOWALL = 'MISTAKE_CHANGE_SUBJECTIVE_SHOWALL';
export const MISTAKE_CHANGE_SUBJECTIVE_SHOWBUTTON = 'MISTAKE_CHANGE_SUBJECTIVE_SHOWBUTTON';
