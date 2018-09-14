import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  // TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Entypo from 'react-native-vector-icons/Entypo';
import I18nText from '../../../components/I18nText';
import styles from './HomeworkCorrecting.scss';

class HomeworkCorrecting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      // isVisible: false,
    };
  }

  componentDidMount() {
    console.log('调用 HomeworkCorrecting 组件！', this.props);
  }

  showPopover = () => {
    const { isVisible } = this.state;
    this.setState({
      isVisible: !isVisible,
    });
  }

  render() {
    const { title } = this.props;
    const { index } = this.state;
    return (
      <View style={styles.wrapper}>
        {/* 头部自定义导航条 */}
        <View style={styles.head}>
          <TouchableOpacity
            // 返回首页
            onPress={Actions.Student}
          >
            <Entypo name="chevron-thin-left" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.head_content}>
            <Text style={styles.head_content_word}>第{index + 1}题,共{title.length}题待批阅</Text>
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
          title.map((item, index1) => (
            <View style={styles.wrap} key={index1}>
              <View style={styles.body}>
                <View style={styles.body_homework_title}>
                  <Swiper
                    style={styles.wrapper}
                    loop={false}
                    // showsPagination={false}
                    paginationStyle={styles.paginationStyle} // 暂时没覆盖成功
                  >
                    {
                      item.url.map((item2, index2) => (
                        <TouchableOpacity
                          // 返回首页
                          onPress={() => console.log('点击查看老师布置的题目')}
                          key={index2}
                        >
                          <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png' }}
                          />
                        </TouchableOpacity>
                      ))
                    }
                  </Swiper>
                </View>
                <View style={styles.space} />
                <TouchableOpacity
                  // 点击查看学生题目
                  onPress={() => console.log('点击查看学生题目')}
                >
                  <View style={styles.body_homework_studentAnswer}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      source={{ uri: 'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png' }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.foot}>
                <View style={styles.foot_child_left}>
                  <View>
                    <I18nText style={styles.foot_word}>
                      homeworkCorrecting.homeworkCorrecting
                    </I18nText>
                  </View>
                  <TouchableOpacity onPress={() => console.log('正确')}>
                    <I18nText style={[styles.foot_btn, styles.btn_color_green]}>
                      homeworkCorrecting.correct
                    </I18nText>
                  </TouchableOpacity>
                  <View style={styles.space_2} />
                  <TouchableOpacity
                    onPress={() => console.log('部分正确')}
                    ref={(node) => { this.partOfTheError = node; }}
                    // onPress={this.showPopover}
                  >
                    <I18nText style={[styles.foot_btn, styles.btn_color_orange]}>
                      homeworkCorrecting.partOfTheError
                    </I18nText>
                  </TouchableOpacity>
                  <View style={styles.space_2} />
                  <TouchableOpacity onPress={() => console.log('错误')}>
                    <I18nText style={[styles.foot_btn, styles.btn_color_pink]}>
                      homeworkCorrecting.error
                    </I18nText>
                  </TouchableOpacity>
                </View>
                <View style={styles.foot_child_right}>
                  <TouchableOpacity onPress={() => {
                    console.log('完成批阅，下一题');
                    this.setState({
                      index: 1,
                    });
                  }}
                  >
                    <I18nText style={[styles.foot_btn, styles.btn_color_right]}>
                      homeworkCorrecting.finishCorrectingAndNext
                    </I18nText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        }
        </Swiper>
      </View>
    );
  }
}

HomeworkCorrecting.propTypes = {
  title: PropTypes.array,
};

HomeworkCorrecting.defaultProps = {
  title: [
    {
      url: [1, 2, 3, 4],
      testColor: '#9DD6EB',
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

export default HomeworkCorrecting;
