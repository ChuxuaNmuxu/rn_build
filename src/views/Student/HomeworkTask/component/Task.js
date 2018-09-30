import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';
import CIcon from '../../../../components/Icon';
import styles from './task.scss';
import { mergeStyles } from '../../../../utils/common';
import { adaptiveRotation } from '../../../../utils/resolution';

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
    // const {
    //   onFirstGetDropListenerRange,
    //   isFirstGetDropListenerRange,
    // } = this.props;
    // if (isFirstGetDropListenerRange) {
    //   onFirstGetDropListenerRange(false);
    // }

    // 获取待操作元素的坐标值
    this.taskRef.measure((x, y, width, height, pageX, pageY) => {
      this.offsetX = pageX / scale;
      this.offsetY = pageY / scale;
    });
  }

  onPanResponderMove = (evt, gestureState) => {
    const { dx, dy } = gestureState;
    const nowTime = evt.nativeEvent.timestamp;

    /**
     * 模拟长按
     * 如果长按时间大于 longTouchTime 并且移动位置小于10则认为是长按
     */
    if (this.isDraging) {
      this.dragHandle(dx, dy);
    } else if ((Math.abs(dx - this.touchStartX) < 10 || Math.abs(dy - this.touchStartY) < 10)) {
      if (nowTime - this.touchStartTime > this.longTouchTime) {
        this.dragHandle(dx, dy);
        this.isDraging = true;
      }
    }
  }

  onPanResponderRelease = (evt) => {
    const { onChangeDropPosition, listenerRangeList } = this.props;
    this.isDraging = false;
    const { pageX, pageY } = evt.nativeEvent;

    // 任务排期
    const findTask = listenerRangeList.find((v) => {
      if (v.startX <= pageX && v.endX >= pageX && v.startY <= pageY && v.endY >= pageY) {
        return true;
      }
      return false;
    });

    if (findTask) {
      console.log('排期成功：', findTask.index);
    } else {
      console.log('排期失败');
    }

    // 取消任务排期

    // 将拖拽元素定位到窗口外隐藏拖拽元素
    // onChangeDropPosition({
    //   x: -500,
    //   y: 0,
    // });
  }

  dragHandle = (dx, dy) => {
    const { scale } = adaptiveRotation();
    const { onChangeDropPosition } = this.props;
    onChangeDropPosition({
      x: dx / scale + this.offsetX - this.marginLeft,
      y: dy / scale + this.offsetY,
    });
  }

  render() {
    const {
      wrapStyle, iconWrapStyle, iconStyle, isShowSpendTime,
    } = this.props;

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
      >
        <TouchableOpacity>
          <View
            style={mergeStyles(styles.task, wrapStyle)}
            ref={(ref) => { this.taskRef = ref; }}
          >
            <View style={mergeStyles(styles.icon_box, iconWrapStyle)}>
              <CIcon style={mergeStyles(styles.icon, iconStyle)} name="wendang1" size={25} />
            </View>
            <View>
              <Text>{this.props.data.index}</Text>
              <Text style={[styles.subject]} ellipsizeMode="tail" numberOfLines={1}>
              6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业6-22 语文作业
              </Text>
              {
              isShowSpendTime && <Text style={styles.details}>预计耗时：15′</Text>
            }
              <Text style={styles.details}>截止提交时间：6-24 24:00</Text>
            </View>
          </View>
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
  onFirstGetDropListenerRange: PropTypes.func,
  isFirstGetDropListenerRange: PropTypes.bool,
  listenerRangeList: PropTypes.array,
};

TaskItem.defaultProps = {
  wrapStyle: {},
  iconWrapStyle: {},
  iconStyle: {},
  isShowSpendTime: true,
  onChangeDropPosition: () => {},
  onFirstGetDropListenerRange: () => {},
  isFirstGetDropListenerRange: false,
  listenerRangeList: [],
};

export default TaskItem;
