import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import styles from './timeItem.scss';
import PlannedTask from './PlannedTask';

class TimeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableNativeFeedback>
        <View style={styles.time_wrap}>
          <View style={styles.time_content} />
          <View style={[styles.time_box, item === 2 && styles.time_box_checked]}>
            <View style={styles.task_list}>
              {
                item === 1 && Array(5).fill(1).map((v, i) => <PlannedTask key={i} type={1} />)
              }
              {
                item === 2 && Array(5).fill(1).map((v, i) => <PlannedTask key={i} type={2} />)
              }
            </View>
            <View style={styles.time_scale}>
              {
                Array(6).fill().map((v, i) => <View key={i} style={[styles.scale_line, (i === 1 && styles.scale)]} />)
              }
            </View>
          </View>
          <View style={styles.time_text}><Text>16:00—16:30</Text></View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default TimeItem;
