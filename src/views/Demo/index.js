import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
// import Theme from '../../components/Theme';
import Language from '../../components/Language';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        {/* <Theme /> */}
        <Language />
      </ScrollView>
    );
  }
}
