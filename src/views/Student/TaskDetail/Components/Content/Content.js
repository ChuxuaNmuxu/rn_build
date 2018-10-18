import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CalendarPicker from 'react-native-calendar-picker';
import {
  View,
  Text,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import * as actions from '../../../../../actions/previewHomeworkAction';
import I18nText from '../../../../../components/I18nText';
import styles from './Content.scss';

class Content extends Component {
  constructor(props) {
    super(props);
    const { beginTime, endTime } = props;
    this.state = {
      beginTime,
      endTime,
      // maxText: '选择日期,不能比今日再晚',
      // presetText: '选择日期,指定2016/3/5',
      selectedStartDate: null,
      selectedEndDate: null,
      showPicker: false,
    };
    this.showPicker = this.showPicker.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  // 日期选择的回调（包含开始与结束）
  onDateChange(date, type) {
    console.log(type);
    console.log(date.toString());
    if (type === 'START_DATE') {
      this.setState({
        selectedStartDate: date,
      });
    }
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDate: date,
      });
    }
  }

  // 控制Calendar的显示隐藏（但是取消的时候有额外的操作）
  controlCalendarVisible= (bol) => {
    this.setState({ showPicker: bol });
  }

  // 取消 =》 清空、关闭
  cancelCalendar = () => {
    this.setState({
      selectedStartDate: null,
      selectedEndDate: null,
    }, () => this.controlCalendarVisible(false));
  }

  confirmCalendar = () => {
    const { selectedStartDate, selectedEndDate } = this.state;
    // console.log(selectedStartDate, selectedEndDate);
    const { actions, homeworkId } = this.props;
    if (selectedStartDate) {
      let time = ''; // 本地显示用的
      const params = { homeworkId }; // 传给后台大佬的
      time = moment(selectedStartDate).format('YYYY-MM-DD');
      params.startDate = moment((`${time} 00:00:01`)).format();
      params.endDate = moment((`${time} 23:59:59`)).format();
      console.log(params);
      if (selectedEndDate) {
        const endDate = moment(selectedEndDate).format('YYYY-MM-DD');
        time += `~${endDate}`;
        params.endDate = moment((`${endDate} 23:59:59`)).format();
      }
      this.setState({
        beginTime: time,
      }, () => {
        actions.putHomeworkDateAction(params, 'REQUEST');
        this.controlCalendarVisible(false);
      });
    }
    this.controlCalendarVisible(false);
  }

  // 点击预览作业
  previewHomework = () => {
    const { homeworkId, previewed } = this.props;
    // 判断是否预览过，预览过则不跳预览页: 是否已预览[0:否,1:是] ,
    if (!parseInt(previewed)) {
      Actions.PreviewHomework({ homeworkId });
    }
  }

  // 跳转到做作业页面时需要请求检查该份作业状态的接口,在saga中会根据接口返回的作业状态判断是否要跳到做作业页面，作业无效则会跳回首页
  doHomeWork = () => {
    const { actions: { checkHomeworkStatusAction }, homeworkId } = this.props;
    if (homeworkId) {
      checkHomeworkStatusAction({ homeworkId }, 'REQUEST');
    }
  }

  // 进行创建时间日期选择器
  async showPicker(options) {
    try {
      const newState = {};
      const {
        action, year, month, day,
      } = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState.beginTime = 'dismissed';
      } else {
        const date = new Date(year, month, day);
        newState.beginTime = date.toLocaleDateString();
        newState.date = date;
      }
      this.setState(newState, () => console.log(this.state));
    } catch ({ code, message }) {
      console.warn('Error', message);
    }
  }


  render() {
    const {
      waitReadOver, endTime, useTime, previewed,
    } = this.props;
    const {
      beginTime, showPicker,
    } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2018, 11 - 1, 3);
    // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    // const endDate = selectedEndDate ? selectedEndDate.toString() : '';
    // console.log(minDate, this.state);
    // 待批阅的显示
    if (waitReadOver) {
      return (
        <View>
          <View style={styles.content_child}>
            <I18nText style={styles.content_child_left}>TaskDetail.endTime</I18nText>
            <Text style={styles.content_child_right}>{endTime}</Text>
          </View>
          <View style={[styles.content_child_btn]}>
            {/* 去批阅 */}
            <TouchableOpacity onPress={() => console.log('去批阅')}>
              <Text style={[styles.content_child_btn_normal, styles.content_child_btn_color]}>去批阅</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    // 日期选择器的显示
    if (showPicker) {
      return (
        <View>
          <CalendarPicker
            // selectedStartDate
            // selectedEndDate
            startFromMonday
            allowRangeSelection
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={this.onDateChange}
          />
          <View>
            <View style={[styles.content_child_btn]}>
              {/* 取消 */}
              <TouchableOpacity onPress={this.cancelCalendar}>
                <I18nText style={styles.content_child_btn_normal}>
                  cancel
                </I18nText>
              </TouchableOpacity>
              {/* 确定 */}
              <TouchableOpacity onPress={this.confirmCalendar}>
                <I18nText style={[styles.content_child_btn_normal, styles.content_child_btn_color]}>
                  confirm
                </I18nText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View>
        <View style={styles.content_child}>
          <I18nText style={styles.content_child_left}>TaskDetail.useTime</I18nText>
          <Text style={styles.content_child_right}>{useTime}</Text>
        </View>
        <View style={styles.content_child}>
          <I18nText style={styles.content_child_left}>TaskDetail.endTime</I18nText>
          <Text style={styles.content_child_right}>{endTime}</Text>
        </View>
        <View style={styles.content_child}>
          <I18nText style={styles.content_child_left}>TaskDetail.beginTime</I18nText>
          <TouchableOpacity
            // 日期选择器
            // onPress={() => this.showPicker({
            //   minDate: new Date(),
            //   maxDate: new Date(2018, 10 - 1, 20),
            //   mode: 'spinner',
            //   // mode: 'clock', // 直接死机
            //   // mode: 'default',
            // })}
            onPress={() => this.controlCalendarVisible(true)}
          >
            <Text style={[styles.content_child_right, styles.content_child_beginTime]}>
              {beginTime}<Entypo name="chevron-thin-right" size={50} color="#30bf6c" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.content_child_btn]}>
          {/* 预览作业 */}
          <TouchableOpacity
            onPress={this.previewHomework}
            activeOpacity={!parseInt(previewed) ? 0.2 : 1}
          >
            <I18nText style={[styles.content_child_btn_normal, parseInt(previewed) && styles.disable_btn]}>
              TaskDetail.reviewHomework
            </I18nText>
          </TouchableOpacity>
          {/* 开始作业 */}
          <TouchableOpacity onPress={this.doHomeWork}>
            <I18nText style={[styles.content_child_btn_normal, styles.content_child_btn_color]}>
              TaskDetail.beginHomework
            </I18nText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Content.propTypes = {
  // 耗时
  useTime: PropTypes.string.isRequired,
  // 结束时间
  endTime: PropTypes.string.isRequired,
  // 执行时间
  beginTime: PropTypes.string.isRequired,
  // 是否待批阅(默认false，如果是true 则是待批阅)
  waitReadOver: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  // 当前这份作业的id
  homeworkId: PropTypes.string.isRequired,
  // 是否已预览
  previewed: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const { data } = state.taskDetailReducer;
  return {
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
