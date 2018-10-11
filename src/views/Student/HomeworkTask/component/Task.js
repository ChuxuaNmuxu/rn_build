import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import CIcon from '../../../../components/Icon';
import styles from './task.scss';
import { mergeStyles } from '../../../../utils/common';
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
    this.longTouchTime = 400;
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
    const { scale } = adaptiveRotation();
    this.touchStartX = gestureState.dx;
    this.touchStartY = gestureState.dy;
    this.touchStartTime = evt.nativeEvent.timestamp;
    console.log('响应者');
    // 获取待操作元素的坐标值
    this.taskRef.measure((x, y, width, height, pageX, pageY) => {
      this.offsetX = pageX / scale;
      this.offsetY = pageY / scale;
    });
  }

  onPanResponderMove = (evt, gestureState) => {
    const { dx, dy } = gestureState;
    const nowTime = evt.nativeEvent.timestamp;
    const { onChangeDropIndex } = this.props;

    /**
     * 模拟长按
     * 如果长按时间大于 longTouchTime 并且移动位置小于10则认为是长按
     */
    if (this.isDraging) {
      this.dragHandle(evt, dx, dy);
    } else if ((Math.abs(dx - this.touchStartX) < 10 || Math.abs(dy - this.touchStartY) < 10)) {
      if (nowTime - this.touchStartTime > this.longTouchTime) {
        this.dragHandle(evt, dx, dy);
        this.isDraging = true;
        onChangeDropIndex(this.props.data.index);
      }
    }
  }

  onPanResponderRelease = (evt) => {
    const {
      onChangeDropPosition,
      onChangeTodoTask,
      onChangePlanTask,
      dragIndex,
      data,
      planList,
      onRegetDropListenerRange,
    } = this.props;
    const {
      onChangeDropIndex,
      onChangeDragingTaskCorrespondPeriod,
      onChangeLastHandlePeriodIndex,
      lastHandlePeriodIndex,
    } = this.props;

    // 取消hover状态
    onChangeDragingTaskCorrespondPeriod();

    // 任务排期
    const findTask = this.findTaskCorrespondPeriod(evt);

    // 如果当前状态属于拖拽状态，并且任务正好拖拽到时间段内，表示排期成功
    if (this.isDraging && findTask) {
      const { index } = findTask;
      console.log('排期成功：', findTask.index);
      // 每个时间段只能排5个任务
      if (planList[index].data.length > 4) {
        console.log('超了');
        ModalApi.onOppen('TipsModal', {
          tipsContent: <Text>该时段任务已满，请先完成后再安排</Text>,
          bottomTips: '自动关闭',
          maskClosable: true,
        });
      } else {
        onChangeTodoTask(dragIndex);
        onChangePlanTask({ ...data, addIndex: index });
        onChangeLastHandlePeriodIndex(index);

        // 如果释放的时间段索引不等于最后操作的索引就重新获取时间段监听范围
        if (index !== lastHandlePeriodIndex) {
          console.log('重新获取时间段监听列表');
          onRegetDropListenerRange(true);
        }
      }
    }

    // 取消任务排期

    // 将拖拽元素定位到窗口外隐藏拖拽元素
    onChangeDropPosition({
      x: -500,
      y: 0,
    });

    // 将正在拖拽的元素索引置为空
    onChangeDropIndex();
    // 将正在拖拽状态改为停止拖拽
    this.isDraging = false;
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

  render() {
    const {
      wrapStyle, iconWrapStyle, iconStyle, dragIndex, type,
    } = this.props;
    const data = this.props.data.item ? this.props.data.item : this.props.data;
    console.log(200, type);
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={() => { Actions.TaskDetail({ homeworkId: data.id || '499598186277502976' }); }}
        >
          {
                dragIndex === data.data
                  ? <View style={styles.task_placeholder}><View /></View>
                  : (
                    <View
                      style={mergeStyles(styles.task, wrapStyle)}
                      ref={(ref) => { this.taskRef = ref; }}
                    >
                      <View style={mergeStyles(styles.icon_box, iconWrapStyle)}>
                        <CIcon style={mergeStyles(styles.icon, iconStyle)} name="wendang1" size={25} />
                      </View>
                      {type !== 'showIconOnlyTask' && (
                      <View>
                        <Text style={[styles.subject]} ellipsizeMode="tail" numberOfLines={1}>
                          {data.data} -- 6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业
                        </Text>
                        {
                          type === 'detailsTask' && <Text style={styles.details}>预计耗时：15′</Text>
                        }
                        <Text style={styles.details}>截止提交时间：6-24 24:00</Text>
                      </View>
                      )}
                    </View>
                  )
              }
        </TouchableOpacity>
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
  onChangeDropIndex: PropTypes.func,
  dragIndex: PropTypes.number,
  onChangeTodoTask: PropTypes.func,
  onChangePlanTask: PropTypes.func,
  data: PropTypes.object,
  onChangeDragingTaskCorrespondPeriod: PropTypes.func,
  onChangeLastHandlePeriodIndex: PropTypes.func,
  lastHandlePeriodIndex: PropTypes.number,
  onRegetDropListenerRange: PropTypes.func,
  planList: PropTypes.array,
  type: PropTypes.string,
};

TaskItem.defaultProps = {
  wrapStyle: {},
  iconWrapStyle: {},
  iconStyle: {},
  isShowSpendTime: true,
  onChangeDropPosition: () => {},
  listenerRangeList: [],
  onChangeDropIndex: () => {},
  dragIndex: null,
  onChangeTodoTask: () => {},
  onChangePlanTask: () => {},
  data: {},
  onChangeDragingTaskCorrespondPeriod: () => {},
  onChangeLastHandlePeriodIndex: () => {},
  lastHandlePeriodIndex: null,
  onRegetDropListenerRange: () => {},
  planList: [],
  type: 'detailsTask',
};

export default TaskItem;
