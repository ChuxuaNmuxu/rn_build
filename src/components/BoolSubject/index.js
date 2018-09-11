import React from 'react';
import CIcon from '../Icon';
import Radio from '../Radio';
import styles from './style.scss';

const BoolSubjuct = (props) => {
  const correctIcon = () => <CIcon name="dui" style={styles.icon} />;
  const errorIcon = () => <CIcon name="x" style={styles.icon} />;
  return (
    <Radio.Group
      {...props}
      value={1}
      checkedIconWrapStyle={styles.checked_icon_wrap_style}
      iconWrapStyle={styles.icon_wrap_style}
      checkedTextStyle={styles.checked_text_style}
    >
      <Radio.Button value={1}>{correctIcon()}</Radio.Button>
      <Radio.Button value={2}>{errorIcon()}</Radio.Button>
    </Radio.Group>
  );
};

export default BoolSubjuct;
