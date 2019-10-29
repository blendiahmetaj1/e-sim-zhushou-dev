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