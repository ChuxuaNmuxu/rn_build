import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';
import R from 'ramda';
import TaskItem from './TaskItem';
import { adaptiveRotation } from '../../../utils/resolution';
import styles from './drag.scss';

export class Drop extends Component {
  constructor(props) {
    super(props);

    const { position } = props;
    this.state = {
      position,
    };

    this.dragAnimation = new Animated.ValueXY(0, 0);
    this.animatedValueX = 0;
    this.animatedValueY = 0;
    this.dragRef = null;

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

  onPanResponderGrant = () => {
    // 防止再次响应时间时先自动跳到初始位置 0，0
    this.dragAnimation.setOffset({
      x: this.animatedValueX, y: this.animatedValueY,
    });

    this.dragAnimation.setValue({ x: 0, y: 0 });
    // const { scale } = adaptiveRotation();

    // this.dragRef.measure((width, height, px, py, fx, fy) => {
    //   const location = {
    //     fx,
    //     fy,
    //     px,
    //     py,
    //     width,
    //     height,
    //   };
    //   console.log(location);
    //   console.log(63, fx / scale, fy / scale);
    // });
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
    // this.dragAnimation.flattenOffset();
    console.log('触摸结束');
  }

  static getDerivedStateFromProps(props, state) {
    if (!R.equals(props.position, state.position)) {
      return {
        position: props.position,
      };
    }
    return null;
  }

  render() {
    const transform = this.dragAnimation.getTranslateTransform();
    const { position: { x, y } } = this.state;
    const { wrapStyle } = this.props;

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[styles.drag, { left: x - 24, top: y }, { transform }]}
      >
        <TaskItem
          refs={(ref) => { this.dragRef = ref; }}
          wrapStyle={wrapStyle}
        />
      </Animated.View>
    );
  }
}

Drop.propTypes = {
  position: PropTypes.object,
  wrapStyle: PropTypes.object,
};

Drop.defaultProps = {
  position: {},
  wrapStyle: {},
};

export default Drop;
