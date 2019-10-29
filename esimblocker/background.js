chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return{cancel: true};
  },
  {
    urls: [
        "*://www.google.com/*",
        "*://clients1.google.com/*",
        "*://apis.google.com/js/client.js",
        "*://apis.google.com/js/platform.js",
        "*://apis.google.com/js/api:client.js",
        "*://www.google-analytics.com/analytics.js",
        "*://fonts.googleapis.com/*",
        "*://connect.facebook.net/*",
        "*://platform.twitter.com/*",
        "*://pixel-geo.prfct.co/*",
        "*://www.google-analytics.com/*"

    ]
  },
  ["blocking"]
);