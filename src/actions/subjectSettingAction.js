import actionCreator from './actionCreator';
import * as types from '../constants/actionType';

export const fetchSubjectSettingDataAction = actionCreator(types.FETCH_SUBJECT_DATA_LIST, '竞争科目设置页面数据');

export const settingSubjectIsJoinAction = actionCreator(types.SETTING_SUBJECT_ISJOIN, '设置该科目是否参与竞争');
