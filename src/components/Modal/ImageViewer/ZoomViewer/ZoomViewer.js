import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, Animated, TouchableOpacity,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Svg from '../../../Svg';
import Style from './ZoomViewer.scss';

class ZoomViewer extends Component {
  constructor() {
    super();
    this.state = {
      deg: 0,
      width: 0,
      height: 0,
      screenWidth: 0,
      screenHeight: 0,
      status: 'loading',
    };
    this.fadeAnim = new Animated.Value(0);
  }

  componentWillMount() {
    this.init();
    Animated.timing(this.fadeAnim, {
      toValue: 1,
      duration: 200,
    }).start();
    // console.log(this.state, 'wocaonima');
  }


  onLeftClick=() => {
    const { deg } = this.state;
    this.setState({
      deg: deg - 90,

    });
  }

  onRightClick=() => {
    const { deg } = this.state;
    this.setState({
      deg: deg + 90,

    });
  }


  getHeader=() => (
    <View style={Style.Rotate}>
      <TouchableOpacity style={Style.Btn} onPress={this.onLeftClick}>
        <Svg height="64" width="54" source="leftRotate" fill="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={[Style.Btn, { marginLeft: 24 }]} onPress={this.onRightClick}>
        <Svg height="64" width="54" source="rightRotate" fill="#fff" />
      </TouchableOpacity>
    </View>
  )


  getContent=() => {
    console.log(this.state);
    const { status } = this.state;
    if (status !== 'success') {
      return null;
    }
    // 获得屏幕宽高
    const {
      screenHeight, screenWidth, width, height, deg,
    } = this.state;
    let [_width, _height] = [width, height];
    // const ratio = width > height ? 'WIDTH' : 'HEIGHT';
    // console.log(screenHeight);
    // 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
    if (_width > screenWidth) {
      console.log('!!');
      const widthPixel = screenWidth / width;
      _width *= widthPixel;
      _height *= widthPixel;
    }

    // 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
    if (_height > screenHeight) {
      console.log('??');
      const HeightPixel = screenHeight / height;
      _width *= HeightPixel;
      _height *= HeightPixel;
    }
    // console.log('我是图片额');
    // console.log(_width, _height);
    // console.log('我是图片额');
    const { url } = this.props;
    return (

      <ImageZoom
        cropWidth={screenWidth}
        cropHeight={screenHeight}
        imageWidth={screenWidth}
        imageHeight={screenHeight}
        onClick={this._onClose}
      >
        <View style={[{ flex: 1, transform: [{ rotateZ: `${deg}deg` }] }, Style.view]}>
          <Image
            style={[{ width: _width, height: _height }, Style.Image]}
            source={{ uri: url }}
          />
        </View>
      </ImageZoom>

    );
  }


  init=() => {
    const { url } = this.props;
    Image.getSize(
      url,
      (width, height) => {
        this.setState(
          {
            width,
            height,
            status: 'success',
          },
        );
      },
      () => {
        try {
          // 应该是静态资源，不过没做
          const data = (Image).resolveAssetSource(url);
          this.setState(
            {
              width: data.width,
              height: data.height,
              status: 'success',
            },
          );
        } catch (newError) {
          // Give up..
          this.setState(
            {
              status: 'fail',
            },
          );
        }
      },
    );
    // console.log(this.state, 'wocaoaaaaanima');
  }

  loadImage=() => {

  }

  handleLayout=(event) => {
    let screenWidth = null;
    let screenHeight = null;
    if (event.nativeEvent.layout.width !== this.width) {
      screenWidth = event.nativeEvent.layout.width;
      screenHeight = event.nativeEvent.layout.height;
    }
    this.setState({
      screenWidth,
      screenHeight,
    });
    // console.log('我是layout');
    // console.log(screenWidth, screenHeight);
    // console.log('我是layout');
  }

  _onClose=() => {
    const { closeFn } = this.props;
    closeFn();
  }


  render() {
    return (
      <View
        style={[Style.content]}
        onLayout={this.handleLayout}
      >
        {this.getHeader()}
        {this.getContent()}
      </View>
    );
  }
}

ZoomViewer.propTypes = {
  closeFn: PropTypes.func,
  url: PropTypes.string,
};

ZoomViewer.defaultProps = {
  closeFn: () => null,
  url: '',
};

export default ZoomViewer;
