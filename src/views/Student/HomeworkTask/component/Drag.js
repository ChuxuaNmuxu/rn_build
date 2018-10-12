import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import R from 'ramda';
import Task from './Task';

export class Drop extends Component {
  constructor(props) {
    super(props);

    const { position } = props;
    this.state = {
      position,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!R.equals(props.position, state.position)) {
      return {
        position: props.position,
      };
    }
    return null;
  }

  render() {
    const { position: { x, y } } = this.state;
    const { wrapStyle, data } = this.props;
    console.log('drag-3111111111', data);
    return (
      <View style={{
        left: x, top: y, position: 'absolute', zIndex: 1,
      }}
      >
        <Task
          wrapStyle={wrapStyle}
          data={{ ...data, dragTask: true }}
        />
      </View>
    );
  }
}

Drop.propTypes = {
  position: PropTypes.object,
  wrapStyle: PropTypes.object,
  data: PropTypes.object,
};

Drop.defaultProps = {
  position: {},
  wrapStyle: {},
  data: {},
};

export default Drop;
