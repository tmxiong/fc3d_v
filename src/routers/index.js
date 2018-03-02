import {StackNavigator} from "react-navigation";
import onBackAndroid from '../commons/utils/onBackAndroid'
onBackAndroid.bindHardwareBackPress();

// import welcome from '../pages/welcome';
// import launch from '../pages/launch'
// import cp from '../pages/cp';

import main from '../pages/main'

const routers = StackNavigator({
    //launch: {screen: launch},
    // 欢迎页 引导页
    //welcome: {screen: welcome},
    main:{screen: main, navigationOptions: { header:null,}},
    // 彩票网站web页面
    //cp: {screen:cp},

});
module.exports = routers;