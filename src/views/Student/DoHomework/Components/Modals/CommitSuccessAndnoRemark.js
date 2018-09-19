// 初次进入做作业页面时用来询问是否想检查作业的modal
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal, { ModalApi } from '../../../../../components/Modal';

class CommitSuccessAndnoRemark extends Component {
  componentDidMount() {
    this.press();
  }

  // 点击作业任务到首页
  goIndex = () => {
    Actions.HomeworkTask();
  }

  press = () => {
    const data = {
      tipsContent: this.tipsContent(),
      bottomTips: '秒后自动回到首页',
    };
    ModalApi.onOppen('TipsModal', data);
  }

 // 提示内容
 tipsContent = () => (
   <View style={{
     width: 684,
   }}
   >
     <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
       <Text style={{ color: '#333', fontSize: 24 }}>提交成功，快去</Text>
       <TouchableOpacity onPress={this.goIndex}>
         <Text style={{ color: '#30bf6c', fontSize: 24 }}>作业任务</Text>
       </TouchableOpacity>
       <Text style={{ color: '#333', fontSize: 24 }}>列表查看其它未完成的任务吧！</Text>
     </View>
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

export default CommitSuccessAndnoRemark;
