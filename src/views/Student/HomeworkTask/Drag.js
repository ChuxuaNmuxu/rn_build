import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
} from 'react-native';
import TaskItem from './TaskItem';
import { adaptiveRotation } from '../../../utils/resolution';
import styles from './drag.scss';

export class Drop extends Component {
  constructor(props) {
    super(props);

    this.dragAnimation = new Animated.ValueXY(0, 0);
    this.animatedValueX = 0;
    this.animatedValueY = 0;

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
        console.log('响应权已交出');
      },
    });
  }

  componentDidMount() {
    this.dragAnimation.x.addListener(({ value }) => {
      this.animatedValueX = value;
    });

    this.dragAnimation.y.addListener(({ value }) => {
      this.animatedValueY = value;
    });
  }

  onPanResponderGrant = (evt, gestureState) => {
    console.log(133, gestureState);
    // 防止再次响应时间时先自动跳到初始位置 0，0
    this.dragAnimation.setOffset({
      x: this.animatedValueX, y: this.animatedValueY,
    });

    this.dragAnimation.setValue({ x: 0, y: 0 });
  }

  onPanResponderMove = (evt, gestureState) => {
    console.log('移动中');
    const { scale } = adaptiveRotation();
    this.dragAnimation.setValue({
      x: gestureState.dx / scale,
      y: gestureState.dy / scale,
    });
  }

  onPanResponderRelease = () => {
    this.dragAnimation.flattenOffset();
    console.log('触摸结束');
  }

  render() {
    const transform = this.dragAnimation.getTranslateTransform();
    console.log(68, transform);
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[styles.drag, { transform }]}
      >
        <TaskItem />
      </Animated.View>
    );
  }
}

export default Drop;
