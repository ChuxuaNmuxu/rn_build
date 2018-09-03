import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Picker from 'react-native-picker';
import area from './area.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ListItem = () => {
  const _createAreaData = () => {
    const data = [];
    const len = area.length;
    for (let i = 0; i < len; i++) {
      const city = [];
      for (let j = 0, cityLen = area[i].city.length; j < cityLen; j++) {
        const _city = {};
        _city[area[i].city[j].name] = area[i].city[j].area;
        city.push(_city);
      }

      const _data = {};
      _data[area[i].name] = city;
      data.push(_data);
    }
    return data;
  };

  const _showAreaPicker = () => {
    Picker.init({
      pickerData: _createAreaData(),
      selectedValue: ['河北', '唐山', '古冶区'],
      pickerTitleText: '选择时间',
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerBg: [255, 255, 255, 1],
      pickerToolBarBg: [255, 255, 255, 1],
      onPickerConfirm: (pickedValue) => {
        console.log('area', pickedValue);
      },
      onPickerCancel: (pickedValue) => {
        console.log('area', pickedValue);
      },
      onPickerSelect: (pickedValue) => {
        console.log('area', pickedValue);
      },
    });
    Picker.show();
  };

  return (
    <TouchableOpacity style={{ marginTop: 10, marginLeft: 20 }} onPress={_showAreaPicker}>
      <Text>AreaPicker</Text>
    </TouchableOpacity>
  );
};

export default class ArrangeHomework extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center', alignItems: 'center', height: 192, backgroundColor: '#30bf6c',
          }}
        >
          <Text style={{ fontSize: 48, color: '#fff' }}>6-22 物理作业</Text>
        </View>

        <FlatList
          data={[{ key: 'a' }, { key: 'b' }]}
          renderItem={({ item }) => <ListItem>{item.key}</ListItem>}
        />
      </View>
    );
  }
}
