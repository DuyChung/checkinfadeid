import React from "react";
import { View, Text,StyleSheet} from "react-native";
import Modal from 'react-native-modal'
import {AppMetrics,AppColors} from '../../theme'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Button} from '../../components'

export default function ModalComponent ({style,loading,isVisible,title,titleStyle,renderBody,onClose,leftButton,rightButton,onLeft,onRight,showButton}){
   
    return (
      <Modal isVisible={isVisible}>
        <View  style={style?? styles.container}>
          <Icon onPress={onClose} name='times' size={30} style={styles.close}/>
          {title &&
            <Text style={[styles.title,titleStyle]}>{title}</Text>
          }
          <View style={{flex:1}}>
            {renderBody&&renderBody()}
          </View>
         {
           showButton==false?null: <View style={styles.renderbutton}>
           <Button
             onPress={onLeft}
             style={[styles.button,{marginRight:10}]}
             title={leftButton??'Huỷ'}
           />
            <Button
               onPress={onRight}
               style={styles.button}
               title={rightButton??'Đồng ý'}
               loading={loading}
           />
         </View>
         } 
         
        </View>
      </Modal>
    );
}
const styles = StyleSheet.create({
  container:{
    height:AppMetrics.screenHeight*0.8,
    backgroundColor:AppColors.white,
  },
  close:{
    alignSelf:'flex-end',
    padding:10
  },
  title:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold'
  },
  renderbutton:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:AppMetrics.marginLeft,
    marginBottom:15,
  },
  button:{
    flex:1
  }
})