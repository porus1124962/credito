import React, {StyleSheet,Dimensions} from 'react-native';

// const {width,height} = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000'
    },
    buttonContainer: {
        height: 50,
        backgroundColor: '#313135',
        margin: 15,
        marginTop: 25,
        marginBottom: 3,
        padding: 20,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#00f7d2'
    },
    cRs:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 8,
    },
    opContainer:{
        borderWidth: 2,
        borderColor: '#fff',
        paddingVertical: 8,
        margin: 10,
        borderRadius: 8
    },
    operatorText: {
        color : '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 2
    },
    operatorHint:{
        color : '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12.5,
        marginTop: 5
    },
    chk:{
        backgroundColor: '#00f7d2',
        borderWidth: 3,
        borderColor: '#fff',
    },
    chkP:{
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    input:{
        alignSelf: 'center',
        fontSize: 18,
        color: '#00f7d2',
        borderBottomWidth: 2,
        borderColor: '#fff',
        textAlign: 'center'
    }
});