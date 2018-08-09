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

console.log(12, styles);

export default class Drag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(), // Step 1
    };

    this.panResponder = PanResponder.create({ // Step 2
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { // Step 3
        dx: this.state.pan.x,
        dy: this.state.pan.y,
      }]),
      onPanResponderRelease: (e, gesture) => {}, // Step 4
    });
  }

  renderDraggable = () => (
    <View style={[styles.draggableContainer]}>
      <Animated.View style={[styles.circle]}>
        <Text style={styles.text}>Drag me!</Text>
      </Animated.View>
    </View>
  )

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
          <Text style={styles.text}>Drop me here!</Text>
        </View>
        {this.renderDraggable()}
      </View>
    );
  }
}
