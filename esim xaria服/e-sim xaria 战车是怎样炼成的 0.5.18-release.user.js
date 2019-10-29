// ==UserScript==
// @name         e-sim xaria 战车是怎样炼成的
// @namespace    ESX
// @version      0.5.18-release
// @description  xaria服自动双击、自动清空体力，自动清空体力功能需要在战场页才能触发
// @author       Exsper
// @match        http://testura.e-sim.org:8000/*
// @match        https://testura.e-sim.org:8000/*
// @match        http://xaria.e-sim.org/*
// @match        https://xaria.e-sim.org/*
// @match        http://nebula.e-sim.org/*
// @match        https://nebula.e-sim.org/*
// @match        http://luna.e-sim.org/*
// @match        https://luna.e-sim.org/*
// @require      http://cdn.e-sim.org/js/jquery-1.8.3.min.js
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

//敬请牢记：如果您安装或使用本插件，就默认您已经承诺：不与任何人在任何场合分享插件的全部或部分内容；不在插件开发群以外的地方讨论插件相关问题或功能；在游戏截图前首先关闭所有插件再截图
//敬请牢记：如果您违背了您的承诺，您将失去所有esim插件未来版本的使用权并可能受到诸多方面的惩罚

//前排提醒：该插件有些特殊功能需要先开启e-sim助手（获取盟友、显示伤害），但如果不需要这些功能也可以脱离e-sim助手独立运行
//前排提醒：在自动寻找战场时，插件不会优先选择盟友场或是重要战场，而是寻找到能打的战场就立即跳转


var ap=true;var Y=true;var O=true;var K=false;var N=0;var A=0;var z=50;var F=1;var T=0;var D=0;var k=true;var W=-1;var e=true;var V;var Q=true;var x=["China","Taiwan"];var am=[];var aa=true;var I=true;var aq=true;var o=true;var i=true;var t="battles.html?countryId=-1&sorting=BY_TOTAL_DAMAGE";var au=true;var b=true;var ao=true;var af=true;var J=4;var G=600;var c=3000;var R=false;var ai=20;var y=240;var h=20;var B=-1;var ah=-1;var v=10;var C=50;var Z=20;var s=5;var r=0;var q=false;var m=400;var U=800;var at=10*60;var H=0;var ac=-1;var n=5*1000;var ag=10000;$.info=function(){var aw,ax,az,aB,aA,ay,av;if(arguments.length==1){aA=arguments[0];ay=ag}else{if(arguments.length==2){aA=arguments[0];ay=arguments[1]}else{return}}aw=$("#ESXMessageDiv");aw.css({display:"block"}).append('<div class="esxmsg">'+aA+"</div>");aB=aw.children("div");az=aB.eq(-1);if(aB.length>10){aB.eq(0).mouseenter()}av=az.width();az.css({left:-av,opacity:0}).animate({left:0,opacity:1},200,function(){return az.delay(ay).animate({left:-av,opacity:0},200,function(){az.remove()})});return aB.eq(-1)};function w(ax){var av=[];for(var aw=0;aw<ax.length;aw++){av.push(ax[aw].replace(/(^\s*)|(\s*$)/g,""))}return av}function ak(aw,ax,av){aw="ESX-"+aw;if(av===true){localStorage.setItem(aw,JSON.stringify(w(ax.split(","))))}else{localStorage.setItem(aw,JSON.stringify(ax))}}function E(aw,av){aw="ESX-"+aw;if(av===true){return(aw in localStorage)?JSON.parse(localStorage.getItem(aw)).join(","):null}else{return(aw in localStorage)?JSON.parse(localStorage.getItem(aw)):null}}function S(av,aw){localStorage["ESX-"+av]=aw}function X(av){av="ESX-"+av;return(av in localStorage)?localStorage[av]:null}function ae(av){av="ESX-"+av;localStorage.removeItem(av)}function ar(aw,av){var ax=X(aw);if(ax==null){return av}else{if(typeof av=="string"){return ax}else{if(typeof av=="number"){return parseInt(ax)}else{if(typeof av=="boolean"){return(ax=="true")}else{return ax}}}}}f();setTimeout(function(){location.reload()},30*60*1000);function aj(ay,av){var ax=av-ay;var aw=Math.random()*ax+ay;aw=parseInt(aw,10);return aw}function ad(az){var ax=az.getHours();var ay=az.getMinutes();var aw=az.getSeconds();var av="";if(ax<10){av+="0"}av+=ax+":";if(ay<10){av+="0"}av+=ay+":";if(aw<10){av+="0"}av+=aw;return(av)}function g(az){if($("#Eh2Homeland").length>0){x=[];x.push($("#Eh2Homeland").children("div").attr("title"));if(X("EHAllies")=="true"){var ay=$("#Eh2Allies").children("div");for(var ax=0;ax<ay.length;ax++){x.push(ay[ax].title)}}if(X("EHCoalition")=="true"){var aw=$("#Eh2CoalitionMembers").children("div");for(var av=0;av<aw.length;av++){x.push(aw[av].title)}}x=$.unique(x.sort());ak("Allies",x);az.val(x.join(","));L("获取到盟友："+x)}else{L("e-sim助手未运行或版本不兼容")}}function u(ax){if($("#Eh2Homeland").length>0){am=[];if(X("EHEnemies")=="true"){var aw=$("#Eh2Enemies").children("div");for(var av=0;av<aw.length;av++){am.push(aw[av].title)}}ak("Enemies",am);ax.val(am.join(","));L("获取到敌人："+am)}else{L("e-sim助手未运行或版本不兼容")}}function ab(){ap=ar("IsRunning",ap);Y=ar("EnableWorkTrain",Y);O=ar("EnableAutoFight",O);K=ar("IsWorkingTraining",K);F=ar("FlightTicketQuality",F);N=ar("ErrorRefreshedCount",N);k=ar("BackToRegion",k);W=ar("OriginRegionId",W);e=ar("BackToBattle",e);V=ar("OriginBattleUrl",V);Q=ar("FightForAlly",Q);x=E("Allies");am=E("Enemies");aa=ar("EHAllies",aa);I=ar("EHEnemies",I);aq=ar("EHCoalition",aq);T=ar("FightWeaponQuality",T);G=ar("FightWaitMin",G);c=ar("FightWaitMax",c);ai=ar("NextRefreshExtendWaitMin",ai);y=ar("NextRefreshExtendWaitMax",y);h=ar("SleepProbability",h);B=ar("CancelDateTime",B);C=ar("AFCTiggerProbability",C);Z=ar("AFCRefreshInTimeLeftMax",Z);s=ar("AFCRefreshInTimeLeftMin",s);ah=ar("AFCTargetBattleID",ah);r=ar("AFCFightWeaponQuality",r);q=ar("AFCFightByHitOnly",q);m=ar("AFCFightWaitMin",m);U=ar("AFCFightWaitMax",U);R=ar("FightByHitOnly",R);H=ar("HitUsingWeapon",H);ac=ar("MaxHitUsingWeapon",ac);D=ar("FightDefaultSide",D);o=ar("AutoSearchBattle",o);i=ar("SearchBattleFromButton",i);t=ar("SearchBattleUrl",t);au=ar("AutoFlyToBattle",au);b=ar("SearchBattleShuffle",b);n=ar("AjaxTimeout",n)}function p(){ae("IsRunning");ae("EnableWorkTrain");ae("EnableAutoFight");ae("IsWorkingTraining");ae("FlightTicketQuality");ae("ErrorRefreshedCount");ae("BackToRegion");ae("OriginRegionId");ae("BackToBattle");ae("OriginBattleUrl");ae("FightForAlly");ae("Allies");ae("Enemies");ae("EHAllies");ae("EHEnemies");ae("EHCoalition");ae("FightWeaponQuality");ae("FightWaitMin");ae("FightWaitMax");ae("NextRefreshExtendWaitMin");ae("NextRefreshExtendWaitMax");ae("SleepProbability");ae("CancelDateTime");ae("AFCTiggerProbability");ae("AFCRefreshInTimeLeftMax");ae("AFCRefreshInTimeLeftMin");ae("AFCTargetBattleID");ae("AFCFightWeaponQuality");ae("AFCFightByHitOnly");ae("AFCFightWaitMin");ae("AFCFightWaitMax");ae("FightByHitOnly");ae("HitUsingWeapon");ae("MaxHitUsingWeapon");ae("FightDefaultSide");ae("AutoSearchBattle");ae("SearchBattleFromButton");ae("SearchBattleUrl");ae("AutoFlyToBattle");ae("SearchBattleShuffle");ae("AjaxTimeout")}function M(){function aC(aZ,aY,aU,aV,aT){var aX=$("<input>",{type:"checkbox",style:"vertical-align:5px;",id:aY});var aW=$("<label>",{"class":"checkboxlabel","for":aY,text:aU});var aS=X(aV);if(aS===null){S(aV,aT);aX.attr("checked",aT==true)}else{aX.attr("checked",aS=="true")}aZ.append(aX,aW);aX.click(function(){if(aX.is(":checked")){S(aV,true)}else{S(aV,false)}})}function ax(aX,a1,aY,aS,aT,aZ){var aV=$("<span>",{style:"padding:3px; margin:3px",text:a1});var aW=$("<select>",{style:"padding:3px; margin:3px"}).appendTo(aV);for(var aU=0;aU<aY.length;aU++){$("<option>",{value:aY[aU],text:aS[aU]}).appendTo(aW)}var a0=X(aT);if(a0===null){S(aT,aZ);aW.val(aZ)}else{aW.val(a0)}aX.append(aV);aW.change(function(){S(aT,aW.val())})}function aG(aW,aV,aU,aT){var aX=$("<input>",{type:"text",id:"ESX-"+aU,style:"vertical-align:5px;width:"+aV+"px;height:20px;"}).appendTo(aW);var aS=X(aU);if(aS===null){S(aU,aT);aX.val(aT)}else{aX.val(aS)}aW.append(aX);aX.focus(function(){aX.css("background-color","#FFFFFF")});aX.blur(function(){if(aX.val()===""){aX.val(aT)}aX.css("background-color","#79FF79");S(aU,aX.val())})}function aK(aW,aV,aU,aT){var aX=$("<input>",{type:"text",id:"ESX-"+aU,style:"vertical-align:5px;width:"+aV+"px;height:20px;"}).appendTo(aW);var aS=E(aU,true);if(aS===null){ak(aU,aT);aX.val(aT.join(","))}else{aX.val(aS)}aW.append(aX);aX.focus(function(){aX.css("background-color","#FFFFFF")});aX.blur(function(){if(aX.val()===""){aX.val(aT.join(","))}aX.css("background-color","#79FF79");ak(aU,aX.val(),true)})}var aD=$("<li>",{id:"ESXIcon"}).insertBefore($("#userAvatar"));var aP=$("<a>",{"data-dropdown":"ESXContentDrop",style:"padding:0 5px;",href:"#"}).appendTo(aD);var aR=$("<img>",{align:"absmiddle","class":"smallAvatar",style:"height:36px; width:36px;",src:"http://cdn.e-sim.org/img/eventIcons/battleLostIcon.png"}).appendTo(aP);var aH=$("#contentDrop").clone().attr("id","ESXContentDrop").empty().insertBefore($("#contentDrop"));aH.removeClass("medium");aH.addClass("large");$("<b>",{text:"xaria 战车是怎样炼成的 "+GM_info.script.version}).appendTo(aH);var aB=$("<span>",{text:"捐赠",style:"float:right;"}).appendTo(aH);aB.click(function(){aJ()});function aJ(){var aT=$("<div>",{"class":"dwindow",style:"overflow:auto; width:300px; height:380px; display:block; position:fixed; top:50%; left:50%; margin-left: -225px; margin-top: -150px; padding-bottom: 20px; text-align:center;background-color:lightgray;"}).appendTo($("body"));$("<p>e-sim插件开发不易，您的无私奉献是我们努力的肯定与支持，让我们做得更好</p>").appendTo(aT);$("<p>QQ钱包</p>").appendTo(aT);var aU=$("<div></div>").appendTo(aT);aU[0].innerHTML='<img src="https://puu.sh/Ad7wr/10f301077b.png"/>';$("<br>").appendTo(aT);var aS=$("<button>",{text:"关闭"}).appendTo(aT);aS.click(function(){aT.remove()})}$("<div>",{style:"text-align:center;",text:"自动清空体力、自动双击。珍惜账号，慎用自动。设置更改刷新后生效。"}).appendTo(aH);var aM=$("<div>",{style:"height:500px; overflow:auto;"}).appendTo(aH);var aL=$("<table>",{id:"ESXConfig",style:"width:100%;line-height:30px"}).appendTo(aM);var aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);var aA=$("<td>").appendTo(aw);aC(aA,"IsRunCheckbox","启用该插件","IsRunning",ap);aC(aA,"EnableWorkTrainCheckbox","启用双击功能","EnableWorkTrain",Y);aC(aA,"EnableAutoFightCheckbox","启用打枪功能","EnableAutoFight",O);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);ax(aA,"输出使用武器：",[0,1,2,3,4,5],["拳头","Q1","Q2","Q3","Q4","Q5"],"FightWeaponQuality",T);aC(aA,"FightByHitOnlyCheckbox","不使用连击","FightByHitOnly",R);ax(aA,"超出次数则使用空手：",[-1,0,1,2,3,4,5,6,7,8,9,10],["不限制","0","1","2","3","4","5","6","7","8","9","10"],"MaxHitUsingWeapon",ac);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);ax(aA,"可以打两边时选择输出方：",[-1,0,1,2,3,4,5,6],["随机","防守方","进攻方","尽量拿到top1","尽量拿到top3","尽量拿到top10","随机但尽量打在一边","打在胜场较少的那一边"],"FightDefaultSide",D);aC(aA,"FightForAllyCheckbox","起义场优先打盟友方或对抗敌方","FightForAlly",Q);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);$("<span>",{text:"设置盟友（以半角逗号分隔）："}).appendTo(aA);aK(aA,400,"Allies",x);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);$("<span>",{text:"设置敌国（以半角逗号分隔）："}).appendTo(aA);aK(aA,400,"Enemies",am);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);var aQ=$("<button>",{text:"从E-sim助手获取盟友和敌国"}).appendTo(aA);aQ.click(function(){g($("#ESX-Allies"));u($("#ESX-Enemies"))});aC(aA,"EHAlliesCheckbox","获取盟友","EHAllies",aa);aC(aA,"EHCoalitionCheckbox","获取联盟成员国","EHCoalition",aq);aC(aA,"EHEnemiesCheckbox","获取敌国","EHEnemies",I);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);$("<span>每次攻击间隔（毫秒）：</span>").appendTo(aA);aG(aA,60,"FightWaitMin",G);$("<span> 到 </span>").appendTo(aA);aG(aA,60,"FightWaitMax",c);$("<span>打枪请求超时限制：</span>").appendTo(aA);aG(aA,60,"AjaxTimeout",n);$("<span>毫秒</span>").appendTo(aA);var aF=$("<button>",{text:"Ping一下"}).appendTo(aA);aF.click(function(){$.ping=function(aU){var aW,aT,aV;$.ajax({url:aU.url,type:"GET",dataType:"html",timeout:20000,beforeSend:function(){if(aU.beforePing){aU.beforePing()}aT=new Date().getTime()},complete:function(){aV=new Date().getTime();aW=Math.abs(aT-aV);if(aU.afterPing){aU.afterPing(aW)}},error:function(aX,aZ,aY){if(aZ=="timeout"){L("Ping超时")}aV=new Date().getTime();aW=Math.abs(aT-aV);if(aU.afterPing){aU.afterPing(aW)}}});if(aU.interval&&aU.interval>0){var aS=aU.interval*1000;setTimeout(function(){$.ping(aU)},aS)}};$.ping({url:location.origin,afterPing:function(aS){L("延迟： "+aS+" 毫秒")}})});aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);$("<span>清空体力后下次刷新额外延时（秒）：</span>").appendTo(aA);aG(aA,60,"NextRefreshExtendWaitMin",ai);$("<span> 到 </span>").appendTo(aA);aG(aA,60,"NextRefreshExtendWaitMax",y);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);$("<span>每次刷新后均有</span>").appendTo(aA);aG(aA,60,"SleepProbability",h);$("<span>%的概率不进行自动清体</span>").appendTo(aA);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);$("<span>于</span>").appendTo(aA);aG(aA,60,"CancelDateTimeTextbox",60);$("<span>分钟后停止自动清体功能</span>").appendTo(aA);var av=$("<button>",{text:"设置"}).appendTo(aA);av.click(function(){B=Date.now()+parseInt($("#ESX-CancelDateTimeTextbox").val())*60*1000;S("CancelDateTime",B);L("设置在"+ad(new Date(B))+"停止自动清体功能")});var ay=$("<button>",{text:"清除"}).appendTo(aA);ay.click(function(){B=-1;S("CancelDateTime",B);L("已清除设定的停止清体时间")});aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);$("<span>重要战场回合剩余时间小于"+v+"分钟，则有</span>").appendTo(aA);aG(aA,20,"AFCTiggerProbability",C);$("<span>%的概率在回合结束前S</span>").appendTo(aA);aG(aA,20,"AFCRefreshInTimeLeftMax",Z);$("<span>到S</span>").appendTo(aA);aG(aA,20,"AFCRefreshInTimeLeftMin",s);$("<span>之间（压秒）</span><br/>").appendTo(aA);$("<span>每次攻击间隔（毫秒）：</span>").appendTo(aA);aG(aA,60,"AFCFightWaitMin",m);$("<span> 到 </span>").appendTo(aA);aG(aA,60,"AFCFightWaitMax",U);ax(aA,"使用武器：",[0,1,2,3,4,5],["拳头","Q1","Q2","Q3","Q4","Q5"],"AFCFightWeaponQuality",r);aC(aA,"AFCFightByHitOnlyCheckbox","不使用连击","AFCFightByHitOnly",q);$("<br/>").appendTo(aA);var aE=$("<button>",{text:"设置当前战场为重要战场"}).appendTo(aA);aE.click(function(){ah=parseInt($('a[href^="battleStatistics.html?id="]').attr("href").replace("battleStatistics.html?id=",""));S("AFCTargetBattleID",ah);L("设置战场 "+ah+" 为重要战场")});var az=$("<button>",{text:"清除重要战场"}).appendTo(aA);az.click(function(){ah=-1;S("AFCTargetBattleID",ah);L("已清除记录的重要战场")});aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);ax(aA,"工作飞行使用机票：",[1,2,3,4,5],["Q1","Q2","Q3","Q4","Q5"],"FlightTicketQuality",F);aC(aA,"BackToRegionCheckbox","双击后飞回原所在地（请确保机票足够）","BackToRegion",k);aC(aA,"BackToBattleCheckbox","双击后回到原战场","BackToBattle",e);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);aC(aA,"AutoSearchBattleCheckbox","战场页没有输出按钮时自动寻找第一个可输出战场","AutoSearchBattle",o);aC(aA,"AutoFlyToBattleCheckbox","如果找不到战场则飞向第一个起义战地区","AutoFlyToBattle",au);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);aC(aA,"SearchBattleShuffleCheckbox","打乱战场列表，以避免总是选择第一个可输出战场","SearchBattleShuffle",b);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);$("<span>",{text:"搜寻战场列表地址："}).appendTo(aA);aG(aA,400,"SearchBattleUrl",t);aw=$("<tr>",{style:"background-color:DarkSlateGray;"}).appendTo(aL);aA=$("<td>").appendTo(aw);aC(aA,"SearchBattleFromButtonCheckbox","优先从左侧按钮获取战场列表网址","SearchBattleFromButton",i);var aO=$("<button>",{text:"测试搜寻战场"}).appendTo(aA);aO.click(function(){t=X("SearchBattleUrl");l(1)});var aN=$("<button>",{text:"重置双击设置",title:"如果因双击错误导致无法自动输出，请点击此按钮"}).appendTo(aA);aN.click(function(){ae("IsWorkingTraining");ae("OriginRegionId");ae("OriginBattleUrl")});var aI=$("<button>",{text:"重置所有设置",title:"插件运行遇到问题？尝试重置插件吧"}).appendTo(aA);aI.click(function(){p()})}function f(){A=parseInt(X("WaitForLoadCount"));if($(".time").length!==2){A++;if(A<=z){S("WaitForLoadCount",A);console.log(A+":网页未加载完全，xaria插件等待1秒");setTimeout(f,1000);return}else{S("WaitForLoadCount",0);location.reload();return}}var aw=$(".time:first").text().match(/-/g);if(aw==null||aw.length!=2){A++;if(A<=z){S("WaitForLoadCount",A);console.log(A+":官方脚本还未执行，xaria插件等待0.5秒");setTimeout(f,500);return}else{S("WaitForLoadCount",0);location.reload();return}}if($("#minutesLimit").text()==""){A++;if(A<=z){console.log(A+":官方时间还未刷新，xaria插件等待0.5秒");setTimeout(f,500);return}else{S("WaitForLoadCount",0);location.reload();return}}S("WaitForLoadCount",0);P();M();ab();if(ap==false){L("xaria插件未启动");return}if(Y==true){if((k==true)&&(an()=="battle")){var ax=$('a[href^="region.html?id="][href!="region.html?id="]');var av=parseInt(ax.first().attr("href").split("=")[1]);S("OriginRegionId",av)}if((e==true)&&(an()=="battle")){S("OriginBattleUrl",location.href)}j()}if((O==true)&&(an()=="battle")){setTimeout(function(){al()},2000);return}}function P(){GM_addStyle(".esxmsg{background-color: #fff;border-left: 4px solid #7ad03a;-webkit-box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);}");var av=$("<div>",{id:"ESXMessageDiv",style:"position:fixed; bottom:5%;"}).appendTo("body")}function L(av,aw){console.log(av);if(aw==undefined){$.info(av)}else{$.info(av,aw)}}function an(){if(document.URL.search("html")!=-1){return document.URL.match("/([a-zA-Z0-9]+).html")[1]}else{return"index"}}function j(){function aw(){var aC=$("#trainButton");if(aC.length<=0){Y=false;S("EnableWorkTrain",false);K=false;S("IsWorkingTraining",false);alert("错误：未训练却没有训练按钮，已自动关闭双击功能")}else{aD()}function aD(){$.ajax({type:"POST",url:"train/ajax",data:null,success:function(aF){var aE=$("#trainButton",aF);if((aE.length<1)&&($("#userMenu",aF).length<1)){ax()}else{Y=false;S("EnableWorkTrain",false);K=false;S("IsWorkingTraining",false);alert("错误：训练失败，已自动关闭双击功能")}$("#trainReload").html(aF)}})}}function az(){var aF=$("#workButton");if(aF.length<1){Y=false;S("EnableWorkTrain",false);K=false;S("IsWorkingTraining",false);alert("错误：未工作却没有工作按钮，已自动关闭双击功能")}else{var aG=$('a[href^="region.html?id="][href!="region.html?id="]');var aD=aG.first().parent().find("div").attr("class");aD=aD.substring(aD.indexOf("-")+1);var aC=aG.last().parent().find("div").attr("class");aC=aC.substring(aC.indexOf("-")+1);if(aD==aC){aE()}else{document.location=aG.last().attr("href")}}function aE(){$.ajax({type:"POST",url:"work/ajax?action=work",data:null,success:function(aH){$("#workReload").html(aH);var aI=$("#workButton",aH);if((aI.length<1)&&($("#userMenu",aH).length<1)){document.location="/train.html"}else{Y=false;S("EnableWorkTrain",false);K=false;S("IsWorkingTraining",false);alert("错误：工作失败，已自动关闭双击功能")}}})}}function av(){$("#ticketQuality").val(F);var aC=$(".travel.button.foundation-style");aC[0].click()}function aA(){var aC=$(".testDivred");if(aC.length>0){Y=false;S("EnableWorkTrain",false);K=false;S("IsWorkingTraining",false);alert("飞行出错："+$(".testDivred :last")[0].childNodes[1].nodeValue+"，已自动关闭双击功能")}else{document.location="/work.html"}}function aB(aC){K=true;S("IsWorkingTraining","true");if(aC==true){setTimeout(function(){document.location="/work.html"},30*1000)}else{document.location="/work.html"}}function ax(){K=false;S("IsWorkingTraining","false");if(k==true){var aE=$('a[href^="region.html?id="][href!="region.html?id="]');var aC=parseInt(aE.first().attr("href").split("=")[1]);if((W!=-1)&&(aC!=W)){L("飞回地区："+W);var aD;$.ajax({url:"region.html?id="+W,async:false,success:function(aF){aD=parseInt($("#countryId",aF).val())},error:function(aF,aG){console.log("地区页抓取错误 (",aG,")，重新抓取");$.ajax(this)}});$.ajax({url:"travel.html",type:"POST",async:false,data:{countryId:aD,regionId:W,ticketQuality:F},success:function(aF){var aG=$("div.testDivred",aF);if(aG.length===1){L("飞行失败："+aG.text().trim())}else{L("飞行成功！")}},error:function(aF,aG){console.log("飞行错误 (",aG,")")}})}}if(e==true){L("返回战场："+V);document.location=V}else{if((O==true)&&(o==true)){l()}else{L("双击结束，等待下次双击")}}}function ay(){if(K==false){if(($("#taskButtonWork").length>0)||($("#taskButtonTrain").length>0)){var aE=parseFloat($("#actualHealth").html());var aC=50-F*10;if(k==true){if((aE-aC*2)>=0){aB(false);return}else{L("可能由于人工操作，你当前的体力不足以飞行两次，程序将于30秒后再自动双击，请尽快补充体力");aB(true);return}}else{if((aE-aC)>=0){aB(false);return}else{L("可能由于人工操作，你当前的体力不足以飞行到工作地，程序将于30秒后再自动双击，请尽快补充体力");aB(true);return}}}}else{var aD=an();if(aD=="work"){az()}else{if(aD=="train"){aw()}else{if(aD=="region"){av()}else{if(aD=="travel"){aA()}else{S("IsWorkingTraining",false);return}}}}}}ay()}function d(){if(O==true){O=false;if(N<=0){N++;S("ErrorRefreshedCount",N);location.reload()}else{N++;S("ErrorRefreshedCount",N);var av=(N-1)*30;L("自动攻击出错，"+av+"秒后自动刷新",1000000);setTimeout(function(){location.reload()},av*1000)}}}function l(){function aA(aG){var aF=false;$.ajax({url:aG,async:false,success:function(aH){if($(".time",aH).length!==2){console.log(citizenId,"抓取错误，重新抓取");$.ajax(this);return}if($(".testDivred",aH).length>0){aF=false}else{if($("#fightButton2",aH).length>0){if(af==true){aF=true}else{aF=false}}else{if($("#fightButton1",aH).length>0){if(ao==true){aF=true}else{aF=false}}else{aF=false}}}},error:function(aH,aI){console.log("抓取错误 (",aI,")，重新抓取");$.ajax(this)}});return aF}function aE(aH){var aF=false;var aG=0;var aJ=0;var aI=$("form[action='travel.html']",aH);if(aI.length>0){aG=parseInt(aI.children("#countryId").val());aJ=parseInt(aI.children("#regionId").val());if((aG>0)&&(aJ>0)){$.ajax({url:"travel.html",type:"POST",async:false,data:{countryId:aG,regionId:aJ,ticketQuality:F},success:function(aK){var aL=$("div.testDivred",aK);if(aL.length===1){L("飞行失败："+aL.text().trim())}else{L("飞行成功！");aF=true}},error:function(aK,aL){console.log("飞行错误 (",aL,")")}})}return aF}else{return false}}function aD(aG){var aF=false;$.ajax({url:aG,async:false,success:function(aH){if($(".time",aH).length!==2){console.log(citizenId,"抓取错误，重新抓取");$.ajax(this);return}aF=aE(aH)},error:function(aH,aI){console.log("抓取错误 (",aI,")，重新抓取");$.ajax(this)}});return aF}function ax(aI){for(var aG,aF,aH=aI.length;aH;aG=parseInt(Math.random()*aH),aF=aI[--aH],aI[aH]=aI[aG],aI[aG]=aF){}return aI}function aw(aF){L("寻找战场："+aF);var aG=[];$.ajax({url:aF,async:false,success:function(aH){if($(".time",aH).length!==2){console.log(citizenId,"抓取错误，重新抓取");$.ajax(this);return}$("#battlesTable tr:gt(0)",aH).each(function(aI,aK){var aJ=$("a[href*='battle.html']",aK);if(aJ.length<=0){return true}else{aG.push(aJ.attr("href"))}})},error:function(aH,aI){console.log("抓取错误 (",aI,")，重新抓取");$.ajax(this)}});console.log("获取到的战场列表:"+aG);return aG}function av(){var aH;if(($("#taskButtonFight").length>0)&&(i==true)){console.log("从左侧按钮获取战场列表");aH=aw($("#taskButtonFight").children().attr("href"))}else{console.log("从自定义网址获取战场列表");aH=aw(t)}if(aH.length<=0){return"-1"}if(b==true){aH=ax(aH)}for(var aF=0;aF<aH.length;aF++){var aG=aA(aH[aF]);console.log(aH[aF]+":"+aG);if(aG==true){return aH[aF]}}return"-1"}function ay(){var aH=aw(t);if(aH.length<=0){return"-1"}if(b==true){aH=ax(aH)}for(var aF=0;aF<aH.length;aF++){var aG=aD(aH[aF]);console.log(aH[aF]+":"+aG);if(aG==true){return aH[aF]}}return"-1"}function az(){function aJ(aM){try{var aK=aM.split(" ")[1];return aK.substring(aK.indexOf("-")+1)}catch(aL){return"未知"}}var aH=[];var aF=[];var aG=[];var aI=[];$("#battlesTable tr:gt(0)").each(function(aK,aM){aH.push($("a[href*='battle.html']",aM).attr("href"));aF.push(aJ($("div.xflagsMedium:first",aM).attr("class")).replace(/-/g," "));aG.push(aJ($("div.xflagsMedium:last",aM).attr("class")).replace(/-/g," "));var aN=$("span.is-countdown",aM);if(aN.length!==1){aI.push(-1)}else{var aL=aN.text().split(":");if(aL.length<3){aI.push(0)}else{aI.push(parseInt(aL[0])*60*60+parseInt(aL[1])*60+parseInt(aL[2]))}}})}function aC(){var aF=av();if(aF!="-1"){document.location=aF}else{if(au==false){L("未找到可以打的战场，"+(at/60)+"分钟后重新寻找");setTimeout(function(){aC()},at*1000)}else{L("未找到可以打的战场，尝试飞行到"+t+"列表里的第一场起义战");aF=ay();if(aF!="-1"){document.location=aF}else{L("未找到可以飞的起义战，"+(at/60)+"分钟后重新寻找");setTimeout(function(){aC()},at*1000)}}}}if(o==true){if(arguments.length>=1){var aB=arguments[0];L(aB+"秒后开始寻找可以输出的战场");setTimeout(function(){aC()},aB*1000)}else{L("30秒后开始寻找可以输出的战场");setTimeout(function(){aC()},30*1000)}}else{L("寻找战场功能已关闭")}}function al(){var av=0;function aB(aT){function aN(a4){a4+="";var a2=a4.split(".");var a3=/(\d{1,3})(?=(\d{3})+$)/g;return a2[0].replace(a3,"$1,")+(a2.length==2?"."+a2[1]:"")}var a0=$("#showMsg");a0.text("");a0.show();var aP=$("#DamageDone",aT);if(aP.length>0){var aY=parseInt(aP.text().replace(/,/g,"").replace(/\xA0/g,""));var a1=$(".fightsprite",aP.parent().parent());var aU={bomb:["grey","无暴击(pain dealer)"],tank:["grey","无坦克(tank)"],syringe:["grey","无类固醇(steroid)"],airplane:["grey","无地点加成"],bookmark:["grey","无军令加成"]};var aV={absorbed:["loved",["lightgreen","闪避(avoid)"]],mu:["bookmark",["lightgreen","有军令加成"]],location:["airplane",["lightgreen","有地点加成"]],STEROIDSplus:["syringe",["lightgreen","有类固醇(steroid)"]],STEROIDSminus:["syringe",["pink","类固醇副作用(steroid)"]],TANKplus:["tank",["lightgreen","有坦克(tank)"]],TANKminus:["tank",["pink","坦克副作用(tank)"]],xp1:["xp",1],xp5:["xp",5],PAIN_DEALER_1_Hplus:["bomb",["lightgreen","1小时暴击(pain dealer)"]],PAIN_DEALER_10_Hplus:["bomb",["lightgreen","10小时暴击(pain dealer)"]],PAIN_DEALER_25_Hplus:["bomb",["lightgreen","25小时暴击(pain dealer)"]]};for(var aS=0;aS<a1.length;++aS){var aZ=a1.eq(aS).attr("class").split(" ").pop();if(aZ in aV){var aO=aV[aZ];aU[aO[0]]=aO[1]}}var aQ="";var aR=aU.xp;delete aU.xp;for(aS in aU){aQ='<i style="color:'+aU[aS][0]+';" class="icon-'+aS+'" title="'+aU[aS][1]+'"></i>'+aQ}aQ+='<b title="'+aR+'次攻击">x'+aR+"</b>";var aM=$("#fightHistory");var aX=$("div[class^=foundation-style]",aM);if(aX.length===6){$("#ehHistoryExpand").show()}aX.slice(0,2).attr("style","opacity:0.6;");aX.slice(2,4).attr("style","opacity:0.3;");if($("#ehHistoryExpand").is(":hidden")===false){aX.slice(4,6).hide()}var aW=($("#fightResult>div").attr("class").split(" ").pop().indexOf("critical")!==-1);if(aW){aM.prepend($("<div>",{"class":"foundation-style small-6 columns foundation-text-right",html:aQ}),$("<div>",{"class":"foundation-style small-4 columns foundation-text-right critical",text:aP.text()}))}else{aM.prepend($("<div>",{"class":"foundation-style small-6 columns foundation-text-right",html:aQ}),$("<div>",{"class":"foundation-style small-4 columns foundation-text-right",text:aP.text()}))}$("#ehHitsNumber").text(parseInt($("#ehHitsNumber").text())+aR);$("#ehTotalDamage").text(aN(parseInt($("#ehTotalDamage").text().replace(/,/g,"").replace(/\xA0/g,""))+aY))}else{a0.text($("#fightResponse").text().trim());a0.fadeOut(2000)}}function aL(){if(ac<0){H++;S("HitUsingWeapon",H);if(T<=0){return 0}else{var aN=parseInt($("#Q"+T+"WeaponStock").text());if(aN<=0){return 0}else{return T}}}else{if(H>=ac){return 0}else{H++;S("HitUsingWeapon",H);if(T<=0){return 0}else{var aM=parseInt($("#Q"+T+"WeaponStock").text());if(aM<=0){return 0}else{return T}}}}}function aA(aN,aQ){var aM=aL();if(!(aM>=0&&aM<=5)){aM=0}console.log("使用Q"+aM+"，side="+aN+"，value="+aQ);var aO="weaponQuality="+aM+"&battleRoundId="+$("#battleRoundId").val()+"&side="+aN+"&value="+aQ;var aP=$.ajax({type:"POST",url:"fight.html",timeout:n,data:aO,success:function(aU){$("#fightResponse > div").replaceWith(aU);if($("#showMsg").length>0){aB($(aU))}var aT=$("#healthUpdate",aU).text();if(aT!==""){var aR=aT.substr(0,aT.length-3);if(aR<100){$("#healthProgress div.ui-corner-right").removeClass("ui-corner-right")}$("#healthProgress .ui-progressbar-value").animate({width:aR+"%"},{queue:false});$("#healthProgress").attr("title",aR+" / 100");$("#actualHealth").html(aR);var aS=$("#DamageDone",aU);if(aS.length<0){console.log($("#fightResponse").text().trim());av++;if(av>J){d()}}else{if(av>0){av=0}if(N>0){N=0;S("ErrorRefreshedCount",0)}}}else{av++;L("攻击出错："+$("#fightResponse").text().trim()+"("+av+")");if(av>J){d()}}},error:function(aR,aT,aS){av++;if(aT=="timeout"){L("攻击出错：超时("+av+")")}else{L("攻击出错：错误码"+aR.status+"("+av+")")}if(av>J){d()}return false}})}function aG(){var aN=$("#roundCountdown").children().text();var aM=aN.split(":");if(aM.length==3){return(parseInt(aM[0])*3600+parseInt(aM[1])*60+parseInt(aM[2]))}else{return -1}}function aF(){var aO=parseInt($("#minutesLimit").text().split(":")[0]);var aN=parseInt($("#secondsLimit").text());if((aO<0)||isNaN(aO)){aO=0}if((aN<0)||isNaN(aN)){aN=0}var aM=aj((aO*60+aN+ai)*1000,(aO*60+aN+y)*1000);L("将于 "+ad(new Date(Date.now()+aM))+" 刷新",1000000);setTimeout(function(){location.reload()},aM)}function aw(aN){if(O==false){L("打枪功能未启用或已暂停");return}var aM;var aO=parseFloat($("#actualHealth").html());if(aO>=10){aM=aj(G,c);if((aO>=50)&&(R==false)){aA(aN,"Berserk");L(aM+"ms后连击");setTimeout(function(){aw(aN)},aM)}else{aA(aN,"undefined");L(aM+"ms后单击");setTimeout(function(){aw(aN)},aM)}}else{S("HitUsingWeapon",0);aF()}}function ax(){function aM(a9,ba){var a8={};var a6=0;var a7=0;var bb;if(ba==true){bb=$("#topDefender"+a9)}else{bb=$("#topAttacker"+a9)}if((bb.length>0)&&(bb.children().length>0)){a6=bb.children().children('a[href^="profile.html?id="]').attr("href").split("=")[1];a7=parseInt(bb.children().children(".hitInfl").text().replace(/,/g,""))}a8.IsDefender=ba;a8.Id=a6;a8.Damage=a7;return a8}function aO(a9,ba){var a8={};var a6=0;var a7=0;var bb;if(ba==true){bb=$("#top10Defenders"+a9)}else{bb=$("#top10Attackers"+a9)}if((bb.length>0)&&(bb.children().length>0)){a6=bb.children("div").children('a[href^="profile.html?id="]').attr("href").split("=")[1];a7=parseInt(bb.children("div").children(".hitInfl").text().replace(/,/g,""))}a8.IsDefender=ba;a8.Id=a6;a8.Damage=a7;return a8}function a3(){var a6=aj(0,2);if(a6==0){L("随机输出在 防守方");return"defender"}else{L("随机输出在 进攻方");return"attacker"}}function aS(a6,a7){if(a6[0].Damage>a7[0].Damage){L("防守方第一位伤害较少，选择输出在 防守方");return"defender"}else{if(a6[0].Damage<a7[0].Damage){L("进攻方第一位伤害较少，选择输出在 进攻方");return"attacker"}else{L("双方第一位伤害相同或无人输出");return a3()}}}function aQ(a6,a7){if(a6[2].Damage>a7[2].Damage){L("防守方第三位伤害较少，选择输出在 防守方");return"defender"}else{if(a6[2].Damage<a7[2].Damage){L("进攻方第三位伤害较少，选择输出在 进攻方");return"attacker"}else{L("双方第三位伤害相同或无人输出");return aS(a6,a7)}}}function aY(a6,a7){if(a6[9].Damage>a7[9].Damage){L("防守方第十位伤害较少，选择输出在 防守方");return"defender"}else{if(a6[9].Damage<a7[9].Damage){L("进攻方第十位伤害较少，选择输出在 进攻方");return"attacker"}else{L("双方第十位伤害相同或无人输出");return aQ(a6,a7)}}}var a4;var aW;if($(".xflagsBig").length>0){var aR=new RegExp("-","g");a4=$(".xflagsBig:first").attr("class").split(" ").pop();a4=a4.substring(a4.indexOf("-")+1).replace(aR," ");aW=$(".xflagsBig:last").attr("class").split(" ").pop();aW=aW.substring(aW.indexOf("-")+1).replace(aR," ")}else{if($(".flags-big").length>0){a4=$(".flags-big:first").attr("class").split(" ").pop();aW=$(".flags-big:last").attr("class").split(" ").pop()}else{if($(".muAvatar").length>0){a4=$(".alliesList.leftList.fightFont").text().trim();aW=$(".alliesList.rightList.fightFont").text().trim()}else{a4="未知";aW="未知"}}}L(a4+" vs "+aW);if((Q==true)&&($.inArray(a4,am)>=0)){L(a4+"是敌人，将为"+aW+"输出");return"attacker"}else{if((Q==true)&&($.inArray(aW,am)>=0)){L(aW+"是敌人，将为"+a4+"输出");return"defender"}else{if((Q==true)&&($.inArray(a4,x)>=0)){L(a4+"是盟友，将为"+a4+"输出");return"defender"}else{if((Q==true)&&($.inArray(aW,x)>=0)){L(aW+"是盟友，将为"+aW+"输出");return"attacker"}else{if(D<0){return a3()}if(D==0){L("设置输出在 防守方");return"defender"}else{if(D==1){L("设置输出在 进攻方");return"attacker"}else{if(D>=2){var aN=$("#userName").attr("href").split("=")[1];var aU=[];var a0=[];for(var a2=1;a2<=3;a2++){aU.push(aM(a2,false));a0.push(aM(a2,true))}for(var a1=4;a1<=10;a1++){aU.push(aO(a1,false));a0.push(aO(a1,true))}var aT=10;var aV=10;for(var aZ=0;aZ<10;aZ++){if(aN==aU[aZ].Id){aV=aZ;break}}for(var aX=0;aX<10;aX++){if(aN==a0[aX].Id){aT=aX;break}}if(aT<aV){L("你在防守方输出为第"+(aT+1)+"位，选择输出在 防守方");return"defender"}else{if(aT>aV){L("你在进攻方输出为第"+(aV+1)+"位，选择输出在 进攻方");return"attacker"}else{if(aT<10){if(aU[aT].Damage<a0[aT].Damage){L("你在双方输出均为第"+(aT+1)+"位，但在防守方伤害较高，选择输出在 防守方");return"defender"}else{if(aU[aT].Damage>a0[aT].Damage){L("你在双方输出均为第"+(aT+1)+"位，但在进攻方伤害较高，选择输出在 进攻方");return"attacker"}else{L("你在双方输出均为第"+(aT+1)+"位，且伤害相同");return a3()}}}else{if(D==2){return aS(aU,a0)}else{if(D==3){return aQ(aU,a0)}else{if(D==4){return aY(aU,a0)}else{if(D==5){return a3()}else{if(D==6){var aP=$('img[src$="red_ball.png"]').length;var a5=$('img[src$="blue_ball.png"]').length;if(aP>a5){L("防守方获胜回合数较少，选择输出在 防守方");return"defender"}else{if(aP<a5){L("进攻方获胜回合数较少，选择输出在 进攻方");return"attacker"}else{L("双方获胜回合数相同");return a3()}}}else{return a3()}}}}}}}}}else{return a3()}}}}}}}}function aC(){if(K==true){L("等待跳转到工作页");return}if(an()=="battle"){av=0;if($(".testDivred").length>0){L("该战场被冻结");l();return}else{if($("#fightButton2").length>0){aw(ax())}else{if($("#fightButton1").length>0){aw("side")}else{l();return}}}}else{l();return}}if(an()=="battle"){if(B>0){if(Date.now()>B){L("超过设定时间，关闭自动清体",1000000);return}else{L("即将在"+ad(new Date(B))+"停止自动清体功能")}}if(h>0){var az=aj(0,100);if(h>az){L("因为概率设置，本次不会清体("+az+"<"+h+")");aF();return}}if(ah==parseInt($('a[href^="battleStatistics.html?id="]').attr("href").replace("battleStatistics.html?id=",""))){if(C>0){var aE=aj(0,100);if(C>aE){var aJ=aG();var aH=parseInt($("#minutesLimit").text().split(":")[0]);var aD=parseInt($("#secondsLimit").text());if((aH<0)||isNaN(aH)){aH=0}if((aD<0)||isNaN(aD)){aD=0}var aI=aJ-(aH*60+aD);if((aJ>0)&&(aI<0)&&(aJ<v*60)){T=r;R=q;G=m;c=U;var ay=aj(s,Z);var aK=(aJ-ay)*1000;L("该场为重要战场，将于 S"+ay+" 压秒",1000000);setTimeout(function(){aC()},aK);return}else{L("该场为重要战场，程序将在回合最后"+v+"分钟进行判断");aC();return}}else{L("虽然该场为重要战场，但因为概率设置("+aE+"<"+C+")，本次不进行压秒判断");aC();return}}else{L("虽然该场为重要战场，但是压秒概率为0，将忽略压秒设置");aC();return}}else{aC();return}}else{L("非战场页面");aC();return}}

