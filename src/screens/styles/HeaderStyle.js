import React, {StyleSheet} from 'react-native'
import { Dimensions } from "react-native";

let {width,height} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        width: width,
        backgroundColor: '#00f7d2',
        elevation: 10,
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    row2: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    subLine: {
        color: '#000',
        fontWeight: '500',
        fontSize: 12
    },
    heading: {
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
        width: width*0.75,
        fontWeight: 'bold'
    },
    pProgresBar: {
        justifyContent: 'center',
        alignItems: 'center', 

    },
    progresBar: {
        height: 13,
        backgroundColor:'#8FED8F',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
});