import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import styles from './uploadImage.scss';

// updateImage 回调
export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.isPrevent = false;
    this.state = {
    };
  }

  selectPhotoTapped = () => {
    if (!this.isPrevent) {
      this.isPrevent = true;
      this.selectPhotoTappedFn();
      setTimeout(() => {
        this.isPrevent = false;
      }, 1000);
    }
  }

  selectPhotoTappedFn = () => {
    // console.log(789, '点击到了');
    const option = {
      title: '选择图片',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '图库',
      // customButtons: [
      //   { name: 'fb', title: 'Choose Photo from Facebook' },
      // ],
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 1,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
      },
    };
    const { updateImage, options } = this.props;
    const opt = Object.assign({}, option, options);
    ImagePicker.showImagePicker(opt, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        updateImage(response);
      }
    });
  }

  render() {
    const { style, children, answered } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={answered ? 0.2 : 1}
        onPress={answered ? this.selectPhotoTapped : null}
      >
        <View style={style}>
          {
            children || <View><Text>选择照片</Text></View>
          }
        </View>
      </TouchableOpacity>
    );
  }
}

UploadImage.propTypes = {
  updateImage: PropTypes.func,
  options: PropTypes.object,
  children: PropTypes.any,
  answered: PropTypes.number, // 客观题必须要选择答案后点击此组件才能上传图片，默认为1,可上传图片状态
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

UploadImage.defaultProps = {
  options: {},
  updateImage: () => { console.log('上传了'); },
  children: null,
  style: null,
  answered: 1,
};
