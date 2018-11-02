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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'ramda';
import draftToHtml from './lib/draftjs-to-html';

import * as actions from '../../../actions/recordDetailActions';
import * as commonActions from '../../../actions/commonActions';
import { CustomButton } from '../../../components/Icon';
import styles from './HomworkRecordDetail.scss';
import ScrollSelectedBar from './ScrollSelectedBar';
import AnserSummarization from './AnserSummarization';
import Svg from '../../../components/Svg';
import CauseOfError from '../../../components/WrongReason';
import Modal, { ModalApi } from '../../../components/Modal';
import NoResult from '../../../components/NotResult';

class HomworkRecordDetail extends Component {
  constructor(props) {
    super(props);
    const {
      params: {
        id = null, routeName = '',
      },
    } = props;
    console.log(id, '我是垃圾ID');
    this.id = id;
    // 总类型为作业的还是考试的
    this.type = routeName === 'HomworkRecordDetail' ? 'H' : 'E';

    // 初始化请求数据
    this.init(this.type, id);
    // 学生答案图片的url
    // this.url = props.url;
    // 展示需要区分考试和作业，那设考试为'E',作业为'H'
    this.state = {
      width: 0,
      height: 0,
      screenWidth: 0,
      screenHeight: 0,
      selectTion: 0,
      isgetImageSize: false,
    };
  }

  componentDidUpdate() {
    // 获取图片的大小
    // 真实情况应该在loading结束后才跑这个函数
    // 不可能每个图片都去获取大小的，既然同一个机型出来的图片，那么应该差不多的
    console.log('肯定更新的');
    const { detailsDataList } = this.props;
    const { selectTion, isgetImageSize } = this.state;

    if (!_.isNil(detailsDataList[selectTion]) && !isgetImageSize) {
      // 如果需要loading就ladoging
      console.log('你他妈心里没点B数？富文本能缩放？');
      const {
        studentAnserImage,
      } = detailsDataList[selectTion];
      if (!_.isEmpty(studentAnserImage) && !_.isNil(studentAnserImage)) {
        this.getImageSize(studentAnserImage[0].url);
      }
    }
  }


  onChange=(a) => {
    const {
      headerList,
      commonActions: {
        returnFailReason,
      },
      actions: {
        fetchHomeworkData,
      },
    } = this.props;
    const { selectTion } = this.state;
    const {
      id,
    } = headerList[selectTion];
    const type = this.type === 'H' ? 1 : 2;
    returnFailReason({
      type,
      id,
      reason: a,
      callback: () => fetchHomeworkData({ homeworkId: this.id, questionId: id, index: selectTion }, 'REQUEST'),
    });
  }

  onScrollEnd=() => {
    // console.log(this.anserSummarization);
    this.anserSummarization.setButton();
  }

  static getDerivedStateFromProps(props, state) {
    const { detailsDataList } = props;
    console.log(state, 'statestatestate');
    if (detailsDataList !== state.detailsDataList) {
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
          }, () => console.log(width, 'widthwidthwidthwidthwidth'),
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


  init=(type, id) => {
    const {
      actions: {
        fetchExaminationData,
        fetchHomeworkListData,
        fetchHomeworkData,
      },
    } = this.props;
    const initFunc = {
      E: fetchExaminationData,
      H: fetchHomeworkListData,
    };
    // 根据不同的类型选择不同的初始化请求
    initFunc[type](
      {
        id,
        callback: type === 'H' && fetchHomeworkData,
        type,
      },
      'REQUEST',
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
    // console.log('我是layout');
    // console.log(screenWidth, screenHeight);
    // console.log('我是layout');
  }

  // _renderNode=(node, index, siblings, parent, defaultRenderer)=> {
  //   const {screenWidth} = this.state
  //   if (node.name === 'img') {
  //     const attr = node.attribs;
  //     const ratio = 513 / 49;
  //     attr.width = screenWidth - 36;
  //     attr.height =attr.width/ratio;
  //     console.log(attr,'aaaaaa193')
  //     return undefined;
  //   }
  // }

  // 富文本数据展示框
  htmlViewComponent=(htmlContent) => {
    console.log(draftToHtml(JSON.parse(htmlContent)));
    const htmlViewStyles = StyleSheet.create({
      p: {
        fontSize: 24,
        color: '#999999',
      },
    });
    // const htmlContent = '<p>zhazhazha</p>'
    // + '<img src="https://photo.tuchong.com/1382088/f/66585051.jpg" '
    // + 'alt="undefined" style="float:none;height: auto;width: auto"/>'
    // + '<p>曹尼玛的富文本</p>';
    return (
      <View style={styles.htmlViewComponent}>
        <HTMLView
          value={draftToHtml(JSON.parse(htmlContent))}
          stylesheet={htmlViewStyles}
          // renderNode={this._renderNode}
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
    // 获得屏幕宽高
    const {
      screenHeight, screenWidth, width, height,
    } = this.state;
    let [_width, _height] = [width, height];
    console.log(url, '学生自己的答案（图片）');
    console.log(_width, _height);
    console.log(url, '学生自己的答案（图片）');
    // 如果宽大于屏幕宽度,整体缩放到宽度是屏幕宽度
    if (_width > screenWidth) {
      console.log('!!');
      const widthPixel = (screenWidth - 48) / width;
      _width *= widthPixel;
      _height *= widthPixel;
    }

    // if (_width < screenWidth) {
    //   _width *= Dimensions.get('window').scale;
    //   console.log(Dimensions.get('window').scale, 'Diemnsions.get().scale');
    // }

    // 如果此时高度还大于屏幕高度,整体缩放到高度是屏幕高度
    if (_height > screenHeight) {
      console.log('??');
      const HeightPixel = screenHeight / height;
      _width *= HeightPixel;
      _height *= HeightPixel;
    }
    // if (_height < screenHeight) {
    //   // _height *= Dimensions.get('window').scale;
    //   console.log(Dimensions.get('window').scale, 'Diemnsions.get().scale');
    // }
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
                      source={{ uri: item.smallUrl }}
                    />
                  </TouchableOpacity>
                  <View style={styles.zoomImageIcon}>
                    <Svg height="30" width="30" source="zoom" fill="#fff" />
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


  myComponentWillUnmount=() => {
    // 离开该页面清理数据，否则下次进来有缓存
    const {
      actions: {
        initialState,
      },
    } = this.props;
    initialState(null);
    Actions.ProblemRecords();
    console.log('caonika');
    // throw new Error('crash test is here');
  }

  selectFun=(index, questionId) => {
    // homeworkId,
    // questionId,
    // index,
    console.log(index);
    // 应该写个中转函数，检测数据是否存在，如果reducer里面存在该index的对应项，则直接拿数据。
    // 如果没有则触发请求去拉取数据。那么页面也应该稍微调整增加个loading状态。不过产品没说，真是渣渣。
    const { detailsDataList } = this.props;
    // 无脑刷新state，如果有就直接显示了，不用鸟
    this.setState({
      selectTion: index,
      isgetImageSize: false,
    });
    // 如果没有数据的话就去拉取,不过考试的数据都存在，所以可以忽视请求了
    console.log({ homeworkId: this.id, questionId, index }, '我要去请求数据啦啦啦啦啦');
    if (_.isNil(detailsDataList[index])) {
      console.log({ homeworkId: this.id, questionId, index }, '我要去请求数据啦啦啦啦啦');
      const {
        actions: {
          fetchHomeworkData,
        },
      } = this.props;
      fetchHomeworkData({ homeworkId: this.id, questionId, index }, 'REQUEST');
    }
  }

  contentIsLoading=(title, headerList, status, selectTion) => {
    console.log('内容还没有，在loading');
    return (
      <ScrollView style={styles.homeworkDetail_container} onLayout={this.handleLayout}>
        <Modal />
        <View style={styles.homeworkDetail_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={this.myComponentWillUnmount} />
          <Text style={styles.homeworkDetailTitle}>{title}</Text>
          <Text style={styles.alt} />
        </View>
        {
          // 如果看代码懵逼，请结合UI图，每一块分割线前的都是UI图上的一块。
        }
        {
          // 头部的滚动选择器
          <ScrollSelectedBar data={headerList} moveIndex={this.selectFun} status={status} selectTion={selectTion} />
        }
        {
          // 你好我是分割线
          this.splitLine()
        }
        <Text>正在搬运数据</Text>
      </ScrollView>
    );
  }


  isQuestionSubmited=(objAnser, subAnser) => {
    console.log(objAnser, subAnser);
    console.log(objAnser === null && subAnser === []);
    if (_.isNil(objAnser) && _.isEmpty(subAnser)) {
      return true;
    }
    if (_.isEmpty(objAnser) && _.isEmpty(subAnser)) {
      return true;
    }
    return false;
  }

  examCanRenderCauseOfError=() => {
    const {
      submitStatus,
    } = this.props;
    if (this.type === 'E' && submitStatus === 0) {
      return false;
    }
    return true;
  }


  render() {
    const {
      headerList, detailsDataList, status, title,
    } = this.props;
    const { selectTion } = this.state;
    if (_.isEmpty(headerList)) {
      return (
        <React.Fragment>
          <View style={styles.homeworkDetail_header}>
            <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={this.myComponentWillUnmount} />
            <Text style={styles.homeworkDetailTitle}>{title}</Text>
            <Text style={styles.alt} />
          </View>
          <NoResult tips="该作业无记录" />

        </React.Fragment>
      );
    }
    // 选中该项，是否存在数据
    if (_.isNil(headerList[selectTion]) && _.isNil(detailsDataList[selectTion])) {
      console.log('尼玛这个能进来？');
      console.log(headerList[selectTion]);
      console.log(_.isNil(headerList[selectTion]));
      console.log(_.isNil(detailsDataList[selectTion]));
      console.log(detailsDataList[selectTion]);
      // 如果需要loading就ladoging
      return null;
    }
    if (!_.isNil(headerList[selectTion]) && _.isNil(detailsDataList[selectTion])) {
      return this.contentIsLoading(title, headerList, status, selectTion);
    }
    console.log('caonimade haijinlaile ?');
    const {
      isItCorrect,
    } = headerList[selectTion];
    console.log(status, 'renderrenderrender');
    console.log(isItCorrect, 'renderrenderrender');
    const {
      htmlContent,
      AnserSummarizationData,
      studentAnserImage,
      rightAnser,
      othersAnser,
      causeOfErrorNum,
    } = detailsDataList[selectTion];
    const { studentAnser } = AnserSummarizationData;
    console.log(studentAnserImage, 'studentAnserImagestudentAnserImage');
    // 是否存在答案studentAnser !== null || studentAnser !== '' || studentAnserImage !== [];
    const isQuestionSubmited = this.isQuestionSubmited(studentAnser, studentAnserImage);
    console.log(causeOfErrorNum, 'causeOfErrorNumcauseOfErrorNum');
    console.log(isQuestionSubmited, 'isQuestionSubmitedisQuestionSubmited');
    return (
      <ScrollView
        style={styles.homeworkDetail_container}
        onLayout={this.handleLayout}
        onMomentumScrollEnd={this.onScrollEnd}
      >
        <Modal />
        <View style={styles.homeworkDetail_header}>
          <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={this.myComponentWillUnmount} />
          <Text style={styles.homeworkDetailTitle}>{title}</Text>
          <Text style={styles.alt} />
        </View>
        {
          // 如果看代码懵逼，请结合UI图，每一块分割线前的都是UI图上的一块。
        }
        {
          // 头部的滚动选择器
          <ScrollSelectedBar data={headerList} moveIndex={this.selectFun} status={status} selectTion={selectTion} />
        }
        {
          // 你好我是分割线
          this.splitLine()
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
                // 状态
                status={status}
                // 是否正确
                isItCorrect={isItCorrect}
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
                // 这题是否作答了
                isQuestionSubmited={isQuestionSubmited}
                // 学生是否批改了
                studentMarked={AnserSummarizationData.studentMarked}
                // 学生是否反馈了
                hasMarkFeedback={AnserSummarizationData.hasMarkFeedback}
                // 作业ID
                homeWorkId={this.id}
                // 题目ID
                qsId={headerList[selectTion].id}

                ref={(el) => { this.anserSummarization = el; }}
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

        {/* {
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
        } */}
        {
          !_.isEmpty(rightAnser) ? (
            <React.Fragment>
              {
                console.log(rightAnser)
              }
              <View style={[styles.correctAndOthersAnserTitle, styles.rightAnserAdd]}>
                <Text style={styles.AnserTitleText}>题目答案：</Text>
              </View>
              {
              // 富文本显示块，，，如果出错可能是返回数据是block而不是html字符串。形式固定，不独立组件了。
               this.htmlViewComponent(rightAnser)
            }
              {
               // 你好我是分割线
              this.splitLine()
            }
            </React.Fragment>
          ) : null

        }

        {
          _.isEmpty(othersAnser) ? null : (
            <React.Fragment>

              {
                // 题目答案
                this.correctAndOthersAnser(othersAnser, '看看其他同学的解答过程：')
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
          // 是否被批改且存在错误
          // submitStatus=>是否参加考试，1是

         this.examCanRenderCauseOfError() && status === 1 && isItCorrect !== 1 ? (
           <View style={styles.CauseOfError}>
             <CauseOfError defaultValue={causeOfErrorNum} onChange={this.onChange} />
           </View>
         ) : null
        }
      </ScrollView>
    );
  }
}

HomworkRecordDetail.propTypes = {
  // url: PropTypes.string,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  commonActions: PropTypes.object.isRequired,
  headerList: PropTypes.array.isRequired,
  detailsDataList: PropTypes.array.isRequired,
  status: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  submitStatus: PropTypes.number.isRequired,
};

HomworkRecordDetail.defaultProps = {
  // url: 'https://s1.tuchong.com/content-image/201808/c0d4a9ed78db8ccff97dbd04d9ab62ab.png',
};

const mapStateToProps = (state) => {
  const {
    routes, recordDetailReducer: {
      detailsDataList, headerList, status, title, submitStatus,
    },
  } = state;
  const { params } = routes;
  console.log(state, 'aa');
  return {
    params,
    detailsDataList,
    headerList,
    status,
    title,
    submitStatus,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  commonActions: bindActionCreators(commonActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomworkRecordDetail);
