// 初次进入做作业页面时用来询问是否想检查作业的modal
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal, { ModalApi } from '../../../../../components/Modal';

class WillingToCheckModal extends Component {
  componentDidMount() {
    this.press();
  }

  // 不想检查
  leftFn=() => {
    ModalApi.onClose();
    const { notToCheckFun } = this.props;
    notToCheckFun();
  }

  // 想检查
  rightFn=() => {
    ModalApi.onClose();
    const { willToCheckFun } = this.props;
    willToCheckFun();
  }

  press = () => {
    const data = {
      lCallbakFn: this.leftFn,
      rCallbakFn: this.rightFn,
      activeBtn: 'R',
      rightBtnText: '想检查',
      leftBtnText: '不想检查',
      content: this.willingToCheckContent(),
      closeBtn: false,
    };
    ModalApi.onOppen('ButtomModal', data);
  }

 // 提示内容
 willingToCheckContent=() => (
   <View style={{
     flex: 1,
     display: 'flex',
     justifyContent: 'center',
   }}
   >
     <Text style={{
       fontSize: 24,
       color: '#666',
       textAlign: 'center',
       lineHeight: 46,
     }}
     >
      为了提高做题正确率，
     </Text>
     <Text style={{
       fontSize: 24,
       color: '#666',
       textAlign: 'center',
       lineHeight: 46,
     }}
     >
      作业写完后记得去检查一下哦~
     </Text>
   </View>
 )

 render() {
   return (
     <View>
       <Modal />
     </View>
   );
 }
}

WillingToCheckModal.propTypes = {
  willToCheckFun: PropTypes.func.isRequired,
  notToCheckFun: PropTypes.func.isRequired,
};

export default WillingToCheckModal;
