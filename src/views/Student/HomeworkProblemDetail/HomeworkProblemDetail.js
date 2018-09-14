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
import styles from './HomeworkProblemDetail.scss';

class HomeworkProblemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
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
            title.map((item, titleIndex) => {
              return (
                <View key={titleIndex}>
                  <Image
                    style={{ width: '100%', height: 225 }}
                    source={{ uri: `${item.titleUrl}` }}
                  />
                  <View style={styles.space} />
                </View>
              );
            })
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
      testColor: '#9DD6EB',
      titleUrl: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    },
    {
      url: [1, 2, 3, 4],
      testColor: '#30bf6c',
    },
    {
      url: [1, 2, 3, 4],
      testColor: '#92BBD9',
    },
  ],
};

export default HomeworkProblemDetail;
