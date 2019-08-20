var env;
var envURL;
var envPage;
var rules;
var tempRules = [
  'index',
  'toegang',
  'access',
  'taal',
  'lang',
  'versoek',
  'request',
  'php',
  'nat',
  'builder',
  'codiad',
  'tye',
  'times',
  'kontak',
  'contact'
];
var suggestions = [];

function alertInvalid() {
  alert("Invalid command!");
}

function alertReload() {
  alert("Please reload any open ERP tabs to apply changes.");
}

function customRule() {
  chrome.storage.sync.get(null, function(result) {
    rules = result.rules;
    var i = 0;
    if (rules == undefined) {
      chrome.tabs.create({url:envURL+'nwk/index.php'},function(data) {});
    } else {
      var rulesLen = rules.length;
      $.each( rules, function( idx, val ) {
        if (envPage == val.keyword) {
          chrome.tabs.create({url:envURL+val.link},function(data) {});
          return false;
        } else {
          i++;
        }
      });
      if (i == rulesLen) {
        chrome.tabs.create({url:envURL+'nwk/index.php'},function(data) {});
      }
    }
  });
}

function filterItems(query) {
  return tempRules.filter(function(el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
}

function filterCalculations(text) {
  var filtered = filterItems(text);
  // Add suggestions to an array
  suggestions = [];
  if (filtered.length > 0) {
    for (var i = 0; i < filtered.length; i++) {
      suggestions.push({ content: 'dev'+filtered[i], description: 'dev'+filtered[i] });
      suggestions.push({ content: 'prd'+filtered[i], description: 'prd'+filtered[i] });
    }
  }
  // Set first suggestion as the default suggestion
  chrome.omnibox.setDefaultSuggestion({description: 'Rules Matched ('+(filtered.length*2)+')'});
  // Remove the first suggestion from the array since we just suggested it
  // suggestions.shift();
  return true;
}

// chrome.contextMenus.create({
//   "id": "erpQA",
//   "title": "ERP - Quick Actions"
// });

// chrome.storage.sync.get(null, function(result) {
//   rules = result.rules;
//   if (rules != undefined) {
//     for (var i = 0; i < rules.length; i++) {
//       chrome.contextMenus.create({
//         "id": rules[i].keyword,
//         "title": rules[i].keyword,
//         "parentId": "erpQA",
//         // "onclick": openPopUp
//       });
//     }
//     chrome.contextMenus.create({"type": "separator","parentId": "erpQA"});
//   }
//   for (var i = 0; i < tempRules.length; i++) {
//     chrome.contextMenus.create({
//       "id": tempRules[i],
//       "title": tempRules[i],
//       "parentId": "erpQA",
//       // "onclick": openPopUp
//     });
//   }
// });

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  text = text.replace(" ", "");
  if (rules == undefined) {
    chrome.storage.sync.get(null, function(result) {
      rules = result.rules;
      for (var i = 0; i < rules.length; i++) {
        tempRules.push(rules[i].keyword);
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

chrome.omnibox.onInputEntered.addListener(function(text, currentTab) {
  if (text == 'dark' || text == 'light') {
    chrome.storage.sync.set({nwk_theme:text}, function() {
      alertReload();
    });
  } else {
    if (text.length > 2) {
      env = text.substring(0,3);
      envPage = text.substring(3);
      if (env == 'dev') {
        envURL = 'http://php-dev.nwk.co.za/';
      } else if (env == 'prd') {
        envURL = 'http://php-prd.nwk.co.za/';
      } else {
        alertInvalid();
      }
    } else {
      alertInvalid();
    }

    switch(envPage) {
      case 'index':
        chrome.tabs.create({url:envURL+'nwk/index.php'},function(data) {});
        break;

      case 'toegang':
      case 'access':
        chrome.tabs.create({url:envURL+'ALGEMEEN/MENU/alg_men_010_S_skp.php'},function(data) {});
        break;

      case 'taal':
      case 'lang':
        chrome.tabs.create({url:envURL+'INLIGTINGSTEGNOLOGIE/TAALVERANDERLIKE/inl_tvr_001_E_nvg.php'},function(data) {});
        break;

      case 'versoek':
      case 'request':
        chrome.tabs.create({url:envURL+'ALGEMEEN/VERSOEKE/alg_ver_001_M_kse.php'},function(data) {});
        break;

      case 'php':
        chrome.tabs.create({url:envURL+'INLIGTINGSTEGNOLOGIE/STELSELS%20ONDERHOUD/inl_sto_086_E_kse.php'},function(data) {});
        break;

      case 'nat':
        chrome.tabs.create({url:envURL+'INLIGTINGSTEGNOLOGIE/NATURAL%20STELSELONDERHOUD/inl_nso_001_M_kse.php'},function(data) {});
        break;

      case 'builder':
        chrome.tabs.create({url:envURL+'INLIGTINGSTEGNOLOGIE/FORM%20BUILDER/inl_fbr_001_Z_skp.php'},function(data) {});
        break;

      case 'codiad':
        chrome.tabs.create({url:envURL+'Codiad/'},function(data) {});
        break;

      case 'tye':
      case 'times':
        chrome.tabs.create({url:envURL+'MENSEKAPITAAL/AANTEKENREGISTER/mhb_aan_014_Z_wsg.php?blad=wysig'},function(data) {});
        break;

      case 'kontak':
      case 'contact':
        chrome.tabs.create({url:envURL+'ALGEMEEN/KONTAK_INLIGTING/alg_kon_001_E_nvg.php'},function(data) {});
        break;

      default:
        customRule();
        break;
    }
  }
});