import React, { Component, Fragment } from 'react';
import {
  WingBlank,
  Steps,
} from 'antd-mobile-rn';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import SvgUri from '../../../components/Svg';
// import SvgUri from 'react-native-svg-uri';
import CIcon from '../../../components/Icon';
import Styles from './styles.scss';

const Step = Steps.Step;

class MyHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.routes.scene);
    console.log(this.context.routes);
    const isTask = false;
    return (
      <View style={Styles.container}>
        <View style={[Styles.taskBox, Styles.peerReviewTask]}>
          <Text style={[Styles.color333, Styles.fontSize20]}>互批任务</Text>
          <Text>当前无互批任务</Text>
        </View>
        <View style={[Styles.taskBox]}>
          <Text>计划一下今天完成哪些作业，把它们添加到今日任务吧</Text>
        </View>

        <View style={[Styles.taskBox, Styles.distributed]}>
          {
          isTask
            ? (
              <Fragment>
                <View>
                  <Steps>
                    <Step title="第一步" />
                    <Step title="第二步" />
                    <Step title="第三步" />
                  </Steps>
                </View>
                <View>
                  <Text>右侧</Text>
                </View>
              </Fragment>
            )
            : (
              <SvgUri width="300" height="300" source="exam" />
            )
          }
        </View>
      </View>
    );
  }
}

export default connect(({ routes }) => ({ routes }))(MyHomework);
