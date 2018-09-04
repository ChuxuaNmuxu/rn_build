// 下拉刷新组件
import React, { PureComponent } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

class RefreshView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View>
        <Text>
          这是内容
        </Text>
      </View>
    );
  }
}

RefreshView.propTypes = {
  dispatch: PropTypes.func,
};

export default RefreshView;
