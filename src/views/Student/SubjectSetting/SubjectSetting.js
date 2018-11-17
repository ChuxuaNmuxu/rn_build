// 科目设置页面
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mdl } from 'react-native-material-kit';
import * as actions from '../../../actions/subjectSettingAction';
import styles from './SubjectSetting.scss';
import I18nText from '../../../components/I18nText';
import Nav from '../../../components/Nav';

class SubjectSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // 请求数据
    const { actions: { fetchSubjectSettingDataAction } } = this.props;
    fetchSubjectSettingDataAction(null, 'REQUEST');
  }

  // 渲染子组件
  _renderItem = ({ item, index }) => (
    <View
      style={styles.subjectCard}
      key={index}
      index={index}
    >
      <Text style={styles.subjectName}>{item.subjectName}</Text>
      <mdl.Switch
        onColor="#30bf6c"
        offColor="#dbdbdb"
        thumbOnColor="#fff" // 里面圆圈的颜色
        rippleColor="#30bf6c" // 点击时的动画颜色
        trackLength={96} // 开关的长度
        trackSize={48} // 开关的高度
        thumbRadius={23} // 里面圆圈的半径
        checked={item.join}
        onCheckedChange={e => this.changeSwitchStatus(item.subjectId, e)}
      />
    </View>
  )

  // 更改科目是否参与pk
  changeSwitchStatus = (subjectId, e) => {
    const { actions: { settingSubjectIsJoinAction } } = this.props;
    const answerParam = {};
    answerParam.join = e.checked;
    answerParam.subjectId = subjectId;
    settingSubjectIsJoinAction({ answerParam }, 'REQUEST');
  }

  render() {
    const { subjectList } = this.props;
    return (
      <View style={styles.subjectSetting_container}>
        <Nav goBackFun={() => { Actions.My(); }}>
          <I18nText>SubjectSetting.title</I18nText>
        </Nav>
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

SubjectSetting.propTypes = {
  subjectList: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { subjectList } = state.subjectSettingReducer;
  return {
    subjectList,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectSetting);
