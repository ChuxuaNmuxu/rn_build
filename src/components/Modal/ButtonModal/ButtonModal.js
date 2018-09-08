import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, TouchableOpacity,
} from 'react-native';
import Style from './ButtonModal.scss';
import Svg from '../../Svg';

class ButtonModal extends Component {
  _preventDefault=(e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  _leftFn = () => {
    const { leftFn } = this.props;
    leftFn();
  }

  _rightFn =() => {
    const { rightFn } = this.props;
    rightFn();
  }

  _onClose=() => {
    const { closeFn } = this.props;
    closeFn();
  }

  /**
   *底部按钮，按需求设定，左右按钮看情况激活状态，颜色不同，回调函数等
   */
  buttonComponent=() => {
    const { activeBtn, leftBtnText, rightBtnText } = this.props;
    return (
      <View style={[Style.buttonComponent, { borderTopWidth: 2, borderTopColor: '#e8e8e8' }]}>
        <TouchableOpacity
          style={[Style.footerBtn,
            {
              backgroundColor: activeBtn === 'L' ? '#30bf6c' : 'transparent',
            }]}
          onPress={this._leftFn}
          activeOpacity={1}
        >
          <Text
            style={[Style.footerBtnText, { color: activeBtn === 'L' ? '#ffffff' : '#30bf6c' }]}
          >
            {leftBtnText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Style.footerBtn,
            {
              backgroundColor: activeBtn === 'R' ? '#30bf6c' : 'transparent',
            }]}
          onPress={this._rightFn}
          activeOpacity={1}
        >
          <Text
            style={[Style.footerBtnText, { color: activeBtn === 'R' ? '#ffffff' : '#30bf6c' }]}
          >
            {rightBtnText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 中间内容
  modalContent=() => {
    const { content } = this.props;
    return (
      <View style={Style.modalContent}>
        {
          content
        }
      </View>
    );
  }

  render() {
    // 产品打佬说了，这个东西是不能点蒙版关闭的，但是会有个关闭按钮
    const { closeBtn } = this.props;
    return (
      <TouchableOpacity
        onPress={this._preventDefault}
        style={[Style.TouchableOpacity, Style.transparentTwo]}
        activeOpacity={1}
      >
        <TouchableOpacity style={[Style.content]} onPress={this._preventDefault} activeOpacity={1}>
          <React.Fragment>
            {this.modalContent()}
            {this.buttonComponent()}
          </React.Fragment>
        </TouchableOpacity>
        {
          closeBtn ? (
            <TouchableOpacity onPress={this._onClose} style={Style.close}>
              <Svg height="60" width="60" source="close" fill="#fff" />
            </TouchableOpacity>
          ) : null
        }
      </TouchableOpacity>
    );
  }
}

ButtonModal.propTypes = {
  leftFn: PropTypes.func,
  rightFn: PropTypes.func,
  closeFn: PropTypes.func,
  activeBtn: PropTypes.string,
  leftBtnText: PropTypes.string,
  rightBtnText: PropTypes.string,
  content: PropTypes.any,
  closeBtn: PropTypes.bool,
};

ButtonModal.defaultProps = {
  leftFn() {},
  rightFn() {},
  closeFn() {},
  activeBtn: '',
  rightBtnText: '',
  leftBtnText: '',
  content: null,
  closeBtn: false,
};

export default ButtonModal;
