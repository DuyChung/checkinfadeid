import React from "react";
import { View, ActivityIndicator,StyleSheet} from "react-native";
import Modal from 'react-native-modal'

export default function LoadingModal ({isVisible}){
    return (
      <Modal isVisible={isVisible}>
        <View style={styles.container}>
           <ActivityIndicator
            size='large'
           />
        </View>
      </Modal>
    );
}
const styles = StyleSheet.create({
  constainer:{flex:1,justifyContent:'center'}
})