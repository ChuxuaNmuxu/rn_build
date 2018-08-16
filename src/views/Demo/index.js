import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
// import Theme from '../../components/Theme';
import Language from '../../components/Language';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={Actions.TabsStack}
        >
          <Text>跳回首页</Text>
        </TouchableOpacity>
        {/* <Theme /> */}
        <Language />
      </View>
    );
  }
}
