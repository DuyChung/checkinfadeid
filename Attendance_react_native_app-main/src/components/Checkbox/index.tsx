import React from 'react';
import { TouchableWithoutFeedback, View, Image } from 'react-native';
import { Checkbox } from './type';
import { styles } from './styles';
import Text from '../Text';

const checkbox_check = require('./icon/checkbox-check.png');
const checkbox_uncheck = require('./icon/checkbox-uncheck.png');
const radio_check = require('./icon/radio-check.png');
const radio_uncheck = require('./icon/radio-uncheck.png');

const defaultProps = {
  check: false,
  style: undefined,
  labelStyle: {},
  color: 'black',
  label: undefined,
  onPress: () => {},
};

const CheckComponent: Checkbox = props => {
  const {
    style,
    size = 20,
    type = 'checkbox',
    color,
    check,
    label,
    labelStyle,
    fontFamily,
    onPress,
  } = props;

  const font = () => {
    if (fontFamily) {
      return {
        fontFamily: fontFamily,
      };
    } else {
      return {};
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[ styles.container,style]}>
        <Image
          style={{
            width: (size),
            height: (size),
            tintColor: color,
          }}
          source={
            type === 'checkbox'
              ? check
                ? checkbox_check
                : checkbox_uncheck
              : check
              ? radio_check
              : radio_uncheck
          }
        />
        {label && (
          <Text
            style={[
              styles.text,
              { fontSize: (size - 5), color: color },
              labelStyle,
              font(),
            ]}>
            {label}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

CheckComponent.defaultProps = defaultProps;

export default CheckComponent;
