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

					var subTitleTop = window.top.$('body #header_container .welcome > b').html();
					if (subTitleTop == '' || subTitleTop == ' ' || subTitleTop == '  ') {
						window.top.$('body #header_container .welcome').css('margin-top', '35px');
					} else {
						window.top.$('body #header_container .welcome').css('margin-top', '25px');
					}

					if (window.location.host == 'php-dev.nwk.co.za') {
						$('title').replaceWith('<title>DEV - NWK ERP</title>');
					} else if (window.location.host == 'php-prd.nwk.co.za') {
						$('title').replaceWith('<title>PRD - NWK ERP</title>');
					} else {
						$('title').replaceWith('<title>QA - NWK ERP</title>');
					}

					$("#lang button span").removeClass("fa-retweet");
					$("#lang button span").addClass("fa-language");

					if (typeof chkedHeader !== 'undefined') {
						var headerResized = localStorage.getItem("small_header");
						if (headerResized != null) {
							localStorage.removeItem("small_header");
						}
						if (chkedHeader == true) {
							localStorage.setItem("header_hide", 'false');
							smallerHeader();
							$("#ToggleNavButton").remove();
						}
					} else {
						chrome.storage.sync.set({
							chkedHeader: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedGlow !== 'undefined') {
						if (chkedGlow == true) {
							if (window.location.host == 'php-dev.nwk.co.za') {
								$("body").addClass("headGlowDEV");
							} else if (window.location.host == 'php-prd.nwk.co.za') {
								$("body").addClass("headGlowPRD");
							} else {
								$("body").addClass("headGlowQA");
							}
						} else {
							$("body").removeClass("headGlowDEV");
							$("body").removeClass("headGlowPRD");
							$("body").removeClass("headGlowQA");
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
							$("body").addClass("RGBclass");
						} else {
							$('.backHead').remove();
							$("body").removeClass("RGBclass");
						}
					} else {
						chrome.storage.sync.set({
							chkedRGBhead: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedEasyui !== 'undefined') {
						if (chkedEasyui == true) {
							$("body").addClass("altEasyui");
						} else {
							$("body").removeClass("altEasyui");
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
							$("body").addClass("altNewtab");
						} else {
							$("body").removeClass("altNewtab");
						}
					} else {
						chrome.storage.sync.set({
							chkedNewtab: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedHidhead !== 'undefined') {
						if (chkedHidhead == true) {
							$("body").addClass("hiddenHead");
							$("#ToggleNavButton").remove();
						} else {
							$("body").removeClass("hiddenHead");
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
							$("body").addClass("vivaldiHead");
							$("#ToggleNavButton").remove();
						} else {
							$("body").removeClass("vivaldiHead");
						}
					} else {
						chrome.storage.sync.set({
							chkedVivaldihead: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}

					if (typeof chkedMenus !== 'undefined') {
						if (chkedMenus == true) {
							$("body").addClass("altMenus");
						} else {
							$("body").removeClass("altMenus");
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
							$("body").addClass("animArrange");
						} else {
							$("body").removeClass("animArrange");
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
							$("body").addClass("smlBlocks");
						} else {
							$("body").removeClass("smlBlocks");
						}
					} else {
						chrome.storage.sync.set({
							chkedMainBlock: false
						}, function () {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
						});
					}
					
					if (typeof custColsArr !== 'undefined') {
						$.each( custColsArr, function(idx,val) {
							custColsArrSplit = val.id.split("CustCol");
							document.documentElement.style.setProperty('--'+custColsArrSplit[0], '');
							if (val.val != '#FFFFFF') {
								document.documentElement.style.setProperty('--'+custColsArrSplit[0], val.val);

								if (typeof chkedForceCol !== 'undefined') {
									if (chkedForceCol == true) {
										// colorReplace("#789034", val.val);
										// colorReplace("var(--"++custColsArrSplit[0]+")", val.val);
									}
								} else {
									chrome.storage.sync.set({
										chkedForceCol: false
									}, function () {
										// document.getElementsByTagName("head")[0].appendChild(linkLight);
									});
								}
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
	$("body").addClass("small");
	var subTitleTop = window.top.$('body #header_container .welcome > b').html();
	
	if (subTitleTop == '' || subTitleTop == ' ' || subTitleTop == '  ') {
		window.top.$('body #header_container .welcome').css('margin-top', '12px');
	} else {
		window.top.$('body #header_container .welcome').css('margin-top', '2px');
	}
}

function removeTheme() {
	var bodyThemeL = $('body').hasClass("light");
	var bodyThemeD = $('body').hasClass("dark");
	if (bodyThemeL == true) {
		$("body").removeClass("light");
	}
	if (bodyThemeD == true) {
		$("body").removeClass("dark");
	}
}

function changeDark() {
	var bodyThemeL = $('body').hasClass("light");
	var bodyThemeD = $('body').hasClass("dark");
	if (bodyThemeD == true) {
		$("body").removeClass("dark");
	}
	if (bodyThemeL == true) {
		$("body").removeClass("light");
	}
	$("body").addClass("light");
	$("body").addClass("dark");
}

function changeLight() {
	var bodyThemeL = $('body').hasClass("light");
	var bodyThemeD = $('body').hasClass("dark");
	if (bodyThemeD == true) {
		$("body").removeClass("dark");
	}
	if (bodyThemeL == true) {
		$("body").removeClass("light");
	}
	$("body").addClass("light");
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