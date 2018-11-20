import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  // Image,
  ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-swiper-1';
import _ from 'ramda';
import { getIncorrectInfo, markFailReason, initialState } from '../../../actions/incorrectProblemDetail';
// import CIcon from '../../../components/Icon';
import styles from './HomeworkProblemDetail.scss';
import DetailView from './DetailView';

class HomeworkProblemDetail extends Component {
  constructor(props) {
    super(props);
    console.log(20, props);
    const {
      id, category, onFetchProblemDetail, index,
    } = props;
    const { mistakeList = [] } = props;
    // 这个是个优化，避免每次更新都去重新定义图片的宽高
    // fill是个神奇的东西，是地址引用
    this.imageWHArr = new Array(mistakeList.length).fill({ W: 0, H: 0 }).map(item => JSON.parse(JSON.stringify(item)));
    // 初始化
    onFetchProblemDetail({
      params: { id, category }, index, len: mistakeList.length, isInit: 'Y',
    });
    this.state = {
      index,
    };
  }

  swiper = (nextIndex) => {
    this.setState({
      index: nextIndex,
    }, () => this.swiperFetch(nextIndex));
  }

  // 滚动后请求~~~
  swiperFetch=(index) => {
    const { detailDataList, mistakeList, onFetchProblemDetail } = this.props;
    if (!_.isNil(detailDataList[index])) {
      return;
    }
    const { id, category } = mistakeList[index];
    onFetchProblemDetail({
      params: { id, category }, index,
    });
  }

  // 标记错误原因
  returnFailReason=(params) => {
    // 应该作为回调
    const { index } = this.state;
    const { mistakeList, onFetchProblemDetail } = this.props;
    const { id, category } = mistakeList[index];

    params.callback = () => onFetchProblemDetail({
      params: { id, category }, index,
    });
    const { onMarkFailReason } = this.props;
    onMarkFailReason(params);
  }

  saveImageWH=(W, H) => {
    const { index } = this.state;
    this.imageWHArr[index] = {
      W, H,
    };
  }

  myComponentWillUnmount=() => {
    // 离开该页面清理数据，否则下次进来有缓存
    const {
      oninitialState,
    } = this.props;
    oninitialState(null);
    Actions.pop();
    console.log('caonika');
  }

  render() {
    const { detailDataList, mistakeList } = this.props;
    const { index } = this.state;
    if (_.isEmpty(detailDataList)) {
      return null;
    }
    // 题型
    const qsType = (mistakeList[index].type === 10 || mistakeList[index].type === 11) ? 'sub' : 'obj';
    const type = mistakeList[index].category === 1 ? 'H' : 'E';
    // const { incorrectIdList } = this.state;

    console.log(49, this.props);
    // const { index } = this.state;
    return (
      <View style={styles.wrapper}>
        {/* 头部自定义导航条 */}
        <View style={styles.head}>
          <View style={styles.head_icon}>
            <TouchableOpacity
              // 返回首页
              onPress={this.myComponentWillUnmount}
            >
              <Entypo name="chevron-thin-left" size={40} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.head_content}>
            <Text style={styles.head_content_word}>详情</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.body}>
            <Swiper
              loop={false}
              showsPagination={false}
              index={index}
              onIndexChanged={this.swiper}
            >
              {
                // 假设为null，则该组件LAODING
                detailDataList.map(
                  item => (
                    <DetailView
                      index={index}
                      imageWHArr={this.imageWHArr}
                      qsType={qsType}
                      data={item}
                      type={type}
                      id={mistakeList[index].id}
                      key={`${index}DetailView`}
                      returnFailReason={this.returnFailReason}
                      saveImageWH={this.saveImageWH}
                    />
                  ),
                )
              }
            </Swiper>
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeworkProblemDetail.propTypes = {
  // 传进来的题目
  id: PropTypes.string.isRequired,
  onFetchProblemDetail: PropTypes.func.isRequired,
  category: PropTypes.number.isRequired,
  mistakeList: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  detailDataList: PropTypes.array.isRequired,
  onMarkFailReason: PropTypes.func.isRequired,
  oninitialState: PropTypes.func.isRequired,
};

HomeworkProblemDetail.defaultProps = {

};

const mapStateToProps = (state) => {
  const {
    incorrectProblemDetail: {
      detailDataList,
    },
    mistakeListReducer: {
      mistakeList,
    },
  } = state;

  return {
    detailDataList,
    mistakeList,
  };
};

const mapDispatchToProps = dispatch => ({
  onFetchProblemDetail: bindActionCreators(getIncorrectInfo, dispatch),
  onMarkFailReason: bindActionCreators(markFailReason, dispatch),
  oninitialState: bindActionCreators(initialState, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeworkProblemDetail);
