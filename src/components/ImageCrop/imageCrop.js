import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  // Image,
  Text,
  StyleSheet,
  ImageEditor,
  // Dimensions,
  Modal,
} from 'react-native';
import { Slider } from 'antd-mobile-rn';
import IconSet from '../Icon';
import ImageCropper from './imageCropper';
import OrderButtons from '../OrderButtons';

export default class ImageCrop extends React.Component {
  constructor(props) {
    super(props);
    this.oldValue = 0;
    this.clip = false;
    this.state = {
      value: 0,
      source: null,
      imageWidth: null,
      imageHeight: null,
      containerWidth: null,
      containerHeight: null,
      multipleStatus: true,
    };
  }

  // 设置裁剪区容器和图片大小
  onLayout = (evt) => {
    const { layout } = evt.nativeEvent;
    const { source } = this.props;
    let imageWidth = source.width;
    let imageHeight = source.height;
    // 处理判断下当前图片裁切灰色区的高度和宽度，进而控制判断图片展示的大小，以免图片超出裁切区时点击确定会报错
    if (source.height > layout.height - 122) {
      imageHeight = layout.height - 122;
      imageWidth = (imageHeight / source.height) * source.width;
    } else if (source.width > layout.width) {
      imageWidth = layout.width;
      imageHeight = (imageWidth / source.width) * source.height;
    }
    this.setState({
      source,
      imageWidth,
      imageHeight,
      containerWidth: layout.width,
      containerHeight: layout.height - 122,
    });
  }

  // 确定裁剪
  pressConfirm = () => {
    if (!this.clip) {
      this.clip = true;
      const { containerWidth, containerHeight } = this.state;
      const {
        width, height, left, top,
      } = this.imgCrop.getCropData();
      let wid = width;
      let heg = height;
      if (width + left > containerWidth) {
        wid = containerWidth - left;
      }
      if (height + top > containerHeight) {
        heg = containerHeight - top;
      }
      const cropData = {
        offset: { x: left, y: top },
        size: { width: wid, height: heg },
      };
      this.imgCrop.crop().then((uri) => {
        // Image.getSize(uri, (w, h) => {
        //   console.log('iamge123', w, h);
        // });
        ImageEditor.cropImage(uri, cropData, this.success, this.error);
      });
    }
  }

  // 裁剪之后的回调
  success = (uri) => {
    const {
      width, height,
    } = this.imgCrop.getCropData();
    // this.imgCrop.setCropData({
    //   top: 100, left: 100, width: 100, height: 100,
    // });
    const { croppedImage } = this.props;
    croppedImage(uri, width, height);
  }

  error = (err) => {
    console.log('err', err);
  }

  // 图片旋转
  rotateImg = (digit) => {
    this.imgCrop.rotate(digit);
  }

  resetRotate = (digit) => {
    this.setState({ value: 0 }, () => this.imgCrop.rotate(digit));
  }

  // 微调旋转
  handleChange = (value) => {
    if (value === this.oldValue) return;
    const val = value - this.oldValue;
    this.oldValue = value;

    this.setState({ value }, () => this.imgCrop.rotate(val));
  }

  pressCancel = () => {
    const { cancelCrop } = this.props;
    cancelCrop();
  }

  render() {
    const {
      value,
      source,
      imageWidth,
      imageHeight,
      containerWidth,
      containerHeight,
      multipleStatus,
    } = this.state;
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
          <View style={[styles.toolBar, { backgroundColor: '#30bf6c' }]}>
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
          {
            multipleStatus
              ? (
                <View style={[styles.bottomBar, { backgroundColor: '#fff' }]}>
                  <OrderButtons />
                </View>
              )
              : (
                <View style={[styles.bottomBar, { backgroundColor: '#fff' }]}>
                  <TouchableOpacity style={styles.bottomBtn} onPress={() => this.rotateImg(90)}>
                    <View><IconSet style={{ color: '#30bf6c', fontSize: 20 }} name="xuanzhuan" /></View>
                  </TouchableOpacity>
                  <View style={styles.slider}>
                    <Slider
                      step={4.5}
                      defaultValue={0}
                      value={value}
                      min={-45}
                      max={45}
                      maximumTrackTintColor="#30bf6c"
                      minimumTrackTintColor="#ffc14d"
                      onChange={val => this.handleChange(val)}
                    />
                    <Text style={styles.slideText}>{value}</Text>
                  </View>
                  <TouchableOpacity style={styles.bottomBtn} onPress={() => this.resetRotate(0)}>
                    <Text style={[styles.text, { color: '#30bf6c' }]}>还原</Text>
                  </TouchableOpacity>
                </View>
              )
          }
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
    height: 50,
    justifyContent: 'space-between',
  },
  btn: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    height: 72,
    justifyContent: 'space-between',
  },
  bottomBtn: {
    width: 100,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 72,
    justifyContent: 'center',
  },
  slideText: {
    textAlign: 'center',
    fontSize: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
});
