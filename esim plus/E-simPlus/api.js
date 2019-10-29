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