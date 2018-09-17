import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './Title.scss';

const Title = ({ waitReadOver, title }) => {
  const temTitle = waitReadOver ? `${title}-批阅` : title;
  return (
    <View style={styles.title_wrap}>
      <View style={styles.title_icon}>
        <TouchableOpacity onPress={Actions.Student}>
          <Entypo name="chevron-thin-left" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{temTitle}</Text>
    </View>
  );
};
Title.propTypes = {
  // 标题
  title: PropTypes.string.isRequired,
  // 是否待批阅(默认false，如果是true 则是待批阅)
  waitReadOver: PropTypes.bool.isRequired,
};

export default Title;
