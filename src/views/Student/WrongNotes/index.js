import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import ImageViewer from 'react-native-image-zoom-viewer';
import Modal, { ModalApi } from '../../../components/Modal';
import Style from './WrongNotes.scss';

export default class Test3 extends Component {
  leftFn=() => {
    ModalApi.onClose();
  }

  rightFn=() => {
    this.pressF();

    setTimeout(() => this.pressT(), 6000);
  }

  // demo的函数名乱搞的，写代码的大佬别乱copy
  press=() => {
    const data = {
      lCallbakFn: this.leftFn,
      rCallbakFn: this.rightFn,
      activeBtn: 'R',
      rightBtnText: '确定',
      leftBtnText: '取消',
      content: this.modalContent(),
      closeBtn: true,
    };
    ModalApi.onOppen('ButtomModal', data);
  }

  pressT=() => {
    const data = {
      tipsContent: this.tipsContent(),
      bottomTips: '自动关闭',
    };
    ModalApi.onOppen('TipsModal', data);
  }

  pressF=() => {
    const data = {
      // tipsContent: this.svgContent(),
      svgName: 'finger',
      animationType: 'loading',
      bottomTips: '正在加载...',
      maskClosable: false,
    };
    ModalApi.onOppen('AnimationsModal', data);
  }

  pressK=() => {
    const data = {
      customContent: this.customContent(),
      top: 400,
      // 高度最好跟你自己自定义的内容高度一样
      height: 164,
    };
    ModalApi.onOppen('CustomModal', data);
  }

  pressD=() => {
    const data = {
      url: 'https://photo.tuchong.com/3058042/f/80413193.jpg',
      studentName: '李香兰',
      imageViewType: 'asd',
    };
    ModalApi.onOppen('ImageViewer', data);
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
              <Text key={item} style={Style.btn} onPress={() => ModalApi.onClose()}>{item}</Text>
            ))
          }
      </View>
    </View>
  )

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal />
        <View style={{
          width: 200, height: 100, borderWidth: 2, borderColor: 'salmon', borderRadius: 50,
        }}
        >
          <TouchableOpacity onPress={this.press} style={{ flex: 1, backgroundColor: '#333' }}>
            <Text style={{ color: '#ffffff', fontSize: 30 }}>ButtomModal</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          width: 200, height: 100, borderWidth: 2, borderColor: 'salmon', borderRadius: 50,
        }}
        >
          <TouchableOpacity onPress={this.pressT} style={{ flex: 1, backgroundColor: '#333' }}>
            <Text style={{ color: '#ffffff', fontSize: 30 }}>TipsModal</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          width: 200, height: 100, borderWidth: 2, borderColor: 'salmon', borderRadius: 50,
        }}
        >
          <TouchableOpacity onPress={this.pressF} style={{ flex: 1, backgroundColor: '#333' }}>
            <Text style={{ color: '#ffffff', fontSize: 30 }}>AnimationsModal</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          width: 200, height: 100, borderWidth: 2, borderColor: 'salmon', borderRadius: 50,
        }}
        >
          <TouchableOpacity onPress={this.pressK} style={{ flex: 1, backgroundColor: '#333' }}>
            <Text style={{ color: '#ffffff', fontSize: 30 }}>CustomModal</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          width: 200, height: 100, borderWidth: 2, borderColor: 'salmon', borderRadius: 50,
        }}
        >
          <TouchableOpacity onPress={this.pressD} style={{ flex: 1, backgroundColor: '#333' }}>
            <Text style={{ color: '#ffffff', fontSize: 30 }}>ImageViewer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
