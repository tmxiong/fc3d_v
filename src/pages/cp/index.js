import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    WebView,
    FlatList,
    Platform,
    StatusBar,
    Linking,
    Alert,
    TouchableOpacity
} from 'react-native';
import cfn from '../../commons/utils/commonFun';
import Spinner from 'react-native-loading-spinner-overlay';
import fetchp from '../../commons/utils/fetch-polyfill';
import UpdateModal from '../../../component/updateModal'

export default class tipsDetailPage extends Component {

    static navigationOptions = {header: null};

    constructor(props) {
        super(props);

        this.isFirstLoad = true;
        this.url = this.props.navigation.state.params.url;
        this.isDownloadUrl = this.url.match(/\.apk/);
        this.isPressDownload = false;

        this.state = {
            isLoading: !this.isDownloadUrl,
            visible:false,
            url:'',
        };

        // https://apk-ing.zz-app.com/2.html  // 下载的
        // http://pc28.qq-app.com/apk-zd.html  // 浏览的

        // 下载地址：
        // "http://update.juw37xqo3x.com/apk/cp256.apk"
    }

    static defaultProps = {};

    componentDidMount() {
        if(this.isDownloadUrl) {
            let url = {};
            url.url = this.url;
            this.onNavigationStateChange(url);
        }
    }

    goBack() {
        this.props.navigation.goBack();
    }

    _onLoadStart() {
        if(this.isFirstLoad) {
            this.isFirstLoad = false;
            this.setState({isLoading:true});
        }

    }
    _onLoadEnd() {
        this.isFirstLoad = false;
        this.setState({isLoading:false});
    }

    onNavigationStateChange(event){
        let url = event.url;

        if(url.match(/\.apk/)){
            if(this.isPressDownload) return;
            this.isPressDownload = true;
            //console.log(url);
            this.setState({
                visible:true,
            },()=>this.updateStart(url));



            // Linking.openURL(url)
            //     .catch(err => Alert.alert( '错误提示：',
            //         '您似乎没有安装浏览器，请先安装浏览器再更新。',
            //         [
            //             {text: '确定', onPress: ()=> {}},
            //         ]));
        }
    }

    updateStart(url) {
        this.updateRef._updateStart(url);
    }

    updateEnd() {
        this.isPressDownload = false;
        this.setState({
            visible:false,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<View style={styles.statusBar}/>*/}


                <Spinner visible={this.state.isLoading}
                         textContent={"正在加载..."}
                         overlayColor="rgba(0,0,0,0.2)"
                         color="rgb(217,29,54)"
                         textStyle={{color: '#000',fontSize:15}} />


                {this.isDownloadUrl ?
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                        let url = {};
                        url.url = this.url;
                        this.onNavigationStateChange(url);
                    }}>
                        <Image style={styles.img} source={require('../../../imgs/update/update_bg.png')}/>
                        <View style={{position:'absolute',width:cfn.picWidth(250),borderRadius:10,alignSelf:'center',
                            height:cfn.picHeight(100),backgroundColor:'rgba(0,0,255,0.5)',alignItems:'center',
                            justifyContent:'center',bottom:cfn.deviceHeight()/3}}>
                            <Text style={{fontSize:20,color:'#fff'}}>点击下载</Text>
                        </View>

                    </TouchableOpacity>
                     :
                    <WebView
                    style={styles.webView}
                    source={{uri:this.url}}
                    //source={{uri:'https://apk-ing.zz-app.com/2.html'}}
                    onLoadStart={()=>this._onLoadStart()}
                    onLoadEnd={()=>this._onLoadEnd()}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}//在WebView中注册该回调方法
                    scalesPageToFit={false}
                />}
                <UpdateModal
                    ref={(ref)=>this.updateRef = ref}
                    modalVisible={this.state.visible}
                    updateEnd={this.updateEnd.bind(this)}
                />
                <StatusBar translucent= {false} backgroundColor={'#000'} barStyle={'light-content'}/>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    img: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'stretch'
    },
    webView: {
        flex:1,
        height:cfn.deviceHeight(),
        width:cfn.deviceWidth(),
    },
    statusBar: {
        height:cfn.picHeight(50),
        backgroundColor:'#D74235',
        width:cfn.deviceWidth()
    },
    isLoading: {
        position:'absolute',
        top:cfn.deviceHeight()/2,
        zIndex:5
    },
});