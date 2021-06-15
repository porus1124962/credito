import React, { Component } from "react";
import { 
    View,
    ActivityIndicator
} from "react-native";

export default class Loading extends Component {
    render() {
        if(this.props.loading == false){
            return null;
        }
        return(
            <View style={{position: 'absolute', backgroundColor: "rgba(52, 52, 52, 0.7)", zIndex: 2, top: 50,left: 0,right: 0,bottom: 0,display: 'flex',justifyContent: 'center'}}>
                <ActivityIndicator size={110} color="#00ff" style={{marginTop: -50}}/>
            </View>
        )
    }
}