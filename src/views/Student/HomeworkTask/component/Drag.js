import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import R from 'ramda';
import TaskItem from './Task';
import { adaptiveRotation } from '../../../../utils/resolution';
import styles from './drag.scss';

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
    // const transform = this.dragAnimation.getTranslateTransform();
    const { position: { x, y } } = this.state;
    const { wrapStyle } = this.props;

    return (
      <View style={{
        left: x, top: y, position: 'absolute', zIndex: 1,
      }}
      >
        <TaskItem
          refs={(ref) => { this.dragRef = ref; }}
          wrapStyle={wrapStyle}
          data={{
            index: '我是拖拽元素',
          }}
        />
      </View>
    );
  }
}

Drop.propTypes = {
  position: PropTypes.object,
  wrapStyle: PropTypes.object,
};

Drop.defaultProps = {
  position: {},
  wrapStyle: {},
};

export default Drop;
