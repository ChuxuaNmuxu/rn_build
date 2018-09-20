import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  // TouchableOpacity,
  Text,
  ToastAndroid,
  Dimensions,
  PanResponder,
  ImageEditor,
  ImageStore,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const { height, width } = Dimensions.get('window');

class User extends Component {
  constructor(props) {
    super(props);
    this.unmounted = false;
    this.camera = null;
    this._clipWidth = 200;
    this._boxWidth = 20;
    this._maskResponder = {};
    this._previousLeft = 0;
    this._previousTop = 0;
    this._previousWidth = this._clipWidth;
    this._backStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
      },
    };
    this._maskStyles = {
      style: {
        left: -(width - this._clipWidth) / 2,
        top: -(width - this._clipWidth) / 2,
      },
    };
    this.state = {
      // token: null,
      // username: null,
      photo: null,
      // switchIsOn: true,
      // uploading: false,
      // uploaded: false,
      changePhoto: false,
      scale: 1,
      sWidth: 0,
      sHeight: 0,
    };
  }

  componentWillMount() {
    this._maskResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => false,
      onPanResponderMove: (e, gestureState) => this._maskPanResponderMove(e, gestureState),
      onPanResponderRelease: (e, gestureState) => this._maskPanResponderEnd(e, gestureState),
      onPanResponderTerminate: (e, gestureState) => this._maskPanResponderEnd(e, gestureState),
    });
  }

  _updateNativeStyles() {
    this._maskStyles.style.left = -(width - this._clipWidth) / 2 + this._backStyles.style.left;
    this._maskStyles.style.top = -(width - this._clipWidth) / 2 + this._backStyles.style.top;
    this.BACK_PHOTO.setNativeProps(this._backStyles);
    this.MASK_PHOTO.setNativeProps(this._maskStyles);
  }

  _maskPanResponderMove(e, gestureState) {
    const left = this._previousLeft + gestureState.dx;
    const top = this._previousTop + gestureState.dy;
    this._backStyles.style.left = left;
    this._backStyles.style.top = top;
    this._updateNativeStyles();
  }

  _maskPanResponderEnd(e, gestureState) {
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }

  // componentWillUnMount() {
  //   this.unmounted = true;
  // }

  _saveImage() {
    const { photo } = this.state;
    const photoURI = photo.uri;
    const left = -Math.floor(this._backStyles.style.left) + (width - this._clipWidth) / 2;
    const top = -Math.floor(this._backStyles.style.top) + (width - this._clipWidth) / 2;
    if (left < 0 || top < 0 || left + this._clipWidth > width || top + this._clipWidth > height) {
      ToastAndroid.show('超出裁剪区域,请重新选择', ToastAndroid.SHORT);
      return;
    }
    // this.setState({ uploading: true });
    ImageEditor.cropImage(
      photoURI,
      { offset: { x: left, y: top }, size: { width: this._clipWidth, height: this._clipWidth } },
      (croppedURI) => {
        ImageStore.getBase64ForTag(
          croppedURI,
          () => {
            // 这里即可获得base64编码的字符串，将此字符串上传带服务器处理，保存后并生成图片地址返回即可，详细代码后面结合node.js再做讲解。
          },
          () => true,
        );
      },
      () => true,
    );
  }

  _fromGallery() {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: width,
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      allowsEditing: true, // 当用户选择过照片之后是否允许再次编辑图片
    };
    console.log(ImagePicker);
    ImagePicker.launchImageLibrary(options, (response) => {
      if (!(response.didCancel || response.error)) {
        Image.getSize(response.uri, (w, h) => {
          this.setState({
            changePhoto: true,
            photo: response,
            sWidth: w,
            sHeight: w * h / width,
          });
          this._updateNativeStyles();
        });
      }
    });
  }

  _fromCamera() {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: width,
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      allowsEditing: true, // 当用户选择过照片之后是否允许再次编辑图片
    };
    ImagePicker.launchCamera(options, (response) => {
      if (!(response.didCancel || response.error)) {
        Image.getSize(response.uri, (w, h) => {
          this.setState({
            changePhoto: true,
            photo: response,
            sWidth: w,
            sHeight: w * h / width,
          });
          this._updateNativeStyles();
        });
      }
    });
  }

  render() {
    const {
      photo, changePhoto, scale, sWidth, sHeight,
    } = this.state;
    let Photo;
    if (photo) {
      if (changePhoto) {
        Photo = (
          <View style={styles.row}>
            <View style={{ width, height: width, overflow: 'hidden' }}>
              <Image
                ref={(e) => { this.BACK_PHOTO = e; }}
                source={{ uri: photo.uri, scale }}
                resizeMode="cover"
                style={{ width: sWidth, height: sHeight, opacity: 0.5 }}
              />
              <View
                ref={(e) => { this.MASK = e; }}
                {...this._maskResponder.panHandlers}
                style={{
                  position: 'absolute',
                  left: (width - this._clipWidth) / 2,
                  top: (width - this._clipWidth) / 2,
                  width: this._clipWidth,
                  height: this._clipWidth,
                  opacity: 0.8,
                }}
              >
                <Image
                  ref={(e) => { this.MASK_PHOTO = e; }}
                  source={photo}
                  resizeMode="cover"
                  style={{ width: sWidth, height: sHeight }}
                />
              </View>
            </View>
          </View>
        );
      } else {
        Photo = <Image source={photo} resizeMode="cover" style={{ width, height: width }} />;
      }
    }
    return (
      <View style={styles.wrap}>
        <View style={styles.body}>
          <View style={[styles.row, { paddingBottom: 30 }]}>
            <View style={{ height: width, width }}>
              {Photo}
            </View>
          </View>
          {(() => (changePhoto
            ? (
              <View>
                <View style={styles.row1}>
                  <View style={{ flex: 1 }} onPress={() => this._saveImage()}>
                    <Text>保存</Text>
                  </View>
                </View>
              </View>
            )
            : (
              <View>
                <View style={styles.row1}>
                  <View style={{ flex: 1 }} onPress={() => this._fromGallery()}>
                    <Text>从相册选择</Text>
                  </View>
                </View>
                <View style={styles.row1}>
                  <View style={{ flex: 1 }} onPress={() => this._fromCamera()}>
                    <Text>拍一张照片</Text>
                  </View>
                </View>
              </View>
            ))
          )()}

        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  row1: {
    flex: 0,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
export default User;
