import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import PieChart from '../../../components/PieChart';
import Nav from '../../../components/Nav';
import styles from './style.scss';

export default class DetailsHonor extends Component {
  componentDidMount() {
    console.log(7);
  }

  renderItem =(data, index) => {
    const { title, integral } = data;
    return (
      <View key={index} style={styles.item}>
        <Text style={styles.pic_title}>{title}</Text>
        <Text style={styles.integral}>{integral}</Text>
      </View>
    );
  }

  render() {
    const { data, title } = this.props;
    return (
      <View style={styles.wrap}>
        <Nav goBackFun={() => { Actions.My(); }}>
          <Text>{title}</Text>
        </Nav>
        <ScrollView style={styles.scroll_view}>
          <View key="pieChartWrap" style={styles.pie_chart_wrap}>
            <PieChart key="picChart" />
          </View>
          <View key="listWrap" style={styles.list_wrap}>
            <Text style={styles.title}>上次奉献</Text>
            {data.map((v, i) => this.renderItem(v, i))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

DetailsHonor.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
};

DetailsHonor.defaultProps = {
  data: [
    { title: '语文第一章作业', integral: -1 },
    { title: '语文第一章作业', integral: -1 },
    { title: '语文第一章作业', integral: -1 },
    { title: '语文第一章作业', integral: -1 },
    { title: '语文第一章作业', integral: -1 },
    { title: '语文第一章作业', integral: -1 },
    { title: '语文第一章作业', integral: -1 },
  ],
  title: null,
};
