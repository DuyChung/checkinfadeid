import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: (20),
  },
  button: {
    marginVertical: (5),
  },
  btnCircle: {
    width: (60),
    height: (60),
    borderRadius: (35),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    padding: (10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: (30),
  },
  imgCircle: {
    width: (30),
    height: (30),
    tintColor: 'gray',
  },
  img: {
    width: (30),
    height: (30),
  },
});
