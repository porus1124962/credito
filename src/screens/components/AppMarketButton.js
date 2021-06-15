import React, {Component} from "react";
import { 
    View,
    Text,
    Image,
    ScrollView
} from "react-native";
import {Button} from 'react-native-elements';
import styles from '../styles/AppMarketStyle';

class DownloadAppReward extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.btnContainer}>
                    <Image
                        style={{width: 105, height: 105,margin:10}}
                        source={{uri: this.props.imageUri}}
                    />
                    <View style={{flexDirection:'column',marginLeft:10,justifyContent:'center'}}>
                        <Text style={[{color: '#fff', fontWeight: 'bold'},{fontSize:this.props.titleSize}]}>{this.props.title}</Text>
                        <Text style={{color: '#00f7d2', fontWeight: 'bold', fontSize: 18}}>{this.props.corpName}</Text>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>{this.props.version}</Text>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>{this.props.appRate}</Text>
                    </View>
                    <View style={{flexDirection:'column',marginLeft:10,flexWrap:'wrap'}}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 14, marginVertical:10, marginHorizontal:5 }}>{this.props.detail}</Text>
                        <Button title="Download" buttonStyle={styles.buttonView} onPress={this.props.onPress}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default DownloadAppReward;