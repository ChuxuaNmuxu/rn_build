// 排行榜页面
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/rankBoardAction';
import styles from './RankBoard.scss';
import I18nText from '../../../components/I18nText';
import Nav from '../../../components/Nav';
import trophyBigImg from '../../../public/img/trophy-big.png';
import trophyGoldImg from '../../../public/img/trophy-gold.png';
import trophySilverImg from '../../../public/img/trophy-silver.png';
import trophyCopperImg from '../../../public/img/trophy-copper.png';

class RankBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0, // 默认展示 0：积分排名，1：贡献度排名
    };
  }

  componentDidMount() {
    const { studentId } = this.props;
    // 请求积分排名数据
    const { actions: { fetchIntegraltDataAction, fetchContributionDataAction } } = this.props;
    fetchIntegraltDataAction({ studentId }, 'REQUEST');
    // 请求贡献度排名数据
    fetchContributionDataAction({ studentId }, 'REQUEST');
  }

  // 渲染子组件
  _renderItem = ({ item, index }) => {
    let imgs = trophyGoldImg;
    const { currentTab } = this.state;
    if (index === 2) {
      imgs = trophyCopperImg;
    }
    if (index === 1) {
      imgs = trophySilverImg;
    }
    return (
      <View
        style={styles.rankCard}
        key={index}
        index={index}
      >
        <View style={styles.leftText}>
          {
          index <= 2
            ? (
              <Image
                source={imgs}
                width={60}
                height={60}
              />
            )
            : <Text style={styles.rankNum}>NO. {index + 1}</Text>
        }
          <Text style={styles.studentName}>{item.userName}</Text>
        </View>
        <View>
          <Text style={styles.rightText}>
            {
              currentTab
                ? <I18nText style={styles.numText}>RankBoard.contribution</I18nText>
                : <I18nText style={styles.numText}>RankBoard.integral</I18nText>
            }
            {item.score}
          </Text>
        </View>
      </View>
    );
  }

  // 切换排行榜
  changeTabs = (index) => {
    const { currentTab } = this.state;
    if (currentTab !== index) {
      this.setState({
        currentTab: index,
      });
    }
  }

  render() {
    const { currentTab } = this.state;
    const { integralDta, contributionData } = this.props;
    const list = currentTab ? contributionData : integralDta;
    return (
      <View style={styles.rankBoard_container}>
        <Nav goBackFun={() => { Actions.My(); }}>
          <I18nText>RankBoard.title</I18nText>
        </Nav>
        <View style={styles.imgStyle}>
          <Image source={trophyBigImg} width={560} height={560} />
        </View>
        <View style={styles.borderSpace} />
        <View style={styles.tabsHeader}>
          <TouchableOpacity
            style={[styles.tabsBtn, currentTab === 0 && styles.activeTabsBtn]}
            onPress={() => this.changeTabs(0)}
          >
            <I18nText
              style={[styles.tabsTxt, currentTab === 0 && styles.activeTabsTxt]}
            >
            RankBoard.integralRank
            </I18nText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabsBtn, currentTab === 1 && styles.activeTabsBtn]}
            onPress={() => this.changeTabs(1)}
          >
            <I18nText
              style={[styles.tabsTxt, currentTab === 1 && styles.activeTabsTxt]}
            >
            RankBoard.contributionRank
            </I18nText>
          </TouchableOpacity>
        </View>
        <View style={styles.borderSpace} />
        {
          currentTab === 0
            ? (
              <ScrollView key={0}>
                {
                  list
                    && (
                    <FlatList
                      keyExtractor={() => `${Math.random()}`}
                      data={list}
                      renderItem={this._renderItem}
                    />
                    )
                }
              </ScrollView>
            )
            : (
              <ScrollView key={1}>
                {
                list
                  && (
                  <FlatList
                    keyExtractor={() => `${Math.random()}`}
                    data={list}
                    renderItem={this._renderItem}
                  />
                  )
              }
              </ScrollView>
            )
        }
      </View>
    );
  }
}

RankBoard.propTypes = {
  integralDta: PropTypes.array.isRequired,
  contributionData: PropTypes.array.isRequired,
  studentId: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { integralDta, contributionData } = state.rankBoardReducer;
  const { userInfo: { studentId } } = state.account;
  return {
    integralDta,
    contributionData,
    studentId,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RankBoard);
