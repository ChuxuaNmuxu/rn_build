import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
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

  // 点击头像进入 个人信息设置 页
  goPersonalInfo = () => {

  }

  // 点击 挑战次数 进入 挑战次数详情页
  goChallengesPage = () => {

  }

  // 点击 积分 进入 积分详情页
  goIntegralPage = () => {

  }

  // 点击 团队贡献度 进入 贡献度详情页
  goTeamContributionPage = () => {

  }

  // 点击 作业PK科目设置 进入 竞争科目设置页
  goSubjectSettingPage = () => {

  }

  // 点击 排行榜 进入 排行榜页面
  goLeaderBoardPage = () => {

  }

  render() {
    // 随机显示当前任务头像---男生头像或者女生头像
    const currentAvatar = Math.random() > 0.5 ? boyImg : girlImg;
    return (
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.avatar} onPress={() => this.goPersonalInfo()}>
          <Image source={currentAvatar} width={145} height={145} />
        </TouchableOpacity>
        <View style={styles.mine_content}>
          <TouchableOpacity style={styles.content_list} onPress={() => this.goChallengesPage()}>
            <Text style={styles.numbers}>10</Text>
            <I18nText style={styles.texts}>My.challengesNum</I18nText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.content_list} onPress={() => this.goIntegralPage()}>
            <Text style={styles.numbers}>21</Text>
            <I18nText style={styles.texts}>My.integral</I18nText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.content_list} onPress={() => this.goTeamContributionPage()}>
            <Text style={styles.numbers}>15</Text>
            <I18nText style={styles.texts}>My.teamContribution</I18nText>
          </TouchableOpacity>
        </View>
        <View style={styles.mine_items}>
          <TouchableOpacity style={styles.items} onPress={() => this.goSubjectSettingPage()}>
            <I18nText style={styles.item_text}>My.subjectSettting</I18nText>
            <IconSet
              name="shangyiye"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <View style={styles.borderSpace} />
          <TouchableOpacity style={styles.items} onPress={() => this.goLeaderBoardPage()}>
            <I18nText style={styles.item_text}>My.leaderBoard</I18nText>
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

export default My;
