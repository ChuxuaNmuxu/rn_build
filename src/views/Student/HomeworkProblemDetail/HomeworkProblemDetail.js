import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-swiper';
import { getIncorrectInfo, markFailReason } from '../../../actions/incorrectProblemDetail';
import CIcon from '../../../components/Icon';
import styles from './HomeworkProblemDetail.scss';
import ThumbnailImage from '../../../components/ThumbnailImage';
import WrongReason from '../../../components/WrongReason';
import {
  convertToDifficultyLevel,
} from '../../../utils/common';

@connect((state) => {
  const {
    incorrectProblemDetail: {
      problems,
    },
    mistakeListReducer: {
      mistakeList,
    },
  } = state;

  return {
    problems,
    mistakeList,
  };
}, dispatch => ({
  onFetchProblemDetail: bindActionCreators(getIncorrectInfo, dispatch),
  onMarkFailReason: bindActionCreators(markFailReason, dispatch),
}))
class HomeworkProblemDetail extends Component {
  constructor(props) {
    super(props);
    console.log(20, props);
    // const {
    //   id,
    //   // incorrectIdList
    // } = props;

    const { mistakeList = [] } = props;
    const incorrectIdList = mistakeList.map(v => v.id);

    console.log(48, incorrectIdList);

    this.state = {
      incorrectIdList,
      index: 0,
      // currentId: id,
    };
  }

  componentDidMount() {
    const { id, category, onFetchProblemDetail } = this.props;
    onFetchProblemDetail({ params: { id, category } });
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { currentId } = state;
  //   const { problems } = props;
  //   const problem = problems[currentId];
  //   if (problem) {
  //     return {
  //       problem,
  //     };
  //   }
  //   return null;
  // }

  onChange = (reason) => {
    console.log(90, reason);
    const { onMarkFailReason, id, category } = this.props;

    onMarkFailReason({
      id,
      category,
      params: {
        reason,
      },
    });
  }

  swiper = (nextIndex) => {
    const { incorrectIdList } = this.state;
    const nextId = incorrectIdList[nextIndex];
    console.log('nextId', nextId);
    const { onFetchProblemDetail, category } = this.props;
    onFetchProblemDetail({ params: { id: nextId, category } });
    // this.setState({
    //   currentId: nextId,
    // });
  }

  render() {
    const { problems } = this.props;
    const { incorrectIdList } = this.state;

    console.log(49, this.props);
    const { index } = this.state;
    return (
      <View style={styles.wrapper}>
        {/* 头部自定义导航条 */}
        <View style={styles.head}>
          <View style={styles.head_icon}>
            <TouchableOpacity
              // 返回首页
              onPress={Actions.pop}
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
            incorrectIdList.map((id) => {
              const problem = problems[id];
              return !problem
                ? (
                  <View key={id}>
                    <Text>
                      请求数据中...
                    </Text>
                  </View>
                )
                : (
                  <View key={id}>
                    {/* <Image
                      style={{ width: '100%', height: 225 }}
                      source={{ uri: `${problem.titleUrl}` }}
                    /> */}
                    <View>
                      <Text>{problem.content}</Text>
                    </View>
                    <View style={styles.space} />
                    <View style={styles.reason_wrap}>
                      <View style={styles.reason_word}>
                        <View style={styles.reason_word_child}>
                          <Text style={styles.reason_icon}>
                            <CIcon name="cuowu" size={20} color="white" />
                          </Text>
                          <Text style={styles.reason_answer}>
                        回答错误答,案是B,你的答案是A
                          </Text>
                        </View>
                        <View style={styles.reason_word_child}>
                          <Text style={[styles.reason_difficult]}>
                      难易程度:
                          </Text>
                          <Text style={[styles.reason_difficult, styles.reason_difficult_result]}>
                            {convertToDifficultyLevel(problem.difficultyLevel)}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.reason_image}>
                        <Image
                          style={{ height: 312 }}
                          source={{ uri: `${problem.titleUrl}` }}
                        />
                      </View>
                    </View>
                    <View style={styles.space} />
                    <View style={styles.answer_wrap}>
                      <Text style={styles.answer_title}>题目答案:</Text>
                      <ThumbnailImage
                        option={{
                          url: problem.titleUrl,
                        }}
                      />
                    </View>
                    <View style={styles.space} />
                    <WrongReason onChange={this.onChange} defaultValue={problem.failReason} />
                  </View>
                );
            })
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
  title: PropTypes.array,
  id: PropTypes.string.isRequired,
  onFetchProblemDetail: PropTypes.func.isRequired,
  problems: PropTypes.object,
  category: PropTypes.string,
  mistakeList: PropTypes.array,
};

HomeworkProblemDetail.defaultProps = {
  title: [
    {
      url: [1, 2, 3, 4],
      difficult: '易',
      titleUrl: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    },
    {
      url: [1, 2, 3, 4],
      difficult: '难',
      titleUrl: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    },
    {
      url: [1, 2, 3, 4],
      difficult: null,
      titleUrl: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    },
  ],
  problems: {},
};

export default HomeworkProblemDetail;
