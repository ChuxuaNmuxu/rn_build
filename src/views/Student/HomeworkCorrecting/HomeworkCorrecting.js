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
import draftToHtml from '../../../utils/draftjsToHtml';
import Radio from '../../../components/Radio';
import Modal, { ModalApi } from '../../../components/Modal';
// import WrongReason from '../../../components/WrongReason';
import I18nText from '../../../components/I18nText';
import styles from './HomeworkCorrecting.scss';
import * as correctingActions from '../../../actions/homeworkCorrectingAction';

class HomeworkCorrecting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      // isVisible: false,
    };
  }

  componentDidMount() {
    console.log('调用 HomeworkCorrecting 组件！', this.props);
    const { actions, homeworkId } = this.props;
    actions.fetchListAction(homeworkId, 'REQUEST');
  }

  setPopScore = (score, index) => {
    const { actions } = this.props;
    actions.setCorrectResultAction({ score, index });
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
    };
    // const newIndex = index < list.length - 1 ? index + 1 : index;
    const bol = index < list.length - 1;
    console.log('完成批阅，下一题, 当前的 index=', index, '是否滑动', bol);
    if (bol) this.swiperRef.scrollBy(1);
    // 这个scrollBy会触发 onIndexChanged 所以不需要在这边设置 this.setState({})
    actions.saveCorrectResultAction(params, 'REQUEST');
  }

  render() {
    const { list } = this.props;
    const { index } = this.state;
    const labelData = [ // 标签数据
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
    // if (list.length > 0) {
    //   console.log(draft)
    // }
    console.log(index, list.length);
    return (
      <View style={styles.wrapper}>
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          width={850}
          height={340}
        >
          <View style={{
            // width: 1,
            height: 340,
            backgroundColor: 'white',
          }}
          >
            <Radio.Group
              // defaultValue={defaultValue}
              onChange={(score) => {
                console.log(score);
                const { actions } = this.props;
                actions.setCorrectResultAction({ score, index });
                this.popupDialog.dismiss();
              }}
              checkedIconWrapStyle={{
                borderColor: '#fa5656',
              }}
              checkedTextStyle={{
                color: '#fa5656',
              }}
              style={styles.radio_wrapper}
              childStyle={styles.radio_childStyle}
            >
              {
                labelData.map((proItem, proIndex) => (
                  <Radio.Button key={proIndex} value={proItem.value}>{proItem.label}</Radio.Button>
                ))
              }
            </Radio.Group>
            {/* <WrongReason
              onChange={() => this.popupDialog.dismiss()}
            /> */}
          </View>
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
        <ScrollView>
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
                  console.log('onIndexChanged, nextIndex=', nextIndex);
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
                                console.log('查看老师布置的作业！');
                                // const data = { url: item.answerFileUrl, studentName: '老师布置的作业' };
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
                      <View style={styles.body_homework_studentAnswer}>
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          source={{ uri: `${item.answerFileUrl}` }}
                        />
                        {/* { this.htmlViewComponent(item.answerFileUrl) } */}
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.foot}>
                    <View style={styles.foot_child_left}>
                      <View>
                        <I18nText style={styles.foot_word}>
                          homeworkCorrecting.homeworkCorrecting
                        </I18nText>
                      </View>
                      {/* 错误 */}
                      <TouchableOpacity onPress={() => this.setPopScore(10, index1)}>
                        <I18nText style={[styles.foot_btn, styles.btn_color_green]}>
                          homeworkCorrecting.correct
                        </I18nText>
                      </TouchableOpacity>
                      <View style={styles.space_2} />
                      {/* 部分正确 */}
                      <View>
                        {/* 气泡弹出框 */}
                        <TouchableOpacity
                          // onPress={() => this.openPop(index1)}
                          onPress={() => this.popupDialog.show()}
                        >
                          <I18nText style={[styles.foot_btn, styles.btn_color_orange]}>
                              homeworkCorrecting.partOfTheError
                          </I18nText>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.space_2} />
                      {/* 正确 */}
                      <TouchableOpacity onPress={() => this.setPopScore(0, index1)}>
                        <I18nText style={[styles.foot_btn, styles.btn_color_pink]}>
                          homeworkCorrecting.error
                        </I18nText>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.foot_child_right}>
                      <TouchableOpacity
                        onPress={() => this.finishReadOver(item, index1)}
                        disabled={item.score === undefined}
                      >
                        {
                          index !== (list.length - 1) ? (
                            <I18nText style={[styles.foot_btn, styles.btn_color_right]}>
                              homeworkCorrecting.finishCorrectingAndNext
                            </I18nText>
                          ) : (
                            <I18nText style={[styles.foot_btn, styles.btn_color_right]}>
                            homeworkCorrecting.finishCorrectingNotNext
                            </I18nText>
                          )
                        }

                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            }
              </Swiper>
            ) : null
          }
          </View>
        </ScrollView>
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
  homeworkId: '505700854901243904', // 卢晨的作业
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
