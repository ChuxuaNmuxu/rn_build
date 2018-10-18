// 成功上传解答过程的图片后展示的组件

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View, Image,
} from 'react-native';
import { CustomButton } from '../../../../components/Icon';
import styles from './AnswerCard.scss';

class UploadImgSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // 点击删除图片答案
  deleteImg = () => {
    const { deleteImg } = this.props;
    deleteImg();
  }

  render() {
    const { answerFileUrl, width, height } = this.props;
    return (
      <View style={styles.img_box}>
        <View
          style={styles.icon_box}
        >
          <CustomButton
            onPress={this.deleteImg}
            name="guanbi"
            style={styles.icon_close}
          />
        </View>
        <Image
          source={{ uri: answerFileUrl }}
          style={{ width: width || '80%', height: height || 300, maxWidth: '100%' }}
        />
      </View>
    );
  }
}

UploadImgSuccess.propTypes = {
  answerFileUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  deleteImg: PropTypes.func.isRequired,
};

export default UploadImgSuccess;
