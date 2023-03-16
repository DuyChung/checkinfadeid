import { StyleSheet } from "react-native";
import { AppColors, AppMetrics } from "../../theme";

export const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    marginHorizontal: AppMetrics.marginLeft,
    justifyContent: "space-between",
    backgroundColor: AppColors.white,
    paddingVertical: (10),
    marginBottom: (10),
    paddingHorizontal: AppMetrics.marginLeft,
    borderRadius: (10),
  },
  button: {
    width: AppMetrics.screenWidth / 2 - 20,
  },
  taoca: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
  },
  viewtextinput: {
    marginLeft: AppMetrics.marginLeft,
    marginRight: AppMetrics.marginRight,
  },
  text: {
    fontSize: 16,
  },
  textinput: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  viewtime: {
    marginLeft: AppMetrics.marginLeft,
    marginRight: AppMetrics.marginRight,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  phanca: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
  },
  viewcheck: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  phanca: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: AppColors.white,
    paddingVertical: AppMetrics.marginLeft,
    borderRadius: 10,
  },
  timepicker:{
    flexDirection:'row',
    borderWidth:1
  }
});
