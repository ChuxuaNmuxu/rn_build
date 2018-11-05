// 主观题上传答案及客观题上传解答过程的组件
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View, Text,
} from 'react-native';
import styles from './AnswerCard.scss';
import I18nText from '../../../../components/I18nText';
import IconSet from '../../../../components/Icon';
import UploadImage from '../../../../components/UploadImage';

class UploadImgBefore extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // 上传图片的回调函数
  updateImage = (source) => {
    const { updateImage } = this.props;
    updateImage(source);
  }

  render() {
    const {
      type,
      answered,
    } = this.props;
    let subjective;
    if (type >= 10) {
      subjective = true;
    } else {
      subjective = false;
    }
    return (
      <View>
        {
          subjective
            ? (
              <View style={styles.uploadAreaStyle}>
                {/* 主观题上传解答过程区域 */}
                <View style={styles.img_container}>
                  <UploadImage
                    updateImage={this.updateImage}
                    style={styles.iconphoto_container}
                  >
                    <IconSet
                      name="iconphoto"
                      style={styles.iconphotoStyle}
                    />
                  </UploadImage>
                  <Text style={styles.txtStyle}>
                    <I18nText>
                    DoHomeworks.answerCard.toUpLoadNotice
                    </I18nText>
                    <I18nText style={styles.highColor}>
                    DoHomeworks.answerCard.shoudUploadNotice
                    </I18nText>
                  </Text>
                </View>
              </View>
            )
            : (
              <View>
                {/* 客观题上传解答过程区域,客观题未选择答案时不能上传图片 */}
                <UploadImage
                  updateImage={this.updateImage}
                  style={styles.objective_area}
                  answered={answered}
                >
                  <View style={[answered ? styles.photoCanClick_container : styles.photo_container]}>
                    <IconSet
                      name="iconphoto"
                      style={[answered ? styles.photoCanClick : styles.objective_photo]}
                    />
                  </View>
                  <View style={styles.text_container}>
                    <I18nText style={[answered ? styles.textCanClick : styles.objective_text]}>
                      DoHomeworks.answerCard.uploadImgAnswerNotice
                    </I18nText>
                  </View>
                </UploadImage>
              </View>
            )
        }
      </View>
    );
  }
}

UploadImgBefore.propTypes = {
  type: PropTypes.number.isRequired,
  answered: PropTypes.number, // 客观题是否作答了的标识--客观题必须选择了答案后才可以点击上传解答过程
  updateImage: PropTypes.func, // 上传图片后的回调函数
};

UploadImgBefore.defaultProps = {
  updateImage: () => {},
  answered: 0,
};


export default UploadImgBefore;
