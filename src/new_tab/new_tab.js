$(document).ready(function() {
    history.pushState(null, null, "/");
    var saveCounter = 0;
    var saveCounterPrev = 0;
    var saveVar;
    var selectedNote;
    var saveArrNotes = [];
    var highNumber = 1;
    var addNote = $(".add_item");
    var saveNotes = $(".save_item");
    var menuItem = $("#editTabs .item");
    var textArea = $("#editText");
    var count = menuItem.length;
    highNumber = count + 1;

    chrome.storage.sync.get(null, function(result) {
        saveArrNotes = result.notes;
        if (typeof saveArrNotes !== 'undefined') {
            for (let i = 0; i < saveArrNotes.length; i++) {
                $("#editTabs").append('<div class="item"><div id="item'+highNumber+'">'+saveArrNotes[i]+'</div><div id="delete'+highNumber+'">X</div></div>');

                $('#delete'+highNumber).click(function(e){
                    $(this).parent().remove();
                    $(textArea).val('');
                    count--;
                });
                $('#item'+highNumber).click(function(e){
                    menuItem = $("#editTabs .item");
                    $(menuItem).each(function(index) {
                        $(this).removeClass('selected');
                    });
                    $(this).parent().addClass('selected');
                    $(textArea).val($(this).html());
                    $(textArea).focus();
                });

                highNumber++;
            }
        }
    });

    let timeout = null;
    textArea.on('keyup', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            selectedNote = $("#editTabs .item.selected>div:first-child");
            $(selectedNote).html($(textArea).val());
        }, 1000);
    });

    $(saveNotes).click(function(e){
        saveArrNotes = [];
        menuItem = $("#editTabs .item");
        $(menuItem).each(function(index) {
            saveArrNotes.push($(this).find(">:first-child").html());
        });
        chrome.storage.sync.set({notes:saveArrNotes}, function() {
            // alert('SAVED');
        });
    });

    $(addNote).click(function(e){
        menuItem = $("#editTabs .item");
        count = menuItem.length;

        $("#editTabs").append('<div class="item"><div id="item'+highNumber+'">'+'</div><div id="delete'+highNumber+'">X</div></div>');

        $('#delete'+highNumber).click(function(e){
            $(this).parent().remove();
            $(textArea).val('');
            count--;
        });
        $('#item'+highNumber).click(function(e){
            menuItem = $("#editTabs .item");
            $(menuItem).each(function(index) {
                $(this).removeClass('selected');
            });
            $(this).parent().addClass('selected');
            $(textArea).val($(this).html());
            $(textArea).focus();
        });

        highNumber++;
        count++;
    });
});