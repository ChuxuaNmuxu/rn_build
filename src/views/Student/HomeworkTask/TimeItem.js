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
    const { data } = this.props;
    // data.item === '02:00-02:30' && styles.time_box_checked
    return (
      <TouchableNativeFeedback>
        <View style={styles.time_wrap}>
          <View style={styles.time_content} />
          <View style={[styles.time_box, data.item === '10:00-10:30' && styles.time_box_checked]}>
            <View style={styles.task_list}>
              <Text>{data.index}</Text>
              {
                data.item === '01:00-01:30' && Array(5).fill(1).map((v, i) => <PlannedTask key={i} type={1} data={data} />)
              }
              {
                data.item === '10:00-10:30' && Array(5).fill(1).map((v, i) => <PlannedTask key={i} type={2} data={data} />)
              }
            </View>
            <View style={styles.time_scale}>
              {
                Array(6).fill().map((v, i) => <View key={i} style={[styles.scale_line, (i === 1 && styles.scale)]} />)
              }
            </View>
          </View>
          <View style={styles.time_text}><Text>{data.item}</Text></View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

export default TimeItem;
