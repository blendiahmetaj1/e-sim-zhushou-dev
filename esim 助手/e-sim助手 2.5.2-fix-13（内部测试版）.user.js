// ==UserScript==
// @name         e-sim助手
// @namespace    esim
// @version      2.5.2-fix-13（内部测试版）
// @description  e-sim增强功能
// @author       c*******, z*****
// @match        http://*.e-sim.org/*
// @match        https://*.e-sim.org/*
// @require      http://cdn.e-sim.org/js/jquery-1.8.3.min.js
// @grant        GM_setClipboard
// @grant        GM_addStyle
// ==/UserScript==


// ChangeLog
// 2.5.2-fix-13：测试新国旗样式应用；测试本地加成地区；测试联盟成员国的显示；测试桌面通知战场提醒；测试闹钟加音效；上调“直接使用医疗包”按钮位置；修正Kekistan的国家缩写；战场界面功能框下移；修正一些小问题；稍微更改界面；还原对clutchStandard所做的修改；还原对Firepower所做的修改；
// 2.5.2版本：修正非起义战的防守方本地加成地区；添加国旗选择列的清空和锁定功能；添加战场中无需确认使用医疗包的功能；战场页面修改网页标题
// 2.5.1版本：修正从2.4.8版本以来因页面样式更新导致的各种功能失效的问题；添加显示货币市场玩家国籍的功能；在战场推测观战玩家中添加根据联盟分类玩家的功能；添加隐藏首页左上角提醒框的功能
//------------------------------------------------------------------------------------------------------
// 2.4.8版本：修正物品界面修改造成无法显示机票数量的问题；
// 2.4.7版本：修正战场页面无法显示在线玩家的问题；
// 2.4.6版本：修正设置军令时错误高亮的问题；修正了大国列表错误引起脚本崩溃的问题；
// 2.4.5版本：修正欧洲服货币市场数字识别的问题；
// 2.4.4版本：修正进行中的战场识别为结束的问题(admin sb)；
// 2.4.3版本：修正欧洲服战场伤害格式的问题；
// 2.4.2版本：添加压秒玩家的Q5枪数；修正欧洲服国旗快捷键的问题；
// 2.4.1版本：添加压秒玩家的攻击时段和攻击次数；
// 2.4.0版本：添加压秒(3分钟内)伤害排行；国家快捷栏里用Adminland旗帜代表全世界；修正货币转换bug；
// 2.3.2版本：修正国家杯等战场不显示祖国的问题；各国货币买卖差价较大时，同时显示买卖所需的Gold数。
// 2.3.1版本：显示各局掉落的装备数量；页面左侧搬仓按钮的物资数量更加智能；页面左侧增加战场跳转功能；添加刷新盟国敌国按钮。
// 2.3.0版本：在战场统计页面可显示各局战况；个人公司可查看工作情况；修复边吃边打时可能卡住的问题；改进军团物资快捷键。




/*! jquery.livequery - v1.3.6 - 2013-08-26
 * Copyright (c)
 *  (c) 2010, Brandon Aaron (http://brandonaaron.net)
 *  (c) 2012 - 2013, Alexander Zaytsev (http://hazzik.ru/en)
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL Version 2 (GPL_LICENSE.txt) licenses.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a,b){function c(a,b,c,d){return!(a.selector!=b.selector||a.context!=b.context||c&&c.$lqguid!=b.fn.$lqguid||d&&d.$lqguid!=b.fn2.$lqguid)}a.extend(a.fn,{livequery:function(b,e){var f,g=this;return a.each(d.queries,function(a,d){return c(g,d,b,e)?(f=d)&&!1:void 0}),f=f||new d(g.selector,g.context,b,e),f.stopped=!1,f.run(),g},expire:function(b,e){var f=this;return a.each(d.queries,function(a,g){c(f,g,b,e)&&!f.stopped&&d.stop(g.id)}),f}});var d=a.livequery=function(b,c,e,f){var g=this;return g.selector=b,g.context=c,g.fn=e,g.fn2=f,g.elements=a([]),g.stopped=!1,g.id=d.queries.push(g)-1,e.$lqguid=e.$lqguid||d.guid++,f&&(f.$lqguid=f.$lqguid||d.guid++),g};d.prototype={stop:function(){var b=this;b.stopped||(b.fn2&&b.elements.each(b.fn2),b.elements=a([]),b.stopped=!0)},run:function(){var b=this;if(!b.stopped){var c=b.elements,d=a(b.selector,b.context),e=d.not(c),f=c.not(d);b.elements=d,e.each(b.fn),b.fn2&&f.each(b.fn2)}}},a.extend(d,{guid:0,queries:[],queue:[],running:!1,timeout:null,registered:[],checkQueue:function(){if(d.running&&d.queue.length)for(var a=d.queue.length;a--;)d.queries[d.queue.shift()].run()},pause:function(){d.running=!1},play:function(){d.running=!0,d.run()},registerPlugin:function(){a.each(arguments,function(b,c){if(a.fn[c]&&!(a.inArray(c,d.registered)>0)){var e=a.fn[c];a.fn[c]=function(){var a=e.apply(this,arguments);return d.run(),a},d.registered.push(c)}})},run:function(c){c!==b?a.inArray(c,d.queue)<0&&d.queue.push(c):a.each(d.queries,function(b){a.inArray(b,d.queue)<0&&d.queue.push(b)}),d.timeout&&clearTimeout(d.timeout),d.timeout=setTimeout(d.checkQueue,20)},stop:function(c){c!==b?d.queries[c].stop():a.each(d.queries,d.prototype.stop)}}),d.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html","prop","removeProp"),a(function(){d.play()})});

// xflagsSmall xflagsSmall-Taiwan <- flags-small Taiwan
// xflagsMedium xflagsMedium-Kekistan <- flags-medium Kekistan
// fightFlag xflagsBig xflagsBig-Turkey <- fightFlag flags-big Turkey
// 2017.8.9 更新：flag class更新的服务器在团体杯、世界大战和新手战场仍旧使用旧版flag class，暂时使用“battleName”判断，如果有更好的判断方法务必请告知我
/*
		单挑杯		团体杯		世界大战	新手战场          淘汰赛
简体	国家队决赛	匹配		匹配			""（空字符串）   Cup Tournament
繁体	單挑杯		比賽			比賽		""（空字符串）     Cup Tournament
英文	League		Match		Match		""（空字符串）    Cup Tournament

所以需要battleName判断是不是为["匹配" , "比賽", "Match", ""]
*/
var oldFlagBattleName = ["匹配" , "比賽", "Match", ""];

main();

function main() {
    if ( $(".time").length !== 2) {
        console.log("未登录，e-sim助手停止运行");
        return;
    }
    if ($(".time:first").text().match(/-/g).length != 2) {
        console.log("官方脚本还未执行，e-sim助手等待0.5秒");
        setTimeout(main, 500);
        return;
    }
    if ($("#ehIcon2").length > 0) {
        console.log("已运行e-sim助手"); // 偶尔会这样，不知道原因
        return;
    }

    // 所有页面都要做的事
    fetchMap();
    enhanceCountrySelect();
    addIcon();
    fetchMe();
    enhanceQuickButton();
    //addBattleSearch();
    enhanceCurrency();

    // 不同页面分别做事
    if (document.URL.search("html") != -1) {
        var url = document.URL.match("\/([a-zA-Z0-9]+)\.html")[1];
        switch (url) {
            //2017.8.8 更新：隐藏首页左上角的提醒框div#frontPagePushQuestion
            case "index":
                hideFrontPagePushQuestion();
                break;
            case "profile":
                var citizenId = parseInt(document.URL.match("\/profile\.html[?]id=([0-9]+)")[1]);
                updateOneCitizenPage(citizenId, $("body"));
                enhanceProfile(citizenId);
                break;
            //2017.8.8 更新：将updateBuffTime功能移至enhanceStorage
            case "militaryUnitCompanies":
            case "companies":
                enhanceMilitaryUnitCompanies();
                break;
            case "myMilitaryUnit":
            case "militaryUnit":
                enhanceMyMilitaryUnit();
                break;
            //2017.8.8 更新：将enhanceMilitaryUnitStatistics功能移至enhanceStatistics
            case "statistics":
                enhanceStatistics();
            break;
            //2017.8.8 更新：将enhanceEquipment功能移至enhanceStorage
            case "storage":
                enhanceStorage();
                break;
            case "monetaryMarket":
                updateCurrencyRatio($("body"));
                //2017.8.6 更新：在货币市场的玩家名称前面显示国籍
                ShowPlayerCitizenship();
                break;
            case "battle":
                enhanceBattle();
                break;
            case "battles":
                enhanceBattleList();
                break;
            case "battleStatistics":
                enhanceBattleStatistics();
                break;
            default:
                console.log(url);
                break;
        }
    }
    else//可能是首页？
    {
        hideFrontPagePushQuestion();
    }
}

//2017.8.8 更新：隐藏首页左上角的提醒框div#frontPagePushQuestion
function hideFrontPagePushQuestion()
{
    if ($("div#frontPagePushQuestion").length > 0)
    {
        $("div#frontPagePushQuestion").hide();
    }
}

// 获取服务器上的epoch
function getEpoch() { 
    return parseInt($("#time2").text());
}

// 使用字符串，获得本地的epoch。只可与其它本地epoch计算差值。
function getEpochFromString(dmyWithDash, hmsWithColon) {
    var hms = hmsWithColon.split(":");
    var dmy = dmyWithDash.split("-");
    var d = new Date(dmy[2], parseInt(dmy[1])-1, dmy[0], hms[0], hms[1], hms[2], 0);
    return Date.parse(d);
}

function isEpochOutdated(epoch, seconds) {
    var now = getEpoch();
    if (now-epoch < seconds*1000)
        return false;
    return true;
}

function isObjectOutdated(obj, seconds) {
    if (obj && "date" in obj)
        return isEpochOutdated(obj.date, seconds);
    return true;
}

function isLocalStorageOutdated(name, seconds) {
    var obj = JSON.parse(localStorage.getItem(name));
    return isObjectOutdated(obj, seconds);
}

function setUpdatedDate(obj) {
    obj.date = getEpoch();
}


function epochToTime(epoch) {
    var d = parseInt(epoch/(24*3600*1000));
    epoch -= d*24*3600*1000;
    var h = parseInt(epoch/(3600*1000));
    epoch -= h*3600*1000;
    var m = parseInt(epoch/(60*1000));

    var s = "";
    if (d>0)
        s += d + "d";
    if (h>0)
        s += h + "h";
    if (m>0)
        s += m + "m";

    return s ? s : "0m";
}

function epochToTime2(epoch) { //只显示m或h或d，右上角菜单用
    var d = parseInt(epoch/(24*3600*1000));
    epoch -= d*24*3600*1000;
    var h = parseInt(epoch/(3600*1000));
    epoch -= h*3600*1000;
    var m = parseInt(epoch/(60*1000));

    var s = "";
    if (d>0)
        s = d + "d";
    else if (h>0)
        s = h + "h";
    else if (m>0)
        s = m + "m";
    else
        s = "0m";

    return s;
}


//////////////////////////////////////////////////////////////////////////////////////////


// 右上角显示图标和菜单；设定全局变量config，内含fetchCurrencyDisabled和fetchCitizenDisabled；全局变量allies和enemies；全局变量 currencyRatio 和 topCountryIds
function addIcon() {
    config = {};
    allies = JSON.parse(localStorage.getItem("allies"));
    enemies = JSON.parse(localStorage.getItem("enemies"));
    if (allies === null || enemies === null) {
        allies = [];
        enemies = [];
    }
    coalitionMembers = JSON.parse(localStorage.getItem("coalitionMembers"));
    if (coalitionMembers === null) {
        coalitionMembers = [];
    }
    currencyRatio = JSON.parse(localStorage.getItem("currencyRatio"));
    currencyRatio = currencyRatio===null ? {} : currencyRatio;
    topCountryIds = JSON.parse(localStorage.getItem("topCountryIds"));
    topCountryIds = topCountryIds===null ? [] : topCountryIds;


    // 图标
    var li = $("<li>", {id:"ehIcon2"}).insertBefore($("#userAvatar"));
    var a = $("<a>", {"data-dropdown":"contentDropEh", href:"#"}).appendTo(li);
    var img = $("<img>", {align:"absmiddle", class:"smallAvatar", style:"height:36px; width:36px;", src:"https://suna.e-sim.org:3000/avatars/140351_small"}).appendTo(a);

    // 版本号和声明
    var contentDropEh = $("#contentDrop").clone().attr("id", "contentDropEh").empty().insertBefore($("#contentDrop")); // 外框
    $("<b>", {text:"e-sim助手, 版本 " + GM_info.script.version + ", 开发者 " + GM_info.script.author}).appendTo(contentDropEh).after("<br>"); // 版本号和作者
    //$("<div>", {style:"text-align:left;", text:"  The author is not responsible for the consequences of use of this script, no matter how awful, even if they arise from flaws in it. 使用此脚本所造成的一切后果（包括但不限于封号、经济损失）与作者无关。"}).appendTo(contentDropEh); // 声明
    $("<div>", {style:"text-align:left;line-height:30px;", text:"使用此脚本造成的一切后果（包括但不限于封号、经济损失）与作者无关"}).appendTo(contentDropEh); // 声明


    // 若干功能选择框和清除按钮
    var table = $("<table>", {id:"Eh2Config", style:"width:100%;"}).appendTo(contentDropEh);
    var tr = $("<tr>",{style:"line-height:30px;"}).appendTo(table);
    var td;
    var items = [["fetchCurrency", "统计汇率 ", "统计汇率和常用物资的价格", ["currencyRatio", "topCountryIds"], "扫描大国"],
                 ["fetchCitizen", "统计玩家 ", "估算玩家buff时间等", ["citizenInfo", "citizenPage", "muInfo"], "扫描本页"]
                ];
    for (var i = 0; i < items.length; ++i) {
        // 选择框和清除按钮
        td = $("<td>", {style:"text-align:left; background-color:SlateGray;"}).appendTo(tr);
        var label = $("<label>", {class:"checkboxlabel", for:items[i][0]+"Checkbox", text:items[i][1]}).appendTo(td); // 选择框说明文本
        var checkbox = $("<input>", {id:items[i][0]+"Checkbox", type:"checkbox", style:"vertical-align:5px;", text:" "}).prependTo(label); // 选择框
        var button = $("<button>", {id:items[i][0]+"ClearButton", class:"foundation-style", style:"padding:5px; margin:5px", target:items[i][3].join(" "), text:"清除"}).appendTo(td);
        var scanAllButton = $("<button>", {id:items[i][0]+"Scan", class:"foundation-style", style:"padding:5px; margin:5px", text:items[i][4]}).appendTo(td);

        // 选择框的动作
        checkbox.click(function() {
            var name = $(this).attr("id")+"Disabled";
            if ($(this).is(':checked'))
                localStorage.removeItem(name);
            else
                localStorage.setItem(name, "1");
        });

        if (localStorage.getItem(items[i][0]+"CheckboxDisabled")) {
            config[items[i][0] + "Disabled"] = true;
            checkbox.attr("checked", false);
        }
        else {
            config[items[i][0] + "Disabled"] = false;
            checkbox.attr("checked", true);
        }

        // 清除按钮的动作
        button.click(function() {
            var ls = $(this).attr("target").split(" ");
            for (var j=0; j<ls.length; ++j) {
                console.log("清除", ls[j]);
                localStorage.removeItem(ls[j]);
            }
        });
    }

    if (config.fetchCitizenDisabled) {
        $("#fetchCitizenScan").hide();
    }
    else {
        $("#fetchCitizenScan").click(function() {
            $(this).attr("disabled", true);
            var citizenIds = [];
            $("a[href*='profile.html'").each(function() {
                var newCitizenId = parseInt($(this).attr("href").match(/profile\.html[?]id=([0-9]+)/)[1]);
                if ($.inArray(newCitizenId, citizenIds) === -1)
                    citizenIds.push(newCitizenId);
            });

            var n = citizenIds.length;
            $(this).text("剩余" + n + "个");
            $.each(citizenIds, function(index, citizenId) {
                $.ajax({
                    url: "profile.html?id=" + citizenId,
                    success: function(data) {
                        if ( $(".time", data).length !== 2) {
                            console.log(citizenId, "抓取错误，重新抓取");
                            $.ajax(this);
                            return;
                        }
                        updateOneCitizenPage(citizenId, data);
                        $("#fetchCitizenScan").text("剩余" + (--n) + "个");
                        if (n == 0)
                            $("#fetchCitizenScan").text("扫描完成");
                    },
                    error: function(xhr,textStatus){
                        console.log("抓取错误 (", textStatus, ")，重新抓取");
                        $.ajax(this);
                    },
                });
            });
        });
    }

    // 祖国选择框
    table = $("<table>", {style:"width:100%; text-align:left;"}).insertBefore($("#Eh2Config"));
    tr = $("<tr>", {style:"background-color:DarkSlateGray;line-height:30px;"}).appendTo(table);
    td = $("<td>", {id:"Eh2Homeland", text:"祖国: "}).appendTo(tr);
    var select = $("<select>", {style:"padding:3px; margin:3px", id:"Eh2HomelandSelect"}).appendTo(td);
    for (var i=0; i<countryIds.length; ++i)
        $("<option>", {value:countryIds[i], text:countryInfo[countryIds[i]].name}).appendTo(select);
    var options = $("option", select).sort(function(a, b) { return $(a).text().localeCompare($(b).text()); });
    select.html(options);
    select.change(getAndShowAlliesAndEnemies);

    //2017.9.7 更新：添加联盟成员

    // 盟国和敌国更新按钮
    var refreshAlliesAndEnemies = $('<button>', {id:'refreshAlliesAndEnemies', class:"foundation-style", style:"padding:5px; margin:5px", text:'更新盟国和敌国'}).appendTo(td);
    refreshAlliesAndEnemies.click(getAndShowAlliesAndEnemies);

    // 盟国和敌国
    tr = $("<tr>", {style:"background-color:DarkSlateGray;line-height:30px;"}).appendTo(table);
    td = $("<td>", {text:"盟国: "}).appendTo(tr);
    var b = $("<b>", {id:"Eh2Allies", text:"更新中..."}).appendTo(td);
    tr = $("<tr>", {style:"background-color:DarkSlateGray;line-height:30px;"}).appendTo(table);
    td = $("<td>", {text:"敌国: "}).appendTo(tr);
    b = $("<b>", {id:"Eh2Enemies", text:"更新中..."}).appendTo(td);
    tr = $("<tr>", {style:"background-color:DarkSlateGray;line-height:30px;"}).appendTo(table);
    td = $("<td>", {text:"联盟成员国: "}).appendTo(tr);
    b = $("<b>", {id:"Eh2CoalitionMembers", text:"更新中..."}).appendTo(td);

    if (allies.length === 0) { // 从没选择过祖国
        select.val(28);
        getAndShowAlliesAndEnemies();
    }
    else { // 已选择祖国，直接显示盟国和敌国信息
        select.val(allies[0]);
        showAlliesAndEnemies();
    }

    // 抓取盟国和敌国信息
    function getAndShowAlliesAndEnemies() {
        var homelandId = parseInt(select.val());
        select.attr("disabled", true);
        refreshAlliesAndEnemies.attr("disabled", true);
        //$("~ div.flags-small", select).remove();
        $("~ div.xflagsSmall", select).remove();
        //$("<div>", {class:"flags-small "+countryInfo[homelandId].flagName, style:"vertical-align:middle;", value:homelandId, title:countryInfo[homelandId].countryName}).insertAfter(select);
        $("<div>", {class:"xflagsSmall xflagsSmall-"+countryInfo[homelandId].flagName, style:"vertical-align:middle;", value:homelandId, title:countryInfo[homelandId].name}).insertAfter(select);

        console.log("正在更新" + countryInfo[homelandId].name + "的盟国和敌国信息");
        allies = [homelandId, ];
        enemies = [];
        coalitionMembers = [];
        $("#Eh2Allies").html("更新中...");
        $("#Eh2Enemies").html("更新中...");
        $("#Eh2CoalitionMembers").html("更新中...");

        $.ajax({
            url: "countryPoliticalStatistics.html?countryId=" + homelandId,
            success: function(data) {
                // 设定全局变量allies，并添加盟国国旗
                // 2017.8.26 更新：联盟和盟友国旗样式改变（战争里面没变）
                /*
                //var allyFlagDivs = $("div.flags-medium", $("table.dataTable:last", data));
                allyFlagDivs.each(function() {
                    var div = $(this);
                    var flagName = div.attr("class").split(" ").pop();
                    allies.push(countryInfo[flagName].id);
                });
                */
                var allyFlagDivs = $("div.xflagsMedium", $("table.dataTable:last", data));
                allyFlagDivs.each(function() {
                    var div = $(this);
                    var flagName = div.attr("class").split(" ").pop();
                    flagName=flagName.substring(flagName.indexOf('-') + 1);
                    allies.push(countryInfo[flagName].id);
                });

                var enemyFlagDivs = $("div.flags-medium", $("table.dataTable:eq(-2)", data));
                enemyFlagDivs.each(function() {
                    var div = $(this);
                    var flagName = div.attr("class").split(" ").pop();
                    if (countryInfo[flagName].id !== homelandId)
                        enemies.push(countryInfo[flagName].id);
                });

                var coalitionH = $("h2", data);
                var coalitionH2;
                if (coalitionH.length >4 )//没有总统
                {
                    coalitionH2 = coalitionH[2];
                }
                else
                {
                    coalitionH2 = coalitionH[1];
                }
                if (coalitionH2.innerText.split(" ")[0] == "Coalition")
                {
                    var coalitionFlagDivs = $(coalitionH2, data).nextAll("div.xflagsSmall");
                    coalitionFlagDivs.each(function() {
                        var flagName = $(this).attr("class").split(" ").pop();
                        flagName = flagName.substring(flagName.indexOf('-') + 1);
                        coalitionMembers.push(countryInfo[flagName].id);
                    });
                }


                localStorage.setItem("allies", JSON.stringify(allies));
                localStorage.setItem("enemies", JSON.stringify(enemies));
                localStorage.setItem("coalitionMembers", JSON.stringify(coalitionMembers));

                showAlliesAndEnemies();
                select.attr("disabled", false);
                refreshAlliesAndEnemies.attr("disabled", false);
            },
            error: function(xhr,textStatus){
                console.log("抓取错误 (", textStatus, ")，重新抓取");
                $.ajax(this);
            },
        });
    }

    // 显示盟国和敌国信息
    function showAlliesAndEnemies() {
        //$("~ div.flags-small", select).remove();
        //$("<div>", {class:"flags-small "+countryInfo[allies[0]].flagName, style:"vertical-align:middle;", value:allies[0], title:countryInfo[allies[0]].countryName}).insertAfter(select);
        $("~ div.xflagsSmall", select).remove();
        $("<div>", {class:"xflagsSmall xflagsSmall-"+countryInfo[allies[0]].flagName, style:"vertical-align:middle;", value:allies[0], title:countryInfo[allies[0]].name}).insertAfter(select);
        $("#Eh2Allies").text("");
        $("#Eh2Enemies").text("");
        $("#Eh2CoalitionMembers").text("");
        for (var i=1; i<allies.length; ++i) {
            countryId = allies[i];
            //$("<div>", {class:"flags-small " + countryInfo[countryId].flagName, style:"vertical-align:middle;", title:countryInfo[countryId].countryName}).appendTo($("#Eh2Allies"));
            $("<div>", {class:"xflagsSmall xflagsSmall-" + countryInfo[countryId].flagName, style:"vertical-align:middle;", title:countryInfo[countryId].name}).appendTo($("#Eh2Allies"));
        }
        for (var i=0; i<enemies.length; ++i) {
            countryId = enemies[i];
            //$("<div>", {class:"flags-small " + countryInfo[countryId].flagName, style:"vertical-align:middle;", title:countryInfo[countryId].countryName}).appendTo($("#Eh2Enemies"));
            $("<div>", {class:"xflagsSmall xflagsSmall-" + countryInfo[countryId].flagName, style:"vertical-align:middle;", title:countryInfo[countryId].name}).appendTo($("#Eh2Enemies"));
        }
        for (var i=0; i<coalitionMembers.length; ++i) {
            countryId = coalitionMembers[i];
            $("<div>", {class:"xflagsSmall xflagsSmall-" + countryInfo[countryId].flagName, style:"vertical-align:middle;", title:countryInfo[countryId].name}).appendTo($("#Eh2CoalitionMembers"));
        }
    }


    if (config.fetchCurrencyDisabled) {
        $("#fetchCurrencyScan").hide();
    }
    else {
        // 显示人口和生产力前5的国家
        // 2017.8.26 更新：国旗样式改变
        var table = $("<table>", {id:"Eh2CurrencyRatios", style:"width:100%;"}).appendTo(contentDropEh);
        if (topCountryIds.length === 0) {// 需要抓取
            console.log("查看人口和生产力前5的国家");
            $.ajax({
                url: "countryStatistics.html?statisticType=PRODUCTIVITY",
                success: function(data) {
                    /*
                    $("div.flags-medium:lt(5)", data).each(function() {
                        topCountryIds.push($(this).attr("class").split(" ").pop());
                    });
                    */
                    $("div.xflagsMedium:lt(5)", data).each(function() {
                        var co = $(this).attr("class").split(" ").pop();
                        co = co.substring(co.indexOf('-') + 1);
                        topCountryIds.push(co);
                    });
                    if (topCountryIds.length === 10)
                        showTopCountryCurrencyRatios();
                },
                error: function(xhr,textStatus){
                    console.log("抓取错误 (", textStatus, ")，重新抓取");
                    $.ajax(this);
                },
            });

            $.ajax({
                url: "countryStatistics.html?statisticType=CITIZENS",
                success: function(data) {
                    /*
                    $("div.flags-medium:lt(5)", data).each(function() {
                        topCountryIds.push($(this).attr("class").split(" ").pop());
                    });
                    */
                    $("div.xflagsMedium:lt(5)", data).each(function() {
                        var co = $(this).attr("class").split(" ").pop();
                        co = co.substring(co.indexOf('-') + 1);
                        topCountryIds.push(co);
                    });
                    if (topCountryIds.length === 10)
                        showTopCountryCurrencyRatios();
                },
                error: function(xhr,textStatus){
                    console.log(name, "抓取错误 (", textStatus, ")，重新抓取");
                    $.ajax(this);
                },
            });
        }
        else { // topCountryIds已经抓取过了
            showTopCountryCurrencyRatios();
        }
    }


    // 显示重要国家的汇率
    function showTopCountryCurrencyRatios() {
        if (config.fetchCurrencyDisabled) {
            return;
        }

        var newIds = [parseInt($("#Eh2HomelandSelect").val())];
        for (var i=0; i<topCountryIds.length; ++i) {
            if (topCountryIds[i] && countryInfo[topCountryIds[i]]) {
                var newId = countryInfo[topCountryIds[i]].id;
                if ($.inArray(newId, newIds) === -1)
                    newIds.push(newId);
            }
        }
        topCountryIds = newIds;
        localStorage.setItem("topCountryIds", JSON.stringify(topCountryIds));

        // 填汇率表格
        table.empty();
        var flag = $("<tr>",{style:"line-height:30px;"}).appendTo(table);
        var flagCell = $("<td>", {style:"background-color:DarkSlateGray;", text:"货币"}).appendTo(flag);
        var buyGold = $("<tr>",{style:"line-height:30px;"}).appendTo(table);
        //var buyGoldCell = $("<td>", {style:"background-color:DarkSlateGray;", html:"买 1<div class='flags-small Gold' style='vertical-align:middle;' />"}).appendTo(buyGold);
        var buyGoldCell = $("<td>", {style:"background-color:DarkSlateGray;", html:"买 1<div class='xflagsSmall xflagsSmall-Gold' style='vertical-align:middle;' />"}).appendTo(buyGold);
        var sellGold = $("<tr>",{style:"line-height:30px;"}).appendTo(table);
        //var sellGoldCell = $("<td>", {style:"background-color:DarkSlateGray;", html:"卖 1<div class='flags-small Gold' style='vertical-align:middle;' />"}).appendTo(sellGold);
        var sellGoldCell = $("<td>", {style:"background-color:DarkSlateGray;", html:"卖 1<div class='xflagsSmall xflagsSmall-Gold' style='vertical-align:middle;' />"}).appendTo(sellGold);
        for (var i=0; i<topCountryIds.length; ++i) {
            var countryId = topCountryIds[i];

            var cell = flagCell.clone().text("").insertAfter(flagCell);
            //$("<div>", {class:"flags-small " + countryInfo[countryId].flagName, style:"vertical-align:middle;"}).appendTo(cell);
            $("<div>", {class:"xflagsSmall xflagsSmall-" + countryInfo[countryId].flagName, style:"vertical-align:middle;"}).appendTo(cell);

            cell = buyGoldCell.clone().text("").insertAfter(buyGoldCell);
            var a = $("<a>", {href:"monetaryMarket.html?buyerCurrencyId=0&sellerCurrencyId="+countryId, text:"???"}).appendTo(cell);
            if (currencyRatio[countryId] !== undefined && currencyRatio[countryId].sell !== undefined)
                a.html(""+parseFloat(currencyRatio[countryId].sell.ratio).toFixed(2)).after($("<div>", {style:"font-size:10px;", text:epochToTime2(getEpoch() - currencyRatio[countryId].sell.date)}));

            cell = sellGoldCell.clone().text("").insertAfter(sellGoldCell);
            a = $("<a>", {href:"monetaryMarket.html?buyerCurrencyId="+countryId+"&sellerCurrencyId=0", text:"???"}).appendTo(cell);
            if (currencyRatio[countryId] !== undefined && currencyRatio[countryId].buy !== undefined)
                a.html(""+parseFloat(currencyRatio[countryId].buy.ratio).toFixed(2)).after($("<div>", {style:"font-size:10px;", text:epochToTime2(getEpoch() - currencyRatio[countryId].buy.date)}));
        }

        // 更新全部汇率的按钮
        var button = $("#fetchCurrencyScan");
        button.click(function() {
            //var n = $("a", table).length;
            var n = $("a", $("#Eh2CurrencyRatios")).length;
            $(this).attr("disabled", true).text("剩余" + n + "个");

            //$("a", table).each(function() {
            $("a", $("#Eh2CurrencyRatios")).each(function() {
                $.ajax({
                    url: $(this).attr("href"),
                    success: function(data) {
                        if ( $(".time", data).length !== 2) {
                            console.log("汇率抓取错误，重新抓取");
                            $.ajax(this);
                            return;
                        }
                        updateCurrencyRatio(data);
                        button.text("剩余" + (--n) + "个");
                        if (n === 0) {
                            $("#fetchCurrencyScan").text("扫描完成");
                            showTopCountryCurrencyRatios();
                        }
                    },
                    error: function(xhr,textStatus){
                        console.log("抓取错误 (", textStatus, ")，重新抓取");
                        $.ajax(this);
                    },
                });

            });
        });
    }

    // 2017.8.18 更新：添加清空和锁定favoriteCountries功能
    table = $("<table>", {style:"width:100%; text-align:left;"}).insertBefore($("#Eh2Config"));
    tr = $("<tr>", {style:"background-color:DarkSlateGray;line-height:30px;"}).appendTo(table);
    td = $("<td>", {id:"FavoriteCountriesConfig"}).appendTo(tr);
    var clearFavoriteCountries = $('<button>', {id:'clearFavoriteCountries', class:"foundation-style", style:"padding:5px; margin:5px", text:'清空国旗选择列'}).appendTo(td);
    //清空后如果立即选择国家则不会生效（数据被重写）
    clearFavoriteCountries.click(function() {$(this).attr("disabled", true); localStorage.removeItem("favoriteCountries");});
    var lockFavoriteCountries = $('<input>', {type:'checkbox', style:"vertical-align:5px;", id:'lockFavoriteCountries', text:'锁定国旗选择列'}).appendTo(td);
    var lockFavoriteCountriesLabel = $("<label>", {class:"checkboxlabel", for:"lockFavoriteCountries", text:'锁定国旗选择列'}).appendTo(td);
    var lockFavoriteCountriesSettings = localStorage.getItem("lockFavoriteCountries");
    if (lockFavoriteCountriesSettings == null)
    {
        localStorage.setItem("lockFavoriteCountries", "false");
    }
    else
    {
        $('#lockFavoriteCountries').attr("checked", lockFavoriteCountriesSettings == "true");
    }
    lockFavoriteCountries.click(function() {
        if ($('#lockFavoriteCountries').is(':checked'))
        {
            localStorage.setItem("lockFavoriteCountries", true);
        }
        else
        {
            localStorage.setItem("lockFavoriteCountries", false);
        }
    });

    // 2017.9.9 更新：下移战场功能显示界面div的功能
    table = $("<table>", {style:"width:100%; text-align:left;"}).insertBefore($("#Eh2Config"));
    tr = $("<tr>", {style:"background-color:DarkSlateGray;line-height:40px;"}).appendTo(table);
    td = $("<td>", {id:"BattleEnhanceDivPlacementConfig"}).appendTo(tr);
    var battleEnhanceDivPlacement = $('<input>', {type:'checkbox', style:"vertical-align:5px;", id:'battleEnhanceDivPlacement', text:'战场界面功能框下移'}).appendTo(td);
    var battleEnhanceDivPlacementLabel = $("<label>", {class:"checkboxlabel", for:"battleEnhanceDivPlacement", text:'战场界面功能框下移'}).appendTo(td);
    var battleEnhanceDivPlacementSettings = localStorage.getItem("battleEnhanceDivPlacement");
    if (battleEnhanceDivPlacementSettings == null)
    {
        localStorage.setItem("battleEnhanceDivPlacement", "false");
    }
    else
    {
        $('#battleEnhanceDivPlacement').attr("checked", battleEnhanceDivPlacementSettings == "true");
    }
    battleEnhanceDivPlacement.click(function() {
        if ($('#battleEnhanceDivPlacement').is(':checked'))
        {
            localStorage.setItem("battleEnhanceDivPlacement", true);
        }
        else
        {
            localStorage.setItem("battleEnhanceDivPlacement", false);
        }
    });

    //2017.9.17 更新：语音闹钟
    td = $("<td>", {id:"BattleEnhanceAlarmConfig"}).appendTo(tr);
    var alarmPlayAudio = $('<input>', {type:'checkbox', style:"vertical-align:5px;", id:'alarmPlayAudio', text:'闹钟播放音效'}).appendTo(td);
    var alarmPlayAudioLabel = $("<label>", {class:"checkboxlabel", for:"alarmPlayAudio", text:'闹钟播放音效 地址：'}).appendTo(td);
    var alarmPlayAudioUrl = $("<input>", {type:"text", style:"vertical-align:5px;", id:'alarmPlayAudioUrl', text:'https://puu.sh/xBzeD/3ef3f6a66e.wav'}).appendTo(td);
    var alarmPlayAudioSettings = localStorage.getItem("alarmPlayAudio");
    if (alarmPlayAudioSettings == null)
    {
        localStorage.setItem("alarmPlayAudio", "false");
    }
    else
    {
        $('#alarmPlayAudio').attr("checked", alarmPlayAudioSettings == "true");
    }
    var alarmPlayAudioUrlSettings = localStorage.getItem("alarmPlayAudioUrl");
    if (alarmPlayAudioUrlSettings == null || alarmPlayAudioUrlSettings == "")
    {
        localStorage.setItem("alarmPlayAudioUrl", "https://puu.sh/xBzeD/3ef3f6a66e.wav");
        alarmPlayAudioUrl.val("https://puu.sh/xBzeD/3ef3f6a66e.wav")
    }
    else
    {
        $('#alarmPlayAudioUrl').val(alarmPlayAudioUrlSettings);
    }
    alarmPlayAudio.click(function() {
        if ($('#alarmPlayAudio').is(':checked'))
        {
            localStorage.setItem("alarmPlayAudio", true);
        }
        else
        {
            localStorage.setItem("alarmPlayAudio", false);
        }
    });
    alarmPlayAudioUrl.focus(function() {
        alarmPlayAudioUrl.css("background-color","#FFFFFF");
    });

    alarmPlayAudioUrl.blur(function() {
        if ($('#alarmPlayAudio').is(':checked'))
        {
            alarmPlayAudioUrl.css("background-color","#79FF79");
        }
        //保存文本框内容
        localStorage.setItem("alarmPlayAudioUrl", alarmPlayAudioUrl.val() );
    });





    return;
}

//2017.8.6 更新：在货币市场的玩家名称前面显示国籍
function ShowPlayerCitizenship()
{
    var mmTable = $('table.dataTable:first');
    var divList = $("<div class='testDivblue'></div>");
    mmTable.before(divList);
    var table = $("<table></table>");
    divList.append(table);
    var btnGetCitizenship = $("<input type='button' id='gcbtn' value='检查卖家国籍'></input> ");
    table.append(btnGetCitizenship);
    table.append("检查需要等待一段时间");
    $('#gcbtn').click(function () {
        var playersA = $('a.profileLink');
        for (var i=1;i<playersA.length;i++) //playersA[0]为页面右上角的玩家自己
        {
            var playerID = $(playersA[i]).attr("href").split('=')[1];
            var playerCitizenship;
            $.ajax({
                url: "apiCitizenById.html?id="+playerID,
                async : false,
                success: function(data) {
                    var info = JSON.parse(data);
                    //playerCitizenship = info.citizenship;
                    playerCitizenship = info.citizenshipId;
                },
                error: function(xhr,textStatus){
                    console.log("用户", playerID, "API抓取错误 (", textStatus, ")，重新抓取");
                    $.ajax(this);
                },
            });
            //var flag = $("<div>", {class:"flags-small "+playerCitizenship, style:"vertical-align:middle;"}).insertBefore(playersA[i]);
            var flag = $("<div>", {class:"xflagsSmall xflagsSmall-"+countryInfo[playerCitizenship].flagName, style:"vertical-align:middle;"}).insertBefore(playersA[i]);
        }
    });
}

//2017.8.8 更新：获取网址参数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//2017.8.8 更新：将updateBuffTime和enhanceEquipment功能移至enhanceStorage，并增加启动按钮
function enhanceStorage()
{
    var storageType = GetQueryString("storageType");

    if (storageType == "EQUIPMENT")
    {
        var eqTable = $('div#equipmentTable');
        var btnEnhanceEQ = $("<input type='button' id='eeqbtn' value='自定义拍卖'></input> ");
        eqTable.before(btnEnhanceEQ);

        $('#eeqbtn').click(function () {
            enhanceEquipment();
            $('#eeqbtn').attr({disabled:true});
        });
    }
    else if (storageType == "SPECIAL_ITEM")
    {
        updateBuffTime();
    }
}

//2017.8.8 更新：将enhanceMilitaryUnitStatistics功能移至enhanceStatistics
function enhanceStatistics()
{
    var selectedSite = GetQueryString("selectedSite");

    if (selectedSite == "MILITARY_UNIT")
    {
        enhanceMilitaryUnitStatistics();
    }
}

// 抓取国家和地图信息，并构造countryIds, countryInfo, regionInfo, muInfo 等全局变量
function fetchMap() {
    countryIds = JSON.parse(localStorage.getItem("countryIds"));
    countryInfo = JSON.parse(localStorage.getItem("countryInfo"));
    regionInfo = JSON.parse(localStorage.getItem("regionInfo"));
    muInfo = JSON.parse(localStorage.getItem("muInfo")) || {};

    var htmls = [["apiCountries.html", 3600*24], 
                 ["apiRegions.html", 3600*24], 
                 ["apiMap.html", 600]
                ];

    var waitingNumber = htmls.length;
    for (var i = 0; i < htmls.length; ++i) {
        var name = htmls[i][0];
        var seconds = htmls[i][1];
        var date = localStorage.getItem(name+".date");
        if (isEpochOutdated(date, seconds)) {
            //console.log(name, "需要更新");
            fetchOneMap(name);
        }
        else {
            waitingNumber --;
        }
    }

    function fetchOneMap(name) {
        $.ajax({
            url: name,
            success: function(data) {
                localStorage.setItem(name, data);
                localStorage.setItem(name + ".date", getEpoch());
                console.log(name, "抓取成功");
                if (--waitingNumber === 0)
                    mergeMap();
            },
            error: function(xhr,textStatus){
                console.log(name, "抓取错误 (", textStatus, ")，重新抓取", name);
                $.ajax(this);
            },
        });
    }

    function mergeMap() {
        // 国家信息，可用id，name，shortName，flagName, currencyName索引，名字仅限英文
        countryInfo = {};
        countryIds = [];
        var countryInfo1 = JSON.parse(localStorage.getItem('apiCountries.html'));
        for (var i=0; i<countryInfo1.length; ++i) {
            var one = countryInfo1[i];
            one.flagName = one.name.replace(/ /g, '-');
            countryIds.push(one.id);
            countryInfo[one.id] = one;
            countryInfo[one.name] = one;
            countryInfo[one.shortName] = one;
            countryInfo[one.flagName] = one;
            countryInfo[one.currencyName] = one;
        }

        // 地区信息，可用id索引
        regionInfo = [];
        var regionInfo1 = JSON.parse(localStorage.getItem('apiMap.html'));
        var regionInfo2 = JSON.parse(localStorage.getItem('apiRegions.html'));
        for (i=0; i<regionInfo1.length; ++i) {
            regionInfo[regionInfo1[i].regionId] = regionInfo1[i];
        }
        for (i=0; i<regionInfo2.length; ++i) {
            var id = regionInfo2[i].id;
            for (var attrname in regionInfo2[i]) 
                regionInfo[id][attrname] = regionInfo2[i][attrname]; 
        }

        // 地区信息，可用id，name索引，名字仅限英文
        var regionInfoPlus = {};
        for (var i=0; i<regionInfo.length; ++i) {
            var one = regionInfo[i];
            if (one) {
                regionInfoPlus[one.id] = one;
                regionInfoPlus[one.name] = one;
            }
        }

        localStorage.setItem("countryIds", JSON.stringify(countryIds));
        localStorage.setItem("countryInfo", JSON.stringify(countryInfo));
        localStorage.setItem("regionInfo", JSON.stringify(regionInfoPlus));
        console.log("国家和地图信息已更新");
    }
}

// 抓取用户（我）的id，并创建全局变量citizenInfo
function fetchMe() {
    var profileLink = $("a[href^='profile.html']", $("#userAvatar")).attr("href");
    userId = parseInt(profileLink.replace("profile.html?id=", ""));

    citizenInfo = JSON.parse(localStorage.getItem("citizenInfo"));
    if (citizenInfo === null)
        citizenInfo = {};
    citizenPage = JSON.parse(localStorage.getItem("citizenPage"));
    if (citizenPage === null)
        citizenPage = {};

    fetchAndUpdateOneCitizenInfo(userId);
    fetchAndUpdateOneCitizenPage(userId);
}

// 更新一个玩家的Info
function UpdateOneCitizenInfo(info, saveToLocalStorage) {
    if (config.fetchCitizenDisabled && info.id !== userId) 
        return; // 禁用玩家信息，且玩家不是自己，则退出
    if (saveToLocalStorage === undefined)
        saveToLocalStorage = true; // 默认存入localStorage

    console.log("玩家", info.id, "(", info.login, ") API已更新");
    setUpdatedDate(info);
    citizenInfo[info.id] = info;
    if (saveToLocalStorage)
        localStorage.setItem("citizenInfo", JSON.stringify(citizenInfo));
}

// 用API抓取并更新一个玩家的Info
function fetchAndUpdateOneCitizenInfo(citizenId, saveToLocalStorage) {
    if (config.fetchCitizenDisabled && citizenId !== userId) 
        return; // 禁用玩家信息，且玩家不是自己，则退出
    var oldinfo = citizenInfo[citizenId];
    if (oldinfo !== undefined && !isObjectOutdated(oldinfo, 600))
        return;

    // 使用API抓取信息
    $.ajax({
        url: "apiCitizenById.html?id="+citizenId,
        success: function(data) {
            var info = JSON.parse(data);
            UpdateOneCitizenInfo(info, saveToLocalStorage);
        },
        error: function(xhr,textStatus){
            console.log("用户", citizenId, "API抓取错误 (", textStatus, ")，重新抓取");
            $.ajax(this);
        },
    });
}

// 更新一个玩家的profile页面上的信息
function updateOneCitizenPage(citizenId, html, saveToLocalStorage) {
    if (config.fetchCitizenDisabled && citizenId !== userId) 
        return; // 禁用玩家信息，且玩家不是自己，则退出
    if ($("#indexShortcut", html).length === 0)
        return;
    if (saveToLocalStorage === undefined)
        saveToLocalStorage = true;

    console.log("玩家", citizenId, "(", $("h2:first", html).text(), ")页面已更新");
    page = citizenPage[citizenId];
    if (page === undefined)
        page = {};

    // 抓取头像
    page.avatar = $(".bigAvatar", html).attr("src").trim();

    // 抓取会员
    page.premium = $("img[src$='star_32.png']", html).length == 1;

    // 抓取buff和debuff图标
    page.buffIcons = [];
    $("img[src$='_positive.png']", html).each(function() { page.buffIcons.push($(this).attr("src")); });
    page.debuffIcons = [];
    $("img[src$='_negative.png']", html).each(function() { page.debuffIcons.push($(this).attr("src")); });

    // 抓取buff和debuff
    var now = getEpoch();
    var buffs = ["steroids", "tank", "bunker", "resistance"];
    for (var i=0; i<buffs.length; ++i) {
        if ($("img[src$='"+buffs[i]+"_positive.png']", html).length == 1) {// 有buff，则开buff时间一定在之前24小时内
            updateBuffTime(buffs[i], now-24*3600*1000, now);
        }
        else if ($("img[src$='"+buffs[i]+"_negative.png']", html).length == 1) {// 有debuff
            if (page.premium)
                updateBuffTime(buffs[i], now-48*3600*1000, now-24*3600*1000); // 会员最早2天前开buff，现在马上debuff结束；最晚1天前开buff，现在debuff刚开始
            else 
                updateBuffTime(buffs[i], now-72*3600*1000, now-24*3600*1000); // 非会员最早3天前开buff，现在马上debuff结束；最晚1天前开buff，现在debuff刚开始
        }
        else { // 没buff也没debuff，那开buff时间一定在当前时间之后
            page[buffs[i]] = [now, now+1000*24*3600*1000];
        }
    }

    function updateBuffTime(name, early2, late2) {
        if (page[name] === undefined) {// 从没有记录
            page[name] = [early2, late2]; // 记录开buff的最早和最晚时间
        }
        else { // 记录过开buff时间范围
            var early = page[name][0] > early2 ? page[name][0] : early2; // 两个最早开buff的时间，选晚的
            var late = page[name][1] < late2 ? page[name][1] : late2; // 两个最晚可能开buff的时间，选早的

            if (early > late) { // 交集为空，说明之前记录的是上次开buff的信息
                page[name] = [early2, late2]; // 记录开buff的最早和最晚时间
            }
            else { // 有交集，则记录交集
                page[name] = [early, late]; // 更新这次开buff的最晚时间
            }
        }
    }

    // 抓取装备
    // 2017.8.13 更新：当前任务奖励装备时会抓取出错，需要判断
    var tmp = [];
    $(".equipmentBack", html).each(function() {
        if ($(this).attr("class").indexOf("rewardEQ") < 0)
        {
            tmp.push($(this).attr("class").split(" ").pop());
        }
    });
    page.equipments = tmp;

    // 抓取伤害
    page.lowHit = parseInt($("#hitHelp b:first", html).text().replace(",", ""));
    page.highHit = parseInt($("#hitHelp b:last", html).text().replace(",", ""));
    page.critical = parseFloat($("#criticalHelp", html).text().trim().split(" ")[0]);
    page.miss = parseFloat($("#missHelp", html).text().trim().split(" ")[0]);
    page.avoid = parseFloat($("#avoidHelp", html).text().trim().split(" ")[0]);
    page.power = parseInt((page.lowHit+page.highHit)/2*(1-page.miss/100)*(1+page.critical/100)/(1-page.avoid/100)*37*5*1.2*1.2*1.2);

    setUpdatedDate(page);
    citizenPage[citizenId] = page;
    if (saveToLocalStorage) {
        localStorage.setItem("citizenPage", JSON.stringify(citizenPage));
    }
}

// 抓取并更新一个玩家profile页面上的信息
function fetchAndUpdateOneCitizenPage(citizenId, saveToLocalStorage, callback) {
    if (config.fetchCitizenDisabled && citizenId !== userId) 
        return; // 禁用玩家信息，且玩家不是自己，则退出
    var oldPage = citizenPage[citizenId];
    if (oldPage !== undefined && !isObjectOutdated(oldPage, 600)) {
        if (typeof(callback) === 'function')
            callback();
        return;
    }

    // 抓取玩家的profile页面
    $.ajax({
        url: "profile.html?id="+citizenId,
        success: function(data) {
            updateOneCitizenPage(citizenId, data, saveToLocalStorage);
            if (typeof(callback) === 'function')
                callback();
        },
        error: function(xhr,textStatus){
            var t = (citizenId % 10)*0.5 + 1;
            var that = this;
            console.log("用户", citizenId, "页面抓取错误 (", textStatus, ")，", t, "秒后重新抓取");
            setTimeout(function() {$.ajax(that);}, t*1000);
        },
    });
}



// 更新一个军团里所有玩家的Info
function getMuMemberInfo(muId, callback) {
    if (! muInfo[muId])
        muInfo[muId] = {};
    var mi = muInfo[muId];

    if (isObjectOutdated(mi.member, 48*3600)) {
        $.ajax({
            url: 'apiMilitaryUnitMembers.html?id=' + muId, 
            success: function(data) {
                //console.log("军团", muId, "的成员API抓取完毕");
                var cis = JSON.parse(data);
                for (var i=0; i<cis.length; ++i)
                    UpdateOneCitizenInfo(cis[i], false);
                mi.member = {};
                setUpdatedDate(mi.member);
                localStorage.setItem("citizenInfo", JSON.stringify(citizenInfo));
                localStorage.setItem("muInfo", JSON.stringify(muInfo));
                if (typeof(callback) === 'function')
                    callback();
            },
            error: function(xhr,textStatus){
                var t = (muId % 10)*0.5 + 1;
                var that = this;
                console.log("军团", muId, "的成员API抓取错误 (", textStatus, ")，", t, "秒后重新抓取");
                setTimeout(function() {$.ajax(that);}, t*1000);
            }
        });
    }
    else {
        console.log("军团", muId, "的成员API无需抓取");
        if (typeof(callback) === 'function')
            callback();
    }
}



// 给profile页面上的buff标记时间
function enhanceProfile(citizenId) {
    if (config.fetchCitizenDisabled && citizenId !== userId) 
        return; // 禁用玩家信息，且玩家不是自己，则退出
    var now = getEpoch();

    $("img[src$='_positive.png']").after("<br>");
    $("img[src$='_negative.png']").after("<br>");

    var buffs = ["steroids", "tank", "bunker", "resistance"];
    for (var i=0; i<buffs.length; ++i) {
        var buffIcon = $("img[src$='"+buffs[i]+"_positive.png']:first")[0];
        var debuffIcon = $("img[src$='"+buffs[i]+"_negative.png']:first")[0];
        var buffTime = citizenPage[citizenId][buffs[i]];

        if (buffIcon) {// 有buff
            var min = buffTime[0] + 24*3600*1000 - now;
            var max = buffTime[1] + 24*3600*1000 - now;
            if ( (max-min) < 60*1000 )
                $("<b>", {text:epochToTime(min)}).insertAfter(buffIcon); // 时间接近，只输出短的
            else
                $("<b>", {text:epochToTime(min) + " - " + epochToTime(max)}).insertAfter(buffIcon);
        }
        else if (debuffIcon) {// 有debuff
            var min = buffTime[0] + 48*3600*1000 - now;
            var max = buffTime[1] + 48*3600*1000 - now;
            if (! citizenPage[citizenId].premium) {
                min += 24*3600*1000;
                max += 24*3600*1000;
            }
            if ( (max-min) < 60*1000 )
                $("<b>", {text:epochToTime(max)}).insertAfter(debuffIcon); // 时间接近，只输出长的
            else
                $("<b>", {text:epochToTime(min) + " - " + epochToTime(max)}).insertAfter(debuffIcon);
        }
        else { // 没buff也没debuff
        }
    }
}


// 读取使用buff的时间
function updateBuffTime() {
    var timeStringPair = $(".time:first").text().trim().split(", ");
    var stringEpochNow = getEpochFromString(timeStringPair[1], timeStringPair[0]);
    var buffs = ["steroids", "tank", "bunker", "resistance"];
    var premium = $("#userAvatar span.premiumStar").length === 1;

    $('.specialItemInventory').each(function() {
        var item = $(this);
        var timeLabel = $('strong', item);
        if (timeLabel.length === 0) // 无时间标签
            return;

        // 计算并显示剩余时间
        timeStringPair = timeLabel.text().split(" ");
        var stringEpoch = getEpochFromString(timeStringPair[0], timeStringPair[1]);
        var timeString = epochToTime(stringEpoch - stringEpochNow);
        timeLabel.append(" (" + timeString + ")");

        // 记录开buff时间
        var imgSrc = $("img:first", item).attr("src");
        for (var i=0; i<buffs.length; ++i) {
            if (imgSrc.indexOf(buffs[i]) >= 0) {
                var activateEpoch = getEpoch() + stringEpoch - stringEpochNow - 48*3600*1000;
                if (!premium)
                    activateEpoch -= 24*3600*1000;
                citizenPage[userId][buffs[i]] = [activateEpoch, activateEpoch+1];
                localStorage.setItem("citizenPage", JSON.stringify(citizenPage));
            }
        }

    });
}



//////////////////////////////////////////////////////////////////////////////////////////













// 为国家或货币的select增加快捷方式
function enhanceCountrySelect() {
    $("select").each(function() {
        var select = $(this);
        var options = $("option", select);
        // select中的option数量够吗？
        if (options.length < countryIds.length-3)
            return;
        // select中的option的value都是国家id？
        var hasZero = false;
        var hasN1 = false;
        var isCurrency = true;
        for (var i=0; i<options.length; ++i) {
            var countryId = parseInt(options.eq(i).val());
            if (countryId === 0) {
                hasZero = true;
                continue;
            }
            else if (countryId === -1) {
                hasN1 = true;
                continue;
            }
            else if (countryId < -1) {
                return;
            }
            else if ($.inArray(countryId, countryIds)===-1) { // id大于0但却不在countryId中
                return;
            }
            else {
                if (options.eq(i).text().indexOf(countryInfo[countryId].currencyName) === -1) {// 选项文本中不包含货币名
                    isCurrency = false;
                }
            }
        }

        var submit = $("~ input[type='submit']", select);
        // 为这个select添加快捷方式（一列国旗）
        // 2017.8.26 更新：国旗样式改变
        select.after("<br />");
        var favoriteCountries = JSON.parse(localStorage.getItem("favoriteCountries"));
        if (favoriteCountries === null)
            favoriteCountries = [28];
        $.each(favoriteCountries, function(index, countryId) {
            if (!countryInfo[countryId])
                return;
            //var flag = $('<div>', {class:(isCurrency?"flags-small ":"flags-medium ") + countryInfo[countryId].flagName, style:"vertical-align:middle;", value:countryId, title:countryInfo[countryId].countryName}).insertAfter(select);
            var flag = $('<div>', {class:(isCurrency?"xflagsSmall xflagsSmall-":"xflagsMedium xflagsMedium-") + countryInfo[countryId].flagName, style:"vertical-align:middle;", value:countryId, title:countryInfo[countryId].name}).insertAfter(select);
            flag.click(function() {
                select.val($(this).val());
                if (submit.length === 1) {
                    submit.click();
                }
            });
        });

        // 添加全世界
        if (!isCurrency && ((hasZero&&!hasN1) || (!hasZero&&hasN1))  ) {
            //var flag = $('<div>', {class:"flags-medium Adminland", style:"vertical-align:middle;", title:"全世界"}).insertAfter(select);
           var flag = $('<div>', {class:" xflagsMedium xflagsMedium-Adminland", style:"vertical-align:middle;", title:"全世界"}).insertAfter(select);
            flag.click(function() {
                select.val(hasZero?0:-1);
                if (submit.length === 1) {
                    submit.click();
                }
            });
        }

        // 添加黄金
        if (hasZero && isCurrency) {
            //var flag = $("<div>", {class:"flags-small Gold", style:"vertical-align:middle;"}).insertAfter(select);
            var flag = $("<div>", {class:"xflagsSmall xflagsSmall-Gold", style:"vertical-align:middle;"}).insertAfter(select);
            flag.click(function() {
                select.val(0);
                if (submit.length === 1) {
                    submit.click();
                }
            });
        }

        // 收集国家id
        if (submit.length === 1) { // 识别到了submit按钮
            submit.click(function() {
                addToFavoriteCountries(parseInt(select.val()));
            });
        }
        else { // 没识别到submit按钮
            select.change(function() {
                addToFavoriteCountries(parseInt(select.val()));
            });
        }

        // 添加国家id的内部函数
        // 2017.8.18 更新：添加锁定favoriteCountries功能
        function addToFavoriteCountries(newCountryId) {
            var lfcs = localStorage.getItem("lockFavoriteCountries");
            if (lfcs == null || lfcs != "true")
            {
                if (newCountryId > 0) {
                    var index = $.inArray(newCountryId, favoriteCountries);
                    if (index > -1) {
                        favoriteCountries.splice(index, 1);
                    }
                    favoriteCountries.push(newCountryId);
                }
                localStorage.setItem("favoriteCountries", JSON.stringify(favoriteCountries.slice(-9)));
            }
        }


    });
}

function enhanceQuickButton() {
    var li = $("#editCitizenId").parent();

    //var fightForHomeland = li.clone().insertAfter(li);
    //$("a", fightForHomeland).attr({href:"battles.html?countryId="+allies[0], id:"fightForHomeland", title:"查看" + countryInfo[allies[0]].name + "的战场"});
    //$("i", fightForHomeland).attr("class", "icon-fightIcon");


    var citizenNumber = JSON.parse(localStorage.getItem("citizenNumber"));
    if (citizenNumber === null || isObjectOutdated(citizenNumber, 24*3600)) {
        $.ajax({
            url: "militaryUnitStorage.html",
            success: function(data) {
                citizenNumber = getCitizenNumber(data);
                console.log("团员编号为", citizenNumber);
                addMuStorage(citizenNumber);
            },
            error: function(xhr, textStatus){
                console.log("抓取团员编号时发生错误 (", textStatus, ")，重新尝试");
                $.ajax(this);
            }
        });
    }
    else {
        addMuStorage(citizenNumber.cn);
    }

    function addMuStorage(citizenNumber) {
        if (citizenNumber === "disabled")
            return;

        // 食物礼物额度和数量
        var foodLimit = 0;
        var giftLimit = 0;

        if ($("#foodLimit").length == 1) { // 左侧有吃食物礼物的按钮
            foodLimit = parseInt($("#foodLimit").text());
            giftLimit = parseInt($("#giftLimit").text());
        }
        else {
            foodLimit = parseInt($("#foodLimit2").text());
            giftLimit = parseInt($("#giftLimit2").text());
        }

        //2017.8.8更新：去除不兼容的搬仓功能，添加从仓库获取物资个数的功能
        var items = [
            ["bread", "Food", 5, "5-FOOD", "Q5食物", false, 50, 50],
            ["gift", "Gift", 5, "5-GIFT", "Q5礼物", false, 50, 50],
            ["tank", "Weapon", 5, "5-WEAPON", "Q5武器", false, 250, 250],
            ["ticket ", "Ticket", 5, "5-TICKET", "Q5机票", false, 10, 10],
            ["bread", "Food", 3, "3-FOOD", "Q3食物", false, 10, 10],
            ["gift", "Gift", 3, "3-GIFT", "Q3礼物", false, 10, 10],
            ["tank", "Weapon", 1, "1-WEAPON", "Q1武器", false, 250, 250],
            ["ticket ", "Ticket", 1, "1-TICKET", "Q1机票", false, 10, 10]
        ];

        //在按钮外做一层ul，为了可以在获取仓库后直接全清并重做按钮
        var storageTable = $('<ul id="storageTable" class="button foundation-center foundation-style-group"></ul>');
        li.parent().after(storageTable);

        $.each(items, function(index, item) {
            var sli = $("<li></li>");
            var muStorage = $("#storageTable").append(sli);
            var borderColor = item[5] ? "red;" : "black;";
            var number = item[5] ? item[6] : item[7];
            var button = $("<button>", {id:"send" + item[3], style:"width:41px; margin:1px; border-color:" + borderColor, class:"button foundation-style smallhelp only-icon profileButton", title:"从军团仓库取" + number + "个" + item[4] + (item[5] ? ', 补足2天的用量' : '')}).appendTo(sli);
            var icon = $('<img>', {src:'//cdn.e-sim.org/img/productIcons/' + item[1] + '.png', style:"width:28px; height:28px;"}).appendTo(button);
            button.append($('<br />'));
            var q = $('<img>', {src:'//cdn.e-sim.org/img/productIcons/q' + item[2] + '.png', style:"width:28px;"}).appendTo(button);

            button.click(function() {
                button.attr({disabled:true});

                var dataObj = {
                    product: item[3],
                    quantity: number,
                    reason: " ",
                };
                dataObj[citizenNumber] = userId;

                $.ajax({
                    url: "militaryUnitStorage.html",
                    type: 'POST',
                    data: dataObj,
                    success: function(data) {
                        console.log("已从军团仓库取了" + number + "个" + item[4]);
                        button.attr({disabled:false});
                    },
                    error: function(xhr, textStatus){
                        console.log("从军团仓库取" + number + "个" + item[4] + "时发生错误 (", textStatus, ")，重新尝试");
                        $.ajax(this);
                    }
                });
            });
        });

        //增加按钮
        var btnGetStorageNumber = $("<input type='button' id='gsnbtn' value='获取仓库物资数目'></input> ");
        li.parent().after(btnGetStorageNumber);
        btnGetStorageNumber.click(function () {
            //btnGetStorageNumber.attr({disabled:true});
            //btnGetStorageNumber.attr({style:"display:none;"});
            getStorageNumber(citizenNumber);
        });

        //获取仓库中物资数量，并重置按钮
        function getStorageNumber(citizenNumber)
        {
            $.ajax({
                url: "storage.html?storageType=PRODUCT",
                //async : false,
                success: function(data) {
                    var storageItems = $("div.storage", data);
                    var foodNumber = [0,0,0,0,0,0];//以1为始
                    var giftNumber = [0,0,0,0,0,0];
                    var weaponNumber = [0,0,0,0,0,0];
                    var ticketNumber = [0,0,0,0,0,0];
                    for (var i=0; i<storageItems.length; i++) {
                        var siNumber;
                        var siQuality;
                        var siType;
                        siNumber = parseInt("0"+storageItems[i].children[0].innerText.trim());
                        var si = $(storageItems[i]).children()[1];
                        siType = $(si.children[0]).attr("src").split("/")[6];//Weapon.png
                        siQuality = $(si.children[1]).attr("src");
                        if (siQuality != null)
                        {
                            siQuality = siQuality.split("/")[6];//q1.png
                        }
                        else
                        {
                            continue;//原料
                        }
                        //请熟悉多维数组的帮忙优化一下吧
                        if (siType == "Food.png")
                        {
                            if (siQuality == "q1.png") {foodNumber[1] = siNumber; continue;}
                            if (siQuality == "q2.png") {foodNumber[2] = siNumber; continue;}
                            if (siQuality == "q3.png") {foodNumber[3] = siNumber; continue;}
                            if (siQuality == "q4.png") {foodNumber[4] = siNumber; continue;}
                            if (siQuality == "q5.png") {foodNumber[5] = siNumber; continue;}
                        }
                        else if (siType == "Gift.png")
                        {
                            if (siQuality == "q1.png") {giftNumber[1] = siNumber; continue;}
                            if (siQuality == "q2.png") {giftNumber[2] = siNumber; continue;}
                            if (siQuality == "q3.png") {giftNumber[3] = siNumber; continue;}
                            if (siQuality == "q4.png") {giftNumber[4] = siNumber; continue;}
                            if (siQuality == "q5.png") {giftNumber[5] = siNumber; continue;}
                        }
                        else if (siType == "Weapon.png")
                        {
                            if (siQuality == "q1.png") {weaponNumber[1] = siNumber; continue;}
                            if (siQuality == "q2.png") {weaponNumber[2] = siNumber; continue;}
                            if (siQuality == "q3.png") {weaponNumber[3] = siNumber; continue;}
                            if (siQuality == "q4.png") {weaponNumber[4] = siNumber; continue;}
                            if (siQuality == "q5.png") {weaponNumber[5] = siNumber; continue;}
                        }
                        else if (siType == "Ticket.png")
                        {
                            if (siQuality == "q1.png") {ticketNumber[1] = siNumber; continue;}
                            if (siQuality == "q2.png") {ticketNumber[2] = siNumber; continue;}
                            if (siQuality == "q3.png") {ticketNumber[3] = siNumber; continue;}
                            if (siQuality == "q4.png") {ticketNumber[4] = siNumber; continue;}
                            if (siQuality == "q5.png") {ticketNumber[5] = siNumber; continue;}
                        }
                        else
                        {
                            continue;
                        }
                    }
                    var targetWeaponNumber = parseInt((foodLimit+giftLimit+40) * 5 * 100 / (100-citizenPage[userId].avoid));

                    console.log(foodLimit, giftLimit, foodNumber, giftNumber, weaponNumber, ticketNumber, targetWeaponNumber);

                    items = [
                        ["bread", "Food", 5, "5-FOOD", "Q5食物", foodNumber[5]<foodLimit+25, foodLimit+30-foodNumber[5], 30],
                        ["gift", "Gift", 5, "5-GIFT", "Q5礼物", giftNumber[5]<giftLimit+15, giftLimit+20-giftNumber[5], 20],
                        ["tank", "Weapon", 5, "5-WEAPON", "Q5武器", weaponNumber[5]<targetWeaponNumber, targetWeaponNumber-weaponNumber[5]+30, 250],
                        ["ticket ", "Ticket", 5, "5-TICKET", "Q5机票", ticketNumber[5]<6, 10-ticketNumber[5], 10],
                        ["bread", "Food", 3, "3-FOOD", "Q3食物", foodNumber[3]<10, 10-foodNumber[3], 10],
                        ["gift", "Gift", 3, "3-GIFT", "Q3礼物", giftNumber[3]<10, 10-giftNumber[3], 10],
                        ["tank", "Weapon", 1, "1-WEAPON", "Q1武器", weaponNumber[1]<targetWeaponNumber, targetWeaponNumber-weaponNumber[1]+30, 250],
                        ["ticket ", "Ticket", 1, "1-TICKET", "Q1机票", ticketNumber[1]<6, 10-ticketNumber[1], 10]
                    ];

                    //重置搬仓按钮
                    $("ul#storageTable").html("");

                    $.each(items, function(index, item) {
                        var sli = $("<li></li>");
                        var muStorage = $("#storageTable").append(sli);
                        var borderColor = item[5] ? "red;" : "black;";
                        var number = item[5] ? item[6] : item[7];
                        var button = $("<button>", {id:"send" + item[3], style:"width:41px; margin:1px; border-color:" + borderColor, class:"button foundation-style smallhelp only-icon profileButton", title:"从军团仓库取" + number + "个" + item[4] + (item[5] ? ', 补足2天的用量' : '')}).appendTo(sli);
                        var icon = $('<img>', {src:'//cdn.e-sim.org/img/productIcons/' + item[1] + '.png', style:"width:28px; height:28px;"}).appendTo(button);
                        button.append($('<br />'));
                        var q = $('<img>', {src:'//cdn.e-sim.org/img/productIcons/q' + item[2] + '.png', style:"width:28px;"}).appendTo(button);

                        button.click(function() {
                            button.attr({disabled:true});

                            var dataObj = {
                                product: item[3],
                                quantity: number,
                                reason: " ",
                            };
                            dataObj[citizenNumber] = userId;

                            $.ajax({
                                url: "militaryUnitStorage.html",
                                type: 'POST',
                                data: dataObj,
                                success: function(data) {
                                    console.log("已从军团仓库取了" + number + "个" + item[4]);
                                    button.attr({disabled:false});
                                },
                                error: function(xhr, textStatus){
                                    console.log("从军团仓库取" + number + "个" + item[4] + "时发生错误 (", textStatus, ")，重新尝试");
                                    $.ajax(this);
                                }
                            });
                        });
                    });
                },
                error: function(xhr, textStatus){
                    console.log("获取物资时发生错误 (", textStatus, ")，重新尝试");
                    $.ajax(this);
                }
            });

        }


    }

    // 在军团仓库页面，抓取citizen后面的尾数
    function getCitizenNumber(data) {
        var input = $("input[value='" + userId + "']", data);
        var citizenNumber = {};
        //console.log(input.length, input[0]);
        if (input.length === 1)
            citizenNumber.cn = input.attr("name");
        else
            citizenNumber.cn = "disabled";

        setUpdatedDate(citizenNumber);
        localStorage.setItem("citizenNumber", JSON.stringify(citizenNumber));
        return citizenNumber.cn;
    }

}



//////////////////////////////////////////////////////////////////////////////////////////








function addBattleSearch() {
    var citizenForm = $('form[action="search.html"]:first');

    var battleForm = citizenForm.clone()
    battleForm.attr('action', 'battle.html');
    $('#searchForm', battleForm).attr({'name':'id', 'placeholder':'Find battle'});

    battleForm.insertAfter(citizenForm);
}




//////////////////////////////////////////////////////////////////////////////////////////










// 在军团工厂界面显示工作情况
function enhanceMilitaryUnitCompanies() {
    var table = $('table.dataTable:last').width('100%');
    table.parent().attr('style', 'width:98% !important;');

    // 工厂排序
    var trs = $('tr:gt(0)', table).sort(function(a, b) { return $('td:eq(1)', a).html().localeCompare($('td:eq(1)', b).html()); });
    $('tr:gt(0)', table).remove();
    var headline = $('tr', table);
    headline.after(trs);

    // 显示工厂数量
    $('td:first', headline).append(' (' + trs.length + ')');

    // “显示全部”按钮
    var buttonAll = $('<button>', {class:"foundation-style button", text:"查看全部"}).appendTo( $('<td>').appendTo(headline) );
    buttonAll.click( function() {
        buttonAll.attr('disabled', true);
        setTimeout( function() { buttonAll.attr('disabled', false); }, 10000);
        $('button[id^="ehShow"]').click();
    } );

    // “显示工作情况”按钮
    trs.each(function() {
        var tr = $(this);
        if ( parseInt($('td:eq(3)', tr).text()) === 0) { // 没工人
            tr.append($('<td>'));
            return;
        }

        var companyId = parseInt($('td:first a[href^="company.html?id="]', tr).attr('href').match(/([0-9]+)$/)[1]);
        tr.attr("id", "ehRow" + companyId);
        var button = $('<button>', {class:"foundation-style button", style:"padding:10px;", id:"ehShow" + companyId, text:"查看工作情况", target:companyId}).appendTo( $('<td>').appendTo(tr) );

        button.click(function() {
            button.attr('disabled', true);
            var companyId = button.attr('target');
            $.ajax({
                url: 'companyWorkResults.html?id=' + companyId,
                success: function(data) {
                    button.remove();
                    var result = $('table.dataTable:last', data);
                    if ($("tr", result).length === 1)
                        return;

                    var newTr = $('<tr>').insertAfter($('#ehRow'+companyId));
                    var newTd = $('<td colspan=5></td>').appendTo(newTr);
                    result.appendTo(newTd);
                },
                error: function(xhr,textStatus){
                    console.log('工厂', companyId, '抓取错误 (', textStatus, ')');
                    button.click();
                }
            }); // ajax结束
        }); // 显示工作按钮的callback结束
    }); // 每一行处理结束

}













//////////////////////////////////////////////////////////////////////////////////////////









// 在设置军令的页面，高亮祖国和盟友战场
function enhanceMyMilitaryUnit() {
    var select = $('#orderForm > select');
    if (select.length != 1)
        return;

    var substr = [];
    for (var i=0; i<allies.length; ++i) {
        substr.push("(" + countryInfo[allies[i]].shortName);
    }

    var options = $('option', select).sort(function(a, b) { return $(a).text().localeCompare($(b).text()); });
    options.each(function() {
        var option = $(this);
        for (var j=0; j<substr.length; ++j) {
            if (option.text().indexOf(substr[j]+' ') != -1) {
                if (j==0)
                    option.attr('style', 'background:pink;');
                else
                    option.attr('style', 'background:lavender;');
            }
        }
    });
    select.html(options);
}















//////////////////////////////////////////////////////////////////////////////////////////





function enhanceBattleList() {

    $("#battlesTable tr:gt(0)").each(function(index, tr) {
        if ($("div.teamBlack", tr).length > 0)
            return; // 训练场不刷新
        var timer = $("span.is-countdown", tr);
        if (timer.length !== 1)
            return; // 无倒计时的战场不刷新


        // 战场信息
        var link = $("a[href*='battle.html']", tr);
        var battleId = parseInt(link.attr("href").match(/battle\.html[?]id=([0-9]+)/)[1]);
        $(this).attr("id", "battle-" + battleId);
        var battleName = link.text();
        if ($("~ b", link).length === 1)
            battleName += "起义";
        else
            battleName += "进攻";
        var defenderName = $("div.flags-medium:first", tr).attr("class").split(" ").pop().replace(/-/g, " ");
        var attackerName = $("div.flags-medium:last", tr).attr("class").split(" ").pop().replace(/-/g, " ");
        var bar = $("div.ui-progressbar-value", tr)


        // 第一个td：墙高、双方伤害、双方BH
        var wall = $("<div>", {id:"wall" + battleId, style:"text-align:center;"}).insertAfter($("div.ui-progressbar", tr));
        var defenderBattleHero = $("<div>", {id:"defenderBattleHero" + battleId, style:"text-align:center;"}).insertAfter($("div.flags-medium:first", tr));
        var defenderScore = $("<div>", {id:"defenderScore" + battleId, style:"text-align:center;"}).insertAfter($("div.flags-medium:first", tr));
        var attackerBattleHero = $("<div>", {id:"attackerBattleHero" + battleId, style:"text-align:center;"}).insertAfter($("div.flags-medium:last", tr));
        var attackerScore = $("<div>", {id:"attackerScore" + battleId, style:"text-align:center;"}).insertAfter($("div.flags-medium:last", tr));

        // 第一个td：观战按钮
        var showSpectators = $("<div>", {id:"showSpectators" + battleId, text:"Show spectators", style:"color:#3787ea; cursor:pointer;"}).appendTo($("td:first", tr)).click(function() {spectators.children().show(); showSpectators.hide(); hideSpectators.show();}).hide();
        var hideSpectators = $("<div>", {id:"hideSpectators" + battleId, text:"Hide spectators", style:"color:#3787ea; cursor:pointer;"}).appendTo($("td:first", tr)).click(function() {spectators.children().hide(); showSpectators.show(); hideSpectators.hide();}).hide();

        // 第一个td：观战信息
        var spectators = $("<div>", {id:"spectators" + battleId, class:"battleDiv", style:"width:100%; text-align:center;"}).appendTo($("td:first", tr));
        var defenderDiv = $("<div>", {style:"width:33%; border:0; padding:0; margin:0; display:inline-block;", text:" defenders"}).appendTo(spectators);
        var totaldefenders = $("<i>", {id:"totaldefenders" + battleId, text:"0"}).prependTo(defenderDiv);
        var defendersMenu = $("<div>", {id:"defendersMenu" + battleId}).appendTo(defenderDiv);

        var spectatorDiv = $("<div>", {style:"width:34%; border:0; padding:0; margin:0; display:inline-block; text-align:center;", text:" spectators"}).appendTo(spectators);
        var totalspectators = $("<i>", {id:"totalspectators" + battleId, text:"0"}).prependTo(spectatorDiv);
        var spectatorsMenu = $("<div>", {id:"spectatorsMenu" + battleId}).appendTo(spectatorDiv);

        var attackerDiv = $("<div>", {style:"width:33%; border:0; padding:0; margin:0; display:inline-block; text-align:center;", text:" attackers"}).appendTo(spectators);
        var totalattackers = $("<i>", {id:"totalattackers" + battleId, text:"0"}).prependTo(attackerDiv);
        var attackersMenu = $("<div>", {id:"attackersMenu" + battleId}).appendTo(attackerDiv);
        spectators.children().hide();

        // 第一个td：防御设施或医院，自己的头像和伤害
        var product = $("<div>", {id:"dsOrHospital" + battleId}).appendTo(timer.parent().parent());
        var myAvatar = $("<img>", {src:$("#userAvatar img").attr("src")}).insertAfter(product).hide();
        var myDamage = $("<div>", {id:"myDamage" + battleId}).insertAfter(myAvatar);

        // 第三个td：是否显示BH

        // 最后一个td：刷新按钮、复制按钮、最后刷新
        var peekButton = $("<button>", {id:"peek" + battleId, text:"刷新", class:"foundation-style button", style:"padding:6px; margin:3px;"}).appendTo($("td:last", tr));
        var copyButton = $("<button>", {id:"copy" + battleId, text:"复制", class:"foundation-style button", style:"padding:6px; margin:3px;", title:battleName + ": " + link[0].href + "\n"}).appendTo($("td:last", tr)).hide();
        var div = $("<div>").appendTo($("td:last", tr));
        var lastPeek = $("<span>", {id:"lastPeek" + battleId}).appendTo(div);
        var lastPeekText = $("<span>", {id:"2lastPeek" + battleId, text:"秒前更新"}).hide().appendTo(div);

        // 刷新按钮的动作
        peekButton.click(function() {
            peekButton.attr("disabled", true);
            $.ajax({
                url: 'battle.html?id=' + battleId,
                success: function(data) {
                    if ( $(".time", data).length !== 2) {
                        console.log(battleId, "抓取错误，重新抓取");
                        $.ajax(this);
                        return;
                    }

                    // 更新双方伤害
                    defenderScore.text($("#defenderScore", data).text());
                    attackerScore.text($("#attackerScore", data).text());

                    // 更新墙高
                    var w = parseInt($("#defenderScore", data).text().replace(/,/g, '').replace(/\xA0/g, '')) - parseInt($("#attackerScore", data).text().replace(/,/g, '').replace(/\xA0/g, ''));
                    if (w === 0) {
                        wall.text("");
                        wall.attr("title", defenderScore === 0 ? "双方无伤害" : "双方伤害相同");
                    }
                    else if (w > 0) {
                        wall.text(">> " + w.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " >>");
                        wall.attr("title", defenderName + " 领先 " + attackerName + " " + (w/1000000).toFixed(2) + "M");
                    }
                    else {
                        wall.text("<< " + (-w).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " <<");
                        wall.attr("title", attackerName + " 领先 " + defenderName + " " + ((-w)/1000000).toFixed(2) + "M");
                    }

                    // 更新进度条
                    bar.attr("style", "width:" + $("#leftStat", data).text().replace(" ", "") + "; margin:0;");

                    // 更新双方BH
                    defenderBattleHero.html($("#topDefender1 > div", data).attr("style", "width:100%;"));
                    attackerBattleHero.html($("#topAttacker1 > div", data).attr("style", "width:100%;"));
                    if (attackerBattleHero.height() < defenderBattleHero.height())
                        attackerBattleHero.parent().height(defenderBattleHero.parent().height()); // 进攻方无BH时，控制div高度，避免观战div错位

                    // 隐藏战场补贴信息；
                    $("td:first > div:first >div:last", tr).hide();

                    // 显示防御设施或医院
                    if ($("div.product", data).length >0)
                        product.empty().append($("div.product", data));

                    // 显示自己的伤害
                    var d = $("#topPlayerHit", data).text();
                    if (d !== "0") {
                        myAvatar.show();
                        myDamage.text(d);
                    }

                    // 会员显示观战
                    if ($("#userAvatar span.premiumStar").length === 1) {
                        totaldefenders.text($("#totaldefenders", data).text());
                        defendersMenu.html($("#defendersMenu", data).html());
                        totalspectators.text($("#totalspectators", data).text());
                        spectatorsMenu.html($("#spectatorsMenu", data).html());
                        totalattackers.text($("#totalattackers", data).text());
                        attackersMenu.html($("#attackersMenu", data).html());
                        if (!hideSpectators.is(':visible'))
                            showSpectators.show();
                    }

                    // 更新时间
                    lastPeek.text("0");
                    lastPeekText.show();
                    peekButton.attr("disabled", false);
                    copyButton.show();
                },
                error: function(xhr,textStatus){
                    console.log("战场", battleId, "抓取错误 (", textStatus, ")");
                    $.ajax(this);
                }
            });
        });

        // 复制按钮的动作
        copyButton.click(function() {
            GM_setClipboard(copyButton.attr("title") + timer.text() + ", " + wall.attr("title") + " (" + div.text() +")");
        });
    });

    // 每秒刷新一次“x秒前更新”
    setInterval(function() {
        $("span[id^='lastPeek']").each(function() {
            var t = parseInt($(this).text());
            if (!isNaN(t))
                $(this).text(t+1);
        });
    }, 1000);

    // 在最后一个td添加按钮，用来刷新全部战场
    var peekAll = $("<button>", {text:"刷新全部", class:"foundation-style button", style:"padding:5px; margin:5px;"}).appendTo($("#battlesTable tr:first td:last").empty());
    peekAll.click(function() {
        peekAll.attr("disabled", true);
        $("#battlesTable tr:gt(0) button[id^='peek']").click();
        setTimeout(function() { 
            peekAll.attr('disabled', false); 
        }, 10000);
    });

    // 在第一个td添加按钮，用来给战场排序
    var sortAll = $("<button>", {text:"按结束时间排序", class:"foundation-style button"}).appendTo($("#battlesTable tr:first td:first").empty());
    sortAll.click(function() {
        sortAll.attr("disabled", true);

        // 获取战场倒计时
        var keys = [];
        $("#battlesTable tr:gt(0)").each(function(index, tr) {
            var timer = $("span.is-countdown", tr);
            if (timer.length !== 1)
                return; // 训练场不算
            keys.push(timer.text() + " " + $(this).attr("id"));
        });

        // 根据倒计时排序tr
        keys.sort().reverse();
        $.each(keys, function(index, value) {
            var trId = value.split(" ").pop();
            $("#battlesTable #" + trId).insertAfter($("#battlesTable tr:first"));
        });

    });
}
















//////////////////////////////////////////////////////////////////////////////////////////






// 装备界面，增加拍卖选项
// 2017.8.19 更新：修复Q6拍卖问题
function enhanceEquipment() {
    var target_hour = 20;	// 可修改：在服务器时间几点结束
    var prices = [0.1, 1, 5, 12, 35, 100, 400];	// 可修改：Q1-Q7装备的起价，不考虑部位

    var hms = $(".time").first().text().split(" ")[0];
    var hour = hms.split(":")[0];
    var auction_length = target_hour>hour ? (target_hour - hour + 24) : (target_hour - hour + 48);
    console.log("距离波兰时间", target_hour, "点还有约", auction_length, "小时");
    console.log("各等级装备的起价是 ", prices);

    var lines = $(".equipmentInStorage");

    // 所有装备
    for (i=0; i<lines.length; ++i) {
        // 单件装备
        var actions = $(".equipmentActions", lines[i])[0];
        var quality = $(actions).children()[4];
        quality = $(quality).children()[0];
        var qualityText = $(quality).attr("title");
        if (qualityText == null)//没有合成选择框，此时为Q6装备
        {
            var price = 5;
        }
        else
        {
            var price = parseInt($(quality).attr("title").substring(1)) - 1;
        }
        var auction = $(actions).children()[2];
        var inputs = $("input", $(auction));
        // 修改
        var auctionItems = $(actions).children();
        for (a=0; a<auctionItems.length; ++a) {
            if (auctionItems[a].outerHTML=="<hr>")
            {
                actions.removeChild(auctionItems[a]);
            }
        }
        for (j=0; j<inputs.length; ++j) {
            switch (inputs[j].name) {
                case "price":
                    inputs[j].setAttribute("value", prices[price]);
                    inputs[j].setAttribute("type", "text");
                    inputs[j].setAttribute("style", "width:30px");
                    inputs.eq(j).before("起价: ");
                    //inputs.eq(j).after("<div class='flags-small Gold'></div><br />");
                    inputs.eq(j).after("<div></div>");
                    break;
                case "length":
                    inputs[j].setAttribute("value", auction_length);
                    inputs[j].setAttribute("type", "text");
                    inputs[j].setAttribute("style", "width:30px");
                    inputs.eq(j).before("时间: ");
                    //inputs.eq(j).after(" <i class='icon-uptime'> </i> <br />");
                    inputs.eq(j).after("<i></i>");
                    break;
                default:
                    break;
            }
        }
    }
}











//////////////////////////////////////////////////////////////////////////////////////////





// 2017.8.8 更新：删除两句“$('td:eq(6)', headline).remove();”
// 军团排名页面，可查看军令和在线玩家
function enhanceMilitaryUnitStatistics() {
    var table = $('table:last');
    var trs = $('tr', table);
    var headline = trs.eq(0);

    // “显示全部”按钮
    //$('td:eq(6)', headline).remove();
    headline.append('<td><button class="foundation-style" id="ehShowAll">查看所有</button></td>');
    $('#ehShowAll').click( function() {
        $(this).attr('disabled', 'disabled');
        setTimeout( function() { $('#ehShowAll').attr('disabled', false); }, 10000);
        $('[id^="ehShow_"]').click();
    } );

    function textToMillion(text) {
        var value = parseInt(text.replace(/,/g, '').replace(/\xA0/g, ''));
        return value>1e6 ? ((value/1e6).toFixed(1)+'M') : text;
    }

    // “显示军令”按钮
    for (var i=1; i<trs.length; ++i) {
        var tr = trs.eq(i);

        // 伤害单位改为M
        $('td:eq(5)', tr).text( textToMillion($('td:eq(5)', tr).text()) );
        $('td:eq(6)', tr).text( textToMillion($('td:eq(6)', tr).text()) );
        //$('td:eq(6)', tr).remove();

        var muId = $('a[href^="militaryUnit.html?id="]', tr).attr('href').replace('militaryUnit.html?id=', '');
        var button = $('<button style="padding:10px;" class="foundation-style" id="ehShow_'+ muId + '">查看军令</button>');
        tr.append($('<td>').append(button));


        button.click(function() {
            $(this).attr('disabled', 'disabled');
            var muId = $(this).attr('id').replace('ehShow_', '');
            $.ajax({url: 'militaryUnit.html?id=' + muId,
                    timeout: 9000,
                    success: function(data) {
                        var b = $('#ehShow_'+muId);

                        // 查看人数
                        var names = $('img[src="//cdn.e-sim.org//img/newOnline.png"]', data).prev();
                        var avatars = names.prev();
                        var countries = avatars.prev();
                        var memberCell = $('td:eq(3)', b.parent().parent());
                        memberCell.append('<b title="统计在线的人数">(' + names.length + '人在线)</b>');
                        for (var i=0; i<names.length; ++i) {
                            memberCell.append(  $('<div>', {style:"text-align:left;"}).append(countries.eq(i), avatars.eq(i), names.eq(i)) );
                        }
                        //第2页数据
                        if ($( "#pagination-digg", data).length > 0) {
                            $.ajax({
                                url : 'militaryUnit.html?id=' + muId + "&page=2",
                                success : function (data2) {
                                    // 查看人数
                                    //var b = $('#ehShow_'+muId);/newOffline.png
                                    var names = $('img[src="//cdn.e-sim.org//img/newOnline.png"]', data2).prev();

                                    var avatars = names.prev();
                                    var countries = avatars.prev();

                                    var totalNamsLength = parseInt(memberCell.find('b:eq(1)').text().replace(/[^0-9]/g, ''));

                                    totalNamsLength += names.length;
                                    memberCell.find('b:eq(1)').text('(' + totalNamsLength.toString() + '人在线)');

                                    for (var i=0; i<names.length; ++i) {
                                        memberCell.append(  $('<div>', {style:"text-align:left;"}).append(countries.eq(i), avatars.eq(i), names.eq(i)) );
                                    }
                                },
                                error : function(xhr, textStatus) {
                                    $.ajax(this);
                                }
                            });
                        }

                        // 查看军令
                        var battleLink = $('div.battleDiv a[href^="battle.html"]', data).parent();
                        var flags = $('div.flags-medium', $('div.battleDiv', data).parent().parent());

                        if (flags.length != 3) {
                            b.after('无军令');
                            b.remove();
                            return;
                        }

                        if (flags.eq(0).attr('class') === flags.eq(2).attr('class')) {
                            flags.eq(0).attr('style', "vertical-align:middle;");
                            flags.eq(1).attr('class', flags.eq(1).attr('class').replace('medium', 'small')).attr('style', "vertical-align:middle;");
                        }
                        else {
                            flags.eq(1).attr('style', "vertical-align:middle;");
                            flags.eq(0).attr('class', flags.eq(0).attr('class').replace('medium', 'small')).attr('style', "vertical-align:middle;");
                        }

                        b.after(battleLink, flags.eq(0), 'vs', flags.eq(1));
                        b.remove();
                    },
                    error: function(xhr,textStatus){
                        console.log(url, '抓取错误 (', textStatus, ')');
                        $('#ehShow_'+muId).click();
                    }
                   });
        });
    }

}






//////////////////////////////////////////////////////////////////////////////////////////



// 在外汇市场页面自动记录汇率
function updateCurrencyRatio(data) {
    if (config.fetchCurrencyDisabled)
        return;
    if ($(".dataTable:first tr:eq(1) td", data).length === 1)
        return; // 没有单子，只有一行"No offers"

    var seller = $(".dataTable:first tr:eq(1) td:eq(1) div.flags-small", data).attr("class").split(" ").pop(); // 卖家持有的货币名字
    var ratio = parseFloat($(".dataTable:first tr:eq(1) td:eq(2) b", data).text().replace(',', '.'));
    var buyer = $(".dataTable:first tr:eq(1) td:eq(2) div.flags-small", data).attr("class").split(" ").pop(); // 买家持有的货币名字

    if (buyer === "Gold") {// 买家持有黄金，也就是买cc
        var countryId = countryInfo[seller].id;
        if (currencyRatio[countryId] === undefined)
            currencyRatio[countryId] = {};

        var countryRatio = currencyRatio[countryId];
        if (countryRatio.buy === undefined)
            countryRatio.buy = {};

        countryRatio.buy.ratio = 1/ratio;
        setUpdatedDate(countryRatio.buy);
        localStorage.setItem("currencyRatio", JSON.stringify(currencyRatio));
    }
    else { // 买家持有货币，也就是买黄金
        var countryId = countryInfo[buyer].id;
        if (currencyRatio[countryId] === undefined)
            currencyRatio[countryId] = {};

        var countryRatio = currencyRatio[countryId];
        if (countryRatio.sell === undefined)
            countryRatio.sell = {};

        countryRatio.sell.ratio = ratio;
        setUpdatedDate(countryRatio.sell);
        localStorage.setItem("currencyRatio", JSON.stringify(currencyRatio));
    }
}


// 在市场页面自动换算Gold
function enhanceCurrency() {
    $('div.flags-small + b').each(function() {
        var b = $(this);
        if (isNaN(b.text()))
            return;

        var countryName = b.prev().attr("class").split(" ").pop();
        var countryId = countryInfo[countryName] && countryInfo[countryName].id;
        if (!countryId || !currencyRatio[countryId] || !currencyRatio[countryId].sell || !currencyRatio[countryId].buy)
            return;

        var currencyName = countryInfo[countryId] && countryInfo[countryId].currencyName;
        if (b.parent().text().indexOf(b.text() + " " + currencyName) === -1)
            return;

        var ccNum = parseFloat(b.text());

        var sellRatio = (currencyRatio[countryId].sell.ratio);
        var sellNum = ccNum / sellRatio;

        var buyRatio = (currencyRatio[countryId].buy.ratio);
        var buyNum = ccNum / buyRatio;

        var close = Math.abs(sellNum - buyNum) < 0.01; // 价格差距不超过0.1g
        var mediumRatio = ((sellRatio + buyRatio) / 2).toPrecision(4);
        var mediumNum = ((sellNum + buyNum) / 2).toPrecision(4);

        sellNum = sellNum.toPrecision(4);
        buyNum = buyNum.toPrecision(4);

        if (close) { 
            if (b.next().length === 1)
                b.next().before("(", $("<b>", {text:mediumNum, title:"" + mediumRatio + " " + currencyName + " = 1 Gold"}), $("<div>", {class:"flags-small Gold"}), ")");
            else
                b.parent().append("(", $("<b>", {text:mediumNum, title:"" + mediumRatio + " " + currencyName + " = 1 Gold"}), $("<div>", {class:"flags-small Gold"}), ")");
        }
        else {
            if (b.next().length === 1)
                b.next().before("(", $("<b>", {text:buyNum + ' 或 ' + sellNum, title:"用 " + buyNum + " Gold买 " + ccNum + " " + currencyName + "，或用 " + ccNum + " " + currencyName + "卖 " + sellNum + " Gold"}), $("<div>", {class:"flags-small Gold"}), ")");
            else
                b.parent().append("(", $("<b>", {text:buyNum + ' 或 ' + sellNum, title:"用 " + buyNum + " Gold买 " + ccNum + " " + currencyName + "，或用 " + ccNum + " " + currencyName + "卖 " + sellNum + " Gold"}), $("<div>", {class:"flags-small Gold"}), ")");
        }
    });

    $('td b').each(function() {
        var pair = $(this).text().trim().split(" ");
        if (pair.length !== 2 || isNaN(pair[0]) || !countryInfo[pair[1]])
            return; // 必须是“数字 货币名”的形式

        var value = parseFloat(pair[0]);
        var currencyName = pair[1];

        var countryId = countryInfo[currencyName] && countryInfo[currencyName].id;
        if (!countryId || !currencyRatio[countryId] || !currencyRatio[countryId].sell || !currencyRatio[countryId].buy)
            return;

        var ccNum = parseFloat(b.text());

        var sellRatio = (currencyRatio[countryId].sell.ratio);
        var sellNum = ccNum / sellRatio;

        var buyRatio = (currencyRatio[countryId].buy.ratio);
        var buyNum = ccNum / buyRatio;

        var close = Math.abs(sellNum - buyNum) < 0.1; // 价格差距不超过0.1g
        var mediumRatio = ((sellRatio + buyRatio) / 2).toPrecision(4);
        var mediumNum = ((sellNum + buyNum) / 2).toPrecision(4);

        sellNum = sellNum.toPrecision(4);
        buyNum = buyNum.toPrecision(4);

        if (close) { // 价格差距不超过0.01g
            $(this).after(" (", $("<b>", {text:mediumNum, title:"" + mediumRatio + " " + currencyName + " = 1 Gold"}), $("<div>", {class:"flags-small Gold"}), ")");
        }
        else {
            $(this).after(" (", $("<b>", {text:buyNum + ' 或 ' + sellNum, title:"用 " + buyNum + " Gold买 " + ccNum + " " + currencyName + "，或用 " + ccNum + " " + currencyName + "卖 " + sellNum + " Gold"}), $("<div>", {class:"flags-small Gold"}), ")");
        }

    });
}






/////////////////////////////////////////////////////////////////////////////////////////////////////////






// 战斗界面主函数
// 2017.8.20 更新：修改网页标题
function enhanceBattle() {
    clipWithFlag = false;

    $('#battleHeaderImage').attr('style', 'height:85px; background-color:#222');
    $('#battleHeaderImage img').remove();

    var panel = $(".small-2").eq(1);
    //var panel = $('<div>', {class:"foundation-radius fightContainer foundation-base-font"})
    //$("#battleSelectable").before(panel);
    panel.attr('id', 'ehPanel');
    panel.prev().attr('class', panel.prev().attr('class').replace('small-4', 'small-2'));
    panel.next().attr('class', panel.next().attr('class').replace('small-4', 'small-2'));
    panel.attr('class', panel.attr('class').replace('small-2', 'small-3'));
    panel.after( $('<div>', {class:panel.attr('class'), id:'ehRefresh'}) );
    panel.empty();

    var buttons = [['调试', 'Debug', 'bug'], ['飞行', 'Flight', 'airplane'], ['统计', 'Statistics', 'stocks'], ['观战', 'Spectator', 'eye'], ['详细', 'SpectatorDetail', 'users'], ['闹钟', 'Alarm', 'uptime']];
    var buttonStyleUnselected = 'padding:6px;';
    var buttonStyleSelected = buttonStyleUnselected + ' color:orange;';
    for (var i=0; i<buttons.length; ++i) {
        var button = $('<button class="small button foundation-style" style="' + buttonStyleUnselected + '" id="ehButton' + buttons[i][1] + '"> <i class="icon-' + buttons[i][2] + '"></i>' + buttons[i][0] + '</button> ' );
        var div = $('<div>', {class:'foundation-radius fightContainer foundation-base-font', style:'display:none;', id:'ehDiv'+buttons[i][1]});
        button.click(function() {
            if (this.getAttribute('style') == buttonStyleUnselected) {
                $('[id^=ehButton]').attr('style', buttonStyleUnselected);
                $('[id^=ehDiv]').attr('style', 'display:none;');
                this.setAttribute('style', buttonStyleSelected);
                $('#'+this.getAttribute('id').replace('Button', 'Div')).attr('style', 'display:block;');

            }
            else {
                $('[id^=ehButton]').attr('style', buttonStyleUnselected);
                $('[id^=ehDiv]').attr('style', 'display:none;');
            }
        });
        panel.append(button);
        //panel.parent().after(div);
        // 2017.9.9 更新：下移显示框
        var bedp = localStorage.getItem("battleEnhanceDivPlacement");
        if (bedp == null || bedp != "true")
        {
            panel.parent().after(div);
        }
        else
        {
            $("#battleSelectable:first").before(div);
        }
    }


    setupDebug();
    setupWall();
    setupRefresh();
    setupFlight();
    setupStatistics();
    setupSpectator();
    setupAlarm();
    setupSpectatorDetail();
    setupFight();
    setupFightButton();
    markAlliance();
    //2017.8.21 更新：无需确认直接使用医疗包
    addMedkitButton();

    $('#minimalChatpanel').remove();	// 右下角聊天框
}

//2017.8.21 更新：无需确认直接使用医疗包
function addMedkitButton()
{
    var mf = $('#medkitForm')
    if (mf.length >0)
    {
        //var medkitButton = $('<button>', {id:'sendMedkitRequest', class:"button smallhelp foundation-style", text:'无需确认直接使用医疗包（当前页面不会刷新额度显示）'}).appendTo(mf.parent());
        var medkitButton = $('<button>', {id:'sendMedkitRequest', class:"button smallhelp foundation-style", text:'无需确认直接使用医疗包（当前页面不会刷新额度显示）'}).prependTo(mf.parent());

        medkitButton.click(function() {
            medkitButton.attr({disabled:true});
            var dataString = 'item=MEDKIT&storageType=SPECIAL_ITEM&action=USE';
            $.ajax({
                type: "POST",
                url: "storage.html",
                data: dataString,
                success: function() {
                    medkitButton.attr({disabled:false});
                    console.log("使用医疗包：成功响应"); //可能使用成功，也可能在额度全满或没包时使用失败
                },
                error: function(xhr, textStatus){
                    console.log("使用医疗包时发生错误");
                }
            });
        });
    }
}


function getEhTime() {
    if (isNaN(endEpoch)) {
        endEpoch = (new Date().getTime()) + getPageTime()*1000;
    }
    var ehTime = parseInt(  (endEpoch - new Date().getTime())/1000 ) - timeBias;
    return ehTime<0 ? 0 : ehTime;
}

function getPageTime() {
    var hms = $('#roundCountdown');
    // if (hms.length === 0)
    // return null;
    hmsArray = hms.text().split(/:| /);
    return parseInt(hmsArray[0])*3600 + parseInt(hmsArray[1])*60 + parseInt(hmsArray[2]);
}

function getTimeString(t) {
    var m = (parseInt(t/60))%60;
    var s = t%60;
    return '0' + parseInt(t/3600) + (m<10?':0':':') + m + (s<10?':0':':') + s;
}

// battle.html 里设置debug框
// 2017.8.9 更新：flag class更新的服务器在团体杯、世界大战和新手战场仍旧使用旧版flag class，暂时使用“battleName”判断，如果有更好的判断方法务必请告知我
// 2017.8.21 更新：所有服务器都已改成新版flag
function setupDebug() {
    $('#ehDivDebug').append( $('<div>', {style:"text-align:left;"}));

    var regions = $('a[href^="region.html?id="][href!="region.html?id="]');
    userId = parseInt($('#userName').attr('href').replace('profile.html?id=', ''));
    userName = $('#userName').text();
    userLocationId = parseInt(regions.first().attr('href').replace('region.html?id=', ''));
    userLocationName = regions.first().text();
    userCitizenshipId = parseInt($('li > a[href^="battles.html?countryId="][href$="&sorting=BY_TOTAL_DAMAGE&_substidedOnly=on"]').attr('href').match(/.+?countryId=([0-9]+).+?/)[1]);

    battleId = parseInt($('a[href^="battleStatistics.html?id="]').attr('href').replace('battleStatistics.html?id=', ''));
    battleName = $('#fightName a[class=fightFont]').text().trim();
    battleLocationId = parseInt(regions.length==1 ? -1 : regions.last().attr('href').replace('region.html?id=', ''));
    battleLocationName = battleLocationId==-1 ? '无' : battleName;

    isResistance = ($('#fightName div').length >0);
    roundId = parseInt($('span.fightFont').text().match('[0-9]+$')[0]);
    battleRoundId = parseInt($('#battleRoundId').val());

    if ($.inArray(battleName, oldFlagBattleName) < 0)
    {
        defenderName = $('.xflagsBig:first').attr('class').split(' ').pop();
        defenderName = defenderName.substring(defenderName.indexOf('-') + 1);
        //console.log(defenderName);
        attackerName = $('.xflagsBig:last').attr('class').split(' ').pop();
        attackerName = attackerName.substring(attackerName.indexOf('-') + 1);
        //console.log(attackerName);
    }
    else
    {
        defenderName = $('.flags-big:first').attr('class').split(' ').pop();
        attackerName = $('.flags-big:last').attr('class').split(' ').pop();
    }

    defenderId = countryInfo[defenderName] && countryInfo[defenderName].id;
    attackerId = countryInfo[attackerName] && countryInfo[attackerName].id;
    defenderScore = $('img[src$="/img/blue_ball.png"]').length;
    attackerScore = $('img[src$="/img/red_ball.png"]').length;
    defenderDescription = battleName + ', ' + defenderName + '方';
    attackerDescription = battleName + ', ' + attackerName + '方';
    isActive = roundId>(defenderScore+attackerScore);

    isPremium = $('#totalspectators').length > 0;

    log("玩家id=", userId, ", 玩家名字=", userName, ", 国籍=", userCitizenshipId, ", 会员=", isPremium, ", 当前位置=", userLocationName, " (", userLocationId, ")");
    log("战斗id=", battleId, ", 战斗名字=", battleName, ", 战斗地点=", battleLocationName, " (", battleLocationId, ")");
    log("起义战=", isResistance, ", 局数=", roundId, ", battleRoundId=", battleRoundId, ", 战斗中=", isActive);
    log(defenderName, " v.s. ", attackerName, ", 比分", defenderScore, ":", attackerScore);
    timeBias = 0;
    endEpoch = (new Date().getTime()) + 7200*1000;

    if (clipWithFlag) {
        defenderNameOrFlag = '/' + defenderName.slice(0, 5);
        attackerNameOrFlag = '/' + attackerName.slice(0, 5);
    }
    else {
        defenderNameOrFlag = defenderName;
        attackerNameOrFlag = attackerName;
    }

    // 2017.8.20 更新：修改网页标题
    if (battleLocationId==-1)
    {
        document.title = battleName;
    }
    else
    {
        var defenderShortName = countryInfo[defenderName].shortName;
        var attackerShortName = countryInfo[attackerName].shortName;
        // Kekistan在countryInfo里没有shortName键值
        if (defenderName == "Kekistan")
        {
            defenderShortName = "KK";
        }
        if (attackerName == "Kekistan")
        {
            attackerShortName = "KK";
        }
        document.title = defenderShortName + " vs " + attackerShortName + " @" + battleName;
    }

}

// 输出调试信息
function log() {
    var log_div = $('#ehDivDebug > div');
    log_div.append($(".time").first().text().split(" ")[0].slice(0, -1), ': ');
    for (var i = 0; i<arguments.length; i++) {
        log_div.append(arguments[i].toString(), ' ');
    }
    log_div.append("<br />");
}
function setupFightButton() {
    var len = $(".fightButton").length;

    var divFightButton1, divFightButton2, foodWithFight1, foodWithFight2, giftWithFight1, giftWithFight2, name;
    if (len === 2) {
        divFightButton1 = $("#fightButtonBerserk1").parent();
        name = $("#fightButtonBerserk1").attr("name");

        divFightButton1.append("<br />");
        foodWithFight1 = $("<a id='foodWithFight1' class='button foundation-style smallhelp profileButton foodWithFight' style='font-size: 0.95em !important; padding: 0.5em !important;' href='#' title='' value='Berserk' name='" + name + "'> Hit & food</a>");
        divFightButton1.append(foodWithFight1);
        giftWithFight1 = $("<a id='giftWithFight1' class='button foundation-style smallhelp profileButton giftWithFight' style='font-size: 0.95em !important; padding: 0.5em !important;' href='#' title='' value='Berserk' name='" + name + "'>Hit & gift</a>");
        divFightButton1.append(giftWithFight1);

    } else if (len === 4) {
        divFightButton1 = $("#fightButtonBerserk1").parent();
        name = $("#fightButtonBerserk1").attr("name");
        divFightButton1.append("<br />");
        foodWithFight1 = $("<a id='foodWithFight1' class='button foundation-style smallhelp profileButton foodWithFight' style='font-size: 0.95em !important; padding: 0.5em !important;' title='' value='Berserk' name='" + name + "'> Hit & food</a>");
        divFightButton1.append(foodWithFight1);
        giftWithFight1 = $("<a id='giftWithFight1' class='button foundation-style smallhelp profileButton giftWithFight' style='font-size: 0.95em !important; padding: 0.5em !important;' title='' value='Berserk' name='" + name + "'>Hit & gift</a>");
        divFightButton1.append(giftWithFight1);

        divFightButton2 = $("#fightButtonBerserk2").parent();
        name = $("#fightButtonBerserk2").attr("name");
        divFightButton2.append("<br />");
        foodWithFight2 = $("<a id='foodWithFight2' class='button foundation-style smallhelp profileButton foodWithFight' style='font-size: 0.95em !important; padding: 0.5em !important;' title='' value='Berserk' name='" + name +"'> Hit & food</a>");
        divFightButton2.append(foodWithFight2);
        giftWithFight2 = $("<a id='giftWithFight2' class='button foundation-style smallhelp profileButton giftWithFight' style='font-size: 0.95em !important; padding: 0.5em !important;' title='' value='Berserk' name='" + name +"'>Hit & gift</a>");
        divFightButton2.append(giftWithFight2);

        foodWithFight2.css("background-image", "linear-gradient(to bottom, #c00 0px, #a00 100%)");
        giftWithFight2.css("background-image", "linear-gradient(to bottom, #c00 0px, #a00 100%)");
    }

    if (len !== 0) {
        foodWithFight1.css("background-image", "linear-gradient(to bottom, #c00 0px, #a00 100%)");
        giftWithFight1.css("background-image", "linear-gradient(to bottom, #c00 0px, #a00 100%)");
    }

    $(".foodWithFight").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (parseFloat($("#actualHealth").html()) <= 51 || (getPageTime()%5) == 0) {
            sendEatRequest();
        }
        var side = $(this)[0].name;
        var value = $(this).attr('value');
        sendFightRequest(side, value);
        return false;
    });

    $(".giftWithFight").click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (parseFloat($("#actualHealth").html()) <= 51 || (getPageTime()%5) == 0) {
            sendGiftRequest();
        }
        var side = $(this)[0].name;
        var value = $(this).attr('value');
        sendFightRequest(side, value);
        return false;
    });

    function sendEatRequest() {
        var dataString = 'quality=' + $("#foodQuality").val();
        $.ajax({
            type: "POST",
            url: "eat.html",
            data: dataString,
            success: function(msg) {
                updateCitizenStatus(msg);
            }
        });
    }

    function sendGiftRequest() {
        var dataString = 'quality=' + $("#giftQuality").val();
        $.ajax({
            type: "POST",
            url: "gift.html",
            data: dataString,
            success: function(msg) {
                updateCitizenStatus(msg);
            }
        });
    }

    function updateCitizenStatus(msg) {
        var json = jQuery.parseJSON(msg);
        $("#foodLimit").html(json.foodLimit);
        $("#giftLimit").html(json.giftLimit);
        $("#foodLimit2").html(json.foodLimit);
        $("#giftLimit2").html(json.giftLimit);
        $("#wellness").html(json.wellness);
        $("#healthBar").html(json.wellness);
        $("#healthProgress .ui-progressbar-value").animate({
            width: json.wellness + "%"
        }, {
            queue: false
        });
        $("#actualHealth").html(json.wellness);
        $("#foodQ1").html("<b>Q1</b><br>" + json.q1FoodStorage);
        $("#foodQ2").html("<b>Q2</b><br>" + json.q2FoodStorage);
        $("#foodQ3").html("<b>Q3</b><br>" + json.q3FoodStorage);
        $("#foodQ4").html("<b>Q4</b><br>" + json.q4FoodStorage);
        $("#foodQ5").html("<b>Q5</b><br>" + json.q5FoodStorage);
        $("#giftQ1").html("<b>Q1</b><br>" + json.q1GiftStorage);
        $("#giftQ2").html("<b>Q2</b><br>" + json.q2GiftStorage);
        $("#giftQ3").html("<b>Q3</b><br>" + json.q3GiftStorage);
        $("#giftQ4").html("<b>Q4</b><br>" + json.q4GiftStorage);
        $("#giftQ5").html("<b>Q5</b><br>" + json.q5GiftStorage);
        $("#sfoodQ1").html("<b>Q1</b><br>" + json.q1FoodStorage);
        $("#sfoodQ2").html("<b>Q2</b><br>" + json.q2FoodStorage);
        $("#sfoodQ3").html("<b>Q3</b><br>" + json.q3FoodStorage);
        $("#sfoodQ4").html("<b>Q4</b><br>" + json.q4FoodStorage);
        $("#sfoodQ5").html("<b>Q5</b><br>" + json.q5FoodStorage);
        $("#sgiftQ1").html("<b>Q1</b><br>" + json.q1GiftStorage);
        $("#sgiftQ2").html("<b>Q2</b><br>" + json.q2GiftStorage);
        $("#sgiftQ3").html("<b>Q3</b><br>" + json.q3GiftStorage);
        $("#sgiftQ4").html("<b>Q4</b><br>" + json.q4GiftStorage);
        $("#sgiftQ5").html("<b>Q5</b><br>" + json.q5GiftStorage);
    }

    function sendFightRequest(side, value) {
        // var dataString = 'weaponQuality=' + $("#weaponQuality").val() + '&battleRoundId=' + $("#battleRoundId").val() + '&side=' + side + '&value=' + value;
        var dataString = 'weaponQuality=' + $("#weaponQuality").attr('value') + '&battleRoundId=' + $("#battleRoundId").val() + '&side=' + side + '&value=' + value;
        $.ajax({
            type: "POST",
            url: "fight.html",
            data: dataString,
            success: function(msg) {
                $('#fightResponse > div').replaceWith(msg);
                showDamege($(msg));
                var healthText = $("#healthUpdate", msg).text();
                if (healthText !== "") {
                    var healthUpdated = healthText.substr(0, healthText.length - 3);
                    if (healthUpdated < 100) {
                        $("#healthProgress div.ui-corner-right").removeClass('ui-corner-right');
                    }
                    $("#healthProgress .ui-progressbar-value").animate({width: healthUpdated + "%"}, {queue: false});
                    $("#healthProgress").attr('title', healthUpdated + ' / 100');
                    $("#actualHealth").html(healthUpdated);
                }
            }
        });
    }

    // 抓取伤害
    function showDamege(data) {
        var showMsg = $("#showMsg");
        showMsg.text("");
        showMsg.show();
        var damageText = $('#DamageDone', data);

        if (damageText.length >0) {
            var damage = parseInt( damageText.text().replace(/,/g, '').replace(/\xA0/g, '') );
            var icons = $('.fightsprite', damageText.parent().parent());

            var ehIcons = {'bomb':['grey', '无暴击(pain dealer)'],
                           'tank':['grey', '无坦克(tank)'],
                           'syringe':['grey', '无类固醇(steroid)'],
                           'airplane':['grey', '无地点加成'],
                           'bookmark':['grey', '无军令加成']
                          };
            var iconToEhIcon = {'absorbed':['loved', ['lightgreen', '闪避(avoid)']],
                                'mu':['bookmark', ['lightgreen', '有军令加成']],
                                'location':['airplane', ['lightgreen', '有地点加成']],
                                'STEROIDSplus':['syringe', ['lightgreen', '有类固醇(steroid)']],
                                'STEROIDSminus':['syringe', ['pink', '类固醇副作用(steroid)']],
                                'TANKplus':['tank', ['lightgreen', '有坦克(tank)']],
                                'TANKminus':['tank', ['pink', '坦克副作用(tank)']],
                                'xp1':['xp', 1],
                                'xp5':['xp', 5],
                                'PAIN_DEALER_1_Hplus':['bomb', ['lightgreen', '1小时暴击(pain dealer)']],
                                'PAIN_DEALER_10_Hplus':['bomb', ['lightgreen', '10小时暴击(pain dealer)']],
                                'PAIN_DEALER_25_Hplus':['bomb', ['lightgreen', '25小时暴击(pain dealer)']]
                               };

            for (var i=0; i<icons.length; ++i) {
                var iconName = icons.eq(i).attr('class').split(' ').pop();
                if (iconName in iconToEhIcon) {
                    var modifier = iconToEhIcon[iconName];
                    ehIcons[modifier[0]] = modifier[1];
                }
            }
            var leftHtml = '';
            // var xp = ehIcons['xp'];
            // delete ehIcons['xp'];
            var xp = ehIcons.xp;
            delete ehIcons.xp;
            for (i in ehIcons) 
                leftHtml = '<i style="color:' + ehIcons[i][0] + ';" class="icon-'+i+'" title="' + ehIcons[i][1] + '"></i>' + leftHtml;
            leftHtml += '<b title="'+xp+'次攻击">x' + xp + '</b>';

            //var damageHistory = $('<div>', {id:'fightHistory'});
            var damageHistory = $("#fightHistory");
            var divs = $('div[class^=foundation-style]', damageHistory);
            if (divs.length===6)
                $('#ehHistoryExpand').show();
            divs.slice(0, 2).attr('style', 'opacity:0.6;');
            divs.slice(2, 4).attr('style', 'opacity:0.3;');
            if ($('#ehHistoryExpand').is(':hidden')===false) // expand button is visible
                divs.slice(4, 6).hide();

            //判断是否暴击
            var isCritical = ($("#fightResult>div").attr('class').split(' ').pop().indexOf("critical") !== -1);

            if (isCritical) {
                damageHistory.prepend($('<div>', {class:"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                      $('<div>', {class:"foundation-style small-4 columns foundation-text-right critical", text:damageText.text()}));                    
            } else {
                damageHistory.prepend($('<div>', {class:"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                      $('<div>', {class:"foundation-style small-4 columns foundation-text-right", text:damageText.text()}));                    
            }

            $('#ehHitsNumber').text( parseInt($('#ehHitsNumber').text()) + xp);
            $('#ehTotalDamage').text( (parseInt($('#ehTotalDamage').text().replace(/,/g, '').replace(/\xA0/g, '')) + damage).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
        }
        else {         
            if ($("img[src$='/delete.png']").length > 0) {
                showMsg.text("体力不足");
            } else {
                showMsg.text("慢点慢点打,鼠标都要被击碎了");
            }
            showMsg.fadeOut(2000);
        }
    }                
}

// battle.html 里设置飞行框
function setupFlight() {
    if (!isActive || battleLocationId == -1) {
        $('#ehButtonFlight').attr('disabled', true);
        return;
    }

    var d = $('#ehDivFlight');
    // 各种按钮
    var flyForm = $('<div>');
    var left = $('<td>', {id:'defenderRegions', style:"text-align:left; font-size:9px; width:280px"});
    var right = $('<td>', {id:'attackerRegions', style:"text-align:right; font-size:9px; width:280px"});
    var middle = $('<td>', {style:"text-align:center; width:250px"});
    flyForm.append(left, middle, right);
    d.append(flyForm);

    var ticketSelect = $('<select>', {id:"ticketQuality", name:"ticketQuality", style:"padding:3px; margin:3px"});
    for (var i = 1; i <= 5; ++i) {
        //var pic = $('img[src$="Ticket.png"] + img[src$="q' + i + '.png"]');
        //if (pic.length == 1) {
        //    var n = pic.parent().prev().text().replace(/ /g, '');
        //    ticketSelect.append($('<option value="' + i + '">Q' + i + ' (' + n + ')</option>'));
        //}
        ticketSelect.append($('<option value="' + i + '">Q' + i + '</option>'));
    }
    var flyButton = $('<button>', {text:"飞行", class:"small button foundation-style", style:"padding:5px; margin:3px;"});

    var flyInfo = $("<div>");
    middle.append(ticketSelect, flyButton, flyInfo);

    if ($("#fightButtonBerserk1").length === 0) // 原先不能打
        $('<a>', {href:'battle.html?id='+battleId, id:'ehReload', html:'<i class="icon-search" />刷新页面'}).appendTo($("<div>").insertAfter(flyButton));

    flyButton.click(function() {
        var radio = $("input[type='radio']:checked", flyForm);
        if (radio.length === 0) {
            flyInfo.text("请选择地区");
            return;
        }
        var ticketQuality = parseInt(ticketSelect.val());
        var countryId = parseInt(radio.attr("countryId"));
        var regionId = parseInt(radio.val());
        flyInfo.text("使用Q"+ ticketQuality + "机票飞往 " + countryInfo[countryId].name + " 的 " + regionInfo[regionId].name);

        $.ajax({
            url: "travel.html",
            type: 'POST',
            data: {
                countryId: countryId,
                regionId: regionId,
                ticketQuality: ticketQuality
            },
            success: function(data) {
                var e = $("div.testDivred:eq(1)", data);
                if (e.length === 1)
                    flyInfo.text("飞行失败：" + e.text().trim());
                else {
                    flyInfo.text("飞行成功！");
                    if ($("#fightButtonBerserk1").length === 0) { // 原先不能打
                        location = location;
                    }
                }
            },
            error: function(xhr,textStatus){
                console.log("飞行错误 (", textStatus, ")");
            },
        });
    });

    processRegions();
}


// 2017.8.21 更新：所有服务器都已改成新版flag
function markAlliance() {
    if (!isActive) {
        return;
    }

    // 标记防守方角色
    if (defenderId == allies[0]) {
        $('.xflagsBig-'+defenderName).after('<div class="fightFont">祖国</div>');
    }
    else if (allies.indexOf(defenderId) > 0) {
        $('.xflagsBig-'+defenderName).after('<div class="fightFont">盟国</div>');
    }
    else if (enemies.indexOf(defenderId) !== -1) {
        $('.xflagsBig-'+defenderName).after('<div class="fightFont">敌国</div>');
    }
    else if (coalitionMembers.indexOf(defenderId) > 0) {
        $('.xflagsBig-'+defenderName).after('<div class="fightFont">联盟成员国</div>');
    }

    // 标记进攻方角色
    if (attackerId == allies[0]) {
        $('.xflagsBig-'+attackerName).after('<div class="fightFont">祖国</div>');
    }
    else if (allies.indexOf(attackerId) > 0) {
        $('.xflagsBig-'+attackerName).after('<div class="fightFont">盟国</div>');
    }
    else if (enemies.indexOf(attackerId) !== -1) {
        $('.xflagsBig-'+attackerName).after('<div class="fightFont">敌国</div>');
    }
    else if (coalitionMembers.indexOf(attackerId) > 0) {
        $('.xflagsBig-'+attackerName).after('<div class="fightFont">联盟成员国</div>');
    }
    // 在攻击按钮上标记帮助或打反
    if (allies.indexOf(defenderId) !== -1 && allies.indexOf(attackerId) === -1) { // 防守方是盟友或祖国
        var role = defenderId == allies[0] ? '祖国' : '盟国';
        $('.flags-medium.'+defenderName).after('<b style="color:lightgreen"><i class="icon-uniF479" />帮助' + role + '</b>');
        $('.flags-medium.'+attackerName).after('<b style="color:pink"><i class="icon-uniF478" />打反' + role + '</b>');
    }
    else if (allies.indexOf(defenderId) === -1 && allies.indexOf(attackerId) !== -1) { // 进攻方是盟友或祖国
        var role = attackerId == allies[0] ? '祖国' : '盟国';
        $('.flags-medium.'+attackerName).after('<b style="color:lightgreen"><i class="icon-uniF479" />帮助' + role + '</b>');
        $('.flags-medium.'+defenderName).after('<b style="color:pink"><i class="icon-uniF478" />打反' + role + '</b>');
        $('#copySideAttacker').attr("checked", true);
    }
    else if (enemies.indexOf(defenderId) !== -1 && enemies.indexOf(attackerId) === -1) { // 防守方是敌国
        $('.flags-medium.'+attackerName).after('<b style="color:lightgreen"><i class="icon-uniF479" />攻击敌国</b>');
        $('.flags-medium.'+defenderName).after('<b style="color:pink"><i class="icon-uniF478" />帮助敌国</b>');
        $('#copySideAttacker').attr("checked", true);
    }
    else if (enemies.indexOf(defenderId) === -1 && enemies.indexOf(attackerId) !== -1) { // 进攻方是敌国
        $('.flags-medium.'+defenderName).after('<b style="color:lightgreen"><i class="icon-uniF479" />攻击敌国</b>');
        $('.flags-medium.'+attackerName).after('<b style="color:pink"><i class="icon-uniF478" />帮助敌国</b>');
    }
    else { // 双方都是盟友，或者双方都是敌国，或者双方都是酱油国
    }
}


function processRegions() {
    function findAdjacentRegions(start, country) {
        var adjacentRegions = [];
        for (var i=0; i<regionInfo[start].neighbours.length; ++i) {
            var n = regionInfo[start].neighbours[i];
            if (regionInfo[n].occupantId == country) {
                adjacentRegions.push(n);
            }
        }
        return adjacentRegions;
    }

    function findConnectedRegions(start, country, exception) {
        var connectedRegions = [];
        var pendingRegions = [start];	// 还没检查本土和邻居的地区
        var checkedRegions = exception;	// 已检查本土和邻居的地区
        var connectedToCore = false;

        checkedRegions.push(start);
        while (pendingRegions.length >0) {
            var r = pendingRegions.pop();
            connectedRegions.push(r);
            if (regionInfo[r].homeCountry == country)
                connectedToCore = true;

            var adjacentRegions = findAdjacentRegions(r, country);
            for (var i=0; i<adjacentRegions.length; ++i) {
                var n = adjacentRegions[i];

                if (checkedRegions.indexOf(n) == -1) {
                    pendingRegions.push(n);            
                    checkedRegions.push(n);
                }
            }
        }
        return [connectedRegions, connectedToCore];
    }

    function addOneRegion(position, regionId, isConnected) {
        var txt = regionInfo[regionId].name;

        var regionRadio = $('<input>', {type:"radio", name:"regionId", value:regionId, countryId:regionInfo[regionId].occupantId});
        /*
        var regionName = '<div class="flags-small ' + countryInfo[regionInfo[regionId].occupantId].flagName + '" />';
        if (regionInfo[regionId].occupantId != regionInfo[regionId].homeCountry)
            regionName += '(<div class="flags-small ' + countryInfo[regionInfo[regionId].homeCountry].flagName + '" />)';
        */
        var regionName = '<p class="xflagsSmall xflagsSmall-' + countryInfo[regionInfo[regionId].occupantId].flagName + '" />';
        if (regionInfo[regionId].occupantId != regionInfo[regionId].homeCountry)
            regionName += '(<p class="xflagsSmall xflagsSmall-' + countryInfo[regionInfo[regionId].homeCountry].flagName + '" />)';

        regionName += '<b> '+ regionInfo[regionId].name + '</b>';
        if (regionInfo[regionId].battle)
            regionName += ' <i title="' + regionInfo[regionId].name + '正在被攻击" class="icon-cannon"></i> ';
        if (!isConnected) {
            regionName += ' (被包围)';
            txt +=  '(被包围)';
        }
        if ((userLocationId == regionId) && regionRadio.attr('disabled', 'disabled'))
            regionName += ' (你在这里)';
        position.append(regionRadio, regionName, '<br />');

        return txt;
    }

    // 检查是否被包围
    defenderId = countryInfo[defenderName].id;
    attackerId = countryInfo[attackerName].id;
    var connectedRegions = findConnectedRegions(battleLocationId, defenderId, []);
    var isConnected = connectedRegions[1];
    connectedRegions = connectedRegions[0];
    log('防守方被包围：', !isConnected);

    // 如果是防守方的连接地，则去掉该区域后，connectedRegions应分成至少2组，且至少一组不和本土相连
    isAttackerLinkage = false;
    isDefenderLinkage = false;
    var adjacentRegions = findAdjacentRegions(battleLocationId, defenderId);
    if (adjacentRegions.length === 0) {
        isDefenderLinkage = false;
        log(battleName, '不与防守方其它地区相连，所以', battleName, '不是守方连接地');
    }
    else {
        var connectedRegions2 = findConnectedRegions(adjacentRegions[0], defenderId, [battleLocationId]);
        var isConnected2 = connectedRegions2[1];
        connectedRegions2 = connectedRegions2[0];
        if (connectedRegions2.length == connectedRegions.length-1) {
            log(battleName, '丢掉后，防守方现在相连的地区仍相连，所以', battleName, '不是守方连接地');
        }
        else {	// 分两组
            if (!isConnected2) {	// 一组不连本土
                isDefenderLinkage = true;
                log(battleName, '丢掉后，防守方现在相连的地区被切断，且', regionInfo[adjacentRegions[0]].name, '不与本土相连，因此', battleName, '是守方连接地');
            }
            else {	// 查看另一组
                for (var j=1; j<adjacentRegions.length; ++j) {
                    if (connectedRegions2.indexOf(adjacentRegions[j]) != -1)
                        continue;
                    // 找到另一组的一个
                    var isConnected3 = findConnectedRegions(adjacentRegions[j], defenderId, [battleLocationId])[1];
                    if (isConnected3) {
                        isDefenderLinkage = false;
                        log(battleName, '丢掉后，防守方现在相连的地区被切断，但都与本土相连，因此', battleName, '不是守方连接地');
                    }
                    else {
                        isDefenderLinkage = true;
                        log(battleName, '丢掉后，防守方现在相连的地区被切断，且', regionInfo[adjacentRegions[j]].name, '不与本土相连，因此', battleName, '是守方连接地');
                    }
                }
            }

        }
    }

    // 防守地点
    defenderLocationText = addOneRegion($('#defenderRegions'), battleLocationId, isConnected);
    attackerLocationText = '';

    // 进攻地点，顺便计算是否连接地
    if (isResistance) {
        attackerLocationText = addOneRegion($('#attackerRegions'), battleLocationId, true);
    }

    //2017.8.12 更新：给非起义战防御方加成地添加相邻地
    //2017.9.2 更新：测试：不管是不是起义战，防御方只要是相邻区域可能都有加成了
    /*
    if (!isResistance)
    {
        var defendRegions = findAdjacentRegions(battleLocationId, defenderId);
        var defendConnectedRegions = [];
        var defendIsConnected = false;
        for (var i=0; i<defendRegions.length; ++i)
        {
            defendConnectedRegions = findConnectedRegions(defendRegions[i], defenderId, []);
            defendIsConnected = defendConnectedRegions[1];
            defenderLocationText += (defenderLocationText!==''?' 或 ':'') + addOneRegion($('#defenderRegions'), defendRegions[i], defendIsConnected);
        }
    }
    */
    var defendRegions = findAdjacentRegions(battleLocationId, defenderId);
    var defendConnectedRegions = [];
    var defendIsConnected = false;
    for (var i=0; i<defendRegions.length; ++i)
    {
        defendConnectedRegions = findConnectedRegions(defendRegions[i], defenderId, []);
        defendIsConnected = defendConnectedRegions[1];
        defenderLocationText += (defenderLocationText!==''?' 或 ':'') + addOneRegion($('#defenderRegions'), defendRegions[i], defendIsConnected);
    }

    var attackRegions = findAdjacentRegions(battleLocationId, attackerId);
    var attackAddedRegions = [];
    var attackConnectedRegions = [];
    var attackIsConnected = false;
    var attackSeparated = false;
    var disconnectedRegion = null;
    for (var i=0; i<attackRegions.length; ++i) {
        var r = attackRegions[i];
        if (attackAddedRegions.indexOf(r) != -1)
            continue;
        attackSeparated = i>0;
        attackConnectedRegions = findConnectedRegions(attackRegions[i], attackerId, []);
        attackIsConnected = attackConnectedRegions[1];
        if (!attackIsConnected)
            disconnectedRegion = attackRegions[i];
        attackConnectedRegions = attackConnectedRegions[0];
        for (var j=0; j<attackRegions.length; ++j) {
            if (attackConnectedRegions.indexOf(attackRegions[j]) != -1) {
                if (!isResistance)
                    attackerLocationText += (attackerLocationText!==''?' 或 ':'') + addOneRegion($('#attackerRegions'), attackRegions[j], attackIsConnected);
                attackAddedRegions.push(attackRegions[j]);
            }
        }
    }
    if (!attackSeparated) {
        isAttackerLinkage = false;
        log(battleName, '攻克后，进攻方没连接新的地区，因此', battleName, '不是夺回连接地');
    }
    else {
        if (disconnectedRegion === null) {
            isAttackerLinkage = false;
            log(battleName, '攻克后，进攻方的两组地区连成一片，但它们已与本土相连，因此', battleName, '不是夺回连接地');
        }
        else {
            isAttackerLinkage = true;
            log(battleName, '攻克后，进攻方被包围的' + regionInfo[disconnectedRegion].name + '将与另一地区相连，因此', battleName, '是夺回连接地');
        }
    }


    // 修改战斗标题
    //var newBattleName = ' <div style="vertical-align:middle;" class="flags-small ' + countryInfo[regionInfo[battleLocationId].homeCountry].flagName + '" />';
    var newBattleName = ' <div style="vertical-align:middle;" class="xflagsSmall xflagsSmall-' + countryInfo[regionInfo[battleLocationId].homeCountry].flagName + '" />';
    var locationDescription = battleLocationName;
    if (regionInfo[battleLocationId].capital) {
        newBattleName +=  '<img style="height:16px" src="https://cdn.e-sim.org/img/map/house.png"> ';
        locationDescription += ' (首都)';
    }
    if (regionInfo[battleLocationId].rawRichness === "HIGH") {
        var resourceName = regionInfo[battleLocationId].raw.toLowerCase();
        resourceName = resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
        newBattleName += '<img style="height:16px" src="http://cdn.e-sim.org/img/productIcons/' + resourceName + '.png"> ';
        locationDescription += ' (' + resourceName + ')';
    }
    /*
    if (isDefenderLinkage)
        newBattleName += ' (<div style="vertical-align:middle;" class="flags-small ' + defenderName + '" />防守连接地) ';
    if (isAttackerLinkage)
        newBattleName += ' (<div style="vertical-align:middle;" class="flags-small ' + attackerName + '" />收复连接地) ';
    */
    if (isDefenderLinkage)
        newBattleName += ' (<div style="vertical-align:middle;" class="xflagsSmall xflagsSmall-' + defenderName + '" />防守连接地) ';
    if (isAttackerLinkage)
        newBattleName += ' (<div style="vertical-align:middle;" class="xflagsSmall xflagsSmall-' + attackerName + '" />收复连接地) ';

    $('#fightName a[class=fightFont]').append(newBattleName);

    // 生成战斗描述

    var index = (isResistance?4:0) + (isDefenderLinkage?2:0) + (isAttackerLinkage?1:0);
    var d = [defenderNameOrFlag + ' 在 ' + locationDescription + '防守' + attackerNameOrFlag,
             defenderNameOrFlag + ' 防守 ' + locationDescription + ', 保持' + attackerNameOrFlag + '断路',
             defenderNameOrFlag + ' 在连接地 ' + locationDescription + '防守' + attackerNameOrFlag,
             defenderNameOrFlag + ' 防守连接地 ' + locationDescription + ', 并保持' + attackerNameOrFlag + '断路',
             defenderNameOrFlag + ' 镇压 ' + attackerNameOrFlag + ' 在 ' + locationDescription + ' 的起义',
             defenderNameOrFlag + ' 镇压 ' + locationDescription + ' 的起义, 保持' + attackerNameOrFlag + '断路',
             defenderNameOrFlag + ' 镇压 ' + attackerNameOrFlag + ' 在连接地 ' + locationDescription + ' 的起义',
             defenderNameOrFlag + ' 镇压连接地 ' + locationDescription + ' 的起义, 并保持' + attackerNameOrFlag + '断路'];
    var a = [attackerNameOrFlag + ' 进攻 ' + defenderNameOrFlag + ' 的 ' + locationDescription,
             attackerNameOrFlag + ' 进攻 ' + defenderNameOrFlag + ', 收复连接地 ' + locationDescription,
             attackerNameOrFlag + ' 进攻 ' + locationDescription + ', 使' + defenderNameOrFlag + '断路',
             attackerNameOrFlag + ' 收复连接地 ' + locationDescription + ', 同时使' + defenderNameOrFlag + '断路',
             attackerNameOrFlag + ' 在 ' + locationDescription + ' 起义反抗 ' + defenderNameOrFlag,
             attackerNameOrFlag + ' 在 ' + locationDescription + ' 起义反抗 ' + defenderNameOrFlag + ', 收复连接地',
             attackerNameOrFlag + ' 在 ' + locationDescription + ' 发起起义, 使' + defenderNameOrFlag + '断路',
             attackerNameOrFlag + ' 在 ' + locationDescription + ' 发起起义, 收复连接地并使' + defenderNameOrFlag + '断路'];
    defenderDescription = d[index];
    attackerDescription = a[index];
    log(defenderDescription);
    log(attackerDescription);
}


// battle.html里，伤害条上添加墙高
function setupWall() {
    $('#battleProgressStats').append('<div id="wallStat"></div>');

    function updateFirepower() {
        var end = defenderHistoryClutch.length -1;
        if (end <= 1)
            return;	// 只有一个记录的话，无法计算火力

        // 选择15秒之前的最后一个记录
        var beginning = end - 1;
        while (beginning > 0 && defenderHistoryClutch[beginning][0] > defenderHistoryClutch[end][0] -15)
            beginning --;
        // 如果15秒内有记录的话，优先选择
        if (beginning < end-1);
        beginning ++;

        var t = defenderHistoryClutch[end][0] - defenderHistoryClutch[beginning][0];
        var d = (defenderHistoryClutch[end][1]-defenderHistoryClutch[beginning][1]) / t;
        var a = (attackerHistoryClutch[end][1]-attackerHistoryClutch[beginning][1]) / t;
        //console.log(a+","+d);
        $('#defenderFirepower').text( (d*15/1e6).toFixed(1) );
        $('#attackerFirepower').text( (a*15/1e6).toFixed(1) );
    }

    function updateWall() {
        var t = getEhTime();
        $('#ehCountdown').text(getTimeString(t));
        var defenderScore = parseInt($('#defenderScore').text().replace(/,/g, '').replace(/\xA0/g, ''));
        var attackerScore = parseInt($('#attackerScore').text().replace(/,/g, '').replace(/\xA0/g, ''));
        var wallValue = defenderScore - attackerScore;
        if (wallValue === 0) {
            $("#wallStat").text("");
        }
        else {
            if (wallValue > 0)
                $("#wallStat").text(">> " + wallValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " >>");
            else
                $("#wallStat").text("<< " + (-wallValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " <<");
        }

        if ($('#autoCopy').is(':checked'))
            setClipboard();

        // 页面原本也会更新双方伤害，但是不需要重复记录，只需要记录“自动刷新”时遗漏的

        if ( t>0 && t<clutchStandard) {	// 网络有问题时，页面上显示的时间可能是0
            if (defenderHistoryClutch.length <=1) {	// 自动刷新还没记录伤害数据，则记录页面上显示的伤害
                lastUpdatedSeconds = t;
                defenderHistoryClutch.push( [-t, defenderScore] );
                attackerHistoryClutch.push( [-t, attackerScore] );
            }
            else {
                if (defenderHistoryClutch[defenderHistoryClutch.length-1][1]<defenderScore  || attackerHistoryClutch[attackerHistoryClutch.length-1][1]<attackerScore) {
                    // 自动刷新记录了几组伤害数据，但是页面上显示的伤害比抓取到的伤害高，也记录页面上显示的伤害
                    lastUpdatedSeconds = t;
                    defenderHistoryClutch.push( [-t, defenderScore] );
                    attackerHistoryClutch.push( [-t, attackerScore] );
                }
            }

            $("#wallStat").append(' <b style="font-size:12px;">(' + (lastUpdatedSeconds-t) + '秒前更新)</b>');
            //if (timeBias != 0)
            //$('#roundCountdown').append('<b style="font-size:12px;"> (-' + timeBias + ')</b>'); 

            if (lastUpdatedSeconds<=t) {
                updateFirepower();
                if ($('#ehDivStatistics').attr('style').indexOf('display:block') != -1)	// 趋势图可见时
                    drawChartClutch();
            }
        }
    }
    endEpoch = (new Date().getTime()) + getPageTime()*1000;
    window.setInterval(updateWall, 1000);
}

// battle.html 里设置刷新框
// 2017.8.9 更新：flag class更新的服务器在团体杯、世界大战和新手战场仍旧使用旧版flag class，暂时使用“battleName”判断，如果有更好的判断方法务必请告知我
// 2017.8.21 更新：所有服务器都已改成新版flag

function setupRefresh() {

    // 各种按钮
    var d = $('#ehRefresh');
    var div1 = $('<div>');
    var manualRefresh = $('<button>', {type:'button', class:'small button foundation-style', id:'manualRefresh', style:'padding:6px;', html:'<i class="icon-search"></i>刷新', title:'刷新双方的总伤害'});
    var autoRefresh = $('<input>', {type:'checkbox', class:'foundation-style', id:'autoRefresh', text:'自动'});
    var defenderRadio = $('<input>', {type:'radio', id:'copySideDefender', name:'copySide', value:'defender', checked:'checked'});

    var battleName = $('#fightName a[class=fightFont]').text().trim();
    if ($.inArray(battleName, oldFlagBattleName) < 0)
    {
        var defenderName = $('div.xflagsBig').first().attr('class').split(' ')[2];
        //var defenderFlag = $('<div>', {style:"vertical-align:middle;", class:'flags-small '+defenderName.substring(defenderName.indexOf('-') + 1)});
        var defenderFlag = $('<p>', {style:"vertical-align:middle;", class:'xflagsSmall xflagsSmall-'+defenderName.substring(defenderName.indexOf('-') + 1)});
    }
    else
    {
        //var defenderFlag = $('<div>', {style:"vertical-align:middle;", class:'flags-small '+$('div.fightFlag.flags-big').first().attr('class').split(' ')[2]});
        var defenderFlag = $('<p>', {style:"vertical-align:middle;", class:'xflagsSmall xflagsSmall-'+$('div.fightFlag.flags-big').first().attr('class').split(' ')[2]});
    }


    div1.append(manualRefresh, autoRefresh, '自动', defenderRadio, defenderFlag);
    var div2 = $('<div>');
    var manualCopy = $('<button>', {type:'button', class:'small button foundation-style', id:'manualCopy', style:'padding:6px;', html:'<i class="icon-comment2"></i>复制', title:'复制战场状态到剪贴板'});
    var autoCopy = $('<input>', {type:'checkbox', class:'foundation-style', id:'autoCopy', text:'自动'});
    var attackerRadio = $('<input>', {type:'radio', id:'copySideAttacker', name:'copySide', value:'attacker'});

    if ($.inArray(battleName, oldFlagBattleName) < 0)
    {
        var attackerName = $('div.xflagsBig').last().attr('class').split(' ')[2];
        //var attackerFlag = $('<div>', {style:"vertical-align:middle;", class:'flags-small '+attackerName.substring(attackerName.indexOf('-') + 1)});
        var attackerFlag = $('<p>', {style:"vertical-align:middle;", class:'xflagsSmall xflagsSmall-'+attackerName.substring(attackerName.indexOf('-') + 1)});
    }
    else
    {
        //var attackerFlag = $('<div>', {style:"vertical-align:middle;", class:'flags-small '+$('div.fightFlag.flags-big').last().attr('class').split(' ')[2]});
        var attackerFlag = $('<p>', {style:"vertical-align:middle;", class:'xflagsSmall xflagsSmall-'+$('div.fightFlag.flags-big').last().attr('class').split(' ')[2]});
    }

    div2.append(manualCopy, autoCopy, '自动', attackerRadio, attackerFlag);
    d.append(div1, div2);
    //if (allies.indexOf(attackerId) !== -1 || enemies.indexOf(defenderId) !== -1)
    //$('#copySideAttacker').attr("checked", true); // 进攻方是盟国，或者防守方是敌国，则选择进攻方

    // firePower
    $('#defenderScore').after('<div title="防守方即时输出，仅在自动刷新时显示">防守火力: <b id="defenderFirepower" style="color:lightblue">?</b> M/15秒</div>');
    $('#attackerScore').after('<div title="进攻方即时输出，仅在自动刷新时显示">进攻火力: <b id="attackerFirepower" style="color:pink">?</b> M/15秒</div>');

    // manual button callback
    $('#manualRefresh').click(sendUpdateRequest2);
    $('#manualCopy').click(setClipboard);

    // auto checkbox callback
    var fastTimer = 0;
    $('#autoRefresh').click(function () {
        if ($(this).is(':checked')) {
            if (getEhTime()<=0) //战场结束
            {
                fastTimer = window.setInterval(sendUpdateRequest2, 7000);
            }
            else if (getEhTime()<20) //压秒时间
            {
                fastTimer = window.setInterval(sendUpdateRequest2, 1500);
            }
            else if (getEhTime()<60) //看场时间
            {
                fastTimer = window.setInterval(sendUpdateRequest2, 3000);
            }
            else
            {
                fastTimer = window.setInterval(sendUpdateRequest2, 7000);
            }
            $('#manualRefresh').attr('disabled', true);
        } else {
            window.clearInterval(fastTimer);
            $('#manualRefresh').attr('disabled', false);
        }
    });

    $('#autoCopy').click(function () {
        if ($(this).is(':checked')) {
            $('#manualCopy').attr('disabled', true);
        } else {
            $('#manualCopy').attr('disabled', false);
        }
    });

    // 检查sendUpdateRequest是否改变
    if (typeof(unsafeWindow.sendUpdateRequest) == 'function') {
        var official = unsafeWindow.sendUpdateRequest.toString().replace(/dataString \+\= \'&at\=.+?;/, ';').replace(/dataString \+\= \'&ci\=.+?;/, ';').replace(/\s+/g, "");
        var copy = sendUpdateRequestCopy.toString().replace('sendUpdateRequestCopy', 'sendUpdateRequest').replace(/\s+/g, "");
        if (isPremium)
            copy = sendUpdateRequestCopyPremium.toString().replace('sendUpdateRequestCopyPremium', 'sendUpdateRequest').replace(/\s+/g, "");
        if (official === copy) {
            log('sendUpdateRequest已检查，无变化');
        }
        else {
            var minLen = Math.min(official.length, copy.length);
            for(var i=0; i<minLen; ++i) {
                if(official.charAt(i) != copy.charAt(i))
                    break;
            }
            alert('页面中的 sendUpdateRequest 函数有更新，请联系e-sim helper的开发者。刷新功能暂时禁用。\n' + official.slice(i, i+20) + '\n' + copy.slice(i, i+20));
            $('#autoRefresh').attr('disabled', true);
            $('#manualRefresh').attr('disabled', true);
            log('sendUpdateRequest已检查，有变化');
        }
    }
    else {
        log('sendUpdateRequest未检查');
    }

    if (!isActive) {
        $('#autoRefresh').attr('disabled', true);
        $('#manualRefresh').attr('disabled', true);
        $('#autoCopy').attr('disabled', true);
        $('#manualCopy').attr('disabled', true);
        $('#copySideAttacker').attr('disabled', true);
        $('#copySideDefender').attr('disabled', true);
    }
}


function setClipboard() {
    function getScoreDescription(we, opp) {
        var s = we.toString() + ':' + opp.toString();
        if (we === opp)
            return s;

        if (we>opp) 
            return s + (we===8 ? '获胜' : '领先');
        else 
            return s + (opp===8 ? '失利' : '落后');
    }

    var defenderDamage = parseInt($('#defenderScore').text().replace(/,/g, '').replace(/\xA0/g, ''));
    var attackerDamage = parseInt($('#attackerScore').text().replace(/,/g, '').replace(/\xA0/g, ''));
    var wallValue = ((defenderDamage - attackerDamage)/1e6).toFixed(2);
    var time = getEhTime();

    // battle url
    var report = '';
    if (time>=120 || time%5===0)
        report += document.URL.match(/.+?battle.html\?id=[0-9]+/) + '\n';

    // time
    if (time>=120) {
        if ($("#copySideDefender").is(':checked'))
            report += '第' + roundId + '局(总比分' + getScoreDescription(defenderScore, attackerScore) + '), t' + parseInt(time/60) + '墙高' + wallValue.toString() + 'M\n'  + defenderDescription + (battleLocationId==-1?'':'\n加成地点' + defenderLocationText);
        else 
            report += '第' + roundId + '局(总比分' + getScoreDescription(attackerScore, defenderScore) + '), t' + parseInt(time/60) + '墙高' + (-wallValue).toString() + 'M\n' + attackerDescription + (battleLocationId==-1?'':'\n加成地点' + attackerLocationText);
    }
    else  {
        if (time>0) {
            report += time.toString() + '秒, ';
            var defenderFirepower = parseFloat($('#defenderFirepower').text());
            var attackerFirepower = parseFloat($('#attackerFirepower').text());

            if ($("#copySideDefender").is(':checked')) {
                report += wallValue.toString() + 'M (' + (lastUpdatedSeconds-time) + '秒前更新)';
                if (!isNaN(defenderFirepower))
                    report += ', ' + defenderNameOrFlag + '火力 ' + defenderFirepower + (defenderFirepower<attackerFirepower?'M < ':'M ≥ ') + attackerFirepower + 'M';
            }
            else {
                report += (-wallValue).toString() + 'M (' + (lastUpdatedSeconds-time) + '秒前更新)';
                if (!isNaN(defenderFirepower))
                    report += ', ' + attackerNameOrFlag + '火力 ' + attackerFirepower + (attackerFirepower<defenderFirepower?'M < ':'M ≥ ') + defenderFirepower + 'M';
            }
        }
        else {
            report += battleName + '第' + roundId + '局结束, ';
            if ($("#copySideDefender").is(':checked')) {
                if (defenderDamage >= attackerDamage)
                    report += '防守方' + defenderNameOrFlag + '获胜(' + wallValue.toString() + 'M), 总比分' + getScoreDescription(defenderScore+1, attackerScore);
                else
                    report += '防守方' + defenderNameOrFlag + '失利(' + wallValue.toString() + 'M), 总比分' + getScoreDescription(defenderScore, attackerScore+1);
            }
            else {
                if (attackerDamage >= defenderDamage)
                    report += '进攻方' + attackerNameOrFlag + '获胜(' + (-wallValue).toString() + 'M), 总比分' + getScoreDescription(attackerScore+1, defenderScore);
                else
                    report += '进攻方' + attackerNameOrFlag + '失利(' + (-wallValue).toString() + 'M), 总比分' + getScoreDescription(attackerScore, defenderScore+1);
            }
        }
    }

    GM_setClipboard(report);
}

function adjustTime(realTime) {
    var ehTime = getEhTime();
    var oldTimeBias = timeBias;

    if (realTime < ehTime) {
        timeBias += (ehTime-realTime);
    }
    else {
        if (timeBias>0 && ehTime%6 === 0)
            timeBias --;
    }

    console.log('实际时间≤' + realTime + ', 页面时间=' + getPageTime() + ', eh计时=' + ehTime + ', 修正值=' + oldTimeBias, '->', timeBias);
}


function sendUpdateRequest2(showSpectator) {
    var dataString = 'id=' + battleRoundId;
    dataString += '&at=' + userId;
    dataString += '&ci=' + userCitizenshipId;
    if ( !isPremium && showSpectator===true ) {	// showSpectator may be undefined, so compare explicitly
        log('以高级会员身份抓取数据');
        dataString += '&premium=1';
    }

    $.ajax({
        type: "GET",
        url: "battleScore.html",
        data: dataString,
        dataType: "json",
        success: function(msg) {
            //判断是否最新的数据
            historyLen = defenderHistoryClutch.length;
            if( historyLen > 0) {
                //排除因为网卡，造成先发后到报墙的BUG
                if (defenderHistoryClutch[historyLen-1][1] > parseInt(msg.defenderScore.replace(/,/g, '').replace(/\xA0/g, '')) || attackerHistoryClutch[historyLen-1][1] > parseInt(msg.attackerScore.replace(/,/g, '').replace(/\xA0/g, ''))) {
                    return;
                }
            }
            msg = cloneInto(msg, unsafeWindow);
            unsafeWindow.updateStatus(msg.attackerScore, msg.defenderScore, msg.remainingTimeInSeconds, msg.percentAttackers);
            adjustTime(msg.remainingTimeInSeconds);
            if (msg.remainingTimeInSeconds<=clutchStandard) {	// 可靠的时间和伤害，记录
                lastUpdatedSeconds = msg.remainingTimeInSeconds<0 ? 0 : msg.remainingTimeInSeconds;
                defenderHistoryClutch.push( [-lastUpdatedSeconds, parseInt(msg.defenderScore.replace(/,/g, '').replace(/\xA0/g, ''))] );
                attackerHistoryClutch.push( [-lastUpdatedSeconds, parseInt(msg.attackerScore.replace(/,/g, '').replace(/\xA0/g, ''))] );
                if (lastUpdatedSeconds>0 && $('#ehDivStatistics').attr('style').indexOf('display:block') != -1)	{// visible
                    drawChartClutch();
                }
            }
            unsafeWindow.updateBattleHeros(msg.topAttackers, msg.topDefenders);
            unsafeWindow.updateTop10(msg.top10Attackers, msg.top10Defenders);
            if (!isPremium && showSpectator===true)  {
                $('#ehTotaldefenders').html(msg.defendersOnline);
                $("#ehTotalattackers").html(msg.attackersOnline);
                $("#ehTotalspectators").html(msg.spectatorsOnline);
                $("#ehDefendersMenu").html(msg.defendersByCountries);
                $("#ehAttackersMenu").html(msg.attackersByCountries);
                $("#ehSpectatorsMenu").html(msg.spectatorsByCountries);
            }
            else {
                unsafeWindow.updateBattleMonitor(msg);
            }
            unsafeWindow.updatePlace(msg.yourPlace);
            unsafeWindow.updateTotalDamage(msg.totalPlayerDamage);
            for (var i = 0; i < msg.recentAttackers.length; i++) {
                if (msg.recentAttackers[i].id == unsafeWindow.latestAttackerId) {
                    msg.recentAttackers = cloneInto(msg.recentAttackers.slice(0, i), unsafeWindow);
                    break;
                }
            }
            for (i = 0; i < msg.recentDefenders.length; i++) {
                if (msg.recentDefenders[i].id == unsafeWindow.latestDefenderId) {
                    msg.recentDefenders = cloneInto(msg.recentDefenders.slice(0, i), unsafeWindow);
                    break;
                }
            }

            if (msg.recentAttackers.length !== 0) {
                unsafeWindow.latestAttackerId = msg.recentAttackers[0].id;
                unsafeWindow.attackerHits = msg.recentAttackers;
            }
            if (msg.recentDefenders.length !== 0) {
                unsafeWindow.latestDefenderId = msg.recentDefenders[0].id;
                unsafeWindow.defenderHits = msg.recentDefenders;
            }
        }
    });
}


function sendUpdateRequestCopy() {
    if (!continueThread || !hasFocus)
        return;
    var dataString = 'id=' + $("#battleRoundId").val();

    ;
    ;


    $.ajax({
        type: "GET",
        url: "battleScore.html",
        data: dataString,
        dataType: "json",
        success: function(msg) {
            updateStatus(msg.attackerScore, msg.defenderScore, msg.remainingTimeInSeconds, msg.percentAttackers);
            updateBattleHeros(msg.topAttackers, msg.topDefenders);
            updateTop10(msg.top10Attackers, msg.top10Defenders);
            updateBattleMonitor(msg);
            updatePlace(msg.yourPlace);
            updateTotalDamage(msg.totalPlayerDamage);
            for (var i = 0; i < msg.recentAttackers.length; i++) {
                if (msg.recentAttackers[i].id == latestAttackerId) {
                    msg.recentAttackers = msg.recentAttackers.slice(0, i);
                    break;
                }
            }
            for (var i = 0; i < msg.recentDefenders.length; i++) {
                if (msg.recentDefenders[i].id == latestDefenderId) {
                    msg.recentDefenders = msg.recentDefenders.slice(0, i);
                    break;
                }
            }
            if (msg.recentAttackers.length != 0) {
                latestAttackerId = msg.recentAttackers[0].id;
                attackerHits = msg.recentAttackers;
            }
            if (msg.recentDefenders.length != 0) {
                latestDefenderId = msg.recentDefenders[0].id;
                defenderHits = msg.recentDefenders;
            }

            if (msg.open == false)
                continueThread = false;
        }
    });
}

function sendUpdateRequestCopyPremium() {
    if (!continueThread || !hasFocus)
        return;
    var dataString = 'id=' + $("#battleRoundId").val();

    ;
    ;

    dataString += '&premium=1';


    $.ajax({
        type: "GET",
        url: "battleScore.html",
        data: dataString,
        dataType: "json",
        success: function(msg) {
            updateStatus(msg.attackerScore, msg.defenderScore, msg.remainingTimeInSeconds, msg.percentAttackers);
            updateBattleHeros(msg.topAttackers, msg.topDefenders);
            updateTop10(msg.top10Attackers, msg.top10Defenders);
            updateBattleMonitor(msg);
            updatePlace(msg.yourPlace);
            updateTotalDamage(msg.totalPlayerDamage);
            for (var i = 0; i < msg.recentAttackers.length; i++) {
                if (msg.recentAttackers[i].id == latestAttackerId) {
                    msg.recentAttackers = msg.recentAttackers.slice(0, i);
                    break;
                }
            }
            for (var i = 0; i < msg.recentDefenders.length; i++) {
                if (msg.recentDefenders[i].id == latestDefenderId) {
                    msg.recentDefenders = msg.recentDefenders.slice(0, i);
                    break;
                }
            }
            if (msg.recentAttackers.length != 0) {
                latestAttackerId = msg.recentAttackers[0].id;
                attackerHits = msg.recentAttackers;
            }
            if (msg.recentDefenders.length != 0) {
                latestDefenderId = msg.recentDefenders[0].id;
                defenderHits = msg.recentDefenders;
            }

            if (msg.open == false)
                continueThread = false;
        }
    });
}

function convertDateString(s) {
    return s.slice(6, 10) + '/' + s.slice(3,5) + '/' + s.slice(0,2) + s.slice(10, s.indexOf(':')+6);
}

function drawChartForFinishedBattle(data) {
    var hits = JSON.parse(data);

    var startTime = new Date(convertDateString(hits[hits.length-1].time));
    var endTime = new Date(convertDateString(hits[0].time));
    $('<div>', {text:'服务器时间 ' + startTime.toLocaleString() + ' - ' + endTime.toLocaleString()}).prependTo($('#ehBattleDescription'));


    startTime = startTime.getTime();
    var minutes = parseInt((endTime.getTime()-startTime)/(60*1000));
    if (minutes < 10) {	// possibly be world event
        startTime = endTime - 600*1000;
        minutes = 10;
    }
    else if (minutes < 120) {	// normal battle, without being frozen
        startTime = endTime - 7200*1000;
        minutes = 120;
    }

    var byTime = {true:[], false:[]};
    for (var i=0; i<=minutes; ++i) {
        byTime[true][i] = 0;
        byTime[false][i] = 0;
    }
    var byCountry = {true:{}, false:{}};
var byMU = {true:{}, false:{}};
var byCitizen = {true:{}, false:{}};
var numberOfHits = 0;

for (i=0; i<hits.length; ++i) {
    var hit = hits[i];
    numberOfHits += hit.berserk ? 5 : 1;
    var t = parseInt((Date.parse(convertDateString(hit.time))-startTime)/(60*1000));
    byTime[hit.defenderSide] [t] = byTime[hit.defenderSide] [t]+hit.damage;

    var countryId = hit.citizenship;
    byCountry[hit.defenderSide] [countryId] = (byCountry[hit.defenderSide][countryId]) ? (byCountry[hit.defenderSide][countryId] + hit.damage) : hit.damage;
    var citizenId = hit.citizenId;
    byCitizen[hit.defenderSide] [citizenId] = (byCitizen[hit.defenderSide][citizenId]) ? (byCitizen[hit.defenderSide][citizenId] + hit.damage) : hit.damage;
    var muId = hit.militaryUnit;
    if (muId)
        byMU[hit.defenderSide] [muId] = (byMU[hit.defenderSide][muId]) ? (byMU[hit.defenderSide][muId] + hit.damage) : hit.damage;

}

$('<div>', {text:'本局掉落Q5装备' + (numberOfHits/30000).toFixed(2) + '件，Q4装备' + (numberOfHits/10000).toFixed(2) + '件'}).prependTo($('#ehBattleDescription'));


var d = new Array(minutes+1);
var a = new Array(minutes+1);
d[0] = byTime[true][0];
a[0] = byTime[false][0];
for (i=1; i<=minutes; ++i) {
    d[i] = d[i-1] + byTime[true][i];
    a[i] = a[i-1] + byTime[false][i];
}
var interval = Math.pow(10, Math.floor(Math.log10(Math.max(d[minutes], a[minutes]))));

$.jqplot('ehChart120m',  
         [
    d, 
    a
], 
         {
    series:[
        {color:'blue'}, 
        {color:'red'}
    ], 
    axes:{
        xaxis:{
            label: '时间 (分钟)',
            max: minutes,
            min: 0,
            tickOptions: {formatString:"%d"}
        },
        yaxis:{
            min: 0,
            tickInterval: interval,
            pad: 1.1,
            tickOptions: {formatString:"%'d"}
        }
    } 
}
        );


var seconds = 180;
byTime = {true:[], false:[]};
for (i=0; i<=seconds; ++i) {
    byTime[true][i] = 0;
    byTime[false][i] = 0;
}
var byCitizen = {true:{}, false:{}};

for (i=0; i<hits.length; ++i) {
    var hit = hits[i];
    var t = parseInt( (endTime - Date.parse(convertDateString(hit.time)))/1000 ); // seconds
    t = t>=seconds? seconds : t;
    byTime[hit.defenderSide] [t] = byTime[hit.defenderSide] [t]+hit.damage;

    if (t<seconds) {
        var citizenId = hit.citizenId;
        if (byCitizen[hit.defenderSide][citizenId]) { // 已记录过各种信息
            byCitizen[hit.defenderSide] [citizenId].damage += hit.damage;
            byCitizen[hit.defenderSide] [citizenId].hitNumber[hit.weapon] += hit.berserk ? 5 : 1;
            byCitizen[hit.defenderSide] [citizenId].first = t;
        }
        else { // 该玩家的第一次攻击记录
            byCitizen[hit.defenderSide] [citizenId] = {};
            byCitizen[hit.defenderSide] [citizenId].citizenId = citizenId;
            byCitizen[hit.defenderSide] [citizenId].damage = hit.damage;
            byCitizen[hit.defenderSide] [citizenId].hitNumber = [0, 0, 0, 0, 0, 0];
            byCitizen[hit.defenderSide] [citizenId].hitNumber[hit.weapon] = hit.berserk ? 5 : 1;
            byCitizen[hit.defenderSide] [citizenId].citizenship = hit.citizenship;
            byCitizen[hit.defenderSide] [citizenId].militaryUnit = hit.militaryUnit;
            byCitizen[hit.defenderSide] [citizenId].first = t;
            byCitizen[hit.defenderSide] [citizenId].last = t;
        }
    }
}

var currentD = byTime[true][seconds];
var currentA = byTime[false][seconds];
d = [[-seconds, currentD]];
a = [[-seconds, currentA]];
for (i=seconds-1; i>=0; --i) {
    currentD += byTime[true][i];
    currentA += byTime[false][i];
    d.push([-i, currentD]);
    a.push([-i, currentA]);
}

$.jqplot('ehChartClutch',  
         [
    d, 
    a
], 
         {
    series:[
        {color:'blue'}, 
        {color:'red'}
    ], 
    axes:{
        xaxis:{
            label: '时间 (秒)',
            max: 0,
            min: -seconds,
            tickOptions: {formatString:"%d"}
        },
        yaxis:{
            min: 0, 
            tickInterval: interval,
            pad: 1.1,
            tickOptions: {formatString:"%'d"}
        }
    } 
}
        );

// 压秒玩家排行
fillCitizenTable(byCitizen[true], $('#ehTableClutchDefenders'));
fillCitizenTable(byCitizen[false], $('#ehTableClutchAttackers'));

function fillCitizenTable(dd, tt) {
    // 把输出排行由dict转为array
    var items = Object.keys(dd).map(function(key) {
        return dd[key];
    });
    items.sort(function(first, second) {
        return second.damage - first.damage;
    });

    // 填表
    var div = $('<div>', {style:'text-align: left; margin:1em 1.6em 1em 1em; font-size:.9em;'}).appendTo(tt);
    var table = $('<table>', {style:'width:100%;'}).appendTo(div);
    var tr = $('<tr>').appendTo(table).append(
        $('<td>', {text:'玩家', style:'text-align:center;'}),
        $('<td>', {colspan:2, text:'时段', style:'text-align:center;'}),
        $('<td>', {text:'次数', style:'text-align:right;'}),
        $('<td>', {text:'Q5', style:'text-align:right;'}),
        $('<td>', {text:'伤害值', style:'text-align:right;'})
    );
    $.each(items, function(index, one) {
        var line = $('<tr>').appendTo(table);
        var td = $('<td>').appendTo(line);
        $('<b>', {style:'float:left;padding: 0 .5em 0 0', text:index+1}).appendTo(td);
        //$('<div>', {class:'flags-small ' + countryInfo[one.citizenship].flagName}).appendTo(td);
        $('<div>', {class:'xflagsSmall xflagsSmall-' + countryInfo[one.citizenship].flagName}).appendTo(td);
        if (citizenPage[one.citizenId]) { // 有头像信息
            $('<img>', {align:'absmiddle', class:'smallAvatar', src:citizenPage[one.citizenId].avatar.replace('normal', 'small')}).appendTo(td);
        }
        else {
            $('<img>', {align:'absmiddle', class:'smallAvatar', src:'//cdn.e-sim.org/img/blank-avatar.png'}).appendTo(td);
        }
        $('<a>', {class:'profileLink', href:'profile.html?id=' + one.citizenId, text:citizenInfo[one.citizenId] ? citizenInfo[one.citizenId].login : '???'}).appendTo(td);
        $('<td>', {style:'text-align:right;', text:one.first + '~'}).appendTo(line);
        $('<td>', {style:'text-align:right;', text:one.last + 's'}).appendTo(line);
        var totalHitNumber = 0;
        $.each(one.hitNumber, function(index, value) {totalHitNumber += value;});
        $('<td>', {style:'text-align:right;', text:totalHitNumber}).appendTo(line);
        $('<td>', {style:'text-align:right;', text:one.hitNumber[5]}).appendTo(line);
        $('<td>', {style:'text-align:right;', text:one.damage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}).appendTo(line);
    });
}
}


function drawChartClutch() {
    if (getEhTime()>=clutchStandard) {
        $('#ehChartClutch').text('压秒趋势图仅在战场结束前' + clutchStandard + '秒内显示');
        return;
    }
    $('#ehChartClutch').text('');
    console.log(getEhTime(), '重绘压秒趋势图');

    if (chartClutch)
        chartClutch.destroy();	// faster than replot(). weird.

    chartClutch = $.jqplot('ehChartClutch',  
                           [
        defenderHistoryClutch, 
        attackerHistoryClutch
    ], 
                           {
        series:[
            {color:'blue'}, 
            {color:'red'}
        ], 
        axes:{
            xaxis:{
                label: '倒计时',
                max: 0,
                pad: 1.1,
                tickOptions: {formatString:"%d"}
            },
            yaxis:{
                min: 0, 
                pad: 1.1,
                tickOptions: {formatString:"%'d"}
            }
        } 
    }
                          );
}



// battle.html 统计
function setupStatistics() {

    if (!isActive) {    // 120分钟的统计
        $('#ehButtonStatistics').click();
        $('#ehDivStatistics').append( $('<div>', {id:'ehBattleDescription'}) );
        $('#ehDivStatistics').append( '<br /> <div style="font-size:24px;"> 全场趋势图 </div>' );
        $('#ehDivStatistics').append( $('<div>', {id:'ehChart120m', style:'height:300px;width:750px;'}) );
        $('<table>', {id:'ehTable120m'}).hide().appendTo($('#ehDivStatistics'));
        $('#ehDivStatistics').append( '<br /> <br /> <br /> <div style="font-size:24px;"> 压秒趋势图 </div>' );
        $('#ehDivStatistics').append( $('<div>', {id:'ehChartClutch', style:'height:300px;width:750px;'}) );
        $('<div>', {id:'ehTableClutchDefenders', class:'foundation-style small-5 columns'}).appendTo($('#ehDivStatistics'));
        $('<div>', {id:'ehTableClutchAttackers', class:'foundation-style small-5 columns'}).appendTo($('#ehDivStatistics'));

        $.ajax({
            url: 'apiFights.html?battleId=' + battleId + '&roundId=' + roundId,
            timeout: 5000,
            success: drawChartForFinishedBattle,
            error: function(xhr,textStatus){
                log('战斗记录抓取错误 (', textStatus, ')，重新抓取');
                $.ajax(this);
            },
        });
    }
    else {	// 压秒趋势图
        $('#ehDivStatistics').append( '<br /> <div style="font-size:24px;"> 压秒趋势图 </div>' );
        $('#ehDivStatistics').append( $('<div>', {id:'ehChartClutch', style:'height:300px;width:750px;'}) );
        defenderHistoryClutch = [[]];
        attackerHistoryClutch = [[]];
        chartClutch = null;
        clutchStandard = 300;	// 多少秒内才算压秒，画趋势图
        lastUpdatedSeconds = getEhTime();
        $('#ehButtonStatistics').click(drawChartClutch);
    }
}

function setupSpectator() {
    if (!isActive) {
        $('#ehButtonSpectator').attr('disabled', true);
        return;
    }

    if (isPremium) {
        $('#ehButtonSpectator').off('click');
        $('#ehButtonSpectator').attr('title', '复制观战人数到剪贴板');
        $('#ehButtonSpectator').click(function() {
            var str = document.URL.match(/.+?battle.html\?id=[0-9]+/) + '\n';
            str += battleName + '共有' + $('#totalspectators').text() + '人观战 (' + $('#totaldefenders').text() + '人防守, ' + $('#totalattackers').text() + '人进攻)\n';
            str += $('#spectatorsMenu').text().replace(/-[ \n\r]*/g, '- ').replace(/[\n\r]+ +/g, '\n');
            GM_setClipboard(str);
        });
    }
    else {
        var d = $('#ehDivSpectator');
        d.append( $('<div>', {style:"font-color:red; font-size:24px;", text:"此功能利用了e-sim的小漏洞，有一定危险性，请自行承担后果"}) );
        d.append( $('<button>', {type:'button', class:'small button foundation-style', id:"showSpectator", text:"我知道了，还是想看！", click:function() {sendUpdateRequest2(true);} }) );
        var monitor = $('<div>');
        d.append(monitor);
        monitor.append('<div class="foundation-style small-3 columns">  <b>Total defenders online:</b> <i id="ehTotaldefenders"  style="display: inline;">0</i>  <br> <div align="center" id="ehDefendersMenu" >No one <br> </div>  </div>');
        monitor.append('<div class="foundation-style small-4 columns">  <b>Total spectators online:</b><i id="ehTotalspectators"                         >0</i>  <br> <div align="center" id="ehSpectatorsMenu">No one <br> </div>  </div>');
        monitor.append('<div class="foundation-style small-3 columns">  <b>Total attackers online:</b> <i id="ehTotalattackers"  style="display: inline;">0</i>  <br> <div align="center" id="ehAttackersMenu" >No one <br> </div>  </div>');
    }
}

function setupAlarm() {
    if (!isActive) {
        $('#ehButtonAlarm').attr('disabled', true);
        return;
    }

    var t = getEhTime();

    var alarmMode = $('<div>');
    var AlertRadio = $('<input>', {type:'radio', id:'AlertRadio', name:'alarmRadio', value:'alert', checked:'checked'});
    var NotificationRadio = $('<input>', {type:'radio', id:'NotificationRadio', name:'alarmRadio', value:'notification'});
    var testNotificationButton = $('<button>', {type:'button', class:'small button foundation-style', id:"testNotification", text:"测试", click:function() {setAudioAlarm(); $('#NotificationRadio').is(":checked") ? setNotification('Test') : alert('测试闹钟提醒');} });
    alarmMode.append('选择提醒方式：',AlertRadio,' 对话框 ',NotificationRadio,' 桌面通知 ',testNotificationButton,' 建议在首次使用闹钟或更改闹钟设置后进行一次测试');
    $('#ehDivAlarm').append(alarmMode);

    var t10Alarm = $('<div>', {class:"foundation-style small-2 columns"});
    t10Alarm.append( $('<i>', {class:"icon-uptime", style:"font-size:20px;"}) );
    t10Alarm.append( $('<input>', {type:"checkbox", class:'foundation-style', id:"alarmEnable10", value:10}), ' t10提醒');

    var t5Alarm = $('<div>', {class:"foundation-style small-3 columns"});
    t5Alarm.append( $('<i>', {class:"icon-uptime", style:"font-size:20px;"}) );
    t5Alarm.append( $('<input>', {type:"checkbox", class:'foundation-style', id:"alarmEnable5", value:5}), ' t5提醒');

    var t2Alarm = $('<div>', {class:"foundation-style small-3 columns"});
    t2Alarm.append( $('<i>', {class:"icon-uptime", style:"font-size:20px;"}) );
    t2Alarm.append( $('<input>', {type:"checkbox", class:'foundation-style', id:"alarmEnable2", value:2}), ' t2提醒');

    var t1Alarm = $('<div>', {class:"foundation-style small-2 columns"});
    t1Alarm.append( $('<i>', {class:"icon-uptime", style:"font-size:20px;"}) );
    t1Alarm.append( $('<input>', {type:"checkbox", class:'foundation-style', id:"alarmEnable1", value:1}), ' t1提醒');

    $('#ehDivAlarm').append(t10Alarm, t5Alarm, t2Alarm, t1Alarm);

    if (t<=10*60)
        $('#alarmEnable10').attr('disabled', true);
    else
        setTimeout(function() {if ($('#alarmEnable10').is(":checked")) {setAudioAlarm(); $('#NotificationRadio').is(":checked") ? setNotification('Alarm') : alert(battleName + '倒计时10分钟');} $('#alarmEnable10').attr('disabled', true); }, (t-10*60)*1000);

    if (t<=5*60)
        $('#alarmEnable5').attr('disabled', true);
    else
        setTimeout(function() {if ($('#alarmEnable5').is(":checked")) {setAudioAlarm(); $('#NotificationRadio').is(":checked") ? setNotification('Alarm') : alert(battleName + '倒计时5分钟');} $('#alarmEnable5').attr('disabled', true); }, (t-5*60)*1000);

    if (t<=2*60)
        $('#alarmEnable2').attr('disabled', true);
    else
        setTimeout(function() {if ($('#alarmEnable2').is(":checked")) {setAudioAlarm(); $('#NotificationRadio').is(":checked") ? setNotification('Alarm') : alert(battleName + '倒计时2分钟');} $('#alarmEnable2').attr('disabled', true); }, (t-2*60)*1000);

    if (t<=1*60)
        $('#alarmEnable1').attr('disabled', true);
    else
        setTimeout(function() {if ($('#alarmEnable1').is(":checked")) {setAudioAlarm(); $('#NotificationRadio').is(":checked") ? setNotification('Alarm') : alert(battleName + '倒计时1分钟');} $('#alarmEnable1').attr('disabled', true); }, (t-1*60)*1000);

    // 2017.8.20 更新：修改网页标题
    setInterval(updateClock,1000);
}

// 2017.9.7 更新：桌面通知方式提醒
function setNotification(e) { //发出桌面通知
  if (Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(function(status) {
      if (status === 'granted') {
        var notification = {
          Common: {
            text: '未知',
            time: 5
          },
          Error: {
            text: '某些错误发生了',
            time: 10
          },
          Alarm: {
            text: '压秒时间到！',
            time: 30
          },
          Test: {
            text: '测试文本',
            time: 3
          }
        }[e];
        var n = new Notification(notification.text, {
          icon: '//cdn.e-sim.org/img/bestEsim.png',
          body:'夯夯！'
        });
        setTimeout(function() {
          if (n) n.close();
        }, 1000 * notification.time);

        var nClose = function(e) {
          if (n) n.close();
          //document.removeEventListener(e.type, nClose, true);
        };
        //document.addEventListener('mousemove', nClose, true);
      }
    });
  }
}

// 2017.9.17 更新：语音闹钟，代码暂时直接用抄来的，尚待改进
function gE(ele, mode, parent) { //获取元素
    if (typeof ele === 'object') {
        return ele;
    } else if (mode === undefined && parent === undefined) {
        return (isNaN(ele * 1)) ? document.querySelector(ele) : document.getElementById(ele);
    } else if (mode === 'all') {
        return (parent === undefined) ? document.querySelectorAll(ele) : parent.querySelectorAll(ele);
    } else if (typeof mode === 'object' && parent === undefined) {
        return mode.querySelector(ele);
    }
}

function cE(name) { //创建元素
    return document.createElement(name);
}

function setAudioAlarm() { //发出音频警报
    var apa = localStorage.getItem("alarmPlayAudio");
    if (apa == null || apa != "true")
    {
        return;
    }
    else
    {
        var apaurl = localStorage.getItem("alarmPlayAudioUrl");
        if (apaurl == null)
        {
            return;
        }
    }
    var audio;
    if (gE('#EHAudio')) {
        audio = gE('#EHAudio');
    } else {
        audio = gE('body').appendChild(cE('audio'));
        audio.id = 'EHAudio';
        audio.src = apaurl;
        audio.controls = true;
        audio.loop = false;
    }
    audio.play();
}

// 2017.8.22 更新：标题的倒计时放在战场名称前面
function updateClock()
{
    var t = getEhTime();
    if (document.title.indexOf("：") != -1)
    {
        var bn = document.title.split("：")[1];
    }
    else
    {
        var bn = document.title;
    }
    //倒计时 99 秒时开始以秒计数
    if (t>99)
    {
        var tc = "T" + parseInt(t/60).toString();
    }
    else
    {
        var tc = "S" + t.toString();
    }
    document.title = tc + "：" + bn;
}


function setupFight() {
    var fightButtons = $('[id^=fightButton]');
    if (fightButtons.length===0)
        return;

    var criticalCSS = ".critical { color:red; }";
    GM_addStyle(criticalCSS); 

    var originalFightButtonDiv = fightButtons.parent().parent();
    $('[id^=fightButton] > i', originalFightButtonDiv).remove();	// 删除攻击按钮上的图标
    var damageDiv = $('<div>', {id:'fightLeft', class:'foundation-style small-3 columns', style:"font-size:12px;"});
    var newfightButtonDiv = $('<div>', {id:'fightRight', class:'foundation-style small-7 columns foundation-text-center'});
    newfightButtonDiv.append(originalFightButtonDiv.children());
    originalFightButtonDiv.append(damageDiv, newfightButtonDiv);

    var damageHelp = $('<div>', {class:"foundation-style small-5 columns foundation-text-left", html:'<b id="ehCountdown">00:00:00</b>', title:"点击刷新按钮可校准"});
    var hitsNumber = $('<div>', {class:"foundation-style small-1 columns foundation-text-right", html:'x<b id="ehHitsNumber">0</b>', title:"在当前页面上攻击的次数, 刷新页面会清零"});
    var totalDamage = $('<div>', {class:"foundation-style small-4 columns foundation-text-right", html:'<div id="ehTotalDamage">0</div>', title:"在当前页面上攻击的总伤害, 刷新页面会清零"});
    var damageHistory = $('<div>', {id:'fightHistory'}); //, class:"foundation-text-right", style:"overflow:auto; height:72px"});
    var showMsg = $('<div>', {html:'<b id="showMsg"></b>'});
    damageDiv.append(damageHelp, hitsNumber, totalDamage, damageHistory, showMsg);

    damageHistory.append('<div id="ehHistoryExpand" class="small-6"><i class="icon-uniF475" title="展开所有伤害记录"></i></div>',
                         '<div id="ehHistoryContract" class="small-6"><i class="icon-uniF474" title="收起输出伤害"></i></div>');
    $('#ehHistoryExpand').hide().click(function() {
        $('#fightHistory > div').slice(6).show();
        $(this).hide();
    });
    $('#ehHistoryContract').hide().click(function () {
        $('#fightHistory > div').slice(6).hide();
        $('#ehHistoryExpand').show();
    });


    // 抓取伤害
    $(".pico-content").livequery(function() {
        var damageText = $('#DamageDone', $(this));
        if (damageText.length >0) {
            var damage = parseInt( damageText.text().replace(/,/g, '').replace(/\xA0/g, '') );
            var icons = $('.fightsprite', damageText.parent().parent());

            var ehIcons = {'bomb':['grey', '无暴击(pain dealer)'],
                           'tank':['grey', '无坦克(tank)'],
                           'syringe':['grey', '无类固醇(steroid)'],
                           'airplane':['grey', '无地点加成'],
                           'bookmark':['grey', '无军令加成']
                          };
            var iconToEhIcon = {'absorbed':['loved', ['lightgreen', '闪避(avoid)']],
                                'mu':['bookmark', ['lightgreen', '有军令加成']],
                                'location':['airplane', ['lightgreen', '有地点加成']],
                                'STEROIDSplus':['syringe', ['lightgreen', '有类固醇(steroid)']],
                                'STEROIDSminus':['syringe', ['pink', '类固醇副作用(steroid)']],
                                'TANKplus':['tank', ['lightgreen', '有坦克(tank)']],
                                'TANKminus':['tank', ['pink', '坦克副作用(tank)']],
                                'xp1':['xp', 1],
                                'xp5':['xp', 5],
                                'PAIN_DEALER_1_Hplus':['bomb', ['lightgreen', '1小时暴击(pain dealer)']],
                                'PAIN_DEALER_10_Hplus':['bomb', ['lightgreen', '10小时暴击(pain dealer)']],
                                'PAIN_DEALER_25_Hplus':['bomb', ['lightgreen', '25小时暴击(pain dealer)']]
                               };


            for (var i=0; i<icons.length; ++i) {
                var iconName = icons.eq(i).attr('class').split(' ').pop();
                if (iconName in iconToEhIcon) {
                    var modifier = iconToEhIcon[iconName];
                    ehIcons[modifier[0]] = modifier[1];
                }
            }

            var leftHtml = '';
            var xp = ehIcons.xp;
            delete ehIcons.xp;
            for (i in ehIcons) 
                leftHtml = '<i style="color:' + ehIcons[i][0] + ';" class="icon-'+i+'" title="' + ehIcons[i][1] + '"></i>' + leftHtml;
            leftHtml += '<b title="'+xp+'次攻击">x' + xp + '</b>';

            var divs = $('div[class^=foundation-style]', damageHistory);
            if (divs.length===6)
                $('#ehHistoryExpand').show();
            divs.slice(0, 2).attr('style', 'opacity:0.6;');
            divs.slice(2, 4).attr('style', 'opacity:0.3;');
            if ($('#ehHistoryExpand').is(':hidden')===false) // expand button is visible
                divs.slice(4, 6).hide();

            //判断是否暴击
            var isCritical = ($("#fightResult>div").attr('class').split(' ').pop().indexOf("critical") !== -1);

            if (isCritical) {
                damageHistory.prepend($('<div>', {class:"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                      $('<div>', {class:"foundation-style small-4 columns foundation-text-right critical", text:damageText.text()}));                    
            } else {
                damageHistory.prepend($('<div>', {class:"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                      $('<div>', {class:"foundation-style small-4 columns foundation-text-right", text:damageText.text()}));                    
            }

            $('#ehHitsNumber').text( parseInt($('#ehHitsNumber').text()) + xp);
            $('#ehTotalDamage').text( (parseInt($('#ehTotalDamage').text().replace(/,/g, '').replace(/\xA0/g, '')) + damage).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
        }
        //$(this).hide();
    });

    // 屏蔽伤害弹窗
    //$(".pico-overlay").livequery(function() {
    //$('[class^=pico-]').attr('style', 'display:none;');
    //$(this).click();
    //});

}



//2017.8.12 更新：推测观战玩家中 添加获取目标国家的联盟成员
//                但整个推测功能终究只是对观战的国家进行扫描，不会扫描没出现在观战列表中的任何玩家，所以这个扫描联盟的功能也只能算个帮助分类玩家的功能吧
function setupSpectatorDetail() {
    var mainDiv = $('#ehDivSpectatorDetail');
    var button = $('<button>', {id:"eh2ShowSpectatorDetail", text:"推测观战玩家（必须先查看过观战人员）", class:"foundation-style button", style:"padding:10px; margin:5px;"}).appendTo($('<div>').appendTo(mainDiv));
    var button2 = $('<button>', {id:"eh2ShowSpectatorBuff", text:"显示玩家状态", class:"foundation-style button", style:"padding:10px; margin:5px;", "disabled":true}).insertAfter(button);
    var coalitionCheck = $("<INPUT TYPE='checkbox' id='eh2CheckCoalition'>按联盟分类玩家</INPUT>").insertAfter(button2);
    var defenders = $('<div>', {id:"eh2Defenders", style:"text-align:left;"}).appendTo($('<div>', {class:"foundation-style columns", style:"width:33%;", text:"可能的防御者"}).appendTo(mainDiv));
    var strangers = $('<div>', {id:"eh2Strangers", style:"text-align:left;"}).appendTo($('<div>', {class:"foundation-style columns", style:"width:34%;", text:"其他人"}).appendTo(mainDiv));
    var attackers = $('<div>', {id:"eh2Attackers", style:"text-align:left;"}).appendTo($('<div>', {class:"foundation-style columns", style:"width:33%;", text:"可能的进攻者"}).appendTo(mainDiv));

    var information = {defenderRegions: [], attackerRegions:[]};
    $('#defenderRegions input').each(function() {
        information.defenderRegions.push(parseInt($(this).attr('value')));
    });
    $('#attackerRegions input').each(function() {
        information.attackerRegions.push(parseInt($(this).attr('value')));
    });

    button.click(function() {
        button.attr("disabled", true);
        button2.attr("disabled", true);
        getOnlineCitizens();
        getMuCitizens();
        if ($('#eh2CheckCoalition').is(':checked'))
        {
            getAlliances2();
        }
        else
        {
            getAlliances();
        }
    });

    function getOnlineCitizens() {
        var byCountry = $('#' + (isPremium ? 'spectatorsMenu' : 'ehSpectatorsMenu')).text().replace(/-[ \n\r]*/g, '- ').replace(/[\n\r]+ +/g, '\n').trim().split("\n");
        var onlineCitizens = []; // 由下面的ajax更新

        var pendingCountryNumber = byCountry.length;
        $.each(byCountry, function(index, numberAndCountry) {
            var pair = numberAndCountry.split(' - ');
            var spectatorNumberForOneCountry = pair[0];
            var countryId = countryInfo[pair[1]] && countryInfo[pair[1]].id;
            if (!countryId) {
                if (--pendingCountryNumber === 0) {
                    information.onlineCitizens = onlineCitizens;
                    console.log('相关国家的在线玩家扫描完毕');
                    show();
                }
                return;
            }

            // 查看该国的在线玩家
            // 2017.8.12 更新：var trs = $('table.filteredTable:last tr:gt(0)', data); -> var trs = $('table.dataTable:last tr:gt(0)', data);
            $.ajax({
                url: "citizensOnline.html?countryId=" + countryId,
                success: function(data) {
                    //var trs = $('table.filteredTable:last tr:gt(0)', data);
                    var trs = $('table.dataTable:last tr:gt(0)', data);
                    var onlineNumberForOneCountry = trs.length;
                    console.log(countryInfo[countryId].name, "共有"+onlineNumberForOneCountry+"名在线玩家");//1名时有可能是空
                    trs.each(function(){ // 在线玩家表格的每一行
                        if ($('td', $(this)).length === 1) {// 该行只有一个cell，退出
                            console.log(countryInfo[countryId].name, "没有玩家");
                            return;
                        }

                        var citizenId = parseInt($('td:first a', $(this)).attr('href').match(/([0-9]+)$/)[1]);
                        var locationId = parseInt($('td:last a', $(this)).attr('href').match(/([0-9]+)$/)[1]);
                        var html = 
                            onlineCitizens.push({
                                citizenId:citizenId, 
                                locationId:locationId, 
                                countryId:countryId, 
                                a:spectatorNumberForOneCountry, 
                                b:onlineNumberForOneCountry, 
                                profile:$('td:first a', $(this)),
                                avatar:$('td:first img', $(this)).attr("class", "smallAvatar").attr("style", "").attr("align", "absmiddle")
                            });
                        //console.log(countryInfo[countryId].name, $('td:first a', $(this)).text(), citizenId, locationId);
                        if (--pendingCountryNumber === 0) {
                            information.onlineCitizens = onlineCitizens;
                            console.log('相关国家的在线玩家扫描完毕');
                            show();
                        }
                    });
                },
                error: function(xhr,textStatus){
                    console.log("抓取错误 (", textStatus, ")，重新抓取");
                    $.ajax(this);
                }
            }); // ajax结束
        });
    }

    function getMuCitizens() {
        $.ajax({
            url: "battleUnitsStats.html?id=" + battleId,
            success: function(data) {

                // 防御方军团
                var defenderMuLinks = $('div.small-5:eq(-2) a', data);
                var pendingDefenderMuNumber = defenderMuLinks.length;
                if (pendingDefenderMuNumber === 0) {
                    console.log('防御方没有军团');
                    information.defenderMus = [];
                    show();
                }
                else {
                    var defenderMus = [];
                    defenderMuLinks.each(function() { // 抓取各防御军团的人员列表
                        var muId = parseInt($(this).attr("href").match(/([0-9]+)$/)[1]);
                        defenderMus.push(muId);

                        getMuMemberInfo(muId, function() {
                            if (--pendingDefenderMuNumber === 0) {
                                information.defenderMus = defenderMus;
                                console.log('防御方军团玩家扫描完毕');
                                show();
                            }
                        });

                    }); // 抓取各防御军团的人员列表
                }  // 防御方军团抓取结束

                // 进攻方军团
                var attackerMuLinks = $('div.small-5:last a', data);
                var pendingAttackerMuNumber = attackerMuLinks.length;
                if (pendingAttackerMuNumber === 0) {
                    console.log('进攻方没有军团');
                    information.attackerMus = [];
                    show();
                }
                else {
                    var attackerMus = [];
                    attackerMuLinks.each(function() { // 抓取各进攻军团的人员列表
                        var muId = parseInt($(this).attr("href").match(/([0-9]+)$/)[1]);
                        attackerMus.push(muId);

                        getMuMemberInfo(muId, function() {
                            if (--pendingAttackerMuNumber === 0) {
                                information.attackerMus = attackerMus;
                                console.log('进攻方军团玩家扫描完毕');
                                show();
                            }
                        });
                    }); // 抓取各进攻军团的人员列表
                } // 进攻方军团抓取结束


            },
            error: function(xhr,textStatus){
                console.log("抓取错误 (", textStatus, ")，重新抓取");
                $.ajax(this);
            }
        }); // ajax结束
    }

    // 2017.8.26 更新：联盟和盟友国旗样式改变
    function getAlliances() {
        if (!defenderId) {
            information.defenderAllies = [];
        }
        else if (defenderId === allies[0]) {
            information.defenderAllies = allies;
        }
        else {
            $.ajax({
                url: "countryPoliticalStatistics.html?countryId=" + defenderId,
                success: function(data) {
                    console.log(countryInfo[defenderId].name, "盟友抓取成功");
                    var localAllies = [defenderId];

                    /*
                    var allyFlagDivs = $("div.flags-medium", $("table.dataTable:last", data));
                    allyFlagDivs.each(function() {
                        var flagName = $(this).attr("class").split(" ").pop();
                        localAllies.push(countryInfo[flagName].id);
                    });
                    */
                    var allyFlagDivs = $("div.xflagsMedium", $("table.dataTable:last", data));
                    allyFlagDivs.each(function() {
                        var flagName = $(this).attr("class").split(" ").pop();
                        flagName = flagName.substring(flagName.indexOf('-') + 1);
                        console.log("防守方盟友：" + flagName);
                        localAllies.push(countryInfo[flagName].id);
                    });

                    information.defenderAllies = localAllies;
                    show();
                },
                error: function(xhr,textStatus){
                    console.log(countryInfo[defenderId].name, "盟友抓取错误 (", textStatus, ")，重新抓取");
                    $.ajax(this);
                },
            });   
        }

        if (!attackerId) {
            information.attackerAllies = [];
        }
        else if (attackerId === allies[0]) {
            information.attackerAllies = allies;
        }
        else {
            $.ajax({
                url: "countryPoliticalStatistics.html?countryId=" + attackerId,
                success: function(data) {
                    console.log(countryInfo[attackerId].name, "盟友抓取成功");
                    var localAllies = [attackerId];

                    /*
                    var allyFlagDivs = $("div.flags-medium", $("table.dataTable:last", data));
                    allyFlagDivs.each(function() {
                        var flagName = $(this).attr("class").split(" ").pop();
                        localAllies.push(countryInfo[flagName].id);
                    });
                    */
                    var allyFlagDivs = $("div.xflagsMedium", $("table.dataTable:last", data));
                    allyFlagDivs.each(function() {
                        var flagName = $(this).attr("class").split(" ").pop();
                        flagName = flagName.substring(flagName.indexOf('-') + 1);
                        console.log("进攻方盟友：" + flagName);
                        localAllies.push(countryInfo[flagName].id);
                    });

                    information.attackerAllies = localAllies;
                    show();
                },
                error: function(xhr,textStatus){
                    console.log(countryInfo[attackerId].name, "盟友抓取错误 (", textStatus, ")，重新抓取");
                    $.ajax(this);
                },
            });        
        }
    }
    // 2017.8.12 更新：添加获取目标国家的联盟成员
    // 2017.8.26 更新：联盟和盟友国旗样式改变
    function getAlliances2() {
        if (!defenderId) {
            information.defenderAllies = [];
        }
        else if (defenderId === allies[0]) {
            information.defenderAllies = allies;
        }
        else {
            $.ajax({
                url: "countryPoliticalStatistics.html?countryId=" + defenderId,
                success: function(data) {
                    console.log(countryInfo[defenderId].name, "盟友及联盟抓取成功");
                    var localAllies = [defenderId];

                    /*
                    var allyFlagDivs = $("div.flags-medium", $("table.dataTable:last", data));
                    allyFlagDivs.each(function() {
                        var flagName = $(this).attr("class").split(" ").pop();
                        console.log("防守方盟友：" + flagName);
                        localAllies.push(countryInfo[flagName].id);
                    });
                    */
                    var allyFlagDivs = $("div.xflagsMedium", $("table.dataTable:last", data));
                    allyFlagDivs.each(function() {
                        var flagName = $(this).attr("class").split(" ").pop();
                        flagName = flagName.substring(flagName.indexOf('-') + 1);
                        console.log("防守方盟友：" + flagName);
                        localAllies.push(countryInfo[flagName].id);
                    });

                    //获取联盟国家
                    var coalitionH = $("h2", data);
                    var coalitionH2;
                    if (coalitionH.length >4 )//没有总统
                    {
                        coalitionH2 = coalitionH[2];
                    }
                    else
                    {
                        coalitionH2 = coalitionH[1];
                    }
                    if (coalitionH2.innerText.split(" ")[0] != "Coalition")
                    {
                        console.log("防守方没有联盟");
                    }
                    else
                    {
                        console.log("防守方属于联盟 "+coalitionH2.innerText.split(" ")[1]);
                        /*
                        var coalitionFlagDivs = $(coalitionH, data).nextAll("div.flags-small");
                        coalitionFlagDivs.each(function() {
                            var flagName = $(this).attr("class").split(" ").pop();
                            if (countryInfo[defenderId].flagName != flagName )
                            {
                                console.log("防守方联盟成员国："+flagName);
                                localAllies.push(countryInfo[flagName].id);
                            }
                        });
                        */
                        var coalitionFlagDivs = $(coalitionH2, data).nextAll("div.xflagsSmall");
                        coalitionFlagDivs.each(function() {
                            var flagName = $(this).attr("class").split(" ").pop();
                            flagName = flagName.substring(flagName.indexOf('-') + 1);
                            if (countryInfo[defenderId].flagName != flagName )
                            {
                                console.log("防守方联盟成员国："+flagName);
                                localAllies.push(countryInfo[flagName].id);
                            }
                        });
                    }

                    //去重
                    var localAllies2 = $.unique(localAllies.sort());

                    information.defenderAllies = localAllies2;
                    show();
                },
                error: function(xhr,textStatus){
                    console.log(countryInfo[defenderId].name, "盟友及联盟抓取错误 (", textStatus, ")，重新抓取");
                    $.ajax(this);
                },
            });   
        }

        if (!attackerId) {
            information.attackerAllies = [];
        }
        else if (attackerId === allies[0]) {
            information.attackerAllies = allies;
        }
        else {
            $.ajax({
                url: "countryPoliticalStatistics.html?countryId=" + attackerId,
                success: function(data) {
                    console.log(countryInfo[attackerId].name, "盟友及联盟抓取成功");
                    var localAllies = [attackerId];

                    /*
                    var allyFlagDivs = $("div.flags-medium", $("table.dataTable:last", data));
                    allyFlagDivs.each(function() {
                        var flagName = $(this).attr("class").split(" ").pop();
                        console.log("进攻方盟友：" + flagName);
                        localAllies.push(countryInfo[flagName].id);
                    });
                    */
                    var allyFlagDivs = $("div.xflagsMedium", $("table.dataTable:last", data));
                    allyFlagDivs.each(function() {
                        var flagName = $(this).attr("class").split(" ").pop();
                        flagName = flagName.substring(flagName.indexOf('-') + 1);
                        console.log("进攻方盟友：" + flagName);
                        localAllies.push(countryInfo[flagName].id);
                    });

                    //获取联盟国家
                    var coalitionH = $("h2", data);
                    var coalitionH2;
                    if (coalitionH.length >4 )//没有总统
                    {
                        coalitionH2 = coalitionH[2];
                    }
                    else
                    {
                        coalitionH2 = coalitionH[1];
                    }
                    if (coalitionH2.innerText.split(" ")[0] != "Coalition")
                    {
                        console.log("进攻方没有联盟");
                    }
                    else
                    {
                        console.log("进攻方属于联盟 "+coalitionH2.innerText.split(" ")[1]);
                        /*
                        var coalitionFlagDivs = $(coalitionH, data).nextAll("div.flags-small");
                        coalitionFlagDivs.each(function() {
                            var flagName = $(this).attr("class").split(" ").pop();
                            if (countryInfo[attackerId].flagName != flagName )
                            {
                                console.log("进攻方联盟成员国："+flagName);
                                localAllies.push(countryInfo[flagName].id);
                            }
                        });
                        */
                        var coalitionFlagDivs = $(coalitionH2, data).nextAll("div.xflagsSmall");
                        coalitionFlagDivs.each(function() {
                            var flagName = $(this).attr("class").split(" ").pop();
                            flagName = flagName.substring(flagName.indexOf('-') + 1);
                            if (countryInfo[attackerId].flagName != flagName )
                            {
                                console.log("进攻方联盟成员国："+flagName);
                                localAllies.push(countryInfo[flagName].id);
                            }
                        });
                    }
                    //去重
                    var localAllies2 = $.unique(localAllies.sort());

                    information.attackerAllies = localAllies2;
                    show();
                },
                error: function(xhr,textStatus){
                    console.log(countryInfo[attackerId].name, "盟友及联盟抓取错误 (", textStatus, ")，重新抓取");
                    $.ajax(this);
                },
            });        
        }
    }
    
    function show() {
        if (!information.onlineCitizens || !information.defenderMus || !information.attackerMus || !information.defenderAllies || !information.attackerAllies)
        {
            return;
        }

        defenders.empty();
        attackers.empty();
        strangers.empty();

        var all = [];
        $.each(information.onlineCitizens, function(index, ci) {
            var citizenId = ci.citizenId;
            var oneCitizenInfo = citizenInfo[citizenId];
            var position = strangers;
            var possibility = ci.a*100/ci.b;

            // 设置一个玩家的军团状态，蓝色为防守方，红色为进攻方，灰色为未知
            var citizenDiv = $('<div>', {id:"citizen" + citizenId, style:"font-size:12px;"});
            var mu = $('<i>', {class:"icon-bookmark"}).appendTo(citizenDiv);
            if (oneCitizenInfo && $.inArray(oneCitizenInfo.militaryUnitId, information.defenderMus) !== -1) {
                position = defenders;
                mu.attr("style", "color:SkyBlue;");
            }
            else if (oneCitizenInfo && $.inArray(oneCitizenInfo.militaryUnitId, information.attackerMus) !== -1) {
                position = attackers;
                mu.attr("style", "color:Crimson;");
            }
            else {
                mu.attr("style", "color:rgb(77, 77, 77);");
                possibility -= 0.0001;
            }

            // 设置一个玩家的地点状态，蓝色为防守方，红色为进攻方，灰色为未知
            if (information.defenderRegions.length !== 0) { // 防守方有加成地点时，添加地点图标
                var plane = $('<i>', {class:"icon-airplane"}).appendTo(citizenDiv);
                if ($.inArray(ci.locationId, information.defenderRegions) !== -1) {
                    if ($.inArray(ci.locationId, information.attackerRegions) !== -1)
                        plane.attr("style", "color:SeaGreen;"); // 同时在双方的加成地点，显示绿色
                    else {
                        if (position === strangers)
                            position = defenders;
                        plane.attr("style", "color:SkyBlue;");
                    }
                }
                else if ($.inArray(ci.locationId, information.attackerRegions) !== -1) {
                    plane.attr("style", "color:Crimson;");
                    if (position === strangers)
                        position = attackers;
                }
                else {
                    plane.attr("style", "color:rgb(77, 77, 77);");
                    possibility -= 0.0002;
                }
            }

            //citizenDiv.append($('<div>', {class:"flags-small " + countryInfo[ci.countryId].flagName}), ci.avatar, ci.profile, " (" + parseInt(ci.a*100/ci.b) + "%)");
            citizenDiv.append($('<div>', {class:"xflagsSmall xflagsSmall-" + countryInfo[ci.countryId].flagName}), ci.avatar, ci.profile, " (" + parseInt(ci.a*100/ci.b) + "%)");

            // 最终确定玩家添加到防守区、进攻区、陌生人区
            if (position === strangers) {
                if ($.inArray(ci.countryId, information.defenderAllies) !== -1)
                    position = defenders;
                else if ($.inArray(ci.countryId, information.attackerAllies) !== -1)
                    position = attackers;
                else
                    possibility -= 0.0004;
            }

            all.push([possibility, citizenDiv, position]);

        }); // 每个玩家的处理结束

        // 为玩家排序，显示在3个div中
        all.sort(function(a, b) {return b[0] - a[0];});
        $.each(all, function(index, t) {
            if (isResistance && $('.icon-airplane', t[1]).attr("style") === "color:SeaGreen;") {
                if (t[2] === defenders)
                    $('.icon-airplane', t[1]).attr("style", "color:SkyBlue;");
                else if (t[2] === attackers)
                    $('.icon-airplane', t[1]).attr("style", "color:Crimson;");
            }
            t[1].appendTo(t[2]);
        });

        // 启用“查看玩家状态”按钮
        button.attr("disabled", false);
        button2.attr("disabled", false);
    } // show()函数结束


    // 点击“显示玩家状态”按钮后的动作
    //2017.8.12 更新：汉化观战人员装备缩写“slotNames”和“slotNames2”
    button2.click(function() {
        button.attr("disabled", true);
        button2.attr("disabled", true);
        // 改变布局
        defenders.parent().attr("class", "foundation-style column small-5");
        attackers.parent().attr("class", "foundation-style column small-5");
        strangers.parent().attr("style", "width:100%;").insertAfter(attackers.parent());
        strangers.attr("style", "width:50%; margin:0 auto; text-align:left;");

        var QualityColors = "rgb(139, 139, 139);; rgb(177, 11, 11);; rgb(242, 160, 27);; rgb(177, 182, 6);; rgb(33, 157, 33);; rgb(169, 34, 156);; rgb(0, 211, 211);".split("; ");
        //var slotNames = "H V A P S C W O".split(" ");
        var slotNames = "帽 镜 甲 裤 鞋 符 武 副".split(" ");
        //var slotNames2 = "Helmet, Vision, Personal Armor, Pants, Shoes, Lucky Charm, Weapon Upgrade, Offhand".split(", ");
        var slotNames2 = "头盔, 眼镜, 盔甲, 作战裤, 作战靴, 幸运符, 武器配件, 副手".split(", ");

        var citizenDivs = $("div[id^='citizen']", mainDiv);
        var pendingCitizenDivNumber = citizenDivs.length;
        citizenDivs.each(function() {
            var oneCitizenDiv = $(this);
            var citizenId = parseInt(oneCitizenDiv.attr("id").match(/([0-9]+)$/)[1]);

            fetchAndUpdateOneCitizenPage(citizenId, false, function() {
                if (citizenPage[citizenId].equipments.length === 0) {
                    oneCitizenDiv.remove();
                    return; // 一般是组织号
                }

                // 添加装备图标
                var equipmentIcons = [];
                $.each(citizenPage[citizenId].equipments, function(s, q) {
                    q = parseInt(q[1]);
                    equipmentIcons.push($("<span>", {style:"color:" + QualityColors[q], text:slotNames[s], title:"Q" + q + " " + slotNames2[s]}));
                }); // 添加每一件装备
                oneCitizenDiv.prepend(equipmentIcons);

                // 添加buff和debuff
                var buffsAndDebuffs = [];
                $.each(citizenPage[citizenId].buffIcons, function(index, url) {
                    buffsAndDebuffs.push( $("<img>", {src:url, style:"width:18px; vertical-align:middle;"}));
                });
                $.each(citizenPage[citizenId].debuffIcons, function(index, url) {
                    buffsAndDebuffs.push( $("<img>", {src:url, style:"width:18px; vertical-align:middle;"}));
                });
                oneCitizenDiv.append(buffsAndDebuffs);

                if (--pendingCitizenDivNumber === 0) {
                    button.attr("disabled", false);
                    localStorage.setItem("citizenPage", JSON.stringify(citizenPage));
                }
            }); // 抓取每一个玩家的页面，并添加信息
        }); // 每一个玩家所在的div处理
    });
}



function enhanceBattleStatistics() {
    var fbDiv = $('div > a.fbShare2').closest('div.columns').empty();
    console.log(fbDiv);
    var button = $('<button>', {class:'foundation-style button', text:'显示所有局'}).appendTo(fbDiv);
    var battleProgress = $('#battleProgress:first');

    button.click(function() {
        var scoreDiv = fbDiv.closest('div.fightContainer ');
        var battleURL = $('a[href^="battle.html"]').attr('href');
        var roundNumber = $('img[src$="blue_ball.png"]').length + $('img[src$="red_ball.png"]').length;
        for (var i=roundNumber; i>0; --i) {
            var roundDiv = $('<div>', {class:'foundation-radius fightContainer oldRound', id:'ehRound' + i, roundId:i}).insertAfter(scoreDiv).hide();
            $('<div>', {class:'foundation-style small-2 columns topDefenders', id:'defenderBH'}).appendTo(roundDiv);
            var middle = $('<div>', {class:'foundation-style small-6 columns', id:'middle'}).appendTo(roundDiv);
            battleProgress.clone().appendTo(middle);
            $('<div>', {class:'foundation-radius fightContainer foundation-base-font', id:'scores'}).appendTo(middle);
            $('<div>', {class:'foundation-style small-2 columns topAttackers', id:'attackerBH'}).appendTo(roundDiv);
        }

        $('div.oldRound').each(function() {
            var roundDiv = $(this);
            var middleDiv = $('#middle', roundDiv);
            var scoreDiv = $('#scores', middleDiv);
            var roundId = roundDiv.attr('roundId');
            $.ajax({
                url: battleURL + '&round=' + roundId,
                success: function(data) {
                    // 双方BH
                    $('#topDefender1', data).children().appendTo($('#defenderBH', roundDiv));
                    $('#topAttacker1', data).children().appendTo($('#attackerBH', roundDiv));

                    // 伤害条
                    var percentage = $('#leftStat', data).text().match(/^([\d\.]+)/)[1];
                    $('#battleProgress', roundDiv).attr("aria-valuenow", percentage);
                    $('#battleProgress > div.ui-progressbar-value', roundDiv).attr('style', 'width: '+percentage+'%'); // 蓝条长度
                    var text = $('#battleProgressStats', data).insertAfter($('#battleProgress', roundDiv)); // 百分比文字
                    var wall = $('<div>').appendTo(text);

                    // 更新墙高
                    var w = parseInt($("#defenderScore", data).text().replace(/,/g, '').replace(/\xA0/g, '')) - parseInt($("#attackerScore", data).text().replace(/,/g, '').replace(/\xA0/g, ''));
                    if (w === 0) {
                        wall.text("");
                    }
                    else if (w > 0) {
                        wall.text(">> " + w.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " >>");
                    }
                    else {
                        wall.text("<< " + (-w).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " <<");
                    }

                    // 双方伤害值
                    $('#defenderScore', data).closest('div').appendTo(scoreDiv);
                    $('<a>', {class:'foundation-style small-2 columns', href:battleURL+'&round='+roundId, text:'Round ' + roundId}).appendTo(scoreDiv);
                    $('#attackerScore', data).closest('div').appendTo(scoreDiv);
                    roundDiv.show();
                },
                error: function(xhr,textStatus){
                    console.log("第", roundId, "局伤害抓取错误 (", textStatus, ")，重新抓取");
                    $.ajax(this);
                },
            });        
        });
    });
}




/**
 * jqPlot
 * Pure JavaScript plotting plugin using jQuery
 *
 * Version: 1.0.0b2_r792
 *
 * Copyright (c) 2009-2011 Chris Leonello
 * jqPlot is currently available for use in all personal or commercial projects 
 * under both the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL 
 * version 2.0 (http://www.gnu.org/licenses/gpl-2.0.html) licenses. This means that you can 
 * choose the license that best suits your project and use it accordingly. 
 *
 * Although not required, the author would appreciate an email letting him 
 * know of any substantial use of jqPlot.  You can reach the author at: 
 * chris at jqplot dot com or see http://www.jqplot.com/info.php .
 *
 * If you are feeling kind and generous, consider supporting the project by
 * making a donation at: http://www.jqplot.com/donate.php .
 *
 * sprintf functions contained in jqplot.sprintf.js by Ash Searle:
 *
 *     version 2007.04.27
 *     author Ash Searle
 *     http://hexmen.com/blog/2007/03/printf-sprintf/
 *     http://hexmen.com/js/sprintf.js
 *     The author (Ash Searle) has placed this code in the public domain:
 *     "This code is unrestricted: you are free to use it however you like."
 * 
 */
(function(w){var l;w.fn.emptyForce=function(){for(var O=0,P;(P=w(this)[O])!=null;O++){if(P.nodeType===1){jQuery.cleanData(P.getElementsByTagName("*"))}if(w.jqplot_use_excanvas){P.outerHTML=""}else{while(P.firstChild){P.removeChild(P.firstChild)}}P=null}return w(this)};w.fn.removeChildForce=function(O){while(O.firstChild){this.removeChildForce(O.firstChild);O.removeChild(O.firstChild)}};w.jqplot=function(U,R,P){var Q,O;if(P==null){if(jQuery.isArray(R)){Q=R;O=null}else{if(typeof(R)==="object"){Q=null;O=R}}}else{Q=R;O=P}var T=new C();w("#"+U).removeClass("jqplot-error");if(w.jqplot.config.catchErrors){try{T.init(U,Q,O);T.draw();T.themeEngine.init.call(T);return T}catch(S){var V=w.jqplot.config.errorMessage||S.message;w("#"+U).append('<div class="jqplot-error-message">'+V+"</div>");w("#"+U).addClass("jqplot-error");document.getElementById(U).style.background=w.jqplot.config.errorBackground;document.getElementById(U).style.border=w.jqplot.config.errorBorder;document.getElementById(U).style.fontFamily=w.jqplot.config.errorFontFamily;document.getElementById(U).style.fontSize=w.jqplot.config.errorFontSize;document.getElementById(U).style.fontStyle=w.jqplot.config.errorFontStyle;document.getElementById(U).style.fontWeight=w.jqplot.config.errorFontWeight}}else{T.init(U,Q,O);T.draw();T.themeEngine.init.call(T);return T}};w.jqplot.version="1.0.0b2_r792";w.jqplot.CanvasManager=function(){if(typeof w.jqplot.CanvasManager.canvases=="undefined"){w.jqplot.CanvasManager.canvases=[];w.jqplot.CanvasManager.free=[]}var O=[];this.getCanvas=function(){var R;var Q=true;if(!w.jqplot.use_excanvas){for(var S=0,P=w.jqplot.CanvasManager.canvases.length;S<P;S++){if(w.jqplot.CanvasManager.free[S]===true){Q=false;R=w.jqplot.CanvasManager.canvases[S];w.jqplot.CanvasManager.free[S]=false;O.push(S);break}}}if(Q){R=document.createElement("canvas");O.push(w.jqplot.CanvasManager.canvases.length);w.jqplot.CanvasManager.canvases.push(R);w.jqplot.CanvasManager.free.push(false)}return R};this.initCanvas=function(P){if(w.jqplot.use_excanvas){return window.G_vmlCanvasManager.initElement(P)}return P};this.freeAllCanvases=function(){for(var Q=0,P=O.length;Q<P;Q++){this.freeCanvas(O[Q])}O=[]};this.freeCanvas=function(P){if(w.jqplot.use_excanvas){window.G_vmlCanvasManager.uninitElement(w.jqplot.CanvasManager.canvases[P]);w.jqplot.CanvasManager.canvases[P]=null}else{var Q=w.jqplot.CanvasManager.canvases[P];Q.getContext("2d").clearRect(0,0,Q.width,Q.height);w(Q).unbind().removeAttr("class").removeAttr("style");w(Q).css({left:"",top:"",position:""});Q.width=0;Q.height=0;w.jqplot.CanvasManager.free[P]=true}}};w.jqplot.log=function(){if(window.console){console.log.apply(console,arguments)}};w.jqplot.config={enablePlugins:false,defaultHeight:300,defaultWidth:400,UTCAdjust:false,timezoneOffset:new Date(new Date().getTimezoneOffset()*60000),errorMessage:"",errorBackground:"",errorBorder:"",errorFontFamily:"",errorFontSize:"",errorFontStyle:"",errorFontWeight:"",catchErrors:false,defaultTickFormatString:"%.1f",defaultColors:["#4bb2c5","#EAA228","#c5b47f","#579575","#839557","#958c12","#953579","#4b5de4","#d8b83f","#ff5800","#0085cc","#c747a3","#cddf54","#FBD178","#26B4E3","#bd70c7"],defaultNegativeColors:["#498991","#C08840","#9F9274","#546D61","#646C4A","#6F6621","#6E3F5F","#4F64B0","#A89050","#C45923","#187399","#945381","#959E5C","#C7AF7B","#478396","#907294"]};w.jqplot.arrayMax=function(O){return Math.max.apply(Math,O)};w.jqplot.arrayMin=function(O){return Math.min.apply(Math,O)};w.jqplot.enablePlugins=w.jqplot.config.enablePlugins;w.jqplot.support_canvas=function(){if(typeof w.jqplot.support_canvas.result=="undefined"){w.jqplot.support_canvas.result=!!document.createElement("canvas").getContext}return w.jqplot.support_canvas.result};w.jqplot.support_canvas_text=function(){if(typeof w.jqplot.support_canvas_text.result=="undefined"){w.jqplot.support_canvas_text.result=!!(document.createElement("canvas").getContext&&typeof document.createElement("canvas").getContext("2d").fillText=="function")}return w.jqplot.support_canvas_text.result};w.jqplot.use_excanvas=(w.browser.msie&&!w.jqplot.support_canvas())?true:false;w.jqplot.preInitHooks=[];w.jqplot.postInitHooks=[];w.jqplot.preParseOptionsHooks=[];w.jqplot.postParseOptionsHooks=[];w.jqplot.preDrawHooks=[];w.jqplot.postDrawHooks=[];w.jqplot.preDrawSeriesHooks=[];w.jqplot.postDrawSeriesHooks=[];w.jqplot.preDrawLegendHooks=[];w.jqplot.addLegendRowHooks=[];w.jqplot.preSeriesInitHooks=[];w.jqplot.postSeriesInitHooks=[];w.jqplot.preParseSeriesOptionsHooks=[];w.jqplot.postParseSeriesOptionsHooks=[];w.jqplot.eventListenerHooks=[];w.jqplot.preDrawSeriesShadowHooks=[];w.jqplot.postDrawSeriesShadowHooks=[];w.jqplot.ElemContainer=function(){this._elem;this._plotWidth;this._plotHeight;this._plotDimensions={height:null,width:null}};w.jqplot.ElemContainer.prototype.createElement=function(R,T,P,Q,U){this._offsets=T;var O=P||"jqplot";var S=document.createElement(R);this._elem=w(S);this._elem.addClass(O);this._elem.css(Q);this._elem.attr(U);S=null;return this._elem};w.jqplot.ElemContainer.prototype.getWidth=function(){if(this._elem){return this._elem.outerWidth(true)}else{return null}};w.jqplot.ElemContainer.prototype.getHeight=function(){if(this._elem){return this._elem.outerHeight(true)}else{return null}};w.jqplot.ElemContainer.prototype.getPosition=function(){if(this._elem){return this._elem.position()}else{return{top:null,left:null,bottom:null,right:null}}};w.jqplot.ElemContainer.prototype.getTop=function(){return this.getPosition().top};w.jqplot.ElemContainer.prototype.getLeft=function(){return this.getPosition().left};w.jqplot.ElemContainer.prototype.getBottom=function(){return this._elem.css("bottom")};w.jqplot.ElemContainer.prototype.getRight=function(){return this._elem.css("right")};function m(O){w.jqplot.ElemContainer.call(this);this.name=O;this._series=[];this.show=false;this.tickRenderer=w.jqplot.AxisTickRenderer;this.tickOptions={};this.labelRenderer=w.jqplot.AxisLabelRenderer;this.labelOptions={};this.label=null;this.showLabel=true;this.min=null;this.max=null;this.autoscale=false;this.pad=1.2;this.padMax=null;this.padMin=null;this.ticks=[];this.numberTicks;this.tickInterval;this.renderer=w.jqplot.LinearAxisRenderer;this.rendererOptions={};this.showTicks=true;this.showTickMarks=true;this.showMinorTicks=true;this.useSeriesColor=false;this.borderWidth=null;this.borderColor=null;this._dataBounds={min:null,max:null};this._intervalStats=[];this._offsets={min:null,max:null};this._ticks=[];this._label=null;this.syncTicks=null;this.tickSpacing=75;this._min=null;this._max=null;this._tickInterval=null;this._numberTicks=null;this.__ticks=null;this._options={}}m.prototype=new w.jqplot.ElemContainer();m.prototype.constructor=m;m.prototype.init=function(){this.renderer=new this.renderer();this.tickOptions.axis=this.name;if(this.tickOptions.showMark==null){this.tickOptions.showMark=this.showTicks}if(this.tickOptions.showMark==null){this.tickOptions.showMark=this.showTickMarks}if(this.tickOptions.showLabel==null){this.tickOptions.showLabel=this.showTicks}if(this.label==null||this.label==""){this.showLabel=false}else{this.labelOptions.label=this.label}if(this.showLabel==false){this.labelOptions.show=false}if(this.pad==0){this.pad=1}if(this.padMax==0){this.padMax=1}if(this.padMin==0){this.padMin=1}if(this.padMax==null){this.padMax=(this.pad-1)/2+1}if(this.padMin==null){this.padMin=(this.pad-1)/2+1}this.pad=this.padMax+this.padMin-1;if(this.min!=null||this.max!=null){this.autoscale=false}if(this.syncTicks==null&&this.name.indexOf("y")>-1){this.syncTicks=true}else{if(this.syncTicks==null){this.syncTicks=false}}this.renderer.init.call(this,this.rendererOptions)};m.prototype.draw=function(O,P){if(this.__ticks){this.__ticks=null}return this.renderer.draw.call(this,O,P)};m.prototype.set=function(){this.renderer.set.call(this)};m.prototype.pack=function(P,O){if(this.show){this.renderer.pack.call(this,P,O)}if(this._min==null){this._min=this.min;this._max=this.max;this._tickInterval=this.tickInterval;this._numberTicks=this.numberTicks;this.__ticks=this._ticks}};m.prototype.reset=function(){this.renderer.reset.call(this)};m.prototype.resetScale=function(O){w.extend(true,this,{min:null,max:null,numberTicks:null,tickInterval:null,_ticks:[],ticks:[]},O);this.resetDataBounds()};m.prototype.resetDataBounds=function(){var O=this._dataBounds;O.min=null;O.max=null;var R=(this.show)?true:false;for(var Q=0;Q<this._series.length;Q++){var S=this._series[Q];var V=S._plotData;var T=1,U=1;if(S._type!=null&&S._type=="ohlc"){T=3;U=2}for(var P=0;P<V.length;P++){if(this.name=="xaxis"||this.name=="x2axis"){if((V[P][0]!=null&&V[P][0]<O.min)||O.min==null){O.min=V[P][0]}if((V[P][0]!=null&&V[P][0]>O.max)||O.max==null){O.max=V[P][0]}}else{if((V[P][T]!=null&&V[P][T]<O.min)||O.min==null){O.min=V[P][T]}if((V[P][U]!=null&&V[P][U]>O.max)||O.max==null){O.max=V[P][U]}}}if(R&&S.renderer.constructor!==w.jqplot.BarRenderer){R=false}else{if(R&&this._options.hasOwnProperty("forceTickAt0")&&this._options.forceTickAt0==false){R=false}else{if(R&&S.renderer.constructor===w.jqplot.BarRenderer){if(S.barDirection=="vertical"&&this.name!="xaxis"&&this.name!="x2axis"){if(this._options.pad!=null||this._options.padMin!=null){R=false}}else{if(S.barDirection=="horizontal"&&(this.name=="xaxis"||this.name=="x2axis")){if(this._options.pad!=null||this._options.padMin!=null){R=false}}}}}}}if(R&&this.renderer.constructor===w.jqplot.LinearAxisRenderer&&O.min>=0){this.padMin=1;this.forceTickAt0=true}};function h(O){w.jqplot.ElemContainer.call(this);this.show=false;this.location="ne";this.labels=[];this.showLabels=true;this.showSwatches=true;this.placement="insideGrid";this.xoffset=0;this.yoffset=0;this.border;this.background;this.textColor;this.fontFamily;this.fontSize;this.rowSpacing="0.5em";this.renderer=w.jqplot.TableLegendRenderer;this.rendererOptions={};this.preDraw=false;this.marginTop=null;this.marginRight=null;this.marginBottom=null;this.marginLeft=null;this.escapeHtml=false;this._series=[];w.extend(true,this,O)}h.prototype=new w.jqplot.ElemContainer();h.prototype.constructor=h;h.prototype.setOptions=function(O){w.extend(true,this,O);if(this.placement=="inside"){this.placement="insideGrid"}if(this.xoffset>0){if(this.placement=="insideGrid"){switch(this.location){case"nw":case"w":case"sw":if(this.marginLeft==null){this.marginLeft=this.xoffset+"px"}this.marginRight="0px";break;case"ne":case"e":case"se":default:if(this.marginRight==null){this.marginRight=this.xoffset+"px"}this.marginLeft="0px";break}}else{if(this.placement=="outside"){switch(this.location){case"nw":case"w":case"sw":if(this.marginRight==null){this.marginRight=this.xoffset+"px"}this.marginLeft="0px";break;case"ne":case"e":case"se":default:if(this.marginLeft==null){this.marginLeft=this.xoffset+"px"}this.marginRight="0px";break}}}this.xoffset=0}if(this.yoffset>0){if(this.placement=="outside"){switch(this.location){case"sw":case"s":case"se":if(this.marginTop==null){this.marginTop=this.yoffset+"px"}this.marginBottom="0px";break;case"ne":case"n":case"nw":default:if(this.marginBottom==null){this.marginBottom=this.yoffset+"px"}this.marginTop="0px";break}}else{if(this.placement=="insideGrid"){switch(this.location){case"sw":case"s":case"se":if(this.marginBottom==null){this.marginBottom=this.yoffset+"px"}this.marginTop="0px";break;case"ne":case"n":case"nw":default:if(this.marginTop==null){this.marginTop=this.yoffset+"px"}this.marginBottom="0px";break}}}this.yoffset=0}};h.prototype.init=function(){this.renderer=new this.renderer();this.renderer.init.call(this,this.rendererOptions)};h.prototype.draw=function(P){for(var O=0;O<w.jqplot.preDrawLegendHooks.length;O++){w.jqplot.preDrawLegendHooks[O].call(this,P)}return this.renderer.draw.call(this,P)};h.prototype.pack=function(O){this.renderer.pack.call(this,O)};function n(O){w.jqplot.ElemContainer.call(this);this.text=O;this.show=true;this.fontFamily;this.fontSize;this.textAlign;this.textColor;this.renderer=w.jqplot.DivTitleRenderer;this.rendererOptions={}}n.prototype=new w.jqplot.ElemContainer();n.prototype.constructor=n;n.prototype.init=function(){this.renderer=new this.renderer();this.renderer.init.call(this,this.rendererOptions)};n.prototype.draw=function(O){return this.renderer.draw.call(this,O)};n.prototype.pack=function(){this.renderer.pack.call(this)};function D(){w.jqplot.ElemContainer.call(this);this.show=true;this.xaxis="xaxis";this._xaxis;this.yaxis="yaxis";this._yaxis;this.gridBorderWidth=2;this.renderer=w.jqplot.LineRenderer;this.rendererOptions={};this.data=[];this.gridData=[];this.label="";this.showLabel=true;this.color;this.lineWidth=2.5;this.lineJoin="round";this.lineCap="round";this.shadow=true;this.shadowAngle=45;this.shadowOffset=1.25;this.shadowDepth=3;this.shadowAlpha="0.1";this.breakOnNull=false;this.markerRenderer=w.jqplot.MarkerRenderer;this.markerOptions={};this.showLine=true;this.showMarker=true;this.index;this.fill=false;this.fillColor;this.fillAlpha;this.fillAndStroke=false;this.disableStack=false;this._stack=false;this.neighborThreshold=4;this.fillToZero=false;this.fillToValue=0;this.fillAxis="y";this.useNegativeColors=true;this._stackData=[];this._plotData=[];this._plotValues={x:[],y:[]};this._intervals={x:{},y:{}};this._prevPlotData=[];this._prevGridData=[];this._stackAxis="y";this._primaryAxis="_xaxis";this.canvas=new w.jqplot.GenericCanvas();this.shadowCanvas=new w.jqplot.GenericCanvas();this.plugins={};this._sumy=0;this._sumx=0;this._type=""}D.prototype=new w.jqplot.ElemContainer();D.prototype.constructor=D;D.prototype.init=function(Q,U,S){this.index=Q;this.gridBorderWidth=U;var T=this.data;var P=[],R;for(R=0;R<T.length;R++){if(!this.breakOnNull){if(T[R]==null||T[R][0]==null||T[R][1]==null){continue}else{P.push(T[R])}}else{P.push(T[R])}}this.data=P;if(!this.fillColor){this.fillColor=this.color}if(this.fillAlpha){var O=w.jqplot.normalize2rgb(this.fillColor);var O=w.jqplot.getColorComponents(O);this.fillColor="rgba("+O[0]+","+O[1]+","+O[2]+","+this.fillAlpha+")"}this.renderer=new this.renderer();this.renderer.init.call(this,this.rendererOptions,S);this.markerRenderer=new this.markerRenderer();if(!this.markerOptions.color){this.markerOptions.color=this.color}if(this.markerOptions.show==null){this.markerOptions.show=this.showMarker}this.showMarker=this.markerOptions.show;this.markerRenderer.init(this.markerOptions)};D.prototype.draw=function(U,R,T){var P=(R==l)?{}:R;U=(U==l)?this.canvas._ctx:U;var O,S,Q;for(O=0;O<w.jqplot.preDrawSeriesHooks.length;O++){w.jqplot.preDrawSeriesHooks[O].call(this,U,P)}if(this.show){this.renderer.setGridData.call(this,T);if(!P.preventJqPlotSeriesDrawTrigger){w(U.canvas).trigger("jqplotSeriesDraw",[this.data,this.gridData])}S=[];if(P.data){S=P.data}else{if(!this._stack){S=this.data}else{S=this._plotData}}Q=P.gridData||this.renderer.makeGridData.call(this,S,T);this.renderer.draw.call(this,U,Q,P,T)}for(O=0;O<w.jqplot.postDrawSeriesHooks.length;O++){w.jqplot.postDrawSeriesHooks[O].call(this,U,P)}U=R=T=O=S=Q=null};D.prototype.drawShadow=function(U,R,T){var P=(R==l)?{}:R;U=(U==l)?this.shadowCanvas._ctx:U;var O,S,Q;for(O=0;O<w.jqplot.preDrawSeriesShadowHooks.length;O++){w.jqplot.preDrawSeriesShadowHooks[O].call(this,U,P)}if(this.shadow){this.renderer.setGridData.call(this,T);S=[];if(P.data){S=P.data}else{if(!this._stack){S=this.data}else{S=this._plotData}}Q=P.gridData||this.renderer.makeGridData.call(this,S,T);this.renderer.drawShadow.call(this,U,Q,P)}for(O=0;O<w.jqplot.postDrawSeriesShadowHooks.length;O++){w.jqplot.postDrawSeriesShadowHooks[O].call(this,U,P)}U=R=T=O=S=Q=null};D.prototype.toggleDisplay=function(P){var O,Q;if(P.data.series){O=P.data.series}else{O=this}if(P.data.speed){Q=P.data.speed}if(Q){if(O.canvas._elem.is(":hidden")){if(O.shadowCanvas._elem){O.shadowCanvas._elem.fadeIn(Q)}O.canvas._elem.fadeIn(Q);O.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+O.index).fadeIn(Q)}else{if(O.shadowCanvas._elem){O.shadowCanvas._elem.fadeOut(Q)}O.canvas._elem.fadeOut(Q);O.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+O.index).fadeOut(Q)}}else{if(O.canvas._elem.is(":hidden")){if(O.shadowCanvas._elem){O.shadowCanvas._elem.show()}O.canvas._elem.show();O.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+O.index).show()}else{if(O.shadowCanvas._elem){O.shadowCanvas._elem.hide()}O.canvas._elem.hide();O.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+O.index).hide()}}};function x(){w.jqplot.ElemContainer.call(this);this.drawGridlines=true;this.gridLineColor="#cccccc";this.gridLineWidth=1;this.background="#fffdf6";this.borderColor="#999999";this.borderWidth=2;this.drawBorder=true;this.shadow=true;this.shadowAngle=45;this.shadowOffset=1.5;this.shadowWidth=3;this.shadowDepth=3;this.shadowColor=null;this.shadowAlpha="0.07";this._left;this._top;this._right;this._bottom;this._width;this._height;this._axes=[];this.renderer=w.jqplot.CanvasGridRenderer;this.rendererOptions={};this._offsets={top:null,bottom:null,left:null,right:null}}x.prototype=new w.jqplot.ElemContainer();x.prototype.constructor=x;x.prototype.init=function(){this.renderer=new this.renderer();this.renderer.init.call(this,this.rendererOptions)};x.prototype.createElement=function(O,P){this._offsets=O;return this.renderer.createElement.call(this,P)};x.prototype.draw=function(){this.renderer.draw.call(this)};w.jqplot.GenericCanvas=function(){w.jqplot.ElemContainer.call(this);this._ctx};w.jqplot.GenericCanvas.prototype=new w.jqplot.ElemContainer();w.jqplot.GenericCanvas.prototype.constructor=w.jqplot.GenericCanvas;w.jqplot.GenericCanvas.prototype.createElement=function(S,Q,P,T){this._offsets=S;var O="jqplot";if(Q!=l){O=Q}var R;R=T.canvasManager.getCanvas();if(P!=null){this._plotDimensions=P}R.width=this._plotDimensions.width-this._offsets.left-this._offsets.right;R.height=this._plotDimensions.height-this._offsets.top-this._offsets.bottom;this._elem=w(R);this._elem.css({position:"absolute",left:this._offsets.left,top:this._offsets.top});this._elem.addClass(O);R=T.canvasManager.initCanvas(R);R=null;return this._elem};w.jqplot.GenericCanvas.prototype.setContext=function(){this._ctx=this._elem.get(0).getContext("2d");return this._ctx};w.jqplot.GenericCanvas.prototype.resetCanvas=function(){if(this._elem){if(w.jqplot.use_excanvas){window.G_vmlCanvasManager.uninitElement(this._elem.get(0))}this._elem.emptyForce()}this._ctx=null};w.jqplot.HooksManager=function(){this.hooks=[]};w.jqplot.HooksManager.prototype.addOnce=function(P){var Q=false,O;for(O=0;O<this.hooks.length;O++){if(this.hooks[O][0]==P){Q=true}}if(!Q){this.hooks.push(P)}};w.jqplot.HooksManager.prototype.add=function(O){this.hooks.push(O)};w.jqplot.EventListenerManager=function(){this.hooks=[]};w.jqplot.EventListenerManager.prototype.addOnce=function(R,Q){var S=false,P,O;for(O=0;O<this.hooks.length;O++){P=this.hooks[O];if(P[0]==R&&P[1]==Q){S=true}}if(!S){this.hooks.push([R,Q])}};w.jqplot.EventListenerManager.prototype.add=function(P,O){this.hooks.push([P,O])};function C(){this.data=[];this.dataRenderer;this.dataRendererOptions;this.noDataIndicator={show:false,indicator:"Loading Data...",axes:{xaxis:{min:0,max:10,tickInterval:2,show:true},yaxis:{min:0,max:12,tickInterval:3,show:true}}};this.targetId=null;this.target=null;this.defaults={axesDefaults:{},axes:{xaxis:{},yaxis:{},x2axis:{},y2axis:{},y3axis:{},y4axis:{},y5axis:{},y6axis:{},y7axis:{},y8axis:{},y9axis:{}},seriesDefaults:{},series:[]};this.series=[];this.axes={xaxis:new m("xaxis"),yaxis:new m("yaxis"),x2axis:new m("x2axis"),y2axis:new m("y2axis"),y3axis:new m("y3axis"),y4axis:new m("y4axis"),y5axis:new m("y5axis"),y6axis:new m("y6axis"),y7axis:new m("y7axis"),y8axis:new m("y8axis"),y9axis:new m("y9axis")};this.grid=new x();this.legend=new h();this.baseCanvas=new w.jqplot.GenericCanvas();this.seriesStack=[];this.previousSeriesStack=[];this.eventCanvas=new w.jqplot.GenericCanvas();this._width=null;this._height=null;this._plotDimensions={height:null,width:null};this._gridPadding={top:null,right:null,bottom:null,left:null};this._defaultGridPadding={top:10,right:10,bottom:23,left:10};this.syncXTicks=true;this.syncYTicks=true;this.seriesColors=w.jqplot.config.defaultColors;this.negativeSeriesColors=w.jqplot.config.defaultNegativeColors;this.sortData=true;var Q=0;this.textColor;this.fontFamily;this.fontSize;this.title=new n();this.options={};this.stackSeries=false;this.defaultAxisStart=1;this._stackData=[];this._plotData=[];this.plugins={};this._drawCount=0;this.drawIfHidden=false;this.captureRightClick=false;this.themeEngine=new w.jqplot.ThemeEngine();this._sumy=0;this._sumx=0;this.preInitHooks=new w.jqplot.HooksManager();this.postInitHooks=new w.jqplot.HooksManager();this.preParseOptionsHooks=new w.jqplot.HooksManager();this.postParseOptionsHooks=new w.jqplot.HooksManager();this.preDrawHooks=new w.jqplot.HooksManager();this.postDrawHooks=new w.jqplot.HooksManager();this.preDrawSeriesHooks=new w.jqplot.HooksManager();this.postDrawSeriesHooks=new w.jqplot.HooksManager();this.preDrawLegendHooks=new w.jqplot.HooksManager();this.addLegendRowHooks=new w.jqplot.HooksManager();this.preSeriesInitHooks=new w.jqplot.HooksManager();this.postSeriesInitHooks=new w.jqplot.HooksManager();this.preParseSeriesOptionsHooks=new w.jqplot.HooksManager();this.postParseSeriesOptionsHooks=new w.jqplot.HooksManager();this.eventListenerHooks=new w.jqplot.EventListenerManager();this.preDrawSeriesShadowHooks=new w.jqplot.HooksManager();this.postDrawSeriesShadowHooks=new w.jqplot.HooksManager();this.colorGenerator=w.jqplot.ColorGenerator;this.canvasManager=new w.jqplot.CanvasManager();this.init=function(Z,W,ab){ab=ab||{};for(var X=0;X<w.jqplot.preInitHooks.length;X++){w.jqplot.preInitHooks[X].call(this,Z,W,ab)}for(var X=0;X<this.preInitHooks.hooks.length;X++){this.preInitHooks.hooks[X].call(this,Z,W,ab)}this.targetId="#"+Z;this.target=w("#"+Z);this.target.removeClass("jqplot-error");if(!this.target.get(0)){throw"No plot target specified"}if(this.target.css("position")=="static"){this.target.css("position","relative")}if(!this.target.hasClass("jqplot-target")){this.target.addClass("jqplot-target")}if(!this.target.height()){var Y;if(ab&&ab.height){Y=parseInt(ab.height,10)}else{if(this.target.attr("data-height")){Y=parseInt(this.target.attr("data-height"),10)}else{Y=parseInt(w.jqplot.config.defaultHeight,10)}}this._height=Y;this.target.css("height",Y+"px")}else{this._height=Y=this.target.height()}if(!this.target.width()){var aa;if(ab&&ab.width){aa=parseInt(ab.width,10)}else{if(this.target.attr("data-width")){aa=parseInt(this.target.attr("data-width"),10)}else{aa=parseInt(w.jqplot.config.defaultWidth,10)}}this._width=aa;this.target.css("width",aa+"px")}else{this._width=aa=this.target.width()}this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;if(this._height<=0||this._width<=0||!this._height||!this._width){throw"Canvas dimension not set"}if(ab.dataRenderer&&jQuery.isFunction(ab.dataRenderer)){if(ab.dataRendererOptions){this.dataRendererOptions=ab.dataRendererOptions}this.dataRenderer=ab.dataRenderer;W=this.dataRenderer(W,this,this.dataRendererOptions)}if(ab.noDataIndicator&&jQuery.isPlainObject(ab.noDataIndicator)){w.extend(true,this.noDataIndicator,ab.noDataIndicator)}if(W==null||jQuery.isArray(W)==false||W.length==0||jQuery.isArray(W[0])==false||W[0].length==0){if(this.noDataIndicator.show==false){throw {name:"DataError",message:"No data to plot."}}else{for(var S in this.noDataIndicator.axes){for(var U in this.noDataIndicator.axes[S]){this.axes[S][U]=this.noDataIndicator.axes[S][U]}}this.postDrawHooks.add(function(){var ah=this.eventCanvas.getHeight();var ae=this.eventCanvas.getWidth();var ad=w('<div class="jqplot-noData-container" style="position:absolute;"></div>');this.target.append(ad);ad.height(ah);ad.width(ae);ad.css("top",this.eventCanvas._offsets.top);ad.css("left",this.eventCanvas._offsets.left);var ag=w('<div class="jqplot-noData-contents" style="text-align:center; position:relative; margin-left:auto; margin-right:auto;"></div>');ad.append(ag);ag.html(this.noDataIndicator.indicator);var af=ag.height();var ac=ag.width();ag.height(af);ag.width(ac);ag.css("top",(ah-af)/2+"px")})}}this.data=W;this.parseOptions(ab);if(this.textColor){this.target.css("color",this.textColor)}if(this.fontFamily){this.target.css("font-family",this.fontFamily)}if(this.fontSize){this.target.css("font-size",this.fontSize)}this.title.init();this.legend.init();this._sumy=0;this._sumx=0;for(var X=0;X<this.series.length;X++){this.seriesStack.push(X);this.previousSeriesStack.push(X);this.series[X].shadowCanvas._plotDimensions=this._plotDimensions;this.series[X].canvas._plotDimensions=this._plotDimensions;for(var V=0;V<w.jqplot.preSeriesInitHooks.length;V++){w.jqplot.preSeriesInitHooks[V].call(this.series[X],Z,W,this.options.seriesDefaults,this.options.series[X],this)}for(var V=0;V<this.preSeriesInitHooks.hooks.length;V++){this.preSeriesInitHooks.hooks[V].call(this.series[X],Z,W,this.options.seriesDefaults,this.options.series[X],this)}this.populatePlotData(this.series[X],X);this.series[X]._plotDimensions=this._plotDimensions;this.series[X].init(X,this.grid.borderWidth,this);for(var V=0;V<w.jqplot.postSeriesInitHooks.length;V++){w.jqplot.postSeriesInitHooks[V].call(this.series[X],Z,W,this.options.seriesDefaults,this.options.series[X],this)}for(var V=0;V<this.postSeriesInitHooks.hooks.length;V++){this.postSeriesInitHooks.hooks[V].call(this.series[X],Z,W,this.options.seriesDefaults,this.options.series[X],this)}this._sumy+=this.series[X]._sumy;this._sumx+=this.series[X]._sumx}for(var T in this.axes){this.axes[T]._plotDimensions=this._plotDimensions;this.axes[T].init()}if(this.sortData){O(this.series)}this.grid.init();this.grid._axes=this.axes;this.legend._series=this.series;for(var X=0;X<w.jqplot.postInitHooks.length;X++){w.jqplot.postInitHooks[X].call(this,Z,W,ab)}for(var X=0;X<this.postInitHooks.hooks.length;X++){this.postInitHooks.hooks[X].call(this,Z,W,ab)}};this.resetAxesScale=function(X,T){var V=T||{};var W=X||this.axes;if(W===true){W=this.axes}if(jQuery.isArray(W)){for(var U=0;U<W.length;U++){this.axes[W[U]].resetScale(V[W[U]])}}else{if(typeof(W)==="object"){for(var S in W){this.axes[S].resetScale(V[S])}}}};this.reInitialize=function(){this._height=this.target.height();this._width=this.target.width();if(this._height<=0||this._width<=0||!this._height||!this._width){throw"Target dimension not set"}this._plotDimensions.height=this._height;this._plotDimensions.width=this._width;this.grid._plotDimensions=this._plotDimensions;this.title._plotDimensions=this._plotDimensions;this.baseCanvas._plotDimensions=this._plotDimensions;this.eventCanvas._plotDimensions=this._plotDimensions;this.legend._plotDimensions=this._plotDimensions;for(var W in this.axes){this.axes[W]._plotWidth=this._width;this.axes[W]._plotHeight=this._height}this.title._plotWidth=this._width;if(this.textColor){this.target.css("color",this.textColor)}if(this.fontFamily){this.target.css("font-family",this.fontFamily)}if(this.fontSize){this.target.css("font-size",this.fontSize)}this._sumy=0;this._sumx=0;for(var U=0;U<this.series.length;U++){this.populatePlotData(this.series[U],U);this.series[U]._plotDimensions=this._plotDimensions;this.series[U].canvas._plotDimensions=this._plotDimensions;this._sumy+=this.series[U]._sumy;this._sumx+=this.series[U]._sumx}for(var S in this.axes){var T=this.axes[S]._ticks;for(var U=0;U<T.length;U++){var V=T[U]._elem;if(V){if(w.jqplot.use_excanvas){window.G_vmlCanvasManager.uninitElement(V.get(0))}V.emptyForce();V=null;T._elem=null}}T=null;this.axes[S]._plotDimensions=this._plotDimensions;this.axes[S]._ticks=[];this.axes[S].renderer.init.call(this.axes[S],{})}if(this.sortData){O(this.series)}this.grid._axes=this.axes;this.legend._series=this.series};function O(W){var aa,ab,ac,S,Z;for(var X=0;X<W.length;X++){var T;var Y=[W[X].data,W[X]._stackData,W[X]._plotData,W[X]._prevPlotData];for(var U=0;U<4;U++){T=true;aa=Y[U];if(W[X]._stackAxis=="x"){for(var V=0;V<aa.length;V++){if(typeof(aa[V][1])!="number"){T=false;break}}if(T){aa.sort(function(ae,ad){return ae[1]-ad[1]})}}else{for(var V=0;V<aa.length;V++){if(typeof(aa[V][0])!="number"){T=false;break}}if(T){aa.sort(function(ae,ad){return ae[0]-ad[0]})}}}}}this.populatePlotData=function(W,X){this._plotData=[];this._stackData=[];W._stackData=[];W._plotData=[];var aa={x:[],y:[]};if(this.stackSeries&&!W.disableStack){W._stack=true;var Y=W._stackAxis=="x"?0:1;var Z=Y?0:1;var ab=w.extend(true,[],W.data);var ac=w.extend(true,[],W.data);for(var U=0;U<X;U++){var S=this.series[U].data;for(var T=0;T<S.length;T++){ab[T][0]+=S[T][0];ab[T][1]+=S[T][1];ac[T][Y]+=S[T][Y]}}for(var V=0;V<ac.length;V++){aa.x.push(ac[V][0]);aa.y.push(ac[V][1])}this._plotData.push(ac);this._stackData.push(ab);W._stackData=ab;W._plotData=ac;W._plotValues=aa}else{for(var V=0;V<W.data.length;V++){aa.x.push(W.data[V][0]);aa.y.push(W.data[V][1])}this._stackData.push(W.data);this.series[X]._stackData=W.data;this._plotData.push(W.data);W._plotData=W.data;W._plotValues=aa}if(X>0){W._prevPlotData=this.series[X-1]._plotData}W._sumy=0;W._sumx=0;for(V=W.data.length-1;V>-1;V--){W._sumy+=W.data[V][1];W._sumx+=W.data[V][0]}};this.getNextSeriesColor=(function(T){var S=0;var U=T.seriesColors;return function(){if(S<U.length){return U[S++]}else{S=0;return U[S++]}}})(this);this.parseOptions=function(aa){for(var X=0;X<this.preParseOptionsHooks.hooks.length;X++){this.preParseOptionsHooks.hooks[X].call(this,aa)}for(var X=0;X<w.jqplot.preParseOptionsHooks.length;X++){w.jqplot.preParseOptionsHooks[X].call(this,aa)}this.options=w.extend(true,{},this.defaults,aa);this.stackSeries=this.options.stackSeries;if(this.options.seriesColors){this.seriesColors=this.options.seriesColors}if(this.options.negativeSeriesColors){this.negativeSeriesColors=this.options.negativeSeriesColors}if(this.options.captureRightClick){this.captureRightClick=this.options.captureRightClick}this.defaultAxisStart=(aa&&aa.defaultAxisStart!=null)?aa.defaultAxisStart:this.defaultAxisStart;var S=new this.colorGenerator(this.seriesColors);w.extend(true,this._gridPadding,this.options.gridPadding);this.sortData=(this.options.sortData!=null)?this.options.sortData:this.sortData;for(var T in this.axes){var V=this.axes[T];V._options=w.extend(true,{},this.options.axesDefaults,this.options.axes[T]);w.extend(true,V,this.options.axesDefaults,this.options.axes[T]);V._plotWidth=this._width;V._plotHeight=this._height}var Y=function(ae,ac,af){var ab=[];var ad;ac=ac||"vertical";if(!jQuery.isArray(ae[0])){for(ad=0;ad<ae.length;ad++){if(ac=="vertical"){ab.push([af+ad,ae[ad]])}else{ab.push([ae[ad],af+ad])}}}else{w.extend(true,ab,ae)}return ab};for(var X=0;X<this.data.length;X++){var Z=new D();for(var W=0;W<w.jqplot.preParseSeriesOptionsHooks.length;W++){w.jqplot.preParseSeriesOptionsHooks[W].call(Z,this.options.seriesDefaults,this.options.series[X])}for(var W=0;W<this.preParseSeriesOptionsHooks.hooks.length;W++){this.preParseSeriesOptionsHooks.hooks[W].call(Z,this.options.seriesDefaults,this.options.series[X])}w.extend(true,Z,{seriesColors:this.seriesColors,negativeSeriesColors:this.negativeSeriesColors},this.options.seriesDefaults,this.options.series[X]);var U="vertical";if(Z.renderer===w.jqplot.BarRenderer&&Z.rendererOptions&&Z.rendererOptions.barDirection=="horizontal"){U="horizontal"}Z.data=Y(this.data[X],U,this.defaultAxisStart);switch(Z.xaxis){case"xaxis":Z._xaxis=this.axes.xaxis;break;case"x2axis":Z._xaxis=this.axes.x2axis;break;default:break}Z._yaxis=this.axes[Z.yaxis];Z._xaxis._series.push(Z);Z._yaxis._series.push(Z);if(Z.show){Z._xaxis.show=true;Z._yaxis.show=true}if(!Z.color&&Z.show!=false){Z.color=S.next()}if(!Z.label){Z.label="Series "+(X+1).toString()}this.series.push(Z);for(var W=0;W<w.jqplot.postParseSeriesOptionsHooks.length;W++){w.jqplot.postParseSeriesOptionsHooks[W].call(this.series[X],this.options.seriesDefaults,this.options.series[X])}for(var W=0;W<this.postParseSeriesOptionsHooks.hooks.length;W++){this.postParseSeriesOptionsHooks.hooks[W].call(this.series[X],this.options.seriesDefaults,this.options.series[X])}}w.extend(true,this.grid,this.options.grid);for(var T in this.axes){var V=this.axes[T];if(V.borderWidth==null){V.borderWidth=this.grid.borderWidth}if(V.borderColor==null){if(T!="xaxis"&&T!="x2axis"&&V.useSeriesColor===true&&V.show){V.borderColor=V._series[0].color}else{V.borderColor=this.grid.borderColor}}}if(typeof this.options.title=="string"){this.title.text=this.options.title}else{if(typeof this.options.title=="object"){w.extend(true,this.title,this.options.title)}}this.title._plotWidth=this._width;this.legend.setOptions(this.options.legend);for(var X=0;X<w.jqplot.postParseOptionsHooks.length;X++){w.jqplot.postParseOptionsHooks[X].call(this,aa)}for(var X=0;X<this.postParseOptionsHooks.hooks.length;X++){this.postParseOptionsHooks.hooks[X].call(this,aa)}};this.destroy=function(){this.canvasManager.freeAllCanvases();this.target[0].innerHTML=""};this.replot=function(T){var U=T||{};var S=U.clear||true;var V=U.resetAxes||false;this.target.trigger("jqplotPreReplot");if(S){this.canvasManager.freeAllCanvases();if(this._eventCanvas){this.eventCanvas._elem.unbind()}this.target.unbind();this.target.empty()}this.reInitialize();if(V){this.resetAxesScale(V,U.axes)}this.draw();this.target.trigger("jqplotPostReplot")};this.redraw=function(S){S=(S!=null)?S:true;this.target.trigger("jqplotPreRedraw");if(S){this.canvasManager.freeAllCanvases();this.eventCanvas._elem.unbind();this.target.unbind();this.target.empty()}for(var U in this.axes){this.axes[U]._ticks=[]}for(var T=0;T<this.series.length;T++){this.populatePlotData(this.series[T],T)}this._sumy=0;this._sumx=0;for(T=0;T<this.series.length;T++){this._sumy+=this.series[T]._sumy;this._sumx+=this.series[T]._sumx}this.draw();this.target.trigger("jqplotPostRedraw")};this.draw=function(){if(this.drawIfHidden||this.target.is(":visible")){this.target.trigger("jqplotPreDraw");var Y,X;for(Y=0;Y<w.jqplot.preDrawHooks.length;Y++){w.jqplot.preDrawHooks[Y].call(this)}for(Y=0;Y<this.preDrawHooks.hooks.length;Y++){this.preDrawHooks.hooks[Y].call(this)}this.target.append(this.baseCanvas.createElement({left:0,right:0,top:0,bottom:0},"jqplot-base-canvas",null,this));this.baseCanvas.setContext();this.target.append(this.title.draw());this.title.pack({top:0,left:0});var ad=this.legend.draw();var ac={top:0,left:0,bottom:0,right:0};if(this.legend.placement=="outsideGrid"){this.target.append(ad);switch(this.legend.location){case"n":ac.top+=this.legend.getHeight();break;case"s":ac.bottom+=this.legend.getHeight();break;case"ne":case"e":case"se":ac.right+=this.legend.getWidth();break;case"nw":case"w":case"sw":ac.left+=this.legend.getWidth();break;default:ac.right+=this.legend.getWidth();break}ad=ad.detach()}var S=this.axes;for(var U in S){this.target.append(S[U].draw(this.baseCanvas._ctx,this));S[U].set()}if(S.yaxis.show){ac.left+=S.yaxis.getWidth()}var V=["y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis"];var T=[0,0,0,0,0,0,0,0];var aa=0;var W;for(W=0;W<8;W++){if(S[V[W]].show){aa+=S[V[W]].getWidth();T[W]=aa}}ac.right+=aa;if(S.x2axis.show){ac.top+=S.x2axis.getHeight()}if(this.title.show){ac.top+=this.title.getHeight()}if(S.xaxis.show){ac.bottom+=S.xaxis.getHeight()}var Z=["top","bottom","left","right"];for(var W in Z){if(this._gridPadding[Z[W]]==null&&ac[Z[W]]>0){this._gridPadding[Z[W]]=ac[Z[W]]}else{if(this._gridPadding[Z[W]]==null){this._gridPadding[Z[W]]=this._defaultGridPadding[Z[W]]}}}var ab=(this.legend.placement=="outsideGrid")?{top:this.title.getHeight(),left:0,right:0,bottom:0}:this._gridPadding;S.xaxis.pack({position:"absolute",bottom:this._gridPadding.bottom-S.xaxis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right});S.yaxis.pack({position:"absolute",top:0,left:this._gridPadding.left-S.yaxis.getWidth(),height:this._height},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top});S.x2axis.pack({position:"absolute",top:this._gridPadding.top-S.x2axis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right});for(Y=8;Y>0;Y--){S[V[Y-1]].pack({position:"absolute",top:0,right:this._gridPadding.right-T[Y-1]},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top})}this.target.append(this.grid.createElement(this._gridPadding,this));this.grid.draw();for(Y=0;Y<this.series.length;Y++){X=this.seriesStack[Y];this.target.append(this.series[X].shadowCanvas.createElement(this._gridPadding,"jqplot-series-shadowCanvas",null,this));this.series[X].shadowCanvas.setContext();this.series[X].shadowCanvas._elem.data("seriesIndex",X)}for(Y=0;Y<this.series.length;Y++){X=this.seriesStack[Y];this.target.append(this.series[X].canvas.createElement(this._gridPadding,"jqplot-series-canvas",null,this));this.series[X].canvas.setContext();this.series[X].canvas._elem.data("seriesIndex",X)}this.target.append(this.eventCanvas.createElement(this._gridPadding,"jqplot-event-canvas",null,this));this.eventCanvas.setContext();this.eventCanvas._ctx.fillStyle="rgba(0,0,0,0)";this.eventCanvas._ctx.fillRect(0,0,this.eventCanvas._ctx.canvas.width,this.eventCanvas._ctx.canvas.height);this.bindCustomEvents();if(this.legend.preDraw){this.eventCanvas._elem.before(ad);this.legend.pack(ab);if(this.legend._elem){this.drawSeries({legendInfo:{location:this.legend.location,placement:this.legend.placement,width:this.legend.getWidth(),height:this.legend.getHeight(),xoffset:this.legend.xoffset,yoffset:this.legend.yoffset}})}else{this.drawSeries()}}else{this.drawSeries();if(this.series.length){w(this.series[this.series.length-1].canvas._elem).after(ad)}this.legend.pack(ab)}for(var Y=0;Y<w.jqplot.eventListenerHooks.length;Y++){this.eventCanvas._elem.bind(w.jqplot.eventListenerHooks[Y][0],{plot:this},w.jqplot.eventListenerHooks[Y][1])}for(var Y=0;Y<this.eventListenerHooks.hooks.length;Y++){this.eventCanvas._elem.bind(this.eventListenerHooks.hooks[Y][0],{plot:this},this.eventListenerHooks.hooks[Y][1])}for(var Y=0;Y<w.jqplot.postDrawHooks.length;Y++){w.jqplot.postDrawHooks[Y].call(this)}for(var Y=0;Y<this.postDrawHooks.hooks.length;Y++){this.postDrawHooks.hooks[Y].call(this)}if(this.target.is(":visible")){this._drawCount+=1}this.target.trigger("jqplotPostDraw",[this])}};this.bindCustomEvents=function(){this.eventCanvas._elem.bind("click",{plot:this},this.onClick);this.eventCanvas._elem.bind("dblclick",{plot:this},this.onDblClick);this.eventCanvas._elem.bind("mousedown",{plot:this},this.onMouseDown);this.eventCanvas._elem.bind("mousemove",{plot:this},this.onMouseMove);this.eventCanvas._elem.bind("mouseenter",{plot:this},this.onMouseEnter);this.eventCanvas._elem.bind("mouseleave",{plot:this},this.onMouseLeave);if(this.captureRightClick){this.eventCanvas._elem.bind("mouseup",{plot:this},this.onRightClick);this.eventCanvas._elem.get(0).oncontextmenu=function(){return false}}else{this.eventCanvas._elem.bind("mouseup",{plot:this},this.onMouseUp)}};function P(aa){var Z=aa.data.plot;var V=Z.eventCanvas._elem.offset();var Y={x:aa.pageX-V.left,y:aa.pageY-V.top};var W={xaxis:null,yaxis:null,x2axis:null,y2axis:null,y3axis:null,y4axis:null,y5axis:null,y6axis:null,y7axis:null,y8axis:null,y9axis:null};var X=["xaxis","yaxis","x2axis","y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis"];var S=Z.axes;var T,U;for(T=11;T>0;T--){U=X[T-1];if(S[U].show){W[U]=S[U].series_p2u(Y[U.charAt(0)])}}return{offsets:V,gridPos:Y,dataPos:W}}function R(S,T){var X=T.series;var aC,aB,aA,av,aw,ap,ao,ac,aa,af,ag,aq;var az,aD,ax,Y,an,at;var U,au;for(aA=T.seriesStack.length-1;aA>=0;aA--){aC=T.seriesStack[aA];av=X[aC];switch(av.renderer.constructor){case w.jqplot.BarRenderer:ap=S.x;ao=S.y;for(aB=0;aB<av._barPoints.length;aB++){an=av._barPoints[aB];ax=av.gridData[aB];if(ap>an[0][0]&&ap<an[2][0]&&ao>an[2][1]&&ao<an[0][1]){return{seriesIndex:av.index,pointIndex:aB,gridData:ax,data:av.data[aB],points:av._barPoints[aB]}}}break;case w.jqplot.DonutRenderer:af=av.startAngle/180*Math.PI;ap=S.x-av._center[0];ao=S.y-av._center[1];aw=Math.sqrt(Math.pow(ap,2)+Math.pow(ao,2));if(ap>0&&-ao>=0){ac=2*Math.PI-Math.atan(-ao/ap)}else{if(ap>0&&-ao<0){ac=-Math.atan(-ao/ap)}else{if(ap<0){ac=Math.PI-Math.atan(-ao/ap)}else{if(ap==0&&-ao>0){ac=3*Math.PI/2}else{if(ap==0&&-ao<0){ac=Math.PI/2}else{if(ap==0&&ao==0){ac=0}}}}}}if(af){ac-=af;if(ac<0){ac+=2*Math.PI}else{if(ac>2*Math.PI){ac-=2*Math.PI}}}aa=av.sliceMargin/180*Math.PI;if(aw<av._radius&&aw>av._innerRadius){for(aB=0;aB<av.gridData.length;aB++){ag=(aB>0)?av.gridData[aB-1][1]+aa:aa;aq=av.gridData[aB][1];if(ac>ag&&ac<aq){return{seriesIndex:av.index,pointIndex:aB,gridData:av.gridData[aB],data:av.data[aB]}}}}break;case w.jqplot.PieRenderer:af=av.startAngle/180*Math.PI;ap=S.x-av._center[0];ao=S.y-av._center[1];aw=Math.sqrt(Math.pow(ap,2)+Math.pow(ao,2));if(ap>0&&-ao>=0){ac=2*Math.PI-Math.atan(-ao/ap)}else{if(ap>0&&-ao<0){ac=-Math.atan(-ao/ap)}else{if(ap<0){ac=Math.PI-Math.atan(-ao/ap)}else{if(ap==0&&-ao>0){ac=3*Math.PI/2}else{if(ap==0&&-ao<0){ac=Math.PI/2}else{if(ap==0&&ao==0){ac=0}}}}}}if(af){ac-=af;if(ac<0){ac+=2*Math.PI}else{if(ac>2*Math.PI){ac-=2*Math.PI}}}aa=av.sliceMargin/180*Math.PI;if(aw<av._radius){for(aB=0;aB<av.gridData.length;aB++){ag=(aB>0)?av.gridData[aB-1][1]+aa:aa;aq=av.gridData[aB][1];if(ac>ag&&ac<aq){return{seriesIndex:av.index,pointIndex:aB,gridData:av.gridData[aB],data:av.data[aB]}}}}break;case w.jqplot.BubbleRenderer:ap=S.x;ao=S.y;var al=null;if(av.show){for(var aB=0;aB<av.gridData.length;aB++){ax=av.gridData[aB];aD=Math.sqrt((ap-ax[0])*(ap-ax[0])+(ao-ax[1])*(ao-ax[1]));if(aD<=ax[2]&&(aD<=az||az==null)){az=aD;al={seriesIndex:aC,pointIndex:aB,gridData:ax,data:av.data[aB]}}}if(al!=null){return al}}break;case w.jqplot.FunnelRenderer:ap=S.x;ao=S.y;var ar=av._vertices,W=ar[0],V=ar[ar.length-1],Z,ak,ae;function ay(aG,aI,aH){var aF=(aI[1]-aH[1])/(aI[0]-aH[0]);var aE=aI[1]-aF*aI[0];var aJ=aG+aI[1];return[(aJ-aE)/aF,aJ]}Z=ay(ao,W[0],V[3]);ak=ay(ao,W[1],V[2]);for(aB=0;aB<ar.length;aB++){ae=ar[aB];if(ao>=ae[0][1]&&ao<=ae[3][1]&&ap>=Z[0]&&ap<=ak[0]){return{seriesIndex:av.index,pointIndex:aB,gridData:null,data:av.data[aB]}}}break;case w.jqplot.LineRenderer:ap=S.x;ao=S.y;aw=av.renderer;if(av.show){if(av.fill){var ad=false;if(ap>av._boundingBox[0][0]&&ap<av._boundingBox[1][0]&&ao>av._boundingBox[1][1]&&ao<av._boundingBox[0][1]){var aj=av._areaPoints.length;var am;var aB=aj-1;for(var am=0;am<aj;am++){var ai=[av._areaPoints[am][0],av._areaPoints[am][1]];var ah=[av._areaPoints[aB][0],av._areaPoints[aB][1]];if(ai[1]<ao&&ah[1]>=ao||ah[1]<ao&&ai[1]>=ao){if(ai[0]+(ao-ai[1])/(ah[1]-ai[1])*(ah[0]-ai[0])<ap){ad=!ad}}aB=am}}if(ad){return{seriesIndex:aC,pointIndex:null,gridData:av.gridData,data:av.data,points:av._areaPoints}}break}else{au=av.markerRenderer.size/2+av.neighborThreshold;U=(au>0)?au:0;for(var aB=0;aB<av.gridData.length;aB++){ax=av.gridData[aB];if(aw.constructor==w.jqplot.OHLCRenderer){if(aw.candleStick){var ab=av._yaxis.series_u2p;if(ap>=ax[0]-aw._bodyWidth/2&&ap<=ax[0]+aw._bodyWidth/2&&ao>=ab(av.data[aB][2])&&ao<=ab(av.data[aB][3])){return{seriesIndex:aC,pointIndex:aB,gridData:ax,data:av.data[aB]}}}else{if(!aw.hlc){var ab=av._yaxis.series_u2p;if(ap>=ax[0]-aw._tickLength&&ap<=ax[0]+aw._tickLength&&ao>=ab(av.data[aB][2])&&ao<=ab(av.data[aB][3])){return{seriesIndex:aC,pointIndex:aB,gridData:ax,data:av.data[aB]}}}else{var ab=av._yaxis.series_u2p;if(ap>=ax[0]-aw._tickLength&&ap<=ax[0]+aw._tickLength&&ao>=ab(av.data[aB][1])&&ao<=ab(av.data[aB][2])){return{seriesIndex:aC,pointIndex:aB,gridData:ax,data:av.data[aB]}}}}}else{if(ax[0]!=null&&ax[1]!=null){aD=Math.sqrt((ap-ax[0])*(ap-ax[0])+(ao-ax[1])*(ao-ax[1]));if(aD<=U&&(aD<=az||az==null)){az=aD;return{seriesIndex:aC,pointIndex:aB,gridData:ax,data:av.data[aB]}}}}}}}break;default:ap=S.x;ao=S.y;aw=av.renderer;if(av.show){au=av.markerRenderer.size/2+av.neighborThreshold;U=(au>0)?au:0;for(var aB=0;aB<av.gridData.length;aB++){ax=av.gridData[aB];if(aw.constructor==w.jqplot.OHLCRenderer){if(aw.candleStick){var ab=av._yaxis.series_u2p;if(ap>=ax[0]-aw._bodyWidth/2&&ap<=ax[0]+aw._bodyWidth/2&&ao>=ab(av.data[aB][2])&&ao<=ab(av.data[aB][3])){return{seriesIndex:aC,pointIndex:aB,gridData:ax,data:av.data[aB]}}}else{if(!aw.hlc){var ab=av._yaxis.series_u2p;if(ap>=ax[0]-aw._tickLength&&ap<=ax[0]+aw._tickLength&&ao>=ab(av.data[aB][2])&&ao<=ab(av.data[aB][3])){return{seriesIndex:aC,pointIndex:aB,gridData:ax,data:av.data[aB]}}}else{var ab=av._yaxis.series_u2p;if(ap>=ax[0]-aw._tickLength&&ap<=ax[0]+aw._tickLength&&ao>=ab(av.data[aB][1])&&ao<=ab(av.data[aB][2])){return{seriesIndex:aC,pointIndex:aB,gridData:ax,data:av.data[aB]}}}}}else{aD=Math.sqrt((ap-ax[0])*(ap-ax[0])+(ao-ax[1])*(ao-ax[1]));if(aD<=U&&(aD<=az||az==null)){az=aD;return{seriesIndex:aC,pointIndex:aB,gridData:ax,data:av.data[aB]}}}}}break}}return null}this.onClick=function(U){var T=P(U);var W=U.data.plot;var V=R(T.gridPos,W);var S=jQuery.Event("jqplotClick");S.pageX=U.pageX;S.pageY=U.pageY;w(this).trigger(S,[T.gridPos,T.dataPos,V,W])};this.onDblClick=function(U){var T=P(U);var W=U.data.plot;var V=R(T.gridPos,W);var S=jQuery.Event("jqplotDblClick");S.pageX=U.pageX;S.pageY=U.pageY;w(this).trigger(S,[T.gridPos,T.dataPos,V,W])};this.onMouseDown=function(U){var T=P(U);var W=U.data.plot;var V=R(T.gridPos,W);var S=jQuery.Event("jqplotMouseDown");S.pageX=U.pageX;S.pageY=U.pageY;w(this).trigger(S,[T.gridPos,T.dataPos,V,W])};this.onMouseUp=function(U){var T=P(U);var S=jQuery.Event("jqplotMouseUp");S.pageX=U.pageX;S.pageY=U.pageY;w(this).trigger(S,[T.gridPos,T.dataPos,null,U.data.plot])};this.onRightClick=function(U){var T=P(U);var W=U.data.plot;var V=R(T.gridPos,W);if(W.captureRightClick){if(U.which==3){var S=jQuery.Event("jqplotRightClick");S.pageX=U.pageX;S.pageY=U.pageY;w(this).trigger(S,[T.gridPos,T.dataPos,V,W])}else{var S=jQuery.Event("jqplotMouseUp");S.pageX=U.pageX;S.pageY=U.pageY;w(this).trigger(S,[T.gridPos,T.dataPos,V,W])}}};this.onMouseMove=function(U){var T=P(U);var W=U.data.plot;var V=R(T.gridPos,W);var S=jQuery.Event("jqplotMouseMove");S.pageX=U.pageX;S.pageY=U.pageY;w(this).trigger(S,[T.gridPos,T.dataPos,V,W])};this.onMouseEnter=function(U){var T=P(U);var V=U.data.plot;var S=jQuery.Event("jqplotMouseEnter");S.pageX=U.pageX;S.pageY=U.pageY;w(this).trigger(S,[T.gridPos,T.dataPos,null,V])};this.onMouseLeave=function(U){var T=P(U);var V=U.data.plot;var S=jQuery.Event("jqplotMouseLeave");S.pageX=U.pageX;S.pageY=U.pageY;w(this).trigger(S,[T.gridPos,T.dataPos,null,V])};this.drawSeries=function(U,S){var W,V,T;S=(typeof(U)==="number"&&S==null)?U:S;U=(typeof(U)==="object")?U:{};if(S!=l){V=this.series[S];T=V.shadowCanvas._ctx;T.clearRect(0,0,T.canvas.width,T.canvas.height);V.drawShadow(T,U,this);T=V.canvas._ctx;T.clearRect(0,0,T.canvas.width,T.canvas.height);V.draw(T,U,this);if(V.renderer.constructor==w.jqplot.BezierCurveRenderer){if(S<this.series.length-1){this.drawSeries(S+1)}}}else{for(W=0;W<this.series.length;W++){V=this.series[W];T=V.shadowCanvas._ctx;T.clearRect(0,0,T.canvas.width,T.canvas.height);V.drawShadow(T,U,this);T=V.canvas._ctx;T.clearRect(0,0,T.canvas.width,T.canvas.height);V.draw(T,U,this)}}U=S=W=V=T=null};this.moveSeriesToFront=function(T){T=parseInt(T,10);var W=w.inArray(T,this.seriesStack);if(W==-1){return}if(W==this.seriesStack.length-1){this.previousSeriesStack=this.seriesStack.slice(0);return}var S=this.seriesStack[this.seriesStack.length-1];var V=this.series[T].canvas._elem.detach();var U=this.series[T].shadowCanvas._elem.detach();this.series[S].shadowCanvas._elem.after(U);this.series[S].canvas._elem.after(V);this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack.splice(W,1);this.seriesStack.push(T)};this.moveSeriesToBack=function(T){T=parseInt(T,10);var W=w.inArray(T,this.seriesStack);if(W==0||W==-1){return}var S=this.seriesStack[0];var V=this.series[T].canvas._elem.detach();var U=this.series[T].shadowCanvas._elem.detach();this.series[S].shadowCanvas._elem.before(U);this.series[S].canvas._elem.before(V);this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack.splice(W,1);this.seriesStack.unshift(T)};this.restorePreviousSeriesOrder=function(){var Y,X,W,V,U,S,T;if(this.seriesStack==this.previousSeriesStack){return}for(Y=1;Y<this.previousSeriesStack.length;Y++){S=this.previousSeriesStack[Y];T=this.previousSeriesStack[Y-1];W=this.series[S].canvas._elem.detach();V=this.series[S].shadowCanvas._elem.detach();this.series[T].shadowCanvas._elem.after(V);this.series[T].canvas._elem.after(W)}U=this.seriesStack.slice(0);this.seriesStack=this.previousSeriesStack.slice(0);this.previousSeriesStack=U};this.restoreOriginalSeriesOrder=function(){var W,V,S=[],U,T;for(W=0;W<this.series.length;W++){S.push(W)}if(this.seriesStack==S){return}this.previousSeriesStack=this.seriesStack.slice(0);this.seriesStack=S;for(W=1;W<this.seriesStack.length;W++){U=this.series[W].canvas._elem.detach();T=this.series[W].shadowCanvas._elem.detach();this.series[W-1].shadowCanvas._elem.after(T);this.series[W-1].canvas._elem.after(U)}};this.activateTheme=function(S){this.themeEngine.activate(this,S)}}w.jqplot.computeHighlightColors=function(P){var R;if(jQuery.isArray(P)){R=[];for(var T=0;T<P.length;T++){var S=w.jqplot.getColorComponents(P[T]);var O=[S[0],S[1],S[2]];var U=O[0]+O[1]+O[2];for(var Q=0;Q<3;Q++){O[Q]=(U>570)?O[Q]*0.8:O[Q]+0.3*(255-O[Q]);O[Q]=parseInt(O[Q],10)}R.push("rgb("+O[0]+","+O[1]+","+O[2]+")")}}else{var S=w.jqplot.getColorComponents(P);var O=[S[0],S[1],S[2]];var U=O[0]+O[1]+O[2];for(var Q=0;Q<3;Q++){O[Q]=(U>570)?O[Q]*0.8:O[Q]+0.3*(255-O[Q]);O[Q]=parseInt(O[Q],10)}R="rgb("+O[0]+","+O[1]+","+O[2]+")"}return R};w.jqplot.ColorGenerator=function(P){P=P||w.jqplot.config.defaultColors;var O=0;this.next=function(){if(O<P.length){return P[O++]}else{O=0;return P[O++]}};this.previous=function(){if(O>0){return P[O--]}else{O=P.length-1;return P[O]}};this.get=function(R){var Q=R-P.length*Math.floor(R/P.length);return P[Q]};this.setColors=function(Q){P=Q};this.reset=function(){O=0}};w.jqplot.hex2rgb=function(Q,O){Q=Q.replace("#","");if(Q.length==3){Q=Q.charAt(0)+Q.charAt(0)+Q.charAt(1)+Q.charAt(1)+Q.charAt(2)+Q.charAt(2)}var P;P="rgba("+parseInt(Q.slice(0,2),16)+", "+parseInt(Q.slice(2,4),16)+", "+parseInt(Q.slice(4,6),16);if(O){P+=", "+O}P+=")";return P};w.jqplot.rgb2hex=function(T){var Q=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *(?:, *[0-9.]*)?\)/;var O=T.match(Q);var S="#";for(var R=1;R<4;R++){var P;if(O[R].search(/%/)!=-1){P=parseInt(255*O[R]/100,10).toString(16);if(P.length==1){P="0"+P}}else{P=parseInt(O[R],10).toString(16);if(P.length==1){P="0"+P}}S+=P}return S};w.jqplot.normalize2rgb=function(P,O){if(P.search(/^ *rgba?\(/)!=-1){return P}else{if(P.search(/^ *#?[0-9a-fA-F]?[0-9a-fA-F]/)!=-1){return w.jqplot.hex2rgb(P,O)}else{throw"invalid color spec"}}};w.jqplot.getColorComponents=function(T){T=w.jqplot.colorKeywordMap[T]||T;var R=w.jqplot.normalize2rgb(T);var Q=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *,? *([0-9.]* *)?\)/;var O=R.match(Q);var P=[];for(var S=1;S<4;S++){if(O[S].search(/%/)!=-1){P[S-1]=parseInt(255*O[S]/100,10)}else{P[S-1]=parseInt(O[S],10)}}P[3]=parseFloat(O[4])?parseFloat(O[4]):1;return P};w.jqplot.colorKeywordMap={aliceblue:"rgb(240, 248, 255)",antiquewhite:"rgb(250, 235, 215)",aqua:"rgb( 0, 255, 255)",aquamarine:"rgb(127, 255, 212)",azure:"rgb(240, 255, 255)",beige:"rgb(245, 245, 220)",bisque:"rgb(255, 228, 196)",black:"rgb( 0, 0, 0)",blanchedalmond:"rgb(255, 235, 205)",blue:"rgb( 0, 0, 255)",blueviolet:"rgb(138, 43, 226)",brown:"rgb(165, 42, 42)",burlywood:"rgb(222, 184, 135)",cadetblue:"rgb( 95, 158, 160)",chartreuse:"rgb(127, 255, 0)",chocolate:"rgb(210, 105, 30)",coral:"rgb(255, 127, 80)",cornflowerblue:"rgb(100, 149, 237)",cornsilk:"rgb(255, 248, 220)",crimson:"rgb(220, 20, 60)",cyan:"rgb( 0, 255, 255)",darkblue:"rgb( 0, 0, 139)",darkcyan:"rgb( 0, 139, 139)",darkgoldenrod:"rgb(184, 134, 11)",darkgray:"rgb(169, 169, 169)",darkgreen:"rgb( 0, 100, 0)",darkgrey:"rgb(169, 169, 169)",darkkhaki:"rgb(189, 183, 107)",darkmagenta:"rgb(139, 0, 139)",darkolivegreen:"rgb( 85, 107, 47)",darkorange:"rgb(255, 140, 0)",darkorchid:"rgb(153, 50, 204)",darkred:"rgb(139, 0, 0)",darksalmon:"rgb(233, 150, 122)",darkseagreen:"rgb(143, 188, 143)",darkslateblue:"rgb( 72, 61, 139)",darkslategray:"rgb( 47, 79, 79)",darkslategrey:"rgb( 47, 79, 79)",darkturquoise:"rgb( 0, 206, 209)",darkviolet:"rgb(148, 0, 211)",deeppink:"rgb(255, 20, 147)",deepskyblue:"rgb( 0, 191, 255)",dimgray:"rgb(105, 105, 105)",dimgrey:"rgb(105, 105, 105)",dodgerblue:"rgb( 30, 144, 255)",firebrick:"rgb(178, 34, 34)",floralwhite:"rgb(255, 250, 240)",forestgreen:"rgb( 34, 139, 34)",fuchsia:"rgb(255, 0, 255)",gainsboro:"rgb(220, 220, 220)",ghostwhite:"rgb(248, 248, 255)",gold:"rgb(255, 215, 0)",goldenrod:"rgb(218, 165, 32)",gray:"rgb(128, 128, 128)",grey:"rgb(128, 128, 128)",green:"rgb( 0, 128, 0)",greenyellow:"rgb(173, 255, 47)",honeydew:"rgb(240, 255, 240)",hotpink:"rgb(255, 105, 180)",indianred:"rgb(205, 92, 92)",indigo:"rgb( 75, 0, 130)",ivory:"rgb(255, 255, 240)",khaki:"rgb(240, 230, 140)",lavender:"rgb(230, 230, 250)",lavenderblush:"rgb(255, 240, 245)",lawngreen:"rgb(124, 252, 0)",lemonchiffon:"rgb(255, 250, 205)",lightblue:"rgb(173, 216, 230)",lightcoral:"rgb(240, 128, 128)",lightcyan:"rgb(224, 255, 255)",lightgoldenrodyellow:"rgb(250, 250, 210)",lightgray:"rgb(211, 211, 211)",lightgreen:"rgb(144, 238, 144)",lightgrey:"rgb(211, 211, 211)",lightpink:"rgb(255, 182, 193)",lightsalmon:"rgb(255, 160, 122)",lightseagreen:"rgb( 32, 178, 170)",lightskyblue:"rgb(135, 206, 250)",lightslategray:"rgb(119, 136, 153)",lightslategrey:"rgb(119, 136, 153)",lightsteelblue:"rgb(176, 196, 222)",lightyellow:"rgb(255, 255, 224)",lime:"rgb( 0, 255, 0)",limegreen:"rgb( 50, 205, 50)",linen:"rgb(250, 240, 230)",magenta:"rgb(255, 0, 255)",maroon:"rgb(128, 0, 0)",mediumaquamarine:"rgb(102, 205, 170)",mediumblue:"rgb( 0, 0, 205)",mediumorchid:"rgb(186, 85, 211)",mediumpurple:"rgb(147, 112, 219)",mediumseagreen:"rgb( 60, 179, 113)",mediumslateblue:"rgb(123, 104, 238)",mediumspringgreen:"rgb( 0, 250, 154)",mediumturquoise:"rgb( 72, 209, 204)",mediumvioletred:"rgb(199, 21, 133)",midnightblue:"rgb( 25, 25, 112)",mintcream:"rgb(245, 255, 250)",mistyrose:"rgb(255, 228, 225)",moccasin:"rgb(255, 228, 181)",navajowhite:"rgb(255, 222, 173)",navy:"rgb( 0, 0, 128)",oldlace:"rgb(253, 245, 230)",olive:"rgb(128, 128, 0)",olivedrab:"rgb(107, 142, 35)",orange:"rgb(255, 165, 0)",orangered:"rgb(255, 69, 0)",orchid:"rgb(218, 112, 214)",palegoldenrod:"rgb(238, 232, 170)",palegreen:"rgb(152, 251, 152)",paleturquoise:"rgb(175, 238, 238)",palevioletred:"rgb(219, 112, 147)",papayawhip:"rgb(255, 239, 213)",peachpuff:"rgb(255, 218, 185)",peru:"rgb(205, 133, 63)",pink:"rgb(255, 192, 203)",plum:"rgb(221, 160, 221)",powderblue:"rgb(176, 224, 230)",purple:"rgb(128, 0, 128)",red:"rgb(255, 0, 0)",rosybrown:"rgb(188, 143, 143)",royalblue:"rgb( 65, 105, 225)",saddlebrown:"rgb(139, 69, 19)",salmon:"rgb(250, 128, 114)",sandybrown:"rgb(244, 164, 96)",seagreen:"rgb( 46, 139, 87)",seashell:"rgb(255, 245, 238)",sienna:"rgb(160, 82, 45)",silver:"rgb(192, 192, 192)",skyblue:"rgb(135, 206, 235)",slateblue:"rgb(106, 90, 205)",slategray:"rgb(112, 128, 144)",slategrey:"rgb(112, 128, 144)",snow:"rgb(255, 250, 250)",springgreen:"rgb( 0, 255, 127)",steelblue:"rgb( 70, 130, 180)",tan:"rgb(210, 180, 140)",teal:"rgb( 0, 128, 128)",thistle:"rgb(216, 191, 216)",tomato:"rgb(255, 99, 71)",turquoise:"rgb( 64, 224, 208)",violet:"rgb(238, 130, 238)",wheat:"rgb(245, 222, 179)",white:"rgb(255, 255, 255)",whitesmoke:"rgb(245, 245, 245)",yellow:"rgb(255, 255, 0)",yellowgreen:"rgb(154, 205, 50)"};w.jqplot.AxisLabelRenderer=function(O){w.jqplot.ElemContainer.call(this);this.axis;this.show=true;this.label="";this.fontFamily=null;this.fontSize=null;this.textColor=null;this._elem;this.escapeHTML=false;w.extend(true,this,O)};w.jqplot.AxisLabelRenderer.prototype=new w.jqplot.ElemContainer();w.jqplot.AxisLabelRenderer.prototype.constructor=w.jqplot.AxisLabelRenderer;w.jqplot.AxisLabelRenderer.prototype.init=function(O){w.extend(true,this,O)};w.jqplot.AxisLabelRenderer.prototype.draw=function(O,P){if(this._elem){this._elem.emptyForce();this._elem=null}this._elem=w('<div style="position:absolute;" class="jqplot-'+this.axis+'-label"></div>');if(Number(this.label)){this._elem.css("white-space","nowrap")}if(!this.escapeHTML){this._elem.html(this.label)}else{this._elem.text(this.label)}if(this.fontFamily){this._elem.css("font-family",this.fontFamily)}if(this.fontSize){this._elem.css("font-size",this.fontSize)}if(this.textColor){this._elem.css("color",this.textColor)}return this._elem};w.jqplot.AxisLabelRenderer.prototype.pack=function(){};w.jqplot.AxisTickRenderer=function(O){w.jqplot.ElemContainer.call(this);this.mark="outside";this.axis;this.showMark=true;this.showGridline=true;this.isMinorTick=false;this.size=4;this.markSize=6;this.show=true;this.showLabel=true;this.label="";this.value=null;this._styles={};this.formatter=w.jqplot.DefaultTickFormatter;this.prefix="";this.formatString="";this.fontFamily;this.fontSize;this.textColor;this.escapeHTML=false;this._elem;this._breakTick=false;w.extend(true,this,O)};w.jqplot.AxisTickRenderer.prototype.init=function(O){w.extend(true,this,O)};w.jqplot.AxisTickRenderer.prototype=new w.jqplot.ElemContainer();w.jqplot.AxisTickRenderer.prototype.constructor=w.jqplot.AxisTickRenderer;w.jqplot.AxisTickRenderer.prototype.setTick=function(O,Q,P){this.value=O;this.axis=Q;if(P){this.isMinorTick=true}return this};w.jqplot.AxisTickRenderer.prototype.draw=function(){if(!this.label){this.label=this.prefix+this.formatter(this.formatString,this.value)}var P={position:"absolute"};if(Number(this.label)){P.whitSpace="nowrap"}if(this._elem){this._elem.emptyForce();this._elem=null}this._elem=w(document.createElement("div"));this._elem.addClass("jqplot-"+this.axis+"-tick");if(!this.escapeHTML){this._elem.html(this.label)}else{this._elem.text(this.label)}this._elem.css(P);for(var O in this._styles){this._elem.css(O,this._styles[O])}if(this.fontFamily){this._elem.css("font-family",this.fontFamily)}if(this.fontSize){this._elem.css("font-size",this.fontSize)}if(this.textColor){this._elem.css("color",this.textColor)}if(this._breakTick){this._elem.addClass("jqplot-breakTick")}return this._elem};w.jqplot.DefaultTickFormatter=function(O,P){if(typeof P=="number"){if(!O){O=w.jqplot.config.defaultTickFormatString}return w.jqplot.sprintf(O,P)}else{return String(P)}};w.jqplot.AxisTickRenderer.prototype.pack=function(){};w.jqplot.CanvasGridRenderer=function(){this.shadowRenderer=new w.jqplot.ShadowRenderer()};w.jqplot.CanvasGridRenderer.prototype.init=function(P){this._ctx;w.extend(true,this,P);var O={lineJoin:"miter",lineCap:"round",fill:false,isarc:false,angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.shadowWidth,closePath:false,strokeStyle:this.shadowColor};this.renderer.shadowRenderer.init(O)};w.jqplot.CanvasGridRenderer.prototype.createElement=function(R){var Q;if(this._elem){if(w.jqplot.use_excanvas){Q=this._elem.get(0);window.G_vmlCanvasManager.uninitElement(Q);Q=null}this._elem.emptyForce();this._elem=null}Q=R.canvasManager.getCanvas();var O=this._plotDimensions.width;var P=this._plotDimensions.height;Q.width=O;Q.height=P;this._elem=w(Q);this._elem.addClass("jqplot-grid-canvas");this._elem.css({position:"absolute",left:0,top:0});Q=R.canvasManager.initCanvas(Q);this._top=this._offsets.top;this._bottom=P-this._offsets.bottom;this._left=this._offsets.left;this._right=O-this._offsets.right;this._width=this._right-this._left;this._height=this._bottom-this._top;Q=null;return this._elem};w.jqplot.CanvasGridRenderer.prototype.draw=function(){this._ctx=this._elem.get(0).getContext("2d");var Y=this._ctx;var ab=this._axes;Y.save();Y.clearRect(0,0,this._plotDimensions.width,this._plotDimensions.height);Y.fillStyle=this.backgroundColor||this.background;Y.fillRect(this._left,this._top,this._width,this._height);if(true){Y.save();Y.lineJoin="miter";Y.lineCap="butt";Y.lineWidth=this.gridLineWidth;Y.strokeStyle=this.gridLineColor;var ae,ad,W,X;var T=["xaxis","yaxis","x2axis","y2axis"];for(var ac=4;ac>0;ac--){var ag=T[ac-1];var O=ab[ag];var af=O._ticks;if(O.show){for(var Z=af.length;Z>0;Z--){var U=af[Z-1];if(U.show){var R=Math.round(O.u2p(U.value))+0.5;switch(ag){case"xaxis":if(U.showGridline&&this.drawGridlines){V(R,this._top,R,this._bottom)}if(U.showMark&&U.mark){W=U.markSize;X=U.mark;var R=Math.round(O.u2p(U.value))+0.5;switch(X){case"outside":ae=this._bottom;ad=this._bottom+W;break;case"inside":ae=this._bottom-W;ad=this._bottom;break;case"cross":ae=this._bottom-W;ad=this._bottom+W;break;default:ae=this._bottom;ad=this._bottom+W;break}if(this.shadow){this.renderer.shadowRenderer.draw(Y,[[R,ae],[R,ad]],{lineCap:"butt",lineWidth:this.gridLineWidth,offset:this.gridLineWidth*0.75,depth:2,fill:false,closePath:false})}V(R,ae,R,ad)}break;case"yaxis":if(U.showGridline&&this.drawGridlines){V(this._right,R,this._left,R)}if(U.showMark&&U.mark){W=U.markSize;X=U.mark;var R=Math.round(O.u2p(U.value))+0.5;switch(X){case"outside":ae=this._left-W;ad=this._left;break;case"inside":ae=this._left;ad=this._left+W;break;case"cross":ae=this._left-W;ad=this._left+W;break;default:ae=this._left-W;ad=this._left;break}if(this.shadow){this.renderer.shadowRenderer.draw(Y,[[ae,R],[ad,R]],{lineCap:"butt",lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false})}V(ae,R,ad,R,{strokeStyle:O.borderColor})}break;case"x2axis":if(U.showGridline&&this.drawGridlines){V(R,this._bottom,R,this._top)}if(U.showMark&&U.mark){W=U.markSize;X=U.mark;var R=Math.round(O.u2p(U.value))+0.5;switch(X){case"outside":ae=this._top-W;ad=this._top;break;case"inside":ae=this._top;ad=this._top+W;break;case"cross":ae=this._top-W;ad=this._top+W;break;default:ae=this._top-W;ad=this._top;break}if(this.shadow){this.renderer.shadowRenderer.draw(Y,[[R,ae],[R,ad]],{lineCap:"butt",lineWidth:this.gridLineWidth,offset:this.gridLineWidth*0.75,depth:2,fill:false,closePath:false})}V(R,ae,R,ad)}break;case"y2axis":if(U.showGridline&&this.drawGridlines){V(this._left,R,this._right,R)}if(U.showMark&&U.mark){W=U.markSize;X=U.mark;var R=Math.round(O.u2p(U.value))+0.5;switch(X){case"outside":ae=this._right;ad=this._right+W;break;case"inside":ae=this._right-W;ad=this._right;break;case"cross":ae=this._right-W;ad=this._right+W;break;default:ae=this._right;ad=this._right+W;break}if(this.shadow){this.renderer.shadowRenderer.draw(Y,[[ae,R],[ad,R]],{lineCap:"butt",lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false})}V(ae,R,ad,R,{strokeStyle:O.borderColor})}break;default:break}}}U=null}O=null;af=null}T=["y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis"];for(var ac=7;ac>0;ac--){var O=ab[T[ac-1]];var af=O._ticks;if(O.show){var P=af[O.numberTicks-1];var S=af[0];var Q=O.getLeft();var aa=[[Q,P.getTop()+P.getHeight()/2],[Q,S.getTop()+S.getHeight()/2+1]];if(this.shadow){this.renderer.shadowRenderer.draw(Y,aa,{lineCap:"butt",fill:false,closePath:false})}V(aa[0][0],aa[0][1],aa[1][0],aa[1][1],{lineCap:"butt",strokeStyle:O.borderColor,lineWidth:O.borderWidth});for(var Z=af.length;Z>0;Z--){var U=af[Z-1];W=U.markSize;X=U.mark;var R=Math.round(O.u2p(U.value))+0.5;if(U.showMark&&U.mark){switch(X){case"outside":ae=Q;ad=Q+W;break;case"inside":ae=Q-W;ad=Q;break;case"cross":ae=Q-W;ad=Q+W;break;default:ae=Q;ad=Q+W;break}aa=[[ae,R],[ad,R]];if(this.shadow){this.renderer.shadowRenderer.draw(Y,aa,{lineCap:"butt",lineWidth:this.gridLineWidth*1.5,offset:this.gridLineWidth*0.75,fill:false,closePath:false})}V(ae,R,ad,R,{strokeStyle:O.borderColor})}U=null}S=null}O=null;af=null}Y.restore()}function V(al,ak,ai,ah,aj){Y.save();aj=aj||{};if(aj.lineWidth==null||aj.lineWidth!=0){w.extend(true,Y,aj);Y.beginPath();Y.moveTo(al,ak);Y.lineTo(ai,ah);Y.stroke();Y.restore()}}if(this.shadow){var aa=[[this._left,this._bottom],[this._right,this._bottom],[this._right,this._top]];this.renderer.shadowRenderer.draw(Y,aa)}if(this.borderWidth!=0&&this.drawBorder){V(this._left,this._top,this._right,this._top,{lineCap:"round",strokeStyle:ab.x2axis.borderColor,lineWidth:ab.x2axis.borderWidth});V(this._right,this._top,this._right,this._bottom,{lineCap:"round",strokeStyle:ab.y2axis.borderColor,lineWidth:ab.y2axis.borderWidth});V(this._right,this._bottom,this._left,this._bottom,{lineCap:"round",strokeStyle:ab.xaxis.borderColor,lineWidth:ab.xaxis.borderWidth});V(this._left,this._bottom,this._left,this._top,{lineCap:"round",strokeStyle:ab.yaxis.borderColor,lineWidth:ab.yaxis.borderWidth})}Y.restore();Y=null;ab=null};w.jqplot.DivTitleRenderer=function(){};w.jqplot.DivTitleRenderer.prototype.init=function(O){w.extend(true,this,O)};w.jqplot.DivTitleRenderer.prototype.draw=function(){if(this._elem){this._elem.emptyForce();this._elem=null}var R=this.renderer;var Q=document.createElement("div");this._elem=w(Q);this._elem.addClass("jqplot-title");if(!this.text){this.show=false;this._elem.height(0);this._elem.width(0)}else{if(this.text){var O;if(this.color){O=this.color}else{if(this.textColor){O=this.textColor}}var P={position:"absolute",top:"0px",left:"0px"};if(this._plotWidth){P.width=this._plotWidth+"px"}if(this.fontSize){P.fontSize=this.fontSize}if(this.textAlign){P.textAlign=this.textAlign}else{P.textAlign="center"}if(O){P.color=O}if(this.paddingBottom){P.paddingBottom=this.paddingBottom}if(this.fontFamily){P.fontFamily=this.fontFamily}this._elem.css(P);this._elem.text(this.text)}}Q=null;return this._elem};w.jqplot.DivTitleRenderer.prototype.pack=function(){};w.jqplot.LineRenderer=function(){this.shapeRenderer=new w.jqplot.ShapeRenderer();this.shadowRenderer=new w.jqplot.ShadowRenderer()};w.jqplot.LineRenderer.prototype.init=function(P,T){P=P||{};this._type="line";var R={highlightMouseOver:P.highlightMouseOver,highlightMouseDown:P.highlightMouseDown,highlightColor:P.highlightColor};delete (P.highlightMouseOver);delete (P.highlightMouseDown);delete (P.highlightColor);w.extend(true,this.renderer,P);var S={lineJoin:this.lineJoin,lineCap:this.lineCap,fill:this.fill,isarc:false,strokeStyle:this.color,fillStyle:this.fillColor,lineWidth:this.lineWidth,closePath:this.fill};this.renderer.shapeRenderer.init(S);if(this.lineWidth>2.5){var Q=this.shadowOffset*(1+(Math.atan((this.lineWidth/2.5))/0.785398163-1)*0.6)}else{var Q=this.shadowOffset*Math.atan((this.lineWidth/2.5))/0.785398163}var O={lineJoin:this.lineJoin,lineCap:this.lineCap,fill:this.fill,isarc:false,angle:this.shadowAngle,offset:Q,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.lineWidth,closePath:this.fill};this.renderer.shadowRenderer.init(O);this._areaPoints=[];this._boundingBox=[[],[]];if(!this.isTrendline&&this.fill){this.highlightMouseOver=true;this.highlightMouseDown=false;this.highlightColor=null;if(R.highlightMouseDown&&R.highlightMouseOver==null){R.highlightMouseOver=false}w.extend(true,this,{highlightMouseOver:R.highlightMouseOver,highlightMouseDown:R.highlightMouseDown,highlightColor:R.highlightColor});if(!this.highlightColor){this.highlightColor=w.jqplot.computeHighlightColors(this.fillColor)}if(this.highlighter){this.highlighter.show=false}}if(!this.isTrendline&&T){T.plugins.lineRenderer={};T.postInitHooks.addOnce(o);T.postDrawHooks.addOnce(M);T.eventListenerHooks.addOnce("jqplotMouseMove",d);T.eventListenerHooks.addOnce("jqplotMouseDown",a);T.eventListenerHooks.addOnce("jqplotMouseUp",L);T.eventListenerHooks.addOnce("jqplotClick",c);T.eventListenerHooks.addOnce("jqplotRightClick",j)}};w.jqplot.LineRenderer.prototype.setGridData=function(T){var P=this._xaxis.series_u2p;var S=this._yaxis.series_u2p;var Q=this._plotData;var R=this._prevPlotData;this.gridData=[];this._prevGridData=[];for(var O=0;O<this.data.length;O++){if(Q[O][0]!=null&&Q[O][1]!=null){this.gridData.push([P.call(this._xaxis,Q[O][0]),S.call(this._yaxis,Q[O][1])])}else{if(Q[O][0]==null){this.gridData.push([null,S.call(this._yaxis,Q[O][1])])}else{if(Q[O][1]==null){this.gridData.push([P.call(this._xaxis,Q[O][0]),null])}}}if(R[O]!=null&&R[O][0]!=null&&R[O][1]!=null){this._prevGridData.push([P.call(this._xaxis,R[O][0]),S.call(this._yaxis,R[O][1])])}else{if(R[O]!=null&&R[O][0]==null){this._prevGridData.push([null,S.call(this._yaxis,R[O][1])])}else{if(R[O]!=null&&R[O][0]!=null&&R[O][1]==null){this._prevGridData.push([P.call(this._xaxis,R[O][0]),null])}}}}};w.jqplot.LineRenderer.prototype.makeGridData=function(R,T){var Q=this._xaxis.series_u2p;var S=this._yaxis.series_u2p;var P=[];var U=[];for(var O=0;O<R.length;O++){if(R[O][0]!=null&&R[O][1]!=null){P.push([Q.call(this._xaxis,R[O][0]),S.call(this._yaxis,R[O][1])])}else{if(R[O][0]==null){P.push([null,S.call(this._yaxis,R[O][1])])}else{if(R[O][1]==null){P.push([Q.call(this._xaxis,R[O][0]),null])}}}}return P};w.jqplot.LineRenderer.prototype.draw=function(ad,an,P){var ah;var X=(P!=l)?P:{};var R=(X.shadow!=l)?X.shadow:this.shadow;var ao=(X.showLine!=l)?X.showLine:this.showLine;var ag=(X.fill!=l)?X.fill:this.fill;var O=(X.fillAndStroke!=l)?X.fillAndStroke:this.fillAndStroke;var Y,ae,ab,aj;ad.save();if(an.length){if(ao){if(ag){if(this.fillToZero){var S=new w.jqplot.ColorGenerator(this.negativeSeriesColors);var ak=S.get(this.index);if(!this.useNegativeColors){ak=X.fillStyle}var V=false;var W=X.fillStyle;if(O){var am=an.slice(0)}if(this.index==0||!this._stack){var ac=[];this._areaPoints=[];var al=this._yaxis.series_u2p(this.fillToValue);var Q=this._xaxis.series_u2p(this.fillToValue);if(this.fillAxis=="y"){ac.push([an[0][0],al]);this._areaPoints.push([an[0][0],al]);for(var ah=0;ah<an.length-1;ah++){ac.push(an[ah]);this._areaPoints.push(an[ah]);if(this._plotData[ah][1]*this._plotData[ah+1][1]<0){if(this._plotData[ah][1]<0){V=true;X.fillStyle=ak}else{V=false;X.fillStyle=W}var U=an[ah][0]+(an[ah+1][0]-an[ah][0])*(al-an[ah][1])/(an[ah+1][1]-an[ah][1]);ac.push([U,al]);this._areaPoints.push([U,al]);if(R){this.renderer.shadowRenderer.draw(ad,ac,X)}this.renderer.shapeRenderer.draw(ad,ac,X);ac=[[U,al]]}}if(this._plotData[an.length-1][1]<0){V=true;X.fillStyle=ak}else{V=false;X.fillStyle=W}ac.push(an[an.length-1]);this._areaPoints.push(an[an.length-1]);ac.push([an[an.length-1][0],al]);this._areaPoints.push([an[an.length-1][0],al])}if(R){this.renderer.shadowRenderer.draw(ad,ac,X)}this.renderer.shapeRenderer.draw(ad,ac,X)}else{var aa=this._prevGridData;for(var ah=aa.length;ah>0;ah--){an.push(aa[ah-1])}if(R){this.renderer.shadowRenderer.draw(ad,an,X)}this._areaPoints=an;this.renderer.shapeRenderer.draw(ad,an,X)}}else{if(O){var am=an.slice(0)}if(this.index==0||!this._stack){var T=ad.canvas.height;an.unshift([an[0][0],T]);var ai=an.length;an.push([an[ai-1][0],T])}else{var aa=this._prevGridData;for(var ah=aa.length;ah>0;ah--){an.push(aa[ah-1])}}this._areaPoints=an;if(R){this.renderer.shadowRenderer.draw(ad,an,X)}this.renderer.shapeRenderer.draw(ad,an,X)}if(O){var af=w.extend(true,{},X,{fill:false,closePath:false});this.renderer.shapeRenderer.draw(ad,am,af);if(this.markerRenderer.show){for(ah=0;ah<am.length;ah++){this.markerRenderer.draw(am[ah][0],am[ah][1],ad,X.markerOptions)}}}}else{if(R){this.renderer.shadowRenderer.draw(ad,an,X)}this.renderer.shapeRenderer.draw(ad,an,X)}}var Y=ab=ae=aj=null;for(ah=0;ah<this._areaPoints.length;ah++){var Z=this._areaPoints[ah];if(Y>Z[0]||Y==null){Y=Z[0]}if(aj<Z[1]||aj==null){aj=Z[1]}if(ab<Z[0]||ab==null){ab=Z[0]}if(ae>Z[1]||ae==null){ae=Z[1]}}this._boundingBox=[[Y,aj],[ab,ae]];if(this.markerRenderer.show&&!ag){for(ah=0;ah<an.length;ah++){if(an[ah][0]!=null&&an[ah][1]!=null){this.markerRenderer.draw(an[ah][0],an[ah][1],ad,X.markerOptions)}}}}ad.restore()};w.jqplot.LineRenderer.prototype.drawShadow=function(O,Q,P){};function o(R,Q,O){for(var P=0;P<this.series.length;P++){if(this.series[P].renderer.constructor==w.jqplot.LineRenderer){if(this.series[P].highlightMouseOver){this.series[P].highlightMouseDown=false}}}this.target.bind("mouseout",{plot:this},function(S){I(S.data.plot)})}function M(){if(this.plugins.lineRenderer&&this.plugins.lineRenderer.highlightCanvas){this.plugins.lineRenderer.highlightCanvas.resetCanvas();this.plugins.lineRenderer.highlightCanvas=null}this.plugins.lineRenderer.highlightedSeriesIndex=null;this.plugins.lineRenderer.highlightCanvas=new w.jqplot.GenericCanvas();this.eventCanvas._elem.before(this.plugins.lineRenderer.highlightCanvas.createElement(this._gridPadding,"jqplot-lineRenderer-highlight-canvas",this._plotDimensions,this));this.plugins.lineRenderer.highlightCanvas.setContext()}function K(U,T,R,Q){var P=U.series[T];var O=U.plugins.lineRenderer.highlightCanvas;O._ctx.clearRect(0,0,O._ctx.canvas.width,O._ctx.canvas.height);P._highlightedPoint=R;U.plugins.lineRenderer.highlightedSeriesIndex=T;var S={fillStyle:P.highlightColor};P.renderer.shapeRenderer.draw(O._ctx,Q,S);O=null}function I(Q){var O=Q.plugins.lineRenderer.highlightCanvas;O._ctx.clearRect(0,0,O._ctx.canvas.width,O._ctx.canvas.height);for(var P=0;P<Q.series.length;P++){Q.series[P]._highlightedPoint=null}Q.plugins.lineRenderer.highlightedSeriesIndex=null;Q.target.trigger("jqplotDataUnhighlight");O=null}function d(S,R,V,U,T){if(U){var Q=[U.seriesIndex,U.pointIndex,U.data];var P=jQuery.Event("jqplotDataMouseOver");P.pageX=S.pageX;P.pageY=S.pageY;T.target.trigger(P,Q);if(T.series[Q[0]].highlightMouseOver&&!(Q[0]==T.plugins.lineRenderer.highlightedSeriesIndex)){var O=jQuery.Event("jqplotDataHighlight");O.pageX=S.pageX;O.pageY=S.pageY;T.target.trigger(O,Q);K(T,U.seriesIndex,U.pointIndex,U.points)}}else{if(U==null){I(T)}}}function a(R,Q,U,T,S){if(T){var P=[T.seriesIndex,T.pointIndex,T.data];if(S.series[P[0]].highlightMouseDown&&!(P[0]==S.plugins.lineRenderer.highlightedSeriesIndex)){var O=jQuery.Event("jqplotDataHighlight");O.pageX=R.pageX;O.pageY=R.pageY;S.target.trigger(O,P);K(S,T.seriesIndex,T.pointIndex,T.points)}}else{if(T==null){I(S)}}}function L(Q,P,T,S,R){var O=R.plugins.lineRenderer.highlightedSeriesIndex;if(O!=null&&R.series[O].highlightMouseDown){I(R)}}function c(R,Q,U,T,S){if(T){var P=[T.seriesIndex,T.pointIndex,T.data];var O=jQuery.Event("jqplotDataClick");O.pageX=R.pageX;O.pageY=R.pageY;S.target.trigger(O,P)}}function j(S,R,V,U,T){if(U){var Q=[U.seriesIndex,U.pointIndex,U.data];var O=T.plugins.lineRenderer.highlightedSeriesIndex;if(O!=null&&T.series[O].highlightMouseDown){I(T)}var P=jQuery.Event("jqplotDataRightClick");P.pageX=S.pageX;P.pageY=S.pageY;T.target.trigger(P,Q)}}w.jqplot.LinearAxisRenderer=function(){};w.jqplot.LinearAxisRenderer.prototype.init=function(O){this.breakPoints=null;this.breakTickLabel="&asymp;";this.forceTickAt0=false;this.forceTickAt100=false;this._autoFormatString="";this._overrideFormatString=false;w.extend(true,this,O);if(this.breakPoints){if(!w.isArray(this.breakPoints)){this.breakPoints=null}else{if(this.breakPoints.length<2||this.breakPoints[1]<=this.breakPoints[0]){this.breakPoints=null}}}this.resetDataBounds()};w.jqplot.LinearAxisRenderer.prototype.draw=function(O,V){if(this.show){this.renderer.createTicks.call(this);var U=0;var P;if(this._elem){this._elem.emptyForce();this._elem=null}this._elem=w(document.createElement("div"));this._elem.addClass("jqplot-axis jqplot-"+this.name);this._elem.css("posiiton","absolute");if(this.name=="xaxis"||this.name=="x2axis"){this._elem.width(this._plotDimensions.width)}else{this._elem.height(this._plotDimensions.height)}this.labelOptions.axis=this.name;this._label=new this.labelRenderer(this.labelOptions);if(this._label.show){var T=this._label.draw(O,V);T.appendTo(this._elem);T=null}var S=this._ticks;var R;for(var Q=0;Q<S.length;Q++){R=S[Q];if(R.show&&R.showLabel&&(!R.isMinorTick||this.showMinorTicks)){this._elem.append(R.draw(O,V))}}R=null;S=null}return this._elem};w.jqplot.LinearAxisRenderer.prototype.reset=function(){this.min=this._min;this.max=this._max;this.tickInterval=this._tickInterval;this.numberTicks=this._numberTicks;this._autoFormatString="";if(this._overrideFormatString&&this.tickOptions&&this.tickOptions.formatString){this.tickOptions.formatString=""}};w.jqplot.LinearAxisRenderer.prototype.set=function(){var V=0;var Q;var P=0;var U=0;var O=(this._label==null)?false:this._label.show;if(this.show){var T=this._ticks;var S;for(var R=0;R<T.length;R++){S=T[R];if(!S._breakTick&&S.show&&S.showLabel&&(!S.isMinorTick||this.showMinorTicks)){if(this.name=="xaxis"||this.name=="x2axis"){Q=S._elem.outerHeight(true)}else{Q=S._elem.outerWidth(true)}if(Q>V){V=Q}}}S=null;T=null;if(O){P=this._label._elem.outerWidth(true);U=this._label._elem.outerHeight(true)}if(this.name=="xaxis"){V=V+U;this._elem.css({height:V+"px",left:"0px",bottom:"0px"})}else{if(this.name=="x2axis"){V=V+U;this._elem.css({height:V+"px",left:"0px",top:"0px"})}else{if(this.name=="yaxis"){V=V+P;this._elem.css({width:V+"px",left:"0px",top:"0px"});if(O&&this._label.constructor==w.jqplot.AxisLabelRenderer){this._label._elem.css("width",P+"px")}}else{V=V+P;this._elem.css({width:V+"px",right:"0px",top:"0px"});if(O&&this._label.constructor==w.jqplot.AxisLabelRenderer){this._label._elem.css("width",P+"px")}}}}}};w.jqplot.LinearAxisRenderer.prototype.createTicks=function(){var ax=this._ticks;var an=this.ticks;var ae=this.name;var ag=this._dataBounds;var O,T;var aJ,al;var V,U;var aH,aE;var ak=this.min;var aI=this.max;var aA=this.numberTicks;var aM=this.tickInterval;if(an.length){for(aE=0;aE<an.length;aE++){var aq=an[aE];var ay=new this.tickRenderer(this.tickOptions);if(aq.constructor==Array){ay.value=aq[0];if(this.breakPoints){if(aq[0]==this.breakPoints[0]){ay.label=this.breakTickLabel;ay._breakTick=true;ay.showGridline=false;ay.showMark=false}else{if(aq[0]>this.breakPoints[0]&&aq[0]<=this.breakPoints[1]){ay.show=false;ay.showGridline=false;ay.label=aq[1]}else{ay.label=aq[1]}}}else{ay.label=aq[1]}ay.setTick(aq[0],this.name);this._ticks.push(ay)}else{ay.value=aq;if(this.breakPoints){if(aq==this.breakPoints[0]){ay.label=this.breakTickLabel;ay._breakTick=true;ay.showGridline=false;ay.showMark=false}else{if(aq>this.breakPoints[0]&&aq<=this.breakPoints[1]){ay.show=false;ay.showGridline=false}}}ay.setTick(aq,this.name);this._ticks.push(ay)}}this.numberTicks=an.length;this.min=this._ticks[0].value;this.max=this._ticks[this.numberTicks-1].value;this.tickInterval=(this.max-this.min)/(this.numberTicks-1)}else{if(ae=="xaxis"||ae=="x2axis"){O=this._plotDimensions.width}else{O=this._plotDimensions.height}aJ=((this.min!=null)?this.min:ag.min);al=((this.max!=null)?this.max:ag.max);var aa=al-aJ;var aw,ad;var Y;if(this.min==null&&this.max==null&&this.numberTicks==null&&this.tickInterval==null&&!this.autoscale){if(this.tickOptions==null||!this.tickOptions.formatString){this._overrideFormatString=true}if(this.forceTickAt0){if(aJ>0){aJ=0}if(al<0){al=0}}if(this.forceTickAt100){if(aJ>100){aJ=100}if(al<100){al=100}}var S=30;var at=Math.max(O,S+1);var ab=(at-S)/300;var ar=w.jqplot.LinearTickGenerator(aJ,al,ab);var ac=aJ+aa*(this.padMin-1);var au=al-aa*(this.padMax-1);if(aJ<=ac||al>=au){ac=aJ-aa*(this.padMin-1);au=al+aa*(this.padMax-1);ar=w.jqplot.LinearTickGenerator(ac,au,ab)}this.min=ar[0];this.max=ar[1];this.numberTicks=ar[2];this._autoFormatString=ar[3];this.tickInterval=ar[4]}else{if(aJ==al){var P=0.05;if(aJ>0){P=Math.max(Math.log(aJ)/Math.LN10,0.05)}aJ-=P;al+=P}if(this.autoscale&&this.min==null&&this.max==null){var Q,R,X;var ah=false;var ap=false;var af={min:null,max:null,average:null,stddev:null};for(var aE=0;aE<this._series.length;aE++){var az=this._series[aE];var ai=(az.fillAxis=="x")?az._xaxis.name:az._yaxis.name;if(this.name==ai){var av=az._plotValues[az.fillAxis];var aj=av[0];var aF=av[0];for(var aD=1;aD<av.length;aD++){if(av[aD]<aj){aj=av[aD]}else{if(av[aD]>aF){aF=av[aD]}}}var Z=(aF-aj)/aF;if(az.renderer.constructor==w.jqplot.BarRenderer){if(aj>=0&&(az.fillToZero||Z>0.1)){ah=true}else{ah=false;if(az.fill&&az.fillToZero&&aj<0&&aF>0){ap=true}else{ap=false}}}else{if(az.fill){if(aj>=0&&(az.fillToZero||Z>0.1)){ah=true}else{if(aj<0&&aF>0&&az.fillToZero){ah=false;ap=true}else{ah=false;ap=false}}}else{if(aj<0){ah=false}}}}}if(ah){this.numberTicks=2+Math.ceil((O-(this.tickSpacing-1))/this.tickSpacing);this.min=0;ak=0;R=al/(this.numberTicks-1);Y=Math.pow(10,Math.abs(Math.floor(Math.log(R)/Math.LN10)));if(R/Y==parseInt(R/Y,10)){R+=Y}this.tickInterval=Math.ceil(R/Y)*Y;this.max=this.tickInterval*(this.numberTicks-1)}else{if(ap){this.numberTicks=2+Math.ceil((O-(this.tickSpacing-1))/this.tickSpacing);var am=Math.ceil(Math.abs(aJ)/aa*(this.numberTicks-1));var aL=this.numberTicks-1-am;R=Math.max(Math.abs(aJ/am),Math.abs(al/aL));Y=Math.pow(10,Math.abs(Math.floor(Math.log(R)/Math.LN10)));this.tickInterval=Math.ceil(R/Y)*Y;this.max=this.tickInterval*aL;this.min=-this.tickInterval*am}else{if(this.numberTicks==null){if(this.tickInterval){this.numberTicks=3+Math.ceil(aa/this.tickInterval)}else{this.numberTicks=2+Math.ceil((O-(this.tickSpacing-1))/this.tickSpacing)}}if(this.tickInterval==null){R=aa/(this.numberTicks-1);if(R<1){Y=Math.pow(10,Math.abs(Math.floor(Math.log(R)/Math.LN10)))}else{Y=1}this.tickInterval=Math.ceil(R*Y*this.pad)/Y}else{Y=1/this.tickInterval}Q=this.tickInterval*(this.numberTicks-1);X=(Q-aa)/2;if(this.min==null){this.min=Math.floor(Y*(aJ-X))/Y}if(this.max==null){this.max=this.min+Q}}}}else{aw=(this.min!=null)?this.min:aJ-aa*(this.padMin-1);ad=(this.max!=null)?this.max:al+aa*(this.padMax-1);this.min=aw;this.max=ad;aa=this.max-this.min;if(this.numberTicks==null){if(this.tickInterval!=null){this.numberTicks=Math.ceil((this.max-this.min)/this.tickInterval)+1;this.max=this.min+this.tickInterval*(this.numberTicks-1)}else{if(O>100){this.numberTicks=parseInt(3+(O-100)/75,10)}else{this.numberTicks=2}}}if(this.tickInterval==null){this.tickInterval=aa/(this.numberTicks-1)}}if(this.renderer.constructor==w.jqplot.LinearAxisRenderer&&this._autoFormatString==""){aa=this.max-this.min;var aK=new this.tickRenderer(this.tickOptions);var ao=aK.formatString||w.jqplot.config.defaultTickFormatString;var ao=ao.match(w.jqplot.sprintf.regex)[0];var aG=0;if(ao){if(ao.search(/[fFeEgGpP]/)>-1){var aC=ao.match(/\%\.(\d{0,})?[eEfFgGpP]/);if(aC){aG=parseInt(aC[1],10)}else{aG=6}}else{if(ao.search(/[di]/)>-1){aG=0}}var W=Math.pow(10,-aG);if(this.tickInterval<W){if(aA==null&&aM==null){this.tickInterval=W;if(aI==null&&ak==null){this.min=Math.floor(this._dataBounds.min/W)*W;if(this.min==this._dataBounds.min){this.min=this._dataBounds.min-this.tickInterval}this.max=Math.ceil(this._dataBounds.max/W)*W;if(this.max==this._dataBounds.max){this.max=this._dataBounds.max+this.tickInterval}var aB=(this.max-this.min)/this.tickInterval;aB=aB.toFixed(11);aB=Math.ceil(aB);this.numberTicks=aB+1}else{if(aI==null){var aB=(this._dataBounds.max-this.min)/this.tickInterval;aB=aB.toFixed(11);this.numberTicks=Math.ceil(aB)+2;this.max=this.min+this.tickInterval*(this.numberTicks-1)}else{if(ak==null){var aB=(this.max-this._dataBounds.min)/this.tickInterval;aB=aB.toFixed(11);this.numberTicks=Math.ceil(aB)+2;this.min=this.max-this.tickInterval*(this.numberTicks-1)}else{this.numberTicks=Math.ceil((aI-ak)/this.tickInterval)+1;this.min=Math.floor(ak*Math.pow(10,aG))/Math.pow(10,aG);this.max=Math.ceil(aI*Math.pow(10,aG))/Math.pow(10,aG);this.numberTicks=Math.ceil((this.max-this.min)/this.tickInterval)+1}}}}}}}}if(this._overrideFormatString&&this._autoFormatString!=""){this.tickOptions=this.tickOptions||{};this.tickOptions.formatString=this._autoFormatString}for(var aE=0;aE<this.numberTicks;aE++){aH=this.min+aE*this.tickInterval;var ay=new this.tickRenderer(this.tickOptions);ay.setTick(aH,this.name);this._ticks.push(ay);ay=null}}ax=null};w.jqplot.LinearAxisRenderer.prototype.resetTickValues=function(Q){if(w.isArray(Q)&&Q.length==this._ticks.length){var P;for(var O=0;O<Q.length;O++){P=this._ticks[O];P.value=Q[O];P.label=P.formatter(P.formatString,Q[O]);P.label=P.prefix+P.label;P._elem.html(P.label)}P=null;this.min=w.jqplot.arrayMin(Q);this.max=w.jqplot.arrayMax(Q);this.pack()}};w.jqplot.LinearAxisRenderer.prototype.pack=function(Q,P){Q=Q||{};P=P||this._offsets;var ae=this._ticks;var aa=this.max;var Z=this.min;var V=P.max;var T=P.min;var X=(this._label==null)?false:this._label.show;for(var Y in Q){this._elem.css(Y,Q[Y])}this._offsets=P;var R=V-T;var S=aa-Z;if(this.breakPoints){S=S-this.breakPoints[1]+this.breakPoints[0];this.p2u=function(ag){return(ag-T)*S/R+Z};this.u2p=function(ag){if(ag>this.breakPoints[0]&&ag<this.breakPoints[1]){ag=this.breakPoints[0]}if(ag<=this.breakPoints[0]){return(ag-Z)*R/S+T}else{return(ag-this.breakPoints[1]+this.breakPoints[0]-Z)*R/S+T}};if(this.name.charAt(0)=="x"){this.series_u2p=function(ag){if(ag>this.breakPoints[0]&&ag<this.breakPoints[1]){ag=this.breakPoints[0]}if(ag<=this.breakPoints[0]){return(ag-Z)*R/S}else{return(ag-this.breakPoints[1]+this.breakPoints[0]-Z)*R/S}};this.series_p2u=function(ag){return ag*S/R+Z}}else{this.series_u2p=function(ag){if(ag>this.breakPoints[0]&&ag<this.breakPoints[1]){ag=this.breakPoints[0]}if(ag>=this.breakPoints[1]){return(ag-aa)*R/S}else{return(ag+this.breakPoints[1]-this.breakPoints[0]-aa)*R/S}};this.series_p2u=function(ag){return ag*S/R+aa}}}else{this.p2u=function(ag){return(ag-T)*S/R+Z};this.u2p=function(ag){return(ag-Z)*R/S+T};if(this.name=="xaxis"||this.name=="x2axis"){this.series_u2p=function(ag){return(ag-Z)*R/S};this.series_p2u=function(ag){return ag*S/R+Z}}else{this.series_u2p=function(ag){return(ag-aa)*R/S};this.series_p2u=function(ag){return ag*S/R+aa}}}if(this.show){if(this.name=="xaxis"||this.name=="x2axis"){for(var ab=0;ab<ae.length;ab++){var W=ae[ab];if(W.show&&W.showLabel){var O;if(W.constructor==w.jqplot.CanvasAxisTickRenderer&&W.angle){var ad=(this.name=="xaxis")?1:-1;switch(W.labelPosition){case"auto":if(ad*W.angle<0){O=-W.getWidth()+W._textRenderer.height*Math.sin(-W._textRenderer.angle)/2}else{O=-W._textRenderer.height*Math.sin(W._textRenderer.angle)/2}break;case"end":O=-W.getWidth()+W._textRenderer.height*Math.sin(-W._textRenderer.angle)/2;break;case"start":O=-W._textRenderer.height*Math.sin(W._textRenderer.angle)/2;break;case"middle":O=-W.getWidth()/2+W._textRenderer.height*Math.sin(-W._textRenderer.angle)/2;break;default:O=-W.getWidth()/2+W._textRenderer.height*Math.sin(-W._textRenderer.angle)/2;break}}else{O=-W.getWidth()/2}var af=this.u2p(W.value)+O+"px";W._elem.css("left",af);W.pack()}}if(X){var U=this._label._elem.outerWidth(true);this._label._elem.css("left",T+R/2-U/2+"px");if(this.name=="xaxis"){this._label._elem.css("bottom","0px")}else{this._label._elem.css("top","0px")}this._label.pack()}}else{for(var ab=0;ab<ae.length;ab++){var W=ae[ab];if(W.show&&W.showLabel){var O;if(W.constructor==w.jqplot.CanvasAxisTickRenderer&&W.angle){var ad=(this.name=="yaxis")?1:-1;switch(W.labelPosition){case"auto":case"end":if(ad*W.angle<0){O=-W._textRenderer.height*Math.cos(-W._textRenderer.angle)/2}else{O=-W.getHeight()+W._textRenderer.height*Math.cos(W._textRenderer.angle)/2}break;case"start":if(W.angle>0){O=-W._textRenderer.height*Math.cos(-W._textRenderer.angle)/2}else{O=-W.getHeight()+W._textRenderer.height*Math.cos(W._textRenderer.angle)/2}break;case"middle":O=-W.getHeight()/2;break;default:O=-W.getHeight()/2;break}}else{O=-W.getHeight()/2}var af=this.u2p(W.value)+O+"px";W._elem.css("top",af);W.pack()}}if(X){var ac=this._label._elem.outerHeight(true);this._label._elem.css("top",V-R/2-ac/2+"px");if(this.name=="yaxis"){this._label._elem.css("left","0px")}else{this._label._elem.css("right","0px")}this._label.pack()}}}ae=null};function e(O){O=Math.abs(O);if(O>1){return"%d"}var P=-Math.floor(Math.log(O)/Math.LN10);return"%."+P+"f"}function B(P,O){var Q=Math.floor(Math.log(P)/Math.LN10);var S=Math.pow(10,Q);var R=P/S;R=R/O;if(R<=0.38){return 0.1*S}if(R<=1.6){return 0.2*S}if(R<=4){return 0.5*S}if(R<=8){return S}if(R<=16){return 2*S}return 5*S}w.jqplot.LinearTickGenerator=function(Q,T,P){if(Q==T){T=(T)?0:1}P=P||1;if(T<Q){var O=T;T=Q;Q=O}var R=B(T-Q,P);var S=[];S[0]=Math.floor(Q/R)*R;S[1]=Math.ceil(T/R)*R;S[2]=Math.round((S[1]-S[0])/R+1);S[3]=e(R);S[4]=R;return S};w.jqplot.MarkerRenderer=function(O){this.show=true;this.style="filledCircle";this.lineWidth=2;this.size=9;this.color="#666666";this.shadow=true;this.shadowAngle=45;this.shadowOffset=1;this.shadowDepth=3;this.shadowAlpha="0.07";this.shadowRenderer=new w.jqplot.ShadowRenderer();this.shapeRenderer=new w.jqplot.ShapeRenderer();w.extend(true,this,O)};w.jqplot.MarkerRenderer.prototype.init=function(O){w.extend(true,this,O);var Q={angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,lineWidth:this.lineWidth,depth:this.shadowDepth,closePath:true};if(this.style.indexOf("filled")!=-1){Q.fill=true}if(this.style.indexOf("ircle")!=-1){Q.isarc=true;Q.closePath=false}this.shadowRenderer.init(Q);var P={fill:false,isarc:false,strokeStyle:this.color,fillStyle:this.color,lineWidth:this.lineWidth,closePath:true};if(this.style.indexOf("filled")!=-1){P.fill=true}if(this.style.indexOf("ircle")!=-1){P.isarc=true;P.closePath=false}this.shapeRenderer.init(P)};w.jqplot.MarkerRenderer.prototype.drawDiamond=function(Q,P,T,S,V){var O=1.2;var W=this.size/2/O;var U=this.size/2*O;var R=[[Q-W,P],[Q,P+U],[Q+W,P],[Q,P-U]];if(this.shadow){this.shadowRenderer.draw(T,R)}this.shapeRenderer.draw(T,R,V)};w.jqplot.MarkerRenderer.prototype.drawPlus=function(R,Q,U,T,X){var P=1;var Y=this.size/2*P;var V=this.size/2*P;var W=[[R,Q-V],[R,Q+V]];var S=[[R+Y,Q],[R-Y,Q]];var O=w.extend(true,{},this.options,{closePath:false});if(this.shadow){this.shadowRenderer.draw(U,W,{closePath:false});this.shadowRenderer.draw(U,S,{closePath:false})}this.shapeRenderer.draw(U,W,O);this.shapeRenderer.draw(U,S,O)};w.jqplot.MarkerRenderer.prototype.drawX=function(R,Q,U,T,X){var P=1;var Y=this.size/2*P;var V=this.size/2*P;var O=w.extend(true,{},this.options,{closePath:false});var W=[[R-Y,Q-V],[R+Y,Q+V]];var S=[[R-Y,Q+V],[R+Y,Q-V]];if(this.shadow){this.shadowRenderer.draw(U,W,{closePath:false});this.shadowRenderer.draw(U,S,{closePath:false})}this.shapeRenderer.draw(U,W,O);this.shapeRenderer.draw(U,S,O)};w.jqplot.MarkerRenderer.prototype.drawDash=function(Q,P,T,S,V){var O=1;var W=this.size/2*O;var U=this.size/2*O;var R=[[Q-W,P],[Q+W,P]];if(this.shadow){this.shadowRenderer.draw(T,R)}this.shapeRenderer.draw(T,R,V)};w.jqplot.MarkerRenderer.prototype.drawLine=function(T,S,O,R,P){var Q=[T,S];if(this.shadow){this.shadowRenderer.draw(O,Q)}this.shapeRenderer.draw(O,Q,P)};w.jqplot.MarkerRenderer.prototype.drawSquare=function(Q,P,T,S,V){var O=1;var W=this.size/2/O;var U=this.size/2*O;var R=[[Q-W,P-U],[Q-W,P+U],[Q+W,P+U],[Q+W,P-U]];if(this.shadow){this.shadowRenderer.draw(T,R)}this.shapeRenderer.draw(T,R,V)};w.jqplot.MarkerRenderer.prototype.drawCircle=function(P,V,R,U,S){var O=this.size/2;var Q=2*Math.PI;var T=[P,V,O,0,Q,true];if(this.shadow){this.shadowRenderer.draw(R,T)}this.shapeRenderer.draw(R,T,S)};w.jqplot.MarkerRenderer.prototype.draw=function(O,R,P,Q){Q=Q||{};if(Q.show==null||Q.show!=false){if(Q.color&&!Q.fillStyle){Q.fillStyle=Q.color}if(Q.color&&!Q.strokeStyle){Q.strokeStyle=Q.color}switch(this.style){case"diamond":this.drawDiamond(O,R,P,false,Q);break;case"filledDiamond":this.drawDiamond(O,R,P,true,Q);break;case"circle":this.drawCircle(O,R,P,false,Q);break;case"filledCircle":this.drawCircle(O,R,P,true,Q);break;case"square":this.drawSquare(O,R,P,false,Q);break;case"filledSquare":this.drawSquare(O,R,P,true,Q);break;case"x":this.drawX(O,R,P,true,Q);break;case"plus":this.drawPlus(O,R,P,true,Q);break;case"dash":this.drawDash(O,R,P,true,Q);break;case"line":this.drawLine(O,R,P,false,Q);break;default:this.drawDiamond(O,R,P,false,Q);break}}};w.jqplot.ShadowRenderer=function(O){this.angle=45;this.offset=1;this.alpha=0.07;this.lineWidth=1.5;this.lineJoin="miter";this.lineCap="round";this.closePath=false;this.fill=false;this.depth=3;this.strokeStyle="rgba(0,0,0,0.1)";this.isarc=false;w.extend(true,this,O)};w.jqplot.ShadowRenderer.prototype.init=function(O){w.extend(true,this,O)};w.jqplot.ShadowRenderer.prototype.draw=function(Y,W,aa){Y.save();var O=(aa!=null)?aa:{};var X=(O.fill!=null)?O.fill:this.fill;var V=(O.closePath!=null)?O.closePath:this.closePath;var S=(O.offset!=null)?O.offset:this.offset;var Q=(O.alpha!=null)?O.alpha:this.alpha;var U=(O.depth!=null)?O.depth:this.depth;var Z=(O.isarc!=null)?O.isarc:this.isarc;Y.lineWidth=(O.lineWidth!=null)?O.lineWidth:this.lineWidth;Y.lineJoin=(O.lineJoin!=null)?O.lineJoin:this.lineJoin;Y.lineCap=(O.lineCap!=null)?O.lineCap:this.lineCap;Y.strokeStyle=O.strokeStyle||this.strokeStyle||"rgba(0,0,0,"+Q+")";Y.fillStyle=O.fillStyle||this.fillStyle||"rgba(0,0,0,"+Q+")";for(var R=0;R<U;R++){Y.translate(Math.cos(this.angle*Math.PI/180)*S,Math.sin(this.angle*Math.PI/180)*S);Y.beginPath();if(Z){Y.arc(W[0],W[1],W[2],W[3],W[4],true)}else{if(W&&W.length){var P=true;for(var T=0;T<W.length;T++){if(W[T][0]!=null&&W[T][1]!=null){if(P){Y.moveTo(W[T][0],W[T][1]);P=false}else{Y.lineTo(W[T][0],W[T][1])}}else{P=true}}}}if(V){Y.closePath()}if(X){Y.fill()}else{Y.stroke()}}Y.restore()};w.jqplot.ShapeRenderer=function(O){this.lineWidth=1.5;this.lineJoin="miter";this.lineCap="round";this.closePath=false;this.fill=false;this.isarc=false;this.fillRect=false;this.strokeRect=false;this.clearRect=false;this.strokeStyle="#999999";this.fillStyle="#999999";w.extend(true,this,O)};w.jqplot.ShapeRenderer.prototype.init=function(O){w.extend(true,this,O)};w.jqplot.ShapeRenderer.prototype.draw=function(X,V,Z){X.save();var O=(Z!=null)?Z:{};var W=(O.fill!=null)?O.fill:this.fill;var T=(O.closePath!=null)?O.closePath:this.closePath;var U=(O.fillRect!=null)?O.fillRect:this.fillRect;var R=(O.strokeRect!=null)?O.strokeRect:this.strokeRect;var P=(O.clearRect!=null)?O.clearRect:this.clearRect;var Y=(O.isarc!=null)?O.isarc:this.isarc;X.lineWidth=O.lineWidth||this.lineWidth;X.lineJoin=O.lineJoin||this.lineJoin;X.lineCap=O.lineCap||this.lineCap;X.strokeStyle=(O.strokeStyle||O.color)||this.strokeStyle;X.fillStyle=O.fillStyle||this.fillStyle;X.beginPath();if(Y){X.arc(V[0],V[1],V[2],V[3],V[4],true);if(T){X.closePath()}if(W){X.fill()}else{X.stroke()}X.restore();return}else{if(P){X.clearRect(V[0],V[1],V[2],V[3]);X.restore();return}else{if(U||R){if(U){X.fillRect(V[0],V[1],V[2],V[3])}if(R){X.strokeRect(V[0],V[1],V[2],V[3]);X.restore();return}}else{if(V&&V.length){var Q=true;for(var S=0;S<V.length;S++){if(V[S][0]!=null&&V[S][1]!=null){if(Q){X.moveTo(V[S][0],V[S][1]);Q=false}else{X.lineTo(V[S][0],V[S][1])}}else{Q=true}}if(T){X.closePath()}if(W){X.fill()}else{X.stroke()}}}}}X.restore()};w.jqplot.TableLegendRenderer=function(){};w.jqplot.TableLegendRenderer.prototype.init=function(O){w.extend(true,this,O)};w.jqplot.TableLegendRenderer.prototype.addrow=function(X,R,O,V){var S=(O)?this.rowSpacing+"px":"0px";var W;var Q;var P;var U;var T;P=document.createElement("tr");W=w(P);W.addClass("jqplot-table-legend");P=null;if(V){W.prependTo(this._elem)}else{W.appendTo(this._elem)}if(this.showSwatches){Q=w(document.createElement("td"));Q.addClass("jqplot-table-legend");Q.css({textAlign:"center",paddingTop:S});U=w(document.createElement("div"));T=w(document.createElement("div"));T.addClass("jqplot-table-legend-swatch");T.css({backgroundColor:R,borderColor:R});W.append(Q.append(U.append(T)))}if(this.showLabels){Q=w(document.createElement("td"));Q.addClass("jqplot-table-legend");Q.css("paddingTop",S);W.append(Q);if(this.escapeHtml){Q.text(X)}else{Q.html(X)}}Q=null;U=null;T=null;W=null;P=null};w.jqplot.TableLegendRenderer.prototype.draw=function(){if(this._elem){this._elem.emptyForce();this._elem=null}if(this.show){var T=this._series;var P=document.createElement("table");this._elem=w(P);this._elem.addClass("jqplot-table-legend");var Y={position:"absolute"};if(this.background){Y.background=this.background}if(this.border){Y.border=this.border}if(this.fontSize){Y.fontSize=this.fontSize}if(this.fontFamily){Y.fontFamily=this.fontFamily}if(this.textColor){Y.textColor=this.textColor}if(this.marginTop!=null){Y.marginTop=this.marginTop}if(this.marginBottom!=null){Y.marginBottom=this.marginBottom}if(this.marginLeft!=null){Y.marginLeft=this.marginLeft}if(this.marginRight!=null){Y.marginRight=this.marginRight}var O=false,V=false,X;for(var U=0;U<T.length;U++){X=T[U];if(X._stack||X.renderer.constructor==w.jqplot.BezierCurveRenderer){V=true}if(X.show&&X.showLabel){var S=this.labels[U]||X.label.toString();if(S){var Q=X.color;if(V&&U<T.length-1){O=true}else{if(V&&U==T.length-1){O=false}}this.renderer.addrow.call(this,S,Q,O,V);O=true}for(var R=0;R<w.jqplot.addLegendRowHooks.length;R++){var W=w.jqplot.addLegendRowHooks[R].call(this,X);if(W){this.renderer.addrow.call(this,W.label,W.color,O);O=true}}S=null}}}return this._elem};w.jqplot.TableLegendRenderer.prototype.pack=function(Q){if(this.show){if(this.placement=="insideGrid"){switch(this.location){case"nw":var P=Q.left;var O=Q.top;this._elem.css("left",P);this._elem.css("top",O);break;case"n":var P=(Q.left+(this._plotDimensions.width-Q.right))/2-this.getWidth()/2;var O=Q.top;this._elem.css("left",P);this._elem.css("top",O);break;case"ne":var P=Q.right;var O=Q.top;this._elem.css({right:P,top:O});break;case"e":var P=Q.right;var O=(Q.top+(this._plotDimensions.height-Q.bottom))/2-this.getHeight()/2;this._elem.css({right:P,top:O});break;case"se":var P=Q.right;var O=Q.bottom;this._elem.css({right:P,bottom:O});break;case"s":var P=(Q.left+(this._plotDimensions.width-Q.right))/2-this.getWidth()/2;var O=Q.bottom;this._elem.css({left:P,bottom:O});break;case"sw":var P=Q.left;var O=Q.bottom;this._elem.css({left:P,bottom:O});break;case"w":var P=Q.left;var O=(Q.top+(this._plotDimensions.height-Q.bottom))/2-this.getHeight()/2;this._elem.css({left:P,top:O});break;default:var P=Q.right;var O=Q.bottom;this._elem.css({right:P,bottom:O});break}}else{if(this.placement=="outside"){switch(this.location){case"nw":var P=this._plotDimensions.width-Q.left;var O=Q.top;this._elem.css("right",P);this._elem.css("top",O);break;case"n":var P=(Q.left+(this._plotDimensions.width-Q.right))/2-this.getWidth()/2;var O=this._plotDimensions.height-Q.top;this._elem.css("left",P);this._elem.css("bottom",O);break;case"ne":var P=this._plotDimensions.width-Q.right;var O=Q.top;this._elem.css({left:P,top:O});break;case"e":var P=this._plotDimensions.width-Q.right;var O=(Q.top+(this._plotDimensions.height-Q.bottom))/2-this.getHeight()/2;this._elem.css({left:P,top:O});break;case"se":var P=this._plotDimensions.width-Q.right;var O=Q.bottom;this._elem.css({left:P,bottom:O});break;case"s":var P=(Q.left+(this._plotDimensions.width-Q.right))/2-this.getWidth()/2;var O=this._plotDimensions.height-Q.bottom;this._elem.css({left:P,top:O});break;case"sw":var P=this._plotDimensions.width-Q.left;var O=Q.bottom;this._elem.css({right:P,bottom:O});break;case"w":var P=this._plotDimensions.width-Q.left;var O=(Q.top+(this._plotDimensions.height-Q.bottom))/2-this.getHeight()/2;this._elem.css({right:P,top:O});break;default:var P=Q.right;var O=Q.bottom;this._elem.css({right:P,bottom:O});break}}else{switch(this.location){case"nw":this._elem.css({left:0,top:Q.top});break;case"n":var P=(Q.left+(this._plotDimensions.width-Q.right))/2-this.getWidth()/2;this._elem.css({left:P,top:Q.top});break;case"ne":this._elem.css({right:0,top:Q.top});break;case"e":var O=(Q.top+(this._plotDimensions.height-Q.bottom))/2-this.getHeight()/2;this._elem.css({right:Q.right,top:O});break;case"se":this._elem.css({right:Q.right,bottom:Q.bottom});break;case"s":var P=(Q.left+(this._plotDimensions.width-Q.right))/2-this.getWidth()/2;this._elem.css({left:P,bottom:Q.bottom});break;case"sw":this._elem.css({left:Q.left,bottom:Q.bottom});break;case"w":var O=(Q.top+(this._plotDimensions.height-Q.bottom))/2-this.getHeight()/2;this._elem.css({left:Q.left,top:O});break;default:this._elem.css({right:Q.right,bottom:Q.bottom});break}}}}};w.jqplot.ThemeEngine=function(){this.themes={};this.activeTheme=null};w.jqplot.ThemeEngine.prototype.init=function(){var R=new w.jqplot.Theme({_name:"Default"});var U,P,T;for(U in R.target){if(U=="textColor"){R.target[U]=this.target.css("color")}else{R.target[U]=this.target.css(U)}}if(this.title.show&&this.title._elem){for(U in R.title){if(U=="textColor"){R.title[U]=this.title._elem.css("color")}else{R.title[U]=this.title._elem.css(U)}}}for(U in R.grid){R.grid[U]=this.grid[U]}if(R.grid.backgroundColor==null&&this.grid.background!=null){R.grid.backgroundColor=this.grid.background}if(this.legend.show&&this.legend._elem){for(U in R.legend){if(U=="textColor"){R.legend[U]=this.legend._elem.css("color")}else{R.legend[U]=this.legend._elem.css(U)}}}var Q;for(P=0;P<this.series.length;P++){Q=this.series[P];if(Q.renderer.constructor==w.jqplot.LineRenderer){R.series.push(new i())}else{if(Q.renderer.constructor==w.jqplot.BarRenderer){R.series.push(new E())}else{if(Q.renderer.constructor==w.jqplot.PieRenderer){R.series.push(new b())}else{if(Q.renderer.constructor==w.jqplot.DonutRenderer){R.series.push(new t())}else{if(Q.renderer.constructor==w.jqplot.FunnelRenderer){R.series.push(new H())}else{if(Q.renderer.constructor==w.jqplot.MeterGaugeRenderer){R.series.push(new r())}else{R.series.push({})}}}}}}for(U in R.series[P]){R.series[P][U]=Q[U]}}var O,S;for(U in this.axes){S=this.axes[U];O=R.axes[U]=new A();O.borderColor=S.borderColor;O.borderWidth=S.borderWidth;if(S._ticks&&S._ticks[0]){for(T in O.ticks){if(S._ticks[0].hasOwnProperty(T)){O.ticks[T]=S._ticks[0][T]}else{if(S._ticks[0]._elem){O.ticks[T]=S._ticks[0]._elem.css(T)}}}}if(S._label&&S._label.show){for(T in O.label){if(S._label[T]){O.label[T]=S._label[T]}else{if(S._label._elem){if(T=="textColor"){O.label[T]=S._label._elem.css("color")}else{O.label[T]=S._label._elem.css(T)}}}}}}this.themeEngine._add(R);this.themeEngine.activeTheme=this.themeEngine.themes[R._name]};w.jqplot.ThemeEngine.prototype.get=function(O){if(!O){return this.activeTheme}else{return this.themes[O]}};function z(P,O){return P-O}w.jqplot.ThemeEngine.prototype.getThemeNames=function(){var O=[];for(var P in this.themes){O.push(P)}return O.sort(z)};w.jqplot.ThemeEngine.prototype.getThemes=function(){var P=[];var O=[];for(var R in this.themes){P.push(R)}P.sort(z);for(var Q=0;Q<P.length;Q++){O.push(this.themes[P[Q]])}return O};w.jqplot.ThemeEngine.prototype.activate=function(ab,ag){var O=false;if(!ag&&this.activeTheme&&this.activeTheme._name){ag=this.activeTheme._name}if(!this.themes.hasOwnProperty(ag)){throw new Error("No theme of that name")}else{var T=this.themes[ag];this.activeTheme=T;var af,Z=false,Y=false;var P=["xaxis","x2axis","yaxis","y2axis"];for(ac=0;ac<P.length;ac++){var U=P[ac];if(T.axesStyles.borderColor!=null){ab.axes[U].borderColor=T.axesStyles.borderColor}if(T.axesStyles.borderWidth!=null){ab.axes[U].borderWidth=T.axesStyles.borderWidth}}for(var ae in ab.axes){var R=ab.axes[ae];if(R.show){var X=T.axes[ae]||{};var V=T.axesStyles;var S=w.jqplot.extend(true,{},X,V);af=(T.axesStyles.borderColor!=null)?T.axesStyles.borderColor:S.borderColor;if(S.borderColor!=null){R.borderColor=S.borderColor;O=true}af=(T.axesStyles.borderWidth!=null)?T.axesStyles.borderWidth:S.borderWidth;if(S.borderWidth!=null){R.borderWidth=S.borderWidth;O=true}if(R._ticks&&R._ticks[0]){for(var Q in S.ticks){af=S.ticks[Q];if(af!=null){R.tickOptions[Q]=af;R._ticks=[];O=true}}}if(R._label&&R._label.show){for(var Q in S.label){af=S.label[Q];if(af!=null){R.labelOptions[Q]=af;O=true}}}}}for(var aa in T.grid){if(T.grid[aa]!=null){ab.grid[aa]=T.grid[aa]}}if(!O){ab.grid.draw()}if(ab.legend.show){for(aa in T.legend){if(T.legend[aa]!=null){ab.legend[aa]=T.legend[aa]}}}if(ab.title.show){for(aa in T.title){if(T.title[aa]!=null){ab.title[aa]=T.title[aa]}}}var ac;for(ac=0;ac<T.series.length;ac++){var W={};var ad=false;for(aa in T.series[ac]){af=(T.seriesStyles[aa]!=null)?T.seriesStyles[aa]:T.series[ac][aa];if(af!=null){W[aa]=af;if(aa=="color"){ab.series[ac].renderer.shapeRenderer.fillStyle=af;ab.series[ac].renderer.shapeRenderer.strokeStyle=af;ab.series[ac][aa]=af}else{if(aa=="lineWidth"){ab.series[ac].renderer.shapeRenderer.lineWidth=af;ab.series[ac][aa]=af}else{if(aa=="markerOptions"){F(ab.series[ac].markerOptions,af);F(ab.series[ac].markerRenderer,af)}else{ab.series[ac][aa]=af}}}O=true}}}if(O){ab.target.empty();ab.draw()}for(aa in T.target){if(T.target[aa]!=null){ab.target.css(aa,T.target[aa])}}}};w.jqplot.ThemeEngine.prototype._add=function(P,O){if(O){P._name=O}if(!P._name){P._name=Date.parse(new Date())}if(!this.themes.hasOwnProperty(P._name)){this.themes[P._name]=P}else{throw new Error("jqplot.ThemeEngine Error: Theme already in use")}};w.jqplot.ThemeEngine.prototype.remove=function(O){if(O=="Default"){return false}return delete this.themes[O]};w.jqplot.ThemeEngine.prototype.newTheme=function(O,Q){if(typeof(O)=="object"){Q=Q||O;O=null}if(Q&&Q._name){O=Q._name}else{O=O||Date.parse(new Date())}var P=this.copy(this.themes.Default._name,O);w.jqplot.extend(P,Q);return P};function p(Q){if(Q==null||typeof(Q)!="object"){return Q}var O=new Q.constructor();for(var P in Q){O[P]=p(Q[P])}return O}w.jqplot.clone=p;function F(Q,P){if(P==null||typeof(P)!="object"){return}for(var O in P){if(O=="highlightColors"){Q[O]=p(P[O])}if(P[O]!=null&&typeof(P[O])=="object"){if(!Q.hasOwnProperty(O)){Q[O]={}}F(Q[O],P[O])}else{Q[O]=P[O]}}}w.jqplot.merge=F;w.jqplot.extend=function(){var T=arguments[0]||{},R=1,S=arguments.length,O=false,Q;if(typeof T==="boolean"){O=T;T=arguments[1]||{};R=2}if(typeof T!=="object"&&!toString.call(T)==="[object Function]"){T={}}for(;R<S;R++){if((Q=arguments[R])!=null){for(var P in Q){var U=T[P],V=Q[P];if(T===V){continue}if(O&&V&&typeof V==="object"&&!V.nodeType){T[P]=w.jqplot.extend(O,U||(V.length!=null?[]:{}),V)}else{if(V!==l){T[P]=V}}}}}return T};w.jqplot.ThemeEngine.prototype.rename=function(P,O){if(P=="Default"||O=="Default"){throw new Error("jqplot.ThemeEngine Error: Cannot rename from/to Default")}if(this.themes.hasOwnProperty(O)){throw new Error("jqplot.ThemeEngine Error: New name already in use.")}else{if(this.themes.hasOwnProperty(P)){var Q=this.copy(P,O);this.remove(P);return Q}}throw new Error("jqplot.ThemeEngine Error: Old name or new name invalid")};w.jqplot.ThemeEngine.prototype.copy=function(O,Q,S){if(Q=="Default"){throw new Error("jqplot.ThemeEngine Error: Cannot copy over Default theme")}if(!this.themes.hasOwnProperty(O)){var P="jqplot.ThemeEngine Error: Source name invalid";throw new Error(P)}if(this.themes.hasOwnProperty(Q)){var P="jqplot.ThemeEngine Error: Target name invalid";throw new Error(P)}else{var R=p(this.themes[O]);R._name=Q;w.jqplot.extend(true,R,S);this._add(R);return R}};w.jqplot.Theme=function(O,P){if(typeof(O)=="object"){P=P||O;O=null}O=O||Date.parse(new Date());this._name=O;this.target={backgroundColor:null};this.legend={textColor:null,fontFamily:null,fontSize:null,border:null,background:null};this.title={textColor:null,fontFamily:null,fontSize:null,textAlign:null};this.seriesStyles={};this.series=[];this.grid={drawGridlines:null,gridLineColor:null,gridLineWidth:null,backgroundColor:null,borderColor:null,borderWidth:null,shadow:null};this.axesStyles={label:{},ticks:{}};this.axes={};if(typeof(P)=="string"){this._name=P}else{if(typeof(P)=="object"){w.jqplot.extend(true,this,P)}}};var A=function(){this.borderColor=null;this.borderWidth=null;this.ticks=new g();this.label=new k()};var g=function(){this.show=null;this.showGridline=null;this.showLabel=null;this.showMark=null;this.size=null;this.textColor=null;this.whiteSpace=null;this.fontSize=null;this.fontFamily=null};var k=function(){this.textColor=null;this.whiteSpace=null;this.fontSize=null;this.fontFamily=null;this.fontWeight=null};var i=function(){this.color=null;this.lineWidth=null;this.shadow=null;this.fillColor=null;this.showMarker=null;this.markerOptions=new v()};var v=function(){this.show=null;this.style=null;this.lineWidth=null;this.size=null;this.color=null;this.shadow=null};var E=function(){this.color=null;this.seriesColors=null;this.lineWidth=null;this.shadow=null;this.barPadding=null;this.barMargin=null;this.barWidth=null;this.highlightColors=null};var b=function(){this.seriesColors=null;this.padding=null;this.sliceMargin=null;this.fill=null;this.shadow=null;this.startAngle=null;this.lineWidth=null;this.highlightColors=null};var t=function(){this.seriesColors=null;this.padding=null;this.sliceMargin=null;this.fill=null;this.shadow=null;this.startAngle=null;this.lineWidth=null;this.innerDiameter=null;this.thickness=null;this.ringMargin=null;this.highlightColors=null};var H=function(){this.color=null;this.lineWidth=null;this.shadow=null;this.padding=null;this.sectionMargin=null;this.seriesColors=null;this.highlightColors=null};var r=function(){this.padding=null;this.backgroundColor=null;this.ringColor=null;this.tickColor=null;this.ringWidth=null;this.intervalColors=null;this.intervalInnerRadius=null;this.intervalOuterRadius=null;this.hubRadius=null;this.needleThickness=null;this.needlePad=null};var N=function(){this.syntax=N.config.syntax;this._type="jsDate";this.utcOffset=new Date().getTimezoneOffset*60000;this.proxy=new Date();this.options={};this.locale=N.regional.getLocale();this.formatString="";this.defaultCentury=N.config.defaultCentury;switch(arguments.length){case 0:break;case 1:if(f(arguments[0])=="[object Object]"&&arguments[0]._type!="jsDate"){var Q=this.options=arguments[0];this.syntax=Q.syntax||this.syntax;this.defaultCentury=Q.defaultCentury||this.defaultCentury;this.proxy=N.createDate(Q.date)}else{this.proxy=N.createDate(arguments[0])}break;default:var O=[];for(var P=0;P<arguments.length;P++){O.push(arguments[P])}this.proxy=new Date(this.utcOffset);this.proxy.setFullYear.apply(this.proxy,O.slice(0,3));if(O.slice(3).length){this.proxy.setHours.apply(this.proxy,O.slice(3))}break}};N.config={defaultLocale:"en",syntax:"perl",defaultCentury:1900};N.prototype.add=function(Q,P){var O=s[P]||s.day;if(typeof O=="number"){this.proxy.setTime(this.proxy.getEhTime()+(O*Q))}else{O.add(this,Q)}return this};N.prototype.clone=function(){return new N(this.proxy.getEhTime())};N.prototype.diff=function(P,S,O){P=new N(P);if(P===null){return null}var Q=s[S]||s.day;if(typeof Q=="number"){var R=(this.proxy.getEhTime()-P.proxy.getEhTime())/Q}else{var R=Q.diff(this.proxy,P.proxy)}return(O?R:Math[R>0?"floor":"ceil"](R))};N.prototype.getAbbrDayName=function(){return N.regional[this.locale]["dayNamesShort"][this.proxy.getDay()]};N.prototype.getAbbrMonthName=function(){return N.regional[this.locale]["monthNamesShort"][this.proxy.getMonth()]};N.prototype.getAMPM=function(){return this.proxy.getHours()>=12?"PM":"AM"};N.prototype.getAmPm=function(){return this.proxy.getHours()>=12?"pm":"am"};N.prototype.getCentury=function(){return parseInt(this.proxy.getFullYear()/100,10)};N.prototype.getDate=function(){return this.proxy.getDate()};N.prototype.getDay=function(){return this.proxy.getDay()};N.prototype.getDayOfWeek=function(){var O=this.proxy.getDay();return O===0?7:O};N.prototype.getDayOfYear=function(){var P=this.proxy;var O=P-new Date(""+P.getFullYear()+"/1/1 GMT");O+=P.getTimezoneOffset()*60000;P=null;return parseInt(O/60000/60/24,10)+1};N.prototype.getDayName=function(){return N.regional[this.locale]["dayNames"][this.proxy.getDay()]};N.prototype.getFullWeekOfYear=function(){var R=this.proxy;var O=this.getDayOfYear();var Q=6-R.getDay();var P=parseInt((O+Q)/7,10);return P};N.prototype.getFullYear=function(){return this.proxy.getFullYear()};N.prototype.getGmtOffset=function(){var O=this.proxy.getTimezoneOffset()/60;var P=O<0?"+":"-";O=Math.abs(O);return P+y(Math.floor(O),2)+":"+y((O%1)*60,2)};N.prototype.getHours=function(){return this.proxy.getHours()};N.prototype.getHours12=function(){var O=this.proxy.getHours();return O>12?O-12:(O==0?12:O)};N.prototype.getIsoWeek=function(){var R=this.proxy;var Q=R.getWeekOfYear();var O=(new Date(""+R.getFullYear()+"/1/1")).getDay();var P=Q+(O>4||O<=1?0:1);if(P==53&&(new Date(""+R.getFullYear()+"/12/31")).getDay()<4){P=1}else{if(P===0){R=new N(new Date(""+(R.getFullYear()-1)+"/12/31"));P=R.getIsoWeek()}}R=null;return P};N.prototype.getMilliseconds=function(){return this.proxy.getMilliseconds()};N.prototype.getMinutes=function(){return this.proxy.getMinutes()};N.prototype.getMonth=function(){return this.proxy.getMonth()};N.prototype.getMonthName=function(){return N.regional[this.locale]["monthNames"][this.proxy.getMonth()]};N.prototype.getMonthNumber=function(){return this.proxy.getMonth()+1};N.prototype.getSeconds=function(){return this.proxy.getSeconds()};N.prototype.getShortYear=function(){return this.proxy.getYear()%100};N.prototype.getTime=function(){return this.proxy.getEhTime()};N.prototype.getTimezoneAbbr=function(){return this.proxy.toString().replace(/^.*\(([^)]+)\)$/,"$1")};N.prototype.getTimezoneName=function(){var O=/(?:\((.+)\)$| ([A-Z]{3}) )/.exec(this.toString());return O[1]||O[2]||"GMT"+this.getGmtOffset()};N.prototype.getTimezoneOffset=function(){return this.proxy.getTimezoneOffset()};N.prototype.getWeekOfYear=function(){var O=this.getDayOfYear();var Q=7-this.getDayOfWeek();var P=parseInt((O+Q)/7,10);return P};N.prototype.getUnix=function(){return Math.round(this.proxy.getEhTime()/1000,0)};N.prototype.getYear=function(){return this.proxy.getYear()};N.prototype.next=function(O){O=O||"day";return this.clone().add(1,O)};N.prototype.set=function(){switch(arguments.length){case 0:this.proxy=new Date();break;case 1:if(f(arguments[0])=="[object Object]"&&arguments[0]._type!="jsDate"){var Q=this.options=arguments[0];this.syntax=Q.syntax||this.syntax;this.defaultCentury=Q.defaultCentury||this.defaultCentury;this.proxy=N.createDate(Q.date)}else{this.proxy=N.createDate(arguments[0])}break;default:var O=[];for(var P=0;P<arguments.length;P++){O.push(arguments[P])}this.proxy=new Date(this.utcOffset);this.proxy.setFullYear.apply(this.proxy,O.slice(0,3));if(O.slice(3).length){this.proxy.setHours.apply(this.proxy,O.slice(3))}break}};N.prototype.setDate=function(O){return this.proxy.setDate(O)};N.prototype.setFullYear=function(){return this.proxy.setFullYear.apply(this.proxy,arguments)};N.prototype.setHours=function(){return this.proxy.setHours.apply(this.proxy,arguments)};N.prototype.setMilliseconds=function(O){return this.proxy.setMilliseconds(O)};N.prototype.setMinutes=function(){return this.proxy.setMinutes.apply(this.proxy,arguments)};N.prototype.setMonth=function(){return this.proxy.setMonth.apply(this.proxy,arguments)};N.prototype.setSeconds=function(){return this.proxy.setSeconds.apply(this.proxy,arguments)};N.prototype.setTime=function(O){return this.proxy.setTime(O)};N.prototype.setYear=function(){return this.proxy.setYear.apply(this.proxy,arguments)};N.prototype.strftime=function(O){O=O||this.formatString||N.regional[this.locale]["formatString"];return N.strftime(this,O,this.syntax)};N.prototype.toString=function(){return this.proxy.toString()};N.prototype.toYmdInt=function(){return(this.proxy.getFullYear()*10000)+(this.getMonthNumber()*100)+this.proxy.getDate()};N.regional={en:{monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],formatString:"%Y-%m-%d %H:%M:%S"},fr:{monthNames:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],monthNamesShort:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],dayNames:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],dayNamesShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],formatString:"%Y-%m-%d %H:%M:%S"},de:{monthNames:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthNamesShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],dayNames:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],dayNamesShort:["So","Mo","Di","Mi","Do","Fr","Sa"],formatString:"%Y-%m-%d %H:%M:%S"},es:{monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],monthNamesShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],dayNames:["Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacute;bado"],dayNamesShort:["Dom","Lun","Mar","Mi&eacute;","Juv","Vie","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},ru:{monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthNamesShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],dayNames:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],dayNamesShort:["вск","пнд","втр","срд","чтв","птн","сбт"],formatString:"%Y-%m-%d %H:%M:%S"},ar:{monthNames:["كانون الثاني","شباط","آذار","نيسان","آذار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],monthNamesShort:["1","2","3","4","5","6","7","8","9","10","11","12"],dayNames:["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"],dayNamesShort:["سبت","أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة"],formatString:"%Y-%m-%d %H:%M:%S"},pt:{monthNames:["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S&aacute;bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},"pt-BR":{monthNames:["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S&aacute;bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"}};N.regional["en-US"]=N.regional["en-GB"]=N.regional.en;N.regional.getLocale=function(){var O=N.config.defaultLocale;if(document&&document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang){O=document.getElementsByTagName("html")[0].lang;if(!N.regional.hasOwnProperty(O)){O=N.config.defaultLocale}}return O};var q=24*60*60*1000;var y=function(O,R){O=String(O);var P=R-O.length;var Q=String(Math.pow(10,P)).slice(1);return Q.concat(O)};var s={millisecond:1,second:1000,minute:60*1000,hour:60*60*1000,day:q,week:7*q,month:{add:function(Q,O){s.year.add(Q,Math[O>0?"floor":"ceil"](O/12));var P=Q.getMonth()+(O%12);if(P==12){P=0;Q.setYear(Q.getFullYear()+1)}else{if(P==-1){P=11;Q.setYear(Q.getFullYear()-1)}}Q.setMonth(P)},diff:function(S,Q){var O=S.getFullYear()-Q.getFullYear();var P=S.getMonth()-Q.getMonth()+(O*12);var R=S.getDate()-Q.getDate();return P+(R/30)}},year:{add:function(P,O){P.setYear(P.getFullYear()+Math[O>0?"floor":"ceil"](O))},diff:function(P,O){return s.month.diff(P,O)/12}}};for(var G in s){if(G.substring(G.length-1)!="s"){s[G+"s"]=s[G]}}var u=function(S,R,P){if(N.formats[P]["shortcuts"][R]){return N.strftime(S,N.formats[P]["shortcuts"][R],P)}else{var O=(N.formats[P]["codes"][R]||"").split(".");var Q=S["get"+O[0]]?S["get"+O[0]]():"";if(O[1]){Q=y(Q,O[1])}return Q}};N.strftime=function(U,R,Q,V){var P="perl";var T=N.regional.getLocale();if(Q&&N.formats.hasOwnProperty(Q)){P=Q}else{if(Q&&N.regional.hasOwnProperty(Q)){T=Q}}if(V&&N.formats.hasOwnProperty(V)){P=V}else{if(V&&N.regional.hasOwnProperty(V)){T=V}}if(f(U)!="[object Object]"||U._type!="jsDate"){U=new N(U);U.locale=T}if(!R){R=U.formatString||N.regional[T]["formatString"]}var O=R||"%Y-%m-%d",W="",S;while(O.length>0){if(S=O.match(N.formats[P].codes.matcher)){W+=O.slice(0,S.index);W+=(S[1]||"")+u(U,S[2],P);O=O.slice(S.index+S[0].length)}else{W+=O;O=""}}return W};N.formats={ISO:"%Y-%m-%dT%H:%M:%S.%N%G",SQL:"%Y-%m-%d %H:%M:%S"};N.formats.perl={codes:{matcher:/()%(#?(%|[a-z]))/i,Y:"FullYear",y:"ShortYear.2",m:"MonthNumber.2","#m":"MonthNumber",B:"MonthName",b:"AbbrMonthName",d:"Date.2","#d":"Date",e:"Date",A:"DayName",a:"AbbrDayName",w:"Day",H:"Hours.2","#H":"Hours",I:"Hours12.2","#I":"Hours12",p:"AMPM",M:"Minutes.2","#M":"Minutes",S:"Seconds.2","#S":"Seconds",s:"Unix",N:"Milliseconds.3","#N":"Milliseconds",O:"TimezoneOffset",Z:"TimezoneName",G:"GmtOffset"},shortcuts:{F:"%Y-%m-%d",T:"%H:%M:%S",X:"%H:%M:%S",x:"%m/%d/%y",D:"%m/%d/%y","#c":"%a %b %e %H:%M:%S %Y",v:"%e-%b-%Y",R:"%H:%M",r:"%I:%M:%S %p",t:"\t",n:"\n","%":"%"}};N.formats.php={codes:{matcher:/()%((%|[a-z]))/i,a:"AbbrDayName",A:"DayName",d:"Date.2",e:"Date",j:"DayOfYear.3",u:"DayOfWeek",w:"Day",U:"FullWeekOfYear.2",V:"IsoWeek.2",W:"WeekOfYear.2",b:"AbbrMonthName",B:"MonthName",m:"MonthNumber.2",h:"AbbrMonthName",C:"Century.2",y:"ShortYear.2",Y:"FullYear",H:"Hours.2",I:"Hours12.2",l:"Hours12",p:"AMPM",P:"AmPm",M:"Minutes.2",S:"Seconds.2",s:"Unix",O:"TimezoneOffset",z:"GmtOffset",Z:"TimezoneAbbr"},shortcuts:{D:"%m/%d/%y",F:"%Y-%m-%d",T:"%H:%M:%S",X:"%H:%M:%S",x:"%m/%d/%y",R:"%H:%M",r:"%I:%M:%S %p",t:"\t",n:"\n","%":"%"}};N.createDate=function(Q){if(Q==null){return new Date()}if(Q instanceof Date){return Q}if(typeof Q=="number"){return new Date(Q)}var V=String(Q).replace(/^\s*(.+)\s*$/g,"$1");V=V.replace(/^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,4})/,"$1/$2/$3");V=V.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{4})/i,"$1 $2 $3");var U=V.match(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i);if(U&&U.length>3){var Z=parseFloat(U[3]);var T=N.config.defaultCentury+Z;T=String(T);V=V.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i,U[1]+" "+U[2]+" "+T)}U=V.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})[^0-9]/);function Y(ad,ac){var ai=parseFloat(ac[1]);var ah=parseFloat(ac[2]);var ag=parseFloat(ac[3]);var af=N.config.defaultCentury;var ab,aa,aj,ae;if(ai>31){aa=ag;aj=ah;ab=af+ai}else{aa=ah;aj=ai;ab=af+ag}ae=aj+"/"+aa+"/"+ab;return ad.replace(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})/,ae)}if(U&&U.length>3){V=Y(V,U)}var U=V.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})$/);if(U&&U.length>3){V=Y(V,U)}var S=0;var P=N.matchers.length;var X,O,W=V;while(S<P){O=Date.parse(W);if(!isNaN(O)){return new Date(O)}X=N.matchers[S];if(typeof X=="function"){var R=X.call(N,W);if(R instanceof Date){return R}}else{W=V.replace(X[0],X[1])}S++}return NaN};N.daysInMonth=function(O,P){if(P==2){return new Date(O,1,29).getDate()==29?29:28}return[l,31,l,31,30,31,30,31,31,30,31,30,31][P]};N.matchers=[[/(3[01]|[0-2]\d)\s*\.\s*(1[0-2]|0\d)\s*\.\s*([1-9]\d{3})/,"$2/$1/$3"],[/([1-9]\d{3})\s*-\s*(1[0-2]|0\d)\s*-\s*(3[01]|[0-2]\d)/,"$2/$3/$1"],function(R){var P=R.match(/^(?:(.+)\s+)?([012]?\d)(?:\s*\:\s*(\d\d))?(?:\s*\:\s*(\d\d(\.\d*)?))?\s*(am|pm)?\s*$/i);if(P){if(P[1]){var Q=this.createDate(P[1]);if(isNaN(Q)){return}}else{var Q=new Date();Q.setMilliseconds(0)}var O=parseFloat(P[2]);if(P[6]){O=P[6].toLowerCase()=="am"?(O==12?0:O):(O==12?12:O+12)}Q.setHours(O,parseInt(P[3]||0,10),parseInt(P[4]||0,10),((parseFloat(P[5]||0))||0)*1000);return Q}else{return R}},function(R){var P=R.match(/^(?:(.+))[T|\s+]([012]\d)(?:\:(\d\d))(?:\:(\d\d))(?:\.\d+)([\+\-]\d\d\:\d\d)$/i);if(P){if(P[1]){var Q=this.createDate(P[1]);if(isNaN(Q)){return}}else{var Q=new Date();Q.setMilliseconds(0)}var O=parseFloat(P[2]);Q.setHours(O,parseInt(P[3],10),parseInt(P[4],10),parseFloat(P[5])*1000);return Q}else{return R}},function(S){var Q=S.match(/^([0-3]?\d)\s*[-\/.\s]{1}\s*([a-zA-Z]{3,9})\s*[-\/.\s]{1}\s*([0-3]?\d)$/);if(Q){var R=new Date();var T=N.config.defaultCentury;var V=parseFloat(Q[1]);var U=parseFloat(Q[3]);var P,O,W;if(V>31){O=U;P=T+V}else{O=V;P=T+U}var W=J(Q[2],N.regional[this.locale]["monthNamesShort"]);if(W==-1){W=J(Q[2],N.regional[this.locale]["monthNames"])}R.setFullYear(P,W,O);R.setHours(0,0,0,0);return R}else{return S}}];function J(Q,R){if(R.indexOf){return R.indexOf(Q)}for(var O=0,P=R.length;O<P;O++){if(R[O]===Q){return O}}return -1}function f(O){if(O===null){return"[object Null]"}return Object.prototype.toString.call(O)}w.jsDate=N;w.jqplot.sprintf=function(){function U(aa,W,X,Z){var Y=(aa.length>=W)?"":Array(1+W-aa.length>>>0).join(X);return Z?aa+Y:Y+aa}function R(Y){var X=new String(Y);for(var W=10;W>0;W--){if(X==(X=X.replace(/^(\d+)(\d{3})/,"$1"+w.jqplot.sprintf.thousandsSeparator+"$2"))){break}}return X}function Q(ab,aa,ad,Y,Z,X){var ac=Y-ab.length;if(ac>0){var W=" ";if(X){W="&nbsp;"}if(ad||!Z){ab=U(ab,Y,W,ad)}else{ab=ab.slice(0,aa.length)+U("",ac,"0",true)+ab.slice(aa.length)}}return ab}function V(ae,X,ac,Y,W,ab,ad,aa){var Z=ae>>>0;ac=ac&&Z&&{"2":"0b","8":"0","16":"0x"}[X]||"";ae=ac+U(Z.toString(X),ab||0,"0",false);return Q(ae,ac,Y,W,ad,aa)}function O(aa,ab,Y,W,Z,X){if(W!=null){aa=aa.slice(0,W)}return Q(aa,"",ab,Y,Z,X)}var P=arguments,S=0,T=P[S++];return T.replace(w.jqplot.sprintf.regex,function(ar,ad,ae,ah,au,ao,ab){if(ar=="%%"){return"%"}var ai=false,af="",ag=false,aq=false,ac=false,aa=false;for(var an=0;ae&&an<ae.length;an++){switch(ae.charAt(an)){case" ":af=" ";break;case"+":af="+";break;case"-":ai=true;break;case"0":ag=true;break;case"#":aq=true;break;case"&":ac=true;break;case"'":aa=true;break}}if(!ah){ah=0}else{if(ah=="*"){ah=+P[S++]}else{if(ah.charAt(0)=="*"){ah=+P[ah.slice(1,-1)]}else{ah=+ah}}}if(ah<0){ah=-ah;ai=true}if(!isFinite(ah)){throw new Error("$.jqplot.sprintf: (minimum-)width must be finite")}if(!ao){ao="fFeE".indexOf(ab)>-1?6:(ab=="d")?0:void (0)}else{if(ao=="*"){ao=+P[S++]}else{if(ao.charAt(0)=="*"){ao=+P[ao.slice(1,-1)]}else{ao=+ao}}}var ak=ad?P[ad.slice(0,-1)]:P[S++];switch(ab){case"s":if(ak==null){return""}return O(String(ak),ai,ah,ao,ag,ac);case"c":return O(String.fromCharCode(+ak),ai,ah,ao,ag,ac);case"b":return V(ak,2,aq,ai,ah,ao,ag,ac);case"o":return V(ak,8,aq,ai,ah,ao,ag,ac);case"x":return V(ak,16,aq,ai,ah,ao,ag,ac);case"X":return V(ak,16,aq,ai,ah,ao,ag,ac).toUpperCase();case"u":return V(ak,10,aq,ai,ah,ao,ag,ac);case"i":var Y=parseInt(+ak,10);if(isNaN(Y)){return""}var am=Y<0?"-":af;var ap=aa?R(String(Math.abs(Y))):String(Math.abs(Y));ak=am+U(ap,ao,"0",false);return Q(ak,am,ai,ah,ag,ac);case"d":var Y=Math.round(+ak);if(isNaN(Y)){return""}var am=Y<0?"-":af;var ap=aa?R(String(Math.abs(Y))):String(Math.abs(Y));ak=am+U(ap,ao,"0",false);return Q(ak,am,ai,ah,ag,ac);case"e":case"E":case"f":case"F":case"g":case"G":var Y=+ak;if(isNaN(Y)){return""}var am=Y<0?"-":af;var Z=["toExponential","toFixed","toPrecision"]["efg".indexOf(ab.toLowerCase())];var at=["toString","toUpperCase"]["eEfFgG".indexOf(ab)%2];var ap=Math.abs(Y)[Z](ao);ap=aa?R(ap):ap;ak=am+ap;return Q(ak,am,ai,ah,ag,ac)[at]();case"p":case"P":var Y=+ak;if(isNaN(Y)){return""}var am=Y<0?"-":af;var aj=String(Number(Math.abs(Y)).toExponential()).split(/e|E/);var X=(aj[0].indexOf(".")!=-1)?aj[0].length-1:aj[0].length;var al=(aj[1]<0)?-aj[1]-1:0;if(Math.abs(Y)<1){if(X+al<=ao){ak=am+Math.abs(Y).toPrecision(X)}else{if(X<=ao-1){ak=am+Math.abs(Y).toExponential(X-1)}else{ak=am+Math.abs(Y).toExponential(ao-1)}}}else{var W=(X<=ao)?X:ao;ak=am+Math.abs(Y).toPrecision(W)}var at=["toString","toUpperCase"]["pP".indexOf(ab)%2];return Q(ak,am,ai,ah,ag,ac)[at]();case"n":return"";default:return ar}})};w.jqplot.sprintf.thousandsSeparator=",";w.jqplot.sprintf.regex=/%%|%(\d+\$)?([-+#0&\' ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([nAscboxXuidfegpEGP])/g})(jQuery);


