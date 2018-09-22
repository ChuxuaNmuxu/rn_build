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
} from 'react-native';
import ImageCropper from './imageCropper';
// import { adaptiveRotation } from '../../../utils/resolution';

export default class ImageCrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
      iamgeWidth: null,
      imageHeight: null,
      containerWidth: null,
      containerHeight: null,
    };
  }

  onLayout = (evt) => {
    const { layout } = evt.nativeEvent;
    const { source } = this.props;
    this.setState({
      source,
      iamgeWidth: source.width,
      imageHeight: source.height,
      containerWidth: layout.width,
      containerHeight: layout.height - 200,
    });
  }

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
    // 裁剪之后的图片会放大1.125倍
    this.imgCrop.crop().then((uri) => {
      // Image.getSize(uri, (w, h) => {
      //   console.log('iamge123', w, h);
      // });
      ImageEditor.cropImage(uri, cropData, this.success, this.error);
    });
    // this.imgCrop.rotate(45);
  }

  success = (uri) => {
    console.log('success', uri);
    // Image.getSize(uri, (w, h) => console.log(129, w, h));
    const {
      width, height,
    } = this.imgCrop.getCropData();
    const { croppedImage } = this.props;
    croppedImage(uri, width, height);
  }

  error = (err) => {
    console.log('success', err);
  }

  pressCancel = () => {
    const { cancelCrop } = this.props;
    cancelCrop();
  }

  render() {
    const {
      source,
      iamgeWidth,
      imageHeight,
      containerWidth,
      containerHeight,
    } = this.state;
    // console.log('144', source, iamgeWidth, imageHeight);
    // const { source } = this.props;
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <View style={[styles.toolBar]}>
          <TouchableOpacity style={styles.btn} onPress={this.pressCancel}>
            <Text style={styles.text}>cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.pressConfirm}>
            <Text style={styles.text}>confirm</Text>
          </TouchableOpacity>
        </View>
        {source && (
        <ImageCropper
          source={{ uri: source.uri }}
          imageWidth={iamgeWidth}
          imageHeight={imageHeight}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          ref={(crop) => { this.imgCrop = crop; }}
        />
        )}
        <TouchableOpacity style={[styles.toolBar]}>
          <Text style={styles.text}>bbb</Text>
        </TouchableOpacity>
      </View>
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
    height: 100,
    justifyContent: 'space-evenly',
    backgroundColor: 'blue',
  },
  btn: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
});
