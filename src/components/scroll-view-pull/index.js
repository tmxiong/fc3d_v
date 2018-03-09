import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated

} from 'react-native';
var Dimensions = require('Dimensions');

const {width,height} = Dimensions.get('window');

export default class scrollViewPull extends Component {

    static defaultProps = {
        pullHeaderWidth:width,
        pullHeaderHeight:500
    };

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        setTimeout(()=>{
            this._hidePullHeader()
        },1000)

    }

    _hidePullHeader(animated = true) {
        this._scrollTo(this.props.pullHeaderHeight,animated);
    }

    _onScroll(event) {

        this.offsetY = event.nativeEvent.contentOffset.y;

        //console.log(this.offsetY);

        this.offsetY < this.props.pullHeaderHeight && !this._isTouching ?
            this._hidePullHeader() : null;

    }

    _scrollTo(offset, animated = true) {
        this._scrollView.scrollTo({y: offset}, animated);
    }

    // 手指触碰屏幕
    _onTouchStart() {
        this._isTouching = true;

    }

    // 滚动以后，手指离开屏幕
    _onScrollEndDrag() {
        this._isTouching = false;

        this.offsetY < this.props.pullHeaderHeight ?
        this._hidePullHeader() : null;
    }

    // 手指离开屏幕（没有发生滚动）
    _onTouchEnd() {
        this._isTouching = false;

    }


    // 滚动动画开始
    _onMomentumScrollStart() {
        console.log('_onMomentumScrollStart')
    }

    // 滚动动画结束
    _onMomentumScrollEnd() {
        console.log('_onMomentumScrollEnd')
    }

    render() {
        const pullHeaderStyle = {
            width:this.props.pullHeaderWidth,
            height:this.props.pullHeaderHeight,
            backgroundColor:'#c99',
            //marginTop:-this.props.pullHeaderHeight
        };

        return (
            <Animated.View>
            <ScrollView
                ref={ref=>this._scrollView = ref}
                style={[styles.container]}
                onScroll={this._onScroll.bind(this)}
                onTouchStart={()=>this._onTouchStart()}
                onScrollEndDrag={()=>this._onScrollEndDrag()}
                onTouchEnd={()=>this._onTouchEnd()}
                onMomentumScrollStart={()=>this._onMomentumScrollStart()}
                onMomentumScrollEnd={()=>this._onMomentumScrollEnd()}
            >
                <View style={pullHeaderStyle}/>
                <TouchableOpacity onPress={this._scrollTo.bind(this,this.props.pullHeaderHeight)}>
                    <Text>scrollTo</Text>
                </TouchableOpacity>
                {this.props.children}
            </ScrollView>
            </Animated.View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width:width,
        height:height,
    },
});


//
// 'use strict';
//
// import React, { Component } from 'react';
// import {
//     ScrollView,
// } from 'react-native';
//
// import Pullable from './pullable';
//
// /**
//  支持android&ios可以下拉刷新的PullView组件
//  Demo:
//  import {PullView} from 'react-native-pullview';
//  <PullView onPulling={} onPullOk={} onPullRelease={} isPullEnd={true}
//  topIndicatorRender={({pulling, pullok, pullrelease}) => {}} topIndicatorHeight={60}
//  >
//  Demo2:
//  topIndicatorRender(pulling, pullok, pullrelease) {
//         return <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
//             <ActivityIndicator size="small" color="gray" />
//             {pulling ? <Text>下拉刷新2...</Text> : null}
//             {pullok ? <Text>松开刷新2......</Text> : null}
//             {pullrelease ? <Text>玩命刷新中2......</Text> : null}
//         </View>;
//     }
//  <PullView onPullRelease={this.props.onRefresh} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60} >
//  <Children />
//  </PullView>
//  Demo3:
//  onRefresh() {
//         this.setState({refreshing: true});
//         return new Promise((resolve) => {
//             setTimeout(() => {resolve()}, 9000);
//         }).then(() => {
//             this.setState({refreshing: false})
//         })
//         // setTimeout(() => {
//         //     this.setState({refreshing: false});
//         // }, 3000);
//     }
//  <PullView refreshControl={} onRefresh={this.onRefresh} refreshing={this.state.refreshing}>
//  <Children />
//  </PullView>
//  */
//
// export default class extends Component {
//
//     constructor(props) {
//         super(props);
//         this.scrollTo = this.scrollTo.bind(this);
//         this.scrollToEnd = this.scrollToEnd.bind(this);
//     }
//
//     scrollTo(...args) {
//         this.scroll.scrollTo(...args);
//     }
//
//     scrollToEnd(args) {
//         this.scroll.scrollTo(args);
//     }
//
//     getScrollable(refreshControl) {
//
//         return (
//             <ScrollView
//                 ref={(c) => {this.scroll = c;}}
//                 refreshControl={refreshControl}
//                 scrollEnabled={this.state.scrollEnabled}
//                 onScroll={this.onScroll}>
//                 {this.props.children}
//             </ScrollView>
//         );
//     }
//
// }