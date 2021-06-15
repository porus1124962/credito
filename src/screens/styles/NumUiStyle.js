import React, {StyleSheet,Dimensions} from 'react-native'


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container:{
        alignItems: 'center',
        backgroundColor: '#000',
        flex:1
    },
    swipesGestureContainer:{
        
    },
    mainSquare:{
        borderWidth: 4,
        borderColor: '#666',
        backgroundColor: '#666',
    },
    sqRow:{
        width: fullWidth-8,
        flexWrap: 'wrap',
        display: "flex",
        flexDirection: 'row',
    },
    square: {
        width: (fullWidth*0.25)-2,
        height: fullWidth*0.25,
        borderWidth: 5,
        borderColor: '#666',
        borderRadius: 12
    },
    squareText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: fullWidth*0.23,
        color: '#fff'
    },
    scoreText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    msgBtnRow:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    msg:{
        color: '#fff',
        fontSize: 16,
        width: fullWidth*0.60,
        paddingHorizontal: 4,
        textAlign: 'center'
    },
    btnContainer: {
        width: fullWidth*0.35,
        height: 45,
        borderColor: '#00f7d2',
        borderWidth: 2,
        borderRadius: 15
    },
    CDefault:{
        backgroundColor: '#919191',
    },
    C2:{
        backgroundColor: 'orange',
    },
    C4:{
        backgroundColor: 'blue',
    },
    C8:{
        backgroundColor: 'orangered',
    },
    C16:{
        backgroundColor: 'green',
    },
    C32:{
        backgroundColor: 'hotpink',
    },
    C64:{
        backgroundColor: 'aqua',
    },
    C128:{
        backgroundColor: 'brown',
    },
    C256:{
        backgroundColor: 'red',
    },
    C512:{
        backgroundColor: 'purple',
    },
    C1024:{
        backgroundColor: '#0ed145',
    },
    C2048:{
        backgroundColor: '#88001b',
    },
});