import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './selectListButton.scss';

class SelectListButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectItems: props.selected || [],
    };
  }

  getButtonList=() => {
    const { data, objKey } = this.props;
    const { selectItems } = this.state;
    // console.log(this.getSlectIetms);
    return (
      <React.Fragment>
        {
          data.map(
            (item, index) => {
              const { id, text } = item;
              const selected = selectItems.includes(id);
              return (
                <TouchableOpacity
                  onPress={() => this.getSlectIetms(id, objKey)}
                  style={[styles.TouchableOpacity, selected ? styles.active : {}]}
                  activeOpacity={0.6}
                  key={`${index + text}`}
                >
                  <Text style={[styles.btnText, selected ? styles.textAc : {}]}>{text}</Text>
                </TouchableOpacity>
              );
            },
          )
        }
      </React.Fragment>
    );
  }

  getSlectIetms=(id, objKey) => {
    const { getItems, selectType } = this.props;
    console.log(selectType);
    const { selectItems } = this.state;
    let SET = new Set(selectItems);
    if (selectType !== 'single') {
    // 找到的话就剔除
      if (SET.has(id)) {
        SET.delete(id);
      } else {
      // 没找到就添加
        SET.add(id);
      }
    } else if (SET.has(id)) {
      SET.delete(id);
    } else {
      SET = new Set([id]);
    }

    this.setState(
      {
        selectItems: [...SET],
      },
      () => getItems([...SET], objKey),
    );
  }

  render() {
    const { title, selectType } = this.props;
    return (
      <View style={styles.selectListButton}>
        <View style={styles.header}>
          <Text style={[styles.text, styles.textMargin]}>{title}</Text>
          <Text style={styles.text}>{`(${selectType === 'single' ? '单选' : '多选'})`}</Text>
        </View>
        <View style={styles.body}>
          {
            this.getButtonList()
          }
        </View>
      </View>
    );
  }
}

SelectListButton.propTypes = {
  data: PropTypes.array.isRequired,
  selectType: PropTypes.string.isRequired,
  getItems: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  objKey: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
};
export default SelectListButton;
