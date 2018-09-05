import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Opt from '../Opt';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: Array(props.size).fill({}).map((v, i) => ({ [i]: false })),
    };
  }

  onChange = (index) => {
    const { map } = this.state;
    const { onChange } = this.props;
    const newMap = map.map((v, i) => index === i);
    this.setState({
      map: newMap,
    }, onChange(newMap));
  }

  renderRadios = () => {
    const { size } = this.props;
    const { map } = this.state;
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(<Opt checked={map[i]} key={i} onChange={this.onChange} index={i}>{i}</Opt>);
    }
    return arr;
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

Checkbox.propTypes = {
  size: PropTypes.number,
  checked: PropTypes.array,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  size: 1,
  checked: [],
  onChange: () => {},
};

export default Checkbox;
