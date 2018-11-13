import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import CalendarPicker from 'react-native-calendar-picker';
import {
  View,
  Text,
  TouchableOpacity,
  // DatePickerAndroid,
} from 'react-native';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { WheelPicker } from 'react-native-wheel-picker-android-iamsb';
import Entypo from 'react-native-vector-icons/Entypo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import * as actions from '../../../../../actions/previewHomeworkAction';
import * as taskDetailAction from '../../../../../actions/taskDetailAction';
import I18nText from '../../../../../components/I18nText';
import styles from './Content.scss';
import { formatTimeToChinese } from '../../../../../utils/common';

const moment = extendMoment(Moment);
class Content extends Component {
  constructor(props) {
    super(props);
    const { beginTime, endTime } = props;
    // 初始化时间区间
    this.wheelPickerData = null;
    this.mapping = {};
    this.initWheelPickerData(endTime);
    const defaultSelectData = this.defaultSelectData(beginTime);

    this.state = {
      beginTime,
      // endTime,
      selectedStartDate: moment().format('YYYY-MM-DD'),
      selectedEndDate: moment().format('YYYY-MM-DD'),
      showPicker: false,
      endIndex: defaultSelectData.endIndex,
      startIndex: defaultSelectData.startIndex,
    };
  }

  componentDidUpdate() {
    console.log('wogengxinla');
    const {
      selectedStartDate, selectedEndDate, endIndex, startIndex,
    } = this.state;
    console.log(selectedStartDate, selectedEndDate);
  }

  onStartItemSelected = (item) => {
    // do something
    // console.log(item);
    const { data, position } = item;
    this.autoGoEndDate(data, position);
  };

  onEndItemSelected=(item) => {
    // console.log(item);
    const { data, position } = item;
    this.autoGoStartDate(data, position);
  }

  defaultSelectData = (beginTime) => {
    // 默认选中日期

    const formatBeginTime = this.strFormatDate(beginTime);
    const startIndex = this.wheelPickerData.findIndex(v => v === formatBeginTime.start);
    const endIndex = this.wheelPickerData.findIndex(v => v === formatBeginTime.end);

    return {
      startIndex,
      endIndex,
    };
  }

  strFormatDate=(time) => {
    const arr = time.split('~');
    return {
      start: formatTimeToChinese(arr[0]),
      end: formatTimeToChinese(arr[1]),
    };
  }

  // 初始化获得时间区间数据
  initWheelPickerData=(endTime) => {
    const start = moment().format('YYYY-MM-DD');
    const end = moment(endTime, 'YYYY-MM-DD');

    let r1 = null;
    if (moment().isAfter(endTime)) {
      r1 = moment.range(start, start);
    } else {
      r1 = moment.range(start, end);
    }
    const r2 = r1.snapTo('day');
    const wheelPickerData = Array.from(r2.by('days')).map(m => m.format('YYYY-MM-DD'));

    wheelPickerData.forEach((i, index) => {
      if (index === 0) {
        this.mapping['今天'] = i;
        return;
      }
      if (index === 1) {
        this.mapping['明天'] = i;
        return;
      }
      this.mapping[i] = i;
    });

    this.wheelPickerData = Object.keys(this.mapping);
  }

  // 控制Calendar的显示隐藏+清空state
  controlCalendarVisible= (bol) => {
    this.setState({
      showPicker: bol,
      selectedStartDate: moment().format('YYYY-MM-DD'),
      selectedEndDate: moment().format('YYYY-MM-DD'),
      endIndex: 0,
      startIndex: 0,
    });
  }

  // 取消 =》 清空、关闭
  cancelCalendar = () => {
    this.controlCalendarVisible(false);
  }

  confirmCalendar = () => {
    const { selectedStartDate, selectedEndDate } = this.state;
    // console.log(selectedStartDate, selectedEndDate);
    const { TAC, homeworkId } = this.props;
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
        TAC.putHomeworkDateAction(params, 'REQUEST');
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
    const { AC: { checkHomeworkStatusAction }, homeworkId } = this.props;
    if (homeworkId) {
      checkHomeworkStatusAction({ homeworkId }, 'REQUEST');
    }
  }

  // 点击去批阅
  goCorrentHomework = () => {
    const { homeworkId } = this.props;
    Actions.HomeworkCorrecting({
      homeworkId,
    });
  }

  /**
 *假设开始日期比结束日期大，那么结束日期自动跳到开始时间。
 */
  autoGoEndDate=(date, index) => {
    console.log(date, index);
    const { selectedEndDate } = this.state;
    const [s, e] = [this.mapping[date], selectedEndDate];
    console.log(s, e);
    if (moment(s).isAfter(e)) {
      console.log('起始时间比结束时间大了兄dei');
      this.setState({
        selectedStartDate: this.mapping[date],
        selectedEndDate: this.mapping[date],
        endIndex: index,
        startIndex: index,
      });
    } else {
      this.setState({
        selectedStartDate: this.mapping[date],
      });
    }
  }

  /**
 *假设结束时间比开始日期小，那么开始日期自动跳到当前选择的结束时间。
 */
  autoGoStartDate=(date, index) => {
    console.log(date, index);
    const { selectedStartDate } = this.state;
    const [s, e] = [selectedStartDate, this.mapping[date]];
    console.log(s, e);
    if (moment(s).isAfter(e)) {
      console.log('起始时间>=结束时间');
      this.setState({
        selectedStartDate: this.mapping[date],
        selectedEndDate: this.mapping[date],
        startIndex: index,
        endIndex: index,
      });
    } else {
      this.setState({
        selectedEndDate: this.mapping[date],
      });
    }
  }

  renderWheelPicker=() => {
    // const wheelPickerData = [
    //   '2018-10-19', '2018-10-20', '2018-10-21', '2018-10-22', '2018-10-23', '2018-10-24', '2018-10-25',
    // ];
    const { endIndex, startIndex } = this.state;
    console.log('我的位置');
    console.log(startIndex, endIndex);
    return (
      <View style={[styles.renderWheelPicker]}>
        <View style={[styles.renderWheelPickerItem]}>
          <Text style={styles.renderWheelPickerItemText}>开始日期</Text>
          <WheelPicker
            // 选中回调
            onItemSelected={this.onStartItemSelected}
            // 滚轮
            isCurved
            // 数据
            data={this.wheelPickerData}
            // 预览多少个
            visibleItemCount={7}
            // 初始化位置
            selectedItemPosition={startIndex}
            // 样式
            style={styles.wheelPicker}
            // 间隙
            itemSpace={15}
            // 选中颜色
            selectedItemTextColor="#30bf6c"
            // 指示器（两道杠）
            renderIndicator
            // 指示器（两道杠）颜色
            indicatorColor="#dbdbdb"
          />
        </View>
        <View style={[styles.renderWheelPickerItem]}>
          <Text style={styles.renderWheelPickerItemText}>结束日期</Text>
          <WheelPicker
            // 选中回调
            onItemSelected={this.onEndItemSelected}
            // 滚轮
            isCurved
            // 数据
            data={this.wheelPickerData}
            // 预览多少个
            visibleItemCount={7}
            // 初始化位置
            selectedItemPosition={endIndex}
            // 样式
            style={styles.wheelPicker}
            // 间隙
            itemSpace={15}
            // 选中颜色
            selectedItemTextColor="#30bf6c"
            // 指示器（两道杠）
            renderIndicator
            // 指示器（两道杠）颜色
            indicatorColor="#dbdbdb"
          />
        </View>
      </View>
    );
  }


  render() {
    const {
      waitReadOver, endTime, useTime, previewed,
    } = this.props;
    const {
      beginTime, showPicker,
    } = this.state;
    const formatBeginTime = this.strFormatDate(beginTime);

    // 待批阅的显示
    if (waitReadOver) {
      return (
        <View>
          <View style={styles.content_child}>
            <I18nText style={styles.content_child_left}>TaskDetail.endTime</I18nText>
            <Text style={styles.content_child_right}>{endTime}</Text>
          </View>
          <View style={[styles.content_child_btn, { marginTop: 200 }]}>
            {/* 去批阅 */}
            <TouchableOpacity onPress={this.goCorrentHomework}>
              <Text style={[styles.content_child_btn_normal, styles.content_child_btn_color]}>去批阅</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    // 日期选择器的显示
    if (showPicker) {
      return (
        <View style={styles.showPickerView}>

          <View style={[styles.headerBtnBar, { borderBottomWidth: 2, borderBottomColor: '#e8e8e8' }]}>
            {/* 取消 */}
            <TouchableOpacity onPress={this.cancelCalendar}>
              <I18nText style={styles.headerBtnBarText}>
                  cancel
              </I18nText>
            </TouchableOpacity>
            <I18nText style={[styles.headerBtnBarText, { fontSize: 30 }]}>
                TaskDetail.selectTime
            </I18nText>
            {/* 确定 */}
            <TouchableOpacity onPress={this.confirmCalendar}>
              <I18nText style={[styles.headerBtnBarText]}>
                TaskDetail.save
              </I18nText>
            </TouchableOpacity>
          </View>

          {
            // 时间选择器*2
            this.renderWheelPicker()
          }
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
            onPress={() => this.controlCalendarVisible(true)}
          >
            <Text style={[styles.content_child_right, styles.content_child_beginTime]}>
              {`${formatBeginTime.start}~${formatBeginTime.end}`}
              <Entypo name="chevron-thin-right" size={50} color="#30bf6c" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.content_child_btn, { marginTop: 100 }]}>
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
  AC: PropTypes.object.isRequired,
  TAC: PropTypes.object.isRequired,
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
  AC: bindActionCreators(actions, dispatch),
  TAC: bindActionCreators(taskDetailAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);
