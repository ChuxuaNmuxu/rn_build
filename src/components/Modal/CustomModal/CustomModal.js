import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity,
} from 'react-native';
import Style from './CustomModal.scss';

class ButtonModal extends Component {
  _preventDefault=(e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  _onClose=() => {
    const { closeFn } = this.props;
    closeFn();
  }

  modalContent=() => {
    const { customContent } = this.props;
    return (
      <View style={Style.modalContent}>
        {
          customContent
        }
      </View>
    );
  }

  render() {
    const { top, maskClosable, height } = this.props;
    return (
      <TouchableOpacity
        onPress={maskClosable ? this._onClose : this._preventDefault}
        style={[Style.TouchableOpacity, Style.transparentTwo]}
        activeOpacity={1}
      >
        <TouchableOpacity style={[Style.content, { top, height }]} onPress={this._preventDefault} activeOpacity={1}>
          <React.Fragment>
            {this.modalContent()}
          </React.Fragment>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

ButtonModal.propTypes = {
  customContent: PropTypes.any,
  closeFn: PropTypes.func,
  top: PropTypes.number,
  maskClosable: PropTypes.bool,
  height: PropTypes.number,
};

ButtonModal.defaultProps = {
  customContent: null,
  closeFn() {},
  top: 500,
  maskClosable: false,
  height: 164,
};

export default ButtonModal;
