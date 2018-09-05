import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Opt from '../Opt';

class Radio extends Component {
  constructor(props) {
    super(props);
    const { checked } = props;
    this.state = {
      checked,
    };
  }

  onChange = (index, checked) => {
    const { onChange } = this.props;
    this.setState({
      checked: !checked,
    }, onChange(!checked));
  }


  renderRadios = () => {
    const { checked } = this.state;
    const {
      children,
      ...rest
    } = this.props;

    Reflect.deleteProperty(rest, checked);

    return (
      <Opt
        checked={checked}
        onChange={this.onChange}
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
};

Radio.defaultProps = {
  onChange: () => {},
  checked: null,
  children: null,
  value: null,
};

export default Radio;
