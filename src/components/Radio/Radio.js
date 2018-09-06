import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Opt from '../Opt';

class Radio extends Component {
  constructor(props) {
    super(props);
    const { checked } = props;
    this.state = {
      stateChecked: checked,
    };
  }


  onChange = (value) => {
    const { onChange, type } = this.props;
    if (type === 'group') {
      onChange(value);
    } else {
      this.setState({
        stateChecked: true,
      }, onChange(true));
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps, prevState);
  // }

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
      ...rest
    } = this.props;

    Reflect.deleteProperty(rest, 'checkedIcon');
    Reflect.deleteProperty(rest, 'onChange');
    Reflect.deleteProperty(rest, 'checked');
    let newChecked = null;
    // console.log(55, type, checked);
    if (type === 'group') {
      newChecked = checked;
    } else {
      newChecked = stateChecked;
      Reflect.deleteProperty(rest, 'checked');
    }


    return (
      <Opt
        checked={newChecked}
        onChange={this.onChange}
        renderLabel={this.renderLabel}
        checkedIcon={this.checkedIcon()}
        type={type}
        {...rest}
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
  type: null,
  checkedIcon: null,
};

export default Radio;
