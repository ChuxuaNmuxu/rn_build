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


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

// 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题
class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionCount: 4,
      answered: false, // 客观题是否选择了答案
      source: null,
      showCropper: false,
      testUri: null,
      width: null,
      height: null,
    };
  }

  // 单选题、多选、判断、对应答案发生改变的函数
  handleToClickRadio = (i) => {
    const { handleToClickRadio, questions: { id, type } } = this.props;
    this.setState({
      answered: true,
    });
    let answer = i;
    if (type === 2) {
      // 数组转字符串
      answer = i.join('');
    }
    // 对客观题答案进行处理再传给接口
    if (handleToClickRadio) handleToClickRadio(id, answer);
  }

  // 难易程度选项发生改变的函数
  difficultLevelChange = (a) => {
    // console.log(555, '当前选择的难易程度是', a);
    const { handleDifficultLevel, questions } = this.props;
    handleDifficultLevel(a, questions.number);
  }

  // 不是很懂
  handleCheckboxChange = (a) => {
    console.log(666, '当前是否选择了不是很懂', a);
  }

  // 上传图片后的回调函数
  updateImage = (source) => {
    const { updateImage } = this.props;
    if (updateImage) updateImage(source);
    this.setState({
      source,
      showCropper: true,
    });
  }

  // 确定裁剪图片
  croppedImage = (uri, width, height) => {
    const { showLoadingFun } = this.props;
    showLoadingFun();
    this.setState({
      showCropper: false,
      testUri: uri,
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
      testUri: null,
      width: null,
      height: null,
    });
  }

  renderUpdateImg = () => {
    let UpdateImgDiv;
    const {
      questions: {
        type,
      },
      mistakeReform,
    } = this.props;
    const {
      testUri, width, height, answered,
    } = this.state;
    // 客观题的上传解答过程，错题重做页面调用时不显示
    if ((mistakeReform && type > 4) || !mistakeReform) {
      if (testUri) {
        UpdateImgDiv = (
          <UploadImgSuccess
            answerFileUrl={testUri}
            width={parseInt(width)}
            height={parseInt(height)}
            deleteImg={this.deleteImg}
          />
        );
      } else {
        UpdateImgDiv = (
          <UploadImgBefore
            type={type}
            updateImage={this.updateImage}
            answered={answered}
          />
        );
      }
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
      optionCount,
      source, showCropper,
    } = this.state;
    const { answer } = questions;
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
              options={optionCount}
              childStyle={styles.radioStyle}
              handleRadioChange={this.handleToClickRadio}
              radioAnswer={answer}
            />
            )
            }
            {/* 多选 */}
            {
              questions.type === 2 && (
              <CheckboxComponent
                options={optionCount}
                childStyle={styles.radioStyle}
                handleMultiSelectChange={this.handleToClickRadio}
                multiSelectAnswer={answer}
              />
              )
            }
            {/* 判断: 选择错误时传给后台的应该为0，从后台拿到的也为0，但是value设置为0时拿到的时‘group’而非0 */}
            {
              questions.type === 3 && (
                <RadioGroup
                  value={parseInt(answer)}
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
                    value={parseCorrespondingValue(answer)}
                    optionSize={optionCount}
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
          !mistakeReform && <DifficultLevelView onChange={this.difficultLevelChange} />
        }
        {/* 不是很懂---错题重做页面调用时不显示 */}
        {
          !mistakeReform && (
          <Checkbox
            // checked={checkboxDefaultChecked === 1}
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
  handleDifficultLevel: PropTypes.func, // 难易程度发生改变的函数
  handleToClickRadio: PropTypes.func, // 单选题的回调函数
  updateImage: PropTypes.func, // 上传图片后的回调函数
  deleteImg: PropTypes.func, // 删除图片答案的函数
  showLoadingFun: PropTypes.func, // 显示正在loading状态的函数
};

AnswerCard.defaultProps = {
  mistakeReform: false,
  handleToClickRadio: () => {},
  handleDifficultLevel: () => {},
  updateImage: () => {},
  deleteImg: () => {},
  showLoadingFun: () => {},
};


export default AnswerCard;
