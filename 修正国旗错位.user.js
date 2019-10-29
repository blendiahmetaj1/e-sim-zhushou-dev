// ==UserScript==
// @name         修正国旗错位
// @namespace    EsimFixFlag
// @version      0.1
// @description  修正国旗错位，esim助手的未来版本将添加这个功能，到时请删除该插件
// @author       Exsper
// @match        http://*.e-sim.org/*
// @match        https://*.e-sim.org/*
// @grant        GM_addStyle
// ==/UserScript==

$(document).ready(function(){
    GM_addStyle(".xflagsSmall{display:inline-block;vertical-align:bottom;margin:1px!important;padding:0!important;} .xflagsMedium{display:inline-block;} .xflagsBig{display:inline-block;} ");
});