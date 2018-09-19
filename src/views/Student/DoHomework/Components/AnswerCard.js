import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { ImagePicker } from 'antd-mobile-rn';
import styles from './AnswerCard.scss';
import Radio from '../../../../components/Radio';
import Checkbox from '../../../../components/Checkbox';
import RadioComponent from './RadioComponent';
import CheckboxComponent from './CheckboxComponent';
import LineTo from '../../../../components/LineTo';
import { CustomButton } from '../../../../components/Icon';
import DifficultLevelView from '../../../../components/DifficultLevelView';
import I18nText from '../../../../components/I18nText';
import ImagePickerStyle from './ImagePickerStyle';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

// 0:综合题 1:单选题 2:多选题 3:判断题 4:对应题, 10:填空题 11:主观题
class AnswerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionCount: 4,
      answer: null,
      answered: false, // 客观题是否选择了答案
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.currentSubjectId !== prevState.currentSubjectId) {
  //     return {
  //       currentSubjectId: nextProps.currentSubjectId,
  //     };
  //   }
  //   return null;
  // }

  // 单选题答案发生改变的函数
  handleRadioChange = (i) => {
    console.log(111, '当前单选题选择的答案是', i);
    this.setState({
      answered: true,
    });
  }

  // 多选题答案发生改变的函数
  handleMultiSelectChange = (obj) => {
    console.log(222, '当前多选题选择的答案是', obj);
    this.setState({
      answered: true,
    });
  }

  // 判断题答案发生改变的函数
  judgementChange = (i) => {
    console.log(333, '当前判断题选择的答案是', i);
    this.setState({
      answered: true,
    });
  }

  // 对应题答案发生改变的函数
  lineToChange = (obj) => {
    console.log(444, '当前对应题的答案是', obj);
    this.setState({
      answered: true,
    });
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

  // 选择图片
  uploadImgChange = () => {

  }

  render() {
    const { questions, mistakeReform } = this.props;
    const { optionCount, answer, answered } = this.state;
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
              handleRadioChange={this.handleRadioChange}
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
                handleMultiSelectChange={this.handleMultiSelectChange}
                multiSelectAnswer={answer}
              />
              )
            }
            {/* 判断: 选择错误时传给后台的应该为0，从后台拿到的也为0，但是value设置为0时拿到的时‘group’而非0 */}
            {
              questions.type === 3 && (
                <RadioGroup
                  value={answer}
                  onChange={this.judgementChange}
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
                    optionSize={optionCount}
                    onChange={this.lineToChange}
                  />
                </View>
              )
            }
            {/* 填空题/主观题 */}
            {
            (questions.type === 10 || questions.type === 11) && (
              <View style={styles.uploadAreaStyle}>
                <View style={styles.img_container}>
                  <View style={styles.iconphoto_container}>
                    <CustomButton name="iconphoto" style={styles.iconphotoStyle} />
                  </View>
                  <Text style={styles.txtStyle}>
                    <I18nText>
                    DoHomeworks.answerCard.toUpLoadNotice
                    </I18nText>
                    <I18nText style={styles.highColor}>
                    DoHomeworks.answerCard.shoudUploadNotice
                    </I18nText>
                  </Text>
                </View>
                <View style={styles.imgPic_container}>
                  <ImagePicker
                    styles={ImagePickerStyle}
                    onChange={this.uploadImgChange}
                    accept=".jpeg, .jpg, .png"
                  />
                </View>
              </View>
            )
            }
          </View>
          {
            (questions.type !== 10 && questions.type !== 11) && (
              <View style={styles.objective_area}>
                {/* 客观题上传解答过程区域 */}
                <View style={[answered ? styles.photoCanClick_container : styles.photo_container]}>
                  <CustomButton name="iconphoto" style={[answered ? styles.photoCanClick : styles.objective_photo]} />
                </View>
                <View style={styles.text_container}>
                  <I18nText style={[answered ? styles.textCanClick : styles.objective_text]}>
                    DoHomeworks.answerCard.uploadImgAnswerNotice
                  </I18nText>
                </View>
                {
                  answered && (
                  <View style={styles.objectiveImg_container}>
                    <ImagePicker
                      styles={ImagePickerStyle}
                      onChange={this.uploadImgChange}
                      accept=".jpeg, .jpg, .png"
                    />
                  </View>
                  )
                }
              </View>
            )
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
      </View>
    );
  }
}

AnswerCard.defaultProps = {
  mistakeReform: false, // 错题重做页面调用时用来标识调用方的
};

AnswerCard.propTypes = {
  questions: PropTypes.object.isRequired,
  mistakeReform: PropTypes.bool, // 错题重做页面调用时用来标识调用方的
  handleDifficultLevel: PropTypes.func.isRequired, // 难易程度发生改变的函数
};

export default AnswerCard;
