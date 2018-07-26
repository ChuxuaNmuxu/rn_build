import {
  View,
  Button,
} from 'antd-mobile-rn';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

const Layout = ({
  navbarList,
}) => (
  <View style={styles.navbar}>
    {
        navbarList.map((item) => {
          const {
            text,
            onClick,
          } = item;
          return (
            <Button
              onClick={onClick}
              key={text}
              style={styles.btn}
            >
              {text}
            </Button>
          );
        })
      }
  </View>
);

Layout.propTypes = {
  navbarList: PropTypes.array.isRequired,
};

export default Layout;
