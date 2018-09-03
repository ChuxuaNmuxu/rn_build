import React from 'react';
import {
  Dimensions,
  PixelRatio,
  Platform,
  StatusBar,
  View,
} from 'react-native';

const options = {};
export default class Resolution {
  static get(useFixWidth = true) {
    const {
      fixedWidth,
      fixedHeight,
    } = options;
    return useFixWidth ? { ...fixedWidth } : { ...fixedHeight };
  }

  // Dimensions.get(); window 获取可视区宽高 screen。获取整个屏幕宽高，包含虚拟按键和状态栏部分
  static setDesignSize(dwidth = 1920, dheight = 1080, dim = 'screen') {
    console.log(22);
    const { height } = Dimensions.get(dim);
    const { width } = Dimensions.get(dim);

    const designSize = { width: dwidth, height: dheight };

    const navHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 64;
    const pxRatio = PixelRatio.get(dim);


    // if (dim !== 'screen') height += navHeight;

    const w = PixelRatio.getPixelSizeForLayoutSize(width);
    const h = PixelRatio.getPixelSizeForLayoutSize(height);

    /**
     * fixedWidth 模式是保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器窗口，
     * 但只保持应用程序内容的原始宽度不变，高度可能会改变,简言之宽度固定，高度自适应。
     */
    const fixedWidthDesignScale = designSize.width / w;
    const fixedWidthWidth = designSize.width;
    const fixedWidthHeight = h * fixedWidthDesignScale;
    const fixedWidthScale = 1 / pxRatio / fixedWidthDesignScale;

    /**
     * fixedHeight 模式是保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器窗口，
     * 但只保持应用程序内容的原始高度不变，宽度可能会改变,简言之高度固定，宽度自适应。
     */
    const fixedHeightDesignScale = designSize.height / h;
    const fixedHeightWidth = w * fixedHeightDesignScale;
    const fixedHeightHeight = designSize.height;
    const fixedHeightScale = 1 / pxRatio / fixedHeightDesignScale;

    options.fixedWidth = {
      width: fixedWidthWidth, height: fixedWidthHeight, scale: fixedWidthScale, navHeight,
    };
    options.fixedHeight = {
      width: fixedHeightWidth, height: fixedHeightHeight, scale: fixedHeightScale, navHeight,
    };
  }

  static FixWidthView = (p) => {
    Resolution.setDesignSize(1920, 1080);
    const {
      fixedWidth: {
        width,
        height,
        scale,
        // navHeight,
      },
    } = options;
    return (
      <View
        {...p}
        style={{
          // marginTop: navHeight,
          width,
          height,
          backgroundColor: 'transparent',
          transform: [{ translateX: -width * 0.5 },
            { translateY: -height * 0.5 },
            { scale },
            { translateX: width * 0.5 },
            { translateY: height * 0.5 }],
        }}
      />
    );
  };

  static FixHeightView = (p) => {
    Resolution.setDesignSize(1080, 1920);
    const {
      fixedWidth: {
        width,
        height,
        scale,
        // navHeight,
      },
    } = options;
    return (
      <View
        {...p}
        style={{
          // marginTop: navHeight,
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
        {p.children}
      </View>
    );
  };
}
