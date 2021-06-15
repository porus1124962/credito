import React, {StyleSheet,Dimensions} from 'react-native'


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    buttonContainer: {
        height: 150,
        backgroundColor: '#313135',
        margin: 15,
        padding: 20,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        borderColor: '#00f7d2',
        borderWidth: 8
    },
    buttonHeading: {
        fontSize: 25,
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#00f7d2'
    },
    paddingBottom: {
        paddingBottom: 70
    }
});