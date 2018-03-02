let timeStamp = function () {
    return new Date().getTime();
};
let secret = 'eb7f104bd5c44f5fb6862b3b9a4b31af';

// 福彩3D开奖号码列表
exports.getOpenCodeList = function (listNum, page) {
    return 'http://www.zjt-cp.com/lot/getLotByPage?param={"pageSize":'+ listNum +',"clientId":"suma-tech.pc.zjt","lotteryCategory":"Magic3_Fc3D","pageNum":'+ page +'}'
};

// 开奖预测
exports.getYuce = function () {
    return 'https://api.icaipiao123.com/api/v6/recommend/number?lottery=fucai3d';
};

// 福彩3d/高频彩/数字彩的列表链接
exports.getPlayTips = function (type,offset) {
    // type = fc/gpc/szc/csxw
    return 'https://m.qmcai.com/support/cmsv2/information/queryContent?parameter=%7B%22command%22:%22queryContent%22,%22categoryId%22:%22'+ type +'%22,%22offset%22:'+ offset +',%22size%22:15,%22platform%22:%22html%22,%22version%22:%225.2.16%22%7D&callback=jsonp5'
};

// 福彩3d/高频彩/数字彩的详情链接
exports.getPlayTipsDetail = function (id) {
    return 'https://m.qmcai.com/zixun/detail.html?_id=' + id +'&time=' + timeStamp();
};

// 彩票显示所有彩票最新一期开奖号码
exports.getNewestLotteryCode = function (id) {
    return 'https://route.showapi.com/44-1?code='+ id +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};

// 显示近50期开奖号码
exports.getHistoryLotteryCode = function (id) {
    return 'https://route.showapi.com/44-2?code='+ id +'&count=50&endTime='+ new Date().Format('yyyy-MM-dd hh:mm:ss') +'&showapi_appid=46754&showapi_test_draft=false&showapi_timestamp='+ timeStamp() +'&showapi_sign='+secret;
};

// 3d奖金计算
exports.getBonusCalculate = function () {
    return 'https://api.icaipiao123.com/api/v6/bonus_calculate/bonuscalculate?lottery=fucai3d&code=normal'
};

// 彩票玩法介绍
exports.getJieshao = function (type) {
    return 'http://pimg1.126.net/swdp/game_rule/'+ type +'.html?time='+timeStamp();
};

// 福彩3D开奖走势
exports.getTrend = function (page) {
    return 'https://api.icaipiao123.com/api/v6/lottery/trendgroup?lotteryKey=fucai3d&trendGroup=fucai3d-base&amount='+page
};

// 福彩3D所有走势图
exports.getAllTrend = function (page) {
    return 'http://www.zjt-cp.com/lot/getDataAnalysis.action?param=%7b%22type%22:%22byQiShu%22,%22productName%22:%22Magic3_Fc3D%22,%22clientId%22:%22suma-tech.pc.zjt%22,%22rowNumber%22:'+page+'%7d'
};

// 单期开奖详情
exports.getKaijiang = function () {
    return 'http://www.zjt-cp.com/lot/getLotLevel.action?param=%7b%22clientId%22:%22suma-tech.pc.zjt%22,%22lotteryCategory%22:%22Magic3_Fc3D%22%7d'
};

// 福彩历史开奖记录
exports.getFucaiHistory = function() {
    return 'http://www.zjt-cp.com/lot/getLotByPage?param={"pageSize":180,"clientId":"suma-tech.pc.zjt","lotteryCategory":"Magic3_Fc3D","pageNum":1}';
};



