import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './tooltipList.scss';
import { mergeStyles } from '../../utils/common';

export default class TooltipList extends Component {
  keyExtractor = data => data.label

  renderItem = (data) => {
    const { color, label, value } = data.item;
    return (
      <View key={data.index} style={styles.wrap}>
        <View style={mergeStyles(styles.flag, { borderColor: color })} />
        <Text style={styles.subject}>{label}</Text>
        <Text style={styles.fraction}>{value}分</Text>
      </View>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <View>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

TooltipList.propTypes = {
  data: PropTypes.array,
};

TooltipList.defaultProps = {
  data: [
    { label: '语文', value: 10, color: '#f97a76' },
    { label: '英语', value: 15, color: '#fca77e' },
    { label: '数学', value: 10, color: '#fdf376' },
    { label: '政治', value: 15, color: '#f1ffc5' },
    { label: '历史', value: 10, color: '#ccff98' },
    { label: '地理', value: 10, color: '#8ff688' },
    { label: '物理', value: 10, color: '#05e1de' },
    { label: '化学', value: 10, color: '#32c9fe' },
    { label: '生物', value: 10, color: '#e461ff' },
  ],
};
