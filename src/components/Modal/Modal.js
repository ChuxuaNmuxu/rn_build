import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {
  Modal, ToastAndroid,
} from 'react-native';
// import Style from './Modal.scss';
import Resolution from '../Resolution';
import ButtomModal from './ButtonModal';
import TipsModal from './TipsModal';
import AnimationsModal from './AnimationsModal';
import CustomModal from './CustomModal';

class Method {}

class MyModal extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      type: 'ButtomModal',
      lCallbakFn: null,
      rCallbakFn: null,
      activeBtn: 'R',
      rightBtnText: '确定',
      leftBtnText: '取消',
      content: null,
      tipsContent: null,
      bottomTips: '自动关闭',
      maskClosable: false,
      svgName: 'finger',
      animationType: 'slideInLeft',
      closeBtn: false,
      customContent: null,
      top: 500,
    };
    Method.prototype.onOppen = this.onOppen;
    Method.prototype.onClose = this.onClose;
    Method.prototype.Tost = this.Tost;
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  }

  onOppen = (type, data) => {
    // 万一双重modal
    this.setState(Object.assign({}, {
      visible: true,
      type,
    }, data));
  }

  Tost=() => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  _ButtomModal=() => {
    const {
      activeBtn, rightBtnText, leftBtnText, content, rCallbakFn, lCallbakFn, closeBtn,
    } = this.state;
    return (
      <ButtomModal
        leftFn={lCallbakFn}
        rightFn={rCallbakFn}
        closeFn={this.onClose}
        activeBtn={activeBtn}
        rightBtnText={rightBtnText}
        leftBtnText={leftBtnText}
        content={content}
        closeBtn={closeBtn}
      />
    );
  }

  _TipsModal=() => {
    const { tipsContent, time, bottomTips } = this.state;
    return (
      <TipsModal
        closeFn={this.onClose}
        tipsContent={tipsContent}
        time={time}
        bottomTips={bottomTips}
      />
    );
  }

  _AnimationsModal=() => {
    const {
      bottomTips, maskClosable, svgName, animationType,
    } = this.state;
    return (
      <AnimationsModal
        closeFn={this.onClose}
        svgName={svgName}
        animationType={animationType}
        bottomTips={bottomTips}
        maskClosable={maskClosable}
      />
    );
  }

  _CustomModal=() => {
    const {
      customContent, top,
    } = this.state;
    return (
      <CustomModal
        customContent={customContent}
        top={top}
      />
    );
  }


  render() {
    const { visible, type } = this.state;
    return (
      <Modal
        transparent
        onClose={this.onClose}
        visible={visible}
        onRequestClose={() => {
          this.onClose();
        }}
      >
        <Resolution>
          {
              {
                ButtomModal: this._ButtomModal(),
                TipsModal: this._TipsModal(),
                AnimationsModal: this._AnimationsModal(),
                CustomModal: this._CustomModal(),
              }[type]
          }
        </Resolution>
      </Modal>
    );
  }
}

MyModal.propTypes = {

};

MyModal.defaultProps = {

};
const method = new Method();
export default { MyModal, method };
