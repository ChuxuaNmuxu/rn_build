// 科目设置页面
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Switch,
} from 'react-native';
import styles from './SubjectSetting.scss';
import I18nText from '../../../components/I18nText';
import Header from '../PersonalInformation/Component';

class SubjectSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 科目模拟数据
      subjectList: [{
        subjectId: 1,
        subjectName: '语文',
        isSwitchOn: true, // 开关状态
      }, {
        subjectId: 2,
        subjectName: '数学',
        isSwitchOn: true,
      }, {
        subjectId: 3,
        subjectName: '英语',
        isSwitchOn: true,
      }, {
        subjectId: 4,
        subjectName: '政治',
        isSwitchOn: true,
      }, {
        subjectId: 5,
        subjectName: '历史',
        isSwitchOn: true,
      }, {
        subjectId: 6,
        subjectName: '地理',
        isSwitchOn: true,
      }, {
        subjectId: 7,
        subjectName: '物理',
        isSwitchOn: false,
      }, {
        subjectId: 8,
        subjectName: '化学',
        isSwitchOn: false,
      }, {
        subjectId: 9,
        subjectName: '生物',
        isSwitchOn: false,
      }],
    };
  }

  // 渲染子组件
  _renderItem = ({ item, index }) => (
    <View
      style={styles.subjectCard}
      key={index}
      index={index}
    >
      <Text style={styles.subjectName}>{item.subjectName}</Text>
      <Switch
        style={styles.switch_btn}
        onValueChange={bool => this.changeSwitchStatus(item.subjectId, bool)}
        value={item.isSwitchOn}
        tintColor="#e8e8e8"
        onTintColor="#30bf6c"
        thumbTintColor="#fff"
      />
    </View>
  )

  // 更改科目是否参与pk
  changeSwitchStatus = (subjectId, bool) => {
    const { subjectList } = this.state;
    // console.log(777, bool);
    for (let i = 0; i < subjectList.length; i++) {
      if (subjectList[i].subjectId === subjectId) {
        subjectList[i].isSwitchOn = bool;
      }
    }
    this.setState({
      subjectList,
    });
  }

  render() {
    const { subjectList } = this.state;
    // console.log(888, subjectList);
    return (
      <View style={styles.subjectSetting_container}>
        <Header goBackFun={() => { Actions.My(); }}>
          <I18nText>SubjectSetting.title</I18nText>
        </Header>
        <View style={styles.description_box}>
          <I18nText style={styles.description}>SubjectSetting.description</I18nText>
        </View>
        <View style={styles.borderSpace} />
        {
          subjectList
            && (
            <FlatList
              keyExtractor={() => `${Math.random()}`}
              data={subjectList}
              renderItem={this._renderItem}
            />
            )
        }
      </View>
    );
  }
}

export default SubjectSetting;
