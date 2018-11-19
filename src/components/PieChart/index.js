import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Pie from './Pie';
import TooltipList from './TooltipList';
import styles from './index.scss';

export default class PieChart extends Component {
  render() {
    const {
      title, colorScale, pieData, scrollData,
    } = this.props;
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.pie_chart_wrap}>
          <TooltipList
            data={scrollData}
          />
          <View style={styles.pie_wrap}>
            <Pie
              colorScale={colorScale}
              data={pieData}
            />
          </View>
        </View>
      </View>
    );
  }
}

PieChart.defaultProps = {
  title: null,
  pieData: [],
  scrollData: [],
};

PieChart.propTypes = {
  title: PropTypes.string,
  colorScale: PropTypes.array.isRequired,
  pieData: PropTypes.array,
  scrollData: PropTypes.array,
};
