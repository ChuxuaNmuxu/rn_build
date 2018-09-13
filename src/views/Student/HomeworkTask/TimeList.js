import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import TimeItem from './TimeItem';
import styles from './timeList.scss';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.time_list_box}>
        <ScrollView horizontal>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 34]
              .map(item => <TimeItem key={item} item={item} />)
          }
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default TaskList;
