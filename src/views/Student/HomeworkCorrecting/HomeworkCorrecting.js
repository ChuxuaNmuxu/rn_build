import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  // TouchableHighlight,
  ScrollView,
} from 'react-native';
// import immer from 'immer';
import PopupDialog from 'react-native-popup-dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import HTMLView from 'react-native-htmlview';
import _ from 'ramda';
import draftToHtml from '../../../utils/draftjsToHtml';
import Radio from '../../../components/Radio';
import Modal, { ModalApi } from '../../../components/Modal';
// import WrongReason from '../../../components/WrongReason';
import I18nText from '../../../components/I18nText';
import styles from './HomeworkCorrecting.scss';
import * as correctingActions from '../../../actions/homeworkCorrectingAction';
import CorrentResultCard from './Components/CorrentResultCard';
import TriangleImg from '../../../public/img/Triangle.png';

class HomeworkCorrecting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      width: 0,
      height: 0,
      screenWidth: 0,
      screenHeight: 0,
      isgetImageSize: false,
      // isVisible: false,
    };
    this.labelData = [ // 标签数据
      {
        label: '1',
        value: 1,
      },
      {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
      {
        label: '4',
        value: 4,
      },
      {
        label: '5',
        value: 5,
      },
      {
        label: '6',
        value: 6,
      },
      {
        label: '7',
        value: 7,
      },
      {
        label: '8',
        value: 8,
      },
      {
        label: '9',
        value: 9,
      },
    ];
  }

  componentDidMount() {
    console.log('调用 HomeworkCorrecting 组件！', this.props);
    const { actions, homeworkId } = this.props;
    actions.fetchListAction(homeworkId, 'REQUEST');
  }

  componentDidUpdate() {
    // 获取图片的大小
    // 真实情况应该在loading结束后才跑这个函数
    // 不可能每个图片都去获取大小的，既然同一个机型出来的图片，那么应该差不多的
    console.log('肯定更新的');
    const { list } = this.props;
    const { index, isgetImageSize } = this.state;

    if (!_.isNil(list[index]) && !isgetImageSize) {
      // 如果需要loading就ladoging
      console.log('你他妈心里没点B数？富文本能缩放？');
      const {
        answerFileUrl,
      } = list[index];
      if (!_.isEmpty(answerFileUrl) && !_.isNil(answerFileUrl)) {
        this.getImageSize(answerFileUrl);
      }
    }
  }

  // 选择批阅结果
  onResultChange = (aa, index) => {
    // aa: 选择的批阅结果--10正确，5部分正确，-1错误(错误时分数为0，该组件中用-1来代表错误)；index：当前批阅题目的索引
    // console.log(7777, aa, index);
    if (aa === 10) {
      this.setPopScore(10, index);
    } else if (aa === -1) {
      this.setPopScore(0, index);
    } else {
      this.popupDialog.show(); // 气泡弹出框
    }
  }

  setPopScore = (score, index) => {
    const { actions } = this.props;
    actions.controlFinsihBtnAction({ finishBtnDisable: false, index });
    actions.setCorrectResultAction({ score, index });
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

  handleLayout = (event) => {
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

  // 学生自己的答案（图片）
  studentAnserImage = (url, key = 1) => {
    // 获得屏幕宽高
    const {
      screenHeight, screenWidth, width, height,
    } = this.state;
    let [_width, _height] = [width, height];
    console.log('学生自己的答案（图片）=', url);
    console.log('_width=', _width, '_height=', _height);
    console.log('screenWidth=', screenWidth, 'screenHeight=', screenHeight);
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
    console.log(_width, _height, url);
    return (
      <View style={[styles.studentAnserImage]}>
        <Image
          style={[{ width: _width, height: _height }]}
          source={{ uri: url }}
        />
      </View>
    );
  }

  // 富文本数据展示框
  htmlViewComponent=(htmlContent) => {
    // console.log(draftToHtml(JSON.parse(htmlContent)));
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

  // setButton = (index) => {
  //   const handle = findNodeHandle(this[`partOfTheError${index}`]);
  //   if (handle) {
  //     NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
  //       console.log(x, y, width, height);
  //       this.setState(immer((state) => {
  //         state.popInfo.anchor = {
  //           x, y, width, height,
  //         };
  //       }));
  //     });
  //   }
  // };

  openPop = () => {
    const data = {
      customContent: this.customContent(),
      top: 600,
      // 高度最好跟你自己自定义的内容高度一样
      height: 340,
      // width: 400,
      maskClosable: true,
    };
    ModalApi.onOppen('CustomModal', data);
  }

  customContent=() => (
    <View style={styles.customContent}>
      <View style={styles.customContentItem}>
        {
          [1, 2, 3].map(item => (
            <Text key={item} style={styles.btn} onPress={() => ModalApi.onClose()}>{item}</Text>
          ))
        }
      </View>
    </View>
  )

  // 完成批阅
  finishReadOver = (item, index) => {
    const { actions, list } = this.props;
    const params = {
      homeworkId: item.homeworkId,
      studentId: item.studentId,
      questionId: item.questionId,
      score: item.score,
      index,
    };
    // 完成批阅要将当前批阅完成的题目的批阅按钮置灰，不可再更改批阅结果
    actions.controlFinsihBtnAction({ finishBtnDisable: true, index });
    // 有分数才可以
    if (item.score !== undefined) {
      // 这个scrollBy会触发 onIndexChanged 所以不需要在这边设置 this.setState({})
      actions.saveCorrectResultAction({
        params,
        callBack: () => {
          // const newIndex = index < list.length - 1 ? index + 1 : index;
          const bol = index < list.length - 1;
          // console.log('完成批阅，下一题, 当前的 index=', index, '是否滑动', bol);
          if (bol) this.swiperRef.scrollBy(1);
        },
      }, 'REQUEST');
    }
    // 批阅到最后一题点击 完成批阅 需要跳转至首页
    if (index === (list.length - 1)) {
      Actions.HomeworkTask();
    }
  }


  render() {
    const { list } = this.props;
    const { index } = this.state;
    // 当前批阅的题目
    const currentQues = list[index];
    // 判断当前题目是否有批改好了的分数
    let correctScore = currentQues && currentQues.score;
    // 学生批阅了则展示学生批阅的分数
    if (currentQues && currentQues.studentMarked) {
      correctScore = currentQues.studentMarkScore;
    }
    // 判断当前题目是否还可再修改批阅结果---当前题目已有分数结果(分数结果也可为0)且点击了完成批阅（finishBtnDisable为true）时不可修改批阅结果，不调用onChange函数
    let canChangeScoreResult = true;
    if (correctScore >= 0 && currentQues.finishBtnDisable) {
      canChangeScoreResult = false;
    }
    // console.log(7878, index, list, currentQues);
    return (
      <View style={styles.wrapper}>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          width={400}
          height={360}
          // overlayOpacity={0}
          dialogStyle={{
            position: 'absolute', left: 144, bottom: 130, backgroundColor: 'transparent',
          }}
        >
          <View style={{
            // width: 1,
            height: 340,
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 8,
          }}
          >
            <Text style={styles.score_info}>满分10分：</Text>
            <Radio.Group
              // defaultValue={defaultValue}
              key={index}
              onChange={(score) => {
                // console.log(score);
                const { actions } = this.props;
                actions.controlFinsihBtnAction({ finishBtnDisable: false, index });
                actions.setCorrectResultAction({ score, index });
                this.popupDialog.dismiss();
              }}
              iconWrapStyle={styles.icon_btn_style}
              textStyle={styles.text_btn_style}
              checkedIconWrapStyle={styles.icon_checked_style}
              checkedTextStyle={{
                color: '#fff',
                fontSize: 36,
              }}
              style={styles.radio_wrapper}
              childStyle={styles.radio_childStyle}
            >
              {
                this.labelData.map((proItem, proIndex) => (
                  <Radio.Button key={proIndex} value={proItem.value}>{proItem.label}</Radio.Button>
                ))
              }
            </Radio.Group>
            {/* <WrongReason
              onChange={() => this.popupDialog.dismiss()}
            /> */}
          </View>
          <Image
            source={TriangleImg}
            style={{ width: 24, marginLeft: 186 }}
          />
        </PopupDialog>
        <Modal />
        {/* 头部自定义导航条 */}
        <View style={styles.head}>
          <TouchableOpacity
            // 返回首页
            onPress={Actions.Student}
          >
            <Entypo name="chevron-thin-left" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.head_content}>
            <Text style={styles.head_content_word}>第{index + 1}题,共{list.length}题待批阅</Text>
          </View>
        </View>
        <ScrollView onLayout={this.handleLayout}>
          <View style={styles.content_wrap}>
            {/* 这b异步传数据进来 onIndexChanged 就不起作用了 */}
            {
            list.length > 0 ? (
              <Swiper
                ref={(node) => { this.swiperRef = node; }}
                loop={false}
                showsPagination={false}
                index={index}
                // loadMinimal
                onIndexChanged={(nextIndex) => {
                  // console.log('onIndexChanged, nextIndex=', nextIndex);
                  this.setState({
                    index: nextIndex,
                  });
                }}
              >
                {
              list.map((item, index1) => (
                <View style={styles.wrap} key={index1}>
                  <View style={styles.body}>
                    <View style={styles.body_homework_title}>
                      <Swiper
                        style={styles.wrapper}
                        loop={false}
                        // showsPagination={false}
                        paginationStyle={styles.paginationStyle} // 暂时没覆盖成功
                        dotStyle={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: 'rgba(51, 51, 51, 0.20)',
                        }}
                        activeDotStyle={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          backgroundColor: '#30bf6c',
                        }}
                      >
                        {
                          item.newContent.map((item2, index2) => (
                            <TouchableOpacity
                              // 返回首页
                              onPress={() => {
                                console.log('查看学生的答案', item2);
                                console.log(draftToHtml(JSON.parse(item2)));
                                // const data = {
                                //   // studentName: '李香兰',
                                //   url: item.answerFileUrl, // 最好https，ios兼容问题
                                //   imageViewType: 'rotate', // 默认 "ordinary"
                                // };
                                // // const data = { url: , studentName: '学生' };
                                // ModalApi.onOppen('ImageViewer', data);
                              }}
                              key={index2}
                            >
                              {/* <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: item.answerFileUrl }}
                              /> */}
                              { this.htmlViewComponent(item2) }
                            </TouchableOpacity>
                          ))
                        }
                      </Swiper>
                    </View>
                    <View style={styles.space} />
                    <ScrollView>
                      <TouchableOpacity
                      // 点击查看学生题目
                        onPress={() => {
                        // console.log('查看学生的答案');
                          const data = {
                          // studentName: '李香兰',
                            url: item.answerFileUrl, // 最好https，ios兼容问题
                            imageViewType: 'rotate', // 默认 "ordinary"
                          };
                          // const data = { url: , studentName: '学生' };
                          ModalApi.onOppen('ImageViewer', data);
                        }}
                      >
                        {/* <View style={styles.body_homework_studentAnswer}>
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          // source={{ uri: `${item.answerFileUrl}` }}
                          source={{ uri: `${item.answerFileUrl}` }}
                        />
                      </View> */}
                        {
                        this.studentAnserImage(item.answerFileUrl)
                      }
                      </TouchableOpacity>
                    </ScrollView>
                  </View>
                </View>
              ))
            }
              </Swiper>
            ) : null
          }
          </View>
        </ScrollView>
        <View>
          {
          list.length > 0
            ? (
              <View style={styles.foot}>
                <View style={styles.foot_child_left}>
                  <CorrentResultCard
                    key={index}
                    defaultValue={correctScore}
                    disabled={!canChangeScoreResult}
                    onChange={a => this.onResultChange(a, index)}
                  />
                </View>
                <View style={styles.foot_child_right}>
                  <TouchableOpacity
                    onPress={() => this.finishReadOver(currentQues, index)}
                    disabled={currentQues.finishBtnDisable}
                  >
                    {
                  index !== (list.length - 1) ? (
                    <I18nText style={[styles.foot_btn, !currentQues.finishBtnDisable && styles.btn_color_active]}>
                      homeworkCorrecting.finishCorrectingAndNext
                    </I18nText>
                  ) : (
                    <I18nText style={[styles.foot_btn, !currentQues.finishBtnDisable && styles.btn_color_active]}>
                      homeworkCorrecting.finishCorrectingNotNext
                    </I18nText>
                  )
                }
                  </TouchableOpacity>
                </View>
              </View>
            )
            : null
        }
        </View>
      </View>
    );
  }
}

HomeworkCorrecting.propTypes = {
  list: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  homeworkId: PropTypes.string,
};

HomeworkCorrecting.defaultProps = {
  homeworkId: '509732426772119552',
};

const mapStateToProps = (state) => {
  const { list } = state.homeworkCorrectingReducer;
  return {
    list,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(correctingActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkCorrecting);
