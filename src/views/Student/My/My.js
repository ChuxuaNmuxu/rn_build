import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/myIndexActions';
import styles from './My.scss';
import girlImg from '../../../public/img/girl.png';
import boyImg from '../../../public/img/boy.png';
import I18nText from '../../../components/I18nText';
import IconSet from '../../../components/Icon';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 请求数据
    const { actions: { fetchMyIndexAction } } = this.props;
    fetchMyIndexAction(null, 'REQUEST');
  }

  // 点击头像进入 个人信息设置 页
  goPersonalInfo = () => {
    Actions.PersonalInformation();
  }

  // 点击 作业PK科目设置 进入 竞争科目设置页
  goSubjectSettingPage = () => {
    Actions.SubjectSetting();
  }

  // 点击 排行榜 进入 排行榜页面
  goRankBoardPage = () => {
    Actions.RankBoard();
  }

  // 点击 挑战次数/积分/团队贡献度 分别进入对应页面---当为0时不跳转页面,且展示不可点击状态
  goDetailsPage = (type, num) => {
    if (num) {
      if (type === 'challengesNum') {
        Actions.ChallengeDetails();
      } else if (type === 'integral') {
        Actions.IntegralDetails();
      } else {
        Actions.ContributionDetails();
      }
    }
  }

  render() {
    // 随机显示当前任务头像---男生头像或者女生头像
    const { myIndexData, sex } = this.props;
    const currentAvatar = sex === 'F' ? girlImg : boyImg;
    return (
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.avatar} onPress={this.goPersonalInfo}>
          <Image source={currentAvatar} width={145} height={145} />
        </TouchableOpacity>
        <View style={styles.mine_content}>
          <TouchableOpacity
            style={styles.content_list}
            activeOpacity={myIndexData.gameCount ? 0.2 : 1}
            onPress={() => this.goDetailsPage('challengesNum', myIndexData.gameCount)}
          >
            <Text style={[myIndexData.gameCount ? styles.numbers : styles.zeroNum]}>
              {myIndexData.gameCount}
            </Text>
            <I18nText style={styles.texts}>My.challengesNum</I18nText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.content_list}
            activeOpacity={myIndexData.score ? 0.2 : 1}
            onPress={() => this.goDetailsPage('integral', myIndexData.score)}
          >
            <Text style={[myIndexData.score ? styles.numbers : styles.zeroNum]}>
              {myIndexData.score}
            </Text>
            <I18nText style={styles.texts}>My.integral</I18nText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.content_list}
            activeOpacity={myIndexData.contributeScore ? 0.2 : 1}
            onPress={() => this.goDetailsPage('teamContribution', myIndexData.contributeScore)}
          >
            <Text style={[myIndexData.contributeScore ? styles.numbers : styles.zeroNum]}>
              {myIndexData.contributeScore}
            </Text>
            <I18nText style={styles.texts}>My.teamContribution</I18nText>
          </TouchableOpacity>
        </View>
        <View style={styles.mine_items}>
          <TouchableOpacity style={styles.items} onPress={this.goSubjectSettingPage}>
            <I18nText style={styles.item_text}>My.subjectSetting</I18nText>
            <IconSet
              name="shangyiye"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <View style={styles.borderSpace} />
          <TouchableOpacity style={styles.items} onPress={this.goRankBoardPage}>
            <I18nText style={styles.item_text}>My.rankBoard</I18nText>
            <IconSet
              name="shangyiye"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

My.propTypes = {
  myIndexData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  sex: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { myIndexData } = state.myIndexReducer;
  const { userInfo: { sex } } = state.account;
  return {
    myIndexData,
    sex,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(My);
