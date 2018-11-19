import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import styles from './homeworkTask.scss';
import PlanList from './PlanTask/PlanList';
import TodoList from './TodoTask/TodoList';
import I18nText from '../../../components/I18nText';
import Drag from './component/Drag';
import {
  FetchStudentTaskList, IsFirstOpenHomepage,
  GetAchievementsBroadcast, ChangeAchievementsBroadcasCheckedId,
  IsManualCloseAchievementsBroadcast, ChangeAchievementsBroadcastStatus,
} from '../../../actions/homeworkTask';
import Modal, { ModalApi } from '../../../components/Modal';
import Debug from '../../../components/Debug';
import ModalContent from './component/ModalContent';

@connect((state) => {
  const {
    homeworkTaskReducer: {
      position,
      dragData,
      todoList,
      isFirstOpenHomepage,
      achievementsBroadcastData,
      achievementsBroadcastStatus,
      achievementsBroadcastId,
    },
  } = state;
  return {
    position,
    dragData,
    todoList,
    isFirstOpenHomepage,
    achievementsBroadcastData,
    achievementsBroadcastStatus,
    achievementsBroadcastId,
  };
}, dispatch => ({
  onFetchStudentTaskList: bindActionCreators(FetchStudentTaskList, dispatch),
  onIsFirstOpenHomepage: bindActionCreators(IsFirstOpenHomepage, dispatch),
  onGetAchievementsBroadcast: bindActionCreators(GetAchievementsBroadcast, dispatch),
  onChangeAchievementsBroadcasCheckedId: bindActionCreators(ChangeAchievementsBroadcasCheckedId, dispatch),
  onChangeAchievementsBroadcastStatus: bindActionCreators(ChangeAchievementsBroadcastStatus, dispatch),
  onIsManualCloseAchievementsBroadcast: bindActionCreators(IsManualCloseAchievementsBroadcast, dispatch),
}))
class HomeworkTask extends Component {
  timer = null

  componentDidMount() {
    const {
      onFetchStudentTaskList,
      onIsFirstOpenHomepage,
      isFirstOpenHomepage,
      onGetAchievementsBroadcast,
    } = this.props;
    onGetAchievementsBroadcast();
    onFetchStudentTaskList();

    this.openAchievementsBroadcast();

    // if (isFirstOpenHomepage) {
    //   onIsFirstOpenHomepage();
    //   ModalApi.onOppen('AnimationsModal', {
    //     svgName: 'finger', // 选择提示信息的svg
    //     animationType: 'slideInDown', // 选择动画类型
    //     bottomTips: '把作业向下拖动到具体时间段吧', // 提示文字信息
    //     maskClosable: true, // 是否点击蒙层关闭
    //     svgOption: {
    //       width: 120,
    //       height: 120,
    //     },
    //   });
    // }

    console.log('挂载homeworkTask');
    this.timer = setInterval(() => {
      onFetchStudentTaskList();
      console.log('轮询中');
    }, 1000 * 60);
  }

  componentDidUpdate(prevProps) {
    const { achievementsBroadcastStatus } = this.props;

    if (prevProps.achievementsBroadcastStatus !== achievementsBroadcastStatus) {
      this.openAchievementsBroadcast();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('卸载homeworkTask');
  }

  openAchievementsBroadcast = () => {
    const {
      achievementsBroadcastData, achievementsBroadcastStatus, onChangeAchievementsBroadcastStatus,
      achievementsBroadcastId, onChangeAchievementsBroadcasCheckedId, onIsManualCloseAchievementsBroadcast,
    } = this.props;

    // 战机播报
    const data = {
      content: <ModalContent
        contentData={achievementsBroadcastData}
        checkedId={achievementsBroadcastId}
        changeCheckedId={onChangeAchievementsBroadcasCheckedId}
        changeStatus={onChangeAchievementsBroadcastStatus}
        manualClose={onIsManualCloseAchievementsBroadcast}
      />,
      height: 960,
      style: {
        width: 1040,
      },
    };

    if (achievementsBroadcastStatus) ModalApi.onOppen('RecordModal', data);
  }

  renderHeader = () => {
    const { todoList } = this.props;
    return (
      <View style={[styles.header]}>
        <View style={styles.headle_left}>
          <Debug>
            <I18nText style={styles.title} option={{ count: todoList.length }}>home.header.title</I18nText>
          </Debug>
          {
            todoList.length
              ? <I18nText style={styles.small}>home.header.tip</I18nText>
              : null
          }
        </View>
        <TouchableOpacity
          onPress={BackHandler.exitApp}
        >
          <I18nText style={styles.headle}>home.header.headle</I18nText>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {
      position, dragData,
    } = this.props;

    return (
      <View style={styles.container}>
        {
          this.renderHeader()
        }
        <TodoList />
        <Drag position={position} data={dragData} />
        <PlanList />
        <Modal />
      </View>
    );
  }
}

HomeworkTask.propTypes = {
  position: PropTypes.object,
  onFetchStudentTaskList: PropTypes.func,
  dragData: PropTypes.object,
  todoList: PropTypes.array,
  onIsFirstOpenHomepage: PropTypes.func,
  isFirstOpenHomepage: PropTypes.bool,
  onGetAchievementsBroadcast: PropTypes.func,
  achievementsBroadcastData: PropTypes.array,
  achievementsBroadcastStatus: PropTypes.bool,
  achievementsBroadcastId: PropTypes.string,
  onChangeAchievementsBroadcasCheckedId: PropTypes.func,
  onChangeAchievementsBroadcastStatus: PropTypes.func,
  onIsManualCloseAchievementsBroadcast: PropTypes.func,
};

HomeworkTask.defaultProps = {
  position: {},
  onFetchStudentTaskList: () => {},
  onIsFirstOpenHomepage: () => {},
  dragData: {},
  todoList: [],
  isFirstOpenHomepage: false,
  onGetAchievementsBroadcast: () => {},
  achievementsBroadcastData: [],
  achievementsBroadcastStatus: false,
  achievementsBroadcastId: null,
  onChangeAchievementsBroadcasCheckedId: () => {},
  onChangeAchievementsBroadcastStatus: () => {},
  onIsManualCloseAchievementsBroadcast: () => {},
};

export default HomeworkTask;
