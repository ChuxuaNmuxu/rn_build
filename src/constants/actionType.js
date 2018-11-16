/**
 * 路由跳转时自动触发的action
 */
// 点击安卓虚拟按键会触发
export const NAVIGATION_BACK = 'Navigation/BACK';
// 进入页面触发
export const REACT_NATIVE_ROUTER_FLUX_BLUR = 'REACT_NATIVE_ROUTER_FLUX_BLUR';
// 离开页面触发
export const REACT_NATIVE_ROUTER_FLUX_FOCUS = 'REACT_NATIVE_ROUTER_FLUX_FOCUS';

/**
 * ---------------基础配置ACTIONS-----------------------
 */
// 初始化配置
export const INITIAL_CONFIG = 'INITIAL_CONFIG';
// 更改主题
// export const CHANGE_THEME = 'CHANGE_THEME';
// 更改语言
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
// 更改当前获取数据的环境
export const SET_API_FLAG = 'SET_API_FLAG';

// 设置登陆的账号信息
export const SET_USER_INFO = 'SET_USER_INFO';

/**
 * ---------------公共组件ACTIONS-----------------------
 */
export const COMMON_MODAL_OPPEN_OR_CLOSE = 'COMMON_MODAL_OPPEN_OR_CLOSE';
// 错误原因返回
export const WRONG_REASON_RETURN_FAIL_REASON = 'WRONG_REASON_RETURN_FAIL_REASON';

/**
 * 错题本
 */
export const FETCH_PROBLEM_OVERVIEW = 'FETCH_PROBLEM_OVERVIEW';
export const FETCH_INCORRECT_PROPBLEM_DETAIL = 'FETCH_INCORRECT_PROPBLEM_DETAIL';
export const FETCH_MISTAKE_LIST = 'FETCH_MISTAKE_LIST';
export const ADD_MISTAKE_LIST = 'ADD_MISTAKE_LIST';
export const PUT_FAIL_PROBLEM_REASON = 'PUT_FAIL_PROBLEM_REASON';
export const HOMEWORK_PROBLEM_DETAIL_INNITAIL_STATE = 'HOMEWORK_PROBLEM_DETAIL_INNITAIL_STATE';
export const HOMEWORK_PROBLEM_DETAIL_INNITAIL_LIST = 'HOMEWORK_PROBLEM_DETAIL_INNITAIL_LIST';

/**
 * ------------------------预览作业页面action-----------------------------------------
 */
// 获取预览作业页面的作业数据
export const FETCH_PREVIEWHOMEWORK_QUESTION = 'FETCH_PREVIEWHOMEWORK_QUESTION';
// 校验该份作业是否可做--开始做作业时需要先校验才行
export const CHECK_HOMEWORK_ISOPERABLE = 'CHECK_HOMEWORK_ISOPERABLE';

/**
 * ------------------------做作业页面action-----------------------------------------
 */
// 获取做作业的题目数据
export const FETCH_DOHOMEWORK_QUESTION = 'FETCH_DOHOMEWORK_QUESTION';
// 答题，提交单题答案
export const SUBMIT_DOHOMEWORK_ANSWER = 'SUBMIT_DOHOMEWORK_ANSWER';
// 批量答题（应用于多题）
export const SUBMIT_MULTIPLE_ANSWER = 'SUBMIT_MULTIPLE_ANSWER';
// 第一次进入该份作业时弹窗判断是否想检查作业
export const TOCHECK_HOMEWORK_QUESTION = 'TOCHECK_HOMEWORK_QUESTION';
// 保存检查耗时
export const TOSAVE_HOMEWORK_CHECKTIME = 'TOSAVE_HOMEWORK_CHECKTIME';
// 提交作业
export const SUBMIT_THIS_HOMEWORK = 'SUBMIT_THIS_HOMEWORK';

// 客观题答案改变
export const CHANGE_OBJECTIVE_ANSWER = 'CHANGE_OBJECTIVE_ANSWER';
// 删除主观题或者客观题上传的解答过程答案
export const DELETE_IMAGEURL_ANSWER = 'DELETE_IMAGEURL_ANSWER';
// 改变对应题目的难易程度
export const CHANGE_QUESTION_DIFFICULTLEVEL = 'CHANGE_QUESTION_DIFFICULTLEVEL';
// 是否需要老师讲解
export const CHANGE_NEEDEXPLAIN_STATUS = 'CHANGE_NEEDEXPLAIN_STATUS';
// 一键上传图片
export const UPLOAD_IMAGE_TOOSS = 'UPLOAD_IMAGE_TOOSS';


/**
 * -------------任务计划----------------
 */
// 更改模拟移动位置的坐标
export const CHANGE_DROP_POSITION = 'CHANGE_DROP_POSITION';
// 获取时间段的监听范围
export const GET_DROP_LISTENER_RANGE = 'GET_DROP_LISTENER_RANGE';
// 更改计划任务
export const CHANGE_PLAN_TASK = 'CHANGE_PLAN_TASK';
// 取消计划任务
export const CHANGE_TODO_TASK = 'CHANGE_TODO_TASK';
// 正在拖拽的元素
export const CHANGE_DRAGING_DATA = 'CHANGE_DRAGING_DATA';
// 更改拖拽任务对应的时间段索引
export const CHANGE_DRAGING_TASK_CORRESPOND_PERIOD = 'CHANGE_DRAGING_TASK_CORRESPOND_PERIOD';
// 最后一次操作时间段的索引
export const CHANGE_LAST_HANDLE_PERIOD_INDEX = 'CHANGE_LAST_HANDLE_PERIOD_INDEX';
// 是否获取时间段的监听范围
export const IS_GET_DROP_LISTENER_RANGE = 'IS_GET_DROP_LISTENER_RANGE';
// 是否第一次获取时间段的监听范围
export const IS_FIRST_GET_DROP_LISTENER_RANGE = 'IS_FIRST_GET_DROP_LISTENER_RANGE';
// 获取学生作业列表
export const FETCH_STUDENT_TASK_LIST = 'FETCH_STUDENT_TASK_LIST';
// 保存任务
export const SAVE_TASK = 'SAVE_TASK';
// 第一次进入首页
export const IS_FIRST_OPEN_HOMEPAGE = 'IS_FIRST_OPEN_HOMEPAGE';

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
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
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
// loading脚部
export const PROBLEM_RECORDS_UP_PULL_REFRESH_IS_LOADING = 'PROBLEM_RECORDS_UP_PULL_REFRESH_IS_LOADING';
/**
 * -----------------------------------------------------------------------------------------------------------------
 */
export const MISTAKE_SUBMIT_ANSWER_ERROR_SHOW_RADIO = 'MISTAKE_SUBMIT_ANSWER_ERROR_SHOW_RADIO';
export const MISTAKE_SUBMIT_ANSWER_ERROR_SUBMIT_RADIO = 'MISTAKE_SUBMIT_ANSWER_ERROR_SUBMIT_RADIO';
export const MISTAKE_UPLOAD_IMAGE = 'MISTAKE_UPLOAD_IMAGE';
export const MISTAKE_CHANGE_SUBJECTIVE_SHOWALL = 'MISTAKE_CHANGE_SUBJECTIVE_SHOWALL';
export const MISTAKE_CHANGE_SUBJECTIVE_SHOWBUTTON = 'MISTAKE_CHANGE_SUBJECTIVE_SHOWBUTTON';
export const MISTAKE_CHANGE_SAVE_SINGLE_ANSWER = 'MISTAKE_CHANGE_SAVE_SINGLE_ANSWER';

/**
 * 任务详情
 */
export const PUT_HOMEWORK_DATE = 'PUT_HOMEWORK_DATE';

/**
 * 作业批阅
 */
export const FETCH_HOMEWORK_CORRECTING_LIST = 'FETCH_HOMEWORK_CORRECTING_LIST';
export const HOMEWORK_CORRECTING_SET_SCORE = 'HOMEWORK_CORRECTING_SET_SCORE';
export const HOMEWORK_CORRECTING_SAVE_SCORE = 'HOMEWORK_CORRECTING_SAVE_SCORE';
export const HOMEWORK_CORRECTING_CONTROL_FINISH_BTN = 'HOMEWORK_CORRECTING_CONTROL_FINISH_BTN';

/**
 * -----------------------------战绩热报-------------------------------------------------------------------------
 */
export const FETCH_HOTREPORT_DATA = 'FETCH_HOTREPORT_DATA';
