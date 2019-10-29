chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    console.log("replace: " + details.url);
    return {redirectUrl: chrome.extension.getURL("equipmentSprite.png")};
  },
  {
    urls: [
        "*://cdn.e-sim.org//img/equipmentIcons/equipmentSprite4.png"
    ]
  },
  ["blocking"]
);