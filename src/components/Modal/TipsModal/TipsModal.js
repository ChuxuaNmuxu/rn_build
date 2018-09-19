import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, Text,
} from 'react-native';
import Style from './TipsModal.scss';

class ButtonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 2,
    };
    this.timer = null;
    this.timeout = null;
  }

  componentDidMount() {
    const { sec } = this.state;
    const { closeFn } = this.props;
    this.timer = setInterval(() => {
      const newSec = sec - 1;
      this.setState({
        sec: newSec,
      });
    }, 1000);
    this.timeout = setTimeout(() => {
      clearInterval(this.timer);
      clearTimeout(this.timeout);
      closeFn();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearTimeout(this.timeout);
  }

  _preventDefault=(e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  _onClose=() => {
    const { closeFn } = this.props;
    clearInterval(this.timer);
    clearTimeout(this.timeout);
    closeFn();
  }

  modalContent=() => {
    const { tipsContent, bottomTips } = this.props;
    const { sec } = this.state;
    return (
      <View style={Style.modalContent}>
        {
          tipsContent
        }
        <Text style={Style.bottomTipsText}>{sec}{bottomTips}</Text>
      </View>
    );
  }

  render() {
    const { maskClosable } = this.props;
    return (
      <TouchableOpacity
        onPress={maskClosable ? this._onClose : this._preventDefault}
        style={[Style.TouchableOpacity, Style.transparentTwo]}
        activeOpacity={1}
      >
        <TouchableOpacity
          style={[Style.content]}
          onPress={maskClosable ? this._onClose : this._preventDefault}
          activeOpacity={1}
        >
          <React.Fragment>
            {this.modalContent()}
          </React.Fragment>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

ButtonModal.propTypes = {
  tipsContent: PropTypes.any,
  // time: PropTypes.number,
  closeFn: PropTypes.func,
  bottomTips: PropTypes.any,
  maskClosable: PropTypes.bool,
};

ButtonModal.defaultProps = {
  tipsContent: null,
  // time: 2,
  closeFn() {},
  bottomTips: '自动关闭',
  maskClosable: false,
};

export default ButtonModal;
