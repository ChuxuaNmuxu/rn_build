import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Group = (props) => {
  const { children, style, ...rest } = props;

  return (
    <View style={style}>{
      React.Children.map(children, child => React.cloneElement(child, rest))
    }
    </View>
  );
};

Group.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,

  defaultValue: PropTypes.any, // 默认选中的值
  disabled: PropTypes.bool, // 禁选所有子单选器
  options: PropTypes.array, // 以配置形式设置子元素
  value: PropTypes.any, // 用于设置当前选中的值
  onChange: PropTypes.func, // 选项变化时的回调函数
};

Group.defaultProps = {
  style: {},
  defaultValue: null,
  disabled: false,
  options: null,
  value: null,
  onChange: () => {},
};

export default Group;
