import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
// import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default class Test3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0),
      // animation: 'shake',
    };
    this.total = 0;
  }

  componentDidMount() {
    this.shake();
  }

  onIndexChanged = (e) => {
    console.log(54, e);
    // if (e === 1) {
    //   this.setState({
    //     animation: 'shake',
    //   });
    // }
  }

  onPageScrollStateChanged = (e) => {
    console.log(e);
  }

  onAnimationEnd = (e) => {
    console.log(62, e);
    // this.setState({
    //   animation: null,
    // });
  }

  shake = () => {
    Animated.sequence([
      Animated.timing(this.state.anim, { toValue: 5, duration: 5 }),
      Animated.timing(this.state.anim, { toValue: -5, duration: 5 }),
      Animated.timing(this.state.anim, { toValue: 0, duration: 5 }),
    ]).start(
      () => {
        if (this.total < 40) {
          this.total += 1;
          this.shake();
        } else {
          this.total = 0;
        }
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          loop={false}
          showsPagination={false}
          // scrollEnabled={false}
          onIndexChanged={this.onIndexChanged}
          onPageScrollStateChanged={this.onPageScrollStateChanged}
        >
          <Animated.View
            // animation={this.state.animation}
            // onAnimationEnd={this.onAnimationEnd}
            style={[{ flex: 1 }, { left: this.state.anim }]}
          >
            <View style={styles.slide1}>
              <TouchableOpacity onPress={this.shake}>
                <Text style={styles.text}>Hello Swiper</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>

          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
        </Swiper>
      </View>
    );
  }
}
