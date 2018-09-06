import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './style.scss';

class Radio extends Component {
  // 如果有自定义样式则使用自定义样式`
  customStyle = (custemStyle, defaultStyle) => (isEmpty(custemStyle) ? defaultStyle : custemStyle)


  // 如果选中且有自定义样式则使用自定义，如果选中没有自定义样式则使用默认
  checkedStyle = (checked, custemStyle, defaultStyle) => {
    if (checked) {
      if (isEmpty(custemStyle)) {
        return defaultStyle;
      }
      return custemStyle;
    }
    return {};
  }

  handleClick = (value) => {
    const { onChange } = this.props;
    onChange(value);
  }

  isChecked = () => {
    const { checked, type, value } = this.props;
    console.log(34, checked, type, value);
    if (type !== 'group' && checked) {
      return true;
    } if (value && checked === value) {
      return true;
    }
    return false;
  }

  render() {
    const {
      children,
      textStyle,
      iconWrapStyle,
      checkedTextStyle,
      checkedIconWrapStyle,
      value,
      disabled,
      icon,
      checkedIcon,
      style,
    } = this.props;

    return (
      <TouchableOpacity onPress={() => this.handleClick(value)} disabled={disabled}>
        <View style={[styles.wrapper, style]}>
          <View style={[
            this.customStyle(iconWrapStyle, styles.icon_wrap),
            this.checkedStyle(this.isChecked(), checkedIconWrapStyle, styles.checked_icon_wrap),
          ]}
          >{
            <View style={styles.icon}>{this.isChecked() ? checkedIcon : icon}</View>
          }
          </View>
          <Text
            style={[
              this.customStyle(textStyle, styles.text),
              this.checkedStyle(this.isChecked(), checkedTextStyle, styles.checked_text),
            ]}
            ref={(e) => { this.test = e; }}
          >{children}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Radio.propTypes = {
  children: PropTypes.any, // 文本
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // 自定义文本默认样式
  checkedTextStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // 自定义选中文本样式

  icon: PropTypes.any, // 自定义icon
  checkedIcon: PropTypes.any, // 自定义选中icon

  iconWrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // 自定义icon外层默认样式
  checkedIconWrapStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // 自定义选中icon外层样式

  checked: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]), // 选中状态
  onChange: PropTypes.func, // 点击之后的回掉函数
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]), // 索引
  disabled: PropTypes.bool, // 不可点击
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  type: PropTypes.string, // 类型： group组
};

Radio.defaultProps = {
  children: null,
  textStyle: {},
  checkedTextStyle: {},
  icon: null,
  checkedIcon: null,
  iconWrapStyle: {},
  checkedIconWrapStyle: {},
  checked: false,
  onChange: () => {},
  value: null,
  disabled: false,
  style: {},
  type: null,
};

export default Radio;
