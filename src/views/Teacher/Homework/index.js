import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CreateHomework from '../CreateHomework';
import HomeworkList from '../HomeworkList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class Homework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {/* <Text>作业 tab</Text> */}
          <CreateHomework />
          <HomeworkList />
        </View>
        <Button title="go to login" onPress={() => Actions.account()} />
      </View>
    );
  }
}
