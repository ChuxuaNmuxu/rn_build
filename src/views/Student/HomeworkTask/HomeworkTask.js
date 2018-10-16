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
import { FetchStudentTaskList } from '../../../actions/homeworkTask';
import Modal, { ModalApi } from '../../../components/Modal';

@connect((state) => {
  const {
    homeworkTaskReducer: {
      position,
      dragData,
    },
  } = state;
  return {
    position,
    dragData,
  };
}, dispatch => ({
  onFetchStudentTaskList: bindActionCreators(FetchStudentTaskList, dispatch),
}))
class HomeworkTask extends Component {
  componentDidMount() {
    const { onFetchStudentTaskList } = this.props;
    onFetchStudentTaskList();
    // ModalApi.onOppen('AnimationsModal', {
    //   svgName: 'finger', // 选择提示信息的svg
    //   animationType: 'slideInDown', // 选择动画类型
    //   bottomTips: '把作业向下拖动到具体时间段吧', // 提示文字信息
    //   maskClosable: true, // 是否点击蒙层关闭
    //   svgOption: {
    //     width: 120,
    //     height: 120,
    //   },
    //   style: { width: 540 },
    // });
  }

  renderHeader = () => (
    <View style={[styles.header]}>
      <View style={styles.headle_left}>
        <I18nText style={styles.title} option={{ count: 10 }}>home.header.title</I18nText>
        <I18nText style={styles.small}>home.header.tip</I18nText>
      </View>
      <TouchableOpacity
        onPress={BackHandler.exitApp}
      >
        <I18nText style={styles.headle}>home.header.headle</I18nText>
      </TouchableOpacity>
    </View>
  )

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
};

HomeworkTask.defaultProps = {
  position: {},
  onFetchStudentTaskList: () => {},
  dragData: {},
};

export default HomeworkTask;
