import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './planItemWrap.scss';
import PlanItem from './PlanItem';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    const { focus } = nextProps;
    if (focus === this.props) return false;
    return true;
  }

  render() {
    const {
      data,
      getTimeItemRef,
      focus,
      lastHandlePeriodIndex,
      ...rest
    } = this.props;
    // console.log(23, data);

    // data
    // {
    //   index:46,
    //   item:{
    //     currentPeriod:"14:00-14:30",
    //     period:"23:00-23:30",
    //     data:[]
    //   }
    // }
    const {
      index, item,
    } = data;
    const checked = index === lastHandlePeriodIndex;

    /*
     * breviaryTask 任务只显示简要
     * showIconOnlyTask 任务只显示图标
    */
    return (
      <TouchableNativeFeedback>
        <View
          style={[styles.time_wrap, focus ? styles.hover : {}]}
          ref={getTimeItemRef}
        >

          <View style={[styles.time_box, checked ? styles.time_box_checked : {}]}>
            <View style={styles.border} />
            <View style={styles.task_list}>
              {/*
                * 1.有任务状态
                * 2.进入时自动居中状态或者当前正在操作状态
              */}
              {
                  item.data.map((v, i) => (
                    <PlanItem
                      {...rest}
                      key={i}
                      type={checked ? 'breviaryTask' : 'showIconOnlyTask'}
                      data={v}
                      lastHandlePeriodIndex={lastHandlePeriodIndex}
                      periodIndex={index}
                    />
                  ))
                }
              <View style={styles.time_scale}>
                {
                  Array(6).fill().map((v, i) => (
                    <View key={i} style={[i === 1 ? {} : styles.scale_line]} />
                  ))
                }
              </View>
            </View>
          </View>
          <View style={styles.time_text}><Text>{item.period}</Text></View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

TodoItem.propTypes = {
  data: PropTypes.object,
  getTimeItemRef: PropTypes.func,
  focus: PropTypes.bool,
  lastHandlePeriodIndex: PropTypes.number,
};

TodoItem.defaultProps = {
  data: {},
  getTimeItemRef: () => {},
  focus: false,
  lastHandlePeriodIndex: null,
};

export default TodoItem;
