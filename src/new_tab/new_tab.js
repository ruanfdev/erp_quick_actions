$(document).ready(function () {

    chrome.storage.sync.get(null, function (result) {
        chkedCustomCol = result.chkedCustomCol;
        custColsArr = result.custColsArr;

        if (typeof chkedCustomCol !== 'undefined') {
            if (chkedCustomCol == true) {
                $("html").addClass("userCSS");
            } else {
                $("html").removeClass("userCSS");
            }
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
        }
    });

    // history.pushState(null, null, "/");
    var selectedNote;
    var saveArrNotes = [];
    var highNumber = 1;
    var addNote = $(".add_item");
    var saveNotes = $(".save_item");
    var downloadNotes = $(".download_item");
    var menuItem = $("#editTabs .item");
    var textArea = $("#editText");
    var notifBubble = $("#notification");
    var count = menuItem.length;
    highNumber = count + 1;

    setTimeout(() => {
        $("#notification").fadeOut("slow");
        setTimeout(() => {
            $("#notification").css('top', '10px');
        }, 2000);
    }, 10);

    var saveArrNotes = JSON.parse(localStorage.getItem('notes'));
    if (typeof saveArrNotes !== 'undefined' && saveArrNotes !== null) {
        if (saveArrNotes.length !== 0) {
            for (let i = 0; i < saveArrNotes.length; i++) {

                $("#editTabs").append(`<div class="item"><div id="item${highNumber}">${saveArrNotes[i]}</div><div id="delete${highNumber}">X</div></div>`);

                $('#delete' + highNumber).click(function (e) {
                    $(this).parent().remove();
                    $(textArea).val('');
                    count--;
                    writeLocalStorage();
                    showNotif('Note deleted succesfully');
                });
                $('#item' + highNumber).click(function (e) {
                    menuItem = $("#editTabs .item");
                    $(menuItem).each(function (index) {
                        $(this).removeClass('selected');
                    });
                    $(this).parent().addClass('selected');
                    $(textArea).val($(this).html());
                    $(textArea).focus();
                });

                highNumber++;
            }
            // $('#item1').trigger('click');
        } else {
            $(addNote).trigger('click');
        }
    } else {
        $(addNote).trigger('click');
    }

    let timeout = null;
    textArea.on('keyup', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            selectedNote = $("#editTabs .item.selected>div:first-child");
            $(selectedNote).html($(textArea).val());
            writeLocalStorage();
        }, 100);
    });

    function showNotif(msg) {
        $("#notification").fadeIn("slow").html(msg);
        setTimeout(() => {
            $("#notification").fadeOut("slow");
        }, 3000);
    }

    function writeLocalStorage() {
        saveArrNotes = [];
        menuItem = $("#editTabs .item");
        $(menuItem).each(function (index) {
            saveArrNotes.push($(this).find(">:first-child").html());
        });
        localStorage.setItem('notes', JSON.stringify(saveArrNotes));
    }

    $(notifBubble).click(function (e) {
        $("#notification").fadeOut("slow");
    });

    $(saveNotes).click(function (e) {
        saveArrNotes = [];
        menuItem = $("#editTabs .item");
        $(menuItem).each(function (index) {
            saveArrNotes.push($(this).find(">:first-child").html());
        });
        chrome.storage.sync.set({ notes: saveArrNotes }, function () {
            showNotif('Notes synced succesfully');
        });
    });

    $(downloadNotes).click(function (e) {
        if (confirm("Download & Overwrite from Cloud Storage?")) {
            chrome.storage.sync.get(null, function (result) {
                saveArrNotes = result.notes;
                if (typeof saveArrNotes !== 'undefined') {
                    if (saveArrNotes.length !== 0) {
                        menuItem = $("#editTabs .item");
                        $(menuItem).each(function (index) {
                            $(this).remove();
                        });
                        for (let i = 0; i < saveArrNotes.length; i++) {

                            $("#editTabs").append(`<div class="item"><div id="item${highNumber}">${saveArrNotes[i]}</div><div id="delete${highNumber}">X</div></div>`);

                            $('#delete' + highNumber).click(function (e) {
                                $(this).parent().remove();
                                $(textArea).val('');
                                count--;
                                writeLocalStorage();
                                showNotif('Note deleted succesfully');
                            });
                            $('#item' + highNumber).click(function (e) {
                                menuItem = $("#editTabs .item");
                                $(menuItem).each(function (index) {
                                    $(this).removeClass('selected');
                                });
                                $(this).parent().addClass('selected');
                                $(textArea).val($(this).html());
                                $(textArea).focus();
                            });

                            highNumber++;
                        }
                        writeLocalStorage();
                        // $('#item1').trigger('click');
                    } else {
                        $(addNote).trigger('click');
                    }
                } else {
                    $(addNote).trigger('click');
                }
                showNotif('Notes synced succesfully');
            });
        }
    });

    $(addNote).click(function (e) {
        menuItem = $("#editTabs .item");
        count = menuItem.length;

        $("#editTabs").append(`<div class="item selected"><div id="item${highNumber}"></div><div id="delete${highNumber}">X</div></div>`);

        $('#delete' + highNumber).click(function (e) {
            $(this).parent().remove();
            $(textArea).val('');
            count--;
            writeLocalStorage();
            showNotif('Note deleted succesfully');
        });
        $('#item' + highNumber).click(function (e) {
            menuItem = $("#editTabs .item");
            $(menuItem).each(function (index) {
                $(this).removeClass('selected');
            });
            $(this).parent().addClass('selected');
            $(textArea).val($(this).html());
            $(textArea).focus();
        });

        $('#item' + highNumber).trigger('click');

        highNumber++;
        count++;
    });
});