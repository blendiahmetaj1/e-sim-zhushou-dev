// ==UserScript==
// @name           yamiao
// @namespace      nidongde
// @version        0.1.4 pinetree (edited-1)
// @grant          GM_getValue
// @grant          GM_setValue
// @include        http://*.e-sim.org/battle.html*
// @include        https://*.e-sim.org/battle.html*
// @include        http://testura.e-sim.org:8000/battle.html*
// @require        http://code.jquery.com/jquery-1.6.2.min.js
// ==/UserScript==

//20131215
//修正血条动画显示不及时的问题
//增加隐藏功能，便于看时间。位置是在鸡血下面的那个勾选框
//20131231
//隐藏功能增加说明文字，同时也会隐藏左边状态栏部分无用信息，方便查看食物礼物的余量
//增加选择食物/礼物时，如果选中的储量比使用限额小，则弹出警告框
//修改一键恢复体力按钮[Recover]的功能，如果选择的食物储量为0，即使使用限额还有的情况下，也会直接使用选择的礼物
//20140102
//在顶上增加两个计时器，默认是在T2(00:02:59)和T5(00:05:59)弹出浏览器的警告窗口
//如果希望在其他时间警告的，请自行修改【T2=2】和【T5=5】中等号右边的数字，左边的数字不能改
//20140209
//优化加速刷新的处理
//增加自动打枪（一枪5枪两个按钮   TODO：启动后弹出信息 自动输出开始:1枪 面包:Q5x20 礼物:Q5x10 优先面包 直到体力用尽/打n枪
//增加自动打枪的枪数控制
//增加优先吃礼物设定（勾选项
//减少按钮行高，调整设定勾选项和状态的位置
//20140211
//增加自动压秒输出间隔，并且改为可以方便自定义的模式
//增加对输出CD提示的警示信息，可能已经修正部分网速不够的情况下体力等信息表示不正常的情况
//修改自动输出统计，被提示CD的情况下不统计，根据网络情况，可能造成

//temp
//POST http://primera.e-sim.org/fight.html
//weaponQuality=1&battleRoundId=168162&side=defender&value=undefined
//battleRoundId	168162
//side	defender
//value	undefined
//weaponQuality	1

//weaponQuality=1&battleRoundId=168162&side=defender&value=Berserk

//battleRoundId  战场id
//side	defender
//value	Berserk
//weaponQuality	0-5
// =======================

var BIG_PAUSE = 5000;  // 连打之后的暂停起始毫秒数

//自动压秒打枪最小间隔，单位毫秒，根据需要修改
//此基础上加上随机毫秒数
var FIGHT_PAUSE_BASE = 500;
//自动压秒恢复最小间隔，一般无需修改
var RECOVER_PAUSE_BASE = 200;
//此基础上加上随机毫秒数
// 停顿的随机毫秒数最大值, 产生的随机数在1到此最大值之间
var RANDOM_PAUSE_MAX = 500;// 自动打基本停顿

//如果自动打太快，每次被系统警告, 加一个暂停
var SLOW_DOWN_PAUSE = 500;  // 收到系统说打慢一点之后，停多少毫秒再试
var CONT_HIT_MAX = 4;  // 最大能连续打四下就要大暂停

var contHitCnt = 0;  // 大暂停之后连续打了多少下
var slowDownFlag = false;

//压秒已发送打枪请求上限次数，防止网络不好的情况下发送请求爆表，被服务器拒绝，然后彻底不动了。包括手点输出
var X_FIGHT_REQUEST_LIMIT = 1;

var TIME_OUT = 15000;
var testflg = true;
CountryFlgMap = {
	"Poland"				 : "1",
	"Russia"				 : "2",
	"Germany"				 : "3",
	"France"				 : "4",
	"Spain"					 : "5",
	"United-Kingdom"		 : "6",
	"Italy"					 : "7",
	"Hungary"				 : "8",
	"Romania"				 : "9",
	"Bulgaria"				 : "10",
	"Serbia"				 : "11",
	"Croatia"				 : "12",
	"Bosnia-and-Herzegovina" : "13",
	"Greece"				 : "14",
	"Republic-of-Macedonia"	 : "15",
	"Ukraine"				 : "16",
	"Sweden"				 : "17",
	"Portugal"				 : "18",
	"Lithuania"				 : "19",
	"Latvia"				 : "20",
	"Slovenia"				 : "21",
	"Turkey"				 : "22",
	"Brazil"				 : "23",
	"Argentina"				 : "24",
	"Mexico"				 : "25",
	"USA"					 : "26",
	"Canada"				 : "27",
	"China"					 : "28",
	"Indonesia"				 : "29",
	"Iran"					 : "30",
	"South-Korea"			 : "31",
	"Taiwan"				 : "32",
	"Israel"				 : "33",
	"India"					 : "34",
	"Australia"				 : "35",
	"Netherlands"			 : "36",
	"Finland"				 : "37",
	"Ireland"				 : "38",
	"Switzerland" 			 : "39",
	"Belgium" 				 : "40",
	"Pakistan" 				 : "41",
	"Malaysia" 				 : "42",
	"Norway" 				 : "43",
	"Peru" 					 : "44",
	"Chile" 				 : "45",
	"Colombia" 				 : "46",
	"Czech-Republic" 		 : "51",
	"Belarus" 				 : "52",
	"Estonia" 				 : "53",
	"Philippines" 			 : "54",
	"Bangladesh" 			 : "59",
	"Thailand" 				 : "63"
};

//各战场的设置各自保存
function getLocalStorage(id,d) {
//	alert(GM_getValue(RoundId+"_"+id,d));
	return GM_getValue(BattleId+"_"+id,d);
}
function setLocalStorage(id,v) {
	GM_setValue(BattleId+"_"+id,v);
}

// 随机毫秒数
function randomMillis() {
	return Math.floor((Math.random() * RANDOM_PAUSE_MAX) + 1);
}

// 每次打枪之间的间隔
function getFightPause() {
	var pauseMillis = FIGHT_PAUSE_BASE;

	if (slowDownFlag) {
		contHitCnt = 0;
		slowDownFlag = false;
		pauseMillis += SLOW_DOWN_PAUSE;
	} else if (contHitCnt >= CONT_HIT_MAX) {
		contHitCnt = 0;
		pauseMillis += BIG_PAUSE;
		// debug purpose
//		alert("Big pause!");
	}
	return pauseMillis + randomMillis();
}

// 恢复体力后的间隔
function getRecoverPause() {
	contHitCnt = 0;
	return RECOVER_PAUSE_BASE + randomMillis();
}

//打枪post请求用
var RoundId = $("#battleRoundId").val();
//保存设置用
var BattleId = $("a[href^='battleStatistics.html']").attr("href").split("=")[1];

//鸡血请求用（用户id/国籍/战场回合id）
var UpdDataString = 'id=' + RoundId;
zhanghao=$("#userName").attr("href").split("=")[1];
//guoji=$("#stats a[href='pendingCitizenshipApplications.html']").prev().attr("class").split(" ")[1];
guoji = $('a[href^="region.html?id="][href!="region.html?id="]').first().children().attr('class').split(" ").pop();
UpdDataString += '&at='+zhanghao;
UpdDataString += '&ci='+CountryFlgMap[guoji];

$(document).ready(function() {
	//=====================================
	//定时提醒
	//=====================================
	var TIMER_SEP=2000;
	var T2=10;
	var T5=5;
	function timerInit() {
		tmps=document.getElementById('contentDrop').parentNode;
		tt = document.createElement("div");
		tt.style.textAlign = "left";
		tt.innerHTML = ""
					 + "<input type='checkbox' id='timerT"+T2+"' style='float:left; width: 13px; top:12px;'/>"
					 + "<b id='timerT2Txt' style='text-align:left; float:left; font-size: 11px;color: #F2F2F2;'>T"+T2+"提醒</b>"
					 + "<p style='float: left; width: 10px'> </p>"
					 + "<input type='checkbox' id='timerT"+T5+"' style='float:left; width: 13px; top:12px;'>"
					 + "<b id='timerT5Txt' style='text-align:left; float:left; font-size: 11px;color: #F2F2F2;'>T"+T5+"提醒</b>"
					 + "<p style='float: left; width: 10px'> </p>"
					 ;
		tmps.insertBefore(tt, tmps.children[0]);
		newwidth=Number($(tmps).css("width").replace("px",""))+160;
		$(tmps).css("width",newwidth+"px");

		valT2=getLocalStorage("TIMER_CHK_T"+T2,false);
		if (valT2) {
			$("#timerT"+T2).attr("checked",valT2);
			timerClickComm($("#timerT"+T2)[0],T2);
		}
		valT5=getLocalStorage("TIMER_CHK_T"+T5,false);
		if (valT5) {
			$("#timerT"+T5).attr("checked",valT5);
			timerClickComm($("#timerT"+T5)[0],T5);
		}

//		tmps=document.getElementById('contentDrop').parentNode.parentNode.parentNode;
//		$(tmps).append("<p style='clear: both'></p><ul class='foundation-left' >"+tt.innerHTML+"</ul>")

	}
	timerInit();
	//根据T2或者T2计算出计时器到时间的时间点
	function getTimeOutPos(t,sp) {
		return (getNow()+(Number(sp[0])*3600+Number(sp[1]-t)*60+Number(sp[2])-59));
	}
	//取得当前时间(s)
	function getNow() {
		return Math.floor((new Date().getTime())/1000);
	}
	function timerT2() {
		t=getLocalStorage("TIMER_LEFT_T"+T2,0);
		if (t != 0 && t < getNow()) {
			clearBattleTimer(T2);
			alert("T"+T2+" ☆ DA'ZE");
		}
	}
	function timerT5() {
		t=getLocalStorage("TIMER_LEFT_T"+T5,0);
		if (t != 0 && t < getNow()) {
			clearBattleTimer(T5);
			alert("T"+T5+"准备");
		}
	}
	function setBattleTimer(k) {
		if (k == T2) {
			setLocalStorage("TIMER_ID_T"+T2,window.setInterval(timerT2, TIMER_SEP));
		} else if (k == T5) {
			setLocalStorage("TIMER_ID_T"+T5,window.setInterval(timerT5, TIMER_SEP));
		}
	}
	function clearBattleTimer(k) {
		window.clearInterval(getLocalStorage("TIMER_ID_T"+k,99));
	}
	function timerClickComm(xxx,k) {
		setLocalStorage("TIMER_CHK_T"+k,xxx.checked);
		if (xxx.checked) {
			sp=$("#roundCountdown").children(":eq(0)").text().split(":");
			if (Number(sp[0]) == 0 && Number(sp[1]) < k) {
				alert("已经进入T" + k + "，进入下回合后重新刷新页面有效");
			} else {
				setLocalStorage("TIMER_LEFT_T"+k,getTimeOutPos(k,sp));
				setBattleTimer(k);
			}
		} else {
			setLocalStorage("TIMER_LEFT_T"+k,0);
			clearBattleTimer(k);
		}
	}
	$("#timerT"+T2).click(function() {
		timerClickComm(this,T2);
	});
	$("#timerT"+T5).click(function() {
		timerClickComm(this,T5);
	});


	//=====================================
	//鸡血：原画面js
	//=====================================
	//更新战况（？？
    function replaceHit(hitDiv, wholeDiv) {
        $(hitDiv).fadeOut('fast', function() {
            $(hitDiv).html(wholeDiv);
            $(hitDiv).fadeIn('fast');
        });
    }
	//更新战况（最新
    function updateHit(hitDiv, newInfluence, newPlayerName, wholeDiv) {
        if ($(hitDiv + " > div > a").text() == null || ($(hitDiv + " > div > a").text() != newPlayerName && escape($(hitDiv + " > div > a").text()) != '%u2605%20' + newPlayerName)) {
            replaceHit(hitDiv, wholeDiv);
            return;
        }

        if ($(hitDiv + " .hitInfl").text() == newInfluence)
            return;

        $(hitDiv + " .hitInfl").fadeOut('fast', function() {
            $(hitDiv + " .hitInfl").text(newInfluence);
            $(hitDiv + " .hitInfl").fadeIn('fast');
        });
    }
	//更新战况（排名
    function updateBattleHeros(topAttackers, topDefenders) {
        if (topAttackers.length >= 1)
            updateHit("#topAttacker1", topAttackers[0].influence, topAttackers[0].playerName, topAttackers[0].htmlCode);
        if (topAttackers.length >= 2)
            updateHit("#topAttacker2", topAttackers[1].influence, topAttackers[1].playerName, topAttackers[1].htmlCode);
        if (topAttackers.length >= 3)
            updateHit("#topAttacker3", topAttackers[2].influence, topAttackers[2].playerName, topAttackers[2].htmlCode);

        if (topDefenders.length >= 1)
            updateHit("#topDefender1", topDefenders[0].influence, topDefenders[0].playerName, topDefenders[0].htmlCode);
        if (topDefenders.length >= 2)
            updateHit("#topDefender2", topDefenders[1].influence, topDefenders[1].playerName, topDefenders[1].htmlCode);
        if (topDefenders.length >= 3)
            updateHit("#topDefender3", topDefenders[2].influence, topDefenders[2].playerName, topDefenders[2].htmlCode);
    }
	//更新战况（总分
    function updateStatus(attackerScore, defenderScore, remainingTimeInSeconds, percentAttackers) {
		var flg = false;

        if ($("#attackerScore").text() != attackerScore) {
            $("#attackerScore").fadeOut('fast', function() {
                $("#attackerScore").text(attackerScore);
                $("#attackerScore").fadeIn('fast');
            });
			flg = true;
        }
        if ($("#defenderScore").text() != defenderScore) {
            $("#defenderScore").fadeOut('fast', function() {
                $("#defenderScore").text(defenderScore);
                $("#defenderScore").fadeIn('fast');
            });
			flg = true;
        }
        //本地处理
        if (flg) setCustomScores(attackerScore, defenderScore);

        var percentDefenders = 100.0 - percentAttackers;
        percentDefenders = roundToTwo(percentDefenders);
        percentAttackers = roundToTwo(percentAttackers);
        $("#battleProgress > div").animate({
            width: percentDefenders + '%'
        });

        $("#leftStat").fadeOut('fast', function() {
            $("#leftStat").text(percentDefenders + '%');
            $("#leftStat").fadeIn('fast');
        });
        $("#rightStat").fadeOut('fast', function() {
            $("#rightStat").text(percentAttackers + '%');
            $("#rightStat").fadeIn('fast');
        });

        if ($("#defenderPercent").text() != percentDefenders + "%") {
            $("#defenderPercent").fadeOut('fast', function() {
                $("#defenderPercent").text(percentDefenders + "%");
                $("#defenderPercent").fadeIn('fast');
            });
            $("#attackerPercent").fadeOut('fast', function() {
                $("#attackerPercent").text(percentAttackers + "%");
                $("#attackerPercent").fadeIn('fast');
            });
        }

    }

	//=====================================
	//鸡血
	//=====================================
	//鸡血：比分
	function makeScroe(id, diff, flg) {
		document.getElementById(id).innerHTML = flg + diff.toFixed(0) + "w";
	}
	//鸡血：输出速度 w/s
	function makeSpeed(newdef, newatk) {
		newTime = new Date();
		newTime = newTime.getTime();
		oldTime = parseInt($("#lastTime").val());
		if (oldTime != 0) {
			difftime = newTime - oldTime;
//			olddef = parseInt($("#mLastDmg").val());
//			oldatk = parseInt($("#sLastDmg").val());
			diffdef = newdef-parseInt($("#mLastDmg").val());
			diffatk = newatk-parseInt($("#sLastDmg").val());
			if (diffdef != 0 || diffatk != 0) {
				$("#mScoreSpeed").html(((diffdef)/10/difftime).toFixed(1) + "w/s");
				$("#sScoreSpeed").html(((diffatk)/10/difftime).toFixed(1) + "w/s");

				$("#mHisScore").html("↑ "+(diffdef/10000).toFixed(0)+"w");
				$("#sHisScore").html("↑ "+(diffatk/10000).toFixed(0)+"w");

//				$("#mHisScore3").html($("#mHisScore2").html());
//				$("#mHisScore2").html($("#mHisScore1").html());
//				$("#mHisScore1").html((diffdef/10000).toFixed(0)+"w");
//				$("#sHisScore3").html($("#sHisScore2").html());
//				$("#sHisScore2").html($("#sHisScore1").html());
//				$("#sHisScore1").html((diffatk/10000).toFixed(0)+"w");
			}
		}
		$("#lastTime").val(newTime);
		$("#mLastDmg").val(newdef);
		$("#sLastDmg").val(newatk);
	}
	//鸡血：总分
	function setCustomScores(attackerScore, defenderScore) {
		def=parseInt(defenderScore.replace(/,/g,""));
		atk=parseInt(attackerScore.replace(/,/g,""));
		diff=(def-atk)/10000;
		if (diff > 0) {
			makeScroe("mCustomScore",diff,"+");
			makeScroe("sCustomScore",diff,"-");
		} else if (diff < 0) {
			makeScroe("mCustomScore",-diff,"-");
			makeScroe("sCustomScore",-diff,"+");
		} else {
			document.getElementById('mCustomScore').innerHTML="0";
			document.getElementById('sCustomScore').innerHTML="0";
		}
		makeSpeed(def, atk);
	}
	//鸡血：主处理
	function sendUpdateRequest2() {

		$.ajax({
			type: "GET",
			url: "battleScore.html",
			data: UpdDataString,
			dataType: "json",
			//timeout: TIME_OUT,
			error: function(msg) {
//				alert("error");
				//sendUpdateRequest2();
				window.setTimeout(function() {
	                sendUpdateRequest2();
	            }, 1000);
			},
			success: function(msg) {
//				alert("ok");
//				alert(msg);
				setLocalStorage("UPD_RUN_CNT",Number(getLocalStorage("UPD_RUN_CNT",0))-1);

                updateStatus(msg.attackerScore, msg.defenderScore, msg.remainingTimeInSeconds, msg.percentAttackers);
                updateBattleHeros(msg.topAttackers, msg.topDefenders);
                updateTop10(msg.top10Attackers, msg.top10Defenders);
                updateBattleMonitor(msg);
                updatePlace(msg.yourPlace);
                updateTotalDamage(msg.totalPlayerDamage);

//                for (var i = 0; i < msg.recentAttackers.length; i++) {
//                    if (msg.recentAttackers[i].id == latestAttackerId) {
//                        msg.recentAttackers = msg.recentAttackers.slice(0, i);
//                        break;
//                    }
//                }
//                for (var i = 0; i < msg.recentDefenders.length; i++) {
//                    if (msg.recentDefenders[i].id == latestDefenderId) {
//                        msg.recentDefenders = msg.recentDefenders.slice(0, i);
//                        break;
//                    }
//                }
//                if (msg.recentAttackers.length != 0) {
//                    latestAttackerId = msg.recentAttackers[0].id;
//                    attackerHits = msg.recentAttackers;
//                }
//                if (msg.recentDefenders.length != 0) {
//                    latestDefenderId = msg.recentDefenders[0].id;
//                    defenderHits = msg.recentDefenders;
//                }
//
//                if (msg.open == false)
//                    continueThread = false;
			}
		});

	}

	//鸡血：启动
	function sendUpdateRequest() {

		//alert("continueThread="+continueThread);
//		if (!continueThread)
//			return;

		runcnt = Number(getLocalStorage("UPD_RUN_CNT",0));

		$("#updInfoTxt").text("总分刷新加速中…" + runcnt);
//		alert(runcnt);
		if (runcnt >= X_FIGHT_REQUEST_LIMIT) {
			return;
		}
		setLocalStorage("UPD_RUN_CNT",++runcnt);
		sendUpdateRequest2();
	}

	$("#updInfo").click(function() {
		if (this.checked) {
			$("#updInfoTxt").text("总分刷新加速中…");

			//alert("go");
			setLocalStorage("speedup",window.setInterval(sendUpdateRequest, 1000));
			$("#isrun").text("");
			//alert("go");
		} else {
			$("#updInfoTxt").text("比分刷新加速(鸡血)");
			window.clearInterval(getLocalStorage("speedup",99));
			$("#isrun").text(" 暂停");
		}
	});

	var isGiftFstFlg=false;
	//=====================================
	//恢复：原画面js
	//=====================================
	//恢复：状态更新
	function updateCitizenStatus(msg) {
        var json = jQuery.parseJSON(msg);
        $("#foodLimit").html(json.foodLimit);
        $("#giftLimit").html(json.giftLimit);
        $("#foodLimit2").html(json.foodLimit);
        $("#giftLimit2").html(json.giftLimit);
        $("#wellness").html(json.wellness);
        $("#healthBar").html(json.wellness);
//        $("#healthProgress .ui-progressbar-value").animate({
//            width: json.wellness + "%"
//        }, {
//            queue: false
//        });
		$("#healthProgress .ui-progressbar-value").width(json.wellness + "%");
        $("#actualHealth").html(json.wellness);
        $("#foodQ1").html("<b>Q1</b><br>" + json.q1FoodStorage);
        $("#foodQ2").html("<b>Q2</b><br>" + json.q2FoodStorage);
        $("#foodQ3").html("<b>Q3</b><br>" + json.q3FoodStorage);
        $("#foodQ4").html("<b>Q4</b><br>" + json.q4FoodStorage);
        $("#foodQ5").html("<b>Q5</b><br>" + json.q5FoodStorage);
        $("#giftQ1").html("<b>Q1</b><br>" + json.q1GiftStorage);
        $("#giftQ2").html("<b>Q2</b><br>" + json.q2GiftStorage);
        $("#giftQ3").html("<b>Q3</b><br>" + json.q3GiftStorage);
        $("#giftQ4").html("<b>Q4</b><br>" + json.q4GiftStorage);
        $("#giftQ5").html("<b>Q5</b><br>" + json.q5GiftStorage);
        $("#sfoodQ1").html("<b>Q1</b><br>" + json.q1FoodStorage);
        $("#sfoodQ2").html("<b>Q2</b><br>" + json.q2FoodStorage);
        $("#sfoodQ3").html("<b>Q3</b><br>" + json.q3FoodStorage);
        $("#sfoodQ4").html("<b>Q4</b><br>" + json.q4FoodStorage);
        $("#sfoodQ5").html("<b>Q5</b><br>" + json.q5FoodStorage);
        $("#sgiftQ1").html("<b>Q1</b><br>" + json.q1GiftStorage);
        $("#sgiftQ2").html("<b>Q2</b><br>" + json.q2GiftStorage);
        $("#sgiftQ3").html("<b>Q3</b><br>" + json.q3GiftStorage);
        $("#sgiftQ4").html("<b>Q4</b><br>" + json.q4GiftStorage);
        $("#sgiftQ5").html("<b>Q5</b><br>" + json.q5GiftStorage);

//		updateLocalCntByReal();
//		updateFightNum();

		if  (json.error!="") {
			$('#resInfo').html("<div>体力恢复失败："+json.error+"</div>");
		} else {
			$('#resInfo').html("<div>体力恢复成功，现在体力："+json.wellness+"</div>");
		}
//		if  (json.error!="") {
//		   		alert("eat error");
//			   $('#hiddenError').html(json.error);
//			   $.blockUI({ message: $('#eatError'), css: { width: '400px', border: '0px', background: 'rgba(255,255,255,0)' } });
//		}
	}

	//恢复用ajax请求参数
    function recoverType() {
//    	alert($("#foodQ"+$("#foodQuality").val()).get(0).lastChild.data)
    	if (isGiftFstFlg) {
	    	if ($("#giftLimit2").html() != "0" && $("#sgiftQ"+$("#giftQuality").val()).get(0).lastChild.data != "0") {
	    		return 2;
	    	} else if ($("#foodLimit2").html() != "0") {
	    		return 1;
	    	} else {
	    		return 0;
	    	}
    	} else {
	    	if ($("#foodLimit2").html() != "0" && $("#sfoodQ"+$("#foodQuality").val()).get(0).lastChild.data != "0") {
	    		return 1;
	    	} else if ($("#giftLimit2").html() != "0") {
	    		return 2;
	    	} else {
	    		return 0;
	    	}
    	}
    }
    //恢复请求
	function sendRecoverRequest() {
		t = recoverType();

		if (t == 1) {
			urltxt = "eat.html";
			dataString = 'quality=' + $("#foodQuality").val();
		} else if (t == 2) {
			urltxt = "gift.html";
			dataString = 'quality=' + $("#giftQuality").val();
		} else {
			return;
		}
		$.ajax({
			type: "POST",
			url: urltxt,
			data: dataString,
//			timeout: TIME_OUT,
			beforeSend: function(msg) {
//				updateLocalCnt(t);
			},
			success: function(msg) {
				updateCitizenStatus(msg);
			}
		});
    }
	$("#recover").click(function() {
//		alert("recover")
		sendRecoverRequest();
	});
	$("#recover2").click(function() {
//		alert("recover2")
		sendRecoverRequest();
	});

	//=====================================
	//画面选择项保存
	//=====================================
	function initNewSelect(newid,id,d) {
		val=GM_getValue(BattleId+"_"+id,d);

		$("#"+newid).children().removeClass("ui-selected");

		//$("#selectable").find('.ui-selecting').eq(0).addClass("ui-selected");
		$("#"+newid).children(":eq("+(Number(val)-1)+")").addClass("ui-selected");
		//$("#selectable").children(":eq(4)").addClass("ui-selected");
		$('#'+id).attr('value',$('#'+newid+' li.ui-selected span > b').html().replace('Q',''));
//alert(val)


		//alert("id="+id+",value="+GM_getValue(BattleId+"_"+id,d));
		//$("#"+id).val();
	}
	function initSelect(id,d) {
		//alert("id="+id+",value="+GM_getValue(BattleId+"_"+id,d));
		$("#"+id).val(GM_getValue(BattleId+"_"+id,d));
	}
	//初始化
	function initxxx() {
//		$("#eatMenu").show();
//		$("#useGiftMenu").show();
//		$("#eatLink").hide();
//		$("#useGiftLink").hide();
		//initNewSelect("selectable","foodQuality","1");
		//initNewSelect("selectable2","giftQuality","1");
		//initSelect("weaponQuality","0");
		setLocalStorage("UPD_RUN_CNT",0);
	}
	initxxx();

	//初始化：食物选择保存
	$("#selectable").click(function() {
		setLocalStorage("foodQuality", $("#foodQuality").val());

		if (Number($("#foodQ"+$("#foodQuality").val()).get(0).lastChild.data) < Number($("#foodLimit").html())) {
			alert("选择的食物储量无法满足使用上限");
		}
	});
	//初始化：礼物选择保存
	$("#selectable2").click(function() {
		setLocalStorage("giftQuality", $("#giftQuality").val());

		if (Number($("#giftQ"+$("#giftQuality").val()).get(0).lastChild.data) < Number($("#giftLimit").html())) {
			alert("选择的礼物储量无法满足使用上限");
		}
	});
	//初始化：武器选择保存
	$("#weaponQuality").change(function() {
		setLocalStorage(this.id, this.value);
	});

	//=====================================
	//打枪
	//=====================================
	var fightReqCnt=0;
	var alertCnt=0;
	var lastReqTime=0;
	function sendFightRequest(side, val) {
//		alert("side="+side+",val="+val)
		var tmpNow=getNow();
		if ((tmpNow-lastReqTime)>10) {
			fightReqCnt=0;
		}
		lastReqTime=tmpNow;
		if (fightReqCnt>=X_FIGHT_REQUEST_LIMIT) {
			return;
		}
		fightReqCnt++;

		//weaponQuality=0&battleRoundId=115404&side=side&value=战斗（打一下）
		var dataString = "weaponQuality=" + $("#weaponQuality").attr("value")
		               + "&battleRoundId=" + $("#battleRoundId").val()
		               + "&side=" + side
		               + "&value=" + val;
//		alert(dataString);
		$.ajax({
			type: "POST",
			url: "fight.html",
			data: dataString,
//			timeout: TIME_OUT,
			error: function(msg) {
				fightReqCnt--;
				$("#resInfo").html(msg);
			},
			success: function(msg) {
				fightReqCnt--;
				if (msg.match("Slow down a bit")) {
					alertCnt++;
					slowDownFlag = true;  // 慢下来
					if (alertCnt>1) {
						$("#resInfo").html("Slow down a bit! 慢点！已经被服务器连续拒绝了！次数：" + alertCnt);
					} else {
						$("#resInfo").html("Slow down a bit!");
					}
				} else if (msg.match("No health left")) {
					$("#resInfo").html("No health left！快嗑药吧！");
				} else if (msg.match("delete.png")) {
					$("#resInfo").html(msg);
				} else {
					// 成功打出
					alertCnt=0;
					contHitCnt++;
					if (AUTO_FLG) {
						if (val==oneStr) {
							updAutoCnt(1);
							updAutoLeft(-1);
						} else {
							updAutoCnt(5);
							updAutoLeft(-5);
						}
					}

					tmp = msg.replace(/^[\d\D]*healthUpdate[^>]*?>([\d.]*) [\d\D]*$/,"$1");
					$("#wellness").html(tmp);
					$("#healthBar").html(tmp);
					//$("#healthProgress").children().css("width",tmp+"%");
					$("#healthProgress .ui-progressbar-value").width(tmp + "%");
					$("#actualHealth").html(tmp);


					//<a class="button" id="unblockButton" href="#"><span class="okIcon">OK</span></a>
					tmp = msg.replace(/<script [\d\D]*?<\/script>/m,"").replace('<a class="button" id="unblockButton" href="#"><span class="okIcon">OK</span></a>',"");
					$("#resInfo").html(tmp);
				}
			}
		});
	}
	$("#fight1").click(function() {
//		alert("fight1")
		sendFightRequest("side",oneStr);
	});
	$("#fight5").click(function() {
		sendFightRequest("side",fiveStr);
	});
	$("#dfight1").click(function() {
//		alert("dfight1")
		sendFightRequest("defender",oneStr);
	});
	$("#afight1").click(function() {
//		alert("afight1")
		sendFightRequest("attacker",oneStr);
	});
	$("#dfight5").click(function() {
		sendFightRequest("defender",fiveStr);
	});
	$("#afight5").click(function() {
		sendFightRequest("attacker",fiveStr);
	});

	//===========================================================
	// auto
	//===========================================================

//判断
//  当前体力
//  Min(选择的面包余量,面包使用余额)>0
//  Min(选择的礼物余量,礼物使用余额)>0
//有一项有剩余，则fight
//
//==================
//如果是1枪mode
//  (Min(选择的面包余量,面包使用余额)>0 或者 Min(选择的礼物余量,礼物使用余额)>0) 并且 体力为0
//则使用恢复
//
//==================
//如果是5枪mode
//
//·基本上下面几种模式
//  缺即补
//  空才补（补一次
//  空才补（尽量多
//  不足半即补（尽量多    →正常操作模式
//  不足半即补（至少补半
//
//不足半即补（尽量多
//  (Min(选择的面包余量,面包使用余额)>0 或者 Min(选择的礼物余量,礼物使用余额)>0) 并且 体力小于50
//
//==================
//共通：将1或者5作为参数带入
//恢复条件
//  (Min(选择的面包余量,面包使用余额)>0 或者 Min(选择的礼物余量,礼物使用余额)>0) 并且 体力小于(参数x10)
//停止条件
//  Min(选择的面包余量,面包使用余额)==0 并且 Min(选择的礼物余量,礼物使用余额)==0 并且 体力小于(参数x10)
//特殊
//  5的情况下，符合停止条件，也就是仅剩不足50体力的情况下，会进行单发将体力打完
//
//点击按钮后，将设定属性（1/5、side）保存至全局变量，同时使用一个全局变量进行整体控制
//因为网络延迟问题，考虑到余量或者余额或者当前体力未及时刷新的情况
//  余量或者余额未及时刷新的话：已经无法恢复却多次失败尝试恢复体力
//  当前体力未及时刷新的话：以为体力不足而多次尝试恢复，造成满体恢复失败
//仅仅只是延迟的话并不会造成死锁的问题，只要不出现无法恢复的网络问题
//TODO：而对于无法恢复的网络问题，应该会反复进行某一操作达到较高的次数（20次？）

	var AUTO_SIDE;
	var AUTO_MODE = 5;//1枪或者5枪
	var AUTO_MODE2 = 0;//0：无限制 1：枪数 2：墙高(未实装) autoLeftInput autoCntInput
	var AUTO_FLG = false;
	var AUTO_CNT = 0;
	var AUTO_LFT = 0;
	var AUTO_BTN_ID;
	var AUTO_BTN_STR;
	var AUTO_MODE_1_STR = "无限制";
	var autoFightPause = 100; // 实际打枪间隔，单位是毫秒，初始值没什么用

	function updAutoLeft(cnt) {
		if (AUTO_MODE2==1) {
			AUTO_LFT+=cnt;
			$("#autoLeftInput").val(AUTO_LFT);
		}
	}
	function updAutoCnt(cnt) {
		AUTO_CNT+=cnt;
		$("#autoCntInput").val(AUTO_CNT);
	}

	function updateFightPause() {
		autoFightPause = getFightPause();
		$("#fightPauseInput").val(autoFightPause);
	}

	function doAutoFight() {
//		alert("doAutoFight AUTO_FLG="+AUTO_FLG+",AUTO_MODE2="+AUTO_MODE2)
		if (!AUTO_FLG) {
			return;
		}
		if (AUTO_MODE2==1 && AUTO_LFT<=0) {
			initAuto();
			return;
		}

		//当前体力
		var heath=Number($("#actualHealth").html());

		//面包储量
		var foodCnt=Number($("#sfoodQ"+$("#foodQuality").val()).get(0).lastChild.data);
		//面包使用余额
		var foodLmt=Number($("#foodLimit2").html());
		//
		var foodMin=Math.min(foodCnt,foodLmt);

		//礼物储量
		var giftCnt=Number($("#sgiftQ"+$("#giftQuality").val()).get(0).lastChild.data);
		//礼物使用余额
		var giftLmt=Number($("#giftLimit2").html());
		//
		var giftMin=Math.min(giftCnt,giftLmt);

		// 没体力没额度停止
		if (foodMin==0 && giftMin==0 && heath<AUTO_MODE*10) {
			return;
		}
		//恢复
		else if ((foodMin>0 || giftMin>0) && heath<AUTO_MODE*10) {
			sendRecoverRequest();
			window.setTimeout(doAutoFight, getRecoverPause());
			return;
		}
		//特殊：最后数枪
		else if (AUTO_MODE==5 && foodMin==0 && giftMin==0 && heath<AUTO_MODE*10) {
			sendFightRequest(AUTO_SIDE,oneStr);
		}
		//正常打枪
		else {
			if (AUTO_MODE==1) {
				sendFightRequest(AUTO_SIDE,oneStr);
			} else {
				sendFightRequest(AUTO_SIDE,fiveStr);
			}
		}
		updateFightPause();
		window.setTimeout(doAutoFight, autoFightPause);
	}

	function initAuto() {
		AUTO_FLG = false;
		$(":button").filter("[value='Auto']").css("display","inline");
		$(":button").filter("[value='Auto5']").css("display","inline");
		$("#autoFightCntInput").css("disabled","false");
		if (AUTO_MODE2==0) {
			$("#autoLeftInput").val("");
		}
//		alert(AUTO_BTN_ID)
//		alert(AUTO_BTN_STR)
		$("#"+AUTO_BTN_ID).val(AUTO_BTN_STR);
	}
	function preAuto(btn, side, mode) {
		//color	#F2F2F2
		//background-color	#303030
//		alert("AUTO_FLG="+AUTO_FLG)
		if (AUTO_FLG) {
//			AUTO_FLG = false;
//			if (mode==1) {
//				$("#"+btn).val("Auto");
//			} else {
//				$("#"+btn).val("Auto5");
//			}
//			$(":button").filter("[value='Auto']").css("display","inline");
//			$(":button").filter("[value='Auto5']").css("display","inline");
//			$("#autoFightCntInput").css("disabled","false");
			initAuto();
		} else {
			AUTO_FLG = true;
			AUTO_SIDE = side;
			AUTO_MODE = mode;
			AUTO_CNT = 0;

			//
			tmpLeftCnt=$("#autoLeftInput").val();
			if (tmpLeftCnt=="" || isNaN(tmpLeftCnt) || parseInt(tmpLeftCnt)<0) {
				AUTO_MODE2 = 0;
				tmpLeftCnt = AUTO_MODE_1_STR;
			} else {
				AUTO_MODE2 = 1;
				tmpLeftCnt = parseInt(tmpLeftCnt);
			}
			$("#autoLeftInput").val(tmpLeftCnt);
			AUTO_LFT=tmpLeftCnt;

			$("#"+btn).val("Running");
			$(":button").filter("[value='Auto']").css("display","none");
			$(":button").filter("[value='Auto5']").css("display","none");
			$("#autoFightCntInput").css("disabled","true");
			AUTO_BTN_ID=btn;
			AUTO_BTN_STR=(mode==1?"Auto":"Auto5");

			doAutoFight();
		}
	}
	$("#autofight").click(function() {
		preAuto("autofight", "side", 1);
	});
	$("#dautofight").click(function() {
		preAuto("dautofight", "defender", 1);
	});
	$("#aautofight").click(function() {
		preAuto("aautofight", "attacker", 1);
	});
	$("#autofight5").click(function() {
		preAuto("autofight5", "side", 5);
	});
	$("#dautofight5").click(function() {
		preAuto("dautofight5", "defender", 5);
	});
	$("#aautofight5").click(function() {
		preAuto("aautofight5", "attacker", 5);
	});

//	//===========================================================
//	// auto from list
//	//===========================================================
//	var AUTO_FIGHT_KEY = "AUTO_FIGHT_KEY";
//	var AUTO_FIGHT_SEP = "_";
//	var AUTO_CMD = GM_getValue(AUTO_FIGHT_KEY);
////	alert(AUTO_CMD);
//	if (AUTO_CMD != "") {
//		GM_setValue(AUTO_FIGHT_KEY, "");
//		sp = AUTO_CMD.split(AUTO_FIGHT_SEP);
//		$("#foodQuality").val(sp[1]);
//		if (sp[0] == "defender") {
//			preAuto("dautofight", "defender");
//		} else if (sp[0] == "attacker") {
//			preAuto("aautofight", "attacker");
//		} else {
//			preAuto("autofight", "side");
//		}
//	}

	//===========================================================
	// other plus
	//===========================================================
	// var HEIGHT_ORG;
	$("#weaponQuality").each(function(){
		HEIGHT_ORG = $(this.parentNode).height();
	});
	$("#isMini").click(function() {

		if (this.checked) {
			$(".foundation-style.column-margin-vertical.column.small-2").eq(0).prev().eq(0).hide();
			$(".foundation-style.column-margin-vertical.column.small-2").eq(0).next().eq(0).hide();
			$(".foundation-style.column-margin-vertical.column.small-2").eq(0).hide();
			$("#top10Defenders").hide();
			$("#top10Attackers").hide();
			$("#fightButton1").hide();
			$("#fightButton1").nextAll().hide();

//			$("#showTutorialTutorial").hide();
//			$("#userMenu").children().eq(0).children().eq(0).hide();
//			$("#userMenu").children().eq(0).children().eq(1).hide();
			$("#showTutorialTutorial").next().eq(0).prevAll().hide();
		} else {
			$(".foundation-style.column-margin-vertical.column.small-2").eq(0).prev().eq(0).show();
			$(".foundation-style.column-margin-vertical.column.small-2").eq(0).next().eq(0).show();
			$(".foundation-style.column-margin-vertical.column.small-2").eq(0).show();
			$("#top10Defenders").show();
			$("#top10Attackers").show();
			$("#fightButton1").show();
			$("#fightButton1").nextAll().show();
			$("#fightStatus").hide();

			$("#showTutorialTutorial").next().eq(0).prevAll().show();
		}
	});
	$("#isGiftFirst").click(function() {
		if (this.checked) {
			isGiftFstFlg=true;

		} else {
			isGiftFstFlg=false;
		}

	});

});

//function safecheck() {
//	tmps=document.evaluate("//script", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
////	alert(tmps.snapshotLength);
////	alert(tmps.snapshotItem(0));
//	for (var i = 0; i < tmps.snapshotLength; i++) {
//		obj = tmps.snapshotItem(i);
//		if (obj.innerHTML.match("eatButton")) {
//			//if(obj.innerHTML.length==1930?false:true){return false}
//		} else if (obj.innerHTML.match("fightButton")) {
//			//if(obj.innerHTML.length==996?false:true){return false}
//		}
//	}
//	return true;
//}
//function isTargetHtml(targetHtml) {
//	if (window.location.pathname.substring(0,targetHtml.length)==targetHtml) {
//		return true;
//	} else {
//		return false;
//	}
//}
//function init2() {
//	objs = document.getElementById('battlesTable').children[0];
//	for (var j = 1; j < objs.children.length; j++) {
//		obj = objs.children[j];
//		battleid = obj.children[0].innerHTML.replace(/^[\d\D]*battle.html\?id=(\d*)\"[\d\D]*$/,"$1").trim();
//		tmp = "";
//		if (obj.children[0].innerHTML.match("起义战")) {
//			tmp = "<td>"
//				+ "<input type='button' value='"+battleid+"' id='defender'/>"
//				+ " vs "
//				+ "<input type='button' value='"+battleid+"' id='attacker'/>"
//				+ "</td>"
//				;
//		} else {
//			tmp = "<td>"
//				+ "<input type='button' value='"+battleid+"' id='side'/>"
//				+ "</td>"
//				;
//		}
//		$(obj).append(tmp);
//	}
////	$("#eatMenu").show();
////	$("#useGiftMenu").show();
////	$("#eatLink").hide();
////	$("#useGiftLink").hide();
//}
//if (isTargetHtml("/battles.html")) {
//	init2();
//	return;
//}
var oneStr="";
var fiveStr="";
//var btnnum = document.evaluate("//a[@class='fightButton']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;

if ($("#fightButton2").length>0) {
	btnnum=2;
} else if ($("#fightButton1").length>0) {
	btnnum=1;
} else {
	btnnum=0;
}
//alert(btnnum)
if (btnnum>=0) {
	//安全check
	//if (!safecheck()) {alert("如果网速不好，请多刷新两次，该提示应该就不会出现了。如果网速很好，则表明原本代码有变动，则有风险存在，请通知咳血");}

	//起义战
	if (btnnum == 2) {
		txt = ""
			+ "<input id='dfight5' style='float:left;width:auto;padding-top:4px;padding-bottom:4px;' type='button' value='Def 5 HITs'/>"
			+ "<input id='dfight1' style='float:left;width:auto;padding-top:4px;padding-bottom:4px;' type='button' value='1 Hit'/>"
			+ "<input id='afight5' style='float:right;width:auto;padding-top:4px;padding-bottom:4px;' type='button' value='Act 5 HITs'/>"
			+ "<input id='afight1' style='float:right;width:auto;padding-top:4px;padding-bottom:4px;' type='button' value='1 Hit'/>"
		 	+ "<p style='clear: both'></p>"
			+ "<input id='recover' style='float:left;width:114px;padding-top:4px;padding-bottom:4px;' type='button' value='Recover'/>"
			+ "<input id='recover2' style='float:right;width:114px;padding-top:4px;padding-bottom:4px;' type='button' value='Recover'/>"
			+ "<input id='dautofight' style='float:left;padding-top:4px;padding-bottom:4px;padding-left:4px;padding-right:4px;' type='button' value='Auto'/>"
			+ "<input id='dautofight5' style='float:left;padding-top:4px;padding-bottom:4px;padding-left:4px;padding-right:4px;' type='button' value='Auto5'/>"
			+ "<input id='aautofight' style='float:right;padding-top:4px;padding-bottom:4px;padding-left:4px;padding-right:4px;' type='button' value='Auto'/>"
			+ "<input id='aautofight5' style='float:right;padding-top:4px;padding-bottom:4px;padding-left:4px;padding-right:4px;' type='button' value='Auto5'/>"
		 	+ "<p style='clear: both'></p>"
			;
	//进攻/防守战
	} else if (btnnum == 1) {
		//foundation-style column-margin-vertical column small-3
		def=$("#battleProgressStats").parent().prev().find(".fightFlag").attr("class").split(" ").pop();

		//<div class="flags-medium Estonia"></div>
		//<div style="width: 90px; margin:0 auto;"><br><img src="http://cdn.e-sim.org:8080/img/tournaments/teamBlue.png"><br></div>
//		if ($("#showTutorial").children().eq(8).attr("class") === undefined) {
//			//http://cdn.e-sim.org:8080/img/tournaments/teamBlue.png
//			side=$("#showTutorial").find("img").eq(0).attr("src").replace("http://cdn.e-sim.org:8080/img/tournaments/","").replace(".png","");
//		} else {
//			side=$("#showTutorial").children(".flags-medium").eq(0).attr("class").replace("flags-medium ","");
//		}
		side=$("#battleRoundId").nextAll("div.fightFlag").attr("class").split(" ").pop();
		//alert(def+" "+side)
		if (def==side) {
			txt = ""
				+ "<input id='fight1' style='float:left;width:auto;padding-top:4px;padding-bottom:4px;' type='button' value='1 Hit'/>"
				+ "<input id='fight5' style='float:left;width:auto;padding-top:4px;padding-bottom:4px;' type='button' value='5 HITs'/>"
			 	+ "<p style='clear: both'></p>"
				+ "<input id='recover' style='float:left;width:101px;padding-top:4px;padding-bottom:4px;' type='button' value='Recover'/>"
				+ "<input id='autofight' style='float:left;padding-top:4px;padding-bottom:4px;padding-left:4px;padding-right:4px;' type='button' value='Auto'/>"
				+ "<input id='autofight5' style='float:left;padding-top:4px;padding-bottom:4px;padding-left:4px;padding-right:4px;' type='button' value='Auto5'/>"
			 	+ "<p style='clear: both'></p>"
				;
		} else {
			txt = ""
				+ "<input id='fight5' style='float:right;width:auto;padding-top:4px;padding-bottom:4px;' type='button' value='5 HITs'/>"
				+ "<input id='fight1' style='float:right;width:auto;padding-top:4px;padding-bottom:4px;' type='button' value='1 Hit'/>"
			 	+ "<p style='clear: both'></p>"
				+ "<input id='recover' style='float:right;width:101px;padding-top:4px;padding-bottom:4px;' type='button' value='Recover'/>"
				+ "<input id='autofight' style='float:right;padding-top:4px;padding-bottom:4px;padding-left:4px;padding-right:4px;' type='button' value='Auto'/>"
				+ "<input id='autofight5' style='float:right;padding-top:4px;padding-bottom:4px;padding-left:4px;padding-right:4px;' type='button' value='Auto5'/>"
			 	+ "<p style='clear: both'></p>"
				;
		}
	//观战
	} else {
		txt="";
	}

	//tmps=document.getElementById('recentDefenders').parentNode.children[1];
	tt = document.createElement("div");
//	tt.style.border = "1px solid";
	tt.style.textAlign = "left";
//	tt.style.cssFloat = "left";
	tt.style.width = "500px";
	//tt.innerHTML = ""
	tt = "<div style='color:#F2F2F2 !important'>"
				 + "<div id='mCustomScore' style='float:left; text-align:left; width:80px; font-size:20px;'>总分差</div>"
				 + "<div id='mHisScore' style='float:left; text-align:left; width:65px; font-size:16px;'>↑↑↑</div>"
				 + "<div id='mScoreSpeed' style='float:left; text-align:left; width:80px; font-size:16px;'>输出速度</div>"
				 + "<div id='isrun' style='float:left; text-align:center; width:45px; font-size:14px;'></div>"
				 + "<div id='sCustomScore' style='float:right; text-align:right; width:80px; font-size:20px;'>总分差</div>"
				 + "<div id='sHisScore' style='float:right; text-align:right; width:65px; font-size:16px;'>↑↑↑</div>"
				 + "<div id='sScoreSpeed' style='float:right; text-align:right; width:80px; font-size:16px;'>输出速度</div>"
				 + "<input type='hidden' id='lastTime' value='0' />"
				 + "<input type='hidden' id='mLastDmg' value='0' />"
				 + "<input type='hidden' id='sLastDmg' value='0' />"
				 + "<p style='clear: both'></p>"
				 + "<hr class='dashedLine'>"
				 + txt
				 + "<input type='checkbox' id='isGiftFirst' style='float:left; width: 13px;'>"
				 + "<b id='isGiftFirstTxt' style='text-align:left; float:left; font-size: 11px;'>礼物优先使用</b>"
				 + "<input type='checkbox' id='isMini' style='float:left; width: 13px;'>"
				 + "<b id='isMiniTxt' style='text-align:left; float:left; font-size: 11px;'>隐藏/显示页面部分内容</b>"
				 + "<input type='checkbox' id='updInfo' style='float:left; width: 13px;'/>"
				 + "<b id='updInfoTxt' style='text-align:left; float:left; font-size: 11px;'>比分刷新加速(鸡血)</b>"
				 + "<p style='clear: both'></p>"
				 + "<div id='autoDiv' style='width:500px;display:inline;'>"
				 + "<b id='autoLeftTxt' style='text-align:left; float:left; font-size: 11px;'>自动输出枪数预定</b>"
				 + "<input class='foundation-style' type='text' id='autoLeftInput' style='float:left;width: 40px;text-align:center' />"
				 + "<b id='autoCntTxt' style='text-align:left; float:left; font-size: 11px;'>　自动输出枪数统计</b>"
				 + "<input class='foundation-style' type='text' id='autoCntInput' style='float:left;width: 40px;text-align:center;' disabled='true' />"
				 + "<b id='autoCntTxt' style='text-align:left; float:left; font-size: 11px;'>　打枪间隔</b>"
				 + "<input class='foundation-style' type='text' id='fightPauseInput' style='float:left;width: 40px;text-align:center;' disabled='true' />"
				 + "</div>"
				 + "<p style='clear: both'></p>"
				 + "<div id='resInfox' style='width:500px;display:inline;'></div>"
				 + "<p style='clear: both'></p>"
				 + "</div>"
				 ;
	//tmps.insertBefore(tt, tmps.children[0]);
	//alert("init")
	$("#battleSelectable").before(tt);
	$("#depLimitsMission").before("<sep>↓↓↓ 输出信息 ↓↓↓</sep><hr class='dashedLine'><div id='resInfo'></div><hr class='dashedLine'>");

	if (!testflg) {
		$(":button").filter("[value='Auto']").css("display","none");
		$(":button").filter("[value='Auto5']").css("display","none");
		$("#autoDiv").hide();
	}
	var oneStr=$("#fightButton1").attr("value");
	var fiveStr=$("#fightButtonBerserk1").attr("value");

//	alert(oneStr+" "+fiveStr);

//	obj = document.getElementById('userMenu');
//	tt = document.createElement("div");
//	//tt.id = "autocon"
//	tt.className = 'plate';
//	tt.style.width = '93%';
//	tt.innerHTML = ""
//				 + "<input type='checkbox' id='isMini' style=''>"
//				 //+ "<div id='isMiniTxt' style='text-align:left;  font-size: 11px;'>显示</div>"
//				 ;
//	obj.insertBefore(tt, obj.children[1]);
//	tt = document.createElement("br");
//	obj.insertBefore(tt, obj.children[1]);
}

