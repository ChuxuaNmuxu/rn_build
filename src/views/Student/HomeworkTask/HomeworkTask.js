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
import TaskList from './TaskList';
import TimeList from './TimeList';
import I18nText from '../../../components/I18nText';
import Drag from './Drag';
import { GetDragRef } from '../../../actions/homeworkTask';

@connect((state) => {
  const { homeworkTaskReducer: { position } } = state;
  return {
    position,
  };
})
class HomeworkTask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const { position, onGetDragRef } = this.props;
    return (
      <View style={styles.container}>
        {
          this.renderHeader()
        }
        <TaskList />
        <Drag position={position} wrapStyle={{ backgroundColor: 'pink' }} onGetDragRef={onGetDragRef} />
        <TimeList />
      </View>
    );
  }
}

HomeworkTask.propTypes = {
  position: PropTypes.object,
};

HomeworkTask.defaultProps = {
  position: {},
};

export default HomeworkTask;
