import React, {StyleSheet} from 'react-native'
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    heading: {
        paddingBottom: 7
    },
    subContainer: {
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height:height,
    },
    box: {
        color:'#000',
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor:'#00f7d2',
        borderColor: "white",
        width:width*0.70,
        height:height*0.07,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    head: {
        fontSize: 20,
        color: '#00f7d2'
    },
    res: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#fff'
    },
    btn: {
        borderColor: '#00f7d2',
        borderWidth: 2,
        borderRadius: 15
    }
});