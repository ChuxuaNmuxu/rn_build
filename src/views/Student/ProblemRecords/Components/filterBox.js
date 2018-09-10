import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './filterBox.scss';
import CIcon from '../../../../components/Icon';

class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectData: [{
        subjectId: 0,
        subjectName: '全部学科',
      }, {
        subjectId: 1,
        subjectName: '语文',
      }, {
        subjectId: 2,
        subjectName: '数学',
      }, {
        subjectId: 3,
        subjectName: '英语',
      }, {
        subjectId: 5,
        subjectName: '历史',
      }, {
        subjectId: 6,
        subjectName: '地理',
      }],
      currentId: 0,
    };
  }

  // 点击筛选学科
  filterSubjectFun = (subjectId) => {
    console.log(123, '当前点击的学科为', subjectId);
    this.setState({
      currentId: subjectId,
    });
  }

  // 点击更多筛选
  filterMoreFun = () => {
    console.log(345, '更多筛选');
  }

  render() {
    const { subjectData, currentId } = this.state;
    return (
      <View style={styles.filterContainer}>
        <View style={styles.filterBox}>
          {
            subjectData.map(item => (
              <TouchableOpacity
                key={item.subjectId}
                style={[styles.subjectItem, (currentId === item.subjectId && styles.currentItem)]}
                onPress={() => this.filterSubjectFun(item.subjectId)}
              >
                <Text style={[styles.filterText, (currentId === item.subjectId && styles.currentText)]}>
                  {item.subjectName}
                </Text>
              </TouchableOpacity>
            ))
          }
          <TouchableOpacity style={styles.filterMoreBox} onPress={() => this.filterMoreFun()}>
            <Text style={styles.filterMoreText}>
              更多筛选
              <CIcon style={styles.icon} name="shangyiye" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default FilterBox;
