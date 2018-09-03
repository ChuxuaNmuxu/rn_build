import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import styles from './timeItem.scss';

const TimeItem = () => (
  <TouchableNativeFeedback style={{ fiex: 1 }}>
    <View style={styles.time_wrap}>
      <View style={styles.time_content} />
      <View style={styles.time_box}>
        <View style={styles.time_scale}>
          {
            [1, 2, 3, 4, 5, 6].map(
              item => <View key={item} style={[styles.scale_line, (item === 1 && styles.scale)]} />,
            )
          }
        </View>
      </View>
      <View style={styles.time_text}><Text>16:00—16:30</Text></View>
    </View>
  </TouchableNativeFeedback>
);

export default TimeItem;
