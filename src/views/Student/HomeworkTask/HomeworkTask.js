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
import Modal from '../../../components/Modal';

@connect((state) => {
  const {
    homeworkTaskReducer: {
      position,
    },
  } = state;
  return {
    position,
  };
}, dispatch => ({
  onFetchStudentTaskList: bindActionCreators(FetchStudentTaskList, dispatch),
}))
class HomeworkTask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onFetchStudentTaskList } = this.props;
    onFetchStudentTaskList();
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
      position,
    } = this.props;

    return (
      <View style={styles.container}>
        {
          this.renderHeader()
        }
        <TodoList />
        <Drag position={position} />
        <PlanList />
        <Modal />
      </View>
    );
  }
}

HomeworkTask.propTypes = {
  position: PropTypes.object,
  onFetchStudentTaskList: PropTypes.func,
};

HomeworkTask.defaultProps = {
  position: {},
  onFetchStudentTaskList: () => {},
};

export default HomeworkTask;
