// ==UserScript==
// @name         e-sim 一键双击
// @namespace    EsimAWT
// @version      0.37
// @description  模拟人工双击，最安全的e-sim双击插件
// @author       Exsper
// @match        http://*.e-sim.org/*
// @match        https://*.e-sim.org/*
// @grant        none
// ==/UserScript==

// 招人：E-sim助手开发组长期招收程序设计、编写、测试、优化、女装人员，要求：是活人就行
// 插件开发群：462288323 ，各位大佬进来拿插件也行呀

// 更新历史：
// 0.37版：优化代码
//------------------------------------------默认值设置区------------------------------------------
var varAutoRun = false; //无需点击按钮，进入页面就直接自动双击
var varAutoWorkEnable = true; //自动工作
var varAutoTrainEnable = true; //自动训练
var varAutoFlight = true; //自动工作时：不在国内自动飞行至工厂所在地
var varFlightTicketQuality = 1; //飞行使用的机票等级，值为1-5
//------------------------------------------------------------------------------------------------

loadSettings();
main();

function setValue(item, value) { //储存数据
    localStorage['AWT-' + item] = value;
}

function getValue(item) { //读取数据
    item = 'AWT-' + item;
    return (item in localStorage) ? localStorage[item] : null;
}

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

function openUrl(url, newTab) { //跳转网页
    var a = gE('body').appendChild(cE('a'));
    a.href = url;
    a.target = newTab ? '_blank' : '_self';
    a.click();
}

function loadSettings()
{
    var autoRunSettings = getValue("AutoRun");
    if (autoRunSettings !== null)
    {
        varAutoRun = (autoRunSettings == "true") ;
    }

    var autoWorkSettings = getValue("AutoWorkEnable");
    if (autoWorkSettings !== null)
    {
        varAutoWorkEnable = (autoWorkSettings == "true") ;
    }

    var autoTrainSettings = getValue("AutoTrainEnable");
    if (autoTrainSettings !== null)
    {
        varAutoTrainEnable = (autoTrainSettings == "true") ;
    }

    var autoTravelSettings = getValue("AutoTravelEnable");
    if (autoTravelSettings !== null)
    {
        varAutoFlight = (autoTravelSettings == "true") ;
    }

    var travelTicketSettings = getValue("FlightTicketQuality");
    if (travelTicketSettings !== null)
    {
        varFlightTicketQuality = parseInt(travelTicketSettings) ;
    }

}

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
//-----------------------------------------------------------------------------------------------------------------------

function addIcon()
{
    //图标
    var li = $("<li>", {id:"AWTIcon"}).insertBefore($("#userAvatar"));
    var a = $("<a>", {"data-dropdown":"AWTContentDrop", href:"#"}).appendTo(li);
    var img = $("<img>", {align:"absmiddle", class:"smallAvatar", style:"height:36px; width:36px;", src:"http://cdn.e-sim.org/img/premiumPromotion4.png"}).appendTo(a);

    // 版本号和声明
    var AWTContentDrop = $("#contentDrop").clone().attr("id", "AWTContentDrop").empty().insertBefore($("#contentDrop")); // 外框
    $("<b>", {text:"e-sim 一键双击 " + GM_info.script.version}).appendTo(AWTContentDrop).after("<br>"); // 版本号
    $("<div>", {style:"text-align:center;", text:"模拟人工双击，最安全的e-sim双击插件"}).appendTo(AWTContentDrop); // 声明

    // 若干功能选择框和按钮
    var table = $("<table>", {id:"AWTConfig", style:"width:100%;"}).appendTo(AWTContentDrop);

    var tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    var td = $("<td>", {id:"AWTConfigRun"}).appendTo(tr);

    //完全自动双击复选框
    addCheckBoxSettingFrame(td, 'autoRunCheckbox', '无需点击按钮，进入页面就直接自动双击', "AWT-AutoRun", varAutoRun);


    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>", {id:"AWTConfigWorkTrain"}).appendTo(tr);


    //自动工作复选框
    addCheckBoxSettingFrame(td, 'autoWorkCheckbox', '自动工作', "AWT-AutoWorkEnable", varAutoWorkEnable);


    //自动训练复选框
    addCheckBoxSettingFrame(td, 'autoTrainCheckbox', '自动训练', "AWT-AutoTrainEnable", varAutoTrainEnable);


    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>", {id:"AWTConfigFlight"}).appendTo(tr);


    //自动飞行复选框
    addCheckBoxSettingFrame(td, 'autoTravelCheckbox', '自动飞行到工作地', "AWT-AutoTravelEnable", varAutoFlight);


    //机票选择框
    addSelectSettingFrame(td, "使用机票：", [1,2,3,4,5], ["Q1","Q2","Q3","Q4","Q5"], "AWT-FlightTicketQuality", varFlightTicketQuality);
}

function checkState()
{
    var needWork = false;
    var needTrain = false;
    setValue('needWork', false);
    setValue('needTrain', false);

    //确定是否需要双击
    var workButton = $("#taskButtonWork");
    if ((workButton.length > 0) && (varAutoWorkEnable === true))
    {
        needWork = true;
        setValue('needWork', true);
    }
    var trainButton = $("#taskButtonTrain");
    if ((trainButton.length > 0) && (varAutoTrainEnable === true))
    {
        needTrain = true;
        setValue('needTrain', true);
    }

    if (needWork === true || needTrain === true)
    {
        if (varAutoRun !== true)
        {
            //添加按钮
            var dailyButton = $("#dailyButton");
            var taskButtonAWT = $('<li>', {id:'taskButtonAWT'}).appendTo(dailyButton);
            var startButton = $('<a>', {id:'AWTstart', class:"button foundation-style smallhelp only-icon profileButton", title:"自动双击"}).appendTo(taskButtonAWT);
            var startButtonIcon = $('<i>', {class:"icon-bomb"}).appendTo(startButton);

            startButton.click(function() {
                start();
            });
        }
        else //直接运行
        {
            start();
        }
    }
}

function main() {
    if ( $(".time").length !== 2) {
        console.log("未登录，AWT停止运行");
        return;
    }

    if ($(".time:first").text().match(/-/g).length != 2) {
        console.log("官方脚本还未执行，AWT等待0.5秒");
        setTimeout(main, 500);
        return;
    }


    if(getValue('started') == "true") //已开始自动双击
    {
        if (document.URL.search("html") != -1) {
            var url = document.URL.match("\/([a-zA-Z0-9]+)\.html")[1];
            switch (url) {
                case "work":
                    autoWork();
                    break;
                case "train":
                    autoTrain();
                    break;
                case "region":
                    autoFlight();
                    break;
                case "travel":
                    flyResult();
                    break;
                default:
                    //进了别的网页，应该是人为操作，停止双击
                    stop();
                    alert("奇怪的错误：非双击网页");
                    break;
            }
        }
    }
    else //未开始自动双击，检查状态并增加按钮和菜单
    {
        checkState();
        addIcon();
    }
}

function start()
{
    setValue('started', true);
    toAutoWork();
}

function finish()
{
    stop();
    document.title = "〈双击 已完成〉";
}

function stop()
{
    setValue('started', false);
}

function toAutoWork()
{
    //判断是否需要工作
    if ((getValue('needWork') == "false"))
    {
        //不需要工作
        toAutoTrain();
    }
    else //需要工作
    {
        //这里如果防止过快可以加入等待
        openUrl( location.origin + "/work.html" );
    }
}

function toAutoTrain()
{
    //判断是否需要训练
    if (getValue('needTrain') == "false")
    {
        //不需要训练
        finish();
    }
    else //需要训练
    {
        //这里如果防止过快可以加入等待
        openUrl( location.origin + "/train.html" );
    }
}

//先工作再训练
function autoTrain()
{
    var trainButton = $("#trainButton");
    if (trainButton.length <= 0) //没有按钮
    {
        //未训练却没有训练按钮
        alert("奇怪的错误：未训练却没有训练按钮");
        //停用完全自动双击，防止无限循环
        setValue("AutoRun", false);
        stop();
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
                $("#trainReload").html(data);
                var trainButton = $("#trainButton",data);
                if ((trainButton.length < 1) && ($("#userMenu",data).length < 1)) //没有按钮且不是重载页面
                {
                    //顺利完成自动训练
                    finish();
                }
                else
                {
                    //未训练却没有训练按钮
                    alert("奇怪的错误：未训练却没有训练按钮");
                    //停用完全自动双击，防止无限循环
                    setValue("AutoRun", false);
                    stop();
                }
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
        alert("奇怪的错误：未工作却没有工作按钮");
        //停用完全自动双击，防止无限循环
        setValue("AutoRun", false);
        stop();
    }
    else //有按钮
    {
        if (varAutoFlight === true) //自动飞行
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
                openUrl( location.origin + "/" + regions.last().attr('href') );
            }
        }
        else
        {
            sendWorkAjax();
            //有可能会转至未登录界面，但几率过小，暂不做考虑
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
                    //顺利完成自动工作
                    toAutoTrain();
                }
                else
                {
                    //已经自动工作过却未工作成功
                    alert("工作出错，停止双击");
                    //停用完全自动双击，防止无限循环
                    setValue("AutoRun", false);
                    stop();
                }
            }
        });
    }
}


function autoFlight()
{
    $("#ticketQuality").val(varFlightTicketQuality);
    var flyButton = $(".travel.button.foundation-style");
    flyButton[0].click();
}


function flyResult()
{
    var testDivredWindow = $(".testDivred");
    if (testDivredWindow.length > 0) //有错误时会有1个结果
    {
        alert("飞行出错，停止双击：" + $(".testDivred :last")[0].childNodes[1].nodeValue);
        //停用完全自动双击，防止无限循环
        setValue("AutoRun", false);
        stop();
    }
    else
    {
        //飞行成功，重新工作
        openUrl( location.origin + "/work.html" );
    }
}


