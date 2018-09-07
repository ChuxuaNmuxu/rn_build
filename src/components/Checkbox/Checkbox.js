import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from '../Radio';

class Checkbox extends Component {
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
    const { stateChecked } = this.state;

    if (type === 'checkbox') {
      if (value === stateChecked) {
        this.setState({
          stateChecked: null,
        }, onChange(false));
      } else {
        this.setState({
          stateChecked: type,
        }, onChange(true));
      }
    } else {
      onChange(value);
    }
  }

  render() {
    const {
      onChange, type, checked, value, ...rest
    } = this.props;
    const { stateChecked } = this.state;
    let newChecked = null;
    // 如果当前组件type为checkbox时表示是单独使用Checkbox、Checkbox.Button没有使用Checkbox.Group，需要自己维护状态所以从state中取值
    if (type === 'checkbox') {
      newChecked = stateChecked;
    } else {
      newChecked = checked;
    }

    return (
      <Radio
        {...rest}
        type={type}
        value={value || type} // 只有单独使用Radio、Radio.Button时会没有value，在group中value为必传，没有则默认为type
        checked={newChecked}
        onChange={this.onChange}
      />
    );
  }
}

Checkbox.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  checked: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]), // 是否选中
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
};

Checkbox.defaultProps = {
  checked: null,
  onChange: () => {},
  type: 'checkbox',
  value: null,
};

export default Checkbox;
