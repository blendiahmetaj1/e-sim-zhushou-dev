// ==UserScript==
// @name         测试服头像修正
// @namespace    TesturaAvatarFix
// @version      0.1
// @description  try to take over the world!
// @author       Exsper
// @match        *://testura.e-sim.org/*
// @grant        none
// ==/UserScript==
$("img").each(function(){
    var t = $(this);
    var s = t.attr("src");
    if (s.indexOf("xix.e-sim.org:3000/avatarsXix")>0)
    {
        s = s.replace("xix.e-sim.org:3000/avatarsXix","testura.e-sim.org:3000/avatarsXix");
        t.attr("src",s);
    }
});