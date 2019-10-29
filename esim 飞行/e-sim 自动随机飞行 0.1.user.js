// ==UserScript==
// @name         e-sim 自动随机飞行
// @namespace    EsimAF
// @version      0.1
// @description  自动飞行刷鞋裤，不建议在网络环境较差时使用；对于因使用该插件所造成的任何后果，作者不承担任何责任
// @author       Exsper
// @match        http://*.e-sim.org/travel.html*
// @match        https://*.e-sim.org/travel.html*
// @grant        none
// ==/UserScript==

// 更新历史：
// 0.31版：应对主页样式更改
//------------------------------------------默认值设置区------------------------------------------

var varAutoUseFood = true; //自动使用食物
var varAutoUseGift = true; //自动使用礼物
var varFlightTicketQuality = 1; //飞行使用的机票等级，值为1-5
var varWaitTime = [5000, 15000]; //每次飞行的等待时间范围（毫秒）
var varFlyCount = 0; //统计飞行次数
var varDropCount = [0, 0, 0, 0, 0, 0, 0]; //统计掉装[Q1裤,Q1鞋,Q2裤,Q2鞋,Q3裤,Q3鞋,其他装备?]

//------------------------------------------------------------------------------------------------

loadSettings();
main();

function setValue(item, value) { //储存数据
    localStorage['AF-' + item] = value;
}

function getValue(item) { //读取数据
    item = 'AF-' + item;
    return (item in localStorage) ? localStorage[item] : null;
}

function setArrayValue(item, value) { //储存数组
    item = 'AF-' + item;
    localStorage.setItem(item,JSON.stringify(value));
}

function getArrayValue(item) { //读取数组
    item = 'AF-' + item;
    return (item in localStorage) ? JSON.parse(localStorage.getItem(item)) : null;
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

function getRandomInt(min, max)//返回随机数范围包含min，不包含max
{
    var Interval = max - min;
    var num = Math.random() * Interval + min;
    num = parseInt(num, 10);
    return num;
}

function loadSettings()
{
    var autoUseFoodSettings = getValue("AutoUseFood");
    if (autoUseFoodSettings !== null)
    {
        varAutoUseFood = (autoUseFoodSettings == "true") ;
    }

    var autoUseGiftSettings = getValue("AutoUseGift");
    if (autoUseGiftSettings !== null)
    {
        varAutoUseGift = (autoUseGiftSettings == "true") ;
    }

    var travelTicketSettings = getValue("FlightTicketQuality");
    if (travelTicketSettings !== null)
    {
        varFlightTicketQuality = parseInt(travelTicketSettings) ;
    }

    var waitTimeSettings = getArrayValue("WaitTime");
    if (waitTimeSettings !== null)
    {
        varWaitTime[0] = parseInt(waitTimeSettings[0]) ;
        varWaitTime[1] = parseInt(waitTimeSettings[1]) ;
    }

    var flyCountSettings = getValue("FlyCount");
    if (flyCountSettings !== null)
    {
        varFlyCount = parseInt(flyCountSettings) ;
    }
    else
    {
        setValue("FlyCount", varFlyCount);
    }

    var dropCountSettings = getArrayValue("DropCount");
    if (dropCountSettings !== null)
    {
        varDropCount = dropCountSettings;
    }
    else
    {
        setArrayValue("DropCount", varDropCount);
    }
}

function addIcon()
{
    //图标
    var li = $("<li>", {id:"AFIcon"}).insertBefore($("#userAvatar"));
    var a = $("<a>", {"data-dropdown":"AFContentDrop", href:"#"}).appendTo(li);
    var img = $("<img>", {align:"absmiddle", class:"smallAvatar", style:"height:36px; width:36px;", src:"//cdn.e-sim.org//img/bgForElements/muOders.jpg"}).appendTo(a);

    // 版本号和声明
    var AFContentDrop = $("#contentDrop").clone().attr("id", "AFContentDrop").empty().insertBefore($("#contentDrop")); // 外框
    $("<b>", {text:"e-sim 自动随机飞行 " + GM_info.script.version}).appendTo(AFContentDrop).after("<br>"); // 版本号
    $("<div>", {style:"text-align:center;", text:"使用前必须先选好左侧食物和礼物等级；网络环境较差时不建议使用该插件"}).appendTo(AFContentDrop); // 声明

    // 若干功能选择框和按钮
    var table = $("<table>", {id:"AFConfig", style:"width:100%;"}).appendTo(AFContentDrop);

    var tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    var td = $("<td>", {id:"AFConfigRecover"}).appendTo(tr);

    //自动使用食物复选框
    var autoUseFoodCheckbox = $('<input>', {type:'checkbox', style:"vertical-align:5px;", id:'autoUseFoodCheckbox', text:'自动使用食物'}).appendTo(td);
    var autoUseFoodLabel = $("<label>", {class:"checkboxlabel", for:"autoUseFoodCheckbox", text:'自动使用食物'}).appendTo(td);
    var autoUseFoodSettings = getValue("AutoUseFood");
    if (autoUseFoodSettings === null)
    {
        //设置为默认值
        setValue("AutoUseFood", varAutoUseFood);
        $('#autoUseFoodCheckbox').attr("checked", varAutoUseFood);
    }
    else
    {
        $('#autoUseFoodCheckbox').attr("checked", autoUseFoodSettings == "true");
    }
    autoUseFoodCheckbox.click(function() {
        if ($('#autoUseFoodCheckbox').is(':checked'))
        {
            setValue("AutoUseFood", true);
        }
        else
        {
            setValue("AutoUseFood", false);
        }
    });


    //自动使用礼物复选框
    var autoUseGiftCheckbox = $('<input>', {type:'checkbox', style:"vertical-align:5px;", id:'autoUseGiftCheckbox', text:'自动使用礼物'}).appendTo(td);
    var autoUseGiftLabel = $("<label>", {class:"checkboxlabel", for:"autoUseGiftCheckbox", text:'自动使用礼物'}).appendTo(td);
    var autoUseGiftSettings = getValue("AutoUseGift");
    if (autoUseGiftSettings === null)
    {
        //设置为默认值
        setValue("AutoUseGift", varAutoUseGift);
        $('#autoUseGiftCheckbox').attr("checked", varAutoUseGift);
    }
    else
    {
        $('#autoUseGiftCheckbox').attr("checked", autoUseGiftSettings == "true");
    }
    autoUseGiftCheckbox.click(function() {
        if ($('#autoUseGiftCheckbox').is(':checked'))
        {
            setValue("AutoUseGift", true);
        }
        else
        {
            setValue("AutoUseGift", false);
        }
    });


    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>", {id:"AFConfigTicket"}).appendTo(tr);

    //机票选择框
    var selectTicketLabel = $("<p>", {style:"padding:3px; margin:3px", id:"AFTicketSelectLabel" ,text:"使用机票："}).appendTo(td);
    var selectTicket = $("<select>", {style:"padding:3px; margin:3px", id:"AFTicketSelect"}).appendTo(selectTicketLabel);
    for (var i=1; i<=5; ++i)
    {
        $("<option>", {value:i, text:"Q"+i}).appendTo(selectTicket);
    }
    var travelTicketSettings = getValue("FlightTicketQuality");
    if (travelTicketSettings === null)
    {
        //设置为默认值
        setValue("FlightTicketQuality", varFlightTicketQuality);
        selectTicket.val(varFlightTicketQuality);
    }
    else
    {
        selectTicket.val(travelTicketSettings);
    }
    selectTicket.change(function() {
        setValue("FlightTicketQuality", selectTicket.val());
    });


    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>", {id:"AFConfigWaitTime"}).appendTo(tr);


    //等待时间文本框
    $("<p>", {style:"padding:3px; margin:3px" ,text:"飞行间隔（毫秒）："}).appendTo(td);
    var waitTimeMin = $("<input>", {type:"text", style:"vertical-align:5px;", id:'waitTimeMin'}).appendTo(td);
    $("<p>", {style:"padding:3px; margin:3px" ,text:" 到 "}).appendTo(td);
    var waitTimeMax = $("<input>", {type:"text", style:"vertical-align:5px;", id:'waitTimeMax'}).appendTo(td);
    var waitTimeSettings = getArrayValue("WaitTime");
    if (waitTimeSettings === null)
    {
        setArrayValue("WaitTime", varWaitTime);
        waitTimeMin.val(varWaitTime[0]);
        waitTimeMax.val(varWaitTime[1]);
    }
    else
    {
        waitTimeMin.val(waitTimeSettings[0]);
        waitTimeMax.val(waitTimeSettings[1]);
    }
    waitTimeMin.focus(function() {
        waitTimeMin.css("background-color","#FFFFFF");
    });

    waitTimeMin.blur(function() {
        waitTimeMin.css("background-color","#79FF79");
        //保存文本框内容
        var newWaitTime = [parseInt(waitTimeMin.val()), parseInt(waitTimeMax.val())];
        setArrayValue("WaitTime", newWaitTime );
    });
    waitTimeMax.focus(function() {
        waitTimeMax.css("background-color","#FFFFFF");
    });

    waitTimeMax.blur(function() {
        waitTimeMax.css("background-color","#79FF79");
        //保存文本框内容
        var newWaitTime = [parseInt(waitTimeMin.val()), parseInt(waitTimeMax.val())];
        setArrayValue("WaitTime", newWaitTime );
    });


    tr = $("<tr>",{style:"line-height:30px;"}).appendTo(table);
    td = $("<td>", {id:"AFConfigStart"}).appendTo(tr);


    var startButton = $('<button>', {id:'AFstart', title:"开始自动飞行", text:"开始自动飞行"}).appendTo(td);
    startButton.click(function() {
        loadSettings();
        start();
    });

    var stopButton = $('<button>', {id:'AFstop', title:"停止自动飞行", text:"停止自动飞行"}).appendTo(td);
    stopButton.click(function() {
        stop();
    });

    if(getValue('started') == "true")
    {
        startButton.attr({disabled:true});
    }
    else
    {
        stopButton.attr({disabled:true});
    }

    var showFlightLogButton = $('<button>', {id:'AFshowlog', title:"显示统计信息", text:"显示统计信息"}).appendTo(td);
    showFlightLogButton.click(function() {
        if (confirm(dropCount2String()))
        {
            //重置数据
            varFlyCount = 0;
            varDropCount = [0, 0, 0, 0, 0, 0, 0];
            setValue("FlyCount", varFlyCount);
            setArrayValue("DropCount", varDropCount);
        }
    });
}

function sendEatRequest() {
    var dataString = 'quality=' + $("#foodQuality").val();
    $.ajax({
        type: "POST",
        url: "eat.html",
        async : false,
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
        async : false,
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


function checkState()
{
    if (getValue('isTraveled') == "false") //未飞行
    {
        //检查机票
        var ticketCount;
        var tf = $("#ticketQuality option[value="+ varFlightTicketQuality +"]").text();
        tf = tf.split(",")[0];
        tf = tf.split("(")[1];
        if (tf === "" || tf === ")")
        {
            ticketCount = 0;
        }
        else
        {
            ticketCount = parseInt(tf);
        }
        if (ticketCount<=0)
        {
            alert("机票不足");
            stop();
            return;
        }
        //检查体力
        if ((parseFloat($("#actualHealth").html()) + varFlightTicketQuality * 10 - 50) >= 0)
        {
            //体力足够飞行
            autoFlight();
        }
        else //体力不足
        {
            //检查食物额度和数量
            if (varAutoUseFood === true)
            {
                var foodLimit = parseInt($("#foodLimit").text());
                if (foodLimit>0)
                {
                    var foodCount = parseInt($("span#foodQ5")[0].childNodes[2].nodeValue);
                    if (foodCount>0)
                    {
                        console.log("使用食物");
                        sendEatRequest();
                        autoFlight();
                        return;
                    }
                }
            }
            //检查礼物额度和数量
            if (varAutoUseGift === true)
            {
                var giftLimit = parseInt($("#giftLimit").text());
                if (giftLimit>0)
                {
                    var giftCount = parseInt($("span#giftQ5")[0].childNodes[2].nodeValue);
                    if (giftCount>0)
                    {
                        console.log("使用礼物");
                        sendGiftRequest();
                        autoFlight();
                        return;
                    }
                }
            }
            alert("体力不足");
            stop();
            return;
        }
    }
    else
    {
        flyResult();
    }
}

function main() {
    if ( $(".time").length !== 2) {
        console.log("未登录，AF停止运行");
        return;
    }
    /*
    if ($(".time:first").text().match(/-/g).length != 2) {
        console.log("官方脚本还未执行，AF等待0.5秒");
        setTimeout(main, 500);
        return;
    }
    */

    if(getValue('started') == "true") //已开始自动飞行
    {
        addIcon();
        checkState();
    }
    else //未开始自动飞行，显示菜单
    {
        addIcon();
    }
}

function start()
{
    setValue('isTraveled', false);
    setValue('started', true);
    $("#AFstop").attr({disabled:false});
    $("#AFstart").attr({disabled:true});
    checkState();
}

function stop()
{
    setValue('isTraveled', false);
    setValue('started', false);
    $("#AFstop").attr({disabled:true});
    $("#AFstart").attr({disabled:false});
    console.log("停止飞行");
}

function autoFlight()
{
    if($("#citizenshipSelect").length<=0)
    {
        alert("网页错误，停止飞行");
        stop();
    }
    //获取国家最大index值
    var selectCountryMaxIndex = $("#citizenshipSelect option:last").index();
    //选择随机国家
    $("#citizenshipSelect").get(0).selectedIndex = getRandomInt(0, selectCountryMaxIndex + 1);
    console.log("更新地区列表");
    //更新该国家的地区
    $.ajax({
        url: "countryRegions.html",
        async : false,
        context: document.body,
        type: "POST",
        data: {countryId : $("#citizenshipSelect").val()},
        success: function(data){
            var i=0;
            $('#regionId').find('option').remove();
            var json = jQuery.parseJSON(data);
            for (i=0;i<json.length;i++) {
                $('#regionId').append('<option value="' + json[i][0] + '">' + json[i][1] + '</option>');
            }
        }
    });
    //获取地区最大index值
    var selectRegionMaxIndex = $("#regionId option:last").index();
    //选择随机地区
    $("#regionId").get(0).selectedIndex = getRandomInt(0, selectRegionMaxIndex + 1);
    //选择机票
    $("#ticketQuality").val(varFlightTicketQuality);
    //延时点击飞行按钮
    console.log("开始飞行");
    setTimeout(clickFlyButton, getRandomInt(varWaitTime[0], varWaitTime[1]));
}

function clickFlyButton()
{
    if (getValue('started') == "true")
    {
        setValue('isTraveled', true);
        $("#citizenTravelForm").submit();
    }
}


function flyResult()
{
    if($("#citizenshipSelect").length>0)
    {
        alert("网页错误，停止飞行");
        stop();
    }
    var testDivredWindow = $(".testDivred");
    if (testDivredWindow.length > 1) //有错误时会有2个结果
    {
        alert("飞行出错，停止飞行：" + $(".testDivred :last")[0].childNodes[1].nodeValue);
        stop();
    }
    else
    {
        //飞行成功，记录数据，重设飞行，刷新页面
        updateFlightLog();
        setValue('isTraveled', false);
        openUrl( location.origin + "/travel.html" );
    }
}

function dropCount2String()
{
    var output="";
    var eqs = ["Q1 裤","Q1 鞋","Q2 裤","Q2 鞋","Q3 裤","Q3 鞋","其他装备"];
    output = output + "一共飞行了 " + varFlyCount + " 次\n\n";
    output = output + "获得装备：\n";
    for(var i=0;i<varDropCount.length;i++)
    {
        if(varDropCount[i]>0)
            output = output + varDropCount[i] + " x " + eqs[i] + "\n";
    }
    output = output + "\n清空记录？";
    return output;
}

function updateFlightLog()
{
    varFlyCount = varFlyCount+1;
    var equipmentBox = $(".equipmentBox");
    if (equipmentBox.length>0)
    {
        var eqf = $(".equipmentBox").children();
        var eqinfo = $(eqf).children().attr("class").split(" ");
        var eqtq = eqinfo[eqinfo.length-1];
        var type = eqtq.substring(0, eqtq.length-1);
        var quality = eqtq.substring(eqtq.length-1);
        if (type.indexOf("shoes") >= 0)
        {
            if (quality=="1")
            {
                varDropCount[1]=varDropCount[1]+1;
            }
            else if (quality=="2")
            {
                varDropCount[3]=varDropCount[3]+1;
            }
            else if (quality=="3")
            {
                varDropCount[5]=varDropCount[5]+1;
            }
            else
            {
                varDropCount[6]=varDropCount[6]+1;
            }
        }
        else if (type.indexOf("pants") >= 0)
        {
            if (quality=="1")
            {
                varDropCount[0]=varDropCount[0]+1;
            }
            else if (quality=="2")
            {
                varDropCount[2]=varDropCount[2]+1;
            }
            else if (quality=="3")
            {
                varDropCount[4]=varDropCount[4]+1;
            }
            else
            {
                varDropCount[6]=varDropCount[6]+1;
            }
        }
        else
        {
            varDropCount[6]=varDropCount[6]+1;
        }
        setArrayValue("DropCount", varDropCount);
    }
    setValue("FlyCount", varFlyCount);
}

