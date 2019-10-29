// ==UserScript==
// @name         e-sim Equipment Split Fix
// @namespace    ESimEQSF
// @version      0.1
// @description  Remove split button's click event
// @author       Exsper
// @match        http://*.e-sim.org/storage.html?storageType=EQUIPMENT*
// @match        https://*.e-sim.org/storage.html?storageType=EQUIPMENT*
// @grant        none
// ==/UserScript==

$('.splitItemsButton').unbind("click");