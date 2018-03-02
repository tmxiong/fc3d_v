function getDate() {

}
getDate.prototype = {
    /*星期几文本*/
    getWeekdayText: function (weekday) {
        var text = "";

        if (weekday == 1) {
            text = "星期日";
        }
        if (weekday == 2) {
            text = "星期一";
        }
        if (weekday == 3) {
            text = "星期二";
        }
        if (weekday == 4) {
            text = "星期三";
        }
        if (weekday == 5) {
            text = "星期四";
        }
        if (weekday == 6) {
            text = "星期五";
        }
        if (weekday == 7) {
            text = "星期六";
        }
    },
    /*获取当前日期，sep分隔符*/
    getCurrentDate: function (sep) {
        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var tmp = year + '' + sep + '' + this.formatDay(month) + '' + sep + '' + this.formatDay(day);
        return tmp;
    },
    // 增加几天
    getCurrentDatePlus: function (sep, plus) {
        var myDate = new Date();
        // 系统自动计算
        myDate.setDate(myDate.getDate() + plus);
        var year = myDate.getFullYear();   //获取完整的年份(4位,1970-????)
        var month = myDate.getMonth() + 1;      //获取当前月份(0-11,0代表1月)
        var day = myDate.getDate();       //获取当前日(1-31)
        var tmp = year + '' + sep + '' + this.formatDay(month) + '' + sep + '' + this.formatDay(day);
        return tmp;
    },
    formatDay: function (d) {
        if (d < 10) {
            return "0" + d;
        }
        else {
            return d;
        }
    },
    djs: (function () {
        var mltmp = {};
        mltmp.lastCode;
        mltmp.interval = 1000;
        mltmp.interval_hour = 1000 * 60;
        mltmp.endTimeNum;

        mltmp.startHour = function () {
            mltmp.lastCode = setInterval(function () {
                mltmp.endTime();
            }, mltmp.interval_hour);
        };

        mltmp.start = function (endTime, callback) {
            if (mltmp.lastCode != null) {
                this.clear();
            }

            mltmp.endTimeNum = parseInt(endTime);

            var hourSecond = 0;

            if (mltmp.endTimeNum == 0) return;
            // 带小时倒计时
            if (mltmp.endTimeNum > 3600) {
                hourSecond = parseInt(mltmp.endTimeNum/3600);
                // 如果小时倒计时中除了小时 分钟 还存在秒数 则先延时秒数 再进行分钟倒计时
                if (hourSecond > 0) {
                    mltmp.lastCode = setTimeout(function () {
                        mltmp.startHour();
                    }, hourSecond * 1000);
                }
                else {
                    mltmp.lastCode = setInterval(function () {
                        mltmp.endTime(callback);
                    }, mltmp.interval_hour);
                }
            }
            // 分钟倒计时
            else {
                mltmp.lastCode = setInterval(function () {
                    mltmp.endTime(callback);
                }, mltmp.interval);
            }
        };

        mltmp.clear = function () {
            window.clearInterval(mltmp.lastCode);
        };

        mltmp.refresh = function () {
            //getGameInfo.getDrawVideo();
        };

        mltmp.endTime = function (callback) {
            try {
                /*if(mltmp.endTimeNum==0) return ;*/
                var hour, minute, second;
                if (mltmp.endTimeNum > 3600) {
                    hour = parseInt(mltmp.endTimeNum / 3600);
                    minute = parseInt((mltmp.endTimeNum % 3600) / 60);

                    if (minute === 0) {
                        if (hour === 0) {
                            //var getGameInfo = require('../../Business/GetGameInfo/getGameInfo');
                            //getGameInfo.getDrawVideo();
                            this.clear();
                            return;
                        }
                        hour--;
                        minute = 59;
                    } else {
                        minute--;
                    }

                    formatEndTime = getDate.formatDay(hour) + ":" + getDate.formatDay(minute);
                    callback(formatEndTime);
                }
                else {
                    minute = parseInt(mltmp.endTimeNum / 60);
                    second = parseInt(mltmp.endTimeNum % 60);

                    if (second === 0) {
                        if (minute === 0) {
                            /*isRun = false;*/
                            //var getGameInfo = require('../../Business/GetGameInfo/getGameInfo');
                            //getGameInfo.getDrawVideo();
                            this.clear();
                            return;
                        }
                        minute--;
                        second = 59;
                    } else {
                        second--;
                    }

                    formatEndTime = getDate.formatDay(minute) + ":" + getDate.formatDay(second);
                    callback(formatEndTime);
                }
                mltmp.endTimeNum--;
            } catch (ex) {
            }
        };

        return mltmp;
    })(),
    valicationDjs: function (count, obj) {
        setTimeout(function () {
            count = count - 1;
            obj.djs(count);
        }, 1000);
    }
};


//格式化时间 如：yyyy-MM-dd hh:mm:ss
// Date.prototype.format = function (format) {
//     var o = {
//             "M+": this.getMonth() + 1, //month
//             "d+": this.getDate(), //day
//             "h+": this.getHours(), //hour
//             "m+": this.getMinutes(), //minute
//             "s+": this.getSeconds(), //second
//             "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
//             "S": this.getMilliseconds() //millisecond
//         }
//     ;
//     var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
//     if (/(y+)/.test(format)) {
//         format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//     }
//     if (/(w+)/.test(format)) {
//         format = format.replace(RegExp.$1, week[this.getDay()]);
//     }
//     for (var k in o) {
//         if (new RegExp("(" + k + ")").test(format)) {
//             format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
//         }
//     }
//     return format;
// };


var getDate = new getDate();
module.exports = getDate;
