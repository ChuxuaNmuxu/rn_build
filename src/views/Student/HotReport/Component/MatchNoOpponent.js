// 未匹配到对手的展示页面
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
} from 'react-native';
import emptyViewImg from '../../../../public/img/emptyView.png';
import styles from './MatchNoOpponent.scss';

class MatchNoOpponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.matchNoOpponent_container}>
        <Image style={styles.imgs} source={emptyViewImg} width={364} />
        <Text style={styles.txt}>虽然在《{data.title}》中未帮能你找到到合适的对手，</Text>
        <Text style={styles.txt}>{`但是你已经战胜了${data.successResult * 100}%的人哦！`}</Text>
      </View>
    );
  }
}

MatchNoOpponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MatchNoOpponent;
