import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  // Image,
  Text,
  StyleSheet,
  ImageEditor,
  Dimensions,
  Modal,
} from 'react-native';
import ImageCropper from './imageCropper';
// import Resolution from '../Resolution';
// import { adaptiveRotation } from '../../../utils/resolution';

export default class ImageCrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
      imageWidth: null,
      imageHeight: null,
      containerWidth: null,
      containerHeight: null,
    };
  }

  // 设置裁剪区容器和图片大小
  onLayout = (evt) => {
    const { layout } = evt.nativeEvent;
    const { source } = this.props;
    let imageWidth = source.width;
    let imageHeight = source.height;
    // 处理判断下当前图片裁切灰色区的高度和宽度，进而控制判断图片展示的大小，以免图片超出裁切区时点击确定会报错
    if (layout.width > layout.height - 144) {
      if (source.height > layout.height - 144) {
        imageHeight = layout.height - 144;
        imageWidth = (imageHeight / source.height) * source.width;
      }
    } else if (layout.width < layout.height - 144) {
      if (source.width > layout.width) {
        imageWidth = layout.width;
        imageHeight = (imageWidth / source.width) * source.height;
      }
    }
    this.setState({
      source,
      imageWidth,
      imageHeight,
      containerWidth: layout.width,
      containerHeight: layout.height - 144,
    });
  }

  // 确定裁剪
  pressConfirm = () => {
    console.log('evt22', Dimensions.get('window'));
    const {
      width, height, left, top,
    } = this.imgCrop.getCropData();
    const cropData = {
      offset: { x: left, y: top },
      size: { width, height },
    };
    console.log('cropData', cropData);
    this.imgCrop.crop().then((uri) => {
      // Image.getSize(uri, (w, h) => {
      //   console.log('iamge123', w, h);
      // });
      ImageEditor.cropImage(uri, cropData, this.success, this.error);
    });
  }

  // 裁剪之后的回调
  success = (uri) => {
    const {
      width, height,
    } = this.imgCrop.getCropData();
    const { croppedImage } = this.props;
    croppedImage(uri, width, height);
  }

  error = (err) => {
    console.log('success', err);
  }

  // 图片旋转
  rotateImg = (digit) => {
    this.imgCrop.rotate(digit);
  }

  pressCancel = () => {
    const { cancelCrop } = this.props;
    cancelCrop();
  }

  render() {
    const {
      source,
      imageWidth,
      imageHeight,
      containerWidth,
      containerHeight,
    } = this.state;
    // console.log('144', source, imageWidth, imageHeight);
    // const { source } = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.container} onLayout={this.onLayout}>
          <View style={[styles.toolBar]}>
            <TouchableOpacity style={styles.btn} onPress={this.pressCancel}>
              <Text style={styles.text}>X</Text>
            </TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.text}>裁剪</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={this.pressConfirm}>
              <Text style={styles.text}>√</Text>
            </TouchableOpacity>
          </View>
          {source && (
            <ImageCropper
              source={{ uri: source.uri }}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              containerWidth={containerWidth}
              containerHeight={containerHeight}
              ref={(crop) => { this.imgCrop = crop; }}
            />
          )}
          <View style={[styles.toolBar]}>
            <TouchableOpacity style={styles.btn} onPress={() => this.rotateImg(-90)}>
              <Text style={styles.text}>左旋</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this.rotateImg(90)}>
              <Text style={styles.text}>右旋</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
ImageCrop.propTypes = {
  source: PropTypes.any.isRequired,
  croppedImage: PropTypes.any.isRequired,
  cancelCrop: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
  },
  toolBar: {
    flexDirection: 'row',
    height: 72,
    justifyContent: 'space-evenly',
    backgroundColor: '#30bf6c',
  },
  btn: {
    width: 100,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
});
