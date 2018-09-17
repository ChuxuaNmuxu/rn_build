import React, { Component } from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { zoomScreen, adaptiveRotation } from '../../utils/resolution';

export default class Resolution extends Component {
  constructor(props) {
    super(props);
    const {
      width,
      height,
      scale,
    } = zoomScreen();
    this.state = {
      width,
      height,
      scale,
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onLayout);
  }

  onLayout = () => {
    const {
      width,
      height,
      scale,
    } = adaptiveRotation();

    const { width: oldWidth } = this.state;
    if (oldWidth !== width) {
      this.setState({
        width,
        height,
        scale,
      });
    }
  }

  render() {
    const { children } = this.props;
    const {
      width,
      height,
      scale,
    } = this.state;
    return (
      <View
        onLayout={this.onLayout}
        {...this.props}
        style={{
          width,
          height,
          backgroundColor: 'transparent',
          transform: [{ translateX: -width * 0.5 },
            { translateY: -height * 0.5 },
            { scale },
            { translateX: width * 0.5 },
            { translateY: height * 0.5 }],
        }}
      >
        {children}
      </View>
    );
  }
}

Resolution.propTypes = {
  children: PropTypes.element.isRequired,
};
