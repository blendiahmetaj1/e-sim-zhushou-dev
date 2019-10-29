// ==UserScript==
// @name         主页加成时间修正
// @namespace    Exsper
// @version      0.1
// @description  修正e-sim主页右上的长达46年的倒计时
// @author       Exsper
// @include      /https?:\/\/.+\.e-sim\.org\/index\.html/
// @include      /https?:\/\/.+\.e-sim\.org\/?$/
// @grant        none
// ==/UserScript==
/*
出现buff加成时间错误的根本原因：
原来的网页代码
	var liftoffTime = new Date();
	liftoffTime.setHours(liftoffTime.getHours() + 410435);
liftoffTime应该设为1970年1月1日零点，代码错误地设为了本地时间
导致倒计时的结束时间多了 从1970年1月1日零点到本地时间 这么多小时
*/
var now = new Date();
main();

function main()
{
    //是否有buff加成
    if($('div.promotionCountdown').length<=0)
    {
        //setTimeout(main, 500);
        console.log("当前没有buff加成");
        return;
    }
    if(typeof(liftoffTime)== "undefined")
    {
        console.log("没有liftoffTime，奇怪的错误");
        return;
    }
    if(liftoffTime==null)
    {
        console.log("liftoffTime为空，奇怪的错误");
        return;
    }
    //判断计时是否出错
    if(liftoffTime.getFullYear()>=2063)
    {
        console.log("原buff倒计时出错");
        changeTime();
    }
    else
    {
        console.log("原buff倒计时没有问题");
        return;
    }
}

function changeTime()
{
    var correctEndTimeMiSec = liftoffTime.getTime() - now.getTime();
    var correctEndTime = new Date(correctEndTimeMiSec);//真正的截止时间
    var time = parseFloat(correctEndTimeMiSec-now.getTime())/1000;
    if (null != time && "" != time)
    {
        if (time > 60 && time < 60 * 60)
        {
            time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) + "秒"; }
        else if (time >= 60 * 60 && time < 60 * 60 * 24)
        {
            time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) + "分钟" + parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
        }
        else
        {
            time = parseInt(time) + "秒";
        }
    }
    console.log("buff直到" + correctEndTime.toString() + "结束\n剩余时间：" + time);
    

    //新的倒计时div
    $('.promotionCountdown').remove();
    var newPromotionCountdown=$('<div></div>');
    newPromotionCountdown.addClass('promotionCountdown');
    newPromotionCountdown.countdown({until: correctEndTime, compact: true, format: 'HMS'});
    var p = $('div.promotionText');
    p.append("<br />");
    p.append(newPromotionCountdown);
}