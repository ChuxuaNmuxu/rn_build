import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import { mergeStyles } from '../../../utils/common';
import Style from './recordModal.scss';

class ButtonModal extends Component {
  _preventDefault=(e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  _onClose=() => {
    const { closeFn } = this.props;
    closeFn();
  }

  render() {
    const {
      style, maskClosable, height, content,
    } = this.props;
    console.log(33, height);
    return (
      <TouchableOpacity
        onPress={maskClosable ? this._onClose : this._preventDefault}
        style={[Style.TouchableOpacity, Style.transparentTwo]}
        activeOpacity={1}
      >
        <TouchableOpacity
          style={mergeStyles(Style.content, { height }, style)}
          onPress={this._preventDefault}
          activeOpacity={1}
        >
          <React.Fragment>
            {content}
          </React.Fragment>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

ButtonModal.propTypes = {
  content: PropTypes.any,
  closeFn: PropTypes.func,
  style: PropTypes.any,
  maskClosable: PropTypes.bool,
  height: PropTypes.number,
};

ButtonModal.defaultProps = {
  content: null,
  closeFn() {},
  style: {},
  maskClosable: false,
  height: null,
};

export default ButtonModal;
