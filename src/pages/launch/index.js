/**
 * Created by xiongtm on 2017/9/13.
 */
/**
 * Created by xiongtm on 2017/9/7.
 */



//  {"appid":"99025601","appname":"990895247","isshowwap":"1","wapurl":"https://www.256.com/","status":1,"desc":"\u6210\u529f\u8fd4\u56de\u6570\u636e"}
// 1 显示
// 2 不显示
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    StatusBar,
    Platform,
    ActivityIndicator

} from 'react-native';

import JPushModule from 'jpush-react-native';


import {NavigationActions} from 'react-navigation'
import cfn from '../src/commons/utils/commonFun'
import Storage from 'react-native-storage';
import Global from '../global/global';
import fetchp from '../src/commons/utils/fetch-polyfill';
import config from '../config/config';
import base64 from '../src/commons/utils/base64';
import SplashScreen from 'react-native-splash-screen';

export default class loadingModal extends Component {
    static navigationOptions = {header: null};

    static defaultProps={

    };

    constructor(props) {
        super(props);
        // 是否显示欢迎页；
        this.showWelcome = true;
    }

    componentDidMount() {

        this.initPage();

        this.initStorage();

        this.getLocalData();

    }

    initPage() {
        if(Platform.OS == 'ios') {
            JPushModule.setBadge(0, (badgeNumber) => {
                // console.log(badgeNumber);
            });
        } else {
            setTimeout(()=>{
                SplashScreen.hide();//关闭启动屏幕
            },1000);
        }
    }

    // 判断是否显示欢迎页
    getLocalData() {
        this.startTime = new Date().getTime();
        Global.storage.getAllDataForKey('welcome')
            .then((data)=>this.setLocalData(data))
            .catch((error)=>this.setError(error))
    }

    setLocalData(data) {
        this.showWelcome = data.length == 0;

        // 检查页面跳转到哪；
        this.getUrlData();
    }

    getUrlData() {
        fetchp(config.jumpUrl,{timeout:5*1000})
            .then((res)=>res.json())
            .then((data)=> this.setUrlData(data))
            .catch((error)=>this.setError(error));
    }

    setUrlData(jsonData) {

        if(jsonData.isshowwap == '1') {
            // 要显示webView
            this.goToPage('CPWebView',{url:jsonData.wapurl});
        }else {
            // 不显示webView
            if(this.showWelcome) {
                this.goToPage('Welcome')
            } else {
                this.goToPage('Main')
            }
        }
    }

    setError(err) {
        this.goToPage('Main')
    }

    goToPage(route,params) {
        this.endTime = new Date().getTime();
        let subTime = this.endTime - this.startTime;
        setTimeout(()=>{
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: route, params: params})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        },subTime < 2000 ? 2000 - subTime : 0)
    }

    initStorage() {
        Global.storage = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,

            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,

            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: null,

            // 读写时在内存中缓存数据。默认启用。
            enableCache: true,

            // 如果storage中没有相应数据，或数据已过期，
            // 则会调用相应的sync方法，无缝返回最新数据。
            // sync方法的具体说明会在后文提到
            // 你可以在构造函数这里就写好sync的方法
            // 或是写到另一个文件里，这里require引入
            // 或是在任何时候，直接对storage.sync进行赋值修改
            sync: require('../global/sync')  // 这个sync文件是要你自己写的
        })
    }


    render() {

        return (
            <View style={{flex:1}}>
                <StatusBar translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
                <Image style={styles.img} source={config.launchImg}/>
                <View style={styles.indicator}>
                    <ActivityIndicator
                        animating={true}
                        color="#eee"
                        size="large"
                    />
                    <Text style={{color:'#ddd',marginTop:20}}>正在加载数据...</Text>
                </View>

            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent:'center'
    },
    img: {
        width:cfn.deviceWidth(),
        height:cfn.deviceHeight(),
        resizeMode:'cover'
    },
    indicator: {
        height: cfn.picHeight(100),
        width:cfn.deviceWidth(),
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        bottom:cfn.deviceWidth()/2
    }
});