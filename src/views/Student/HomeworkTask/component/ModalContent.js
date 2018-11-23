import React from 'react';
import {
  View, Text, TouchableOpacity, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../../../components/Icon';
import { ModalApi } from '../../../../components/Modal';
import styles from './modalContent.scss';
import { mergeStyles } from '../../../../utils/common';

const ModalContent = ({
  contentData,
  changeCheckedId,
  checkedId,
  changeStatus,
  manualClose,
  openGuide,
}) => {
  const keyExtractor = data => data.classGameId;
  const ids = contentData.map(v => v.classGameId);

  const gotoDetails = (id, index) => {
    if (id) {
      Actions.HotReport({
        ids,
        index,
      });
      changeCheckedId(id);
    } else {
      Actions.HotReport({
        ids,
        index: 0,
      });
    }

    changeStatus(false);
    ModalApi.onClose();
  };

  const itemStyle = (_default, id) => {
    if (!id && checkedId) {
      return mergeStyles(styles[`${_default}`], styles[`${_default}_checked`]);
    }
    if (checkedId === id) {
      return mergeStyles(styles[`${_default}`], styles[`${_default}_checked`]);
    }
    return styles[`${_default}`];
  };

  const closeBtn = () => {
    manualClose({
      isManualCloseAchievementsBroadcast: true,
      ids: ids.toString(),
    });
    changeStatus(false);
    openGuide(true);
    ModalApi.onClose();
  };

  const renderItem = (data) => {
    const {
      item: {
        gameName,
        classGameId,
      },
      index,
    } = data;

    return (
      <TouchableOpacity
        style={itemStyle('modal_item', classGameId)}
        onPress={() => gotoDetails(classGameId, index)}
      >
        <Text style={itemStyle('modal_item_text', classGameId)}>恭喜你在《{gameName}》PK中赢得胜利！
        </Text>
        <Icon
          name="icon"
          style={itemStyle('modal_item_text', classGameId)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.modal_wrap}>
      <View style={styles.box}>
        <Text style={styles.modal_title} onPress={ModalApi.onClose}>战绩播报</Text>
        <View style={styles.modal_wrap_list}>
          <FlatList
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            data={contentData}
          />
        </View>
        <TouchableOpacity
          style={itemStyle('modal_btn')}
          onPress={() => gotoDetails()}
        >
          <Text style={itemStyle('modal_btn_text')}>查看PK结果详情</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.close_btn}
        onPress={closeBtn}
      >
        <Icon name="x" style={styles.close_icon} />
      </TouchableOpacity>
    </View>
  );
};

ModalContent.defaultProps = {
  contentData: [],
  changeCheckedId: () => {},
  checkedId: null,
  changeStatus: () => {},
  manualClose: () => {},
  openGuide: () => {},
};

ModalContent.propTypes = {
  contentData: PropTypes.array,
  changeCheckedId: PropTypes.func,
  checkedId: PropTypes.string,
  changeStatus: PropTypes.func,
  manualClose: PropTypes.func,
  openGuide: PropTypes.func,
};

export default ModalContent;
