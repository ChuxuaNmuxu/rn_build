import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Opt from '../Opt';
import { createOnlyKey } from '../../utils/common';

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checks: Array(props.size).fill(false).map((v, i) => i === props.checkedIndex),
    };
  }

  onChange = (index) => {
    const { checks } = this.state;
    const { onChange } = this.props;
    const newChecks = checks.map((v, i) => index === i);
    this.setState({
      checks: newChecks,
    }, onChange(newChecks));
  }

  renderRadios = () => {
    const { checks } = this.state;
    return checks.map((v, i) => (
      <Opt
        checked={v}
        key={createOnlyKey('renderRadios', i)}
        onChange={this.onChange}
        index={i}
      >{i}
      </Opt>
    ));
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
  size: PropTypes.number,
  checkedIndex: PropTypes.number,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  size: 1,
  checkedIndex: null,
  onChange: () => {},
};

export default Radio;
