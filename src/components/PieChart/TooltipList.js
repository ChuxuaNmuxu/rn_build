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
      <View style={styles.wrap}>
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
  data: [],
};
