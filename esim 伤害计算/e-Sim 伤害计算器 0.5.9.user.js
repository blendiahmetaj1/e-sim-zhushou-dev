// ==UserScript==
// @name           e-Sim 伤害计算器
// @version        0.5.9
// @namespace      esim
// @author         Heff (modified by cryst216, calin and zollow),0.5.8.1 by cristalfate
// @description    在玩家的个人页面显示他的潜在输出能力
// @match          http://*.e-sim.org/profile.html?id=*
// @match          https://*.e-sim.org/profile.html?id=*
// @require        http://cdn.e-sim.org/js/jquery-1.8.3.min.js
// ==/UserScript==

// 此版本为Exsper临时改版，如需最新版请向原作者索取
// 0.5.9 应对界面更改
// -----------------------------------------------------------------------------------------------
// 0.5.8.1 修正当查看Deus Ultimum军阶者装备加成时出现bug的问题
// 0.5.7 若军令场已结束则不显示
// 0.5.6 修复鼠标指向属性数值时无法显示悬浮窗的问题
// 0.5.5 适应新版本的界面
//增加各种语言版本正常显示爆发力。
//0.5.4 修正带有COMMUNITY_BUILDER不能计算的问题。

var isNewProfilePage = false;
if ($(".big-login").length>0) //新版profile界面
{
    isNewProfilePage = true;
}
main();
daysCalculator();



function main() {
    var des = '<div id="dmgCalc" class="testDivwhite" style=width:500px;">\
<table style="font-size:12px; width:100%;">\
<tr>\
<td>\
<table style="width:100%">\
<tr>\
<td>\
<b>\
Weapon:\
</b>\
</td>\
<td>\
<b>\
Region Building:\
</b>\
</td>\
<td>\
<b>\
Food:\
</b>\
</td>\
<td>\
<b>\
Gift:\
</b>\
</td>\
<td>\
<b>\
Health:\
</b>\
</td>\
</tr>\
<tr>\
<td>\
<select id="weaponQ" style="height:18px; padding:2px; font-size:12px">\
<option value="0.5">\
None\
</option>\
<option value="1.2" selected="selected">\
Q1\
</option>\
<option value="1.4">\
Q2\
</option>\
<option value="1.6">\
Q3\
</option>\
<option value="1.8">\
Q4\
</option>\
<option value="2.0">\
Q5\
</option>\
</select>\
</td>\
<td>\
<select id="buildingType" style="height:18px; padding:2px; font-size:12px">\
<option value="1">\
None\
</option>\
<option value="2">\
DS\
</option>\
<option value="3">\
Hosp.\
</option>\
</select>\
<select id="buildingQ" style="height:18px; padding:2px; font-size:12px">\
<option value="0">\
</option>\
<option value="1">\
Q1\
</option>\
<option value="2">\
Q2\
</option>\
<option value="3">\
Q3\
</option>\
<option value="4">\
Q4\
</option>\
<option value="5">\
Q5\
</option>\
</select>\
</td>\
<td>\
<input type="number" min="0" id="foodNum" value="20" style="position:relative; height:18px; top:-5px; max-width:36px; padding:2px; font-size:12px">\
</td>\
<td>\
<input type="number" min="0" id="giftNum" value="15" style="position:relative; height:18px; top:-5px; max-width:36px; padding:2px; font-size:12px">\
</td>\
<td>\
<input type="number" min="0" max="100" step="10" id="healthNum" value="100" style="position:relative; height:18px; top:-5px; max-width:40px; padding:2px; font-size:12px">\
</td>\
</tr>\
</table>\
<table style="white-space:nowrap; width:100%">\
<tr>\
<td>\
<div class="statsLabel smallStatsLabel greenLabel" style="width:100%" title="Bunker / Sewer guide Buff">\
<b>\
Core:\
</b>\
<input type="checkbox" id="swrbunkBonus" value="1.25">\
</div>\
</td>\
<td>\
<div class="statsLabel smallStatsLabel greenLabel" style="width:100%" title="Tank Buff">\
<b>\
Tank:\
</b>\
<input type="checkbox" id="tankBonus" value="1.2">\
</div>\
</td>\
<td>\
<div class="statsLabel smallStatsLabel greenLabel" style="width:100%" title="Steroid Buff">\
<b>\
Steroid:\
</b>\
<input type="checkbox" id="steroidBonus" value="1.2">\
</div>\
</td>\
<td>\
<div class="statsLabel smallStatsLabel greenLabel" style="width:100%" title="Location region Buff">\
<b>\
Region:\
</b>\
<input type="checkbox" id="regionBonus" value="1.2" checked="checked">\
</div>\
</td>\
<td>\
<div class="statsLabel smallStatsLabel greenLabel" style="width:100%" title="Military unit order Buff">\
<b>\
MU:\
</b>\
<input type="checkbox" id="muBonus" value="1" checked="checked">\
</div>\
</td>\
</tr>\
<tr>\
<td>\
<div class="statsLabel smallStatsLabel redLabel" style="width:100%" title="Bunker / Sewer guide Debuff">\
<b>\
Core:\
</b>\
<input type="checkbox" id="swrbunkDebuff" value="0.8">\
</div>\
</td>\
<td>\
<div class="statsLabel smallStatsLabel redLabel" style="width:100%" title="Tank Debuff">\
<b>\
Tank:\
</b>\
<input type="checkbox" id="tankDebuff" value="1">\
</div>\
</td>\
<td>\
<div class="statsLabel smallStatsLabel redLabel" style="width:100%" title="Steroid Debuff">\
<b>\
Steroid:\
</b>\
<input type="checkbox" id="steroidDebuff" value="0.8">\
</div>\
</td>\
<td colspan="2">\
<div class="statsLabel smallStatsLabel redLabel" style="width:100%" title="Surrounded Debuff - If no route to core regions.">\
<b>\
Surrounded:\
</b>\
<input type="checkbox" id="surroundDebuff" value="0.8">\
</div>\
</td>\
</tr>\
<tr>\
<td>\
<div class="statsLabel smallStatsLabel greenLabel" style="width:100%" title="Pain Dealer Buff - Doubles the Critical hit chance.">\
<b>\
Pain:\
</b>\
<input type="checkbox" id="painDealerBonus" value="2">\
</div>\
</td>\
<td colspan="4">\
<div id="muOrder" class="statsLabel smallStatsLabel blueLabel" style="width:100%; position:relative; margin:0px auto">\
Loading...\
</div>\
</td>\
</tr>\
</table>\
</td>\
<td>\
<div>\
<table style="width:100%;"> \
<tr title="最小伤害"> \
<td style="text-align:left;">5<img style="width:13px; height:13px;" src="//cdn.e-sim.org/img/productIcons/Weapon.png">MIN:</td> \
<td> \
<div class="help equipmentBlueBox" style="position:relative; width:100%; margin:0;">\
<b id="estBerserkMin">0</b>\
</div>\
</td> \
</tr> \
<tr title="最大暴击伤害"> \
<td style="text-align:left;">5<img style="width:13px; height:13px;" src="//cdn.e-sim.org/img/productIcons/Weapon.png">MAX:</td> \
<td> \
<div class="help equipmentBlueBox" style="position:relative; width:100%; margin:0;">\
<b id="estBerserkMax">0</b>\
</div>\
</td> \
</tr> \
<tr title="考虑了暴击率的平均伤害"> \
<td style="text-align:left;">5<img style="width:13px; height:13px;" src="//cdn.e-sim.org/img/productIcons/Weapon.png">AVG:</td> \
<td> \
<div class="help equipmentBlueBox" style="position:relative; width:100%; margin:0;">\
<b id="estBerserkAvg">0</b>\
</div>\
</td> \
</tr> \
</table>\
</div>\
<div>\
<b>Damage </b>\
(\
<b id="estTimes">0</b>\
<img style="width:13px; height:13px;" src="//cdn.e-sim.org/img/productIcons/Weapon.png">\
) \
<br>\
<div class="help equipmentBlueBox" style="position:relative; width:100%; margin:2px;">\
<b id="estTotal">0</b>\
</div>\
</div>\
<div>\
<b>Today </b>\
(\
<b id="percentage">0</b>\
%) \
<br>\
<div class="help equipmentBlueBox" style="position:relative; width:100%; margin:2px;">\
<b id="dmgToday">0</b>\
</div>\
</div>\
</td>\
</tr>\
</table>\
</div>';
    $.fn.exists =
        function () {
        return this.length !== 0;
    };
    $("#profileEquipmentNew").parent().after(des);
    var dmgToday = 0;
    var totalDamage = 1;
    var minDmg = parseInt($("#hitHelp b:first").text().replace(",", ""));
    var maxDmg = parseInt($("#hitHelp b:last").text().replace(",", ""));
    // var crit = $("#criticalHelp .equipmentStats:first").text();
    var crit = $("#criticalHelp").text();
    crit = parseFloat(crit.replace("%", "")) / 100;
    // var miss = $("#missHelp .equipmentStats:first").text();
    var miss = $("#missHelp").text();
    miss = parseFloat(miss.replace("%", "")) / 100;
    // var avoid = $("#avoidHelp .equipmentStats:first").text();
    var avoid = $("#avoidHelp").text();
    avoid = parseFloat(avoid.replace("%", "")) / 100;

    // equipment score
    var strength;
    var rankModifier;
    if (isNewProfilePage === false)
    {
        strength = parseInt($('table.smallTableFont > tbody > tr:eq(4) > td:eq(1)').text());
        rankModifier = parseInt($('.smallTableFont:first .smallStatsLabel:eq(2)').text().replace(/,/g, ""));
    }
    else
    {
        strength = parseInt($('div.rank :eq(0)').parent().children('div.profile-row:eq(4)').children("span.data").text());
        rankModifier = parseInt($('div.rank :eq(0)').parent().children('div.profile-row:eq(2)').children("span.data").text().replace(/,/g, ""));
    }
    var a = [{"damageRequired":0,"name":"Rookie","damageModifier":1},{"damageRequired":250,"name":"Private","damageModifier":1.1},{"damageRequired":1000,"name":"Private First Class","damageModifier":1.2},{"damageRequired":3000,"name":"Corporal","damageModifier":1.3},{"damageRequired":5000,"name":"Sergeant","damageModifier":1.4},{"damageRequired":10000,"name":"Staff Sergeant","damageModifier":1.5},{"damageRequired":30000,"name":"Sergeant First Class","damageModifier":1.6},{"damageRequired":60000,"name":"Master Sergeant","damageModifier":1.65},{"damageRequired":100000,"name":"First Sergeant","damageModifier":1.7},{"damageRequired":250000,"name":"Sergeant Major","damageModifier":1.75},{"damageRequired":500000,"name":"Command Sergeant Major","damageModifier":1.8},{"damageRequired":750000,"name":"Sergeant Major of the Army","damageModifier":1.85},{"damageRequired":1000000,"name":"Second Lieutenant","damageModifier":1.9},{"damageRequired":1500000,"name":"First Lieutenant","damageModifier":1.93},{"damageRequired":2500000,"name":"Captain","damageModifier":1.96},{"damageRequired":5000000,"name":"Major","damageModifier":2},{"damageRequired":10000000,"name":"Lieutenant Colonel","damageModifier":2.03},{"damageRequired":17000000,"name":"Colonel","damageModifier":2.06},{"damageRequired":25000000,"name":"Brigadier General","damageModifier":2.1},{"damageRequired":35000000,"name":"Major General","damageModifier":2.13},{"damageRequired":45000000,"name":"Lieutenant General","damageModifier":2.16},{"damageRequired":60000000,"name":"General","damageModifier":2.19},{"damageRequired":80000000,"name":"General of the Army","damageModifier":2.21},{"damageRequired":100000000,"name":"Marshall","damageModifier":2.24},{"damageRequired":125000000,"name":"Field Marshall","damageModifier":2.27},{"damageRequired":175000000,"name":"Supreme Marshall","damageModifier":2.3},{"damageRequired":250000000,"name":"Generalissimus","damageModifier":2.33},{"damageRequired":400000000,"name":"Supreme Generalissimuss","damageModifier":2.36},{"damageRequired":600000000,"name":"Imperial Generalissimus","damageModifier":2.4},{"damageRequired":800000000,"name":"Legendary Generalissimuss","damageModifier":2.42},{"damageRequired":1000000000,"name":"Imperator","damageModifier":2.44},{"damageRequired":1500000000,"name":"Imperator Caesar","damageModifier":2.46},{"damageRequired":2500000000,"name":"Deus Dimidiam","damageModifier":2.48},{"damageRequired":5000000000,"name":"Deus","damageModifier":2.5},{"damageRequired":7500000000,"name":"Summi Deus","damageModifier":2.52},{"damageRequired":10000000000,"name":"Deus Imperialis","damageModifier":2.54},{"damageRequired":15000000000,"name":"Deus Fabuloso","damageModifier":2.56},{"damageRequired":20000000000,"name":"Deus Ultimum","damageModifier":2.58}];
    for (var i=0; i<a.length; ++i) {
        if (a[i]['damageRequired'] > rankModifier) {
            rankModifier = a[i-1]['damageModifier'];
            break;
        }
        /*if (a[i]['name'] == rankModifier.text()) {
            rankModifier = a[i]['damageModifier'];
            break;
        }*/
    }
    if (a[a.length-1]['damageRequired'] <= rankModifier) {
            rankModifier = a[a.length-1]['damageModifier'];
        }
    
    // $('div.eqStats > b').after('<span><b title="与无装备状态相比">总伤害+<b id="score1">0</b>%</b> <b title="与无装备状态相比，且不考虑闪避属性(avoid)">爆发力+<b id="score2">0</b>%</b></span>');
    $("#eqStatsTable").append('<tr><td style="padding:0 12px 0 12px;background-color:rgba(240,60,0,0.2);border-radius:10px 10px 0 0;"><b title="与无装备状态相比">总伤害 +<b id="score1">0</b>%</b></td></tr>');
    $("#eqStatsTable").append('<tr><td style="background-color:rgba(40,100,140,0.2);border-radius:0 0 10px 10px;padding:2px 0 2px 0;"><b title="与无装备状态相比，且不考虑闪避属性(avoid)">爆发力 +<b id="score2">0</b>%</b></span></td></tr>');

    var jsonDmg = $.getJSON("apiCitizenById.html?id=" + findUrlObj().id).done(function (data) {
        dmgToday = data.damageToday;
        $("#dmgToday").html(formatNumber(dmgToday));
        $("#percentage").html(Math.round(dmgToday * 100 / totalDamage));
        calc();
    });
    var muValue = 1.2;
    //if ($('.testDivblue > a[href^="militaryUnit.html?id="]').exists()) {
    if (($('.testDivblue > a[href^="militaryUnit.html?id="]').exists() && isNewProfilePage === false) || ($('a[href^="militaryUnit.html?id="]').exists() && isNewProfilePage === true)) {
        var muID;
        if (isNewProfilePage === false)
        {
            muID = $('.testDivblue > a[href^="militaryUnit.html?id="]:first').attr("href").split("?id=").pop();
        }
        else
        {
            muID = $('a[href^="militaryUnit.html?id="]:first').attr("href").split("?id=").pop();
        }
        var json = $.getJSON("apiMilitaryUnitById.html?id=" +
                             muID).done(function (data) {
            switch (data.militaryUnitType) {
                case "Novice":
                    muValue = 1.05;
                    break;
                case "Regular":
                    muValue = 1.1;
                    break;
                case "Veteran":
                    muValue = 1.15;
                    break;
                case "Elite":
                    muValue = 1.2;
                    break;
            }
            calc();
        });
        setTimeout(function () {
            order(muID);
        }, 200);
    } else {
        $("#muOrder").html("No military unit.");
        $("#muBonus").attr("checked", false);
        muValue = 1;
    }

    function order(muID) {
        $.ajax({
            url: "militaryUnit.html?id=" + muID,
            success: function (data) {
                var flag, order = $(data).find(".battleDiv:first > div:eq(3) a[href^='battle.html?id=']:first");
                var flagNumber = $('.battleDiv:first .flags-medium', data).length;
                if (0 < order.length && flagNumber === 2) { // 有军令和2个旗子 (3个旗子表示战斗已结束)
                    flag = $(data).find(".battleDiv:first").parent().parent().find(".flags-medium:last");
                    if (0 < flag.length)
                        $("#muOrder").html("<a target='_blank' href='" + order.attr("href") + "'>" + order.text() + "</a> , <div class='" + flag.attr("class").replace(/medium/g, "small") + "'></div> side.");
                }
                else {
                    $("#muOrder").html("None.");
                    $("#muBonus").attr("checked", false);
                    calc();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#muOrder").html("Failed, try again...");
                console.log("!Error - errorThrown:" + errorThrown + "; jqXHR:" + jqXHR);
                setTimeout(function () {
                    $("#muOrder").html("Loading...");
                    order(muID);
                }, 2E3);
            }
        });
    }

    function init() {
        cssSetDisabled("#tankBonus");
        $("#tankBonus").prop("disabled", true);
        $("#buildingQ").prop("disabled", true);
        var element;
        if (isNewProfilePage === false)
        {
            element = $(".testDivblue:has('.bigAvatar') .smallhelp");
        }
        else
        {
            element = $(".profile-data:has('.bigAvatar') .smallhelp");
        }
        for (var j = 0; j < element.length; j++) {
            //排除掉头像上面的COMMUNITY等章
            var buffSrc = element.eq(j).attr("src");
            if (typeof(buffSrc) == "undefined") {
                continue;
            }

            var buff = buffSrc.match(/(steroids|tank|spa|vacations|bunker|resistance|painDealer1h|painDealer10h|painDealer25h)\_(positive|negative)/ig);

            switch (buff[0]) {
                case "painDealer10h_positive":
                case "painDealer1h_positive":
                case "painDealer25h_positive":
                    $("#painDealerBonus").attr("checked", true);
                    break;
                case "vacations_positive":
                    $("#foodNum").val("25");
                    break;
                case "vacations_negative":
                    $("#foodNum").val("0");
                    break;
                case "spa_positive":
                    $("#giftNum").val("25");
                    break;
                case "spa_negative":
                    $("#giftNum").val("0");
                    break;
                case "steroids_positive":
                    cssSetEnabled("#steroidBonus");
                    $("#steroidBonus").prop("disabled", false);
                    $("#steroidBonus").attr("checked", true);
                    cssSetDisabled("#steroidDebuff");
                    $("#steroidDebuff").prop("disabled", true);
                    $("#steroidDebuff").attr("checked", false);
                    break;
                case "steroids_negative":
                    cssSetEnabled("#steroidDebuff");
                    $("#steroidDebuff").prop("disabled",
                                             false);
                    $("#steroidDebuff").attr("checked", true);
                    cssSetDisabled("#steroidBonus");
                    $("#steroidBonus").prop("disabled", true);
                    $("#steroidBonus").attr("checked", false);
                    break;
                case "tank_positive":
                    cssSetDisabled("#tankDebuff");
                    $("#tankDebuff").prop("disabled", true);
                    $("#tankDebuff").attr("checked", false);
                    cssSetEnabled("#tankBonus");
                    $("#tankBonus").prop("disabled", false);
                    $("#tankBonus").attr("checked", true);
                    $("#weaponQ").val("2.0");
                    break;
                case "tank_negative":
                    cssSetEnabled("#tankDebuff");
                    $("#tankDebuff").prop("disabled",
                                          false);
                    $("#tankDebuff").attr("checked", true);
                    cssSetDisabled("#tankBonus");
                    $("#tankBonus").prop("disabled", true);
                    $("#weaponQ").prop("disabled", true);
                    $("#weaponQ").val("0.5");
                    break;
                case "bunker_positive":
                case "resistance_positive":
                    if ($("#swrbunkDebuff").is(":checked")) {
                        $("#swrbunkDebuff").attr("checked", false);
                        cssSetEnabled("#swrbunkBonus");
                        $("#swrbunkBonus").prop("disabled", false);
                    } else {
                        $("#swrbunkBonus").attr("checked", true);
                        cssSetDisabled("#swrbunkDebuff");
                        $("#swrbunkDebuff").prop("disabled", true);
                        cssSetDisabled("#surroundDebuff");
                        $("#surroundDebuff").prop("disabled", true);
                    }
                    break;
                case "bunker_negative":
                case "resistance_negative":
                    if ($("#swrbunkBonus").is(":checked")) {
                        $("#swrbunkBonus").attr("checked", false);
                        cssSetEnabled("#swrbunkDebuff");
                        $("#swrbunkDebuff").prop("disabled", false);
                        cssSetEnabled("#surroundDebuff");
                        $("#surroundDebuff").prop("disabled", false);
                    } else {
                        $("#swrbunkDebuff").attr("checked", true);
                        cssSetDisabled("#swrbunkBonus");
                        $("#swrbunkBonus").prop("disabled", true);
                    }
                    break;
                default:
                    break;
            }
        }
        calc();
    }

    function calc() {
        var modified_crit;
        var factor = parseFloat($("#weaponQ").val());
        if ($("#buildingType").val() == 2) factor = factor * (1 + parseInt($("#buildingQ").val()) * 0.05);
        if ($("#painDealerBonus").is(":checked")) {
            modified_crit = crit * 2;
            if (modified_crit > 0.8) 
                modified_crit = 0.8;
        } 
        else 
            modified_crit = crit; 
        if ($("#steroidBonus").is(":checked")) 
            factor = factor * 1.2;
        else if ($("#steroidDebuff").is(":checked")) 
            factor = factor * 0.8;
        if ($("#tankBonus").is(":checked")) factor = factor * 1.2;
        if ($("#swrbunkBonus").is(":checked")) factor = factor * 1.25;
        else if ($("#swrbunkDebuff").is(":checked")) factor = factor * 0.8;
        if ($("#muBonus").is(":checked")) factor = factor * muValue;
        if ($("#regionBonus").is(":checked")) factor = factor * 1.2;
        if ($("#surroundDebuff").is(":checked")) factor = factor * 0.8;
        var minHit = Math.round(minDmg * factor * 5);
        var maxHit = Math.round(maxDmg * factor * 5);
        var hit = (minHit + maxHit) * (1 + modified_crit)/ 10;
        $("#estBerserkMin").html(formatNumber(minHit));
        $("#estBerserkMax").html(formatNumber(maxHit*2));
        $("#estBerserkAvg").html(formatNumber(Math.round(hit*5)));
        var totalHealth = parseFloat($("#healthNum").val());
        totalHealth += parseInt($("#foodNum").val()) * 50;
        totalHealth += parseInt($("#giftNum").val()) * 50;
        var healthPerHit = 10;
        if ($("#buildingType").val() == 3) healthPerHit -= parseInt($("#buildingQ").val()) * 0.5;
        var totalHits = Math.floor(totalHealth / healthPerHit);
        totalHits = totalHits * (1 - miss) / (1 - avoid);
        totalDamage = totalHits * hit;
        $("#estTimes").html(Math.round(totalHits));
        $("#estTotal").html(formatNumber(Math.round(totalDamage)));
        $("#percentage").html(Math.round(dmgToday * 100 / totalDamage));

        // equipment score
        score2 = ((minDmg+maxDmg)/2*(1 + modified_crit)*(1-miss)) / (strength*rankModifier*1.125*0.875);
        score2 = score2<1 ? 1 : score2;
        score1 = score2 * 0.95 / (1-avoid);
        $('#score1').text( ((score1-1)*100).toFixed(2) );
        $('#score2').text( ((score2-1)*100).toFixed(2) );
    }

    function cssSetDisabled(item) {
        $(item).parent().css("background-color",
                             "rgb(219, 219, 219)");
        $(item).parent().css("border", "1px solid rgba(0, 0, 0, 0.7)");
        $(item).parent().css("box-shadow", "0 0 5px rgba(0, 0, 0, 0.5), 0 -12px 12px rgba(144, 169, 1156, 0.2) inset");
        $(item).parent().css("webkit-box-shadow", "0 0 5px rgba(0, 0, 0, 0.5), 0 -12px 12px rgba(144, 169, 1156, 0.2) inset");
    }

    function cssSetEnabled(item) {
        $(item).parent().removeAttr("style");
        $(item).parent().attr("style", "width:100%;");
    }

    function formatNumber(Num) {
        Num += "";
        var arr = Num.split(".");
        var re = /(\d{1,3})(?=(\d{3})+$)/g;
        return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
    }

    function findUrlObj() {
        var a = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (d, b, c) {
            a[b] = c;
        });
        return a;
    }

    init();

    $("#weaponQ").change(function () {
        if ($("#weaponQ").val() != 2) {
            cssSetDisabled("#tankBonus");
            $("#tankBonus").prop("disabled", true);
            if ($("#tankBonus").is(":checked")) {
                $("#tankBonus").attr("checked", false);
                cssSetEnabled("#tankDebuff");
                $("#tankDebuff").prop("disabled", false);
            }
        } else {
            cssSetEnabled("#tankBonus");
            $("#tankBonus").prop("disabled",false);
        }
        calc();
    });
    $("#buildingType").change(function () {
        if ($("#buildingType").val() == 1) {
            $("#buildingQ").prop("disabled", true);
            $("#buildingQ").val("0");
        } else $("#buildingQ").prop("disabled", false);
        calc();
    });
    $("#buildingQ").change(function () {
        calc();
    });
    $("#foodNum").change(function () {
        if (parseInt($("#foodNum").val()) < 0) $("#foodNum").val("0");
        calc();
    });
    $("#giftNum").change(function () {
        if (parseInt($("#giftNum").val()) < 0) $("#giftNum").val("0");
        calc();
    });
    $("#healthNum").change(function () {
        if (parseFloat($("#healthNum").val()) <
            0) $("#healthNum").val("0.0");
        else if (parseFloat($("#healthNum").val()) > 100) $("#healthNum").val("100.0");
        calc();
    });
    $("#regionBonus").change(function () {
        calc();
    });
    $("#muBonus").change(function () {
        calc();
    });
    $("#swrbunkBonus").change(function () {
        if ($("#swrbunkBonus").is(":checked")) {
            cssSetDisabled("#swrbunkDebuff");
            $("#swrbunkDebuff").prop("disabled", true);
            cssSetDisabled("#surroundDebuff");
            $("#surroundDebuff").prop("disabled", true);
        } else {
            cssSetEnabled("#swrbunkDebuff");
            $("#swrbunkDebuff").prop("disabled", false);
            cssSetEnabled("#surroundDebuff");
            $("#surroundDebuff").prop("disabled", false);
        }
        calc();
    });
    $("#tankBonus").change(function () {
        if ($("#tankBonus").is(":checked")) {
            cssSetDisabled("#tankDebuff");
            $("#tankDebuff").prop("disabled", true);
        } else {
            cssSetEnabled("#tankDebuff");
            $("#tankDebuff").prop("disabled", false);
        }
        calc();
    });
    $("#steroidBonus").change(function () {
        if ($("#steroidBonus").is(":checked")) {
            cssSetDisabled("#steroidDebuff");
            $("#steroidDebuff").prop("disabled", true);
        } else {
            cssSetEnabled("#steroidDebuff");
            $("#steroidDebuff").prop("disabled", false);
        }
        calc();
    });
    $("#surroundDebuff").change(function () {
        if ($("#surroundDebuff").is(":checked")) {
            cssSetDisabled("#swrbunkBonus");
            $("#swrbunkBonus").prop("disabled", true);
        } else if (!$("#swrbunkDebuff").is(":checked")) {
            cssSetEnabled("#swrbunkBonus");
            $("#swrbunkBonus").prop("disabled", false);
        }
        calc();
    });
    $("#swrbunkDebuff").change(function () {
        if ($("#swrbunkDebuff").is(":checked")) {
            cssSetDisabled("#swrbunkBonus");
            $("#swrbunkBonus").prop("disabled", true);
        } else if (!$("#surroundDebuff").is(":checked")) {
            cssSetEnabled("#swrbunkBonus");
            $("#swrbunkBonus").prop("disabled", false);
        }
        calc();
    });
    $("#tankDebuff").change(function () {
        if ($("#tankDebuff").is(":checked")) {
            cssSetDisabled("#tankBonus");
            $("#weaponQ").prop("disabled", true);
            $("#tankBonus").prop("disabled", true);
            $("#weaponQ").val("0.5");
        } else $("#weaponQ").prop("disabled", false);
        calc();
    });
    $("#steroidDebuff").change(function () {
        if ($("#steroidDebuff").is(":checked")) {
            cssSetDisabled("#steroidBonus");
            $("#steroidBonus").prop("disabled", true);
        } else {
            cssSetEnabled("#steroidBonus");
            $("#steroidBonus").prop("disabled", false);
        }
        calc();
    });
    $("#painDealerBonus").change(function () {
        calc();
    });
}

function daysCalculator() {
    // economic skill
    var economicSkill;
    if (isNewProfilePage === false)
    {
        economicSkill = $('.smallTableFont:first .smallStatsLabel:eq(3)');
    }
    else
    {
        economicSkill = $('div.rank :eq(0)').parent().children('div.profile-row:eq(3)').children("span.data");
    }
    var s = parseFloat(economicSkill.text());
    if (s <= 8) {
        var ip = parseInt(s);
        var coefficient = Math.pow(2, ip - 1);
        var d = coefficient - 1 + (s - ip) * coefficient;
    } else {
        var coefficient = 64;
        var d = 127 + (s - 8) * coefficient;
    }
    economicSkill.html(economicSkill.html() + '(' + d + ')');

    // strength
    var strength;
    if (isNewProfilePage === false)
    {
        strength = $('.smallTableFont:first .smallStatsLabel:eq(4)');
    }
    else
    {
        strength = $('div.rank :eq(0)').parent().children('div.profile-row:eq(4)').children("span.data");
    }
    var s = strength.text();
    var d = 0;
    if (s <= 500)
        d = (s - 100) / 100;
    else
        if (s <= 1000)
            d = 4 + (s - 500) / 50;
    else
        if (s <= 1500)
            d = 14 + (s - 1000) / 25;
    else
        if (s <= 1800)
            d = 34 + (s - 1500) / 10;
    else
        if (s <= 2100)
            d = 64 + (s - 1800) / 5;
    else
        if (s <= 2250)
            d = 124 + (s - 2100) / 2;
    else
        d = 199 + (s - 2250);
    strength.html(strength.html() + '(' + parseInt(d) + ')');

    // age
    var birthday;
    if (isNewProfilePage === false)
    {
        birthday = $('.smallTableFont:first .smallStatsLabel:eq(7)');
    }
    else
    {
        birthday = $('div.rank :eq(0)').parent().children('div.profile-row:eq(7)').children("span.data");
    }
    var age = parseInt($('#time2 ~ b').text().split(' ')[1]) - parseInt(birthday.text().split(' ')[1]) + 1;
    birthday.html(birthday.html() + '(' + age + '天)');
}
