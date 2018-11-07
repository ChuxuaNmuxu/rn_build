import React, { Component } from 'react';
import Svg, {
  Text,
} from 'react-native-svg';
import { VictoryPie } from 'victory-native';
import PropTypes from 'prop-types';

export default class Pie extends Component {
  render() {
    const {
      colorScale, data, radius, innerRadius, labels,
    } = this.props;
    return (
      <Svg width={radius} height={radius}>
        <Text
          fill="#30bf6c"
          stroke="#30bf6c"
          fontSize="64"
          fontWeight="bold"
          x={radius / 2 - 10}
          y={radius / 2 + 22}
          textAnchor="middle"
        >30
          <Text
            fill="#30bf6c"
            stroke="#30bf6c"
            fontSize="24"
            fontWeight="bold"
            x={radius / 2 + 40}
            y={radius / 2 + 22}
          >分
          </Text>
        </Text>
        <VictoryPie
          standalone={false}
          width={radius}
          height={radius}
          innerRadius={innerRadius}
          data={data}
          // title="积分"
          labels={labels}
          colorScale={colorScale}
        />
      </Svg>
    );
  }
}

Pie.propTypes = {
  colorScale: PropTypes.array,
  data: PropTypes.array,
  radius: PropTypes.number,
  innerRadius: PropTypes.number,
  labels: PropTypes.any,
};
Pie.defaultProps = {
  colorScale: ['#f97a76', '#fca77e', '#fdf376', '#f1ffc5',
    '#ccff98', '#8ff688', '#05e1de', '#32c9fe', '#e461ff'],
  data: [
    { x: '语文', y: 10 },
    { x: '数学', y: 10 },
    { x: '英语', y: 15 },
    { x: '政治', y: 15 },
    { x: '历史', y: 10 },
    { x: '地理', y: 10 },
    { x: '物理', y: 10 },
    { x: '化学', y: 10 },
    { x: '生物', y: 10 },
  ],
  radius: 520,
  innerRadius: 130,
  labels: () => {},
};
