// ==UserScript==
// @name        e-Sim 激励助手(修改版)
// @namespace   zollow
// @author      zollow
// @version     1.2.2
// @include     /https?:\/\/.+\.e-sim\.org(:[0-9]+)?\/train\.html/
// @description 修改版激励助手，现在连+5额度都这么困难
// @grant none
// ==/UserScript==

// 招人：E-sim助手开发组长期招收程序设计、编写、测试、优化、女装人员，要求：是活人就行
// 插件开发群：462288323 ，各位大佬进来拿插件也行呀

// 1.2.2版本：应对训练界面更改；
// 此版本为esim插件开发组临时改版，如需最新版请向原作者索取

var searchPlayer = 5;//激励5个玩家
var beginId;
var endId;
var cachedSettings = null; // GM friendly function
var currentServer = null;
var done = false;
var isMotivation = false;
var randomID = 0;//新加的顺序搜索随机到的初始ID

// Get current server
function getCurrentServer() {
    if (!currentServer) {
        //var localUrl = new String( window.location );
        var localUrl = String(window.location);
        var ini = localUrl.indexOf("//", 0);
        var end = localUrl.indexOf(".", 0);
        currentServer = localUrl.substr(ini, end - ini + 1);
    }
    console.log(currentServer);
    return (currentServer);
}

// getValue as GM_getValue of GM functions
function getValue(name) {
    name = getCurrentServer() + name;
    var value = (cachedSettings === null ? localStorage.getItem(name) : cachedSettings[name]);
    if (!value || (value === undefined)) {
        return (null);
    }
    return (value);
}

// setValue as GM_setValue of GM functions
function setValue(name, value) {
    name = getCurrentServer() + name;
    if (cachedSettings === null) {
        localStorage.setItem(name, value);
    } else {
        cachedSettings[name] = value;
        chrome.extension.sendRequest({
            name : name,
            value : value
        });
    }
}

//获取最新公民的ID。
function getNewCitizenId() {
    var citizenId = 0;
    // $.ajax({
        // url : 'newCitizenStatistics.html',
        // type : 'GET',
        // async : false,
        // dataType : 'html',
        // success : function (data) {
            // if (data != null) {
                // var citizen = $(".profileLink", data);
                // if (citizen.length > 1) {
                    // citizenId = $(".profileLink", data)[1].href.match(/[0-9]+/i);
                // }
            // }
        // },
        // error : function (xhr) {
            // alert('getNewCitizenId ERROR');
        // }
    // });
    //修正换日，偶尔没id的情况
    // if (citizenId === 0) {
        $.ajax({
            url : 'newCitizens.html?countryId=0',
            type : 'GET',
            async : false,
            dataType : 'html',
            success : function (data) {
                if (data != null) {                 
                    //citizen = $("a[href^='profile.html?id=']", data);
                    //citizenId = $(citizen[3]).attr("href").replace("profile.html?id=", "");
                    //2017.10.14 更新：应对界面更改
                    var dataTable = $("table.dataTable", data);
                    citizen = $("a[href^='profile.html?id=']", dataTable);
                    citizenId = $(citizen[0]).attr("href").replace("profile.html?id=", "");
                }
            },
            error : function(xhr) {
                alert("getNewCitizenId ERROR");
                citizen = getNewCitizenId();
            }
        });
    // }
    return citizenId;
}

//创建激励点击字符。
function createClickEvent(CitizenId, type) {

    var url,
    btnClick;
    url = "\'motivateCitizen.html?id=" + CitizenId + "\'";
    btnClick = "<i class=\"icon-uniF478\" style=\"color: #c00;font-size: 1.25em; text-shadow: 0 0 0\"" +
        " onclick = \"$.post(" +
        url +
        ", { type: " +
        type +
        ", id: " +
        CitizenId +
        ' }, function(data) {var patt=/成功发送激励包/g;var result=patt.test(data);if(result){alert(\'OK! 你获取到一个食物上限。\');}else{alert(\'出现点小问题，激励失败。\');}}' +
        ");\"></i>";
    //alert(btnClick);
    return btnClick;
}

//添加玩家到激励表里面
function addElement(newCitizenNumber, newCitizenIdLink, newCitizenId, newCitizenName) {
    var ret = true;
    $.ajax({
        url : newCitizenIdLink,
        type : 'GET',
        async : false,
        dataType : 'html',
        success : function (data) {
            if (data != null) {
                //alert(data);
                console.log(newCitizenIdLink + ': start');
                var motivationFlag = 0,
                searchResult = false;
                var movtivationClick = "onclick=$.post('motivateCitizen.html?id='" + newCitizenId + ", { type: 1, id: " + newCitizenId + "}, function(data) {});";
                //能捐赠武器
                if ($(".dataTable tbody tr:not(:first)", data).find(":contains('3x')").length != 0) {
                    $("#motivationWep").is(":checked") && (searchResult = true);
                    motivationFlag |= 1;
                }
                //能捐赠食物
                if ($(".dataTable tbody tr:not(:first)", data).find(":contains('2x')").length != 0) {
                    $("#motivationFood").is(":checked") && (searchResult = true);
                    motivationFlag |= 2;
                }
                //能捐赠礼物
                if ($(".dataTable tbody tr:not(:first)", data).find(":contains('1x')").length != 0) {
                    $("#motivationGift").is(":checked") && (searchResult = true);
                    motivationFlag |= 4;
                }

                isMotivation = false;
                if (searchResult) {
                    console.log(newCitizenIdLink + ': post start');
                    var td = $("#td" + newCitizenNumber);
                    td.html("<a class='profileLink' target=_blank' href='profile.html?id=" + newCitizenId + "'>" + newCitizenName + "</a>");
                    td = td.next();
                    td.html("<a class='foundation-style button small help' target=_blank' title='激励' href='motivateCitizen.html?id=" + newCitizenId + "'><i class='icon-cupcake'></i></a>");
                    td = td.next();
                    if (motivationFlag & 1) {
                        td.html(createClickEvent(newCitizenId, 1));
                        if (done && !isMotivation && $("#motivationWep").is(":checked")) {
                            $.post("motivateCitizen.html?id=" + newCitizenId, {
                                type : 1,
                                id : newCitizenId
                            }, function (data) {});
                            isMotivation = true;
                        }
                    } else {
                        td.html("<p class='icon-uniF479 ' style='color: #0c0;font-size: 1.25em; text-shadow: 0 0 0' onclick='alert(0);'></p>");
                    }

                    td = td.next();
                    if (motivationFlag & 2) {
                        td.html(createClickEvent(newCitizenId, 2));
                        if (done && !isMotivation && $("#motivationFood").is(":checked")) {
                            $.post("motivateCitizen.html?id=" + newCitizenId, {
                                type : 2,
                                id : newCitizenId
                            }, function (data) {});
                            isMotivation = true;
                        }
                    } else {
                        td.html("<i class='icon-uniF479 ' style='color: #0c0;font-size: 1.25em; text-shadow: 0 0 0' onclick='alert(0);'></i>");
                    }
                    td = td.next();
                    if (motivationFlag & 4) {
                        td.html(createClickEvent(newCitizenId, 3));
                        if (done && !isMotivation && $("#motivationGift").is(":checked")) {
                            $.post("motivateCitizen.html?id=" + newCitizenId, {
                                type : 3,
                                id : newCitizenId
                            }, function (data) {});
                            isMotivation = true;
                        }
                    } else {
                        td.html("<i class='icon-uniF479 ' style='color: #0c0;font-size: 1.25em; text-shadow: 0 0 0' onclick='alert(0);'></i>");
                    }
                    console.log(newCitizenIdLink + ': post end');
                } else {
                    ret = false;
                }
                console.log(newCitizenIdLink + ': end');
            }
        },
        error : function (xhr) {
            ret = false;
            alert('getMotivationList ERROR');
        }
    });
    return ret;
}

function loopMain(index, newCitizenId) {//原来的随机激励
    var newCitizenIdLink,
    citizenNumber = 0,
    citizenList = [],
    count = 0,
    fullUrl;
    if (index == 0) {
        if (done) {
            alert('激励完毕!');
        }
        return;
    }

    fullUrl = "profile.html?id=" + newCitizenId;
    $.ajax({
        url : fullUrl,
        success : function (data) {
            if (data != null) {
                var birthday;
                var isNewProfilePage = false;
                if ($(".big-login", data).length>0) //新版profile界面
                {
                    isNewProfilePage = true;
                }
                if (isNewProfilePage === false)
                {
                    birthday = $('.smallTableFont:first .smallStatsLabel:eq(7)', data);
                }
                else
                {
                    birthday = $('div.rank :eq(0)', data).parent().children('div.profile-row:eq(7)').children("span.data");
                }

                //排除组织号
                if (birthday.length === 0) {
                    newCitizenId = parseInt(endId) + Math.round(Math.random() * (beginId - endId));
                    loopMain(index, newCitizenId);
                }

                //var age = parseInt($('#time2 ~ b', data).text().split(' ')[1]) - parseInt(birthday.text().split(' ')[1]) + 1;
                var age = parseInt($('#time2 ~ b', data).text().match(/\d+/)) - parseInt(birthday.text().split(' ')[1]) + 1;
                var name;
                if (isNewProfilePage === false)
                {
                    name = $('div.testDivblue:eq(1)>div>h2', data).text().split("\u00a0")[1];
                }
                else
                {
                    name = $('.big-login', data).text();
                }
                // alert($('div.testDivblue:eq(1)>div>h2', data).text());
                $("#count_mot").text("从 "+endId+" 到 "+beginId+' 中 随机 寻找玩家\n玩家:' + name + ' 年龄:' + age + ' id:' + newCitizenId);
                if (age > 4) {//不是新玩家
                    endId = newCitizenId;
                    setValue('endId', newCitizenId);
                    newCitizenId = parseInt(endId) + Math.round(Math.random() * (beginId - endId));
                    loopMain(index, newCitizenId);
                } else {
                    newCitizenIdLink = 'motivateCitizen.html?id=' + newCitizenId;
                    if (addElement(searchPlayer - index + 1, newCitizenIdLink, newCitizenId, name)) {//可以激励
                        loopMain(index - 1, newCitizenId - 1);
                    } else {//无法激励
                        newCitizenId = parseInt(endId) + Math.round(Math.random() * (beginId - endId));
                        loopMain(index, newCitizenId);
                    }
                }
            }
        }
    });
}

function loopMain2(index, newCitizenId, isForward) {//新加的顺序激励，随机一个起始ID向老帐号方向找，直到不是新玩家后再回来向新帐号方向找，参数isForward为阶段（0-2）
    var newCitizenIdLink,
    citizenNumber = 0,
    citizenList = [],
    count = 0,
    fullUrl;
    if (index == 0) {
        if (done) {
            alert('激励完毕!');
        }
        return;
    }

    if (isForward <= 0)//第0阶段：确定起始ID
    {
        fullUrl = "profile.html?id=" + newCitizenId;
        $.ajax({
            url : fullUrl,
            success : function (data) {
                if (data != null) {
                    var birthday;
                    var isNewProfilePage = false;
                    if ($(".big-login", data).length>0) //新版profile界面
                    {
                        isNewProfilePage = true;
                    }
                    if (isNewProfilePage === false)
                    {
                        birthday = $('.smallTableFont:first .smallStatsLabel:eq(7)', data);
                    }
                    else
                    {
                        birthday = $('div.rank :eq(0)', data).parent().children('div.profile-row:eq(7)').children("span.data");
                    }

                    //搜到组织号，重新确定起始ID
                    if (birthday.length === 0) {
                        newCitizenId = parseInt(endId) + Math.round(Math.random() * (beginId - endId));
                        randomID = newCitizenId;
                        loopMain2(index, newCitizenId, 0);
                    }
                    var age = parseInt($('#time2 ~ b', data).text().match(/\d+/)) - parseInt(birthday.text().split(' ')[1]) + 1;
                    var name;
                    if (isNewProfilePage === false)
                    {
                        name = $('div.testDivblue:eq(1)>div>h2', data).text().split("\u00a0")[1];
                    }
                    else
                    {
                        name = $('.big-login', data).text();
                    }
                    $("#count_mot").text('确定起始玩家中...\n玩家:' + name + ' 年龄:' + age + ' id:' + newCitizenId);
                    if (age > 4) {//不是新玩家，重新确定endId，重新随机起始ID
                        endId = newCitizenId;
                        setValue('endId', newCitizenId);
                        newCitizenId = parseInt(endId) + Math.round(Math.random() * (beginId - endId));
                        randomID = newCitizenId;
                        loopMain2(index, newCitizenId, 0);
                    } else {//是新玩家，查看能否激励并进入第1阶段
                        newCitizenIdLink = 'motivateCitizen.html?id=' + newCitizenId;
                        if (addElement(searchPlayer - index + 1, newCitizenIdLink, newCitizenId, name)) {//可以激励
                            loopMain2(index - 1, newCitizenId - 1, 1);
                        } else {//无法激励
                            loopMain2(index, newCitizenId - 1, 1);
                        }
                    }
                }
            }
        });
    }

    else if (isForward == 1)//第1阶段：从randomID-1开始向前遍历，直到搜到老帐号
    {
        fullUrl = "profile.html?id=" + newCitizenId;
        $.ajax({
            url : fullUrl,
            success : function (data) {
                if (data != null) {
                    var birthday;
                    var isNewProfilePage = false;
                    if ($(".big-login", data).length>0) //新版profile界面
                    {
                        isNewProfilePage = true;
                    }
                    if (isNewProfilePage === false)
                    {
                        birthday = $('.smallTableFont:first .smallStatsLabel:eq(7)', data);
                    }
                    else
                    {
                        birthday = $('div.rank :eq(0)', data).parent().children('div.profile-row:eq(7)').children("span.data");
                    }

                    //搜到组织号
                    if (birthday.length === 0) {
                        newCitizenId = newCitizenId - 1;
                        loopMain2(index, newCitizenId, 1);
                    }
                    var age = parseInt($('#time2 ~ b', data).text().match(/\d+/)) - parseInt(birthday.text().split(' ')[1]) + 1;
                    var name;
                    if (isNewProfilePage === false)
                    {
                        name = $('div.testDivblue:eq(1)>div>h2', data).text().split("\u00a0")[1];
                    }
                    else
                    {
                        name = $('.big-login', data).text();
                    }
                    $("#count_mot").text('正在从 ' + randomID + ' 向前寻找新玩家\n玩家:' + name + ' 年龄:' + age + ' id:' + newCitizenId);
                    if (age > 4) {//不是新玩家，进入第2阶段
                        endId = newCitizenId;
                        setValue('endId', newCitizenId);
                        newCitizenId = randomID + 1;
                        loopMain2(index, newCitizenId, 2);
                    } else {//是新玩家，查看能否激励并继续向前
                        newCitizenIdLink = 'motivateCitizen.html?id=' + newCitizenId;
                        if (addElement(searchPlayer - index + 1, newCitizenIdLink, newCitizenId, name)) {//可以激励
                            loopMain2(index - 1, newCitizenId - 1, 1);
                        } else {//无法激励
                            loopMain2(index, newCitizenId - 1, 1);
                        }
                    }
                }
            }
        });
    }

    else if (isForward == 2)//第2阶段：从randomID+1开始向后遍历，直到搜到beginId
    {
        if (newCitizenId > beginId)
        {
            alert('已经遍历完所有新玩家，没有更多可激励的新玩家!');
            return;
        }
        fullUrl = "profile.html?id=" + newCitizenId;
        $.ajax({
            url : fullUrl,
            success : function (data) {
                if (data != null) {
                    var birthday;
                    var isNewProfilePage = false;
                    if ($(".big-login", data).length>0) //新版profile界面
                    {
                        isNewProfilePage = true;
                    }
                    if (isNewProfilePage === false)
                    {
                        birthday = $('.smallTableFont:first .smallStatsLabel:eq(7)', data);
                    }
                    else
                    {
                        birthday = $('div.rank :eq(0)', data).parent().children('div.profile-row:eq(7)').children("span.data");
                    }

                    //搜到组织号
                    if (birthday.length === 0) {
                        newCitizenId = newCitizenId + 1;
                        loopMain2(index, newCitizenId, 2);
                    }
                    var age = parseInt($('#time2 ~ b', data).text().match(/\d+/)) - parseInt(birthday.text().split(' ')[1]) + 1;
                    var name;
                    if (isNewProfilePage === false)
                    {
                        name = $('div.testDivblue:eq(1)>div>h2', data).text().split("\u00a0")[1];
                    }
                    else
                    {
                        name = $('.big-login', data).text();
                    }
                    $("#count_mot").text('正在从' + randomID + ' 到 ' + beginId + ' 寻找新玩家\n玩家:' + name + ' 年龄:' + age + ' id:' + newCitizenId);
                    if (age > 4) {//不是新玩家，不可能发生的情况
                        alert('发生不可预料的错误!');
                        return;
                    } else {//是新玩家，查看能否激励并继续向后
                        newCitizenIdLink = 'motivateCitizen.html?id=' + newCitizenId;
                        if (addElement(searchPlayer - index + 1, newCitizenIdLink, newCitizenId, name)) {//可以激励
                            loopMain2(index - 1, newCitizenId + 1, 2);
                        } else {//无法激励
                            loopMain2(index, newCitizenId + 1, 2);
                        }
                    }
                }
            }
        });
    }

    else
    {
        alert('阶段参数错误!');
        return;
    }
}

//原来的随机获取要激励玩家表
function getMotivationList() {
    //http://secura.e-sim.org/newCitizenStatistics.html
	$("#count_mot").text("获取最新公民中..");
    beginId = getNewCitizenId();
    var newCitizenId = parseInt(endId) + Math.round(Math.random() * (beginId - endId));
    loopMain(searchPlayer, newCitizenId);
}

//新加的按顺序获取要激励玩家表
function getMotivationList2() {
	$("#count_mot").text("获取最新公民中..");
    beginId = getNewCitizenId();
    randomID = parseInt(endId) + Math.round(Math.random() * (beginId - endId));
    loopMain2(searchPlayer, randomID, 0);
}

//建立新的激励界面
function createList() {
    var divTrain,
    divMotivationList,
    table1,
    table2,
    tbody1,
    tbody2,
    tableMotivationList,
    tr,
    td1,
    td2,
    h2,
    div,
    radio,
    btnMotivation;
    //divTrain = $("#container > .foundation-style > .testDivblue :first");
    divTrain = $("#trainReload");
    divMotivationList = $("<div class='testDivblue'></div>");
    divTrain.before(divMotivationList);
    table = $("<table></table>");
    divMotivationList.append(table);
    tr = $("<tr></tr>");
    table.append(tr);
    td1 = $("<td></td>");
    tr.append(td1);
    td2 = $("<td></td>");
    tr.append(td2);
    //table1 = $("<table></table>");
    //td1.after(table1);
    table2 = $("<table></table>");
    td2.append(table2);
    //div = $("<div style='height:290px; width:500px;'></div>");
    tableMotivationList = $("<table class='dataTable' style='cellspacing:1;height:80;width:500px;'></table>");
    tr = $("<tr></tr>");
    tr.append("<td style='width:200px;'>名字</td>");
    tr.append("<td>激励</td>");
    tr.append("<td><i class='icon-tank' style='color: #ccc; font-size: 1.25em; text-shadow: 0 0 0'></i></td>");
    tr.append("<td><i class='icon-bread' style='color: #ccc; font-size: 1.25em; text-shadow: 0 0 0'></i></td>");
    tr.append("<td><i class='icon-gift' style='color: #ccc; font-size: 1.25em; text-shadow: 0 0 0'></i></td>");

    td1.append(tableMotivationList);
    tableMotivationList.append(tr);
    for (var i = 1; i < 6; i++) {
        tr = $("<tr style='height:20'><td id='td" + i + "'></td><td></td><td></td><td></td><td></td></tr>");
        tableMotivationList.append(tr);
    }
    //div.append(tableMotivationList);
    //divMotivationList.append(div);
    //div =$("<div></div>");
    //divMotivationList.append(div);
    h2 = $("<h2 class='biggerFont' style='text-align:center'>激励物品</h2>");
    table2.append(h2);
    //table2.append("<br/>");
    radio = $("<INPUT TYPE='checkbox' id='motivationWep'>武器</INPUT>");
    table2.append(radio);
    radio = $("<INPUT TYPE='checkbox' id='motivationFood'>食物</INPUT>");
    table2.append(radio);
    radio = $("<INPUT TYPE='checkbox' id='motivationGift'>礼物</INPUT>");
    table2.append(radio);
    table2.append("<br/>");

    radio = $("<INPUT TYPE='checkbox' id='autoMo' check='checked'>自动激励</INPUT>");
    table2.append(radio);
    table2.append("<br/>");

    table2.append("<p style='margin-right:10px;' id='count_mot'>搜索进度 祝你能激励满5人:)</p>");

    btnMotivation = $("<input type='button' id='ud_mot' value='随机搜索玩家' style='width:160px;height:30px;font-size:14px;'></input> ");
    table2.append(btnMotivation);
    btnMotivation = $("<input type='button' id='ud_mot2' value='顺序搜索玩家' style='width:160px;height:30px;font-size:14px;'></input>");
    table2.append(btnMotivation);

    loadConfiguration();
    $('#motivationWep').click(function () {
        if ($(this).is(':checked')) {
            setValue('motivationWep', true);
        } else {
            setValue('motivationWep', false);
        }
    });
    $('#motivationFood').click(function () {
        if ($(this).is(':checked')) {
            setValue('motivationFood', true);
        } else {
            setValue('motivationFood', false);
        }
    });
    $('#motivationGift').click(function () {
        if ($(this).is(':checked')) {
            setValue('motivationGift', true);
        } else {
            setValue('motivationGift', false);
        }
    });

    $('#autoMo').click(function () {
        if ($(this).is(':checked')) {
            setValue('autoMo', true);
        } else {
            setValue('autoMo', false);
        }
    });

    $('#ud_mot').click(function () {
        if (($('#motivationWep').is(':checked')) || ($('#motivationFood').is(':checked')) || ($('#motivationGift').is(':checked'))) {
            if ($('#autoMo').is(':checked'))
            {
                done = true;//自动激励
            }
            getMotivationList();
        } else {
            alert('请选择激励物品');
        }
    });

    $('#ud_mot2').click(function () {
        if (($('#motivationWep').is(':checked')) || ($('#motivationFood').is(':checked')) || ($('#motivationGift').is(':checked'))) {
            if ($('#autoMo').is(':checked'))
            {
                done = true;//自动激励
            }
            getMotivationList2();
        } else {
            alert('请选择激励物品');
        }
    });

    // 加载选项和endID缓存
    function loadConfiguration() {
        $('#motivationWep').attr("checked", getValue('motivationWep') == 'true');
        $('#motivationFood').attr("checked", getValue('motivationFood') == 'true');
        $('#motivationGift').attr("checked", getValue('motivationGift') == 'true');
        $('#autoMo').attr("checked", getValue('autoMo') == 'true');
        endId = getValue('endId');
        if (endId === null) {
            endId = getNewCitizenId() - 1000;
            if (endId<=0) endId=0;
            setValue('endId', endId);
        }
    }

}

$(document).ready(function () {
    createList();
});
