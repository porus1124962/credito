import React, {StyleSheet,Dimensions} from 'react-native'


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#000'
    },
    squareParent: {
        flexWrap: 'wrap',
        display: "flex",
        flexDirection: 'row',
        marginHorizontal: fullWidth*0.125,
        marginTop: 5
    },
    square: {
        width: fullWidth*0.25,
        height: fullWidth*0.25,
        borderWidth: 5,
        borderColor: '#fff',
    },
    squareText: {
        fontSize: 80,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: fullWidth*0.23,
        color: '#00f7d2'
    },
    btnContainer: {
        width: fullWidth*0.75,
        height: 45,
        marginTop: 20,
        borderColor: '#00f7d2',
        borderWidth: 2,
        borderRadius: 15
    },
    topText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 5,
        borderBottomWidth: 5,
        borderBottomColor: '#00f7d2',
    },
});