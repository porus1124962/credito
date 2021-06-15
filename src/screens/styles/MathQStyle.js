import React, {StyleSheet} from 'react-native'
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    subContainer: {
        flex: 1,
    },
    no: {
        fontWeight: "600",
        color: '#00f7d2'
    },
    question: {
        width: width,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    option: {
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap',
        flex: 1,
        color: '#fff'
    },
    row: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    wordBtn:{
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 6,
    },
    chk:{
        backgroundColor: '#00f7d2',
        borderWidth: 3,
        borderColor: '#fff',
    },
    btn: {
        marginBottom: 15,
        height: 45,
        borderColor: '#00f7d2',
        borderWidth: 2,
        borderRadius: 15
    }
});