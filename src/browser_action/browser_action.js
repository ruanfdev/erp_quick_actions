$(document).ready(function() {

  // $('.jscolor').click(function(e){
  //   console.log($('.jscolor').val());
  //   setTimeout(() => {
  //     $('.jscolor').val('#C0C0C0')
  //     $('.jscolor').css('background-color','#C0C0C0')
  //   }, 5000);
  // });

  // var c = document.documentElement.style.getPropertyValue('--dark');
  // alert('The value of --myVariable is : ' + (c?c:'undefined'));



  var dynInject = false;
  var setDynInject = function(val){
    dynInject = val;
    if (dynInject){
      injectNow(true);
    } else {
      injectNow(false);
    }
  };

  var css_textarea     = document.getElementById('custom_css_block');
  var js_textarea     = document.getElementById('custom_js_block');
  var myCssCode = CodeMirror.fromTextArea(css_textarea, {
    lineNumbers: true,
    gutter: true,
    lineWrapping: true
  });
  var myJsCode = CodeMirror.fromTextArea(js_textarea, {
    lineNumbers: true,
    gutter: true,
    lineWrapping: true
  });
  var bar1 = new ldBar(".ldBar");
  var max_fields    = 100;
  var wrapper       = $(".container1");
  var input         = $("input");
  var add_button    = $(".add_form_field");
  var clear_button  = $(".clear_all");
  var login_btn   = $(".login_btn");
  var save_button   = $(".save_form_field");
  var save_custom_settings   = $(".save_custom_settings");
  var menu_bars     = $("#menu_bars");
  var close_menu    = $(".closebtn");
  var checkmark    = $(".checkmark");
  var onoffswitch    = $(".onoffswitch-label");
  var qActions;
  var rules;
  var custom_css_block;
  var custom_js_block;
  var custColsArr;
  var latest_version;
  var current_version;

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB1XcpxDxatOvYXM_l-rsNFi5CVuUNPoNM",
    authDomain: "erp-quick-actions.firebaseapp.com",
    databaseURL: "https://erp-quick-actions.firebaseio.com",
    projectId: "erp-quick-actions",
    storageBucket: "erp-quick-actions.appspot.com",
    messagingSenderId: "673200916854"
  };
  firebase.initializeApp(config);

  function createNotif() {
    var opt = {
      type: 'basic',
      title: 'Update Available',
      message: 'Chrome will update your extensions automatically to keep you from living in the past...',
      priority: 2,
      iconUrl:'../../icon_128.png'
    };
    chrome.notifications.create('id', opt, function(id) {});
  }

  var latest_version_DB = firebase.database().ref().once('value').then(function(snapshot){
    latest_version = snapshot.val().latest_version;
    var changelog = snapshot.val().changelog;

    for (let index = 2; index < changelog.length; index++) {
      $('#changeHead').html('Changelog for version '+changelog[1]);
      $('#changeList').append('<li id="changeItem changeItem'+index+'">'+changelog[index]+'</li>');
    }

    chrome.management.getSelf(function(extData) {
      current_version = extData.version;
      current_version = parseFloat(current_version);
      $('#currentVer').html(current_version);
      $('#latestVer').html(latest_version);

      if (current_version < latest_version) {
        $('#versionText').html('Do you like living in the past?');
        $('#tooltip').css('color','#c12e2a');
        $('#tooltip .tooltiptext').css('background-color','#c12e2a');
        createNotif();
      } else if (current_version > latest_version) {
        $('#versionText').html('Are you a time traveller?');
        $('#tooltip').css('color','#71bf44');
        $('#tooltip .tooltiptext').css('background-color','#71bf44');
      } else {
        $('#versionText').html('Up-to-date');
        $('#tooltip').css('color','#71bf44');
        $('#tooltip .tooltiptext').css('background-color','#71bf44');
      }
      $('#tooltip').css('display', 'inline-block');
      $('#tooltipChange').css('display', 'inline-block');

      firebase.app().delete();
    });

  });

  chrome.storage.sync.get(null, function(result) {
    nwk_theme = result.nwk_theme;
    custom_css_block = result.custom_css_block;
    custom_js_block = result.custom_js_block;
    injected = result.injected;
    rules = result.rules;
    custColsArr = result.custColsArr;
    chkedHeader = result.chkedHeader;
    chkedGlow = result.chkedGlow;
    chkedRGBhead = result.chkedRGBhead;
    chkedEasyui = result.chkedEasyui;
    chkedNewtab = result.chkedNewtab;
    chkedMenus = result.chkedMenus;
    chkedAnimate = result.chkedAnimate;
    chkedMainBlock = result.chkedMainBlock;

    var i = 0;
    if (rules == undefined || rules[0].keyword == '') {
      rules = [];
    } else {
      var rulesLen = rules.length;
      $.each( rules, function( idx, val ) {
        $('[name = "mytext[]"]').eq(idx).val(val.keyword+'::'+val.link);
        if (i < (rulesLen - 1)) {
          $(add_button).trigger('click');
        }
        i++;
      });
    }
    
    if (custColsArr == undefined || typeof custColsArr[0] == undefined) {
      custColsArr = [];
    } else {
      $.each( custColsArr, function(idx,val) {
        document.getElementById(val.id).jscolor.fromString(val.val);
      });
    }
    

    if (nwk_theme == 'dark') {
      $('#myonoffswitch').prop('checked', false);
      changeDark();
    } else {
      $('#myonoffswitch').prop('checked', true);
      changeLight();
    }

    if (injected == true) {
      $('#checkinject').prop('checked', true);
    } else {
      $('#checkinject').prop('checked', false);
    }

    if (chkedHeader == true) {
      $('#check_header').prop('checked', true);
    } else {
      $('#check_header').prop('checked', false);
    }
    if (chkedGlow == true) {
      $('#check_glow').prop('checked', true);
    } else {
      $('#check_glow').prop('checked', false);
    }
    if (chkedRGBhead == true) {
      $('#check_rgbhead').prop('checked', true);
    } else {
      $('#check_rgbhead').prop('checked', false);
    }
    if (chkedEasyui == true) {
      $('#check_easyui').prop('checked', true);
    } else {
      $('#check_easyui').prop('checked', false);
    }
    if (chkedNewtab == true) {
      $('#check_newtab').prop('checked', true);
    } else {
      $('#check_newtab').prop('checked', false);
    }
    if (chkedMenus == true) {
      $('#check_menus').prop('checked', true);
    } else {
      $('#check_menus').prop('checked', false);
    }
    if (chkedAnimate == true) {
      $('#check_animate').prop('checked', true);
    } else {
      $('#check_animate').prop('checked', false);
    }
    if (chkedMainBlock == true) {
      $('#check_main_block').prop('checked', true);
    } else {
      $('#check_main_block').prop('checked', false);
    }

    if (custom_css_block != undefined) {
      myCssCode.setValue(custom_css_block);
    }
    if (custom_js_block != undefined) {
      myJsCode.setValue(custom_js_block);
    }
  });

  var x = 1;
  $(add_button).click(function(e){
    e.preventDefault();
    if(x < max_fields){
      x++;
      $('<div><input type="text" name="mytext[]" placeholder="index::nwk/index.php"/><a href="#" class="delete">-</a></div>').insertBefore('.bottom_pad');
    } else {
      alert('Custom Rule limit reached: '+max_fields+' fields');
    }
  });

  $(save_custom_settings).click(function(e){
    bar1.set(0);
    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(onoffswitch).click(function(e){
    bar1.set(0);
    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(checkmark).click(function(e){
    bar1.set(0);
    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(login_btn).click(function(e){
    bar1.set(0);
    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(clear_button).click(function(e){
    document.getElementById("ldContain").style.opacity = "1";
    document.getElementById("ldContain").style.zIndex = "5";
    setTimeout(function () {
      var result = confirm("Are you sure you want to clear all extension settings from storage?");
      if (result) {
        bar1.set(0);
        setTimeout(function () {
          chrome.storage.sync.clear(function() {
            bar1.set(100);
            setTimeout(function () {
              document.getElementById("ldContain").style.opacity = "0";
              document.getElementById("ldContain").style.zIndex = "-1";
              setDynInject(true);
              window.location.reload();
            }, 800);
          });
        }, 100);
      } else {
        document.getElementById("ldContain").style.opacity = "0";
        document.getElementById("ldContain").style.zIndex = "-1";
      }
    }, 100);

  });

  $(save_button).click(function(e){
    bar1.set(0);
    setTimeout(function () {
      document.getElementById("ldContain").style.opacity = "1";
      document.getElementById("ldContain").style.zIndex = "5";
    }, 100);

    custom_css_block = myCssCode.getValue();
    custom_js_block = myJsCode.getValue();

    var chkedTheme = $('#myonoffswitch').is(":checked");
    var chkedInject = $('#checkinject').is(":checked");
    var chkedHeader = $('#check_header').is(":checked");
    var chkedMenus = $('#check_menus').is(":checked");
    var chkedAnimate = $('#check_animate').is(":checked");
    var chkedMainBlock = $('#check_main_block').is(":checked");
    var chkedGlow = $('#check_glow').is(":checked");
    var chkedRGBhead = $('#check_rgbhead').is(":checked");
    var chkedEasyui = $('#check_easyui').is(":checked");
    var chkedNewtab = $('#check_newtab').is(":checked");

    if (chkedTheme) {
      nwk_theme = 'light';
    } else {
      nwk_theme = 'dark';
    }

    if (chkedInject) {
      injected = true;
    } else {
      injected = false;
    }

    rules = [];
    $('input[type=text]').each(function(index){
      var input = $(this);
      qActions = input.val();
      qActions = qActions.split("::");
      rules.push({
        keyword: qActions[0],
        link:  qActions[1]
      });
    });

    custColsArr = [];
    $('input.jscolor').each(function(index){
      var input = $(this);
      console.log('HIER',input[0].style.color);
      custColsId = input[0].id;
      custColsVal = input.val();
      custColsText = input[0].style.color;
      custColsArr.push({
        id: custColsId,
        val:  custColsVal,
        textCol: custColsText
      });
    });

    chrome.storage.sync.clear(function() {
      chrome.storage.sync.set({rules:rules,custColsArr:custColsArr,nwk_theme:nwk_theme,injected:injected,custom_css_block:custom_css_block,custom_js_block:custom_js_block,chkedHeader:chkedHeader,chkedGlow:chkedGlow,chkedRGBhead:chkedRGBhead,chkedEasyui:chkedEasyui,chkedNewtab:chkedNewtab,chkedMenus:chkedMenus,chkedAnimate:chkedAnimate,chkedMainBlock:chkedMainBlock}, function() {
        bar1.set(100);
        setTimeout(function () {
          document.getElementById("ldContain").style.opacity = "0";
          document.getElementById("ldContain").style.zIndex = "-1";
          if (chkedTheme) {
            changeLight();
          } else {
            changeDark();
          }
          if (chkedInject) {
            setDynInject(true);
          } else {
            setDynInject(false);
          }
        }, 800);
      });
    });
  });

  $(wrapper).on("click",".delete", function(e){
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  });

  $(menu_bars).click(function(e){
    document.getElementById("mySidenav").style.width = "90%";
    document.getElementById("mySidenav").style.height = "90%";
    document.getElementById("mySidenav").style.padding = "5%";
    document.getElementById("mySidenav").style.opacity = "1";
    document.getElementById("body").style.minHeight = "550px";
    document.getElementById("body").style.minWidth = "700px";
    document.getElementById("container1").style.overflow = "hidden";
    document.getElementById("container1").style.maxHeight = "560px";
    document.getElementById("closebtn").style.right = "30px";
    document.getElementById("save_custom_settings").style.right = "30px";
    document.getElementById("save_custom_settings").style.bottom = "10px";
  });

  $(close_menu).click(function(e){
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.height = "125%";
    document.getElementById("mySidenav").style.padding = "0";
    document.getElementById("mySidenav").style.opacity = "0";
    document.getElementById("body").style.minHeight = "0px";
    document.getElementById("body").style.minWidth = "400px";
    document.getElementById("container1").style.overflow = "visible";
    document.getElementById("container1").style.maxHeight = "none";
    document.getElementById("closebtn").style.right = "100%";
    document.getElementById("save_custom_settings").style.right = "100%";
    document.getElementById("save_custom_settings").style.bottom = "-45px";
  });
  localizeHtmlPage();
});

function reloadExt() {
  var rld = confirm("Reload required if the following changes were made:\n1. Changing 'Custom Colors'\n2. Enabling/Disabling 'Custom New Tab'\n3. Adding/Editing quick actions to update the context menu\n\nDo you want to reload?");
  if (rld == true) {
    setTimeout(() => {
      chrome.runtime.reload();
    }, 1000);
  }
}

function injectNow(param) {
  chrome.tabs.query({url: "http://*.nwk.co.za/*"}, function(tabs){
    if (param == true) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, {action: "dynInject"}, function(response) {
        });
      }
    } else {
      for (var j = 0; j < tabs.length; j++) {
        chrome.tabs.sendMessage(tabs[j].id, {action: "dynInjectCustom"}, function(response) {
        });
      }
    }
    reloadExt();
  });
}

function changeDark() {
  var bodyThemeL = $('body').hasClass("light");
  var bodyThemeD = $('body').hasClass("dark");
	if (bodyThemeL == true) {
    $("body").removeClass("light");
    $("body").addClass("dark");
  } else {
    if (bodyThemeD == true) {
      return true;
    } else {
      $("body").addClass("dark");
    }
  }
}

function changeLight() {
  var bodyThemeL = $('body').hasClass("light");
  var bodyThemeD = $('body').hasClass("dark");
	if (bodyThemeD == true) {
    $("body").removeClass("dark");
    $("body").addClass("light");
  } else {
    if (bodyThemeL == true) {
      return true;
    } else {
      $("body").addClass("light");
    }
  }
}

function replace_i18n(obj, tag) {
  var msg = tag.replace(/__MSG_(\w+)__/g, function(match, v1) {
    return v1 ? chrome.i18n.getMessage(v1) : '';
  });
  if (msg != tag) {
    obj.innerHTML = msg;
  }
}

function localizeHtmlPage() {
  // Localize using __MSG_***__ data tags
  var data = document.querySelectorAll('[data-localize]');
  var obj;
  var tag;

  for (var i in data) {
    if (data.hasOwnProperty(i)) {
      obj = data[i];
      tag = obj.getAttribute('data-localize').toString();
      replace_i18n(obj, tag);
    }
  }
}
