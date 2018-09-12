// 扩展列表视图组件，非Modal
import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './ExtendListView.scss';

class ExtendListView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  _preventDefault=(e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const {
      setVisibleFun, setTop, children,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          setVisibleFun(false);
        }}
        style={[styles.TouchableOpacity, { top: setTop || 0 }]}
        activeOpacity={1}
      >
        <TouchableOpacity style={[styles.content]} onPress={this._preventDefault} activeOpacity={1}>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

ExtendListView.propTypes = {
  setVisibleFun: PropTypes.func.isRequired,
  setTop: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
};

export default ExtendListView;
