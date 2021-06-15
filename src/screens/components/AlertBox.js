import React, { Component } from "react";
import { 
    View,
    Text,
    Dimensions
} from "react-native";

import {Button} from 'react-native-elements';
import * as C from './Common';
import * as firebase from "react-native-firebase";

const {width,height} = Dimensions.get('window');

export class AmazeAlert extends Component {
    render() {
        return (
            <View style={{position: "absolute", width: width,height: height,backgroundColor: 'rgba(0,0,0,0.8)',zIndex: 1,top: height*0.11}}>
                <View style={{position: 'absolute',width: 250, height: 280,zIndex: 2,backgroundColor: 'rgba(52,52,52,0.95)', alignSelf: 'center',top: height*0.11, borderRadius: 15}}>
                    <Text style={{fontSize: 34,color: '#ffff00',fontWeight: 'bold',textAlign: 'center',marginTop: '5%'}}>Winner!</Text>
                    <Text style={{fontSize: 14,color: '#fff',fontWeight: 'bold',textAlign: 'center',marginTop: '-1%'}}>You Have Awarded</Text>
                    <Text style={{fontSize: 84,color: 'orangered',fontWeight: 'bold',textAlign: 'center',marginTop: '-7%'}}>{this.props.coins}</Text>
                    <Text style={{fontSize: 18,color: '#fff',fontWeight: 'bold',textAlign: 'center',marginTop: '-4%'}}>Coins</Text>
                    <Text style={{fontSize: 20,color: 'skyblue',fontWeight: 'bold',textAlign: 'center',marginTop: '4%'}}>New Level Unlocked!</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'space-between',marginTop: '3%'}}>
                        <Button title="Restart" onPress={this.props.onRestart} containerStyle={{width: 90, marginLeft: 18}} titleStyle={{fontSize: 12}} />
                        <Button title="Play Next" onPress={this.props.onNext} containerStyle={{width: 90, marginRight: 18}} titleStyle={{fontSize: 12}} />
                    </View>
                </View>
            </View>
        );
    }
}

export class CoinsAlert extends Component{
    constructor(props){
        super(props);
        this.state = {
            active: false,
            closeTime: 2500,
            btnPressCloseTime: 5000
        }
    }

    componentWillMount(){
        firebase.config().getValue("closeDialogTime").then(snap=>{
            const val = snap.val().toString();
            try{
                this.setState({closeTime: parseInt(val)});
            }catch(err){}
        }).catch(err=>{C.Toast("Connection Is Slow / Not Working!");});

        firebase.config().getValue("closeDialogTimeWithBtn").then(snap=>{
            const val = snap.val().toString();
            try{
                this.setState({btnPressCloseTime: parseInt(val)});
            }catch(err){}
        }).catch(err=>{C.Toast("Connection Is Slow / Not Working!");});
    }

    componentWillReceiveProps(props){
        if(global.active == true){
            this.setState({active: global.active});
            global.oldAlertTimer = setTimeout(()=>{
                this.setState({active: false});
                global.active = false;
            },this.state.closeTime);
        }
    }

    render(){
        return null;
        // if(this.state.active == true){
        //     return(
        //         <View style={{position: "absolute", width: width,height: height,backgroundColor: 'rgba(0,0,0,0.8)',zIndex: 1,top: height*0.11}}>
        //             <View style={{position: 'absolute',width: 250, height: 240,zIndex: 2,backgroundColor: 'rgba(52,52,52,0.95)', alignSelf: 'center',top: height*0.11, borderRadius: 15}}>
        //                 <Text style={{fontSize: 24,color: '#ffff00',fontWeight: 'bold',textAlign: 'center',marginTop:3}}>You Have Awarded</Text>
        //                 {/* <Text style={{fontSize: 14,color: '#fff',fontWeight: 'bold',textAlign: 'center',marginTop: 5}}>You Have Awarded</Text> */}
        //                 <Text style={{fontSize: 18,color: '#fff',fontWeight: 'bold',textAlign: 'center',marginTop: 8}}> Rewarded Coins</Text>
        //                 <Text style={{fontSize: 84,color: 'orangered',fontWeight: 'bold',textAlign: 'center',marginTop: 1}}>{this.props.coins}</Text>
        //                 <Button buttonStyle={{width:100,alignSelf:'center',borderRadius:10}} title = "Close" onPress = {()=>{
        //                     setTimeout(()=>{
        //                         this.setState({active: false});
        //                         global.active = false;
        //                         clearTimeout(global.oldAlertTimer);
        //                     },this.state.btnPressCloseTime);
        //                 }}/>
        //             </View>
        //         </View>
        //     );
        // }else{
        //     return null;
        // }
    }
}