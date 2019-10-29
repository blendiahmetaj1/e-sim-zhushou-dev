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