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
      imgWidth: props.width,
      imgHeight: props.height,
    };
  }

  componentDidMount() {
    // 获取网络图片的宽高赋值给图片
    const { answerFileUrl } = this.props;
    Image.getSize(answerFileUrl, (w, h) => {
      this.setState({
        imgWidth: w,
        imgHeight: h,
      });
    });
  }

  // 点击删除图片答案
  deleteImg = () => {
    const { deleteImg } = this.props;
    deleteImg();
  }

  render() {
    const {
      answerFileUrl, mistakeReform,
    } = this.props;
    const { imgWidth, imgHeight } = this.state;
    // console.log(67890, imgWidth, imgHeight);
    return (
      <View style={styles.img_box}>
        {/* 错题重做页面不需要关闭按钮去删除图片答案 */}
        {
        !mistakeReform && (
        <View
          style={styles.icon_box}
        >
          <CustomButton
            onPress={this.deleteImg}
            name="guanbi"
            style={styles.icon_close}
          />
        </View>
        )
      }
        <Image
          source={{ uri: answerFileUrl }}
          style={{ width: imgWidth, height: imgHeight, maxWidth: '100%' }}
        />
      </View>
    );
  }
}

UploadImgSuccess.propTypes = {
  mistakeReform: PropTypes.bool, // 错题重做页面调用时用来标识调用方的
  answerFileUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  deleteImg: PropTypes.func,
};

UploadImgSuccess.defaultProps = {
  mistakeReform: false,
  deleteImg: () => {},
};

export default UploadImgSuccess;
