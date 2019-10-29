// ==UserScript==
// @name         esim 双击时间修正
// @namespace    EXFWTT
// @version      0.1
// @description  修正工作和训练界面时间无法显示的问题
// @author       Exsper
// @match        *.e-sim.org/work.html*
// @match        *.e-sim.org/train.html*
// @grant        none
// ==/UserScript==

  var GenericTimer2 = (function() {
    const getSpecifiedTimeValue = function(mainValue, basedOnValue, unit) {
      if (mainValue === 0 && basedOnValue > 0) {
        return '0' + unit + ' ';
      } else if (mainValue > 0) {
        return mainValue + unit + ' ';
      }
      return '';
    };

    return {
      bindTimerToHtmlElement: function(destinationTimeInSeconds, domElementThatDisplayTimer) {

        let interval = setInterval(function () {
          let now = new Date().getTime();
          let distance = destinationTimeInSeconds - now;

          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);

          let output = '';
          output += days > 0 ? days + 'd ' : '';
          output += getSpecifiedTimeValue(hours, days, 'h');
          output += getSpecifiedTimeValue(minutes, hours, 'm');
          output += getSpecifiedTimeValue(seconds, minutes, 's');

          document.getElementById(domElementThatDisplayTimer).innerHTML = output;
          if (distance < 0) {
            clearInterval(interval);
          }
        }, 1000);
      },
    }
  })();

var pathname = location.pathname;
if ((pathname.indexOf("train.html")>=0) && (document.getElementById("counter-train")!=null) && (document.getElementById("counter-train").innerText==""))
{
    let destinationTime = new Date();
    destinationTime.setSeconds(destinationTime.getSeconds() + parseInt(document.getElementById("resetTrain").textContent));
    destinationTime = destinationTime.getTime();
    GenericTimer2.bindTimerToHtmlElement(destinationTime, 'counter-train');
}
else if ((pathname.indexOf("work.html")>=0) && (document.getElementById("counter-work")!=null) && (document.getElementById("counter-work").innerText==""))
{
    let destinationTime = new Date();
    destinationTime.setSeconds(destinationTime.getSeconds() + parseInt(document.getElementById("resetWork").textContent));
    destinationTime = destinationTime.getTime();
    GenericTimer2.bindTimerToHtmlElement(destinationTime, 'counter-work');
}