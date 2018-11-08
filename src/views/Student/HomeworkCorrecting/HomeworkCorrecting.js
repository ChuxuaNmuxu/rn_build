import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
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
    const { actions, homeworkId } = this.props;
    actions.fetchListAction(homeworkId, 'REQUEST');
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

  // 富文本数据展示框
  htmlViewComponent=(htmlContent) => {
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

  // 完成批阅，下一题 按钮只能到达本题序号后面未批阅的第一道题处，如果当前是序号的最后一题且前面还有未批阅的题目则再跳到前面未批阅的第一道题那，
  // 完成批阅 按钮只出现在最后一道未批阅 的题目处
  finishReadOver = (item, index) => {
    const { actions } = this.props;
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
          let ind;
          const { list } = this.props;
          // 从当前题目的索引开始遍历
          for (let i = index; i < list.length + index; i++) {
            ind = i % list.length;
            if (list[ind].studentMarked === 0) break;
          }
          // 需要跳到的下一题索引
          const nextIndex = ind;
          // 比较一下需要跳到的题目序号与当前题目序号的差值
          const scrollNum = nextIndex - index;
          // 如果当前题目不是未批阅的最后一道题，则跳转到下一道未批阅的题目处
          if (!this.judgeCurrentQuesIsLast(index)) {
            this.swiperRef.scrollBy(scrollNum);
          }
        },
      }, 'REQUEST');
    }
    // 如果当前题目是未批阅的最后一道题 点击 完成批阅 需要跳转至首页
    if (this.judgeCurrentQuesIsLast(index)) {
      Actions.HomeworkTask();
    }
  }

  // 用来判断当前题目是否为最后一道未批阅的题目
  judgeCurrentQuesIsLast = (index) => {
    const { list } = this.props;
    // 当前批阅的题目
    const currentQues = list[index];
    let unCorrectNum = 0;
    // 判断是不是最后一道未批阅的题目
    let isLastUnCorrectQue = false;
    for (let i = 0; i < list.length; i++) {
      if (list[i].studentMarked === 0) {
        unCorrectNum++;
      }
    }
    if (unCorrectNum === 1 && currentQues.studentMarked === 0) {
      isLastUnCorrectQue = true;
    }
    return isLastUnCorrectQue;
  }

  render() {
    const { list } = this.props;
    const { index } = this.state;
    // 当前批阅的题目
    const currentQues = list[index];
    // 判断当前题目是否有批改好了的分数,studentMarkScore在未批阅时默认为0，需要考虑下这种情况
    let correctScore = currentQues && currentQues.score;
    // 判断当前题目是否还可再修改批阅结果---当前题目studentMarked字段为1时表明该批阅结果已提交，不可修改批阅结果，不调用onChange函数
    let canChangeScoreResult = true;
    if (currentQues && currentQues.studentMarked) {
      correctScore = currentQues.score || currentQues.studentMarkScore;
      canChangeScoreResult = false;
    }
    // console.log(7878, index, list, currentQues);
    // console.log(9999, '当前是否为最后一道未批阅的题目', this.judgeCurrentQuesIsLast(index));
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
                this.setPopScore(score, index);
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
                              onPress={() => {

                              }}
                              key={index2}
                            >
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
                        const data = {
                          url: item.answerFileUrl, // 最好https，ios兼容问题
                          imageViewType: 'rotate', // 默认 "ordinary"
                        };
                        ModalApi.onOppen('ImageViewer', data);
                      }}
                    >
                      <View style={styles.body_homework_studentAnswer}>
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          source={{ uri: `${item.answerFileUrl}` }}
                        />
                      </View>
                    </TouchableOpacity>
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
                      !this.judgeCurrentQuesIsLast(index) ? (
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
  homeworkId: '505700854901243904', // 杨海宏的作业
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
