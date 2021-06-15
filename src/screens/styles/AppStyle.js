import React, {StyleSheet} from 'react-native'
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        padding: 10,
        backgroundColor: '#00C4A6'
    },
    Credito: {
        alignSelf: 'center',
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    FaceIcon: {
        textAlign: 'left',
        margin:10,
        color: 'white'
    },
    subChildContainer2: {
        flexDirection: 'row',
        margin:2,
        marginHorizontal: 5
    },
    subChildContainer1: {
        textAlign: 'left',
    }
});