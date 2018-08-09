import React from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import CIcon from '../Icon';

const TabBarIcon = (props) => {
  const {
    title,
    focused,
    selectedImage,
    image,
  } = props;

  const renderIcon = () => {
    const current = focused ? selectedImage : image;
    switch (typeof current) {
      case 'string':
        return <CIcon name={current} size={32} color="#fff" />;
      case 'number':
        return (
          <Image
            source={current}
            style={[{
              height: 40,
              width: 40,
            }]}
          />
        );
      case 'object':
        return image;
      default:
        return null;
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      {
        renderIcon()
      }
      <Text
        style={{
          color: focused ? '#ffffff' : '#000000',
          fontSize: 22,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

TabBarIcon.defaultProps = {
  selectedImage: undefined,
  image: undefined,
  focused: false,
};

TabBarIcon.propTypes = {
  title: PropTypes.string.isRequired,
  selectedImage: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
  ]),
  image: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
  ]),
  focused: PropTypes.bool,
};

export default TabBarIcon;
