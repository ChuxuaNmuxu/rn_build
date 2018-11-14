// 选择难易程度的modal
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { ModalApi } from '../../../../../components/Modal';
import DifficultLevelView from '../../../../../components/DifficultLevelView';
import { adaptiveRotation } from '../../../../../utils/resolution';

class DifficultLevelModal extends Component {
  componentDidMount() {
    this.press();
  }

  press=() => {
    // 让难易程度标签展示在页面正中间
    const { height } = adaptiveRotation();
    const topDistance = (height / 2) - 82;
    const data = {
      customContent: this.difficultLevelContent(),
      top: topDistance,
      // 高度最好跟你自己自定义的内容高度一样
      height: 164,
    };
    ModalApi.onOppen('CustomModal', data);
  }

  // 难易程度改变
  difficultLevelChange = (a) => {
    ModalApi.onClose();
    const { handleDifficultLevel, questionId } = this.props;
    handleDifficultLevel(questionId, a);
  }

  // 提示内容
   difficultLevelContent = () => (
     <DifficultLevelView onChange={this.difficultLevelChange} />
   )

   render() {
     return (
       <View />
     );
   }
}

DifficultLevelModal.propTypes = {
  handleDifficultLevel: PropTypes.func.isRequired,
  questionId: PropTypes.string.isRequired,
};

export default DifficultLevelModal;
