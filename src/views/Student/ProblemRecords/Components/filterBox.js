import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './filterBox.scss';
import CIcon from '../../../../components/Icon';

class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSubjectId: props.currentSubjectId,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentSubjectId !== prevState.currentSubjectId) {
      return {
        currentSubjectId: nextProps.currentSubjectId,
      };
    }
    return null;
  }

  // 点击筛选学科
  filterSubjectFun = (subjectId) => {
    const { filterSubjectFun } = this.props;
    filterSubjectFun(subjectId);
  }

  // 点击更多筛选
  filterMoreFun = () => {
    const { filterMoreFun } = this.props;
    filterMoreFun();
  }

  render() {
    const { currentSubjectId } = this.state;
    const { subjectData } = this.props;
    return (
      <View style={styles.filterContainer}>
        <View style={styles.filterBox}>
          <ScrollView horizontal>
            {
              subjectData.map(item => (
                <TouchableOpacity
                  key={item.subjectId}
                  style={[styles.subjectItem, (currentSubjectId === item.subjectId && styles.currentItem)]}
                  onPress={() => this.filterSubjectFun(item.subjectId)}
                >
                  <Text style={[styles.filterText, (currentSubjectId === item.subjectId && styles.currentText)]}>
                    {item.subjectName}
                  </Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
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

FilterBox.propTypes = {
  currentSubjectId: PropTypes.number.isRequired,
  subjectData: PropTypes.array.isRequired,
  filterSubjectFun: PropTypes.func.isRequired,
  filterMoreFun: PropTypes.func.isRequired,
};
export default FilterBox;
