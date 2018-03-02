/**
 * Created by xiongtm on 2017/9/6.
 * https://github.com/connected-lab/react-native-xml2js
 */
import {Platform} from 'react-native'
var appid = {
    sg: 26856560,
    xm: 26856561,
    tx: 26856562,
    bd: 26856563,
    pp: 26856564,
    iOS: 1300453217,

};
module.exports = {

    appName: '福彩3D',
    baseColor:'#d81e06',
    myCheck: 'http://aite.ngrok.cc',
    launchImg:require('../imgs/launch/launch.png'),
    welcomeImg:[
        require('../imgs/welcome/welcome_1.png'),
        require('../imgs/welcome/welcome_2.png'),
        require('../imgs/welcome/welcome_3.png'),
    ],
    jumpUrl: Platform.OS == 'ios' ?
        'https://appid-ioss.xx-app.com/frontApi/getAboutUs?appid='+appid.iOS :
        'https://appid-apkk.xx-app.com/frontApi/getAboutUs?appid='+appid.sg,
};
