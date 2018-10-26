import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import CIcon from '../../../../components/Icon';
import styles from './task.scss';
import { mergeStyles, strFormatterIconName, taskTypeMapColor } from '../../../../utils/common';
import { adaptiveRotation } from '../../../../utils/resolution';
import { ModalApi } from '../../../../components/Modal';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // 创建实例
    this.dragAnimation = new Animated.ValueXY(0, 0);
    this.animatedValueX = 0;
    this.animatedValueY = 0;

    // 获取待操作的真是元素
    this.taskRef = null;

    // 显示在界面上的拖动元素坐标值
    this.offsetX = 0;
    this.offsetY = 0;

    // 点击待操作元素的坐标值和时间戳
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    // 防抖值
    this.antiShakeValue = 10;
    // 长按时间
    this.longTouchTime = 300;
    // 单击事件
    this.touchTime = 80;
    // 是否正在拖动
    this.isDraging = false;
    // 待操作元素的左边距
    this.marginLeft = 24;

    // 创建PanResponder
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true, // 在开始触摸时是否成为响应者
      onStartShouldSetPanResponderCapture: () => false, // 捕获触摸，阻止子组件成为响应者
      onMoveShouldSetPanResponder: () => true, // 在触摸点开始移动时是否成为响应者
      onMoveShouldSetPanResponderCapture: () => false, // 捕获移动，阻止子组件响应移动
      onPanResponderGrant: this.onPanResponderGrant, /* 响应触摸事件 */
      onPanResponderMove: this.onPanResponderMove, /** 移动时 */
      onPanResponderRelease: this.onPanResponderRelease, /** 触摸事件结束 */
      onPanResponderTerminationRequest: () => false, // 有其他组件请求接替响应者，true表示同意放权
      onPanResponderTerminate: () => { /** 响应者权力已经交出 */
        // console.log('响应权已交出');
      },
    });
  }

  onPanResponderGrant = (evt, gestureState) => {
    console.log('响应者');
    const { scale } = adaptiveRotation();
    this.touchStartX = gestureState.dx;
    this.touchStartY = gestureState.dy;
    this.touchStartTime = evt.nativeEvent.timestamp;

    this.taskRef.setNativeProps({
      shadowOffset: { width: 5, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      shadowColor: 'rgba(0,0,0,1)',
      elevation: 6,
    });

    const {
      type,
      onChangeLastHandlePeriodIndex,
      periodIndex,
      onIsgetDropListenerRange,
    } = this.props;

    if (type === 'showIconOnlyTask') {
      // type 类型为 showIconOnlyTask 时表示需要将点击的时间段选中
      onChangeLastHandlePeriodIndex(periodIndex);
      onIsgetDropListenerRange(true);
    }
    // 获取待操作元素的坐标值
    this.taskRef.measure((x, y, width, height, pageX, pageY) => {
      this.offsetX = pageX / scale;
      this.offsetY = pageY / scale;
    });
  }

  onPanResponderMove = (evt, gestureState) => {
    const { dx, dy } = gestureState;

    const nowTime = evt.nativeEvent.timestamp;
    const {
      onChangeDropingData, data,
    } = this.props;

    /**
     * 模拟长按
     * 如果长按时间大于 longTouchTime 并且移动位置小于10则认为是长按
     */
    if (this.isDraging) {
      this.dragHandle(evt, dx, dy);
    } else if ((Math.abs(dx - this.touchStartX) < 10 || Math.abs(dy - this.touchStartY) < 10)) {
      if (nowTime - this.touchStartTime > this.longTouchTime) {
        // 取消阴影
        if (this.taskRef) this.taskRef.setNativeProps({ elevation: 0 });

        this.dragHandle(evt, dx, dy);
        this.isDraging = true;
        onChangeDropingData(data);
      }
    }
  }

  onPanResponderRelease = (evt, gestureState) => {
    const {
      onChangeDropPosition,
      onChangeTodoTask,
      onChangePlanTask,
      dragData,
      data,
      planList,
      onIsgetDropListenerRange,
      onPress,
      onChangeDropingData,
      onChangeDragingTaskCorrespondPeriod,
      onChangeLastHandlePeriodIndex,
      lastHandlePeriodIndex,
      type,
      onSaveTask,
    } = this.props;
    const { scale } = adaptiveRotation();
    const { dx, dy } = gestureState;
    const { pageY, timestamp: nowTime } = evt.nativeEvent;

    // 取消阴影
    if (this.taskRef) this.taskRef.setNativeProps({ elevation: 0 });

    // 任务排期
    const findTask = this.findTaskCorrespondPeriod(evt);

    // 如果当前状态属于拖拽状态，并且任务正好拖拽到时间段内，表示任务排期或者任务切换排期时间成功
    if (this.isDraging && findTask) {
      const { index } = findTask;
      console.log('排期成功：', findTask.index);

      // 如果lastHandlePeriodIndex === index相等，并且拖拽类型不是未排期任务，表示不用排期直接还原数据

      if (lastHandlePeriodIndex === index && type !== 'detailsTask') {
        console.log('没有拖拽出当前时间段，返回原始位置');
      } else if (planList[index].data.length > 4) {
        // 每个时间段只能排5个任务
        // 推动完成之后会执行很多事件，耗时可能超过模态出现的时间，所以模态没有弹出，将其改为异步之后所以同步代码执行完会回来执行异步
        setTimeout(() => ModalApi.onOppen('TipsModal', {
          tipsContent: <Text>该时段任务已满，请先完成后再安排</Text>,
          bottomTips: '自动关闭',
          maskClosable: true,
        }), 0);
      } else {
        /**
           * 只有将未排期的任务进行排期或从排期任务中取消排期时才会对排期列表有影响
           * 如果 type 为 detailsTask 并且排期成功时触发更改未排期任务列表action
           */
        if (type === 'detailsTask') onChangeTodoTask({ ...dragData, cancelTask: true });

        /**
           * prevPeriodIndex 如果切换时间段，则有prevPeriodIndex属性，否则没有，通过该属性判断是排期还是切换排期
           * currentPeriodIndex 当前时间段
           */
        const taskData = type === 'detailsTask'
          ? { ...data, currentPeriodIndex: index }
          : { ...data, currentPeriodIndex: index, prevPeriodIndex: lastHandlePeriodIndex };

        onChangePlanTask(taskData);
        onChangeLastHandlePeriodIndex(index);
        // 将操作完的数据保存至服务器
        const { homeworkId, taskType } = data;
        onSaveTask({
          id: homeworkId,
          taskType,
          scheduledNode: index,
        });

        // 如果释放的时间段索引不等于最后操作的索引就重新获取时间段监听范围
        if (index !== lastHandlePeriodIndex) {
          console.log('重新获取时间段监听列表');
          onIsgetDropListenerRange(true);
        }
      }
    }

    /**
     * 取消任务排期：失去响应时间时，如果当前处于拖拽状态，任务类型不是detailsTask并且手指的当前pageY在指定位置
     * 96 hander 高，218 todoList 高
     * 未排期列表：将取消排期任务的数据添加到未分类任务列表
     * 已排期别表：将 leavePeriodIndex
     */
    if (this.isDraging && type !== 'detailsTask' && pageY >= 96 * scale && pageY <= (96 + 218) * scale) {
      console.log('取消排期');
      console.log(185, data);
      onChangeTodoTask(data);
      onChangePlanTask({ ...data, leavePeriodIndex: lastHandlePeriodIndex });
      const { homeworkId, taskType } = data;
      onSaveTask({
        id: homeworkId,
        taskType,
      });
    }

    /**
     * 模拟单击
     * 单击事件小于 80ms 并且手指移动范围在 8px 以内
     */
    if (Math.abs(dx - this.touchStartX) < 8 || Math.abs(dy - this.touchStartY) < 8) {
      if (nowTime - this.touchStartTime < this.touchTime) {
        onPress();
      }
    }

    // 如果当前为拖拽状态，则还原拖拽时所改变的所有状态
    if (this.isDraging) {
      // 取消hover状态
      onChangeDragingTaskCorrespondPeriod();
      // 将拖拽元素定位到窗口外隐藏拖拽元素
      onChangeDropPosition({
        x: -500,
        y: 0,
      });

      // 将正在拖拽的元素索引置为空
      onChangeDropingData();
      // 将正在拖拽状态改为停止拖拽
      this.isDraging = false;
    }
  }

  // 查询任务对应的时间段
  findTaskCorrespondPeriod = (evt) => {
    const { pageX, pageY } = evt.nativeEvent;
    const { listenerRangeList } = this.props;
    return listenerRangeList.find((v) => {
      if (v.startX <= pageX && v.endX >= pageX && v.startY <= pageY && v.endY >= pageY) {
        return true;
      }
      return false;
    });
  }

  // 拖拽中处理
  dragHandle = (evt, dx, dy) => {
    this.changeDropPosition(dx, dy);
    this.changeDragingTaskCorrespondPeriodIndex(evt);
  }

  // 更改任务所对应时间段的索引
  changeDragingTaskCorrespondPeriodIndex = (evt) => {
    const dragingTaskCorrespondPeriod = this.findTaskCorrespondPeriod(evt);
    const { onChangeDragingTaskCorrespondPeriod } = this.props;
    if (dragingTaskCorrespondPeriod) {
      const { index } = dragingTaskCorrespondPeriod;
      onChangeDragingTaskCorrespondPeriod(index);
    }
  }

  // 更改拖拽元素的坐标
  changeDropPosition = (dx, dy) => {
    const { scale } = adaptiveRotation();
    const { onChangeDropPosition } = this.props;
    onChangeDropPosition({
      x: dx / scale + this.offsetX - this.marginLeft,
      y: dy / scale + this.offsetY,
    });
  }

  taskTypeMapTipText = () => {
    const { data: { taskType, endTime } } = this.props;
    switch (taskType) {
      case 2:
        return '截至提交时间未提交';
      case 3:
        return '待订正...';
      default:
        return `截止提交时间：${moment(endTime).format('MM-DD HH:mm') || '无时间'}`;
    }
  }

  render() {
    const {
      wrapStyle, iconWrapStyle, iconStyle, dragData, type,
    } = this.props;
    const { data } = this.props;

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
      >
        {/**
          data.dragTask=true 表示模拟的拖拽元素
        */}
        <TouchableWithoutFeedback>
          {
            (dragData.homeworkId === data.homeworkId) && !data.dragTask
              ? (
                <View style={type === 'detailsTask' ? styles.task_placeholder : styles.task_placeholder_breviaryTask}>
                  <CIcon
                    style={mergeStyles(styles.icon, type === 'detailsTask'
                      ? styles.placeholder_icon
                      : styles.task_placeholder_breviaryTask_icon)}
                    name="iconfont7"
                    size={40}
                  />
                </View>
              )
              : (
                <View
                  style={mergeStyles(styles.task, wrapStyle, {
                    backgroundColor: taskTypeMapColor(data.taskType),
                  })}
                  ref={(ref) => { this.taskRef = ref; }}
                >
                  <View style={mergeStyles(styles.icon_box, iconWrapStyle)}>
                    <CIcon
                      style={mergeStyles(styles.icon, iconStyle)}
                      name={strFormatterIconName(data.subjectName)}
                      size={40}
                    />
                  </View>
                  {type !== 'showIconOnlyTask' && (
                    <View>
                      <Text style={[styles.subject]} ellipsizeMode="tail" numberOfLines={1}>
                        {data.title || 'title'}
                      </Text>
                      {
                      type === 'detailsTask' && <Text style={styles.details}>预计耗时：{data.estimatedCost || '不限时'}</Text>
                    }
                      <Text style={styles.details}>{this.taskTypeMapTipText()}</Text>
                    </View>
                  )}
                  {
                    data.taskType === 4
                      ? (
                        <View style={[styles.no_review_task, {
                          transform: [{
                            rotateZ: '-45deg',
                          }],
                        }]}
                        ><Text style={styles.no_review_task_text}>未批</Text>
                        </View>
                      )
                      : null
                  }
                </View>
              )
          }
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

TaskItem.propTypes = {
  wrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  iconWrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  iconStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  isShowSpendTime: PropTypes.bool,
  onChangeDropPosition: PropTypes.func,
  listenerRangeList: PropTypes.array,
  onChangeDropingData: PropTypes.func,
  dragData: PropTypes.object,
  onChangeTodoTask: PropTypes.func,
  onChangePlanTask: PropTypes.func,
  data: PropTypes.object,
  onChangeDragingTaskCorrespondPeriod: PropTypes.func,
  onChangeLastHandlePeriodIndex: PropTypes.func,
  lastHandlePeriodIndex: PropTypes.number,
  onIsgetDropListenerRange: PropTypes.func,
  planList: PropTypes.array,
  type: PropTypes.string,
  periodIndex: PropTypes.number,
  onPress: PropTypes.func,
  onSaveTask: PropTypes.func,
};

TaskItem.defaultProps = {
  wrapStyle: {},
  iconWrapStyle: {},
  iconStyle: {},
  isShowSpendTime: true,
  onChangeDropPosition: () => {},
  listenerRangeList: [],
  onChangeDropingData: () => {},
  dragData: {},
  onChangeTodoTask: () => {},
  onChangePlanTask: () => {},
  data: {},
  onChangeDragingTaskCorrespondPeriod: () => {},
  onChangeLastHandlePeriodIndex: () => {},
  lastHandlePeriodIndex: null,
  onIsgetDropListenerRange: () => {},
  planList: [],
  /**
   * type有三种状态：
   * detailsTask 显示任务的详细信息，表示未排期的任务
   * breviaryTask 已排期，任务显示简要信息
   * showIconOnlyTask 已排期，任务只显示图标
   */
  type: 'detailsTask',
  periodIndex: null,
  onPress: () => {},
  onSaveTask: () => {},
};

export default TaskItem;
