import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Countdown } from 'react-native-element-timer';
import { Button } from 'components';


export interface Props {
  name: string;
}

const CountdownScreen: React.FC<Props> = _props => {
  const countdownRef: any = useRef(null);

  return (
    <View style={styles.container}>
      <Countdown
        ref={countdownRef}
        style={styles.timer}
        textStyle={styles.timerText}
        seconds={5}
        onTimes={() => {}}
        onEnd={() => {}}
      />
      <Button
        style={styles.button}
        title={'Start'}
        border
        onPress={() => {
          countdownRef.current.start();
        }}
      />
      <Button
        style={styles.button}
        title={'Pause'}
        border
        onPress={() => {
          countdownRef.current.pause();
        }}
      />
      <Button
        style={styles.button}
        title={'Resume'}
        border
        onPress={() => {
          countdownRef.current.resume();
        }}
      />
      <Button
        style={styles.button}
        title={'Stop'}
        border
        onPress={() => {
          countdownRef.current.stop();
        }}
      />
    </View>
  );
};

export default CountdownScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: (20),
  },
  timer: {
    marginVertical: (20),
  },
  timerText: {
    fontSize: (22),
  },
  button: {
    marginVertical: (5),
    backgroundColor: 'white',
    borderRadius: (24),
    width: (100),
  },
});
