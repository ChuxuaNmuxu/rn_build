// 主观题上传答案及客观题上传解答过程的组件
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View, TouchableOpacity, Text,
} from 'react-native';
import styles from './AnswerCard.scss';
import I18nText from '../../../../components/I18nText';
import { CustomButton } from '../../../../components/Icon';
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
                  <TouchableOpacity
                    // 没办法传组件进去调用 selectPhotoTapped，只能通过这种方式 (为了让外面的圆点击也有效果)
                    onPress={this.UploadImageRef && this.UploadImageRef.selectPhotoTapped}
                  >
                    <View style={styles.iconphoto_container}>
                      <View style={styles.container}>
                        {/* <ScrollView> */}
                        <UploadImage
                          ref={(node) => { this.UploadImageRef = node; }}
                          CustomComponent={() => (
                            <CustomButton
                              // 没办法传组件进去调用 selectPhotoTapped，只能通过这种方式
                              onPress={this.UploadImageRef && this.UploadImageRef.selectPhotoTapped}
                              name="iconphoto"
                              style={styles.iconphotoStyle}
                            />
                          )}
                          updateImage={this.updateImage}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
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
                {/* 客观题上传解答过程区域 */}
                <TouchableOpacity
                  activeOpacity={answered ? 0.2 : 1}
                  style={styles.objective_area}
                  onPress={
                    answered
                      ? (this.objectiveUploadImageRef && this.objectiveUploadImageRef.selectPhotoTapped)
                      : null
                  }
                >
                  <View style={[answered ? styles.photoCanClick_container : styles.photo_container]}>
                    <View style={styles.container}>
                      <UploadImage
                        ref={(node) => { this.objectiveUploadImageRef = node; }}
                        CustomComponent={() => (
                          <CustomButton
                            onPress={
                              this.objectiveUploadImageRef && this.objectiveUploadImageRef.selectPhotoTapped
                            }
                            name="iconphoto"
                            style={[answered ? styles.photoCanClick : styles.objective_photo]}
                          />
                        )}
                        updateImage={this.updateImage}
                      />
                    </View>
                  </View>
                  <View style={styles.text_container}>
                    <I18nText style={[answered ? styles.textCanClick : styles.objective_text]}>
                      DoHomeworks.answerCard.uploadImgAnswerNotice
                    </I18nText>
                  </View>
                </TouchableOpacity>
              </View>
            )
        }
      </View>
    );
  }
}

UploadImgBefore.propTypes = {
  type: PropTypes.number.isRequired,
  answered: PropTypes.number, // 客观题是否作答了的标识
  updateImage: PropTypes.func, // 上传图片后的回调函数
};

UploadImgBefore.defaultProps = {
  updateImage: () => {},
  answered: 0,
};


export default UploadImgBefore;
