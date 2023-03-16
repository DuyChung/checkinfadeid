import React from "react";
import { TouchableOpacity, ActivityIndicator, View } from "react-native";
import { styles } from "./styles";
import Text from "../Text";
import { AppColors, AppMetrics } from "../../theme";

export default function ButtonComponent({
  fontSize,
  bgColor,
  style,
  textColor,
  title,
  onPress,
  border = false,
  loading,
}) {
  if (border) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.container,
          {
            borderColor: textColor === "" ? "white" : textColor,
            borderWidth: (0.4),
          },
          style,
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: textColor === "" ? "white" : textColor,
            },
            fontSize && { fontSize: (fontSize) },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: AppColors.green },
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: textColor|| "white" },
          fontSize && { fontSize: (fontSize) },
        ]}
      >
        {title}
      </Text>
      {loading && (
        <View
          style={{ position: "absolute", width: "70%", alignItems: "flex-end" }}
        >
          <ActivityIndicator style={{ left: 20 }} size="small" />
        </View>
      )}
    </TouchableOpacity>
  );
}
