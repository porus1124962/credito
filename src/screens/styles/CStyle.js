import React, {StyleSheet,Dimensions} from 'react-native'


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    loading: {
        width: fullWidth,
        height: fullHeight,
        position: 'absolute',
        zIndex: 5,
    }
});