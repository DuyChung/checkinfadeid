import React from 'react';
import { Text } from 'react-native';
import { PropsText } from './type';

const defaultProps = {
  style: {},
  fontSize: undefined,
  bold: false,
  color: undefined,
};

const TextComponent: PropsText = props => {
  const { fontSize, bold, color, style, children } = props;

  let FONTSIZE: number = 14;
  if (fontSize) {
    FONTSIZE = fontSize;
  }

  return (
    <Text
      {...props}
      style={[
        {
          color: !color ? "white" : color,
        },
        bold && { fontWeight: 'bold' },
        style,
      ]}>
      {children}
    </Text>
  );
};

TextComponent.defaultProps = defaultProps;

export default TextComponent;
