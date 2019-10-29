// ==UserScript==
// @name         e-sim助手
// @namespace    esim
// @version      2.5.7.17
// @description  e-sim增强功能，本版本为功能测试版，使用中可能会出现问题，如果影响正常使用可以换回之前版本。
// @author       E-sim插件开发组
// @match        https://*.e-sim.org/*
// @require      http://cdn.e-sim.org/js/jquery-1.8.3.min.js
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        unsafewindow
// ==/UserScript==

// 前排提醒：如果你需要在游戏内截图并分享给国外玩家，请先关闭esim插件再截图

// 招人：E-sim插件开发组长期招收程序设计、编写、测试、优化、女装人员，要求：是活人就行
// 插件开发群：462288323 ，各位大佬进来拿插件也行呀

// ChangeLog
// 2.5.7.*：修正bug
//------------2.4.8及之前版本开发者：c*******, z*****，之后版本均由E-sim插件开发组维护------------



/*
修改$.ajax方法，新增abortAll函数，终止本页面的所有ajax请求。
*/
var ajaxs = [];
var oldAjaxOrigin = unsafeWindow.$.ajax; //原网页发送的ajax
var oldAjaxScript = $.ajax; //插件发送的ajax

unsafeWindow.$.ajax = function() {
    var args = Array.prototype.slice.call(arguments);
    var ajax = oldAjaxOrigin.apply(this, args);
    ajaxs.push(ajax);
    return ajax;
};
$.ajax = function() {
    var args = Array.prototype.slice.call(arguments);
    var ajax = oldAjaxScript.apply(this, args);
    ajaxs.push(ajax);
    return ajax;
};

// 新增abortAll函数。
function abortAll() {
    $.each(ajaxs, function(i, ajax) {
        ajax.abort();
    });
    ajaxs = [];
}


//取消动画效果
/*
var oldFadeOut = unsafeWindow.$.prototype.fadeOut;
unsafeWindow.$.prototype.fadeOut = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] == "string") args[0] = 0;
    var fadeOut = oldFadeOut.apply(this, args);
    return fadeOut;
};


var oldFadeIn = unsafeWindow.$.prototype.fadeIn;
unsafeWindow.$.prototype.fadeIn = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] == "string") args[0] = 0;
    var fadeIn = oldFadeIn.apply(this, args);
    return fadeIn;
};
*/


/*! jquery.livequery - v1.3.6 - 2013-08-26
 * Copyright (c)
 *  (c) 2010, Brandon Aaron (http://brandonaaron.net)
 *  (c) 2012 - 2013, Alexander Zaytsev (http://hazzik.ru/en)
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL Version 2 (GPL_LICENSE.txt) licenses.
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a,b){function c(a,b,c,d){return!(a.selector!=b.selector||a.context!=b.context||c&&c.$lqguid!=b.fn.$lqguid||d&&d.$lqguid!=b.fn2.$lqguid)}a.extend(a.fn,{livequery:function(b,e){var f,g=this;return a.each(d.queries,function(a,d){return c(g,d,b,e)?(f=d)&&!1:void 0}),f=f||new d(g.selector,g.context,b,e),f.stopped=!1,f.run(),g},expire:function(b,e){var f=this;return a.each(d.queries,function(a,g){c(f,g,b,e)&&!f.stopped&&d.stop(g.id)}),f}});var d=a.livequery=function(b,c,e,f){var g=this;return g.selector=b,g.context=c,g.fn=e,g.fn2=f,g.elements=a([]),g.stopped=!1,g.id=d.queries.push(g)-1,e.$lqguid=e.$lqguid||d.guid++,f&&(f.$lqguid=f.$lqguid||d.guid++),g};d.prototype={stop:function(){var b=this;b.stopped||(b.fn2&&b.elements.each(b.fn2),b.elements=a([]),b.stopped=!0)},run:function(){var b=this;if(!b.stopped){var c=b.elements,d=a(b.selector,b.context),e=d.not(c),f=c.not(d);b.elements=d,e.each(b.fn),b.fn2&&f.each(b.fn2)}}},a.extend(d,{guid:0,queries:[],queue:[],running:!1,timeout:null,registered:[],checkQueue:function(){if(d.running&&d.queue.length)for(var a=d.queue.length;a--;)d.queries[d.queue.shift()].run()},pause:function(){d.running=!1},play:function(){d.running=!0,d.run()},registerPlugin:function(){a.each(arguments,function(b,c){if(a.fn[c]&&!(a.inArray(c,d.registered)>0)){var e=a.fn[c];a.fn[c]=function(){var a=e.apply(this,arguments);return d.run(),a},d.registered.push(c)}})},run:function(c){c!==b?a.inArray(c,d.queue)<0&&d.queue.push(c):a.each(d.queries,function(b){a.inArray(b,d.queue)<0&&d.queue.push(b)}),d.timeout&&clearTimeout(d.timeout),d.timeout=setTimeout(d.checkQueue,20)},stop:function(c){c!==b?d.queries[c].stop():a.each(d.queries,d.prototype.stop)}}),d.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html","prop","removeProp"),a(function(){d.play()})});


MainIni();
function MainIni()
{
    if (location.pathname == "/maintenance.html")
    {
        setTimeout(function() {location.pathname = "/index.html";}, 10000);
        return;
    }
    main();
}

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
    enhanceCurrency();
    //快捷站点
    quickSite();
    //修正国旗错位
    fixFlagInline();

    // 不同页面分别做事
    if (document.URL.search("html") != -1) {
        var url = document.URL.match("\/([a-zA-Z0-9]+)\.html")[1];
        document.title = "e-Sim - " + location.host.split(".")[0] + " - " + url;
        switch (url) {
            case "index":
                //隐藏首页左上角的提醒框div#frontPagePushQuestion
                hideFrontPagePushQuestion();
                break;
            case "profile":
                var citizenId = parseInt(document.URL.match("\/profile\.html[?]id=([0-9]+)")[1]);
                updateOneCitizenPage(citizenId, $("body"));
                enhanceProfile(citizenId);
                break;
            //在线玩家详细信息
            case "citizensOnline":
                enhanceCitizensOnline();
                break;
            case "militaryUnitCompanies":
            case "companies":
                enhanceMilitaryUnitCompanies();
                break;
            case "myMilitaryUnit":
            case "militaryUnit":
                enhanceMyMilitaryUnit();
                break;
            case "militaryUnitMassSalary":
                enhancemMilitaryUnitMassSalary();
                break;
            case "statistics":
                enhanceStatistics();
            break;
            case "storage":
                enhanceStorage();
                break;
            case "monetaryMarket":
                updateCurrencyRatio($("body"));
                ShowPlayerCitizenship();
                break;
            case "battle":
                enhanceBattle();
                break;
            case "battles":
                preEnhanceBattleList();
                break;
            case "battleStatistics":
                enhanceBattleStatistics();
                break;
            //显示装备属性升级预计数值
            case "showEquipment":
                equipmentUpgradeHelper();
                break;
            //返回工厂页面
            case "companyAllWorkers":
                returnToCompanyPage();
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

// 隐藏首页左上角的提醒框div#frontPagePushQuestion
function hideFrontPagePushQuestion()
{
    var frontPagePushQuestion = $("#frontPagePushQuestion");
    if (frontPagePushQuestion.length > 0)
    {
        frontPagePushQuestion.hide();
    }
}

//修正国旗错位
function fixFlagInline()
{
    GM_addStyle(".xflagsSmall{display:inline-block;vertical-align:bottom;margin:1px!important;padding:0!important;} .xflagsMedium{display:inline-block;} .xflagsBig{display:inline-block;} ");
}

//从新版国旗class获取国家名称（多个单词中间以-连接）
function getCountryFormXflagsClass(xflagsclass)
{
    try
    {
        var t = xflagsclass.split(" ")[1];
        return t.substring(t.indexOf("-")+1);
    }
    catch(err)
    {
        return "未知";
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

//-----------------------------------------------------------------------------------------------------------------------
//Exsper's settings framework v0.1.2

function addCheckBoxSettingFrame($appendToElement, checkboxID, checkboxLabel, localStorageName, defaultValue)
{
    var $Checkbox = $('<input>', {type:'checkbox', id:checkboxID});
    var $Label = $("<label>", {"class":"checkboxlabel", "for":checkboxID, text:checkboxLabel});
    var localStorageSetting = localStorage.getItem(localStorageName);
    if (localStorageSetting === null)
    {
        //设置为默认值
        //console.log(localStorageName+"未定义，默认为"+defaultValue);
        localStorage.setItem(localStorageName, defaultValue);
        $Checkbox.attr("checked", defaultValue == "true");
    }
    else
    {
        //console.log(localStorageName+"为"+localStorageSetting);
        $Checkbox.attr("checked", localStorageSetting == "true");
    }
    $appendToElement.append($Checkbox, $Label);
    $Checkbox.click(function() {
        if ($Checkbox.is(':checked'))
        {
            localStorage.setItem(localStorageName, true);
        }
        else
        {
            localStorage.setItem(localStorageName, false);
        }
    });
}

function addSelectSettingFrame($appendToElement, selectLabel, selectValueArray, selectTextArray, localStorageName, defaultValue)
{
    var $Label = $("<p>", {style:"padding:3px; margin:3px", text:selectLabel});
    var $Select = $("<select>", {style:"padding:3px; margin:3px", id:localStorageName}).appendTo($Label);
    for (var i=0; i<selectValueArray.length; i++)
    {
        $("<option>", {value:selectValueArray[i], text:selectTextArray[i]}).appendTo($Select);
    }
    var localStorageSetting = localStorage.getItem(localStorageName);
    if (localStorageSetting === null)
    {
        //设置为默认值
        //console.log(localStorageName+"未定义，默认为"+defaultValue);
        localStorage.setItem(localStorageName, defaultValue);
        $Select.val(defaultValue);
    }
    else
    {
        //console.log(localStorageName+"为"+localStorageSetting);
        $Select.val(localStorageSetting);
    }
    $appendToElement.append($Label);
    $Select.change(function() {
        localStorage.setItem(localStorageName, $Select.val());
    });
}

function addTextboxSettingFrame($appendToElement, width, localStorageName, defaultValue)
{
    var $textbox = $("<input>", {type:"text",id:localStorageName, style:"vertical-align:5px;width:"+width+"px;"}).appendTo($appendToElement);
    var localStorageSetting = localStorage.getItem(localStorageName);
    if (localStorageSetting === null)
    {
        //设置为默认值
        //console.log(localStorageName+"未定义，默认为"+defaultValue);
        localStorage.setItem(localStorageName, defaultValue);
        $textbox.val(defaultValue);
    }
    else
    {
        //console.log(localStorageName+"为"+localStorageSetting);
        $textbox.val(localStorageSetting);
    }
    $appendToElement.append($textbox);
    $textbox.focus(function() {
        $textbox.css("background-color","#FFFFFF");
    });
    $textbox.blur(function() {
        if ($textbox.val()==="") $textbox.val(defaultValue);
        $textbox.css("background-color","#79FF79");
        //保存文本框内容
        localStorage.setItem(localStorageName, $textbox.val());
    });
}
//-----------------------------------------------------------------------------------------------------------------------

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
    var a = $("<a>", {"data-dropdown":"contentDropEh",style:"padding:0 5px;", href:"#"}).appendTo(li);
    var img = $("<img>", {align:"absmiddle", "class":"smallAvatar", style:"height:36px; width:36px;", src:"https://suna.e-sim.org:3000/avatars/140351_small"}).appendTo(a);

    // 版本号和声明
    var contentDropEh = $("#contentDrop").clone().attr("id", "contentDropEh").empty().insertBefore($("#contentDrop")); // 外框
    $("<b>", {text:"e-sim助手 版本 " + GM_info.script.version+" "}).appendTo(contentDropEh);

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
        var label = $("<label>", {"class":"checkboxlabel", "for":items[i][0]+"Checkbox", text:items[i][1]}).appendTo(td); // 选择框说明文本
        var checkbox = $("<input>", {id:items[i][0]+"Checkbox", type:"checkbox", style:"vertical-align:5px;", text:" "}).prependTo(label); // 选择框
        var button = $("<button>", {id:items[i][0]+"ClearButton", "class":"foundation-style", style:"padding:5px; margin:5px", target:items[i][3].join(" "), text:"清除"}).appendTo(td);
        var scanAllButton = $("<button>", {id:items[i][0]+"Scan", "class":"foundation-style", style:"padding:5px; margin:5px", text:items[i][4]}).appendTo(td);

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
            function getOneCitizen(citizenIds, index)
            {
                if (index>=citizenIds.length)
                {
                    return;
                }
                $.ajax({
                    url: "profile.html?id=" + citizenIds[index],
                    success: function(data) {
                        if ( $(".time", data).length !== 2) {
                            console.log(citizenIds[index], "抓取错误，重新抓取");
                            $.ajax(this);
                            return;
                        }
                        else
                        {
                            updateOneCitizenPage(citizenIds[index], data);
                            $("#fetchCitizenScan").text("剩余" + (--n) + "个");
                            if (n == 0)
                            {
                                $("#fetchCitizenScan").text("扫描完成");
                            }
                            else
                            {
                                setTimeout(function(){getOneCitizen(citizenIds, index+1);}, 200);
                            }
                        }
                    },
                    error: function(xhr,textStatus){
                        console.log("抓取错误 (", textStatus, ")，重新抓取");
                        $.ajax(this);
                        return;
                    },
                });
            }
            getOneCitizen(citizenIds, 0);
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

    // 盟国和敌国更新按钮
    var refreshAlliesAndEnemies = $('<button>', {id:'refreshAlliesAndEnemies', "class":"foundation-style", style:"padding:5px; margin:5px", text:'更新盟国和敌国'}).appendTo(td);
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
        //select.val(28);
        select[0].selectedIndex=0;
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
        $("~ div.xflagsSmall", select).remove();
        $("<div>", {"class":"xflagsSmall xflagsSmall-"+countryInfo[homelandId].flagName, style:"vertical-align:middle;", value:homelandId, title:countryInfo[homelandId].name}).insertAfter(select);

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
                var allyFlagDivs = $("div.xflagsMedium", $("table.dataTable:last", data));
                allyFlagDivs.each(function() {
                    var div = $(this);
                    var flagName = div.attr("class").split(" ").pop();
                    flagName=flagName.substring(flagName.indexOf('-') + 1);
                    allies.push(countryInfo[flagName].id);
                });

                var enemyFlagDivs = $("div.xflagsMedium", $("table.dataTable:eq(-2)", data));
                enemyFlagDivs.each(function() {
                    var div = $(this);
                    var flagName = getCountryFormXflagsClass(div.attr("class"));
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
        $("~ div.xflagsSmall", select).remove();
        $("<div>", {"class":"xflagsSmall xflagsSmall-"+countryInfo[allies[0]].flagName, style:"vertical-align:middle;", value:allies[0], title:countryInfo[allies[0]].name}).insertAfter(select);
        $("#Eh2Allies").text("");
        $("#Eh2Enemies").text("");
        $("#Eh2CoalitionMembers").text("");
        for (var i=1; i<allies.length; ++i) {
            countryId = allies[i];
            $("<div>", {"class":"xflagsSmall xflagsSmall-" + countryInfo[countryId].flagName, style:"vertical-align:middle;", title:countryInfo[countryId].name}).appendTo($("#Eh2Allies"));
        }
        for (var i=0; i<enemies.length; ++i) {
            countryId = enemies[i];
            $("<div>", {"class":"xflagsSmall xflagsSmall-" + countryInfo[countryId].flagName, style:"vertical-align:middle;", title:countryInfo[countryId].name}).appendTo($("#Eh2Enemies"));
        }
        for (var i=0; i<coalitionMembers.length; ++i) {
            countryId = coalitionMembers[i];
            $("<div>", {"class":"xflagsSmall xflagsSmall-" + countryInfo[countryId].flagName, style:"vertical-align:middle;", title:countryInfo[countryId].name}).appendTo($("#Eh2CoalitionMembers"));
        }
    }


    if (config.fetchCurrencyDisabled) {
        $("#fetchCurrencyScan").hide();
    }
    else {
        // 显示人口和生产力前5的国家
        var table = $("<table>", {id:"Eh2CurrencyRatios", style:"width:100%;"}).appendTo(contentDropEh);
        if (topCountryIds.length === 0) {// 需要抓取
            console.log("查看人口和生产力前5的国家");
            $.ajax({
                url: "countryStatistics.html?statisticType=PRODUCTIVITY",
                success: function(data) {
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
        table = $("#Eh2CurrencyRatios");
        table.empty();
        var flag = $("<tr>",{style:"line-height:30px;"}).appendTo(table);
        var flagCell = $("<td>", {style:"background-color:DarkSlateGray;", text:"货币"}).appendTo(flag);
        var buyGold = $("<tr>",{style:"line-height:30px;"}).appendTo(table);
        var buyGoldCell = $("<td>", {style:"background-color:DarkSlateGray;", html:"买 1<div class='xflagsSmall xflagsSmall-Gold' style='vertical-align:middle;' />"}).appendTo(buyGold);
        var sellGold = $("<tr>",{style:"line-height:30px;"}).appendTo(table);
        var sellGoldCell = $("<td>", {style:"background-color:DarkSlateGray;", html:"卖 1<div class='xflagsSmall xflagsSmall-Gold' style='vertical-align:middle;' />"}).appendTo(sellGold);
        for (var i=0; i<topCountryIds.length; ++i) {
            var countryId = topCountryIds[i];

            var cell = flagCell.clone().text("").insertAfter(flagCell);
            $("<div>", {"class":"xflagsSmall xflagsSmall-" + countryInfo[countryId].flagName, style:"vertical-align:middle;"}).appendTo(cell);

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
            var Currencies = $("a", $("#Eh2CurrencyRatios"));
            var n = Currencies.length;
            $(this).attr("disabled", true).text("剩余" + n + "个");

            function getOneCurrencyRatio(Currencies, index)
            {
                if (index>=Currencies.length)
                {
                    return;
                }
                $.ajax({
                    url: $(Currencies[index]).attr("href"),
                    success: function(data) {
                        if ( $(".time", data).length !== 2) {
                            console.log("汇率抓取错误，重新抓取");
                            $.ajax(this);
                            return;
                        }
                        else
                        {
                            updateCurrencyRatio(data);
                            button.text("剩余" + (--n) + "个");
                            if (n === 0) {
                                $("#fetchCurrencyScan").text("扫描完成");
                                showTopCountryCurrencyRatios();
                            }
                            else
                            {
                                setTimeout(function(){getOneCurrencyRatio(Currencies, index+1);}, 200);
                            }
                        }
                    },
                    error: function(xhr,textStatus){
                        console.log("抓取错误 (", textStatus, ")，重新抓取");
                        $.ajax(this);
                    },
                });
            }
            getOneCurrencyRatio(Currencies, 0);
        });
    }

    //清空和锁定favoriteCountries功能
    table = $("<table>", {style:"width:100%; text-align:left;"}).insertBefore($("#Eh2Config"));
    tr = $("<tr>", {style:"background-color:DarkSlateGray;line-height:30px;"}).appendTo(table);
    td = $("<td>", {id:"FavoriteCountriesConfig"}).appendTo(tr);
    var clearFavoriteCountries = $('<button>', {id:'clearFavoriteCountries', "class":"foundation-style", style:"padding:5px; margin:5px", text:'清空国旗选择列'}).appendTo(td);
    //清空后如果立即选择国家则不会生效（数据被重写）
    clearFavoriteCountries.click(function() {$(this).attr("disabled", true); localStorage.removeItem("favoriteCountries");});
    addCheckBoxSettingFrame(td, 'lockFavoriteCountries', '锁定国旗选择列', "lockFavoriteCountries", false);

    //战场设置
    tr = $("<tr>", {style:"background-color:DarkSlateGray;line-height:30px;"}).appendTo(table);
    td = $("<td>").appendTo(tr);
    var btnBattleSettings = $('<button>', {id:"btnBattleSettings", "class":"foundation-style", style:"padding:5px; margin:5px", text:'战场设置'}).appendTo(td);
    btnBattleSettings.click(function() {
        btnBattleSettings.attr({disabled:true});
        createSettingWindow();
    });

    return;
}

// 在货币市场的玩家名称前面显示国籍
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
        divList.remove();
        var playersA = $('a.profileLink');//playersA[0]为页面右上角的玩家自己
        ShowPlayerCitizenshipAjax(playersA, 1);
    });
}

function ShowPlayerCitizenshipAjax(playersA, index)
{
    if (index>=playersA.length)
    {
        return;
    }
    var playerID = $(playersA[index]).attr("href").split('=')[1];
    $.ajax({
        url: "apiCitizenById.html?id="+playerID,
        success: function(data) {
            var info = JSON.parse(data);
            console.log("用户", playerID, "API抓取成功");
            var playerCitizenship = info.citizenshipId;
            $("<div>", {"class":"xflagsSmall xflagsSmall-"+countryInfo[playerCitizenship].flagName, style:"vertical-align:middle;"}).insertBefore($(playersA[index]));
            setTimeout(function(){ShowPlayerCitizenshipAjax(playersA, index+1);}, 200);
        },
        error: function(xhr,textStatus){
            console.log("用户", playerID, "API抓取错误 (", textStatus, ")，重新抓取");
            $.ajax(this);
        },
    });
}

//获取网址参数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function enhanceStorage()
{
    var storageType = GetQueryString("storageType");

    if (storageType == "EQUIPMENT")
    {
        preEnhanceEquipment();
    }
    else if (storageType == "SPECIAL_ITEM" || storageType == "SPECIAL_ITEMS")
    {
        updateBuffTime();
        enhanceSpecialItem();
    }
}

function preEnhanceEquipment()
{
    var eqTable = $('#mergeItem');
    var btnEnhanceEQ = $("<input type='button' style='display:inline-block;' id='eeqbtn' value='自定义拍卖'></input> ");
    btnEnhanceEQ.prependTo(eqTable);
    $('#eeqbtn').click(function () {
        enhanceEquipment();
        $('#eeqbtn').attr({disabled:true});
        $('#eeqbtn').remove();
    });

    var btnEnhanceMerge = $("<input type='button' style='display:inline-block;' id='eembtn' value='批量合成'></input> ");
    btnEnhanceMerge.prependTo(eqTable);
    $('#eembtn').click(function () {
        enhanceMerge();
        $('#eembtn').attr({disabled:true});
        $('#eembtn').remove();
    });
}

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
        localStorage.setItem("maxRegionCount", regionInfo.length);
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
function updateOneCitizenPage(citizenId, html, saveToLocalStorage) {
    if (config.fetchCitizenDisabled && citizenId !== userId)
        return; // 禁用玩家信息，且玩家不是自己，则退出
    if ($("#indexShortcut", html).length === 0)
        return;
    if (saveToLocalStorage === undefined)
        saveToLocalStorage = true;

    console.log("玩家", citizenId, "(", $(".big-login", html).text(), ")页面已更新");
    page = citizenPage[citizenId];
    if (page === undefined)
        page = {};

    // 抓取头像
    page.avatar = $(".bigAvatar", html).attr("src").trim();

    // 抓取会员
    page.premium = $("img[src$='star_32.png']", html).length == 1;

    // 抓取buff和debuff图标，先检查防止重复
    page.buffIcons = [];
    $("img[src$='_positive.png']", html).each(function() {
        if($(this).attr("class") != "smallhelp") return true; //排除个人介绍中的buff图片
        if(page.buffIcons.indexOf(this) == -1)
        {
            page.buffIcons.push($(this).attr("src"));
        }
    });
    page.debuffIcons = [];
    $("img[src$='_negative.png']", html).each(function() {
        if($(this).attr("class") != "smallhelp") return true; //排除个人介绍中的buff图片
        if(page.debuffIcons.indexOf(this) == -1)
        {
            page.debuffIcons.push($(this).attr("src"));
        }
    });

    // 抓取buff和debuff
    var now = getEpoch();
    var buffs = ["steroids", "tank", "bunker", "resistance", "painDealer1h", "painDealer10h", "painDealer25h", "camouflage_third_class", "camouflage_second_class", "camouflage_first_class"];
    var buffSpan = [24, 24, 24, 24, 1, 10, 25, 24, 24, 24];
    //var buffs = ["steroids", "tank", "bunker", "resistance"];
    //烟雾弹I+40%，II+20%，III+10%
    for (var i=0; i<buffs.length; ++i) {
        //设置buff时间
        $.each(page.buffIcons, function(){
            if (this.indexOf(buffs[i])>0) // 有buff，则开buff时间一定在之前24小时内
                updateBuffTime(buffs[i], now-buffSpan[i]*3600*1000, now);
        });
        //设置debuff时间
        $.each(page.debuffIcons, function(){
            if (this.indexOf(buffs[i])>0) // 有debuff
            {
                if (page.premium)
                    updateBuffTime(buffs[i], now-buffSpan[i]*2*3600*1000, now-buffSpan[i]*3600*1000); // 会员最早2天前开buff，现在马上debuff结束；最晚1天前开buff，现在debuff刚开始
                else
                    updateBuffTime(buffs[i], now-buffSpan[i]*3*3600*1000, now-buffSpan[i]*3600*1000); // 非会员最早3天前开buff，现在马上debuff结束；最晚1天前开buff，现在debuff刚开始
            }
        });
        //没记录的全部初始化
        //注意！初始化不能放在updateBuffTime之前！
        if (page[buffs[i]] === undefined)
            page[buffs[i]] = [now, now+1000*24*3600*1000];// 没buff也没debuff，那开buff时间一定在当前时间之后
    }
    /*
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
    */

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
    // 当前任务奖励装备时会抓取出错，需要判断
    var tmp = [];
    $(".equipmentBack", html).each(function() {
        if ($(this).attr("class").indexOf("rewardEQ") < 0)
        {
            tmp.push($(this).attr("class").split(" ").pop());
        }
    });
    page.equipments = tmp;

    var birthday = $('div.rank :eq(0)', html).parent().children('div.profile-row:eq(7)').children("span.data");
    if (birthday.length != 0) //非组织号
    {
        // 抓取伤害
        page.lowHit = parseInt($("div#hitHelp", html).text().split("/")[0].replace(",", ""));
        page.highHit = parseInt($("div#hitHelp", html).text().split("/")[1].replace(",", ""));
        page.critical = parseFloat($("#criticalHelp", html).text().trim().split(" ")[0]);
        page.miss = parseFloat($("#missHelp", html).text().trim().split(" ")[0]);
        page.avoid = parseFloat($("#avoidHelp", html).text().trim().split(" ")[0]);
        page.power = parseInt((page.lowHit+page.highHit)/2*(1-page.miss/100)*(1+page.critical/100)/(1-page.avoid/100)*37*5*1.2*1.2*1.2);
        page.strength = parseInt($('div.rank :eq(0)', html).parent().children('div.profile-row:eq(4)').children("span.data").text());
        page.totalDamage = parseInt($('div.rank :eq(0)', html).parent().children('div.profile-row:eq(2)').children("span.data").text().replace(/,/g, ""));
    }

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

    var buffs = ["steroids", "tank", "bunker", "resistance", "painDealer1h", "painDealer10h", "painDealer25h", "camouflage_third_class", "camouflage_second_class", "camouflage_first_class"];
    var buffSpan = [24, 24, 24, 24, 1, 10, 25, 24, 24, 24];
    //var buffs = ["steroids", "tank", "bunker", "resistance"];
    for (var i=0; i<buffs.length; ++i) {
        var buffIcon = $("img[src$='"+buffs[i]+"_positive.png']:first")[0];
        var debuffIcon = $("img[src$='"+buffs[i]+"_negative.png']:first")[0];
        //个人介绍里如果有buff图片，也是在buffIcon之后的，只要注意判断positive后不会因为有假的buff图片就跳过negative判断就好
        var buffTime = citizenPage[citizenId][buffs[i]];

        if (buffIcon) {// 有buff
            if($(buffIcon).attr("class") == "smallhelp") //排除个人介绍中的buff图片
            {
                var min = buffTime[0] + buffSpan[i]*3600*1000 - now;
                var max = buffTime[1] + buffSpan[i]*3600*1000 - now;
                if ( (max-min) < 60*1000 )
                    $("<b>", {text:epochToTime(min)}).insertAfter(buffIcon); // 时间接近，只输出短的
                else
                    $("<b>", {text:epochToTime(min) + " - " + epochToTime(max)}).insertAfter(buffIcon);
            }
        }
        if (debuffIcon) {// 有debuff
            if($(debuffIcon).attr("class") == "smallhelp") //排除个人介绍中的buff图片
            {
                var min = buffTime[0] + buffSpan[i]*2*3600*1000 - now;
                var max = buffTime[1] + buffSpan[i]*2*3600*1000 - now;
                if (! citizenPage[citizenId].premium) {
                    min += buffSpan[i]*3600*1000;
                    max += buffSpan[i]*3600*1000;
                }
                if ( (max-min) < 60*1000 )
                    $("<b>", {text:epochToTime(max)}).insertAfter(debuffIcon); // 时间接近，只输出长的
                else
                    $("<b>", {text:epochToTime(min) + " - " + epochToTime(max)}).insertAfter(debuffIcon);
            }
        }
    }
}


// 读取使用buff的时间
function updateBuffTime() {
    var timeStringPair = $(".time:first").text().trim().split(", ");
    var stringEpochNow = getEpochFromString(timeStringPair[1], timeStringPair[0]);
    var buffs = ["steroids", "tank", "bunker", "resistance", "painDealer1h", "painDealer10h", "painDealer25h", "camouflage_third_class", "camouflage_second_class", "camouflage_first_class"];
    var buffSpan = [24, 24, 24, 24, 1, 10, 25, 24, 24, 24];
    //var buffs = ["steroids", "tank", "bunker", "resistance"];
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
                if (i<4) //有debuff
                {
                    var activateEpoch = getEpoch() + stringEpoch - stringEpochNow - 48*3600*1000;
                    if (!premium)
                        activateEpoch -= 24*3600*1000;
                }
                else //无debuff
                {
                    var activateEpoch = getEpoch() + stringEpoch - stringEpochNow - buffSpan[i]*3600*1000;
                }
                citizenPage[userId][buffs[i]] = [activateEpoch, activateEpoch+1];
                localStorage.setItem("citizenPage", JSON.stringify(citizenPage));
            }
        }

    });
}

// BUFF快捷使用
function enhanceSpecialItem()
{
    var quickBuffTable = $("<table id='quickBuffTable' UpdateCount='0'></table>").prependTo($("#storageConteiner"));
    var picTR = $("<tr>").appendTo(quickBuffTable);
    var buttonBuyTR = $("<tr>").appendTo(quickBuffTable);
    var buttonUseTR = $("<tr>").appendTo(quickBuffTable);
    setTable($('.specialItemInventory').parent(), picTR, buttonBuyTR, buttonUseTR);

    function setTable(siTable, picTR, buttonBuyTR, buttonUseTR)
    {
        var specialItems = ["medkit_big","vacations_big","spa_big","steroids_big","tank_big","painDealer1h_big","painDealer10h_big","painDealer25h_big","resistance_big","bunker_big"];
        var specialItemsBg = ["#EAC100", "#00BB00","#00BB00","#FF5809","#FF5809","#9F4D95","#9F4D95","#9F4D95","#7373B9","#7373B9"];
        //var specialItemsBg = ["#5B00AE", "#8600FF","#8600FF","#9F35FF","#9F35FF","#BE77FF","#BE77FF","#BE77FF","#d3a4ff","#d3a4ff"];
        //specialItemInventory.each(function() {
        $.each(specialItems, function(i, sin){
            var item = $("img[src$='"+sin+".png']",siTable).parent();
            if (item.length<=0)
            {
                return true;
            }
            //var item = $(this);
            //图片
            var pic = $('.smallhelp', item);
            if (pic.length === 0) // 无图无真相
                return true;
            var picTD = $('<td bgcolor="' + specialItemsBg[i] + '"></td>').appendTo(picTR);
            pic.clone().appendTo(picTD);
            //数量
            var count = $('span', item).text();
            if (count !="")
            {
                $('<br><b>' + count + '</b>').appendTo(picTD);
            }
            else
            {
                $('<br><br>').appendTo(picTD);
            }
            //使用or购买
            var useTD = $('<td bgcolor="' + specialItemsBg[i] + '"></td>').appendTo(buttonBuyTR);
            var buyTD = $('<td bgcolor="' + specialItemsBg[i] + '"></td>').appendTo(buttonUseTR);
            var siForms = $('.siForms', item);
            var forms = $('form', siForms);
            if (forms.length<1)
            {
                return true;
            }
            else if (forms.length==1)
            {
                //注意：使用form的buff类型参数名为item，购买form的buff类型参数名为itemType
                var select = $('select', forms);
                if (select.length<1) //只有使用
                {
                    var itemType = $('input[name="item"]', forms).attr("value");
                    //var storageType = $('input[name="storageType"]', forms).attr("value");
                    //var action = $('input[name="action"]', forms).attr("value");
                    var btnUse = $("<input type='button' class='foundation-style button' value='使用'></input>").appendTo(useTD);
                    btnUse.click(function() {
                        var uc = parseInt(quickBuffTable.attr("UpdateCount"))+1;
                        quickBuffTable.attr("UpdateCount", uc);
                        btnUse.attr({disabled:true});
                        $.ajax({
                            type: "POST",
                            url: "storage.html",
                            data: 'item='+itemType+'&storageType=SPECIAL_ITEM&action=USE',
                            success: function(data) {
                                Update(data,uc);
                                console.log("使用"+itemType+"：成功响应");
                            },
                            error: function(xhr, textStatus){
                                btnUse.val("使用失败");
                                console.log("使用"+itemType+"时发生错误");
                            }
                        });
                    });
                }
                else //只有购买
                {
                    var itemType = $('input[name="itemType"]', forms).attr("value");
                    //var storageType = $('input[name="storageType"]', forms).attr("value");
                    //var action = $('input[name="action"]', forms).attr("value");
                    var btnBuy = $("<input type='button' class='foundation-style button' value='购买'></input>").appendTo(buyTD);
                    btnBuy.click(function() {
                        var uc = parseInt(quickBuffTable.attr("UpdateCount"))+1;
                        quickBuffTable.attr("UpdateCount", uc);
                        btnBuy.attr({disabled:true});
                        $.ajax({
                            type: "POST",
                            url: "storage.html",
                            data: 'itemType='+itemType+'&storageType=SPECIAL_ITEM&action=BUY&quantity=1',
                            success: function(data) {
                                Update(data,uc);
                                console.log("购买"+itemType+"：成功响应");
                            },
                            error: function(xhr, textStatus){
                                btnBuy.val("购买失败");
                                console.log("购买"+itemType+"时发生错误");
                            }
                        });
                    });
                }
            }
            else //使用和购买都有
            {
                var itemType = $('input[name="itemType"]', forms).attr("value");
                //var storageType = $('input[name="storageType"]', forms).attr("value");
                //var action = $('input[name="action"]', forms).attr("value");
                var btnUse = $("<input type='button' class='foundation-style button' value='使用'></input>").appendTo(useTD);
                btnUse.click(function() {
                    var uc = parseInt(quickBuffTable.attr("UpdateCount"))+1;
                    quickBuffTable.attr("UpdateCount", uc);
                    btnUse.attr({disabled:true});
                    $.ajax({
                        type: "POST",
                        url: "storage.html",
                        data: 'item='+itemType+'&storageType=SPECIAL_ITEM&action=USE',
                        success: function(data) {
                            Update(data,uc);
                            console.log("使用"+itemType+"：成功响应");
                        },
                        error: function(xhr, textStatus){
                            btnUse.val("使用失败");
                            console.log("使用"+itemType+"时发生错误");
                        }
                    });
                });
                var btnBuy = $("<input type='button' class='foundation-style button' value='购买'></input>").appendTo(buyTD);
                btnBuy.click(function() {
                    var uc = parseInt(quickBuffTable.attr("UpdateCount"))+1;
                    quickBuffTable.attr("UpdateCount", uc);
                    btnBuy.attr({disabled:true});
                    $.ajax({
                        type: "POST",
                        url: "storage.html",
                        data: 'itemType='+itemType+'&storageType=SPECIAL_ITEM&action=BUY&quantity=1',
                        success: function(data) {
                            Update(data,uc);
                            console.log("购买"+itemType+"：成功响应");
                        },
                        error: function(xhr, textStatus){
                            btnBuy.val("购买失败");
                            console.log("购买"+itemType+"时发生错误");
                        }
                    });
                });
            }
        //});
        });

    }
    function Update(data,uc)
    {
        var nuc = quickBuffTable.attr("UpdateCount");//现在的版本
        if (uc>=nuc) //请求更新的版本不小于现在版本，防止因网卡导致后来数据被先前数据覆盖
        {
            $("td",quickBuffTable).remove();
            setTable($('.specialItemInventory', data).parent(), picTR, buttonBuyTR, buttonUseTR);
        }
    }
}

function createSettingWindow()
{
    //设置界面
    var dropDownSettingDiv = $('<div>', {"class":"battleSettingsDiv", style:"overflow:auto; width:450px; height:auto; display:block; position:fixed; top:50%; left:50%; margin-left: -225px; margin-top: -150px; padding-bottom: 20px; text-align:center;background-color:lightgray;"}).appendTo($('body'));
    var dropDownContent = $('<br>战场设置<br><table class="battleSettingsTable" style="text-align:left"></table><button class="battleSettingsCancel">关闭</button><br>').appendTo(dropDownSettingDiv);
    // 下移战场功能显示界面div的功能
    var table = $(".battleSettingsTable");
    var tr = $("<tr>").appendTo(table);
    var td = $("<td>").appendTo(tr);
    addCheckBoxSettingFrame(td, 'battleEnhanceDivPlacement', '战场界面功能框下移', "battleEnhanceDivPlacement", false);
    $("<p>", {text:"观战玩家变动不会改变按钮位置。"}).appendTo(td);

    //缩小战场页面框体间距
    tr = $("<tr>").appendTo(table);
    td = $("<td>").appendTo(tr);
    addCheckBoxSettingFrame(td, 'battleBorderless', '战场页面缩小框体间距', "battleBorderless", false);
    $("<p>", {text:"能看到下面的玩家输出排行和实时输出伤害。"}).appendTo(td);

    //预置栏位
    tr = $("<tr>").appendTo(table);
    td = $("<td>").appendTo(tr);
    addCheckBoxSettingFrame(td, 'addEmptyRecentRecord', '预置最近输出栏位', "addEmptyRecentRecord", false);
    $("<p>", {text:"当最近输出不足5个时补充至5个栏位，以便第一时间能看到输出状况。"}).appendTo(td);

    $('.battleSettingsCancel').click(function(){
        $("#btnBattleSettings").attr({disabled:false});
        dropDownSettingDiv.remove();
    });
}


function quickSite()
{
    var bigcell = $('<li class="has-dropdown">').appendTo($('ul.foundation-left'));
    //var divider = $('<li class="divider"></li>').after(bigcell);
    var bigcellcontent = $('<a id="quickSite" href="#"><i class="icon-pin"></i>快捷站点</a>').appendTo(bigcell);
    var dropDown = $('<ul class="dropdown">').appendTo(bigcell);
    //var dropDownBack = $('<li class="title back js-generated"><h5><a href="#">« Back</a></h5></li>').appendTo(dropDown);
    //var dropDownSettingButton = $('<li><button class="quickSiteSettings">快捷站点设置</button></li>').appendTo(dropDown);
    var dropDownSettingButton = $('<li><a href="#" class="quickSiteSettings">快捷站点设置</a></li>').appendTo(dropDown);
    $('.quickSiteSettings').click(function(){
        createSettingWindow();
    });
    //读取
    //<li><a href="xxx.html">xxxxx</a></li>
    var quickSite = JSON.parse(localStorage.getItem("quickSite"));
    if (quickSite != null)
    {
        for(var i=0;i<quickSite.length;i++){
            $('<li><a href="' + quickSite[i].url + '" target="_blank">' + quickSite[i].name + '</a></li>').appendTo(dropDown);
        };
    }

    function createSettingWindow()
    {
        //设置界面
        var dropDownSettingDiv = $('<div>', {"class":"quickSiteDiv", style:"overflow:auto; width:450px; height:300px; display:block; position:absolute; top:50%; left:50%; margin-left: -225px; margin-top: -150px; padding-bottom: 20px; text-align:center;background-color:lightgray;"}).appendTo($('body'));
        var dropDownContent = $('<br>注意: 留空“名称”一栏则表示删除该行，修改后请保存，刷新后生效<br>站外链接请以http或https开头<br>举例：名称：EC在线玩家 链接：citizensOnline.html?countryId=28<br>举例：名称：Esim贴吧 链接：https://tieba.baidu.com/f?kw=esim<table style="text-align:center; margin:auto"><tbody><tr class="EHQS"><td>名称</td><td>链接</td></tr></tbody></table><button class="quickSiteAdd">增加站点</button><button class="quickSiteComplete">保存</button><button class="quickSiteCancel">取消</button><br>').appendTo(dropDownSettingDiv);
        var EHQStable = $('.EHQS').parent();
        $('.quickSiteAdd').click(function(){
            var tr = $('<tr><td><input class="EHQSSites" type="text" style="width:100px;"></td><td><input class="EHQSSites" type="text" style="width:300px;"></td></tr>').appendTo(EHQStable);
        });
        //读取
        var quickSite = JSON.parse(localStorage.getItem("quickSite"));
        if (quickSite != null)
        {
            for(var i=0;i<quickSite.length;i++){
                $('<tr><td><input class="EHQSSites" type="text" style="width:100px;" value="'+quickSite[i].name+'"></td><td><input class="EHQSSites" type="text" style="width:300px;" value="'+quickSite[i].url+'"></td></tr>').appendTo(EHQStable);
            };
        }
        //保存
        $('.quickSiteComplete').click(function(){
            var quickSite = [];
            var trs = $('tr:gt(0)', $('.EHQS').parent());
            trs.each(function() {
                var tr = $(this);
                var tdname = $('td:eq(0)', tr).find("input")[0].value;
                if (tdname != "") {
                    //var temp = "[{ name: "+tdname+", url: "+$('td:eq(1)', tr).find("input")[0].value+"}]";
                    quickSite.push({ "name": tdname, "url": $('td:eq(1)', tr).find("input")[0].value});
                }
            });
            localStorage.setItem("quickSite", JSON.stringify(quickSite));
            dropDownSettingDiv.remove();
        });
        $('.quickSiteCancel').click(function(){
            dropDownSettingDiv.remove();
        });
    }
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
        select.after("<br />");
        var favoriteCountries = JSON.parse(localStorage.getItem("favoriteCountries"));
        if (favoriteCountries === null)
            favoriteCountries = [28];
        $.each(favoriteCountries, function(index, countryId) {
            if (!countryInfo[countryId])
                return;
            var flag = $('<div>', {"class":(isCurrency?"xflagsSmall xflagsSmall-":"xflagsMedium xflagsMedium-") + countryInfo[countryId].flagName, style:"vertical-align:middle;", value:countryId, title:countryInfo[countryId].name}).insertAfter(select);
            flag.click(function() {
                select.val($(this).val());
                if (submit.length === 1) {
                    submit.click();
                }
            });
        });

        // 添加全世界
        if (!isCurrency && ((hasZero&&!hasN1) || (!hasZero&&hasN1))  ) {
           var flag = $('<div>', {"class":" xflagsMedium xflagsMedium-Adminland", style:"vertical-align:middle;", title:"全世界"}).insertAfter(select);
            flag.click(function() {
                select.val(hasZero?0:-1);
                if (submit.length === 1) {
                    submit.click();
                }
            });
        }

        // 添加黄金
        if (hasZero && isCurrency) {
            var flag = $("<div>", {"class":"xflagsSmall xflagsSmall-Gold", style:"vertical-align:middle;"}).insertAfter(select);
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

        var items = [
            ["bread", "Food", 5, "5-FOOD", "Q5食物", Math.floor(Math.random()*4+2)*10],
            ["gift", "Gift", 5, "5-GIFT", "Q5礼物", Math.floor(Math.random()*4+2)*10],
            ["tank", "Weapon", 5, "5-WEAPON", "Q5武器", Math.floor(Math.random()*10+15)*10],
            ["ticket ", "Ticket", 5, "5-TICKET", "Q5机票", 10],
            ["bread", "Food", 3, "3-FOOD", "Q3食物", 10],
            ["gift", "Gift", 3, "3-GIFT", "Q3礼物", 10],
            ["tank", "Weapon", 1, "1-WEAPON", "Q1武器", Math.floor(Math.random()*10+15)*10],
            ["ticket ", "Ticket", 1, "1-TICKET", "Q1机票", 10]
        ];

        //在按钮外做一层ul，为了可以在获取仓库后直接全清并重做按钮
        var storageTable = $('<ul id="storageTable" class="button foundation-center foundation-style-group"></ul>');
        li.parent().after(storageTable);

        $.each(items, function(index, item) {
            var sli = $("<li></li>");
            var muStorage = $("#storageTable").append(sli);
            var number = item[5];
            var button = $("<button>", {id:"send" + item[3], style:"width:41px; margin:1px;", "class":"button foundation-style smallhelp only-icon profileButton", title:"从军团仓库取" + number + "个" + item[4]}).appendTo(sli);
            var icon = $('<img>', {src:'//cdn.e-sim.org/img/productIcons/' + item[1] + '.png', style:"width:28px; height:28px;"}).appendTo(button);
            var numberSpan = $('<span>', {text:"x"+number, style:"position: absolute; top: 26px; right: 1px;"}).appendTo(button);
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
            getStorageNumber(citizenNumber);
            btnGetStorageNumber.remove();
        });

        //获取仓库中物资数量，并重置按钮
        function getStorageNumber(citizenNumber)
        {
            $.ajax({
                url: "storage.html?storageType=PRODUCT",
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
                            siQuality = siQuality.substring(1,2);//1
                            if (siType == "Food.png") foodNumber[parseInt(siQuality)] = siNumber;
                            else if (siType == "Gift.png") giftNumber[parseInt(siQuality)] = siNumber;
                            else if (siType == "Weapon.png") weaponNumber[parseInt(siQuality)] = siNumber;
                            else if (siType == "Ticket.png") ticketNumber[parseInt(siQuality)] = siNumber;
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
                        var button = $("<button>", {id:"send" + item[3], style:"width:41px; margin:1px; border-color:" + borderColor, "class":"button foundation-style smallhelp only-icon profileButton", title:"从军团仓库取" + number + "个" + item[4] + (item[5] ? ', 补足2天的用量' : '')}).appendTo(sli);
                        var icon = $('<img>', {src:'//cdn.e-sim.org/img/productIcons/' + item[1] + '.png', style:"width:28px; height:28px;"}).appendTo(button);
                        var numberSpan = $('<span>', {text:"x"+number, style:"position: absolute; top: 26px; right: 1px;"}).appendTo(button);
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
    var buttonAll = $('<button>', {"class":"foundation-style button", text:"查看全部"}).appendTo( $('<td>').appendTo(headline) );
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
        var button = $('<button>', {"class":"foundation-style button", style:"padding:10px;", id:"ehShow" + companyId, text:"查看工作情况", target:companyId}).appendTo( $('<td>').appendTo(tr) );

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


function returnToCompanyPage()
{
    var returnButton = $('<button>', {id:'returnButton', "class":"foundation-style", style:"padding:5px; margin:5px", text:'回到工厂页面'});
    returnButton.click(function() {
        var cid = GetQueryString("id");
        document.location = location.origin + "/company.html?id=" + cid;
    });
    $(".darkTable").before(returnButton);
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


// 一键编辑工资列表
function enhancemMilitaryUnitMassSalary() {
    // 读取工资列表
    function readPayTable() {
    	$("#EHpaytable").html("");
        if (ecoSkillList != null)
        {
            for(var i=1;i<=60;i++){
            	var name = "eco"+i.toString();
                $("<tr><td>"+name+"</td><td><input type='text' style='width: 333px;' value="+ecoSkillList[name]+"></td>").appendTo("#EHpaytable");
            };
        }
    }

    // 保存工资列表
    function savePayTable() {
    	var trs = $("tr",$("#EHpaytable"));
    	trs.each(function(i,tr) {
    		var tdname = $('td:eq(0)', tr).text();
    		var tdval = $('td:eq(1)', tr).find("input")[0].value;
    		ecoSkillList[tdname] = tdval;
        });
    }

	// 提交
    function sendEcoSkillList(){
    	var jsonTable = {
    		action : "SAVE_SETTINGS",
    		data : []
    	};
    	for ( var i = 1; i <= 60; i++) {
    		jsonTable.data.push({
    			ecoSkill : i,
    			pay : ecoSkillList["eco"+i]
    		});
    	}
    	$.post("militaryUnitMassSalary.html", jsonTable);
    	alert("Page will refresh.");
    	location.reload();
    };

	var payTableDiv = $("<div class='foundation-style'></div>").appendTo("#msSettings");
	var renewButton = $("<input type='button' class='foundation-style button' id='renewButton' value='刷新工资列表'></input> ").appendTo(payTableDiv);
	renewButton.click(function(){readPayTable();});
    var submitPayButton = $("<input type='button' class='foundation-style button' id='submitPayButton' value='全部提交'></input> ").appendTo(payTableDiv);
	submitPayButton.click(function(){savePayTable();sendEcoSkillList();});
    var paytable = $("<table id='EHpaytable' align='center'></table>").appendTo(payTableDiv);
    readPayTable();
}


//////////////////////////////////////////////////////////////////////////////////////////

function preEnhanceBattleList()
{
    // 添加筛选功能
    var divBattlelist = $(".dataTable :first");
    var divBattlelistFunction = $("<div class='foundation-style'></div>");
    divBattlelistFunction.insertBefore(divBattlelist);
    var tableBattlelistFunction = $("<table align='right'></table>");
    divBattlelistFunction.append(tableBattlelistFunction);

    var trShowInfoBattlelist = $("<tr align='right'></tr>");
    tableBattlelistFunction.append(trShowInfoBattlelist);

    /* 倒计时在网页处于后台时停止工作
    var btnShowCountDown = $("<input type='button' class='foundation-style button' id='btnShowCountDown' value='在网页标题显示第一行战场倒计时'></input> ");
    trShowInfoBattlelist.append(btnShowCountDown);
    */
    /*
    var btnLinkOpenNewtab = $("<input type='button' class='foundation-style button' id='btnLinkOpenNewtab' value='在新窗口打开战场'></input> ");
    trShowInfoBattlelist.append(btnLinkOpenNewtab);
    */
    var btnShowEndTime = $("<input type='button' class='foundation-style button' id='btnShowEndTime' value='显示T5时间'></input> ");
    trShowInfoBattlelist.append(btnShowEndTime);
    var btnCloseShowEndTime = $("<input type='button' class='foundation-style button' id='btnCloseShowEndTime' value='关闭T5时间'></input> ");
    btnCloseShowEndTime.hide();
    trShowInfoBattlelist.append(btnCloseShowEndTime);
    var btnShowBattleID = $("<input type='button' class='foundation-style button' id='btnShowBattleID' value='显示战场ID'></input> ");
    trShowInfoBattlelist.append(btnShowBattleID);
    var btnCloseShowBattleID = $("<input type='button' class='foundation-style button' id='btnCloseShowBattleID' value='关闭战场ID'></input> ");
    btnCloseShowBattleID.hide();
    trShowInfoBattlelist.append(btnCloseShowBattleID);

    var trFilterBattlelist = $("<tr align='right'></tr>");
    tableBattlelistFunction.append(trFilterBattlelist);

    var btnDeleteTourment = $("<input type='button' class='foundation-style button' id='btnDeleteTourment' value='隐藏Cup战场'></input> ");
    trFilterBattlelist.append(btnDeleteTourment);
    var btnFilter = $("<input type='button' class='foundation-style button' id='btnFilter' value='筛选战场'></input> ");
    trFilterBattlelist.append(btnFilter);
    var btnCloseFilter = $("<input type='button' class='foundation-style button' id='btnCloseFilter' value='关闭筛选'></input> ");
    btnCloseFilter.hide();
    trFilterBattlelist.append(btnCloseFilter);
    var btnDeleteCheckedBattle = $("<input type='button' class='foundation-style button' id='btnDeleteCheckedBattle' value='隐藏选中战场'></input> ");
    btnDeleteCheckedBattle.attr("disabled", true);
    trFilterBattlelist.append(btnDeleteCheckedBattle);
    var btnDeleteUncheckedBattle = $("<input type='button' class='foundation-style button' id='btnDeleteUncheckedBattle' value='保留选中战场'></input> ");
    btnDeleteUncheckedBattle.attr("disabled", true);
    trFilterBattlelist.append(btnDeleteUncheckedBattle);
    var btnCopyCheckedBattleInfo = $("<input type='button' class='foundation-style button' id='btnCopyCheckedBattleInfo' value='复制选中战场信息'></input> ");
    btnCopyCheckedBattleInfo.attr("disabled", true);
    trFilterBattlelist.append(btnCopyCheckedBattleInfo);

    btnDeleteCheckedBattle.click(function () {
        $("#battlesTable tr:gt(0)").each(function(index, tr) {
            var filterCheckbox = $("input:checkbox", tr);
            if (filterCheckbox.is(':checked') === true)
            {
                tr.remove();
            }
        });
    });
    btnDeleteUncheckedBattle.click(function () {
        $("#battlesTable tr:gt(0)").each(function(index, tr) {
            var filterCheckbox = $("input:checkbox", tr);
            if (filterCheckbox.is(':checked') === false)
            {
                tr.remove();
            }
        });
    });
    btnDeleteTourment.click(function () {
        $("#battlesTable tr:gt(0)").each(function(index, tr) {
            var link = $("a[href*='battle.html']", tr);
            if (link == null)
            {
                return true; //相当于continue
            }
            var battleName = link.text();
            //淘汰赛："???"    单挑杯："???"    团体杯："???"    世界大战："???"    新手战场："新手战场"
            if ((battleName=="Cup tournament")||(battleName=="MU Cup")||(battleName=="Country Tournament") )
            {
                tr.remove();
            }
        });
    });
    btnFilter.click(function () {
        btnFilter.hide();
        btnCloseFilter.show();
        var tableCheckbox = $("<td exid='filter'><input type='checkbox'></input></td>");
        $("#battlesTable tr:eq(0)").append($("<td exid='filter'><input id='filterSelectAll' type='checkbox'></input>全选</td>"));
        $("#battlesTable tr:gt(0)").append(tableCheckbox);
        btnDeleteCheckedBattle.attr("disabled", false);
        btnDeleteUncheckedBattle.attr("disabled", false);
        btnCopyCheckedBattleInfo.attr("disabled", false);
        $("#filterSelectAll").click(function () {
            $("#battlesTable tr:gt(0)").each(function(index, tr) {
                $("input:checkbox", tr).attr("checked", $('#filterSelectAll').is(':checked'));
            });
        });
    });
    btnCloseFilter.click(function () {
        btnFilter.show();
        btnCloseFilter.hide();
        $("#battlesTable td[exid='filter']").remove();
        btnDeleteCheckedBattle.attr("disabled", true);
        btnDeleteUncheckedBattle.attr("disabled", true);
        btnCopyCheckedBattleInfo.attr("disabled", true);
    });
    /* 倒计时在网页处于后台时停止工作
    btnShowCountDown.click(function () {
        setInterval(updateClock,1000);
        btnShowCountDown.attr("disabled", true);
        function updateClock(){
            var $battle = $("#battlesTable tr:eq(1)");
            var $timer = $("span.is-countdown", $battle);
            if ($timer.length>0)
            {
                document.title = $timer.text()+" 第一场倒计时";
            }
            else
            {
                document.title = "倒计时获取失败";
            }
        }
    });
    */
    /* 在新窗口打开链接，不知道为什么不管用
    btnLinkOpenNewtab.click(function () {
        btnLinkOpenNewtab.attr("disabled", true);
        setTimeout(function() {
            btnLinkOpenNewtab.attr('disabled', false);
        }, 500);
        $('.battleDiv').off('click');
        $("a",$("#battlesTable")).attr("target","_blank");
    });
    */
    // 显示T5时间
    btnShowEndTime.click(function () {
        btnShowEndTime.hide();
        btnCloseShowEndTime.show();
        $("#battlesTable tr:eq(0)").append($("<td exid='endTime'>T5时间</td>"));
        $("#battlesTable tr:gt(0)").each(function(index, tr) {
            var link = $("a[href*='battle.html']", tr);
            var battleName = link.text();
            var timer = $("span.is-countdown", tr);
            var tableEndTimeLabel;
            if (timer.length !== 1)
            {
                tableEndTimeLabel = $("<td exid='endTime'>未知</td>");
            }
            else
            {
                var countDownText = timer.text().split(":");
                if (countDownText.length<3)
                {
                    tableEndTimeLabel = $("<td exid='endTime'>已过期</td>");
                }
                else
                {
                    var dtNow = new Date();
                    var tspan = parseInt(countDownText[0])*60*60*1000 + parseInt(countDownText[1])*60*1000 + parseInt(countDownText[2])*1000 - 5*60*1000; //t5时间
                    var endTime = new Date( dtNow.getTime() + tspan );
                    tableEndTimeLabel = $("<td exid='endTime'></td>");
                    tableEndTimeLabel.text(endTime.toLocaleTimeString());
                    var battleId = link.attr("href").match(/battle\.html[?]id=([0-9]+)/)[1];
                    var btnAutoPopup = $("<input type='button' class='foundation-style button' id='btnAutoPopup-"+ battleId +"' value='T5自动打开战场' title='首次使用可能会被浏览器拦截，加入白名单即可' endtime='"+Date.parse(endTime)+"'></input> ");
                    tableEndTimeLabel.append(btnAutoPopup);
                    btnAutoPopup.click(function () {
                        var thisb = $(this);
                        var nowTime = new Date();
                        var EndTime = new Date( parseInt(thisb.attr("endtime")) );
                        setTimeout(function(){
                            window.open(link.attr("href"), 'Battle'+ battleId, 'resizable,scrollbars,width=1200,height=600');
                        }, EndTime - nowTime);
                        console.log("在"+ (EndTime - nowTime)/1000 + "秒后打开"+link.attr("href"));
                        thisb.attr("disabled", true);
                        thisb.val("预约成功");
                        thisb.attr("title", "请勿关闭或刷新该网页");
                    });
                }
            }
            $(tr).append(tableEndTimeLabel);
        });
    });
    btnCloseShowEndTime.click(function () {
        btnShowEndTime.show();
        btnCloseShowEndTime.hide();
        $("#battlesTable td[exid='endTime']").remove();
    });

    // 显示战场ID
    btnShowBattleID.click(function () {
        btnShowBattleID.hide();
        btnCloseShowBattleID.show();
        $("#battlesTable tr:eq(0)").append($("<td exid='battleID'>战场ID</td>"));
        $("#battlesTable tr:gt(0)").each(function(index, tr) {
            var link = $("a[href*='battle.html']", tr);
            if (link == null)
            {
                return true; //相当于continue
            }
            var battleId = link.attr("href").match(/battle\.html[?]id=([0-9]+)/)[1];
            $(tr).append($("<td exid='battleID'>"+battleId+"</td>"));
        });
    });
    btnCloseShowBattleID.click(function () {
        btnShowBattleID.show();
        btnCloseShowBattleID.hide();
        $("#battlesTable td[exid='battleID']").remove();
    });

    btnCopyCheckedBattleInfo.click(function () {
        var copyText = "";
        $("#battlesTable tr:gt(0)").each(function(index, tr) {
            var filterCheckbox = $("input:checkbox", tr);
            if (filterCheckbox.is(':checked') === true)
            {
                var link = $("a[href*='battle.html']", tr);
                var battleName = link.text();
                //var defenderName = $("div.flags-medium:first", tr).attr("class").split(" ").pop().replace(/-/g, " ");
                //var attackerName = $("div.flags-medium:last", tr).attr("class").split(" ").pop().replace(/-/g, " ");
                //copyText = copyText + link[0].href + "  " + battleName + "：" + defenderName + " vs " + attackerName + "\r\n";
                var timer = $("span.is-countdown", tr);
                if (timer.length !== 1)
                {
                    copyText = copyText + link[0].href + "  " + battleName + "\r\n";
                }
                else
                {
                    var countDownText = timer.text().split(":");
                    var dtNow = new Date();
                    var endTime = new Date( dtNow.getTime() + parseInt(countDownText[0])*60*60*1000 + parseInt(countDownText[1])*60*1000 + parseInt(countDownText[2])*1000 - 5*60*1000 ); //t5时间
                    copyText = copyText + link[0].href + "  " + battleName + " T5时间：" + endTime.toLocaleTimeString() + "\r\n";
                }
            }
        });
        GM_setClipboard(copyText);
    });

    // 在第一个td添加按钮，用来给战场排序
    // ！偶尔会因为加载了重复战场而无法排序
    var sortAll = $("<button>", {text:"按结束时间排序", "class":"foundation-style button"}).appendTo($("#battlesTable tr:first td:first").empty());
    sortAll.click(function() {
        sortAll.attr("disabled", true);
        setTimeout(function() {
            sortAll.attr('disabled', false);
        }, 1000);

        // 获取战场倒计时
        var keys = [];
        $("#battlesTable tr:gt(0)").each(function(index, tr) {
            var link = $("a[href*='battle.html']", tr);
            if (link == null)
            {
                return true; //相当于continue
            }
            var battleId = parseInt(link.attr("href").match(/battle\.html[?]id=([0-9]+)/)[1]);
            $(this).attr("id", "battle-" + battleId);
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

    // 多页显示
    var pageSelector = $("#pagination-digg");
    //if (pageSelector.length>0 && $("li.active")[0].innerHTML == "1") // 只在第一页显示按钮
    //if ((pageSelector.length>0) && (navigator.userAgent.indexOf('Firefox') == -1)) //多页，firefox中该功能无效
    if (pageSelector.length>0)
    {
        var showAllPage = $("<button>", {text:"加载其他页的战场", "class":"foundation-style button", title:"如果需要加载所有战场，请尽快点击该按钮，否则可能会出现重复战场而导致插件失效"}).appendTo($("#battlesTable tr:first td:first"));

        showAllPage.click(function() {
            showAllPage.attr("disabled", true);
            var nextPage = $("li.next");
            var nowPage = parseInt($("li.active")[0].innerHTML);
            var maxPage;
            if (nextPage.length>0)
            {
                maxPage = parseInt(nextPage.prev().children().attr("href").split("page=")[1]); //last
            }
            else
            {
                maxPage = nowPage;
            }
            var pageLeft = maxPage-1;
            showAllPage.text("剩余" + pageLeft + "个");
            for(var npage = 1; npage<=maxPage; npage++)
            {
                if (npage == nowPage)
                {
                    continue;
                }
                var pageUrl = document.URL;
                if (pageUrl.indexOf("page")>0)
                {
                    pageUrl = pageUrl.substring(0, pageUrl.indexOf("page")) + "page=" + npage;
                }
                else if (pageUrl.indexOf("?")>0)
                {
                    pageUrl = pageUrl + "&page=" + npage;
                }
                else
                {
                    pageUrl = pageUrl + "?page=" + npage;
                }
                //2017.10.1 做得还不完全，原来的fundraisingTimer也没删掉，下面可以替换掉html里的fundraisingTimer的ID，来直接利用原html的框架
                $.ajax({
                    url: pageUrl,
                    success: function(data) {
                        if ( $(".time", data).length !== 2) {
                            console.log(citizenId, "抓取错误，重新抓取");
                            $.ajax(this);
                            return;
                        }
                        var tbody = $("#battlesTable").children("tbody");
                        //截取列表html（注意：使用DOM获取可能不会获取到script，也就没法显示倒计时）
                        var battlesTable = data.split('<table id="battlesTable"')[1];
                        battlesTable = battlesTable.split('</table>')[0];
                        var battleList = battlesTable.substring(battlesTable.indexOf("</tr>")+5); //去掉标题栏
                        var battles = battleList.split('<tr>');
                        var battleFrame = [];
                        var battleTimeScript = [];
                        var newFundraisingTimer = [];
                        var newFundraisingFrame = [];
                        var battleID = [];
                        for (var i = 1; i<battles.length; i++) //battles[0]为空
                        {
                            var tmp = battles[i].split('<script type="text/javascript">');
                            if (tmp.length>1) //有倒计时
                            {
                                battleFrame[i] = tmp[0];
                                var tmp2 = tmp[1].split('</script>');
                                battleFrame[i]=battleFrame[i]+tmp2[1];
                                battleFrame[i]=battleFrame[i].split("</tr>")[0];
                                battleTimeScript[i] = tmp2[0];

                                battleID[i] = battleFrame[i].split("?id=")[1];
                                battleID[i] = battleID[i].substring(0, battleID[i].indexOf('"'));
                                $("<tr>", {id:"battle-"+battleID[i]}).appendTo(tbody);
                                $("#battle-"+battleID[i]).html(battleFrame[i]);

                                //处理script
                                var tmp3 = battleTimeScript[i].split("+");
                                var btime = [];
                                for (var j = 1; j<tmp3.length; j++)
                                {
                                    btime[j] = tmp3[j].substring(0, tmp3[j].indexOf(")"));
                                }
                                newFundraisingTimer[i] = new Date();
                                newFundraisingTimer[i].setHours(newFundraisingTimer[i].getHours() + parseInt(btime[1]));
                                newFundraisingTimer[i].setMinutes(newFundraisingTimer[i].getMinutes() + parseInt(btime[2]));
                                newFundraisingTimer[i].setSeconds(newFundraisingTimer[i].getSeconds() + parseInt(btime[3]));
                                newFundraisingFrame[i] = $("<span>", {id:"fundraisingTimer"+battleID[i]}).appendTo($("a[href='battle.html?id="+battleID[i]+"']").parent());
                                //countdown函数从原网页js获取，否则需要jquery.plugin.js和jquery.countdown2.js
                                unsafeWindow.$("#fundraisingTimer"+battleID[i]).countdown({
                                    until: newFundraisingTimer[i],
                                    compact: true,
                                    format: 'dHMS',
                                    expiryText: '这个回合已经结束'
                                });

                            }
                            else //没有倒计时（新手战场等）
                            {
                                battleID[i] = battles[i].split("?id=")[1];
                                battleID[i] = battleID[i].substring(0, battleID[i].indexOf('"'));
                                $("<tr>", {id:"battle-"+battleID[i]}).appendTo(tbody);
                                battleFrame[i]=battles[i].split("</tr>")[0];
                                $("#battle-"+battleID[i]).html(battleFrame[i]);
                            }
                        }
                        showAllPage.text("剩余" + (--pageLeft) + "个");
                        if (pageLeft<=0)
                        {
                            showAllPage.text("加载完成，共"+maxPage+"页");
                        }
                    },
                    error: function(xhr,textStatus){
                        console.log("抓取错误 (", textStatus, ")，重新抓取");
                        $.ajax(this);
                    },
                });
            }
        });

        //设置一个按钮，可以在获取完所有战场后再加载刷新功能
        var startEnhanceBattleList = $("<button>", {text:"加载详情", "class":"foundation-style button", style:"padding:5px; margin:5px;", title:"加载刷新战场详情功能"}).appendTo($("#battlesTable tr:first td:last").empty());
        startEnhanceBattleList.click(function() {
            startEnhanceBattleList.attr("disabled", true);
            startEnhanceBattleList.remove();
            enhanceBattleList();
        });
    }
    else //单页，直接加载刷新功能
    {
        enhanceBattleList();
    }
}


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
        var defenderName = getCountryFormXflagsClass($("div.xflagsMedium:first", tr).attr("class")).replace(/-/g, " ");
        var attackerName = getCountryFormXflagsClass($("div.xflagsMedium:last", tr).attr("class")).replace(/-/g, " ");
        var bar = $("div.ui-progressbar-value", tr);


        // 第一个td：墙高、双方伤害、双方BH
        var wall = $("<div>", {id:"wall" + battleId, style:"text-align:center;"}).insertAfter($("div.ui-progressbar", tr));
        if ($("div.xflagsMedium", tr).length<=0)
        {
            var defenderBattleHero = $("<div>", {id:"defenderBattleHero" + battleId, style:"text-align:center;"}).insertAfter($(".muAvatar:first", tr).parent());
            var defenderScore = $("<div>", {id:"defenderScore" + battleId, style:"text-align:center;"}).insertAfter($(".muAvatar:first", tr).parent());
            var attackerBattleHero = $("<div>", {id:"attackerBattleHero" + battleId, style:"text-align:center;"}).insertAfter($(".muAvatar:last", tr).parent());
            var attackerScore = $("<div>", {id:"attackerScore" + battleId, style:"text-align:center;"}).insertAfter($(".muAvatar:last", tr).parent());
        }
        else
        {
            var defenderBattleHero = $("<div>", {id:"defenderBattleHero" + battleId, style:"text-align:center;"}).insertAfter($("div.xflagsMedium:first", tr));
            var defenderScore = $("<div>", {id:"defenderScore" + battleId, style:"text-align:center;"}).insertAfter($("div.xflagsMedium:first", tr));
            var attackerBattleHero = $("<div>", {id:"attackerBattleHero" + battleId, style:"text-align:center;"}).insertAfter($("div.xflagsMedium:last", tr));
            var attackerScore = $("<div>", {id:"attackerScore" + battleId, style:"text-align:center;"}).insertAfter($("div.xflagsMedium:last", tr));
        }

        // 第一个td：观战按钮
        var showSpectators = $("<div>", {id:"showSpectators" + battleId, text:"Show spectators", style:"color:#3787ea; cursor:pointer;"}).appendTo($("td:first", tr)).click(function() {spectators.children().show(); showSpectators.hide(); hideSpectators.show();}).hide();
        var hideSpectators = $("<div>", {id:"hideSpectators" + battleId, text:"Hide spectators", style:"color:#3787ea; cursor:pointer;"}).appendTo($("td:first", tr)).click(function() {spectators.children().hide(); showSpectators.show(); hideSpectators.hide();}).hide();

        // 第一个td：观战信息
        var spectators = $("<div>", {id:"spectators" + battleId, "class":"battleDiv", style:"width:100%; text-align:center;"}).appendTo($("td:first", tr));
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
        var peekButton = $("<button>", {id:"peek" + battleId, text:"刷新", "class":"foundation-style button", style:"padding:6px; margin:3px;"}).appendTo($("td:eq(3)", tr));
        var copyButton = $("<button>", {id:"copy" + battleId, text:"复制", "class":"foundation-style button", style:"padding:6px; margin:3px;", title:battleName + ": " + link[0].href + "\n"}).appendTo($("td:eq(3)", tr)).hide();
        var div = $("<div>").appendTo($("td:eq(3)", tr));
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
                    if ($("td:first > div:first", tr).children().length==4)
                    {
                        $("td:first > div:first >div:last", tr).hide();
                    }

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
    var peekAll = $("<button>", {text:"刷新全部", "class":"foundation-style button", style:"padding:5px; margin:5px;"}).appendTo($("#battlesTable tr:first td:eq(3)").empty());
    peekAll.click(function() {
        peekAll.attr("disabled", true);
        $("#battlesTable tr:gt(0) button[id^='peek']").click();
        setTimeout(function() {
            peekAll.attr('disabled', false);
        }, 10000);
    });




}

//////////////////////////////////////////////////////////////////////////////////////////

// 装备界面，增加拍卖选项
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


//批量合成
function enhanceMerge()
{
    //删除原来的checkbox选定检测
    unsafeWindow.$(".mergeItemForm :checkbox").unbind();
    //删除原有的合成按钮
    $("#mergeItem").children("button").remove();
    //批量合成按钮
    var btnStartMerge = $("<input type='button' style='display:inline-block;'value='选择(同等级)装备批量合成'></input> ");
    var btnSelectQ1 = $("<input type='button' style='display:inline-block;'value='选择所有Q1'></input> ");
    var btnSelectQ2 = $("<input type='button' style='display:inline-block;'value='选择所有Q2'></input> ");
    var btnSelectQ3 = $("<input type='button' style='display:inline-block;'value='选择所有Q3'></input> ");
    var btnSelectQ4 = $("<input type='button' style='display:inline-block;'value='选择所有Q4'></input> ");
    var btnSelectQ5 = $("<input type='button' style='display:inline-block;'value='选择所有Q5'></input> ");
    function countItem()
    {
        btnStartMerge.val("已选择"+$(".mergeItemForm :checkbox[checked]").length+"件装备，点击此处合成");
    }
    function MergeItems(EQs, MaxMergeIndex)
    {
        if (MaxMergeIndex>=EQs.length)
        {
            btnStartMerge.val("合成结束");
            location = location;
            return;
        }
        console.log("合成 "+EQs[MaxMergeIndex-2]+" "+EQs[MaxMergeIndex-1]+" "+EQs[MaxMergeIndex]);
        var dataString = "itemId%5B"+EQs[MaxMergeIndex-2]+"%5D="+EQs[MaxMergeIndex-2]+"&itemId%5B"+EQs[MaxMergeIndex-1]+"%5D="+EQs[MaxMergeIndex-1]+"&itemId%5B"+EQs[MaxMergeIndex]+"%5D="+EQs[MaxMergeIndex]+"&action=MERGE";
        $.ajax({
            type: "POST",
            url: "equipmentAction.html",
            data: dataString,
            success: function() {
                btnStartMerge.val("合成第"+(MaxMergeIndex-1)+"-"+(MaxMergeIndex+1)+"个");
                setTimeout(function(){MergeItems(EQs, MaxMergeIndex+3);}, 200);
            },
            error: function(xhr, textStatus){
                btnStartMerge.val("合成时发生错误");
            }
        });
    }
    btnStartMerge.click(function(){
        btnStartMerge.attr("disabled", true);
        var EQList=[];
        $(".mergeItemForm :checkbox[checked]").each(function(i,cb){EQList.push(cb.value)});
        MergeItems(EQList,2);
    });
    btnSelectQ1.click(function(){
        $(".mergeItemForm :checkbox").removeAttr("checked");
        $(".mergeItemQ1").attr("checked","checked");
        countItem();
    });
    btnSelectQ2.click(function(){
        $(".mergeItemForm :checkbox").removeAttr("checked");
        $(".mergeItemQ2").attr("checked","checked");
        countItem();
    });
    btnSelectQ3.click(function(){
        $(".mergeItemForm :checkbox").removeAttr("checked");
        $(".mergeItemQ3").attr("checked","checked");
        countItem();
    });
    btnSelectQ4.click(function(){
        $(".mergeItemForm :checkbox").removeAttr("checked");
        $(".mergeItemQ4").attr("checked","checked");
        countItem();
    });
    btnSelectQ5.click(function(){
        $(".mergeItemForm :checkbox").removeAttr("checked");
        $(".mergeItemQ5").attr("checked","checked");
        countItem();
    });
    $(".mergeItemForm :checkbox").click(function(){
        countItem();
    });
    $("#equipmentTable").prepend(btnStartMerge,btnSelectQ1,btnSelectQ2,btnSelectQ3,btnSelectQ4,btnSelectQ5);
}

//显示属性升级预计数值
function equipmentUpgradeHelper()
{
    var economicMin = [ 0.10, 0.20, 0.40, 0.60, 0.80, 1.10 ];
    var economicMax = [ 0.20, 0.40, 0.60, 0.80, 1.10, 1.40 ];
    var flightMin = [ 0.50, 1.00, 1.50, 2.00, 3.00, 4.00 ];
    var flightMax = [ 1.00, 1.50, 2.00, 3.00, 4.00, 5.50 ];
    var missMin = [ 0.00, 1.50, 3.00, 4.50, 6.00, 7.50 ];
    var missMax = [ 1.50, 3.00, 4.50, 6.00, 7.50, 9.00 ];
    var criticalMin = [ 0.00, 1.00, 2.00, 3.00, 4.00, 6.00 ];
    var criticalMax = [ 1.00, 2.00, 3.00, 4.00, 6.00, 8.00 ];
    var avoidMin = [ 0.00, 1.00, 2.00, 3.00, 4.00, 6.00 ];
    var avoidMax = [ 1.00, 2.00, 3.00, 4.00, 6.00, 8.00 ];
    var damageMin = [ 0.00, 1.00, 2.00, 3.00, 4.00, 6.00 ];
    var damageMax = [ 1.00, 2.00, 3.00, 4.00, 6.00, 8.00 ];
    var maxdamageMin = [ 0.00, 2.00, 4.00, 6.00, 8.00, 12.00 ];
    var maxdamageMax = [ 2.00, 4.00, 6.00, 8.00, 12.00, 16.00 ];
    var strengthMin = [ 10, 16, 20, 24, 28, 40 ];
    var strengthMax = [ 16, 20, 24, 28, 40, 60 ];
    var hitMin = [ 20, 40, 50, 60, 70, 90 ];
    var hitMax = [ 40, 50, 60, 70, 90, 130 ];
    var berserkMin = [ 3.00, 4.00, 5.00, 6.00, 7.00, 8.00 ];
    var berserkMax = [ 4.00, 5.00, 6.00, 7.00, 8.00, 10.00 ];
    var findMin = [ 2.00, 2.50, 3.00, 3.50, 4.00, 4.50 ];
    var findMax = [ 2.50, 3.00, 3.50, 4.00, 4.50, 5.00 ];
    //装备随机属性列表
    var standardHelmet = [ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ];
    var standardVision = [ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ];
    var standardArmor = [ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ];
    var standardPants = [ 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0 ];
    var standardShoes = [ 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0 ];
    var standardWeapon = [ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ];
    var standardOffhand = [ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0 ];
    var standardLuckycharm = [ 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0 ];

    var pirateHelmet = [ 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0 ];
    var pirateVision = [ 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ];
    var pirateArmor = [ 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0 ];
    var piratePants = [ 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ];
    var pirateShoes = [ 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ];
    var pirateWeapon = [ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0 ];
    var pirateOffhand = [ 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0 ];
    var pirateLuckycharm = [ 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0 ];

    var postapocalypticHelmet = [ 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1 ];
    var postapocalypticVision = [ 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1 ];
    var postapocalypticArmor = [ 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1 ];
    var postapocalypticPants = [ 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1 ];
    var postapocalypticShoes = [ 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1 ];
    var postapocalypticWeapon = [ 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1 ];
    var postapocalypticOffhand = [ 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1 ];
    var postapocalypticLuckycharm = [ 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0 ];

    var futureHelmet = [ 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0 ];
    var futureVision = [ 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0 ];
    var futureArmor = [ 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0 ];
    var futurePants = [ 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0 ];
    var futureShoes = [ 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0 ];
    var futureWeapon = [ 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0 ];
    var futureOffhand = [ 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0 ];
    var futureLuckycharm = [ 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0 ];

    var funnyHelmet = [ 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1 ];
    var funnyVision = [ 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1 ];
    var funnyArmor = [ 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1 ];
    var funnyPants = [ 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1 ];
    var funnyShoes = [ 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1 ];
    var funnyWeapon = [ 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1 ];
    var funnyOffhand = [ 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1 ];
    var funnyLuckycharm = [ 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0 ];

    var htmlSpecialSet = [ "pirate", "postapo", "future", "ee" ];
    var htmlType = [ "helmet", "vision", "armor", "pants", "shoes", "weapon", "offhand", "charm" ];
    var htmlParameter = ["Reduce miss chance", "Increase critical chance", "Increase maximum damage", "Increase damage", "Increase chance to avoid damage", "Increase strength", "Increase hit", "Increase economy skill", "Increase chance for free flight", "Increase chance to use less weapons for Berserk", "Increase chance to find a weapon"];

    ShowUpgradeValue();
    ShowPossibleParameter();

    function GetEquipmentParameterValue(s)
    {
        var sp = s.split(" by ");
        var param = sp[0].trim();
        var value = sp[1].trim();
        if (value.substring(value.length-1) == "%")
        {
            value = value.substring(0, value.length - 1).trim();
        }
        var pv = [ 0, 0];
        for (var i = 0; i < htmlParameter.length; i++)
        {
            if (param == htmlParameter[i])
            {
                pv[0] = i;
                break;
            }
        }
        pv[1] = parseFloat(value);
        return pv;
    }

    function GetValueRange(parameter, quality)
    {
        var range = [0.00, 0.00];
        switch (parameter)
        {
                //miss
            case 0:
                {
                    range[0] = missMin[quality];
                    range[1] = missMax[quality];
                    return range;
                }
                //暴击
            case 1:
                {
                    range[0] = criticalMin[quality];
                    range[1] = criticalMax[quality];
                    return range;
                }
                //大伤
            case 2:
                {
                    range[0] = maxdamageMin[quality];
                    range[1] = maxdamageMax[quality];
                    return range;
                }
                //小伤
            case 3:
                {
                    range[0] = damageMin[quality];
                    range[1] = damageMax[quality];
                    return range;
                }
                //闪避
            case 4:
                {
                    range[0] = avoidMin[quality];
                    range[1] = avoidMax[quality];
                    return range;
                }
                //力量
            case 5:
                {
                    range[0] = strengthMin[quality];
                    range[1] = strengthMax[quality];
                    return range;
                }
                //伤害点
            case 6:
                {
                    range[0] = hitMin[quality];
                    range[1] = hitMax[quality];
                    return range;
                }
                //经济技能
            case 7:
                {
                    range[0] = economicMin[quality];
                    range[1] = economicMax[quality];
                    return range;
                }
                //飞行
            case 8:
                {
                    range[0] = flightMin[quality];
                    range[1] = flightMax[quality];
                    return range;
                }
                //连击消耗
            case 9:
                {
                    range[0] = berserkMin[quality];
                    range[1] = berserkMax[quality];
                    return range;
                }
                //捡枪
            case 10:
                {
                    range[0] = findMin[quality];
                    range[1] = findMax[quality];
                    return range;
                }
            default:
                {
                    console.log("获取装备属性数值范围时parameter越界：" + parameter);
                    range[0] = 0;
                    range[1] = 0;
                    return range;
                }
        }
    }

    function getUpgradedValue(valueRange, nowValue) {
        //上升值=(最大值-原始值)/3
        var upgradeValue = (valueRange[1]-nowValue)/3;
        var maxValue = (valueRange[1]-valueRange[0])*0.9+valueRange[0];
        //实践证明是在强化前判定，强化后数值可能超过90%
        if (nowValue<maxValue) return upgradeValue+nowValue;
        else return -1;
    }

    function ShowUpgradeValue()
    {
        var quality = $(".equipmentBack",$(".testDivblue")).attr("class");
        quality = parseInt(quality.substring(quality.length - 1)) - 1;
        var $infoString = $("h4");
        $infoString.each(function(){
            var s = this.innerText;
            var pv = GetEquipmentParameterValue(s); //属性种类，属性数值
            var range = GetValueRange(pv[0],quality);

            this.append("（");
            var uv = getUpgradedValue(range, pv[1]);
            while(uv>0) {
                var pct = Math.round(((uv-range[0])/(range[1]-range[0]))*100);
                this.append(uv.toFixed(2)+"("+pct+"%), ");
                uv = getUpgradedValue(range, Math.round(uv*100)/100);
            }
            this.append("无法强化）");
        });
    }

    function GetEquipmentParameterList(set, type)
    {
        if(set==0)
        {
            if (type == 0) return standardHelmet;
            if (type == 1) return standardVision;
            if (type == 2) return standardArmor;
            if (type == 3) return standardPants;
            if (type == 4) return standardShoes;
            if (type == 5) return standardWeapon;
            if (type == 6) return standardOffhand;
            if (type == 7) return standardLuckycharm;
            return [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        }
        if (set == 1)
        {
            if (type == 0) return pirateHelmet;
            if (type == 1) return pirateVision;
            if (type == 2) return pirateArmor;
            if (type == 3) return piratePants;
            if (type == 4) return pirateShoes;
            if (type == 5) return pirateWeapon;
            if (type == 6) return pirateOffhand;
            if (type == 7) return pirateLuckycharm;
            return [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        }
        if (set == 2)
        {
            if (type == 0) return postapocalypticHelmet;
            if (type == 1) return postapocalypticVision;
            if (type == 2) return postapocalypticArmor;
            if (type == 3) return postapocalypticPants;
            if (type == 4) return postapocalypticShoes;
            if (type == 5) return postapocalypticWeapon;
            if (type == 6) return postapocalypticOffhand;
            if (type == 7) return postapocalypticLuckycharm;
            return [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        }
        if (set == 3)
        {
            if (type == 0) return futureHelmet;
            if (type == 1) return futureVision;
            if (type == 2) return futureArmor;
            if (type == 3) return futurePants;
            if (type == 4) return futureShoes;
            if (type == 5) return futureWeapon;
            if (type == 6) return futureOffhand;
            if (type == 7) return futureLuckycharm;
            return [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        }
        if (set == 4)
        {
            if (type == 0) return funnyHelmet;
            if (type == 1) return funnyVision;
            if (type == 2) return funnyArmor;
            if (type == 3) return funnyPants;
            if (type == 4) return funnyShoes;
            if (type == 5) return funnyWeapon;
            if (type == 6) return funnyOffhand;
            if (type == 7) return funnyLuckycharm;
            return [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        }
        return [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }

    function EquipmentParameter2String(parameter)
    {
        switch (parameter)
        {
            case 0: return "miss";
            case 1: return "暴击";
            case 2: return "大伤";
            case 3: return "小伤";
            case 4: return "免体";
            case 5: return "力量";
            case 6: return "伤害点";
            case 7: return "经济技能";
            case 8: return "免费飞行";
            case 9: return "减少连击消耗";
            case 10: return "捡到手枪";
            default: return "[未知属性]";
        }
    }

    function GetSetIndex(setname)
    {
        for(var i=0;i<htmlSpecialSet.length;i++)
        {
            if (setname == htmlSpecialSet[i])
            {
                return i + 1; //0为普通装
            }
        }
        return -1;
    }

    function GetTypeIndex(typename)
    {
        for(var i=0;i<htmlType.length;i++)
        {
            if (typename == htmlType[i])
            {
                return i;
            }
        }
        return -1;
    }

    function ShowPossibleParameter()
    {
        var settype = $(".equipmentBack",$(".testDivblue")).children().attr("class");
        settype = settype.split(" ")[1];
        settype = settype.substring(0,settype.length-1);
        var sp = settype.split('_');
        var set,type;
        if(sp.length == 1)
        {
            set = 0; // 普通装
            type = GetTypeIndex(sp[0]);
        }
        else //特殊装
        {
            set = GetSetIndex(sp[0]);
            type = GetTypeIndex(sp[1]);
        }
        var parameterList = GetEquipmentParameterList(set,type);
        var output = "可以刷出的属性：";
        for(var i=0;i<parameterList.length;i++)
        {
            if (parameterList[i] > 0)
                output = output + EquipmentParameter2String(i) + "、";
        }
        var dl = $(".dashedLine :eq(1)")
        dl.before("<br />");
        dl.before(output);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////


// 军团排名页面，可查看军令和在线玩家
function enhanceMilitaryUnitStatistics() {
    var table = $('.statisticsTable');
    var trs = $('tr', table);
    var headline = trs.eq(0);

    // “显示全部”按钮
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
                        var flags = $('div.xflagsMedium', $('div.battleDiv', data).parent().parent());

                        if (flags.length != 3) {
                            b.after('无军令');
                            b.remove();
                            return;
                        }

                        if (flags.eq(0).attr('class') === flags.eq(2).attr('class')) {
                            flags.eq(0).attr('style', "vertical-align:middle;");
                            var flagsCountry = getCountryFormXflagsClass(flags.eq(1).attr('class'));
                            flags.eq(1).attr('class', "xflagsSmall xflagsSmall-"+flagsCountry);
                            flags.eq(1).attr('style', "vertical-align:middle;");
                        }
                        else {
                            flags.eq(1).attr('style', "vertical-align:middle;");
                            var flagsCountry = getCountryFormXflagsClass(flags.eq(0).attr('class'));
                            flags.eq(0).attr('class', "xflagsSmall xflagsSmall-"+flagsCountry);
                            flags.eq(0).attr('style', "vertical-align:middle;");
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

    //var seller = $(".dataTable:first tr:eq(1) td:eq(1) div.flags-small", data).attr("class").split(" ").pop();
    var seller = getCountryFormXflagsClass($(".dataTable:first tr:eq(1) td:eq(1) div.xflagsSmall", data).attr("class")); // 卖家持有的货币名字
    var ratio = parseFloat($(".dataTable:first tr:eq(1) td:eq(2) b", data).text().replace(',', '.'));
    //var buyer = $(".dataTable:first tr:eq(1) td:eq(2) div.flags-small", data).attr("class").split(" ").pop();
    var buyer = getCountryFormXflagsClass($(".dataTable:first tr:eq(1) td:eq(2) div.xflagsSmall", data).attr("class")); // 买家持有的货币名字

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
    //$('div.flags-small + b').each(function() {
    $('div.xflagsSmall + b').each(function() {
        var b = $(this);
        if (isNaN(b.text()))
            return;

        //var countryName = b.prev().attr("class").split(" ").pop();
        var countryName = getCountryFormXflagsClass(b.prev().attr("class"));
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
                b.next().before("(", $("<b>", {text:mediumNum, title:"" + mediumRatio + " " + currencyName + " = 1 Gold"}), $("<div>", {"class":"xflagsSmall xflagsSmall-Gold"}), ")");
            else
                b.parent().append("(", $("<b>", {text:mediumNum, title:"" + mediumRatio + " " + currencyName + " = 1 Gold"}), $("<div>", {"class":"xflagsSmall xflagsSmall-Gold"}), ")");
        }
        else {
            if (b.next().length === 1)
                b.next().before("(", $("<b>", {text:buyNum + ' 或 ' + sellNum, title:"用 " + buyNum + " Gold买 " + ccNum + " " + currencyName + "，或用 " + ccNum + " " + currencyName + "卖 " + sellNum + " Gold"}), $("<div>", {"class":"xflagsSmall xflagsSmall-Gold"}), ")");
            else
                b.parent().append("(", $("<b>", {text:buyNum + ' 或 ' + sellNum, title:"用 " + buyNum + " Gold买 " + ccNum + " " + currencyName + "，或用 " + ccNum + " " + currencyName + "卖 " + sellNum + " Gold"}), $("<div>", {"class":"xflagsSmall xflagsSmall-Gold"}), ")");
        }
    });

    //TODO
    //表格内的金钱转换，在军团捐赠页会出现问题
    $('td b').each(function() {
        var pair = $(this).text().trim().split(" ");
        if (pair.length !== 2 || isNaN(pair[0]) || !countryInfo[pair[1]])
            return; // 必须是“数字 货币名”的形式

        var value = parseFloat(pair[0]);
        var currencyName = pair[1];

        var countryId = countryInfo[currencyName] && countryInfo[currencyName].id;
        if (!countryId || !currencyRatio[countryId] || !currencyRatio[countryId].sell || !currencyRatio[countryId].buy)
            return;

        var ccNum = parseFloat(pair[1]);

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
            $(this).after(" (", $("<b>", {text:mediumNum, title:"" + mediumRatio + " " + currencyName + " = 1 Gold"}), $("<div>", {"class":"xflagsSmall xflagsSmall-Gold"}), ")");
        }
        else {
            $(this).after(" (", $("<b>", {text:buyNum + ' 或 ' + sellNum, title:"用 " + buyNum + " Gold买 " + ccNum + " " + currencyName + "，或用 " + ccNum + " " + currencyName + "卖 " + sellNum + " Gold"}), $("<div>", {"class":"xflagsSmall xflagsSmall-Gold"}), ")");
        }

    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////


// 战斗界面主函数
function enhanceBattle() {
    clipWithFlag = false;

    $('#battleHeaderImage').attr('style', 'height:85px; background-color:#222');
    $('#battleHeaderImage img').remove();

    var panel = $(".small-2").eq(1);
    //var panel = $('<div>', {"class":"foundation-radius fightContainer foundation-base-font"})
    //$("#battleSelectable").before(panel);
    panel.attr('id', 'ehPanel');
    panel.prev().attr('class', panel.prev().attr('class').replace('small-4', 'small-2'));
    panel.next().attr('class', panel.next().attr('class').replace('small-4', 'small-2'));
    panel.attr('class', panel.attr('class').replace('small-2', 'small-3'));
    panel.after( $('<div>', {"class":panel.attr('class'), id:'ehRefresh'}) );
    panel.empty();

    var buttons = [['调试', 'Debug', 'bug'], ['飞行', 'Flight', 'airplane'], ['统计', 'Statistics', 'stocks'], ['特殊', 'Special', 'uniF00F'], ['观战', 'Spectator', 'eye'], ['详细', 'SpectatorDetail', 'users'], ['闹钟', 'Alarm', 'uptime'], ['高级', 'Advanced', 'uniF478']];
    var buttonStyleUnselected = 'padding:6px 2px 6px 2px;';
    var buttonStyleSelected = buttonStyleUnselected + ' color:orange;';
    for (var i=0; i<buttons.length; ++i) {
        var button = $('<button class="small button foundation-style" style="' + buttonStyleUnselected + '" id="ehButton' + buttons[i][1] + '"> <i class="icon-' + buttons[i][2] + '"></i>' + buttons[i][0] + '</button> ' );
        var div = $('<div>', {"class":'foundation-radius fightContainer foundation-base-font', style:'display:none;', id:'ehDiv'+buttons[i][1]});
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
        //下移显示框
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
    setupSpecial();
    setupSpectator();
    setupAlarm();
    setupSpectatorDetail();
    setupFight();
    setupFightButton();
    markAlliance();
    fixFightFlag();
    //特殊功能
    setupAdvanced();
    //无需确认直接使用医疗包
    addMedkitButton();
    //缩小框体间距
    var battleBorderlessSettings = localStorage.getItem("battleBorderless");
    if (battleBorderlessSettings === "true")
    {
        BorderlessBattlePage();
    }


    //上调最近输出框
    $("#recentDefenders").parent().parent().prependTo($("#recentDefenders").parent().parent().parent().parent());

    $('#minimalChatpanel').remove();	// 右下角聊天框


    //预置最近输出
    var addEmptyRecentRecordSettings = localStorage.getItem("addEmptyRecentRecord");
    if (addEmptyRecentRecordSettings === "true")
    {
        var rd = $("#recentDefenders");
        var ra = $("#recentAttackers");
        for (var rdi=1;rdi<=5;rdi++)
        {
            if($("#recentDefender"+rdi).length<=0)
            {
                $('<span style="display:block" id="recentDefender'+rdi+'">插件预置栏位</span>').appendTo(rd);
            }
        }
        for (var rai=1;rai<=5;rai++)
        {
            if($("#recentAttacker"+rai).length<=0)
            {
                $('<span style="display:block" id="recentAttacker'+rai+'">插件预置栏位</span>').appendTo(ra);
            }
        }
    }

    //给最近输出加上百分比
    unsafeWindow.addRecentHits = function (isAttacker, hits) {
        if (hits.length == 0)
            return;
        var selector;
        if (isAttacker)
            selector = "#recentAttackers";
        else
            selector = "#recentDefenders";

        var newhtmlCode = hits[0].htmlCode;

        var reg = ">[0-9,]+<";
        var r = newhtmlCode.match(reg);
        var norighthitstring = r[r.length - 1].substring(1,r[r.length - 1].length-1);
        var num = parseInt(norighthitstring.replace(/,/g, ''));
        var defenderDamage = parseInt($('#defenderScore').text().replace(/,/g, '').replace(/\xA0/g, ''));
        var attackerDamage = parseInt($('#attackerScore').text().replace(/,/g, '').replace(/\xA0/g, ''));
        var wallValue = Math.abs(defenderDamage - attackerDamage);
        var hitpersentage;
        if (wallValue == 0) hitpersentage = 1000;
        else hitpersentage = num*100/wallValue;
        var persentageColor;
        if (hitpersentage>50) persentageColor = "rgb(100%,"+parseInt(200-hitpersentage*2)+"%,0%)";
        else persentageColor = "rgb("+parseInt(hitpersentage*2)+"%,100%,0%)";
        var hitpersentagecode = "("+"<span style='color:" +persentageColor+"'>"+hitpersentage.toFixed(0)+'%'+"</span>"+")";

        newhtmlCode=newhtmlCode.replace(norighthitstring ,norighthitstring +hitpersentagecode);

        $(selector + " > span:last-child").fadeOut('300', function () {
            $(selector + " > span:last-child").remove();
            $(selector + " > span:nth-child(2)").before("<span style=\"display:block;\"></span>");
            $(selector + " > span:nth-child(2)").animate({}, function () {
                $(selector + " > span:nth-child(2)").append(newhtmlCode);
                $(selector + " > span:nth-child(2) > span").fadeIn('300');
            });

        });
    }
}


function BorderlessBattlePage(){
    GM_addStyle('#newFightView .fightContainer { margin: 0em!important;padding: .3em!important;border-style:none;}');
    GM_addStyle('#newFightView .fightContainer .topPlayer { padding-top: 0px!important;}');
    GM_addStyle('#newFightView .fightContainer .topPlayer a img { margin: 0px auto!important;}');
    GM_addStyle('#newFightView .fightContainer .fightRounds { margin: 0em!important;}');
    GM_addStyle('#newFightView .fightContainer #roundCountdown { font-size: 2.4em!important;margin:0 0!important;}');
    GM_addStyle('#battleSelectable #selectable4, #battleSelectable #selectable5, #battleSelectable #selectable6 { height: 30px!important;}');
    GM_addStyle('#battleSelectable #selectable4 li, #battleSelectable #selectable5 li, #battleSelectable #selectable6 li { height: 30px!important;}');
    GM_addStyle('.laurelssprite { height: 90px!important;}');
    $('i.icon-bread.ui-selectee').remove();
    $('i.icon-gift-2.ui-selectee').remove();
    $('i.icon-uniF470.ui-selectee').remove();
    $('i.icon-tank.ui-selectee').remove();
    var topPlayerItems = $('.topPlayer').children();
    for (var a=0; a<topPlayerItems.length; ++a) {
        if (topPlayerItems[a].outerHTML=="<br>")
        {
            $('.topPlayer')[0].removeChild(topPlayerItems[a]);
        }
    }
    $("#moreBattleStats").parent().remove();
}

//无需确认直接使用医疗包
function addMedkitButton()
{
    var mf = $('#medkitForm');
    if (mf.length >0)
    {
        var medkitButton = $('<button>', {id:'sendMedkitRequest', "class":"button smallhelp foundation-style", text:'无需确认直接使用医疗包（当前页面不会刷新额度显示）'}).prependTo(mf.parent());

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

    if ($('.xflagsBig').length > 0)
    {
        defenderName = $('.xflagsBig:first').attr('class').split(' ').pop();
        defenderName = defenderName.substring(defenderName.indexOf('-') + 1);
        attackerName = $('.xflagsBig:last').attr('class').split(' ').pop();
        attackerName = attackerName.substring(attackerName.indexOf('-') + 1);
    }
    else if ($('.flags-big').length > 0)
    {
        defenderName = $('.flags-big:first').attr('class').split(' ').pop();
        attackerName = $('.flags-big:last').attr('class').split(' ').pop();
    }
    else if ($(".muAvatar").length > 0)
    {
        defenderName = $(".alliesList.leftList.fightFont").text().trim();
        attackerName = $(".alliesList.rightList.fightFont").text().trim();
    }
    else
    {
        defenderName = "未知";
        attackerName = "未知";
    }

    defenderId = countryInfo[defenderName] && countryInfo[defenderName].id;
    attackerId = countryInfo[attackerName] && countryInfo[attackerName].id;
    defenderScore = $('img[src$="/img/blue_ball.png"]').length;
    attackerScore = $('img[src$="/img/red_ball.png"]').length;
    defenderDescription = battleName + ', ' + defenderName + '方';
    attackerDescription = battleName + ', ' + attackerName + '方';
    isActive = roundId>(defenderScore+attackerScore);
    //修正因为服务器发生了奇怪的问题导致的当前局数问题
    if ($("#fightButton1").length>0) isActive=true;

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

    // 修改网页标题
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

    //绑定插件的攻击按钮事件
    unsafeWindow.$(".fightButton").unbind("click");
    $(".fightButton").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var side = $(this)[0].name;
        var value = $(this).attr('value');
        sendFightRequest(side, value);
        return false;
    });

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

}

//发送攻击请求
function sendFightRequest(side, value) {
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
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(XMLHttpRequest.status == "404")
            {
                alert("404错误！点击“确认”立刻刷新网页。");
                location = window.location;
            }
            else
            {
                var showMsg = $("#showMsg");
                if (XMLHttpRequest.status==0) showMsg.text( "错误：请求被中断" );
                else showMsg.text( "错误："+XMLHttpRequest.status );
                showMsg.show();
                showMsg.fadeOut(2000);
            }
        }
    });
}


// 抓取伤害
function showDamege(data) {

    function formatNumber(Num) {
        Num += "";
        var arr = Num.split(".");
        var re = /(\d{1,3})(?=(\d{3})+$)/g;
        return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
    }

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
            damageHistory.prepend($('<div>', {"class":"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                  $('<div>', {"class":"foundation-style small-4 columns foundation-text-right critical", text:damageText.text()}));
        } else {
            damageHistory.prepend($('<div>', {"class":"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                  $('<div>', {"class":"foundation-style small-4 columns foundation-text-right", text:damageText.text()}));
        }

        $('#ehHitsNumber').text( parseInt($('#ehHitsNumber').text()) + xp);
        $('#ehTotalDamage').text( formatNumber(parseInt($('#ehTotalDamage').text().replace(/,/g, '').replace(/\xA0/g, '')) + damage));
    }
    else {
        showMsg.text( $("#fightResponse").text().trim());
        showMsg.fadeOut(2000);
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
        ticketSelect.append($('<option value="' + i + '">Q' + i + '</option>'));
    }
    var ticketSelectSettings = localStorage.getItem("ticketSelectQuality");
    if (ticketSelectSettings !== null)
    {
        ticketSelect.val(ticketSelectSettings);
    }
    ticketSelect.change(function() {
        localStorage.setItem("ticketSelectQuality", ticketSelect.val());
    });

    var flyButton = $('<button>', {text:"飞行", "class":"small button foundation-style", style:"padding:5px; margin:3px;"});

    //刷新攻击框
    var newFightFrameCheckbox = $('<input>', {type:'checkbox', id:'newFightFrameCheckbox'});
    var newFightFrameCheckboxLabel = $("<label>", {"class":"checkboxlabel", "for":"newFightFrameCheckbox", text:'刷新攻击框 ', title:"飞行后不刷新网页，只刷新攻击框"});
    var newFightFrameSettings = localStorage.getItem("newFightFrame");
    if (newFightFrameSettings == null)
    {
        localStorage.setItem("newFightFrame", "false");
    }
    else
    {
        newFightFrameCheckbox.attr("checked", newFightFrameSettings == "true");
    }
    //解锁本地选择、保存设置
    newFightFrameCheckbox.click(function() {
        $("input[type='radio']:disabled", flyForm).removeAttr("disabled");
        if (newFightFrameCheckbox.is(':checked'))
        {
            localStorage.setItem("newFightFrame", true);
        }
        else
        {
            localStorage.setItem("newFightFrame", false);
        }
    });

    var flyInfo = $("<div>");
    middle.append(ticketSelect, flyButton, flyInfo);

    var refreshFightFrameNow = $("<b>", {text:"强制刷新", style:"text-align:right;color:#0066cc;text-decoration:underline;cursor:pointer"});
    refreshFightFrameNow.click(function() {
        flyInfo.text("正在更新...");
        RefreshFightFrame(location);
    });
    middle.append(newFightFrameCheckbox, newFightFrameCheckboxLabel, refreshFightFrameNow);

    var orgFlyForm = $("form[action='travel.html']");
    if( orgFlyForm.length>0 ) //原网页就有飞行框
    {
        //从飞行框获取机票数量
        var tks = orgFlyForm.children(".foundation-text-center").children('select#ticketQuality');
        var pic;
        for (var i = 1; i <= 5; ++i) {
            var q = tks.find('option[value=' + i + ']');
            if (q.length < 1)
            {
                pic = 0;
            }
            else
            {
                pic = q.text().split('(')[1].split(')')[0];
                if (pic.indexOf(',')>0)
                {
                    pic = pic.split(',')[0];
                }
            }
            if (pic !== '') {
                $("#ticketQuality option[value='"+i+"']").text('Q' + i + ' (' + pic + ')');
            }
            else
            {
                $("#ticketQuality option[value='"+i+"']").text('Q' + i + ' (0)');
            }
        }
    }
    else
    {
        //从飞行页获取机票数量
        $.ajax({
            url: "travel.html",
            success: function(data) {
                console.log("获取机票数量成功");
                var tks = $('select#ticketQuality', data);
                var pic;
                for (var i = 1; i <= 5; ++i) {
                    var q = tks.find('option[value=' + i + ']');
                    if (q.length < 1)
                    {
                        pic = 0;
                    }
                    else
                    {
                        pic = q.text().split('(')[1].split(')')[0];
                        if (pic.indexOf(',')>0)
                        {
                            pic = pic.split(',')[0];
                        }
                    }
                    if (pic !== '') {
                        $("#ticketQuality option[value='"+i+"']").text('Q' + i + ' (' + pic + ')');
                    }
                    else
                    {
                        $("#ticketQuality option[value='"+i+"']").text('Q' + i + ' (0)');
                    }
                }
            },
            error: function(xhr,textStatus){
                console.log("获取机票数量失败 (", textStatus, ")，重新抓取");
                $.ajax(this);
            },
        });
    }
    /*
    if ($("#fightButtonBerserk1").length === 0) // 原先不能打
        $('<a>', {href:'battle.html?id='+battleId, id:'ehReload', html:'<i class="icon-search" />刷新页面'}).appendTo($("<div>").insertAfter(flyButton));
    */
    processRegions();
    if( newFightFrameSettings == "true" ) $("input[type='radio']:disabled", flyForm).removeAttr("disabled"); //只刷新攻击框时可以飞自己所在地

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
                if ($("#newFightFrameCheckbox").is(':checked') === true)
                {
                    // --------------------------------------只刷新攻击框--------------------------------------
                    //var e = $("div.testDivred:eq(1)", data);
                    var e = $("div.testDivred", data);
                    if (e.length === 1)
                        flyInfo.text("飞行失败：" + e.text().trim());
                    else {
                        flyInfo.text("飞行成功！更新攻击框中……");
                        RefreshFightFrame(location);

                    }
                    //-----------------------------------------------------------------------------------------
                }
                else
                {
                    //var e = $("div.testDivred:eq(1)", data);
                    var e = $("div.testDivred", data);
                    if (e.length === 1)
                        flyInfo.text("飞行失败：" + e.text().trim());
                    else {
                        flyInfo.text("飞行成功！");
                        if ($("#fightButtonBerserk1").length === 0) { // 原先不能打
                            location = location;
                        }
                    }
                }
            },
            error: function(xhr,textStatus){
                console.log("飞行错误 (", textStatus, ")");
            },
        });
    });

    function RefreshFightFrame(location)
    {
        $.ajax({
            url: location,
            success: function(data) {
                //var frame = $("link[href='//cdn.e-sim.org//css/fight.css']", data).parent();
                var frame = $("#battleRoundId", data).parent();
                //更换攻击框
                if ($("#fightLeft").length>0) //左侧有伤害记录，只需更新fightRight
                {
                    $("#fightRight").empty();
                    $("#fightRight").append(frame.children());
                    // 删除攻击按钮上的图标
                    var fightButtons = $('[id^=fightButton]');
                    var originalFightButtonDiv = fightButtons.parent().parent();
                    $('[id^=fightButton] > i', originalFightButtonDiv).remove();
                }
                else
                {
                    //没有伤害记录，说明没有原来不可以输出
                    //$("link[href='//cdn.e-sim.org//css/fight.css'] :first").parent().replaceWith(frame);
                    $("#battleRoundId").parent().replaceWith(frame);
                    setupFight();
                }
                //更新血量
                var healthUpdated = parseFloat($("#actualHealth", data).html());
                $("#healthProgress .ui-progressbar-value").animate({width: healthUpdated + "%"}, {queue: false});
                $("#healthProgress").attr('title', healthUpdated + ' / 100');
                $("#actualHealth").html(healthUpdated);
                //添加一键吃打
                setupFightButton();
                //修正国旗
                fixFightFlag();
                //更改自动攻击框
                setupAdvancedFightChooseTable("advancedFightChooseTable");
                //替换所在地
                var oldRegions = $('a[href^="region.html?id="][href!="region.html?id="]');
                var oldRegionsFrame = oldRegions.first().parent();
                var newRegions = $('a[href^="region.html?id="][href!="region.html?id="]', data);
                var newRegionsFrame = newRegions.first().parent();
                oldRegionsFrame.replaceWith(newRegionsFrame);
                flyInfo.text("更新完毕！");
                //机票数量就不改了（懒）
            }
        });
    }

}


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

// 战斗放国旗class还没改变，将来可能会改
function fixFightFlag()
{
    //修正战斗方国旗
    $('.flags-medium.'+defenderName).attr("class","xflagsMedium xflagsMedium-"+defenderName);
    $('.flags-medium.'+attackerName).attr("class","xflagsMedium xflagsMedium-"+attackerName);
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

        var regionRadio = $('<input>', {type:"radio", name:"regionId", id:"rR"+position.selector.substring(1,2)+"-"+regionId ,value:regionId, countryId:regionInfo[regionId].occupantId});
        var regionName = '<p class="xflagsSmall xflagsSmall-' + countryInfo[regionInfo[regionId].occupantId].flagName + '" />';
        if (regionInfo[regionId].occupantId != regionInfo[regionId].homeCountry)
            regionName += '(<p class="xflagsSmall xflagsSmall-' + countryInfo[regionInfo[regionId].homeCountry].flagName + '" />)';

        //regionName += '<b> '+ regionInfo[regionId].name + '</b>';
        regionName += '<label for="rR'+position.selector.substring(1,2)+'-'+regionId+'"> '+ regionInfo[regionId].name + '</label>';
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
    function addOneRegionForCountry(position, regionId) {
        var txt = regionInfo[regionId].name;

        var regionRadio = $('<input>', {type:"radio", name:"regionId", id:"rR"+position.selector.substring(1,2)+"-"+regionId ,value:regionId, countryId:regionInfo[regionId].occupantId});
        var regionName = '<p class="xflagsSmall xflagsSmall-' + countryInfo[regionInfo[regionId].occupantId].flagName + '" />';
        if (regionInfo[regionId].occupantId != regionInfo[regionId].homeCountry)
            regionName += '(<p class="xflagsSmall xflagsSmall-' + countryInfo[regionInfo[regionId].homeCountry].flagName + '" />)';

        //regionName += '<b> '+ regionInfo[regionId].name + '</b>';
        regionName += '<label for="rR'+position.selector.substring(1,2)+'-'+regionId+'"> '+ regionInfo[regionId].name + '</label>';
        if (regionInfo[regionId].battle)
            regionName += ' <i title="' + regionInfo[regionId].name + '正在被攻击" class="icon-cannon"></i> ';
        regionName += ' (断路)';
        txt +=  '(断路)';
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

    //不管是不是起义战，防御方只要是相邻区域可能都有加成了
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

    //当进攻方的进攻地掉了之后，显示进攻方所有的所属地
    if (attackRegions.length <= 0)
    {
        for(var r=1;r<parseInt(localStorage.getItem('maxRegionCount'));r++)
        {
            if (regionInfo[r] != undefined)
            {
                if (regionInfo[r].occupantId == attackerId)
                {
                    addOneRegionForCountry($('#attackerRegions'), r);
                }
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

function setupRefresh() {

    // 各种按钮
    var d = $('#ehRefresh');
    var div1 = $('<div>');
    var manualRefresh = $('<button>', {type:'button', "class":'small button foundation-style', id:'manualRefresh', style:'padding:6px;', html:'<i class="icon-search"></i>刷新', title:'刷新双方的总伤害'});
    var autoRefresh = $('<input>', {type:'checkbox', "class":'foundation-style', id:'autoRefresh', text:'自动'});
    var defenderRadio = $('<input>', {type:'radio', id:'copySideDefender', name:'copySide', value:'defender', checked:'checked'});

    var battleName = $('#fightName a[class=fightFont]').text().trim();
    if ($('.fightFlagDefender').length > 0)
    {
        var defenderName = $('.fightFlagDefender').attr('class').split(' ').pop();
        var defenderFlag = $('<p>', {style:"vertical-align:middle;", "class":'xflagsSmall xflagsSmall-'+defenderName.substring(defenderName.indexOf('-') + 1)});
    }
    else if ($('.xflagsBig').length > 0)
    {
        var defenderName = $('.xflagsBig:first').attr('class').split(' ').pop();
        var defenderFlag = $('<p>', {style:"vertical-align:middle;", "class":'xflagsSmall xflagsSmall-'+defenderName.substring(defenderName.indexOf('-') + 1)});
    }
    else if ($('.flags-big').length > 0)
    {
        var defenderFlag = $('<p>', {style:"vertical-align:middle;", "class":'xflagsSmall xflagsSmall-'+$('div.fightFlag.flags-big').first().attr('class').split(' ')[2]});
    }
    else
    {
        var defenderFlag = $('<span>', {style:"vertical-align:middle;", "class":'icon-uniF472'});
    }


    div1.append(manualRefresh, autoRefresh, '自动', defenderRadio, defenderFlag);
    var div2 = $('<div>');
    var manualCopy = $('<button>', {type:'button', "class":'small button foundation-style', id:'manualCopy', style:'padding:6px;', html:'<i class="icon-comment2"></i>复制', title:'复制战场状态到剪贴板'});
    var autoCopy = $('<input>', {type:'checkbox', "class":'foundation-style', id:'autoCopy', text:'自动'});
    var attackerRadio = $('<input>', {type:'radio', id:'copySideAttacker', name:'copySide', value:'attacker'});

    if ($('.fightFlagAttacker').length > 0)
    {
        var attackerName = $('.fightFlagAttacker').attr('class').split(' ').pop();
        var attackerFlag = $('<p>', {style:"vertical-align:middle;", "class":'xflagsSmall xflagsSmall-'+attackerName.substring(attackerName.indexOf('-') + 1)});
    }
    else if ($('.xflagsBig').length > 0)
    {
        var attackerName = $('.xflagsBig:last').attr('class').split(' ').pop();
        var attackerFlag = $('<p>', {style:"vertical-align:middle;", "class":'xflagsSmall xflagsSmall-'+attackerName.substring(attackerName.indexOf('-') + 1)});
    }
    else if ($('.flags-big').length > 0)
    {
        var attackerFlag = $('<p>', {style:"vertical-align:middle;", "class":'xflagsSmall xflagsSmall-'+$('div.fightFlag.flags-big').last().attr('class').split(' ')[2]});
    }
    else
    {
        var attackerFlag = $('<span>', {style:"vertical-align:middle;", "class":'icon-uniF473'});
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
            if (getEhTime()>0) //战场结束
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
    {
        var urlstring = document.URL.match(/.+?battle.html\?id=[0-9]+/).toString();
        if (urlstring.indexOf("https") >= 0)
        {
            report += urlstring + '\n';
            report += urlstring.replace(/https/, "http") + '\n';
        }
        else if (urlstring.indexOf("http") >= 0)
        {
            report += urlstring.replace(/http/, "https") + '\n';
            report += urlstring + '\n';
        }
        else
        {
            report += document.URL.match(/.+?battle.html\?id=[0-9]+/) + '\n';
        }
    }

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


//！！原代码块被admin放入$()中，导致以下function全部无法用unsafeWindow获取
//！！删除动画效果以避免与网页原动画冲突

var latestAttackerId = 0;
var latestDefenderId = 0;
var attackerHits = [];
var defenderHits = [];

function replaceHit(hitDiv, wholeDiv) {
    $(hitDiv).html(wholeDiv);
}

function updateHit(hitDiv, newInfluence, newPlayerName, wholeDiv) {
    if ($(hitDiv + " > div > a").text() == null || ($(hitDiv + " > div > a").text() != newPlayerName && escape($(hitDiv + " > div > a").text()) != '%u2605%20' + newPlayerName)) {
        replaceHit(hitDiv, wholeDiv);
        return;
    }

    if ($(hitDiv + " .hitInfl").text() == newInfluence)
        return;

    $(hitDiv + " .hitInfl").text(newInfluence);
}

function updateBattleHeros(topAttackers, topDefenders) {
    if (topAttackers.length >= 1)
        updateHit("#topAttacker1", topAttackers[0].influence, topAttackers[0].playerName, topAttackers[0].htmlCode);
    if (topAttackers.length >= 2)
        updateHit("#topAttacker2", topAttackers[1].influence, topAttackers[1].playerName, topAttackers[1].htmlCode);
    if (topAttackers.length >= 3)
        updateHit("#topAttacker3", topAttackers[2].influence, topAttackers[2].playerName, topAttackers[2].htmlCode);

    if (topDefenders.length >= 1)
        updateHit("#topDefender1", topDefenders[0].influence, topDefenders[0].playerName, topDefenders[0].htmlCode);
    if (topDefenders.length >= 2)
        updateHit("#topDefender2", topDefenders[1].influence, topDefenders[1].playerName, topDefenders[1].htmlCode);
    if (topDefenders.length >= 3)
        updateHit("#topDefender3", topDefenders[2].influence, topDefenders[2].playerName, topDefenders[2].htmlCode);
}

function replaceTag(selector, data) {
    $(selector).replaceWith(data);
}

function replaceText(selector, data) {
    $(selector).text(data);
}

function updateTop10(top10Attackers, top10Defenders) {

    var n = 1;
    for (n = 1; n < top10Attackers.length; n++) {
        if (n < 3)
            continue;
        var attackerId = $("#top10Attackers" + (n + 1) + " > div").attr('citizenId');
        var attackerInfluence = $("#top10Attackers" + (n + 1) + " > div > b.influenceMarker").text();
        ;
        if (attackerId == null) {
            $("#top10Attackers").append('<span id="top10Attackers' + (n + 1) + '"><b style="float:left;padding: 0 .5em 0 0">' + (n + 1) + '</b><div></div></span><br/>');
            replaceTag("#top10Attackers" + (n + 1) + " > div", top10Attackers[n].htmlCode);
        } else {
            if (attackerId == top10Attackers[n].id) {
                if (attackerInfluence == top10Attackers[n].influence) {
                    // dont do anything
                } else {
                    replaceText("#top10Attackers" + (n + 1) + " > div > b.influenceMarker", top10Attackers[n].influence);
                }
            } else {
                replaceTag("#top10Attackers" + (n + 1) + " > div", top10Attackers[n].htmlCode);
            }
        }
    }


    var n = 1;
    for (n = 1; n < top10Defenders.length; n++) {
        if (n < 3)
            continue;
        var attackerId = $("#top10Defenders" + (n + 1) + " > div").attr('citizenId');
        var attackerInfluence = $("#top10Defenders" + (n + 1) + " > div > b.influenceMarker").text();
        if (attackerId == null) {
            $("#top10Defenders").append('<span id="top10Defenders' + (n + 1) + '"><b style="float:left;padding: 0 .5em 0 0">' + (n + 1) + '</b><div></div></span><br/>');
            replaceTag("#top10Defenders" + (n + 1) + " > div", top10Defenders[n].htmlCode);
        } else {
            if (attackerId == top10Defenders[n].id) {
                if (attackerInfluence == top10Defenders[n].influence) {
                    // dont do anything
                } else {
                    replaceText("#top10Defenders" + (n + 1) + " > div > b.influenceMarker", top10Defenders[n].influence);
                }
            } else {
                replaceTag("#top10Defenders" + (n + 1) + " > div", top10Defenders[n].htmlCode);
            }
        }
    }
}

function updateRecentFighters(recentAttackers, recentDefenders) {
    if (recentAttackers.length >= 1)
        updateHit("#recentAttacker1", recentAttackers[0].influence, recentAttackers[0].playerName, recentAttackers[0].htmlCode);
    if (recentAttackers.length >= 2)
        updateHit("#recentAttacker2", recentAttackers[1].influence, recentAttackers[1].playerName, recentAttackers[1].htmlCode);
    if (recentAttackers.length >= 3)
        updateHit("#recentAttacker3", recentAttackers[2].influence, recentAttackers[2].playerName, recentAttackers[2].htmlCode);
    if (recentAttackers.length >= 4)
        updateHit("#recentAttacker4", recentAttackers[3].influence, recentAttackers[3].playerName, recentAttackers[3].htmlCode);
    if (recentAttackers.length >= 5)
        updateHit("#recentAttacker5", recentAttackers[4].influence, recentAttackers[4].playerName, recentAttackers[4].htmlCode);

    if (recentDefenders.length >= 1)
        updateHit("#recentDefender1", recentDefenders[0].influence, recentDefenders[0].playerName, recentDefenders[0].htmlCode);
    if (recentDefenders.length >= 2)
        updateHit("#recentDefender2", recentDefenders[1].influence, recentDefenders[1].playerName, recentDefenders[1].htmlCode);
    if (recentDefenders.length >= 3)
        updateHit("#recentDefender3", recentDefenders[2].influence, recentDefenders[2].playerName, recentDefenders[2].htmlCode);
    if (recentDefenders.length >= 4)
        updateHit("#recentDefender4", recentDefenders[3].influence, recentDefenders[3].playerName, recentDefenders[3].htmlCode);
    if (recentDefenders.length >= 5)
        updateHit("#recentDefender5", recentDefenders[4].influence, recentDefenders[4].playerName, recentDefenders[4].htmlCode);
}


function addRecentHits(isAttacker, hits) {
    if (hits.length == 0)
        return;
    var selector;
    if (isAttacker)
        selector = "#recentAttackers";
    else
        selector = "#recentDefenders";

    var newhtmlCode = hits[0].htmlCode;

    var reg = ">[0-9,]+<";
    var r = newhtmlCode.match(reg);
    var norighthitstring = r[0].substring(1,r[0].length-1);
    var num = parseInt(norighthitstring.replace(/,/g, ''));
    var defenderDamage = parseInt($('#defenderScore').text().replace(/,/g, '').replace(/\xA0/g, ''));
    var attackerDamage = parseInt($('#attackerScore').text().replace(/,/g, '').replace(/\xA0/g, ''));
    var wallValue = Math.abs(defenderDamage - attackerDamage);
    var hitpersentage;
    if (wallValue == 0) hitpersentage = 1000;
    else hitpersentage = num*100/wallValue;
    var persentageColor;
    if (hitpersentage>50) persentageColor = "rgb(100%,"+parseInt(200-hitpersentage*2)+"%,0%)";
    else persentageColor = "rgb("+parseInt(hitpersentage*2)+"%,100%,0%)";
    var hitpersentagecode = "("+"<span style='color:" +persentageColor+"'>"+hitpersentage.toFixed(0)+'%'+"</span>"+")";

    newhtmlCode=newhtmlCode.replace(norighthitstring ,norighthitstring +hitpersentagecode);

    $(selector + " > span:last-child").fadeOut('300', function () {
        $(selector + " > span:last-child").remove();
        $(selector + " > span:nth-child(2)").before("<span style=\"display:block;\"></span>");
        $(selector + " > span:nth-child(2)").animate({}, function () {
            $(selector + " > span:nth-child(2)").append(newhtmlCode);
            $(selector + " > span:nth-child(2) > span").fadeIn('300');
        });

    });
}

function updatePlace(place) {
    $('.topPlayer a').removeClass();
    if ((place > 0) && (place < 4)) {
        $('.topPlayer a').addClass('laurelssprite gold laurel' + place);
    }
}

function updateTotalDamage(newDamage) {
    if ($('#topPlayerHit').text() != newDamage) {
        $("#topPlayerHit").text(newDamage);
    }
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function updateStatus(attackerScore, defenderScore, remainingTimeInSeconds, percentAttackers) {

    if ($("#attackerScore").text() != attackerScore) {
        $("#attackerScore").text(attackerScore);
    }
    if ($("#defenderScore").text() != defenderScore) {
        $("#defenderScore").text(defenderScore);
    }

    var hours = parseInt(remainingTimeInSeconds / 3600);
    var minutes = parseInt((remainingTimeInSeconds % 3600) / 60);
    var seconds = remainingTimeInSeconds % 60;

    var liftoffTime = new Date();
    liftoffTime.setHours(liftoffTime.getHours() + hours);
    liftoffTime.setMinutes(liftoffTime.getMinutes() + minutes);
    liftoffTime.setSeconds(liftoffTime.getSeconds() + seconds);

    unsafeWindow.$('#roundCountdown').countdown({
        until: liftoffTime,
        compact: true,
        format: 'HMS'
    });

    var percentDefenders = 100.0 - percentAttackers;
    percentDefenders = roundToTwo(percentDefenders);
    percentAttackers = roundToTwo(percentAttackers);
    $("#battleProgress > div").animate({
        width: percentDefenders + '%'
    });

    $("#leftStat").text(percentDefenders + '%');
    $("#rightStat").text(percentAttackers + '%');

    if ($("#defenderPercent").text() != percentDefenders + "%") {
        $("#defenderPercent").text(percentDefenders + "%");
        $("#attackerPercent").text(percentAttackers + "%");
    }

}


function sendUpdateRequest2(showSpectator) {
    var dataString = 'id=' + battleRoundId;
    dataString += '&at=' + userId;
    dataString += '&ci=' + userCitizenshipId;
    if ( isPremium || showSpectator===true ) {  // showSpectator may be undefined, so compare explicitly
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
            updateStatus(msg.attackerScore, msg.defenderScore, msg.remainingTimeInSeconds, msg.percentAttackers);
            adjustTime(msg.remainingTimeInSeconds);
            if (msg.remainingTimeInSeconds<=clutchStandard) {   // 可靠的时间和伤害，记录
                lastUpdatedSeconds = msg.remainingTimeInSeconds<0 ? 0 : msg.remainingTimeInSeconds;
                defenderHistoryClutch.push( [-lastUpdatedSeconds, parseInt(msg.defenderScore.replace(/,/g, '').replace(/\xA0/g, ''))] );
                attackerHistoryClutch.push( [-lastUpdatedSeconds, parseInt(msg.attackerScore.replace(/,/g, '').replace(/\xA0/g, ''))] );
                if (lastUpdatedSeconds>0 && $('#ehDivStatistics').attr('style').indexOf('display:block') != -1) {// visible
                    drawChartClutch();
                }
            }
            updateBattleHeros(msg.topAttackers, msg.topDefenders);
            updateTop10(msg.top10Attackers, msg.top10Defenders);

            if ( showSpectator )  {
                $('#ehTotaldefenders').html(msg.defendersOnline);
                $("#ehTotalattackers").html(msg.attackersOnline);
                $("#ehTotalspectators").html(msg.spectatorsOnline);
                $("#ehDefendersMenu").html(msg.defendersByCountries);
                $("#ehAttackersMenu").html(msg.attackersByCountries);
                $("#ehSpectatorsMenu").html(msg.spectatorsByCountries);
                //点击国家查看该国在线玩家
                $(".countryNameTranslated").attr("onclick","window.open('citizensOnline.html?countryId=' + countryInfo[this.innerText].id);");
            }
            updatePlace(msg.yourPlace);
            updateTotalDamage(msg.totalPlayerDamage);
            for (var i = 0; i < msg.recentAttackers.length; i++) {
                if (msg.recentAttackers[i].id == latestAttackerId) {
                    msg.recentAttackers = msg.recentAttackers.slice(0, i);
                    break;
                }
            }
            for (i = 0; i < msg.recentDefenders.length; i++) {
                if (msg.recentDefenders[i].id == latestDefenderId) {
                    msg.recentDefenders = msg.recentDefenders.slice(0, i);
                    break;
                }
            }

            if (msg.recentAttackers.length !== 0) {
                latestAttackerId = msg.recentAttackers[0].id;
                attackerHits = msg.recentAttackers;
            }
            if (msg.recentDefenders.length !== 0) {
                latestDefenderId = msg.recentDefenders[0].id;
                defenderHits = msg.recentDefenders;
            }
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

    var byTime = {"true":[], "false":[]};
    for (var i=0; i<=minutes; ++i) {
        byTime["true"][i] = 0;
        byTime["false"][i] = 0;
    }
    var byCountry = {"true":{}, "false":{}};
var byMU = {"true":{}, "false":{}};
var byCitizen = {"true":{}, "false":{}};
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
d[0] = byTime["true"][0];
a[0] = byTime["false"][0];
for (i=1; i<=minutes; ++i) {
    d[i] = d[i-1] + byTime["true"][i];
    a[i] = a[i-1] + byTime["false"][i];
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
byTime = {"true":[], "false":[]};
for (i=0; i<=seconds; ++i) {
    byTime["true"][i] = 0;
    byTime["false"][i] = 0;
}
var byCitizen = {"true":{}, "false":{}};

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

var currentD = byTime["true"][seconds];
var currentA = byTime["false"][seconds];
d = [[-seconds, currentD]];
a = [[-seconds, currentA]];
for (i=seconds-1; i>=0; --i) {
    currentD += byTime["true"][i];
    currentA += byTime["false"][i];
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
fillCitizenTable(byCitizen["true"], $('#ehTableClutchDefenders'));
fillCitizenTable(byCitizen["false"], $('#ehTableClutchAttackers'));

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
        //$('<div>', {"class":'flags-small ' + countryInfo[one.citizenship].flagName}).appendTo(td);
        $('<div>', {"class":'xflagsSmall xflagsSmall-' + countryInfo[one.citizenship].flagName}).appendTo(td);
        if (citizenPage[one.citizenId]) { // 有头像信息
            $('<img>', {align:'absmiddle', "class":'smallAvatar', src:citizenPage[one.citizenId].avatar.replace('normal', 'small')}).appendTo(td);
        }
        else {
            $('<img>', {align:'absmiddle', "class":'smallAvatar', src:'//cdn.e-sim.org/img/blank-avatar.png'}).appendTo(td);
        }
        $('<a>', {"class":'profileLink', href:'profile.html?id=' + one.citizenId, text:citizenInfo[one.citizenId] ? citizenInfo[one.citizenId].login : '???'}).appendTo(td);
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
        $('<div>', {id:'ehTableClutchDefenders', "class":'foundation-style small-5 columns'}).appendTo($('#ehDivStatistics'));
        $('<div>', {id:'ehTableClutchAttackers', "class":'foundation-style small-5 columns'}).appendTo($('#ehDivStatistics'));

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


function setupSpecial() {
    var SpecialDiv = $('#ehDivSpecial');
    var stable = $("<table>", {style:"width:100%;line-height:1px;"}).appendTo(SpecialDiv);

    //网页请求状态
    var str = $("<tr>").appendTo(stable);
    var std = $("<td>").appendTo(str);
    var AjaxStat = $("<p>", {"class":"AjaxStat" ,text:"准备中……"}).appendTo(std);
    function UpdateAjaxStat()
    {
        var AjaxsLoop = ajaxs.length;
        for(var i=0; i < AjaxsLoop; i++){
            if((ajaxs[i].readyState == 4) || (ajaxs[i].readyState == 0)){
                ajaxs.splice( i, 1 );
                i = i - 1;
                AjaxsLoop = AjaxsLoop - 1;
            }
        }
        AjaxsLoop = ajaxs.length;
        if(AjaxsLoop<=0)
        {
            AjaxStat.text("当前网页共有"+AjaxsLoop+"个未完成请求，网络畅通。");
        }
        else if(AjaxsLoop<6)
        {
            AjaxStat.text("当前网页共有"+AjaxsLoop+"个未完成请求，网络畅通。");
        }
        else
        {
            AjaxStat.text("当前网页共有"+AjaxsLoop+"个未完成请求，网络堵塞，后续请求无法立即响应。");
            if (($("#AutoAbortAllAjax").is(":checked")) && (AjaxsLoop>10)) abortAll();
        }
    }
    setInterval(UpdateAjaxStat,3000);

    str = $("<tr>").appendTo(stable);
    std = $("<td>").appendTo(str);
    var cancelAllAjaxButton = $('<button>', {text:"终止所有未完成请求", "class":"small button foundation-style"}).appendTo(std);
    cancelAllAjaxButton.click(function() {
        abortAll();
    });
    addCheckBoxSettingFrame(std, "AutoAbortAllAjax", "自动清理请求", "AutoAbortAllAjax", false);


    //设置军令
    function setMuOrder(orderBattleID, orderIsAttacker)
    {
        var dataString = 'action=SET_ORDERS&battleId='+orderBattleID+"_"+orderIsAttacker.toString();
        $.ajax({
            type: "POST",
            url: "militaryUnitsActions.html",
            data: dataString,
            success: function(data) {
                $(".orderStat").text("设置军令成功！");
            },
            error : function(xhr) {
                $("#setMuOrderToDefender").attr("disabled",false);
                $("#setMuOrderToAttacker").attr("disabled",false);
                $(".orderStat").text("设置军令失败，请重试。");
            }
        });
    }

    function CheckMuOrder(orderBattleID, orderIsAttacker)
    {
        $.ajax({
            url : 'myMilitaryUnit.html',
            type : 'GET',
            dataType : 'html',
            success : function (data) {
                if (data != null) {
                    var orderButton = $("#orderButton", data);
                    if (orderButton.length > 0)
                    {
                        var orderOptionSelect = $("option[value="+orderBattleID+"_"+orderIsAttacker.toString()+"]", data); //应该有2个
                        if (orderOptionSelect.length > 0)
                        {
                            setMuOrder(orderBattleID, orderIsAttacker);
                        }
                        else
                        {
                            $(".orderStat").text("无法设置军令给当前战场。");
                        }
                    }
                    else
                    {
                        //检查当前军令
                        var flag, order = $(data).find(".battleDiv:first > div:eq(3) a[href^='battle.html?id=']:first");
                        var flagNumber = $('.battleDiv:first .xflagsMedium', data).length;
                        if (0 < order.length && flagNumber === 2) // 有军令和2个旗子 (3个旗子表示战斗已结束)
                        {
                            flag = $(data).find(".battleDiv:first").parent().parent().find(".xflagsMedium:last");
                            if (0 < flag.length)
                                $(".orderStat").text("无法设置军令，当前军令：" + order.text() + "，" + getCountryFormXflagsClass(flag.attr("class")) + "方。");
                        }
                        else {
                            $(".orderStat").text("当前你无法设置任何军令。");
                        }
                    }
                }
                else
                {
                    $("#setMuOrderToDefender").attr("disabled",false);
                    $("#setMuOrderToAttacker").attr("disabled",false);
                    $(".orderStat").text("获取网页失败，请重试。");
                }
            },
            error : function(xhr) {
                $("#setMuOrderToDefender").attr("disabled",false);
                $("#setMuOrderToAttacker").attr("disabled",false);
                $(".orderStat").text("获取网页失败，请重试。");
            }
        });
    }

    var orderStat = $("<p>", {"class":"orderStat" ,text:"设置军令"}).appendTo(SpecialDiv);
    stable = $("<table>", {style:"width:100%;line-height:1px;"}).appendTo(SpecialDiv);
    str = $("<tr>").appendTo(stable);
    std = $("<td>").appendTo(str);

    var setMuOrderToDefender = $('<button>', {id:"setMuOrderToDefender", text:"设置军令到防守方("+defenderName+")", "class":"small button foundation-style"}).appendTo(std);
    $("<p>", {style:"vertical-align:middle;", "class":"xflagsSmall xflagsSmall-" + defenderName}).appendTo(setMuOrderToDefender);
    std = $("<td>").appendTo(str);
    var setMuOrderToAttacker = $('<button>', {id:"setMuOrderToAttacker", text:"设置军令到进攻方("+attackerName+")", "class":"small button foundation-style"}).appendTo(std);
    $("<p>", {style:"vertical-align:middle;", "class":"xflagsSmall xflagsSmall-" + attackerName}).appendTo(setMuOrderToAttacker);
    setMuOrderToDefender.click(function() {
        setMuOrderToDefender.attr("disabled",true);
        setMuOrderToAttacker.attr("disabled",true);
        CheckMuOrder(GetQueryString("id"), false);
    });
    setMuOrderToAttacker.click(function() {
        setMuOrderToDefender.attr("disabled",true);
        setMuOrderToAttacker.attr("disabled",true);
        CheckMuOrder(GetQueryString("id"), true)
    });

}



//---------------------------------------自动压秒---------------------------------------

var setupAdvancedIsAutoFighting = false;
function setupAdvancedFightChooseTable(tableClass) {
    var pretable = $("."+tableClass);
    if (pretable.length>0)
    {
        pretable.remove();
    }

    var defenderSideName = "defender";
    var attackerSideName = "attacker";
    var noSideName = "side";

    var hitValue = "undefined";
    var berserkValue = "Berserk";

    var fightChooseTable = $("<table>", {"class":tableClass, style:"width:100%;line-height:1px;"});
    var tr = $("<tr>", {style:"background-color:DarkSlateGray;", height:"30px"}).appendTo(fightChooseTable);
    var td = $("<td>").appendTo(tr); //1
    $("<span>输出选择：</span>").appendTo(td);

    if ($("#fightButton2").length>0)
    {
        //2边
        td = $("<td>").appendTo(tr);//2
        $("<span>防守方：</span>").appendTo(td);
        var AFHitStyleLeftHit = $("<input>", {type:"radio", id:"AFHitStyleLeftHit", name:"AFHitStyle", "data-AFSide":defenderSideName, "data-AFValue":hitValue}).appendTo(td);
        var AFHitStyleLeftHitLabel = $("<label>", {"class":"checkboxlabel", "for":"AFHitStyleLeftHit", text:"打一下"}).appendTo(td);
        var AFHitStyleLeftBerserk = $("<input>", {type:"radio", id:"AFHitStyleLeftBerserk", name:"AFHitStyle", "data-AFSide":defenderSideName, "data-AFValue":berserkValue}).appendTo(td);
        var AFHitStyleLeftBerserkLabel = $("<label>", {"class":"checkboxlabel", "for":"AFHitStyleLeftBerserk", text:"打五下"}).appendTo(td);
        td = $("<td>").appendTo(tr);//3
        $("<span>进攻方：</span>").appendTo(td);
        var AFHitStyleRightHit = $("<input>", {type:"radio", id:"AFHitStyleRightHit", name:"AFHitStyle", "data-AFSide":attackerSideName, "data-AFValue":hitValue}).appendTo(td);
        var AFHitStyleRightHitLabel = $("<label>", {"class":"checkboxlabel", "for":"AFHitStyleRightHit", text:"打一下"}).appendTo(td);
        var AFHitStyleRightBerserk = $("<input>", {type:"radio", id:"AFHitStyleRightBerserk", name:"AFHitStyle", "data-AFSide":attackerSideName, "data-AFValue":berserkValue}).appendTo(td);
        var AFHitStyleRightBerserkLabel = $("<label>", {"class":"checkboxlabel", "for":"AFHitStyleRightBerserk", text:"打五下"}).appendTo(td);

    }
    else if ($("#fightButton1").length>0)
    {
        //1边
        //td = $("<td>").appendTo(tr);//2
        td = $("<td>").appendTo(tr);//3
        var AFHitStyleHit = $("<input>", {type:"radio", id:"AFHitStyleHit", name:"AFHitStyle", "data-AFSide":noSideName, "data-AFValue":hitValue}).appendTo(td);
        var AFHitStyleHitLabel = $("<label>", {"class":"checkboxlabel", "for":"AFHitStyleHit", text:"打一下"}).appendTo(td);
        var AFHitStyleBerserk = $("<input>", {type:"radio", id:"AFHitStyleBerserk", name:"AFHitStyle", checked:"checked", "data-AFSide":noSideName, "data-AFValue":berserkValue}).appendTo(td);
        var AFHitStyleBerserkLabel = $("<label>", {"class":"checkboxlabel", "for":"AFHitStyleBerserk", text:"打五下"}).appendTo(td);
    }
    else
    {
        td = $("<td>").appendTo(tr);//2
        $("<span>当前所在地无法输出</span>").appendTo(td);
        //td = $("<td>").appendTo(tr);//3
    }
    //$("<td>").appendTo(tr);//4

    $(".setupAdvancedTable").after(fightChooseTable);
}




function setupAdvanced() {

    var AdvancedDiv = $('#ehDivAdvanced');

    var advancedStat = $("<p>", {"class":"advancedStat" ,text:"使用自动打枪有可能受到封号惩罚。使用前你必须清楚其原理作用和可能产生的后果。"}).appendTo(AdvancedDiv);
    function ShowStat(s)
    {
        advancedStat.text(s);
    }

    var IsAutoFighting = false;

    var AFStartTimer; //指定开始时间用

    var varAFNowTotalDamage = 0; //总伤害
    var varAFNowHitCount = 0; //攻击次数
    var varAFNowSpendTime = 0; //压秒用时
    var StartDateTime; //开始压秒时间

    function AFResetStat()
    {
        varAFNowTotalDamage = 0; //总伤害
        varAFNowHitCount = 0; //攻击次数
        varAFNowSpendTime = 0; //压秒用时
    }
    function getRandomInt(min, max)//返回随机数范围包含min，不包含max
    {
        var Interval = max - min;
        var num = Math.random() * Interval + min;
        num = parseInt(num, 10);
        return num;
    }

    var AFAjaxs = [];

    createAdvancedFrame();

    function createAdvancedFrame()
    {
        var AFDiv = $('<div>',{"class":'foundation-style small-10 columns foundation-text-center'}).appendTo(AdvancedDiv);
        var AFAutoFightTable = $('<table>', {align:'right'}).appendTo(AFDiv);
        var AFManualStart = $('<button>', {type:'button', "class":'small button foundation-style', id:'AFManualStart', text:"开始自动打枪"}).appendTo(AFAutoFightTable);
        AFManualStart.attr("disabled",true);
        var AFStopButton = $('<button>', {type:'button', "class":'small button foundation-style', id:'AFStopButton', text:"停止自动打枪"}).appendTo(AFAutoFightTable);
        AFStopButton.attr("disabled",true);

        var atable = $("<table>", {"class":"setupAdvancedTable", style:"width:100%;line-height:1px;height:200px;"}).appendTo(AdvancedDiv);

        var tr;
        var td;

        tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(atable);

        td = $("<td>", {width:"25%"}).appendTo(tr);
        $("<span>补充额度顺序：</span>").appendTo(td);

        td = $("<td>", {width:"25%"}).appendTo(tr);
        addSelectSettingFrame(td, "优先：", [0, 1, 2], ["无","食物","礼物"], "AFRestoreHealth1", 2);

        td = $("<td>", {width:"25%"}).appendTo(tr);
        addSelectSettingFrame(td, "其次：", [0, 1, 2], ["无","食物","礼物"], "AFRestoreHealth2", 1);

        td = $("<td>", {width:"25%"}).appendTo(tr);

        tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(atable);

        td = $("<td>").appendTo(tr);

        td = $("<td>").appendTo(tr);
        addSelectSettingFrame(td, "使用食物：", [1, 2, 3, 4, 5], ["Q1","Q2","Q3","Q4","Q5"], "AFHitUseFood", 5);

        td = $("<td>").appendTo(tr);
        addSelectSettingFrame(td, "使用礼物：", [1, 2, 3, 4, 5], ["Q1","Q2","Q3","Q4","Q5"], "AFHitUseGift", 5);

        td = $("<td>").appendTo(tr);
        addSelectSettingFrame(td, "使用武器：", [0, 1, 2, 3, 4, 5], ["Q0","Q1","Q2","Q3","Q4","Q5"], "AFHitUseWeapon", 1);

        tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(atable);

        td = $("<td>").appendTo(tr);
        addCheckBoxSettingFrame(td, "AFRestrictHitCount", "限制攻击次数：", "AFRestrictHitCount", false);
        $("<span>最多</span>").appendTo(td);
        addTextboxSettingFrame(td, 60, "AFRestrictHitCountTextbox", "15");
        $("<span>次攻击</span>").appendTo(td);


        td = $("<td>").appendTo(tr);
        addCheckBoxSettingFrame(td, "AFRestrictDamage", "限制伤害：", "AFRestrictDamage", false);
        $("<span>总伤害超过</span>").appendTo(td);
        addTextboxSettingFrame(td, 60, "AFRestrictDamageTextbox", "1000000");
        $("<span>后停止</span>").appendTo(td);

        td = $("<td>").appendTo(tr);
        addCheckBoxSettingFrame(td, "AFRestrictTime", "限制时间：", "AFRestrictTime", false);
        $("<span>自动打枪</span>").appendTo(td);
        addTextboxSettingFrame(td, 60, "AFRestrictTimeTextbox", "10");
        $("<span>秒后停止</span>").appendTo(td);

        td = $("<td>").appendTo(tr);


        tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(atable);

        td = $("<td>").appendTo(tr);
        var AFStartModeAuto = $("<input>", {type:"radio", id:"AFStartModeAuto", name:"AFSelectStartMode", "data-startmode":"auto"}).appendTo(td);
        var AFStartModeAutoLabel = $("<label>", {"class":"checkboxlabel", "for":"AFStartModeAuto", text:"自动开始："}).appendTo(td);
        $("<span>在S</span>").appendTo(td);
        addTextboxSettingFrame(td, 40, "AFStartModeAutoStartTextbox", "15");
        $("<span>到S</span>").appendTo(td);
        addTextboxSettingFrame(td, 40, "AFStartModeAutoEndTextbox", "10");
        $("<span>之间任意时间</span>").appendTo(td);

        td = $("<td>").appendTo(tr);
        var AFStartModeManual = $("<input>", {type:"radio", id:"AFStartModeManual", name:"AFSelectStartMode", "data-startmode":"manual"}).appendTo(td);
        var AFStartModeManualLabel = $("<label>", {"class":"checkboxlabel", "for":"AFStartModeManual", text:"手动开始"}).appendTo(td);

        var AFStartModeSettings = localStorage.getItem("AFStartModeSettings");
        if (AFStartModeSettings === null)
        {
            //设置为默认值
            localStorage.setItem("AFStartModeSettings", "1");
            AFStartModeManual.attr("checked",true);
        }
        else
        {
            if (AFStartModeSettings == "0")
            {
                AFStartModeAuto.attr("checked",true);
            }
            else
            {
                AFStartModeManual.attr("checked",true);
            }
        }
        AFStartModeAuto.change(function() {
            if (AFStartModeAuto.is(":checked"))
            {
                localStorage.setItem("AFStartModeSettings", "0");
            }
            else
            {
                localStorage.setItem("AFStartModeSettings", "1");
            }
        });
        AFStartModeManual.change(function() {
            if (AFStartModeManual.is(":checked"))
            {
                localStorage.setItem("AFStartModeSettings", "1");
            }
            else
            {
                localStorage.setItem("AFStartModeSettings", "0");
            }
        });

        td = $("<td>").appendTo(tr);
        /*
        var AFStartModeAI = $("<input>", {type:"radio", id:"AFStartModeAI", name:"AFSelectStartMode"}).appendTo(td);
        var AFStartModeAILabel = $("<label>", {"class":"checkboxlabel", "for":"AFStartModeAI", text:"自动根据墙高和自身伤害开始压秒（测试）"}).appendTo(td);
        */
        td = $("<td>").appendTo(tr);
        /*
        $("<span>平均伤害：</span>").appendTo(td);
        var AFAverageDamage = $("<span>", {id:"AFAverageDamage"}).appendTo(td);
        if (true)
        {
            $("<span> 将在S</span>").appendTo(td);
            var AFAIStartHitTime = $("<span>", {id:"AFAIStartHitTime"}).appendTo(td);
            $("<span>时压秒</span>").appendTo(td);
        }
        */

        tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(atable);

        td = $("<td>").appendTo(tr);
        $("<span>每次攻击间隔（毫秒）：</span>").appendTo(td);
        td = $("<td>").appendTo(tr);
        addTextboxSettingFrame(td, 60, "AFIntervalStart", "500");
        $("<span>到</span>").appendTo(td);
        addTextboxSettingFrame(td, 60, "AFIntervalEnd", "1500");
        td = $("<td>").appendTo(tr);
        $("<span>未响应请求允许数量：</span>").appendTo(td);
        td = $("<td>").appendTo(tr);
        addTextboxSettingFrame(td, 60, "AFMaxNotRespondRequest", "12");


        /*
        tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(atable);

        td = $("<td>").appendTo(tr);
        addCheckBoxSettingFrame(td, "AFAutoFresh", "战场结束后自动刷新（制作中）", "AFAutoFresh", false);
        td = $("<td>").appendTo(tr);
        td = $("<td>").appendTo(tr);
        td = $("<td>").appendTo(tr);
        var AFConfirmButton = $('<button>', {type:'button', "class":'small button foundation-style', id:'AFConfirmButton', text:"检查当前状态"}).appendTo(td);
        */

        /*
        var AFDamageCheckTable =  $('<table>', {align:'left'}).appendTo(AdvancedDiv);
        tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(AFDamageCheckTable);

        td = $("<td>").appendTo(tr);
        $("<span>使用 Q</span>").appendTo(td);
        var AFDamageCheckWeapon = $("<span>", {id:"AFDamageCheckWeapon"}).appendTo(td); //武器等级，从网页获取
        $("<span> 进行 </span>").appendTo(td);
        var AFDamageCheckCount = $("<input>", {type:"text", style:"width:60px;", id:"AFDamageCheckCountTextbox"}).appendTo(td);
        $("<span> 次 </span>").appendTo(td);
        var AFDamageCheckType = $("<span>", {id:"AFDamageCheckType"}).appendTo(td); //单发/五连，从表格获取

        td = $("<td>").appendTo(tr);
        $("<span> 模拟伤害： </span>").appendTo(td);
        var AFSimulateAverageDamage = $("<span>", {id:"AFSimulateAverageDamage"}).appendTo(td);
        */

        var AFStateTable = $('<table>', {align:'right'}).appendTo(AdvancedDiv);
        tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(AFStateTable);

        td = $("<td>").appendTo(tr);
        $("<span>总伤害： </span>").appendTo(td);
        var AFNowTotalDamage = $("<span>", {id:"AFNowTotalDamage"}).appendTo(td);

        td = $("<td>").appendTo(tr);
        $("<span>攻击次数： </span>").appendTo(td);
        var AFNowHitCount = $("<span>", {id:"AFNowHitCount"}).appendTo(td);
        $("<span> 次</span>").appendTo(td);

        td = $("<td>").appendTo(tr);
        $("<span>攻击用时： </span>").appendTo(td);
        var AFNowSpendTime = $("<span>", {id:"AFNowSpendTime"}).appendTo(td);
        $("<span> 秒</span>").appendTo(td);

        /*
        td = $("<td>").appendTo(tr);
        $("<span>当前射速：</span>").appendTo(td);
        var AFNowSpeed = $("<span>", {id:"AFNowSpeed"}).appendTo(td);
        $("<span> 次/秒</span>").appendTo(td);
        */

        td = $("<td>").appendTo(tr);
        $("<span>未完成请求：</span>").appendTo(td);
        var AFAjaxCount = $("<span>", {id:"AFAjaxCount"}).appendTo(td);
        $("<span> 次</span>").appendTo(td);

        setupAdvancedFightChooseTable("advancedFightChooseTable");

        AFManualStart.attr("disabled",false);

        AFManualStart.click(function() {
            var StartModeCheckedRadio = $("input[name='AFSelectStartMode']:checked");
            if (StartModeCheckedRadio.length<=0)
            {
                ShowStat("未选择开始方式");
            }
            else
            {
                AFManualStart.attr("disabled",true);
                AFStopButton.attr("disabled",false);
                if (StartModeCheckedRadio.attr("data-startmode") == "auto")
                {
                    var AFStartTime = getRandomInt( parseInt( $("#AFStartModeAutoStartTextbox").val() ), parseInt( $("#AFStartModeAutoEndTextbox").val() ) );
                    if (getEhTime() <= AFStartTime)
                    {
                        ShowStat("当前时间已经超过预定时间");
                        AFManualStart.attr("disabled",false);
                        AFStopButton.attr("disabled",true);
                    }
                    else
                    {
                        ShowStat("预订于剩余 "+ AFStartTime+" 秒时开始自动攻击");
                        AFStartTimer = setInterval(function() {
                            if (getEhTime() <= AFStartTime)
                            {
                                clearInterval(AFStartTimer);
                                StartDateTime = new Date();
                                IsAutoFighting = true;
                                AFResetStat();
                                AFHitAndUpdate( parseInt( $("#AFIntervalStart").val() ), parseInt( $("#AFIntervalEnd").val() ) );
                            }
                        }, 1000);
                    }
                }
                else
                {
                    StartDateTime = new Date();
                    IsAutoFighting = true;
                    AFResetStat();
                    AFHitAndUpdate( parseInt( $("#AFIntervalStart").val() ), parseInt( $("#AFIntervalEnd").val() ) );
                }
            }
        });

        AFStopButton.click(function() {
            AFManualStart.attr("disabled",false);
            AFStopButton.attr("disabled",true);
            var StartModeCheckedRadio = $("input[name='AFSelectStartMode']:checked");
            if (StartModeCheckedRadio.attr("data-startmode") == "auto")
            {
                if (AFStartTimer != undefined)
                {
                    ShowStat("停止计时");
                    clearInterval(AFStartTimer);
                }
                else
                {
                    ShowStat("停止攻击");
                    IsAutoFighting = false;
                }
            }
            else
            {
                ShowStat("停止攻击");
                IsAutoFighting = false;
            }
        });
    }

    function AFHitAndUpdate(smin, smax) {

        $("#AFNowTotalDamage").text(varAFNowTotalDamage);
        $("#AFNowHitCount").text(varAFNowHitCount);
        varAFNowSpendTime = parseInt(new Date() - StartDateTime) / 1000;
        $("#AFNowSpendTime").text(varAFNowSpendTime);
        var AFAjaxsLoop = AFAjaxs.length;
        for(var i=0; i < AFAjaxsLoop; i++){
            if((AFAjaxs[i].readyState == 4) || (AFAjaxs[i].readyState == 0)){
                AFAjaxs.splice( i, 1 );
                i = i - 1;
                AFAjaxsLoop = AFAjaxsLoop - 1;
            }
        }
        $("#AFAjaxCount").text(AFAjaxs.length);
        if (AFAjaxsLoop> parseInt( $("#AFMaxNotRespondRequest").val() ))
        {
            abortAll();
            AFAjaxs = [];
        }

        if (IsAutoFighting==true)
        {
            if(getEhTime()<=0)
            {
                ShowStat("回合结束，停止攻击");
                IsAutoFighting = false;
                $("#AFManualStart").attr("disabled",false);
                $("#AFStopButton").attr("disabled",true);
                return;
            }

            if($("#AFRestrictHitCount").is(":checked") && (varAFNowHitCount >= parseInt($("#AFRestrictHitCountTextbox").val())))
            {
                ShowStat("攻击次数超限，停止攻击");
                IsAutoFighting = false;
                $("#AFManualStart").attr("disabled",false);
                $("#AFStopButton").attr("disabled",true);
                return;
            }
            if($("#AFRestrictDamage").is(":checked") && (varAFNowTotalDamage >= parseInt($("#AFRestrictDamageTextbox").val())))
            {
                ShowStat("总伤害超限，停止攻击");
                IsAutoFighting = false;
                $("#AFManualStart").attr("disabled",false);
                $("#AFStopButton").attr("disabled",true);
                return;
            }
            if($("#AFRestrictTime").is(":checked") && (varAFNowSpendTime >= parseInt($("#AFRestrictTimeTextbox").val())))
            {
                ShowStat("时间超限，停止攻击");
                IsAutoFighting = false;
                $("#AFManualStart").attr("disabled",false);
                $("#AFStopButton").attr("disabled",true);
                return;
            }

            if (AFHitOnce()==false)
            {
                IsAutoFighting = false;
                $("#AFManualStart").attr("disabled",false);
                $("#AFStopButton").attr("disabled",true);
                return;
            }

            var timeOutTime = getRandomInt(smin, smax);
            ShowStat(timeOutTime+"毫秒后输出");
            setTimeout(function() { AFHitAndUpdate(smin, smax)}, timeOutTime);
        }
        else
        {
            $("#AFManualStart").attr("disabled",false);
            $("#AFStopButton").attr("disabled",true);
            return;
        }
    }


    function showDamegeByAutoFight(data) {

        function formatNumber(Num) {
            Num += "";
            var arr = Num.split(".");
            var re = /(\d{1,3})(?=(\d{3})+$)/g;
            return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
        }

        var showMsg = $("#showMsg");
        showMsg.text("");
        showMsg.show();
        var damageText = $('#DamageDone', data);

        if (damageText.length >0) {
            var damage = parseInt( damageText.text().replace(/,/g, '').replace(/\xA0/g, '') );
            varAFNowTotalDamage += damage;
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
            varAFNowHitCount += xp;

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
                damageHistory.prepend($('<div>', {"class":"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                      $('<div>', {"class":"foundation-style small-4 columns foundation-text-right critical", text:damageText.text()}));
            } else {
                damageHistory.prepend($('<div>', {"class":"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                      $('<div>', {"class":"foundation-style small-4 columns foundation-text-right", text:damageText.text()}));
            }

            $('#ehHitsNumber').text( parseInt($('#ehHitsNumber').text()) + xp);
            $('#ehTotalDamage').text( formatNumber(parseInt($('#ehTotalDamage').text().replace(/,/g, '').replace(/\xA0/g, '')) + damage));
        }
        else {
            showMsg.text( $("#fightResponse").text().trim());
            showMsg.fadeOut(2000);
        }
    }

    function AFUpdateCitizenStatus(msg) {
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

    function AFSendFightRequest(side, value)
    {
        var wq = $("#AFHitUseWeapon").val()
        if (wq < 0 ) return;
        var dataString = 'weaponQuality=' + wq + '&battleRoundId=' + $("#battleRoundId").val() + '&side=' + side + '&value=' + value;
        var ajax = $.ajax({
            type: "POST",
            url: "fight.html",
            data: dataString,
            success: function(msg) {
                $('#fightResponse > div').replaceWith(msg);
                showDamegeByAutoFight($(msg));
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
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                var showMsg = $("#showMsg");
                showMsg.text( "错误："+XMLHttpRequest.status );
                showMsg.show();
                showMsg.fadeOut(2000);
            }
        });
        AFAjaxs.push(ajax);
    }

    function AFSendEatRequest()
    {
        var fq = $("#AFHitUseFood").val()
        if (fq <= 0 ) return;
        var dataString = 'quality=' + fq;
        var ajax = $.ajax({
            type: "POST",
            url: "eat.html",
            data: dataString,
            success: function(msg) {
                AFUpdateCitizenStatus(msg);
            }
        });
        AFAjaxs.push(ajax);
    }

    function AFSendGiftRequest()
    {
        var gq = $("#AFHitUseGift").val()
        if (gq <= 0 ) return;
        var dataString = 'quality=' + gq;
        var ajax = $.ajax({
            type: "POST",
            url: "gift.html",
            data: dataString,
            success: function(msg) {
                AFUpdateCitizenStatus(msg);
            }
        });
        AFAjaxs.push(ajax);
    }

    function AFCheckAndEat(IsFood)
    {
        if (IsFood)
        {
            var foodLimit = parseInt($("#foodLimit2").text());
            if (foodLimit>0)
            {
                var foodQuality = parseInt($("#AFHitUseFood").val());
                var foodCount = parseInt($("span#sfoodQ"+foodQuality)[0].childNodes[2].nodeValue);
                if (foodCount>0)
                {
                    AFSendEatRequest();
                    return true;
                }
                else
                {
                    //食物不足
                    ShowStat("食物不足");
                    return false;
                }
            }
            else
            {
                //食物额度不足
                ShowStat("食物额度不足");
                return false;
            }
        }
        else
        {
            var giftLimit = parseInt($("#giftLimit2").text());
            if (giftLimit>0)
            {
                var giftQuality = parseInt($("#AFHitUseGift").val());
                var giftCount = parseInt($("span#sgiftQ"+giftQuality)[0].childNodes[2].nodeValue);
                if (giftCount>0)
                {
                    AFSendGiftRequest();
                    return true;
                }
                else
                {
                    //礼物不足
                    ShowStat("礼物不足");
                    return false;
                }
            }
            else
            {
                //礼物额度不足
                ShowStat("礼物额度不足");
                return false;
            }
        }
    }

    function AFCheckAndRestoreHealth()
    {
        var rh1 = $("#AFRestoreHealth1").val();
        var rh2 = $("#AFRestoreHealth2").val();
        if (rh1 == 1)
        {
            if (!AFCheckAndEat(true))
            {
                if (rh2 == 2)
                {
                    return AFCheckAndEat(false);
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return true;
            }
        }
        else if (rh1 == 2)
        {
            if (!AFCheckAndEat(false))
            {
                if (rh2 == 1)
                {
                    return AFCheckAndEat(true);
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return true;
            }
        }
        else
        {
            ShowStat("补充体力选择错误");
            return false;
        }
    }

    function AFHitOnce()
    {
        var checkedRadio = $("input[name='AFHitStyle']:checked");
        var side = checkedRadio.attr('data-AFSide');
        var value = checkedRadio.attr('data-AFValue');
        //检查体力
        if (parseFloat($("#actualHealth").html())<= 50)
        {
            //需要补充额度
            if (!AFCheckAndRestoreHealth())
            {
                //ShowStat("无法补充体力");
                return false;
            }
        }
        //检查武器
        var weaponQuality = parseInt($("#AFHitUseWeapon").val());
        if (weaponQuality>0)
        {
            var weaponCount = parseInt($("span#Q"+weaponQuality+"WeaponStock").text());
            if (((value == "undefined") && (weaponCount <= 0)) || ((value == "Berserk") && (weaponCount < 5)))
            {
                ShowStat("武器不足");
                return false;
            }
        }
        //攻击一次
        if (checkedRadio.length <= 0)
        {
            ShowStat("未选择输出方");
            return false;
        }
        AFSendFightRequest(side, value);
    }

}

//---------------------------------------------------------------------------------------

function setupSpectator() {
    if (!isActive) {
        $('#ehButtonSpectator').attr('disabled', true);
        return;
    }
    var d = $('#ehDivSpectator');
    if (isPremium) {
        //删除会员原观战框，新建和非会员一样的观战框
        $(".battleMonitorDiv").remove();
        d.append( $('<button>', {type:'button', "class":'small button foundation-style', id:"showSpectator", text:"刷新观战玩家", style:"height:20px;width:100px;", click:function() {sendUpdateRequest2(true);} }) );
    }
    else {
        d.append( $('<div>', {style:"font-color:red; font-size:24px;", text:"此功能利用了e-sim的小漏洞，有一定危险性，请自行承担后果"}) );
        d.append( $('<button>', {type:'button', "class":'small button foundation-style', id:"showSpectator", text:"我知道了，还是想看！", click:function() {sendUpdateRequest2(true);} }) );
    }
    var monitor = $('<div>');
    d.append(monitor);
    monitor.append('<div class="foundation-style small-3 columns">  <b>总 防守者 在线:</b> <i id="ehTotaldefenders"  style="display: inline;">0</i> <a style="font-size: 11px; display: none" href="" id="ehDefendersLink">显示细节</a> <a style="font-size: 11px" href="" id="ehDefendersLinkHide">隐藏细节</a> <br> <div align="center" id="ehDefendersMenu" >没人 <br> </div>  </div>');
    monitor.append('<div class="foundation-style small-4 columns">  <b>总 围观者 在线:</b><i id="ehTotalspectators" >0</i> <a style="font-size: 11px; display: none" href="" id="ehSpectatorsLink">显示细节</a> <a style="font-size: 11px" href="" id="ehSpectatorsLinkHide">隐藏细节</a> <br> <div align="center" id="ehSpectatorsMenu">没人 <br> </div>  </div>');
    monitor.append('<div class="foundation-style small-3 columns">  <b>总 进攻者 在线:</b> <i id="ehTotalattackers"  style="display: inline;">0</i> <a style="font-size: 11px; display: none" href="" id="ehAttackersLink">显示细节</a> <a style="font-size: 11px" href="" id="ehAttackersLinkHide">隐藏细节</a> <br> <div align="center" id="ehAttackersMenu" >没人 <br> </div>  </div>');
    $('#ehSpectatorsLink').click(function () {
        $('#ehSpectatorsLink').hide();
        $('#ehSpectatorsLinkHide').show();
        $('#ehSpectatorsMenu').show();
        return false;
    });
    $('#ehSpectatorsLinkHide').click(function () {
        $('#ehSpectatorsLinkHide').hide();
        $('#ehSpectatorsLink').show();
        $('#ehSpectatorsMenu').hide();
        return false;
    });
    $('#ehAttackersLink').click(function () {
        $('#ehAttackersLink').hide();
        $('#ehAttackersLinkHide').show();
        $('#ehAttackersMenu').show();
        return false;
    });
    $('#ehAttackersLinkHide').click(function () {
        $('#ehAttackersLinkHide').hide();
        $('#ehAttackersLink').show();
        $('#ehAttackersMenu').hide();
        return false;
    });
    $('#ehDefendersLink').click(function () {
        $('#ehDefendersLink').hide();
        $('#ehDefendersLinkHide').show();
        $('#ehDefendersMenu').show();
        return false;
    });
    $('#ehDefendersLinkHide').click(function () {
        $('#ehDefendersLinkHide').hide();
        $('#ehDefendersLink').show();
        $('#ehDefendersMenu').hide();
        return false;
    });
}

function setupAlarm() {
    if (!isActive) {
        $('#ehButtonAlarm').attr('disabled', true);
        return;
    }

    var t = getEhTime();

    var alarmMode = $('<div>');
    var PopupCheckbox = $('<input>', {type:'checkbox', id:'PopupCheckbox'}).appendTo(alarmMode);
    var PopupLabel = $("<label>", {"class":"checkboxlabel", "for":"PopupCheckbox", text:'自动弹窗（首次使用可能会被浏览器拦截，加入白名单即可）'}).appendTo(alarmMode);
    var PopupSettings = localStorage.getItem("battlePopup");
    if (PopupSettings == null) {
        localStorage.setItem("battlePopup", "false");
    }
    else
    {
        PopupCheckbox.attr("checked", PopupSettings == "true");
    }
    PopupCheckbox.click(function() {
        if (PopupCheckbox.is(':checked'))
        {
            localStorage.setItem("battlePopup", true);
        }
        else
        {
            localStorage.setItem("battlePopup", false);
        }
    });
    var testNotificationButton = $('<button>', {type:'button', "class":'small button foundation-style', id:"testNotification", text:"测试", click:function() {
        if ($('#PopupCheckbox').is(":checked") && !window.opener) {
            window.open(location.href, 'Battle', 'resizable,scrollbars,width=1200,height=600');
        }
        else
        {
            alert(battleName + '：测试');
        }
    }}).appendTo(alarmMode);

    $('#ehDivAlarm').append(alarmMode);

    var t10Alarm = $('<div>', {"class":"foundation-style small-2 columns"});
    t10Alarm.append( $('<i>', {"class":"icon-uptime", style:"font-size:20px;"}) );
    t10Alarm.append( $('<input>', {type:"checkbox", "class":'foundation-style', id:"alarmEnable10", value:10}), ' t10提醒');

    var t5Alarm = $('<div>', {"class":"foundation-style small-3 columns"});
    t5Alarm.append( $('<i>', {"class":"icon-uptime", style:"font-size:20px;"}) );
    t5Alarm.append( $('<input>', {type:"checkbox", "class":'foundation-style', id:"alarmEnable5", value:5}), ' t5提醒');

    var t2Alarm = $('<div>', {"class":"foundation-style small-3 columns"});
    t2Alarm.append( $('<i>', {"class":"icon-uptime", style:"font-size:20px;"}) );
    t2Alarm.append( $('<input>', {type:"checkbox", "class":'foundation-style', id:"alarmEnable2", value:2}), ' t2提醒');

    var t1Alarm = $('<div>', {"class":"foundation-style small-2 columns"});
    t1Alarm.append( $('<i>', {"class":"icon-uptime", style:"font-size:20px;"}) );
    t1Alarm.append( $('<input>', {type:"checkbox", "class":'foundation-style', id:"alarmEnable1", value:1}), ' t1提醒');

    $('#ehDivAlarm').append(t10Alarm, t5Alarm, t2Alarm, t1Alarm);

    if (t<=10*60)
        $('#alarmEnable10').attr('disabled', true);
    else
        setTimeout(function() {
            if ($('#alarmEnable10').is(":checked")) {
                if ($('#PopupCheckbox').is(":checked") && !window.opener) {
                    window.open(location.href, 'Battle', 'resizable,scrollbars,width=1200,height=600');
                }
                else
                {
                    alert(battleName + '倒计时10分钟');
                }
            }
            $('#alarmEnable10').attr('disabled', true);
        }, (t-10*60)*1000);

    if (t<=5*60)
        $('#alarmEnable5').attr('disabled', true);
    else
        setTimeout(function() {
            if ($('#alarmEnable5').is(":checked")) {
                if ($('#PopupCheckbox').is(":checked") && !window.opener) {
                    window.open(location.href, 'Battle', 'resizable,scrollbars,width=1200,height=600');
                }
                else
                {
                    alert(battleName + '倒计时5分钟');
                }
            }
            if (localStorage.getItem("autoSendMessageToDiscord") == "true")
            {
                var $stdb = $("#sendToDiscordButton");
                if ($stdb.length == 1)
                    $stdb.click();
            }
            $('#alarmEnable5').attr('disabled', true);
        }, (t-5*60)*1000);

    if (t<=2*60)
        $('#alarmEnable2').attr('disabled', true);
    else
        setTimeout(function() {
            if ($('#alarmEnable2').is(":checked")) {
                if ($('#PopupCheckbox').is(":checked") && !window.opener) {
                    window.open(location.href, 'Battle', 'resizable,scrollbars,width=1200,height=600');
                }
                else
                {
                    alert(battleName + '倒计时2分钟');
                }
            }
            $('#alarmEnable2').attr('disabled', true);
        }, (t-2*60)*1000);

    if (t<=1*60)
        $('#alarmEnable1').attr('disabled', true);
    else
        setTimeout(function() {
            if ($('#alarmEnable1').is(":checked")) {
                if ($('#PopupCheckbox').is(":checked") && !window.opener) {
                    window.open(location.href, 'Battle', 'resizable,scrollbars,width=1200,height=600');
                }
                else
                {
                    alert(battleName + '倒计时1分钟');
                }
            }
            $('#alarmEnable1').attr('disabled', true);
        }, (t-1*60)*1000);

    // 修改网页标题
    setInterval(updateClock,1000);
}

// 标题的倒计时放在战场名称前面
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
        var bn = bn + "：(S"+ t.toString() +")";
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
    var damageDiv = $('<div>', {id:'fightLeft', "class":'foundation-style small-3 columns', style:"font-size:12px;"});
    var newfightButtonDiv = $('<div>', {id:'fightRight', "class":'foundation-style small-7 columns foundation-text-center'});
    newfightButtonDiv.append(originalFightButtonDiv.children());
    originalFightButtonDiv.append(damageDiv, newfightButtonDiv);

    var damageHelp = $('<div>', {"class":"foundation-style small-5 columns foundation-text-left", html:'<b id="ehCountdown">00:00:00</b>', title:"点击刷新按钮可校准"});
    var hitsNumber = $('<div>', {"class":"foundation-style small-1 columns foundation-text-right", html:'x<b id="ehHitsNumber">0</b>', title:"在当前页面上攻击的次数, 刷新页面会清零"});
    var totalDamage = $('<div>', {"class":"foundation-style small-4 columns foundation-text-right", html:'<div id="ehTotalDamage">0</div>', title:"在当前页面上攻击的总伤害, 刷新页面会清零"});
    var damageHistory = $('<div>', {id:'fightHistory'}); //, "class":"foundation-text-right", style:"overflow:auto; height:72px"});
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
                damageHistory.prepend($('<div>', {"class":"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                      $('<div>', {"class":"foundation-style small-4 columns foundation-text-right critical", text:damageText.text()}));
            } else {
                damageHistory.prepend($('<div>', {"class":"foundation-style small-6 columns foundation-text-right", html:leftHtml}),
                                      $('<div>', {"class":"foundation-style small-4 columns foundation-text-right", text:damageText.text()}));
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
    /*
    $(document).ajaxComplete(function(event,xhr,options){
        if ("fight.html" === options.url) {
            $("div.newFightWindow").parent().remove();
            $("div.pico-overlay").remove();
        }
    });
    */

}


//TODO
function getApiOnlinePlayers()
{
    $.ajax({
        url: "apiOnlinePlayers.html?countryId=0",
        success: function(data) {
            var info = JSON.parse(data);
            var playerList = [];
            $.each(info,function(index, value){
                playerList.push(JSON.parse(value));
            });
            console.log(playerList);
        },
        error: function(xhr,textStatus){
            console.log("apiOnlinePlayers抓取错误 (", textStatus, ")，该服可能不支持该API");
        },
    });
}


//推测观战玩家中 添加获取目标国家的联盟成员
//但整个推测功能终究只是对观战的国家进行扫描，不会扫描没出现在观战列表中的任何玩家，所以这个扫描联盟的功能也只能算个帮助分类玩家的功能吧
function setupSpectatorDetail() {
    var mainDiv = $('#ehDivSpectatorDetail');
    var button = $('<button>', {id:"eh2ShowSpectatorDetail", text:"推测观战玩家（必须先查看过观战人员）", "class":"foundation-style button", style:"padding:10px; margin:5px;"}).appendTo($('<div>').appendTo(mainDiv));
    var button2 = $('<button>', {id:"eh2ShowSpectatorBuff", text:"显示玩家状态", "class":"foundation-style button", style:"padding:10px; margin:5px;", "disabled":true}).insertAfter(button);
    var coalitionCheck = $("<INPUT TYPE='checkbox' id='eh2CheckCoalition'>按联盟分类玩家</INPUT>").insertAfter(button2);
    var defenders = $('<div>', {id:"eh2Defenders", style:"text-align:left;"}).appendTo($('<div>', {"class":"foundation-style columns", style:"width:33%;", text:"可能的防御者"}).appendTo(mainDiv));
    var strangers = $('<div>', {id:"eh2Strangers", style:"text-align:left;"}).appendTo($('<div>', {"class":"foundation-style columns", style:"width:34%;", text:"其他人"}).appendTo(mainDiv));
    var attackers = $('<div>', {id:"eh2Attackers", style:"text-align:left;"}).appendTo($('<div>', {"class":"foundation-style columns", style:"width:33%;", text:"可能的进攻者"}).appendTo(mainDiv));

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
        var byCountry = $('#ehSpectatorsMenu').text().replace(/-[ \n\r]*/g, '- ').replace(/[\n\r]+ +/g, '\n').trim().split("\n");
        console.log(byCountry);
        var onlineCitizens = []; // 由下面的ajax更新

        var pendingCountryNumber = byCountry.length;
        function getCountryOnlineCitizen(byCountry, index)
        {
            if (index>=byCountry.length)
            {
                information.onlineCitizens = onlineCitizens;
                console.log('相关国家的在线玩家扫描完毕');
                show();
                return;
            }
            var pair = byCountry[index].split(' - ');
            var spectatorNumberForOneCountry = pair[0];
            var countryId = countryInfo[pair[1]] && countryInfo[pair[1]].id;
            if (!countryId) {
                setTimeout(function(){getCountryOnlineCitizen(byCountry, index+1);}, 200);
            }
            else
            {
                // 查看该国的在线玩家
                $.ajax({
                    url: "citizensOnline.html?countryId=" + countryId,
                    success: function(data) {
                        var trs = $('table.dataTable:last tr:gt(0)', data);
                        var onlineNumberForOneCountry = trs.length;
                        console.log(countryInfo[countryId].name, "共有"+onlineNumberForOneCountry+"名在线玩家");//1名时有可能是空
                        trs.each(function(){ // 在线玩家表格的每一行
                            if ($('td', $(this)).length === 1) {// 该行只有一个cell，退出
                                console.log(countryInfo[countryId].name, "没有玩家");
                                return false;
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
                        });
                        setTimeout(function(){getCountryOnlineCitizen(byCountry, index+1);}, 200);
                    },
                    error: function(xhr,textStatus){
                        console.log("抓取错误 (", textStatus, ")，重新抓取");
                        $.ajax(this);
                    }
                }); // ajax结束
            }
        }
        getCountryOnlineCitizen(byCountry, 0);
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
    // 添加获取目标国家的联盟成员
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
            var mu = $('<i>', {"class":"icon-bookmark"}).appendTo(citizenDiv);
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
                var plane = $('<i>', {"class":"icon-airplane"}).appendTo(citizenDiv);
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

            citizenDiv.append($('<div>', {"class":"xflagsSmall xflagsSmall-" + countryInfo[ci.countryId].flagName}), ci.avatar, ci.profile, " (" + parseInt(ci.a*100/ci.b) + "%)");

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
    button2.click(function() {
        button.attr("disabled", true);
        button2.attr("disabled", true);
        // 改变布局
        defenders.parent().attr("class", "foundation-style column small-5");
        attackers.parent().attr("class", "foundation-style column small-5");
        strangers.parent().attr("style", "width:100%;").insertAfter(attackers.parent());
        strangers.attr("style", "width:50%; margin:0 auto; text-align:left;");

        var QualityColors = "rgb(139, 139, 139);; rgb(177, 11, 11);; rgb(242, 160, 27);; rgb(177, 182, 6);; rgb(33, 157, 33);; rgb(169, 34, 156);; rgb(0, 211, 211);".split("; ");
        var slotNames = "帽 镜 甲 裤 鞋 符 武 副".split(" ");
        var slotNames2 = "头盔, 眼镜, 盔甲, 作战裤, 作战靴, 幸运符, 武器配件, 副手".split(", ");

        var citizenDivs = $("div[id^='citizen']", mainDiv);
        var pendingCitizenDivNumber = citizenDivs.length;
        citizenDivs.each(function() {
            var oneCitizenDiv = $(this);
            var citizenId = parseInt(oneCitizenDiv.attr("id").match(/([0-9]+)$/)[1]);

            fetchAndUpdateOneCitizenPage(citizenId, false, function() {
                if (citizenPage[citizenId].equipments.length === 0) {
                    oneCitizenDiv.remove();
                    return true; // 一般是组织号
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
    var button = $('<button>', {"class":'foundation-style button', text:'显示所有局'}).appendTo(fbDiv);
    var battleProgress = $('#battleProgress:first');

    button.click(function() {
        var scoreDiv = fbDiv.closest('div.fightContainer ');
        var battleURL = $('a[href^="battle.html"]').attr('href');
        var roundNumber = $('img[src$="blue_ball.png"]').length + $('img[src$="red_ball.png"]').length;
        for (var i=roundNumber; i>0; --i) {
            var roundDiv = $('<div>', {"class":'foundation-radius fightContainer oldRound', id:'ehRound' + i, roundId:i}).insertAfter(scoreDiv).hide();
            $('<div>', {"class":'foundation-style small-2 columns topDefenders', id:'defenderBH'}).appendTo(roundDiv);
            var middle = $('<div>', {"class":'foundation-style small-6 columns', id:'middle'}).appendTo(roundDiv);
            battleProgress.clone().appendTo(middle);
            $('<div>', {"class":'foundation-radius fightContainer foundation-base-font', id:'scores'}).appendTo(middle);
            $('<div>', {"class":'foundation-style small-2 columns topAttackers', id:'attackerBH'}).appendTo(roundDiv);
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
                    $('<a>', {"class":'foundation-style small-2 columns', href:battleURL+'&round='+roundId, text:'Round ' + roundId}).appendTo(scoreDiv);
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

    // 统计战场消耗
    calBattleConsumption();
}

// 统计战场消耗
function calBattleConsumption()
{
    //表格中回合TD都要添加class：CBCTableRoundsTd，以便集体隐藏
    //表格中统计TD都要添加class：CBCTableTotalTd，以便集体隐藏

    //roundID索引从1开始
    var CBC_FightedCountryId = [];
    var CBC_FightedMuId = [];
    var CBC_FightedCitizenId = [];

    var CBC_Country_Name = []; // CBC_Country_Name[CountryId] = CountryName
    var CBC_Country_Consumption_Q0 = []; // CBC_Country_Consumption_Q0[roundId][CountryId] = weapon count
    var CBC_Country_Consumption_Q1 = [];
    var CBC_Country_Consumption_Q2 = [];
    var CBC_Country_Consumption_Q3 = [];
    var CBC_Country_Consumption_Q4 = [];
    var CBC_Country_Consumption_Q5 = [];
    var CBC_Country_AttackerTotalDamage = []; // CBC_Country_AttackerTotalDamage[CountryId] = total damage
    var CBC_Country_DefenderTotalDamage = [];

    var CBC_Mu_Name = []; // CBC_Mu_Name[MuId] = MuName，通过API获取
    var CBC_Mu_CountryId = []; // CBC_Mu_CountryId[MuId] = CountryID，通过API获取
    var CBC_Mu_Consumption_Q0 = []; // CBC_Mu_Consumption_Q0[roundID][MuId] = weapon count
    var CBC_Mu_Consumption_Q1 = [];
    var CBC_Mu_Consumption_Q2 = [];
    var CBC_Mu_Consumption_Q3 = [];
    var CBC_Mu_Consumption_Q4 = [];
    var CBC_Mu_Consumption_Q5 = [];
    var CBC_Mu_AttackerTotalDamage = []; // CBC_Mu_AttackerTotalDamage[MuId] = total damage
    var CBC_Mu_DefenderTotalDamage = [];

    var CBC_Citizen_Name = []; // CBC_Citizen_Name[CitizenId] = CitizenName，通过API获取
    var CBC_Citizen_CountryId = []; // CBC_Citizen_CountryId[CitizenId] = CountryID，通过API获取
    var CBC_Citizen_Consumption_Q0 = []; // CBC_Citizen_Consumption_Q0[roundID][CitizenId] = weapon count
    var CBC_Citizen_Consumption_Q1 = [];
    var CBC_Citizen_Consumption_Q2 = [];
    var CBC_Citizen_Consumption_Q3 = [];
    var CBC_Citizen_Consumption_Q4 = [];
    var CBC_Citizen_Consumption_Q5 = [];
    var CBC_Citizen_AttackerTotalDamage = []; // CBC_Citizen_AttackerTotalDamage[CitizenId] = total damage
    var CBC_Citizen_DefenderTotalDamage = [];

    //导出为excel
    var idTmr;
    function getExplorer() {
        var explorer = window.navigator.userAgent ;
        //ie
        if (explorer.indexOf("MSIE") >= 0) {
            return 'ie';
        }
        //firefox
        else if (explorer.indexOf("Firefox") >= 0) {
            return 'Firefox';
        }
        //Chrome
        else if(explorer.indexOf("Chrome") >= 0){
            return 'Chrome';
        }
        //Opera
        else if(explorer.indexOf("Opera") >= 0){
            return 'Opera';
        }
        //Safari
        else if(explorer.indexOf("Safari") >= 0){
            return 'Safari';
        }
    }
    function outputAsExcel(tableid) {
        if(getExplorer()=='ie')
        {
            var curTbl = document.getElementById(tableid);
            var oXL = new ActiveXObject("Excel.Application");
            var oWB = oXL.Workbooks.Add();
            var xlsheet = oWB.Worksheets(1);
            var sel = document.body.createTextRange();
            sel.moveToElementText(curTbl);
            sel.select();
            sel.execCommand("Copy");
            xlsheet.Paste();
            oXL.Visible = true;

            try {
                var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
            } catch (e) {
                print("Nested catch caught " + e);
            } finally {
                oWB.SaveAs(fname);
                oWB.Close(savechanges = false);
                oXL.Quit();
                oXL = null;
                idTmr = window.setInterval("Cleanup();", 1);
            }

        }
        else
        {
            tableToExcel(tableid);
        }
    }
    function Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
    }
    var tableToExcel = (function() {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
            base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))); },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g,
                                 function(m, p) { return c[p]; }); };
        return function(table, name) {
            if (!table.nodeType) table = document.getElementById(table);
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
            window.location.href = uri + base64(format(template, ctx));
        };
    })();

    CBC_Ini();

    function CBC_CountryTable_TbodyAddOneLine(countryId, roundCount, roundsDetail, roundResultPoint, totalDetail, totalDamage, damagePerWeapon)
    {
        var CountryTableTbodyTr = $("<tr>",{id:"CBCCountry"+countryId, "class":"CBCCountry", style:"background-color:#3d6571;"}).appendTo($("#CBCCountryResultTbody"));
        var CountryTableTbodyFirstTd = $("<td>", {text:countryInfo[countryId].name, "CBCCountryId":countryId}).appendTo(CountryTableTbodyTr);
        $("<div>", {"class":"xflagsSmall xflagsSmall-" + countryInfo[countryId].flagName, style:"vertical-align:middle;"}).prependTo(CountryTableTbodyFirstTd);
        for (i=1; i<=roundCount; ++i)
        {
            $("<td>", {text:roundsDetail[i], "class":"CBCTableRoundsTd", "sortPoint":roundResultPoint[i]}).appendTo(CountryTableTbodyTr);
        }
        $("<td>", {text:totalDetail[0], "class":"CBCTableTotalTd", "quality":0, "sortPoint":totalDetail[0]}).appendTo(CountryTableTbodyTr);
        $("<td>", {text:totalDetail[1], "class":"CBCTableTotalTd", "quality":1, "sortPoint":totalDetail[1]}).appendTo(CountryTableTbodyTr);
        $("<td>", {text:totalDetail[2], "class":"CBCTableTotalTd", "quality":2, "sortPoint":totalDetail[2]}).appendTo(CountryTableTbodyTr);
        $("<td>", {text:totalDetail[3], "class":"CBCTableTotalTd", "quality":3, "sortPoint":totalDetail[3]}).appendTo(CountryTableTbodyTr);
        $("<td>", {text:totalDetail[4], "class":"CBCTableTotalTd", "quality":4, "sortPoint":totalDetail[4]}).appendTo(CountryTableTbodyTr);
        $("<td>", {text:totalDetail[5], "class":"CBCTableTotalTd", "quality":5, "sortPoint":totalDetail[5]}).appendTo(CountryTableTbodyTr);
        $("<td>", {text:totalDamage[0], "class":"CBCTableTotalDmgTd", "sortPoint":totalDamage[0]}).appendTo(CountryTableTbodyTr);
        $("<td>", {text:totalDamage[1], "class":"CBCTableTotalDmgTd", "sortPoint":totalDamage[1]}).appendTo(CountryTableTbodyTr);
        $("<td>", {text:totalDamage[2], "class":"CBCTableTotalDmgTd", "sortPoint":totalDamage[2]}).appendTo(CountryTableTbodyTr);
        $("<td>", {text:damagePerWeapon, "class":"CBCTableTotalDmgTd", "sortPoint":damagePerWeapon}).appendTo(CountryTableTbodyTr);
    }
    function CBC_CountryTable_TfootAddOneLine(roundsDetail, roundCount, totalDetail, totalDamage)
    {
        //TODO
    }
    function CBC_MuTable_TbodyAddOneLine(muId, roundCount, roundsDetail, roundResultPoint, totalDetail, totalDamage, damagePerWeapon)
    {
        var MuTableTbodyTr = $("<tr>",{id:"CBCMu"+muId, "class":"CBCMu", style:"background-color:#3d6571;"}).appendTo($("#CBCMuResultTbody"));
        var MuTableTbodyFirstTd = $("<td>", {"CBCMuId":muId}).appendTo(MuTableTbodyTr);
        MuTableTbodyFirstTd.attr("GetAPI","false");
        $("<a>", {href:"militaryUnit.html?id="+muId, target:"_blank", text:"("+muId+")"}).appendTo(MuTableTbodyFirstTd);
        for (i=1; i<=roundCount; ++i)
        {
            $("<td>", {text:roundsDetail[i], "class":"CBCTableRoundsTd", "sortPoint":roundResultPoint[i]}).appendTo(MuTableTbodyTr);
        }
        $("<td>", {text:totalDetail[0], "class":"CBCTableTotalTd", "quality":0, "sortPoint":totalDetail[0]}).appendTo(MuTableTbodyTr);
        $("<td>", {text:totalDetail[1], "class":"CBCTableTotalTd", "quality":1, "sortPoint":totalDetail[1]}).appendTo(MuTableTbodyTr);
        $("<td>", {text:totalDetail[2], "class":"CBCTableTotalTd", "quality":2, "sortPoint":totalDetail[2]}).appendTo(MuTableTbodyTr);
        $("<td>", {text:totalDetail[3], "class":"CBCTableTotalTd", "quality":3, "sortPoint":totalDetail[3]}).appendTo(MuTableTbodyTr);
        $("<td>", {text:totalDetail[4], "class":"CBCTableTotalTd", "quality":4, "sortPoint":totalDetail[4]}).appendTo(MuTableTbodyTr);
        $("<td>", {text:totalDetail[5], "class":"CBCTableTotalTd", "quality":5, "sortPoint":totalDetail[5]}).appendTo(MuTableTbodyTr);
        $("<td>", {text:totalDamage[0], "class":"CBCTableTotalDmgTd", "sortPoint":totalDamage[0]}).appendTo(MuTableTbodyTr);
        $("<td>", {text:totalDamage[1], "class":"CBCTableTotalDmgTd", "sortPoint":totalDamage[1]}).appendTo(MuTableTbodyTr);
        $("<td>", {text:totalDamage[2], "class":"CBCTableTotalDmgTd", "sortPoint":totalDamage[2]}).appendTo(MuTableTbodyTr);
        $("<td>", {text:damagePerWeapon, "class":"CBCTableTotalDmgTd", "sortPoint":damagePerWeapon}).appendTo(MuTableTbodyTr);
    }
    function CBC_MuTable_TfootAddOneLine(roundsDetail, roundCount, totalDetail, totalDamage)
    {
        //TODO
    }
    function CBC_CitizenTable_TbodyAddOneLine(citizenId, roundCount, roundsDetail, roundResultPoint, totalDetail, totalDamage, damagePerWeapon)
    {
        var CitizenTableTbodyTr = $("<tr>",{id:"CBCCitizen"+citizenId, "class":"CBCCitizen", style:"background-color:#3d6571;"}).appendTo($("#CBCCitizenResultTbody"));
        var CitizenTableTbodyFirstTd = $("<td>", {"CBCCitizenId":citizenId}).appendTo(CitizenTableTbodyTr);
        if (typeof(citizenInfo[citizenId]) == "undefined")
        {
            CitizenTableTbodyFirstTd.attr("GetAPI","false");
            $("<a>", {href:"profile.html?id="+citizenId, target:"_blank", text:"("+citizenId+")"}).appendTo(CitizenTableTbodyFirstTd);
        }
        else
        {
            CitizenTableTbodyFirstTd.attr("GetAPI","true");
            $("<a>", {href:"profile.html?id="+citizenId, target:"_blank", text:citizenInfo[citizenId].login}).appendTo(CitizenTableTbodyFirstTd);
            $("<div>", {"class":"xflagsSmall xflagsSmall-" + countryInfo[citizenInfo[citizenId].citizenshipId].flagName, style:"vertical-align:middle;"}).prependTo(CitizenTableTbodyFirstTd);
        }
        for (i=1; i<=roundCount; ++i)
        {
            $("<td>", {text:roundsDetail[i], "class":"CBCTableRoundsTd", "sortPoint":roundResultPoint[i]}).appendTo(CitizenTableTbodyTr);
        }
        $("<td>", {text:totalDetail[0], "class":"CBCTableTotalTd", "quality":0, "sortPoint":totalDetail[0]}).appendTo(CitizenTableTbodyTr);
        $("<td>", {text:totalDetail[1], "class":"CBCTableTotalTd", "quality":1, "sortPoint":totalDetail[1]}).appendTo(CitizenTableTbodyTr);
        $("<td>", {text:totalDetail[2], "class":"CBCTableTotalTd", "quality":2, "sortPoint":totalDetail[2]}).appendTo(CitizenTableTbodyTr);
        $("<td>", {text:totalDetail[3], "class":"CBCTableTotalTd", "quality":3, "sortPoint":totalDetail[3]}).appendTo(CitizenTableTbodyTr);
        $("<td>", {text:totalDetail[4], "class":"CBCTableTotalTd", "quality":4, "sortPoint":totalDetail[4]}).appendTo(CitizenTableTbodyTr);
        $("<td>", {text:totalDetail[5], "class":"CBCTableTotalTd", "quality":5, "sortPoint":totalDetail[5]}).appendTo(CitizenTableTbodyTr);
        $("<td>", {text:totalDamage[0], "class":"CBCTableTotalDmgTd", "sortPoint":totalDamage[0]}).appendTo(CitizenTableTbodyTr);
        $("<td>", {text:totalDamage[1], "class":"CBCTableTotalDmgTd", "sortPoint":totalDamage[1]}).appendTo(CitizenTableTbodyTr);
        $("<td>", {text:totalDamage[2], "class":"CBCTableTotalDmgTd", "sortPoint":totalDamage[2]}).appendTo(CitizenTableTbodyTr);
        $("<td>", {text:damagePerWeapon, "class":"CBCTableTotalDmgTd", "sortPoint":damagePerWeapon}).appendTo(CitizenTableTbodyTr);
    }
    function CBC_CitizenTable_TfootAddOneLine(roundsDetail, roundCount, totalDetail, totalDamage)
    {
        //TODO
    }

    //同时请求过多会导致服务器拒绝响应
    function GetMuAPI(MuTds, ListIndex)
    {
        if (ListIndex>=MuTds.length)
        {
            return;
        }
        var MuTd = $(MuTds[ListIndex]);
        var MuId = MuTd.attr("CBCMuId");
        $.ajax({
            url: 'apiMilitaryUnitById.html?id=' + MuId,
            success: function(data)
            {
                var d = JSON.parse(data);
                MuTd.empty();
                MuTd.attr("GetAPI","true");
                $("<a>", {href:"militaryUnit.html?id="+MuId, target:"_blank", text:d.name}).appendTo(MuTd);
                $("<div>", {"class":"xflagsSmall xflagsSmall-" + countryInfo[d.countryId].flagName, style:"vertical-align:middle;"}).prependTo(MuTd);
                setTimeout(function(){GetMuAPI(MuTds, ListIndex+1);}, 200);
            },
            error: function(xhr,textStatus){
                console.log("获取军团API错误 (", textStatus, ")");
            },
        });
    }

    //同时请求过多会导致服务器拒绝响应
    function GetCitizenAPI(CitizenTds, ListIndex)
    {
        if (ListIndex>=CitizenTds.length)
        {
            return;
        }
        var CitizenTd = $(CitizenTds[ListIndex]);
        var CitizenId = CitizenTd.attr("CBCCitizenId");
        $.ajax({
            url: "apiCitizenById.html?id="+CitizenId,
            success: function(data)
            {
                var d = JSON.parse(data);
                CitizenTd.empty();
                CitizenTd.attr("GetAPI","true");
                $("<a>", {href:"profile.html?id="+CitizenId, target:"_blank", text:d.login}).appendTo(CitizenTd);
                $("<div>", {"class":"xflagsSmall xflagsSmall-" + countryInfo[d.citizenshipId].flagName, style:"vertical-align:middle;"}).prependTo(CitizenTd);
                setTimeout(function(){GetCitizenAPI(CitizenTds, ListIndex+1);}, 200);
            },
            error: function(xhr,textStatus){
                console.log("获取玩家API错误 (", textStatus, ")");
            },
        });
    }

    function CBC_Table_Ini(container, maxRound, Finished) //创建表格
    {
        var i;

        $("<p>国家消耗统计</p>").appendTo(container);
        var CountryTable = $("<table>", {id:"CBCCountryResult", style:"width:100%;font-size:12px;"}).appendTo(container);

        var CountryTableThead = $("<thead>").appendTo(CountryTable);
        var CountryTableTfoot = $("<tfoot>", {id:"CBCCountryResultTfoot"}).appendTo(CountryTable);
        var CountryTableTbody = $("<tbody>", {id:"CBCCountryResultTbody"}).appendTo(CountryTable);

        //标题行
        var CountryTableTheadTr = $("<tr>",{id:"CBCCountryResultTheadTr", style:"background-color:#3d6571;"}).appendTo(CountryTableThead);
        var CountryTableTheadFirstTd = $("<td>", {text:"国家"}).appendTo(CountryTableTheadTr);
        for (i=1; i<=maxRound; ++i)
        {
            $("<td>", {text:i, "class":"CBCTableRoundsTd"}).appendTo(CountryTableTheadTr);
        }
        if (Finished == false)
        {
            $("<td>", {text:(maxRound+1)+"(未结束)", "class":"CBCTableRoundsTd"}).appendTo(CountryTableTheadTr);
        }
        $("<td>", {text:"总计(Q0)", "class":"CBCTableTotalTd", "quality":0}).appendTo(CountryTableTheadTr);
        $("<td>", {text:"总计(Q1)", "class":"CBCTableTotalTd", "quality":1}).appendTo(CountryTableTheadTr);
        $("<td>", {text:"总计(Q2)", "class":"CBCTableTotalTd", "quality":2}).appendTo(CountryTableTheadTr);
        $("<td>", {text:"总计(Q3)", "class":"CBCTableTotalTd", "quality":3}).appendTo(CountryTableTheadTr);
        $("<td>", {text:"总计(Q4)", "class":"CBCTableTotalTd", "quality":4}).appendTo(CountryTableTheadTr);
        $("<td>", {text:"总计(Q5)", "class":"CBCTableTotalTd", "quality":5}).appendTo(CountryTableTheadTr);
        $("<td>", {text:"防守方总伤害", "class":"CBCTableTotalDmgTd"}).appendTo(CountryTableTheadTr);
        $("<td>", {text:"进攻方总伤害", "class":"CBCTableTotalDmgTd"}).appendTo(CountryTableTheadTr);
        $("<td>", {text:"总伤害", "class":"CBCTableTotalDmgTd"}).appendTo(CountryTableTheadTr);
        $("<td>", {text:"武器利用比", "class":"CBCTableTotalDmgTd"}).appendTo(CountryTableTheadTr);

        var outputCountryResultAsExcel = $('<button type="button">导出</button>').appendTo(container);
        outputCountryResultAsExcel.click(function() {
            outputAsExcel("CBCCountryResult");
        });

        $("#CBCCountryResultTheadTr").children(":gt(0)").each(function(index, td) {
            $(td).click(function() {
                customSortResultTable("CBCCountry", index+1);
            });
        });

        $("<p>军团消耗统计</p>").appendTo(container);
        var MuTable = $("<table>", {id:"CBCMuResult", style:"width:100%;font-size:12px;"}).appendTo(container);
        var MuTableThead = $("<thead>").appendTo(MuTable);
        var MuTableTfoot = $("<tfoot>", {id:"CBCMuResultTfoot"}).appendTo(MuTable);
        var MuTableTbody = $("<tbody>", {id:"CBCMuResultTbody"}).appendTo(MuTable);

        //标题行
        var MuTableTheadTr = $("<tr>",{id:"CBCMuResultTheadTr", style:"background-color:#3d6571;"}).appendTo(MuTableThead);
        var MuTableTheadFirstTd = $("<td>", {text:"军团"}).appendTo(MuTableTheadTr);
        var GetMuInfoButton = $('<button type="button">获取军团名</button>').appendTo(MuTableTheadFirstTd);
        GetMuInfoButton.click(function() {
            var MuTds = $('[CBCMuId][getapi=false]');
            GetMuAPI(MuTds, 0);
        });
        for (i=1; i<=maxRound; ++i)
        {
            $("<td>", {text:i, "class":"CBCTableRoundsTd"}).appendTo(MuTableTheadTr);
        }
        if (Finished == false)
        {
            $("<td>", {text:(maxRound+1)+"(未结束)", "class":"CBCTableRoundsTd"}).appendTo(MuTableTheadTr);
        }
        $("<td>", {text:"总计(Q0)", "class":"CBCTableTotalTd", "quality":0}).appendTo(MuTableTheadTr);
        $("<td>", {text:"总计(Q1)", "class":"CBCTableTotalTd", "quality":1}).appendTo(MuTableTheadTr);
        $("<td>", {text:"总计(Q2)", "class":"CBCTableTotalTd", "quality":2}).appendTo(MuTableTheadTr);
        $("<td>", {text:"总计(Q3)", "class":"CBCTableTotalTd", "quality":3}).appendTo(MuTableTheadTr);
        $("<td>", {text:"总计(Q4)", "class":"CBCTableTotalTd", "quality":4}).appendTo(MuTableTheadTr);
        $("<td>", {text:"总计(Q5)", "class":"CBCTableTotalTd", "quality":5}).appendTo(MuTableTheadTr);
        $("<td>", {text:"防守方总伤害", "class":"CBCTableTotalDmgTd"}).appendTo(MuTableTheadTr);
        $("<td>", {text:"进攻方总伤害", "class":"CBCTableTotalDmgTd"}).appendTo(MuTableTheadTr);
        $("<td>", {text:"总伤害", "class":"CBCTableTotalDmgTd"}).appendTo(MuTableTheadTr);
        $("<td>", {text:"武器利用比", "class":"CBCTableTotalDmgTd"}).appendTo(MuTableTheadTr);

        var outputMuResultAsExcel = $('<button type="button">导出</button>').appendTo(container);
        outputMuResultAsExcel.click(function() {
            outputAsExcel("CBCMuResult");
        });

        $("#CBCMuResultTheadTr").children(":gt(0)").each(function(index, td) {
            $(td).click(function() {
                customSortResultTable("CBCMu", index+1);
            });
        });

        $("<p>个人消耗统计</p>").appendTo(container);
        var CitizenTable = $("<table>", {id:"CBCCitizenResult", style:"width:100%;font-size:12px;"}).appendTo(container);
        var CitizenTableThead = $("<thead>").appendTo(CitizenTable);
        var CitizenTableTfoot = $("<tfoot>", {id:"CBCCitizenResultTfoot"}).appendTo(CitizenTable);
        var CitizenTableTbody = $("<tbody>", {id:"CBCCitizenResultTbody"}).appendTo(CitizenTable);

        //标题行
        var CitizenTableTheadTr = $("<tr>",{id:"CBCCitizenResultTheadTr", style:"background-color:#3d6571;"}).appendTo(CitizenTableThead);
        var CitizenTableTheadFirstTd = $("<td>", {text:"玩家"}).appendTo(CitizenTableTheadTr);
        var GetCitizenInfoButton = $('<button type="button">获取玩家名</button>').appendTo(CitizenTableTheadFirstTd);
        GetCitizenInfoButton.click(function() {
            var CitizenTds = $('[CBCCitizenId][getapi=false]');
            GetCitizenAPI(CitizenTds, 0);
        });
        for (i=1; i<=maxRound; ++i)
        {
            $("<td>", {text:i, "class":"CBCTableRoundsTd"}).appendTo(CitizenTableTheadTr);
        }
        if (Finished == false)
        {
            $("<td>", {text:(maxRound+1)+"(未结束)", "class":"CBCTableRoundsTd"}).appendTo(CitizenTableTheadTr);
        }
        $("<td>", {text:"总计(Q0)", "class":"CBCTableTotalTd", "quality":0}).appendTo(CitizenTableTheadTr);
        $("<td>", {text:"总计(Q1)", "class":"CBCTableTotalTd", "quality":1}).appendTo(CitizenTableTheadTr);
        $("<td>", {text:"总计(Q2)", "class":"CBCTableTotalTd", "quality":2}).appendTo(CitizenTableTheadTr);
        $("<td>", {text:"总计(Q3)", "class":"CBCTableTotalTd", "quality":3}).appendTo(CitizenTableTheadTr);
        $("<td>", {text:"总计(Q4)", "class":"CBCTableTotalTd", "quality":4}).appendTo(CitizenTableTheadTr);
        $("<td>", {text:"总计(Q5)", "class":"CBCTableTotalTd", "quality":5}).appendTo(CitizenTableTheadTr);
        $("<td>", {text:"防守方总伤害", "class":"CBCTableTotalDmgTd"}).appendTo(CitizenTableTheadTr);
        $("<td>", {text:"进攻方总伤害", "class":"CBCTableTotalDmgTd"}).appendTo(CitizenTableTheadTr);
        $("<td>", {text:"总伤害", "class":"CBCTableTotalDmgTd"}).appendTo(CitizenTableTheadTr);
        $("<td>", {text:"武器利用比", "class":"CBCTableTotalDmgTd"}).appendTo(CitizenTableTheadTr);

        var outputCitizenResultAsExcel = $('<button type="button">导出</button>').appendTo(container);
        outputCitizenResultAsExcel.click(function() {
            outputAsExcel("CBCCitizenResult");
        });

        $("#CBCCitizenResultTheadTr").children(":gt(0)").each(function(index, td) {
            $(td).click(function() {
                customSortResultTable("CBCCitizen", index+1);
            });
        });

        var copyPersonalResult = $('<button type="button">复制自己的消耗记录</button>').appendTo(container);
        copyPersonalResult.click(function() {
            var myProfileLink = $("a[href^='profile.html']", $("#userAvatar"));
            var myName = myProfileLink.text();
            var myId = myProfileLink.attr("href").replace("profile.html?id=", "");
            var myRecordTr = $("[cbccitizenid="+myId+"]").parent();
            var copyText = myName + "的战场消耗：\r\n";
            var battleUrl = location.origin + "/battle.html?id=" + GetQueryString("id") + "&round=";
            var oneRoundText;
            var battleRoundCount;
            if (Finished == true) battleRoundCount = maxRound;
            else battleRoundCount = maxRound+1;
            for(var i = 0; i< battleRoundCount; i++)
            {
                oneRoundText = myRecordTr.children("td:eq("+(i+1)+")").text();
                if (oneRoundText != "")
                {
                    copyText = copyText + battleUrl + $(".CBCTableRoundsTd :eq("+i+")").text() + "    " + oneRoundText + "\r\n";
                }
            }
            copyText = copyText + "------------------------------------------------------------\r\n总计： ";
            for(var j = 0; j <= 5; j++)
            {
                oneRoundText = myRecordTr.children("td:eq("+(myRecordTr.children("td").length-10+j)+")").text();
                if (oneRoundText != "0")
                {
                    copyText = copyText + oneRoundText + " Q"+j+"  |  ";
                }
            }
            GM_setClipboard(copyText);
        });
    }

    function CBC_Ini() //初始化
    {
        var orgTable = $('div.foundation-radius.fightContainer.foundation-base-font :last');
        var newTable = orgTable.clone().insertAfter(orgTable);
        newTable.empty();
        var calBattleConsumption = $('<button>', {"class":'foundation-style button', text:'统计战场消耗'}).appendTo(newTable);
        calBattleConsumption.click(function() {
            calBattleConsumption.attr("disabled", true);

            var battleID = $('a[href^="battle.html"]').attr('href').split("?id=")[1];
            var attackerWinRounds = $('img[src$="red_ball.png"]').length;
            var defenderWinRounds = $('img[src$="blue_ball.png"]').length;
            var roundNumber = attackerWinRounds + defenderWinRounds; //已结束的回合数
            var roundStatsNumber = roundNumber;
            var battleIsFinished = true;
            if ((attackerWinRounds < 8) && (defenderWinRounds < 8)) //战场未结束
            {
                battleIsFinished = false;
                roundStatsNumber = roundStatsNumber + 1;
            }
            CBC_Table_Ini(newTable, roundNumber, battleIsFinished);

            //获取回合信息
            getOneRoundStats(calBattleConsumption, battleID, 1, roundStatsNumber);
        });

        var HideRoundsCheckbox = $('<input>', {type:'checkbox', id:"HideRoundsCheckbox"}).appendTo(newTable);
        var HideRoundsCheckboxLabel = $("<label>", {"class":"checkboxlabel", "for":"HideRoundsCheckbox", text:"隐藏回合"}).appendTo(newTable);
        HideRoundsCheckbox.click(function() {
            if (HideRoundsCheckbox.is(':checked'))
            {
                $(".CBCTableRoundsTd").hide();
            }
            else
            {
                $(".CBCTableRoundsTd").show();
            }
        });
        var HideTotalCheckbox = $('<input>', {type:'checkbox', id:"HideTotalCheckbox"}).appendTo(newTable);
        var HideTotalCheckboxLabel = $("<label>", {"class":"checkboxlabel", "for":"HideTotalCheckbox", text:"隐藏消耗总计"}).appendTo(newTable);
        HideTotalCheckbox.click(function() {
            if (HideTotalCheckbox.is(':checked'))
            {
                $(".CBCTableTotalTd").hide();
            }
            else
            {
                $(".CBCTableTotalTd").show();
            }
        });
        var HideTotalSpecialQualityCheckbox = $('<input>', {type:'checkbox', id:"HideTotalSpecialQualityCheckbox"}).appendTo(newTable);
        var HideTotalSpecialQualityCheckboxLabel = $("<label>", {"class":"checkboxlabel", "for":"HideTotalSpecialQualityCheckbox", text:"仅保留Q1和Q5消耗总计"}).appendTo(newTable);
        HideTotalSpecialQualityCheckbox.click(function() {
            if (HideTotalSpecialQualityCheckbox.is(':checked'))
            {
                $(".CBCTableTotalTd[quality!=1][quality!=5]").hide();
            }
            else
            {
                $(".CBCTableTotalTd[quality!=1][quality!=5]").show();
            }
        });
        var HideTotalDmgCheckbox = $('<input>', {type:'checkbox', id:"HideTotalDmgCheckbox"}).appendTo(newTable);
        var HideTotalDmgCheckboxLabel = $("<label>", {"class":"checkboxlabel", "for":"HideTotalDmgCheckbox", text:"隐藏伤害总计"}).appendTo(newTable);
        HideTotalDmgCheckbox.click(function() {
            if (HideTotalDmgCheckbox.is(':checked'))
            {
                $(".CBCTableTotalDmgTd").hide();
            }
            else
            {
                $(".CBCTableTotalDmgTd").show();
            }
        });
    }

    function analyseOneRoundStats(data, roundID) //roundID索引从1开始
    {
        var hits = JSON.parse(data);
        for (i=0; i<hits.length; ++i)
        {
            if (hits[i].weapon == 0)
            {
                //个人
                if (CBC_FightedCitizenId.indexOf(hits[i].citizenId)<0)
                {
                    CBC_FightedCitizenId.push(hits[i].citizenId);
                }
                if (typeof(CBC_Citizen_Consumption_Q0[roundID][hits[i].citizenId]) == "undefined")
                {
                    CBC_Citizen_Consumption_Q0[roundID][hits[i].citizenId] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Citizen_Consumption_Q0[roundID][hits[i].citizenId] += 1 + 4 * hits[i].berserk;
                }
                //国家
                if (CBC_FightedCountryId.indexOf(hits[i].citizenship)<0)
                {
                    CBC_FightedCountryId.push(hits[i].citizenship);
                }
                if (typeof(CBC_Country_Consumption_Q0[roundID][hits[i].citizenship]) == "undefined")
                {
                    CBC_Country_Consumption_Q0[roundID][hits[i].citizenship] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Country_Consumption_Q0[roundID][hits[i].citizenship] += 1 + 4 * hits[i].berserk;
                }
                //军团
                if (typeof(hits[i].militaryUnit) != "undefined")
                {
                    if (CBC_FightedMuId.indexOf(hits[i].militaryUnit)<0)
                    {
                        CBC_FightedMuId.push(hits[i].militaryUnit);
                    }
                    if (typeof(CBC_Mu_Consumption_Q0[roundID][hits[i].militaryUnit]) == "undefined")
                    {
                        CBC_Mu_Consumption_Q0[roundID][hits[i].militaryUnit] = 1 + 4 * hits[i].berserk;
                    }
                    else
                    {
                        CBC_Mu_Consumption_Q0[roundID][hits[i].militaryUnit] += 1 + 4 * hits[i].berserk;
                    }
                }
            }
            else if (hits[i].weapon == 1)
            {
                //个人
                if (CBC_FightedCitizenId.indexOf(hits[i].citizenId)<0)
                {
                    CBC_FightedCitizenId.push(hits[i].citizenId);
                }
                if (typeof(CBC_Citizen_Consumption_Q1[roundID][hits[i].citizenId]) == "undefined")
                {
                    CBC_Citizen_Consumption_Q1[roundID][hits[i].citizenId] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Citizen_Consumption_Q1[roundID][hits[i].citizenId] += 1 + 4 * hits[i].berserk;
                }
                //国家
                if (CBC_FightedCountryId.indexOf(hits[i].citizenship)<0)
                {
                    CBC_FightedCountryId.push(hits[i].citizenship);
                }
                if (typeof(CBC_Country_Consumption_Q1[roundID][hits[i].citizenship]) == "undefined")
                {
                    CBC_Country_Consumption_Q1[roundID][hits[i].citizenship] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Country_Consumption_Q1[roundID][hits[i].citizenship] += 1 + 4 * hits[i].berserk;
                }
                //军团
                if (typeof(hits[i].militaryUnit) != "undefined")
                {
                    if (CBC_FightedMuId.indexOf(hits[i].militaryUnit)<0)
                    {
                        CBC_FightedMuId.push(hits[i].militaryUnit);
                    }
                    if (typeof(CBC_Mu_Consumption_Q1[roundID][hits[i].militaryUnit]) == "undefined")
                    {
                        CBC_Mu_Consumption_Q1[roundID][hits[i].militaryUnit] = 1 + 4 * hits[i].berserk;
                    }
                    else
                    {
                        CBC_Mu_Consumption_Q1[roundID][hits[i].militaryUnit] += 1 + 4 * hits[i].berserk;
                    }
                }
            }
            else if (hits[i].weapon == 2)
            {
                //个人
                if (CBC_FightedCitizenId.indexOf(hits[i].citizenId)<0)
                {
                    CBC_FightedCitizenId.push(hits[i].citizenId);
                }
                if (typeof(CBC_Citizen_Consumption_Q2[roundID][hits[i].citizenId]) == "undefined")
                {
                    CBC_Citizen_Consumption_Q2[roundID][hits[i].citizenId] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Citizen_Consumption_Q2[roundID][hits[i].citizenId] += 1 + 4 * hits[i].berserk;
                }
                //国家
                if (CBC_FightedCountryId.indexOf(hits[i].citizenship)<0)
                {
                    CBC_FightedCountryId.push(hits[i].citizenship);
                }
                if (typeof(CBC_Country_Consumption_Q2[roundID][hits[i].citizenship]) == "undefined")
                {
                    CBC_Country_Consumption_Q2[roundID][hits[i].citizenship] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Country_Consumption_Q2[roundID][hits[i].citizenship] += 1 + 4 * hits[i].berserk;
                }
                //军团
                if (typeof(hits[i].militaryUnit) != "undefined")
                {
                    if (CBC_FightedMuId.indexOf(hits[i].militaryUnit)<0)
                    {
                        CBC_FightedMuId.push(hits[i].militaryUnit);
                    }
                    if (typeof(CBC_Mu_Consumption_Q2[roundID][hits[i].militaryUnit]) == "undefined")
                    {
                        CBC_Mu_Consumption_Q2[roundID][hits[i].militaryUnit] = 1 + 4 * hits[i].berserk;
                    }
                    else
                    {
                        CBC_Mu_Consumption_Q2[roundID][hits[i].militaryUnit] += 1 + 4 * hits[i].berserk;
                    }
                }
            }
            else if (hits[i].weapon == 3)
            {
                //个人
                if (CBC_FightedCitizenId.indexOf(hits[i].citizenId)<0)
                {
                    CBC_FightedCitizenId.push(hits[i].citizenId);
                }
                if (typeof(CBC_Citizen_Consumption_Q3[roundID][hits[i].citizenId]) == "undefined")
                {
                    CBC_Citizen_Consumption_Q3[roundID][hits[i].citizenId] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Citizen_Consumption_Q3[roundID][hits[i].citizenId] += 1 + 4 * hits[i].berserk;
                }
                //国家
                if (CBC_FightedCountryId.indexOf(hits[i].citizenship)<0)
                {
                    CBC_FightedCountryId.push(hits[i].citizenship);
                }
                if (typeof(CBC_Country_Consumption_Q3[roundID][hits[i].citizenship]) == "undefined")
                {
                    CBC_Country_Consumption_Q3[roundID][hits[i].citizenship] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Country_Consumption_Q3[roundID][hits[i].citizenship] += 1 + 4 * hits[i].berserk;
                }
                //军团
                if (typeof(hits[i].militaryUnit) != "undefined")
                {
                    if (CBC_FightedMuId.indexOf(hits[i].militaryUnit)<0)
                    {
                        CBC_FightedMuId.push(hits[i].militaryUnit);
                    }
                    if (typeof(CBC_Mu_Consumption_Q3[roundID][hits[i].militaryUnit]) == "undefined")
                    {
                        CBC_Mu_Consumption_Q3[roundID][hits[i].militaryUnit] = 1 + 4 * hits[i].berserk;
                    }
                    else
                    {
                        CBC_Mu_Consumption_Q3[roundID][hits[i].militaryUnit] += 1 + 4 * hits[i].berserk;
                    }
                }
            }
            else if (hits[i].weapon == 4)
            {
                //个人
                if (CBC_FightedCitizenId.indexOf(hits[i].citizenId)<0)
                {
                    CBC_FightedCitizenId.push(hits[i].citizenId);
                }
                if (typeof(CBC_Citizen_Consumption_Q4[roundID][hits[i].citizenId]) == "undefined")
                {
                    CBC_Citizen_Consumption_Q4[roundID][hits[i].citizenId] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Citizen_Consumption_Q4[roundID][hits[i].citizenId] += 1 + 4 * hits[i].berserk;
                }
                //国家
                if (CBC_FightedCountryId.indexOf(hits[i].citizenship)<0)
                {
                    CBC_FightedCountryId.push(hits[i].citizenship);
                }
                if (typeof(CBC_Country_Consumption_Q4[roundID][hits[i].citizenship]) == "undefined")
                {
                    CBC_Country_Consumption_Q4[roundID][hits[i].citizenship] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Country_Consumption_Q4[roundID][hits[i].citizenship] += 1 + 4 * hits[i].berserk;
                }
                //军团
                if (typeof(hits[i].militaryUnit) != "undefined")
                {
                    if (CBC_FightedMuId.indexOf(hits[i].militaryUnit)<0)
                    {
                        CBC_FightedMuId.push(hits[i].militaryUnit);
                    }
                    if (typeof(CBC_Mu_Consumption_Q4[roundID][hits[i].militaryUnit]) == "undefined")
                    {
                        CBC_Mu_Consumption_Q4[roundID][hits[i].militaryUnit] = 1 + 4 * hits[i].berserk;
                    }
                    else
                    {
                        CBC_Mu_Consumption_Q4[roundID][hits[i].militaryUnit] += 1 + 4 * hits[i].berserk;
                    }
                }
            }
            else if (hits[i].weapon == 5)
            {
                //个人
                if (CBC_FightedCitizenId.indexOf(hits[i].citizenId)<0)
                {
                    CBC_FightedCitizenId.push(hits[i].citizenId);
                }
                if (typeof(CBC_Citizen_Consumption_Q5[roundID][hits[i].citizenId]) == "undefined")
                {
                    CBC_Citizen_Consumption_Q5[roundID][hits[i].citizenId] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Citizen_Consumption_Q5[roundID][hits[i].citizenId] += 1 + 4 * hits[i].berserk;
                }
                //国家
                if (CBC_FightedCountryId.indexOf(hits[i].citizenship)<0)
                {
                    CBC_FightedCountryId.push(hits[i].citizenship);
                }
                if (typeof(CBC_Country_Consumption_Q5[roundID][hits[i].citizenship]) == "undefined")
                {
                    CBC_Country_Consumption_Q5[roundID][hits[i].citizenship] = 1 + 4 * hits[i].berserk;
                }
                else
                {
                    CBC_Country_Consumption_Q5[roundID][hits[i].citizenship] += 1 + 4 * hits[i].berserk;
                }
                //军团
                if (typeof(hits[i].militaryUnit) != "undefined")
                {
                    if (CBC_FightedMuId.indexOf(hits[i].militaryUnit)<0)
                    {
                        CBC_FightedMuId.push(hits[i].militaryUnit);
                    }
                    if (typeof(CBC_Mu_Consumption_Q5[roundID][hits[i].militaryUnit]) == "undefined")
                    {
                        CBC_Mu_Consumption_Q5[roundID][hits[i].militaryUnit] = 1 + 4 * hits[i].berserk;
                    }
                    else
                    {
                        CBC_Mu_Consumption_Q5[roundID][hits[i].militaryUnit] += 1 + 4 * hits[i].berserk;
                    }
                }
            }
            if (hits[i].defenderSide == true)
            {
                if (typeof(CBC_Citizen_DefenderTotalDamage[hits[i].citizenId]) == "undefined")
                {
                    CBC_Citizen_DefenderTotalDamage[hits[i].citizenId] = hits[i].damage;
                }
                else
                {
                    CBC_Citizen_DefenderTotalDamage[hits[i].citizenId] += hits[i].damage;
                }
                if (typeof(CBC_Country_DefenderTotalDamage[hits[i].citizenship]) == "undefined")
                {
                    CBC_Country_DefenderTotalDamage[hits[i].citizenship] = hits[i].damage;
                }
                else
                {
                    CBC_Country_DefenderTotalDamage[hits[i].citizenship] += hits[i].damage;
                }
            }
            if (hits[i].defenderSide == false)
            {
                if (typeof(CBC_Citizen_AttackerTotalDamage[hits[i].citizenId]) == "undefined")
                {
                    CBC_Citizen_AttackerTotalDamage[hits[i].citizenId] = hits[i].damage;
                }
                else
                {
                    CBC_Citizen_AttackerTotalDamage[hits[i].citizenId] += hits[i].damage;
                }
                if (typeof(CBC_Country_AttackerTotalDamage[hits[i].citizenship]) == "undefined")
                {
                    CBC_Country_AttackerTotalDamage[hits[i].citizenship] = hits[i].damage;
                }
                else
                {
                    CBC_Country_AttackerTotalDamage[hits[i].citizenship] += hits[i].damage;
                }
            }
            if (typeof(hits[i].militaryUnit) != "undefined")
            {
                if (hits[i].defenderSide == true)
                {
                    if (typeof(CBC_Mu_DefenderTotalDamage[hits[i].militaryUnit]) == "undefined")
                    {
                        CBC_Mu_DefenderTotalDamage[hits[i].militaryUnit] = hits[i].damage;
                    }
                    else
                    {
                        CBC_Mu_DefenderTotalDamage[hits[i].militaryUnit] += hits[i].damage;
                    }
                }
                if (hits[i].defenderSide == false)
                {
                    if (typeof(CBC_Mu_AttackerTotalDamage[hits[i].militaryUnit]) == "undefined")
                    {
                        CBC_Mu_AttackerTotalDamage[hits[i].militaryUnit] = hits[i].damage;
                    }
                    else
                    {
                        CBC_Mu_AttackerTotalDamage[hits[i].militaryUnit] += hits[i].damage;
                    }
                }
            }
        }
    }

    function getCountryResult(CountryId, roundStatsNumber)
    {
        function getCountryOneRoundResult(CountryId, RoundId)
        {
            var result = [0,0,0,0,0,0];//[Q0,Q1,Q2,Q3,Q4,Q5]
            if (typeof(CBC_Country_Consumption_Q0[RoundId][CountryId]) == "undefined")
            {
                result[0] = 0;
            }
            else
            {
                result[0] = CBC_Country_Consumption_Q0[RoundId][CountryId];
            }
            if (typeof(CBC_Country_Consumption_Q1[RoundId][CountryId]) == "undefined")
            {
                result[1] = 0;
            }
            else
            {
                result[1] = CBC_Country_Consumption_Q1[RoundId][CountryId];
            }
            if (typeof(CBC_Country_Consumption_Q2[RoundId][CountryId]) == "undefined")
            {
                result[2] = 0;
            }
            else
            {
                result[2] = CBC_Country_Consumption_Q2[RoundId][CountryId];
            }
            if (typeof(CBC_Country_Consumption_Q3[RoundId][CountryId]) == "undefined")
            {
                result[3] = 0;
            }
            else
            {
                result[3] = CBC_Country_Consumption_Q3[RoundId][CountryId];
            }
            if (typeof(CBC_Country_Consumption_Q4[RoundId][CountryId]) == "undefined")
            {
                result[4] = 0;
            }
            else
            {
                result[4] = CBC_Country_Consumption_Q4[RoundId][CountryId];
            }
            if (typeof(CBC_Country_Consumption_Q5[RoundId][CountryId]) == "undefined")
            {
                result[5] = 0;
            }
            else
            {
                result[5] = CBC_Country_Consumption_Q5[RoundId][CountryId];
            }
            return result;
        }

        var roundResult = []; //roundResult[roundId][Q0-Q5]
        var roundResultString = ["","","","","","","","","","","","","","","",""]; //roundResultString[roundId]
        var roundResultPoint = []; //roundResult[roundId]
        var totalResult = [0,0,0,0,0,0]; //totalResult[Q0-Q5]
        var totalDamage = []; //defender, attacker, total
        var totalWeaponPoint;
        var damagePerWeapon;
        for(var i=1;i<=roundStatsNumber;i++)
        {
            roundResult[i] = getCountryOneRoundResult(CountryId, i);
            roundResultPoint[i]=0;
            for(var q=0;q<6;q++)
            {
                if (roundResult[i][q]!=0)
                {
                    roundResultString[i] += (roundResult[i][q]+" "+"q"+q+" ");
                    totalResult[q] += roundResult[i][q];
                    roundResultPoint[i] += ((q+1)*roundResult[i][q]);
                }
            }
        }
        if (typeof(CBC_Country_DefenderTotalDamage[CountryId]) == "undefined")
        {
            totalDamage[0] = 0;
        }
        else
        {
            totalDamage[0] = CBC_Country_DefenderTotalDamage[CountryId];
        }
        if (typeof(CBC_Country_AttackerTotalDamage[CountryId]) == "undefined")
        {
            totalDamage[1] = 0;
        }
        else
        {
            totalDamage[1] = CBC_Country_AttackerTotalDamage[CountryId];
        }
        totalDamage[2] = totalDamage[0] + totalDamage[1];
        totalWeaponPoint = totalResult[0]*0.5 + totalResult[1]*1.2 + totalResult[2]*1.4 + totalResult[3]*1.6 + totalResult[4]*1.8 + totalResult[5]*2;
        if (totalWeaponPoint == 0) totalWeaponPoint=1;
        damagePerWeapon = parseInt(totalDamage[2] / totalWeaponPoint);
        CBC_CountryTable_TbodyAddOneLine(CountryId, roundStatsNumber, roundResultString, roundResultPoint, totalResult, totalDamage, damagePerWeapon);
    }

    function getMuResult(MuId, roundStatsNumber)
    {
        function getMuOneRoundResult(MuId, RoundId)
        {
            var result = [0,0,0,0,0,0];//[Q0,Q1,Q2,Q3,Q4,Q5]
            if (typeof(CBC_Mu_Consumption_Q0[RoundId][MuId]) == "undefined")
            {
                result[0] = 0;
            }
            else
            {
                result[0] = CBC_Mu_Consumption_Q0[RoundId][MuId];
            }
            if (typeof(CBC_Mu_Consumption_Q1[RoundId][MuId]) == "undefined")
            {
                result[1] = 0;
            }
            else
            {
                result[1] = CBC_Mu_Consumption_Q1[RoundId][MuId];
            }
            if (typeof(CBC_Mu_Consumption_Q2[RoundId][MuId]) == "undefined")
            {
                result[2] = 0;
            }
            else
            {
                result[2] = CBC_Mu_Consumption_Q2[RoundId][MuId];
            }
            if (typeof(CBC_Mu_Consumption_Q3[RoundId][MuId]) == "undefined")
            {
                result[3] = 0;
            }
            else
            {
                result[3] = CBC_Mu_Consumption_Q3[RoundId][MuId];
            }
            if (typeof(CBC_Mu_Consumption_Q4[RoundId][MuId]) == "undefined")
            {
                result[4] = 0;
            }
            else
            {
                result[4] = CBC_Mu_Consumption_Q4[RoundId][MuId];
            }
            if (typeof(CBC_Mu_Consumption_Q5[RoundId][MuId]) == "undefined")
            {
                result[5] = 0;
            }
            else
            {
                result[5] = CBC_Mu_Consumption_Q5[RoundId][MuId];
            }
            return result;
        }

        var roundResult = []; //roundResult[roundId][Q0-Q5]
        var roundResultString = ["","","","","","","","","","","","","","","",""]; //roundResultString[roundId]
        var roundResultPoint = []; //roundResult[roundId]
        var totalResult = [0,0,0,0,0,0]; //totalResult[Q0-Q5]
        var totalDamage = []; //defender, attacker, total
        var totalWeaponPoint;
        var damagePerWeapon;
        for(var i=1;i<=roundStatsNumber;i++)
        {
            roundResult[i] = getMuOneRoundResult(MuId, i);
            roundResultPoint[i]=0;
            for(var q=0;q<6;q++)
            {
                if (roundResult[i][q]!=0)
                {
                    roundResultString[i] += (roundResult[i][q]+" "+"q"+q+" ");
                    totalResult[q] += roundResult[i][q];
                    roundResultPoint[i] += ((q+1)*roundResult[i][q]);
                }
            }
        }
        if (typeof(CBC_Mu_DefenderTotalDamage[MuId]) == "undefined")
        {
            totalDamage[0] = 0;
        }
        else
        {
            totalDamage[0] = CBC_Mu_DefenderTotalDamage[MuId];
        }
        if (typeof(CBC_Mu_AttackerTotalDamage[MuId]) == "undefined")
        {
            totalDamage[1] = 0;
        }
        else
        {
            totalDamage[1] = CBC_Mu_AttackerTotalDamage[MuId];
        }
        totalDamage[2] = totalDamage[0] + totalDamage[1];
        totalWeaponPoint = totalResult[0]*0.5 + totalResult[1]*1.2 + totalResult[2]*1.4 + totalResult[3]*1.6 + totalResult[4]*1.8 + totalResult[5]*2;
        if (totalWeaponPoint == 0) totalWeaponPoint=1;
        damagePerWeapon = parseInt(totalDamage[2] / totalWeaponPoint);
        CBC_MuTable_TbodyAddOneLine(MuId, roundStatsNumber, roundResultString, roundResultPoint, totalResult, totalDamage, damagePerWeapon);
    }

    function getCitizenResult(CitizenId, roundStatsNumber)
    {
        function getCitizenOneRoundResult(CitizenId, RoundId)
        {
            var result = [0,0,0,0,0,0];//[Q0,Q1,Q2,Q3,Q4,Q5]
            if (typeof(CBC_Citizen_Consumption_Q0[RoundId][CitizenId]) == "undefined")
            {
                result[0] = 0;
            }
            else
            {
                result[0] = CBC_Citizen_Consumption_Q0[RoundId][CitizenId];
            }
            if (typeof(CBC_Citizen_Consumption_Q1[RoundId][CitizenId]) == "undefined")
            {
                result[1] = 0;
            }
            else
            {
                result[1] = CBC_Citizen_Consumption_Q1[RoundId][CitizenId];
            }
            if (typeof(CBC_Citizen_Consumption_Q2[RoundId][CitizenId]) == "undefined")
            {
                result[2] = 0;
            }
            else
            {
                result[2] = CBC_Citizen_Consumption_Q2[RoundId][CitizenId];
            }
            if (typeof(CBC_Citizen_Consumption_Q3[RoundId][CitizenId]) == "undefined")
            {
                result[3] = 0;
            }
            else
            {
                result[3] = CBC_Citizen_Consumption_Q3[RoundId][CitizenId];
            }
            if (typeof(CBC_Citizen_Consumption_Q4[RoundId][CitizenId]) == "undefined")
            {
                result[4] = 0;
            }
            else
            {
                result[4] = CBC_Citizen_Consumption_Q4[RoundId][CitizenId];
            }
            if (typeof(CBC_Citizen_Consumption_Q5[RoundId][CitizenId]) == "undefined")
            {
                result[5] = 0;
            }
            else
            {
                result[5] = CBC_Citizen_Consumption_Q5[RoundId][CitizenId];
            }
            return result;
        }

        var roundResult = []; //roundResult[roundId][Q0-Q5]
        var roundResultString = ["","","","","","","","","","","","","","","",""]; //roundResultString[roundId]
        var roundResultPoint = []; //roundResult[roundId]
        var totalResult = [0,0,0,0,0,0]; //totalResult[Q0-Q5]
        var totalDamage = []; //defender, attacker, total
        var totalWeaponPoint;
        var damagePerWeapon;
        for(var i=1;i<=roundStatsNumber;i++)
        {
            roundResult[i] = getCitizenOneRoundResult(CitizenId, i);
            roundResultPoint[i]=0;
            for(var q=0;q<6;q++)
            {
                if (roundResult[i][q]!=0)
                {
                    roundResultString[i] += (roundResult[i][q]+" "+"q"+q+" ");
                    totalResult[q] += roundResult[i][q];
                    roundResultPoint[i] += ((q+1)*roundResult[i][q]);
                }
            }
        }
        if (typeof(CBC_Citizen_DefenderTotalDamage[CitizenId]) == "undefined")
        {
            totalDamage[0] = 0;
        }
        else
        {
            totalDamage[0] = CBC_Citizen_DefenderTotalDamage[CitizenId];
        }
        if (typeof(CBC_Citizen_AttackerTotalDamage[CitizenId]) == "undefined")
        {
            totalDamage[1] = 0;
        }
        else
        {
            totalDamage[1] = CBC_Citizen_AttackerTotalDamage[CitizenId];
        }
        totalDamage[2] = totalDamage[0] + totalDamage[1];
        totalWeaponPoint = totalResult[0]*0.5 + totalResult[1]*1.2 + totalResult[2]*1.4 + totalResult[3]*1.6 + totalResult[4]*1.8 + totalResult[5]*2;
        if (totalWeaponPoint == 0) totalWeaponPoint=1;
        damagePerWeapon = parseInt(totalDamage[2] / totalWeaponPoint);
        CBC_CitizenTable_TbodyAddOneLine(CitizenId, roundStatsNumber, roundResultString, roundResultPoint, totalResult, totalDamage, damagePerWeapon);
    }


    function showResult(roundStatsNumber)
    {
        for(var ci=0;ci<CBC_FightedCountryId.length;ci++)
        {
            getCountryResult(CBC_FightedCountryId[ci], roundStatsNumber);
        }
        for(var mi=0;mi<CBC_FightedMuId.length;mi++)
        {
            getMuResult(CBC_FightedMuId[mi], roundStatsNumber);
        }
        for(var pi=0;pi<CBC_FightedCitizenId.length;pi++)
        {
            getCitizenResult(CBC_FightedCitizenId[pi], roundStatsNumber);
        }
    }

    function PrefixInteger(num, n) { //前位补零，便于排序
        return (Array(n).join(0) + num).slice(-n);
    }

    //预先排序
    //前提条件：内容Tbody的Id = 内容TR的class + "ResultTbody"
    function sortResultTable(trClass, roundStatsNumber)
    {
        var keys = [];
        var weapons = [];
        var totalPoint;
        var stp;
        $("."+trClass).each(function(index, tr) {
            weapons[0] = parseInt($(this).children("td:eq("+(roundStatsNumber+1)+")").text());
            weapons[1] = parseInt($(this).children("td:eq("+(roundStatsNumber+2)+")").text());
            weapons[2] = parseInt($(this).children("td:eq("+(roundStatsNumber+3)+")").text());
            weapons[3] = parseInt($(this).children("td:eq("+(roundStatsNumber+4)+")").text());
            weapons[4] = parseInt($(this).children("td:eq("+(roundStatsNumber+5)+")").text());
            weapons[5] = parseInt($(this).children("td:eq("+(roundStatsNumber+6)+")").text());
            totalPoint = weapons[1] + weapons[2]*2 + weapons[3]*3 + weapons[4]*4 + weapons[5]*5;
            stp = PrefixInteger(totalPoint, 6);
            keys.push(stp + " " + $(this).attr("id"));
        });
        keys.sort();
        $.each(keys, function(index, value) {
            var trId = value.split(" ").pop();
            $("#" + trId).prependTo($("#"+trClass+"ResultTbody"));
        });
    }

    //根据具体列排序
    function customSortResultTable(trClass, columnIndex)
    {
        var keys = [];
        var stp;
        $("."+trClass).each(function(index, tr) {
            stp = $(this).children("td:eq("+columnIndex+")").attr("sortPoint");
            stp = PrefixInteger(stp, 15);
            keys.push(stp + " " + $(this).attr("id"));
        });
        keys.sort();
        $.each(keys, function(index, value) {
            var trId = value.split(" ").pop();
            $("#" + trId).prependTo($("#"+trClass+"ResultTbody"));
        });
    }


    function getOneRoundStats(calBattleConsumption, battleID, roundID, roundStatsNumber)
    {
        $.ajax({
            url: 'apiFights.html?battleId=' + battleID + '&roundId=' + roundID,
            success: function(data)
            {
                //定义
                CBC_Country_Consumption_Q0[roundID] = [];
                CBC_Country_Consumption_Q1[roundID] = [];
                CBC_Country_Consumption_Q2[roundID] = [];
                CBC_Country_Consumption_Q3[roundID] = [];
                CBC_Country_Consumption_Q4[roundID] = [];
                CBC_Country_Consumption_Q5[roundID] = [];
                CBC_Mu_Consumption_Q0[roundID] = [];
                CBC_Mu_Consumption_Q1[roundID] = [];
                CBC_Mu_Consumption_Q2[roundID] = [];
                CBC_Mu_Consumption_Q3[roundID] = [];
                CBC_Mu_Consumption_Q4[roundID] = [];
                CBC_Mu_Consumption_Q5[roundID] = [];
                CBC_Citizen_Consumption_Q0[roundID] = [];
                CBC_Citizen_Consumption_Q1[roundID] = [];
                CBC_Citizen_Consumption_Q2[roundID] = [];
                CBC_Citizen_Consumption_Q3[roundID] = [];
                CBC_Citizen_Consumption_Q4[roundID] = [];
                CBC_Citizen_Consumption_Q5[roundID] = [];

                analyseOneRoundStats(data, roundID);
                calBattleConsumption.text("剩余" + (roundStatsNumber-roundID) + "个");
                if (roundID>=roundStatsNumber)
                {
                    calBattleConsumption.text("获取成功");
                    showResult(roundStatsNumber);
                    sortResultTable("CBCCountry", roundStatsNumber);
                    sortResultTable("CBCMu", roundStatsNumber);
                    sortResultTable("CBCCitizen", roundStatsNumber);
                }
                else
                {
                    getOneRoundStats(calBattleConsumption, battleID, roundID+1, roundStatsNumber);
                }
            },
            error: function(xhr,textStatus){
                console.log("抓取错误 (", textStatus, ")，重新抓取");
                $.ajax(this);
            },
        });
    }


}

// 在线玩家详细信息
function enhanceCitizensOnline()
{
    if ($('td', $("table.dataTable tr:gt(0)")).length === 1) {// 没有公民
        return;
    }

    ShowAllCitizenPage();
    ShowCitizenInfo();
    SortCitizen();
    CitizenFilter();

    function ShowCitizenInfo()
    {
        var divCitizensOnline = $(".dataTable :first").parent();
        var divPanel = $("<div class='foundation-style columns'></div>");
        divCitizensOnline.before(divPanel);

        //默认使用武器
        var selectDefaultWeaponLabel = $("<b>", {text:"默认使用武器：", title:"不开坦克buff的情况下该服务器大多数玩家使用的武器"}).appendTo(divPanel);
        var selectDefaultWeapon = $("<select>", {id:"DefaultWeapon", style:"padding:3px; margin:3px;"}).appendTo(divPanel);
        $("<option>", {value:1, text:"Q1"}).appendTo(selectDefaultWeapon);
        $("<option>", {value:5, text:"Q5"}).appendTo(selectDefaultWeapon);
        var defaultWeaponSettings = localStorage.getItem("CitizensOnlineDefaultWeapon");
        if (defaultWeaponSettings === null)
        {
            //无记录，设置为默认值Q1
            localStorage.setItem("CitizensOnlineDefaultWeapon", 1);
            selectDefaultWeapon.val(1);
        }
        else
        {
            selectDefaultWeapon.val(defaultWeaponSettings);
        }
        selectDefaultWeapon.change(function() {
            localStorage.setItem("CitizensOnlineDefaultWeapon", selectDefaultWeapon.val());
        });

        //军令加成
        var DefaultMuBonus = $('<input>', {type:'checkbox', id:'DefaultMuBonus'}).appendTo(divPanel);
        var DefaultMuBonusLabel = $("<label>", {"class":"checkboxlabel", "for":"DefaultMuBonus", text:'军令加成', title:"默认精英军团（20%加成）"}).appendTo(divPanel);
        var DefaultMuBonusSettings = localStorage.getItem("CitizensOnlineDefaultMuBonus");
        if (DefaultMuBonusSettings === null)
        {
            //无记录，设置为默认值有军令加成
            localStorage.setItem("CitizensOnlineDefaultMuBonus", true);
            DefaultMuBonus.attr("checked", true);
        }
        else
        {
            DefaultMuBonus.attr("checked", DefaultMuBonusSettings == "true");
        }
        DefaultMuBonus.click(function() {
            if (DefaultMuBonus.is(':checked'))
            {
                localStorage.setItem("CitizensOnlineDefaultMuBonus", true);
            }
            else
            {
                localStorage.setItem("CitizensOnlineDefaultMuBonus", false);
            }
        });

        //更多伤害
        var selectMoreDamageLabel = $("<span>", {text:"    更多伤害："}).appendTo(divPanel);
        var selectMoreDamage = $("<select>", {id:"MoreDamage", style:"padding:3px; margin:3px;"}).appendTo(divPanel);
        for(var i=0; i<=40; i++)
        {
            $("<option>", {value:(i*10), text:(i*10).toString()+"%"}).appendTo(selectMoreDamage);
        }
        var MoreDamageSettings = localStorage.getItem("CitizensOnlineMoreDamage");
        if (MoreDamageSettings === null)
        {
            //无记录，设置为默认值0%
            localStorage.setItem("CitizensOnlineMoreDamage", 0);
            selectMoreDamage.val(0);
        }
        else
        {
            selectMoreDamage.val(MoreDamageSettings);
        }
        selectMoreDamage.change(function() {
            localStorage.setItem("CitizensOnlineMoreDamage", selectMoreDamage.val());
        });

        //更多暴击
        var selectMoreCriticalLabel = $("<span>", {text:"更多暴击："}).appendTo(divPanel);
        var selectMoreCritical = $("<select>", {id:"MoreCritical", style:"padding:3px; margin:3px;"}).appendTo(divPanel);
        for(var i=0; i<=20; i++)
        {
            $("<option>", {value:(i*10), text:(i*10).toString()+"%"}).appendTo(selectMoreCritical);
        }
        var MoreCriticalSettings = localStorage.getItem("CitizensOnlineMoreCritical");
        if (MoreCriticalSettings === null)
        {
            //无记录，设置为默认值0%
            localStorage.setItem("CitizensOnlineMoreCritical", 0);
            selectMoreCritical.val(0);
        }
        else
        {
            selectMoreCritical.val(MoreCriticalSettings);
        }
        selectMoreCritical.change(function() {
            localStorage.setItem("CitizensOnlineMoreCritical", selectMoreCritical.val());
        });


        var showOnlinePlayerDetail = $("<input type='button' class='foundation-style button' value='获取玩家状态'></input> ");
        divPanel.append(showOnlinePlayerDetail);

        showOnlinePlayerDetail.click(function() {
            showOnlinePlayerDetail.attr("disabled", true);
            $("table.dataTable tr:eq(0)").append($("<td exid='info'>详细信息</td>"));
            $("table.dataTable tr:gt(0)").append($('<td exid="info"><span id="buffs">BUFF：</span><br><span id="estBerserkAvg" title="伤害不含建筑加成，默认有本地加成，无被包围加成">连击平均伤害：加载中……</span><br><span id="score1" title="与无装备状态相比">总伤害：加载中……</span><br><span id="score2" title="与无装备状态相比，且不考虑闪避属性(avoid)">爆发力：加载中……</span></td>'));
            GetOnlinePlayerDetail();
        });

        function formatNumber(Num) {
            Num += "";
            var arr = Num.split(".");
            var re = /(\d{1,3})(?=(\d{3})+$)/g;
            return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
        }

        function GetOnlinePlayerDetail()
        {
            var citizenDivs = $('table.dataTable:last tr:gt(0)');
            var pendingCitizenDivNumber = citizenDivs.length;
            citizenDivs.each(function() {
                var citizenId = parseInt($('td:first a', $(this)).attr('href').match(/([0-9]+)$/)[1]);
                var citizenTr = $(this);

                fetchAndUpdateOneCitizenPage(citizenId, false, function() {
                    if (citizenPage[citizenId].equipments.length === 0) { // 一般是组织号
                        $("td[exid='info']", citizenTr).html("组织号");
                        return true;
                    }
                    // 添加buff和debuff
                    var buffsAndDebuffs = [];
                    $.each(citizenPage[citizenId].buffIcons, function(index, url) {
                        buffsAndDebuffs.push( $("<img>", {src:url, style:"width:20px; height:20px; vertical-align:middle;"}));
                    });
                    $.each(citizenPage[citizenId].debuffIcons, function(index, url) {
                        buffsAndDebuffs.push( $("<img>", {src:url, style:"width:20px; height:20px; vertical-align:middle;"}));
                    });
                    if (buffsAndDebuffs.length>0)
                    {
                        $("#buffs", citizenTr).append(buffsAndDebuffs);
                    }
                    else
                    {
                        $("#buffs", citizenTr).append("无");
                    }

                    var score1;
                    var score2;

                    var painDealerBonus = 0;
                    var steroidBonus = 0;
                    var tankBonus = 0;
                    var swrbunkBonus = 0;

                    var weaponQ = 1.0;
                    var dw = $("#DefaultWeapon").val();
                    if (dw == 0)
                    {
                        weaponQ = 0.5;
                    }
                    else
                    {
                        weaponQ = 1.0 + dw * 0.2;
                    }

                    var muBonus;
                    if ($("#DefaultMuBonus").is(":checked"))
                    {
                        muBonus = 1.2;
                    }
                    else
                    {
                        muBonus = 1.0;
                    }

                    var moreDamage = 1 + $("#MoreDamage").val()*0.01;
                    var moreCritical = 1 + $("#MoreCritical").val()*0.01;

                    var element = citizenPage[citizenId].buffIcons;
                    for(var i=0;i<citizenPage[citizenId].debuffIcons.length;i++)
                    {
                        element.push(citizenPage[citizenId].debuffIcons[i]);
                    }
                    for (var j = 0; j < element.length; j++) {
                        var buff = element[j].match(/(steroids|tank|spa|vacations|bunker|resistance|painDealer1h|painDealer10h|painDealer25h)\_(positive|negative)/ig);
                        if (buff === null) break;
                        switch (buff[0]) {
                            case "painDealer10h_positive":
                            case "painDealer1h_positive":
                            case "painDealer25h_positive":
                                painDealerBonus = 1;
                                break;
                            case "steroids_positive":
                                steroidBonus=1;
                                break;
                            case "steroids_negative":
                                steroidBonus=-1;
                                break;
                            case "tank_positive":
                                tankBonus=1;
                                weaponQ=2;
                                break;
                            case "tank_negative":
                                tankBonus=-1;
                                weaponQ=0.5;
                                break;
                            case "bunker_positive":
                            case "resistance_positive":
                                swrbunkBonus=1;
                                break;
                            case "bunker_negative":
                            case "resistance_negative":
                                swrbunkBonus=1;
                                break;
                            default:
                                break;
                        }
                    }
                    var totalDamage = 1;
                    var minDmg = citizenPage[citizenId].lowHit;
                    var maxDmg = citizenPage[citizenId].highHit;
                    var crit = citizenPage[citizenId].critical / 100;
                    var miss = citizenPage[citizenId].miss / 100;
                    var avoid = citizenPage[citizenId].avoid / 100;
                    var modified_crit;
                    var factor = weaponQ;
                    //伤害不含建筑加成，默认有本地加成，无被包围加成
                    modified_crit = crit;
                    if (painDealerBonus == 1)
                    {
                        modified_crit = modified_crit * 2;
                    }
                    modified_crit = modified_crit * moreCritical;
                    if (modified_crit > 0.8)
                    {
                        modified_crit = 0.8;
                    }
                    if (steroidBonus == 1) factor = factor * 1.2;
                    else if (steroidBonus == -1) factor = factor * 0.8;
                    if (tankBonus == 1) factor = factor * 1.2;
                    if (swrbunkBonus == 1) factor = factor * 1.25;
                    else if (swrbunkBonus == -1) factor = factor * 0.8;
                    factor = factor * muBonus;
                    factor = factor * 1.2; //本地加成
                    //factor = factor * 0.8; 包围加成
                    factor = factor * moreDamage;
                    var minHit = Math.round(minDmg * factor * 5);
                    var maxHit = Math.round(maxDmg * factor * 5);
                    var hit = (minHit + maxHit) * (1 + modified_crit)/ 10;

                    $("#estBerserkAvg",citizenTr).html("连击平均伤害："+formatNumber(Math.round(hit*5)));

                    var strength = citizenPage[citizenId].strength;
                    var rankModifier = citizenPage[citizenId].totalDamage;
                    var a = [{"damageRequired":0,"name":"Rookie","damageModifier":1},{"damageRequired":250,"name":"Private","damageModifier":1.1},{"damageRequired":1000,"name":"Private First Class","damageModifier":1.2},{"damageRequired":3000,"name":"Corporal","damageModifier":1.3},{"damageRequired":5000,"name":"Sergeant","damageModifier":1.4},{"damageRequired":10000,"name":"Staff Sergeant","damageModifier":1.5},{"damageRequired":30000,"name":"Sergeant First Class","damageModifier":1.6},{"damageRequired":60000,"name":"Master Sergeant","damageModifier":1.65},{"damageRequired":100000,"name":"First Sergeant","damageModifier":1.7},{"damageRequired":250000,"name":"Sergeant Major","damageModifier":1.75},{"damageRequired":500000,"name":"Command Sergeant Major","damageModifier":1.8},{"damageRequired":750000,"name":"Sergeant Major of the Army","damageModifier":1.85},{"damageRequired":1000000,"name":"Second Lieutenant","damageModifier":1.9},{"damageRequired":1500000,"name":"First Lieutenant","damageModifier":1.93},{"damageRequired":2500000,"name":"Captain","damageModifier":1.96},{"damageRequired":5000000,"name":"Major","damageModifier":2},{"damageRequired":10000000,"name":"Lieutenant Colonel","damageModifier":2.03},{"damageRequired":17000000,"name":"Colonel","damageModifier":2.06},{"damageRequired":25000000,"name":"Brigadier General","damageModifier":2.1},{"damageRequired":35000000,"name":"Major General","damageModifier":2.13},{"damageRequired":45000000,"name":"Lieutenant General","damageModifier":2.16},{"damageRequired":60000000,"name":"General","damageModifier":2.19},{"damageRequired":80000000,"name":"General of the Army","damageModifier":2.21},{"damageRequired":100000000,"name":"Marshall","damageModifier":2.24},{"damageRequired":125000000,"name":"Field Marshall","damageModifier":2.27},{"damageRequired":175000000,"name":"Supreme Marshall","damageModifier":2.3},{"damageRequired":250000000,"name":"Generalissimus","damageModifier":2.33},{"damageRequired":400000000,"name":"Supreme Generalissimuss","damageModifier":2.36},{"damageRequired":600000000,"name":"Imperial Generalissimus","damageModifier":2.4},{"damageRequired":800000000,"name":"Legendary Generalissimuss","damageModifier":2.42},{"damageRequired":1000000000,"name":"Imperator","damageModifier":2.44},{"damageRequired":1500000000,"name":"Imperator Caesar","damageModifier":2.46},{"damageRequired":2500000000,"name":"Deus Dimidiam","damageModifier":2.48},{"damageRequired":5000000000,"name":"Deus","damageModifier":2.5},{"damageRequired":7500000000,"name":"Summi Deus","damageModifier":2.52},{"damageRequired":10000000000,"name":"Deus Imperialis","damageModifier":2.54},{"damageRequired":15000000000,"name":"Deus Fabuloso","damageModifier":2.56},{"damageRequired":20000000000,"name":"Deus Ultimum","damageModifier":2.58}];
                    for (var i=0; i<a.length; ++i) {
                        if (a[i]['damageRequired'] > rankModifier) {
                            rankModifier = a[i-1]['damageModifier'];
                            break;
                        }
                    }
                    if (a[a.length-1]['damageRequired'] <= rankModifier) {
                        rankModifier = a[a.length-1]['damageModifier'];
                    }
                    score2 = ((minDmg+maxDmg)/2*(1 + modified_crit)*(1-miss)) / (strength*rankModifier*1.125*0.875);
                    score2 = score2<1 ? 1 : score2;
                    score1 = score2 * 0.95 / (1-avoid);
                    $('#score1',citizenTr).text( "总伤害：+"+((score1-1)*100).toFixed(2) +"%");
                    $('#score2',citizenTr).text( "爆发力：+"+((score2-1)*100).toFixed(2) +"%");

                    if (--pendingCitizenDivNumber === 0) {
                        localStorage.setItem("citizenPage", JSON.stringify(citizenPage));
                    }
                }); // 抓取每一个玩家的页面，并添加信息
            }); // 每一个玩家所在的div处理
        }
    }

    // 多页显示
    function ShowAllCitizenPage()
    {
        var pageSelector = $("#pagination-digg");
        if (pageSelector.length>0)
        {
            var showAllPage = $("<button>", {text:"加载其他页的在线玩家", "class":"foundation-style button", title:"如果需要加载所有在线玩家，请尽快点击该按钮，否则可能会出现重复玩家或丢失玩家"}).appendTo($(".dataTable tr:first td:first"));
            var dataTable = $("table.dataTable:last");
            showAllPage.click(function() {
                showAllPage.attr("disabled", true);
                var nextPage = $("li.next");
                var nowPage = parseInt($("li.active")[0].innerHTML);
                var maxPage;
                if (nextPage.length>0)
                {
                    maxPage = parseInt(nextPage.prev().children().attr("href").split("page=")[1]); //last
                }
                else
                {
                    maxPage = nowPage;
                }
                var pageLeft = maxPage-1;
                showAllPage.text("剩余" + pageLeft + "个");
                for(var npage = 1; npage<=maxPage; npage++)
                {
                    if (npage == nowPage)
                    {
                        continue;
                    }
                    var pageUrl = document.URL;
                    if (pageUrl.indexOf("page")>0)
                    {
                        pageUrl = pageUrl.substring(0, pageUrl.indexOf("page")) + "page=" + npage;
                    }
                    else if (pageUrl.indexOf("?")>0)
                    {
                        pageUrl = pageUrl + "&page=" + npage;
                    }
                    else
                    {
                        pageUrl = pageUrl + "?page=" + npage;
                    }
                    $.ajax({
                        url: pageUrl,
                        success: function(data) {
                            if ( $(".time", data).length !== 2) {
                                console.log(citizenId, "抓取错误，重新抓取");
                                $.ajax(this);
                                return;
                            }
                            if ($('td', $(".dataTable tr:gt(0)", data)).length === 1) {// 没有公民
                                return false;
                            }
                            var pageTR = $("tr :gt(0)",$(".dataTable", data));
                            pageTR.appendTo(dataTable);
                            showAllPage.text("剩余" + (--pageLeft) + "个");
                            if (pageLeft<=0)
                            {
                                showAllPage.text("加载完成，共"+maxPage+"页");
                            }
                        },
                        error: function(xhr,textStatus){
                            console.log("抓取错误 (", textStatus, ")，重新抓取");
                            $.ajax(this);
                        },
                    });
                }
            });
        }
    }

    //排序
    function SortCitizen()
    {
        sortIndex = -1;
        var value1,value2;
        var sortLevel = $("<button>", {text:"▼"}).appendTo($("table.dataTable:last tr:first td:eq(1)"));
        var sortExp = $("<button>", {text:"▼"}).appendTo($("table.dataTable:last tr:first td:eq(2)"));
        var sortDamage = $("<button>", {text:"▼"}).appendTo($("table.dataTable:last tr:first td:eq(3)"));
        var sortRegion = $("<button>", {text:"▼"}).appendTo($("table.dataTable:last tr:first td:eq(4)"));
        sortLevel.click(function() {
            checkColumnValue( $('table.dataTable:last tr:gt(0)'), "number", 1);
        });
        sortExp.click(function() {
            checkColumnValue( $('table.dataTable:last tr:gt(0)'), "formatNumber", 2);
        });
        sortDamage.click(function() {
            checkColumnValue( $('table.dataTable:last tr:gt(0)'), "formatNumber", 3);
        });
        sortRegion.click(function() {
            checkColumnValue( $('table.dataTable:last tr:gt(0)'), "region", 4);
        });
        //对表格排序
        function checkColumnValue(trs, type, index) {
            var trsValue = new Array();

            trs.each(function () {
                var tds = $(this).find('td');
                //获取行号为index列的某一行的单元格内容与该单元格所在行的行内容添加到数组trsValue中
                trsValue.push(type + ".separator" + $(tds[index]).html() + ".separator" + $(this).html());
                $(this).html("");
            });

            var len = trsValue.length;

            if (index == sortIndex) {
                //如果已经排序了则直接倒序
                trsValue.reverse();
            } else {
                for (var i = 0; i < len; i++) {
                    //split() 方法用于把一个字符串分割成字符串数组
                    //获取每行分割后数组的第一个值,即此列的数组类型,定义了字符串\数字\Ip
                    type = trsValue[i].split(".separator")[0];
                    for (var j = i + 1; j < len; j++) {
                        //获取每行分割后数组的第二个值,即文本值
                        value1 = trsValue[i].split(".separator")[1];
                        //获取下一行分割后数组的第二个值,即文本值
                        value2 = trsValue[j].split(".separator")[1];
                        //接下来是数字\字符串等的比较
                        if (type == "number") {
                            value1 = value1 == "" ? 0 : parseInt(value1);
                            value2 = value2 == "" ? 0 : parseInt(value2);
                            if (value1 < value2) {
                                var temp = trsValue[j];
                                trsValue[j] = trsValue[i];
                                trsValue[i] = temp;
                            }
                        } else if (type == "formatNumber") {
                            value1 = value1 == "" ? 0 : parseInt(value1.replace(/,/g, '').replace(/\xA0/g, ''));
                            value2 = value2 == "" ? 0 : parseInt(value2.replace(/,/g, '').replace(/\xA0/g, ''));
                            if (value1 < value2) {
                                var temp = trsValue[j];
                                trsValue[j] = trsValue[i];
                                trsValue[i] = temp;
                            }
                        } else if (type == "region") {
                            value1 = value1 == "" ? 0 : parseInt(value1.match(/id=([0-9]+)/)[1]);
                            value2 = value2 == "" ? 0 : parseInt(value2.match(/id=([0-9]+)/)[1]);
                            if (value1 < value2) {
                                var temp = trsValue[j];
                                trsValue[j] = trsValue[i];
                                trsValue[i] = temp;
                            }
                        }
                    }
                }
            }

            var tbody = $("table.dataTable:last").children();
            for (var i = 0; i < len; i++) {
                $("tr:eq(" + (i+1) + ")", tbody).html(trsValue[i].split(".separator")[2]);
            }

            sortIndex = index;
        }
    }

    // 筛选玩家
    function CitizenFilter()
    {
        var divCitizenlist = $("table.dataTable:last");
        var divCitizenlistFunction = $("<div></div>");
        divCitizenlistFunction.insertBefore(divCitizenlist);
        var tableCitizenlistFunction = $("<table align='right'></table>");
        divCitizenlistFunction.append(tableCitizenlistFunction);
        var trFilterCitizenlist = $("<tr align='right'></tr>");
        tableCitizenlistFunction.append(trFilterCitizenlist);
        var btnFilter = $("<input type='button' id='btnFilter' value='筛选玩家'></input> ");
        trFilterCitizenlist.append(btnFilter);
        var btnCloseFilter = $("<input type='button' id='btnCloseFilter' value='关闭筛选'></input> ");
        btnCloseFilter.hide();
        trFilterCitizenlist.append(btnCloseFilter);
        var btnDeleteCheckedCitizen = $("<input type='button' id='btnDeleteCheckedCitizen' value='隐藏选中玩家'></input> ");
        btnDeleteCheckedCitizen.attr("disabled", true);
        trFilterCitizenlist.append(btnDeleteCheckedCitizen);
        var btnDeleteUncheckedCitizen = $("<input type='button' id='btnDeleteUncheckedCitizen' value='保留选中玩家'></input> ");
        btnDeleteUncheckedCitizen.attr("disabled", true);
        trFilterCitizenlist.append(btnDeleteUncheckedCitizen);

        btnFilter.click(function () {
            btnFilter.hide();
            btnCloseFilter.show();
            var tableCheckbox = $("<td exid='filter'><input type='checkbox'></input></td>");
            $("tr:eq(0)", divCitizenlist).append($("<td exid='filter'><input id='filterSelectAll' type='checkbox'></input>全选</td>"));
            $("tr:gt(0)", divCitizenlist).append(tableCheckbox);
            btnDeleteCheckedCitizen.attr("disabled", false);
            btnDeleteUncheckedCitizen.attr("disabled", false);
            $("#filterSelectAll").click(function () {
                $("tr:gt(0)", divCitizenlist).each(function(index, tr) {
                    $("input:checkbox", tr).attr("checked", $('#filterSelectAll').is(':checked'));
                });
            });
        });
        btnCloseFilter.click(function () {
            btnFilter.show();
            btnCloseFilter.hide();
            $("td[exid='filter']", divCitizenlist).remove();
            btnDeleteCheckedCitizen.attr("disabled", true);
            btnDeleteUncheckedCitizen.attr("disabled", true);
        });

        btnDeleteCheckedCitizen.click(function () {
            $("tr:gt(0)", divCitizenlist).each(function(index, tr) {
                var filterCheckbox = $("input:checkbox", tr);
                if (filterCheckbox.is(':checked') === true)
                {
                    tr.remove();
                }
            });
        });
        btnDeleteUncheckedCitizen.click(function () {
            $("tr:gt(0)", divCitizenlist).each(function(index, tr) {
                var filterCheckbox = $("input:checkbox", tr);
                if (filterCheckbox.is(':checked') === false)
                {
                    tr.remove();
                }
            });
        });
    }

}

/* jqplot 1.0.9 | (c) 2009-2016 Chris Leonello | jplot.com
   jsDate | (c) 2010-2016 Chris Leonello
*/
!function(a){function b(b){a.jqplot.ElemContainer.call(this),this.name=b,this._series=[],this.show=!1,this.tickRenderer=a.jqplot.AxisTickRenderer,this.tickOptions={},this.labelRenderer=a.jqplot.AxisLabelRenderer,this.labelOptions={},this.label=null,this.showLabel=!0,this.min=null,this.max=null,this.autoscale=!1,this.pad=1.2,this.padMax=null,this.padMin=null,this.ticks=[],this.numberTicks,this.tickInterval,this.renderer=a.jqplot.LinearAxisRenderer,this.rendererOptions={},this.showTicks=!0,this.showTickMarks=!0,this.showMinorTicks=!0,this.drawMajorGridlines=!0,this.drawMinorGridlines=!1,this.drawMajorTickMarks=!0,this.drawMinorTickMarks=!0,this.useSeriesColor=!1,this.borderWidth=null,this.borderColor=null,this.scaleToHiddenSeries=!1,this._dataBounds={min:null,max:null},this._intervalStats=[],this._offsets={min:null,max:null},this._ticks=[],this._label=null,this.syncTicks=null,this.tickSpacing=75,this._min=null,this._max=null,this._tickInterval=null,this._numberTicks=null,this.__ticks=null,this._options={}}function c(b){a.jqplot.ElemContainer.call(this),this.show=!1,this.location="ne",this.labels=[],this.showLabels=!0,this.showSwatches=!0,this.placement="insideGrid",this.xoffset=0,this.yoffset=0,this.border,this.background,this.textColor,this.fontFamily,this.fontSize,this.rowSpacing="0.5em",this.renderer=a.jqplot.TableLegendRenderer,this.rendererOptions={},this.preDraw=!1,this.marginTop=null,this.marginRight=null,this.marginBottom=null,this.marginLeft=null,this.escapeHtml=!1,this._series=[],a.extend(!0,this,b)}function d(b){a.jqplot.ElemContainer.call(this),this.text=b,this.show=!0,this.fontFamily,this.fontSize,this.textAlign,this.textColor,this.renderer=a.jqplot.DivTitleRenderer,this.rendererOptions={},this.escapeHtml=!1}function e(b){b=b||{},a.jqplot.ElemContainer.call(this),this.show=!0,this.xaxis="xaxis",this._xaxis,this.yaxis="yaxis",this._yaxis,this.gridBorderWidth=2,this.renderer=a.jqplot.LineRenderer,this.rendererOptions={},this.data=[],this.gridData=[],this.label="",this.showLabel=!0,this.color,this.negativeColor,this.lineWidth=2.5,this.lineJoin="round",this.lineCap="round",this.linePattern="solid",this.shadow=!0,this.shadowAngle=45,this.shadowOffset=1.25,this.shadowDepth=3,this.shadowAlpha="0.1",this.breakOnNull=!1,this.markerRenderer=a.jqplot.MarkerRenderer,this.markerOptions={},this.showLine=!0,this.showMarker=!0,this.index,this.fill=!1,this.fillColor,this.fillAlpha,this.fillAndStroke=!1,this.disableStack=!1,this._stack=!1,this.neighborThreshold=4,this.fillToZero=!1,this.fillToValue=0,this.fillAxis="y",this.useNegativeColors=!0,this._stackData=[],this._plotData=[],this._plotValues={x:[],y:[]},this._intervals={x:{},y:{}},this._prevPlotData=[],this._prevGridData=[],this._stackAxis="y",this._primaryAxis="_xaxis",this.canvas=new a.jqplot.GenericCanvas,this.shadowCanvas=new a.jqplot.GenericCanvas,this.plugins={},this._sumy=0,this._sumx=0,this._type="",this.step=!1}function f(){a.jqplot.ElemContainer.call(this),this.drawGridlines=!0,this.gridLineColor="#cccccc",this.gridLineWidth=1,this.background="#fffdf6",this.borderColor="#999999",this.borderWidth=2,this.drawBorder=!0,this.shadow=!0,this.shadowAngle=45,this.shadowOffset=1.5,this.shadowWidth=3,this.shadowDepth=3,this.shadowColor=null,this.shadowAlpha="0.07",this._left,this._top,this._right,this._bottom,this._width,this._height,this._axes=[],this.renderer=a.jqplot.CanvasGridRenderer,this.rendererOptions={},this._offsets={top:null,bottom:null,left:null,right:null}}function g(){function h(a){for(var b,c=0;c<a.length;c++)for(var d,e=[a[c].data,a[c]._stackData,a[c]._plotData,a[c]._prevPlotData],f=0;4>f;f++)if(d=!0,b=e[f],"x"==a[c]._stackAxis){for(var g=0;g<b.length;g++)if("number"!=typeof b[g][1]){d=!1;break}d&&b.sort(function(a,b){return a[1]-b[1]})}else{for(var g=0;g<b.length;g++)if("number"!=typeof b[g][0]){d=!1;break}d&&b.sort(function(a,b){return a[0]-b[0]})}}function i(a){var b,c,d=a.data.plot,e=d.eventCanvas._elem.offset(),f={x:a.pageX-e.left,y:a.pageY-e.top},g={xaxis:null,yaxis:null,x2axis:null,y2axis:null,y3axis:null,y4axis:null,y5axis:null,y6axis:null,y7axis:null,y8axis:null,y9axis:null,yMidAxis:null},h=["xaxis","yaxis","x2axis","y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis","yMidAxis"],i=d.axes;for(b=11;b>0;b--)c=h[b-1],i[c].show&&(g[c]=i[c].series_p2u(f[c.charAt(0)]));return{offsets:e,gridPos:f,dataPos:g}}function j(b,c){function d(a,b,c){var d=(b[1]-c[1])/(b[0]-c[0]),e=b[1]-d*b[0],f=a+b[1];return[(f-e)/d,f]}var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x=c.series;for(g=c.seriesStack.length-1;g>=0;g--)switch(e=c.seriesStack[g],h=x[e],u=h._highlightThreshold,h.renderer.constructor){case a.jqplot.BarRenderer:for(j=b.x,k=b.y,f=0;f<h._barPoints.length;f++)if(t=h._barPoints[f],s=h.gridData[f],j>t[0][0]&&j<t[2][0]&&(k>t[2][1]&&k<t[0][1]||k<t[2][1]&&k>t[0][1]))return{seriesIndex:h.index,pointIndex:f,gridData:s,data:h.data[f],points:h._barPoints[f]};break;case a.jqplot.PyramidRenderer:for(j=b.x,k=b.y,f=0;f<h._barPoints.length;f++)if(t=h._barPoints[f],s=h.gridData[f],j>t[0][0]+u[0][0]&&j<t[2][0]+u[2][0]&&k>t[2][1]&&k<t[0][1])return{seriesIndex:h.index,pointIndex:f,gridData:s,data:h.data[f],points:h._barPoints[f]};break;case a.jqplot.DonutRenderer:if(n=h.startAngle/180*Math.PI,j=b.x-h._center[0],k=b.y-h._center[1],i=Math.sqrt(Math.pow(j,2)+Math.pow(k,2)),j>0&&-k>=0?l=2*Math.PI-Math.atan(-k/j):j>0&&0>-k?l=-Math.atan(-k/j):0>j?l=Math.PI-Math.atan(-k/j):0==j&&-k>0?l=3*Math.PI/2:0==j&&0>-k?l=Math.PI/2:0==j&&0==k&&(l=0),n&&(l-=n,0>l?l+=2*Math.PI:l>2*Math.PI&&(l-=2*Math.PI)),m=h.sliceMargin/180*Math.PI,i<h._radius&&i>h._innerRadius)for(f=0;f<h.gridData.length;f++)if(o=f>0?h.gridData[f-1][1]+m:m,p=h.gridData[f][1],l>o&&p>l)return{seriesIndex:h.index,pointIndex:f,gridData:[b.x,b.y],data:h.data[f]};break;case a.jqplot.PieRenderer:if(n=h.startAngle/180*Math.PI,j=b.x-h._center[0],k=b.y-h._center[1],i=Math.sqrt(Math.pow(j,2)+Math.pow(k,2)),j>0&&-k>=0?l=2*Math.PI-Math.atan(-k/j):j>0&&0>-k?l=-Math.atan(-k/j):0>j?l=Math.PI-Math.atan(-k/j):0==j&&-k>0?l=3*Math.PI/2:0==j&&0>-k?l=Math.PI/2:0==j&&0==k&&(l=0),n&&(l-=n,0>l?l+=2*Math.PI:l>2*Math.PI&&(l-=2*Math.PI)),m=h.sliceMargin/180*Math.PI,i<h._radius)for(f=0;f<h.gridData.length;f++)if(o=f>0?h.gridData[f-1][1]+m:m,p=h.gridData[f][1],l>o&&p>l)return{seriesIndex:h.index,pointIndex:f,gridData:[b.x,b.y],data:h.data[f]};break;case a.jqplot.BubbleRenderer:j=b.x,k=b.y;var y=null;if(h.show){for(var f=0;f<h.gridData.length;f++)s=h.gridData[f],r=Math.sqrt((j-s[0])*(j-s[0])+(k-s[1])*(k-s[1])),r<=s[2]&&(q>=r||null==q)&&(q=r,y={seriesIndex:e,pointIndex:f,gridData:s,data:h.data[f]});if(null!=y)return y}break;case a.jqplot.FunnelRenderer:j=b.x,k=b.y;var z,A,B,C=h._vertices,D=C[0],E=C[C.length-1];for(z=d(k,D[0],E[3]),A=d(k,D[1],E[2]),f=0;f<C.length;f++)if(B=C[f],k>=B[0][1]&&k<=B[3][1]&&j>=z[0]&&j<=A[0])return{seriesIndex:h.index,pointIndex:f,gridData:null,data:h.data[f]};break;case a.jqplot.LineRenderer:if(j=b.x,k=b.y,i=h.renderer,h.show){if(!(!(h.fill||h.renderer.bands.show&&h.renderer.bands.fill)||c.plugins.highlighter&&c.plugins.highlighter.show)){var F=!1;if(j>h._boundingBox[0][0]&&j<h._boundingBox[1][0]&&k>h._boundingBox[1][1]&&k<h._boundingBox[0][1])for(var G,H=h._areaPoints.length,f=H-1,G=0;H>G;G++){var I=[h._areaPoints[G][0],h._areaPoints[G][1]],J=[h._areaPoints[f][0],h._areaPoints[f][1]];(I[1]<k&&J[1]>=k||J[1]<k&&I[1]>=k)&&I[0]+(k-I[1])/(J[1]-I[1])*(J[0]-I[0])<j&&(F=!F),f=G}if(F)return{seriesIndex:e,pointIndex:null,gridData:h.gridData,data:h.data,points:h._areaPoints};break}w=h.markerRenderer.size/2+h.neighborThreshold,v=w>0?w:0;for(var f=0;f<h.gridData.length;f++)if(s=h.gridData[f],i.constructor==a.jqplot.OHLCRenderer)if(i.candleStick){var K=h._yaxis.series_u2p;if(j>=s[0]-i._bodyWidth/2&&j<=s[0]+i._bodyWidth/2&&k>=K(h.data[f][2])&&k<=K(h.data[f][3]))return{seriesIndex:e,pointIndex:f,gridData:s,data:h.data[f]}}else if(i.hlc){var K=h._yaxis.series_u2p;if(j>=s[0]-i._tickLength&&j<=s[0]+i._tickLength&&k>=K(h.data[f][1])&&k<=K(h.data[f][2]))return{seriesIndex:e,pointIndex:f,gridData:s,data:h.data[f]}}else{var K=h._yaxis.series_u2p;if(j>=s[0]-i._tickLength&&j<=s[0]+i._tickLength&&k>=K(h.data[f][2])&&k<=K(h.data[f][3]))return{seriesIndex:e,pointIndex:f,gridData:s,data:h.data[f]}}else if(null!=s[0]&&null!=s[1]&&(r=Math.sqrt((j-s[0])*(j-s[0])+(k-s[1])*(k-s[1])),v>=r&&(q>=r||null==q)))return q=r,{seriesIndex:e,pointIndex:f,gridData:s,data:h.data[f]}}break;default:if(j=b.x,k=b.y,i=h.renderer,h.show){w=h.markerRenderer.size/2+h.neighborThreshold,v=w>0?w:0;for(var f=0;f<h.gridData.length;f++)if(s=h.gridData[f],i.constructor==a.jqplot.OHLCRenderer)if(i.candleStick){var K=h._yaxis.series_u2p;if(j>=s[0]-i._bodyWidth/2&&j<=s[0]+i._bodyWidth/2&&k>=K(h.data[f][2])&&k<=K(h.data[f][3]))return{seriesIndex:e,pointIndex:f,gridData:s,data:h.data[f]}}else if(i.hlc){var K=h._yaxis.series_u2p;if(j>=s[0]-i._tickLength&&j<=s[0]+i._tickLength&&k>=K(h.data[f][1])&&k<=K(h.data[f][2]))return{seriesIndex:e,pointIndex:f,gridData:s,data:h.data[f]}}else{var K=h._yaxis.series_u2p;if(j>=s[0]-i._tickLength&&j<=s[0]+i._tickLength&&k>=K(h.data[f][2])&&k<=K(h.data[f][3]))return{seriesIndex:e,pointIndex:f,gridData:s,data:h.data[f]}}else if(r=Math.sqrt((j-s[0])*(j-s[0])+(k-s[1])*(k-s[1])),v>=r&&(q>=r||null==q))return q=r,{seriesIndex:e,pointIndex:f,gridData:s,data:h.data[f]}}}return null}this.animate=!1,this.animateReplot=!1,this.axes={xaxis:new b("xaxis"),yaxis:new b("yaxis"),x2axis:new b("x2axis"),y2axis:new b("y2axis"),y3axis:new b("y3axis"),y4axis:new b("y4axis"),y5axis:new b("y5axis"),y6axis:new b("y6axis"),y7axis:new b("y7axis"),y8axis:new b("y8axis"),y9axis:new b("y9axis"),yMidAxis:new b("yMidAxis")},this.baseCanvas=new a.jqplot.GenericCanvas,this.captureRightClick=!1,this.data=[],this.dataRenderer,this.dataRendererOptions,this.defaults={axesDefaults:{},axes:{xaxis:{},yaxis:{},x2axis:{},y2axis:{},y3axis:{},y4axis:{},y5axis:{},y6axis:{},y7axis:{},y8axis:{},y9axis:{},yMidAxis:{}},seriesDefaults:{},series:[]},this.defaultAxisStart=1,this.drawIfHidden=!1,this.eventCanvas=new a.jqplot.GenericCanvas,this.fillBetween={series1:null,series2:null,color:null,baseSeries:0,fill:!0},this.fontFamily,this.fontSize,this.grid=new f,this.legend=new c,this.noDataIndicator={show:!1,indicator:"Loading Data...",axes:{xaxis:{min:0,max:10,tickInterval:2,show:!0},yaxis:{min:0,max:12,tickInterval:3,show:!0}}},this.negativeSeriesColors=a.jqplot.config.defaultNegativeColors,this.options={},this.previousSeriesStack=[],this.plugins={},this.series=[],this.seriesStack=[],this.seriesColors=a.jqplot.config.defaultColors,this.sortData=!0,this.stackSeries=!1,this.syncXTicks=!0,this.syncYTicks=!0,this.target=null,this.targetId=null,this.textColor,this.title=new d,this._drawCount=0,this._sumy=0,this._sumx=0,this._stackData=[],this._plotData=[],this._width=null,this._height=null,this._plotDimensions={height:null,width:null},this._gridPadding={top:null,right:null,bottom:null,left:null},this._defaultGridPadding={top:10,right:10,bottom:23,left:10},this._addDomReference=a.jqplot.config.addDomReference,this.preInitHooks=new a.jqplot.HooksManager,this.postInitHooks=new a.jqplot.HooksManager,this.preParseOptionsHooks=new a.jqplot.HooksManager,this.postParseOptionsHooks=new a.jqplot.HooksManager,this.preDrawHooks=new a.jqplot.HooksManager,this.postDrawHooks=new a.jqplot.HooksManager,this.preDrawSeriesHooks=new a.jqplot.HooksManager,this.postDrawSeriesHooks=new a.jqplot.HooksManager,this.preDrawLegendHooks=new a.jqplot.HooksManager,this.addLegendRowHooks=new a.jqplot.HooksManager,this.preSeriesInitHooks=new a.jqplot.HooksManager,this.postSeriesInitHooks=new a.jqplot.HooksManager,this.preParseSeriesOptionsHooks=new a.jqplot.HooksManager,this.postParseSeriesOptionsHooks=new a.jqplot.HooksManager,this.eventListenerHooks=new a.jqplot.EventListenerManager,this.preDrawSeriesShadowHooks=new a.jqplot.HooksManager,this.postDrawSeriesShadowHooks=new a.jqplot.HooksManager,this.colorGenerator=new a.jqplot.ColorGenerator,this.negativeColorGenerator=new a.jqplot.ColorGenerator,this.canvasManager=new a.jqplot.CanvasManager,this.themeEngine=new a.jqplot.ThemeEngine;this.init=function(c,d,e){e=e||{};for(var f=0;f<a.jqplot.preInitHooks.length;f++)a.jqplot.preInitHooks[f].call(this,c,d,e);for(var f=0;f<this.preInitHooks.hooks.length;f++)this.preInitHooks.hooks[f].call(this,c,d,e);if(this.targetId="#"+c,this.target=a("#"+c),this._addDomReference&&this.target.data("jqplot",this),this.target.removeClass("jqplot-error"),!this.target.get(0))throw new Error("No plot target specified");if("static"==this.target.css("position")&&this.target.css("position","relative"),this.target.hasClass("jqplot-target")||this.target.addClass("jqplot-target"),this.target.height())this._height=g=this.target.height();else{var g;g=e&&e.height?parseInt(e.height,10):this.target.attr("data-height")?parseInt(this.target.attr("data-height"),10):parseInt(a.jqplot.config.defaultHeight,10),this._height=g,this.target.css("height",g+"px")}if(this.target.width())this._width=i=this.target.width();else{var i;i=e&&e.width?parseInt(e.width,10):this.target.attr("data-width")?parseInt(this.target.attr("data-width"),10):parseInt(a.jqplot.config.defaultWidth,10),this._width=i,this.target.css("width",i+"px")}for(var f=0,j=G.length;j>f;f++)this.axes[G[f]]=new b(G[f]);if(this._plotDimensions.height=this._height,this._plotDimensions.width=this._width,this.grid._plotDimensions=this._plotDimensions,this.title._plotDimensions=this._plotDimensions,this.baseCanvas._plotDimensions=this._plotDimensions,this.eventCanvas._plotDimensions=this._plotDimensions,this.legend._plotDimensions=this._plotDimensions,this._height<=0||this._width<=0||!this._height||!this._width)throw new Error("Canvas dimension not set");if(e.dataRenderer&&a.isFunction(e.dataRenderer)&&(e.dataRendererOptions&&(this.dataRendererOptions=e.dataRendererOptions),this.dataRenderer=e.dataRenderer,d=this.dataRenderer(d,this,this.dataRendererOptions)),e.noDataIndicator&&a.isPlainObject(e.noDataIndicator)&&a.extend(!0,this.noDataIndicator,e.noDataIndicator),null==d||0==a.isArray(d)||0==d.length||0==a.isArray(d[0])||0==d[0].length){if(0==this.noDataIndicator.show)throw new Error("No data specified");for(var k in this.noDataIndicator.axes)for(var l in this.noDataIndicator.axes[k])this.axes[k][l]=this.noDataIndicator.axes[k][l];this.postDrawHooks.add(function(){var b=this.eventCanvas.getHeight(),c=this.eventCanvas.getWidth(),d=a('<div class="jqplot-noData-container" style="position:absolute;"></div>');this.target.append(d),d.height(b),d.width(c),d.css("top",this.eventCanvas._offsets.top),d.css("left",this.eventCanvas._offsets.left);var e=a('<div class="jqplot-noData-contents" style="text-align:center; position:relative; margin-left:auto; margin-right:auto;"></div>');d.append(e),e.html(this.noDataIndicator.indicator);var f=e.height(),g=e.width();e.height(f),e.width(g),e.css("top",(b-f)/2+"px")})}this.data=a.extend(!0,[],d),this.parseOptions(e),this.textColor&&this.target.css("color",this.textColor),this.fontFamily&&this.target.css("font-family",this.fontFamily),this.fontSize&&this.target.css("font-size",this.fontSize),this.title.init(),this.legend.init(),this._sumy=0,this._sumx=0,this.computePlotData();for(var f=0;f<this.series.length;f++){this.seriesStack.push(f),this.previousSeriesStack.push(f),this.series[f].shadowCanvas._plotDimensions=this._plotDimensions,this.series[f].canvas._plotDimensions=this._plotDimensions;for(var m=0;m<a.jqplot.preSeriesInitHooks.length;m++)a.jqplot.preSeriesInitHooks[m].call(this.series[f],c,this.data,this.options.seriesDefaults,this.options.series[f],this);for(var m=0;m<this.preSeriesInitHooks.hooks.length;m++)this.preSeriesInitHooks.hooks[m].call(this.series[f],c,this.data,this.options.seriesDefaults,this.options.series[f],this);this.series[f]._plotDimensions=this._plotDimensions,this.series[f].init(f,this.grid.borderWidth,this);for(var m=0;m<a.jqplot.postSeriesInitHooks.length;m++)a.jqplot.postSeriesInitHooks[m].call(this.series[f],c,this.data,this.options.seriesDefaults,this.options.series[f],this);for(var m=0;m<this.postSeriesInitHooks.hooks.length;m++)this.postSeriesInitHooks.hooks[m].call(this.series[f],c,this.data,this.options.seriesDefaults,this.options.series[f],this);this._sumy+=this.series[f]._sumy,this._sumx+=this.series[f]._sumx}for(var n,o,f=0,j=G.length;j>f;f++)n=G[f],o=this.axes[n],o._plotDimensions=this._plotDimensions,o.init(),null==this.axes[n].borderColor&&("x"!==n.charAt(0)&&o.useSeriesColor===!0&&o.show?o.borderColor=o._series[0].color:o.borderColor=this.grid.borderColor);this.sortData&&h(this.series),this.grid.init(),this.grid._axes=this.axes,this.legend._series=this.series;for(var f=0;f<a.jqplot.postInitHooks.length;f++)a.jqplot.postInitHooks[f].call(this,c,this.data,e);for(var f=0;f<this.postInitHooks.hooks.length;f++)this.postInitHooks.hooks[f].call(this,c,this.data,e)},this.resetAxesScale=function(b,c){var d=c||{},e=b||this.axes;if(e===!0&&(e=this.axes),a.isArray(e))for(var f=0;f<e.length;f++)this.axes[e[f]].resetScale(d[e[f]]);else if("object"==typeof e)for(var g in e)this.axes[g].resetScale(d[g])},this.reInitialize=function(c,d){for(var e=a.extend(!0,{},this.options,d),f=this.targetId.substr(1),g=null==c?this.data:c,i=0;i<a.jqplot.preInitHooks.length;i++)a.jqplot.preInitHooks[i].call(this,f,g,e);for(var i=0;i<this.preInitHooks.hooks.length;i++)this.preInitHooks.hooks[i].call(this,f,g,e);if(this._height=this.target.height(),this._width=this.target.width(),this._height<=0||this._width<=0||!this._height||!this._width)throw new Error("Target dimension not set");this._plotDimensions.height=this._height,this._plotDimensions.width=this._width,this.grid._plotDimensions=this._plotDimensions,this.title._plotDimensions=this._plotDimensions,this.baseCanvas._plotDimensions=this._plotDimensions,this.eventCanvas._plotDimensions=this._plotDimensions,this.legend._plotDimensions=this._plotDimensions;for(var j,k,l,m,i=0,n=G.length;n>i;i++){j=G[i],m=this.axes[j],k=m._ticks;for(var l=0,o=k.length;o>l;l++){var p=k[l]._elem;p&&(a.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==F&&window.G_vmlCanvasManager.uninitElement(p.get(0)),p.emptyForce(),p=null,k._elem=null)}k=null,delete m.ticks,delete m._ticks,this.axes[j]=new b(j),this.axes[j]._plotWidth=this._width,this.axes[j]._plotHeight=this._height}c&&(e.dataRenderer&&a.isFunction(e.dataRenderer)&&(e.dataRendererOptions&&(this.dataRendererOptions=e.dataRendererOptions),this.dataRenderer=e.dataRenderer,c=this.dataRenderer(c,this,this.dataRendererOptions)),this.data=a.extend(!0,[],c)),d&&this.parseOptions(e),this.title._plotWidth=this._width,this.textColor&&this.target.css("color",this.textColor),this.fontFamily&&this.target.css("font-family",this.fontFamily),this.fontSize&&this.target.css("font-size",this.fontSize),this.title.init(),this.legend.init(),this._sumy=0,this._sumx=0,this.seriesStack=[],this.previousSeriesStack=[],this.computePlotData();for(var i=0,n=this.series.length;n>i;i++){this.seriesStack.push(i),this.previousSeriesStack.push(i),this.series[i].shadowCanvas._plotDimensions=this._plotDimensions,this.series[i].canvas._plotDimensions=this._plotDimensions;for(var l=0;l<a.jqplot.preSeriesInitHooks.length;l++)a.jqplot.preSeriesInitHooks[l].call(this.series[i],f,this.data,this.options.seriesDefaults,this.options.series[i],this);for(var l=0;l<this.preSeriesInitHooks.hooks.length;l++)this.preSeriesInitHooks.hooks[l].call(this.series[i],f,this.data,this.options.seriesDefaults,this.options.series[i],this);this.series[i]._plotDimensions=this._plotDimensions,this.series[i].init(i,this.grid.borderWidth,this);for(var l=0;l<a.jqplot.postSeriesInitHooks.length;l++)a.jqplot.postSeriesInitHooks[l].call(this.series[i],f,this.data,this.options.seriesDefaults,this.options.series[i],this);for(var l=0;l<this.postSeriesInitHooks.hooks.length;l++)this.postSeriesInitHooks.hooks[l].call(this.series[i],f,this.data,this.options.seriesDefaults,this.options.series[i],this);this._sumy+=this.series[i]._sumy,this._sumx+=this.series[i]._sumx}for(var i=0,n=G.length;n>i;i++)j=G[i],m=this.axes[j],m._plotDimensions=this._plotDimensions,m.init(),null==m.borderColor&&("x"!==j.charAt(0)&&m.useSeriesColor===!0&&m.show?m.borderColor=m._series[0].color:m.borderColor=this.grid.borderColor);this.sortData&&h(this.series),this.grid.init(),this.grid._axes=this.axes,this.legend._series=this.series;for(var i=0,n=a.jqplot.postInitHooks.length;n>i;i++)a.jqplot.postInitHooks[i].call(this,f,this.data,e);for(var i=0,n=this.postInitHooks.hooks.length;n>i;i++)this.postInitHooks.hooks[i].call(this,f,this.data,e)},this.quickInit=function(){if(this._height=this.target.height(),this._width=this.target.width(),this._height<=0||this._width<=0||!this._height||!this._width)throw new Error("Target dimension not set");this._plotDimensions.height=this._height,this._plotDimensions.width=this._width,this.grid._plotDimensions=this._plotDimensions,this.title._plotDimensions=this._plotDimensions,this.baseCanvas._plotDimensions=this._plotDimensions,this.eventCanvas._plotDimensions=this._plotDimensions,this.legend._plotDimensions=this._plotDimensions;for(var b in this.axes)this.axes[b]._plotWidth=this._width,this.axes[b]._plotHeight=this._height;this.title._plotWidth=this._width,this.textColor&&this.target.css("color",this.textColor),this.fontFamily&&this.target.css("font-family",this.fontFamily),this.fontSize&&this.target.css("font-size",this.fontSize),this._sumy=0,this._sumx=0,this.computePlotData();for(var c=0;c<this.series.length;c++)"line"===this.series[c]._type&&this.series[c].renderer.bands.show&&this.series[c].renderer.initBands.call(this.series[c],this.series[c].renderer.options,this),this.series[c]._plotDimensions=this._plotDimensions,this.series[c].canvas._plotDimensions=this._plotDimensions,this._sumy+=this.series[c]._sumy,this._sumx+=this.series[c]._sumx;for(var d,e=0;12>e;e++){d=G[e];for(var f=this.axes[d]._ticks,c=0;c<f.length;c++){var g=f[c]._elem;g&&(a.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==F&&window.G_vmlCanvasManager.uninitElement(g.get(0)),g.emptyForce(),g=null,f._elem=null)}f=null,this.axes[d]._plotDimensions=this._plotDimensions,this.axes[d]._ticks=[]}this.sortData&&h(this.series),this.grid._axes=this.axes,this.legend._series=this.series},this.computePlotData=function(){this._plotData=[],this._stackData=[];var b,c,d;for(c=0,d=this.series.length;d>c;c++){b=this.series[c],this._plotData.push([]),this._stackData.push([]);var e=b.data;this._plotData[c]=a.extend(!0,[],e),this._stackData[c]=a.extend(!0,[],e),b._plotData=this._plotData[c],b._stackData=this._stackData[c];var f={x:[],y:[]};if(this.stackSeries&&!b.disableStack){b._stack=!0;for(var g="x"===b._stackAxis?0:1,h=0,i=e.length;i>h;h++){var j=e[h][g];if(null==j&&(j=0),this._plotData[c][h][g]=j,this._stackData[c][h][g]=j,c>0)for(var k=c;k--;){var l=this._plotData[k][h][g];if(j*l>=0){this._plotData[c][h][g]+=l,this._stackData[c][h][g]+=l;break}}}}else{for(var m=0;m<b.data.length;m++)f.x.push(b.data[m][0]),f.y.push(b.data[m][1]);this._stackData.push(b.data),this.series[c]._stackData=b.data,this._plotData.push(b.data),b._plotData=b.data,b._plotValues=f}for(c>0&&(b._prevPlotData=this.series[c-1]._plotData),b._sumy=0,b._sumx=0,m=b.data.length-1;m>-1;m--)b._sumy+=b.data[m][1],b._sumx+=b.data[m][0]}},this.populatePlotData=function(b,c){this._plotData=[],this._stackData=[],b._stackData=[],b._plotData=[];var d={x:[],y:[]};if(this.stackSeries&&!b.disableStack){b._stack=!0;for(var e,f,g,h,i="x"===b._stackAxis?0:1,j=a.extend(!0,[],b.data),k=a.extend(!0,[],b.data),l=0;c>l;l++)for(var m=this.series[l].data,n=0;n<m.length;n++)g=m[n],e=null!=g[0]?g[0]:0,f=null!=g[1]?g[1]:0,j[n][0]+=e,j[n][1]+=f,h=i?f:e,b.data[n][i]*h>=0&&(k[n][i]+=h);for(var o=0;o<k.length;o++)d.x.push(k[o][0]),d.y.push(k[o][1]);this._plotData.push(k),this._stackData.push(j),b._stackData=j,b._plotData=k,b._plotValues=d}else{for(var o=0;o<b.data.length;o++)d.x.push(b.data[o][0]),d.y.push(b.data[o][1]);this._stackData.push(b.data),this.series[c]._stackData=b.data,this._plotData.push(b.data),b._plotData=b.data,b._plotValues=d}for(c>0&&(b._prevPlotData=this.series[c-1]._plotData),b._sumy=0,b._sumx=0,o=b.data.length-1;o>-1;o--)b._sumy+=b.data[o][1],b._sumx+=b.data[o][0]},this.getNextSeriesColor=function(a){var b=0,c=a.seriesColors;return function(){return b<c.length?c[b++]:(b=0,c[b++])}}(this),this.parseOptions=function(b){for(var c=0;c<this.preParseOptionsHooks.hooks.length;c++)this.preParseOptionsHooks.hooks[c].call(this,b);for(var c=0;c<a.jqplot.preParseOptionsHooks.length;c++)a.jqplot.preParseOptionsHooks[c].call(this,b);this.options=a.extend(!0,{},this.defaults,b);var d=this.options;if(this.animate=d.animate,this.animateReplot=d.animateReplot,this.stackSeries=d.stackSeries,a.isPlainObject(d.fillBetween))for(var f,g=["series1","series2","color","baseSeries","fill"],c=0,h=g.length;h>c;c++)f=g[c],null!=d.fillBetween[f]&&(this.fillBetween[f]=d.fillBetween[f]);d.seriesColors&&(this.seriesColors=d.seriesColors),d.negativeSeriesColors&&(this.negativeSeriesColors=d.negativeSeriesColors),d.captureRightClick&&(this.captureRightClick=d.captureRightClick),this.defaultAxisStart=b&&null!=b.defaultAxisStart?b.defaultAxisStart:this.defaultAxisStart,this.colorGenerator.setColors(this.seriesColors),this.negativeColorGenerator.setColors(this.negativeSeriesColors),a.extend(!0,this._gridPadding,d.gridPadding),this.sortData=null!=d.sortData?d.sortData:this.sortData;for(var c=0;12>c;c++){var i=G[c],j=this.axes[i];j._options=a.extend(!0,{},d.axesDefaults,d.axes[i]),a.extend(!0,j,d.axesDefaults,d.axes[i]),j._plotWidth=this._width,j._plotHeight=this._height}var k=function(b,c,d){var e,f,g=[];if(c=c||"vertical",a.isArray(b[0]))a.extend(!0,g,b);else for(e=0,f=b.length;f>e;e++)"vertical"==c?g.push([d+e,b[e]]):g.push([b[e],d+e]);return g};this.series=[];for(var c=0;c<this.data.length;c++){for(var l=a.extend(!0,{index:c},{seriesColors:this.seriesColors,negativeSeriesColors:this.negativeSeriesColors},this.options.seriesDefaults,this.options.series[c],{rendererOptions:{animation:{show:this.animate}}}),g=new e(l),m=0;m<a.jqplot.preParseSeriesOptionsHooks.length;m++)a.jqplot.preParseSeriesOptionsHooks[m].call(g,this.options.seriesDefaults,this.options.series[c]);for(var m=0;m<this.preParseSeriesOptionsHooks.hooks.length;m++)this.preParseSeriesOptionsHooks.hooks[m].call(g,this.options.seriesDefaults,this.options.series[c]);a.extend(!0,g,l);var n="vertical";switch(g.renderer===a.jqplot.BarRenderer&&g.rendererOptions&&"horizontal"==g.rendererOptions.barDirection&&(n="horizontal",g._stackAxis="x",g._primaryAxis="_yaxis"),g.data=k(this.data[c],n,this.defaultAxisStart),g.xaxis){case"xaxis":g._xaxis=this.axes.xaxis;break;case"x2axis":g._xaxis=this.axes.x2axis}g._yaxis=this.axes[g.yaxis],g._xaxis._series.push(g),g._yaxis._series.push(g),g.show?(g._xaxis.show=!0,g._yaxis.show=!0):(g._xaxis.scaleToHiddenSeries&&(g._xaxis.show=!0),g._yaxis.scaleToHiddenSeries&&(g._yaxis.show=!0)),g.label||(g.label="Series "+(c+1).toString()),this.series.push(g);for(var m=0;m<a.jqplot.postParseSeriesOptionsHooks.length;m++)a.jqplot.postParseSeriesOptionsHooks[m].call(this.series[c],this.options.seriesDefaults,this.options.series[c]);for(var m=0;m<this.postParseSeriesOptionsHooks.hooks.length;m++)this.postParseSeriesOptionsHooks.hooks[m].call(this.series[c],this.options.seriesDefaults,this.options.series[c])}a.extend(!0,this.grid,this.options.grid);for(var c=0,h=G.length;h>c;c++){var i=G[c],j=this.axes[i];null==j.borderWidth&&(j.borderWidth=this.grid.borderWidth)}"string"==typeof this.options.title?this.title.text=this.options.title:"object"==typeof this.options.title&&a.extend(!0,this.title,this.options.title),this.title._plotWidth=this._width,this.legend.setOptions(this.options.legend);for(var c=0;c<a.jqplot.postParseOptionsHooks.length;c++)a.jqplot.postParseOptionsHooks[c].call(this,b);for(var c=0;c<this.postParseOptionsHooks.hooks.length;c++)this.postParseOptionsHooks.hooks[c].call(this,b)},this.destroy=function(){this.canvasManager.freeAllCanvases(),this.eventCanvas&&this.eventCanvas._elem&&this.eventCanvas._elem.unbind(),this.target.empty(),this.target[0].innerHTML=""},this.replot=function(b){var c=b||{},d=c.data||null,e=c.clear===!1?!1:!0,f=c.resetAxes||!1;delete c.data,delete c.clear,delete c.resetAxes,this.target.trigger("jqplotPreReplot"),e&&this.destroy(),d||!a.isEmptyObject(c)?this.reInitialize(d,c):this.quickInit(),f&&this.resetAxesScale(f,c.axes),this.draw(),this.target.trigger("jqplotPostReplot")},this.redraw=function(a){a=null!=a?a:!0,this.target.trigger("jqplotPreRedraw"),a&&(this.canvasManager.freeAllCanvases(),this.eventCanvas._elem.unbind(),this.target.empty());for(var b in this.axes)this.axes[b]._ticks=[];this.computePlotData(),this._sumy=0,this._sumx=0;for(var c=0,d=this.series.length;d>c;c++)this._sumy+=this.series[c]._sumy,this._sumx+=this.series[c]._sumx;this.draw(),this.target.trigger("jqplotPostRedraw")},this.draw=function(){if(this.drawIfHidden||this.target.is(":visible")){this.target.trigger("jqplotPreDraw");var b,c,d;for(b=0,d=a.jqplot.preDrawHooks.length;d>b;b++)a.jqplot.preDrawHooks[b].call(this);for(b=0,d=this.preDrawHooks.hooks.length;d>b;b++)this.preDrawHooks.hooks[b].apply(this,this.preDrawSeriesHooks.args[b]);this.target.append(this.baseCanvas.createElement({left:0,right:0,top:0,bottom:0},"jqplot-base-canvas",null,this)),this.baseCanvas.setContext(),this.target.append(this.title.draw()),this.title.pack({top:0,left:0});var e=this.legend.draw({},this),f={top:0,left:0,bottom:0,right:0};if("outsideGrid"==this.legend.placement){switch(this.target.append(e),this.legend.location){case"n":f.top+=this.legend.getHeight();break;case"s":f.bottom+=this.legend.getHeight();break;case"ne":case"e":case"se":f.right+=this.legend.getWidth();break;case"nw":case"w":case"sw":f.left+=this.legend.getWidth();break;default:f.right+=this.legend.getWidth()}e=e.detach()}var g,h=this.axes;for(b=0;12>b;b++)g=G[b],this.target.append(h[g].draw(this.baseCanvas._ctx,this)),h[g].set();h.yaxis.show&&(f.left+=h.yaxis.getWidth());var i,j=["y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis"],k=[0,0,0,0,0,0,0,0],l=0;for(i=0;8>i;i++)h[j[i]].show&&(l+=h[j[i]].getWidth(),k[i]=l);if(f.right+=l,h.x2axis.show&&(f.top+=h.x2axis.getHeight()),this.title.show&&(f.top+=this.title.getHeight()),h.xaxis.show&&(f.bottom+=h.xaxis.getHeight()),this.options.gridDimensions&&a.isPlainObject(this.options.gridDimensions)){var m=parseInt(this.options.gridDimensions.width,10)||0,n=parseInt(this.options.gridDimensions.height,10)||0,o=(this._width-f.left-f.right-m)/2,p=(this._height-f.top-f.bottom-n)/2;p>=0&&o>=0&&(f.top+=p,f.bottom+=p,f.left+=o,f.right+=o)}var q=["top","bottom","left","right"];for(var i in q)null==this._gridPadding[q[i]]&&f[q[i]]>0?this._gridPadding[q[i]]=f[q[i]]:null==this._gridPadding[q[i]]&&(this._gridPadding[q[i]]=this._defaultGridPadding[q[i]]);var r=this._gridPadding;for("outsideGrid"===this.legend.placement&&(r={top:this.title.getHeight(),left:0,right:0,bottom:0},"s"===this.legend.location&&(r.left=this._gridPadding.left,r.right=this._gridPadding.right)),h.xaxis.pack({position:"absolute",bottom:this._gridPadding.bottom-h.xaxis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right}),h.yaxis.pack({position:"absolute",top:0,left:this._gridPadding.left-h.yaxis.getWidth(),height:this._height},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top}),h.x2axis.pack({position:"absolute",top:this._gridPadding.top-h.x2axis.getHeight(),left:0,width:this._width},{min:this._gridPadding.left,max:this._width-this._gridPadding.right}),b=8;b>0;b--)h[j[b-1]].pack({position:"absolute",top:0,right:this._gridPadding.right-k[b-1]},{min:this._height-this._gridPadding.bottom,max:this._gridPadding.top});var s=(this._width-this._gridPadding.left-this._gridPadding.right)/2+this._gridPadding.left-h.yMidAxis.getWidth()/2;h.yMidAxis.pack({position:"absolute",top:0,left:s,zIndex:9,textAlign:"center"},{min:this._height-this._gridPadding.bottom,
max:this._gridPadding.top}),this.target.append(this.grid.createElement(this._gridPadding,this)),this.grid.draw();var t=this.series,u=t.length;for(b=0,d=u;d>b;b++)c=this.seriesStack[b],this.target.append(t[c].shadowCanvas.createElement(this._gridPadding,"jqplot-series-shadowCanvas",null,this)),t[c].shadowCanvas.setContext(),t[c].shadowCanvas._elem.data("seriesIndex",c);for(b=0,d=u;d>b;b++)c=this.seriesStack[b],this.target.append(t[c].canvas.createElement(this._gridPadding,"jqplot-series-canvas",null,this)),t[c].canvas.setContext(),t[c].canvas._elem.data("seriesIndex",c);this.target.append(this.eventCanvas.createElement(this._gridPadding,"jqplot-event-canvas",null,this)),this.eventCanvas.setContext(),this.eventCanvas._ctx.fillStyle="rgba(0,0,0,0)",this.eventCanvas._ctx.fillRect(0,0,this.eventCanvas._ctx.canvas.width,this.eventCanvas._ctx.canvas.height),this.bindCustomEvents(),this.legend.preDraw?(this.eventCanvas._elem.before(e),this.legend.pack(r),this.legend._elem?this.drawSeries({legendInfo:{location:this.legend.location,placement:this.legend.placement,width:this.legend.getWidth(),height:this.legend.getHeight(),xoffset:this.legend.xoffset,yoffset:this.legend.yoffset}}):this.drawSeries()):(this.drawSeries(),u&&a(t[u-1].canvas._elem).after(e),this.legend.pack(r));for(var b=0,d=a.jqplot.eventListenerHooks.length;d>b;b++)this.eventCanvas._elem.bind(a.jqplot.eventListenerHooks[b][0],{plot:this},a.jqplot.eventListenerHooks[b][1]);for(var b=0,d=this.eventListenerHooks.hooks.length;d>b;b++)this.eventCanvas._elem.bind(this.eventListenerHooks.hooks[b][0],{plot:this},this.eventListenerHooks.hooks[b][1]);var v=this.fillBetween;if("number"==typeof v.series1)v.fill&&v.series1!==v.series2&&v.series1<u&&v.series2<u&&"line"===t[v.series1]._type&&"line"===t[v.series2]._type&&this.doFillBetweenLines();else if(null!=v.series1&&null!=v.series2){var w=!1;if(v.series1.length===v.series2.length)for(var x=0,y=0,z=0;z<v.series1.length;z++){if(x=v.series1[z],y=v.series2[z],!(x!==y&&u>x&&u>y&&"line"===t[x]._type&&"line"===t[y]._type)){w=!1;break}w=!0}v.fill&&w&&this.doFillBetweenLines()}for(var b=0,d=a.jqplot.postDrawHooks.length;d>b;b++)a.jqplot.postDrawHooks[b].call(this);for(var b=0,d=this.postDrawHooks.hooks.length;d>b;b++)this.postDrawHooks.hooks[b].apply(this,this.postDrawHooks.args[b]);this.target.is(":visible")&&(this._drawCount+=1);var A,B,C,D;for(b=0,d=u;d>b;b++)A=t[b],B=A.renderer,C=".jqplot-point-label.jqplot-series-"+b,B.animation&&B.animation._supported&&B.animation.show&&(this._drawCount<2||this.animateReplot)&&(D=this.target.find(C),D.stop(!0,!0).hide(),A.canvas._elem.stop(!0,!0).hide(),A.shadowCanvas._elem.stop(!0,!0).hide(),A.canvas._elem.jqplotEffect("blind",{mode:"show",direction:B.animation.direction},B.animation.speed),A.shadowCanvas._elem.jqplotEffect("blind",{mode:"show",direction:B.animation.direction},B.animation.speed),D.fadeIn(.8*B.animation.speed));D=null,this.target.trigger("jqplotPostDraw",[this])}},g.prototype.doFillBetweenLines=function(){function a(a,e){var f=c[a],g=c[e];if(g.renderer.smooth)var h=g.renderer._smoothedData.slice(0).reverse();else var h=g.gridData.slice(0).reverse();if(f.renderer.smooth)var i=f.renderer._smoothedData.concat(h);else var i=f.gridData.concat(h);var j=null!==b.color?b.color:c[d].fillColor,k=null!==b.baseSeries?b.baseSeries:a,l=c[k].renderer.shapeRenderer,m={fillStyle:j,fill:!0,closePath:!0};l.draw(f.shadowCanvas._ctx,i,m)}var b=this.fillBetween,c=this.series,d=b.series1,e=b.series2,f=0,g=0;if("number"==typeof d&&"number"==typeof e)f=e>d?d:e,g=e>d?e:d,a(f,g);else for(var h=0;h<d.length;h++)f=d[h]<e[h]?d[h]:e[h],g=e[h]>d[h]?e[h]:d[h],a(f,g)},this.bindCustomEvents=function(){this.eventCanvas._elem.bind("click",{plot:this},this.onClick),this.eventCanvas._elem.bind("dblclick",{plot:this},this.onDblClick),this.eventCanvas._elem.bind("mousedown",{plot:this},this.onMouseDown),this.eventCanvas._elem.bind("mousemove",{plot:this},this.onMouseMove),this.eventCanvas._elem.bind("mouseenter",{plot:this},this.onMouseEnter),this.eventCanvas._elem.bind("mouseleave",{plot:this},this.onMouseLeave),this.captureRightClick?(this.eventCanvas._elem.bind("mouseup",{plot:this},this.onRightClick),this.eventCanvas._elem.get(0).oncontextmenu=function(){return!1}):this.eventCanvas._elem.bind("mouseup",{plot:this},this.onMouseUp)},this.onClick=function(b){var c=i(b),d=b.data.plot,e=j(c.gridPos,d),f=a.Event("jqplotClick");f.pageX=b.pageX,f.pageY=b.pageY,a(this).trigger(f,[c.gridPos,c.dataPos,e,d])},this.onDblClick=function(b){var c=i(b),d=b.data.plot,e=j(c.gridPos,d),f=a.Event("jqplotDblClick");f.pageX=b.pageX,f.pageY=b.pageY,a(this).trigger(f,[c.gridPos,c.dataPos,e,d])},this.onMouseDown=function(b){var c=i(b),d=b.data.plot,e=j(c.gridPos,d),f=a.Event("jqplotMouseDown");f.pageX=b.pageX,f.pageY=b.pageY,a(this).trigger(f,[c.gridPos,c.dataPos,e,d])},this.onMouseUp=function(b){var c=i(b),d=a.Event("jqplotMouseUp");d.pageX=b.pageX,d.pageY=b.pageY,a(this).trigger(d,[c.gridPos,c.dataPos,null,b.data.plot])},this.onRightClick=function(b){var c=i(b),d=b.data.plot,e=j(c.gridPos,d);if(d.captureRightClick)if(3==b.which){var f=a.Event("jqplotRightClick");f.pageX=b.pageX,f.pageY=b.pageY,a(this).trigger(f,[c.gridPos,c.dataPos,e,d])}else{var f=a.Event("jqplotMouseUp");f.pageX=b.pageX,f.pageY=b.pageY,a(this).trigger(f,[c.gridPos,c.dataPos,e,d])}},this.onMouseMove=function(b){var c=i(b),d=b.data.plot,e=j(c.gridPos,d),f=a.Event("jqplotMouseMove");f.pageX=b.pageX,f.pageY=b.pageY,a(this).trigger(f,[c.gridPos,c.dataPos,e,d])},this.onMouseEnter=function(b){var c=i(b),d=b.data.plot,e=a.Event("jqplotMouseEnter");e.pageX=b.pageX,e.pageY=b.pageY,e.relatedTarget=b.relatedTarget,a(this).trigger(e,[c.gridPos,c.dataPos,null,d])},this.onMouseLeave=function(b){var c=i(b),d=b.data.plot,e=a.Event("jqplotMouseLeave");e.pageX=b.pageX,e.pageY=b.pageY,e.relatedTarget=b.relatedTarget,a(this).trigger(e,[c.gridPos,c.dataPos,null,d])},this.drawSeries=function(b,c){var d,e,f;if(c="number"==typeof b&&null==c?b:c,b="object"==typeof b?b:{},c!=F)e=this.series[c],f=e.shadowCanvas._ctx,f.clearRect(0,0,f.canvas.width,f.canvas.height),e.drawShadow(f,b,this),f=e.canvas._ctx,f.clearRect(0,0,f.canvas.width,f.canvas.height),e.draw(f,b,this),e.renderer.constructor==a.jqplot.BezierCurveRenderer&&c<this.series.length-1&&this.drawSeries(c+1);else for(d=0;d<this.series.length;d++)e=this.series[d],f=e.shadowCanvas._ctx,f.clearRect(0,0,f.canvas.width,f.canvas.height),e.drawShadow(f,b,this),f=e.canvas._ctx,f.clearRect(0,0,f.canvas.width,f.canvas.height),e.draw(f,b,this);b=c=d=e=f=null},this.moveSeriesToFront=function(b){b=parseInt(b,10);var c=a.inArray(b,this.seriesStack);if(-1!=c){if(c==this.seriesStack.length-1)return void(this.previousSeriesStack=this.seriesStack.slice(0));var d=this.seriesStack[this.seriesStack.length-1],e=this.series[b].canvas._elem.detach(),f=this.series[b].shadowCanvas._elem.detach();this.series[d].shadowCanvas._elem.after(f),this.series[d].canvas._elem.after(e),this.previousSeriesStack=this.seriesStack.slice(0),this.seriesStack.splice(c,1),this.seriesStack.push(b)}},this.moveSeriesToBack=function(b){b=parseInt(b,10);var c=a.inArray(b,this.seriesStack);if(0!=c&&-1!=c){var d=this.seriesStack[0],e=this.series[b].canvas._elem.detach(),f=this.series[b].shadowCanvas._elem.detach();this.series[d].shadowCanvas._elem.before(f),this.series[d].canvas._elem.before(e),this.previousSeriesStack=this.seriesStack.slice(0),this.seriesStack.splice(c,1),this.seriesStack.unshift(b)}},this.restorePreviousSeriesOrder=function(){var a,b,c,d,e,f;if(this.seriesStack!=this.previousSeriesStack){for(a=1;a<this.previousSeriesStack.length;a++)e=this.previousSeriesStack[a],f=this.previousSeriesStack[a-1],b=this.series[e].canvas._elem.detach(),c=this.series[e].shadowCanvas._elem.detach(),this.series[f].shadowCanvas._elem.after(c),this.series[f].canvas._elem.after(b);d=this.seriesStack.slice(0),this.seriesStack=this.previousSeriesStack.slice(0),this.previousSeriesStack=d}},this.restoreOriginalSeriesOrder=function(){var a,b,c,d=[];for(a=0;a<this.series.length;a++)d.push(a);if(this.seriesStack!=d)for(this.previousSeriesStack=this.seriesStack.slice(0),this.seriesStack=d,a=1;a<this.seriesStack.length;a++)b=this.series[a].canvas._elem.detach(),c=this.series[a].shadowCanvas._elem.detach(),this.series[a-1].shadowCanvas._elem.after(c),this.series[a-1].canvas._elem.after(b)},this.activateTheme=function(a){this.themeEngine.activate(this,a)}}function h(a,b){return(3.4182054+b)*Math.pow(a,-.3534992)}function i(a){var b=(Math.exp(2*a)-1)/(Math.exp(2*a)+1);return b}function j(a){function b(a,b){return a-b==0?Math.pow(10,10):a-b}var c=this.renderer.smooth,d=this.canvas.getWidth(),e=this._xaxis.series_p2u,f=this._yaxis.series_p2u,g=null,i=a.length/d,j=[],k=[];g=isNaN(parseFloat(c))?h(i,.5):parseFloat(c);for(var l=[],m=[],n=0,o=a.length;o>n;n++)l.push(a[n][1]),m.push(a[n][0]);for(var p,q,r,s,t=a.length-1,u=1,v=a.length;v>u;u++){for(var w=[],x=[],y=0;2>y;y++){var n=u-1+y;0==n||n==t?w[y]=Math.pow(10,10):l[n+1]-l[n]==0||l[n]-l[n-1]==0?w[y]=0:(m[n+1]-m[n])/(l[n+1]-l[n])+(m[n]-m[n-1])/(l[n]-l[n-1])==0?w[y]=0:(l[n+1]-l[n])*(l[n]-l[n-1])<0?w[y]=0:w[y]=2/(b(m[n+1],m[n])/(l[n+1]-l[n])+b(m[n],m[n-1])/(l[n]-l[n-1]))}1==u?w[0]=1.5*(l[1]-l[0])/b(m[1],m[0])-w[1]/2:u==t&&(w[1]=1.5*(l[t]-l[t-1])/b(m[t],m[t-1])-w[0]/2),x[0]=-2*(w[1]+2*w[0])/b(m[u],m[u-1])+6*(l[u]-l[u-1])/Math.pow(b(m[u],m[u-1]),2),x[1]=2*(2*w[1]+w[0])/b(m[u],m[u-1])-6*(l[u]-l[u-1])/Math.pow(b(m[u],m[u-1]),2),s=1/6*(x[1]-x[0])/b(m[u],m[u-1]),r=.5*(m[u]*x[0]-m[u-1]*x[1])/b(m[u],m[u-1]),q=(l[u]-l[u-1]-r*(Math.pow(m[u],2)-Math.pow(m[u-1],2))-s*(Math.pow(m[u],3)-Math.pow(m[u-1],3)))/b(m[u],m[u-1]),p=l[u-1]-q*m[u-1]-r*Math.pow(m[u-1],2)-s*Math.pow(m[u-1],3);for(var z,A,B=(m[u]-m[u-1])/g,y=0,o=g;o>y;y++)z=[],A=m[u-1]+y*B,z.push(A),z.push(p+q*A+r*Math.pow(A,2)+s*Math.pow(A,3)),j.push(z),k.push([e(z[0]),f(z[1])])}return j.push(a[n]),k.push([e(a[n][0]),f(a[n][1])]),[j,k]}function k(a){var b,c,d,e,f,g,j,k,l,m,n,o,p,q,r,s,t,u,v=this.renderer.smooth,w=this.renderer.tension,x=this.canvas.getWidth(),y=this._xaxis.series_p2u,z=this._yaxis.series_p2u,A=null,B=null,C=null,D=null,E=null,F=null,G=null,H=a.length/x,I=[],J=[];A=isNaN(parseFloat(v))?h(H,.5):parseFloat(v),isNaN(parseFloat(w))||(w=parseFloat(w));for(var K=0,L=a.length-1;L>K;K++)for(null===w?(E=Math.abs((a[K+1][1]-a[K][1])/(a[K+1][0]-a[K][0])),q=.3,r=.6,s=(r-q)/2,t=2.5,u=-1.4,G=E/t+u,C=s*i(G)-s*i(u)+q,K>0&&(F=Math.abs((a[K][1]-a[K-1][1])/(a[K][0]-a[K-1][0]))),G=F/t+u,D=s*i(G)-s*i(u)+q,B=(C+D)/2):B=w,b=0;A>b;b++)c=b/A,d=(1+2*c)*Math.pow(1-c,2),e=c*Math.pow(1-c,2),f=Math.pow(c,2)*(3-2*c),g=Math.pow(c,2)*(c-1),a[K-1]?(j=B*(a[K+1][0]-a[K-1][0]),k=B*(a[K+1][1]-a[K-1][1])):(j=B*(a[K+1][0]-a[K][0]),k=B*(a[K+1][1]-a[K][1])),a[K+2]?(l=B*(a[K+2][0]-a[K][0]),m=B*(a[K+2][1]-a[K][1])):(l=B*(a[K+1][0]-a[K][0]),m=B*(a[K+1][1]-a[K][1])),n=d*a[K][0]+f*a[K+1][0]+e*j+g*l,o=d*a[K][1]+f*a[K+1][1]+e*k+g*m,p=[n,o],I.push(p),J.push([y(n),z(o)]);return I.push(a[L]),J.push([y(a[L][0]),z(a[L][1])]),[I,J]}function l(b,c,d){for(var e=0;e<this.series.length;e++)this.series[e].renderer.constructor==a.jqplot.LineRenderer&&this.series[e].highlightMouseOver&&(this.series[e].highlightMouseDown=!1)}function m(){this.plugins.lineRenderer&&this.plugins.lineRenderer.highlightCanvas&&(this.plugins.lineRenderer.highlightCanvas.resetCanvas(),this.plugins.lineRenderer.highlightCanvas=null),this.plugins.lineRenderer.highlightedSeriesIndex=null,this.plugins.lineRenderer.highlightCanvas=new a.jqplot.GenericCanvas,this.eventCanvas._elem.before(this.plugins.lineRenderer.highlightCanvas.createElement(this._gridPadding,"jqplot-lineRenderer-highlight-canvas",this._plotDimensions,this)),this.plugins.lineRenderer.highlightCanvas.setContext(),this.eventCanvas._elem.bind("mouseleave",{plot:this},function(a){o(a.data.plot)})}function n(a,b,c,d){var e=a.series[b],f=a.plugins.lineRenderer.highlightCanvas;f._ctx.clearRect(0,0,f._ctx.canvas.width,f._ctx.canvas.height),e._highlightedPoint=c,a.plugins.lineRenderer.highlightedSeriesIndex=b;var g={fillStyle:e.highlightColor};"line"===e.type&&e.renderer.bands.show&&(g.fill=!0,g.closePath=!0),e.renderer.shapeRenderer.draw(f._ctx,d,g),f=null}function o(a){var b=a.plugins.lineRenderer.highlightCanvas;b._ctx.clearRect(0,0,b._ctx.canvas.width,b._ctx.canvas.height);for(var c=0;c<a.series.length;c++)a.series[c]._highlightedPoint=null;a.plugins.lineRenderer.highlightedSeriesIndex=null,a.target.trigger("jqplotDataUnhighlight"),b=null}function p(a,b,c,d,e){if(d){var f=[d.seriesIndex,d.pointIndex,d.data],g=jQuery.Event("jqplotDataMouseOver");if(g.pageX=a.pageX,g.pageY=a.pageY,e.target.trigger(g,f),e.series[f[0]].highlightMouseOver&&f[0]!=e.plugins.lineRenderer.highlightedSeriesIndex){var h=jQuery.Event("jqplotDataHighlight");h.which=a.which,h.pageX=a.pageX,h.pageY=a.pageY,e.target.trigger(h,f),n(e,d.seriesIndex,d.pointIndex,d.points)}}else null==d&&o(e)}function q(a,b,c,d,e){if(d){var f=[d.seriesIndex,d.pointIndex,d.data];if(e.series[f[0]].highlightMouseDown&&f[0]!=e.plugins.lineRenderer.highlightedSeriesIndex){var g=jQuery.Event("jqplotDataHighlight");g.which=a.which,g.pageX=a.pageX,g.pageY=a.pageY,e.target.trigger(g,f),n(e,d.seriesIndex,d.pointIndex,d.points)}}else null==d&&o(e)}function r(a,b,c,d,e){var f=e.plugins.lineRenderer.highlightedSeriesIndex;null!=f&&e.series[f].highlightMouseDown&&o(e)}function s(a,b,c,d,e){if(d){var f=[d.seriesIndex,d.pointIndex,d.data],g=jQuery.Event("jqplotDataClick");g.which=a.which,g.pageX=a.pageX,g.pageY=a.pageY,e.target.trigger(g,f)}}function t(a,b,c,d,e){if(d){var f=[d.seriesIndex,d.pointIndex,d.data],g=e.plugins.lineRenderer.highlightedSeriesIndex;null!=g&&e.series[g].highlightMouseDown&&o(e);var h=jQuery.Event("jqplotDataRightClick");h.which=a.which,h.pageX=a.pageX,h.pageY=a.pageY,e.target.trigger(h,f)}}function u(a){var b;if(a=Math.abs(a),a>=10)b="%d";else if(a>1)b=a===parseInt(a,10)?"%d":"%.1f";else{var c=-Math.floor(Math.log(a)/Math.LN10);b="%."+c+"f"}return b}function v(b,c,d){for(var e,f,g,h,i,j,k,l=Math.floor(d/2),m=Math.ceil(1.5*d),n=Number.MAX_VALUE,o=c-b,p=a.jqplot.getSignificantFigures,q=0,r=m-l+1;r>q;q++)j=l+q,e=o/(j-1),f=p(e),e=Math.abs(d-j)+f.digitsRight,n>e?(n=e,g=j,k=f.digitsRight):e===n&&f.digitsRight<k&&(g=j,k=f.digitsRight);return h=Math.max(k,Math.max(p(b).digitsRight,p(c).digitsRight)),i=0===h?"%d":"%."+h+"f",e=o/(g-1),[b,c,g,i,e]}function w(a,b){b=b||7;var c,d=a/(b-1),e=Math.pow(10,Math.floor(Math.log(d)/Math.LN10)),f=d/e;return c=1>e?f>5?10*e:f>2?5*e:f>1?2*e:e:f>5?10*e:f>4?5*e:f>3?4*e:f>2?3*e:f>1?2*e:e}function x(a,b){b=b||1;var c,d=Math.floor(Math.log(a)/Math.LN10),e=Math.pow(10,d),f=a/e;return f/=b,c=.38>=f?.1:1.6>=f?.2:4>=f?.5:8>=f?1:16>=f?2:5,c*e}function y(a,b){var c,d,e=Math.floor(Math.log(a)/Math.LN10),f=Math.pow(10,e),g=a/f;return g/=b,d=.38>=g?.1:1.6>=g?.2:4>=g?.5:8>=g?1:16>=g?2:5,c=d*f,[c,d,f]}function z(a,b){return a-b}function A(a){if(null==a||"object"!=typeof a)return a;var b=new a.constructor;for(var c in a)b[c]=A(a[c]);return b}function B(a,b){if(null!=b&&"object"==typeof b)for(var c in b)"highlightColors"==c&&(a[c]=A(b[c])),null!=b[c]&&"object"==typeof b[c]?(a.hasOwnProperty(c)||(a[c]={}),B(a[c],b[c])):a[c]=b[c]}function C(a,b){if(b.indexOf)return b.indexOf(a);for(var c=0,d=b.length;d>c;c++)if(b[c]===a)return c;return-1}function D(a){return null===a?"[object Null]":Object.prototype.toString.call(a)}function E(b,c,d,e){return a.isPlainObject(b)?b:(b={effect:b},c===F&&(c={}),a.isFunction(c)&&(e=c,d=null,c={}),("number"===a.type(c)||a.fx.speeds[c])&&(e=d,d=c,c={}),a.isFunction(d)&&(e=d,d=null),c&&a.extend(b,c),d=d||c.duration,b.duration=a.fx.off?0:"number"==typeof d?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,b.complete=e||c.complete,b)}var F;a.fn.emptyForce=function(){for(var b,c=0;null!=(b=a(this)[c]);c++){if(1===b.nodeType&&a.cleanData(b.getElementsByTagName("*")),a.jqplot.use_excanvas)b.outerHTML="";else for(;b.firstChild;)b.removeChild(b.firstChild);b=null}return a(this)},a.fn.removeChildForce=function(a){for(;a.firstChild;)this.removeChildForce(a.firstChild),a.removeChild(a.firstChild)},a.fn.jqplot=function(){for(var b=[],c=[],d=0,e=arguments.length;e>d;d++)a.isArray(arguments[d])?b.push(arguments[d]):a.isPlainObject(arguments[d])&&c.push(arguments[d]);return this.each(function(d){var e,f,g,h,i=a(this),j=b.length,k=c.length;g=j>d?b[d]:j?b[j-1]:null,h=k>d?c[d]:k?c[k-1]:null,e=i.attr("id"),e===F&&(e="jqplot_target_"+a.jqplot.targetCounter++,i.attr("id",e)),f=a.jqplot(e,g,h),i.data("jqplot",f)})},a.jqplot=function(b,c,d){var e=null,f=null;3===arguments.length?(e=c,f=d):2===arguments.length&&(a.isArray(c)?e=c:a.isPlainObject(c)&&(f=c)),null===e&&null!==f&&f.data&&(e=f.data);var h=new g;if(a("#"+b).removeClass("jqplot-error"),!a.jqplot.config.catchErrors)return h.init(b,e,f),h.draw(),h.themeEngine.init.call(h),h;try{return h.init(b,e,f),h.draw(),h.themeEngine.init.call(h),h}catch(i){var j=a.jqplot.config.errorMessage||i.message;a("#"+b).append('<div class="jqplot-error-message">'+j+"</div>"),a("#"+b).addClass("jqplot-error"),document.getElementById(b).style.background=a.jqplot.config.errorBackground,document.getElementById(b).style.border=a.jqplot.config.errorBorder,document.getElementById(b).style.fontFamily=a.jqplot.config.errorFontFamily,document.getElementById(b).style.fontSize=a.jqplot.config.errorFontSize,document.getElementById(b).style.fontStyle=a.jqplot.config.errorFontStyle,document.getElementById(b).style.fontWeight=a.jqplot.config.errorFontWeight}},a.jqplot.version="1.0.9",a.jqplot.revision="d96a669",a.jqplot.targetCounter=1,a.jqplot.CanvasManager=function(){"undefined"==typeof a.jqplot.CanvasManager.canvases&&(a.jqplot.CanvasManager.canvases=[],a.jqplot.CanvasManager.free=[]);var b=[];this.getCanvas=function(){var c,d=!0;if(!a.jqplot.use_excanvas)for(var e=0,f=a.jqplot.CanvasManager.canvases.length;f>e;e++)if(a.jqplot.CanvasManager.free[e]===!0){d=!1,c=a.jqplot.CanvasManager.canvases[e],a.jqplot.CanvasManager.free[e]=!1,b.push(e);break}return d&&(c=document.createElement("canvas"),b.push(a.jqplot.CanvasManager.canvases.length),a.jqplot.CanvasManager.canvases.push(c),a.jqplot.CanvasManager.free.push(!1)),c},this.initCanvas=function(b){if(a.jqplot.use_excanvas)return window.G_vmlCanvasManager.initElement(b);var c=b.getContext("2d"),d=1;window.devicePixelRatio>1&&(c.webkitBackingStorePixelRatio===F||c.webkitBackingStorePixelRatio<2)&&(d=window.devicePixelRatio);var e=b.width,f=b.height;return b.width=d*b.width,b.height=d*b.height,b.style.width=e+"px",b.style.height=f+"px",c.save(),c.scale(d,d),b},this.freeAllCanvases=function(){for(var a=0,c=b.length;c>a;a++)this.freeCanvas(b[a]);b=[]},this.freeCanvas=function(b){if(a.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==F)window.G_vmlCanvasManager.uninitElement(a.jqplot.CanvasManager.canvases[b]),a.jqplot.CanvasManager.canvases[b]=null;else{var c=a.jqplot.CanvasManager.canvases[b];c.getContext("2d").clearRect(0,0,c.width,c.height),a(c).unbind().removeAttr("class").removeAttr("style"),a(c).css({left:"",top:"",position:""}),c.width=0,c.height=0,a.jqplot.CanvasManager.free[b]=!0}}},a.jqplot.log=function(){window.console&&window.console.log.apply(window.console,arguments)},a.jqplot.config={addDomReference:!1,enablePlugins:!1,defaultHeight:300,defaultWidth:400,UTCAdjust:!1,timezoneOffset:new Date(6e4*(new Date).getTimezoneOffset()),errorMessage:"",errorBackground:"",errorBorder:"",errorFontFamily:"",errorFontSize:"",errorFontStyle:"",errorFontWeight:"",catchErrors:!1,defaultTickFormatString:"%.1f",defaultColors:["#4bb2c5","#EAA228","#c5b47f","#579575","#839557","#958c12","#953579","#4b5de4","#d8b83f","#ff5800","#0085cc","#c747a3","#cddf54","#FBD178","#26B4E3","#bd70c7"],defaultNegativeColors:["#498991","#C08840","#9F9274","#546D61","#646C4A","#6F6621","#6E3F5F","#4F64B0","#A89050","#C45923","#187399","#945381","#959E5C","#C7AF7B","#478396","#907294"],dashLength:4,gapLength:4,dotGapLength:2.5,srcLocation:"jqplot/src/",pluginLocation:"jqplot/src/plugins/"},a.jqplot.arrayMax=function(a){return Math.max.apply(Math,a)},a.jqplot.arrayMin=function(a){return Math.min.apply(Math,a)},a.jqplot.enablePlugins=a.jqplot.config.enablePlugins,a.jqplot.support_canvas=function(){return"undefined"==typeof a.jqplot.support_canvas.result&&(a.jqplot.support_canvas.result=!!document.createElement("canvas").getContext),a.jqplot.support_canvas.result},a.jqplot.support_canvas_text=function(){return"undefined"==typeof a.jqplot.support_canvas_text.result&&(window.G_vmlCanvasManager!==F&&window.G_vmlCanvasManager._version>887?a.jqplot.support_canvas_text.result=!0:a.jqplot.support_canvas_text.result=!(!document.createElement("canvas").getContext||"function"!=typeof document.createElement("canvas").getContext("2d").fillText)),a.jqplot.support_canvas_text.result},a.jqplot.use_excanvas=a.support.boxModel&&a.support.objectAll&&$support.leadingWhitespace||a.jqplot.support_canvas()?!1:!0,a.jqplot.preInitHooks=[],a.jqplot.postInitHooks=[],a.jqplot.preParseOptionsHooks=[],a.jqplot.postParseOptionsHooks=[],a.jqplot.preDrawHooks=[],a.jqplot.postDrawHooks=[],a.jqplot.preDrawSeriesHooks=[],a.jqplot.postDrawSeriesHooks=[],a.jqplot.preDrawLegendHooks=[],a.jqplot.addLegendRowHooks=[],a.jqplot.preSeriesInitHooks=[],a.jqplot.postSeriesInitHooks=[],a.jqplot.preParseSeriesOptionsHooks=[],a.jqplot.postParseSeriesOptionsHooks=[],a.jqplot.eventListenerHooks=[],a.jqplot.preDrawSeriesShadowHooks=[],a.jqplot.postDrawSeriesShadowHooks=[],a.jqplot.ElemContainer=function(){this._elem,this._plotWidth,this._plotHeight,this._plotDimensions={height:null,width:null}},a.jqplot.ElemContainer.prototype.createElement=function(b,c,d,e,f){this._offsets=c;var g=d||"jqplot",h=document.createElement(b);return this._elem=a(h),this._elem.addClass(g),this._elem.css(e),this._elem.attr(f),h=null,this._elem},a.jqplot.ElemContainer.prototype.getWidth=function(){return this._elem?this._elem.outerWidth(!0):null},a.jqplot.ElemContainer.prototype.getHeight=function(){return this._elem?this._elem.outerHeight(!0):null},a.jqplot.ElemContainer.prototype.getPosition=function(){return this._elem?this._elem.position():{top:null,left:null,bottom:null,right:null}},a.jqplot.ElemContainer.prototype.getTop=function(){return this.getPosition().top},a.jqplot.ElemContainer.prototype.getLeft=function(){return this.getPosition().left},a.jqplot.ElemContainer.prototype.getBottom=function(){return this._elem.css("bottom")},a.jqplot.ElemContainer.prototype.getRight=function(){return this._elem.css("right")},b.prototype=new a.jqplot.ElemContainer,b.prototype.constructor=b,b.prototype.init=function(){a.isFunction(this.renderer)&&(this.renderer=new this.renderer),this.tickOptions.axis=this.name,null==this.tickOptions.showMark&&(this.tickOptions.showMark=this.showTicks),null==this.tickOptions.showMark&&(this.tickOptions.showMark=this.showTickMarks),null==this.tickOptions.showLabel&&(this.tickOptions.showLabel=this.showTicks),null==this.label||""==this.label?this.showLabel=!1:this.labelOptions.label=this.label,0==this.showLabel&&(this.labelOptions.show=!1),0==this.pad&&(this.pad=1),0==this.padMax&&(this.padMax=1),0==this.padMin&&(this.padMin=1),null==this.padMax&&(this.padMax=(this.pad-1)/2+1),null==this.padMin&&(this.padMin=(this.pad-1)/2+1),this.pad=this.padMax+this.padMin-1,(null!=this.min||null!=this.max)&&(this.autoscale=!1),null==this.syncTicks&&this.name.indexOf("y")>-1?this.syncTicks=!0:null==this.syncTicks&&(this.syncTicks=!1),this.renderer.init.call(this,this.rendererOptions)},b.prototype.draw=function(a,b){return this.__ticks&&(this.__ticks=null),this.renderer.draw.call(this,a,b)},b.prototype.set=function(){this.renderer.set.call(this)},b.prototype.pack=function(a,b){this.show&&this.renderer.pack.call(this,a,b),null==this._min&&(this._min=this.min,this._max=this.max,this._tickInterval=this.tickInterval,this._numberTicks=this.numberTicks,this.__ticks=this._ticks)},b.prototype.reset=function(){this.renderer.reset.call(this)},b.prototype.resetScale=function(b){a.extend(!0,this,{min:null,max:null,numberTicks:null,tickInterval:null,_ticks:[],ticks:[]},b),this.resetDataBounds()},b.prototype.resetDataBounds=function(){var b=this._dataBounds;b.min=null,b.max=null;for(var c,d,e,f=this.show?!0:!1,g=0;g<this._series.length;g++)if(d=this._series[g],d.show||this.scaleToHiddenSeries){e=d._plotData,"line"===d._type&&d.renderer.bands.show&&"x"!==this.name.charAt(0)&&(e=[[0,d.renderer.bands._min],[1,d.renderer.bands._max]]);var h=1,i=1;null!=d._type&&"ohlc"==d._type&&(h=3,i=2);for(var j=0,c=e.length;c>j;j++)"xaxis"==this.name||"x2axis"==this.name?((null!=e[j][0]&&e[j][0]<b.min||null==b.min)&&(b.min=e[j][0]),(null!=e[j][0]&&e[j][0]>b.max||null==b.max)&&(b.max=e[j][0])):((null!=e[j][h]&&e[j][h]<b.min||null==b.min)&&(b.min=e[j][h]),(null!=e[j][i]&&e[j][i]>b.max||null==b.max)&&(b.max=e[j][i]));f&&d.renderer.constructor!==a.jqplot.BarRenderer?f=!1:f&&this._options.hasOwnProperty("forceTickAt0")&&0==this._options.forceTickAt0?f=!1:f&&d.renderer.constructor===a.jqplot.BarRenderer&&("vertical"==d.barDirection&&"xaxis"!=this.name&&"x2axis"!=this.name?(null!=this._options.pad||null!=this._options.padMin)&&(f=!1):"horizontal"!=d.barDirection||"xaxis"!=this.name&&"x2axis"!=this.name||(null!=this._options.pad||null!=this._options.padMin)&&(f=!1))}f&&this.renderer.constructor===a.jqplot.LinearAxisRenderer&&b.min>=0&&(this.padMin=1,this.forceTickAt0=!0)},c.prototype=new a.jqplot.ElemContainer,c.prototype.constructor=c,c.prototype.setOptions=function(b){if(a.extend(!0,this,b),"inside"==this.placement&&(this.placement="insideGrid"),this.xoffset>0){if("insideGrid"==this.placement)switch(this.location){case"nw":case"w":case"sw":null==this.marginLeft&&(this.marginLeft=this.xoffset+"px"),this.marginRight="0px";break;case"ne":case"e":case"se":default:null==this.marginRight&&(this.marginRight=this.xoffset+"px"),this.marginLeft="0px"}else if("outside"==this.placement)switch(this.location){case"nw":case"w":case"sw":null==this.marginRight&&(this.marginRight=this.xoffset+"px"),this.marginLeft="0px";break;case"ne":case"e":case"se":default:null==this.marginLeft&&(this.marginLeft=this.xoffset+"px"),this.marginRight="0px"}this.xoffset=0}if(this.yoffset>0){if("outside"==this.placement)switch(this.location){case"sw":case"s":case"se":null==this.marginTop&&(this.marginTop=this.yoffset+"px"),this.marginBottom="0px";break;case"ne":case"n":case"nw":default:null==this.marginBottom&&(this.marginBottom=this.yoffset+"px"),this.marginTop="0px"}else if("insideGrid"==this.placement)switch(this.location){case"sw":case"s":case"se":null==this.marginBottom&&(this.marginBottom=this.yoffset+"px"),this.marginTop="0px";break;case"ne":case"n":case"nw":default:null==this.marginTop&&(this.marginTop=this.yoffset+"px"),this.marginBottom="0px"}this.yoffset=0}},c.prototype.init=function(){a.isFunction(this.renderer)&&(this.renderer=new this.renderer),this.renderer.init.call(this,this.rendererOptions)},c.prototype.draw=function(b,c){for(var d=0;d<a.jqplot.preDrawLegendHooks.length;d++)a.jqplot.preDrawLegendHooks[d].call(this,b);return this.renderer.draw.call(this,b,c)},c.prototype.pack=function(a){this.renderer.pack.call(this,a)},d.prototype=new a.jqplot.ElemContainer,d.prototype.constructor=d,d.prototype.init=function(){a.isFunction(this.renderer)&&(this.renderer=new this.renderer),this.renderer.init.call(this,this.rendererOptions)},d.prototype.draw=function(a){return this.renderer.draw.call(this,a)},d.prototype.pack=function(){this.renderer.pack.call(this)},e.prototype=new a.jqplot.ElemContainer,e.prototype.constructor=e,e.prototype.init=function(b,c,d){this.index=b,this.gridBorderWidth=c;var e,f,g=this.data,h=[];for(e=0,f=g.length;f>e;e++)if(this.breakOnNull)h.push(g[e]);else{if(null==g[e]||null==g[e][0]||null==g[e][1])continue;h.push(g[e])}if(this.data=h,this.color||(this.color=d.colorGenerator.get(this.index)),this.negativeColor||(this.negativeColor=d.negativeColorGenerator.get(this.index)),this.fillColor||(this.fillColor=this.color),this.fillAlpha){var i=a.jqplot.normalize2rgb(this.fillColor),i=a.jqplot.getColorComponents(i);this.fillColor="rgba("+i[0]+","+i[1]+","+i[2]+","+this.fillAlpha+")"}a.isFunction(this.renderer)&&(this.renderer=new this.renderer),this.renderer.init.call(this,this.rendererOptions,d),this.markerRenderer=new this.markerRenderer,this.markerOptions.color||(this.markerOptions.color=this.color),null==this.markerOptions.show&&(this.markerOptions.show=this.showMarker),this.showMarker=this.markerOptions.show,this.markerRenderer.init(this.markerOptions)},e.prototype.draw=function(b,c,d){var e=c==F?{}:c;b=b==F?this.canvas._ctx:b;var f,g,h;for(f=0;f<a.jqplot.preDrawSeriesHooks.length;f++)a.jqplot.preDrawSeriesHooks[f].call(this,b,e);for(this.show&&(this.renderer.setGridData.call(this,d),e.preventJqPlotSeriesDrawTrigger||a(b.canvas).trigger("jqplotSeriesDraw",[this.data,this.gridData]),g=[],g=e.data?e.data:this._stack?this._plotData:this.data,h=e.gridData||this.renderer.makeGridData.call(this,g,d),"line"===this._type&&this.renderer.smooth&&this.renderer._smoothedData.length&&(h=this.renderer._smoothedData),this.renderer.draw.call(this,b,h,e,d)),f=0;f<a.jqplot.postDrawSeriesHooks.length;f++)a.jqplot.postDrawSeriesHooks[f].call(this,b,e,d);b=c=d=f=g=h=null},e.prototype.drawShadow=function(b,c,d){var e=c==F?{}:c;b=b==F?this.shadowCanvas._ctx:b;var f,g,h;for(f=0;f<a.jqplot.preDrawSeriesShadowHooks.length;f++)a.jqplot.preDrawSeriesShadowHooks[f].call(this,b,e);for(this.shadow&&(this.renderer.setGridData.call(this,d),g=[],g=e.data?e.data:this._stack?this._plotData:this.data,h=e.gridData||this.renderer.makeGridData.call(this,g,d),this.renderer.drawShadow.call(this,b,h,e,d)),f=0;f<a.jqplot.postDrawSeriesShadowHooks.length;f++)a.jqplot.postDrawSeriesShadowHooks[f].call(this,b,e);b=c=d=f=g=h=null},e.prototype.toggleDisplay=function(a,b){var c,d;c=a.data.series?a.data.series:this,a.data.speed&&(d=a.data.speed),d?c.canvas._elem.is(":hidden")||!c.show?(c.show=!0,c.canvas._elem.removeClass("jqplot-series-hidden"),c.shadowCanvas._elem&&c.shadowCanvas._elem.fadeIn(d),c.canvas._elem.fadeIn(d,b),c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+c.index).fadeIn(d)):(c.show=!1,c.canvas._elem.addClass("jqplot-series-hidden"),c.shadowCanvas._elem&&c.shadowCanvas._elem.fadeOut(d),c.canvas._elem.fadeOut(d,b),c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+c.index).fadeOut(d)):c.canvas._elem.is(":hidden")||!c.show?(c.show=!0,c.canvas._elem.removeClass("jqplot-series-hidden"),c.shadowCanvas._elem&&c.shadowCanvas._elem.show(),c.canvas._elem.show(0,b),c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+c.index).show()):(c.show=!1,c.canvas._elem.addClass("jqplot-series-hidden"),c.shadowCanvas._elem&&c.shadowCanvas._elem.hide(),c.canvas._elem.hide(0,b),c.canvas._elem.nextAll(".jqplot-point-label.jqplot-series-"+c.index).hide())},f.prototype=new a.jqplot.ElemContainer,f.prototype.constructor=f,f.prototype.init=function(){a.isFunction(this.renderer)&&(this.renderer=new this.renderer),this.renderer.init.call(this,this.rendererOptions)},f.prototype.createElement=function(a,b){return this._offsets=a,this.renderer.createElement.call(this,b)},f.prototype.draw=function(){this.renderer.draw.call(this)},a.jqplot.GenericCanvas=function(){a.jqplot.ElemContainer.call(this),this._ctx},a.jqplot.GenericCanvas.prototype=new a.jqplot.ElemContainer,a.jqplot.GenericCanvas.prototype.constructor=a.jqplot.GenericCanvas,a.jqplot.GenericCanvas.prototype.createElement=function(b,c,d,e){this._offsets=b;var f="jqplot";c!=F&&(f=c);var g;return g=e.canvasManager.getCanvas(),null!=d&&(this._plotDimensions=d),g.width=this._plotDimensions.width-this._offsets.left-this._offsets.right,g.height=this._plotDimensions.height-this._offsets.top-this._offsets.bottom,this._elem=a(g),this._elem.css({position:"absolute",left:this._offsets.left,top:this._offsets.top}),this._elem.addClass(f),g=e.canvasManager.initCanvas(g),g=null,this._elem},a.jqplot.GenericCanvas.prototype.setContext=function(){return this._ctx=this._elem.get(0).getContext("2d"),this._ctx;
},a.jqplot.GenericCanvas.prototype.resetCanvas=function(){this._elem&&(a.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==F&&window.G_vmlCanvasManager.uninitElement(this._elem.get(0)),this._elem.emptyForce()),this._ctx=null},a.jqplot.HooksManager=function(){this.hooks=[],this.args=[]},a.jqplot.HooksManager.prototype.addOnce=function(a,b){b=b||[];for(var c=!1,d=0,e=this.hooks.length;e>d;d++)this.hooks[d]==a&&(c=!0);c||(this.hooks.push(a),this.args.push(b))},a.jqplot.HooksManager.prototype.add=function(a,b){b=b||[],this.hooks.push(a),this.args.push(b)},a.jqplot.EventListenerManager=function(){this.hooks=[]},a.jqplot.EventListenerManager.prototype.addOnce=function(a,b){for(var c,d,e=!1,d=0,f=this.hooks.length;f>d;d++)c=this.hooks[d],c[0]==a&&c[1]==b&&(e=!0);e||this.hooks.push([a,b])},a.jqplot.EventListenerManager.prototype.add=function(a,b){this.hooks.push([a,b])};var G=["yMidAxis","xaxis","yaxis","x2axis","y2axis","y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis"];a.jqplot.computeHighlightColors=function(b){var c;if(a.isArray(b)){c=[];for(var d=0;d<b.length;d++){for(var e=a.jqplot.getColorComponents(b[d]),f=[e[0],e[1],e[2]],g=f[0]+f[1]+f[2],h=0;3>h;h++)f[h]=g>660?.85*f[h]:.73*f[h]+90,f[h]=parseInt(f[h],10),f[h]>255?255:f[h];f[3]=.3+.35*e[3],c.push("rgba("+f[0]+","+f[1]+","+f[2]+","+f[3]+")")}}else{for(var e=a.jqplot.getColorComponents(b),f=[e[0],e[1],e[2]],g=f[0]+f[1]+f[2],h=0;3>h;h++)f[h]=g>660?.85*f[h]:.73*f[h]+90,f[h]=parseInt(f[h],10),f[h]>255?255:f[h];f[3]=.3+.35*e[3],c="rgba("+f[0]+","+f[1]+","+f[2]+","+f[3]+")"}return c},a.jqplot.ColorGenerator=function(b){b=b||a.jqplot.config.defaultColors;var c=0;this.next=function(){return c<b.length?b[c++]:(c=0,b[c++])},this.previous=function(){return c>0?b[c--]:(c=b.length-1,b[c])},this.get=function(a){var c=a-b.length*Math.floor(a/b.length);return b[c]},this.setColors=function(a){b=a},this.reset=function(){c=0},this.getIndex=function(){return c},this.setIndex=function(a){c=a}},a.jqplot.hex2rgb=function(a,b){a=a.replace("#",""),3==a.length&&(a=a.charAt(0)+a.charAt(0)+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2));var c;return c="rgba("+parseInt(a.slice(0,2),16)+", "+parseInt(a.slice(2,4),16)+", "+parseInt(a.slice(4,6),16),b&&(c+=", "+b),c+=")"},a.jqplot.rgb2hex=function(a){for(var b=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *(?:, *[0-9.]*)?\)/,c=a.match(b),d="#",e=1;4>e;e++){var f;-1!=c[e].search(/%/)?(f=parseInt(255*c[e]/100,10).toString(16),1==f.length&&(f="0"+f)):(f=parseInt(c[e],10).toString(16),1==f.length&&(f="0"+f)),d+=f}return d},a.jqplot.normalize2rgb=function(b,c){if(-1!=b.search(/^ *rgba?\(/))return b;if(-1!=b.search(/^ *#?[0-9a-fA-F]?[0-9a-fA-F]/))return a.jqplot.hex2rgb(b,c);throw new Error("Invalid color spec")},a.jqplot.getColorComponents=function(b){b=a.jqplot.colorKeywordMap[b]||b;for(var c=a.jqplot.normalize2rgb(b),d=/rgba?\( *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *, *([0-9]{1,3}\.?[0-9]*%?) *,? *([0-9.]* *)?\)/,e=c.match(d),f=[],g=1;4>g;g++)-1!=e[g].search(/%/)?f[g-1]=parseInt(255*e[g]/100,10):f[g-1]=parseInt(e[g],10);return f[3]=parseFloat(e[4])?parseFloat(e[4]):1,f},a.jqplot.colorKeywordMap={aliceblue:"rgb(240, 248, 255)",antiquewhite:"rgb(250, 235, 215)",aqua:"rgb( 0, 255, 255)",aquamarine:"rgb(127, 255, 212)",azure:"rgb(240, 255, 255)",beige:"rgb(245, 245, 220)",bisque:"rgb(255, 228, 196)",black:"rgb( 0, 0, 0)",blanchedalmond:"rgb(255, 235, 205)",blue:"rgb( 0, 0, 255)",blueviolet:"rgb(138, 43, 226)",brown:"rgb(165, 42, 42)",burlywood:"rgb(222, 184, 135)",cadetblue:"rgb( 95, 158, 160)",chartreuse:"rgb(127, 255, 0)",chocolate:"rgb(210, 105, 30)",coral:"rgb(255, 127, 80)",cornflowerblue:"rgb(100, 149, 237)",cornsilk:"rgb(255, 248, 220)",crimson:"rgb(220, 20, 60)",cyan:"rgb( 0, 255, 255)",darkblue:"rgb( 0, 0, 139)",darkcyan:"rgb( 0, 139, 139)",darkgoldenrod:"rgb(184, 134, 11)",darkgray:"rgb(169, 169, 169)",darkgreen:"rgb( 0, 100, 0)",darkgrey:"rgb(169, 169, 169)",darkkhaki:"rgb(189, 183, 107)",darkmagenta:"rgb(139, 0, 139)",darkolivegreen:"rgb( 85, 107, 47)",darkorange:"rgb(255, 140, 0)",darkorchid:"rgb(153, 50, 204)",darkred:"rgb(139, 0, 0)",darksalmon:"rgb(233, 150, 122)",darkseagreen:"rgb(143, 188, 143)",darkslateblue:"rgb( 72, 61, 139)",darkslategray:"rgb( 47, 79, 79)",darkslategrey:"rgb( 47, 79, 79)",darkturquoise:"rgb( 0, 206, 209)",darkviolet:"rgb(148, 0, 211)",deeppink:"rgb(255, 20, 147)",deepskyblue:"rgb( 0, 191, 255)",dimgray:"rgb(105, 105, 105)",dimgrey:"rgb(105, 105, 105)",dodgerblue:"rgb( 30, 144, 255)",firebrick:"rgb(178, 34, 34)",floralwhite:"rgb(255, 250, 240)",forestgreen:"rgb( 34, 139, 34)",fuchsia:"rgb(255, 0, 255)",gainsboro:"rgb(220, 220, 220)",ghostwhite:"rgb(248, 248, 255)",gold:"rgb(255, 215, 0)",goldenrod:"rgb(218, 165, 32)",gray:"rgb(128, 128, 128)",grey:"rgb(128, 128, 128)",green:"rgb( 0, 128, 0)",greenyellow:"rgb(173, 255, 47)",honeydew:"rgb(240, 255, 240)",hotpink:"rgb(255, 105, 180)",indianred:"rgb(205, 92, 92)",indigo:"rgb( 75, 0, 130)",ivory:"rgb(255, 255, 240)",khaki:"rgb(240, 230, 140)",lavender:"rgb(230, 230, 250)",lavenderblush:"rgb(255, 240, 245)",lawngreen:"rgb(124, 252, 0)",lemonchiffon:"rgb(255, 250, 205)",lightblue:"rgb(173, 216, 230)",lightcoral:"rgb(240, 128, 128)",lightcyan:"rgb(224, 255, 255)",lightgoldenrodyellow:"rgb(250, 250, 210)",lightgray:"rgb(211, 211, 211)",lightgreen:"rgb(144, 238, 144)",lightgrey:"rgb(211, 211, 211)",lightpink:"rgb(255, 182, 193)",lightsalmon:"rgb(255, 160, 122)",lightseagreen:"rgb( 32, 178, 170)",lightskyblue:"rgb(135, 206, 250)",lightslategray:"rgb(119, 136, 153)",lightslategrey:"rgb(119, 136, 153)",lightsteelblue:"rgb(176, 196, 222)",lightyellow:"rgb(255, 255, 224)",lime:"rgb( 0, 255, 0)",limegreen:"rgb( 50, 205, 50)",linen:"rgb(250, 240, 230)",magenta:"rgb(255, 0, 255)",maroon:"rgb(128, 0, 0)",mediumaquamarine:"rgb(102, 205, 170)",mediumblue:"rgb( 0, 0, 205)",mediumorchid:"rgb(186, 85, 211)",mediumpurple:"rgb(147, 112, 219)",mediumseagreen:"rgb( 60, 179, 113)",mediumslateblue:"rgb(123, 104, 238)",mediumspringgreen:"rgb( 0, 250, 154)",mediumturquoise:"rgb( 72, 209, 204)",mediumvioletred:"rgb(199, 21, 133)",midnightblue:"rgb( 25, 25, 112)",mintcream:"rgb(245, 255, 250)",mistyrose:"rgb(255, 228, 225)",moccasin:"rgb(255, 228, 181)",navajowhite:"rgb(255, 222, 173)",navy:"rgb( 0, 0, 128)",oldlace:"rgb(253, 245, 230)",olive:"rgb(128, 128, 0)",olivedrab:"rgb(107, 142, 35)",orange:"rgb(255, 165, 0)",orangered:"rgb(255, 69, 0)",orchid:"rgb(218, 112, 214)",palegoldenrod:"rgb(238, 232, 170)",palegreen:"rgb(152, 251, 152)",paleturquoise:"rgb(175, 238, 238)",palevioletred:"rgb(219, 112, 147)",papayawhip:"rgb(255, 239, 213)",peachpuff:"rgb(255, 218, 185)",peru:"rgb(205, 133, 63)",pink:"rgb(255, 192, 203)",plum:"rgb(221, 160, 221)",powderblue:"rgb(176, 224, 230)",purple:"rgb(128, 0, 128)",red:"rgb(255, 0, 0)",rosybrown:"rgb(188, 143, 143)",royalblue:"rgb( 65, 105, 225)",saddlebrown:"rgb(139, 69, 19)",salmon:"rgb(250, 128, 114)",sandybrown:"rgb(244, 164, 96)",seagreen:"rgb( 46, 139, 87)",seashell:"rgb(255, 245, 238)",sienna:"rgb(160, 82, 45)",silver:"rgb(192, 192, 192)",skyblue:"rgb(135, 206, 235)",slateblue:"rgb(106, 90, 205)",slategray:"rgb(112, 128, 144)",slategrey:"rgb(112, 128, 144)",snow:"rgb(255, 250, 250)",springgreen:"rgb( 0, 255, 127)",steelblue:"rgb( 70, 130, 180)",tan:"rgb(210, 180, 140)",teal:"rgb( 0, 128, 128)",thistle:"rgb(216, 191, 216)",tomato:"rgb(255, 99, 71)",turquoise:"rgb( 64, 224, 208)",violet:"rgb(238, 130, 238)",wheat:"rgb(245, 222, 179)",white:"rgb(255, 255, 255)",whitesmoke:"rgb(245, 245, 245)",yellow:"rgb(255, 255, 0)",yellowgreen:"rgb(154, 205, 50)"},a.jqplot.AxisLabelRenderer=function(b){a.jqplot.ElemContainer.call(this),this.axis,this.show=!0,this.label="",this.fontFamily=null,this.fontSize=null,this.textColor=null,this._elem,this.escapeHTML=!1,a.extend(!0,this,b)},a.jqplot.AxisLabelRenderer.prototype=new a.jqplot.ElemContainer,a.jqplot.AxisLabelRenderer.prototype.constructor=a.jqplot.AxisLabelRenderer,a.jqplot.AxisLabelRenderer.prototype.init=function(b){a.extend(!0,this,b)},a.jqplot.AxisLabelRenderer.prototype.draw=function(b,c){return this._elem&&(this._elem.emptyForce(),this._elem=null),this._elem=a('<div style="position:absolute;" class="jqplot-'+this.axis+'-label"></div>'),Number(this.label)&&this._elem.css("white-space","nowrap"),this.escapeHTML?this._elem.text(this.label):this._elem.html(this.label),this.fontFamily&&this._elem.css("font-family",this.fontFamily),this.fontSize&&this._elem.css("font-size",this.fontSize),this.textColor&&this._elem.css("color",this.textColor),this._elem},a.jqplot.AxisLabelRenderer.prototype.pack=function(){},a.jqplot.AxisTickRenderer=function(b){a.jqplot.ElemContainer.call(this),this.mark="outside",this.axis,this.showMark=!0,this.showGridline=!0,this.isMinorTick=!1,this.size=4,this.markSize=6,this.show=!0,this.showLabel=!0,this.label=null,this.value=null,this._styles={},this.formatter=a.jqplot.DefaultTickFormatter,this.prefix="",this.suffix="",this.formatString="",this.fontFamily,this.fontSize,this.textColor,this.escapeHTML=!1,this._elem,this._breakTick=!1,a.extend(!0,this,b)},a.jqplot.AxisTickRenderer.prototype.init=function(b){a.extend(!0,this,b)},a.jqplot.AxisTickRenderer.prototype=new a.jqplot.ElemContainer,a.jqplot.AxisTickRenderer.prototype.constructor=a.jqplot.AxisTickRenderer,a.jqplot.AxisTickRenderer.prototype.setTick=function(a,b,c){return this.value=a,this.axis=b,c&&(this.isMinorTick=!0),this},a.jqplot.AxisTickRenderer.prototype.draw=function(){null===this.label&&(this.label=this.prefix+this.formatter(this.formatString,this.value)+this.suffix);var b={position:"absolute"};Number(this.label)&&(b.whitSpace="nowrap"),this._elem&&(this._elem.emptyForce(),this._elem=null),this._elem=a(document.createElement("div")),this._elem.addClass("jqplot-"+this.axis+"-tick"),this.escapeHTML?this._elem.text(this.label):this._elem.html(this.label),this._elem.css(b);for(var c in this._styles)this._elem.css(c,this._styles[c]);return this.fontFamily&&this._elem.css("font-family",this.fontFamily),this.fontSize&&this._elem.css("font-size",this.fontSize),this.textColor&&this._elem.css("color",this.textColor),this._breakTick&&this._elem.addClass("jqplot-breakTick"),this._elem},a.jqplot.DefaultTickFormatter=function(b,c){return"number"==typeof c?(b||(b=a.jqplot.config.defaultTickFormatString),a.jqplot.sprintf(b,c)):String(c)},a.jqplot.PercentTickFormatter=function(b,c){return"number"==typeof c?(c=100*c,b||(b=a.jqplot.config.defaultTickFormatString),a.jqplot.sprintf(b,c)):String(c)},a.jqplot.AxisTickRenderer.prototype.pack=function(){},a.jqplot.CanvasGridRenderer=function(){this.shadowRenderer=new a.jqplot.ShadowRenderer},a.jqplot.CanvasGridRenderer.prototype.init=function(b){this._ctx,a.extend(!0,this,b);var c={lineJoin:"miter",lineCap:"round",fill:!1,isarc:!1,angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.shadowWidth,closePath:!1,strokeStyle:this.shadowColor};this.renderer.shadowRenderer.init(c)},a.jqplot.CanvasGridRenderer.prototype.createElement=function(b){var c;this._elem&&(a.jqplot.use_excanvas&&window.G_vmlCanvasManager.uninitElement!==F&&(c=this._elem.get(0),window.G_vmlCanvasManager.uninitElement(c),c=null),this._elem.emptyForce(),this._elem=null),c=b.canvasManager.getCanvas();var d=this._plotDimensions.width,e=this._plotDimensions.height;return c.width=d,c.height=e,this._elem=a(c),this._elem.addClass("jqplot-grid-canvas"),this._elem.css({position:"absolute",left:0,top:0}),c=b.canvasManager.initCanvas(c),this._top=this._offsets.top,this._bottom=e-this._offsets.bottom,this._left=this._offsets.left,this._right=d-this._offsets.right,this._width=this._right-this._left,this._height=this._bottom-this._top,c=null,this._elem},a.jqplot.CanvasGridRenderer.prototype.draw=function(){function b(b,d,e,f,g){c.save(),g=g||{},(null==g.lineWidth||0!=g.lineWidth)&&(a.extend(!0,c,g),c.beginPath(),c.moveTo(b,d),c.lineTo(e,f),c.stroke(),c.restore())}this._ctx=this._elem.get(0).getContext("2d");var c=this._ctx,d=this._axes;c.save(),c.clearRect(0,0,this._plotDimensions.width,this._plotDimensions.height),c.fillStyle=this.backgroundColor||this.background,c.fillRect(this._left,this._top,this._width,this._height),c.save(),c.lineJoin="miter",c.lineCap="butt",c.lineWidth=this.gridLineWidth,c.strokeStyle=this.gridLineColor;for(var e,f,g,h,i=["xaxis","yaxis","x2axis","y2axis"],j=4;j>0;j--){var k=i[j-1],l=d[k],m=l._ticks,n=m.length;if(l.show){if(l.drawBaseline){var o={};switch(null!==l.baselineWidth&&(o.lineWidth=l.baselineWidth),null!==l.baselineColor&&(o.strokeStyle=l.baselineColor),k){case"xaxis":b(this._left,this._bottom,this._right,this._bottom,o);break;case"yaxis":b(this._left,this._bottom,this._left,this._top,o);break;case"x2axis":b(this._left,this._bottom,this._right,this._bottom,o);break;case"y2axis":b(this._right,this._bottom,this._right,this._top,o)}}for(var p=n;p>0;p--){var q=m[p-1];if(q.show){var r=Math.round(l.u2p(q.value))+.5;switch(k){case"xaxis":if(q.showGridline&&this.drawGridlines&&(!q.isMinorTick&&l.drawMajorGridlines||q.isMinorTick&&l.drawMinorGridlines)&&b(r,this._top,r,this._bottom),q.showMark&&q.mark&&(!q.isMinorTick&&l.drawMajorTickMarks||q.isMinorTick&&l.drawMinorTickMarks)){g=q.markSize,h=q.mark;var r=Math.round(l.u2p(q.value))+.5;switch(h){case"outside":e=this._bottom,f=this._bottom+g;break;case"inside":e=this._bottom-g,f=this._bottom;break;case"cross":e=this._bottom-g,f=this._bottom+g;break;default:e=this._bottom,f=this._bottom+g}this.shadow&&this.renderer.shadowRenderer.draw(c,[[r,e],[r,f]],{lineCap:"butt",lineWidth:this.gridLineWidth,offset:.75*this.gridLineWidth,depth:2,fill:!1,closePath:!1}),b(r,e,r,f)}break;case"yaxis":if(q.showGridline&&this.drawGridlines&&(!q.isMinorTick&&l.drawMajorGridlines||q.isMinorTick&&l.drawMinorGridlines)&&b(this._right,r,this._left,r),q.showMark&&q.mark&&(!q.isMinorTick&&l.drawMajorTickMarks||q.isMinorTick&&l.drawMinorTickMarks)){g=q.markSize,h=q.mark;var r=Math.round(l.u2p(q.value))+.5;switch(h){case"outside":e=this._left-g,f=this._left;break;case"inside":e=this._left,f=this._left+g;break;case"cross":e=this._left-g,f=this._left+g;break;default:e=this._left-g,f=this._left}this.shadow&&this.renderer.shadowRenderer.draw(c,[[e,r],[f,r]],{lineCap:"butt",lineWidth:1.5*this.gridLineWidth,offset:.75*this.gridLineWidth,fill:!1,closePath:!1}),b(e,r,f,r,{strokeStyle:l.borderColor})}break;case"x2axis":if(q.showGridline&&this.drawGridlines&&(!q.isMinorTick&&l.drawMajorGridlines||q.isMinorTick&&l.drawMinorGridlines)&&b(r,this._bottom,r,this._top),q.showMark&&q.mark&&(!q.isMinorTick&&l.drawMajorTickMarks||q.isMinorTick&&l.drawMinorTickMarks)){g=q.markSize,h=q.mark;var r=Math.round(l.u2p(q.value))+.5;switch(h){case"outside":e=this._top-g,f=this._top;break;case"inside":e=this._top,f=this._top+g;break;case"cross":e=this._top-g,f=this._top+g;break;default:e=this._top-g,f=this._top}this.shadow&&this.renderer.shadowRenderer.draw(c,[[r,e],[r,f]],{lineCap:"butt",lineWidth:this.gridLineWidth,offset:.75*this.gridLineWidth,depth:2,fill:!1,closePath:!1}),b(r,e,r,f)}break;case"y2axis":if(q.showGridline&&this.drawGridlines&&(!q.isMinorTick&&l.drawMajorGridlines||q.isMinorTick&&l.drawMinorGridlines)&&b(this._left,r,this._right,r),q.showMark&&q.mark&&(!q.isMinorTick&&l.drawMajorTickMarks||q.isMinorTick&&l.drawMinorTickMarks)){g=q.markSize,h=q.mark;var r=Math.round(l.u2p(q.value))+.5;switch(h){case"outside":e=this._right,f=this._right+g;break;case"inside":e=this._right-g,f=this._right;break;case"cross":e=this._right-g,f=this._right+g;break;default:e=this._right,f=this._right+g}this.shadow&&this.renderer.shadowRenderer.draw(c,[[e,r],[f,r]],{lineCap:"butt",lineWidth:1.5*this.gridLineWidth,offset:.75*this.gridLineWidth,fill:!1,closePath:!1}),b(e,r,f,r,{strokeStyle:l.borderColor})}}}}q=null}l=null,m=null}i=["y3axis","y4axis","y5axis","y6axis","y7axis","y8axis","y9axis","yMidAxis"];for(var j=7;j>0;j--){var l=d[i[j-1]],m=l._ticks;if(l.show){var s=m[l.numberTicks-1],t=m[0],u=l.getLeft(),v=[[u,s.getTop()+s.getHeight()/2],[u,t.getTop()+t.getHeight()/2+1]];this.shadow&&this.renderer.shadowRenderer.draw(c,v,{lineCap:"butt",fill:!1,closePath:!1}),b(v[0][0],v[0][1],v[1][0],v[1][1],{lineCap:"butt",strokeStyle:l.borderColor,lineWidth:l.borderWidth});for(var p=m.length;p>0;p--){var q=m[p-1];g=q.markSize,h=q.mark;var r=Math.round(l.u2p(q.value))+.5;if(q.showMark&&q.mark){switch(h){case"outside":e=u,f=u+g;break;case"inside":e=u-g,f=u;break;case"cross":e=u-g,f=u+g;break;default:e=u,f=u+g}v=[[e,r],[f,r]],this.shadow&&this.renderer.shadowRenderer.draw(c,v,{lineCap:"butt",lineWidth:1.5*this.gridLineWidth,offset:.75*this.gridLineWidth,fill:!1,closePath:!1}),b(e,r,f,r,{strokeStyle:l.borderColor})}q=null}t=null}l=null,m=null}if(c.restore(),this.shadow){var v=[[this._left,this._bottom],[this._right,this._bottom],[this._right,this._top]];this.renderer.shadowRenderer.draw(c,v)}0!=this.borderWidth&&this.drawBorder&&(b(this._left,this._top,this._right,this._top,{lineCap:"round",strokeStyle:d.x2axis.borderColor,lineWidth:d.x2axis.borderWidth}),b(this._right,this._top,this._right,this._bottom,{lineCap:"round",strokeStyle:d.y2axis.borderColor,lineWidth:d.y2axis.borderWidth}),b(this._right,this._bottom,this._left,this._bottom,{lineCap:"round",strokeStyle:d.xaxis.borderColor,lineWidth:d.xaxis.borderWidth}),b(this._left,this._bottom,this._left,this._top,{lineCap:"round",strokeStyle:d.yaxis.borderColor,lineWidth:d.yaxis.borderWidth})),c.restore(),c=null,d=null},a.jqplot.DivTitleRenderer=function(){},a.jqplot.DivTitleRenderer.prototype.init=function(b){a.extend(!0,this,b)},a.jqplot.DivTitleRenderer.prototype.draw=function(){this._elem&&(this._elem.emptyForce(),this._elem=null);var b=(this.renderer,document.createElement("div"));if(this._elem=a(b),this._elem.addClass("jqplot-title"),this.text){if(this.text){var c;this.color?c=this.color:this.textColor&&(c=this.textColor);var d={position:"absolute",top:"0px",left:"0px"};this._plotWidth&&(d.width=this._plotWidth+"px"),this.fontSize&&(d.fontSize=this.fontSize),"string"==typeof this.textAlign?d.textAlign=this.textAlign:d.textAlign="center",c&&(d.color=c),this.paddingBottom&&(d.paddingBottom=this.paddingBottom),this.fontFamily&&(d.fontFamily=this.fontFamily),this._elem.css(d),this.escapeHtml?this._elem.text(this.text):this._elem.html(this.text)}}else this.show=!1,this._elem.height(0),this._elem.width(0);return b=null,this._elem},a.jqplot.DivTitleRenderer.prototype.pack=function(){};var H=.1;a.jqplot.LinePattern=function(b,c){var d={dotted:[H,a.jqplot.config.dotGapLength],dashed:[a.jqplot.config.dashLength,a.jqplot.config.gapLength],solid:null};if("string"==typeof c)if("."===c[0]||"-"===c[0]){var e=c;c=[];for(var f=0,g=e.length;g>f;f++){if("."===e[f])c.push(H);else{if("-"!==e[f])continue;c.push(a.jqplot.config.dashLength)}c.push(a.jqplot.config.gapLength)}}else c=d[c];if(!c||!c.length)return b;var h=0,i=c[0],j=0,k=0,l=0,m=0,n=function(a,c){b.moveTo(a,c),j=a,k=c,l=a,m=c},o=function(a,d){var e=b.lineWidth,f=a-j,g=d-k,l=Math.sqrt(f*f+g*g);if(l>0&&e>0)for(f/=l,g/=l;;){var m=e*i;if(!(l>m)){j=a,k=d,0==(1&h)?b.lineTo(j,k):b.moveTo(j,k),i-=l/e;break}j+=m*f,k+=m*g,0==(1&h)?b.lineTo(j,k):b.moveTo(j,k),l-=m,h++,h>=c.length&&(h=0),i=c[h]}},p=function(){b.beginPath()},q=function(){o(l,m)};return{moveTo:n,lineTo:o,beginPath:p,closePath:q}},a.jqplot.LineRenderer=function(){this.shapeRenderer=new a.jqplot.ShapeRenderer,this.shadowRenderer=new a.jqplot.ShadowRenderer},a.jqplot.LineRenderer.prototype.init=function(b,c){b=b||{},this._type="line",this.renderer.animation={show:!1,direction:"left",speed:2500,_supported:!0},this.renderer.smooth=!1,this.renderer.tension=null,this.renderer.constrainSmoothing=!0,this.renderer._smoothedData=[],this.renderer._smoothedPlotData=[],this.renderer._hiBandGridData=[],this.renderer._lowBandGridData=[],this.renderer._hiBandSmoothedData=[],this.renderer._lowBandSmoothedData=[],this.renderer.bandData=[],this.renderer.bands={show:!1,hiData:[],lowData:[],color:this.color,showLines:!1,fill:!0,fillColor:null,_min:null,_max:null,interval:"3%"};var d={highlightMouseOver:b.highlightMouseOver,highlightMouseDown:b.highlightMouseDown,highlightColor:b.highlightColor};delete b.highlightMouseOver,delete b.highlightMouseDown,delete b.highlightColor,a.extend(!0,this.renderer,b),this.renderer.options=b,this.renderer.bandData.length>1&&(!b.bands||null==b.bands.show)?this.renderer.bands.show=!0:b.bands&&null==b.bands.show&&null!=b.bands.interval&&(this.renderer.bands.show=!0),this.fill&&(this.renderer.bands.show=!1),this.renderer.bands.show&&this.renderer.initBands.call(this,this.renderer.options,c),this._stack&&(this.renderer.smooth=!1);var e={lineJoin:this.lineJoin,lineCap:this.lineCap,fill:this.fill,isarc:!1,strokeStyle:this.color,fillStyle:this.fillColor,lineWidth:this.lineWidth,linePattern:this.linePattern,closePath:this.fill};this.renderer.shapeRenderer.init(e);var f=b.shadowOffset;null==f&&(f=this.lineWidth>2.5?1.25*(1+.6*(Math.atan(this.lineWidth/2.5)/.785398163-1)):1.25*Math.atan(this.lineWidth/2.5)/.785398163);var g={lineJoin:this.lineJoin,lineCap:this.lineCap,fill:this.fill,isarc:!1,angle:this.shadowAngle,offset:f,alpha:this.shadowAlpha,depth:this.shadowDepth,lineWidth:this.lineWidth,linePattern:this.linePattern,closePath:this.fill};if(this.renderer.shadowRenderer.init(g),this._areaPoints=[],this._boundingBox=[[],[]],!this.isTrendline&&this.fill||this.renderer.bands.show){if(this.highlightMouseOver=!0,this.highlightMouseDown=!1,this.highlightColor=null,d.highlightMouseDown&&null==d.highlightMouseOver&&(d.highlightMouseOver=!1),a.extend(!0,this,{highlightMouseOver:d.highlightMouseOver,highlightMouseDown:d.highlightMouseDown,highlightColor:d.highlightColor}),!this.highlightColor){var h=this.renderer.bands.show?this.renderer.bands.fillColor:this.fillColor;this.highlightColor=a.jqplot.computeHighlightColors(h)}this.highlighter&&(this.highlighter.show=!1)}!this.isTrendline&&c&&(c.plugins.lineRenderer={},c.postInitHooks.addOnce(l),c.postDrawHooks.addOnce(m),c.eventListenerHooks.addOnce("jqplotMouseMove",p),c.eventListenerHooks.addOnce("jqplotMouseDown",q),c.eventListenerHooks.addOnce("jqplotMouseUp",r),c.eventListenerHooks.addOnce("jqplotClick",s),c.eventListenerHooks.addOnce("jqplotRightClick",t))},a.jqplot.LineRenderer.prototype.initBands=function(b,c){var d=b.bandData||[],e=this.renderer.bands;e.hiData=[],e.lowData=[];var f=this.data;if(e._max=null,e._min=null,2==d.length)if(a.isArray(d[0][0])){for(var g,h=0,i=0,j=0,k=d[0].length;k>j;j++)g=d[0][j],(null!=g[1]&&g[1]>e._max||null==e._max)&&(e._max=g[1]),(null!=g[1]&&g[1]<e._min||null==e._min)&&(e._min=g[1]);for(var j=0,k=d[1].length;k>j;j++)g=d[1][j],(null!=g[1]&&g[1]>e._max||null==e._max)&&(e._max=g[1],i=1),(null!=g[1]&&g[1]<e._min||null==e._min)&&(e._min=g[1],h=1);i===h&&(e.show=!1),e.hiData=d[i],e.lowData=d[h]}else if(d[0].length===f.length&&d[1].length===f.length)for(var l=d[0][0]>d[1][0]?0:1,m=l?0:1,j=0,k=f.length;k>j;j++)e.hiData.push([f[j][0],d[l][j]]),e.lowData.push([f[j][0],d[m][j]]);else e.show=!1;else if(d.length>2&&!a.isArray(d[0][0]))for(var l=d[0][0]>d[0][1]?0:1,m=l?0:1,j=0,k=d.length;k>j;j++)e.hiData.push([f[j][0],d[j][l]]),e.lowData.push([f[j][0],d[j][m]]);else{var n=e.interval,o=null,p=null,q=null,r=null;if(a.isArray(n)?(o=n[0],p=n[1]):o=n,isNaN(o)?"%"===o.charAt(o.length-1)&&(q="multiply",o=parseFloat(o)/100+1):(o=parseFloat(o),q="add"),null!==p&&isNaN(p)?"%"===p.charAt(p.length-1)&&(r="multiply",p=parseFloat(p)/100+1):null!==p&&(p=parseFloat(p),r="add"),null!==o){if(null===p&&(p=-o,r=q,"multiply"===r&&(p+=2)),p>o){var s=o;o=p,p=s,s=q,q=r,r=s}for(var j=0,k=f.length;k>j;j++){switch(q){case"add":e.hiData.push([f[j][0],f[j][1]+o]);break;case"multiply":e.hiData.push([f[j][0],f[j][1]*o])}switch(r){case"add":e.lowData.push([f[j][0],f[j][1]+p]);break;case"multiply":e.lowData.push([f[j][0],f[j][1]*p])}}}else e.show=!1}for(var t=e.hiData,u=e.lowData,j=0,k=t.length;k>j;j++)(null!=t[j][1]&&t[j][1]>e._max||null==e._max)&&(e._max=t[j][1]);for(var j=0,k=u.length;k>j;j++)(null!=u[j][1]&&u[j][1]<e._min||null==e._min)&&(e._min=u[j][1]);if(null===e.fillColor){var v=a.jqplot.getColorComponents(e.color);v[3]=.5*v[3],e.fillColor="rgba("+v[0]+", "+v[1]+", "+v[2]+", "+v[3]+")"}},a.jqplot.LineRenderer.prototype.setGridData=function(a){var b=this._xaxis.series_u2p,c=this._yaxis.series_u2p,d=this._plotData,e=this._prevPlotData;this.gridData=[],this._prevGridData=[],this.renderer._smoothedData=[],this.renderer._smoothedPlotData=[],this.renderer._hiBandGridData=[],this.renderer._lowBandGridData=[],this.renderer._hiBandSmoothedData=[],this.renderer._lowBandSmoothedData=[];for(var f=this.renderer.bands,g=!1,h=0,i=d.length;i>h;h++)null!=d[h][0]&&null!=d[h][1]?this.gridData.push([b.call(this._xaxis,d[h][0]),c.call(this._yaxis,d[h][1])]):null==d[h][0]?(g=!0,this.gridData.push([null,c.call(this._yaxis,d[h][1])])):null==d[h][1]&&(g=!0,this.gridData.push([b.call(this._xaxis,d[h][0]),null])),null!=e[h]&&null!=e[h][0]&&null!=e[h][1]?this._prevGridData.push([b.call(this._xaxis,e[h][0]),c.call(this._yaxis,e[h][1])]):null!=e[h]&&null==e[h][0]?this._prevGridData.push([null,c.call(this._yaxis,e[h][1])]):null!=e[h]&&null!=e[h][0]&&null==e[h][1]&&this._prevGridData.push([b.call(this._xaxis,e[h][0]),null]);if(g&&(this.renderer.smooth=!1,"line"===this._type&&(f.show=!1)),"line"===this._type&&f.show){for(var h=0,i=f.hiData.length;i>h;h++)this.renderer._hiBandGridData.push([b.call(this._xaxis,f.hiData[h][0]),c.call(this._yaxis,f.hiData[h][1])]);for(var h=0,i=f.lowData.length;i>h;h++)this.renderer._lowBandGridData.push([b.call(this._xaxis,f.lowData[h][0]),c.call(this._yaxis,f.lowData[h][1])])}if("line"===this._type&&this.renderer.smooth&&this.gridData.length>2){var l;this.renderer.constrainSmoothing?(l=j.call(this,this.gridData),this.renderer._smoothedData=l[0],this.renderer._smoothedPlotData=l[1],f.show&&(l=j.call(this,this.renderer._hiBandGridData),this.renderer._hiBandSmoothedData=l[0],l=j.call(this,this.renderer._lowBandGridData),this.renderer._lowBandSmoothedData=l[0]),l=null):(l=k.call(this,this.gridData),this.renderer._smoothedData=l[0],this.renderer._smoothedPlotData=l[1],f.show&&(l=k.call(this,this.renderer._hiBandGridData),this.renderer._hiBandSmoothedData=l[0],l=k.call(this,this.renderer._lowBandGridData),this.renderer._lowBandSmoothedData=l[0]),l=null)}},a.jqplot.LineRenderer.prototype.makeGridData=function(a,b){var c=this._xaxis.series_u2p,d=this._yaxis.series_u2p,e=[];this.renderer._smoothedData=[],this.renderer._smoothedPlotData=[],this.renderer._hiBandGridData=[],this.renderer._lowBandGridData=[],this.renderer._hiBandSmoothedData=[],this.renderer._lowBandSmoothedData=[];for(var f=this.renderer.bands,g=!1,h=0;h<a.length;h++)null!=a[h][0]&&null!=a[h][1]?(this.step&&h>0&&e.push([c.call(this._xaxis,a[h][0]),d.call(this._yaxis,a[h-1][1])]),e.push([c.call(this._xaxis,a[h][0]),d.call(this._yaxis,a[h][1])])):null==a[h][0]?(g=!0,e.push([null,d.call(this._yaxis,a[h][1])])):null==a[h][1]&&(g=!0,e.push([c.call(this._xaxis,a[h][0]),null]));if(g&&(this.renderer.smooth=!1,"line"===this._type&&(f.show=!1)),"line"===this._type&&f.show){for(var h=0,i=f.hiData.length;i>h;h++)this.renderer._hiBandGridData.push([c.call(this._xaxis,f.hiData[h][0]),d.call(this._yaxis,f.hiData[h][1])]);for(var h=0,i=f.lowData.length;i>h;h++)this.renderer._lowBandGridData.push([c.call(this._xaxis,f.lowData[h][0]),d.call(this._yaxis,f.lowData[h][1])])}if("line"===this._type&&this.renderer.smooth&&e.length>2){var l;this.renderer.constrainSmoothing?(l=j.call(this,e),this.renderer._smoothedData=l[0],this.renderer._smoothedPlotData=l[1],f.show&&(l=j.call(this,this.renderer._hiBandGridData),this.renderer._hiBandSmoothedData=l[0],l=j.call(this,this.renderer._lowBandGridData),this.renderer._lowBandSmoothedData=l[0]),l=null):(l=k.call(this,e),this.renderer._smoothedData=l[0],this.renderer._smoothedPlotData=l[1],f.show&&(l=k.call(this,this.renderer._hiBandGridData),this.renderer._hiBandSmoothedData=l[0],l=k.call(this,this.renderer._lowBandGridData),this.renderer._lowBandSmoothedData=l[0]),l=null)}return e},a.jqplot.LineRenderer.prototype.draw=function(b,c,d,e){var f,g,h,i,j,k=a.extend(!0,{},d),l=k.shadow!=F?k.shadow:this.shadow,m=k.showLine!=F?k.showLine:this.showLine,n=k.fill!=F?k.fill:this.fill,o=k.fillAndStroke!=F?k.fillAndStroke:this.fillAndStroke;if(b.save(),c.length){if(m)if(n){if(this.fillToZero){var p=this.negativeColor;this.useNegativeColors||(p=k.fillStyle);var q=!1,r=k.fillStyle;if(o)var s=c.slice(0);if(0!=this.index&&this._stack){for(var t=this._prevGridData,f=t.length;f>0;f--)c.push(t[f-1]);l&&this.renderer.shadowRenderer.draw(b,c,k),this._areaPoints=c,this.renderer.shapeRenderer.draw(b,c,k)}else{var u=[],v=this.renderer.smooth?this.renderer._smoothedPlotData:this._plotData;this._areaPoints=[];var w=this._yaxis.series_u2p(this.fillToValue);this._xaxis.series_u2p(this.fillToValue);if(k.closePath=!0,"y"==this.fillAxis){u.push([c[0][0],w]),this._areaPoints.push([c[0][0],w]);for(var f=0;f<c.length-1;f++)if(u.push(c[f]),this._areaPoints.push(c[f]),v[f][1]*v[f+1][1]<=0){v[f][1]<0?(q=!0,k.fillStyle=p):(q=!1,k.fillStyle=r);var x=c[f][0]+(c[f+1][0]-c[f][0])*(w-c[f][1])/(c[f+1][1]-c[f][1]);u.push([x,w]),this._areaPoints.push([x,w]),l&&this.renderer.shadowRenderer.draw(b,u,k),this.renderer.shapeRenderer.draw(b,u,k),u=[[x,w]]}v[c.length-1][1]<0?(q=!0,k.fillStyle=p):(q=!1,k.fillStyle=r),u.push(c[c.length-1]),this._areaPoints.push(c[c.length-1]),u.push([c[c.length-1][0],w]),this._areaPoints.push([c[c.length-1][0],w])}l&&this.renderer.shadowRenderer.draw(b,u,k),this.renderer.shapeRenderer.draw(b,u,k)}}else{if(o)var s=c.slice(0);if(0!=this.index&&this._stack)for(var t=this._prevGridData,f=t.length;f>0;f--)c.push(t[f-1]);else{var y=b.canvas.height;c.unshift([c[0][0],y]);var z=c.length;c.push([c[z-1][0],y])}this._areaPoints=c,l&&this.renderer.shadowRenderer.draw(b,c,k),this.renderer.shapeRenderer.draw(b,c,k)}if(o){var A=a.extend(!0,{},k,{fill:!1,closePath:!1});if(this.renderer.shapeRenderer.draw(b,s,A),this.markerRenderer.show)for(this.renderer.smooth&&(s=this.gridData),f=0;f<s.length;f++)this.markerRenderer.draw(s[f][0],s[f][1],b,k.markerOptions)}}else{if(this.renderer.bands.show){var B,C=a.extend(!0,{},k);this.renderer.bands.showLines&&(B=this.renderer.smooth?this.renderer._hiBandSmoothedData:this.renderer._hiBandGridData,this.renderer.shapeRenderer.draw(b,B,k),B=this.renderer.smooth?this.renderer._lowBandSmoothedData:this.renderer._lowBandGridData,this.renderer.shapeRenderer.draw(b,B,C)),this.renderer.bands.fill&&(B=this.renderer.smooth?this.renderer._hiBandSmoothedData.concat(this.renderer._lowBandSmoothedData.reverse()):this.renderer._hiBandGridData.concat(this.renderer._lowBandGridData.reverse()),this._areaPoints=B,C.closePath=!0,C.fill=!0,C.fillStyle=this.renderer.bands.fillColor,this.renderer.shapeRenderer.draw(b,B,C))}l&&this.renderer.shadowRenderer.draw(b,c,k),this.renderer.shapeRenderer.draw(b,c,k)}var g=i=h=j=null;for(f=0;f<this._areaPoints.length;f++){var D=this._areaPoints[f];(g>D[0]||null==g)&&(g=D[0]),(j<D[1]||null==j)&&(j=D[1]),(i<D[0]||null==i)&&(i=D[0]),(h>D[1]||null==h)&&(h=D[1])}if("line"===this.type&&this.renderer.bands.show&&(j=this._yaxis.series_u2p(this.renderer.bands._min),h=this._yaxis.series_u2p(this.renderer.bands._max)),this._boundingBox=[[g,j],[i,h]],this.markerRenderer.show&&!n)for(this.renderer.smooth&&(c=this.gridData),f=0;f<c.length;f++)null!=c[f][0]&&null!=c[f][1]&&this.markerRenderer.draw(c[f][0],c[f][1],b,k.markerOptions)}b.restore()},a.jqplot.LineRenderer.prototype.drawShadow=function(a,b,c){},a.jqplot.LinearAxisRenderer=function(){},a.jqplot.LinearAxisRenderer.prototype.init=function(b){this.breakPoints=null,this.breakTickLabel="&asymp;",this.drawBaseline=!0,this.baselineWidth=null,this.baselineColor=null,this.forceTickAt0=!1,this.forceTickAt100=!1,this.tickInset=0,this.minorTicks=0,this.alignTicks=!1,this._autoFormatString="",this._overrideFormatString=!1,this._scalefact=1,a.extend(!0,this,b),this.breakPoints&&(a.isArray(this.breakPoints)?(this.breakPoints.length<2||this.breakPoints[1]<=this.breakPoints[0])&&(this.breakPoints=null):this.breakPoints=null),
null!=this.numberTicks&&this.numberTicks<2&&(this.numberTicks=2),this.resetDataBounds()},a.jqplot.LinearAxisRenderer.prototype.draw=function(b,c){if(this.show){this.renderer.createTicks.call(this,c);if(this._elem&&(this._elem.emptyForce(),this._elem=null),this._elem=a(document.createElement("div")),this._elem.addClass("jqplot-axis jqplot-"+this.name),this._elem.css("position","absolute"),"xaxis"==this.name||"x2axis"==this.name?this._elem.width(this._plotDimensions.width):this._elem.height(this._plotDimensions.height),this.labelOptions.axis=this.name,this._label=new this.labelRenderer(this.labelOptions),this._label.show){var d=this._label.draw(b,c);d.appendTo(this._elem),d=null}for(var e,f=this._ticks,g=0;g<f.length;g++)e=f[g],e.show&&e.showLabel&&(!e.isMinorTick||this.showMinorTicks)&&this._elem.append(e.draw(b,c));e=null,f=null}return this._elem},a.jqplot.LinearAxisRenderer.prototype.reset=function(){this.min=this._options.min,this.max=this._options.max,this.tickInterval=this._options.tickInterval,this.numberTicks=this._options.numberTicks,this._autoFormatString="",this._overrideFormatString&&this.tickOptions&&this.tickOptions.formatString&&(this.tickOptions.formatString="")},a.jqplot.LinearAxisRenderer.prototype.set=function(){var b,c=0,d=0,e=0,f=null==this._label?!1:this._label.show;if(this.show){for(var g,h=this._ticks,i=0;i<h.length;i++)g=h[i],g._breakTick||!g.show||!g.showLabel||g.isMinorTick&&!this.showMinorTicks||(b="xaxis"==this.name||"x2axis"==this.name?g._elem.outerHeight(!0):g._elem.outerWidth(!0),b>c&&(c=b));g=null,h=null,f&&(d=this._label._elem.outerWidth(!0),e=this._label._elem.outerHeight(!0)),"xaxis"==this.name?(c+=e,this._elem.css({height:c+"px",left:"0px",bottom:"0px"})):"x2axis"==this.name?(c+=e,this._elem.css({height:c+"px",left:"0px",top:"0px"})):"yaxis"==this.name?(c+=d,this._elem.css({width:c+"px",left:"0px",top:"0px"}),f&&this._label.constructor==a.jqplot.AxisLabelRenderer&&this._label._elem.css("width",d+"px")):(c+=d,this._elem.css({width:c+"px",right:"0px",top:"0px"}),f&&this._label.constructor==a.jqplot.AxisLabelRenderer&&this._label._elem.css("width",d+"px"))}},a.jqplot.LinearAxisRenderer.prototype.createTicks=function(b){var c,d,e,f,g=this._ticks,h=this.ticks,i=this.name,j=this._dataBounds,k="x"===this.name.charAt(0)?this._plotDimensions.width:this._plotDimensions.height,l=this.min,m=this.max,n=this.numberTicks,o=this.tickInterval,p=30;if(this._scalefact=(Math.max(k,p+1)-p)/300,h.length){for(f=0;f<h.length;f++){var q=h[f],r=new this.tickRenderer(this.tickOptions);a.isArray(q)?(r.value=q[0],this.breakPoints?q[0]==this.breakPoints[0]?(r.label=this.breakTickLabel,r._breakTick=!0,r.showGridline=!1,r.showMark=!1):q[0]>this.breakPoints[0]&&q[0]<=this.breakPoints[1]?(r.show=!1,r.showGridline=!1,r.label=q[1]):r.label=q[1]:r.label=q[1],r.setTick(q[0],this.name),this._ticks.push(r)):a.isPlainObject(q)?(a.extend(!0,r,q),r.axis=this.name,this._ticks.push(r)):(r.value=q,this.breakPoints&&(q==this.breakPoints[0]?(r.label=this.breakTickLabel,r._breakTick=!0,r.showGridline=!1,r.showMark=!1):q>this.breakPoints[0]&&q<=this.breakPoints[1]&&(r.show=!1,r.showGridline=!1)),r.setTick(q,this.name),this._ticks.push(r))}this.numberTicks=h.length,this.min=this._ticks[0].value,this.max=this._ticks[this.numberTicks-1].value,this.tickInterval=(this.max-this.min)/(this.numberTicks-1)}else{k="xaxis"==i||"x2axis"==i?this._plotDimensions.width:this._plotDimensions.height;var s=this.numberTicks;this.alignTicks&&("x2axis"===this.name&&b.axes.xaxis.show?s=b.axes.xaxis.numberTicks:"y"===this.name.charAt(0)&&"yaxis"!==this.name&&"yMidAxis"!==this.name&&b.axes.yaxis.show&&(s=b.axes.yaxis.numberTicks)),c=null!=this.min?this.min:j.min,d=null!=this.max?this.max:j.max;var t,u,v,w=d-c;if(null!=this.tickOptions&&this.tickOptions.formatString||(this._overrideFormatString=!0),null==this.min||null==this.max&&null==this.tickInterval&&!this.autoscale){this.forceTickAt0&&(c>0&&(c=0),0>d&&(d=0)),this.forceTickAt100&&(c>100&&(c=100),100>d&&(d=100));var x=!1,y=!1;null!=this.min?x=!0:null!=this.max&&(y=!0);var z=a.jqplot.LinearTickGenerator(c,d,this._scalefact,s,x,y),A=null!=this.min?c:c+w*(this.padMin-1),B=null!=this.max?d:d-w*(this.padMax-1);(A>c||d>B)&&(A=null!=this.min?c:c-w*(this.padMin-1),B=null!=this.max?d:d+w*(this.padMax-1),z=a.jqplot.LinearTickGenerator(A,B,this._scalefact,s,x,y)),this.min=z[0],this.max=z[1],this.numberTicks=z[2],this._autoFormatString=z[3],this.tickInterval=z[4]}else{if(c==d){var C=.05;c>0&&(C=Math.max(Math.log(c)/Math.LN10,.05)),c-=C,d+=C}if(this.autoscale&&null==this.min&&null==this.max){for(var D,E,F,G=!1,H=!1,f=0;f<this._series.length;f++){var I=this._series[f],J="x"==I.fillAxis?I._xaxis.name:I._yaxis.name;if(this.name==J){for(var K=I._plotValues[I.fillAxis],L=K[0],M=K[0],N=1;N<K.length;N++)K[N]<L?L=K[N]:K[N]>M&&(M=K[N]);var O=(M-L)/M;I.renderer.constructor==a.jqplot.BarRenderer?L>=0&&(I.fillToZero||O>.1)?G=!0:(G=!1,H=I.fill&&I.fillToZero&&0>L&&M>0?!0:!1):I.fill?L>=0&&(I.fillToZero||O>.1)?G=!0:0>L&&M>0&&I.fillToZero?(G=!1,H=!0):(G=!1,H=!1):0>L&&(G=!1)}}if(G)this.numberTicks=2+Math.ceil((k-(this.tickSpacing-1))/this.tickSpacing),this.min=0,l=0,E=d/(this.numberTicks-1),v=Math.pow(10,Math.abs(Math.floor(Math.log(E)/Math.LN10))),E/v==parseInt(E/v,10)&&(E+=v),this.tickInterval=Math.ceil(E/v)*v,this.max=this.tickInterval*(this.numberTicks-1);else if(H){this.numberTicks=2+Math.ceil((k-(this.tickSpacing-1))/this.tickSpacing);var P=Math.ceil(Math.abs(c)/w*(this.numberTicks-1)),Q=this.numberTicks-1-P;E=Math.max(Math.abs(c/P),Math.abs(d/Q)),v=Math.pow(10,Math.abs(Math.floor(Math.log(E)/Math.LN10))),this.tickInterval=Math.ceil(E/v)*v,this.max=this.tickInterval*Q,this.min=-this.tickInterval*P}else null==this.numberTicks&&(this.tickInterval?this.numberTicks=3+Math.ceil(w/this.tickInterval):this.numberTicks=2+Math.ceil((k-(this.tickSpacing-1))/this.tickSpacing)),null==this.tickInterval?(E=w/(this.numberTicks-1),v=1>E?Math.pow(10,Math.abs(Math.floor(Math.log(E)/Math.LN10))):1,this.tickInterval=Math.ceil(E*v*this.pad)/v):v=1/this.tickInterval,D=this.tickInterval*(this.numberTicks-1),F=(D-w)/2,null==this.min&&(this.min=Math.floor(v*(c-F))/v),null==this.max&&(this.max=this.min+D);var R,S=a.jqplot.getSignificantFigures(this.tickInterval);if(S.digitsLeft>=S.significantDigits)R="%d";else{var v=Math.max(0,5-S.digitsLeft);v=Math.min(v,S.digitsRight),R="%."+v+"f"}this._autoFormatString=R}else{t=null!=this.min?this.min:c-w*(this.padMin-1),u=null!=this.max?this.max:d+w*(this.padMax-1),w=u-t,null==this.numberTicks&&(null!=this.tickInterval?this.numberTicks=Math.ceil((u-t)/this.tickInterval)+1:k>100?this.numberTicks=parseInt(3+(k-100)/75,10):this.numberTicks=2),null==this.tickInterval&&(this.tickInterval=w/(this.numberTicks-1)),null==this.max&&(u=t+this.tickInterval*(this.numberTicks-1)),null==this.min&&(t=u-this.tickInterval*(this.numberTicks-1));var R,S=a.jqplot.getSignificantFigures(this.tickInterval);if(S.digitsLeft>=S.significantDigits)R="%d";else{var v=Math.max(0,5-S.digitsLeft);v=Math.min(v,S.digitsRight),R="%."+v+"f"}this._autoFormatString=R,this.min=t,this.max=u}if(this.renderer.constructor==a.jqplot.LinearAxisRenderer&&""==this._autoFormatString){w=this.max-this.min;var T=new this.tickRenderer(this.tickOptions),U=T.formatString||a.jqplot.config.defaultTickFormatString,U=U.match(a.jqplot.sprintf.regex)[0],V=0;if(U){if(U.search(/[fFeEgGpP]/)>-1){var W=U.match(/\%\.(\d{0,})?[eEfFgGpP]/);V=W?parseInt(W[1],10):6}else U.search(/[di]/)>-1&&(V=0);var X=Math.pow(10,-V);if(this.tickInterval<X&&null==n&&null==o)if(this.tickInterval=X,null==m&&null==l){this.min=Math.floor(this._dataBounds.min/X)*X,this.min==this._dataBounds.min&&(this.min=this._dataBounds.min-this.tickInterval),this.max=Math.ceil(this._dataBounds.max/X)*X,this.max==this._dataBounds.max&&(this.max=this._dataBounds.max+this.tickInterval);var Y=(this.max-this.min)/this.tickInterval;Y=Y.toFixed(11),Y=Math.ceil(Y),this.numberTicks=Y+1}else if(null==m){var Y=(this._dataBounds.max-this.min)/this.tickInterval;Y=Y.toFixed(11),this.numberTicks=Math.ceil(Y)+2,this.max=this.min+this.tickInterval*(this.numberTicks-1)}else if(null==l){var Y=(this.max-this._dataBounds.min)/this.tickInterval;Y=Y.toFixed(11),this.numberTicks=Math.ceil(Y)+2,this.min=this.max-this.tickInterval*(this.numberTicks-1)}else this.numberTicks=Math.ceil((m-l)/this.tickInterval)+1,this.min=Math.floor(l*Math.pow(10,V))/Math.pow(10,V),this.max=Math.ceil(m*Math.pow(10,V))/Math.pow(10,V),this.numberTicks=Math.ceil((this.max-this.min)/this.tickInterval)+1}}}this._overrideFormatString&&""!=this._autoFormatString&&(this.tickOptions=this.tickOptions||{},this.tickOptions.formatString=this._autoFormatString);for(var r,Z,f=0;f<this.numberTicks;f++){if(e=this.min+f*this.tickInterval,r=new this.tickRenderer(this.tickOptions),r.setTick(e,this.name),this._ticks.push(r),f<this.numberTicks-1)for(var N=0;N<this.minorTicks;N++)e+=this.tickInterval/(this.minorTicks+1),Z=a.extend(!0,{},this.tickOptions,{name:this.name,value:e,label:"",isMinorTick:!0}),r=new this.tickRenderer(Z),this._ticks.push(r);r=null}}this.tickInset&&(this.min=this.min-this.tickInset*this.tickInterval,this.max=this.max+this.tickInset*this.tickInterval),g=null},a.jqplot.LinearAxisRenderer.prototype.resetTickValues=function(b){if(a.isArray(b)&&b.length==this._ticks.length){for(var c,d=0;d<b.length;d++)c=this._ticks[d],c.value=b[d],c.label=c.formatter(c.formatString,b[d]),c.label=c.prefix+c.label,c._elem.html(c.label);c=null,this.min=a.jqplot.arrayMin(b),this.max=a.jqplot.arrayMax(b),this.pack()}},a.jqplot.LinearAxisRenderer.prototype.pack=function(b,c){b=b||{},c=c||this._offsets;var d=this._ticks,e=this.max,f=this.min,g=c.max,h=c.min,i=null==this._label?!1:this._label.show;for(var j in b)this._elem.css(j,b[j]);this._offsets=c;var k=g-h,l=e-f;if(this.breakPoints?(l=l-this.breakPoints[1]+this.breakPoints[0],this.p2u=function(a){return(a-h)*l/k+f},this.u2p=function(a){return a>this.breakPoints[0]&&a<this.breakPoints[1]&&(a=this.breakPoints[0]),a<=this.breakPoints[0]?(a-f)*k/l+h:(a-this.breakPoints[1]+this.breakPoints[0]-f)*k/l+h},"x"==this.name.charAt(0)?(this.series_u2p=function(a){return a>this.breakPoints[0]&&a<this.breakPoints[1]&&(a=this.breakPoints[0]),a<=this.breakPoints[0]?(a-f)*k/l:(a-this.breakPoints[1]+this.breakPoints[0]-f)*k/l},this.series_p2u=function(a){return a*l/k+f}):(this.series_u2p=function(a){return a>this.breakPoints[0]&&a<this.breakPoints[1]&&(a=this.breakPoints[0]),a>=this.breakPoints[1]?(a-e)*k/l:(a+this.breakPoints[1]-this.breakPoints[0]-e)*k/l},this.series_p2u=function(a){return a*l/k+e})):(this.p2u=function(a){return(a-h)*l/k+f},this.u2p=function(a){return(a-f)*k/l+h},"xaxis"==this.name||"x2axis"==this.name?(this.series_u2p=function(a){return(a-f)*k/l},this.series_p2u=function(a){return a*l/k+f}):(this.series_u2p=function(a){return(a-e)*k/l},this.series_p2u=function(a){return a*l/k+e})),this.show)if("xaxis"==this.name||"x2axis"==this.name){for(var m=0;m<d.length;m++){var n=d[m];if(n.show&&n.showLabel){var o;if(n.constructor==a.jqplot.CanvasAxisTickRenderer&&n.angle){var p="xaxis"==this.name?1:-1;switch(n.labelPosition){case"auto":o=p*n.angle<0?-n.getWidth()+n._textRenderer.height*Math.sin(-n._textRenderer.angle)/2:-n._textRenderer.height*Math.sin(n._textRenderer.angle)/2;break;case"end":o=-n.getWidth()+n._textRenderer.height*Math.sin(-n._textRenderer.angle)/2;break;case"start":o=-n._textRenderer.height*Math.sin(n._textRenderer.angle)/2;break;case"middle":o=-n.getWidth()/2+n._textRenderer.height*Math.sin(-n._textRenderer.angle)/2;break;default:o=-n.getWidth()/2+n._textRenderer.height*Math.sin(-n._textRenderer.angle)/2}}else o=-n.getWidth()/2;var q=this.u2p(n.value)+o+"px";n._elem.css("left",q),n.pack()}}if(i){var r=this._label._elem.outerWidth(!0);this._label._elem.css("left",h+k/2-r/2+"px"),"xaxis"==this.name?this._label._elem.css("bottom","0px"):this._label._elem.css("top","0px"),this._label.pack()}}else{for(var m=0;m<d.length;m++){var n=d[m];if(n.show&&n.showLabel){var o;if(n.constructor==a.jqplot.CanvasAxisTickRenderer&&n.angle){var p="yaxis"==this.name?1:-1;switch(n.labelPosition){case"auto":case"end":o=p*n.angle<0?-n._textRenderer.height*Math.cos(-n._textRenderer.angle)/2:-n.getHeight()+n._textRenderer.height*Math.cos(n._textRenderer.angle)/2;break;case"start":o=n.angle>0?-n._textRenderer.height*Math.cos(-n._textRenderer.angle)/2:-n.getHeight()+n._textRenderer.height*Math.cos(n._textRenderer.angle)/2;break;case"middle":o=-n.getHeight()/2;break;default:o=-n.getHeight()/2}}else o=-n.getHeight()/2;var q=this.u2p(n.value)+o+"px";n._elem.css("top",q),n.pack()}}if(i){var s=this._label._elem.outerHeight(!0);this._label._elem.css("top",g-k/2-s/2+"px"),"yaxis"==this.name?this._label._elem.css("left","0px"):this._label._elem.css("right","0px"),this._label.pack()}}d=null};a.jqplot.LinearTickGenerator=function(b,c,d,e,f,g){if(f=null===f?!1:f,g=null===g||f?!1:g,b===c&&(c=c?0:1),d=d||1,b>c){var h=c;c=b,b=h}var i=[],j=x(c-b,d),k=a.jqplot.getSignificantFigures;if(null==e)if(f||g){if(f){i[0]=b,i[2]=Math.ceil((c-b)/j+1),i[1]=b+(i[2]-1)*j;var l=k(b).digitsRight,m=k(j).digitsRight;m>l?i[3]=u(j):i[3]="%."+l+"f",i[4]=j}else if(g){i[1]=c,i[2]=Math.ceil((c-b)/j+1),i[0]=c-(i[2]-1)*j;var n=k(c).digitsRight,m=k(j).digitsRight;m>n?i[3]=u(j):i[3]="%."+n+"f",i[4]=j}}else i[0]=Math.floor(b/j)*j,i[1]=Math.ceil(c/j)*j,i[2]=Math.round((i[1]-i[0])/j+1),i[3]=u(j),i[4]=j;else{var o=[];if(o[0]=Math.floor(b/j)*j,o[1]=Math.ceil(c/j)*j,o[2]=Math.round((o[1]-o[0])/j+1),o[3]=u(j),o[4]=j,o[2]===e)i=o;else{var p=w(o[1]-o[0],e);i[0]=o[0],i[2]=e,i[4]=p,i[3]=u(p),i[1]=i[0]+(i[2]-1)*i[4]}}return i},a.jqplot.LinearTickGenerator.bestLinearInterval=x,a.jqplot.LinearTickGenerator.bestInterval=w,a.jqplot.LinearTickGenerator.bestLinearComponents=y,a.jqplot.LinearTickGenerator.bestConstrainedInterval=v,a.jqplot.MarkerRenderer=function(b){this.show=!0,this.style="filledCircle",this.lineWidth=2,this.size=9,this.color="#666666",this.shadow=!0,this.shadowAngle=45,this.shadowOffset=1,this.shadowDepth=3,this.shadowAlpha="0.07",this.shadowRenderer=new a.jqplot.ShadowRenderer,this.shapeRenderer=new a.jqplot.ShapeRenderer,a.extend(!0,this,b)},a.jqplot.MarkerRenderer.prototype.init=function(b){a.extend(!0,this,b);var c={angle:this.shadowAngle,offset:this.shadowOffset,alpha:this.shadowAlpha,lineWidth:this.lineWidth,depth:this.shadowDepth,closePath:!0};-1!=this.style.indexOf("filled")&&(c.fill=!0),-1!=this.style.indexOf("ircle")&&(c.isarc=!0,c.closePath=!1),this.shadowRenderer.init(c);var d={fill:!1,isarc:!1,strokeStyle:this.color,fillStyle:this.color,lineWidth:this.lineWidth,closePath:!0};-1!=this.style.indexOf("filled")&&(d.fill=!0),-1!=this.style.indexOf("ircle")&&(d.isarc=!0,d.closePath=!1),this.shapeRenderer.init(d)},a.jqplot.MarkerRenderer.prototype.drawDiamond=function(a,b,c,d,e){var f=1.2,g=this.size/2/f,h=this.size/2*f,i=[[a-g,b],[a,b+h],[a+g,b],[a,b-h]];this.shadow&&this.shadowRenderer.draw(c,i),this.shapeRenderer.draw(c,i,e)},a.jqplot.MarkerRenderer.prototype.drawPlus=function(b,c,d,e,f){var g=1,h=this.size/2*g,i=this.size/2*g,j=[[b,c-i],[b,c+i]],k=[[b+h,c],[b-h,c]],l=a.extend(!0,{},this.options,{closePath:!1});this.shadow&&(this.shadowRenderer.draw(d,j,{closePath:!1}),this.shadowRenderer.draw(d,k,{closePath:!1})),this.shapeRenderer.draw(d,j,l),this.shapeRenderer.draw(d,k,l)},a.jqplot.MarkerRenderer.prototype.drawX=function(b,c,d,e,f){var g=1,h=this.size/2*g,i=this.size/2*g,j=a.extend(!0,{},this.options,{closePath:!1}),k=[[b-h,c-i],[b+h,c+i]],l=[[b-h,c+i],[b+h,c-i]];this.shadow&&(this.shadowRenderer.draw(d,k,{closePath:!1}),this.shadowRenderer.draw(d,l,{closePath:!1})),this.shapeRenderer.draw(d,k,j),this.shapeRenderer.draw(d,l,j)},a.jqplot.MarkerRenderer.prototype.drawDash=function(a,b,c,d,e){var f=1,g=this.size/2*f,h=(this.size/2*f,[[a-g,b],[a+g,b]]);this.shadow&&this.shadowRenderer.draw(c,h),this.shapeRenderer.draw(c,h,e)},a.jqplot.MarkerRenderer.prototype.drawLine=function(a,b,c,d,e){var f=[a,b];this.shadow&&this.shadowRenderer.draw(c,f),this.shapeRenderer.draw(c,f,e)},a.jqplot.MarkerRenderer.prototype.drawSquare=function(a,b,c,d,e){var f=1,g=this.size/2/f,h=this.size/2*f,i=[[a-g,b-h],[a-g,b+h],[a+g,b+h],[a+g,b-h]];this.shadow&&this.shadowRenderer.draw(c,i),this.shapeRenderer.draw(c,i,e)},a.jqplot.MarkerRenderer.prototype.drawCircle=function(a,b,c,d,e){var f=this.size/2,g=2*Math.PI,h=[a,b,f,0,g,!0];this.shadow&&this.shadowRenderer.draw(c,h),this.shapeRenderer.draw(c,h,e)},a.jqplot.MarkerRenderer.prototype.draw=function(a,b,c,d){if(d=d||{},null==d.show||0!=d.show)switch(d.color&&!d.fillStyle&&(d.fillStyle=d.color),d.color&&!d.strokeStyle&&(d.strokeStyle=d.color),this.style){case"diamond":this.drawDiamond(a,b,c,!1,d);break;case"filledDiamond":this.drawDiamond(a,b,c,!0,d);break;case"circle":this.drawCircle(a,b,c,!1,d);break;case"filledCircle":this.drawCircle(a,b,c,!0,d);break;case"square":this.drawSquare(a,b,c,!1,d);break;case"filledSquare":this.drawSquare(a,b,c,!0,d);break;case"x":this.drawX(a,b,c,!0,d);break;case"plus":this.drawPlus(a,b,c,!0,d);break;case"dash":this.drawDash(a,b,c,!0,d);break;case"line":this.drawLine(a,b,c,!1,d);break;default:this.drawDiamond(a,b,c,!1,d)}},a.jqplot.ShadowRenderer=function(b){this.angle=45,this.offset=1,this.alpha=.07,this.lineWidth=1.5,this.lineJoin="miter",this.lineCap="round",this.closePath=!1,this.fill=!1,this.depth=3,this.strokeStyle="rgba(0,0,0,0.1)",this.isarc=!1,a.extend(!0,this,b)},a.jqplot.ShadowRenderer.prototype.init=function(b){a.extend(!0,this,b)},a.jqplot.ShadowRenderer.prototype.draw=function(b,c,d){b.save();var e=null!=d?d:{},f=null!=e.fill?e.fill:this.fill,g=null!=e.fillRect?e.fillRect:this.fillRect,h=null!=e.closePath?e.closePath:this.closePath,i=null!=e.offset?e.offset:this.offset,j=null!=e.alpha?e.alpha:this.alpha,k=null!=e.depth?e.depth:this.depth,l=null!=e.isarc?e.isarc:this.isarc,m=null!=e.linePattern?e.linePattern:this.linePattern;b.lineWidth=null!=e.lineWidth?e.lineWidth:this.lineWidth,b.lineJoin=null!=e.lineJoin?e.lineJoin:this.lineJoin,b.lineCap=null!=e.lineCap?e.lineCap:this.lineCap,b.strokeStyle=e.strokeStyle||this.strokeStyle||"rgba(0,0,0,"+j+")",b.fillStyle=e.fillStyle||this.fillStyle||"rgba(0,0,0,"+j+")";for(var n=0;k>n;n++){var o=a.jqplot.LinePattern(b,m);if(b.translate(Math.cos(this.angle*Math.PI/180)*i,Math.sin(this.angle*Math.PI/180)*i),o.beginPath(),l)b.arc(c[0],c[1],c[2],c[3],c[4],!0);else if(g)g&&b.fillRect(c[0],c[1],c[2],c[3]);else if(c&&c.length)for(var p=!0,q=0;q<c.length;q++)null!=c[q][0]&&null!=c[q][1]?p?(o.moveTo(c[q][0],c[q][1]),p=!1):o.lineTo(c[q][0],c[q][1]):p=!0;h&&o.closePath(),f?b.fill():b.stroke()}b.restore()},a.jqplot.ShapeRenderer=function(b){this.lineWidth=1.5,this.linePattern="solid",this.lineJoin="miter",this.lineCap="round",this.closePath=!1,this.fill=!1,this.isarc=!1,this.fillRect=!1,this.strokeRect=!1,this.clearRect=!1,this.strokeStyle="#999999",this.fillStyle="#999999",a.extend(!0,this,b)},a.jqplot.ShapeRenderer.prototype.init=function(b){a.extend(!0,this,b)},a.jqplot.ShapeRenderer.prototype.draw=function(b,c,d){b.save();var e=null!=d?d:{},f=null!=e.fill?e.fill:this.fill,g=null!=e.closePath?e.closePath:this.closePath,h=null!=e.fillRect?e.fillRect:this.fillRect,i=null!=e.strokeRect?e.strokeRect:this.strokeRect,j=null!=e.clearRect?e.clearRect:this.clearRect,k=null!=e.isarc?e.isarc:this.isarc,l=null!=e.linePattern?e.linePattern:this.linePattern,m=a.jqplot.LinePattern(b,l);if(b.lineWidth=e.lineWidth||this.lineWidth,b.lineJoin=e.lineJoin||this.lineJoin,b.lineCap=e.lineCap||this.lineCap,b.strokeStyle=e.strokeStyle||e.color||this.strokeStyle,b.fillStyle=e.fillStyle||this.fillStyle,b.beginPath(),k)return b.arc(c[0],c[1],c[2],c[3],c[4],!0),g&&b.closePath(),f?b.fill():b.stroke(),void b.restore();if(j)return b.clearRect(c[0],c[1],c[2],c[3]),void b.restore();if(h||i){if(h&&b.fillRect(c[0],c[1],c[2],c[3]),i)return b.strokeRect(c[0],c[1],c[2],c[3]),void b.restore()}else if(c&&c.length){for(var n=!0,o=0;o<c.length;o++)null!=c[o][0]&&null!=c[o][1]?n?(m.moveTo(c[o][0],c[o][1]),n=!1):m.lineTo(c[o][0],c[o][1]):n=!0;g&&m.closePath(),f?b.fill():b.stroke()}b.restore()},a.jqplot.TableLegendRenderer=function(){},a.jqplot.TableLegendRenderer.prototype.init=function(b){a.extend(!0,this,b)},a.jqplot.TableLegendRenderer.prototype.addrow=function(b,c,d,e){var f,g,h,i,j,k=d?this.rowSpacing+"px":"0px";h=document.createElement("tr"),f=a(h),f.addClass("jqplot-table-legend"),h=null,e?f.prependTo(this._elem):f.appendTo(this._elem),this.showSwatches&&(g=a(document.createElement("td")),g.addClass("jqplot-table-legend jqplot-table-legend-swatch"),g.css({textAlign:"center",paddingTop:k}),i=a(document.createElement("div")),i.addClass("jqplot-table-legend-swatch-outline"),j=a(document.createElement("div")),j.addClass("jqplot-table-legend-swatch"),j.css({backgroundColor:c,borderColor:c}),f.append(g.append(i.append(j)))),this.showLabels&&(g=a(document.createElement("td")),g.addClass("jqplot-table-legend jqplot-table-legend-label"),g.css("paddingTop",k),f.append(g),this.escapeHtml?g.text(b):g.html(b)),g=null,i=null,j=null,f=null,h=null},a.jqplot.TableLegendRenderer.prototype.draw=function(){if(this._elem&&(this._elem.emptyForce(),this._elem=null),this.show){var b=this._series,c=document.createElement("table");this._elem=a(c),this._elem.addClass("jqplot-table-legend");var d={position:"absolute"};this.background&&(d.background=this.background),this.border&&(d.border=this.border),this.fontSize&&(d.fontSize=this.fontSize),this.fontFamily&&(d.fontFamily=this.fontFamily),this.textColor&&(d.textColor=this.textColor),null!=this.marginTop&&(d.marginTop=this.marginTop),null!=this.marginBottom&&(d.marginBottom=this.marginBottom),null!=this.marginLeft&&(d.marginLeft=this.marginLeft),null!=this.marginRight&&(d.marginRight=this.marginRight);for(var e,f=!1,g=!1,h=0;h<b.length;h++)if(e=b[h],(e._stack||e.renderer.constructor==a.jqplot.BezierCurveRenderer)&&(g=!0),e.show&&e.showLabel){var i=this.labels[h]||e.label.toString();if(i){var j=e.color;g&&h<b.length-1?f=!0:g&&h==b.length-1&&(f=!1),this.renderer.addrow.call(this,i,j,f,g),f=!0}for(var k=0;k<a.jqplot.addLegendRowHooks.length;k++){var l=a.jqplot.addLegendRowHooks[k].call(this,e);l&&(this.renderer.addrow.call(this,l.label,l.color,f),f=!0)}i=null}}return this._elem},a.jqplot.TableLegendRenderer.prototype.pack=function(a){if(this.show)if("insideGrid"==this.placement)switch(this.location){case"nw":var b=a.left,c=a.top;this._elem.css("left",b),this._elem.css("top",c);break;case"n":var b=(a.left+(this._plotDimensions.width-a.right))/2-this.getWidth()/2,c=a.top;this._elem.css("left",b),this._elem.css("top",c);break;case"ne":var b=a.right,c=a.top;this._elem.css({right:b,top:c});break;case"e":var b=a.right,c=(a.top+(this._plotDimensions.height-a.bottom))/2-this.getHeight()/2;this._elem.css({right:b,top:c});break;case"se":var b=a.right,c=a.bottom;this._elem.css({right:b,bottom:c});break;case"s":var b=(a.left+(this._plotDimensions.width-a.right))/2-this.getWidth()/2,c=a.bottom;this._elem.css({left:b,bottom:c});break;case"sw":var b=a.left,c=a.bottom;this._elem.css({left:b,bottom:c});break;case"w":var b=a.left,c=(a.top+(this._plotDimensions.height-a.bottom))/2-this.getHeight()/2;this._elem.css({left:b,top:c});break;default:var b=a.right,c=a.bottom;this._elem.css({right:b,bottom:c})}else if("outside"==this.placement)switch(this.location){case"nw":var b=this._plotDimensions.width-a.left,c=a.top;this._elem.css("right",b),this._elem.css("top",c);break;case"n":var b=(a.left+(this._plotDimensions.width-a.right))/2-this.getWidth()/2,c=this._plotDimensions.height-a.top;this._elem.css("left",b),this._elem.css("bottom",c);break;case"ne":var b=this._plotDimensions.width-a.right,c=a.top;this._elem.css({left:b,top:c});break;case"e":var b=this._plotDimensions.width-a.right,c=(a.top+(this._plotDimensions.height-a.bottom))/2-this.getHeight()/2;this._elem.css({left:b,top:c});break;case"se":var b=this._plotDimensions.width-a.right,c=a.bottom;this._elem.css({left:b,bottom:c});break;case"s":var b=(a.left+(this._plotDimensions.width-a.right))/2-this.getWidth()/2,c=this._plotDimensions.height-a.bottom;this._elem.css({left:b,top:c});break;case"sw":var b=this._plotDimensions.width-a.left,c=a.bottom;this._elem.css({right:b,bottom:c});break;case"w":var b=this._plotDimensions.width-a.left,c=(a.top+(this._plotDimensions.height-a.bottom))/2-this.getHeight()/2;this._elem.css({right:b,top:c});break;default:var b=a.right,c=a.bottom;this._elem.css({right:b,bottom:c})}else switch(this.location){case"nw":this._elem.css({left:0,top:a.top});break;case"n":var b=(a.left+(this._plotDimensions.width-a.right))/2-this.getWidth()/2;this._elem.css({left:b,top:a.top});break;case"ne":this._elem.css({right:0,top:a.top});break;case"e":var c=(a.top+(this._plotDimensions.height-a.bottom))/2-this.getHeight()/2;this._elem.css({right:a.right,top:c});break;case"se":this._elem.css({right:a.right,bottom:a.bottom});break;case"s":var b=(a.left+(this._plotDimensions.width-a.right))/2-this.getWidth()/2;this._elem.css({left:b,bottom:a.bottom});break;case"sw":this._elem.css({left:a.left,bottom:a.bottom});break;case"w":var c=(a.top+(this._plotDimensions.height-a.bottom))/2-this.getHeight()/2;this._elem.css({left:a.left,top:c});break;default:this._elem.css({right:a.right,bottom:a.bottom})}},a.jqplot.ThemeEngine=function(){this.themes={},this.activeTheme=null},a.jqplot.ThemeEngine.prototype.init=function(){var b,c,d,e=new a.jqplot.Theme({_name:"Default"});for(b in e.target)"textColor"==b?e.target[b]=this.target.css("color"):e.target[b]=this.target.css(b);if(this.title.show&&this.title._elem)for(b in e.title)"textColor"==b?e.title[b]=this.title._elem.css("color"):e.title[b]=this.title._elem.css(b);for(b in e.grid)e.grid[b]=this.grid[b];if(null==e.grid.backgroundColor&&null!=this.grid.background&&(e.grid.backgroundColor=this.grid.background),this.legend.show&&this.legend._elem)for(b in e.legend)"textColor"==b?e.legend[b]=this.legend._elem.css("color"):e.legend[b]=this.legend._elem.css(b);var f;for(c=0;c<this.series.length;c++){f=this.series[c],f.renderer.constructor==a.jqplot.LineRenderer?e.series.push(new L):f.renderer.constructor==a.jqplot.BarRenderer?e.series.push(new N):f.renderer.constructor==a.jqplot.PieRenderer?e.series.push(new O):f.renderer.constructor==a.jqplot.DonutRenderer?e.series.push(new P):f.renderer.constructor==a.jqplot.FunnelRenderer?e.series.push(new Q):f.renderer.constructor==a.jqplot.MeterGaugeRenderer?e.series.push(new R):e.series.push({});for(b in e.series[c])e.series[c][b]=f[b]}var g,h;for(b in this.axes){if(h=this.axes[b],g=e.axes[b]=new I,g.borderColor=h.borderColor,g.borderWidth=h.borderWidth,h._ticks&&h._ticks[0])for(d in g.ticks)h._ticks[0].hasOwnProperty(d)?g.ticks[d]=h._ticks[0][d]:h._ticks[0]._elem&&(g.ticks[d]=h._ticks[0]._elem.css(d));if(h._label&&h._label.show)for(d in g.label)h._label[d]?g.label[d]=h._label[d]:h._label._elem&&("textColor"==d?g.label[d]=h._label._elem.css("color"):g.label[d]=h._label._elem.css(d))}this.themeEngine._add(e),this.themeEngine.activeTheme=this.themeEngine.themes[e._name]},a.jqplot.ThemeEngine.prototype.get=function(a){return a?this.themes[a]:this.activeTheme},a.jqplot.ThemeEngine.prototype.getThemeNames=function(){var a=[];for(var b in this.themes)a.push(b);return a.sort(z)},a.jqplot.ThemeEngine.prototype.getThemes=function(){var a=[],b=[];for(var c in this.themes)a.push(c);a.sort(z);for(var d=0;d<a.length;d++)b.push(this.themes[a[d]]);return b},a.jqplot.ThemeEngine.prototype.activate=function(b,c){var d=!1;if(!c&&this.activeTheme&&this.activeTheme._name&&(c=this.activeTheme._name),!this.themes.hasOwnProperty(c))throw new Error("No theme of that name");var e=this.themes[c];this.activeTheme=e;var f,g=["xaxis","x2axis","yaxis","y2axis"];for(p=0;p<g.length;p++){var h=g[p];null!=e.axesStyles.borderColor&&(b.axes[h].borderColor=e.axesStyles.borderColor),null!=e.axesStyles.borderWidth&&(b.axes[h].borderWidth=e.axesStyles.borderWidth)}for(var i in b.axes){var j=b.axes[i];if(j.show){var k=e.axes[i]||{},l=e.axesStyles,m=a.jqplot.extend(!0,{},k,l);if(f=null!=e.axesStyles.borderColor?e.axesStyles.borderColor:m.borderColor,null!=m.borderColor&&(j.borderColor=m.borderColor,d=!0),f=null!=e.axesStyles.borderWidth?e.axesStyles.borderWidth:m.borderWidth,null!=m.borderWidth&&(j.borderWidth=m.borderWidth,d=!0),j._ticks&&j._ticks[0])for(var n in m.ticks)f=m.ticks[n],null!=f&&(j.tickOptions[n]=f,j._ticks=[],d=!0);if(j._label&&j._label.show)for(var n in m.label)f=m.label[n],null!=f&&(j.labelOptions[n]=f,d=!0)}}for(var o in e.grid)null!=e.grid[o]&&(b.grid[o]=e.grid[o]);if(d||b.grid.draw(),b.legend.show)for(o in e.legend)null!=e.legend[o]&&(b.legend[o]=e.legend[o]);if(b.title.show)for(o in e.title)null!=e.title[o]&&(b.title[o]=e.title[o]);var p;for(p=0;p<e.series.length;p++){var q={};for(o in e.series[p])f=null!=e.seriesStyles[o]?e.seriesStyles[o]:e.series[p][o],null!=f&&(q[o]=f,"color"==o?(b.series[p].renderer.shapeRenderer.fillStyle=f,b.series[p].renderer.shapeRenderer.strokeStyle=f,b.series[p][o]=f):"lineWidth"==o||"linePattern"==o?(b.series[p].renderer.shapeRenderer[o]=f,b.series[p][o]=f):"markerOptions"==o?(B(b.series[p].markerOptions,f),B(b.series[p].markerRenderer,f)):b.series[p][o]=f,d=!0)}d&&(b.target.empty(),b.draw());for(o in e.target)null!=e.target[o]&&b.target.css(o,e.target[o])},a.jqplot.ThemeEngine.prototype._add=function(a,b){if(b&&(a._name=b),a._name||(a._name=Date.parse(new Date)),this.themes.hasOwnProperty(a._name))throw new Error("jqplot.ThemeEngine Error: Theme already in use");this.themes[a._name]=a},a.jqplot.ThemeEngine.prototype.remove=function(a){return"Default"==a?!1:delete this.themes[a]},a.jqplot.ThemeEngine.prototype.newTheme=function(b,c){"object"==typeof b&&(c=c||b,b=null),b=c&&c._name?c._name:b||Date.parse(new Date);var d=this.copy(this.themes.Default._name,b);return a.jqplot.extend(d,c),d},a.jqplot.clone=A,a.jqplot.merge=B,a.jqplot.extend=function(){var b,c=arguments[0]||{},d=1,e=arguments.length,f=!1;for("boolean"==typeof c&&(f=c,c=arguments[1]||{},d=2),"object"!=typeof c&&"[object Function]"===!toString.call(c)&&(c={});e>d;d++)if(null!=(b=arguments[d]))for(var g in b){var h=c[g],i=b[g];c!==i&&(f&&i&&"object"==typeof i&&!i.nodeType?c[g]=a.jqplot.extend(f,h||(null!=i.length?[]:{}),i):i!==F&&(c[g]=i))}return c},a.jqplot.ThemeEngine.prototype.rename=function(a,b){if("Default"==a||"Default"==b)throw new Error("jqplot.ThemeEngine Error: Cannot rename from/to Default");if(this.themes.hasOwnProperty(b))throw new Error("jqplot.ThemeEngine Error: New name already in use.");if(this.themes.hasOwnProperty(a)){var c=this.copy(a,b);return this.remove(a),c}throw new Error("jqplot.ThemeEngine Error: Old name or new name invalid")},a.jqplot.ThemeEngine.prototype.copy=function(b,c,d){if("Default"==c)throw new Error("jqplot.ThemeEngine Error: Cannot copy over Default theme");if(!this.themes.hasOwnProperty(b)){var e="jqplot.ThemeEngine Error: Source name invalid";throw new Error(e)}if(this.themes.hasOwnProperty(c)){var e="jqplot.ThemeEngine Error: Target name invalid";throw new Error(e)}var f=A(this.themes[b]);return f._name=c,a.jqplot.extend(!0,f,d),this._add(f),f},a.jqplot.Theme=function(b,c){"object"==typeof b&&(c=c||b,b=null),b=b||Date.parse(new Date),this._name=b,this.target={backgroundColor:null},this.legend={textColor:null,fontFamily:null,fontSize:null,border:null,background:null},this.title={textColor:null,fontFamily:null,fontSize:null,textAlign:null},this.seriesStyles={},this.series=[],this.grid={drawGridlines:null,gridLineColor:null,gridLineWidth:null,backgroundColor:null,borderColor:null,borderWidth:null,shadow:null},this.axesStyles={label:{},ticks:{}},this.axes={},"string"==typeof c?this._name=c:"object"==typeof c&&a.jqplot.extend(!0,this,c)};var I=function(){this.borderColor=null,this.borderWidth=null,this.ticks=new J,this.label=new K},J=function(){this.show=null,this.showGridline=null,this.showLabel=null,this.showMark=null,this.size=null,this.textColor=null,this.whiteSpace=null,this.fontSize=null,this.fontFamily=null},K=function(){this.textColor=null,this.whiteSpace=null,this.fontSize=null,
this.fontFamily=null,this.fontWeight=null},L=function(){this.color=null,this.lineWidth=null,this.linePattern=null,this.shadow=null,this.fillColor=null,this.showMarker=null,this.markerOptions=new M},M=function(){this.show=null,this.style=null,this.lineWidth=null,this.size=null,this.color=null,this.shadow=null},N=function(){this.color=null,this.seriesColors=null,this.lineWidth=null,this.shadow=null,this.barPadding=null,this.barMargin=null,this.barWidth=null,this.highlightColors=null},O=function(){this.seriesColors=null,this.padding=null,this.sliceMargin=null,this.fill=null,this.shadow=null,this.startAngle=null,this.lineWidth=null,this.highlightColors=null},P=function(){this.seriesColors=null,this.padding=null,this.sliceMargin=null,this.fill=null,this.shadow=null,this.startAngle=null,this.lineWidth=null,this.innerDiameter=null,this.thickness=null,this.ringMargin=null,this.highlightColors=null},Q=function(){this.color=null,this.lineWidth=null,this.shadow=null,this.padding=null,this.sectionMargin=null,this.seriesColors=null,this.highlightColors=null},R=function(){this.padding=null,this.backgroundColor=null,this.ringColor=null,this.tickColor=null,this.ringWidth=null,this.intervalColors=null,this.intervalInnerRadius=null,this.intervalOuterRadius=null,this.hubRadius=null,this.needleThickness=null,this.needlePad=null};a.fn.jqplotChildText=function(){return a(this).contents().filter(function(){return 3==this.nodeType}).text()},a.fn.jqplotGetComputedFontStyle=function(){for(var a=window.getComputedStyle?window.getComputedStyle(this[0],""):this[0].currentStyle,b=a["font-style"]?["font-style","font-weight","font-size","font-family"]:["fontStyle","fontWeight","fontSize","fontFamily"],c=[],d=0;d<b.length;++d){var e=String(a[b[d]]);e&&"normal"!=e&&c.push(e)}return c.join(" ")},a.fn.jqplotToImageCanvas=function(b){function c(b){var c=parseInt(a(b).css("line-height"),10);return isNaN(c)&&(c=1.2*parseInt(a(b).css("font-size"),10)),c}function d(b,d,e,f,g,h){for(var i=c(b),j=a(b).innerWidth(),k=(a(b).innerHeight(),e.split(/\s+/)),l=k.length,m="",n=[],o=g,p=f,q=0;l>q;q++)m+=k[q],d.measureText(m).width>j&&m.length>k[q].length&&(n.push(q),m="",q--);if(0===n.length)"center"===a(b).css("textAlign")&&(p=f+(h-d.measureText(m).width)/2-s),d.fillText(e,p,g);else{m=k.slice(0,n[0]).join(" "),"center"===a(b).css("textAlign")&&(p=f+(h-d.measureText(m).width)/2-s),d.fillText(m,p,o),o+=i;for(var q=1,r=n.length;r>q;q++)m=k.slice(n[q-1],n[q]).join(" "),"center"===a(b).css("textAlign")&&(p=f+(h-d.measureText(m).width)/2-s),d.fillText(m,p,o),o+=i;m=k.slice(n[q-1],k.length).join(" "),"center"===a(b).css("textAlign")&&(p=f+(h-d.measureText(m).width)/2-s),d.fillText(m,p,o)}}function e(b,c,f){var g=b.tagName.toLowerCase(),h=a(b).position(),i=window.getComputedStyle?window.getComputedStyle(b,""):b.currentStyle,j=c+h.left+parseInt(i.marginLeft,10)+parseInt(i.borderLeftWidth,10)+parseInt(i.paddingLeft,10),k=f+h.top+parseInt(i.marginTop,10)+parseInt(i.borderTopWidth,10)+parseInt(i.paddingTop,10),l=m.width;if("div"!=g&&"span"!=g||a(b).hasClass("jqplot-highlighter-tooltip"))if("table"===g&&a(b).hasClass("jqplot-table-legend")){w.strokeStyle=a(b).css("border-top-color"),w.fillStyle=a(b).css("background-color"),w.fillRect(j,k,a(b).innerWidth(),a(b).innerHeight()),parseInt(a(b).css("border-top-width"),10)>0&&w.strokeRect(j,k,a(b).innerWidth(),a(b).innerHeight()),a(b).find("div.jqplot-table-legend-swatch-outline").each(function(){var b=a(this);w.strokeStyle=b.css("border-top-color");var c=j+b.position().left,d=k+b.position().top;w.strokeRect(c,d,b.innerWidth(),b.innerHeight()),c+=parseInt(b.css("padding-left"),10),d+=parseInt(b.css("padding-top"),10);var e=b.innerHeight()-2*parseInt(b.css("padding-top"),10),f=b.innerWidth()-2*parseInt(b.css("padding-left"),10),g=b.children("div.jqplot-table-legend-swatch");w.fillStyle=g.css("background-color"),w.fillRect(c,d,f,e)}),a(b).find("td.jqplot-table-legend-label").each(function(){var b=a(this),c=j+b.position().left,e=k+b.position().top+parseInt(b.css("padding-top"),10);w.font=b.jqplotGetComputedFontStyle(),w.fillStyle=b.css("color"),d(b,w,b.text(),c,e,l)})}else"canvas"==g&&w.drawImage(b,j,k);else{a(b).children().each(function(){e(this,j,k)});var n=a(b).jqplotChildText();n&&(w.font=a(b).jqplotGetComputedFontStyle(),w.fillStyle=a(b).css("color"),d(b,w,n,j,k,l))}}b=b||{};var f=null==b.x_offset?0:b.x_offset,g=null==b.y_offset?0:b.y_offset,h=null==b.backgroundColor?"rgb(255,255,255)":b.backgroundColor;if(0==a(this).width()||0==a(this).height())return null;if(a.jqplot.use_excanvas)return null;for(var i,j,k,l,m=document.createElement("canvas"),n=a(this).outerHeight(!0),o=a(this).outerWidth(!0),p=a(this).offset(),q=p.left,r=p.top,s=0,t=0,u=["jqplot-table-legend","jqplot-xaxis-tick","jqplot-x2axis-tick","jqplot-yaxis-tick","jqplot-y2axis-tick","jqplot-y3axis-tick","jqplot-y4axis-tick","jqplot-y5axis-tick","jqplot-y6axis-tick","jqplot-y7axis-tick","jqplot-y8axis-tick","jqplot-y9axis-tick","jqplot-xaxis-label","jqplot-x2axis-label","jqplot-yaxis-label","jqplot-y2axis-label","jqplot-y3axis-label","jqplot-y4axis-label","jqplot-y5axis-label","jqplot-y6axis-label","jqplot-y7axis-label","jqplot-y8axis-label","jqplot-y9axis-label"],v=0;v<u.length;v++)a(this).find("."+u[v]).each(function(){i=a(this).offset().top-r,j=a(this).offset().left-q,l=j+a(this).outerWidth(!0)+s,k=i+a(this).outerHeight(!0)+t,-s>j&&(o=o-s-j,s=-j),-t>i&&(n=n-t-i,t=-i),l>o&&(o=l),k>n&&(n=k)});m.width=o+Number(f),m.height=n+Number(g);var w=m.getContext("2d");return w.save(),w.fillStyle=h,w.fillRect(0,0,m.width,m.height),w.restore(),w.translate(s,t),w.textAlign="left",w.textBaseline="top",a(this).children().each(function(){e(this,f,g)}),m},a.fn.jqplotToImageStr=function(b){var c=a(this).jqplotToImageCanvas(b);return c?c.toDataURL("image/png"):null},a.fn.jqplotToImageElem=function(b){var c=document.createElement("img"),d=a(this).jqplotToImageStr(b);return c.src=d,c},a.fn.jqplotToImageElemStr=function(b){var c="<img src="+a(this).jqplotToImageStr(b)+" />";return c},a.fn.jqplotSaveImage=function(){var b=a(this).jqplotToImageStr({});b&&(window.location.href=b.replace("image/png","image/octet-stream"))},a.fn.jqplotViewImage=function(){var b=a(this).jqplotToImageElemStr({});a(this).jqplotToImageStr({});if(b){var c=window.open("");c.document.open("image/png"),c.document.write(b),c.document.close(),c=null}};var S=function(){switch(this.syntax=S.config.syntax,this._type="jsDate",this.proxy=new Date,this.options={},this.locale=S.regional.getLocale(),this.formatString="",this.defaultCentury=S.config.defaultCentury,arguments.length){case 0:break;case 1:if("[object Object]"==D(arguments[0])&&"jsDate"!=arguments[0]._type){var a=this.options=arguments[0];this.syntax=a.syntax||this.syntax,this.defaultCentury=a.defaultCentury||this.defaultCentury,this.proxy=S.createDate(a.date)}else this.proxy=S.createDate(arguments[0]);break;default:for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c]);this.proxy=new Date,this.proxy.setFullYear.apply(this.proxy,b.slice(0,3)),b.slice(3).length&&this.proxy.setHours.apply(this.proxy,b.slice(3))}};S.config={defaultLocale:"en",syntax:"perl",defaultCentury:1900},S.prototype.add=function(a,b){var c=V[b]||V.day;return"number"==typeof c?this.proxy.setTime(this.proxy.getTime()+c*a):c.add(this,a),this},S.prototype.clone=function(){return new S(this.proxy.getTime())},S.prototype.getUtcOffset=function(){return 6e4*this.proxy.getTimezoneOffset()},S.prototype.diff=function(a,b,c){if(a=new S(a),null===a)return null;var d=V[b]||V.day;if("number"==typeof d)var e=(this.proxy.getTime()-a.proxy.getTime())/d;else var e=d.diff(this.proxy,a.proxy);return c?e:Math[e>0?"floor":"ceil"](e)},S.prototype.getAbbrDayName=function(){return S.regional[this.locale].dayNamesShort[this.proxy.getDay()]},S.prototype.getAbbrMonthName=function(){return S.regional[this.locale].monthNamesShort[this.proxy.getMonth()]},S.prototype.getAMPM=function(){return this.proxy.getHours()>=12?"PM":"AM"},S.prototype.getAmPm=function(){return this.proxy.getHours()>=12?"pm":"am"},S.prototype.getCentury=function(){return parseInt(this.proxy.getFullYear()/100,10)},S.prototype.getDate=function(){return this.proxy.getDate()},S.prototype.getDay=function(){return this.proxy.getDay()},S.prototype.getDayOfWeek=function(){var a=this.proxy.getDay();return 0===a?7:a},S.prototype.getDayOfYear=function(){var a=this.proxy,b=a-new Date(""+a.getFullYear()+"/1/1 GMT");return b+=6e4*a.getTimezoneOffset(),a=null,parseInt(b/6e4/60/24,10)+1},S.prototype.getDayName=function(){return S.regional[this.locale].dayNames[this.proxy.getDay()]},S.prototype.getFullWeekOfYear=function(){var a=this.proxy,b=this.getDayOfYear(),c=6-a.getDay(),d=parseInt((b+c)/7,10);return d},S.prototype.getFullYear=function(){return this.proxy.getFullYear()},S.prototype.getGmtOffset=function(){var a=this.proxy.getTimezoneOffset()/60,b=0>a?"+":"-";return a=Math.abs(a),b+U(Math.floor(a),2)+":"+U(a%1*60,2)},S.prototype.getHours=function(){return this.proxy.getHours()},S.prototype.getHours12=function(){var a=this.proxy.getHours();return a>12?a-12:0==a?12:a},S.prototype.getIsoWeek=function(){var a=this.proxy,b=this.getWeekOfYear(),c=new Date(""+a.getFullYear()+"/1/1").getDay(),d=b+(c>4||1>=c?0:1);return 53==d&&new Date(""+a.getFullYear()+"/12/31").getDay()<4?d=1:0===d&&(a=new S(new Date(""+(a.getFullYear()-1)+"/12/31")),d=a.getIsoWeek()),a=null,d},S.prototype.getMilliseconds=function(){return this.proxy.getMilliseconds()},S.prototype.getMinutes=function(){return this.proxy.getMinutes()},S.prototype.getMonth=function(){return this.proxy.getMonth()},S.prototype.getMonthName=function(){return S.regional[this.locale].monthNames[this.proxy.getMonth()]},S.prototype.getMonthNumber=function(){return this.proxy.getMonth()+1},S.prototype.getSeconds=function(){return this.proxy.getSeconds()},S.prototype.getShortYear=function(){return this.proxy.getYear()%100},S.prototype.getTime=function(){return this.proxy.getTime()},S.prototype.getTimezoneAbbr=function(){return this.proxy.toString().replace(/^.*\(([^)]+)\)$/,"$1")},S.prototype.getTimezoneName=function(){var a=/(?:\((.+)\)$| ([A-Z]{3}) )/.exec(this.toString());return a[1]||a[2]||"GMT"+this.getGmtOffset()},S.prototype.getTimezoneOffset=function(){return this.proxy.getTimezoneOffset()},S.prototype.getWeekOfYear=function(){var a=this.getDayOfYear(),b=7-this.getDayOfWeek(),c=parseInt((a+b)/7,10);return c},S.prototype.getUnix=function(){return Math.round(this.proxy.getTime()/1e3,0)},S.prototype.getYear=function(){return this.proxy.getYear()},S.prototype.next=function(a){return a=a||"day",this.clone().add(1,a)},S.prototype.set=function(){switch(arguments.length){case 0:this.proxy=new Date;break;case 1:if("[object Object]"==D(arguments[0])&&"jsDate"!=arguments[0]._type){var a=this.options=arguments[0];this.syntax=a.syntax||this.syntax,this.defaultCentury=a.defaultCentury||this.defaultCentury,this.proxy=S.createDate(a.date)}else this.proxy=S.createDate(arguments[0]);break;default:for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c]);this.proxy=new Date,this.proxy.setFullYear.apply(this.proxy,b.slice(0,3)),b.slice(3).length&&this.proxy.setHours.apply(this.proxy,b.slice(3))}return this},S.prototype.setDate=function(a){return this.proxy.setDate(a),this},S.prototype.setFullYear=function(){return this.proxy.setFullYear.apply(this.proxy,arguments),this},S.prototype.setHours=function(){return this.proxy.setHours.apply(this.proxy,arguments),this},S.prototype.setMilliseconds=function(a){return this.proxy.setMilliseconds(a),this},S.prototype.setMinutes=function(){return this.proxy.setMinutes.apply(this.proxy,arguments),this},S.prototype.setMonth=function(){return this.proxy.setMonth.apply(this.proxy,arguments),this},S.prototype.setSeconds=function(){return this.proxy.setSeconds.apply(this.proxy,arguments),this},S.prototype.setTime=function(a){return this.proxy.setTime(a),this},S.prototype.setYear=function(){return this.proxy.setYear.apply(this.proxy,arguments),this},S.prototype.strftime=function(a){return a=a||this.formatString||S.regional[this.locale].formatString,S.strftime(this,a,this.syntax)},S.prototype.toString=function(){return this.proxy.toString()},S.prototype.toYmdInt=function(){return 1e4*this.proxy.getFullYear()+100*this.getMonthNumber()+this.proxy.getDate()},S.regional={en:{monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],formatString:"%Y-%m-%d %H:%M:%S"},fr:{monthNames:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],monthNamesShort:["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"],dayNames:["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],dayNamesShort:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],formatString:"%Y-%m-%d %H:%M:%S"},de:{monthNames:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],monthNamesShort:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],dayNames:["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],dayNamesShort:["So","Mo","Di","Mi","Do","Fr","Sa"],formatString:"%Y-%m-%d %H:%M:%S"},es:{monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],monthNamesShort:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],dayNames:["Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacute;bado"],dayNamesShort:["Dom","Lun","Mar","Mi&eacute;","Juv","Vie","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},ru:{monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],monthNamesShort:["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],dayNames:["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],dayNamesShort:["вск","пнд","втр","срд","чтв","птн","сбт"],formatString:"%Y-%m-%d %H:%M:%S"},ar:{monthNames:["كانون الثاني","شباط","آذار","نيسان","آذار","حزيران","تموز","آب","أيلول","تشرين الأول","تشرين الثاني","كانون الأول"],monthNamesShort:["1","2","3","4","5","6","7","8","9","10","11","12"],dayNames:["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"],dayNamesShort:["سبت","أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة"],formatString:"%Y-%m-%d %H:%M:%S"},pt:{monthNames:["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S&aacute;bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},"pt-BR":{monthNames:["Janeiro","Fevereiro","Mar&ccedil;o","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],monthNamesShort:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],dayNames:["Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira","Sexta-feira","S&aacute;bado"],dayNamesShort:["Dom","Seg","Ter","Qua","Qui","Sex","S&aacute;b"],formatString:"%Y-%m-%d %H:%M:%S"},pl:{monthNames:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],monthNamesShort:["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],dayNames:["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"],dayNamesShort:["Ni","Pn","Wt","Śr","Cz","Pt","Sb"],formatString:"%Y-%m-%d %H:%M:%S"},nl:{monthNames:["Januari","Februari","Maart","April","Mei","Juni","July","Augustus","September","Oktober","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],dayNames:",".Zaterdag,dayNamesShort:["Zo","Ma","Di","Wo","Do","Vr","Za"],formatString:"%Y-%m-%d %H:%M:%S"},sv:{monthNames:["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december"],monthNamesShort:["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec"],dayNames:["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],dayNamesShort:["sön","mån","tis","ons","tor","fre","lör"],formatString:"%Y-%m-%d %H:%M:%S"},it:{monthNames:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],monthNamesShort:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],dayNames:["Domenica","Lunedi","Martedi","Mercoledi","Giovedi","Venerdi","Sabato"],dayNamesShort:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"],formatString:"%d-%m-%Y %H:%M:%S"}},S.regional["en-US"]=S.regional["en-GB"]=S.regional.en,S.regional.getLocale=function(){var a=S.config.defaultLocale;return document&&document.getElementsByTagName("html")&&document.getElementsByTagName("html")[0].lang&&(a=document.getElementsByTagName("html")[0].lang,S.regional.hasOwnProperty(a)||(a=S.config.defaultLocale)),a};var T=864e5,U=function(a,b){a=String(a);var c=b-a.length,d=String(Math.pow(10,c)).slice(1);return d.concat(a)},V={millisecond:1,second:1e3,minute:6e4,hour:36e5,day:T,week:7*T,month:{add:function(a,b){V.year.add(a,Math[b>0?"floor":"ceil"](b/12));var c=a.getMonth()+b%12;12==c?(c=0,a.setYear(a.getFullYear()+1)):-1==c&&(c=11,a.setYear(a.getFullYear()-1)),a.setMonth(c)},diff:function(a,b){var c=a.getFullYear()-b.getFullYear(),d=a.getMonth()-b.getMonth()+12*c,e=a.getDate()-b.getDate();return d+e/30}},year:{add:function(a,b){a.setYear(a.getFullYear()+Math[b>0?"floor":"ceil"](b))},diff:function(a,b){return V.month.diff(a,b)/12}}};for(var W in V)"s"!=W.substring(W.length-1)&&(V[W+"s"]=V[W]);var X=function(a,b,c){if(S.formats[c].shortcuts[b])return S.strftime(a,S.formats[c].shortcuts[b],c);var d=(S.formats[c].codes[b]||"").split("."),e=a["get"+d[0]]?a["get"+d[0]]():"";return d[1]&&(e=U(e,d[1])),e};S.strftime=function(a,b,c,d){var e="perl",f=S.regional.getLocale();c&&S.formats.hasOwnProperty(c)?e=c:c&&S.regional.hasOwnProperty(c)&&(f=c),d&&S.formats.hasOwnProperty(d)?e=d:d&&S.regional.hasOwnProperty(d)&&(f=d),("[object Object]"!=D(a)||"jsDate"!=a._type)&&(a=new S(a),a.locale=f),b||(b=a.formatString||S.regional[f].formatString);for(var g,h=b||"%Y-%m-%d",i="";h.length>0;)(g=h.match(S.formats[e].codes.matcher))?(i+=h.slice(0,g.index),i+=(g[1]||"")+X(a,g[2],e),h=h.slice(g.index+g[0].length)):(i+=h,h="");return i},S.formats={ISO:"%Y-%m-%dT%H:%M:%S.%N%G",SQL:"%Y-%m-%d %H:%M:%S"},S.formats.perl={codes:{matcher:/()%(#?(%|[a-z]))/i,Y:"FullYear",y:"ShortYear.2",m:"MonthNumber.2","#m":"MonthNumber",B:"MonthName",b:"AbbrMonthName",d:"Date.2","#d":"Date",e:"Date",A:"DayName",a:"AbbrDayName",w:"Day",H:"Hours.2","#H":"Hours",I:"Hours12.2","#I":"Hours12",p:"AMPM",M:"Minutes.2","#M":"Minutes",S:"Seconds.2","#S":"Seconds",s:"Unix",N:"Milliseconds.3","#N":"Milliseconds",O:"TimezoneOffset",Z:"TimezoneName",G:"GmtOffset"},shortcuts:{F:"%Y-%m-%d",T:"%H:%M:%S",X:"%H:%M:%S",x:"%m/%d/%y",D:"%m/%d/%y","#c":"%a %b %e %H:%M:%S %Y",v:"%e-%b-%Y",R:"%H:%M",r:"%I:%M:%S %p",t:"	",n:"\n","%":"%"}},S.formats.php={codes:{matcher:/()%((%|[a-z]))/i,a:"AbbrDayName",A:"DayName",d:"Date.2",e:"Date",j:"DayOfYear.3",u:"DayOfWeek",w:"Day",U:"FullWeekOfYear.2",V:"IsoWeek.2",W:"WeekOfYear.2",b:"AbbrMonthName",B:"MonthName",m:"MonthNumber.2",h:"AbbrMonthName",C:"Century.2",y:"ShortYear.2",Y:"FullYear",H:"Hours.2",I:"Hours12.2",l:"Hours12",p:"AMPM",P:"AmPm",M:"Minutes.2",S:"Seconds.2",s:"Unix",O:"TimezoneOffset",z:"GmtOffset",Z:"TimezoneAbbr"},shortcuts:{D:"%m/%d/%y",F:"%Y-%m-%d",T:"%H:%M:%S",X:"%H:%M:%S",x:"%m/%d/%y",R:"%H:%M",r:"%I:%M:%S %p",t:"	",n:"\n","%":"%"}},S.createDate=function(a){function b(a,b){var c,d,e,f,g=parseFloat(b[1]),h=parseFloat(b[2]),i=parseFloat(b[3]),j=S.config.defaultCentury;return g>31?(d=i,e=h,c=j+g):(d=h,e=g,c=j+i),f=e+"/"+d+"/"+c,a.replace(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})/,f)}if(null==a)return new Date;if(a instanceof Date)return a;if("number"==typeof a)return new Date(a);var c=String(a).replace(/^\s*(.+)\s*$/g,"$1");c=c.replace(/^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,4})/,"$1/$2/$3"),c=c.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{4})/i,"$1 $2 $3");var d=c.match(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i);if(d&&d.length>3){var e=parseFloat(d[3]),f=S.config.defaultCentury+e;f=String(f),c=c.replace(/^(3[01]|[0-2]?\d)[-\/]([a-z]{3,})[-\/](\d{2})\D*/i,d[1]+" "+d[2]+" "+f)}d=c.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})[^0-9]/),d&&d.length>3&&(c=b(c,d));var d=c.match(/^([0-9]{1,2})[-\/]([0-9]{1,2})[-\/]([0-9]{1,2})$/);d&&d.length>3&&(c=b(c,d));for(var g,h,i,j=0,k=S.matchers.length,l=c;k>j;){if(h=Date.parse(l),!isNaN(h))return new Date(h);if(g=S.matchers[j],"function"==typeof g){if(i=g.call(S,l),i instanceof Date)return i}else l=c.replace(g[0],g[1]);j++}return NaN},S.daysInMonth=function(a,b){return 2==b?29==new Date(a,1,29).getDate()?29:28:[F,31,F,31,30,31,30,31,31,30,31,30,31][b]},S.matchers=[[/(3[01]|[0-2]\d)\s*\.\s*(1[0-2]|0\d)\s*\.\s*([1-9]\d{3})/,"$2/$1/$3"],[/([1-9]\d{3})\s*-\s*(1[0-2]|0\d)\s*-\s*(3[01]|[0-2]\d)/,"$2/$3/$1"],function(a){var b=a.match(/^(?:(.+)\s+)?([012]?\d)(?:\s*\:\s*(\d\d))?(?:\s*\:\s*(\d\d(\.\d*)?))?\s*(am|pm)?\s*$/i);if(b){if(b[1]){var c=this.createDate(b[1]);if(isNaN(c))return}else{var c=new Date;c.setMilliseconds(0)}var d=parseFloat(b[2]);return b[6]&&(d="am"==b[6].toLowerCase()?12==d?0:d:12==d?12:d+12),c.setHours(d,parseInt(b[3]||0,10),parseInt(b[4]||0,10),1e3*(parseFloat(b[5]||0)||0)),c}return a},function(a){var b=a.match(/^(?:(.+))[T|\s+]([012]\d)(?:\:(\d\d))(?:\:(\d\d))(?:\.\d+)([\+\-]\d\d\:\d\d)$/i);if(b){if(b[1]){var c=this.createDate(b[1]);if(isNaN(c))return}else{var c=new Date;c.setMilliseconds(0)}var d=parseFloat(b[2]);return c.setHours(d,parseInt(b[3],10),parseInt(b[4],10),1e3*parseFloat(b[5])),c}return a},function(a){var b=a.match(/^([0-3]?\d)\s*[-\/.\s]{1}\s*([a-zA-Z]{3,9})\s*[-\/.\s]{1}\s*([0-3]?\d)$/);if(b){var c,d,e,f=new Date,g=S.config.defaultCentury,h=parseFloat(b[1]),i=parseFloat(b[3]);h>31?(d=i,c=g+h):(d=h,c=g+i);var e=C(b[2],S.regional[S.regional.getLocale()].monthNamesShort);return-1==e&&(e=C(b[2],S.regional[S.regional.getLocale()].monthNames)),f.setFullYear(c,e,d),f.setHours(0,0,0,0),f}return a}],a.jsDate=S,a.jqplot.sprintf=function(){function b(a,b,c,d){var e=a.length>=b?"":Array(1+b-a.length>>>0).join(c);return d?a+e:e+a}function c(b){for(var c=new String(b),d=10;d>0&&c!=(c=c.replace(/^(\d+)(\d{3})/,"$1"+a.jqplot.sprintf.thousandsSeparator+"$2"));d--);return c}function d(a,c,d,e,f,g){var h=e-a.length;if(h>0){var i=" ";g&&(i="&nbsp;"),a=d||!f?b(a,e,i,d):a.slice(0,c.length)+b("",h,"0",!0)+a.slice(c.length)}return a}function e(a,c,e,f,g,h,i,j){var k=a>>>0;return e=e&&k&&{2:"0b",8:"0",16:"0x"}[c]||"",a=e+b(k.toString(c),h||0,"0",!1),d(a,e,f,g,i,j)}function f(a,b,c,e,f,g){return null!=e&&(a=a.slice(0,e)),d(a,"",b,c,f,g)}var g=arguments,h=0,i=g[h++];return i.replace(a.jqplot.sprintf.regex,function(i,j,k,l,m,n,o){if("%%"==i)return"%";for(var p=!1,q="",r=!1,s=!1,t=!1,u=!1,v=0;k&&v<k.length;v++)switch(k.charAt(v)){case" ":q=" ";break;case"+":q="+";break;case"-":p=!0;break;case"0":r=!0;break;case"#":s=!0;break;case"&":t=!0;break;case"'":u=!0}if(l=l?"*"==l?+g[h++]:"*"==l.charAt(0)?+g[l.slice(1,-1)]:+l:0,0>l&&(l=-l,p=!0),!isFinite(l))throw new Error("$.jqplot.sprintf: (minimum-)width must be finite");n=n?"*"==n?+g[h++]:"*"==n.charAt(0)?+g[n.slice(1,-1)]:+n:"fFeE".indexOf(o)>-1?6:"d"==o?0:void 0;var w=j?g[j.slice(0,-1)]:g[h++];switch(o){case"s":return null==w?"":f(String(w),p,l,n,r,t);case"c":return f(String.fromCharCode(+w),p,l,n,r,t);case"b":return e(w,2,s,p,l,n,r,t);case"o":return e(w,8,s,p,l,n,r,t);case"x":return e(w,16,s,p,l,n,r,t);case"X":return e(w,16,s,p,l,n,r,t).toUpperCase();case"u":return e(w,10,s,p,l,n,r,t);case"i":var x=parseInt(+w,10);if(isNaN(x))return"";var y=0>x?"-":q,z=u?c(String(Math.abs(x))):String(Math.abs(x));return w=y+b(z,n,"0",!1),d(w,y,p,l,r,t);case"d":var x=Math.round(+w);if(isNaN(x))return"";var y=0>x?"-":q,z=u?c(String(Math.abs(x))):String(Math.abs(x));return w=y+b(z,n,"0",!1),d(w,y,p,l,r,t);case"e":case"E":case"f":case"F":case"g":case"G":var x=+w;if(isNaN(x))return"";var y=0>x?"-":q,A=["toExponential","toFixed","toPrecision"]["efg".indexOf(o.toLowerCase())],B=["toString","toUpperCase"]["eEfFgG".indexOf(o)%2],z=Math.abs(x)[A](n),C=z.toString().split(".");C[0]=u?c(C[0]):C[0],z=C.join(a.jqplot.sprintf.decimalMark),w=y+z;var D=d(w,y,p,l,r,t)[B]();return D;case"p":case"P":var x=+w;if(isNaN(x))return"";var y=0>x?"-":q,C=String(Number(Math.abs(x)).toExponential()).split(/e|E/),E=-1!=C[0].indexOf(".")?C[0].length-1:String(x).length,F=C[1]<0?-C[1]-1:0;if(Math.abs(x)<1)w=n>=E+F?y+Math.abs(x).toPrecision(E):n-1>=E?y+Math.abs(x).toExponential(E-1):y+Math.abs(x).toExponential(n-1);else{var G=n>=E?E:n;w=y+Math.abs(x).toPrecision(G)}var B=["toString","toUpperCase"]["pP".indexOf(o)%2];return d(w,y,p,l,r,t)[B]();case"n":return"";default:return i}})},a.jqplot.sprintf.thousandsSeparator=",",a.jqplot.sprintf.decimalMark=".",a.jqplot.sprintf.regex=/%%|%(\d+\$)?([-+#0&\' ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([nAscboxXuidfegpEGP])/g,a.jqplot.getSignificantFigures=function(a){var b=String(Number(Math.abs(a)).toExponential()).split(/e|E/),c=-1!=b[0].indexOf(".")?b[0].length-1:b[0].length,d=b[1]<0?-b[1]-1:0,e=parseInt(b[1],10),f=e+1>0?e+1:0,g=f>=c?0:c-e-1;return{significantDigits:c,digitsLeft:f,digitsRight:g,zeros:d,exponent:e}},a.jqplot.getPrecision=function(b){return a.jqplot.getSignificantFigures(b).digitsRight};var Y=a.uiBackCompat!==!1;a.jqplot.effects={effect:{}};var Z="jqplot.storage.";a.extend(a.jqplot.effects,{version:"1.9pre",save:function(a,b){for(var c=0;c<b.length;c++)null!==b[c]&&a.data(Z+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)null!==b[c]&&a.css(b[c],a.data(Z+b[c]))},setMode:function(a,b){return"toggle"===b&&(b=a.is(":hidden")?"show":"hide"),b},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e={width:b.width(),height:b.height()},f=document.activeElement;return b.wrap(d),(b[0]===f||a.contains(b[0],f))&&a(f).focus(),d=b.parent(),"static"===b.css("position")?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),b.css(e),d.css(c).show()},removeWrapper:function(b){var c=document.activeElement;return b.parent().is(".ui-effects-wrapper")&&(b.parent().replaceWith(b),(b[0]===c||a.contains(b[0],c))&&a(c).focus()),b}}),a.fn.extend({jqplotEffect:function(b,c,d,e){function f(b){function c(){a.isFunction(e)&&e.call(d[0]),a.isFunction(b)&&b()}var d=a(this),e=g.complete,f=g.mode;(d.is(":hidden")?"hide"===f:"show"===f)?c():j.call(d[0],g,c)}var g=E.apply(this,arguments),h=g.mode,i=g.queue,j=a.jqplot.effects.effect[g.effect],k=!j&&Y&&a.jqplot.effects[g.effect];return a.fx.off||!j&&!k?h?this[h](g.duration,g.complete):this.each(function(){g.complete&&g.complete.call(this)}):j?i===!1?this.each(f):this.queue(i||"fx",f):k.call(this,{options:g,duration:g.duration,callback:g.complete,mode:g.mode})}});var $=/up|down|vertical/,_=/up|left|vertical|horizontal/;a.jqplot.effects.effect.blind=function(b,c){var d,e,f,g=a(this),h=["position","top","bottom","left","right","height","width"],i=a.jqplot.effects.setMode(g,b.mode||"hide"),j=b.direction||"up",k=$.test(j),l=k?"height":"width",m=k?"top":"left",n=_.test(j),o={},p="show"===i;g.parent().is(".ui-effects-wrapper")?a.jqplot.effects.save(g.parent(),h):a.jqplot.effects.save(g,h),g.show(),f=parseInt(g.css("top"),10),d=a.jqplot.effects.createWrapper(g).css({overflow:"hidden"}),e=k?d[l]()+f:d[l](),o[l]=p?String(e):"0",n||(g.css(k?"bottom":"right",0).css(k?"top":"left","").css({position:"absolute"}),o[m]=p?"0":String(e)),p&&(d.css(l,0),n||d.css(m,e)),d.animate(o,{duration:b.duration,easing:b.easing,queue:!1,complete:function(){"hide"===i&&g.hide(),a.jqplot.effects.restore(g,h),a.jqplot.effects.removeWrapper(g),c()}})}}(jQuery);
