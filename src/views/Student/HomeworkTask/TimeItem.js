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
    // /** , item.item === '02:00-02:30' && styles.time_box_checked */
    return (
      <TouchableNativeFeedback>
        <View style={styles.time_wrap}>
          <View style={styles.time_content} />
          <View style={[styles.time_box]}>
            <View style={styles.task_list}>
              <Text>{item.index}</Text>
              {
                item.item === '01:00-01:30' && Array(5).fill(1).map((v, i) => <PlannedTask key={i} type={1} />)
              }
              {
                // item.item === '02:00-02:30' && Array(5).fill(1).map((v, i) => <PlannedTask key={i} type={2} />)
              }
            </View>
            <View style={styles.time_scale}>
              {
                Array(6).fill().map((v, i) => <View key={i} style={[styles.scale_line, (i === 1 && styles.scale)]} />)
              }
            </View>
          </View>
          <View style={styles.time_text}><Text>{item.item}</Text></View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default TimeItem;
