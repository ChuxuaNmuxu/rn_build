import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Entypo from 'react-native-vector-icons/Entypo';
// import { ActivityIndicator } from 'antd-mobile-rn';
import { Actions } from 'react-native-router-flux';
import styles from './ProblemOverview.scss';
import * as actions from '../../../actions/problemOverviewAction';
import CIcon from '../../../components/Icon';

class ProblemOverview extends PureComponent {
  componentDidMount() {
    console.log('调用 ProblemOverview 组件', this.props);
    // 请求错题本数据
    const { actions: { fetchDataAction } } = this.props;
    fetchDataAction(null, 'REQUEST');
  }

  componentWillUnmount() {
    console.log('离开 ProblemOverview 组件！');
  }

  // 点击进入错题列表页面
  goProblemListFun = () => {
    Actions.ProblemListOverview();
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.title_wrap}>
          <Text style={styles.title_content}>
            错题本
          </Text>
        </View>
        <FlatList
          keyExtractor={() => `${Math.random()}`}
          data={data}
          renderItem={
            (dataItem) => {
              const { item, index } = dataItem;
              // console.log(dataItem);
              return (
                <TouchableOpacity
                  onPress={this.goProblemListFun}
                  key={index}
                >
                  <View style={styles.item}>
                    <View style={styles.item_left}>
                      <View style={styles.item_left_icon}>
                        <CIcon name={item.icon} size={40} color="white" />
                      </View>
                      <Text style={styles.item_left_subjectName}>{item.subjectName}</Text>
                    </View>
                    <View style={styles.item_right}>
                      <Text style={styles.item_right_number}>
                        {item.quantity}
                      </Text>
                      <Entypo name="chevron-thin-right" size={30} color="#30bf6c" />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          }
        />
      </View>
    );
  }
}

ProblemOverview.propTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { data } = state.problemOverviewReducer;
  return {
    data,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProblemOverview);
