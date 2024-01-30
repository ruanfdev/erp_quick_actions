var nwk_theme;

var linkCustomCSS = document.createElement("style");
linkCustomCSS.innerHTML = '';

var linkCustomJS = document.createElement("script");
linkCustomJS.type = "text/javascript";
linkCustomJS.innerHTML = '';

chrome.runtime.onMessage.addListener(function (message, callback) {
	if (message.action == "dynInject") {
		chrome.storage.sync.get(null, function (result) {
			nwk_theme = result.nwk_theme;
			custom_css_block = result.custom_css_block;
			custom_js_block = result.custom_js_block;

			removeTheme();

			linkCustomCSS.innerHTML = custom_css_block;
			linkCustomJS.innerHTML = custom_js_block;

			if (nwk_theme == 'light') {
				changeLight();
				document.getElementsByTagName("head")[0].appendChild(linkCustomCSS);
				document.getElementsByTagName("head")[0].appendChild(linkCustomJS);
			} else if (nwk_theme == 'dark') {
				changeDark();
				document.getElementsByTagName("head")[0].appendChild(linkCustomCSS);
				document.getElementsByTagName("head")[0].appendChild(linkCustomJS);
			} else {
				removeTheme();
			}

			injectProcess();
		});
	} else {
		chrome.storage.sync.get(null, function (result) {
			// nwk_theme = result.nwk_theme;
			custom_css_block = result.custom_css_block;
			custom_js_block = result.custom_js_block;

			removeTheme();

			linkCustomCSS.innerHTML = custom_css_block;
			linkCustomJS.innerHTML = custom_js_block;
			document.getElementsByTagName("head")[0].appendChild(linkCustomCSS);
			document.getElementsByTagName("head")[0].appendChild(linkCustomJS);
		});
	}
});

var readyStateCheckInterval = setInterval(function () {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		injectProcess();

		// $("html>body>div.page>div.content").append(`
		// 	<div id="innerTab">
		// 		<div id="addInnerTabAdd">
		// 			<i class="fa fa-plus" aria-hidden="true"></i>
		// 		</div>
		// 		<div id="addInnerTab1" class="addInnerTab selected">
		// 			<i class="fa fa-desktop" aria-hidden="true"></i>
		// 		</div>
		// 	</div>
		// `);
		// $("html>body>div.page>div.content>iframe#contentFrame").addClass('selected');

		// var addInnerTab1 = document.getElementById("addInnerTab1");
		// addInnerTab1.onclick = function () {
		// 	$('html>body>div.page>div.content>iframe.selected').removeClass('selected');
		// 	$('html>body>div.page>div.content>#innerTab>div.selected').removeClass('selected');
		// 	$('#addInnerTab1').addClass('selected');
		// 	$('#contentFrame').addClass('selected');
		// }

		// var innerTabNumber = 2;
		// var varaddInnerTabAdd = document.getElementById("addInnerTabAdd");
		// varaddInnerTabAdd.onclick = function () {
		// 	$('html>body>div.page>div.content>iframe.selected').removeClass('selected');
		// 	$('html>body>div.page>div.content>#innerTab>div.selected').removeClass('selected');

		// 	var newDivAdd = document.createElement("div");
		// 	newDivAdd.id = 'addInnerTab' + innerTabNumber;
		// 	newDivAdd.className = 'addInnerTab selected';
		// 	newDivAdd.innerHTML = '<i class="fa fa-desktop" aria-hidden="true"></i>';
		// 	$(newDivAdd).click(function () {
		// 		$('html>body>div.page>div.content>iframe.selected').removeClass('selected');
		// 		$('html>body>div.page>div.content>#innerTab>div.selected').removeClass('selected');
		// 		var newDivAddNr = (this.id).substr(-1);
		// 		$('#addInnerTab' + newDivAddNr).addClass('selected');
		// 		$('#addInnerTabContent' + newDivAddNr).addClass('selected');
		// 	});
		// 	$("html>body>div.page>div.content>#innerTab").append(newDivAdd);

		// 	var newDivDelete = document.createElement("div");
		// 	newDivDelete.id = 'addInnerTabDelete' + innerTabNumber;
		// 	newDivDelete.className = 'addInnerTabDelete selected';
		// 	newDivDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
		// 	$(newDivDelete).click(function () {
		// 		$('html>body>div.page>div.content>iframe.selected').removeClass('selected');
		// 		$('html>body>div.page>div.content>#innerTab>div.selected').removeClass('selected');
		// 		$('#addInnerTab1').addClass('selected');
		// 		$('html>body>div.page>div.content>iframe#contentFrame').addClass('selected');
		// 		var newDivDeleteNr = (this.id).substr(-1);
		// 		$('#addInnerTab' + newDivDeleteNr).remove();
		// 		$('#addInnerTabContent' + newDivDeleteNr).remove();
		// 	});
		// 	$("html>body>div.page>div.content>#innerTab").append(newDivDelete);
		// 	// $("html>body>div.page>div.content>#innerTab>#addInnerTab" + innerTabNumber).append(`

		// 	var newIframe = document.createElement("iframe");
		// 	newIframe.id = 'addInnerTabContent' + innerTabNumber;
		// 	newIframe.className = 'content_obj addInnerTabContent selected';
		// 	newIframe.src = "index.php";
		// 	newIframe.width = "100%";
		// 	newIframe.height = "100%";
		// 	$("html>body>div.page>div.content").append(newIframe);
		// 	// 	<iframe id="addInnerTabContent${innerTabNumber}" ng-src="index.php" class="content_obj addInnerTabContent selected" width="100%" height="100%" seamless="" src="index.php"></iframe>

		// 	innerTabNumber++;
		// };
	}
}, 10);

var windowMouse = window.top.$('#head-button');
windowMouse.mouseover(function () {
	var htmlHasVivaldiHead = $('html').hasClass("vivaldiHead");
	var htmlHasDockHead = $('html').hasClass("dockHead");
	var htmlHasHidHead = $('html').hasClass("hiddenHead");
	if (htmlHasVivaldiHead == true || htmlHasDockHead == true || htmlHasHidHead == true) {
		$(".header").addClass("hovered");
	}
});
windowMouse.mouseout(function () {
	var htmlHasVivaldiHead = $('html').hasClass("vivaldiHead");
	var htmlHasDockHead = $('html').hasClass("dockHead");
	var htmlHasHidHead = $('html').hasClass("hiddenHead");
	if (htmlHasVivaldiHead == true || htmlHasDockHead == true || htmlHasHidHead == true) {
		$(".header").removeClass("hovered");
	}
});

var isShortListSet = document.getElementById("ShortcutsList");
var isShortListSetDiv = null;
if (isShortListSet != null) {
	isShortListSetDiv = document.getElementById("ShortcutsList").getElementsByTagName("div");
}
if (isShortListSetDiv != null) {
	var elemDiv = document.createElement('div');
	elemDiv.setAttribute("id", "filterShortList");
	window.top.document.getElementById("ShortcutsList").prepend(elemDiv);
	var elemDivInput = document.createElement('input');
	elemDivInput.setAttribute("id", "filterShortListInput");
	elemDiv.appendChild(elemDivInput);

	var listShortList = document.querySelector('#ShortcutsList');
	if (listShortList != null) {
		elemDivInput = document.getElementById('filterShortListInput');
		elemDivInput.onkeyup = function () {
			var filter = elemDivInput.value.toUpperCase();
			var lis = document.getElementById("ShortcutsList").getElementsByTagName("li");
			for (var i = 0; i < lis.length; i++) {
				var name = lis[i].getAttribute('data-keyword-detail');
				if (name != null) {
					if (name.toUpperCase().indexOf(filter) > -1) {
						lis[i].style.display = 'list-item';
					} else {
						lis[i].style.display = 'none';
					}
				}
			}
		}
	}

	var windowMouseFilter = window.top.$('#ShortcutsList');
	windowMouseFilter.mouseover(function () {
		if ($("#filterShortListInput").val() == '') {
			$("#filterShortListInput").select();
		}
	});
}

function injectProcess() {
	chrome.storage.sync.get(null, function (result) {
		nwk_theme = result.nwk_theme;
		custom_css_block = result.custom_css_block;
		custom_js_block = result.custom_js_block;
		autofill_user = result.autofill_user;
		autofill_pass = result.autofill_pass;
		injected = result.injected;
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

		if (typeof nwk_theme !== 'undefined') {
			if (typeof injected !== 'undefined') {
				if (injected == true) {
					if (nwk_theme == 'light') {
						changeLight();
					} else if (nwk_theme == 'dark') {
						changeDark();
					} else {
						removeTheme();
					}

					if (typeof custom_css_block !== 'undefined') {
						linkCustomCSS.innerHTML = custom_css_block;
						document.getElementsByTagName("head")[0].appendChild(linkCustomCSS);
					} else {
						chrome.storage.sync.set({
							custom_css_block: ''
						}, function () {
							linkCustomCSS.innerHTML = '';
						});
					}

					if (typeof custom_js_block !== 'undefined') {
						linkCustomJS.innerHTML = custom_js_block;
						document.getElementsByTagName("head")[0].appendChild(linkCustomJS);
					} else {
						chrome.storage.sync.set({
							custom_js_block: ''
						}, function () {
							linkCustomJS.innerHTML = '';
						});
					}

					var useTitle = '';
					var bigTitleTop = window.top.$('html #header_container .welcome').html();
					var subTitleTop = window.top.$('html #header_container .welcome > b').html();

					if (typeof subTitleTop !== 'undefined') {
						if (subTitleTop == '' || subTitleTop == ' ' || subTitleTop == '  ') {
							window.top.$('html #header_container .welcome').css('margin-top', '35px');
							bigTitleTop = bigTitleTop.split('<');
							useTitle = bigTitleTop[0];
						} else {
							window.top.$('html #header_container .welcome').css('margin-top', '25px');
							subTitleTop = subTitleTop.split('</i>');
							subTitleTop = subTitleTop.slice(-1)[0];
							useTitle = subTitleTop;
						}

						if (bigTitleTop[0].replace(/\s/g, '').slice(0, 4) == 'Welk') {
							$("#lang button").removeClass("english");
							$("#lang button").addClass("afrikaans");
						} else {
							$("#lang button").removeClass("afrikaans");
							$("#lang button").addClass("english");
						}

						if (window.location.host == 'php-dev.nwk.co.za') {
							window.top.$('title').replaceWith('<title>DEV - ' + useTitle + '</title>');
						} else if (window.location.host == 'php-prd.nwk.co.za') {
							window.top.$('title').replaceWith('<title>PRD - ' + useTitle + '</title>');
						} else {
							window.top.$('title').replaceWith('<title>QA - ' + useTitle + '</title>');
						}
					}

					window.top.$("head").append('<link rel="icon" type="image/ico" href="/nwk/images/favicon.ico"></link>');

					$("#lang button span").removeClass("fa-retweet");
					$("#lang button span").addClass("fa-language");

					$("#ToggleNavButton").remove();

					if (typeof chkedHeader !== 'undefined') {
						var headerResized = localStorage.getItem("small_header");
						if (headerResized != null) {
							localStorage.removeItem("small_header");
						}
						if (chkedHeader == true) {
							localStorage.setItem("header_hide", 'false');
							smallerHeader();
						}
					} else {
						chrome.storage.sync.set({
							chkedHeader: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedHidhead !== 'undefined') {
						if (chkedHidhead == true) {
							$("html").addClass("hiddenHead");
						} else {
							$("html").removeClass("hiddenHead");
						}
					} else {
						chrome.storage.sync.set({
							chkedHidhead: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedVivaldihead !== 'undefined') {
						if (chkedVivaldihead == true) {
							$("html").addClass("vivaldiHead");
						} else {
							$("html").removeClass("vivaldiHead");
						}
					} else {
						chrome.storage.sync.set({
							chkedVivaldihead: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedDockhead !== 'undefined') {
						if (chkedDockhead == true) {
							$("html").addClass("dockHead");
						} else {
							$("html").removeClass("dockHead");
						}
					} else {
						chrome.storage.sync.set({
							chkedDockhead: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedDockBL !== 'undefined') {
						if (chkedDockBL == true) {
							$("html").addClass("dockBL");
						} else {
							$("html").removeClass("dockBL");
						}
					} else {
						chrome.storage.sync.set({
							chkedDockBL: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedDockHid !== 'undefined') {
						if (chkedDockHid == true) {
							$("html").addClass("dockHid");
						} else {
							$("html").removeClass("dockHid");
						}
					} else {
						chrome.storage.sync.set({
							chkedDockHid: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedDockCol !== 'undefined') {
						if (chkedDockCol == true) {
							$("html").addClass("dockCol");
						} else {
							$("html").removeClass("dockCol");
						}
					} else {
						chrome.storage.sync.set({
							chkedDockCol: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedGlow !== 'undefined') {
						if (chkedGlow == true) {
							if (window.location.host == 'php-dev.nwk.co.za') {
								$("html").addClass("headGlowDEV");
							} else if (window.location.host == 'php-prd.nwk.co.za') {
								$("html").addClass("headGlowPRD");
							} else {
								$("html").addClass("headGlowQA");
							}
						} else {
							$("html").removeClass("headGlowDEV");
							$("html").removeClass("headGlowPRD");
							$("html").removeClass("headGlowQA");
						}
					} else {
						chrome.storage.sync.set({
							chkedGlow: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedRGBhead !== 'undefined') {
						if (chkedRGBhead == true) {
							$('<div class="backHead"></div>').insertAfter('.header');
							$("html").addClass("RGBclass");
						} else {
							$('.backHead').remove();
							$("html").removeClass("RGBclass");
						}
					} else {
						chrome.storage.sync.set({
							chkedRGBhead: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedSearchHome !== 'undefined') {
						if (chkedSearchHome == true) {
							$("html").addClass("searchHome");
						} else {
							$("html").removeClass("searchHome");
						}
					} else {
						chrome.storage.sync.set({
							chkedSearchHome: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedSkandeerAlt !== 'undefined') {
						if (chkedSkandeerAlt == true) {
							$("html").addClass("skandeerAlt");
						} else {
							$("html").removeClass("skandeerAlt");
						}
					} else {
						chrome.storage.sync.set({
							chkedSkandeerAlt: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					var chkedHomeWidgetsVar = 0;
					if (typeof chkedHomeWidgets1 !== 'undefined') {
						if (chkedHomeWidgets1 == true) {
							if ((chkedHomeWidgets1prd && window.top.location.hostname == 'php-prd.nwk.co.za') || (chkedHomeWidgets1dev && window.top.location.hostname == 'php-dev.nwk.co.za') || (chkedHomeWidgets1qa && window.top.location.hostname == 'php-qa.nwk.co.za')) {
								chkedHomeWidgetsVar++;
							}
						} else {
							chkedHomeWidgets1link = '';
						}
					} else {
						chrome.storage.sync.set({
							chkedHomeWidgets1: false,
							chkedHomeWidgets1link: '',
							chkedHomeWidgets1prd: false,
							chkedHomeWidgets1dev: false,
							chkedHomeWidgets1qa: false
							
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}
					if (typeof chkedHomeWidgets2 !== 'undefined') {
						if (chkedHomeWidgets2 == true) {
							if ((chkedHomeWidgets2prd && window.top.location.hostname == 'php-prd.nwk.co.za') || (chkedHomeWidgets2dev && window.top.location.hostname == 'php-dev.nwk.co.za') || (chkedHomeWidgets2qa && window.top.location.hostname == 'php-qa.nwk.co.za')) {
								chkedHomeWidgetsVar++;
							}
						} else {
							chkedHomeWidgets2link = '';
						}
					} else {
						chrome.storage.sync.set({
							chkedHomeWidgets2: false,
							chkedHomeWidgets2link: '',
							chkedHomeWidgets2prd: false,
							chkedHomeWidgets2dev: false,
							chkedHomeWidgets2qa: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}
					if (typeof chkedHomeWidgets3 !== 'undefined') {
						if (chkedHomeWidgets3 == true) {
							if ((chkedHomeWidgets3prd && window.top.location.hostname == 'php-prd.nwk.co.za') || (chkedHomeWidgets3dev && window.top.location.hostname == 'php-dev.nwk.co.za') || (chkedHomeWidgets3qa && window.top.location.hostname == 'php-qa.nwk.co.za')) {
								chkedHomeWidgetsVar++;
							}
						} else {
							chkedHomeWidgets3link = '';
						}
					} else {
						chrome.storage.sync.set({
							chkedHomeWidgets3: false,
							chkedHomeWidgets3link: '',
							chkedHomeWidgets3prd: false,
							chkedHomeWidgets3dev: false,
							chkedHomeWidgets3qa: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}
					if (chkedHomeWidgetsVar > 0) {
						if (window.location !== window.parent.location && $(window.frameElement).hasClass("widgetFrameRender")) {
							$("html").addClass("blockBTN");
						}

						if (chkedHomeWidgetsVar == 3) {
							var cssHeight = '32vh';
						} else if (chkedHomeWidgetsVar == 2) {
							var cssHeight = '49vh';
						} else if (chkedHomeWidgetsVar == 1) {
							var cssHeight = '99vh';
						}

						$("html>body>.widgetNrContainer").remove();
						$("html>body>.main").addClass('widgetsEnabledMain');

						var newWidgetDivContainer = document.createElement("div");
						newWidgetDivContainer.className = 'widgetNrContainer';
						$(newWidgetDivContainer).insertAfter("html>body>.main.widgetsEnabledMain");

						var widgetCounter = 1;

						if (chkedHomeWidgets1 == true) {
							if ((chkedHomeWidgets1prd && window.top.location.hostname == 'php-prd.nwk.co.za') || (chkedHomeWidgets1dev && window.top.location.hostname == 'php-dev.nwk.co.za') || (chkedHomeWidgets1qa && window.top.location.hostname == 'php-qa.nwk.co.za')) {
								var newWidgetDiv = document.createElement("div");
								newWidgetDiv.id = 'widgetNr'+widgetCounter;
								newWidgetDiv.className = 'widgetNr';
								newWidgetDiv.innerHTML = '<iframe class="widgetFrameRender" src=/'+chkedHomeWidgets1link+'></iframe>';
								$("html>body>.widgetNrContainer").append(newWidgetDiv);
								$("html>body>.widgetNrContainer>#widgetNr"+widgetCounter).css('height',cssHeight);
								
								if (widgetCounter < chkedHomeWidgetsVar) {
									$("html>body>.widgetNrContainer>#widgetNr"+widgetCounter).addClass('hasNext');
								}
								if (widgetCounter == chkedHomeWidgetsVar) {
									$("html>body>.widgetNrContainer>#widgetNr"+widgetCounter).removeClass('hasNext');
								}
								widgetCounter++;
							}
						}

						if (chkedHomeWidgets2 == true) {
							if ((chkedHomeWidgets2prd && window.top.location.hostname == 'php-prd.nwk.co.za') || (chkedHomeWidgets2dev && window.top.location.hostname == 'php-dev.nwk.co.za') || (chkedHomeWidgets2qa && window.top.location.hostname == 'php-qa.nwk.co.za')) {
								var newWidgetDiv = document.createElement("div");
								newWidgetDiv.id = 'widgetNr'+widgetCounter;
								newWidgetDiv.className = 'widgetNr';
								newWidgetDiv.innerHTML = '<iframe class="widgetFrameRender" src=/'+chkedHomeWidgets2link+'></iframe>';
								$("html>body>.widgetNrContainer").append(newWidgetDiv);
								$("html>body>.widgetNrContainer>#widgetNr"+widgetCounter).css('height',cssHeight);
								
								if (widgetCounter < chkedHomeWidgetsVar) {
									$("html>body>.widgetNrContainer>#widgetNr"+widgetCounter).addClass('hasNext');
								}
								if (widgetCounter == chkedHomeWidgetsVar) {
									$("html>body>.widgetNrContainer>#widgetNr"+widgetCounter).removeClass('hasNext');
								}
								widgetCounter++;
							}
						}

						if (chkedHomeWidgets3 == true) {
							if ((chkedHomeWidgets3prd && window.top.location.hostname == 'php-prd.nwk.co.za') || (chkedHomeWidgets3dev && window.top.location.hostname == 'php-dev.nwk.co.za') || (chkedHomeWidgets3qa && window.top.location.hostname == 'php-qa.nwk.co.za')) {
								var newWidgetDiv = document.createElement("div");
								newWidgetDiv.id = 'widgetNr'+widgetCounter;
								newWidgetDiv.className = 'widgetNr';
								newWidgetDiv.innerHTML = '<iframe class="widgetFrameRender" src=/'+chkedHomeWidgets3link+'></iframe>';
								$("html>body>.widgetNrContainer").append(newWidgetDiv);
								$("html>body>.widgetNrContainer>#widgetNr"+widgetCounter).css('height',cssHeight);
								
								if (widgetCounter < chkedHomeWidgetsVar) {
									$("html>body>.widgetNrContainer>#widgetNr"+widgetCounter).addClass('hasNext');
								}
								if (widgetCounter == chkedHomeWidgetsVar) {
									$("html>body>.widgetNrContainer>#widgetNr"+widgetCounter).removeClass('hasNext');
								}
								widgetCounter++;
							}
						}
					} else {
						$("html").removeClass("blockBTN");
					}

					if (typeof autofill_user !== 'undefined') {
						if (autofill_user != '' && autofill_pass != '') {
							var prevUrlLen = window.top.document.referrer.length;
							var prevUrl = window.top.document.referrer.substr(prevUrlLen - 14);
							if (window.location.pathname == '/nwk/login.php' && prevUrl == '/nwk/index.php') {
								var allowLogin = false;
								document.addEventListener("keydown", function (event) {
									if (event.key == 'Control') {
										allowLogin = true;
									}
								});
								document.addEventListener("keyup", function (event) {
									if (allowLogin) {
										if (event.key === "Enter") {
											$("#txtGebruiker").val(autofill_user);
											$("#pwdWagwoord").val(autofill_pass);
											$('#btnSubmit').trigger('click');
										}
									}
									allowLogin = false;
								});
							} else if (window.location.pathname == '/nwk/login.php') {
								$("#txtGebruiker").val(autofill_user);
								$("#pwdWagwoord").val(autofill_pass);
								// $('#btnSubmit').trigger('click');
							}

						}
					} else {
						chrome.storage.sync.set({
							autofill_user: '',
							autofill_pass: ''
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedMenus !== 'undefined') {
						if (chkedMenus == true) {
							$("html").addClass("altMenus");
						} else {
							$("html").removeClass("altMenus");
						}
					} else {
						chrome.storage.sync.set({
							chkedMenus: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedMainBlock !== 'undefined') {
						if (chkedMainBlock == true) {
							$("html").addClass("smlBlocks");
						} else {
							$("html").removeClass("smlBlocks");
						}
					} else {
						chrome.storage.sync.set({
							chkedMainBlock: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof smallBlockSlider !== 'undefined') {
						if (chkedMainBlock == true) {
							var smallBlockSliderVar = smallBlockSlider * 1.30769230769;
							$('.BlokNav').css('width', smallBlockSlider);
							$('.BlokNav').css('height', smallBlockSliderVar);
						}
					} else {
						chrome.storage.sync.set({
							smallBlockSlider: '130'
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedNewtab !== 'undefined') {
						if (chkedNewtab == true) {
							$("html").addClass("altNewtab");
						} else {
							$("html").removeClass("altNewtab");
						}
					} else {
						chrome.storage.sync.set({
							chkedNewtab: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedCustomCol !== 'undefined') {
						if (chkedCustomCol == true) {
							$("html").addClass("userCSS");
						} else {
							$("html").removeClass("userCSS");
						}
					} else {
						chrome.storage.sync.set({
							chkedCustomCol: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof custColsArr !== 'undefined') {
						$.each(custColsArr, function (idx, val) {
							custColsArrSplit = val.id.split("CustCol");
							// document.documentElement.style.setProperty('--'+custColsArrSplit[0], '');
							if ($("html").hasClass("userCSS")) {
								document.documentElement.style.setProperty('--' + custColsArrSplit[0], '#' + val.val);
							} else {
								document.documentElement.style.removeProperty('--' + custColsArrSplit[0]);
							}
						});
					} else {
						chrome.storage.sync.set({
							custColsArr: []
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					var timeServer = window.top.$('html #header_container #tyd .date-time').html();
					if (typeof timeServer !== 'undefined') {
						timeServer = timeServer.split(' Datum');
						if (timeServer[0] == 'Geen') {
							window.top.$('html #header_container #tyd .date-time').css('display', 'none');
							window.top.$('html #header_container .werkstasie').css('padding-top', '13px');
						}
					}

					var element007 = document.querySelector('i[title*="srv_upl_007_Z_nvg"]');
					if (element007) {
						element007.parentNode.classList.add('leergids_browse');
					}
				}
			} else {
				chrome.storage.sync.set({
					nwk_theme: 'light',
					injected: false,
					chkedHeader: false,
					chkedGlow: false,
					chkedRGBhead: false,
					chkedNewtab: false,
					chkedCustomCol: false,
					chkedHidhead: false,
					chkedVivaldihead: false,
					chkedDockhead: false,
					chkedDockBL: false,
					chkedDockHid: false,
					chkedDockCol: false,
					chkedSearchHome: false,
					chkedSkandeerAlt: false,
					chkedHomeWidgets1: false,
					chkedHomeWidgets1link: '',
					chkedHomeWidgets1prd: false,
					chkedHomeWidgets1dev: false,
					chkedHomeWidgets1qa: false,
					chkedHomeWidgets2: false,
					chkedHomeWidgets2link: '',
					chkedHomeWidgets2prd: false,
					chkedHomeWidgets2dev: false,
					chkedHomeWidgets2qa: false,
					chkedHomeWidgets3: false,
					chkedHomeWidgets3link: '',
					chkedHomeWidgets3prd: false,
					chkedHomeWidgets3dev: false,
					chkedHomeWidgets3qa: false,
					chkedMenus: false,
					chkedMainBlock: false,
					smallBlockSlider: '130',
					autofill_user: '',
					autofill_pass: ''
				}, function () {
					// document.getElementsByTagName("head")[0].appendChild(linkLight);
				});
			}
		} else {
			chrome.storage.sync.set({
				nwk_theme: 'light',
				injected: false,
				custom_css_block: '',
				custom_js_block: '',
				chkedHeader: false,
				chkedGlow: false,
				chkedRGBhead: false,
				chkedNewtab: false,
				chkedCustomCol: false,
				chkedHidhead: false,
				chkedVivaldihead: false,
				chkedDockhead: false,
				chkedDockBL: false,
				chkedDockHid: false,
				chkedDockCol: false,
				chkedSearchHome: false,
				chkedSkandeerAlt: false,
				chkedHomeWidgets1: false,
				chkedHomeWidgets1link: '',
				chkedHomeWidgets1prd: false,
				chkedHomeWidgets1dev: false,
				chkedHomeWidgets1qa: false,
				chkedHomeWidgets2: false,
				chkedHomeWidgets2link: '',
				chkedHomeWidgets2prd: false,
				chkedHomeWidgets2dev: false,
				chkedHomeWidgets2qa: false,
				chkedHomeWidgets3: false,
				chkedHomeWidgets3link: '',
				chkedHomeWidgets3prd: false,
				chkedHomeWidgets3dev: false,
				chkedHomeWidgets3qa: false,
				chkedMenus: false,
				chkedMainBlock: false,
				smallBlockSlider: '130',
				autofill_user: '',
				autofill_pass: ''
			}, function () {
				// document.getElementsByTagName("head")[0].appendChild(linkLight);
			});
		}
	});
}

function smallerHeader() {
	$("html").addClass("small");
	var subTitleTop = window.top.$('html #header_container .welcome > b').html();

	if (subTitleTop == '' || subTitleTop == ' ' || subTitleTop == '  ') {
		window.top.$('html #header_container .welcome').css('margin-top', '12px');
	} else {
		window.top.$('html #header_container .welcome').css('margin-top', '2px');
	}
}

function removeTheme() {
	var htmlThemeL = $('html').hasClass("light");
	var htmlThemeD = $('html').hasClass("dark");
	if (htmlThemeL == true) {
		$("html").removeClass("light");
	}
	if (htmlThemeD == true) {
		$("html").removeClass("dark");
	}
}

function changeDark() {
	var htmlThemeL = $('html').hasClass("light");
	var htmlThemeD = $('html').hasClass("dark");
	if (htmlThemeD == true) {
		$("html").removeClass("dark");
	}
	if (htmlThemeL == true) {
		$("html").removeClass("light");
	}
	$("html").addClass("light");
	$("html").addClass("dark");
}

function changeLight() {
	var htmlThemeL = $('html').hasClass("light");
	var htmlThemeD = $('html').hasClass("dark");
	if (htmlThemeD == true) {
		$("html").removeClass("dark");
	}
	if (htmlThemeL == true) {
		$("html").removeClass("light");
	}
	$("html").addClass("light");
}

function colorReplace(findHexColor, replaceWith) {
	// Convert rgb color strings to hex
	// REF: https://stackoverflow.com/a/3627747/1938889
	// Original Article: https://stackoverflow.com/questions/30723177/replacing-specific-color-code-in-css-using-jquery
	function rgb2hex(rgb) {
		if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		function hex(x) {
			return ("0" + parseInt(x).toString(16)).slice(-2);
		}
		return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

	// Select and run a map function on every tag
	$('*').map(function (i, el) {
		// Get the computed styles of each tag
		var styles = window.getComputedStyle(el);

		// Go through each computed style and search for "color"
		Object.keys(styles).reduce(function (acc, k) {
			var name = styles[k];
			var value = styles.getPropertyValue(name);
			if (value !== null && name.indexOf("color") >= 0) {
				// Convert the rgb color to hex and compare with the target color
				if (value.indexOf("rgb(") >= 0 && rgb2hex(value) === findHexColor) {
					// Replace the color on this found color attribute
					$(el).css(name, replaceWith);
				}
			}
		});
	});
}