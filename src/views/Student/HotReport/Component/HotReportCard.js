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

  componentDidMount() {
  }

  render() {
    const { data } = this.props;
    // 传给环形图的数据
    let pieData = [];
    // 传给环形图对应数据的颜色--胜的那方颜色为绿色#54cc82，输的那方为红色#ff8480
    let colorScale = ['#54cc82', '#ff8480'];
    // 计算圆环开始渲染数据的位置
    let startAngle = 0;
    if (data) {
      const accuracy1 = data.student1.accuracy;
      const accuracy2 = data.student2.accuracy;
      pieData = [
        { x: data.student1.studentName, y: accuracy1 * 100 },
        { x: data.student2.studentName, y: accuracy2 * 100 },
      ];
      if (accuracy1 < accuracy2) {
        colorScale = ['#ff8480', '#54cc82'];
      }
      startAngle = parseInt((accuracy1 / (accuracy1 + accuracy2)) * 180) + 90;
    }
    return (
      <View style={styles.hotReportCard_container}>
        {
          data && (
          <View style={styles.hotReportCard}>
            <View style={styles.student_info}>
              <Image source={data.student1.sex ? girlImg : boyImg} width={145} height={145} />
              <Text style={styles.studentName}>{data.student1.studentName}</Text>
              <Text style={[data.student1.result ? styles.result_success : styles.result_faild]}>
                {data.student1.result ? '胜利' : '失败'}
              </Text>
              <Text style={styles.accuracy}>
                <I18nText>HotReport.accuracy</I18nText>
                {`${data.student1.accuracy * 100}%`}
              </Text>
            </View>
            <View style={styles.pieBox}>
              <Pie data={pieData} colorScale={colorScale} startAngle={startAngle} />
            </View>
            <View style={styles.student_info}>
              <Image source={data.student2.sex ? girlImg : boyImg} width={145} height={145} />
              <Text style={styles.studentName}>{data.student2.studentName}</Text>
              <Text style={[data.student2.result ? styles.result_success : styles.result_faild]}>
                {data.student2.result ? '胜利' : '失败'}
              </Text>
              <Text style={styles.accuracy}>
                <I18nText>HotReport.accuracy</I18nText>
                {`${data.student2.accuracy * 100}%`}
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
