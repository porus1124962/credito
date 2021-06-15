import React, {StyleSheet,Dimensions} from 'react-native'


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    bgImg:{
        height:fullHeight,
        width:fullWidth,
        position:'absolute',
        zIndex:-1,
    },
    panalLog:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    headingLog:{
        textAlign:'center',
        // color:'#62ef64',
        color:'#000',
        fontSize:37,
        fontWeight:'700'
    },
    paraLog:{
        fontSize:13,
        textAlign:'center',
        fontWeight:'200',
        color:'#000',
        paddingLeft:10,
        paddingRight:10,
        marginBottom:20,
        marginTop:10,
    },
    input:{
        width: fullWidth-50,
        // borderColor: '#adadad',
        borderColor: '#fff',
        borderWidth: 3,
        fontWeight: 'bold',
        borderRadius:50,
        height:46,
        textAlign:'center',
        marginBottom:15,
        color: '#000'
    },
    btnBg:{
        width: fullWidth-50,
        // borderColor: '#1dd368',
        borderWidth: 0,
        borderRadius:50,
        height:46,
        backgroundColor:'rgba(0,0,0,0.8)'
    },
    btnText:{
        color: 'white',
        fontWeight: 'bold'
    },
    reg:{
        fontSize:16,
        textDecorationLine:'underline',
        textDecorationColor:'red',
        flex:1,
        color:'blue',
        fontWeight: 'bold'
    },
    regParent:{
        alignSelf: 'flex-end',
        marginTop:10,
        marginRight: 35,
        height: 25,
    },
    iconRowHeading:{
        marginTop: 25,
        color: '#000',
    },
    iconRow:{
        flexDirection: 'row',
        marginTop: 10,
    },
    icon:{
        marginHorizontal: 14,
        height: 50,
    },
    note:{
        color: '#000',
        fontSize: 14,
        marginTop: 4,
        textDecorationLine: 'underline'
    },
});