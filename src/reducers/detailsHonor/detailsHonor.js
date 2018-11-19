import createReducer from '../createReducer';
import { GET_DETAILS_HONOR } from '../../constants/actionType';
import * as fn from './fn';

const inital = {
  pieChart: [],
  scrollList: [],
};

const handle = {
  [`${GET_DETAILS_HONOR}_SUCCESS`]: fn.getDetailsHonorReducers,
};

const detailsHonor = createReducer(inital, handle);

export default detailsHonor;
