import React, { Component } from 'react';
import {
  Dimensions,
  PixelRatio,
  View,
  Platform,
} from 'react-native';
import Orientation from 'react-native-orientation';

export default class Resolution extends Component {
  constructor(props) {
    super(props);
    const {
      width,
      height,
      scale,
    } = this.rotatingScreen();
    this.state = {
      width,
      height,
      scale,
    };
  }


  componentDidMount() {
    Dimensions.addEventListener('change', this.onLayout);
  }

  componentWillUnmount() {

  }

  onLayout = () => {
    console.log();
    const { width: SWidth } = Dimensions.get('screen');
    const { height: SHeight } = Dimensions.get('screen');
    let width;
    let height;
    let scale;

    if (SWidth > SHeight) {
      ({
        width,
        height,
        scale,
      } = this.rotatingScreen(1920, 1080));
    } else {
      ({
        width,
        height,
        scale,
      } = this.rotatingScreen(1080, 1820));
    }

    const oldWidth = this.state.width;
    console.log(30, oldWidth, width);
    if (oldWidth !== width) {
      console.log(47);
      this.setState({
        width,
        height,
        scale,
      });
    }
  }


  rotatingScreen = (dwidth = 1920, dheight = 1080, dim = 'screen') => {
    const { width } = Dimensions.get(dim);
    const { height } = Dimensions.get(dim);
    const designSize = { width: dwidth, height: dheight };
    const pxRatio = PixelRatio.get(dim);

    const w = PixelRatio.getPixelSizeForLayoutSize(width);
    const h = PixelRatio.getPixelSizeForLayoutSize(height);

    const fixedWidthDesignScale = designSize.width / w;
    const fixedWidthWidth = designSize.width;
    const fixedWidthHeight = h * fixedWidthDesignScale;
    const fixedWidthScale = 1 / pxRatio / fixedWidthDesignScale;

    console.log(54, fixedWidthWidth, fixedWidthHeight, fixedWidthScale);
    return {
      width: fixedWidthWidth, height: fixedWidthHeight, scale: fixedWidthScale,
    };
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
