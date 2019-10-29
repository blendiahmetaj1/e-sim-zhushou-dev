// ==UserScript==
// @name         e-sim xaria 战车是怎样炼成的
// @namespace    ESX
// @version      0.3
// @description  xaria服自动双击、自动清空体力，自动清空体力功能需要在战场页才能触发
// @author       Exsper
// @match        http://testura.e-sim.org:8000/*
// @match        https://testura.e-sim.org:8000/*
// @match        http://xaria.e-sim.org/*
// @match        https://xaria.e-sim.org/*
// @grant        GM_addStyle
// ==/UserScript==


//前排提醒：该插件有些特殊功能需要先开启e-sim助手（获取盟友、显示伤害），但如果不需要这些功能也可以脱离e-sim助手独立运行。
//前排提醒：添加盟友识别：在插件的全局变量 s_AF_allies 里添加你想加入的盟友，战斗会选择输出在盟友方
//前排提醒：插件尚未实现优先打盟友场，只会在你提供的战场列表页选择第一个能够输出的战场

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
var s_FightDefaultSide = 0; //两边都能打时默认输出方，0=防守方，1=进攻方，-1=随机

var s_AWT_NextRunDelayMin = 300; //下次工作训练额外延时（秒）
var s_AWT_NextRunDelayMax = 600; //下次工作训练额外延时（秒）

var s_AF_SearchBattleUrl = "battles.html?countryId=-1&sorting=BY_TOTAL_DAMAGE"; //搜索战场列表网址
var s_AF_MaxWarningCounts = 10; //自动攻击最大警告数量，累计超过该值关闭自动攻击
var s_AF_allies = ["China","Taiwan"]; //盟友，当两边都能打时优先打盟友方
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

//从e-sim助手获取盟友
function getAlliesFromEH()
{
    if($("#Eh2Homeland").length>0) //开启了e-sim助手
    {
        s_AF_allies.push($("#Eh2Homeland").children("div").attr("title")); //祖国
        var als = $("#Eh2Allies").children("div"); //盟友
        for (var i=0;i<als.length;i++)
        {
            s_AF_allies.push(als[i].title);
        }
    }
    s_AF_allies = $.unique(s_AF_allies.sort());
    console.log("盟友："+s_AF_allies);
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
    s_FightDefaultSide = parseInt(getValue("FightDefaultSide"));
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

    //累了，想做个捐赠通道……
    //想想还是算了……
    /*
    var donateToAuthor = $('<span>', {text:"捐赠", style:"float:right;"}).appendTo(ESXContentDrop);
    donateToAuthor.click(function() {
        createSettingWindow();
    });

    function createSettingWindow()
    {
        var dwindow = $('<div>', {class:"dwindow", style:"overflow:auto; width:300px; height:380px; display:block; position:absolute; top:50%; left:50%; margin-left: -225px; margin-top: -150px; padding-bottom: 20px; text-align:center;background-color:lightgray;"}).appendTo($('body'));
        var dtitle = $('<p>e-sim插件开发不易，您的无私奉献是我们努力的肯定与支持，让我们做得更好</p>').appendTo(dwindow);
        var dtitle = $('<p>QQ钱包</p>').appendTo(dwindow);
        var imgdiv = $('<div></div>').appendTo(dwindow);
        imgdiv[0].innerHTML = '<img src="data:image/png;base64,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"/>';
        $('<br>').appendTo(dwindow);
        var closeButton = $('<button>', {text:"关闭"}).appendTo(dwindow);
        closeButton.click(function(){
            dwindow.remove();
        });
    }
    */
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

    //输出方选择框
    addSelectSettingFrame(td, "可以打两边时选择输出方：", [0,1,-1], ["防守方","进攻方","随机"], "ESX-FightDefaultSide", s_FightDefaultSide);

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

    function AFCheckCountryToFight()
    {
        var defenderName;
        var attackerName;
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
        console.log(defenderName+" vs "+attackerName);
        if ($.inArray(defenderName, s_AF_allies) >= 0)
        {
            console.log(defenderName+"是盟友");
            return "defender";
        }
        else if ($.inArray(attackerName, s_AF_allies) >= 0)
        {
            console.log(attackerName+"是盟友");
            return "attacker";
        }
        else
        {
            if (s_FightDefaultSide==0) return "defender";
            else if (s_FightDefaultSide==1) return "attacker";
            else
            {
                var ri = getRandomInt(0,2);
                if (ri==0) return "defender";
                else return "attacker";
            }
        }
    }

    function startAutoFight()
    {
        if (getUrlPage() == "battle")
        {
            getAlliesFromEH();
            warningCount = 0;
            if ($("#fightButton2").length>0)
            {
                //2边
                AFCheckAndHit(AFCheckCountryToFight());
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









