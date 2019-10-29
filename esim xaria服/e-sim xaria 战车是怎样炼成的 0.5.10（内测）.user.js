// ==UserScript==
// @name         e-sim xaria 战车是怎样炼成的
// @namespace    ESX
// @version      0.5.10
// @description  xaria服自动双击、自动清空体力，自动清空体力功能需要在战场页才能触发
// @author       Exsper
// @match        http://testura.e-sim.org:8000/*
// @match        https://testura.e-sim.org:8000/*
// @match        http://xaria.e-sim.org/*
// @match        https://xaria.e-sim.org/*
// @require      http://cdn.e-sim.org/js/jquery-1.8.3.min.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

//敬请牢记：如果您安装或使用本插件，就默认您已经承诺：不与任何人在任何场合分享插件的全部或部分内容；不在插件开发群以外的地方讨论插件相关问题或功能；在游戏截图前首先关闭所有插件再截图
//敬请牢记：如果您违背了您的承诺，您将失去所有esim插件未来版本的使用权并可能受到诸多方面的惩罚

//前排提醒：插件某些设置可以在下面全局变量里修改，变量涉及时间的如果没有特殊说明均为毫秒单位
//前排提醒：该插件有些特殊功能需要先开启e-sim助手（获取盟友、显示伤害），但如果不需要这些功能也可以脱离e-sim助手独立运行
//前排提醒：在自动寻找战场时，插件不会优先选择盟友场或是重要战场，而是寻找到能打的战场就立即跳转

//这里是全局变量
//★：可以在插件界面中设置，在代码里更改只会改变其初始值
//●：界面中没有该设置选项，但可以在代码里更改
//▲：插件某些功能专用变量，不应该改动它

var s_Running = true; //插件总开关，★
var s_EnableWorkTrain = true; //自动双击开关，★
var s_EnableAutoFight = true; //自动打枪开关，★
var s_IsWorkingTraining = false; //双击进行中，▲
var s_ErrorRefreshedCount = 0; //在输出遇到问题后刷新次数，▲

var s_WaitForLoadCount = 0; //等待网页加载完全的次数，▲
var s_MaxWaitForLoadCount = 50; //等待网页加载完全的最大次数（0.5秒每次），超出该值则刷新网页，●

var s_FlightTicketQuality = 1; //飞行使用的机票等级，值为1-5，★
var s_FightWeaponQuality = 0; //攻击武器等级，值为0-5，如武器不足默认0，★
var s_FightDefaultSide = 0; //两边都能打时默认输出方，0=防守方，1=进攻方，2=尽量拿到top1，3=尽量拿到top3，4=尽量拿到top10，-1=随机，★

var s_AWT_BackToRegion = true; //双击完回原所在地，★
var s_AWT_OriginRegionId = -1; //原所在地ID，▲
var s_AWT_BackToBattle = true; //双击完回原战场，★
var s_AWT_OriginBattleUrl; //原战场地址，▲

var s_AF_FightForAlly = true; //优先攻击盟友方，★
var s_AF_Allies = ["China","Taiwan"]; //自定义盟友，当两边都能打时优先打盟友方，★
var s_AF_Enemies = []; //自定义敌人，当两边都能打时优先打敌人反方，优先度高于盟友判断，★
var s_AF_EHAllies = true; //从e-sim助手获取盟友，添加到自定义盟友中，★
var s_AF_EHEnemies = true; //从e-sim助手获取敌人，添加到自定义敌人中，★
var s_AF_EHCoalition = true; //从e-sim助手获取联盟，添加到自定义盟友中，★

var s_AF_AutoSearchBattle = true; //自动寻找战场，★
var s_AF_SearchBattleFromButton = true; //优先从左侧按钮获取战场列表网址，●
var s_AF_SearchBattleUrl = "battles.html?countryId=-1&sorting=BY_TOTAL_DAMAGE"; //自定义搜索战场列表网址，★
var s_AF_AutoFlyToBattle = true; //当找不到可以打的战场时自动飞向s_AF_SearchBattleUrl的第一个起义战地区，★
var s_AF_SearchBattleShuffle = true; //战场列表乱序，以避免总是选择第一个可输出战场，★

var s_AF_MaxWarningCounts = 4; //自动攻击最大警告数量，累计超过该值关闭自动攻击，●
var s_AF_FightWaitMin = 600; //攻击间隔下限，★
var s_AF_FightWaitMax = 3000; //攻击间隔上限，★
var s_AF_FightByHitOnly = false; //仅用hit输出（无连击），★

var s_AF_NextRefreshExtendWaitMin = 20; //输出后下次刷新延时下限（秒），★
var s_AF_NextRefreshExtendWaitMax = 240; //输出后下次刷新延时上限（秒），★
var s_AFC_BattleTimeLeftTigger = 10; //战场于多少分钟内结束，触发压秒，●
var s_AFC_TiggerProbability = 50; //触发压秒概率，★
var s_AFC_RefreshInTimeLeftMax = 30; //刷新于结束前最大时间（秒），★
var s_AFC_RefreshInTimeLeftMin = 10; //刷新于结束前最小时间（秒），★

var s_AF_HitUsingWeapon = 0; //使用武器攻击的次数，★
var s_AF_MaxHitUsingWeapon = -1; //每次自动输出，使用武器攻击的最大次数，超出则使用空手攻击，-1为不限制，★

var s_AF_AjaxTimeout = 5*1000; //超时限制（默认5秒），★

var s_ShowMessageDelay = 1e4; //默认显示信息延时，●



$.info = function() {
    var area, base, info, objs, text, wait, w;
    if (arguments.length == 1)
    {
        text = arguments[0];
        wait = s_ShowMessageDelay;
    }
    else if (arguments.length == 2)
    {
        text = arguments[0];
        wait = arguments[1];
    }
    else
    {
        return;
    }

    area = $('#ESXMessageDiv');
    area.css({
        display: 'block'
    }).append('<div class="esxmsg">'+text+'</div>');
    objs = area.children('div');
    info = objs.eq(-1);
    if (objs.length > 10) {
        objs.eq(0).mouseenter();
    }
    w = info.width();
    info.css({
        left: -w,
        opacity: 0
    }).animate({
        left: 0,
        opacity: 1
    }, 200, function() {
        return info.delay(wait).animate({
            left: -w,
            opacity: 0
        }, 200, function() {info.remove();});
    });
    return objs.eq(-1);
};

function setArrayValue(item, value, isString) { //储存数组
    item = 'ESX-' + item;
    if (isString === true)
    {
        localStorage.setItem(item,JSON.stringify(value.split(",")));
    }
    else
    {
        localStorage.setItem(item,JSON.stringify(value));
    }
}

function getArrayValue(item, returnString) { //读取数组
    item = 'ESX-' + item;
    if (returnString === true)
    {
        return (item in localStorage) ? JSON.parse(localStorage.getItem(item)).join(",") : null;
    }
    else
    {
        return (item in localStorage) ? JSON.parse(localStorage.getItem(item)) : null;
    }
}

function setValue(item, value) { //储存数据
    localStorage['ESX-' + item] = value;
}

function getValue(item) { //读取数据
    item = 'ESX-' + item;
    return (item in localStorage) ? localStorage[item] : null;
}

function removeValue(item) { //删除数据
    item = 'ESX-' + item;
    localStorage.removeItem(item);
}

function loadStorage(item, defaultValue)
{
    var value = getValue(item);
    if (value == null)
    {
        return defaultValue;
    }
    else
    {
        if (typeof defaultValue == "string") return value;
        else if (typeof defaultValue == "number") return parseInt(value);
        else if (typeof defaultValue == "boolean") return (value == "true");
        else return value;
    }
}


//程序入口
//$(document).ready(function () {
    main();
    setTimeout(function() {location.reload();}, 30*60*1000); // 最低30分钟自动刷新，当未开启打枪时可以进行自动双击
//});


function getRandomInt(min, max)//返回随机数范围包含min，不包含max
{
    var Interval = max - min;
    var num = Math.random() * Interval + min;
    num = parseInt(num, 10);
    return num;
}

function getDateString(d)
{
    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();

    var clock = "";
    if(hh < 10) clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}

//从e-sim助手获取盟友
function getAlliesFromEH($textbox)
{
    if($("#Eh2Homeland").length>0) //开启了e-sim助手
    {
        s_AF_Allies = [];
        s_AF_Allies.push($("#Eh2Homeland").children("div").attr("title")); //祖国
        if (getValue("EHAllies") == "true")
        {
            var als = $("#Eh2Allies").children("div"); //盟友
            for (var i=0;i<als.length;i++)
            {
                s_AF_Allies.push(als[i].title);
            }
        }
        if (getValue("EHCoalition") == "true")
        {
            var cms = $("#Eh2CoalitionMembers").children("div"); //联盟
            for (var j=0;j<cms.length;j++)
            {
                s_AF_Allies.push(cms[j].title);
            }
        }
        s_AF_Allies = $.unique(s_AF_Allies.sort());
        setArrayValue("Allies", s_AF_Allies);
        $textbox.val(s_AF_Allies.join(","));
        ShowMessage("获取到盟友："+s_AF_Allies);
    }
    else
    {
        ShowMessage("e-sim助手未运行或版本不兼容");
    }
}

//从e-sim助手获取敌人
function getEnemiesFromEH($textbox)
{
    if($("#Eh2Homeland").length>0) //开启了e-sim助手
    {
        s_AF_Enemies = [];
        if (getValue("EHEnemies") == "true")
        {
            var ens = $("#Eh2Enemies").children("div");
            for (var i=0;i<ens.length;i++)
            {
                s_AF_Enemies.push(ens[i].title);
            }
        }
        //s_AF_Enemies = $.unique(s_AF_Enemies.sort());
        setArrayValue("Enemies", s_AF_Enemies);
        $textbox.val(s_AF_Enemies.join(","));
        ShowMessage("获取到敌人："+s_AF_Enemies);
    }
    else
    {
        ShowMessage("e-sim助手未运行或版本不兼容");
    }
}

function loadRecord()
{
    s_Running = loadStorage("IsRunning", s_Running);
    s_EnableWorkTrain = loadStorage("EnableWorkTrain",s_EnableWorkTrain);
    s_EnableAutoFight = loadStorage("EnableAutoFight",s_EnableAutoFight);
    s_IsWorkingTraining = loadStorage("IsWorkingTraining",s_IsWorkingTraining);
    s_FlightTicketQuality = loadStorage("FlightTicketQuality",s_FlightTicketQuality);
    s_ErrorRefreshedCount = loadStorage("ErrorRefreshedCount",s_ErrorRefreshedCount);
    s_AWT_BackToRegion = loadStorage("BackToRegion",s_AWT_BackToRegion);
    s_AWT_OriginRegionId = loadStorage("OriginRegionId",s_AWT_OriginRegionId);
    s_AWT_BackToBattle = loadStorage("BackToBattle",s_AWT_BackToBattle);
    s_AWT_OriginBattleUrl = loadStorage("OriginBattleUrl",s_AWT_OriginBattleUrl);
    s_AF_FightForAlly = loadStorage("FightForAlly",s_AF_FightForAlly);
    s_AF_Allies = getArrayValue("Allies"); //读取数组
    s_AF_Enemies = getArrayValue("Enemies"); //读取数组
    s_AF_EHAllies = loadStorage("EHAllies",s_AF_EHAllies);
    s_AF_EHEnemies = loadStorage("EHEnemies",s_AF_EHEnemies);
    s_AF_EHCoalition = loadStorage("EHCoalition",s_AF_EHCoalition);
    s_FightWeaponQuality = loadStorage("FightWeaponQuality",s_FightWeaponQuality);
    s_AF_FightWaitMin = loadStorage("FightWaitMin",s_AF_FightWaitMin);
    s_AF_FightWaitMax = loadStorage("FightWaitMax",s_AF_FightWaitMax);
    s_AF_NextRefreshExtendWaitMin = loadStorage("NextRefreshExtendWaitMin",s_AF_NextRefreshExtendWaitMin);
    s_AF_NextRefreshExtendWaitMax = loadStorage("NextRefreshExtendWaitMax",s_AF_NextRefreshExtendWaitMax);
    s_AFC_TiggerProbability = loadStorage("AFCTiggerProbability",s_AFC_TiggerProbability);
    s_AFC_RefreshInTimeLeftMax = loadStorage("AFCRefreshInTimeLeftMax",s_AFC_RefreshInTimeLeftMax);
    s_AFC_RefreshInTimeLeftMin = loadStorage("AFCRefreshInTimeLeftMin",s_AFC_RefreshInTimeLeftMin);
    s_AF_FightByHitOnly = loadStorage("FightByHitOnly",s_AF_FightByHitOnly);
    s_AF_HitUsingWeapon = loadStorage("HitUsingWeapon",s_AF_HitUsingWeapon);
    s_AF_MaxHitUsingWeapon = loadStorage("MaxHitUsingWeapon",s_AF_MaxHitUsingWeapon);
    s_FightDefaultSide = loadStorage("FightDefaultSide",s_FightDefaultSide);
    s_AF_AutoSearchBattle = loadStorage("AutoSearchBattle",s_AF_AutoSearchBattle);
    s_AF_SearchBattleUrl = loadStorage("SearchBattleUrl",s_AF_SearchBattleUrl);
    s_AF_AutoFlyToBattle = loadStorage("AutoFlyToBattle",s_AF_AutoFlyToBattle);
    s_AF_SearchBattleShuffle = loadStorage("SearchBattleShuffle",s_AF_SearchBattleShuffle);
    s_AF_AjaxTimeout = loadStorage("AjaxTimeout",s_AF_AjaxTimeout);
}

function ResetRecord()
{
    removeValue("IsRunning");
    removeValue("EnableWorkTrain");
    removeValue("EnableAutoFight");
    removeValue("IsWorkingTraining");
    removeValue("FlightTicketQuality");
    removeValue("ErrorRefreshedCount");
    removeValue("BackToRegion");
    removeValue("OriginRegionId");
    removeValue("BackToBattle");
    removeValue("OriginBattleUrl");
    removeValue("FightForAlly");
    removeValue("Allies");
    removeValue("Enemies");
    removeValue("EHAllies");
    removeValue("EHEnemies");
    removeValue("EHCoalition");
    removeValue("FightWeaponQuality");
    removeValue("FightWaitMin");
    removeValue("FightWaitMax");
    removeValue("NextRefreshExtendWaitMin");
    removeValue("NextRefreshExtendWaitMax");
    removeValue("AFCTiggerProbability");
    removeValue("AFCRefreshInTimeLeftMax");
    removeValue("AFCRefreshInTimeLeftMin");
    removeValue("FightByHitOnly");
    removeValue("HitUsingWeapon");
    removeValue("MaxHitUsingWeapon");
    removeValue("FightDefaultSide");
    removeValue("AutoSearchBattle");
    removeValue("SearchBattleUrl");
    removeValue("AutoFlyToBattle");
    removeValue("SearchBattleShuffle");
    removeValue("AjaxTimeout");
}

function addIcon()
{
    //-----------------------------------------------------------------------------------------------------------------------
    //Exsper's settings framework ver.ESX

    function addCheckBoxSettingFrame($appendToElement, checkboxID, checkboxLabel, localStorageName, defaultValue)
    {
        var $Checkbox = $('<input>', {type:'checkbox', style:"vertical-align:5px;", id:checkboxID});
        var $Label = $("<label>", {class:"checkboxlabel", for:checkboxID, text:checkboxLabel});
        var localStorageSetting = getValue(localStorageName);
        if (localStorageSetting === null)
        {
            setValue(localStorageName, defaultValue);
            $Checkbox.attr("checked", defaultValue == true);
        }
        else
        {
            $Checkbox.attr("checked", localStorageSetting == "true");
        }
        $appendToElement.append($Checkbox, $Label);
        $Checkbox.click(function() {
            if ($Checkbox.is(':checked'))
            {
                setValue(localStorageName, true);
            }
            else
            {
                setValue(localStorageName, false);
            }
        });
    }

    function addSelectSettingFrame($appendToElement, selectLabel, selectValueArray, selectTextArray, localStorageName, defaultValue)
    {
        var $Label = $("<span>", {style:"padding:3px; margin:3px", text:selectLabel});
        var $Select = $("<select>", {style:"padding:3px; margin:3px"}).appendTo($Label);
        for (var i=0; i<selectValueArray.length; i++)
        {
            $("<option>", {value:selectValueArray[i], text:selectTextArray[i]}).appendTo($Select);
        }
        var localStorageSetting = getValue(localStorageName);
        if (localStorageSetting === null)
        {
            setValue(localStorageName, defaultValue);
            $Select.val(defaultValue);
        }
        else
        {
            $Select.val(localStorageSetting);
        }
        $appendToElement.append($Label);
        $Select.change(function() {
            setValue(localStorageName, $Select.val());
        });
    }

    function addTextboxSettingFrame($appendToElement, width, localStorageName, defaultValue)
    {
        var $textbox = $("<input>", {type:"text",id:"ESX-"+localStorageName, style:"vertical-align:5px;width:"+width+"px;height:20px;"}).appendTo($appendToElement);
        var localStorageSetting = getValue(localStorageName);
        if (localStorageSetting === null)
        {
            setValue(localStorageName, defaultValue);
            $textbox.val(defaultValue);
        }
        else
        {
            $textbox.val(localStorageSetting);
        }
        $appendToElement.append($textbox);
        $textbox.focus(function() {
            $textbox.css("background-color","#FFFFFF");
        });
        $textbox.blur(function() {
            if ($textbox.val()==="") $textbox.val(defaultValue);
            $textbox.css("background-color","#79FF79");
            setValue(localStorageName, $textbox.val());
        });
    }

    function addArrayTextboxSettingFrame($appendToElement, width, localStorageName, defaultValue)
    {
        var $textbox = $("<input>", {type:"text",id:"ESX-"+localStorageName, style:"vertical-align:5px;width:"+width+"px;height:20px;"}).appendTo($appendToElement);
        var localStorageSetting = getArrayValue(localStorageName, true);
        if (localStorageSetting === null)
        {
            setArrayValue(localStorageName, defaultValue);
            $textbox.val(defaultValue.join(","));
        }
        else
        {
            $textbox.val(localStorageSetting);
        }
        $appendToElement.append($textbox);
        $textbox.focus(function() {
            $textbox.css("background-color","#FFFFFF");
        });
        $textbox.blur(function() {
            if ($textbox.val()==="") $textbox.val(defaultValue.join(","));
            $textbox.css("background-color","#79FF79");
            setArrayValue(localStorageName, $textbox.val(), true);
        });
    }

    //-----------------------------------------------------------------------------------------------------------------------


    // 图标
    var li = $("<li>", {id:"ESXIcon"}).insertBefore($("#userAvatar"));
    var a = $("<a>", {"data-dropdown":"ESXContentDrop",style:"padding:0 5px;", href:"#"}).appendTo(li);
    var img = $("<img>", {align:"absmiddle", class:"smallAvatar", style:"height:36px; width:36px;", src:"http://cdn.e-sim.org/img/eventIcons/battleLostIcon.png"}).appendTo(a);

    // 声明
    var ESXContentDrop = $("#contentDrop").clone().attr("id", "ESXContentDrop").empty().insertBefore($("#contentDrop")); // 外框
    ESXContentDrop.removeClass("medium");
    ESXContentDrop.addClass("large");
    $("<b>", {text:"xaria 战车是怎样炼成的 " + GM_info.script.version}).appendTo(ESXContentDrop);

    var donateToAuthor = $('<span>', {text:"捐赠", style:"float:right;"}).appendTo(ESXContentDrop);
    donateToAuthor.click(function() {
        createSettingWindow();
    });

    function createSettingWindow()
    {
        var dwindow = $('<div>', {class:"dwindow", style:"overflow:auto; width:300px; height:380px; display:block; position:absolute; top:50%; left:50%; margin-left: -225px; margin-top: -150px; padding-bottom: 20px; text-align:center;background-color:lightgray;"}).appendTo($('body'));
        $('<p>e-sim插件开发不易，您的无私奉献是我们努力的肯定与支持，让我们做得更好</p>').appendTo(dwindow);
        $('<p>QQ钱包</p>').appendTo(dwindow);
        var imgdiv = $('<div></div>').appendTo(dwindow);
        imgdiv[0].innerHTML = '<img src="https://puu.sh/Ad7wr/10f301077b.png"/>';
        $('<br>').appendTo(dwindow);
        var closeButton = $('<button>', {text:"关闭"}).appendTo(dwindow);
        closeButton.click(function(){
            dwindow.remove();
        });
    }
    $("<div>", {style:"text-align:center;", text:"自动清空体力、自动双击。珍惜账号，慎用自动。设置更改刷新后生效。"}).appendTo(ESXContentDrop); // 声明

    // 若干功能选择框和按钮
    var table = $("<table>", {id:"ESXConfig", style:"width:100%;line-height:30px"}).appendTo(ESXContentDrop);

    var tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    var td = $("<td>").appendTo(tr);

    //总开关
    addCheckBoxSettingFrame(td, 'IsRunCheckbox', '启用该插件', "IsRunning", s_Running);

    //双击功能开关
    addCheckBoxSettingFrame(td, 'EnableWorkTrainCheckbox', '启用双击功能', "EnableWorkTrain", s_EnableWorkTrain);

    //打枪功能开关
    addCheckBoxSettingFrame(td, 'EnableAutoFightCheckbox', '启用打枪功能', "EnableAutoFight", s_EnableAutoFight);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    //武器选择框
    addSelectSettingFrame(td, "输出使用武器：", [0,1,2,3,4,5], ["拳头","Q1","Q2","Q3","Q4","Q5"], "FightWeaponQuality", s_FightWeaponQuality);
    //仅单击
    addCheckBoxSettingFrame(td, 'FightByHitOnlyCheckbox', '不使用连击', "FightByHitOnly", s_AF_FightByHitOnly);


    addSelectSettingFrame(td, "超出次数则使用空手：", [-1,0,1,2,3,4,5,6,7,8,9,10], ["不限制","0","1","2","3","4","5","6","7","8","9","10"], "MaxHitUsingWeapon", s_AF_MaxHitUsingWeapon);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    //输出方选择框
    addSelectSettingFrame(td, "可以打两边时选择输出方：", [-1,0,1,2,3,4], ["随机","防守方","进攻方","尽量拿到top1","尽量拿到top3","尽量拿到top10"], "FightDefaultSide", s_FightDefaultSide);

    addCheckBoxSettingFrame(td, 'FightForAllyCheckbox', '起义场优先打盟友方或对抗敌方', "FightForAlly", s_AF_FightForAlly);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    $("<span>", {text:"设置盟友（以半角逗号分隔）："}).appendTo(td);
    addArrayTextboxSettingFrame(td, 400, "Allies", s_AF_Allies);
    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);
    $("<span>", {text:"设置敌国（以半角逗号分隔）："}).appendTo(td);
    addArrayTextboxSettingFrame(td, 400, "Enemies", s_AF_Enemies);
    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);
    var getAlliesFromEHButton = $('<button>', {text:"从E-sim助手获取盟友和敌国"}).appendTo(td);
    getAlliesFromEHButton.click(function() {
        getAlliesFromEH($("#ESX-Allies"));
        getEnemiesFromEH($("#ESX-Enemies"));
    });

    addCheckBoxSettingFrame(td, 'EHAlliesCheckbox', '获取盟友', "EHAllies", s_AF_EHAllies);
    addCheckBoxSettingFrame(td, 'EHCoalitionCheckbox', '获取联盟成员国', "EHCoalition", s_AF_EHCoalition);
    addCheckBoxSettingFrame(td, 'EHEnemiesCheckbox', '获取敌国', "EHEnemies", s_AF_EHEnemies);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    $("<span>每次攻击间隔（毫秒）：</span>").appendTo(td);
    addTextboxSettingFrame(td, 60, "FightWaitMin", s_AF_FightWaitMin);
    $("<span> 到 </span>").appendTo(td);
    addTextboxSettingFrame(td, 60, "FightWaitMax", s_AF_FightWaitMax);

    $("<span>打枪请求超时限制：</span>").appendTo(td);
    addTextboxSettingFrame(td, 60, "AjaxTimeout", s_AF_AjaxTimeout);
    $("<span>毫秒</span>").appendTo(td);
    var pingButton = $('<button>', {text:"Ping一下"}).appendTo(td);
    pingButton.click(function() {
        $.ping = function(option)
        {
            var ping, requestTime, responseTime ;
            var getUrl = function(url){    //保证url带http://
                var strReg="^((https|http)?://){1}";
                var re=new RegExp(strReg);
                return re.test(url)?url:"http://"+url;
            };
            $.ajax({
                url: option.url,
                type: 'GET',
                dataType: 'html',
                timeout: 10000,
                beforeSend : function()
                {
                    if(option.beforePing) option.beforePing();
                    requestTime = new Date().getTime();
                },
                complete : function()
                {
                    responseTime = new Date().getTime();
                    ping = Math.abs(requestTime - responseTime);
                    if(option.afterPing) option.afterPing(ping);
                }
            });

            if(option.interval && option.interval > 0)
            {
                var interval = option.interval * 1000;
                setTimeout(function(){$.ping(option);}, interval);
                //        option.interval = 0;        // 阻止多重循环
                //        setInterval(function(){$.ping(option)}, interval);
            }
        };

        $.ping({
            url : 'http://xaria.e-sim.org',
            //beforePing : function(){$('#ESXMessageDiv').html('')},
            afterPing : function(ping){ShowMessage("延迟： "+ping+" 毫秒");}
        });
    });

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    $("<span>清空体力后下次刷新额外延时（秒）：</span>").appendTo(td);
    addTextboxSettingFrame(td, 60, "NextRefreshExtendWaitMin", s_AF_NextRefreshExtendWaitMin);
    $("<span> 到 </span>").appendTo(td);
    addTextboxSettingFrame(td, 60, "NextRefreshExtendWaitMax", s_AF_NextRefreshExtendWaitMax);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    $("<span>若下次清体时回合剩余时间小于"+s_AFC_BattleTimeLeftTigger+"分钟，则有</span>").appendTo(td);
    addTextboxSettingFrame(td, 60, "AFCTiggerProbability", s_AFC_TiggerProbability);
    $("<span>%的概率将下次刷新时间延后</span><br/><span>至回合结束前S</span>").appendTo(td);
    addTextboxSettingFrame(td, 60, "AFCRefreshInTimeLeftMax", s_AFC_RefreshInTimeLeftMax);
    $("<span>到S</span>").appendTo(td);
    addTextboxSettingFrame(td, 60, "AFCRefreshInTimeLeftMin", s_AFC_RefreshInTimeLeftMin);
    $("<span>之间（压秒）</span>").appendTo(td);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    //机票选择框
    addSelectSettingFrame(td, "工作飞行使用机票：", [1,2,3,4,5], ["Q1","Q2","Q3","Q4","Q5"], "FlightTicketQuality", s_FlightTicketQuality);

    //双击完回原所在地
    addCheckBoxSettingFrame(td, 'BackToRegionCheckbox', '双击后飞回原所在地（请确保机票足够）', "BackToRegion", s_AWT_BackToRegion);

    //双击完回原战场
    addCheckBoxSettingFrame(td, 'BackToBattleCheckbox', '双击后回到原战场', "BackToBattle", s_AWT_BackToBattle);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    //搜寻网址
    addCheckBoxSettingFrame(td, 'AutoSearchBattleCheckbox', '战场页没有输出按钮时自动寻找第一个可输出战场', "AutoSearchBattle", s_AF_AutoSearchBattle);
    addCheckBoxSettingFrame(td, 'AutoFlyToBattleCheckbox', '如果找不到战场则飞向第一个起义战地区', "AutoFlyToBattle", s_AF_AutoFlyToBattle);
    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);
    addCheckBoxSettingFrame(td, 'SearchBattleShuffleCheckbox', '打乱战场列表，以避免总是选择第一个可输出战场', "SearchBattleShuffle", s_AF_SearchBattleShuffle);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);

    $("<span>", {text:"搜寻战场列表地址："}).appendTo(td);
    addTextboxSettingFrame(td, 400, "SearchBattleUrl", s_AF_SearchBattleUrl);
    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>").appendTo(tr);
    var checkBattleListUrlNow = $('<button>', {text:"测试搜寻战场"}).appendTo(td);
    checkBattleListUrlNow.click(function() {
        s_AF_SearchBattleUrl = getValue("SearchBattleUrl");
        searchBattle();
    });

    var resetWorkTrainButton = $('<button>', {text:"重置双击设置", title:"如果因双击错误导致无法自动输出，请点击此按钮"}).appendTo(td);
    resetWorkTrainButton.click(function() {
        removeValue("IsWorkingTraining");
        removeValue("OriginRegionId");
        removeValue("OriginBattleUrl");
    });

    var resetRecordButton = $('<button>', {text:"重置所有设置", title:"插件运行遇到问题？尝试重置插件吧"}).appendTo(td);
    resetRecordButton.click(function() {
        ResetRecord();
    });
}


function main()
{
    s_WaitForLoadCount = parseInt(getValue("WaitForLoadCount"));
    if ( $(".time").length !== 2) {
        s_WaitForLoadCount++;
        if (s_WaitForLoadCount<=s_MaxWaitForLoadCount)
        {
            setValue("WaitForLoadCount", s_WaitForLoadCount);
            console.log(s_WaitForLoadCount+":网页未加载完全，xaria插件等待1秒");
            setTimeout(main, 1000);
            return;
        }
        else
        {
            setValue("WaitForLoadCount", 0);
            location.reload();
            return;
        }
    }
    var tfl = $(".time:first").text().match(/-/g);
    if ( tfl==null || tfl.length != 2) {
        s_WaitForLoadCount++;
        if (s_WaitForLoadCount<=s_MaxWaitForLoadCount)
        {
            setValue("WaitForLoadCount", s_WaitForLoadCount);
            console.log(s_WaitForLoadCount+":官方脚本还未执行，xaria插件等待0.5秒");
            setTimeout(main, 500);
            return;
        }
        else
        {
            setValue("WaitForLoadCount", 0);
            location.reload();
            return;
        }
    }
    if ($("#minutesLimit").text() == "" ) {
        s_WaitForLoadCount++;
        if (s_WaitForLoadCount<=s_MaxWaitForLoadCount)
        {
            console.log(s_WaitForLoadCount+":官方时间还未刷新，xaria插件等待0.5秒");
            setTimeout(main, 500);
            return;
        }
        else
        {
            setValue("WaitForLoadCount", 0);
            location.reload();
            return;
        }
    }
    setValue("WaitForLoadCount", 0);
    CreateMessageDiv();
    addIcon();
    loadRecord();
    if (s_Running == false)
    {
        ShowMessage("xaria插件未启动");
        return;
    }
    if (s_EnableWorkTrain == true)
    {
        if ((s_AWT_BackToRegion == true) && (getUrlPage() == "battle"))
        {
            var regions = $('a[href^="region.html?id="][href!="region.html?id="]');
            var userRegionID = parseInt(regions.first().attr("href").split("=")[1]);
            setValue("OriginRegionId", userRegionID);
        }
        if ((s_AWT_BackToBattle == true) && (getUrlPage() == "battle"))
        {
            setValue("OriginBattleUrl", location.href);
        }
        autoWorkTrain();
    }
    if ((s_EnableAutoFight == true) && (getUrlPage() == "battle"))
    {
        //autoFight();
        setTimeout(function(){autoFight();}, 2000); //确保e-sim助手加载完成
        return;
    }
}

function CreateMessageDiv()
{
    GM_addStyle(".esxmsg{background-color: #fff;border-left: 4px solid #7ad03a;-webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);}");
    var $div = $("<div>", {id:"ESXMessageDiv", style:"position:fixed; bottom:5%;"}).appendTo('body');
}
function ShowMessage(s, wait)
{
    console.log(s);
    if (wait == undefined) $.info(s);
    else $.info(s, wait);
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

//-------------------------------------------------------自动双击-------------------------------------------------------
/*
//备用
//获取恢复剩余秒数
function getLimitResetLeftSecond()
{
    var secs; //剩余秒数
    $.ajax({
        url: "limitsReset.html",
        data: null,
        success: function(data) {
            secs = data;
        }
    });
}
//备用
//刷新左侧框架
function ingameSidebarReload()
{
    $.ajax({
        url: "ingameSidebarReload.html",
        data: null,
        success: function(data) {
            $("#testing").html(data);
        }
    });
}
*/



function autoWorkTrain()
{
    function autoTrain()
    {
        var trainButton = $("#trainButton");
        if (trainButton.length <= 0) //没有按钮
        {
            s_EnableWorkTrain = false;
            setValue("EnableWorkTrain", false);
            s_IsWorkingTraining = false;
            setValue("IsWorkingTraining", false);
            alert("错误：未训练却没有训练按钮，已自动关闭双击功能");
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
                        s_IsWorkingTraining = false;
                        setValue("IsWorkingTraining", false);
                        alert("错误：训练失败，已自动关闭双击功能");
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
            s_IsWorkingTraining = false;
            setValue("IsWorkingTraining", false);
            alert("错误：未工作却没有工作按钮，已自动关闭双击功能");
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
                        document.location = "/train.html";
                    }
                    else
                    {
                        s_EnableWorkTrain = false;
                        setValue("EnableWorkTrain", false);
                        s_IsWorkingTraining = false;
                        setValue("IsWorkingTraining", false);
                        alert("错误：工作失败，已自动关闭双击功能");
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
            s_IsWorkingTraining = false;
            setValue("IsWorkingTraining", false);
            alert("飞行出错：" + $(".testDivred :last")[0].childNodes[1].nodeValue+"，已自动关闭双击功能");
        }
        else
        {
            //飞行成功，重新工作
            document.location = "/work.html";
        }
    }

    function start(IsDelay)
    {
        s_IsWorkingTraining = true;
        setValue("IsWorkingTraining", "true");
        if (IsDelay == true)
        {
            setTimeout(function(){document.location = "/work.html";}, 30*1000);
        }
        else
        {
            document.location = "/work.html";
        }
    }

    function finish()
    {
        s_IsWorkingTraining = false;
        setValue("IsWorkingTraining", "false");
        //飞回原地
        if (s_AWT_BackToRegion == true)
        {
            var regions = $('a[href^="region.html?id="][href!="region.html?id="]');
            var userRegionID = parseInt(regions.first().attr("href").split("=")[1]);
            if ((s_AWT_OriginRegionId != -1) && (userRegionID != s_AWT_OriginRegionId))
            {
                ShowMessage("飞回地区："+s_AWT_OriginRegionId);
                var countryId;
                $.ajax({
                    url: "region.html?id="+s_AWT_OriginRegionId,
                    async: false,
                    success: function(data) {
                        countryId = parseInt($("#countryId", data).val());
                    },
                    error: function(xhr,textStatus){
                        console.log("地区页抓取错误 (", textStatus, ")，重新抓取");
                        $.ajax(this);
                    },
                });
                $.ajax({
                    url: "travel.html",
                    type: 'POST',
                    async: false,
                    data: {
                        countryId: countryId,
                        regionId: s_AWT_OriginRegionId,
                        ticketQuality: s_FlightTicketQuality
                    },
                    success: function(data) {
                        var e = $("div.testDivred", data);
                        if (e.length === 1)
                            ShowMessage("飞行失败：" + e.text().trim());
                        else {
                            ShowMessage("飞行成功！");
                        }
                    },
                    error: function(xhr,textStatus){
                        console.log("飞行错误 (", textStatus, ")");
                    },
                });
            }
        }
        if (s_AWT_BackToBattle == true)
        {
            ShowMessage("返回战场："+s_AWT_OriginBattleUrl);
            document.location = s_AWT_OriginBattleUrl;
        }
        else if ((s_EnableAutoFight == true) && (s_AF_AutoSearchBattle == true))
        {
            searchBattle();
        }
        else
        {
            ShowMessage("双击结束，等待下次双击");
        }
    }

    function startAutoWorkTrain()
    {

        if (s_IsWorkingTraining == false)
        {
            if (($("#taskButtonWork").length > 0) || ($("#taskButtonTrain").length > 0))
            {
                var nowhealth = parseFloat($("#actualHealth").html());
                var ticketCostHealth = 50 - s_FlightTicketQuality * 10;
                if (s_AWT_BackToRegion == true)
                {
                    if ((nowhealth - ticketCostHealth * 2) >= 0)
                    {
                        start(false);
                        return;
                    }
                    else
                    {
                        ShowMessage("可能由于人工操作，你当前的体力不足以飞行两次，程序将于30秒后再自动双击，请尽快补充体力");
                        start(true);
                        return;
                    }
                }
                else
                {
                    if ((nowhealth - ticketCostHealth) >= 0)
                    {
                        start(false);
                        return;
                    }
                    else
                    {
                        ShowMessage("可能由于人工操作，你当前的体力不足以飞行到工作地，程序将于30秒后再自动双击，请尽快补充体力");
                        start(true);
                        return;
                    }
                }
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
                setValue("IsWorkingTraining", false);
                return;
            }
        }
    }

    startAutoWorkTrain();
}

//-------------------------------------------------------自动攻击-------------------------------------------------------

function refreshingWhenCrashed()
{
    if (s_EnableAutoFight == true)
    {
        s_EnableAutoFight = false; //暂停自动攻击
        if (s_ErrorRefreshedCount <= 0) //第一次犯错，立即刷新
        {
            s_ErrorRefreshedCount++;
            setValue("ErrorRefreshedCount", s_ErrorRefreshedCount);
            location.reload();
        }
        else //刷新等待时间=犯错次数*30秒
        {
            s_ErrorRefreshedCount++;
            setValue("ErrorRefreshedCount", s_ErrorRefreshedCount);
            var waitSec = (s_ErrorRefreshedCount-1) * 30;
            ShowMessage("自动攻击出错，"+waitSec+"秒后自动刷新",1e6);
            setTimeout(function() {location.reload();}, waitSec*1000);
        }
    }
}



//寻找战场
function searchBattle()
{
    function checkBattle(url)
    {
        var result = false;
        $.ajax({
            url: url,
            async : false,
            //timeout: 5*1000,
            success: function(data) {
                if ( $(".time", data).length !== 2) {
                    console.log(citizenId, "抓取错误，重新抓取");
                    $.ajax(this);
                    return;
                }
                if ($(".testDivred", data).length>0) //冻结战场
                {
                    result = false;
                }
                else if ($("#fightButton2", data).length>0)
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


    function flyToBattle(battleData)
    {
        var result = false;
        var countryId = 0;
        var regionId = 0;

        var flightForm = $("form[action='travel.html']", battleData);
        if (flightForm.length >0)
        {
            countryId = parseInt(flightForm.children("#countryId").val());
            regionId = parseInt(flightForm.children("#regionId").val());

            if ((countryId >0) && (regionId>0))
            {
                $.ajax({
                    url: "travel.html",
                    type: 'POST',
                    async: false,
                    data: {
                        countryId: countryId,
                        regionId: regionId,
                        ticketQuality: s_FlightTicketQuality
                    },
                    success: function(data) {
                        var e = $("div.testDivred", data);
                        if (e.length === 1)
                            ShowMessage("飞行失败：" + e.text().trim());
                        else {
                            ShowMessage("飞行成功！");
                            result = true;
                        }
                    },
                    error: function(xhr,textStatus){
                        console.log("飞行错误 (", textStatus, ")");
                    },
                });
            }
            return result;
        }
        else
        {
            return false;
        }
    }

    function checkBattle2(url)
    {
        var result = false;
        $.ajax({
            url: url,
            async : false,
            //timeout: 5*1000,
            success: function(data) {
                if ( $(".time", data).length !== 2) {
                    console.log(citizenId, "抓取错误，重新抓取");
                    $.ajax(this);
                    return;
                }
                result = flyToBattle(data);
            },
            error: function(xhr,textStatus){
                console.log("抓取错误 (", textStatus, ")，重新抓取");
                $.ajax(this);
            },
        });
        return result;
    }

    function shuffleBattleList(bl)
    {
        for(var j, x, i = bl.length; i; j = parseInt(Math.random() * i), x = bl[--i], bl[i] = bl[j], bl[j] = x);
        return bl;
    }

    function getBattleList(url)
    {
        ShowMessage("寻找战场："+url);
        var battleUrlList = [];
        $.ajax({
            url: url,
            async : false,
            //timeout: 5*1000,
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
        var battleUrlList;
        if (($("#taskButtonFight").length>0) && (s_AF_SearchBattleFromButton == true))
        {
            battleUrlList = getBattleList($("#taskButtonFight").children().attr("href"));
        }
        else
        {
            battleUrlList = getBattleList(s_AF_SearchBattleUrl);
        }
        if (s_AF_SearchBattleShuffle == true) battleUrlList = shuffleBattleList(battleUrlList);
        for(var i=0;i<battleUrlList.length;i++)
        {
            var r = checkBattle(battleUrlList[i]);
            console.log(battleUrlList[i] + ":"+ r);
            if (r==true)
            {
                return battleUrlList[i];
            }
        }
        return "-1";
    }

    function getCanFightBattleUrl2()
    {
        var battleUrlList = getBattleList(s_AF_SearchBattleUrl);
        for(var i=0;i<battleUrlList.length;i++)
        {
            var r = checkBattle2(battleUrlList[i]);
            console.log(battleUrlList[i] + ":"+ r);
            if (r==true)
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
            if (s_AF_AutoFlyToBattle == false)
            {
                ShowMessage("未找到可以打的战场，10分钟后重新寻找");
                setTimeout(function() {startSearchBattle();}, 600*1000);
            }
            else
            {
                ShowMessage("未找到可以打的战场，尝试飞行到"+s_AF_SearchBattleUrl+"列表里的第一场起义战");
                battleUrl = getCanFightBattleUrl2();
                if (battleUrl != "-1")
                {
                    document.location = battleUrl;
                }
                else
                {
                    ShowMessage("未找到可以飞的起义战，10分钟后重新寻找");
                    setTimeout(function() {startSearchBattle();}, 600*1000);
                }
            }
        }
    }

    if (s_AF_AutoSearchBattle == true)
    {
        ShowMessage("30秒后开始寻找可以输出的战场");
        setTimeout(function() {startSearchBattle();}, 30*1000);
    }
    else
    {
        ShowMessage("该战场当前无法输出");
    }
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
        if (s_AF_MaxHitUsingWeapon <0) //无限制
        {
            s_AF_HitUsingWeapon++;
            setValue("HitUsingWeapon", s_AF_HitUsingWeapon);
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
        else if (s_AF_HitUsingWeapon >= s_AF_MaxHitUsingWeapon) //超限
        {
            return 0;
        }
        else
        {
            s_AF_HitUsingWeapon++;
            setValue("HitUsingWeapon", s_AF_HitUsingWeapon);
            if (s_FightWeaponQuality <=0 )
            {
                return 0;
            }
            else
            {
                var cc = parseInt($("#Q"+s_FightWeaponQuality+"WeaponStock").text());
                if (cc<=0)
                {
                    return 0;
                }
                else
                {
                    return s_FightWeaponQuality;
                }
            }
        }
    }

    function AFSendFightRequest(side, value)
    {
        var wq = AFGetWeaponQuality();
        if (!(wq>=0 && wq<=5)) wq=0;
        console.log("使用Q" + wq + '，side=' + side + '，value=' + value);
        var dataString = 'weaponQuality='+wq+'&battleRoundId=' + $("#battleRoundId").val() + '&side=' + side + '&value=' + value;
        var ajax = $.ajax({
            type: "POST",
            url: "fight.html",
            timeout: s_AF_AjaxTimeout,
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
                        warningCount++;
                        if (warningCount>s_AF_MaxWarningCounts)
                        {
                            refreshingWhenCrashed();
                        }
                    }
                    else
                    {
                        if (warningCount > 0) warningCount = 0;
                        if (s_ErrorRefreshedCount > 0)
                        {
                            //问题消除
                            s_ErrorRefreshedCount = 0;
                            setValue("ErrorRefreshedCount", 0);
                        }
                    }
                }
                else
                {
                    warningCount++;
                    ShowMessage( "攻击出错："+$("#fightResponse").text().trim()+"("+warningCount+")");
                    if (warningCount>s_AF_MaxWarningCounts)
                    {
                        refreshingWhenCrashed();
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                warningCount++;
                if(textStatus == 'timeout') ShowMessage("攻击出错：超时"+"("+warningCount+")");
                else ShowMessage("攻击出错：错误码"+XMLHttpRequest.status+"("+warningCount+")");
                if (warningCount>s_AF_MaxWarningCounts)
                {
                    refreshingWhenCrashed();
                }
                return false;
            }
        });
    }

    function GetBattleLeftTime()
    {
        var cd = $("#roundCountdown").children().text();
        var t = cd.split(":");
        if (t.length==3)
        {
            return (parseInt(t[0])*3600+parseInt(t[1])*60+parseInt(t[2]));
        }
        else
        {
            return -1;
        }
    }


    function AFCheckAndHit(side)
    {
        if (s_EnableAutoFight == false)
        {
            ShowMessage("打枪功能未启用或已暂停");
            return;
        }
        var timeOutTime;
        var hp = parseFloat($("#actualHealth").html());
        if (hp >= 10)
        {
            timeOutTime = getRandomInt(s_AF_FightWaitMin, s_AF_FightWaitMax);
            if ((hp >= 50) && (s_AF_FightByHitOnly == false))
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
            setValue("HitUsingWeapon", 0);
            var restore_minute = parseInt($("#minutesLimit").text().split(":")[0]);
            var restore_second = parseInt($("#secondsLimit").text());
            if ((restore_minute<0) || isNaN(restore_minute)) restore_minute=0;
            if ((restore_second<0) || isNaN(restore_second)) restore_second=0;
            timeOutTime = getRandomInt((restore_minute*60+restore_second+s_AF_NextRefreshExtendWaitMin)*1000, (restore_minute*60+restore_second+s_AF_NextRefreshExtendWaitMax)*1000);
            //判断是否压秒
            if (s_AFC_TiggerProbability>0)
            {
                var ri = getRandomInt(0,100);
                if (s_AFC_TiggerProbability>ri) //中奖
                {
                    //判断当前时间
                    var battleLeftTime = GetBattleLeftTime();
                    var nextBattleTime = battleLeftTime-(restore_minute*60+restore_second);
                    if ((battleLeftTime>0) && (nextBattleTime>0) && (nextBattleTime<s_AFC_BattleTimeLeftTigger*60))
                    {
                        //计算等待时间，等待时间=战场剩余时间-压秒开始时间
                        var lt = getRandomInt(s_AFC_RefreshInTimeLeftMin ,s_AFC_RefreshInTimeLeftMax);
                        timeOutTime = (battleLeftTime-lt)*1000;
                        ShowMessage("将于 S"+lt+" 刷新后压秒",1e6);
                    }
                }
            }
            ShowMessage("将于 "+getDateString(new Date(Date.now()+timeOutTime))+" 刷新",1e6);
            setTimeout(function() {location.reload();}, timeOutTime);
        }
    }

    function AFCheckCountryToFight()
    {

        function getTop3Info(index ,IsDefender) //index=1-3
        {
            var TopInfo={};
            var Id=0;
            var Damage=0;
            var $top;
            if (IsDefender==true)
            {
                $top = $("#topDefender"+index);
            }
            else
            {
                $top = $("#topAttacker"+index);
            }
            if (($top.length>0) && ($top.children().length>0))
            {
                Id = $top.children().children('a[href^="profile.html?id="]').attr("href").split("=")[1];
                Damage = parseInt($top.children().children(".hitInfl").text().replace(/,/g, ''));
            }
            TopInfo.IsDefender=IsDefender;
            TopInfo.Id=Id;
            TopInfo.Damage=Damage;
            return TopInfo;
        }


        function getTop10Info(index ,IsDefender) //index=4-10
        {
            var TopInfo={};
            var Id=0;
            var Damage=0;
            var $top;
            if (IsDefender==true)
            {
                $top = $("#top10Defenders"+index);
            }
            else
            {
                $top = $("#top10Attackers"+index);
            }
            if (($top.length>0) && ($top.children().length>0))
            {
                Id = $top.children("div").children('a[href^="profile.html?id="]').attr("href").split("=")[1];
                Damage = parseInt($top.children("div").children(".hitInfl").text().replace(/,/g, ''));
            }
            TopInfo.IsDefender=IsDefender;
            TopInfo.Id=Id;
            TopInfo.Damage=Damage;
            return TopInfo;
        }


        function returnRandomSide()
        {
            var ri = getRandomInt(0,2);
            if (ri==0)
            {
                ShowMessage("随机输出在 防守方");
                return "defender";
            }
            else
            {
                ShowMessage("随机输出在 进攻方");
                return "attacker";
            }
        }

        function returnSideByCheckTop1(topAttackerInfo, topDefenderInfo)
        {
            if (topAttackerInfo[0].Damage > topDefenderInfo[0].Damage)
            {
                ShowMessage("防守方第一位伤害较少，选择输出在 防守方");
                return "defender";
            }
            else if (topAttackerInfo[0].Damage < topDefenderInfo[0].Damage)
            {
                ShowMessage("进攻方第一位伤害较少，选择输出在 进攻方");
                return "attacker";
            }
            else
            {
                ShowMessage("双方第一位伤害相同或无人输出");
                return returnRandomSide();
            }
        }

        function returnSideByCheckTop3(topAttackerInfo, topDefenderInfo)
        {
            if (topAttackerInfo[2].Damage > topDefenderInfo[2].Damage)
            {
                ShowMessage("防守方第三位伤害较少，选择输出在 防守方");
                return "defender";
            }
            else if (topAttackerInfo[2].Damage < topDefenderInfo[2].Damage)
            {
                ShowMessage("进攻方第三位伤害较少，选择输出在 进攻方");
                return "attacker";
            }
            else
            {
                ShowMessage("双方第三位伤害相同或无人输出");
                return returnSideByCheckTop1(topAttackerInfo, topDefenderInfo);
            }
        }

        function returnSideByCheckTop10(topAttackerInfo, topDefenderInfo)
        {
            if (topAttackerInfo[9].Damage > topDefenderInfo[9].Damage)
            {
                ShowMessage("防守方第十位伤害较少，选择输出在 防守方");
                return "defender";
            }
            else if (topAttackerInfo[9].Damage < topDefenderInfo[9].Damage)
            {
                ShowMessage("进攻方第十位伤害较少，选择输出在 进攻方");
                return "attacker";
            }
            else
            {
                ShowMessage("双方第十位伤害相同或无人输出");
                return returnSideByCheckTop3(topAttackerInfo, topDefenderInfo);
            }
        }

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
        ShowMessage(defenderName+" vs "+attackerName);
        if ((s_AF_FightForAlly == true) && ($.inArray(defenderName, s_AF_Enemies) >= 0))
        {
            ShowMessage(defenderName+"是敌人，将为"+attackerName+"输出");
            return "attacker";
        }
        else if ((s_AF_FightForAlly == true) && ($.inArray(attackerName, s_AF_Enemies) >= 0))
        {
            ShowMessage(attackerName+"是敌人，将为"+defenderName+"输出");
            return "defender";
        }
        else if ((s_AF_FightForAlly == true) && ($.inArray(defenderName, s_AF_Allies) >= 0))
        {
            ShowMessage(defenderName+"是盟友，将为"+defenderName+"输出");
            return "defender";
        }
        else if ((s_AF_FightForAlly == true) && ($.inArray(attackerName, s_AF_Allies) >= 0))
        {
            ShowMessage(attackerName+"是盟友，将为"+attackerName+"输出");
            return "attacker";
        }
        else
        {
            if (s_FightDefaultSide<0)
            {
                return returnRandomSide();
            }
            if (s_FightDefaultSide==0)
            {
                ShowMessage("设置输出在 防守方");
                return "defender";
            }
            else if (s_FightDefaultSide==1)
            {
                ShowMessage("设置输出在 进攻方");
                return "attacker";
            }
            else if (s_FightDefaultSide>=2) //top1/3/10
            {
                var UserId = $("#userName").attr("href").split("=")[1];
                var topAttackerInfo = [];
                var topDefenderInfo = [];
                for(var i=1;i<=3;i++)
                {
                    topAttackerInfo.push(getTop3Info(i,false));
                    topDefenderInfo.push(getTop3Info(i,true));
                }
                for(var j=4;j<=10;j++)
                {
                    topAttackerInfo.push(getTop10Info(j,false));
                    topDefenderInfo.push(getTop10Info(j,true));
                }
                //console.log(topAttackerInfo);
                //console.log(topDefenderInfo);

                //检查自己排名
                var userDefenderRank = 10;
                var userAttackerRank = 10;
                for(var i1=0;i1<10;i1++)
                {
                    if (UserId == topAttackerInfo[i1].Id)
                    {
                        userAttackerRank = i1;
                        break;
                    }
                }
                for(var i2=0;i2<10;i2++)
                {
                    if (UserId == topDefenderInfo[i2].Id)
                    {
                        userDefenderRank = i2;
                        break;
                    }
                }
                if (userDefenderRank<userAttackerRank)
                {
                    ShowMessage("你在防守方输出为第"+(userDefenderRank+1)+"位，选择输出在 防守方");
                    return "defender";
                }
                else if (userDefenderRank>userAttackerRank)
                {
                    ShowMessage("你在进攻方输出为第"+(userAttackerRank+1)+"位，选择输出在 进攻方");
                    return "attacker";
                }
                else if( userDefenderRank<10 ) //在双方排名相同
                {
                    if (topAttackerInfo[userDefenderRank].Damage < topDefenderInfo[userDefenderRank].Damage)
                    {
                        ShowMessage("你在双方输出均为第"+(userDefenderRank+1)+"位，但在防守方伤害较高，选择输出在 防守方");
                        return "defender";
                    }
                    else if (topAttackerInfo[userDefenderRank].Damage > topDefenderInfo[userDefenderRank].Damage)
                    {
                        ShowMessage("你在双方输出均为第"+(userDefenderRank+1)+"位，但在进攻方伤害较高，选择输出在 防守方");
                        return "attacker";
                    }
                    else
                    {
                        ShowMessage("你在双方输出均为第"+(userDefenderRank+1)+"位，且伤害相同");
                        return returnRandomSide();
                    }
                }
                else
                {
                    if (s_FightDefaultSide == 2) //尽量拿到top1
                    {
                        return returnSideByCheckTop1(topAttackerInfo, topDefenderInfo);
                    }
                    else if (s_FightDefaultSide == 3) //尽量拿到top3
                    {
                        return returnSideByCheckTop3(topAttackerInfo, topDefenderInfo);
                    }
                    else if (s_FightDefaultSide == 4) //尽量拿到top10
                    {
                        return returnSideByCheckTop10(topAttackerInfo, topDefenderInfo);
                    }
                    else //未知模式
                    {
                        return returnRandomSide();
                    }
                }
            }
            else
            {
                return returnRandomSide();
            }
        }
    }

    function startAutoFight()
    {
        if (s_IsWorkingTraining == true)
        {
            ShowMessage("等待跳转到工作页");
            return;
        }
        if (getUrlPage() == "battle")
        {
            warningCount = 0;
            if ($(".testDivred").length>0) //冻结战场
            {
                ShowMessage("该战场被冻结");
                searchBattle();
            }
            else if ($("#fightButton2").length>0)
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
