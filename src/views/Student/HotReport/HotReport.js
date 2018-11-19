// 战绩热报页面
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import HotReportCard from './Component/HotReportCard';
import * as actions from '../../../actions/hotReportActions';
import styles from './HotReport.scss';
import I18nText from '../../../components/I18nText';
import Nav from '../../../components/Nav';
import MatchNoOpponent from './Component/MatchNoOpponent';
import { ChangeAchievementsBroadcastStatus } from '../../../actions/homeworkTask';

class HotReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0, // 当前展示的热报，当查看详情时需要滑动展示多此作业PK的结果，如果是单次作业则只有一页展示
      hotReportData: props.hotReportData || [], // 战绩热报数据
    };
  }

  componentDidMount() {
    // 请求战绩热报的数据
    const { actions: { fetchHotReportAction } } = this.props;
    const id = '123456';
    fetchHotReportAction({ id }, 'REQUEST');
  }

  // 滑动查看结果改变currentIndex
  onIndexChanged = (nextIndex) => {
    this.setState({
      currentIndex: nextIndex,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { hotReportData } = nextProps;
    if (!R.equals(hotReportData, prevState.hotReportData)) {
      return {
        hotReportData,
      };
    }
    return null;
  }


  render() {
    const { currentIndex, hotReportData } = this.state;
    const dataLen = hotReportData.length;
    const { onChangeAchievementsBroadcastStatus } = this.props;
    return (
      <View style={styles.hotReport_container}>
        <Nav goBackFun={() => {
          onChangeAchievementsBroadcastStatus(true);
          Actions.HomeworkTask();
        }}
        >
          <I18nText>HotReport.title</I18nText>
        </Nav>
        <Swiper
          ref={(node) => { this.swiperRef = node; }}
          loop={false}
          showsPagination={false}
          onIndexChanged={this.onIndexChanged}
        >
          {
            hotReportData && hotReportData.map((item, index) => (
              <ScrollView key={index}>
                {
                  item.matchToOpponent
                    ? (
                      <View>
                        <View style={styles.homeworkTitle_box}>
                          <View style={styles.homeworkTitle}>
                            <Text style={styles.title_txt}>
                              {
                                item.result
                                  ? `恭喜你在《${item.title}》比赛中获得胜利！`
                                  : `很遗憾你在《${item.title}》比赛中挑战失败！`
                              }
                            </Text>
                          </View>
                        </View>
                        {
                          item.resultList.map((items, indexs) => <HotReportCard data={items} key={indexs} />)
                        }
                        <View style={styles.account_result}>
                          <I18nText style={styles.reward}>HotReport.reward</I18nText>
                          {
                            item.integral && (
                            <Text style={styles.show_score}>
                              <I18nText>HotReport.integral</I18nText>
                              + {item.integral}
                              &nbsp;&nbsp;
                            </Text>
                            )
                          }
                          {
                            item.contribution && (
                            <Text style={styles.show_score}>
                              <I18nText>HotReport.contributionOfTeam</I18nText>
                              + {item.contribution}
                            </Text>
                            )
                          }
                        </View>
                      </View>
                    )
                    : (
                      <MatchNoOpponent data={item} />
                    )
                }
              </ScrollView>
            ))
          }
        </Swiper>
        <View style={styles.footer_container}>
          <View style={styles.footers}>
            <Text style={styles.footer_txt}>{currentIndex + 1}/{dataLen}</Text>
          </View>
        </View>
      </View>
    );
  }
}

HotReport.propTypes = {
  hotReportData: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  onChangeAchievementsBroadcastStatus: PropTypes.func,
};

HotReport.defaultProps = {
  onChangeAchievementsBroadcastStatus: () => {},
};

const mapStateToProps = (state) => {
  const { hotReportData } = state.hotReportReducer;
  return {
    hotReportData,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  onChangeAchievementsBroadcastStatus: bindActionCreators(ChangeAchievementsBroadcastStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotReport);
