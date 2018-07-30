import React from 'react';
import {
  Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile-rn';
import Styles from './taskItem.scss';

class TaskItem extends React.Component {
  componentDidMount() {
    console.log(111);
  }

  render() {
    const {
      vertical,
    } = this.props;

    return (
      <View style={Styles.today_task}>
        <View style={[vertical === 'top' ? Styles.flex_top : Styles.checkpoint_wrap]}>
          <View style={[Styles.checkpoint_box]}>
            <View style={Styles.checkpoint}>
              <Text style={Styles.checkpoint_text}>今日任务</Text>
            </View>
          </View>
          <View style={Styles.on_line} />
        </View>

        <View style={Styles.content_wrap}>
          <View style={Styles.content_box}>
            <View style={[Styles.content]}>
              <View style={Styles.title_box}><Text>生</Text></View>
              <View>
                <Text>这是一个语文作业</Text>
                <Text>截止提交时间:07-29 23:59</Text>
              </View>
              <Button>添加</Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

TaskItem.defaultProps = {
  vertical: 'center',
};

TaskItem.propTypes = {
  vertical: PropTypes.string,
};

export default TaskItem;
