import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import { adaptiveRotation } from '../../../utils/resolution';

class TouchTaskItem extends Component {
  taskRef = null;

  onLongPress = (e) => {
    const { onLongPress } = this.props;
    const { scale } = adaptiveRotation();
    let offsetX;
    let offsetY;
    this.taskRef.measure((x, y, width, height, pageX, pageY) => {
      offsetX = pageX / scale;
      offsetY = pageY / scale;
    });
    onLongPress(e, { offsetX, offsetY });
  }

  // 获取子级的 ref
  childRef = (ref) => { this.taskRef = ref; }

  render() {
    const { item, onPressOut, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={this.onLongPress}
        onPressOut={onPressOut}
      >
        <TaskItem data={item} refs={this.childRef} />

      </TouchableOpacity>
    );
  }
}

TouchTaskItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPressOut: PropTypes.func,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
};

TouchTaskItem.defaultProps = {
  onPressOut: () => {},
  onPress: () => {},
  onLongPress: () => {},
};

export default TouchTaskItem;
