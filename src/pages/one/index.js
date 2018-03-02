import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import splashScreen from 'react-native-splash-screen'
export default class index extends Component {

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        splashScreen.hide();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>one</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});