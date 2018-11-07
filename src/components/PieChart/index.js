import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Pie from './Pie';
import TooltipList from './TooltipList';
import styles from './index.scss';

export default class PieChart extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>积分</Text>
        <View style={styles.pie_chart_wrap}>
          <TooltipList />
          <View style={styles.pie_wrap}>
            <Pie />
          </View>
        </View>
      </View>
    );
  }
}
