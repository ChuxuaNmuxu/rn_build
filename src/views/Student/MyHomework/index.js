import React, { Component } from 'react';
import {
  Button,
} from 'antd-mobile-rn';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Modal,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import LinearGradient from 'react-native-linear-gradient';
import { test } from '../../../actions';
import SvgUri from '../../../components/Svg';
import CIcon from '../../../components/Icon';
import MHStyles from './styles';
import docIcon from '../../../public/img/document.png';
import TaskItem from './TaskItem';
import TimeItem from './TimeItem';
import Drag from '../../../components/Drag';
import launch_screen from '../../../../android/app/src/main/res/drawable-xhdpi/launch_screen.png';

const Styles = StyleSheet.create(MHStyles);

class MyHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  render() {
    this.props.doTest();
    return (
      <ImageBackground
        source={launch_screen}
        style={Styles.container}
      >
        <View style={[Styles.header]}>
          {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}> */}
          <Text style={Styles.title}>待计划任务：10项</Text>
          <Text style={Styles.small}>请把下列任务安排一个合适的时间段开始吧</Text>
          {/* </LinearGradient> */}
        </View>
        <View style={Styles.task_list_box}>
          <ScrollView horizontal style={Styles.flex_1}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 34].map(item => <TaskItem key={item} />)
            }
          </ScrollView>
        </View>

        <Drag />
        <Button onClick={() => { this.setState({ modalVisible: true }); }}>open modal</Button>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert('Modal has been closed.');
          }}
        >
          <Button onClick={() => { this.setState({ modalVisible: false }); }}>close modal</Button>
        </Modal>

        {/* <View style={Styles.time_list_box}>
          <ScrollView horizontal>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 34].map(item => <TimeItem key={item} />)
              }
            </View>
          </ScrollView>
        </View> */}
      </ImageBackground>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    doTest: bindActionCreators(test, dispatch),
  }),
)(MyHomework);
