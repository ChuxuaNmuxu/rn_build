import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './timeItem.scss';
import PlannedTask from './PlannedTask';

class TimeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    console.log(19, '去做作业');
  }

  render() {
    const { data, getTimeItemRef } = this.props;

    return (
      <TouchableNativeFeedback onPress={this.onPress}>
        <View
          style={styles.time_wrap}
          ref={getTimeItemRef}
        >
          <View style={styles.time_content} />
          <View style={[styles.time_box, data.item.data === data.item.currentPeriod && styles.time_box_checked]}>
            <View style={styles.task_list}>
              <Text>{data.index}</Text>
              {/* {
                data.data === '01:00-01:30' && (
                  Array(5).fill(1).map((v, i) => <PlannedTask key={i} type={1} data={data} />)
                )
              } */}
              {
                data.item.data === data.item.currentPeriod && (
                  Array(5).fill(1).map((v, i) => <PlannedTask key={i} type={2} {...this.props} />)
                )
              }
            </View>
            <View style={styles.time_scale}>
              {
                Array(6).fill().map((v, i) => <View key={i} style={[styles.scale_line, (i === 1 && styles.scale)]} />)
              }
            </View>
          </View>
          <View style={styles.time_text}><Text>{data.item.data}</Text></View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

TimeItem.propTypes = {
  onGetDropListenerRange: PropTypes.func,
};

TimeItem.defaultProps = {
  onGetDropListenerRange: () => {},
};

export default TimeItem;
