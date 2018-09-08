import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Opt from '../Opt';

class Radio extends Component {
  constructor(props) {
    super(props);
    const { checked, type } = props;
    this.state = {
      // checked全等于true表示默认选中，则将checked设置为type，与value为空设为type原理类似
      stateChecked: checked === true ? type : checked,
    };
  }


  onChange = (value) => {
    const { onChange, type } = this.props;
    if (type === 'radio' || type === 'button') {
      this.setState({
        stateChecked: value,
      }, onChange(true));
    } else {
      onChange(value);
    }
  }

  // Radio 默认icon结构、样式
  checkedIcon = () => {
    const { checkedIcon } = this.props;
    if (checkedIcon) return checkedIcon;
    return (
      <View style={{
        width: 14, height: 14, borderRadius: 14, backgroundColor: '#30bf6c',
      }}
      />
    );
  }

  renderRadios = () => {
    const { stateChecked } = this.state;
    const {
      children,
      checked,
      type,
      value,
      ...rest
    } = this.props;

    let newChecked = null;

    if (type === 'radio' || type === 'button') {
      newChecked = stateChecked;
    } else {
      newChecked = checked;
    }

    return (
      <Opt
        {...rest}
        checked={newChecked}
        onChange={this.onChange}
        renderLabel={this.renderLabel}
        checkedIcon={this.checkedIcon()}
        type={type}
        value={value || type} // 只有单独使用Radio、Radio.Button时会没有value，在group中value为必传，没有则默认为type

      >{children}
      </Opt>
    );
  }

  render() {
    return (
      <View>
        {
          this.renderRadios()
        }
      </View>
    );
  }
}

Radio.propTypes = {
  onChange: PropTypes.func, // 点击回调
  children: PropTypes.any, // 文本
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  checked: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]), // 是否选中
  type: PropTypes.string,
  checkedIcon: PropTypes.any,
};

Radio.defaultProps = {
  onChange: () => {},
  checked: null,
  children: null,
  value: null,
  type: 'radio',
  checkedIcon: null,
};

export default Radio;
