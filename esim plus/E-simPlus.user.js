// ==UserScript==
// @name         E-simPlus
// @namespace    https://coding.net/u/Exsper/p/EsimPlus/
// @supportURL   http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=dQYBFAcZHBIdARANBgUQBzUTGg0YFBwZWxYaGA
// @version      0.1
// @description  E-sim辅助脚本
// @author       Exsper
// @include      http*://*.e-sim.org/*
// @require      http://cdn.e-sim.org/js/jquery-1.8.3.min.js
// @icon         https://puu.sh/zMUhq/16be61e635.gif
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        unsafewindow
// @run-at       document-start
// ==/UserScript==

/* jshint esversion: 8*/
/*

**      ______                   _____
**     / ____/          _       / ___ \__
**    / /______________(_)___  / /__/ / /_  _______
**   / ____/_____/ ___/ /    \/ _____/ / / / / ___/
**  / /___      (__  ) / / / / /    / / /_/ (__  )
** /_____/     /____/_/_/_/_/_/    /__\__,_/____/
**                                                 by Exsper
**
**                   集过往千次试验之大成 汇当今百家脚本之精华

*/

// 编辑用，保存前请删除
var $=unsafeWindow.$;

function log(t)
{
    console.log(t);
}

////////////////////////////////////////////////////////////////////////////////////////全局变量////////////////////////////////////////////////////////////////////////////////////////

options = { // 自定义设置
    // 脚本相关
    script: {
        version: 0.1, // 存储的版本，用于比对版本更新
        firstUse: true, // 首次使用
        lang: 0, // 0:简体中文 1:繁體中文 2:English
        slowNetworkMode: false, // 慢网速模式，部分页面数据不会主动更新
        apiCountries: "", // apiCountries字符串
        apiCountriesEpoch: -1, // apiCountries获取时间
        apiRegions: "", // apiRegions字符串
        apiRegionsEpoch: -1, // apiRegions获取时间
        apiMap: "", // apiMap字符串
        apiMapEpoch: -1, // apiMap获取时间
        countryIds: [] // 国家ID列表，用于做国家选择
    },
    // 等待网页加载
    waitForWebPageComplete: {
        maxWaitCount: 50,
        waitInterval: 500
    }
};
countryInfo = {}; // 国家信息，可以ID/Name/FlagName/CurrencyName索引
regionInfo = {}; // 地区信息，可以用ID索引
citizenInfo = {}; // 玩家信息，可以用ID索引
muInfo = {}; // 军团信息，可以用ID索引
apiRanks = {}; // 军衔等级信息，可以用name索引 rankModifier = apiRanks[rankString].damageModifier;
// 合并用Object.assign，如果不是对象必须先转化为对象

// 全局变量获取/设置 设置方法： option("script").version = 0.1
function option(key, value) {
    var obj = window.options || {};
    if (key === undefined && value === undefined) { return obj; }
    else if (value === undefined) { return obj[key]; }
    else { obj[key] = value; window.options = obj; }
}

// 将保存的存档覆盖掉全局变量
function setOptions(data) {
    // 判断版本
    var nowVersion = option("script").version;
    var dataVersion = data.script.version;
    if (dataVersion == nowVersion) {
        // 版本相同，直接覆盖
        Object.assign(options,data);
    }
    else if (dataVersion < nowVersion) {
        console.log("存档版本有更新，正在尝试读取旧存档。如果出现问题请清除脚本的所有设置。");
        // 尝试录入存档，这里不能直接覆盖，避免因新版存档有更改导致存档损坏
        // 遍历options
        Reflect.ownKeys(options).forEach(function(key){
            // 判断类型
            if (data[key] !== undefined ) {
                if(Object.prototype.toString.call(options[key]) === "[object Object]"){
                    // 二层
                    Reflect.ownKeys(options[key]).forEach(function(key2){
                        if (data[key][key2] !== undefined ) options[key][key2] = data[key][key2];
                    });
                }
                else
                    options[key] = data[key];
            }
        });
        // 存档版本号设为当前版本
        option("script").version = nowVersion;
    }
    else {
        console.log("存档版本高于脚本版本，当前脚本可能已经过期。如果出现问题请清除脚本的所有设置");
        if (confirm("存档版本高于脚本版本，当前脚本可能已经过期。点击“确认”继续读取存档，但可能会造成部分存档丢失。如果使用中出现问题请清除脚本的所有设置。")) {
            // 尝试录入存档，这里不能直接覆盖，避免因新版存档有更改导致存档损坏
            // 遍历options
            Reflect.ownKeys(options).forEach(function(key){
                if (data[key] !== undefined ) {
                    // 判断类型
                    if(Object.prototype.toString.call(options[key]) === "[object Object]"){
                        // 二层
                        Reflect.ownKeys(options[key]).forEach(function(key2){
                            if (data[key][key2] !== undefined ) options[key][key2] = data[key][key2];
                        });
                    }
                    else
                        options[key] = data[key];
                }
            });
            // 存档版本号设为当前版本
            option("script").version = nowVersion;
        }
    }
}


// 脚本添加元素class，所有后添加元素全部需要该class以便截图时统一隐藏
var scriptElementsClass = "EP-SEC";

////////////////////////////////////////////////////////////////////////////////////////END 全局变量////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////存储数据////////////////////////////////////////////////////////////////////////////////////////

var storagePrefix = "EP-";

function setValue(item, value) { // 储存数据
    localStorage[storagePrefix + item] = (typeof value === "string") ? value : JSON.stringify(value);
}

function getValue(item, toJSON) { // 读取数据
    item = storagePrefix + item;
    return (item in localStorage) ? ((toJSON) ? JSON.parse(localStorage[item]) : localStorage[item]) : null;
}

function delValue(item) { // 删除数据
  if (typeof item === "string") {
      localStorage.removeItem(storagePrefix + item);
  } else if (typeof item === "number") {
    if (item === 0) { // 对存储设置的特殊操作
        // 删除所有存档
        delValue("options");
        delValue("countryInfo");
        delValue("regionInfo");
        delValue("citizenInfo");
        delValue("muInfo");
        delValue("apiRanks");
    }
  }
}

// 读取存档
function loadStorage() {
    var o = getValue("options", true); if (!!o) setOptions(o);
    var c = getValue("countryInfo", true); if (!!c) countryInfo = c;
    var r = getValue("regionInfo", true); if (!!r) regionInfo = r;
    var p = getValue("citizenInfo", true); if (!!p) citizenInfo = p;
    var m = getValue("muInfo", true); if (!!m) muInfo = m;
    var a = getValue("apiRanks", true); if (!!a) apiRanks = a;
}

//保存存档
function saveStorage() {
    setValue("options",options);
    setValue("countryInfo",countryInfo);
    setValue("regionInfo",regionInfo);
    setValue("citizenInfo",citizenInfo);
    setValue("muInfo",muInfo);
    setValue("apiRanks",apiRanks);
}

////////////////////////////////////////////////////////////////////////////////////////END 存储数据////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////公共函数////////////////////////////////////////////////////////////////////////////////////////

// 获取网址参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return unescape(r[2]); return null;
}


// 从国旗class获取国家名称（多个单词中间以-连接）
// (fightFlagDefender/fightFlagAttacker fightFlag) xflagsBig xflagsBig-Bosnia-and-Herzegovina -> Bosnia and Herzegovina
// xflagsMedium xflagsMedium-Bosnia-and-Herzegovina -> Bosnia and Herzegovina
// xflagsSmall xflagsSmall-Bosnia-and-Herzegovina -> Bosnia and Herzegovina
// fightFlagDefender fightFlag xflagsBig xflagsBig-Bosnia-and-Herzegovina
// (fightFlagDefender/fightFlagAttacker fightFlag) flags-big Bosnia-and-Herzegovina -> Bosnia and Herzegovina
// (fightFlag) flags-medium Bosnia-and-Herzegovina -> Bosnia and Herzegovina
// flags-small Bosnia-and-Herzegovina -> Bosnia and Herzegovina
function getCountryNameFormFlag(flagsclass) {
    try {
        if (flagsclass.indexOf("xflags")<0) // flags-(size) coun-try-Name
            return flagsclass.split(" ").pop().replace(/-/g, " ");
        else { // xflags(size) coun-try-Name
            var t = flagsclass.split(" ").pop();
            return t.substring(t.indexOf("-")+1).replace(/-/g, " ");
        }
    }
    catch(err) {
        console.log(err);
        return "未知";
    }
}

// 时间戳间隔转为字符串
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

// 输出逗号分隔位数字
function formatNumber(Num) {
    Num += "";
    var arr = Num.split(".");
    var re = /(\d{1,3})(?=(\d{3})+$)/g;
    return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
}

////////////////////////////////////////////////////////////////////////////////////////END 公共函数////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////API////////////////////////////////////////////////////////////////////////////////////////

// 通用API模板
function API_getAPI(url, callback, notRetry) {
    $.ajax({
        url: url,
        success: function(data) {
            console.log(url, "获取成功");
            var info = JSON.parse(data);
            if (typeof(callback) === "function") callback(info);
            else console.log(callback, "不是一个function");
            return;
        },
        error: function(xhr,textStatus) {
            if (notRetry == true) {
                console.log(url, "获取错误 (", textStatus, ")");
                return;
            }
            else {
                console.log(url, "获取错误 (", textStatus, ")，重新获取");
                $.ajax(this);
            }
        }
    });
}

// apiCountries.html 国家API
function API_apiCountries(callback, notRetry) {
    return API_getAPI("apiCountries.html", callback, notRetry);
}

// apiRegions.html 地区API
function API_apiRegions(callback, notRetry) {
    return API_getAPI("apiRegions.html", callback, notRetry);
}

// apiMap.html 地图API
function API_apiMap(callback, notRetry) {
    return API_getAPI("apiMap.html", callback, notRetry);
}

// apiCitizenById 玩家API(ID)
function API_apiCitizenById(citizenId, callback, notRetry) {
    var url = "apiCitizenById.html?id="+citizenId;
    return API_getAPI(url, callback, notRetry);
}

// apiCitizenByName 玩家API(Name)
function API_apiCitizenByName(citizenName, callback, notRetry) {
    var url = "apiCitizenByName.html?id="+citizenName.toLowerCase();
    return API_getAPI(url, callback, notRetry);
}

// apiOnlinePlayers 在线玩家API
function API_apiOnlinePlayers(countryId, callback, notRetry) { //countryId=0为全服
    $.ajax({
        url: "apiOnlinePlayers.html?countryId="+countryId,
        success: function(data) {
            var info = JSON.parse(data);
            var playerList = [];
            $.each(info,function(index, value) {
                playerList.push(JSON.parse(value));
            });
            callback(playerList);
        },
        error: function(xhr,textStatus){
            if (notRetry == true) {
                console.log("apiOnlinePlayers.html?countryId="+countryId+"获取错误 (", textStatus, ")");
                return;
            }
            else {
                console.log("apiOnlinePlayers.html?countryId="+countryId+"获取错误 (", textStatus, ")，重新获取");
                $.ajax(this);
            }
        }
    });
}

// apiMilitaryUnitById 军团API
function API_apiMilitaryUnitById(muId, callback, notRetry) {
    var url = "apiMilitaryUnitById.html?id=" + muId;
    return API_getAPI(url, callback, notRetry);
}

// apiMilitaryUnitMembers 军团成员API
function API_apiMilitaryUnitMembers(muId, callback, notRetry) {
    var url = "apiMilitaryUnitMembers.html?id="+muId;
    return API_getAPI(url, callback, notRetry);
}

// apiFights 战场回合API
function API_apiFights(battleId, roundId, callback, notRetry) {
    var url = "apiFights.html?battleId=" + battleId + "&roundId=" + roundId;
    return API_getAPI(url, callback, notRetry);
}

// apiBattles 战场API
function API_apiBattles(battleId, callback, notRetry) {
    var url = "apiBattles.html?battleId=" + battleId;
    return API_getAPI(url, callback, notRetry);
}

// apiRanks.html 军衔系统API
function API_apiRanks(callback, notRetry) {
    return API_getAPI("apiRanks.html", callback, notRetry);
}

////////////////////////////////////////////////////////////////////////////////////////END API////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////抓取网页////////////////////////////////////////////////////////////////////////////////////////

// 通用抓取模板
function Crawler_getPage(url, callback, notRetry) {
    $.ajax({
        url: url,
        success: function(data) {
            console.log(url, "抓取成功");
            if (typeof(callback) === "function") callback(data);
            else console.log(callback, "不是一个function");
            return;
        },
        error: function(xhr,textStatus) {
            if (notRetry == true) {
                console.log(url, "抓取错误 (", textStatus, ")");
                return;
            }
            else {
                console.log(url, "抓取错误 (", textStatus, ")，重新抓取");
                $.ajax(this);
            }
        }
    });
}

// 国家统计-获取生产力国家排行
function Crawler_getCountryStatisticsProductivity(callback, notRetry) {
    function getData(data) {
        var topCountryProductivity = [];
        $(".dataTable", data).find(".xflagsMedium").each(function() {
            var countryName = getCountryNameFormFlag($(this).attr("class").split(" ").pop());
            topCountryProductivity.push(countryName);
        });
        return callback(topCountryProductivity);
    }
    return Crawler_getPage("countryStatistics.html?statisticType=PRODUCTIVITY", getData, notRetry);
}

// 国家统计-获取国家人数排行
function Crawler_getCountryStatisticsCitizens(callback, notRetry) {
    function getData(data) {
        var topCountryProductivity = [];
        $(".dataTable", data).find(".xflagsMedium").each(function() {
            var countryName = getCountryNameFormFlag($(this).attr("class").split(" ").pop());
            topCountryProductivity.push(countryName);
        });
        return callback(topCountryProductivity);
    }
    return Crawler_getPage("countryStatistics.html?statisticType=CITIZENS", getData, notRetry);
}



// 汇率-购买黄金
function getRateBuyGold(data) {
    if ($(".dataTable:first tr:eq(1) td", data).length === 1) return -1; // 没有单子，只有一行"No offers"
    else return parseFloat($(".dataTable:first tr:eq(1) td:eq(2) b", data).text().replace(",", "."));
}
function Crawler_getRateBuyGold(countryId, callback, notRetry) {
    function getData(data) {
        return callback(getRateBuyGold(data));
    }
    var url = "monetaryMarket.html?buyerCurrencyId=0&sellerCurrencyId=" + countryId;
    return Crawler_getPage(url, getData, notRetry);
}

// 汇率-卖出黄金
function getRateSellGold(data){
    if ($(".dataTable:first tr:eq(1) td", data).length === 1) return -1; // 没有单子，只有一行"No offers"
    else return parseFloat($(".dataTable:first tr:eq(1) td:eq(2) b", data).text().replace(",", "."));
}
function Crawler_getRateSellGold(countryId, callback, notRetry) {
    function getData(data) {
        return callback(getRateSellGold(data));
    }
    var url = "monetaryMarket.html?buyerCurrencyId=" + countryId + "&sellerCurrencyId=0";
    return Crawler_getPage(url, getData, notRetry);
}


////////////////////////////////////////////////////////////////////////////////////////END 抓取网页////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////发送请求////////////////////////////////////////////////////////////////////////////////////////

// 使用特殊道具，不重试
function Request_useSpecialItem(itemType, callback) {
    if (typeof(callback) !== "function") {
        console.log(callback, "不是一个function");
        return;
    }
    $.ajax({
        type: "POST",
        url: "storage.html",
        data: "item="+itemType+"&storageType=SPECIAL_ITEM&action=USE",
        success: function(data) {
            console.log("使用"+itemType+"：成功响应");
            return callback(true);
        },
        error: function(xhr, textStatus) {
            console.log("使用"+itemType+"时发生错误"+textStatus);
            return callback(false);
        }
    });
}

// 购买特殊道具，不重试
function Request_buySpecialItem(itemType, callback) {
    if (typeof(callback) !== "function") {
        console.log(callback, "不是一个function");
        return;
    }
    $.ajax({
        type: "POST",
        url: "storage.html",
        data: "itemType="+itemType+"&storageType=SPECIAL_ITEM&action=BUY&quantity=1",
        success: function(data) {
            console.log("购买"+itemType+"：成功响应");
            return callback(true);
        },
        error: function(xhr, textStatus){
            console.log("购买"+itemType+"时发生错误"+textStatus);
            return callback(false);
        }
    });
}

// 从团仓取出物资，失败重试
function Request_getItemsFromMilitaryUnitStorage(itemType, quantity, reason, citizenNumberInMU, citizenID, callback) {
    var dataObj = {
        product: itemType,
        quantity: quantity,
        reason: reason,
    };
    dataObj[citizenNumberInMU] = citizenID;
    $.ajax({
        url: "militaryUnitStorage.html",
        type: "POST",
        data: dataObj,
        success: function(data) {
            console.log("已从军团仓库取了" + quantity + "个" + itemType);
            return callback(true);
        },
        error: function(xhr, textStatus) {
            console.log("从军团仓库取" + quantity + "个" + itemType + "时发生错误 (", textStatus, ")，重新尝试");
            $.ajax(this);
        }
    });
}


////////////////////////////////////////////////////////////////////////////////////////END 发送请求////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////建立和更新数据库////////////////////////////////////////////////////////////////////////////////////////

// 获取本地时间
// 当前版本统一使用本地时间
function getLocalEpoch() {
    return new Date().getTime();
}

// 获取服务器时间（当前版本不使用）
// 注意：有些页面没有显示服务器时间
function getServerEpoch() {
    return parseInt($("#time2").text());
}

// 判断数据库是否过期
function isEpochOutdated(epoch, seconds) {
    var now = getLocalEpoch(); // 使用本地时间
    if (now - epoch < seconds*1000)
        return false;
    return true;
}

function fetchMap(updateApiCountries, updateApiRegions, updateApiMap) {
    var waitingNumber = 3;
    var needUpdate = false;
    var apiCountries = option("script").apiCountries;
    var apiCountriesEpoch = option("script").apiCountriesEpoch;
    var apiRegions = option("script").apiRegions;
    var apiRegionsEpoch = option("script").apiRegionsEpoch;
    var apiMap = option("script").apiMap;
    var apiMapEpoch = option("script").apiMapEpoch;

    function setApiCountries(data) {
        apiCountries = data;
        option("script").apiCountries = data;
        if ((--waitingNumber === 0) && needUpdate) mergeMap();
    }
    function setApiRegions(data) {
        apiRegions = data;
        option("script").apiRegions = data;
        if ((--waitingNumber === 0) && needUpdate) mergeMap();
    }
    function setApiMap(data) {
        apiMap = data;
        option("script").apiMap = data;
        if ((--waitingNumber === 0) && needUpdate) mergeMap();
    }

    // 判断数据库是否过期
    if (isEpochOutdated(apiCountriesEpoch, 3600*24) || updateApiCountries) { needUpdate = true; API_apiCountries(setApiCountries); }
    else { --waitingNumber; }
    if (isEpochOutdated(apiRegionsEpoch, 3600*24) || updateApiRegions) { needUpdate = true; API_apiRegions(setApiRegions); }
    else { --waitingNumber; }
    if (isEpochOutdated(apiMapEpoch, 600) || updateApiMap) { needUpdate = true; API_apiMap(setApiMap); }
    else { --waitingNumber; }

    function mergeMap() {
        // 重建国家信息，可用ID/Name/FlagName/CurrencyName索引
        countryInfo = {};
        var countryIds = [];
        var _countryInfo = JSON.parse(apiCountries);
        for (var i=0; i<_countryInfo.length; ++i) {
            var one = _countryInfo[i];
            one.flagName = one.name.replace(/ /g, "-");
            countryIds.push(one.id);
            countryInfo[one.id] = one;
            countryInfo[one.name] = one;
            //countryInfo[one.shortName] = one;   SN可能会重名
            countryInfo[one.flagName] = one;
            countryInfo[one.currencyName] = one;
        }
        option("script").countryIds = countryIds;

        // 地区信息，可用ID/Name索引，名字仅限英文
        var _regionInfo = [];
        var _regionInfo1 = JSON.parse(apiMap);
        var _regionInfo2 = JSON.parse(apiRegions);
        for (i=0; i<_regionInfo1.length; ++i) {
            _regionInfo[_regionInfo1[i].regionId] = _regionInfo1[i];
        }
        for (i=0; i<_regionInfo2.length; ++i) {
            var id = _regionInfo2[i].id;
            for (var attrname in _regionInfo2[i])
                _regionInfo[id][attrname] = _regionInfo2[i][attrname];
        }
        regionInfo = {};
        for (i=0; i<_regionInfo.length; ++i) {
            var one1 = _regionInfo[i];
            if (one1) {
                regionInfo[one1.id] = one1;
                regionInfo[one1.name] = one1;
            }
        }

        setValue("options",options);
        setValue("countryInfo",countryInfo);
        setValue("regionInfo",regionInfo);
        console.log("国家和地图信息已更新");
    }
}

function fetchApiRanks(update) {
    function setApiRanks(data) {
        apiRanks = {};
        for (i=0; i<data.length; ++i) {
            var one = data[i];
            if (one) {
                apiRanks[data[i].name] = one;
            }
        }
        setValue("apiRanks",apiRanks);
        console.log("军衔等级信息已更新");
    }
    if (!!!apiRanks.Rookie || update) API_apiRanks(setApiRanks);
}



////////////////////////////////////////////////////////////////////////////////////////END 建立和更新数据库////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////特定网页功能////////////////////////////////////////////////////////////////////////////////////////

// index
function enhanceIndex() {
    // 隐藏首页左上角的提醒框div#frontPagePushQuestion
    var frontPagePushQuestion = $("#frontPagePushQuestion");
    if (frontPagePushQuestion.length > 0) frontPagePushQuestion.hide();
}


// profile
// 伤害计算
function DamageCalculator(profile) {
    var dmgToday = profile.damageToday;
    var totalDamage = 0;
    var minDmg = profile.eqMinDmg;
    var maxDmg = profile.eqMaxDmg;
    var crit = profile.eqCriticalHit / 100;
    var miss = profile.eqReduceMiss / 100;
    var avoid = eqAvoidDamage / 100;
    var strength = profile.strength;
    var rankString = profile.rank;
    var rankModifier = apiRanks[rankString].damageModifier;
    var steroids = profile.buffs[0];
    var tank = profile.buffs[1];
    var bunker = profile.buffs[2];
    var resistance = profile.buffs[3];
    var painDealer1h = profile.buffs[4];
    var painDealer10h = profile.buffs[5];
    var painDealer25h = profile.buffs[6];
    var camouflage_third_class = profile.buffs[7];
    var camouflage_second_class = profile.buffs[8];
    var camouflage_first_class = profile.buffs[9];
    var weaponBonus = (!!profile.weaponBonus) ? profile.weaponBonus : 1.2;
    var DSQ = (!!profile.DSQ) ? profile.DSQ : 0;
    var HOSPQ = (!!profile.HOSPQ) ? profile.HOSPQ : 0;
    var muOrderBonus = (!!profile.muOrderBonus) ? profile.muOrderBonus : 1.2;
    var coalitionOrderBonus = (!!profile.coalitionOrderBonus) ? profile.coalitionOrderBonus : 1;
    var regionBonus = (!!profile.regionBonus) ? profile.regionBonus : 1.2; // 默认有本地加成
    var surroundBonus = (!!profile.surroundBonus) ? profile.surroundBonus : 1; // 默认没有被包围
    var moreDamage = (!!profile.moreDamage) ? (1+profile.moreDamage*0.01) : 1;
    var moreCritical = (!!profile.moreCritical) ? (1+profile.moreCritical*0.01) : 1;
    var limit = (!!profile.limit) ? profile.limit : 40; // 默认40额度
    var result = {};
    // 计算总暴击
    var modified_crit = crit;
    if ((painDealer1h == 1)||(painDealer10h == 1)||(painDealer25h == 1)) modified_crit = modified_crit * 2;
    modified_crit = modified_crit * moreCritical;
    if (modified_crit > 0.8) modified_crit = 0.8;
    // 计算总闪避
    var modified_avoid = avoid;
    if (camouflage_third_class == 1) modified_avoid = modified_crit * 1.1;
    else if (camouflage_second_class == 1) modified_avoid = modified_crit * 1.2;
    else if (camouflage_first_class == 1) modified_avoid = modified_crit * 1.4;
    // 计算总加成
    var factor = weaponBonus;
    if (tank == 1) factor = (!!profile.weaponBonus) ? weaponBonus * 1.2 : 2 * 1.2; //坦克buff，默认打Q5
    else if (tank == -1) factor = 0.5;  // 坦克debuff，只能打Q0
    if (steroids == 1) factor = factor * 1.2;
    else if (steroids == -1) factor = factor * 0.8;
    if (bunker == 1) factor = factor * 1.25;
    else if (bunker == -1) factor = factor * 0.8;
    if (resistance == 1) factor = factor * 1.25;
    else if (resistance == -1) factor = factor * 0.8;
    factor = factor * muOrderBonus;
    factor = factor * coalitionOrderBonus;
    factor = factor * regionBonus;
    factor = factor * surroundBonus;
    factor = factor * moreDamage;
    var minHit = Math.round(minDmg * factor * 5);
    var maxHit = Math.round(maxDmg * factor * 5);
    var hit = (minHit + maxHit) * (1 + modified_crit)/ 10;

    //$("#estBerserkMin").html(formatNumber(minHit));
    //$("#estBerserkMax").html(formatNumber(maxHit*2));
    //$("#estBerserkAvg").html(formatNumber(Math.round(hit*5)));
    result.estBerserkMin = minHit;
    result.estBerserkMax = maxHit*2;
    result.estBerserkAvg = Math.round(hit*5);

    var totalHealth = limit * 50;
    var healthPerHit = 10;
    healthPerHit -= HOSPQ * 0.5;
    var totalHits = Math.floor(totalHealth / healthPerHit);
    totalHits = totalHits * (1 - miss) / (1 - modified_avoid);
    totalDamage = totalHits * hit;

    //$("#estTimes").html(Math.round(totalHits));
    //$("#estTotal").html(formatNumber(Math.round(totalDamage)));
    //$("#percentage").html(Math.round(dmgToday * 100 / totalDamage));
    result.estTimes = Math.round(totalHits);
    result.estTotal = Math.round(totalDamage);
    result.percentage = Math.round(dmgToday * 100 / totalDamage);
    result.alreadyUsedLimit = Math.round(limit * percentage);

    var score2 = ((minDmg+maxDmg)/2*(1 + modified_crit)*(1-miss)) / (strength*rankModifier*1.125*0.875);
    score2 = score2<1 ? 1 : score2;
    var score1 = score2 * 0.95 / (1-avoid);
    //$('#score1').text( ((score1-1)*100).toFixed(2) );
    //$('#score2').text( ((score2-1)*100).toFixed(2) );
    result.score1 = score1;
    result.score2 = score2;

    return result;
}



// 抓取玩家页面上的信息
function Crawler_getCitizenProfile(citizenId, callback, notRetry) {
    function getData(data) { 
        callback(getCitizenProfileFromPage(data, citizenId));
    }
    var url = "profile.html?id=" + citizenId;
    return Crawler_getPage(url, getData, notRetry);
}
// 分析玩家页面上的信息
function getCitizenProfileFromPage(data, _citizenId) {
    var profile = {};
    var oldprofile = citizenInfo[profile.citizenId];
    profile.citizenId = _citizenId;
    // 抓取头像
    profile.avatar = $(".bigAvatar", data).attr("src").trim();
    // 抓取会员
    profile.premium = $(".premium-account", data).length == 1;
    // 组织号
    if ($("#profileEquipmentNew", data).length < 1) profile.orgAccount = true;
    else
    {
        profile.orgAccount = false;
        // 抓取buff和debuff图标
        profile.buffIcons = [];
        $("img[src$='_positive.png']", data).each(function() {
            if($(this).attr("class") != "smallhelp") return true; // 排除个人介绍中的buff图片
            profile.buffIcons.push($(this).attr("src"));
        });
        profile.debuffIcons = [];
        $("img[src$='_negative.png']", data).each(function() {
            if($(this).attr("class") != "smallhelp") return true; // 排除个人介绍中的buff图片
            profile.debuffIcons.push($(this).attr("src"));
        });
        // 抓取buff和debuff，buffs[i]=1为buff，buffs[i]=-1为debuff
        // buffName顺序：拳头、坦克、保家卫国、起义猛士、暴击1h、暴击10h、暴击25h、烟雾弹3等、烟雾弹2等、烟雾弹1等，不包含绷带和额度buff
        var now = new Date().getTime();
        profile.buffs = [];
        var buffName = ["steroids", "tank", "bunker", "resistance", "painDealer1h", "painDealer10h", "painDealer25h", "camouflage_third_class", "camouflage_second_class", "camouflage_first_class"];
        var buffSpan = [24, 24, 24, 24, 1, 10, 25, 5, 5, 5];
        var debuffSpan = [48, 48, 48, 48, 0, 0, 0, 0, 0, 0];
        var debuffSpanPremium = [24, 24, 24, 24, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i<buffName.length; ++i) {
            profile.buffs[i] = 0;
            // 设置buff状态
            for (var buffIndex=0; buffIndex<profile.buffIcons.length; ++buffIndex) {
                if (profile.buffIcons[buffIndex].indexOf(buffName[i]) >= 0) {
                    profile.buffs[i] = 1;
                }
            }
            // 设置debuff状态
            for (var debuffIndex=0; debuffIndex<profile.debuffIcons.length; ++debuffIndex) {
                if (profile.debuffIcons[debuffIndex].indexOf(buffName[i]) >= 0) {
                    profile.buffs[i] = -1;
                }
            }
        }
        profile.minStartTime = [];
        profile.maxStartTime = [];
        for (var buffi = 0; buffi<buffName.length; ++buffi) {
            if (profile.buffs[buffi] == 0) {
                // 没buff也没debuff，那开buff时间一定在当前时间之后
                profile.minStartTime[buffi] = now;
                profile.maxStartTime[buffi] = now + 1000*24*3600*1000; // 无限
            }
            else if (profile.buffs[buffi] == 1) {
                // 有buff，则开buff时间一定在之前buffSpan小时内
                profile.minStartTime[buffi] = now - buffSpan[buffi]*3600*1000;
                profile.maxStartTime[buffi] = now;
            }
            else if (profile.premium) { //有debuff
                // 会员最早2天前开buff，现在马上debuff结束；最晚1天前开buff，现在debuff刚开始
                profile.minStartTime[buffi] = now - (buffSpan[buffi]+debuffSpanPremium[buffi])*3600*1000;
                profile.maxStartTime[buffi] = now - buffSpan[buffi]*3600*1000;
            }
            else {
                // 非会员最早3天前开buff，现在马上debuff结束；最晚1天前开buff，现在debuff刚开始
                profile.minStartTime[buffi] = now - (buffSpan[buffi]+debuffSpan[buffi])*3600*1000;
                profile.maxStartTime[buffi] = now - buffSpan[buffi]*3600*1000;
            }
            if ((!!oldprofile) && !!oldprofile.minStartTime[buffi]) { // 之前有记录且不是从api获取
                //比较区间，选择交集
                var early = profile.minStartTime[buffi] > oldprofile.minStartTime[buffi] ? profile.minStartTime[buffi] : oldprofile.minStartTime[buffi]; // 两个最早开buff的时间，选晚的
                var late = profile.maxStartTime[buffi] < oldprofile.maxStartTime[buffi] ? profile.maxStartTime[buffi] : oldprofile.maxStartTime[buffi]; // 两个最晚可能开buff的时间，选早的
                if (early < late) { 
                    // early > late，交集为空，说明之前记录的是上次开buff的信息，不变动
                    // 有交集，则记录交集
                    profile.minStartTime[buffi] = early;
                    profile.maxStartTime[buffi] = late;
                }
            }
        }
        // 抓取装备，装备顺序：帽镜甲裤鞋符武副
        profile.equipments = [];
        $("#profileEquipmentNew", data).find(".equipmentBack").each(function() {
            profile.equipments.push($(this).attr("class").split(" ").pop());
        });
        profile.eqMinDmg = parseInt($("div#hitHelp", data).text().split("/")[0].replace(",", ""));
        profile.eqMaxDmg = parseInt($("div#hitHelp", data).text().split("/")[1].replace(",", ""));
        //其他信息可以从api获取
    }
    return profile;
}

function SaveCitizenInfo(citizenId, sAPI, sPage, callback) {
    var waitingNumber = 2;
    var profileAPI = {};
    var profilePage = {};
    function setprofileAPI(data) {
        profileAPI = data;
        if (--waitingNumber === 0) mergeCitizenInfo();
    }
    function setprofilePage(data) {
        profilePage = data;
        if (--waitingNumber === 0) mergeCitizenInfo();
    }
    if (!!sAPI) { profileAPI = sAPI; --waitingNumber; }
    else { API_apiCitizenById(citizenId, setprofileAPI); }
    if (!!sPage) { profilePage = sPage; --waitingNumber; }
    else { Crawler_getCitizenProfile(citizenId, setprofilePage); }

    function mergeCitizenInfo() {
        var profile = Object.assign(profileAPI, profilePage);
        citizenInfo[citizenId] = profile;
        callback(profile);
    }
}

function enhanceProfile() {
    var citizenId = GetQueryString("id");
    var profile1 = getCitizenProfileFromPage($("body"), citizenId);
    //保存玩家信息
    SaveCitizenInfo(citizenId, null, profile1, addElements);
    
    function addElements(profile) {
        // buff图标分行
        $("img[src$='_positive.png']").after("<br>");
        $("img[src$='_negative.png']").after("<br>");
        // 添加buff倒计时
        var buffs = ["steroids", "tank", "bunker", "resistance", "painDealer1h", "painDealer10h", "painDealer25h", "camouflage_third_class", "camouflage_second_class", "camouflage_first_class"];
        var buffSpan = [24, 24, 24, 24, 1, 10, 25, 5, 5, 5];
        var debuffSpan = [48, 48, 48, 48, 0, 0, 0, 0, 0, 0];
        var debuffSpanPremium = [24, 24, 24, 24, 0, 0, 0, 0, 0, 0];
        var now = new Date().getTime();
        for (var i=0; i<buffs.length; ++i) {
            var buffIcon = $("img[src$='"+buffs[i]+"_positive.png']:first")[0];
            var debuffIcon = $("img[src$='"+buffs[i]+"_negative.png']:first")[0];
            var buffMinStartTime = citizenInfo[citizenId].minStartTime[i];
            var buffMaxStartTime = citizenInfo[citizenId].maxStartTime[i];
            if (buffIcon && ($(buffIcon).attr("class") == "smallhelp")) { // buff，排除个人介绍中的buff图片
                var buffmin = buffMinStartTime + buffSpan[i]*3600*1000 - now;
                var buffmax = buffMaxStartTime + buffSpan[i]*3600*1000 - now;
                if ( (buffmax-buffmin) < 60*1000 ) $("<b>", {text:epochToTime(buffmin)}).insertAfter(buffIcon); // 时间接近，只输出短的
                else $("<b>", {text:epochToTime(buffmin) + " - " + epochToTime(buffmax)}).insertAfter(buffIcon);
            }
            if (debuffIcon && ($(debuffIcon).attr("class") == "smallhelp")) {// debuff，排除个人介绍中的buff图片
                var debuffmin;
                var debuffmax;
                if (profile.premium) {
                    debuffmin = buffMinStartTime + (buffSpan[i]+debuffSpanPremium[i])*3600*1000 - now;
                    debuffmax = buffMaxStartTime + (buffSpan[i]+debuffSpanPremium[i])*3600*1000 - now;
                }
                else {
                    debuffmin = buffMinStartTime + (buffSpan[i]+debuffSpan[i])*3600*1000 - now;
                    debuffmax = buffMaxStartTime + (buffSpan[i]+debuffSpan[i])*3600*1000 - now;
                }
                if ( (debuffmax-debuffmin) < 60*1000 )
                    $("<b>", {text:epochToTime(debuffmax)}).insertAfter(debuffIcon); // 时间接近，只输出长的
                else
                    $("<b>", {text:epochToTime(debuffmin) + " - " + epochToTime(debuffmax)}).insertAfter(debuffIcon);
            }
        }
        esimDamageCalculator(profile);

        // 原脚本: esim 伤害计算器
        // 原作者: Heff (modified by cryst216, calin, zollow and cristalfate)
        function esimDamageCalculator(profile) {
            var des = '<div id="dmgCalc" class="testDivwhite" style="width:510px;"><table style="font-size:12px; width:100%;"><tbody><tr><td><table style="width:100%"><tbody><tr><td><b>武器:</b></td><td><b>防御系统:</b></td><td><b>医院:</b></td><td><b>军令:</b></td><td><b>联盟令:</b></td><td><b>额度:</b></td><td><b>已消耗额度</b></td></tr><tr><td><select id="weaponQ" style="height:18px; padding:2px; font-size:12px"><option value="0.5">无</option><option value="1.2" selected="selected">Q1</option><option value="1.4">Q2</option><option value="1.6">Q3</option><option value="1.8">Q4</option><option value="2">Q5</option></select></td><td><select id="DSQ" style="height:18px; padding:2px; font-size:12px"><option value="0">无</option><option value="1">Q1</option><option value="2">Q2</option><option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option></select></td><td><select id="HOSPQ" style="height:18px; padding:2px; font-size:12px"><option value="0">无</option><option value="1">Q1</option><option value="2">Q2</option><option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option></select></td><td><select id="muOrderBonus" style="height:18px; padding:2px; font-size:12px"><option value="1">无</option><option value="1.05">初级</option><option value="1.1">中级</option><option value="1.15">高级</option><option value="1.2">精英</option></select></td><td><select id="coalitionOrderBonus" style="height:18px; padding:2px; font-size:12px"><option value="1">无</option><option value="1.03">3%</option><option value="1.06">6%</option><option value="1.09">9%</option></select></td><td><input type="number" min="0" id="LimitNum" value="40" style="position:relative; top:-5px; max-width:36px; padding:2px; font-size:12px"></td><td><b id="alreadyUseLimitNum">0</b></td></tr></tbody></table><table style="width:100%"><tbody><tr><td><div style="width:100%"><b>保家卫国:</b><select id="bunkerBonus" style="height:18px; padding:2px; font-size:12px"><option value="1">buff</option><option value="0" selected="selected">无</option><option value="-1">debuff</option></select></div></td><td><div style="width:100%"><b>起义猛士:</b><select id="resistanceBonus" style="height:18px; padding:2px; font-size:12px"><option value="1">buff</option><option value="0" selected="selected">无</option><option value="-1">debuff</option></select></div></td><td><div style="width:100%" title="重型坦克(Tank) Buff"><b>坦克:</b><select id="tankBonus" style="height:18px; padding:2px; font-size:12px"><option value="1">buff</option><option value="0" selected="selected">无</option><option value="-1">debuff</option></select></div></td><td><div style="width:100%" title="类固醇(Steroid) Buff"><b>拳头:</b><select id="steroidBonus" style="height:18px; padding:2px; font-size:12px"><option value="1">buff</option><option value="0" selected="selected">无</option><option value="-1">debuff</option></select></div></td></tr><tr><td><div style="width:100%" title="本地加成"><b>本地:</b><input type="checkbox" id="regionBonus" value="1.2" checked="checked"></div></td><td><div style="width:100%" title="被包围减伤 - 与本土不相连"><b>被包围:</b><input type="checkbox" id="surroundDebuff" value="0.8"></div></td><td><div style="width:100%"><b>暴击:</b><input type="checkbox" id="painDealerBonus"></div></td><td><div style="width:100%"><b>烟雾弹:</b><select id="camouflageQ" style="height:18px; padding:2px; font-size:12px"><option value="1">无</option><option value="1.1" selected="selected">III</option><option value="1.2">II</option><option value="1.4">I</option></select></div></td></tr><tr><td><div style="width:100%"><b>更多伤害:</b><select id="moreDamage" style="height:18px; padding:2px; font-size:12px"><option value="0">0%</option><option value="20">20%</option><option value="40">40%</option><option value="60">60%</option><option value="80">80%</option><option value="100">100%</option><option value="120">120%</option><option value="140">140%</option><option value="160">160%</option><option value="180">180%</option><option value="200">200%</option><option value="220">220%</option><option value="240">240%</option><option value="260">260%</option><option value="280">280%</option><option value="300">300%</option><option value="320">320%</option><option value="340">340%</option><option value="360">360%</option><option value="380">380%</option><option value="400">400%</option></select></div></td><td><div style="width:100%"><b>更多暴击:</b><select id="moreCritical" style="height:18px; padding:2px; font-size:12px"><option value="0">0%</option><option value="20">20%</option><option value="40">40%</option><option value="60">60%</option><option value="80">80%</option><option value="100">100%</option><option value="120">120%</option><option value="140">140%</option><option value="160">160%</option><option value="180">180%</option><option value="200">200%</option></select></div></td><td colspan="2"><div id="muOrder" class="statsLabel smallStatsLabel blueLabel" style="width:100%; position:relative; margin:0px auto">获取中...</div></td></tr></tbody></table></td><td><div><table style="width:100%;"> <tbody><tr title="最小伤害"> <td style="text-align:left;">5<img style="width:13px; height:13px;" src="//cdn.e-sim.org/img/productIcons/Weapon.png">最小:</td> <td> <div class="help equipmentBlueBox" style="position:relative; width:100%; margin:0;"><b id="estBerserkMin">0</b></div></td> </tr> <tr title="最大暴击伤害"> <td style="text-align:left;">5<img style="width:13px; height:13px;" src="//cdn.e-sim.org/img/productIcons/Weapon.png">最大:</td> <td> <div class="help equipmentBlueBox" style="position:relative; width:100%; margin:0;"><b id="estBerserkMax">0</b></div></td> </tr> <tr title="考虑了暴击率的平均伤害"> <td style="text-align:left;">5<img style="width:13px; height:13px;" src="//cdn.e-sim.org/img/productIcons/Weapon.png">平均:</td> <td> <div class="help equipmentBlueBox" style="position:relative; width:100%; margin:0;"><b id="estBerserkAvg">0</b></div></td> </tr> </tbody></table></div><div><b>伤害</b>(<b id="estTimes">0</b><img style="width:13px; height:13px;" src="//cdn.e-sim.org/img/productIcons/Weapon.png">) <br><div class="help equipmentBlueBox" style="position:relative; width:100%; margin:2px;"><b id="estTotal">0</b></div></div><div><b>今日</b>(<b id="percentage">0</b>%) <br><div class="help equipmentBlueBox" style="position:relative; width:100%; margin:2px;"><b id="dmgToday">0</b></div></div></td></tr></tbody></table></div>';
            $("#profileEquipmentNew").parent().after(des);

            $(".eq-profile-stats.whiteShadow").children().append('<tr><td><b title="与无装备状态相比">总伤害</td><td>+<b id="score1">0</b>%</b></td></tr>');
            $(".eq-profile-stats.whiteShadow").children().append('<tr><td><b title="与无装备状态相比，且不考虑闪避属性(avoid)">爆发力</td><td>+<b id="score2">0</b>%</b></span></td></tr>');
            $("#dmgToday").html(formatNumber(dmgToday));
            $("#percentage").html(Math.round(dmgToday * 100 / totalDamage));
            calc();
            var muValue = 1.2;
            var militaryElement = $('.profile-row > a[href^="militaryUnit.html?id="]');
            if (militaryElement.length > 0) {
                var muID = militaryElement.first().attr("href").split("?id=").pop();
                var json = $.getJSON("apiMilitaryUnitById.html?id=" + muID).done(function (data) {
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
                    $("#muOrderBonus").val(muValue);
                    calc();
                });
                corder(muID);
            } else {
                $("#muOrder").html("未加入军团");
                muValue = 1;
            }
            $("#muOrderBonus").val(muValue);

            function order(muID) {
                $.ajax({
                    url: "militaryUnit.html?id=" + muID,
                    success: function (data) {
                        var flag, order = $(data).find(".battleDiv:first > div:eq(3) a[href^='battle.html?id=']:first");
                        var flagNumber = $('.battleDiv:first .xflagsMedium', data).length;
                        if (0 < order.length && flagNumber === 2) { // 有军令和2个旗子 (3个旗子表示战斗已结束)
                            flag = $(data).find(".battleDiv:first").parent().parent().find(".xflagsMedium:last");
                            if (0 < flag.length)
                                $("#muOrder").html("<a target='_blank' href='" + order.attr("href") + "'>" + order.text() + "</a> , <div class='" + flag.attr("class").replace(/Medium/g, "Small") + "'></div> 方.");
                        }
                        else {
                            $("#muOrder").html("无军令");
                            $("#muOrderBonus").val(1);
                            calc();
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $("#muOrder").html("获取失败，重试中...");
                        console.log("!Error - errorThrown:" + errorThrown + "; jqXHR:" + jqXHR);
                        setTimeout(function () { $("#muOrder").html("获取中..."); order(muID); }, 2E3);
                    }
                });
            }

            function init() {
                var buffName = ["steroids", "tank", "bunker", "resistance", "painDealer1h", "painDealer10h", "painDealer25h", "camouflage_third_class", "camouflage_second_class", "camouflage_first_class"];
                $("#steroidBonus").val(profile.buffs[0]);
                $("#tankBonus").val(profile.buffs[1]);
                if (profile.buffs[1] == 1) $("#weaponQ").val(2);
                else if (profile.buffs[1] == -1) $("#weaponQ").val(0.5);
                $("#bunkerBonus").val(profile.buffs[2]);
                $("#resistanceBonus").val(profile.buffs[3]);
                $("#painDealerBonus").attr("checked", false);
                if ((profile.buffs[4] == 1)||(profile.buffs[5] == 1)||(profile.buffs[6] == 1)) $("#painDealerBonus").attr("checked", true);
                $("#camouflageQ").val(1);
                if (profile.buffs[7] == 1) { //camouflage_third_class
                    $("#camouflageQ").val(1.1);
                }
                if (profile.buffs[8] == 1) { //camouflage_second_class
                    $("#camouflageQ").val(1.2);
                }
                if (profile.buffs[9] == 1) { //camouflage_first_class
                    $("#camouflageQ").val(1.4);
                }
                calc();
            }

            function calc() {
                var calprofile = profile;
                calprofile.steroids = $("#steroidBonus").val();
                calprofile.tank = $("#tankBonus").val();
                calprofile.bunker = $("#bunkerBonus").val();
                calprofile.resistance = $("#resistanceBonus").val();
                calprofile.painDealer1h = 0;
                calprofile.painDealer10h = 0;
                calprofile.painDealer25h = 0;
                if ($("#painDealerBonus")[0].checked) calprofile.painDealer1h = 1;
                calprofile.camouflage_third_class = 0;
                calprofile.camouflage_second_class = 0;
                calprofile.camouflage_first_class = 0;
                if ($("#camouflageQ").val() == 1.1 ) {calprofile.camouflage_third_class = 1;}
                else if ($("#camouflageQ").val() == 1.2 ) {calprofile.camouflage_second_class = 1;}
                else if ($("#camouflageQ").val() == 1.4 ) {calprofile.camouflage_first_class = 1;}
                calprofile.weaponBonus = $("#weaponQ").val();
                calprofile.DSQ = $("#DSQ").val();
                calprofile.HOSPQ = $("#HOSPQ").val();
                calprofile.muOrderBonus = $("#muOrderBonus").val();
                calprofile.coalitionOrderBonus = $("#coalitionOrderBonus").val();
                calprofile.regionBonus = ($("#regionBonus")[0].checked) ? $("#regionBonus").val() : 1;
                calprofile.surroundBonus = ($("#surroundDebuff")[0].checked) ? $("#surroundDebuff").val() : 1;
                calprofile.moreDamage = $("#moreDamage").val();
                calprofile.moreCritical = $("#moreCritical").val();
                calprofile.limit = parseInt($("#LimitNum").val());
                var result = DamageCalculator(calprofile);
                $("#estBerserkMin").html(formatNumber(result.estBerserkMin));
                $("#estBerserkMax").html(formatNumber(result.estBerserkMax));
                $("#estBerserkAvg").html(formatNumber(result.estBerserkAvg));
                $("#estTimes").html(result.estTimes);
                $("#estTotal").html(formatNumber(result.estTotal));
                $("#percentage").html(result.percentage);
                $("#alreadyUseLimitNum").html(result.alreadyUsedLimit);
                $('#score1').text(((result.score1-1)*100).toFixed(2));
                $('#score2').text(((result.score2-1)*100).toFixed(2));
            }
            $("select" ,$("#dmgCalc")).change(calc);
            $("input" ,$("#dmgCalc")).change(calc);

            function daysCalculator() {
                // economic skill
                var economicSkill = $('div.rank :eq(0)').parent().children('div.profile-row:eq(3)').children("span.data");
                var s = parseFloat(economicSkill.text());
                var coefficient;
                var d;
                if (s <= 8) {
                    coefficient = Math.pow(2, parseInt(s) - 1);
                    d = coefficient - 1 + (s - ip) * coefficient;
                } else {
                    coefficient = 64;
                    d = 127 + (s - 8) * coefficient;
                }
                economicSkill.html(economicSkill.html() + '(' + d + ')');

                // strength
                var strength = $('div.rank :eq(0)').parent().children('div.profile-row:eq(4)').children("span.data");
                var ss = strength.text();
                var dd = 0;
                if (ss <= 500)
                    dd = (ss - 100) / 100;
                else
                    if (ss <= 1000)
                        dd = 4 + (ss - 500) / 50;
                else
                    if (ss <= 1500)
                        dd = 14 + (ss - 1000) / 25;
                else
                    if (ss <= 1800)
                        dd = 34 + (ss - 1500) / 10;
                else
                    if (ss <= 2100)
                        dd = 64 + (ss - 1800) / 5;
                else
                    if (ss <= 2250)
                        dd = 124 + (ss - 2100) / 2;
                else
                    dd = 199 + (ss - 2250);
                strength.html(strength.html() + '(' + parseInt(dd) + ')');

                // age
                var birthday = $('div.rank :eq(0)').parent().children('div.profile-row:eq(7)').children("span.data");
                var age = parseInt($('#time2 ~ b').text().split(' ')[1]) - parseInt(birthday.text().split(' ')[1]) + 1;
                birthday.html(birthday.html() + '(' + age + '天)');
            }
            init();
            daysCalculator();
        }

    }
}



////////////////////////////////////////////////////////////////////////////////////////END 特定网页功能////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////脚本初始化////////////////////////////////////////////////////////////////////////////////////////



// 脚本等待和加载
function InitScript() {
    var waitForLoadCount = 0;
    var step = 0;
    var maxWaitForLoadCount = options.waitForWebPageComplete.maxWaitCount;

    //加载特定网页的脚本
    function RunPageScript() {
        if (document.URL.search("html") != -1) {
            var url = document.URL.match("\/([a-zA-Z0-9]+)\.html")[1];
            document.title = "e-Sim - " + location.host.split(".")[0] + " - " + url; // 修改网页标题
            switch (url) {
                case "index":
                    enhanceIndex();
                    break;
                case "profile":
                    enhanceProfile();
                    break;
                default:
                    console.log(url);
                    break;
            }
        }
        else { enhanceIndex(); } // 可能是首页？
    }

    function WaitForWebPageComplete() {
        // 等待网页框架加载
        if (step == 0) {
            if ($(".time").length !== 2) {
                waitForLoadCount++;
                if (waitForLoadCount<=maxWaitForLoadCount) {
                    console.log(waitForLoadCount+":网页未加载完全，esimplus等待1秒");
                    setTimeout(WaitForWebPageComplete, 1000);
                    return;
                }
                else {
                    location.reload();
                    return;
                }
            }
            step = 1;
        }
        // 等待网页原脚本加载
        else if (step == 1) {
            var tfl = $(".time:first").text().match(/-/g);
            if (tfl==null || tfl.length != 2) {
                waitForLoadCount++;
                if (waitForLoadCount<=maxWaitForLoadCount) {
                    console.log(waitForLoadCount+":官方脚本还未执行，esimplus插件等待1秒");
                    setTimeout(WaitForWebPageComplete, 1000);
                    return;
                }
                else {
                    location.reload();
                    return;
                }
            }
            step = 2;
        }
        // 网页脚本加载完成，开始做准备工作和其他不需要额度恢复倒计时的工作
        else if (step == 2) {
            // 建立地图数据
            fetchMap();
            fetchApiRanks();
            RunPageScript();
            step = 3;
        }
        // 等待恢复额度倒计时加载
        else if (step == 3) {
            if (($("#minutesLimit").length >0 && $("#minutesLimit").text() == "") || ($("#limit_timer_time_text").length >0 && $("#limit_timer_time_text").text() == "")) {
                waitForLoadCount++;
                if (waitForLoadCount<=maxWaitForLoadCount) {
                    console.log(waitForLoadCount+":官方时间还未刷新，esimplus等待1秒");
                    setTimeout(WaitForWebPageComplete, 1000);
                    return;
                }
                else {
                    location.reload();
                    return;
                }
            }
            step = 4;
        }
        // 网页全部加载完成，做战场页的其他工作
        else if (step == 4) {

        }
    }

    // 加载存储和设置
    loadStorage();
    // 等待网页加载完毕
    WaitForWebPageComplete();
}


////////////////////////////////////////////////////////////////////////////////////////END 脚本初始化////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////插件程序入口////////////////////////////////////////////////////////////////////////////////////////

InitScript();

////////////////////////////////////////////////////////////////////////////////////////END 插件主程序入口////////////////////////////////////////////////////////////////////////////////////////