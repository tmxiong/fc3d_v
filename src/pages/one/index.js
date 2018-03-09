import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { fetchStart, fetchSuccess, fetchFailure } from '../../app/actions';
import AV from 'leancloud-storage';
import urls from '../../commons/config/urls';
import config from '../../commons/config/config';
import {Loading, EasyLoading} from 'react-native-easy-loading'
import Banner from '../../components/banner'
import Notice from '../../components/notice'
import {banner as banner_img} from '../../commons/config/images'
import ScrollViewPull from '../../components/scroll-view-pull'
class Home extends Component {



    componentDidMount() {
        //this.getData();
        //this.testLeancloud();
        EasyLoading.show('正在加载...',3000)
    }

    async testLeancloud() {
        AV.init(config.app_id, config.app_key);
        let user = new AV.User();
        user.setUsername('username2');
        user.setPassword('password');
        const result = await user.logIn();
        console.log(result);
    }

    getData() {
        const {dispatch} = this.props;
        dispatch(fetchStart());

        fetch(urls.getOpenCode())
            .then((res)=>res.json())
            .then((data)=>dispatch(fetchSuccess()))
            .catch((err)=>dispatch(fetchFailure()))
    }

    render() {

        return(
            <View style={styles.container}>

                <ScrollViewPull>

                    {/*轮播图&通知*/}
                    <View>
                        <Banner
                            bannerList={banner_img}
                        />
                        <Notice/>
                    </View>


                    {/**/}

                    <View style={styles.item_container}>
                        <View style={styles.item_title}>
                            <Text>福彩3D</Text>
                            <Text>第394848期</Text>
                        </View>
                        <View style={styles.item_titme}>
                            <View>
                                <Text>04</Text>
                            </View>
                            <View>
                                <Text>13</Text>
                            </View>
                        </View>
                    </View>


                    <TouchableOpacity onPress={()=>this.getData()}>
                        <Text>加载</Text>
                    </TouchableOpacity>
                    <Text>{this.props.reducers.loadState}</Text>
                        <View style={{width:500,height:700}}></View>

                </ScrollViewPull>
                {/*<Loading/>*/}
                <StatusBar hidden={false}  translucent= {true} backgroundColor={'transparent'} barStyle={'light-content'}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    reducers: state.reducers
});

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    container: {

    },

    item_container: {

    }
});