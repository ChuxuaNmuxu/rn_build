import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './ProblemOverview.scss';
import * as actions from '../../../actions/problemOverviewAction';

class ProblemOverview extends Component {
  componentDidMount() {
    console.log('调用 ProblemOverview 组件', this.props);
    // 请求错题本数据
    const { actions: { fetchDataAction } } = this.props;
    fetchDataAction(null, 'REQUEST');
  }


  render() {
    const { data } = this.props;
    return (
      <View>
        {
          data.map((item, index) => (
            <TouchableOpacity style={styles.item} onPress={() => console.log('点击查看错题')} key={index}>
              {/* <View > */}
              <Text>{item.subjectName}</Text><Text>{item.count}</Text>
              {/* </View> */}
            </TouchableOpacity>
          ))
        }
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
