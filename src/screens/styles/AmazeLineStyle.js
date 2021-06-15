import React, {StyleSheet} from 'react-native'
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#000'
    },
    buttonContainer: {
        height: 70,
        backgroundColor: '#313135',
        marginHorizontal: 15,
        marginVertical: 8,
        padding: 20,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonHeading: {
        fontSize: 25,
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#00f7d2'
    },
    paddingBottom: {
        paddingBottom: 10,
    }
});