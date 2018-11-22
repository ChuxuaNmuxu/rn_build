import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
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
  FetchStudentTaskList, ChangeHomeGuideStatus,
  GetAchievementsBroadcast, ChangeAchievementsBroadcasCheckedId,
  IsManualCloseAchievementsBroadcast, ChangeAchievementsBroadcastStatus,
} from '../../../actions/homeworkTask';
import Modal, { ModalApi } from '../../../components/Modal';
import Debug from '../../../components/Debug';
import ModalContent from './component/ModalContent';
import Logger from '../../../utils/logger';

@connect((state) => {
  const {
    homeworkTaskReducer: {
      position,
      dragData,
      todoList,
      isOpenHomeGuide,
      achievementsBroadcastData,
      achievementsBroadcastStatus,
      achievementsBroadcastId,
      isManualCloseAchievementsBroadcast,
    },
    config: { isHotUpdating },
  } = state;
  return {
    position,
    dragData,
    todoList,
    isOpenHomeGuide,
    achievementsBroadcastData,
    achievementsBroadcastStatus,
    achievementsBroadcastId,
    isManualCloseAchievementsBroadcast,
    isHotUpdating,
  };
}, dispatch => ({
  onFetchStudentTaskList: bindActionCreators(FetchStudentTaskList, dispatch),
  onChangeHomeGuideStatus: bindActionCreators(ChangeHomeGuideStatus, dispatch),
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
      onGetAchievementsBroadcast,
      isHotUpdating,
    } = this.props;
    // 获取战绩播报
    onGetAchievementsBroadcast();
    // 获取作业任务
    onFetchStudentTaskList();

    // 显示模态
    if (!isHotUpdating) {
      this.showModal('DidMount');
    }

    console.log('挂载homeworkTask');
    this.timer = setInterval(() => {
      onFetchStudentTaskList();
    }, 1000 * 60);
  }

  componentDidUpdate(prevProps) {
    const {
      achievementsBroadcastStatus, isOpenHomeGuide, isHotUpdating,
    } = this.props;

    // Logger.appendFile('consoleLog.txt',
    //   Logger.formatConsole('isManualCloseAchievementsBroadcast:', isManualCloseAchievementsBroadcast));

    // Logger.appendFile('consoleLog.txt',
    //   Logger.formatConsole('achievementsBroadcastStatus:', achievementsBroadcastStatus));

    // Logger.appendFile('consoleLog.txt',
    //   Logger.formatConsole('isOpenHomeGuide:', isOpenHomeGuide));

    console.log(98, prevProps.achievementsBroadcastStatus, achievementsBroadcastStatus);
    if (!isHotUpdating) {
      if (prevProps.achievementsBroadcastStatus !== achievementsBroadcastStatus
        || isOpenHomeGuide) {
        this.showModal('DidUpdate');
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('卸载homeworkTask');
  }

  showModal = () => {
    const {
      isOpenHomeGuide,
      achievementsBroadcastStatus,
      isManualCloseAchievementsBroadcast,
    } = this.props;

    if (!isManualCloseAchievementsBroadcast && achievementsBroadcastStatus) {
      this.openAchievementsBroadcast();
    }

    if (isOpenHomeGuide) {
      this.showGuide();
    }
  }

  // 显示指引
  showGuide = () => {
    const {
      onChangeHomeGuideStatus,
    } = this.props;

    ModalApi.onOppen('AnimationsModal', {
      svgName: 'finger', // 选择提示信息的svg
      animationType: 'slideInDown', // 选择动画类型
      bottomTips: '把作业向下拖动到具体时间段吧', // 提示文字信息
      maskClosable: true, // 是否点击蒙层关闭
      svgOption: {
        width: 120,
        height: 120,
      },
      height: 360,
      style: {
        width: 480,
      },
    });

    onChangeHomeGuideStatus(false);
  }

  openAchievementsBroadcast = () => {
    const {
      achievementsBroadcastData, onChangeAchievementsBroadcastStatus,
      achievementsBroadcastId, onChangeAchievementsBroadcasCheckedId,
      onIsManualCloseAchievementsBroadcast, onChangeHomeGuideStatus,
    } = this.props;

    // 战机播报
    const data = {
      content: <ModalContent
        contentData={achievementsBroadcastData}
        checkedId={achievementsBroadcastId}
        changeCheckedId={onChangeAchievementsBroadcasCheckedId}
        changeStatus={onChangeAchievementsBroadcastStatus}
        manualClose={onIsManualCloseAchievementsBroadcast}
        openGuide={onChangeHomeGuideStatus}
      />,
      height: 960,
      style: {
        width: 1040,
      },
    };

    ModalApi.onOppen('RecordModal', data);
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
  onChangeHomeGuideStatus: PropTypes.func,
  isOpenHomeGuide: PropTypes.bool,
  onGetAchievementsBroadcast: PropTypes.func,
  achievementsBroadcastData: PropTypes.array,
  achievementsBroadcastStatus: PropTypes.bool,
  achievementsBroadcastId: PropTypes.string,
  onChangeAchievementsBroadcasCheckedId: PropTypes.func,
  onChangeAchievementsBroadcastStatus: PropTypes.func,
  onIsManualCloseAchievementsBroadcast: PropTypes.func,
  isManualCloseAchievementsBroadcast: PropTypes.bool,
  isHotUpdating: PropTypes.bool,
};

HomeworkTask.defaultProps = {
  position: {},
  onFetchStudentTaskList: () => {},
  onChangeHomeGuideStatus: () => {},
  dragData: {},
  todoList: [],
  isOpenHomeGuide: false,
  onGetAchievementsBroadcast: () => {},
  achievementsBroadcastData: [],
  achievementsBroadcastStatus: false,
  achievementsBroadcastId: null,
  onChangeAchievementsBroadcasCheckedId: () => {},
  onChangeAchievementsBroadcastStatus: () => {},
  onIsManualCloseAchievementsBroadcast: () => {},
  isManualCloseAchievementsBroadcast: false,
  isHotUpdating: false,
};

export default HomeworkTask;
