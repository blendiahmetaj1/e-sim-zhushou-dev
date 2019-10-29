// ==UserScript==
// @name         e-Sim TournamentEventsList
// @namespace    Exsper
// @version      0.18
// @description  自动搜集未开始的杯赛，与ExEsimEventsExcalibur配合使用。
// @author       Exsper
// @include     /https?:\/\/.+\.e-sim\.org\/tournamentEvents\.html/
// @grant        none
// ==/UserScript==

function GetTournament(url, ID, isNext){
    var fullUrl = url + ID.toString();
    var newUrl = window.location.protocol+"//"+document.domain+"/"+fullUrl;
    console.log(fullUrl);
        $.ajax({
            url : fullUrl,
            type : 'GET',
            async : false,
            dataType : 'html',
            success : function (data) {
                if (data != null) {
                    var tdw = $(".testDivwhite", data);
                    if (tdw.size()<=0)
                    {
                        //网页出错
                        console.log("未找到testDivwhite");
                        //$('#telist').append("<br /><br />获取结束");
                        return;
                    }
                    else if (tdw.size()<=1)
                    {
                        //已过时，或者为淘汰赛/军团淘汰赛
                        var tf = $(".tournament-state-info", data);
                        if (tf.size()<=0)
                        {
                            console.log("已过时");
                            if (isNext === true)
                            {
                                GetTournament(url, ID+1, true);
                            }
                            else
                            {
                                return;
                            }
                        }
                        else if (tf[0].innerText=="")
                        {
                            return;
                        }
                        else
                        {
                            var cupname = "New Cup Tournament";
                            if (tf.prev().text().indexOf("Military")>=0) cupname = "Military Cup Tournament";
                            else if ((tf.prev().text() == "") && (tf.prev().prev().text().indexOf("Country")>=0)) cupname = "Country Tournament";
                            else if ((tf.prev().text() == "") && (tf.prev().prev().text().indexOf("RW Tournament")>=0)) cupname = "RW Tournament";
                            var tfTime = tf[0].innerText.split(" ");
                            //已结束：Finished =1或2（淘汰赛）
                            //进行中：Day 1 (rounds 1-5)Round 1 =5
                            //第一天：Start: 17:00 22-08-2017 =3
                            //第二天：Day 2 (rounds 6-final)Next round: 16:00 22-08-2017 =7
                            if (tfTime.length<3) //已结束
                            {
                                console.log("已过时");
                                if (isNext === true)
                                {
                                    GetTournament(url, ID+1, true);
                                }
                                else
                                {
                                    return;
                                }
                            }
                            else if (tfTime.length<4) //第一天
                            {
                                if ((cupname == "Country Tournament") || (cupname == "RW Tournament"))
                                {
                                    console.log(newUrl+" "+cupname+" start:" + " "+tfTime[2]+" "+tfTime[1]+":00");
                                    $('#telist').append(newUrl+" "+cupname+" start:" + " "+tfTime[2]+" "+tfTime[1]+":00"+"<br />");
                                }
                                else
                                {
                                    console.log(newUrl+" "+cupname+" FirstDay start:" + " "+tfTime[2]+" "+tfTime[1]+":00");
                                    $('#telist').append(newUrl+" "+cupname+" FirstDay start:" + " "+tfTime[2]+" "+tfTime[1]+":00"+"<br />");
                                }
                                if (isNext === true)
                                {
                                    GetTournament(url, ID+1, true);
                                }
                                else
                                {
                                    return;
                                }
                            }
                            else if (tfTime.length<6) //进行中
                            {
                                console.log(tfTime[0]+" "+tfTime[1]+" 进行中");
                                if (isNext === true)
                                {
                                    GetTournament(url, ID+1, true);
                                }
                                else
                                {
                                    return;
                                }
                            }
                            else //第二天
                            {
                                console.log(newUrl+" "+cupname+" SecondDay start:" + " "+tfTime[6]+" "+tfTime[5]+":00");
                                $('#telist').append(newUrl+" "+cupname+" SecondDay start:" + " "+tfTime[6]+" "+tfTime[5]+":00"+"<br />");
                                if (isNext === true)
                                {
                                    GetTournament(url, ID+1, true);
                                }
                                else
                                {
                                    return;
                                }
                            }
                        }
                    }
                    else
                    {
                        //过时的单挑杯tdw.size()也大于1
                        if(tdw[0].innerHTML.length>50)
                        {
                            console.log("已过时");
                            if (isNext === true)
                            {
                                GetTournament(url, ID+1, true);
                            }
                            else
                            {
                                return;
                            }
                        }
                        else
                        {
                            console.log(newUrl+" "+tdw[0].innerHTML.replace(/[\r\n\t]/g, ""));
                            $('#telist').append(newUrl+" "+tdw[0].innerHTML.replace(/[\r\n\t]/g, "")+"<br />");
                            if (isNext === true)
                            {
                                GetTournament(url, ID+1, true);
                            }
                            else
                            {
                                return;
                            }
                        }
                    }
                }
            },
            error : function() {
                alert("获取网页出错");
                return;
            }
        });
}

function PrefixInteger(num, n) { //前位补零，便于排序
    return (Array(n).join(0) + num).slice(-n);
}

function createList() {
    var divTournamentEvents = $(".dataTable :first");
    var divList = $("<div class='testDivblue'></div>");
    divTournamentEvents.before(divList);
    var table = $("<table></table>");
    divList.append(table);
    var textbox = $("<input type='text' id='tournamentEventID'></input>");
    table.append(textbox);
    var trs = $(".eventTable").find("tr:gt(0)");
    var keys = [];
    trs.each(function(index, tr){
        var td = $(this).children("td:eq(1)");
        var atd = td.children();
        var num = parseInt(atd.attr("href").split("=")[1]);
        var numa = PrefixInteger(num, 3);
        td.parent().attr("id", numa+"-"+index);
        keys.push(numa+"-"+index);
        atd.text(atd.text()+" ("+num+")");
    });
    //排序
    keys.sort();
    $.each(keys, function(index, value) {
        var trId = value;
        $(".tableHeader").after($("#" + trId));
    });

    var newestID = $(".eventTable").find("tr:eq(1)").children("td:eq(1)").children();
    if (newestID.length >0)
    {
        textbox.val(newestID.attr("href").split("=")[1]);
    }

    var btnCheck = $("<input type='button' id='checkbtn' value='开始检查杯赛！'></input> ");
    table.append(btnCheck);
    var btnCTCheck = $("<input type='button' id='checkCTbtn' value='开始检查国家自选杯！'></input> ");
    table.append(btnCTCheck);
    var btnRWCheck = $("<input type='button' id='checkRWbtn' value='开始检查起义杯！'></input> ");
    table.append(btnRWCheck);
    table.append("<br/>");
    var btnOneCheck = $("<input type='button' id='checkonebtn' value='仅检查该杯赛'></input> ");
    table.append(btnOneCheck);
    var btnOneCTCheck = $("<input type='button' id='checkoneCTbtn' value='仅检查该国家自选杯'></input> ");
    table.append(btnOneCTCheck);
    var btnOneRWCheck = $("<input type='button' id='checkoneRWbtn' value='仅检查该起义杯'></input> ");
    table.append(btnOneRWCheck);

    table.append("<br/>");
    var telist = $("<p id='telist'>输入起始id，点击开始检查</p>");
    table.append(telist);
    $('#checkbtn').click(function () {
        var id = parseInt($('#tournamentEventID')[0].value);
        if (id<=0 || id.isNaN==true || id == null)
        {
            $('#telist').text("id错误");
            return;
        }
        $('#telist').text("");
        $('#telist').append("<br />");
        GetTournament('tournamentEvent.html?id=', id, true);
    });
    $('#checkonebtn').click(function () {
        var id = parseInt($('#tournamentEventID')[0].value);
        if (id<=0 || id.isNaN==true || id == null)
        {
            $('#telist').text("id错误");
            return;
        }
        $('#telist').text("");
        $('#telist').append("<br />");
        GetTournament('tournamentEvent.html?id=', id, false);
    });

    $('#checkCTbtn').click(function () {
        var id = parseInt($('#tournamentEventID')[0].value);
        if (id<=0 || id.isNaN==true || id == null)
        {
            $('#telist').text("id错误");
            return;
        }
        $('#telist').text("");
        $('#telist').append("<br />");
        GetTournament('countryTournament.html?id=', id, true);
    });
    $('#checkoneCTbtn').click(function () {
        var id = parseInt($('#tournamentEventID')[0].value);
        if (id<=0 || id.isNaN==true || id == null)
        {
            $('#telist').text("id错误");
            return;
        }
        $('#telist').text("");
        $('#telist').append("<br />");
        GetTournament('countryTournament.html?id=', id, false);
    });

    $('#checkRWbtn').click(function () {
        var id = parseInt($('#tournamentEventID')[0].value);
        if (id<=0 || id.isNaN==true || id == null)
        {
            $('#telist').text("id错误");
            return;
        }
        $('#telist').text("");
        $('#telist').append("<br />");
        GetTournament('rwTournament.html?id=', id, true);
    });
    $('#checkoneRWbtn').click(function () {
        var id = parseInt($('#tournamentEventID')[0].value);
        if (id<=0 || id.isNaN==true || id == null)
        {
            $('#telist').text("id错误");
            return;
        }
        $('#telist').text("");
        $('#telist').append("<br />");
        GetTournament('rwTournament.html?id=', id, false);
    });

}


$(document).ready(function () {
    createList();
});