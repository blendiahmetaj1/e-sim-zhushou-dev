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
