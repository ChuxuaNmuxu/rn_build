import React from 'react';
import {
  View, Text, TouchableOpacity, FlatList,
} from 'react-native';
import Icon from '../../../../components/Icon';
import { ModalApi } from '../../../../components/Modal';
import styles from './modalContent.scss';

const ModalContent = () => {
  const keyExtractor = data => data.toString();

  const renderItem = (data) => {
    const { item } = data;
    return (
      <TouchableOpacity style={styles.modal_item}>
        <Text style={styles.modal_item_text}>{item}恭喜你在《12-22历史作业》PK中赢得胜利！</Text>
        <Icon name="icon" style={styles.modal_item_text} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.modal_wrap}>
      {/* <TouchableOpacity style={styles.close_btn}>
        <Icon name="x" style={styles.close_icon} />
      </TouchableOpacity> */}
      <Text style={styles.modal_title} onPress={ModalApi.onClose}>战绩播报</Text>
      <View style={styles.modal_wrap_list}>
        <FlatList
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          data={Array(2).fill().map((_, i) => i)}
        />
      </View>
      <View style={styles.modal_btn_wrap}>
        <TouchableOpacity style={styles.modal_btn}>
          <Text style={styles.modal_btn_text}>查看PK结果详情</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalContent;
