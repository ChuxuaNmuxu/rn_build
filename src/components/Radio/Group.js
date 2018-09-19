import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import {
  type, mergeDeepRight, compose,
} from 'ramda';
import Radio from './Radio';
import { mergeStyles } from '../../utils/common';

class GroupRadio extends Component {
  constructor(props) {
    super(props);
    const {
      defaultValue, value,
    } = this.props;

    const checked = value || defaultValue || false;

    this.state = {
      checked,
    };
  }

  // 重写 onChange 方法
  onChangeGroup = (value) => {
    const { onChange } = this.props;
    this.setState({
      checked: value,
    }, onChange(value));
  };

  renderDom = () => {
    const { children, options } = this.props;
    if (!children) return null;

    if (type(children) === 'String') {
      return <Text>{children}</Text>;
    }

    if (options) {
      return this.renderOptions();
    }

    return this.renderCloneChild();
  }

  // Group嵌套Radio模式
  renderCloneChild = () => {
    const { checked } = this.state;
    const {
      children, defaultValue, value, style, childStyle, onChange, horizontal, options, ...rest
    } = this.props;

    return React.Children.map(children,
      child => (React.cloneElement(child,
        compose(
          mergeDeepRight(child.props),
          mergeDeepRight({
            checked,
            onChange: this.onChangeGroup,
            style: mergeDeepRight({ marginRight: 39 }, childStyle, child.props.style || {}),
            type: 'group',
          }),
        )(rest))));
  }

  // 通过 options 快速生成模式，options是个数组里面的每个值是个对象或者字符串，为对象时value属性为必填项
  renderOptions = () => {
    const {
      children, defaultValue, value, style, childStyle, onChange, horizontal, options, ...rest
    } = this.props;
    const { checked } = this.state;
    return options.map((v, i) => {
      let child;
      let val;
      let disabled;

      if (type(v) === 'Object') {
        ({ value: val, label: child, disabled } = v);
      } else {
        val = child = v;
      }
      if (!val) throw '使用Radio.Group或者Checkbox.Group时value为必传属性';

      return (
        <Radio
          key={val || i}
          {...compose(
            mergeDeepRight({
              checked,
              onChange: this.onChangeGroup,
              style: mergeDeepRight({ marginRight: 39 }, childStyle),
              value: val,
              disabled,
              type: 'group',
            }),
          )(rest)}
        >{child}
        </Radio>
      );
    });
  }

  render() {
    const { horizontal, style } = this.props;
    return (
      <View style={mergeStyles({ flexDirection: horizontal ? 'row' : 'column' }, style)}>
        {
          this.renderDom()
        }
      </View>
    );
  }
}

GroupRadio.propTypes = {
  children: PropTypes.any,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  childStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  defaultValue: PropTypes.any, // 默认选中的值
  disabled: PropTypes.bool, // 禁选所有子单选器
  options: PropTypes.array, // 以配置形式设置子元素
  value: PropTypes.any, // 用于设置当前选中的值
  onChange: PropTypes.func,
  horizontal: PropTypes.bool,
};

GroupRadio.defaultProps = {
  style: {},
  defaultValue: null,
  disabled: false,
  options: null,
  value: null,
  onChange: () => {},
  horizontal: false,
  children: [],
  childStyle: {},
};

export default GroupRadio;
