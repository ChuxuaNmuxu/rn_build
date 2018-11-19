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
    defaultValue: '',
    unAnswerQuesList: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      currentQid: props.defaultValue,
    };
  }

  orderChange = (a) => {
    const { onChange } = this.props;
    onChange(a);
    this.setState({
      currentQid: a,
    });
  }

  render() {
    const { currentQid } = this.state;
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
                value={item.id}
                key={index}
                iconWrapStyle={[
                  styles.orderStyle,
                  (item.id === currentQid) && styles.currentOrderStyle,
                  (item.answered && item.id !== currentQid) && styles.answeredOrderStyle,
                ]}
                textStyle={[
                  styles.radioTextStyle,
                  (item.id === currentQid) && styles.currentRadioTextStyle,
                  (item.answered && item.id !== currentQid) && styles.answeredOrderTextStyle,
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
  defaultValue: PropTypes.string,
};

export default OrderButtons;
