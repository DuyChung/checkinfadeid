import { StyleSheet } from "react-native";
import { AppColors, AppMetrics } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    marginHorizontal: AppMetrics.marginLeft,
    borderRadius: 10,
    elevation: 5,
    marginVertical: AppMetrics.marginLeft,
    paddingVertical: 20,
  },
  itemwrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: AppMetrics.marginLeft,
  },
  icon: {
    width: (40),
    height: (40),
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: AppMetrics.marginLeft,
  },
  dashlineWrap: {
    borderRadius: 0.1,
    borderWidth: 1.5,
    borderColor: AppColors.green,
    borderStyle: "dashed",
    height:1,
    marginVertical:(10)
  },
  dashline: { width: "101%", height: 2, backgroundColor: AppColors.white,alignSelf:'center' },
});
