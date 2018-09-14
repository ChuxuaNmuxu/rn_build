import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  // Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import CIcon from '../Icon';
import Modal, { ModalApi } from '../Modal';
import styles from './ThumbnailImage.scss';

class ThumbnailImage extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    const initState = {
      studentName: '',
      url: '', // 最好https，ios兼容问题
      imageViewType: 'rotate', // 'ordinary' || 'rotate',
      ...props.option,
    };
    console.log(initState);
    this.state = initState;
  }

  onClick = () => {
    const option = this.state;
    ModalApi.onOppen('ImageViewer', option);
  }

  // 根据条件渲染Icon
  _renderIcon = (url) => {
    if (url && url !== '') {
      return (
        <TouchableOpacity
          onPress={() => this.onClick()}
        >
          <Image
            style={{ height: '100%' }}
            source={{ uri: `${url}` }}
          />
          <View style={styles.fangdajing}>
            <CIcon name="fangdajing" size={30} color="white" />
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const { url } = this.state;
    return (
      <View>
        <Modal />
        <View style={styles.wrapper}>
          { this._renderIcon(url) }
        </View>
      </View>
    );
  }
}

ThumbnailImage.propTypes = {
  // 打开图片的配置（结合胜文那个傻吊的文档）
  option: PropTypes.object,
};

ThumbnailImage.defaultProps = {
  option: {},
};

export default ThumbnailImage;
