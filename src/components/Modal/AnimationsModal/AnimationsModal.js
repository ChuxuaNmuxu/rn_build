import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, Text,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Svg from '../../Svg';
import Style from './AnimationsModal.scss';


class ButtonModal extends Component {
  _preventDefault=(e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  _onClose=() => {
    const { closeFn } = this.props;
    closeFn();
  }


  svgContent=(svgName) => {
    const { svgOption } = this.props;
    return (
      <Svg height={svgOption.height} width={svgOption.width} source={svgName} fill="#fff" />
    );
  }

  loadingComponent=() => {
    // const { svgName } = this.props;
    const slideInLeft = {
      from: {
        left: 40,
      },
      to: {
        left: -40,
      },
    };
    const slideInRight = {
      from: {
        left: -40,
      },
      to: {
        left: 40,
      },
    };
    return (
      <View style={Style.loadingComponent}>
        <Animatable.View
          animation={slideInLeft}
          iterationCount="infinite"
          direction="normal"
          easing="linear"
          style={Style.Animatable}
        >
          {
            this.svgContent('red')
          }
        </Animatable.View>
        <Animatable.View
          animation={slideInRight}
          iterationCount="infinite"
          direction="normal"
          easing="linear"
          style={Style.Animatable}
        >
          {
            this.svgContent('green')
          }
        </Animatable.View>
      </View>
    );
  }

  modalContent=() => {
    const { bottomTips, svgName, animationType } = this.props;
    const slideInDown = {
      from: {
        top: 10,
      },
      to: {
        top: -20,
      },
    };
    const slideInLeft = {
      from: {
        left: 40,
      },
      to: {
        left: -40,
      },
    };

    const rotate = 'rotate';

    const animationObj = {
      slideInDown,
      rotate,
      slideInLeft,
    };
    return (
      <View style={Style.modalContent}>
        {
        animationType === 'loading' ? this.loadingComponent() : (
          <Animatable.View
            animation={animationObj[animationType]}
            iterationCount="infinite"
            direction="normal"
            easing="linear"
          >
            {
          this.svgContent(svgName)
        }
          </Animatable.View>
        )
      }

        <Text style={Style.modalContentText}>{bottomTips}</Text>
      </View>
    );
  }

  render() {
    const { maskClosable, style, animationType } = this.props;
    return (
      <TouchableOpacity
        onPress={maskClosable ? this._onClose : this._preventDefault}
        activeOpacity={1}
        style={[
          Style.TouchableOpacity,
          Style.transparentTwo,
          { backgroundColor: maskClosable ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.2)' },
          { alignItems: animationType === 'slideInLeft' ? 'flex-end' : 'center' },
        ]}
      >
        <TouchableOpacity
          style={[Style.content, style]}
          onPress={maskClosable ? this._onClose : this._preventDefault}
          activeOpacity={1}
        >
          <React.Fragment>
            {this.modalContent()}
          </React.Fragment>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

ButtonModal.propTypes = {
  // tipsContent: PropTypes.any,
  svgName: PropTypes.string,
  animationType: PropTypes.string,
  closeFn: PropTypes.func,
  bottomTips: PropTypes.any,
  maskClosable: PropTypes.bool,
  svgOption: PropTypes.object,
  style: PropTypes.object,
};

ButtonModal.defaultProps = {
  svgName: 'finger',
  animationType: 'loading',
  closeFn() {},
  bottomTips: '正在加载……',
  maskClosable: false,
  svgOption: {
    height: 60,
    width: 60,
  },
  style: {},
};

export default ButtonModal;
