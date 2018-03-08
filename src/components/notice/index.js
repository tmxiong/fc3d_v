//https://github.com/cheng-kang/react-native-lahk-marquee-label

import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Animated,
    TouchableOpacity
} from 'react-native';
import commonFun from '../../commons/utils/commonFun';
import {notice as notice_icon} from '../../commons/config/images'
export default class Notice extends PureComponent {
    constructor(props) {
        super();
        this.state = {
        };

        this.noticeHeight = commonFun.picHeight(43);
        this.toValue = this.noticeHeight;
        this.animatedTransformY = new Animated.Value(0);
        // this.noticeData = null;
    };

    static defaultProps = {
        noticeData: [
            '看到实用的攻略不要忘记收藏哦。',
            '研究购彩攻略与彩票玩法是明智之举。',
            '新增彩票历史订单查询，快去试试吧～',
        ],
    };

    componentDidMount() {
        this.startAnim();
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(props) {
        // if(this.noticeData == props.noticeData) return;
        // this.noticeData = props.noticeData;
        // if(props.noticeData.length > 1){
        //     this.startAnim()
        // }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.noticeData !== nextProps.noticeData;
    // }
    startAnim() {
        this.timer = setInterval(()=> {
            Animated.timing(this.animatedTransformY, {
                toValue: -this.toValue,
                isInteraction: false
            }).start(()=> {
                this.setValue();
                this.startAnim();
                clearInterval(this.timer);
            });
        }, 3000);
    }
    setValue() {
        const {noticeData} = this.props;
        if (this.toValue / this.noticeHeight < noticeData.length - 1) {
            this.animatedTransformY.setValue(-this.toValue);
            this.toValue = this.toValue + this.noticeHeight;
        } else {
            this.animatedTransformY.setValue(0);
            this.toValue = this.noticeHeight;
        }
    }

    renderText() {
        let {noticeData} = this.props;
        noticeData[noticeData.length] = noticeData[0];//首位呼应，避免出现空白
        let arr = [];
        for (let i = 0; i < noticeData.length; i++) {
            arr.push(
                <View key={i} style={styles.noticeTextContainer} >
                    <Text style={styles.noticeText} numberOfLines={1}>
                        {noticeData[i]}
                    </Text>
                </View>
            )
        }
        return arr;
    }
    showNoticeModal() {
        this.props.onChange(true);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.noticeIcon} source={notice_icon}/>
                <Animated.View
                    style={{
                        flexDirection: 'column',
                        alignSelf: 'flex-start',
                        transform: [{translateY: this.animatedTransformY}],
                        zIndex: 5
                    }}>
                    {this.renderText()}
                </Animated.View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: commonFun.picHeight(43),
        width: commonFun.deviceWidth(),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        overflow:'hidden',
        position:'absolute',
        top:commonFun.picHeight(322)
    },
    noticeIcon: {
        width: commonFun.picHeight(26),
        resizeMode:'contain',
        marginLeft: commonFun.picWidth(20),
        alignSelf:'center'
    },
    noticeTextContainer: {
        marginRight: 10,
        marginLeft: 10,
        width: commonFun.deviceWidth()-commonFun.picWidth(80),
        height: commonFun.picHeight(43),
        justifyContent:'center'
    },
    noticeText: {
        fontSize: 13,
        color:'#eee',
    },
    moreStyle: {
        backgroundColor:'#fff',
        height:20,
        position:'absolute',
        right:5,
        zIndex:99
    }
});

module.exports = Notice;
