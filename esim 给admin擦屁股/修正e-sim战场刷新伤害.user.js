// ==UserScript==
// @name         修正e-sim战场刷新伤害
// @namespace    ESFBD
// @version      0.1
// @description  e-sim的开发者都是笨蛋吗？
// @author       Exsper
// @match        http://*.e-sim.org/battle.html*
// @match        https://*.e-sim.org/battle.html*
// @grant        unsafewindow
// ==/UserScript==

unsafeWindow.updateStatus = function updateStatus(attackerScore, defenderScore, remainingTimeInSeconds, percentAttackers) {

    if ($("#attackerScore").text() != attackerScore) {
        $("#attackerScore").fadeOut('fast', function () {
            $("#attackerScore").text(attackerScore);
            $("#attackerScore").fadeIn('fast');
        });
    }
    if ($("#defenderScore").text() != defenderScore) {
        $("#defenderScore").fadeOut('fast', function () {
            $("#defenderScore").text(defenderScore);
            $("#defenderScore").fadeIn('fast');
        });
    }

    var hours = parseInt(remainingTimeInSeconds / 3600);
    var minutes = parseInt((remainingTimeInSeconds % 3600) / 60);
    var seconds = remainingTimeInSeconds % 60;

    var liftoffTime = new Date();
    liftoffTime.setHours(liftoffTime.getHours() + hours);
    liftoffTime.setMinutes(liftoffTime.getMinutes() + minutes);
    liftoffTime.setSeconds(liftoffTime.getSeconds() + seconds);

    var percentDefenders = 100.0 - percentAttackers;
    percentDefenders = roundToTwo(percentDefenders);
    percentAttackers = roundToTwo(percentAttackers);
    $("#battleProgress > div").animate({
        width: percentDefenders + '%'
    });

    $("#leftStat").fadeOut('fast', function () {
        $("#leftStat").text(percentDefenders + '%');
        $("#leftStat").fadeIn('fast');
    });
    $("#rightStat").fadeOut('fast', function () {
        $("#rightStat").text(percentAttackers + '%');
        $("#rightStat").fadeIn('fast');
    });

    if ($("#defenderPercent").text() != percentDefenders + "%") {
        $("#defenderPercent").fadeOut('fast', function () {
            $("#defenderPercent").text(percentDefenders + "%");
            $("#defenderPercent").fadeIn('fast');
        });
        $("#attackerPercent").fadeOut('fast', function () {
            $("#attackerPercent").text(percentAttackers + "%");
            $("#attackerPercent").fadeIn('fast');
        });
    }

};
