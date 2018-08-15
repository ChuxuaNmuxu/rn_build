import React from 'react';
import {
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../config/language/I18n';

const I18nText = ({ children }) => (
  <Text>{I18n.t(children)}</Text>
);

export default connect(() => ({
  language: I18n.locale,
}))(I18nText);
