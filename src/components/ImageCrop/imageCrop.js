import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  // Image,
  Text,
  StyleSheet,
  ImageEditor,
  // Dimensions,
  Modal,
} from 'react-native';
import R from 'ramda';
import { Slider } from 'antd-mobile-rn';
import IconSet from '../Icon';
import ImageCropper from './imageCropper';
import OrderButtons from '../OrderButtons';
import SelectModal from '../SelectModal';

export default class ImageCrop extends React.Component {
  constructor(props) {
    super(props);
    this.oldValue = 0;
    this.clip = false;
    this.state = {
      randomNum: Math.random(), // 随机数
      value: 0,
      source: null,
      imageWidth: null,
      imageHeight: null,
      containerWidth: null,
      containerHeight: null,
      unAnswerSubjectiveList: props.unAnswerSubjectiveList || [], // 已查看且未作答的主观题列表
      isMultipleSelect: props.isMultipleSelect || false, // 用来判断当前题目是否需要展示：应用于本题 应用于多题 的选择模态层
      currentQid: props.currentQid, // 当前裁切的题目id
      multipleStatus: false, // 当前是否处于多题裁切状态
      selectModalStatus: false, // 选择模态框的显隐
      initCropBox: {}, // 初始截图框的大小
    };
  }

  // 设置裁剪区容器和图片大小
  onLayout = (evt) => {
    const { layout } = evt.nativeEvent;
    const { source } = this.props;
    let imageWidth = source.width;
    let imageHeight = source.height;
    // 处理判断下当前图片裁切灰色区的高度和宽度，进而控制判断图片展示的大小，以免图片超出裁切区时点击确定会报错
    if (source.height > layout.height - 122) {
      imageHeight = layout.height - 122;
      imageWidth = (imageHeight / source.height) * source.width;
    } else if (source.width > layout.width) {
      imageWidth = layout.width;
      imageHeight = (imageWidth / source.width) * source.height;
    }
    this.setState({
      source,
      imageWidth,
      imageHeight,
      containerWidth: layout.width,
      containerHeight: layout.height - 122,
    });
  }

  // 获取指定的的题目数据
  getTargetQuestionFun = (targetId) => {
    let targetQuestion;
    const { unAnswerSubjectiveList } = this.state;
    for (let i = 0; i < unAnswerSubjectiveList.length; i++) {
      if (unAnswerSubjectiveList[i].id === targetId) {
        targetQuestion = unAnswerSubjectiveList[i];
      }
    }
    return targetQuestion;
  }

  // 剪切图片事件
  toCropImage = () => {
    if (!this.clip) {
      this.clip = true;
      const { containerWidth, containerHeight } = this.state;
      const {
        width, height, left, top,
      } = this.imgCrop.getCropData();
      let wid = width;
      let heg = height;
      if (width + left > containerWidth) {
        wid = containerWidth - left;
      }
      if (height + top > containerHeight) {
        heg = containerHeight - top;
      }
      const cropData = {
        offset: { x: left, y: top },
        size: { width: wid, height: heg },
      };
      this.imgCrop.crop().then((uri) => {
        ImageEditor.cropImage(uri, cropData, this.success, this.error);
      });
    }
  }

  // 确定裁剪 点击 √
  pressConfirm = () => {
    const { multipleStatus, isMultipleSelect } = this.state;
    // 先判断是否处于多题裁切状态，是则裁切图片，否则判断是否要展示选择模态层
    if (multipleStatus) {
      // 确定将应用于多题
      this.multipleCropper();
    } else if (isMultipleSelect) {
      this.selectModalStatusFun(true);
    } else {
      this.toCropImage();
    }
  }

  // 裁剪之后的回调
  success = (uri) => {
    const {
      width, height,
    } = this.imgCrop.getCropData();
    const { croppedImage } = this.props;
    croppedImage(uri, width, height);
  }

  error = (err) => {
    console.log('err', err);
  }

  // 图片旋转
  rotateImg = (digit) => {
    this.imgCrop.rotate(digit);
  }

  resetRotate = (digit) => {
    this.setState({ value: 0 }, () => this.imgCrop.rotate(digit));
  }

  // 微调旋转
  handleChange = (value) => {
    if (value === this.oldValue) return;
    const val = value - this.oldValue;
    this.oldValue = value;

    this.setState({ value }, () => this.imgCrop.rotate(val));
  }

  pressCancel = () => {
    const { cancelCrop } = this.props;
    cancelCrop();
  }

  // 控制 选择是否应用于多题的 modal 显隐
  selectModalStatusFun = (visible) => {
    this.setState({
      selectModalStatus: visible,
    });
  }

  // 应用于本题
  currentQuesFun = () => {
    this.toCropImage();
    this.selectModalStatusFun(false);
  }

  // 应用于多题---拿取新的图片供多题裁切使用还有点问题，后续再加上
  multipleQuesFun = () => {
    this.selectModalStatusFun(false);
    // 开始给裁剪多题单独计时
    const { mulImageCostTime, currentQid } = this.props;
    mulImageCostTime(currentQid);
    this.setState({
      multipleStatus: true,
      randomNum: Math.random(),
    });
  }


  // 应用于多题---主观题题号切换
  handleOrderChange = (e) => {
    // 先保存下切换题号之前的题目的裁剪框位置数据
    const { currentQid: prevId, unAnswerSubjectiveList, initCropBox } = this.state;
    let getInitCropBox = initCropBox;
    const prevQuestion = this.getTargetQuestionFun(prevId);
    // 克隆未作答的题目列表数据
    const newList = R.clone(unAnswerSubjectiveList);
    // 设置应用于多题时裁剪框的初始位置
    if (R.isEmpty(getInitCropBox)) {
      const obj = this.imgCrop.getInitialCropBoxData();
      getInitCropBox = {
        left: obj.left,
        top: obj.top,
        width: obj.width,
        height: obj.height,
      };
    }
    const {
      width, height, left, top,
    } = this.imgCrop.getCropData();
    const cropBox = {
      left, top, width, height,
    };
    if (!R.equals(prevQuestion.cropBox, cropBox)) {
      this.imgCrop.crop().then((uri) => {
        for (let i = 0; i < newList.length; i++) {
          if (newList[i].id === prevId) {
            newList[i].answerFileUrl = uri;
            newList[i].answered = 1;
            newList[i].cropBox = cropBox;
            break;
          }
        }
      }).then(() => {
        this.setState({
          currentQid: e,
          initCropBox: getInitCropBox,
          unAnswerSubjectiveList: newList,
        });
        const currentQuestion = this.getTargetQuestionFun(e);
        const croperBoxData = currentQuestion.cropBox || getInitCropBox;
        this.imgCrop.setCropData(croperBoxData);
      });
    } else {
      this.setState({
        currentQid: e,
      });
      const currentQuestion = this.getTargetQuestionFun(e);
      const croperBoxData = currentQuestion.cropBox || getInitCropBox;
      this.imgCrop.setCropData(croperBoxData);
    }
  }

  // 应用于多题情况下点击 √
  multipleCropper = () => {
    // 截取每个图片框
    const { currentQid, unAnswerSubjectiveList } = this.state;
    const unAnswerList = R.clone(unAnswerSubjectiveList);
    // 先判断当前图片框是否已截取保存
    for (let i = 0; i < unAnswerList.length; i++) {
      if (unAnswerList[i].id === currentQid) {
        const {
          width, height, left, top,
        } = this.imgCrop.getCropData();
        const cropBox = {
          left, top, width, height,
        };
        if (!R.equals(unAnswerList[i].cropBox, cropBox)) {
          this.imgCrop.crop().then((uri) => {
            unAnswerList[i].answerFileUrl = uri;
            unAnswerList[i].answered = 1;
            unAnswerList[i].cropBox = cropBox;
          }).then(() => {
            this.mulImageUpload(unAnswerList);
          });
        } else {
          this.mulImageUpload(unAnswerList);
        }
        break;
      }
    }
  }

  // 应用于多题多张图片上传Oss
  mulImageUpload = (unAnswerList) => {
    const { handleSaveMulImage, mulCroppedImage } = this.props;
    mulCroppedImage();
    const questionList = [];
    for (let i = 0; i < unAnswerList.length; i++) {
      if (unAnswerList[i].answered === 1) {
        const params = {
          questionId: unAnswerList[i].id,
          file: unAnswerList[i].answerFileUrl,
          imgName: '1.png',
        };
        questionList.push(params);
      }
    }
    handleSaveMulImage(questionList, this.filterAnswerIdList(unAnswerList));
  }

  // 筛选出应用于多题时已保存过cropBox的题目id列表，用于批量答题筛选
  filterAnswerIdList = (list) => {
    const newList = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].answered) {
        newList.push(list[i].id);
      }
    }
    return newList;
  }

  render() {
    const {
      value,
      source,
      imageWidth,
      imageHeight,
      containerWidth,
      containerHeight,
      multipleStatus,
      selectModalStatus,
      currentQid,
      unAnswerSubjectiveList,
      randomNum,
    } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.container} onLayout={this.onLayout}>
          <View style={[styles.toolBar, { backgroundColor: '#30bf6c' }]}>
            <TouchableOpacity style={styles.btn} onPress={this.pressCancel}>
              <Text style={styles.text}>X</Text>
            </TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.text}>裁剪</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={this.pressConfirm}>
              <Text style={styles.text}>√</Text>
            </TouchableOpacity>
          </View>
          {source && (
            <ImageCropper
              key={randomNum}
              source={{ uri: source.uri }}
              autoCropArea={multipleStatus ? 0.34 : 1}
              imageWidth={imageWidth}
              imageHeight={imageHeight}
              containerWidth={containerWidth}
              containerHeight={containerHeight}
              ref={(crop) => { this.imgCrop = crop; }}
            />
          )}
          {
            multipleStatus
              ? (
                <View style={[styles.bottomBar, { backgroundColor: '#fff' }]}>
                  <OrderButtons
                    unAnswerQuesList={unAnswerSubjectiveList}
                    defaultValue={currentQid}
                    onChange={this.handleOrderChange}
                  />
                </View>
              )
              : (
                <View style={[styles.bottomBar, { backgroundColor: '#fff' }]}>
                  <TouchableOpacity style={styles.bottomBtn} onPress={() => this.rotateImg(90)}>
                    <View><IconSet style={{ color: '#30bf6c', fontSize: 20 }} name="xuanzhuan" /></View>
                  </TouchableOpacity>
                  <View style={styles.slider}>
                    <Slider
                      step={4.5}
                      defaultValue={0}
                      value={value}
                      min={-45}
                      max={45}
                      maximumTrackTintColor="#30bf6c"
                      minimumTrackTintColor="#ffc14d"
                      onChange={val => this.handleChange(val)}
                    />
                    <Text style={styles.slideText}>{value}</Text>
                  </View>
                  <TouchableOpacity style={styles.bottomBtn} onPress={() => this.resetRotate(0)}>
                    <Text style={[styles.text, { color: '#30bf6c' }]}>还原</Text>
                  </TouchableOpacity>
                </View>
              )
          }
        </View>
        {
          selectModalStatus
          && <SelectModal currentQuesFun={this.currentQuesFun} multipleQuesFun={this.multipleQuesFun} />
        }
      </Modal>
    );
  }
}
ImageCrop.propTypes = {
  source: PropTypes.any.isRequired,
  croppedImage: PropTypes.any.isRequired,
  cancelCrop: PropTypes.func.isRequired,
  mulImageCostTime: PropTypes.func.isRequired,
  handleSaveMulImage: PropTypes.func.isRequired,
  mulCroppedImage: PropTypes.func.isRequired,
  isMultipleSelect: PropTypes.bool.isRequired,
  currentQid: PropTypes.string.isRequired,
  unAnswerSubjectiveList: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
  },
  toolBar: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
  },
  btn: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    height: 72,
    justifyContent: 'space-between',
  },
  bottomBtn: {
    width: 100,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 72,
    justifyContent: 'center',
  },
  slideText: {
    textAlign: 'center',
    fontSize: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
});
