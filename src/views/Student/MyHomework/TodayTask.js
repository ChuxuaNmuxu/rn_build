import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
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
      underlayColor="#eee"
      style={{
        // padding: 20,
        // backgroundColor: '#F8F8F8',
        // borderBottomWidth: 1,
        marginBottom: 0,
        // borderColor: '#eee',
      }}
      {...sortHandlers}
    >
      <TaskItem text={text} vertical={vertical} />
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
        style={{ flex: 1 }}
        data={datas}
        order={order}
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
