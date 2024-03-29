var env;
var envURL;
var envPage;
var shouldReplaceNewTab = false;
var rules;
var fixedRules = [
  'index',
  'vb',
  'times',
  'pers',
  'ses'
];
var fixedRulesDesc = [
  'Homepage',
  'Requests',
  'Login Times',
  'Personnel Info',
  'User Session'
];
var suggestions = [];
var startTime = 0;
var endTime = 0;
var todayActiveTime = 0;
startTime = new Date();
startTime = startTime.getTime();
var todayDate = 0;
var history_log = [];

function alertInvalid() {
  alert("Invalid command!");
}

function alertReload() {
  alert("Please reload any open ERP tabs to apply changes.");
}

function customRule(envPage) {
  chrome.storage.sync.get(null, function (result) {
    rules = result.rules;
    var i = 0;
    if (rules == undefined) {
      chrome.tabs.create({ url: envURL + 'nwk/index.php' }, function (data) { });
    } else {
      var rulesLen = rules.length;
      rules.forEach((val, idx) => {
        if (envPage == val.keyword) {
          chrome.tabs.create({ url: envURL + val.link }, function (data) { });
          return false;
        } else {
          i++;
        }
      });
      if (i == rulesLen) {
        chrome.tabs.create({ url: envURL + 'nwk/index.php' }, function (data) { });
      }
    }
  });
}

function filterItems(query) {
  return fixedRules.filter(function (el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
}

function filterCalculations(text) {
  var filtered = filterItems(text);
  // Add suggestions to an array
  suggestions = [];
  if (filtered.length > 0) {
    for (var i = 0; i < filtered.length; i++) {
      suggestions.push({ content: 'prd' + filtered[i], description: 'prd' + filtered[i] });
      suggestions.push({ content: 'dev' + filtered[i], description: 'dev' + filtered[i] });
      suggestions.push({ content: 'qa' + filtered[i], description: 'qa' + filtered[i] });
    }
  }
  // Set first suggestion as the default suggestion
  chrome.omnibox.setDefaultSuggestion({ description: 'Rules Matched (' + (filtered.length * 3) + ')' });
  // Remove the first suggestion from the array since we just suggested it
  // suggestions.shift();
  return true;
}

function callDefaults(envPage) {
  switch (envPage) {
    case 'index':
      chrome.tabs.create({ url: envURL + 'nwk/index.php' }, function (data) { });
      break;

    case 'vb':
      chrome.tabs.create({ url: envURL + 'ALGEMEEN/VERSOEKE/alg_ver_001_M_kse.php' }, function (data) { });
      break;

    case 'times':
      chrome.tabs.create({ url: envURL + 'MENSEKAPITAAL/AANTEKENREGISTER/mhb_aan_014_Z_wsg.php?blad=wysig' }, function (data) { });
      break;

    case 'pers':
      chrome.tabs.create({ url: envURL + 'ALGEMEEN/KONTAK_INLIGTING/alg_kon_001_E_nvg.php' }, function (data) { });
      break;

    case 'ses':
      chrome.tabs.create({ url: envURL + 'session.php' }, function (data) { });
      break;

    default:
      customRule(envPage);
      break;
  }
}

function testEnv(text) {
  if (text.length > 2) {
    env = text.substring(0, 3);
    envPage = text.substring(3);
    if (env == 'dev') {
      envURL = 'http://php-dev.nwk.co.za/';
    } else if (env == 'prd') {
      envURL = 'http://php-prd.nwk.co.za/';
    } else {
      alertInvalid();
      return false;
    }
  } else {
    env = text.substring(0, 2);
    envPage = text.substring(2);
    if (env == 'qa') {
      envURL = 'http://php-qa.nwk.co.za/';
    } else {
      alertInvalid();
      return false;
    }
  }
  return true;
}

var openERP = function (e) {
  if (e.parentMenuItemId == "erpID_PRD") {
    envURL = 'http://php-prd.nwk.co.za/';
  } else if (e.parentMenuItemId == "erpID_DEV") {
    envURL = 'http://php-dev.nwk.co.za/';
  } else {
    envURL = 'http://php-qa.nwk.co.za/';
  }
  var itemID = e.menuItemId;
  callDefaults(itemID.substring(1));
};

chrome.contextMenus.create({
  "id": "erpID",
  "title": "ERP - Quick Actions"
});

chrome.contextMenus.create({
  "id": "erpID_PRD",
  "parentId": "erpID",
  "title": "PRD"
});

chrome.contextMenus.create({
  "id": "erpID_DEV",
  "parentId": "erpID",
  "title": "DEV"
});

chrome.contextMenus.create({
  "id": "erpID_QA",
  "parentId": "erpID",
  "title": "QA"
});

chrome.storage.sync.get(null, function (result) {
  rules = result.rules;
  chkedNewtab = result.chkedNewtab;

  if (chkedNewtab == true) {
    shouldReplaceNewTab = true;
  }

  for (let indFor = 1; indFor < 4; indFor++) {
    if (indFor == 1) {
      parent = "erpID_PRD";
      pre = 'P';
    } else if (indFor == 2) {
      parent = "erpID_DEV";
      pre = 'D';
    } else {
      parent = "erpID_QA";
      pre = 'Q';
    }

    for (var i = 0; i < fixedRules.length; i++) {
      chrome.contextMenus.create({
        "id": pre + fixedRules[i],
        "title": fixedRulesDesc[i],
        "parentId": parent
      });
    }

    chrome.contextMenus.create({
      "id": "sep"+indFor,
      "type": 'separator',
      "contexts": ["all"],
      "parentId": parent
    });

    if (rules != undefined && rules[0].keyword != '') {
      for (var i = 0; i < rules.length; i++) {
        chrome.contextMenus.create({
          "id": pre + rules[i].keyword,
          "title": rules[i].keyword,
          "parentId": parent
        });
      }
    }
  }
  chrome.contextMenus.onClicked.addListener(openERP);
});

chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  text = text.replace(" ", "");
  if (rules == undefined) {
    chrome.storage.sync.get(null, function (result) {
      rules = result.rules;
      for (var i = 0; i < rules.length; i++) {
        fixedRules.push(rules[i].keyword);
      }
      if (filterCalculations(text)) {
        // Suggest the remaining suggestions
        suggest(suggestions);
      }
    });
  } else {
    if (filterCalculations(text)) {
      // Suggest the remaining suggestions
      suggest(suggestions);
    }
  }

});

chrome.omnibox.onInputEntered.addListener(function (text, currentTab) {
  if (text == 'dark' || text == 'light') {
    chrome.storage.sync.set({ nwk_theme: text }, function () {
      alertReload();
    });
  } else {
    if (testEnv(text)) {
      callDefaults(envPage);
    }
  }
});

chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.url == "chrome://newtab/" || tab.pendingUrl == "chrome://newtab/") {
    if (shouldReplaceNewTab === true) {
      chrome.tabs.update(tab.id, {
        active: true,
        url: chrome.runtime.getURL("src/new_tab/new_tab.html")
      });
    }
  }
});
