import React, { Component } from 'react';
import Svg, {
  Text,
} from 'react-native-svg';
import { VictoryPie } from 'victory-native';
import PropTypes from 'prop-types';

export default class Pie extends Component {
  render() {
    const {
      colorScale, data, radius, innerRadius, labels, startAngle,
    } = this.props;
    return (
      <Svg width={radius} height={radius}>
        <Text
          fill="#ffc14d"
          stroke="#ffc14d"
          fontSize="60"
          fontWeight="bold"
          x={radius / 2}
          y={radius / 2 + 25}
          textAnchor="middle"
        >
          PK
        </Text>
        <VictoryPie
          standalone={false}
          width={radius}
          height={radius}
          innerRadius={innerRadius}
          data={data}
          labels={labels}
          colorScale={colorScale}
          startAngle={-startAngle} // 默认设置为-180,从圆环最下方中间位置顺时针渲染
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
  startAngle: PropTypes.number, // 数据开始渲染的坐标位置，默认从圆环最上方中间位置顺时针渲染
};
Pie.defaultProps = {
  colorScale: ['#54cc82', '#ff8480'],
  data: [
    { x: '语文', y: 30 },
    { x: '数学', y: 10 },
  ],
  radius: 210,
  innerRadius: 73,
  startAngle: 180,
  labels: () => {},
};
