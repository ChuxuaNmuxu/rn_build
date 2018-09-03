import React from 'react';
import {
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../../config/language/I18n';

const I18nText = ({ children, style, option }) => (
  <Text style={style}>{I18n.t(children, option)}</Text>
);

I18nText.defaultProps = {
  style: {},
  option: {},
};

I18nText.propTypes = {
  style: PropTypes.object,
  children: PropTypes.string.isRequired,
  option: PropTypes.object,
};

export default connect(() => ({
  language: I18n.locale,
}))(I18nText);
