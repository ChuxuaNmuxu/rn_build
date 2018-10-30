import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';
// import styless from './imageCropper.scss';

export default class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: 0,
    };
  }

  componentWillMount() {
    console.log('didMount');
    // 是否拖动裁剪框
    this.dragClipRect = false;
    // 是否缩放裁剪框
    this.scaleClipRectLT = false;
    this.scaleClipRectLB = false;
    this.scaleClipRectRT = false;
    this.scaleClipRectRB = false;

    const {
      imageWidth = 0,
      imageHeight = 0,
      containerWidth = 0,
      containerHeight = 0,
    } = this.props;

    // 当前/动画 x 位移
    this._left = containerWidth / 2 - imageWidth / 2;
    this._animatedLeft = new Animated.Value(this._left);

    // 当前/动画 y 位移
    this._top = containerHeight / 2 - imageHeight / 2;
    this._animatedTop = new Animated.Value(this._top);

    this._width = imageWidth;
    this._height = imageHeight;
    this._animatedWidth = new Animated.Value(imageWidth);
    this._animatedHeight = new Animated.Value(imageHeight);

    // 缩放大小
    this.scale = 1;
    this.animatedScale = new Animated.Value(this.scale);
    this.lastZoomDistance = null;
    this.currentZoomDistance = 0;

    // 图片大小
    if (imageWidth < imageHeight) {
      this.imageMinWidth = imageWidth;
      this.imageMinHeight = imageHeight / imageWidth * imageHeight;
    } else {
      this.imageMinWidth = imageWidth / imageHeight * imageWidth;
      this.imageMinHeight = imageHeight;
    }
    this.imageMinSize = Math.floor(
      Math.sqrt(this.imageMinWidth * this.imageMinWidth + this.imageMinHeight * this.imageMinHeight),
    );

    this.imagePanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => false,

      onPanResponderGrant: (evt, gestureState) => {
        evt.persist();
        // console.log('target', evt.target);
        // console.log('nativeEvent', evt.nativeEvent);
        console.log('mouseDown', this._top + gestureState.dy);
        const { changedTouches } = evt.nativeEvent;
        if (changedTouches.length > 1) {
          this.dragClipRect = false;
        }

        this.lastZoomDistance = null;
      },

      onPanResponderMove: (evt, gestureState) => {
        // console.log('evt', evt);
        console.log('mouseMove', this.dragClipRect, this.scaleClipRectLT);

        const { changedTouches } = evt.nativeEvent;
        if (changedTouches.length <= 1) {
          if (this.dragClipRect) {
            // 拖动裁剪框
            let diffLeft = this._left + gestureState.dx;
            let diffTop = this._top + gestureState.dy;
            if (diffLeft < 0) {
              diffLeft = 0;
            } else if (diffLeft + this._width > containerWidth) {
              diffLeft = containerWidth - this._width;
            }
            if (diffTop < 0) {
              diffTop = 0;
            } else if (diffTop + this._height > containerHeight) {
              diffTop = containerHeight - this._height;
            }
            this._animatedLeft.setValue(diffLeft);
            this._animatedTop.setValue(diffTop);
          } else if (this.scaleClipRectLT) {
            // 缩放裁剪框
            let diffX = this._width - gestureState.dx;
            let diffY = this._height - gestureState.dy;
            let diffLeft = this._left + gestureState.dx;
            let diffTop = this._top + gestureState.dy;
            if (diffX < 100) {
              diffX = 100;
              diffLeft = this._left + this._width - 100;
            } else if (diffLeft < 0) {
              diffX = this._width + this._left;
              diffLeft = 0;
            }
            if (diffY < 100) {
              diffY = 100;
              diffTop = this._top + this._height - 100;
            } else if (diffTop < 0) {
              diffY = this._height + this._top;
              diffTop = 0;
            }
            this._animatedLeft.setValue(diffLeft);
            this._animatedTop.setValue(diffTop);
            this._animatedWidth.setValue(diffX);
            this._animatedHeight.setValue(diffY);
          } else if (this.scaleClipRectLB) {
            let diffX = this._width - gestureState.dx;
            let diffY = this._height + gestureState.dy;
            let diffLeft = this._left + gestureState.dx;
            if (diffX < 100) {
              diffX = 100;
            } else if (diffLeft < 0) {
              diffX = this._width + this._left;
              diffLeft = 0;
            }

            if (diffY < 100) {
              diffY = 100;
            } else if (diffY + this._top > containerHeight) {
              diffY = containerHeight - this._top;
            }
            this._animatedLeft.setValue(diffLeft);
            this._animatedWidth.setValue(diffX);
            this._animatedHeight.setValue(diffY);
          } else if (this.scaleClipRectRT) {
            let diffX = this._width + gestureState.dx;
            let diffY = this._height - gestureState.dy;
            let diffTop = this._top + gestureState.dy;

            if (diffX < 100) {
              diffX = 100;
            } else if (diffX + this._left > containerWidth) {
              diffX = containerWidth - this._left;
            }

            if (diffY < 100) {
              diffY = 100;
              diffTop = this._top + this._height - 100;
            } else if (diffTop < 0) {
              diffY = this._height + this._top;
              diffTop = 0;
            }

            this._animatedTop.setValue(diffTop);
            this._animatedWidth.setValue(diffX);
            this._animatedHeight.setValue(diffY);
          } else if (this.scaleClipRectRB) {
            let diffX = this._width + gestureState.dx;
            let diffY = this._height + gestureState.dy;

            if (diffX < 100) {
              diffX = 100;
            } else if (diffX + this._left > containerWidth) {
              diffX = containerWidth - this._left;
            }

            if (diffY < 100) {
              diffY = 100;
            } else if (diffY + this._top > containerHeight) {
              diffY = containerHeight - this._top;
            }
            this._animatedWidth.setValue(diffX);
            this._animatedHeight.setValue(diffY);
          }
        } else {
          // 双指缩放图片
          const widthDistance = changedTouches[1].pageX - changedTouches[0].pageX;
          const heightDistance = changedTouches[1].pageY - changedTouches[0].pageY;
          this.currentZoomDistance = Math.floor(
            Math.sqrt(widthDistance * widthDistance + heightDistance * heightDistance),
          );
          // console.log('1233', this.currentZoomDistance);
          if (this.lastZoomDistance !== null) {
            let scale = this.scale + (
              this.currentZoomDistance - this.lastZoomDistance
            ) * this.scale / this.imageMinSize;
            if (scale < 0.5) {
              scale = 0.5;
            }
            this.animatedScale.setValue(scale);
            // this.updateTranslate();
            this.scale = scale;
          }
          this.lastZoomDistance = this.currentZoomDistance;
          this.dragClipRect = false;
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        // console.log('evt', evt); 详情计算
        console.log('mouseUp', this.dragClipRect, this.scaleClipRectLT);
        if (this.dragClipRect) {
          const diffLeft = this._left + gestureState.dx;
          const diffTop = this._top + gestureState.dy;
          if (diffLeft < 0) {
            this._left = 0;
          } else if (diffLeft + this._width > containerWidth) {
            this._left = containerWidth - this._width;
          } else {
            this._left = diffLeft;
          }
          if (diffTop < 0) {
            this._top = 0;
          } else if (diffTop + this._height > containerHeight) {
            this._top = containerHeight - this._height;
          } else {
            this._top = diffTop;
          }
        } else if (this.scaleClipRectLT) {
          const diffX = this._width - gestureState.dx;
          const diffY = this._height - gestureState.dy;

          const diffLeft = this._left + gestureState.dx;
          const diffTop = this._top + gestureState.dy;
          if (diffLeft < 0) {
            this._width += this._left;
            this._left = 0;
          } else if (diffX < 100) {
            this._left += this._width - 100;
            this._width = 100;
          } else {
            this._width = diffX;
            this._left = diffLeft;
          }
          if (diffTop < 0) {
            this._height += this._top;
            this._top = 0;
          } else if (diffY < 100) {
            this._top += this._height - 100;
            this._height = 100;
          } else {
            this._height = diffY;
            this._top = diffTop;
          }
        } else if (this.scaleClipRectLB) {
          const diffX = this._width - gestureState.dx;
          const diffY = this._height + gestureState.dy;

          const diffLeft = this._left + gestureState.dx;

          if (diffLeft < 0) {
            this._width += this._left;
            this._left = 0;
          } else if (diffX < 100) {
            this._left += this._width - 100;
            this._width = 100;
          } else {
            this._width = diffX;
            this._left = diffLeft;
          }

          if (diffY < 100) {
            this._height = 100;
          } else if (diffY + this._top > containerHeight) {
            this._height = containerHeight - this._top;
          } else {
            this._height = diffY;
          }
        } else if (this.scaleClipRectRT) {
          const diffX = this._width + gestureState.dx;
          const diffY = this._height - gestureState.dy;
          const diffTop = this._top + gestureState.dy;

          if (diffX < 100) {
            this._width = 100;
          } else if (diffX + this._left > containerWidth) {
            this._width = containerWidth - this._left;
          } else {
            this._width = diffX;
          }

          if (diffTop < 0) {
            this._height += this._top;
            this._top = 0;
          } else if (diffY < 100) {
            this._top += this._height - 100;
            this._height = 100;
          } else {
            this._height = diffY;
            this._top = diffTop;
          }
        } else if (this.scaleClipRectRB) {
          const diffX = this._width + gestureState.dx;
          const diffY = this._height + gestureState.dy;

          if (diffX < 100) {
            this._width = 100;
          } else if (diffX + this._left > containerWidth) {
            this._width = containerWidth - this._left;
          } else {
            this._width = diffX;
          }

          if (diffY < 100) {
            this._height = 100;
          } else if (diffY + this._top > containerHeight) {
            this._height = containerHeight - this._top;
          } else {
            this._height = diffY;
          }
        }

        this.dragClipRect = false;
        this.scaleClipRectLT = false;
        this.scaleClipRectLB = false;
        this.scaleClipRectRT = false;
        this.scaleClipRectRB = false;
      },

      onPanResponderTerminate: () => {},
    });
  }

  onPressBtn = (e, type) => {
    switch (type) {
      case 'rect': this.dragClipRect = true; return false;
      case 'LT': this.scaleClipRectLT = true; return false;
      case 'LB': this.scaleClipRectLB = true; return false;
      case 'RT': this.scaleClipRectRT = true; return false;
      case 'RB': this.scaleClipRectRB = true; return false;
        // break;
      default: return false;
    }
  }

  getCropData = () => {
    const { scale } = Dimensions.get('screen');
    console.log('scale', scale);
    return {
      top: this._top * scale,
      left: this._left * scale,
      width: this._width * scale,
      height: this._height * scale,
    };
  }

  crop = () => captureRef(this.cropper, { format: 'png', quality: 1 })

  rotate = (digit) => {
    const { rotate } = this.state;
    let rotateNum;
    if (digit === 0) {
      rotateNum = 0;
    } else {
      rotateNum = rotate + digit;
    }
    this.setState({
      rotate: rotateNum,
    });
  }

  render() {
    // console.log('this.animatedScale', this.animatedScale);
    const { rotate = 0 } = this.state;
    const animatedImgStyle = {
      transform: [{
        scale: this.animatedScale,
      }, {
        rotate: `${rotate}deg`,
      }],
    };
    const animatedRectStyle = {
      top: this._animatedTop,
      left: this._animatedLeft,
      width: this._animatedWidth,
      height: this._animatedHeight,
    };
    const { source = {}, imageWidth, imageHeight } = this.props;
    return (
      <View
        style={styles.container}
        {...this.imagePanResponder.panHandlers}
      >
        <View
          style={styles.clipContainer}
          ref={(e) => { this.cropper = e; }}
        >
          <Animated.View style={animatedImgStyle}>
            <Image
              resizeMode="contain"
              style={{ width: imageWidth, height: imageHeight }}
              source={source}
            />
          </Animated.View>
        </View>
        <Animated.View
          style={[animatedRectStyle, styles.moveRect]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.clipRect}
            onPressIn={e => this.onPressBtn(e, 'rect')}
          />
          {['LT', 'LB', 'RT', 'RB'].map((point, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              style={[styles.rectPoint, styles[point]]}
              onPressIn={e => this.onPressBtn(e, point)}
            />
          ))}
        </Animated.View>
      </View>
    );
  }
}


ImageCropper.propTypes = {
  source: PropTypes.any.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  moveRect: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#fa5656',
    padding: 40,
  },
  clipRect: {
    flex: 1,
  },
  clipContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  editboxMiddle: {
    flexDirection: 'row',
  },
  rectPoint: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: '#fa5656',
  },
  LT: {
    left: 0,
    top: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  LB: {
    left: 0,
    bottom: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  RT: {
    right: 0,
    top: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  RB: {
    right: 0,
    bottom: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
});
