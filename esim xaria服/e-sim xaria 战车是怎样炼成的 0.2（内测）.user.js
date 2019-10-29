// ==UserScript==
// @name         e-sim xaria 战车是怎样炼成的
// @namespace    ESX
// @version      0.2
// @description  xaria服自动双击、自动清空体力，自动清空体力功能需要在战场页才能触发 尚未实现功能：战场飞行
// @author       Exsper
// @match        http://testura.e-sim.org:8000/*
// @match        https://testura.e-sim.org:8000/*
// @match        http://xaria.e-sim.org/*
// @match        https://xaria.e-sim.org/*
// @grant        GM_addStyle
// ==/UserScript==

function setValue(item, value) { //储存数据
    localStorage['ESX-' + item] = value;
}

function getValue(item) { //读取数据
    item = 'ESX-' + item;
    return (item in localStorage) ? localStorage[item] : null;
}

var s_Running = true; //插件总开关
var s_EnableWorkTrain = true; //自动双击开关
var s_EnableAutoFight = true; //自动打枪开关
var s_IsWorkingTraining = false;
var s_WorkTrain_Day;
var s_WorkTrain_NextDate;

var s_FlightTicketQuality = 1; //飞行使用的机票等级，值为1-5
var s_FightWeaponQuality = 0; //攻击武器等级，值为0-5，如武器不足默认0

var s_AWT_NextRunDelayMin = 300; //下次工作训练额外延时（秒）
var s_AWT_NextRunDelayMax = 600; //下次工作训练额外延时（秒）

var s_AF_SearchBattleUrl = "battles.html?countryId=-1&sorting=BY_TOTAL_DAMAGE"; //搜索战场列表网址
var s_AF_MaxWarningCounts = 10; //自动攻击最大警告数量，累计超过该值关闭自动攻击
var s_AF_FightWaitMin = 1500; //攻击间隔下限
var s_AF_FightWaitMax = 3000; //攻击间隔上限

var s_ShowMessageDelay = 10000; //显示信息延时

$(document).ready(function () {
    CreateMessageDiv();
    main();
    setTimeout(function() {location.reload();}, 30*60*1000); // 最低30分钟自动刷新，当未开启打枪时可以进行自动双击
});


function getRandomInt(min, max)//返回随机数范围包含min，不包含max
{
    var Interval = max - min;
    var num = Math.random() * Interval + min;
    num = parseInt(num, 10);
    return num;
}

function loadRecord()
{
    s_Running = (getValue("IsRunning") == "true");
    s_EnableWorkTrain = (getValue("EnableWorkTrain") == "true");
    s_EnableAutoFight = (getValue("EnableAutoFight") == "true");
    s_WorkTrain_Day = getValue("WorkTrainDay");
    s_WorkTrain_NextDate = getValue("WorkTrainNextDate");
    s_IsWorkingTraining = (getValue("IsWorkingTraining") == "true");
    s_FlightTicketQuality = parseInt(getValue("FlightTicketQuality"));
    s_FightWeaponQuality = parseInt(getValue("FightWeaponQuality"));
    s_AF_SearchBattleUrl = getValue("SearchBattleUrl");
}

function addIcon()
{
    //-----------------------------------------------------------------------------------------------------------------------
    //Exsper's settings framework v0.1

    function addCheckBoxSettingFrame($appendToElement, checkboxID, checkboxLabel, localStorageName, defaultValue)
    {
        var $Checkbox = $('<input>', {type:'checkbox', style:"vertical-align:5px;", id:checkboxID});
        var $Label = $("<label>", {class:"checkboxlabel", for:checkboxID, text:checkboxLabel});
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
        var $Select = $("<select>", {style:"padding:3px; margin:3px"}).appendTo($Label);
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


    // 图标
    var li = $("<li>", {id:"ESXIcon"}).insertBefore($("#userAvatar"));
    var a = $("<a>", {"data-dropdown":"ESXContentDrop",style:"padding:0 5px;", href:"#"}).appendTo(li);
    var img = $("<img>", {align:"absmiddle", class:"smallAvatar", style:"height:36px; width:36px;", src:"http://cdn.e-sim.org/img/eventIcons/battleLostIcon.png"}).appendTo(a);

    // 声明
    var ESXContentDrop = $("#contentDrop").clone().attr("id", "ESXContentDrop").empty().insertBefore($("#contentDrop")); // 外框
    $("<b>", {text:"xaria 战车是怎样炼成的"}).appendTo(ESXContentDrop);
    $("<div>", {style:"text-align:center;", text:"自动清空体力、自动双击。珍惜账号，慎用自动。"}).appendTo(ESXContentDrop); // 声明

    // 若干功能选择框和按钮
    var table = $("<table>", {id:"ESXConfig", style:"width:100%;"}).appendTo(ESXContentDrop);

    var tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    var td = $("<td>").appendTo(tr);

    //总开关
    addCheckBoxSettingFrame(td, 'IsRunCheckbox', '启用该插件', "ESX-IsRunning", s_Running);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    //双击功能开关
    addCheckBoxSettingFrame(td, 'EnableWorkTrainCheckbox', '启用双击功能', "ESX-EnableWorkTrain", s_EnableWorkTrain);

    //tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    //td = $("<td>").appendTo(tr);

    //打枪功能开关
    addCheckBoxSettingFrame(td, 'EnableAutoFightCheckbox', '启用打枪功能', "ESX-EnableAutoFight", s_EnableAutoFight);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    //武器选择框
    addSelectSettingFrame(td, "输出使用武器：", [0,1,2,3,4,5], ["拳头","Q1","Q2","Q3","Q4","Q5"], "ESX-FightWeaponQuality", s_FightWeaponQuality);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    //机票选择框
    addSelectSettingFrame(td, "工作飞行使用机票：", [1,2,3,4,5], ["Q1","Q2","Q3","Q4","Q5"], "ESX-FlightTicketQuality", s_FlightTicketQuality);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    //搜寻网址
    $("<span>", {text:"搜寻战场列表地址："}).appendTo(td);
    addTextboxSettingFrame(td, 300, "ESX-SearchBattleUrl", s_AF_SearchBattleUrl);
    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);
    var checkBattleListUrlNow = $('<button>', {text:"测试搜寻战场"}).appendTo(td);
    checkBattleListUrlNow.click(function() {
        s_AF_SearchBattleUrl = getValue("SearchBattleUrl");
        searchBattle();
    });
}


function main()
{
    if ( $(".time").length !== 2) {
        console.log("未登录，xaria插件停止运行");
        return;
    }
    if ($(".time:first").text().match(/-/g).length != 2) {
        console.log("官方脚本还未执行，xaria插件等待0.5秒");
        setTimeout(main, 500);
        return;
    }
    if ($("#minutesLimit").text() == "" ) {
        console.log("官方时间还未刷新，xaria插件等待0.5秒");
        setTimeout(main, 500);
        return;
    }
    addIcon();
    loadRecord();
    if (s_Running == false)
    {
        ShowMessage("xaria插件未启动");
        return;
    }
    if (s_EnableWorkTrain == true)
    {
        autoWorkTrain();
    }
    if ((s_EnableAutoFight == true) && (getUrlPage() == "battle"))
    {
        autoFight();
        return;
    }
}

function CreateMessageDiv()
{
    GM_addStyle(".esxmsg{background-color: #fff;border-left: 4px solid #7ad03a;-webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);padding: 1px 12px;}.esxmsg p{margin: .5em 0;padding: 2px;font-size: 13px;line-height: 1;}");
    var $div = $("<div>", {id:"ESXMessageDiv", class:"esxmsg", style:"position:fixed; bottom:5%;"}).appendTo('body');
    var $p = $("<p>", {id:"ESXMessage", align:"left"}).appendTo($div);
    $div.hide();
}

function ShowMessage(s)
{
    console.log(s);
    var $div = $("#ESXMessageDiv");
    $div.show();
    $div.stop(true);
    $div.css("opacity","1");
    $("#ESXMessage").text(s);
    $div.animate({opacity: "0"}, s_ShowMessageDelay, function(){$div.hide();});
}

function getUrlPage() {
    if (document.URL.search("html") != -1) {
        return document.URL.match("\/([a-zA-Z0-9]+)\.html")[1];
    }
    else//可能是首页？
    {
        return "index";
    }
}

function autoWorkTrain()
{
    function autoTrain()
    {
        var trainButton = $("#trainButton");
        if (trainButton.length <= 0) //没有按钮
        {
            s_EnableWorkTrain = false;
            setValue("EnableWorkTrain", false);
            getLastWorkDate();
            alert("错误：未训练却没有训练按钮");
        }
        else //有按钮
        {
            sendTrainAjax();
            //有可能会转至未登录界面，但几率过小，暂不做考虑
        }

        function sendTrainAjax() {
            $.ajax({
                type: "POST",
                url: "train/ajax",
                data: null,
                success: function(data) {
                    var trainButton = $("#trainButton",data);
                    if ((trainButton.length < 1) && ($("#userMenu",data).length < 1)) //没有按钮且不是重载页面
                    {
                        //顺利完成自动训练
                        finish();
                    }
                    else
                    {
                        s_EnableWorkTrain = false;
                        setValue("EnableWorkTrain", false);
                        alert("错误：训练失败");
                    }
                    $("#trainReload").html(data);
                }
            });
        }
    }

    //先工作再训练
    function autoWork()
    {
        var workButton = $("#workButton");
        if (workButton.length < 1) //没有按钮
        {
            //未工作却没有工作按钮，可能是还没有职业
            s_EnableWorkTrain = false;
            setValue("EnableWorkTrain", false);
            getLastWorkDate();
            alert("错误：未工作却没有工作按钮");
        }
        else //有按钮
        {
            //判断所在地区
            var regions = $('a[href^="region.html?id="][href!="region.html?id="]');
            //regions[0] = 人所在地    regions[1] = 工厂所在地
            var userLocationCountry = regions.first().parent().find("div").attr('class');
            userLocationCountry = userLocationCountry.substring(userLocationCountry.indexOf('-') + 1);
            var companyLocationCountry = regions.last().parent().find("div").attr('class');
            companyLocationCountry = companyLocationCountry.substring(companyLocationCountry.indexOf('-') + 1);
            if (userLocationCountry == companyLocationCountry) //在国内
            {
                sendWorkAjax();
                //有可能会转至未登录界面，但几率过小，暂不做考虑
            }
            else //不在国内，去工厂所在地区界面
            {
                document.location = regions.last().attr('href');
            }
        }
        function sendWorkAjax() {
            $.ajax({
                type: "POST",
                url: "work/ajax?action=work",
                data: null,
                success: function(data) {
                    $("#workReload").html(data);
                    var workButton = $("#workButton",data);
                    if ((workButton.length < 1) && ($("#userMenu",data).length < 1)) //没有按钮且不是重载页面
                    {
                        //去训练界面
                        s_WorkTrain_NextDate = parseInt($("#resetWork", data).text())*1000+parseInt($("#time2").text());
                        setValue("WorkTrainNextDate", s_WorkTrain_NextDate);
                        s_WorkTrain_Day = $(".sidebar-clock").text().split("日")[1].trim();
                        setValue("WorkTrainDay", s_WorkTrain_Day);
                        document.location = "/train.html";
                    }
                    else
                    {
                        s_EnableWorkTrain = false;
                        setValue("EnableWorkTrain", false);
                        alert("错误：工作失败");
                    }
                }
            });
        }
    }


    function autoFlight()
    {
        $("#ticketQuality").val(s_FlightTicketQuality);
        var flyButton = $(".travel.button.foundation-style");
        flyButton[0].click();
    }


    function flyResult()
    {
        var testDivredWindow = $(".testDivred");
        if (testDivredWindow.length > 0) //有错误时会有1个结果
        {
            s_EnableWorkTrain = false;
            setValue("EnableWorkTrain", false);
            alert("飞行出错：" + $(".testDivred :last")[0].childNodes[1].nodeValue);
        }
        else
        {
            //飞行成功，重新工作
            document.location = "/work.html";
        }
    }

    function getLastWorkDate()
    {
        var tmpDate;
        $.ajax({
            url: 'work.html',
            async : false,
            success: function(data) {
                if ( $(".time", data).length !== 2) {
                    console.log(citizenId, "抓取错误，重新抓取");
                    $.ajax(this);
                    return;
                }
                if ($("#timerWork", data).length>0)
                {
                    s_WorkTrain_NextDate = parseInt($("#resetWork", data).text())*1000+parseInt($("#time2", data).text());
                    setValue("WorkTrainNextDate", s_WorkTrain_NextDate);
                    s_WorkTrain_Day = $(".sidebar-clock").text().split("日")[1].trim();
                    setValue("WorkTrainDay", s_WorkTrain_Day);
                }
                else
                {
                    s_WorkTrain_Day = "0";
                }
            },
            error: function(xhr,textStatus){
                console.log("抓取错误 (", textStatus, ")，重新抓取");
                $.ajax(this);
            },
        });
    }

    function start()
    {
        setValue("IsWorkingTraining", "true");
        document.location = "/work.html";
    }

    function finish()
    {
        setValue("IsWorkingTraining", "false");
        searchBattle();
    }

    function startAutoWorkTrain()
    {
        function getDateString(d)
        {
            var year = d.getFullYear();       //年
            var month = d.getMonth() + 1;     //月
            var day = d.getDate();            //日

            var hh = d.getHours();            //时
            var mm = d.getMinutes();          //分

            var clock = year + "-";

            if(month < 10)
                clock += "0";

            clock += month + "-";

            if(day < 10)
                clock += "0";

            clock += day + " ";

            if(hh < 10)
                clock += "0";

            clock += hh + ":";
            if (mm < 10) clock += '0';
            clock += mm;
            return(clock);
        }

        if (s_IsWorkingTraining == false)
        {
            if (s_WorkTrain_Day == null || s_WorkTrain_NextDate == null)
            {
                getLastWorkDate();
            }
            if (s_WorkTrain_Day != $(".sidebar-clock").text().split("日")[1].trim())
            {
                start();
            }
            else if ( parseInt($("#time2").text()) >= (parseInt(s_WorkTrain_NextDate) + getRandomInt(s_AWT_NextRunDelayMin, s_AWT_NextRunDelayMax)*1000)) //推迟
            {
                start();
            }
            else
            {
                ShowMessage("将于 "+ getDateString(new Date(parseInt(s_WorkTrain_NextDate) + getRandomInt(s_AWT_NextRunDelayMin, s_AWT_NextRunDelayMax)*1000)) + "开始自动双击");
            }
        }
        else
        {
            var page = getUrlPage();
            if (page == "work")
            {
                autoWork();
            }
            else if (page == "train")
            {
                autoTrain();
            }
            else if (page == "region")
            {
                autoFlight();
            }
            else if (page == "travel")
            {
                flyResult();
            }
            else
            {
                return;
            }
        }
    }

    startAutoWorkTrain();
}

//-------------------------------------------------------自动攻击-------------------------------------------------------

//寻找战场
function searchBattle()
{
    function checkBattle(url)
    {
        var result = false;
        $.ajax({
            url: url,
            async : false,
            success: function(data) {
                if ( $(".time", data).length !== 2) {
                    console.log(citizenId, "抓取错误，重新抓取");
                    $.ajax(this);
                    return;
                }
                if ($("#fightButton2", data).length>0)
                {
                    result = true;
                }
                else if ($("#fightButton1", data).length>0)
                {
                    result = true;
                }
                else
                {
                    result = false;
                }
            },
            error: function(xhr,textStatus){
                console.log("抓取错误 (", textStatus, ")，重新抓取");
                $.ajax(this);
            },
        });
        return result;
    }

    function getBattleList(url)
    {
        var battleUrlList = [];
        $.ajax({
            url: url,
            async : false,
            success: function(data) {
                if ( $(".time", data).length !== 2) {
                    console.log(citizenId, "抓取错误，重新抓取");
                    $.ajax(this);
                    return;
                }
                $("#battlesTable tr:gt(0)", data).each(function(index, tr) {
                    var link = $("a[href*='battle.html']", tr);
                    if (link == null)
                    {
                        return true; //相当于continue
                    }
                    battleUrlList.push(link.attr("href"));
                });
            },
            error: function(xhr,textStatus){
                console.log("抓取错误 (", textStatus, ")，重新抓取");
                $.ajax(this);
            },
        });
        console.log("获取到的战场列表:"+battleUrlList);
        return battleUrlList;
    }

    function getCanFightBattleUrl()
    {
        var battleUrlList = getBattleList(s_AF_SearchBattleUrl);
        for(var i=0;i<battleUrlList.length;i++)
        {
            if (checkBattle(battleUrlList[i])==true)
            {
                return battleUrlList[i];
            }
        }
        return "-1";
    }

    function startSearchBattle()
    {
        var battleUrl = getCanFightBattleUrl();
        if (battleUrl != "-1")
        {
            document.location = battleUrl;
        }
        else
        {
            ShowMessage("未找到可以打的战场，10分钟后重新寻找");
            setTimeout(function() {startSearchBattle();}, 600*1000);
        }
    }

    ShowMessage("寻找可以输出的战场");
    startSearchBattle();
}


//自动攻击
//battle.html
function autoFight()
{
    var warningCount = 0;


    // e-sim助手联动
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
            showMsg.text( $("#fightResponse").text().trim());
            showMsg.fadeOut(2000);
        }
    }

    function AFGetWeaponQuality()
    {
        if (s_FightWeaponQuality <=0 )
        {
            return 0;
        }
        else
        {
            var c = parseInt($("#Q"+s_FightWeaponQuality+"WeaponStock").text());
            if (c<=0)
            {
                return 0;
            }
            else
            {
                return s_FightWeaponQuality;
            }
        }
    }

    function AFSendFightRequest(side, value)
    {
        var dataString = 'weaponQuality='+AFGetWeaponQuality()+'&battleRoundId=' + $("#battleRoundId").val() + '&side=' + side + '&value=' + value;
        var ajax = $.ajax({
            type: "POST",
            url: "fight.html",
            //async: false,
            data: dataString,
            success: function(msg) {
                $('#fightResponse > div').replaceWith(msg);
                if ($("#showMsg").length>0) //开启了e-sim助手
                {
                    showDamege($(msg));
                }
                var healthText = $("#healthUpdate", msg).text();
                if (healthText !== "") {
                    var healthUpdated = healthText.substr(0, healthText.length - 3);
                    if (healthUpdated < 100) {
                        $("#healthProgress div.ui-corner-right").removeClass('ui-corner-right');
                    }
                    $("#healthProgress .ui-progressbar-value").animate({width: healthUpdated + "%"}, {queue: false});
                    $("#healthProgress").attr('title', healthUpdated + ' / 100');
                    $("#actualHealth").html(healthUpdated);
                    var damageText = $('#DamageDone', msg);
                    if (damageText.length < 0)
                    {
                        console.log($("#fightResponse").text().trim());
                        //ShowMessage("自动攻击出错");
                        //s_EnableAutoFight = false;
                        //setValue("EnableAutoFight", false);
                        warningCount++;
                        if (warningCount>s_AF_MaxWarningCounts)
                        {
                            alert("自动攻击出错");
                            s_EnableAutoFight = false;
                            setValue("EnableAutoFight", false);
                        }
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log( "错误："+XMLHttpRequest.status );
                warningCount++;
                if (warningCount>s_AF_MaxWarningCounts)
                {
                    alert("自动攻击出错");
                    s_EnableAutoFight = false;
                    setValue("EnableAutoFight", false);
                }
                return false;
            }
        });
    }

    function AFCheckAndHit(side)
    {
        if (s_EnableAutoFight == false)
        {
            ShowMessage("打枪功能未启用");
            return;
        }
        var timeOutTime;
        var hp = parseFloat($("#actualHealth").html());
        if (hp >= 10)
        {
            timeOutTime = getRandomInt(s_AF_FightWaitMin, s_AF_FightWaitMax);
            if (hp >= 50)
            {
                AFSendFightRequest(side, "Berserk");
                ShowMessage(timeOutTime+"ms后连击");
                setTimeout(function() {
                    AFCheckAndHit(side);
                }, timeOutTime);
            }
            else
            {
                AFSendFightRequest(side, "undefined");
                ShowMessage(timeOutTime+"ms后单击");
                setTimeout(function() {
                    AFCheckAndHit(side);
                }, timeOutTime);
            }
        }
        else
        {
            var restore_minute = parseInt($("#minutesLimit").text().split(":")[0]);
            var restore_second = parseInt($("#secondsLimit").text());
            if (restore_minute<0) restore_minute=0;
            if (restore_second<0) restore_second=0;
            timeOutTime = getRandomInt((restore_minute*60+restore_second+10)*1000, ((restore_minute+4)*60+restore_second)*1000);
            ShowMessage(timeOutTime/1000+"秒后刷新");
            setTimeout(function() {location.reload();}, timeOutTime);
        }
    }

    function startAutoFight()
    {
        if (getUrlPage() == "battle")
        {
            warningCount = 0;
            if ($("#fightButton2").length>0)
            {
                //2边
                //TODO
                AFCheckAndHit("defender");
            }
            else if ($("#fightButton1").length>0)
            {
                //1边
                AFCheckAndHit("side");
            }
            else
            {
                searchBattle();
            }
        }
    }

    startAutoFight();

}




//----------------------------------------------------------------------------------------------------------------------









