Notes.controller = (function ($, dataContext) {

    var notesListSelector = "#notes-list-content";
    var noNotesCachedMsg = "<div>No notes cached</div>";
    var notesListPageId = "notes-list-page";
    var currentNote = null;


    function init() {

        dataContext.init();
        var d = $(document);
        d.bind("pagechange", onPageChange);
       
    }

    function onPageChange(event, data) {

        var toPageId = data.toPage.attr("id");

        switch (toPageId) {
            case notesListPageId:

                renderNotesList();
                break;
        }
    }
    var renderNotesList = function () {

        var notesList = dataContext.getNotesList();
        var view = $(notesListSelector);

        view.empty();

        if (notesList.length === 0) {

            $(noNotesCachedMsg).appendTo(view);
        } else {

            var liArray = [],
                notesCount = notesList.length,
                note,
                dateGroup,
                noteDate,
                i;

            var ul = $("<ul id=\"notes-list\" data-role=\"listview\"></ul>").appendTo(view);

            for (i = 0; i < notesCount; i += 1) {

                note = notesList[i];

                noteDate = (new Date(note.dateCreated)).toDateString();

                if (dateGroup !== noteDate) {
                    liArray.push("<li data-role=\"list-divider\">" + noteDate + "</li>");
                    dateGroup = noteDate;
                }

                liArray.push("<li>"
                    + "<a data-url=\"index.html#note-editor-page?noteId=" + note.id + "\" href=\"index.html#note-editor-page?noteId=" + note.id + "\">"
                    + "<div  class=\"list-item-title\">" + note.title + "</div>"
                    + "<div class=\"list-item-narrative\">" + note.narrative + "</div>"
                    + "</a>"
                    + "</li>");

            }

            var listItems = liArray.join("");
            $(listItems).appendTo(ul);

            ul.listview();
        }
    };

    return {

        init: init
    }

})(jQuery, Notes.dataContext);