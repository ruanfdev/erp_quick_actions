$(document).ready(function() {

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
  var reset_cols   = $(".reset_cust_cols");
  var export_cols   = $(".export_cust_cols");
  var import_cols   = $(".import_cust_cols");
  var reload_erp_tabs = $(".reload_erp_tabs")
  var reload_ext = $(".reload_ext")
  var save_button   = $(".save_form_field");
  var save_custom_settings   = $(".save_custom_settings");
  var menu_bars     = $("#menu_bars");
  var close_menu    = $(".closebtn");
  var checkmark    = $(".checkmark");
  var onoffswitch    = $(".onoffswitch-label");
  var pass_show     = $("#pass_show");
  var pass_hide     = $("#pass_hide");
  var smallBlockSliderVar = $('#small_Block_Slider');
  var smallBlockSliderOutput = $('#small_Block_Slider_Size');
  var qActions;
  var rules;
  var idle_date;
  var idle_time;
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

  var accordion = document.getElementsByClassName("accordion");
  var accIndex;
  for (accIndex = 0; accIndex < accordion.length; accIndex++) {
    accordion[accIndex].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  // Version Check Old Position

  chrome.storage.sync.get(null, function(result) {
    nwk_theme = result.nwk_theme;
    custom_css_block = result.custom_css_block;
    custom_js_block = result.custom_js_block;
    autofill_user = result.autofill_user;
    autofill_pass = result.autofill_pass;
    idle_date = result.idle_date;
    idle_time = result.idle_time;
    injected = result.injected;
    rules = result.rules;
    custColsArr = result.custColsArr;
    chkedHeader = result.chkedHeader;
    chkedGlow = result.chkedGlow;
    chkedRGBhead = result.chkedRGBhead;
    chkedNyanCursor = result.chkedNyanCursor;
    chkedNewtab = result.chkedNewtab;
    chkedCustomCol = result.chkedCustomCol;
    chkedHidhead = result.chkedHidhead;
    chkedVivaldihead = result.chkedVivaldihead;
    chkedMenus = result.chkedMenus;
    chkedMainBlock = result.chkedMainBlock;
    smallBlockSlider = result.smallBlockSlider;

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

    if (idle_date == undefined || typeof idle_date == undefined) {
      idle_date = 0;
      idle_time = 0;
      $('#activeTimeText').html(0+'hrs '+0+'min '+0+'sec');
    } else {
    	var idle_time_HRS_fin = 0;
    	var idle_time_MIN_fin = 0;
    	var idle_time_SEC_fin = 0;

    	if (idle_time > 0) {
    		var idle_time_HRS = (idle_time/60)/60;

    		var idle_time_MIN = idle_time_HRS.toString().split(".");
    		idle_time_HRS_fin = idle_time_MIN[0];
    		idle_time_MIN = parseFloat("0."+idle_time_MIN[1])*60;

    		var idle_time_SEC = idle_time_MIN.toString().split(".");
    		idle_time_MIN_fin = idle_time_SEC[0];
    		idle_time_SEC = parseFloat("0."+idle_time_SEC[1])*60;
    		idle_time_SEC = idle_time_SEC.toString().split(".");
    		idle_time_SEC_fin = idle_time_SEC[0];
    	}

      $('#activeTimeText').html(idle_time_HRS_fin+'hrs '+idle_time_MIN_fin+'min '+idle_time_SEC_fin+'sec');
    }

    if (custColsArr == undefined || typeof custColsArr[0] == undefined) {
      custColsArr = [];
      defaultColors();
    } else {
      $.each( custColsArr, function(idx,val) {
        if (document.getElementById(val.id) != null) {
          document.getElementById(val.id).jscolor.fromString(val.val);
        }
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
    if (chkedNyanCursor == true) {
      $('#check_nyan_cursor').prop('checked', true);
    } else {
      $('#check_nyan_cursor').prop('checked', false);
    }
    if (chkedNewtab == true) {
      $('#check_newtab').prop('checked', true);
    } else {
      $('#check_newtab').prop('checked', false);
    }
    if (chkedCustomCol == true) {
      $('#check_custom_col').prop('checked', true);
    } else {
      $('#check_custom_col').prop('checked', false);
    }
    if (chkedHidhead == true) {
      $('#check_hidhead').prop('checked', true);
    } else {
      $('#check_hidhead').prop('checked', false);
    }
    if (chkedVivaldihead == true) {
      $('#check_vivaldiHead').prop('checked', true);
    } else {
      $('#check_vivaldiHead').prop('checked', false);
    }
    if (chkedMenus == true) {
      $('#check_menus').prop('checked', true);
    } else {
      $('#check_menus').prop('checked', false);
    }
    if (chkedMainBlock == true) {
      $('#check_main_block').prop('checked', true);
      $('#small_Block_Slider').val(smallBlockSlider);
      $('#small_Block_Slider_Size').html('- '+smallBlockSlider+'px');
    } else {
      $('#check_main_block').prop('checked', false);
      $('#small_Block_Slider').val('130');
      $('#small_Block_Slider_Size').html('- 130px');
    }

    if (autofill_user != undefined && autofill_user != '') {
      $('#autofill_user').val(autofill_user);
    }
    if (autofill_pass != undefined && autofill_pass != '') {
      $('#autofill_pass').val(autofill_pass);
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

  $(reset_cols).click(function(e){
    bar1.set(0);
    $('#check_custom_col').prop('checked', false);
    defaultColors();

    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(export_cols).click(function(e){
    custColsArr = [];
    $('input.jscolor').each(function(index){
      var input = $(this);
      custColsId = input[0].id;
      custColsVal = input.val();
      custColsText = input[0].style.color;
      custColsArr.push({
        id: custColsId,
        val:  custColsVal,
        textCol: custColsText
      });
    });

    var personURL = encodeURI(JSON.stringify(custColsArr));
    var personKeyword = prompt("Theme Exported.\nEnter a keyword to be used for import.", '');

    if (personKeyword != null && personKeyword != "") {
      firebase.database().ref('themes/' + personKeyword).set({
        theme: personURL
      });
    }
  });

  $(import_cols).click(function(e){
    var keywordPrompt = prompt("Enter exported keyword here:", "");
    if (keywordPrompt != null && keywordPrompt != "") {
      firebase.database().ref().once('value').then(function(snapshot){
        var tempThemeData = snapshot.val().themes;
        if (typeof tempThemeData[keywordPrompt] != 'undefined') {
          var tempURL = tempThemeData[keywordPrompt].theme;
          tempURL = JSON.parse(decodeURI(tempURL));

          $.each( tempURL, function(idx,val) {
            document.getElementById(val.id).jscolor.fromString(val.val);
          });
        } else {
          alert('Invalid Keyword');
        }
      });
    } else {
      alert('Invalid Keyword');
    }
  });

  $(reload_erp_tabs).click(function(e){
    chrome.tabs.query({url: "http://*.nwk.co.za/*"}, function(tabs){
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.reload(tabs[i].id);
      }
    });
  });

  $(reload_ext).click(function(e){
    chrome.runtime.reload();
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
    autofill_user = $('#autofill_user').val();
    autofill_pass = $('#autofill_pass').val();

    var chkedTheme = $('#myonoffswitch').is(":checked");
    var chkedInject = $('#checkinject').is(":checked");
    var chkedHeader = $('#check_header').is(":checked");
    var chkedMenus = $('#check_menus').is(":checked");
    var chkedMainBlock = $('#check_main_block').is(":checked");
    var smallBlockSlider = $('#small_Block_Slider').val();
    var chkedGlow = $('#check_glow').is(":checked");
    var chkedRGBhead = $('#check_rgbhead').is(":checked");
    var chkedNyanCursor = $('#check_nyan_cursor').is(":checked");
    var chkedNewtab = $('#check_newtab').is(":checked");
    var chkedCustomCol = $('#check_custom_col').is(":checked");
    var chkedHidhead = $('#check_hidhead').is(":checked");
    var chkedVivaldihead = $('#check_vivaldiHead').is(":checked");

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

    if (chkedVivaldihead) {
      chkedHeader = false;
      chkedHidhead = false;
    } else if (chkedHidhead) {
      chkedHeader = false;
      chkedVivaldihead = false;
    } else if (chkedHeader) {
      chkedHidhead = false;
      chkedVivaldihead = false;
    }

    rules = [];
    $('input[name = "mytext[]"]').each(function(index){
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
      chrome.storage.sync.set({rules:rules,custColsArr:custColsArr,nwk_theme:nwk_theme,injected:injected,custom_css_block:custom_css_block,custom_js_block:custom_js_block,chkedHeader:chkedHeader,chkedGlow:chkedGlow,chkedRGBhead:chkedRGBhead,chkedNyanCursor:chkedNyanCursor,chkedNewtab:chkedNewtab,chkedCustomCol:chkedCustomCol,chkedHidhead:chkedHidhead,chkedVivaldihead:chkedVivaldihead,chkedMenus:chkedMenus,chkedMainBlock:chkedMainBlock,smallBlockSlider:smallBlockSlider,autofill_user:autofill_user,autofill_pass:autofill_pass}, function() {
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

  $('#small_Block_Slider').on('change', function() {
    $('#small_Block_Slider_Size').html('- '+$('#small_Block_Slider').val()+'px');
  });

  $(pass_show).click(function(e){
    document.getElementById("pass_show").style.display = "none";
    document.getElementById("pass_hide").style.display = "block";
    $('#autofill_pass').attr('type','text');
  });

  $(pass_hide).click(function(e){
    document.getElementById("pass_hide").style.display = "none";
    document.getElementById("pass_show").style.display = "block";
    $('#autofill_pass').attr('type','password');
  });

  $(menu_bars).click(function(e){
    document.getElementById("mySidenav").style.height = "90%";
    document.getElementById("mySidenav").style.padding = "5%";
    document.getElementById("mySidenav").style.opacity = "1";
    document.getElementById("body").style.minHeight = "550px";
    document.getElementById("container1").style.overflow = "hidden";
    document.getElementById("container1").style.maxHeight = "560px";
    document.getElementById("closebtn").style.left = "14px";
    document.getElementById("save_custom_settings").style.right = "30px";
    document.getElementById("save_custom_settings").style.bottom = "10px";
  });

  $(close_menu).click(function(e){
    document.getElementById("mySidenav").style.height = "0";
    document.getElementById("mySidenav").style.padding = "0 5%";
    document.getElementById("mySidenav").style.opacity = "0";
    document.getElementById("body").style.minHeight = "0px";
    document.getElementById("container1").style.overflow = "visible";
    document.getElementById("container1").style.maxHeight = "none";
    document.getElementById("closebtn").style.left = "100%";
    document.getElementById("save_custom_settings").style.right = "100%";
    document.getElementById("save_custom_settings").style.bottom = "-45px";
  });

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

      if (current_version < latest_version) {
        $('#tooltip').css('color','#c12e2a');
        $('#tooltip .tooltiptext').css('background-color','#c12e2a');
        $('#latestVer').html(' (Latest Version '+latest_version+')');
        createNotif();
      } else {
        $('#tooltip').css('color','#71bf44');
        $('#tooltip .tooltiptext').css('background-color','#71bf44');
      }
      $('#tooltip').css('display', 'inline-block');
      $('#tooltipChange').css('display', 'inline-block');

      // firebase.app().delete();
    });

  });
});

function defaultColors() {
  document.getElementById("greenCustCol").jscolor.fromString('#71bf44');
  document.getElementById("orangeCustCol").jscolor.fromString('#f7931c');
  document.getElementById("redCustCol").jscolor.fromString('#c12e2a');
  document.getElementById("blueCustCol").jscolor.fromString('#2aabd2');

  document.getElementById("notySCustCol").jscolor.fromString('#bcf5bc');
  document.getElementById("notyECustCol").jscolor.fromString('#ff8181');
  document.getElementById("notyICustCol").jscolor.fromString('#78c5e7');
  document.getElementById("notyVCustCol").jscolor.fromString('#ffffff');

  document.getElementById("btnSuccessCustCol").jscolor.fromString('#71bf44');
  document.getElementById("btnWarningCustCol").jscolor.fromString('#f7931c');
  document.getElementById("btnDangerCustCol").jscolor.fromString('#c12e2a');
  document.getElementById("btnInfoCustCol").jscolor.fromString('#2aabd2');
  document.getElementById("btnDefaultCustCol").jscolor.fromString('#F2F2F2');

  document.getElementById("userBgCustCol").jscolor.fromString('#404040');
  document.getElementById("userHeaderCustCol").jscolor.fromString('#303030');
  document.getElementById("userMenusCustCol").jscolor.fromString('#303030');
  document.getElementById("userHomeItemsCustCol").jscolor.fromString('#505050');
  document.getElementById("userFieldsetCustCol").jscolor.fromString('#505050');
  document.getElementById("userLegendsCustCol").jscolor.fromString('#F7931C');
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
