// ==UserScript==
// @name         E-simPlus
// @namespace    https://coding.net/u/Exsper/p/EsimPlus/
// @supportURL   http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=dQYBFAcZHBIdARANBgUQBzUTGg0YFBwZWxYaGA
// @version      0.1
// @description  E-sim辅助脚本
// @author       Exsper
// @include      http*://*.e-sim.org/*
// @require      http://cdn.e-sim.org/js/jquery-1.8.3.min.js
// @icon         https://puu.sh/zMUhq/16be61e635.gif
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        unsafewindow
// @run-at       document-start
// ==/UserScript==

/*

**      ______                   _____
**     / ____/          _       / ___ \__
**    / /______________(_)___  / /__/ / /_  _______
**   / ____/_____/ ___/ /    \/ _____/ / / / / ___/
**  / /___      (__  ) / / / / /    / / /_/ (__  )
** /_____/     /____/_/_/_/_/_/    /__\__,_/____/
**                                                 by Exsper
**
**                   集过往千次试验之大成 汇当今百家脚本之精华

*/

// 编辑用，保存前请删除
var $=unsafeWindow.$;

function log(t)
{
    console.log(t);
}


//全局变量
FastPack.require("globals.js");

//存储数据
FastPack.require("storage.js");

//公共函数
FastPack.require("publicfunctions.js");

//API
FastPack.require("api.js");

//抓取网页
FastPack.require("crawler.js");

//发送请求
FastPack.require("request.js");

//建立和更新数据库
FastPack.require("databaseini.js");

//特定网页功能
//battle
//battles
//battleStatistics
//citizensOnline
//companies
//companyAllWorkers
//index
FastPack.require("enhanceIndex.js");
//militaryUnit
//militaryUnitCompanies
//militaryUnitMassSalary
//monetaryMarket
//myMilitaryUnit
//profile
FastPack.require("enhanceProfile.js");
//showEquipment
//statistics
//storage


//脚本初始化
// 脚本等待和加载
function InitScript() {
    var waitForLoadCount = 0;
    var step = 0;
    var maxWaitForLoadCount = options.waitForWebPageComplete.maxWaitCount;

    //加载特定网页的脚本
    function RunPageScript() {
        if (document.URL.search("html") != -1) {
            var url = document.URL.match("\/([a-zA-Z0-9]+)\.html")[1];
            document.title = "e-Sim - " + location.host.split(".")[0] + " - " + url; // 修改网页标题
            switch (url) {
                case "index":
                    enhanceIndex();
                    break;
                case "profile":
                    enhanceProfile();
                    break;
                default:
                    console.log(url);
                    break;
            }
        }
        else { enhanceIndex(); } // 可能是首页？
    }

    function WaitForWebPageComplete() {
        // 等待网页框架加载
        if (step == 0) {
            if ($(".time").length !== 2) {
                waitForLoadCount++;
                if (waitForLoadCount<=maxWaitForLoadCount) {
                    console.log(waitForLoadCount+":网页未加载完全，esimplus等待1秒");
                    setTimeout(WaitForWebPageComplete, 1000);
                    return;
                }
                else {
                    location.reload();
                    return;
                }
            }
            step = 1;
        }
        // 等待网页原脚本加载
        if (step == 1) {
            var tfl = $(".time:first").text().match(/-/g);
            if (tfl==null || tfl.length != 2) {
                waitForLoadCount++;
                if (waitForLoadCount<=maxWaitForLoadCount) {
                    console.log(waitForLoadCount+":官方脚本还未执行，esimplus插件等待1秒");
                    setTimeout(WaitForWebPageComplete, 1000);
                    return;
                }
                else {
                    location.reload();
                    return;
                }
            }
            step = 2;
        }
        // 网页脚本加载完成，开始做准备工作和其他不需要额度恢复倒计时的工作
        if (step == 2) {
            // 建立地图数据
            fetchMap();
            fetchApiRanks();
            RunPageScript();
            step = 3;
        }
        // 等待恢复额度倒计时加载
        if (step == 3) {
            if (($("#minutesLimit").length >0 && $("#minutesLimit").text() == "") || ($("#limit_timer_time_text").length >0 && $("#limit_timer_time_text").text() == "")) {
                waitForLoadCount++;
                if (waitForLoadCount<=maxWaitForLoadCount) {
                    console.log(waitForLoadCount+":官方时间还未刷新，esimplus等待1秒");
                    setTimeout(WaitForWebPageComplete, 1000);
                    return;
                }
                else {
                    location.reload();
                    return;
                }
            }
            step = 4;
        }
        // 网页全部加载完成，做战场页的其他工作
        if (step == 4) {

        }
    }

    // 加载存储和设置
    loadStorage();
    // 等待网页加载完毕
    WaitForWebPageComplete();
}

//插件主程序入口
InitScript();
