// 上传图片应用于多题时的题目序号集合组件
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import Radio from '../Radio';
import styles from './OrderButtons.scss';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class OrderButtons extends Component {
  static defaultProps = {
    onChange: (a) => { console.log(123, a); },
    defaultValue: 7,
    unAnswerQuesList: [{
      number: 1,
      answered: 1,
    }, {
      number: 2,
      answered: 0,
    }, {
      number: 5,
      answered: 0,
    }, {
      number: 7,
      answered: 0,
    }, {
      number: 9,
      answered: 1,
    }],
  }

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.defaultValue,
    };
  }

  orderChange = (a) => {
    const { onChange } = this.props;
    onChange();
    this.setState({
      currentIndex: a,
    });
  }

  render() {
    const { currentIndex } = this.state;
    const { unAnswerQuesList } = this.props;
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <RadioGroup
          onChange={this.orderChange}
          style={styles.order_wrapper}
          childStyle={{ marginRight: 10 }}
          checkedIconWrapStyle={styles.checkedIconWrapStyle}
          checkedTextStyle={styles.checkedRadioTextStyle}
        >
          {
            unAnswerQuesList.map((item, index) => (
              <RadioButton
                value={item.number}
                key={index}
                iconWrapStyle={[
                  styles.orderStyle,
                  (item.number === currentIndex) && styles.currentOrderStyle,
                  (item.answered && item.number !== currentIndex) && styles.answeredOrderStyle,
                ]}
                textStyle={[
                  styles.radioTextStyle,
                  (item.number === currentIndex) && styles.currentRadioTextStyle,
                  (item.answered && item.number !== currentIndex) && styles.answeredOrderTextStyle,
                ]}
              >
                {item.number}
              </RadioButton>
            ))
          }
        </RadioGroup>
      </ScrollView>
    );
  }
}

OrderButtons.propTypes = {
  onChange: PropTypes.func,
  unAnswerQuesList: PropTypes.array,
  defaultValue: PropTypes.number,
};

export default OrderButtons;
