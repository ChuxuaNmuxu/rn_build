// custom icon
import { createIconSet } from 'react-native-vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import glyphMap from '../../public/icon/iconfont';

const IconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default IconSet;
const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  ToolbarAndroid,
  getImageSource,
} = IconSet;

const CustomButton = ({
  children, onPress, style, warpStyle, ...rest
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={warpStyle}><IconSet style={style} {...rest}>{children}</IconSet></View>
  </TouchableOpacity>
);

export {
  Button,
  TabBarItem,
  TabBarItemIOS,
  ToolbarAndroid,
  getImageSource,
  CustomButton,
};

CustomButton.propTypes = {
  children: PropTypes.any,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  warpStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

CustomButton.defaultProps = {
  onPress: () => {},
  children: null,
  style: null,
  warpStyle: null,
};
