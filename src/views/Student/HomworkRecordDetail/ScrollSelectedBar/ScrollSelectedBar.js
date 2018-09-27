// 作业记录详情页
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
// import { CustomButton } from '../../../components/Icon';
import styles from './ScrollSelectedBar.scss';

class ScrollSelectedBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectTion: 0,
    };
  }

  getBtnBGColor=(status, isItCorrect, index) => {
    const { selectTion } = this.state;
    // --------------红色---------绿色--------橙色-------灰色-------无色----
    const color = ['#fa5656', '#30bf6c', '#f5a623', '#bfbfbf', '#ffffff'];
    if ([0, 3, 4].includes(status) && selectTion === index) {
      return color[3];
    }
    if ([1, 2].includes(status) && selectTion === index) {
      return color[isItCorrect];
    }
    return color[4];
  }

  getBtnTextColor=(status, isItCorrect, index) => {
    // :#fa5656 :#30bf6c; :#f5a623; :#ffffff
    // 0 错误   1正确   2对一些   3默认
    const { selectTion } = this.state;
    const color = ['#fa5656', '#30bf6c', '#f5a623', '#999999', '#ffffff'];
    if (selectTion === index) {
      return color[4];
    }
    if ([0, 3, 4].includes(status)) {
      return color[3];
    }
    // 默认是被教师和学生操作过的
    return color[isItCorrect];
  }

  _onClick=(index) => {
    this.setState({
      selectTion: index,
    });
  }

  /**
 * isItCorrect是区分状态：0错，1对，2对一丢丢，other number默认
 * state: 0是未提交，1教师操作过，2是学生操作过，3是机器操作过，4是未批改
 */
  renderBtnList=() => {
    // const data = [
    //   {
    //     status: 0, type: 0, id: 1, isItCorrect: 0,
    //   },
    //   {
    //     status: 1, type: 0, id: 1, isItCorrect: 1,
    //   },
    //   {
    //     status: 2, type: 0, id: 1, isItCorrect: 2,
    //   },
    //   {
    //     status: 3, type: 0, id: 1, isItCorrect: 3,
    //   },
    //   {
    //     status: 4, type: 0, id: 1, isItCorrect: 0,
    //   },
    //   {
    //     status: 2, type: 0, id: 1, isItCorrect: 0,
    //   },
    //   {
    //     status: 0, type: 0, id: 1, isItCorrect: 0,
    //   },
    //   {
    //     status: 0, type: 0, id: 1, isItCorrect: 1,
    //   },
    //   {
    //     status: 0, type: 0, id: 1, isItCorrect: 2,
    //   },

    // ];
    const { data } = this.props;
    return (
      <React.Fragment>
        {
          data.map(
            (item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.btn,
                  {
                    backgroundColor: this.getBtnBGColor(
                      item.status,
                      item.isItCorrect, index,
                    ),
                    borderColor: this.getBtnTextColor(
                      item.status, item.isItCorrect, index,
                    ),
                  },
                ]}
                onPress={() => this._onClick(index)}
              >
                <Text style={[
                  styles.btnText,
                  {
                    color: this.getBtnTextColor(
                      item.status, item.isItCorrect, index,
                    ),
                  },
                ]}
                >
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ),
          )
        }
      </React.Fragment>
    );
  }

  render() {
    return (
      <View style={styles.ScrollSelectedBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.selectedBar}>
            {
              this.renderBtnList()
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}


ScrollSelectedBar.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ScrollSelectedBar;
