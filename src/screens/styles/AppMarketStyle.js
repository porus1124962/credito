import React, {StyleSheet} from 'react-native'
import { Dimensions } from "react-native";

let {width, height} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',    
    },
    btnContainer: {
        backgroundColor: '#313135',
        borderRadius: 5,
        flexDirection: 'row',
        flexWrap:'wrap',
        borderStartWidth: 3,
        borderEndWidth: 3,
        marginVertical:10,
        marginHorizontal:5,
        padding:10,
        borderColor: '#00f7d2',
    },
    buttonView:{
        width: 110,
        backgroundColor: '#313135',
        alignSelf:'flex-end',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#00f7d2'
    }
});