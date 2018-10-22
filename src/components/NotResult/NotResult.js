import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './NotResult.scss';
import problem from '../../public/img/problem.png';

const NotResult = (props) => {
  const { tips, imgStyle, url } = props;
  return (
    <View style={styles.finish_picture}>
      {/* 貌似这个imgStyle的样式覆盖不成功 */}
      <View style={[styles.finish_picture_child_view, imgStyle]}>
        <Image
          // style={{ width: '100%', height: '100%' }}
          source={url}
        />
        <Text style={styles.finish_picture_child_view_text}>{tips}</Text>
      </View>
    </View>
  );
};

NotResult.propTypes = {
  tips: PropTypes.string,
  imgStyle: PropTypes.object,
  url: PropTypes.any,
};

NotResult.defaultProps = {
  tips: '',
  imgStyle: {},
  url: problem,
};

export default NotResult;
