const picHeight = 1334;
const picWidth = 750;

const {width} = require('Dimensions').get('window');
const {height} = require('Dimensions').get('window');

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


module.exports = {

    /**
     * 获取切图的宽高
     * */
    picHeight(pixel) {
        return pixel / picHeight * height;
    },
    picWidth(pixel) {
        return pixel / picWidth * width;
    },


    /**
     * 获取手机设备的宽高
     * */
    deviceHeight() {
        return height;
    },
    deviceWidth() {
        return width;
    },

    getPK10Color(num) {
        var colors = ['#2E82C2','#787B84','#E5E027','#DB952C','#0B256E',
            '#4ACD53','#9E1C9B','#82CCE0','#EAE8EC','#BD2E27'
        ];
        return colors[num - 1];
    }

};