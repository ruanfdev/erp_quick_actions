// var port = chrome.runtime.connect(null, {
//   name: 'mychannel'
// });
// if (port.name) {
//   console.log('port has name: ',port.name);
//   port.postMessage({
//     msg: 'I am contnet script'
//   });
// }
// port.onMessage.addListener(function (msg) {
//   console.log('Got Message', msg);
// });

var nwk_theme;
var headerResized = localStorage.getItem("small_header");

var linkLight = document.createElement("link");
linkLight.type = "text/css";
linkLight.rel = "stylesheet";
linkLight.href = chrome.extension.getURL('src/inject/inject.css');

var linkDark = document.createElement("link");
linkDark.type = "text/css";
linkDark.rel = "stylesheet";
linkDark.href = chrome.extension.getURL('src/inject/inject_dark.css');

var linkCustomCSS = document.createElement("style");
linkCustomCSS.innerHTML = '';

var linkCustomJS = document.createElement("script");
linkCustomJS.type = "text/javascript";
linkCustomJS.innerHTML = '';

function smallerHeader(param) {
	if (param == 'click') {
		if (headerResized == "false") {
			localStorage.setItem("small_header", 'true');
			headerResized = "true";
			$("body").addClass("small");
			$("#ToggleNavButton").html("<i class='fa fa-chevron-down'></i>");
		} else {
			localStorage.setItem("small_header", 'false');
			headerResized = "false";
			$("body").removeClass("small");
			$("#ToggleNavButton").html("<i class='fa fa-chevron-up'></i>");
		}
	} else {
		if (headerResized == "false") {
			localStorage.setItem("small_header", 'false');
			headerResized = "false";
			$("body").removeClass("small");
			$("#ToggleNavButton").html("<i class='fa fa-chevron-up'></i>");
		} else {
			localStorage.setItem("small_header", 'true');
			headerResized = "true";
			$("body").addClass("small");
			$("#ToggleNavButton").html("<i class='fa fa-chevron-down'></i>");
		}
	}
	
	var subTitleTopSize = window.top.$('body').hasClass("small");
	var subTitleTop = window.top.$('body #header_container .welcome > b').html();
	if (subTitleTopSize == true) {
		if (subTitleTop == '' || subTitleTop == ' ' || subTitleTop == '  ') {
			window.top.$('body #header_container .welcome').css('margin-top','12px');
		} else {
			window.top.$('body #header_container .welcome').css('margin-top','2px');
		}
	} else {
		if (subTitleTop == '' || subTitleTop == ' ' || subTitleTop == '  ') {
			window.top.$('body #header_container .welcome').css('margin-top','35px');
		} else {
			window.top.$('body #header_container .welcome').css('margin-top','25px');
		}
	}
}

chrome.runtime.onMessage.addListener(function(message, callback) {
  if (message.action == "dynInject"){
		chrome.storage.sync.get(null, function(result) {
			nwk_theme = result.nwk_theme;
			custom_css_block = result.custom_css_block;
			custom_js_block = result.custom_js_block;
			if (document.getElementsByTagName("head")[0].lastChild == linkCustomJS) {
				document.getElementsByTagName("head")[0].removeChild(linkCustomJS);
			}
			if (document.getElementsByTagName("head")[0].lastChild == linkCustomCSS) {
				document.getElementsByTagName("head")[0].removeChild(linkCustomCSS);
			}
			if (document.getElementsByTagName("head")[0].lastChild == linkDark) {
				document.getElementsByTagName("head")[0].removeChild(linkDark);
			}
			if (document.getElementsByTagName("head")[0].lastChild == linkLight) {
				document.getElementsByTagName("head")[0].removeChild(linkLight);
			}

			linkCustomCSS.innerHTML = custom_css_block;
			linkCustomJS.innerHTML = custom_js_block;
			if (nwk_theme == 'light') {
				document.getElementsByTagName("head")[0].appendChild(linkLight);
				document.getElementsByTagName("head")[0].appendChild(linkCustomCSS);
				document.getElementsByTagName("head")[0].appendChild(linkCustomJS);
			} else if (nwk_theme == 'dark') {
				document.getElementsByTagName("head")[0].appendChild(linkLight);
				document.getElementsByTagName("head")[0].appendChild(linkDark);
				document.getElementsByTagName("head")[0].appendChild(linkCustomCSS);
				document.getElementsByTagName("head")[0].appendChild(linkCustomJS);
			}
		});
  } else {
		chrome.storage.sync.get(null, function(result) {
			nwk_theme = result.nwk_theme;
			custom_css_block = result.custom_css_block;
			custom_js_block = result.custom_js_block;
			if (document.getElementsByTagName("head")[0].lastChild == linkCustomJS) {
				document.getElementsByTagName("head")[0].removeChild(linkCustomJS);
			}
			if (document.getElementsByTagName("head")[0].lastChild == linkCustomCSS) {
				document.getElementsByTagName("head")[0].removeChild(linkCustomCSS);
			}
			if (document.getElementsByTagName("head")[0].lastChild == linkDark) {
				document.getElementsByTagName("head")[0].removeChild(linkDark);
			}
			if (document.getElementsByTagName("head")[0].lastChild == linkLight) {
				document.getElementsByTagName("head")[0].removeChild(linkLight);
			}

			linkCustomCSS.innerHTML = custom_css_block;
			linkCustomJS.innerHTML = custom_js_block;
			document.getElementsByTagName("head")[0].appendChild(linkCustomCSS);
			document.getElementsByTagName("head")[0].appendChild(linkCustomJS);
		});
	}
});

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			// chrome.storage.sync.clear(function() {
			//
	    // });
			// return;

			if (window.location.host =='php-dev.nwk.co.za') {
			  $('title').replaceWith('<title>DEV - NWK ERP</title>');
			} else if (window.location.host =='php-prd.nwk.co.za') {
			  $('title').replaceWith('<title>PRD - NWK ERP</title>');
			} else {
			  $('title').replaceWith('<title>QA - NWK ERP</title>');
			}

			chrome.storage.sync.get(null, function(result) {
		    nwk_theme = result.nwk_theme;
				custom_css_block = result.custom_css_block;
				custom_js_block = result.custom_js_block;
				injected = result.injected;
				chkedHeader = result.chkedHeader;
				chkedGlow = result.chkedGlow;
				chkedRGBhead = result.chkedRGBhead;
				chkedEasyui = result.chkedEasyui;
				chkedMenus = result.chkedMenus;
				chkedAnimate = result.chkedAnimate;
				chkedMainBlock = result.chkedMainBlock;

				if (typeof nwk_theme !== 'undefined') {
					if (typeof injected !== 'undefined') {
						if (injected == true) {
							if (nwk_theme == 'light') {
								document.getElementsByTagName("head")[0].appendChild(linkLight);
							} else if (nwk_theme == 'dark') {
								document.getElementsByTagName("head")[0].appendChild(linkLight);
								document.getElementsByTagName("head")[0].appendChild(linkDark);
							}

							if (typeof custom_css_block !== 'undefined') {
								linkCustomCSS.innerHTML = custom_css_block;
								document.getElementsByTagName("head")[0].appendChild(linkCustomCSS);
							} else {
								chrome.storage.sync.set({custom_css_block:''}, function() {
									linkCustomCSS.innerHTML = '';
								});
							}
			
							if (typeof custom_js_block !== 'undefined') {
								linkCustomJS.innerHTML = custom_js_block;
								document.getElementsByTagName("head")[0].appendChild(linkCustomJS);
							} else {
								chrome.storage.sync.set({custom_js_block:''}, function() {
									linkCustomJS.innerHTML = '';
								});
							}

							var subTitleTop = window.top.$('body #header_container .welcome > b').html();
							if (subTitleTop == '' || subTitleTop == ' ' || subTitleTop == '  ') {
								window.top.$('body #header_container .welcome').css('margin-top','35px');
							} else {
								window.top.$('body #header_container .welcome').css('margin-top','25px');
							}

							if (window.location.host =='php-dev.nwk.co.za') {
								$('title').replaceWith('<title>DEV - NWK ERP</title>');
							} else if (window.location.host =='php-prd.nwk.co.za') {
								$('title').replaceWith('<title>PRD - NWK ERP</title>');
							} else {
								$('title').replaceWith('<title>QA - NWK ERP</title>');
							}

              $("#lang button span").removeClass("fa-retweet");
							$("#lang button span").addClass("fa-language");
							
							if (typeof chkedHeader !== 'undefined') {
								var headerResized = localStorage.getItem("small_header");
								if (chkedHeader == true) {
									if (headerResized == null) {
										localStorage.setItem("small_header", "false");
										headerResized = "false";
									}
									smallerHeader('autostart');
									$("#ToggleNavButton").attr("onclick","smallerHeader('click')");
								} else {
									if (headerResized == null) {
										localStorage.setItem("small_header", 'false');
										headerResized = "false";
									}
								}
							} else {
								chrome.storage.sync.set({chkedHeader:false}, function() {
									// document.getElementsByTagName("head")[0].appendChild(linkLight);
								});
							}

							if (typeof chkedGlow !== 'undefined') {
								if (chkedGlow == true) {
									if (window.location.host =='php-dev.nwk.co.za') {
										$('.header').css('box-shadow','inset 0px 0px 6px 0px #c12e2a');
										$('.header').css('border-color','#c12e2a');
									} else if (window.location.host =='php-prd.nwk.co.za') {
										$('.header').css('box-shadow','inset 0px 0px 6px 0px #71bf44');
										$('.header').css('border-color','#71bf44');
									} else {
										$('.header').css('box-shadow','inset 0px 0px 6px 0px #f7941d');
										$('.header').css('border-color','#f7941d');
									}
								}
							} else {
								chrome.storage.sync.set({chkedGlow:false}, function() {
									// document.getElementsByTagName("head")[0].appendChild(linkLight);
								});
							}

							if (typeof chkedRGBhead !== 'undefined') {
								if (chkedRGBhead == true) {
									$('<div class="backHead"></div>').insertBefore('.header');
								} else {
									$('.backHead').remove();
								}
							} else {
								chrome.storage.sync.set({chkedRGBhead:false}, function() {
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
								chrome.storage.sync.set({chkedEasyui:false}, function() {
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
								chrome.storage.sync.set({chkedMenus:false}, function() {
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
								chrome.storage.sync.set({chkedAnimate:false}, function() {
									// document.getElementsByTagName("head")[0].appendChild(linkLight);
								});
							}
							// console.log('HIER',chkedMainBlock);
							if (typeof chkedMainBlock !== 'undefined') {
								if (chkedMainBlock == true) {
									$("body").addClass("smlBlocks");
								} else {
									$("body").removeClass("smlBlocks");
								}
							} else {
								chrome.storage.sync.set({chkedMainBlock:false}, function() {
									// document.getElementsByTagName("head")[0].appendChild(linkLight);
								});
							}

						}
					} else {
						chrome.storage.sync.set({nwk_theme:'light',injected:false,chkedHeader:false,chkedGlow:false,chkedRGBhead:false,chkedEasyui:false,chkedMenus:false,chkedAnimate:false,chkedMainBlock:false}, function() {
							// document.getElementsByTagName("head")[0].appendChild(linkLight);
			      });
					}
				} else {
					chrome.storage.sync.set({nwk_theme:'light',injected:false,custom_css_block:'',custom_js_block:'',chkedHeader:false,chkedGlow:false,chkedRGBhead:false,chkedEasyui:false,chkedMenus:false,chkedAnimate:false,chkedMainBlock:false}, function() {
						// document.getElementsByTagName("head")[0].appendChild(linkLight);
		      });
				}
		  });

		}
	}, 10);
});
