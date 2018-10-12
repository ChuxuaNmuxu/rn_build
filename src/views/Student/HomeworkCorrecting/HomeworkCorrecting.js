import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  // TouchableHighlight,
  ScrollView,
  findNodeHandle,
  NativeModules,
} from 'react-native';
import immer from 'immer';
import Popover from 'react-native-modal-popover';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import WrongReason from '../../../components/WrongReason';
import I18nText from '../../../components/I18nText';
import styles from './HomeworkCorrecting.scss';
import * as correctingActions from '../../../actions/homeworkCorrectingAction';

class HomeworkCorrecting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      // isVisible: false,
      popInfo: {
        score: undefined,
        visible: false,
        anchor: {},
      },
    };
  }

  componentDidMount() {
    console.log('调用 HomeworkCorrecting 组件！', this.props);
    const { actions, homeworkId } = this.props;
    actions.fetchListAction(homeworkId, 'REQUEST');
  }

  setPopScore = (score) => {
    this.setState(immer((state) => {
      state.popInfo.score = score;
    }));
  }

  setButton = (index) => {
    const handle = findNodeHandle(this[`partOfTheError${index}`]);
    if (handle) {
      NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
        console.log(x, y, width, height);
        this.setState(immer((state) => {
          state.popInfo.anchor = {
            x, y, width, height,
          };
        }));
      });
    }
  };

  openPop = (index) => {
    this.setButton(index);
    this.setState(immer((state) => {
      state.popInfo.visible = true;
    }));
  }

  closePop = () => {
    this.setState(immer((state) => {
      state.popInfo.visible = false;
    }));
  }
  // showPopover = () => {
  //   const { isVisible } = this.state;
  //   this.setState({
  //     isVisible: !isVisible,
  //   });
  // }

  render() {
    const { list } = this.props;
    const { index, popInfo } = this.state;
    console.log(index);
    return (
      <View style={styles.wrapper}>
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
                        {/* {
                          item.url.map((item2, index2) => ( */}
                        <TouchableOpacity
                              // 返回首页
                          onPress={() => console.log('点击查看老师布置的题目')}
                          // key={index2}
                        >
                          <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: item.answerFileUrl }}
                          />
                        </TouchableOpacity>
                        {/* ))
                        } */}
                      </Swiper>
                    </View>
                    <View style={styles.space} />
                    <TouchableOpacity
                      // 点击查看学生题目
                      onPress={() => console.log('点击查看学生题目')}
                    >
                      <View style={styles.body_homework_studentAnswer}>
                        <Image
                          style={{ width: '100%', height: '100%' }}
                          source={{ uri: `${item.answerFileUrl}` }}
                        />
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
                      <TouchableOpacity onPress={() => this.setPopScore(10)}>
                        <I18nText style={[styles.foot_btn, styles.btn_color_green]}>
                          homeworkCorrecting.correct
                        </I18nText>
                      </TouchableOpacity>
                      <View style={styles.space_2} />
                      {/* 部分正确 */}
                      <View>
                        {/* 气泡弹出框 */}
                        <Popover
                          contentStyle={[styles.contentStyle, {
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 0.5,
                            shadowRadius: 5,
                            shadowColor: 'rgba(87,163,222,0.13)',
                            elevation: 4,
                          }]}
                          visible={popInfo.visible}
                          fromRect={popInfo.anchor}
                          onClose={this.closePopover}
                          placement="auto"
                          backgroundStyle={{ opacity: 0, backgroundColor: 'rgba(0,0,0,0)' }}
                        >
                          {/* 模拟的 */}
                          <WrongReason onChange={this.closePop} />
                          {/* <Text>123</Text> */}
                        </Popover>
                        <TouchableOpacity
                          onPress={() => this.openPop(index1)}
                          ref={(node) => { this[`partOfTheError${index1}`] = node; }}
                        >
                          <I18nText style={[styles.foot_btn, styles.btn_color_orange]}>
                              homeworkCorrecting.partOfTheError
                          </I18nText>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.space_2} />
                      {/* 正确 */}
                      <TouchableOpacity onPress={() => this.setPopScore(0)}>
                        <I18nText style={[styles.foot_btn, styles.btn_color_pink]}>
                          homeworkCorrecting.error
                        </I18nText>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.foot_child_right}>
                      <TouchableOpacity
                        onPress={() => {
                          // const newIndex = index < list.length - 1 ? index + 1 : index;
                          const bol = index < list.length - 1;
                          console.log('完成批阅，下一题, 当前的 index=', index, '是否滑动', bol);
                          if (bol) this.swiperRef.scrollBy(1);
                          // 这个scrollBy会触发 onIndexChanged 所以不需要在这边设置 this.setState({})
                        }}
                      >
                        <I18nText style={[styles.foot_btn, styles.btn_color_right]}>
                          homeworkCorrecting.finishCorrectingAndNext
                        </I18nText>
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
  homeworkId: '500245896139636736',
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
