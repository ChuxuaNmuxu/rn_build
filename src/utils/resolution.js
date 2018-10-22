import { Dimensions, PixelRatio } from 'react-native';

export const zoomScreen = (dwidth = 1920, dheight = 1080, dim = 'screen') => {
  const { width, height } = Dimensions.get(dim);
  const designSize = { width: dwidth, height: dheight };
  const pxRatio = PixelRatio.get(dim);

  // 将dp转为px
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
};

export const adaptiveRotation = () => {
  const { width: SWidth, height: SHeight } = Dimensions.get('screen');
  let width;
  let height;
  let scale;

  // 屏幕宽高
  if (SWidth > SHeight) {
    ({
      width,
      height,
      scale,
    } = zoomScreen());
  } else {
    ({
      width,
      height,
      scale,
    } = zoomScreen(1080, 1920));
  }

  return { width, height, scale };
};
