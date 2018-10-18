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

  getBtnBGColor=(isItCorrect, index) => {
    const { status } = this.props;
    const { selectTion } = this.state;
    // --------------红色---------绿色--------橙色-------灰色-------无色----
    const color = ['#fa5656', '#30bf6c', '#f5a623', '#bfbfbf', '#ffffff'];
    if (status === 0 && selectTion === index) {
      return color[3];
    }
    if (status !== 0 && selectTion === index) {
      return color[isItCorrect];
    }
    return color[4];
  }

  getBtnTextColor=(isItCorrect, index) => {
    // :#fa5656 :#30bf6c; :#f5a623; :#ffffff
    // 0 错误   1正确   2对一些   3默认
    const { status } = this.props;
    const { selectTion } = this.state;
    const color = ['#fa5656', '#30bf6c', '#f5a623', '#999999', '#ffffff'];
    if (selectTion === index) {
      return color[4];
    }
    if (status === 0) {
      return color[3];
    }
    // 默认，既然全部批改了，颜色就得有
    return color[isItCorrect];
  }

  _onClick=(index, questionId) => {
    const { moveIndex } = this.props;
    this.setState({
      selectTion: index,
    }, () => moveIndex(index, questionId));
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
                key={`${index}aug`}
                style={[
                  styles.btn,
                  {
                    backgroundColor: this.getBtnBGColor(
                      item.isItCorrect, index,
                    ),
                    borderColor: this.getBtnTextColor(
                      item.isItCorrect, index,
                    ),
                  },
                ]}
                onPress={() => this._onClick(index, item.id)}
              >
                <Text style={[
                  styles.btnText,
                  {
                    color: this.getBtnTextColor(
                      item.isItCorrect, index,
                    ),
                  },
                ]}
                >
                  {item.questionNum}
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
  moveIndex: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
};

export default ScrollSelectedBar;
