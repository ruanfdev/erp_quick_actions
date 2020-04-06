var nwk_theme;

var linkCustomCSS = document.createElement("style");
linkCustomCSS.innerHTML = '';

var linkCustomJS = document.createElement("script");
linkCustomJS.type = "text/javascript";
linkCustomJS.innerHTML = '';

chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message.action == "dynInject"){
		chrome.storage.sync.get(null, function(result) {
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
		chrome.storage.sync.get(null, function(result) {
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

var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		injectProcess();
	}
}, 10);

var windowMouse = window.top.$('#head-button');
windowMouse.mouseover(function() {
		var htmlHasVivaldiHead = $('html').hasClass("vivaldiHead");
		if (htmlHasVivaldiHead == true) {
			$(".header").addClass("hovered");
		}
});
windowMouse.mouseout(function() {
		var htmlHasVivaldiHead = $('html').hasClass("vivaldiHead");
		if (htmlHasVivaldiHead == true) {
			$(".header").removeClass("hovered");
		}
});

// chrome.extension.sendMessage({}, function(response) {
// 	var readyStateCheckInterval = setInterval(function() {
// 		if (document.readyState === "complete") {
// 			clearInterval(readyStateCheckInterval);
// 			injectProcess();
// 		}
// 	}, 10);
// });

function injectProcess() {
	chrome.storage.sync.get(null, function (result) {
		nwk_theme = result.nwk_theme;
		custom_css_block = result.custom_css_block;
		custom_js_block = result.custom_js_block;
		injected = result.injected;
		custColsArr = result.custColsArr;
		chkedHeader = result.chkedHeader;
		chkedGlow = result.chkedGlow;
		chkedRGBhead = result.chkedRGBhead;
		chkedNyanCursor = result.chkedNyanCursor;
		chkedEasyui = result.chkedEasyui;
		chkedNewtab = result.chkedNewtab;
		chkedForceCol = result.chkedForceCol;
		chkedHidhead = result.chkedHidhead;
		chkedVivaldihead = result.chkedVivaldihead;
		chkedMenus = result.chkedMenus;
		chkedAnimate = result.chkedAnimate;
		chkedMainBlock = result.chkedMainBlock;

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
						
						if (bigTitleTop[0].replace(/\s/g,'').slice(0,4) == 'Welk') {
							$("#lang button").removeClass("english");
							$("#lang button").addClass("afrikaans");
						} else {
							$("#lang button").removeClass("afrikaans");
							$("#lang button").addClass("english");
						}

						if (window.location.host == 'php-dev.nwk.co.za') {
							window.top.$('title').replaceWith('<title>DEV - '+useTitle+'</title>');
						} else if (window.location.host == 'php-prd.nwk.co.za') {
							window.top.$('title').replaceWith('<title>PRD - '+useTitle+'</title>');
						} else {
							window.top.$('title').replaceWith('<title>QA - '+useTitle+'</title>');
						}
					}

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

					if (typeof chkedNyanCursor !== 'undefined') {
						if (chkedNyanCursor == true) {
							$("html").addClass("nyanCursor");
						} else {
							$("html").removeClass("nyanCursor");
						}
					} else {
						chrome.storage.sync.set({
							chkedNyanCursor: false
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

					if (typeof chkedAnimate !== 'undefined') {
						if (chkedAnimate == true) {
							$("html").addClass("animArrange");
						} else {
							$("html").removeClass("animArrange");
						}
					} else {
						chrome.storage.sync.set({
							chkedAnimate: false
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

					if (typeof chkedEasyui !== 'undefined') {
						if (chkedEasyui == true) {
							$("html").addClass("altEasyui");
						} else {
							$("html").removeClass("altEasyui");
						}
					} else {
						chrome.storage.sync.set({
							chkedEasyui: false
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
					
					if (typeof custColsArr !== 'undefined') {
						$.each( custColsArr, function(idx,val) {
							custColsArrSplit = val.id.split("CustCol");
							// document.documentElement.style.setProperty('--'+custColsArrSplit[0], '');
							document.documentElement.style.setProperty('--'+custColsArrSplit[0], val.val);

							if (typeof chkedForceCol !== 'undefined') {
								if (chkedForceCol == true) {
									if (custColsArrSplit[0] == "green") {if (val.val != "#71bf44" && val.val != "#71BF44") {colorReplace('#71bf44', val.val);}}
									if (custColsArrSplit[0] == "orange") {if (val.val != "#f7931c" && val.val != "#F7931C") {colorReplace('#f7931c', val.val);}}
									if (custColsArrSplit[0] == "red") {if (val.val != "#c12e2a" && val.val != "#C12E2A") {colorReplace('#c12e2a', val.val);}}
									if (custColsArrSplit[0] == "blue") {if (val.val != "#2aabd2" && val.val != "#2AABD2") {colorReplace('#2aabd2', val.val);}}
									if (custColsArrSplit[0] == "white") {if (val.val != "#ffffff" && val.val != "#FFFFFF") {colorReplace('#FFFFFF', val.val);}}
									if (custColsArrSplit[0] == "light") {if (val.val != "#f2f2f2" && val.val != "#F2F2F2") {colorReplace('#F2F2F2', val.val);}}
									if (custColsArrSplit[0] == "offWhite") {if (val.val != "#dddddd" && val.val != "#DDDDDD") {colorReplace('#DDDDDD', val.val);}}
									if (custColsArrSplit[0] == "greyDark") {if (val.val != "#666666") {colorReplace('#666666', val.val);}}
									if (custColsArrSplit[0] == "greyLight") {if (val.val != "#c0c0c0" && val.val != "#C0C0C0") {colorReplace('#C0C0C0', val.val);}}
									if (custColsArrSplit[0] == "dark") {if (val.val != "#333333") {colorReplace('#333333', val.val);}}
									if (custColsArrSplit[0] == "darkLight") {if (val.val != "#404040") {colorReplace('#404040', val.val);}}
									if (custColsArrSplit[0] == "darker") {if (val.val != "#303030") {colorReplace('#303030', val.val);}}

									if (custColsArrSplit[0] == "btnSuccessCustCol") {if (val.val != "#71bf44" && val.val != "#71BF44") {colorReplace('#71bf44', val.val);}}
									if (custColsArrSplit[0] == "btnWarningCustCol") {if (val.val != "#f7931c" && val.val != "#F7931C") {colorReplace('#f7931c', val.val);}}
									if (custColsArrSplit[0] == "btnDangerCustCol") {if (val.val != "#c12e2a" && val.val != "#C12E2A") {colorReplace('#c12e2a', val.val);}}
									if (custColsArrSplit[0] == "btnInfoCustCol") {if (val.val != "#2aabd2" && val.val != "#2AABD2") {colorReplace('#2aabd2', val.val);}}
									if (custColsArrSplit[0] == "btnDefaultCustCol") {if (val.val != "#f2f2f2" && val.val != "#F2F2F2") {colorReplace('#F2F2F2', val.val);}}
								}
							} else {
								chrome.storage.sync.set({
									chkedForceCol: false
								}, function () {
									// document.getElementsByTagName("head")[0].appendChild(linkLight);
								});
							}
						});
					} else {
						chrome.storage.sync.set({
							custColsArr: []
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

				}
			} else {
				chrome.storage.sync.set({
					nwk_theme: 'light',
					injected: false,
					chkedHeader: false,
					chkedGlow: false,
					chkedRGBhead: false,
					chkedNyanCursor: false,
					chkedEasyui: false,
					chkedNewtab: false,
					chkedForceCol: false,
					chkedHidhead: false,
					chkedVivaldihead: false,
					chkedMenus: false,
					chkedAnimate: false,
					chkedMainBlock: false
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
				chkedNyanCursor: false,
				chkedEasyui: false,
				chkedNewtab: false,
				chkedForceCol: false,
				chkedHidhead: false,
				chkedVivaldihead: false,
				chkedMenus: false,
				chkedAnimate: false,
				chkedMainBlock: false
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
	$('*').map(function(i, el) {
	  // Get the computed styles of each tag
	  var styles = window.getComputedStyle(el);
  
	  // Go through each computed style and search for "color"
	  Object.keys(styles).reduce(function(acc, k) {
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
