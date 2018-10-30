import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const initialFetch = actionCreator(types.FETCH_PROBLEM_RECORDS_INITIAL_FETCH, '做题记录-初始化请求-科目+筛选+全部科目（发送5个请求）');
export const dropDownRefresh = actionCreator(types.FETCH_PROBLEM_RECORDS_DROP_DOWN_REFRESH_DATA, '做题记录-上拉加载数据');
export const changeParamsfresh = actionCreator(types.FETCH_PROBLEM_RECORDS_CHANGE_PARAMS_REFRESH_DATA, '做题记录-筛选条件发生改变');
export const footerLoading = actionCreator(types.PROBLEM_RECORDS_UP_PULL_REFRESH_IS_LOADING, '脚部正在laoding');
