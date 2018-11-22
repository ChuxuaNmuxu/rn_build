import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
} from 'react-native';
import I18nText from '../../../../components/I18nText';
import girlImg from '../../../../public/img/girl.png';
import boyImg from '../../../../public/img/boy.png';
import Pie from './Pie';
import styles from './HotReportCard.scss';

class HotReportCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // 个人比赛结果--personResult: 1:胜利 2:平手 3:失败
  getPersonResult = (personResult) => {
    let result;
    if (personResult === 1) {
      result = '胜利';
    } else if (personResult === 2) {
      result = '平';
    } else {
      result = '失败';
    }
    return result;
  }

  render() {
    const { data } = this.props;
    // 传给环形图的数据
    let pieData = [];
    // 传给环形图对应数据的颜色--胜的那方颜色为绿色#54cc82，输的那方为红色#ff8480,如果是平手（personResult为2）则为黄色单色#ffc14d;
    let colorScale = ['#54cc82', '#ff8480'];
    // 计算圆环开始渲染数据的位置
    let startAngle = 0;
    if (data) {
      // 需要判断下两人的正确率是否有0的情况
      let accuracy1 = 0.5;
      let accuracy2 = 0.5;
      if ((data.accuracy + data.rival.accuracy) > 0) {
        // 保留小数点后两位
        accuracy1 = data.accuracy / (data.accuracy + data.rival.accuracy);
        accuracy2 = data.rival.accuracy / (data.accuracy + data.rival.accuracy);
      }
      pieData = [
        { x: data.userName, y: accuracy1 * 100 },
        { x: data.rival.userName, y: accuracy2 * 100 },
      ];
      // 根据比赛胜负来判断两方颜色，因为正确率有可能一致的情况下出现胜负
      if (data.personResult === 3) {
        colorScale = ['#ff8480', '#54cc82'];
      }
      startAngle = parseInt((accuracy1 / (accuracy1 + accuracy2)) * 180) + 90;
      // 判断下是否为平局
      if (data.personResult === 2) {
        pieData = [{ x: '平局', y: 100 }];
        colorScale = ['#ffc14d'];
      }
    }
    return (
      <View style={styles.hotReportCard_container}>
        {
          data && (
          <View style={styles.hotReportCard}>
            <View style={styles.student_info}>
              <Image source={Math.random() > 0.5 ? girlImg : boyImg} width={145} height={145} />
              <Text style={styles.studentName}>{data.userName}</Text>
              <Text style={[
                data.personResult === 1 && styles.result_success,
                data.personResult === 2 && styles.result_tied,
                data.personResult === 3 && styles.result_faild,
              ]}
              >
                {this.getPersonResult(data.personResult)}
              </Text>
              <Text style={styles.accuracy}>
                <I18nText>HotReport.accuracy</I18nText>
                {`${data.accuracy * 100}%`}
              </Text>
            </View>
            <View style={styles.pieBox}>
              <Pie data={pieData} colorScale={colorScale} startAngle={startAngle} />
            </View>
            <View style={styles.student_info}>
              <Image source={Math.random() > 0.5 ? girlImg : boyImg} width={145} height={145} />
              <Text style={styles.studentName}>{data.rival.userName}</Text>
              <Text style={[
                data.rival.personResult === 1 && styles.result_success,
                data.rival.personResult === 2 && styles.result_tied,
                data.rival.personResult === 3 && styles.result_faild,
              ]}
              >
                {this.getPersonResult(data.rival.personResult)}
              </Text>
              <Text style={styles.accuracy}>
                <I18nText>HotReport.accuracy</I18nText>
                {`${data.rival.accuracy * 100}%`}
              </Text>
            </View>
          </View>
          )
        }
      </View>
    );
  }
}

HotReportCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HotReportCard;
