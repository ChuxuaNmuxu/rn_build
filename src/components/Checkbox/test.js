/**
 * 选中的下标从0开始
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Opt from '../Opt';
import { createOnlyKey, numMapCapitalLetter } from '../../utils/common';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    const { checked, size } = props;
    const len = checked.length;

    this.state = {
      checks: size > len ? Array(size - len).fill({}).concat(checked) : checked,
    };
  }

  onChange = (index, checked) => {
    const { checks } = this.state;
    const { onChange } = this.props;
    const newChecks = checks.map((v) => {
      const key = Object.keys(v)[0];
      const val = Object.values(v)[0];
      return { [key]: Number(key) === index ? !checked : val };
    });
    console.log(30, newChecks);
    this.setState({
      checks: newChecks,
    }, onChange(newChecks));
  }

  renderCheckboxs = () => {
    const { checks } = this.state;
    const { text } = this.props;
    return checks.map((v, i) => (
      <Opt
        checked={Object.values(v)[0]}
        key={createOnlyKey(i)}
        onChange={this.onChange}
        index={i}
      >{text ? text[i] : numMapCapitalLetter(i)}
      </Opt>
    ));
  }

  render() {
    return (
      <View>
        {
          this.renderCheckboxs()
        }
      </View>
    );
  }
}

Checkbox.propTypes = {
  size: PropTypes.number,
  checked: PropTypes.array,
  onChange: PropTypes.func,
  text: PropTypes.array,
};

Checkbox.defaultProps = {
  size: 1,
  checked: [],
  onChange: () => {},
  text: null,
};

export default Checkbox;
