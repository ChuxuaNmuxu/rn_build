import React, { Component } from 'react';
import {
  TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Text, View,
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

const datas = {
  bb: { text: 'bb' },
  cc: { text: 'cc' },
  dd: { text: 'dd' },
  ee: { text: 'ee' },
  ff: { text: 'ff' },
  gg: { text: 'gg' },
  hh: { text: 'hh' },
  ii: { text: 'ii' },
  jj: { text: 'jj' },
  kk: { text: 'kk' },


  g: { text: 'gg' },
  h: { text: 'hh' },
  i: { text: 'ii' },
  j: { text: 'jj' },
  k: { text: 'kk' },
};

const order = Object.keys(datas); // Array of keys

const RowComponent = (props) => {
  const {
    data: {
      text,
    },
    sortHandlers,
    vertical,
  } = props;
  return (
    <TouchableHighlight
      activeOpacity={0}
      underlayColor="#eee"
      style={{
        // padding: 20,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        // marginBottom: 0,
        borderColor: '#eee',
      }}
      {...sortHandlers}
    >
      <TaskItem text={text} vertical={vertical} />
      {/* <Text>{text}</Text> */}
    </TouchableHighlight>
  );
};

RowComponent.defaultProps = {
  sortHandlers: {},
  vertical: 'center',
};

RowComponent.propTypes = {
  data: PropTypes.object.isRequired,
  sortHandlers: PropTypes.object,
  vertical: PropTypes.string,
};


class TodayTask extends Component {
  render() {
    const {
      vertical,
    } = this.props;
    return (
      <SortableListView
        // style={{ flex: 1, height: 100 }}
        sortRowStyle={{ backgroundColor: 'pink' }}
        data={datas}
        activeOpacity={1}
        order={order}
        // moveOnPressIn
        onRowActive={e => console.log(e)}
        onRowMoved={(e) => {
          console.log(96, order);
          order.splice(e.to, 0, order.splice(e.from, 1)[0]);
          this.forceUpdate();
          console.log(98, e);
          console.log(100, order);
        }}
        renderRow={row => <RowComponent data={row} vertical={vertical} />}
      />
    );
  }
}

TodayTask.defaultProps = {
  vertical: 'center',
};

TodayTask.propTypes = {
  vertical: PropTypes.string,
};

export default TodayTask;
