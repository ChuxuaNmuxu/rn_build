import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
} from 'react-native';
import UploadImage from '../../components/UploadImage';
import ImageCrop from '../../components/ImageCrop';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
      showCropper: false,
      testUri: null,
      width: null,
      height: null,
    };
  }

  updateImage = (source) => {
    this.setState({
      source,
      showCropper: true,
    });
  }

  croppedImage = (uri, width, height) => {
    this.setState({
      showCropper: false,
      testUri: uri,
      width,
      height,
    });
  }

  cancelCrop = () => {
    this.setState({
      showCropper: false,
    });
  }

  render() {
    const {
      source, showCropper, testUri, width, height,
    } = this.state;
    return (
      <View style={styles.container}>
        <UploadImage updateImage={this.updateImage} />
        {testUri && <Image source={{ uri: testUri }} style={{ width, height }} />}
        {showCropper && (
        <ImageCrop
          source={source}
          croppedImage={this.croppedImage}
          cancelCrop={this.cancelCrop}
        />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    position: 'relative',
  },
});
