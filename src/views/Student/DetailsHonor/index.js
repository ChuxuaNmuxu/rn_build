import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import R from 'ramda';
import moment from 'moment';
import PieChart from '../../../components/PieChart';
import Nav from '../../../components/Nav';
import styles from './style.scss';

export default class DetailsHonor extends Component {
  componentDidMount() {
    console.log(7);
  }

  // 防止科目过多时默认color预设过少报错
  copyData = (showData, colorData) => {
    const showDataSize = showData.length;
    let colorDataSize = colorData.length;
    if (showDataSize > colorDataSize) {
      const copyNum = Math.ceil(showDataSize / colorDataSize);
      colorDataSize = R.compose(
        R.flatten,
        R.repeat(colorData),
      )(copyNum);
      return colorDataSize;
    }
    return colorData;
  }

  // 将数据转换为饼图所需要的数据格式
  dataMapPie = () => {
    let { pieChart } = this.props;
    pieChart = pieChart.map((v) => {
      const { number, gameName } = v;
      return {
        x: gameName,
        y: number,
      };
    });
    return pieChart;
  }

  // 将数据转换为饼图列表上所需要的数据格式
  dataMapScroll = () => {
    const { colorScale } = this.props;
    let { pieChart } = this.props;
    const color = this.copyData(pieChart, colorScale);
    pieChart = pieChart.map((v, i) => {
      const { number, subjectName } = v;

      return {
        label: subjectName,
        value: number,
        color: color[i],
      };
    });
    return pieChart;
  }

  renderItem =(data) => {
    const {
      gameName, number, gameTime,
    } = data;
    const { scrollItemType } = this.props;

    return (
      <View key={gameName} style={styles.item}>
        <Text style={styles.pic_title}>{gameName}</Text>
        <Text style={styles.integral}>{
          scrollItemType === 'time'
            ? moment(gameTime).format('YYYY.MM.DD')
            : `+${number}`
        }
        </Text>
      </View>
    );
  }


  render() {
    const {
      title, scrollListTitle, scrollList, pieChartTitle, colorScale,
    } = this.props;
    return (
      <View style={styles.wrap}>
        <Nav goBackFun={() => { Actions.My(); }}>
          <Text>{title}</Text>
        </Nav>
        {
          scrollList.length
            ? (
              <ScrollView style={styles.scroll_view}>
                <View key="pieChartWrap" style={styles.pie_chart_wrap}>
                  <PieChart
                    key="picChart"
                    title={pieChartTitle}
                    pieData={this.dataMapPie()}
                    scrollData={this.dataMapScroll()}
                    colorScale={colorScale}
                  />
                </View>
                <View key="listWrap" style={styles.list_wrap}>
                  <Text style={styles.title}>{scrollListTitle}</Text>
                  {scrollList.map((v, i) => this.renderItem(v, i))}
                </View>
              </ScrollView>
            )
            : <Text>暂无数据</Text>
        }
      </View>
    );
  }
}

DetailsHonor.propTypes = {
  scrollList: PropTypes.array,
  pieChart: PropTypes.array,
  title: PropTypes.string,
  scrollListTitle: PropTypes.string,
  pieChartTitle: PropTypes.string,
  colorScale: PropTypes.array,
  scrollItemType: PropTypes.string,
};

DetailsHonor.defaultProps = {
  scrollList: [],
  pieChart: [],
  title: null,
  scrollListTitle: null,
  pieChartTitle: null,
  colorScale: ['#f97a76', '#fca77e', '#fdf376', '#f1ffc5',
    '#ccff98', '#8ff688', '#05e1de', '#32c9fe', '#e461ff'],
  scrollItemType: null,
};
