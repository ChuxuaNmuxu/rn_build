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
      answerFileUrl,
      showDeleteIcon,
    } = this.props;
    const { imgWidth, imgHeight } = this.state;
    // console.log(67890, imgWidth, imgHeight);
    return (
      <View style={styles.img_box}>
        {
          showDeleteIcon && (
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
  answerFileUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  deleteImg: PropTypes.func,
  showDeleteIcon: PropTypes.bool, // 错题重做页面用来标识是否需要展示删除图片的icon
};

UploadImgSuccess.defaultProps = {
  showDeleteIcon: true, // 默认展示
  deleteImg: () => {},
};

export default UploadImgSuccess;
