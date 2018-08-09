// custom icon
import { createIconSet } from 'react-native-vector-icons';
import glyphMap from '../../public/icon/iconfont';

const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default iconSet;

const {
  Button,
  TabBarItem,
  TabBarItemIOS,
  ToolbarAndroid,
  getImageSource,
} = iconSet;

export {
  Button,
  TabBarItem,
  TabBarItemIOS,
  ToolbarAndroid,
  getImageSource,
};
