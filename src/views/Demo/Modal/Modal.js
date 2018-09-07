import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from '../../../components/Modal';
import Style from './Modal.scss';

export default class Test3 extends Component {
  leftFn=() => {
    Modal.method.onClose();
  }

  rightFn=() => {
    this.AnimationsModal();

    setTimeout(() => this.TipsModal(), 6000);
  }

  ButtomModal=() => {
    const data = {
      lCallbakFn: this.leftFn,
      rCallbakFn: this.rightFn,
      activeBtn: 'R',
      rightBtnText: '确定',
      leftBtnText: '取消',
      content: this.modalContent(),
      closeBtn: true,
    };
    Modal.method.onOppen('ButtomModal', data);
  }

  TipsModal=() => {
    const data = {
      tipsContent: this.tipsContent(),
      bottomTips: '自动关闭',
    };
    Modal.method.onOppen('TipsModal', data);
  }

  AnimationsModal=() => {
    const data = {
      // tipsContent: this.svgContent(),
      svgName: 'finger',
      animationType: 'loading',
      bottomTips: '正在加载...',
      maskClosable: false,
    };
    Modal.method.onOppen('AnimationsModal', data);
  }

  CustomModal=() => {
    const data = {
      customContent: this.customContent(),
    };
    Modal.method.onOppen('CustomModal', data);
  }

  modalContent=() => (
    <View style={Style.modalContent}>
      <Text style={Style.modalContentText}>此份作业共11题，已作答：9 题   未作答：2 题</Text>
      <Text style={Style.modalContentText}>在提交之前去检查一遍作业吧！</Text>
    </View>
  )

  tipsContent=() => (

    <Text style={Style.modalContentText}>提交成功，快去作业任务列表查看其它未完成的任务吧！</Text>

  )

  customContent=() => (
    <View style={Style.customContent}>
      <Text style={Style.title}>你认为本题的难易程度(必选*)：</Text>
      <View style={Style.customContentItem}>
        {
            [1, 2, 3].map(item => (
              <Text key={item} style={Style.btn} onPress={() => Modal.method.onClose()}>{item}</Text>
            ))
          }
      </View>
    </View>
  )

  render() {
    return (
      <View>
        <Modal.MyModal />
        <View style={{
          width: 200, height: 100, borderWidth: 2, borderColor: 'salmon', borderRadius: 50,
        }}
        >
          <TouchableOpacity onPress={this.ButtomModal} style={{ flex: 1, backgroundColor: '#333' }}>
            <Text>wocaonima</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          width: 200, height: 100, borderWidth: 2, borderColor: 'salmon', borderRadius: 50,
        }}
        >
          <TouchableOpacity onPress={this.TipsModal} style={{ flex: 1, backgroundColor: '#333' }}>
            <Text>wocaonima</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          width: 200, height: 100, borderWidth: 2, borderColor: 'salmon', borderRadius: 50,
        }}
        >
          <TouchableOpacity onPress={this.AnimationsModal} style={{ flex: 1, backgroundColor: '#333' }}>
            <Text>wocaonima</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          width: 200, height: 100, borderWidth: 2, borderColor: 'salmon', borderRadius: 50,
        }}
        >
          <TouchableOpacity onPress={this.CustomModal} style={{ flex: 1, backgroundColor: '#333' }}>
            <Text>wocaonima</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}