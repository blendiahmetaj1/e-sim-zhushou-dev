// ==UserScript==
// @name         esim 召唤小怪物！
// @namespace    EsimSLM
// @version      0.1
// @description  在 esim 个人信息编辑页面 直接创建小怪物，不用再去找了
// @author       Exsper
// @match        http://*.e-sim.org/editCitizen.html*
// @match        https://*.e-sim.org/editCitizen.html*
// @grant        none
// ==/UserScript==

var box = $("#editProfileBox");
var form = $('<div id="halloweenBoxContainer"><div id="halloween"><b>你好！</b><br>我想和你做个交易，来选一个吧：<br><b><form action="checkCitizenFlag.html" method="POST" style="display:inline-block;"><input type="hidden" name="action" value="HALLOWEEN"><input type="hidden" name="bonus" value="TRICK"><input type="submit" value="trick" class="hbf"></form>or<form action="checkCitizenFlag.html" method="POST" style="display:inline-block;"><input type="hidden" name="action" value="HALLOWEEN"><input type="hidden" name="bonus" value="TREAT"><input type="submit" value="treat" class="hbf"></form></b></div><div id="halloweenTail"></div></div> ');
box.prepend(form);