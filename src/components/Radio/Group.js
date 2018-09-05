import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { type, mergeAll } from 'ramda';

class GroupRadio extends Component {
  constructor(props) {
    super(props);
    const {
      defaultValue, value,
    } = this.props;

    if (value && type(value) !== 'Number') throw 'value可不传，如传只能为number型';
    if (defaultValue && type(defaultValue) !== 'Number') throw 'defaultValue可不传，如传只能为number型';
    const checked = value || defaultValue || false;

    this.state = {
      checked,
    };
  }

  onChangeGroup = (value) => {
    const { onChange } = this.props;
    this.setState({
      checked: value,
    }, onChange(value));
  };

  render() {
    const {
      children, defaultValue, value, style, onChange, ...rest
    } = this.props;
    const { checked } = this.state;

    return (
      <View style={style}>
        {
          React.Children.map(children,
            child => React.cloneElement(child,
              mergeAll([rest, child.props, {
                checked,
                onChange: this.onChangeGroup,
              }])))
        }
      </View>
    );
  }
}

GroupRadio.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,

  defaultValue: PropTypes.any, // 默认选中的值
  disabled: PropTypes.bool, // 禁选所有子单选器
  options: PropTypes.array, // 以配置形式设置子元素
  value: PropTypes.any, // 用于设置当前选中的值
  onChange: PropTypes.func,
};

GroupRadio.defaultProps = {
  style: {},
  defaultValue: null,
  disabled: false,
  options: null,
  value: null,
  onChange: () => {},
};

export default GroupRadio;
