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
import ImageViewer from './ImageViewer';

class Method {}

class MyModal extends Component {
  constructor() {
    super();
    // 参数很多是共用的，传入类型一样，表现因API不同而异
    this.state = {
      visible: false,
      type: 'ButtomModal',

      lCallbakFn: null,
      rCallbakFn: null,
      activeBtn: 'R',
      rightBtnText: '确定',
      leftBtnText: '取消',
      content: null,
      closeBtn: false,

      tipsContent: null,
      bottomTips: '自动关闭',
      maskClosable: false,

      svgName: 'finger',
      animationType: 'slideInLeft',

      customContent: null,
      top: 500,
      height: 164,

      studentName: '',
      url: '',
      imageViewType: '',
    };
    // 只提供两个API，TOST需要再搞
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
    this.setState(Object.assign({}, {
      visible: true,
      type,
    }, data));
  }

  // 预留的功能，不见得用的上
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
      activeBtn, rightBtnText, leftBtnText, content, rCallbakFn, lCallbakFn, closeBtn, style, svgOption,
    } = this.state;
    return (
      <ButtomModal
        leftFn={lCallbakFn || this.onClose}
        rightFn={rCallbakFn || this.onClose}
        closeFn={this.onClose}
        activeBtn={activeBtn}
        rightBtnText={rightBtnText}
        leftBtnText={leftBtnText}
        content={content}
        closeBtn={closeBtn}
        style={style}
        svgOption={svgOption}
      />
    );
  }

  _TipsModal=() => {
    const {
      tipsContent, time, bottomTips, maskClosable,
    } = this.state;
    return (
      <TipsModal
        closeFn={this.onClose}
        tipsContent={tipsContent}
        time={time}
        bottomTips={bottomTips}
        maskClosable={maskClosable}
      />
    );
  }

  _AnimationsModal=() => {
    const {
      bottomTips, maskClosable, svgName, animationType, style, svgOption,
    } = this.state;
    return (
      <AnimationsModal
        closeFn={this.onClose}
        svgName={svgName}
        animationType={animationType}
        bottomTips={bottomTips}
        maskClosable={maskClosable}
        style={style}
        svgOption={svgOption}
      />
    );
  }

  _CustomModal=() => {
    const {
      customContent, top, maskClosable, height,
    } = this.state;
    return (
      <CustomModal
        customContent={customContent}
        top={top}
        maskClosable={maskClosable}
        height={height}
      />
    );
  }

  _ImageViewer=() => {
    const { studentName, url, imageViewType } = this.state;
    return (
      <ImageViewer
        closeFn={this.onClose}
        name={studentName}
        url={url}
        type={imageViewType}
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
                ButtomModal: this._ButtomModal,
                TipsModal: this._TipsModal,
                AnimationsModal: this._AnimationsModal,
                CustomModal: this._CustomModal,
                ImageViewer: this._ImageViewer,
              }[type]()
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
