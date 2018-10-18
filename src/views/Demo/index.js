import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  // Text,
  ScrollView,
  Image,
} from 'react-native';
// import Theme from '../../components/Theme';
// import Language from '../../components/Language';
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
    // console.log('7777', NativeModules.RNViewShot);
    const {
      source, showCropper, testUri, width, height,
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {/* <Theme /> */}
          {/* <Language /> */}
          <UploadImage updateImage={this.updateImage} />
          {testUri && <Image source={{ uri: testUri }} style={{ width, height }} />}
        </ScrollView>
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
