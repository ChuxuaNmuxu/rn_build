import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ChangeLanguage } from '../../actions/config';
import LanguageClass from '../../config/language';
import I18nText from '../I18nText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

@connect(null, dispatch => ({
  doChangeLanguage: bindActionCreators(ChangeLanguage, dispatch),
}))
export default class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.language = new LanguageClass();
  }

  render() {
    const { doChangeLanguage } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          this.language.setAndSaveLanguage('en')
            .then(doChangeLanguage);
        }}
        >
          <I18nText>changeToEnglish</I18nText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.language.setAndSaveLanguage('zh')
            .then(doChangeLanguage);
        }}
        >
          <I18nText>changeToChinese</I18nText>
        </TouchableOpacity>
      </View>
    );
  }
}

Language.defaultProps = {
  doChangeLanguage: () => {},
};

Language.propTypes = {
  doChangeLanguage: PropTypes.func,
};
