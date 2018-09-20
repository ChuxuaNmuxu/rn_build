import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import ImageCropper from './imageCropper';

export default class ImageCrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
      iamgeWidth: 0,
      imageHeight: 0,
    };
  }

  layout = (evt) => {
    const { layout } = evt.nativeEvent;
    const { source } = this.props;
    console.log('evt11', layout);
    this.setState({
      iamgeWidth: layout.width * 0.7,
      imageHeight: layout.height * 0.7,
      source,
    });
  }

  pressBtn = () => {
    console.log('press');
    this.imgCrop.crop().then((uri) => {
      console.log('iamge11', uri);
      Image.getSize(uri, (w, h) => {
        console.log('iamge123', w, h);
      });
    });
  }

  render() {
    const { source, iamgeWidth, imageHeight } = this.state;
    console.log('144', source, iamgeWidth, imageHeight);
    // const { source } = this.props;
    return (
      <View style={styles.container} onLayout={this.layout}>
        <TouchableOpacity style={[styles.toolBar]} onPress={this.pressBtn}>
          <Text style={styles.text}>aaa</Text>
        </TouchableOpacity>
        {source && (
        <ImageCropper
          imageWidth={iamgeWidth}
          imageHeight={imageHeight}
          source={source}
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
    height: 100,
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
});
