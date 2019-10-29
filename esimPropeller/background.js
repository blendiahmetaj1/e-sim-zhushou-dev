chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log("replace: " + details.url);
    return {redirectUrl: chrome.extension.getURL("cdn/"+details.url.split("//")[2].split("?")[0])};
  },
  {
    urls: [
        "*://cdn.e-sim.org//css/esim-style.css*",
        "*://cdn.e-sim.org//css/fight.css*",
        "*://cdn.e-sim.org//css/jquery-ui-1.9.2.custom.min.css*",
        "*://cdn.e-sim.org//css/laurels.css*",
        "*://cdn.e-sim.org//css/images/ui-icons_469bdd_256x240.png*",
        "*://cdn.e-sim.org//FlagsPackage/CSS/BIG/flagsStyle.css*",
        "*://cdn.e-sim.org//FlagsPackage/CSS/MEDIUM/flagsStyle.css*",
        "*://cdn.e-sim.org//FlagsPackage/CSS/SMALL/flagsStyle.css*",
        "*://cdn.e-sim.org//FlagsPackage/SPRITES/BIG/flagsSprite.png*",
        "*://cdn.e-sim.org//FlagsPackage/SPRITES/MEDIUM/flagsSprite.png*",
        "*://cdn.e-sim.org//FlagsPackage/SPRITES/SMALL/flagsSprite.png*",
        "*://cdn.e-sim.org//img/flags-medium-6.png*",
        "*://cdn.e-sim.org//img/equipmentIcons/equipmentSprite4.png*",
        "*://cdn.e-sim.org//img/equipmentIcons/equipmentSprite5.png*",
        "*://cdn.e-sim.org//js/dragresize.js*",
        "*://cdn.e-sim.org//js/foundation.min.js*",
        "*://cdn.e-sim.org//js/jquery.countdown2.js*",
        "*://cdn.e-sim.org//js/jquery.plugin.js*",
        "*://cdn.e-sim.org//js/jquery.validate.js*",
        "*://cdn.e-sim.org//js/jquery-1.8.3.min.js*",
        "*://cdn.e-sim.org//js/jquery-ui.min.js*",
        "*://cdn.e-sim.org//js/miniscroll.min.js*",
        "*://cdn.e-sim.org//js/script-min.js*",
        "*://cdn.e-sim.org//js/foundation/custom.modernizr.js*",
        "*://cdn.e-sim.org//font/opensans-bold-webfont.ttf*",
        "*://cdn.e-sim.org//font/opensans-light-webfont.ttf*",
        "*://cdn.e-sim.org//font/opensans-regular-webfont.ttf*"
    ]
  },
  ["blocking"]
);



chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log("replace: " + details.url);
    return {redirectUrl: chrome.extension.getURL("cdn2/"+details.url.split("//")[2].split("?")[0])};
  },
  {
    urls: [
        "*://cdn2.e-sim.org//FlagsPackage/SPRITES/BIG/flagsSprite.png*",
        "*://cdn2.e-sim.org//FlagsPackage/SPRITES/MEDIUM/flagsSprite.png*",
        "*://cdn2.e-sim.org//FlagsPackage/SPRITES/SMALL/flagsSprite.png*",
        "*://cdn2.e-sim.org//img/flags-medium-6.png*",
        "*://cdn2.e-sim.org//img/flags-big-6.png*",
    ]
  },
  ["blocking"]
);

