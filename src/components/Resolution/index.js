import React, { Component } from 'react';
import {
  Dimensions,
  PixelRatio,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

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

  onLayout = () => {
    const { width: SWidth, height: SHeight } = Dimensions.get('screen');
    let width;
    let height;
    let scale;

    if (SWidth > SHeight) {
      ({
        width,
        height,
        scale,
      } = this.rotatingScreen());
    } else {
      ({
        width,
        height,
        scale,
      } = this.rotatingScreen(1080, 1820));
    }

    const { width: oldWidth } = this.state;
    if (oldWidth !== width) {
      this.setState({
        width,
        height,
        scale,
      });
    }
  }


  rotatingScreen = (dwidth = 1920, dheight = 1080, dim = 'screen') => {
    const { width, height } = Dimensions.get(dim);
    const designSize = { width: dwidth, height: dheight };
    const pxRatio = PixelRatio.get(dim);

    const w = PixelRatio.getPixelSizeForLayoutSize(width);
    const h = PixelRatio.getPixelSizeForLayoutSize(height);

    // 竖屏时横向铺满
    if (dwidth < dheight) {
      const fixedWidthDesignScale = designSize.width / w;
      const fixedWidthWidth = designSize.width;
      const fixedWidthHeight = h * fixedWidthDesignScale;
      const fixedWidthScale = 1 / pxRatio / fixedWidthDesignScale;

      return {
        width: fixedWidthWidth, height: fixedWidthHeight, scale: fixedWidthScale,
      };
    }

    // 横屏事件纵向铺满
    const fixedHeightDesignScale = designSize.height / h;
    const fixedHeightWidth = w * fixedHeightDesignScale;
    const fixedHeightHeight = designSize.height;
    const fixedHeightScale = 1 / pxRatio / fixedHeightDesignScale;

    return {
      width: fixedHeightWidth, height: fixedHeightHeight, scale: fixedHeightScale,
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

Resolution.propTypes = {
  children: PropTypes.element.isRequired,
};
