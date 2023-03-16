import { StyleSheet } from 'react-native';
import { AppColors, AppMetrics } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    marginBottom: 12,
    backgroundColor:AppColors.white
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  resultsScreenBackButton: {
    position: "absolute",
    bottom: 0,
    right: 20,
  },
  icon:{
    width:50,
    height:50,
    marginHorizontal:AppMetrics.marginLeft
    },
    button:{
      marginHorizontal:AppMetrics.marginLeft
    }
});
