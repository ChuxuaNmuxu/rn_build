// 作业记录详情页
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
// import { Actions } from 'react-native-router-flux';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import _ from 'ramda';
import draftToHtml from '../../../../utils/draftjsToHtml';
// import * as actions from '../../../../actions/incorrectProblemDetail';
// import * as commonActions from '../../../../actions/commonActions';
// import { CustomButton } from '../../../../components/Icon';
import styles from './DetailView.scss';
import AnserSummarization from '../AnserSummarization';
import Svg from '../../../../components/Svg';
import CauseOfError from '../../../../components/WrongReason';
import Modal, { ModalApi } from '../../../../components/Modal';

class DetailView extends Component {
  constructor(props) {
    super(props);
    const {
      type,
    } = props;
    this.type = type;
    this.state = {
      width: 0,
      height: 0,
      screenWidth: 0,
      screenHeight: 0,
      isgetImageSize: false,
    };
  }

  componentDidUpdate() {
    // 获取图片的大小
    // 真实情况应该在loading结束后才跑这个函数
    // 不可能每个图片都去获取大小的，既然同一个机型出来的图片，那么应该差不多的
    const {
      data, imageWHArr, index,
    } = this.props;
    const { isgetImageSize } = this.state;
    console.log(imageWHArr[index], 'widthwidthwidth');

    if (!_.isNil(data) && !isgetImageSize) {
      // 如果需要loading就ladoging
      console.log('你他妈心里没点B数？富文本能缩放？');
      const {
        studentAnserImage,
      } = data;
      const { W, H } = imageWHArr[index];
      if (!_.isEmpty(studentAnserImage) && !_.isNil(studentAnserImage) && W === 0 && H === 0) {
        console.log('我难道跑起来了？');
        this.getImageSize(studentAnserImage[0].url);
      }
    }
  }

  componentWillUnmount() {
    console.log('xiaohui????????????/');
  }


  onChange=(a) => {
    const {
      id,

      returnFailReason,

    } = this.props;
    console.log(id);
    const type = this.type === 'H' ? 1 : 2;
    returnFailReason({ category: type, id, params: { reason: a } });
  }

  static getDerivedStateFromProps(props, state) {
    const { data } = props;
    console.log(state, 'statestatestate');
    if (data !== state.data) {
      // this.getImageSize(studentAnserImage);
    }
    return null;
  }

  // 获取图片初始化大小
  getImageSize=(url) => {
    Image.getSize(
      url,
      (width, height) => {
        this.setState(
          {
            width,
            height,
            isgetImageSize: true,
          },
        );
      },
      () => {
        try {
          // 应该是静态资源，不过没做
          const data = (Image).resolveAssetSource(url);
          this.setState(
            {
              width: data.width,
              height: data.height,
            },
          );
        } catch (newError) {
          // Give up..
          // this.setState(
          //   {
          //     status: 'fail',
          //   },
          // );
        }
      },
    );
  }


  handleLayout=(event) => {
    let screenWidth = null;
    let screenHeight = null;
    if (event.nativeEvent.layout.width !== this.width) {
      screenWidth = event.nativeEvent.layout.width;
      screenHeight = event.nativeEvent.layout.height;
    }
    this.setState({
      screenWidth,
      screenHeight,
    });
  }

  // 富文本数据展示框
  htmlViewComponent=(htmlContent) => {
    // console.log(draftToHtml(JSON.parse(htmlContent)), 'wComponenthtmlViewComponenthtmlViewComponent');
    const htmlViewStyles = StyleSheet.create({
      p: {
        fontSize: 24,
        color: '#999999',
      },
    });
    return (
      <View style={styles.htmlViewComponent}>
        <HTMLView
          value={draftToHtml(JSON.parse(htmlContent))}
          stylesheet={htmlViewStyles}
        />
      </View>
    );
  }

  // 分割线
  splitLine=() => (
    <View style={styles.splitLine} />
  )

  // 学生自己的答案（图片）
  studentAnserImage=(url, key) => {
    console.log(url, '学生自己的答案（图片）');
    // 获得屏幕宽高
    const {
      screenHeight, screenWidth, width, height,
    } = this.state;
    const { imageWHArr, index, saveImageWH } = this.props;
    let [_width, _height] = [0, 0];
    // 逻辑简述：
    // 假设已经加载过这个图片，那么imageWHArr[index]会保存已经转换好的WH，直接刷新用户不会感知代码在刷新。
    // 如果为0，则先保存0。那么在update的时候就会获取图片的size。
    if (imageWHArr[index] !== null) {
      const { W, H } = imageWHArr[index];
      if (W !== 0 && H !== 0) {
        [_width, _height] = [W, H];
      } else {
        // 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
        [_width, _height] = [width, height];
        if (_width > screenWidth) {
          console.log('!!');
          const widthPixel = (screenWidth - 48) / _width;
          _width *= widthPixel;
          _height *= widthPixel;
        }

        // 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
        if (_height > screenHeight) {
          console.log('??');
          const HeightPixel = screenHeight / _height;
          _width *= HeightPixel;
          _height *= HeightPixel;
        }
      }
    }
    saveImageWH(_width, _height);

    return (
      <View style={[styles.studentAnserImage]} key={key}>
        <Image
          style={[{ width: _width, height: _height }]}
          source={{ uri: url }}
        />
      </View>
    );
  }

  // 正确答案和其他同学的答案，缩略图形式，且无其他逻辑干扰，不独立组件。
  correctAndOthersAnser=(data, title) => (
    <View style={styles.correctAndOthersAnser}>
      <View style={styles.correctAndOthersAnserTitle}>
        <Text style={styles.AnserTitleText}>{title}</Text>
      </View>
      <View style={styles.imageList}>
        {
            data.map((
              (item, index) => (
                <View style={styles.imageListItem} key={`${index}${title}`}>
                  <TouchableOpacity onPress={() => this.callImageModal(item.url, item.studentName && item.studentName)}>
                    <Image
                      style={[{ width: 146, height: 146 }]}
                      source={{ uri: item.url }}
                    />
                  </TouchableOpacity>
                  <View style={styles.zoomImageIcon}>
                    <Svg height="40" width="40" source="wrongIcon" fill="#fff" />
                  </View>
                </View>
              )
            ))
          }
      </View>
    </View>
  )

  callImageModal=(url, name) => {
    const data = { url, studentName: name };
    ModalApi.onOppen('ImageViewer', data);
  }


  render() {
    const {
      data,
    } = this.props;
    // 选中该项，是否存在数据
    if (_.isNil(data)) {
      console.log('尼玛这个能进来？');
      console.log(data);
      // 如果需要loading就ladoging
      return <View style={styles.loading}><Text style={styles.loadingText}>正在努力加载下一题，请稍等...</Text></View>;
    }
    const {
      htmlContent,
      AnserSummarizationData,
      studentAnserImage,
      rightAnser,
      causeOfErrorNum,
    } = data;
    // const { studentAnser } = AnserSummarizationData;
    console.log(studentAnserImage, 'studentAnserImagestudentAnserImage');
    // 是否存在答案
    console.log(causeOfErrorNum, 'causeOfErrorNumcauseOfErrorNum');
    return (
      <ScrollView style={styles.homeworkDetail_container} onLayout={this.handleLayout}>
        <Modal />
        {
          // 如果看代码懵逼，请结合UI图，每一块分割线前的都是UI图上的一块。
        }
        {
          !_.isEmpty(htmlContent) ? (
            <React.Fragment>
              {
                console.log(htmlContent)
              }
              {
              // 富文本显示块，，，如果出错可能是返回数据是block而不是html字符串。形式固定，不独立组件了。
               this.htmlViewComponent(htmlContent)
            }
              {
               // 你好我是分割线
              this.splitLine()
            }
            </React.Fragment>
          ) : null

        }

        {
          <React.Fragment>
            {
              // 该题的摘要，包括对错得分难易同批阅之类。
              // 说起来你不信。这个页面这个组件是最复杂的，但是看起来是最少东西的。
              <AnserSummarization
                // 是作业or考试
                type={this.type}
                // 题目类型
                questionType={AnserSummarizationData.questionType}
                // 难易度
                difficultyDegree={AnserSummarizationData.difficultyDegree}
                // 正确答案
                correctAnser={AnserSummarizationData.correctAnser}
                // 学生答案
                studentAnser={AnserSummarizationData.studentAnser}
                // 得分
                score={AnserSummarizationData.score}
              />
            }
            {
              // 你好我是分割线
              this.splitLine()
            }
          </React.Fragment>
        }

        {
           _.isEmpty(studentAnserImage) ? null : (
             <React.Fragment>
               {
              // 学生自己的答案，是个图片。形式固定，不独立组件了。
              // 这个B组件没有答案的时候就不展示了
              studentAnserImage.map((item, index) => (this.studentAnserImage(item.url, `${index}666`)))
              // console.log(studentAnserImage, 'studentAnserImagestudentAnserImage')
            }
               {
              // 你好我是分割线
              this.splitLine()
            }
             </React.Fragment>
           )
        }

        {
          _.isEmpty(rightAnser) ? null : (
            <React.Fragment>
              {
              // 题目答案
              this.correctAndOthersAnser(rightAnser, '题目答案：')
            }
              {
              // 你好我是分割线
              this.splitLine()
            }
            </React.Fragment>
          )
        }

        {
          // 错误原因分析
          <View style={styles.CauseOfError}>
            <CauseOfError defaultValue={causeOfErrorNum} onChange={this.onChange} />
          </View>
        }
      </ScrollView>
    );
  }
}

DetailView.propTypes = {
  saveImageWH: PropTypes.func.isRequired,
  imageWHArr: PropTypes.array.isRequired,
  returnFailReason: PropTypes.func.isRequired,
  data: PropTypes.any,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

DetailView.defaultProps = {
  data: null,
};


export default DetailView;
