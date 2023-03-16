import React, { useState,Component } from "react";
import { ScrollView, Text, View, FlatList, Image, TouchableOpacity, } from "react-native";
import CheckBox from 'react-native-check-box'



export default class  checkbox extends Component {
  
  state = {
    isChecked:""
  }
  
  render() {
    return (
      <View>
        <CheckBox
    style={{flex: 1, padding: 10}}
    onClick={()=>{
      this.setState({
          isChecked:!this.state.isChecked
      })
    }}
    isChecked={this.state.isChecked}
    // rightText="t2"
/>
      </View>
    )
  }
}

