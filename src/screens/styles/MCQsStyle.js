import React, {StyleSheet,Dimensions} from 'react-native'


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000'
    },
    buttonContainer: {
        height: 100,
        backgroundColor: '#313135',
        margin: 15,
        padding: 20,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#00f7d2'
    },
    buttonHeading: {
        fontSize: 25,
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#00f7d2'
    },
    no: {
        fontWeight: "600",
        color: '#00f7d2'
    },
    questionP: {
        width: fullWidth,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    question:{
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
    chk:{
        backgroundColor: '#00f7d2',
        borderWidth: 3,
        borderColor: '#fff',
    },
    btnRow:{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btn: {
        height: 45,
        borderColor: '#00f7d2',
        borderWidth: 2,
        borderRadius: 15
    }
});