// ==UserScript==
// @name         e-sim移除左侧栏倒计时，减少CPU占用
// @namespace    ESRCD
// @version      0.1.1
// @description  xaria服除外喵~
// @author       Exsper
// @match        http://*.e-sim.org/*
// @match        https://*.e-sim.org/*
// @exclude      http://alpha.e-sim.org/*
// @exclude      https://alpha.e-sim.org/*
// @exclude      http://luna.e-sim.org/*
// @exclude      https://luna.e-sim.org/*
// @grant        none
// ==/UserScript==

var tl = $("#timerLimits");
if(tl.length > 0)
{
    tl.remove();
}
else
{
    var left = $("#stats").parent();
    var tcd = $(".timeCountdown", left);
    tcd.parent().remove();
}