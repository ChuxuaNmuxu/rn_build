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

class HotReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0, // 当前展示的热报，当查看详情时需要滑动展示多此作业PK的结果，如果是单次作业则只有一页展示
      hotReportData: props.hotReportData || {}, // 战绩热报数据
    };
  }

  componentDidMount() {
    // 先暂时使用下模拟的数据
    const { data } = this.props;
    const classGameId = data.ids[data.index];
    // 请求战绩热报的数据
    const { actions: { fetchHotReportAction } } = this.props;
    fetchHotReportAction({ classGameId }, 'REQUEST');
  }

  // 滑动查看结果改变currentIndex
  onIndexChanged = (nextIndex) => {
    this.setState({
      currentIndex: nextIndex,
    }, () => {
      const { data } = this.props;
      const classGameId = data.ids[nextIndex];
      // 请求战绩热报的数据
      const { actions: { fetchHotReportAction } } = this.props;
      fetchHotReportAction({ classGameId }, 'REQUEST');
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


  // 标题比赛结果展示
  getNoticeText = () => {
    const { hotReportData } = this.state;
    let titles;
    // 区分 你 还是 你们
    let targetName = '你';
    if (hotReportData.playerInfo.length > 1) {
      targetName = '你们';
    }
    // groupResult: 小组比赛结果 1:胜利 2:平手 3:失败 ,
    if (hotReportData.groupResult === 1) {
      titles = `恭喜${targetName}在《${hotReportData.gameName}》比赛中获得胜利！`;
    } else if (hotReportData.groupResult === 2) {
      titles = `${targetName}在《${hotReportData.gameName}》比赛中双方实力均衡！`;
    } else {
      titles = `很遗憾《${targetName}在《${hotReportData.gameName}》比赛中挑战失败！`;
    }
    return titles;
  }

  // 正在加载时展示
  renderLoadingDom = i => (
    <View style={styles.loadBox} key={i || -1}>
      <Text style={styles.loadText}>正在加载数据......</Text>
    </View>
  )

  render() {
    const { currentIndex, hotReportData } = this.state;
    const { data: { ids } } = this.props;
    const dataLen = ids.length;
    return (
      <View style={styles.hotReport_container}>
        {
        !R.isEmpty(hotReportData)
          ? (
            <View style={styles.hotReport_container}>
              <Nav goBackFun={() => { Actions.HomeworkTask(); }}>
                <I18nText>HotReport.title</I18nText>
              </Nav>
              <Swiper
                ref={(node) => { this.swiperRef = node; }}
                loop={false}
                showsPagination={false}
                onIndexChanged={this.onIndexChanged}
              >
                {
                ids && ids.map((item, index) => (index === currentIndex
                  ? (
                    <ScrollView key={index}>
                      {
                      !hotReportData.noGroup
                        ? (
                          <View>
                            <View style={styles.homeworkTitle_box}>
                              <View style={styles.homeworkTitle}>
                                <Text style={styles.title_txt}>
                                  {this.getNoticeText()}
                                </Text>
                              </View>
                            </View>
                            {
                              hotReportData.playerInfo.map((items, indexs) => <HotReportCard data={items} key={indexs} />)
                            }
                            <View style={styles.account_result}>
                              <I18nText style={styles.reward}>HotReport.reward</I18nText>
                              {
                                hotReportData.gameScore && (
                                <Text style={styles.show_score}>
                                  <I18nText>HotReport.integral</I18nText>
                                  + {hotReportData.gameScore}
                                  &nbsp;&nbsp;
                                </Text>
                                )
                              }
                              {
                                hotReportData.contributionScore && (
                                <Text style={styles.show_score}>
                                  <I18nText>HotReport.contributionOfTeam</I18nText>
                                  + {hotReportData.contributionScore}
                                </Text>
                                )
                              }
                            </View>
                          </View>
                        )
                        : (
                          <MatchNoOpponent data={hotReportData} />
                        )
                      }
                    </ScrollView>
                  )
                  : this.renderLoadingDom(index)
                ))
              }
              </Swiper>
              <View style={styles.footer_container}>
                <View style={styles.footers}>
                  <Text style={styles.footer_txt}>{currentIndex + 1}/{dataLen}</Text>
                </View>
              </View>
            </View>
          )
          : this.renderLoadingDom()
      }
      </View>
    );
  }
}

HotReport.propTypes = {
  hotReportData: PropTypes.object.isRequired,
  data: PropTypes.object, // 首页比赛报告传过来的数据，包括所有报告的id集合和当前需要展示的index
  actions: PropTypes.object.isRequired,
};

HotReport.defaultProps = {
  data: {
    ids: ['512583454899044352'], // 曾昊鑫的一份比赛报告id
    index: 0,
  },
};

const mapStateToProps = (state) => {
  const { hotReportData } = state.hotReportReducer;
  return {
    hotReportData,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotReport);
