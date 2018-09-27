// 初次进入做作业页面时用来询问是否想检查作业的modal
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal, { ModalApi } from '../../../../../components/Modal';

class CommitSuccessAndhasRemark extends Component {
  componentDidMount() {
    this.press();
  }

  // 稍后再批---回到首页
  leftFn=() => {
    ModalApi.onClose();
    const { laterToCorrentFun } = this.props;
    laterToCorrentFun();
  }

  // 批改作业
  rightFn=() => {
    ModalApi.onClose();
    const { presenttoCorrentFun } = this.props;
    presenttoCorrentFun();
  }

  press = () => {
    const data = {
      lCallbakFn: this.leftFn,
      rCallbakFn: this.rightFn,
      activeBtn: 'R',
      rightBtnText: '批改作业',
      leftBtnText: '稍后再批',
      content: this.hasRemarkContent(),
      closeBtn: false,
    };
    ModalApi.onOppen('ButtomModal', data);
  }

 // 提示内容
 hasRemarkContent=() => (
   <View style={{
     flex: 1,
     display: 'flex',
     justifyContent: 'center',
   }}
   >
     <Text style={{
       fontSize: 36,
       color: '#30bf6c',
       textAlign: 'center',
       lineHeight: 60,
     }}
     >
      提交成功!
     </Text>
     <Text style={{
       fontSize: 24,
       color: '#999',
       textAlign: 'center',
       lineHeight: 46,
     }}
     >
     老师还布置了互批任务，快去完成吧。
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

CommitSuccessAndhasRemark.propTypes = {
  laterToCorrentFun: PropTypes.func.isRequired,
  presenttoCorrentFun: PropTypes.func.isRequired,
};

export default CommitSuccessAndhasRemark;
