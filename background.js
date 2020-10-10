// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function() {
    chrome.tabs.executeScript(null, { file: "content.js" });
  });
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
                  ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
