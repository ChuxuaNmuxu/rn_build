import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  // Text,
  // ScrollView,
  // Image,
} from 'react-native';
// import Theme from '../../components/Theme';
// import Language from '../../components/Language';
// import UploadImage from './UploadImage';
// import ImageCrop from './ImageCrop';
import User from './test';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // source: null,
      // showCropper: false,
    };
  }

  // updateImage = (source) => {
  // Image.getSize(source.uri, (w, h) => {
  //   console.log('iamge', w, h);
  // });
  // this.setState({
  //   source,
  //   showCropper: true,
  // });
  // }

  render() {
    // const {
    //   source, showCropper,
    // } = this.state;
    return (
      <View style={styles.container} onLayout={this.layout}>
        {/* <ScrollView style={styles.container}> */}
        {/* <Theme /> */}
        {/* <Language /> */}
        {/* <UploadImage updateImage={this.updateImage} /> */}
        {/* </ScrollView> */}
        {/* {showCropper && <ImageCrop source={source} />} */}
        <User />
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
