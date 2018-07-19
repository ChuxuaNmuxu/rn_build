import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  connect,
} from 'react-redux';
import {
  bindActionCreators,
} from 'redux';
import PropTypes from 'prop-types';
import {
  test,
} from '../../actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

@connect(
  state => state,
  dispatch => ({
    doTest: bindActionCreators(test, dispatch),
  }),
)
class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clearToken = () => {
    console.log('清除');
    storage.remove({
      key: 'token',
    }).then((ret) => {
      console.log(ret);
    }).catch(err => console.log(err));
  }

  render() {
    const {
      doTest,
      test: a,
    } = this.props;
    doTest();
    console.log(44, a);
    return (
      <View style={styles.container}>
        <Text>
          采集科技
        </Text>
        <Button
          title="获取this.props"
          onPress={() => console.log(45, this)}
        />
        <Button title="go to Login" onPress={() => Actions.account()} />
        <Button title="go to wrongNotes" onPress={() => Actions.wrongNotes()} />
        <Button
          onPress={this.clearToken}
          type="primary"
          title="清除token"
        />
      </View>
    );
  }
}

Logo.propTypes = {
  doTest: PropTypes.func,
  test: PropTypes.any,
};

Logo.defaultProps = {
  doTest: () => {},
  test: '',
};

export default Logo;
