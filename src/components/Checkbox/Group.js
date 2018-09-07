import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { type, mergeAll } from 'ramda';
import Checkbox from './Checkbox';

class GroupCheckbox extends Component {
  constructor(props) {
    super(props);
    const {
      defaultValue, value,
    } = this.props;

    const checked = value || defaultValue || [];

    this.state = {
      checked,
    };
  }

  // 重写onChange方法，通过state更改复选框的状态
  onChangeGroup = (value) => {
    const { onChange } = this.props;
    const { checked } = this.state;
    const val = this.isExist(value);
    let newChecked;

    // 如果点击的按钮处于选中状态，则将其从checked中过滤掉，否则将其合并到数组中
    if (val) {
      newChecked = checked.filter(v => v !== value);
    } else {
      newChecked = checked.concat(value);
    }

    this.setState({
      checked: newChecked,
    }, onChange(newChecked));
  };

  // 判断点击的按钮是否处于选中状态，若是直接返回value，否不是返回false
  isExist = (value) => {
    const { checked } = this.state;
    if (checked.indexOf(value) === -1) {
      return false;
    }
    return value;
  }

  // 根据value（v）值计算得出 checkbox的 children、disabled和value值
  headleData = (v) => {
    let child;
    let val;
    let disabled;

    /**
     * value 值只能为两种格式，string、object
     * value 为对象时 {value: 必填, label, disabled}
     */
    if (type(v) === 'Object') {
      ({ value: val, label: child, disabled } = v);
    } else {
      val = child = v;
    }

    if (!val) throw '使用Radio.Group或者Checkbox.Group时value为必传属性';

    return { child, val, disabled };
  }

  // 渲染 复选框
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

  // Group嵌套Checkbox模式
  renderCloneChild = () => {
    const {
      children, defaultValue, value, style, onChange, horizontal, options, ...rest
    } = this.props;

    return React.Children.map(children,
      (child) => {
        const { val } = this.headleData(child.props.value);
        const checked = this.isExist(val);
        return React.cloneElement(child,
          mergeAll([rest, child.props, {
            checked,
            onChange: this.onChangeGroup,
            style: mergeAll({ marginRight: 39 }, child.props),
            type: 'group',
          }]));
      });
  }

  // 通过 options 快速生成模式，options是个数组里面的每个值是个对象或者字符串，为对象时value属性为必填项
  renderOptions = () => {
    const {
      children, defaultValue, value, style, onChange, horizontal, options, ...rest
    } = this.props;

    return options.map((v, i) => {
      const { disabled, val, child } = this.headleData(v);
      const checked = this.isExist(val);
      return (
        <Checkbox
          key={val || i}
          {...mergeAll([rest, v.props, {
            checked,
            onChange: this.onChangeGroup,
            style: mergeAll({ marginRight: 39 }, v.props),
            value: val,
            disabled,
            type: 'group',
          }])}
        >{child}
        </Checkbox>
      );
    });
  }

  render() {
    const { horizontal, style } = this.props;
    return (
      <View style={[{ flexDirection: horizontal ? 'row' : 'column' }, style]}>
        {
          this.renderDom()
        }
      </View>
    );
  }
}

GroupCheckbox.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,

  defaultValue: PropTypes.any, // 默认选中的值
  disabled: PropTypes.bool, // 禁选所有子单选器
  options: PropTypes.array, // 以配置形式设置子元素
  value: PropTypes.any, // 用于设置当前选中的值
  onChange: PropTypes.func,
  horizontal: PropTypes.bool,
};

GroupCheckbox.defaultProps = {
  style: {},
  defaultValue: null,
  disabled: false,
  options: null,
  value: null,
  onChange: () => {},
  horizontal: false,
  children: [],
};

export default GroupCheckbox;
