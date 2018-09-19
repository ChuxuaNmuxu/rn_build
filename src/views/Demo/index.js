import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  // Text,
  ScrollView,
} from 'react-native';
// import Theme from '../../components/Theme';
// import Language from '../../components/Language';
import UploadImage from './UploadImage';
import ImageCrop from './ImageCrop';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    position: 'relative',
  },
});

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
    };
  }

  updateImage = (source) => {
    this.setState({ source });
  }

  render() {
    const { source } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          {/* <Theme /> */}
          {/* <Language /> */}
          <UploadImage updateImage={this.updateImage} />
        </ScrollView>
        {source && <ImageCrop imageWidth={500} imageHeight={500} source={source} />}
      </View>
    );
  }
}
