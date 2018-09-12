import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ZommImage from './ZoomViewer';
import Svg from '../../Svg';
import Style from './ImageViewer.scss';

class ImageViewerModal extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     deg: 0,
  //   };
  // }

  _onClose=() => {
    const { closeFn } = this.props;
    closeFn();
  }

  renderIndicator = () => null

  renderHeader=() => {
    const { name } = this.props;
    return (
      <View style={Style.renderHeader}>
        <Text style={Style.leftText}>作答人：{name}</Text>
        <TouchableOpacity onPress={this._onClose} style={Style.close}>
          <Svg height="30" width="30" source="closeNoCircle" fill="#fff" />
        </TouchableOpacity>
      </View>
    );
  }


  render() {
    const { url, type } = this.props;
    const images = [{
      // Simplest usage.
      url,
      // You can pass props to <Image />.
      props: {
        // headers: ...
        // source: 'https://photo.tuchong.com/344025/f/375718249.jpg',
        style: {
          flex: 1,
        },
      },
    }];
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}
      >
        {/* {
        type === 'rotate' ? (
          <View style={Style.Rotate}>
            <TouchableOpacity style={Style.Btn} onPress={this.onLeftClick}>
              <Svg height="30" width="30" source="closeNoCircle" fill="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={Style.Btn} onPress={this.onRightClick}>
              <Svg height="30" width="30" source="closeNoCircle" fill="#fff" />
            </TouchableOpacity>
          </View>
        ) : null
      } */}
        {
          type === 'rotate' ? (
          //   <View style={{ flex: 1 }}>
          //     <ImageViewer
          //       imageUrls={images}
          // // renderImage={this.renderImage}
          //       // style={{  }}
          //       // index={null}
          //       renderIndicator={this.renderIndicator}
          //       onClick={this._onClose}

          //     />
          //   </View>
            <ZommImage closeFn={this._onClose} url={url} />
          ) : (
            <ImageViewer
              imageUrls={images}
              renderHeader={this.renderHeader}
              renderIndicator={this.renderIndicator}
              style={{ flex: 1 }}
            />
          )
        }

      </View>
    );
  }
}

ImageViewerModal.propTypes = {
  closeFn: PropTypes.func,
  name: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
};

ImageViewerModal.defaultProps = {
  closeFn: () => null,
  name: '',
  url: '',
  type: 'rotate', // ordinary
};

export default ImageViewerModal;
