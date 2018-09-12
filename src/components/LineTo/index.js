import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  ART,
  TouchableOpacity,
} from 'react-native';
import { dissoc } from 'ramda';
import styles from './style.scss';
import {
  letterMapNum, numMapLetter, formatCorrespondingValue,
} from './utils';

const {
  Surface, Group, Shape, Path,
} = ART;

export default class LineTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      start: null,
    };
  }

  onChange = (val) => {
    const { start, value } = this.state;

    const opt = this.isChecked(val);
    if (opt === true) { // 取消选中
      this.setState({
        start: null,
      }, this.execCallback());
      return;
    } if (opt === false) {
      if (!start || isNaN(val) === isNaN(start)) { // 设置选中
        this.setState({
          start: val,
        }, this.execCallback());
        return;
      }

      // 连线
      if (isNaN(val)) {
        value[start] = val;
      } else {
        value[val] = start;
      }
      this.setState({
        start: null,
      }, this.execCallback());
      return;
    }

    // 取消连线。检查是否选中时会返回key值，所以不需要判断返回是数字还是字母
    const rest = dissoc(this.isChecked(val), value);
    this.setState({
      start: null,
      value: rest,
    }, this.execCallback());
  }

  execCallback = () => {
    const { onChange } = this.props;
    const { value } = this.state;
    onChange(formatCorrespondingValue(value));
  }

  /**
   * 判断当前的点击的btn之前是否有选中
   * 点击时会有三种情况
   * 1.已连线 返回key  =>  从对象中删除
   * 2.已选中 返回ture  =>  取消选中
   * 3.未选中 返回false  =>  设置选中或需要连线
   */
  isChecked = (val) => {
    const { value, start } = this.state;
    for (const k in value) {
      if (Number(k) === val || value[k] === val) {
        return k;
      }
    }
    if (start === val) {
      return true;
    }
    return false;
  }

  // 计算横坐标
  abscissa = (index) => {
    const {
      optionStyle: {
        width, sideSpace,
      },
    } = this.props;
    return width / 2 + (width + sideSpace) * (index - 1);
  }

  // 计算 path
  renderLine = () => {
    const {
      optionStyle: {
        upDownSpace,
      },
    } = this.props;
    const { value } = this.state;
    const svg = new Path();
    svg.reset();

    for (const k in value) {
      const startX = this.abscissa(Number(k));
      const endX = this.abscissa(letterMapNum(value[k]));

      svg.moveTo(startX, 0);
      svg.lineTo(endX, upDownSpace);
    }
    svg.close();
    return svg;
  }

  // 渲染连线
  renderSvg = () => {
    const {
      optionSize,
      optionStyle: {
        width,
        height,
        sideSpace,
      },
    } = this.props;
    const svgWidth = optionSize * (width + sideSpace) - sideSpace;
    return (
      <Surface
        width={svgWidth}
        height={height}
      >
        <Group>
          <Shape
            stroke="#30bf6c" // 描边的颜色
            strokeWidth={2} // 描边的宽度
            fill="#30bf6c" // 填充的颜色
            d={this.renderLine()}
          />
        </Group>
      </Surface>
    );
  }

  renderOptItem = (value) => {
    const {
      optionStyle: {
        width,
        height,
        radius,
        sideSpace,
      },
    } = this.props;
    return (
      <TouchableOpacity key={value} onPress={() => this.onChange(value)}>
        <View
          style={[styles.opt_item, {
            width, height, borderRadius: radius, marginRight: sideSpace,
          }, this.isChecked(value) && styles.opt_check]}
          key={value}
        ><Text style={[styles.opt_item_text, this.isChecked(value) && styles.opt_text_check]}>{value}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderOpt = (type) => {
    const { optionSize } = this.props;
    return (
      <View style={styles.opt_wrap}>
        {
          Array(optionSize).fill().map((v, i) => {
            const val = type === 'letter' ? numMapLetter(i) : i + 1; // i从0开始，而显示在界面上的数需要从1开始，所以需要加1
            return this.renderOptItem(val);
          })
        }
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderOpt()}
        {this.renderSvg()}
        {this.renderOpt('letter')}
      </View>
    );
  }
}

LineTo.propTypes = {
  optionSize: PropTypes.number,
  value: PropTypes.object,
  optionStyle: PropTypes.object,
  onChange: PropTypes.func,
};
LineTo.defaultProps = {
  optionSize: 4,
  value: {
    // 1: 'C', 2: 'D', 3: 'A',
  },
  optionStyle: {
    width: 72, // 宽
    height: 72, // 高
    radius: 72, // 圆
    upDownSpace: 72, // 上下边距
    sideSpace: 24, // 左右边距
  },
  onChange: () => {},
};
