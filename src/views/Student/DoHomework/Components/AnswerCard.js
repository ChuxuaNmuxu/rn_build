import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import { PropTypes } from 'prop-types';
import ImageCrop from '../../../../components/ImageCrop';
import styles from './AnswerCard.scss';
import Radio from '../../../../components/Radio';
import Checkbox from '../../../../components/Checkbox';
import RadioComponent from './RadioComponent';
import CheckboxComponent from './CheckboxComponent';
import LineTo from '../../../../components/LineTo';
import DifficultLevelView from '../../../../components/DifficultLevelView';
import UploadImgBefore from './UploadImgBefore';
import UploadImgSuccess from './UploadImgSuccess';
import I18nText from '../../../../components/I18nText';
import { parseCorrespondingValue } from '../../../../components/LineTo/utils';
import { ModalApi } from '../../../../components/Modal';


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

// 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题
class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: null,
      showCropper: false,
      width: null,
      height: null,
      fileName: null, // 图片名
    };
    this.croppedImageStatus = false; // 是否点击了确定裁剪图片
    this.loadingData = {
      animationType: 'loading',
      bottomTips: '图片加载中...',
      maskClosable: false,
    };
  }

  // 图片上传时显示loading状态
  componentDidUpdate = () => {
    const { imgLoading } = this.props;
    if (this.croppedImageStatus && imgLoading) {
      // console.log(80000000000, 'componentDidUpdate---onOppen');
      ModalApi.onOppen('AnimationsModal', this.loadingData);
    }
    if (this.croppedImageStatus && !imgLoading) {
      // console.log(9000000000000, 'componentDidUpdate---onClose');
      this.croppedImageStatus = false;
      ModalApi.onClose();
    }
  }

  // 单选题、多选、判断、对应答案发生改变的函数
  handleToClickRadio = (i) => {
    const { handleToClickRadio, questions: { id, type } } = this.props;
    let answer = i;
    if (type === 2) {
      // 数组转字符串
      answer = i.join('');
    }
    if (type === 3 && i === -1) {
      // 判断题选择错误时拿到的i为-1，要转为0给接口
      answer = 0;
    }
    // 对客观题答案进行处理再传给接口
    if (handleToClickRadio) handleToClickRadio(id, answer);
  }

  // 难易程度选项发生改变的函数
  difficultLevelChange = (a) => {
    // console.log(555, '当前选择的难易程度是', a);
    const { handleDifficultLevel, questions } = this.props;
    handleDifficultLevel(questions.id, a);
  }

  // 不是很懂
  handleCheckboxChange = (e) => {
    const { handleCheckboxChange, questions } = this.props;
    handleCheckboxChange(questions.id, e);
  }

  // 上传图片后的回调函数
  updateImage = (source) => {
    this.setState({
      source,
      fileName: source.fileName,
      showCropper: true,
    });
  }

  // 确定裁剪图片
  croppedImage = (uri, width, height) => {
    const { questions } = this.props;
    const { fileName } = this.state;
    const { handlePreviewImage } = this.props;
    handlePreviewImage(questions.id, uri, fileName);
    this.croppedImageStatus = true;
    this.setState({
      showCropper: false,
      width,
      height,
    });
  }

  // 取消裁剪图片，不上传答案
  cancelCrop = () => {
    this.setState({
      showCropper: false,
    });
  }

  // 删除图片答案
  deleteImg = () => {
    const { deleteImg, questions } = this.props;
    deleteImg(questions.id);
    this.setState({
      width: null,
      height: null,
    });
  }

  renderUpdateImg = () => {
    let UpdateImgDiv;
    const {
      questions: {
        type,
        answered,
        answerFileUrl,
      },
      mistakeReform,
    } = this.props;
    const {
      width, height,
    } = this.state;
    // 客观题的上传解答过程，错题重做页面调用时不显示
    const hasImgUrl = answerFileUrl && answerFileUrl.length; // 是否有图片答案
    if ((mistakeReform && type > 4) || !mistakeReform) {
      // UploadImgBefore必须在一开始就渲染出来，否则会出现删除图片答案后再点击上传图片区域时不弹出选择图片的文件选择，此时只能让页面发生setState后才能正常弹出
      UpdateImgDiv = (
        <View>
          {
            hasImgUrl
            && (
            <UploadImgSuccess
              answerFileUrl={answerFileUrl}
              width={parseInt(width)}
              height={parseInt(height)}
              deleteImg={this.deleteImg}
            />
            )
          }
          <View style={[hasImgUrl ? styles.notToShow : styles.needToshow]}>
            <UploadImgBefore
              type={type}
              updateImage={this.updateImage}
              answered={answered}
            />
          </View>
        </View>
      );
    }
    return UpdateImgDiv;
  }

  // 图片裁剪模块
  renderCropper = source => (
    <ImageCrop
      source={source}
      croppedImage={this.croppedImage}
      cancelCrop={this.cancelCrop}
    />
  )

  render() {
    const { questions, mistakeReform } = this.props;
    const {
      source, showCropper,
    } = this.state;
    const { studentAnswer } = questions;
    return (
      <View style={styles.answerCard_container}>
        <View style={styles.question_title}>
          <I18nText style={styles.question_title_txt}>
            DoHomeworks.answerCard.toAnswer
          </I18nText>
        </View>
        <View style={styles.answer_area}>
          <View style={styles.answer_content}>
            {/* 单选 */}
            {questions.type === 1 && (
            <RadioComponent
              options={questions.optionCount}
              childStyle={styles.radioStyle}
              handleRadioChange={this.handleToClickRadio}
              radioAnswer={studentAnswer}
            />
            )
            }
            {/* 多选 */}
            {
              questions.type === 2 && (
              <CheckboxComponent
                options={questions.optionCount}
                childStyle={styles.radioStyle}
                handleMultiSelectChange={this.handleToClickRadio}
                multiSelectAnswer={studentAnswer}
              />
              )
            }
            {/* 判断: 选择错误时传给后台的应该为0，从后台拿到的也为0，但是value设置为0时拿到的时‘group’而非0 */}
            {
              questions.type === 3 && (
                <RadioGroup
                  value={studentAnswer && (parseInt(studentAnswer) === 1 ? 1 : -1)}
                  onChange={this.handleToClickRadio}
                  style={styles.radio_wrapper}
                  iconWrapStyle={styles.radioStyle}
                  checkedIconWrapStyle={styles.checkedIconWrapStyle}
                  textStyle={styles.radioTextStyle}
                  checkedTextStyle={styles.checkedRadioTextStyle}
                >
                  <RadioButton value={1}>√</RadioButton>
                  <RadioButton value={-1}>×</RadioButton>
                </RadioGroup>
              )
            }
            {/* 对应 */}
            {
              questions.type === 4 && (
                <View style={styles.lineToStyle}>
                  <LineTo
                    value={parseCorrespondingValue(studentAnswer)}
                    optionSize={questions.optionCount}
                    onChange={this.handleToClickRadio}
                  />
                </View>
              )
            }
          </View>
          {
            this.renderUpdateImg()
          }
        </View>
        {/* 难易程度---不默认且必选，错题重做页面调用时不显示 */}
        {
          !mistakeReform
          && (
          <DifficultLevelView
            onChange={this.difficultLevelChange}
            defaultValue={questions.difficultyLevel}
          />
          )
        }
        {/* 不是很懂---错题重做页面调用时不显示 */}
        {
          !mistakeReform && (
          <Checkbox
            checked={questions.needsExplain === 1}
            onChange={this.handleCheckboxChange}
            style={styles.notUnderstood}
            iconWrapStyle={styles.iconStyle}
            TextStyle={styles.notUnderstood_text}
            checkedTextStyle={styles.notUnderstood_text}
          >
            <I18nText>
              DoHomeworks.answerCard.notUnderstood
            </I18nText>
          </Checkbox>
          )
        }
        {/* 图片裁剪模块 */}
        {
          showCropper && this.renderCropper(source)
        }
      </View>
    );
  }
}

AnswerCard.propTypes = {
  questions: PropTypes.object.isRequired,
  mistakeReform: PropTypes.bool, // 错题重做页面调用时用来标识调用方的
  imgLoading: PropTypes.bool, // 图片上传loading状态
  handleDifficultLevel: PropTypes.func, // 难易程度发生改变的函数
  handleToClickRadio: PropTypes.func, // 单选题的回调函数
  handlePreviewImage: PropTypes.func, // 上传图片后的回调函数
  deleteImg: PropTypes.func, // 删除图片答案的函数
  handleCheckboxChange: PropTypes.func, // 改变不是很懂，请老师解答的复选框
};

AnswerCard.defaultProps = {
  mistakeReform: false,
  imgLoading: false,
  handleToClickRadio: () => {},
  handleDifficultLevel: () => {},
  handlePreviewImage: () => {},
  handleCheckboxChange: () => {},
  deleteImg: () => {},
};


export default AnswerCard;
