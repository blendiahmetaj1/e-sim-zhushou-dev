// ==UserScript==
// @name         去掉e-sim首页右上角的滚动显示
// @namespace    EsimDeleteSliders
// @version      0.1
// @description  去掉xaria首页右上角的滚动显示
// @author       Exsper
// @match        http://*.e-sim.org/index.html*
// @match        https://*.e-sim.org/index.html*
// @grant        none
// ==/UserScript==

$ms = $(".mySlides");
$pa = $("#slider").parent();
if ($ms.length>0)
{
    $.each($ms, function(i, mySlides) {
        if($(mySlides).children("a").length >0 || $(mySlides).children("div").length >0 )
            $("#slider").before($(mySlides));
    });
    $fib = $pa.children(".fpInfoBox"); //军令
    if ($fib.length>0)
    {
        $.each($fib, function(i, fpInfoBox) {
            var newDiv = $("<div>", {class:"mySlides"});
            $("#slider").before($(newDiv));
            $(fpInfoBox).css("padding-top: 0px;padding-bottom: 0px;");
            $(fpInfoBox).appendTo(newDiv);
        });
        $(".fpInfoBoxWhiteFrame").children("p").remove();
    }
    $fib = $pa.children(".testDivblue"); //杯赛
    if ($fib.length>0)
    {
        $.each($fib, function(i, Box) {
            var newDiv = $("<div>", {class:"mySlides"});
            $("#slider").before($(newDiv));
            $(Box).appendTo(newDiv);
        });
    }
    $("#slider").remove();
}
