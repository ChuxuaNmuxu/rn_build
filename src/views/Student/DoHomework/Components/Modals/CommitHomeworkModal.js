// 提交作业时二次确认是否提交的modal
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { ModalApi } from '../../../../../components/Modal';

class CommitHomeworkModal extends Component {
  componentDidMount() {
    this.press();
  }

  // 去检查已作题目
  leftFn=() => {
    ModalApi.onClose();
    const { checkAnsweredQuesFun } = this.props;
    checkAnsweredQuesFun();
  }

  // 直接提交
  rightFn=() => {
    ModalApi.onClose();
    const { commitHomeworkFun } = this.props;
    commitHomeworkFun();
  }

  press = () => {
    const data = {
      lCallbakFn: this.leftFn,
      rCallbakFn: this.rightFn,
      activeBtn: 'L',
      footButton: true, // 传参展示按钮，以免受其他页面传了false而导致按钮不展示的问题（单例不可避免的问题）
      rightBtnText: '提交',
      leftBtnText: '检查',
      content: this.commitHomeworkContent(),
      closeBtn: true,
      maskClosable: false,
      svgOption: {
        width: 60,
        height: 60,
      },
      style: { width: 620 },
    };
    ModalApi.onOppen('ButtomModal', data);
  }

 // 提示内容
 commitHomeworkContent=() => {
   const { countQuesNum, answeredQuesNum, notAnswerQuesNum } = this.props;
   return (
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
        此份作业共{countQuesNum}题，已作答：
         <Text style={{ color: '#30bf6c' }}>{answeredQuesNum} 题</Text>
        &nbsp;&nbsp;&nbsp;&nbsp;未作答：
         <Text style={{ color: '#30bf6c' }}>{notAnswerQuesNum} 题</Text>
       </Text>
       <Text style={{
         fontSize: 24,
         color: '#666',
         textAlign: 'center',
         lineHeight: 46,
       }}
       >
     在提交之前去检查一遍作业吧！
       </Text>
     </View>
   );
 }

 render() {
   return (
     <View />
   );
 }
}

CommitHomeworkModal.propTypes = {
  countQuesNum: PropTypes.number.isRequired,
  answeredQuesNum: PropTypes.number.isRequired,
  notAnswerQuesNum: PropTypes.number.isRequired,
  checkAnsweredQuesFun: PropTypes.func.isRequired,
  commitHomeworkFun: PropTypes.func.isRequired,
};

export default CommitHomeworkModal;
