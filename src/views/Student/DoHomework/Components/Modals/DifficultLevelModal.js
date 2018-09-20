// 初次进入做作业页面时用来询问是否想检查作业的modal
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Modal, { ModalApi } from '../../../../../components/Modal';
import DifficultLevelView from '../../../../../components/DifficultLevelView';

class DifficultLevelModal extends Component {
  componentDidMount() {
    this.press();
  }

  press=() => {
    const data = {
      customContent: this.difficultLevelContent(),
      top: 700,
      // 高度最好跟你自己自定义的内容高度一样
      height: 164,
    };
    ModalApi.onOppen('CustomModal', data);
  }

  // 难易程度改变
  difficultLevelChange = (a) => {
    ModalApi.onClose();
    const { handleDifficultLevel } = this.props;
    handleDifficultLevel(a);
  }

  // 提示内容
   difficultLevelContent = () => (
     <DifficultLevelView onChange={this.difficultLevelChange} />
   )

   render() {
     return (
       <View>
         <Modal />
       </View>
     );
   }
}

DifficultLevelModal.propTypes = {
  handleDifficultLevel: PropTypes.func.isRequired,
};

export default DifficultLevelModal;
