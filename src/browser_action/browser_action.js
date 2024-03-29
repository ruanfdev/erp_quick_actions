$(document).ready(function () {

  var dynInject = false;
  var setDynInject = function (val) {
    dynInject = val;
    if (dynInject) {
      injectNow(true);
    } else {
      injectNow(false);
    }
  };

  var css_textarea = document.getElementById('custom_css_block');
  var js_textarea = document.getElementById('custom_js_block');
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
  var max_fields = 100;
  var wrapper = $(".container1");
  var input = $("input");
  var add_button = $(".add_form_field");
  var clear_button = $(".clear_all");
  var login_btn = $(".login_btn");
  var reset_cols = $(".reset_cust_cols");
  var export_cols = $(".export_cust_cols");
  var import_cols = $(".import_cust_cols");
  var reload_erp_tabs = $(".reload_erp_tabs")
  var reload_ext = $(".reload_ext")
  var save_button = $(".save_form_field");
  var save_custom_settings = $(".save_custom_settings");
  var menu_bars = $("#menu_bars");
  var close_menu = $(".closebtn");
  var checkmark = $(".checkmark");
  var onoffswitch = $(".onoffswitch-label");
  var pass_show = $("#pass_show");
  var pass_hide = $("#pass_hide");
  var smallBlockSliderVar = $('#small_Block_Slider');
  var smallBlockSliderOutput = $('#small_Block_Slider_Size');
  var qActions;
  var rules;
  var custom_css_block;
  var custom_js_block;
  var custColsArr;
  var themeURL;

  var accordion = document.getElementsByClassName("accordion");
  var accIndex;
  for (accIndex = 0; accIndex < accordion.length; accIndex++) {
    accordion[accIndex].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  chrome.storage.sync.get(null, function (result) {
    nwk_theme = result.nwk_theme;
    custom_css_block = result.custom_css_block;
    custom_js_block = result.custom_js_block;
    autofill_user = result.autofill_user;
    autofill_pass = result.autofill_pass;
    injected = result.injected;
    rules = result.rules;
    custColsArr = result.custColsArr;
    chkedHeader = result.chkedHeader;
    chkedGlow = result.chkedGlow;
    chkedRGBhead = result.chkedRGBhead;
    chkedNewtab = result.chkedNewtab;
    chkedCustomCol = result.chkedCustomCol;
    chkedHidhead = result.chkedHidhead;
    chkedVivaldihead = result.chkedVivaldihead;
    chkedDockhead = result.chkedDockhead;
    chkedDockBL = result.chkedDockBL;
    chkedDockHid = result.chkedDockHid;
    chkedDockCol = result.chkedDockCol;
    chkedSearchHome = result.chkedSearchHome;
    chkedSkandeerAlt = result.chkedSkandeerAlt;
    chkedHomeWidgets1 = result.chkedHomeWidgets1;
    chkedHomeWidgets1link = result.chkedHomeWidgets1link;
    chkedHomeWidgets1prd = result.chkedHomeWidgets1prd;
    chkedHomeWidgets1dev = result.chkedHomeWidgets1dev;
    chkedHomeWidgets1qa = result.chkedHomeWidgets1qa;
    chkedHomeWidgets2 = result.chkedHomeWidgets2;
    chkedHomeWidgets2link = result.chkedHomeWidgets2link;
    chkedHomeWidgets2prd = result.chkedHomeWidgets2prd;
    chkedHomeWidgets2dev = result.chkedHomeWidgets2dev;
    chkedHomeWidgets2qa = result.chkedHomeWidgets2qa;
    chkedHomeWidgets3 = result.chkedHomeWidgets3;
    chkedHomeWidgets3link = result.chkedHomeWidgets3link;
    chkedHomeWidgets3prd = result.chkedHomeWidgets3prd;
    chkedHomeWidgets3dev = result.chkedHomeWidgets3dev;
    chkedHomeWidgets3qa = result.chkedHomeWidgets3qa;
    chkedMenus = result.chkedMenus;
    chkedMainBlock = result.chkedMainBlock;
    smallBlockSlider = result.smallBlockSlider;
    themeURL = result.themeURL;

    var i = 0;
    if (rules == undefined || rules[0].keyword == '') {
      rules = [];
    } else {
      var rulesLen = rules.length;
      $.each(rules, function (idx, val) {
        $('[name = "mytext[]"]').eq(idx).val(val.keyword + '::' + val.link);
        if (i < (rulesLen - 1)) {
          $(add_button).trigger('click');
        }
        i++;
      });
    }

    if (custColsArr == undefined || typeof custColsArr[0] == undefined) {
      custColsArr = [];
      defaultColors();
    } else {
      $.each(custColsArr, function (idx, val) {
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
    if (chkedDockhead == true) {
      $('#check_dockHead').prop('checked', true);
    } else {
      $('#check_dockHead').prop('checked', false);
    }
    if (chkedDockBL == true) {
      $('#check_dockBL').prop('checked', true);
    } else {
      $('#check_dockBL').prop('checked', false);
    }
    if (chkedDockHid == true) {
      $('#check_dockHid').prop('checked', true);
    } else {
      $('#check_dockHid').prop('checked', false);
    }
    if (chkedDockCol == true) {
      $('#check_dockCol').prop('checked', true);
    } else {
      $('#check_dockCol').prop('checked', false);
    }
    if (chkedSearchHome == true) {
      $('#check_search_home').prop('checked', true);
    } else {
      $('#check_search_home').prop('checked', false);
    }
    if (chkedSkandeerAlt == true) {
      $('#check_skandeer_alt').prop('checked', true);
    } else {
      $('#check_skandeer_alt').prop('checked', false);
    }
    if (chkedHomeWidgets1 == true) {
      $('#check_home_widgets_1').prop('checked', true);
      $('#widgetProgram1').val(chkedHomeWidgets1link);
      if (chkedHomeWidgets1prd == true) {
        $('#check_home_widgets_1_prd').prop('checked', true);
      } else {
        $('#check_home_widgets_1_prd').prop('checked', false);
      }
      if (chkedHomeWidgets1dev == true) {
        $('#check_home_widgets_1_dev').prop('checked', true);
      } else {
        $('#check_home_widgets_1_dev').prop('checked', false);
      }
      if (chkedHomeWidgets1qa == true) {
        $('#check_home_widgets_1_qa').prop('checked', true);
      } else {
        $('#check_home_widgets_1_qa').prop('checked', false);
      }
    } else {
      $('#check_home_widgets_1').prop('checked', false);
      $('#widgetProgram1').val('');
      $('#check_home_widgets_1_prd').prop('checked', false);
      $('#check_home_widgets_1_dev').prop('checked', false);
      $('#check_home_widgets_1_qa').prop('checked', false);
    }
    if (chkedHomeWidgets2 == true) {
      $('#check_home_widgets_2').prop('checked', true);
      $('#widgetProgram2').val(chkedHomeWidgets2link);
      if (chkedHomeWidgets2prd == true) {
        $('#check_home_widgets_2_prd').prop('checked', true);
      } else {
        $('#check_home_widgets_2_prd').prop('checked', false);
      }
      if (chkedHomeWidgets2dev == true) {
        $('#check_home_widgets_2_dev').prop('checked', true);
      } else {
        $('#check_home_widgets_2_dev').prop('checked', false);
      }
      if (chkedHomeWidgets2qa == true) {
        $('#check_home_widgets_2_qa').prop('checked', true);
      } else {
        $('#check_home_widgets_2_qa').prop('checked', false);
      }
    } else {
      $('#check_home_widgets_2').prop('checked', false);
      $('#widgetProgram2').val('');
      $('#check_home_widgets_2_prd').prop('checked', false);
      $('#check_home_widgets_2_dev').prop('checked', false);
      $('#check_home_widgets_2_qa').prop('checked', false);
    }
    if (chkedHomeWidgets3 == true) {
      $('#check_home_widgets_3').prop('checked', true);
      $('#widgetProgram3').val(chkedHomeWidgets3link);
      if (chkedHomeWidgets3prd == true) {
        $('#check_home_widgets_3_prd').prop('checked', true);
      } else {
        $('#check_home_widgets_3_prd').prop('checked', false);
      }
      if (chkedHomeWidgets3dev == true) {
        $('#check_home_widgets_3_dev').prop('checked', true);
      } else {
        $('#check_home_widgets_3_dev').prop('checked', false);
      }
      if (chkedHomeWidgets3qa == true) {
        $('#check_home_widgets_3_qa').prop('checked', true);
      } else {
        $('#check_home_widgets_3_qa').prop('checked', false);
      }
    } else {
      $('#check_home_widgets_3').prop('checked', false);
      $('#widgetProgram3').val('');
      $('#check_home_widgets_3_prd').prop('checked', false);
      $('#check_home_widgets_3_dev').prop('checked', false);
      $('#check_home_widgets_3_qa').prop('checked', false);
    }
    if (chkedMenus == true) {
      $('#check_menus').prop('checked', true);
    } else {
      $('#check_menus').prop('checked', false);
    }
    if (chkedMainBlock == true) {
      $('#check_main_block').prop('checked', true);
      $('#small_Block_Slider').val(smallBlockSlider);
      $('#small_Block_Slider_Size').html('- ' + smallBlockSlider + 'px');
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
  $(add_button).click(function (e) {
    e.preventDefault();
    if (x < max_fields) {
      x++;
      $('<div><input type="text" name="mytext[]" placeholder="index::nwk/index.php"/><a href="#" class="delete">-</a></div>').insertBefore('.bottom_pad');
    } else {
      alert('Custom Rule limit reached: ' + max_fields + ' fields');
    }
  });

  $(save_custom_settings).click(function (e) {
    bar1.set(0);
    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(onoffswitch).click(function (e) {
    bar1.set(0);
    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(checkmark).click(function (e) {
    bar1.set(0);
    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(login_btn).click(function (e) {
    bar1.set(0);
    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(reset_cols).click(function (e) {
    bar1.set(0);
    $('#check_custom_col').prop('checked', false);
    defaultColors();

    setTimeout(function () {
      $(save_button).trigger('click');
    }, 50);
  });

  $(export_cols).click(function (e) {
    custColsArr = [];
    $('input.jscolor').each(function (index) {
      var input = $(this);
      custColsId = input[0].id;
      custColsVal = input.val();
      custColsText = input[0].style.color;
      custColsArr.push({
        id: custColsId,
        val: custColsVal,
        textCol: custColsText
      });
    });

    var personURL = encodeURI(JSON.stringify(custColsArr));
    themeURL = personURL;
    chrome.storage.sync.set({ themeURL: personURL }, function () {
      bar1.set(100);
      setTimeout(function () {
        prompt("Shareable code can be copied below:", personURL);
      }, 800);
    });
  });

  $(import_cols).click(function (e) {
    var confirmAsk = prompt("Paste import code here:", "");
    if (confirmAsk != null && confirmAsk != "") {
      var tempURL = JSON.parse(decodeURI(confirmAsk));
      $.each(tempURL, function (idx, val) {
        document.getElementById(val.id).jscolor.fromString(val.val);
      });
    } else {
      alert('No import provided!');
    }
  });

  $(reload_erp_tabs).click(function (e) {
    chrome.tabs.query({ url: "http://*.nwk.co.za/*" }, function (tabs) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.reload(tabs[i].id);
      }
    });
  });

  $(reload_ext).click(function (e) {
    chrome.runtime.reload();
  });

  $(clear_button).click(function (e) {
    document.getElementById("ldContain").style.opacity = "1";
    document.getElementById("ldContain").style.zIndex = "5";
    setTimeout(function () {
      var result = confirm("Are you sure you want to clear all extension settings from storage?");
      if (result) {
        bar1.set(0);
        setTimeout(function () {
          chrome.storage.sync.clear(function () {
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

  $(save_button).click(function (e) {
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
    var chkedNewtab = $('#check_newtab').is(":checked");
    var chkedCustomCol = $('#check_custom_col').is(":checked");
    var chkedHidhead = $('#check_hidhead').is(":checked");
    var chkedVivaldihead = $('#check_vivaldiHead').is(":checked");
    var chkedDockhead = $('#check_dockHead').is(":checked");
    var chkedDockBL = $('#check_dockBL').is(":checked");
    var chkedDockHid = $('#check_dockHid').is(":checked");
    var chkedDockCol = $('#check_dockCol').is(":checked");
    var chkedSearchHome = $('#check_search_home').is(":checked");
    var chkedSkandeerAlt = $('#check_skandeer_alt').is(":checked");
    var chkedHomeWidgets1 = $('#check_home_widgets_1').is(":checked");
    var chkedHomeWidgets1link = $('#widgetProgram1').val();
    var chkedHomeWidgets1prd = $('#check_home_widgets_1_prd').is(":checked");
    var chkedHomeWidgets1dev = $('#check_home_widgets_1_dev').is(":checked");
    var chkedHomeWidgets1qa = $('#check_home_widgets_1_qa').is(":checked");
    var chkedHomeWidgets2 = $('#check_home_widgets_2').is(":checked");
    var chkedHomeWidgets2link = $('#widgetProgram2').val();
    var chkedHomeWidgets2prd = $('#check_home_widgets_2_prd').is(":checked");
    var chkedHomeWidgets2dev = $('#check_home_widgets_2_dev').is(":checked");
    var chkedHomeWidgets2qa = $('#check_home_widgets_2_qa').is(":checked");
    var chkedHomeWidgets3 = $('#check_home_widgets_3').is(":checked");
    var chkedHomeWidgets3link = $('#widgetProgram3').val();
    var chkedHomeWidgets3prd = $('#check_home_widgets_3_prd').is(":checked");
    var chkedHomeWidgets3dev = $('#check_home_widgets_3_dev').is(":checked");
    var chkedHomeWidgets3qa = $('#check_home_widgets_3_qa').is(":checked");

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

    if (chkedDockhead) {
      chkedMenus = true;
    }

    if (chkedDockCol) {
      chkedGlow = true;
    }

    if (chkedDockhead) {
      chkedHeader = false;
      $('#check_header').prop('checked', false);
      chkedHidhead = false;
      $('#check_hidhead').prop('checked', false);
      chkedVivaldihead = false;
      $('#check_vivaldiHead').prop('checked', false);
    } else if (chkedVivaldihead) {
      chkedHeader = false;
      $('#check_header').prop('checked', false);
      chkedHidhead = false;
      $('#check_hidhead').prop('checked', false);
      chkedDockhead = false;
      $('#check_dockHead').prop('checked', false);
      chkedDockBL = false;
      $('#check_dockBL').prop('checked', false);
      chkedDockHid = false;
      $('#check_dockHid').prop('checked', false);
    } else if (chkedHidhead) {
      chkedHeader = false;
      $('#check_header').prop('checked', false);
      chkedVivaldihead = false;
      $('#check_vivaldiHead').prop('checked', false);
      chkedDockhead = false;
      $('#check_dockHead').prop('checked', false);
      chkedDockBL = false;
      $('#check_dockBL').prop('checked', false);
      chkedDockHid = false;
      $('#check_dockHid').prop('checked', false);
    } else if (chkedHeader) {
      chkedHidhead = false;
      $('#check_hidhead').prop('checked', false);
      chkedVivaldihead = false;
      $('#check_vivaldiHead').prop('checked', false);
      chkedDockhead = false;
      $('#check_dockHead').prop('checked', false);
      chkedDockBL = false;
      $('#check_dockBL').prop('checked', false);
      chkedDockHid = false;
      $('#check_dockHid').prop('checked', false);
    } else {
      chkedHeader = false;
      $('#check_header').prop('checked', false);
      chkedHidhead = false;
      $('#check_hidhead').prop('checked', false);
      chkedVivaldihead = false;
      $('#check_vivaldiHead').prop('checked', false);
      chkedDockhead = false;
      $('#check_dockHead').prop('checked', false);
      chkedDockBL = false;
      $('#check_dockBL').prop('checked', false);
      chkedDockHid = false;
      $('#check_dockHid').prop('checked', false);
    }

    if (!chkedHomeWidgets1) {
      chkedHomeWidgets1link = '';
      chkedHomeWidgets1prd = false;
      chkedHomeWidgets1dev = false;
      chkedHomeWidgets1qa = false;
    }
    if (!chkedHomeWidgets2) {
      chkedHomeWidgets2link = '';
      chkedHomeWidgets2prd = false;
      chkedHomeWidgets2dev = false;
      chkedHomeWidgets2qa = false;
    }
    if (!chkedHomeWidgets3) {
      chkedHomeWidgets3link = '';
      chkedHomeWidgets3prd = false;
      chkedHomeWidgets3dev = false;
      chkedHomeWidgets3qa = false;
    }

    rules = [];
    $('input[name = "mytext[]"]').each(function (index) {
      var input = $(this);
      qActions = input.val();
      qActions = qActions.split("::");
      rules.push({
        keyword: qActions[0],
        link: qActions[1]
      });
    });

    custColsArr = [];
    $('input.jscolor').each(function (index) {
      var input = $(this);
      custColsId = input[0].id;
      custColsVal = input.val();
      custColsText = input[0].style.color;
      custColsArr.push({
        id: custColsId,
        val: custColsVal,
        textCol: custColsText
      });
    });

    chrome.storage.sync.clear(function () {
      chrome.storage.sync.set({
        rules: rules,
        custColsArr: custColsArr,
        nwk_theme: nwk_theme,
        injected: injected,
        custom_css_block: custom_css_block,
        custom_js_block: custom_js_block,
        chkedHeader: chkedHeader,
        chkedGlow: chkedGlow,
        chkedRGBhead: chkedRGBhead,
        chkedNewtab: chkedNewtab,
        chkedCustomCol: chkedCustomCol,
        chkedHidhead: chkedHidhead,
        chkedVivaldihead: chkedVivaldihead,
        chkedDockhead: chkedDockhead,
        chkedDockBL: chkedDockBL,
        chkedDockHid: chkedDockHid,
        chkedDockCol: chkedDockCol,
        chkedSearchHome: chkedSearchHome,
        chkedSkandeerAlt: chkedSkandeerAlt,
        chkedHomeWidgets1: chkedHomeWidgets1,
        chkedHomeWidgets1link: chkedHomeWidgets1link,
        chkedHomeWidgets1prd: chkedHomeWidgets1prd,
        chkedHomeWidgets1dev: chkedHomeWidgets1dev,
        chkedHomeWidgets1qa: chkedHomeWidgets1qa,
        chkedHomeWidgets2: chkedHomeWidgets2,
        chkedHomeWidgets2link: chkedHomeWidgets2link,
        chkedHomeWidgets2prd: chkedHomeWidgets2prd,
        chkedHomeWidgets2dev: chkedHomeWidgets2dev,
        chkedHomeWidgets2qa: chkedHomeWidgets2qa,
        chkedHomeWidgets3: chkedHomeWidgets3,
        chkedHomeWidgets3link: chkedHomeWidgets3link,
        chkedHomeWidgets3prd: chkedHomeWidgets3prd,
        chkedHomeWidgets3dev: chkedHomeWidgets3dev,
        chkedHomeWidgets3qa: chkedHomeWidgets3qa,
        chkedMenus: chkedMenus,
        chkedMainBlock: chkedMainBlock,
        smallBlockSlider: smallBlockSlider,
        autofill_user: autofill_user,
        autofill_pass: autofill_pass
      }, function () {
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

  $(wrapper).on("click", ".delete", function (e) {
    e.preventDefault();
    $(this).parent('div').remove();
    x--;
  });

  $('#small_Block_Slider').on('change', function () {
    $('#small_Block_Slider_Size').html('- ' + $('#small_Block_Slider').val() + 'px');
  });

  $(pass_show).click(function (e) {
    document.getElementById("pass_show").style.display = "none";
    document.getElementById("pass_hide").style.display = "block";
    $('#autofill_pass').attr('type', 'text');
  });

  $(pass_hide).click(function (e) {
    document.getElementById("pass_hide").style.display = "none";
    document.getElementById("pass_show").style.display = "block";
    $('#autofill_pass').attr('type', 'password');
  });

  $(menu_bars).click(function (e) {
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

  $(close_menu).click(function (e) {
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

  // var latest_version_DB = firebase.database().ref().once('value').then(function(snapshot){
  //   chrome.management.getSelf(function(extData) {
  //     if (current_version < latest_version) {
  //       $('#tooltipChange').css('color','#c12e2a');
  //       $('#tooltipChange .tooltiptextChange').css('background-color','#c12e2a');
  //       createNotif();
  //     } else {
  //       $('#tooltipChange').css('color','#71bf44');
  //       $('#tooltipChange .tooltiptextChange').css('background-color','#71bf44');
  //     }
  //     $('#tooltipChange').css('display', 'inline-block');
  //   });
  //
  // });
  $('#tooltipChange').css('display', 'inline-block');
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
  chrome.tabs.query({ url: "http://*.nwk.co.za/*" }, function (tabs) {
    if (param == true) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, { action: "dynInject" }, function (response) {
        });
      }
    } else {
      for (var j = 0; j < tabs.length; j++) {
        chrome.tabs.sendMessage(tabs[j].id, { action: "dynInjectCustom" }, function (response) {
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
