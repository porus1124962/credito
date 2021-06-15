import React, {StyleSheet} from 'react-native'
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    ad: {
        alignSelf: 'center'
    },
    subContainer: {
        width: width,
        flex: 1,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    heading: {
        fontSize: 25,
        marginTop: 5,
        textAlign: 'center',
        width: 250,
        // marginLeft: '20%',
        color: '#fff',
        borderBottomWidth: 5,
        borderBottomColor: '#00f7d2',
    },
    textBox: {
        color:'#000',
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 6,
        borderWidth: 3,
        borderRadius: 6,
        backgroundColor:'#fff',
        borderColor: "#00f7d2",
        fontSize:50,
        width:width*0.12,
        height:height*0.10,
        alignItems: 'center',
        marginTop: 30,
        textAlign: 'center', 
        lineHeight: height*0.10,
    },
    inputBox: {
        paddingBottom:-2
    },
    wordBtn:{
        width: width,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 6,
    },
    btn: {
        height: 45,
        borderColor: '#00f7d2',
        borderWidth: 2,
        borderRadius: 15
    }
});