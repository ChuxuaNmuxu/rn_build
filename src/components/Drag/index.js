import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import styles from './styles';
import { adaptiveRotation } from '../../utils/resolution';

export default class Drag extends Component {
  constructor(props) {
    super(props);

    /*
    * 步骤 1、2、3 创建可拖拽元素的过程
    * 步骤 a、b、c 拖拽元素释放之后的操作
    * 步骤 A、B、C 删除拖拽元素
    */

    this.state = {
      pan: new Animated.ValueXY(), // Step 1 创建实例

      showDraggable: true, // Step A
      dropZoneValues: null,
    };

    this.panResponder = PanResponder.create({ // Step 2 创建PanResponder
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { // Step 3 处理程序将在元素移动时触发。设置动画值以正确执行拖动。
        dx: this.state.pan.x,
        dy: this.state.pan.y,
      }],
      { listener: (event, gestureState) => console.log(36, event, gestureState) }, // 可选的异步监听函数
      ),
      onPanResponderRelease: (e, gesture) => { // Step 4 释放元素时执行的代码
        if (this.isDropZone(gesture)) { // Step 1
          this.setState({
            showDraggable: false, // Step 3
          });
        } else {
          Animated.spring( // Step a 运行动画的方法。这个方法将以恒定的速度运行动画
            this.state.pan, // Step b 接受动画值
            { toValue: { x: 0, y: 0 } }, // Step c 配置对象
          ).start();
        }
      },
    });

    this.$drag = null;
  }

  setDropZoneValues = (event) => { // Step 1
    this.setState({
      dropZoneValues: event.nativeEvent.layout,
    });
  }

  isDropZone = (gesture) => { // Step 2
    const dz = this.state.dropZoneValues;
    return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  }

  renderDraggable = () => {
    if (this.state.showDraggable) { // Step B
      return (
        <View style={styles.draggableContainer} ref={(dom) => { this.$drag = dom; }}>
          <Animated.View
            {...this.panResponder.panHandlers} // Step 1
            style={[this.state.pan.getLayout(), styles.circle]} // Step 2
          >
            <Text style={styles.text}>Drag me!</Text>
          </Animated.View>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View
          style={styles.dropZone}
          onLayout={this.setDropZoneValues} // Step 2
        >
          <Text style={styles.text}>Drop me here!</Text>
        </View>
        {this.renderDraggable()}
      </View>
    );
  }
}

// https://moduscreate.com/blog/animated_drag_and_drop_with_react_native/
