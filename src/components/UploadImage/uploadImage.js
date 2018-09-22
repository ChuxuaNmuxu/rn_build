import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Text,
  // Image,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import styles from './uploadImage.scss';

// updateImage 回调
export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
    };
  }

  selectPhotoTapped = () => {
    const options = {
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
    const { updateImage } = this.props;
    ImagePicker.showImagePicker(options, (response) => {
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
    const { source } = this.state;
    console.log('image', source);
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.selectPhotoTapped}>
          {/* <View>
            { source === null ? <Text>选择照片</Text> : <Image style={styles.avatar} source={source} />}
          </View> */}
          <View><Text>选择照片</Text></View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    paddingBottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});

UploadImage.propTypes = {
  updateImage: PropTypes.func.isRequired,
};
