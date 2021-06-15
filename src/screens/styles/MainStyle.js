import React, {StyleSheet} from 'react-native'
import { Dimensions } from "react-native";

let {width, height} = Dimensions.get('window');

export default StyleSheet.create({
    animatedView: {
        width,
        backgroundColor: "#0a5386",
        elevation: 2,
        position: "absolute",
        bottom: 0,
        // top: height*0.8,
        // top: 0,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    exitTitleText: {
        textAlign: "center",
        color: "#ffffff",
        marginRight: 10,
    },
    exitText: {
        color: "#e5933a",
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    container: {
        justifyContent: 'space-evenly',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        width: width*0.42,
        height: width*0.42,
        marginTop: width*0.04,
        alignItems: 'center',
        // backgroundColor :'#ccc',
        backgroundColor :'#313135',
        borderWidth: 2.5,
        // borderColor: "#000"
        borderColor: 'lightgreen'
    },
    subContainer:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    mainContainer:{
        backgroundColor: '#000',
        flex:1
    },
    adAlertContainer:{
        width: width,
        height: height,
        backgroundColor: 'rgba(0,255,255,0.4)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1
    },
    adAlertSubContainer:{
        width: width*0.80,
        height: 120,
        backgroundColor: '#000',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    adDialogMsg:{
        color: '#fff',
        fontSize: 22
    },
    adDialogBtn:{
        marginTop: 15,
        width: width*0.55,
        height: 45,
        borderColor: '#00f7d2',
        borderWidth: 2,
        borderRadius: 15
    },
    dialogClose:{
        borderRadius: 5,
        backgroundColor: '#00f7d2',
        zIndex: 2,
        height: 28,
        marginTop: -36,
        marginLeft: width*0.67
    }
});