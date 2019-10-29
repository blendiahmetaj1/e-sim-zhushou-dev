// ==UserScript==
// @name         e-sim 自动飞行
// @namespace    EsimAF
// @version      0.31
// @description  自动飞行刷鞋裤，不建议在网络环境较差时使用；对于因使用该插件所造成的任何后果，作者不承担任何责任；如果遇到连续飞行不能停止的情况，请在飞行网址后面加上#并访问
// @author       Exsper
// @match        http://*.e-sim.org/travel.html*
// @match        https://*.e-sim.org/travel.html*
// @grant        none
// ==/UserScript==

//更新历史
//0.31 版：应对飞行界面更新

//------------------------------------------默认值设置区------------------------------------------

var varAutoUseFood = true; //自动使用食物
var varAutoUseGift = true; //自动使用礼物
var varFlightTicketQuality = 1; //飞行使用的机票等级，值为1-5
var varWaitTime = [2000, 5000]; //每次飞行的等待时间范围（毫秒）
var varFlyCount = 0; //统计飞行次数
var varDropCount = [0, 0, 0, 0, 0, 0, 0]; //统计掉装[Q1裤,Q1鞋,Q2裤,Q2鞋,Q3裤,Q3鞋,其他装备?]
var varFlyMode = true; //true=随机飞行；false=两地飞行
var varCountry1ID = -1; //地区1国家ID
var varRegion1ID = -1; //地区1地区ID
var varCountry2ID = -1; //地区2国家ID
var varRegion2ID = -1; //地区2地区ID

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

    var flyModeSettings = getValue("FlyMode");
    if (flyModeSettings !== null)
    {
        varFlyMode = (flyModeSettings == "true") ;
    }

    var Country1Settings = getValue("Country1ID");
    if (Country1Settings !== null)
    {
        varCountry1ID = parseInt(Country1Settings) ;
    }

    var Country2Settings = getValue("Country2ID");
    if (Country2Settings !== null)
    {
        varCountry2ID = parseInt(Country2Settings) ;
    }

    var Region1Settings = getValue("Region1ID");
    if (Region1Settings !== null)
    {
        varRegion1ID = parseInt(Region1Settings) ;
    }

    var Region2Settings = getValue("Region2ID");
    if (Region2Settings !== null)
    {
        varRegion2ID = parseInt(Region2Settings) ;
    }
}

function addRegionButton()
{
    var regionSelect = $("#regionId");
    var AFSetRegion1 = $('<div>', {id:'AFSetRegion1', style:"display:inline; padding:5px; width:60px; border-style:solid; border-width:1px; border-color:#000; background:#FFF;", text:"设为地区1"});
    regionSelect.after(AFSetRegion1);
    var AFSetRegion2 = $('<div>', {id:'AFSetRegion2', style:"display:inline; padding:5px; width:60px; border-style:solid; border-width:1px; border-color:#000; background:#FFF;", text:"设为地区2"});
    AFSetRegion1.after(AFSetRegion2);
    if (varRegion1ID>0)
    {
        AFSetRegion1.html("设为地区1 ("+varRegion1ID+")");
    }
    if (varRegion2ID>0)
    {
        AFSetRegion2.html("设为地区2 ("+varRegion2ID+")");
    }
    AFSetRegion1.click(function() {
        setValue("Country1ID", $("#citizenshipSelect").val());
        setValue("Region1ID", $("#regionId").val());
        varCountry1ID = $("#citizenshipSelect").val();
        varRegion1ID = $("#regionId").val();
        AFSetRegion1.html("设为地区1 ("+varRegion1ID+")");
    });
    AFSetRegion2.click(function() {
        setValue("Country2ID", $("#citizenshipSelect").val());
        setValue("Region2ID", $("#regionId").val());
        varCountry2ID = $("#citizenshipSelect").val();
        varRegion2ID = $("#regionId").val();
        AFSetRegion2.html("设为地区2 ("+varRegion2ID+")");
    });
}

function addIcon()
{
    //图标
    var li = $("<li>", {id:"AFIcon"}).insertBefore($("#userAvatar"));
    var a = $("<a>", {"data-dropdown":"AFContentDrop",style:"padding:0 5px;", href:"#"}).appendTo(li);
    var img = $("<img>", {align:"absmiddle", class:"smallAvatar", style:"height:36px; width:36px;", src:"//cdn.e-sim.org//img/bgForElements/muOders.jpg"}).appendTo(a);

    // 版本号和声明
    var AFContentDrop = $("#contentDrop").clone().attr("id", "AFContentDrop").empty().insertBefore($("#contentDrop")); // 外框
    $("<b>", {text:"e-sim 自动飞行 " + GM_info.script.version}).appendTo(AFContentDrop).after("<br>"); // 版本号
    $("<div>", {style:"text-align:center;", text:"使用前必须先选好左侧食物和礼物等级；网络环境较差时不建议使用该插件"}).appendTo(AFContentDrop); // 声明

    // 若干功能选择框和按钮
    var table = $("<table>", {id:"AFConfig", style:"width:100%;"}).appendTo(AFContentDrop);

    var tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    var td = $("<td>", {id:"AFConfigRecover"}).appendTo(tr);

    //自动使用食物复选框
    addCheckBoxSettingFrame(td, 'autoUseFoodCheckbox', '自动使用食物', 'AF-AutoUseFood', varAutoUseFood);

    //自动使用礼物复选框
    addCheckBoxSettingFrame(td, 'autoUseGiftCheckbox', '自动使用礼物', 'AF-AutoUseGift', varAutoUseGift);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>", {id:"AFConfigTicket"}).appendTo(tr);

    //机票选择框
    addSelectSettingFrame(td, "使用机票：", [1,2,3,4,5], ["Q1","Q2","Q3","Q4","Q5"], "AF-FlightTicketQuality", varFlightTicketQuality);

    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>", {id:"AFConfigMode"}).appendTo(tr);


    //模式选择框
    var selectModeLabel = $("<p>", {style:"padding:3px; margin:3px", id:"AFSelectModeLabel" ,text:"选择飞行模式："}).appendTo(td);
    var randomRadio = $('<input>', {type:'radio', id:'randomRadio', name:'selectMode', value:'random'}).appendTo(td);
    $("<span>", {text:"随机飞行"}).appendTo(td);
    //$("<br />").appendTo(td);
    var twoRegionRadio = $('<input>', {type:'radio', id:'twoRegionRadio', name:'selectMode', value:'twoRegion'}).appendTo(td);
    $("<span>", {text:"两地飞行（切换后请刷新并选择飞行地区）"}).appendTo(td);

    var flyModeSettings = getValue("FlyMode");
    if (flyModeSettings === null)
    {
        //设置为默认值
        setValue("FlyMode", varFlyMode);
        if (varFlyMode === true)
        {
            randomRadio.attr("checked",true);
        }
        else
        {
            addRegionButton();
            twoRegionRadio.attr("checked",true);
        }
    }
    else
    {
        if (flyModeSettings === "true")
        {
            randomRadio.attr("checked",true);
        }
        else
        {
            addRegionButton();
            twoRegionRadio.attr("checked",true);
        }
    }
    randomRadio.change(function() {
        if (randomRadio.is(":checked"))
        {
            setValue("FlyMode", true);
        }
        else
        {
            setValue("FlyMode", false);
        }
    });
    twoRegionRadio.change(function() {
        if (twoRegionRadio.is(":checked"))
        {
            setValue("FlyMode", false);
        }
        else
        {
            setValue("FlyMode", true);
        }
    });


    tr = $("<tr>", {style:"background-color:DarkSlateGray;"}).appendTo(table);
    td = $("<td>", {id:"AFConfigWaitTime"}).appendTo(tr);


    //等待时间文本框
    $("<p>", {style:"padding:3px; margin:3px;" ,text:"飞行间隔（单位：毫秒，秒数乘以1000）："}).appendTo(td);
    var waitTimeMin = $("<input>", {type:"text", style:"vertical-align:5px;width:60px;", id:'waitTimeMin'}).appendTo(td);
    $("<span>", {text:" 到 "}).appendTo(td);
    var waitTimeMax = $("<input>", {type:"text", style:"vertical-align:5px;width:60px;", id:'waitTimeMax'}).appendTo(td);
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
        if (waitTimeMin.val()==="") waitTimeMin.val(waitTimeSettings[0]);
        waitTimeMin.css("background-color","#79FF79");
        //保存文本框内容
        var newWaitTime = [parseInt(waitTimeMin.val()), parseInt(waitTimeMax.val())];
        setArrayValue("WaitTime", newWaitTime );
    });
    waitTimeMax.focus(function() {
        waitTimeMax.css("background-color","#FFFFFF");
    });

    waitTimeMax.blur(function() {
        if (waitTimeMax.val()==="") waitTimeMax.val(waitTimeSettings[1]);
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
                    var foodQuality = parseInt($("#foodQuality").val());
                    var foodCount = parseInt($("span#foodQ"+foodQuality)[0].childNodes[2].nodeValue);
                    if (foodCount>0)
                    {
                        console.log("使用Q"+foodQuality+"食物");
                        sendEatRequest();
                        checkState();
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
                    var giftQuality = parseInt($("#giftQuality").val());
                    var giftCount = parseInt($("span#giftQ"+giftQuality)[0].childNodes[2].nodeValue);
                    if (giftCount>0)
                    {
                        console.log("使用Q"+giftQuality+"礼物");
                        sendGiftRequest();
                        checkState();
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

    if ($(".time:first").text().match(/-/g).length != 2) {
        console.log("官方脚本还未执行，AF等待0.5秒");
        setTimeout(main, 500);
        return;
    }

    if (document.URL.substring(document.URL.length-1) == "#") //紧急停止
    {
        stop();
    }

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
    if(varFlyMode === true) //随机飞行模式
    {
        //获取国家最大index值
        var selectCountryMaxIndex = $("#citizenshipSelect option:last").index();
        //选择随机国家
        $("#citizenshipSelect").get(0).selectedIndex = getRandomInt(0, selectCountryMaxIndex + 1);
        console.log("更新 "+$("#citizenshipSelect").val()+" 地区列表");
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
    }
    else //两地飞行模式
    {
        var uregions = $('a[href^="region.html?id="][href!="region.html?id="]');
        var userLocationId = parseInt(uregions.first().attr('href').replace('region.html?id=', ''));
        if (varRegion1ID>0 && varRegion1ID != userLocationId)
        {
            //飞至地区1
            $("#citizenshipSelect").val(varCountry1ID);
            console.log("更新 "+$("#citizenshipSelect").val()+" 地区列表");
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
            $("#regionId").val(varRegion1ID);
        }
        else if (varRegion2ID>0 && varRegion2ID != userLocationId)
        {
            //飞至地区2
            $("#citizenshipSelect").val(varCountry2ID);
            console.log("更新 "+$("#citizenshipSelect").val()+" 地区列表");
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
            $("#regionId").val(varRegion2ID);
        }
        else
        {
            alert("飞行地区错误，请检查地区设置");
            stop();
            return;
        }
    }
    //选择机票
    $("#ticketQuality").val(varFlightTicketQuality);
    //延时点击飞行按钮
    var timeOutTime = getRandomInt(varWaitTime[0], varWaitTime[1]);
    console.log("开始飞行，等待时长："+timeOutTime+"毫秒");
    setTimeout(clickFlyButton, timeOutTime);
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
        return;
    }
    var testDivredWindow = $(".testDivred");
    if (testDivredWindow.length > 0) //有错误时会有1个结果
    {
        alert("飞行出错，停止飞行：" + $(".testDivred :last")[0].childNodes[1].nodeValue);
        stop();
        return;
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

