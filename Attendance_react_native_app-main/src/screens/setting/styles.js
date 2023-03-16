import { StyleSheet } from 'react-native';
import { AppColors, AppMetrics } from '../../theme';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  imgBackground: { width: width, height: scale(250) },
  wrap: {
    width: (105),
    height: (105),
    borderRadius: (52),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: (64),
  },
  avatarImg: {
    borderRadius: (50),
  },
  name: {
    marginTop: (16),
    alignSelf: 'center',
  },
  wrapMenu: {
    flex: 1,
    marginHorizontal:AppMetrics.marginLeft,
    marginBottom:10
  },
  rowMenu: {
    flexDirection: 'row',
    padding: (16),
    marginBottom:15,
    backgroundColor:AppColors.white,
    elevation:5,
  },
  textMenu: {
    marginHorizontal: (8),
  },
});
