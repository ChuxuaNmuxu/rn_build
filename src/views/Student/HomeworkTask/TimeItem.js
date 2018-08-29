import React from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import CIcon from '../../../components/Icon';

const Styles = StyleSheet.create({
  time_wrap: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  time_box: {
    justifyContent: 'flex-end',
    height: 360,
    width: 143,
    borderLeftWidth: 4,
    borderLeftColor: '#dbdbdb',
  },
  time_content: {
    position: 'absolute',
    bottom: 80,
    height: 400,
    width: 143,
    backgroundColor: 'pink',
  },
  time_scale: {
    flexDirection: 'row',
    height: 60,
  },
  scale: {
    width: 23,
  },
  scale_line: {
    borderLeftWidth: 1,
    borderLeftColor: '#dbdbdb',
  },
  time_text: {
    alignItems: 'center',
  },
});

const TimeItem = () => (
  <TouchableNativeFeedback style={{ fiex: 1 }}>
    <View style={Styles.time_wrap}>
      <View style={Styles.time_content} />
      <View style={Styles.time_box}>
        <View style={Styles.time_scale}>
          {
            [1, 2, 3, 4, 5, 6].map(item => <View key={item} style={[(item > 1 && Styles.scale_line), Styles.scale]} />)
          }
        </View>
      </View>
      <View style={Styles.time_text}><Text>16:00—16:30</Text></View>
    </View>
  </TouchableNativeFeedback>
);

export default TimeItem;
