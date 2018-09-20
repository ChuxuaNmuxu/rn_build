import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  Image,
  StyleSheet,
} from 'react-native';
import { captureRef } from 'react-native-view-shot';

export default class ImageCropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    // 当前/动画 x 位移
    this._left = 0;
    this._animatedLeft = new Animated.Value(0);

    // 当前/动画 y 位移
    this._top = 0;
    this._animatedTop = new Animated.Value(0);

    const { imageWidth = 100, imageHeight = 100 } = this.props;
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
        console.log('target', evt.target);
        // console.log('nativeEvent', evt.nativeEvent);
        console.log('mouseDown', gestureState);
        const { changedTouches } = evt.nativeEvent;
        if (changedTouches.length > 1) {
          this.dragClipRect = false;
        }

        this.lastZoomDistance = null;
      },

      onPanResponderMove: (evt, gestureState) => {
        // console.log('evt', evt);
        // console.log('mouseMove', gestureState);
        const { changedTouches } = evt.nativeEvent;
        if (changedTouches.length <= 1) {
          if (this.dragClipRect) {
            // 拖动裁剪框
            this._animatedLeft.setValue(this._left + gestureState.dx);
            this._animatedTop.setValue(this._top + gestureState.dy);
          } else if (this.scaleClipRectLT) {
            // 缩放裁剪框
            const diffX = this._width - gestureState.dx;
            const diffY = this._height - gestureState.dy;
            if (diffX < 100 || diffY < 100) return;
            this._animatedLeft.setValue(this._left + gestureState.dx);
            this._animatedTop.setValue(this._top + gestureState.dy);
            this._animatedWidth.setValue(diffX);
            this._animatedHeight.setValue(diffY);
          } else if (this.scaleClipRectLB) {
            const diffX = this._width - gestureState.dx;
            const diffY = this._height + gestureState.dy;
            if (diffX < 100 || diffY < 100) return;
            this._animatedLeft.setValue(this._left + gestureState.dx);
            this._animatedWidth.setValue(diffX);
            this._animatedHeight.setValue(diffY);
          } else if (this.scaleClipRectRT) {
            const diffX = this._width + gestureState.dx;
            const diffY = this._height - gestureState.dy;
            if (diffX < 100 || diffY < 100) return;
            this._animatedTop.setValue(this._top + gestureState.dy);
            this._animatedWidth.setValue(diffX);
            this._animatedHeight.setValue(diffY);
          } else if (this.scaleClipRectRB) {
            const diffX = this._width + gestureState.dx;
            const diffY = this._height + gestureState.dy;
            if (diffX < 100 || diffY < 100) return;
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
        // console.log('evt', evt);
        console.log('mouseUp', gestureState.dx, gestureState.dy);
        if (this.dragClipRect) {
          this._left += gestureState.dx;
          this._top += gestureState.dy;
        } else if (this.scaleClipRectLT) {
          this._left += gestureState.dx;
          this._top += gestureState.dy;
          this._width -= gestureState.dx;
          this._height -= gestureState.dy;
        } else if (this.scaleClipRectLB) {
          this._left += gestureState.dx;
          // this._top += gestureState.dy;
          this._width -= gestureState.dx;
          this._height += gestureState.dy;
        } else if (this.scaleClipRectRT) {
          // this._left += gestureState.dx;
          this._top += gestureState.dy;
          this._width += gestureState.dx;
          this._height -= gestureState.dy;
        } else if (this.scaleClipRectRB) {
          this._width += gestureState.dx;
          this._height += gestureState.dy;
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
    console.log('eeee', e);
    console.log('type', type);
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

  crop = () => captureRef(this.cropper, { format: 'png', quality: 1 });

  render() {
    // console.log('this.animatedScale', this.animatedScale);
    // const { top, left } = this.state;
    const animatedImgStyle = {
      transform: [{
        scale: this.animatedScale,
      }, {
        rotate: this.animatedRotate || '0deg',
      }],
    };
    const animatedRectStyle = {
      top: this._animatedTop,
      left: this._animatedLeft,
      width: this._animatedWidth,
      height: this._animatedHeight,
    };
    const { source = {}, imageWidth, imageHeight } = this.props;
    console.log('cropImage', source);
    return (
      <View
        style={[styles.container, { position: 'relative', backgroundColor: 'red' }]}
        {...this.imagePanResponder.panHandlers}
      >
        <View
          style={[styles.container, styles.bgc]}
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
          style={[animatedRectStyle, styles.clipRect]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ flex: 1 }}
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
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  source: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  clipRect: {
    position: 'absolute',
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: '#3bfa6c',
    padding: 40,
  },
  bgc: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'gray',
  },
  editboxMiddle: {
    flexDirection: 'row',
  },
  rectPoint: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'black',
  },
  LT: {
    left: 0,
    top: 0,
  },
  LB: {
    left: 0,
    bottom: 0,
  },
  RT: {
    right: 0,
    top: 0,
  },
  RB: {
    right: 0,
    bottom: 0,
  },
});
