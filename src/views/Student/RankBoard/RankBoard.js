// 排行榜页面
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
      // 积分模拟数据
      integraltList: [{
        studentId: 1,
        studentName: '李文东',
        integral: 9898,
      }, {
        studentId: 2,
        studentName: '王学刚',
        integral: 9500,
      }, {
        studentId: 3,
        studentName: '刘英秀',
        integral: 9112,
      }, {
        studentId: 4,
        studentName: '张晓文1',
        integral: 8898,
      }, {
        studentId: 5,
        studentName: '张晓文2',
        integral: 8238,
      }, {
        studentId: 6,
        studentName: '张晓文3',
        integral: 8000,
      }],
    };
  }

  // 渲染子组件
  _renderItem = ({ item, index }) => {
    let imgs = trophyGoldImg;
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
          <Text style={styles.studentName}>{item.studentName}</Text>
        </View>
        <View>
          <Text style={styles.rightText}>
            <I18nText style={styles.numText}>RankBoard.integral</I18nText>
            {item.integral}
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
    const { integraltList, currentTab } = this.state;
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
        {
          currentTab === 0
            ? (
              <ScrollView key={0}>
                <Text>积分</Text>
                {
                  integraltList
                    && (
                    <FlatList
                      keyExtractor={() => `${Math.random()}`}
                      data={integraltList}
                      renderItem={this._renderItem}
                    />
                    )
                }
              </ScrollView>
            )
            : (
              <ScrollView key={1}>
                <Text>贡献度</Text>
                {
                integraltList
                  && (
                  <FlatList
                    keyExtractor={() => `${Math.random()}`}
                    data={integraltList}
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

export default RankBoard;
