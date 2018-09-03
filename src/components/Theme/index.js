import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../config/theme/theme';
import styles from './style';
import ThemeClass from '../../config/theme';
import { ChangeTheme } from '../../actions/config';

@connect()
export default class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.theme = new ThemeClass();
  }

  /**
   * 创建主题item
   */
  renderThemeItem = (item) => {
    const themeFlags = theme[item];
    const { dispatch } = this.props;
    return (
      <TouchableOpacity
        key={item}
        activeOpacity={0.3}
        onPress={
          () => {
            this.theme.saveTheme(themeFlags).then((res) => {
              dispatch(ChangeTheme(res));
            });
          }
        }
      >
        <View style={[styles.themeItem, { backgroundColor: themeFlags.brandPrimary }]}>
          <Text style={styles.themeText}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  /**
   * 创建主题列表
   */
  renderThemeList = () => (
    Object.keys(theme).map(item => this.renderThemeItem(item))
  )

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.themeList}>
            {this.renderThemeList()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

Theme.defaultProps = {
  dispatch: () => {},
};

Theme.propTypes = {
  dispatch: PropTypes.func,
};
