// 各页面头部绿色栏
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './Header.scss';
import { CustomButton } from '../../../../components/Icon';

class Header extends Component {
  // 点击 < 回到上一页
  goBack = () => {
    const { goBackFun } = this.props;
    goBackFun();
  }

  render() {
    const { pageTitle } = this.props;
    return (
      <View style={styles.header_box}>
        <CustomButton name="jiantou-copy-copy" style={styles.buttonStyle} onPress={this.goBack} />
        <Text style={styles.titles}>{pageTitle}</Text>
        <Text />
      </View>
    );
  }
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  goBackFun: PropTypes.func.isRequired,
};

export default Header;
