import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as Animatable from 'react-native-animatable';
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


  loadingRender=() => {
    const rotate = {
      from: {
        transform: [{ rotate: '0deg' }],
      },
      to: {
        transform: [{ rotate: '360deg' }],
      },
    };
    return (
      <Animatable.View
        animation={rotate}
        iterationCount="infinite"
        direction="normal"
        easing="linear"
      >
        <Svg height="72" width="72" source="imgLoading" fill="#fff" />
      </Animatable.View>
    );
  }

  viewerLoading=() => (
    <View style={Style.loadingRenasder}>
      {
        this.loadingRender()
      }
    </View>
  )


  renderHeader=() => {
    const { name } = this.props;
    return (
      <View style={Style.renderHeader}>
        <Text style={Style.leftText}>{name ? `作答人：${name}` : '正确答案'}</Text>
        <TouchableOpacity onPress={this._onClose} style={Style.close}>
          <Svg height="30" width="30" source="closeNoCircle" fill="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  renderIndicator = () => null

  render() {
    const { url, bigImgUrl, type } = this.props;
    const images = [];
    const imgurl = bigImgUrl || url;
    if (imgurl instanceof Array) {
      imgurl.map((u) => {
        images.push(
          {
            // Simplest usage.
            url: u,
            // You can pass props to <Image />.
            props: {
              // headers: ...
              // source: 'https://photo.tuchong.com/344025/f/375718249.jpg',
              style: {
                flex: 1,
                width: 500,
                height: 500,
              },
            },
          },
        );
      });
    }
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
            <ZommImage closeFn={this._onClose} url={imgurl} loadingRender={this.loadingRender} />
          ) : (
            <ImageViewer
              imageUrls={images}
              renderHeader={this.renderHeader}
              renderIndicator={this.renderIndicator}
              loadingRender={this.viewerLoading}
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
  url: PropTypes.any,
  bigImgUrl: PropTypes.any,
  type: PropTypes.string,
};

ImageViewerModal.defaultProps = {
  closeFn: () => null,
  name: '',
  // URL，bigImgUrl可数组可字符串，产品的设计技巧真高超
  url: '',
  bigImgUrl: '',
  type: 'rotate', // ordinary
};

export default ImageViewerModal;
