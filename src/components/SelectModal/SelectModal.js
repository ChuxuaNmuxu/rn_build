// 是否应用于多题的选择模态modal
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import I18nText from '../I18nText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 208,
    height: 48,
    backgroundColor: '#30bf6c',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
});


class SelectModal extends React.Component {
  static propTypes = {
    currentQuesFun: PropTypes.func.isRequired,
    multipleQuesFun: PropTypes.func.isRequired,
  }

  // 应用于本题
  currentQuesFun = () => {
    const { currentQuesFun } = this.props;
    currentQuesFun();
  }

  // 应用于多题
  multipleQuesFun = () => {
    const { multipleQuesFun } = this.props;
    multipleQuesFun();
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent
        visible
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.btn} onPress={this.currentQuesFun}>
            <I18nText style={{ fontSize: 16, color: '#fff' }}>SelectModal.usedInCurrent</I18nText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.multipleQuesFun}>
            <I18nText style={{ fontSize: 16, color: '#fff' }}>SelectModal.usedInMultiple</I18nText>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default SelectModal;
