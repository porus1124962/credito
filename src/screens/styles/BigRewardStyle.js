import React, {StyleSheet} from 'react-native'
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    heading:{
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        marginTop: 15,
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
        paddingBottom:-2
    },
    textGroup:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: width*0.8,
        alignSelf: 'center'
    },
    btn: {
        height: 45,
        borderColor: '#00f7d2',
        borderWidth: 2,
        borderRadius: 15,
        marginTop: 50,
        marginHorizontal: width*0.1
    }
});

export default styles;