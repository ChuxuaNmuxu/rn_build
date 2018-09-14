import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-swiper';
import CIcon from '../../../components/Icon';
import styles from './HomeworkProblemDetail.scss';
import ThumbnailImage from '../../../components/ThumbnailImage';
import Radio from '../../../components/Radio';

class HomeworkProblemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    // 写死的问题总结的array
    this.problemSummary = [
      {
        name: '知识记忆性错误',
        value: '知识记忆性错误',
      },
      {
        name: '理解性错误',
        value: '理解性错误',
      },
      {
        name: '考虑不全面',
        value: '考虑不全面',
      },
      {
        name: '审题不仔细',
        value: '审题不仔细',
      },
      {
        name: '粗心大意',
        value: '粗心大意',
      },
      {
        name: '其他',
        value: '其他',
      },
    ];
  }

  render() {
    const { title } = this.props;
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
        <Swiper
          loop={false}
          showsPagination={false}
          index={index}
          onIndexChanged={(nextIndex) => {
            this.setState({
              index: nextIndex,
            });
          }}
        >
          {
            title.map((item, titleIndex) => (
              <View key={titleIndex}>
                <Image
                  style={{ width: '100%', height: 225 }}
                  source={{ uri: `${item.titleUrl}` }}
                />
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
                        {item.difficult}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.reason_image}>
                    <Image
                      style={{ height: 312 }}
                      source={{ uri: `${item.titleUrl}` }}
                    />
                  </View>
                </View>
                <View style={styles.space} />
                <View style={styles.answer_wrap}>
                  <Text style={styles.answer_title}>题目答案:</Text>
                  <ThumbnailImage
                    option={{
                      url: item.titleUrl,
                    }}
                  />
                </View>
                <View style={styles.space} />
                <View style={styles.problem_wrapper}>
                  <Text style={styles.problem_title}>错误原因分析</Text>
                  <Radio.Group
                    onChange={i => console.log(i)}
                    checkedIconWrapStyle={{
                      borderColor: '#fa5656',
                    }}
                    checkedTextStyle={{
                      color: '#fa5656',
                    }}
                    style={styles.radio_wrapper}
                    childStyle={styles.radio_childStyle}
                  >
                    {
                      this.problemSummary.map((proItem, proIndex) => (
                        <Radio.Button key={proIndex} value={proItem.value}>{proItem.name}</Radio.Button>
                      ))
                    }
                  </Radio.Group>
                </View>
              </View>
            ))
          }
        </Swiper>
      </View>
    );
  }
}

HomeworkProblemDetail.propTypes = {
  // 传进来的题目
  title: PropTypes.array,
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
};

export default HomeworkProblemDetail;
