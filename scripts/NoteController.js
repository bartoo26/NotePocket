$(document).ready(function () {

    var noteService = new NoteService();
    var noteView = new NoteView();

    readAllNotes();

    $('#save-button').click(function () {
        console.log('CLICKED [SAVE] button.');
        $('#error-message').remove();
        if (!validate('#add-note-form')) {
            var note = noteService.createNote($('#author').val(), $('#subject').val(), $('#content').val());
            showNote(note);
            cleanInputs();
        } else {
            $('#note-form-save-button-container').append('<span class="error-message" id="error-message">All inputs have to have value.</span>');
            console.log('validete-error');
        }
    });

    function validate(formId) {
        var error = false;

        $(formId + ' input[type=text],' + formId + ' textarea').each(function () {
            var input = $(this);
            input.removeClass('error-input');

            if (input.val().trim() === '')
            {
                error = true;
                input.addClass('error-input');
            }
        });

        return error;
    }

    function cleanInputs() {
        $('#author').val('');
        $('#subject').val('');
        $('#content').val('');
    }

    function readAllNotes()
    {
        var notes = noteService.getAllNotesInOrder();
        for (var i = 0; i < notes.length; i++) {
            console.log(notes[i]);
            showNote(notes[i]);
        }
        console.log(notes);
    }

    function showNote(note) {
        noteView.show(note);

        registerUpButtonOf(note);
        registerDownButtonOf(note);
        registerEditButtonOf(note);
        registerRemoveButtonOf(note);
    }

    function registerUpButtonOf(note) {
        console.log("REGISTER [UP] button of note: Note{id=" + note.id + '}');
        $(document).on('click', "#up-button-" + note.id, function () {
            console.log('START Clicked button [UP] of Note{id=' + noteId + '}');
            var element = $('#' + note.id);
            var noteId = note.id;
            var prevId = $('#' + note.id).prev().attr('id');
            if (typeof prevId !== 'undefined') {
                console.log('GO UP Note {id=' + noteId + '}');
                console.log('INVOKE moveUp(noteId={' + noteId + '}, prevId={' + prevId + '})');
                noteService.moveUp(noteId, prevId);
                console.log('TURN UP above note: ' + prevId);
                element.insertBefore(element.prev());
            }

            console.log('END Clicked button [UP] of Note{id=' + noteId + '}');
        });
    }



    function registerDownButtonOf(note) {
        console.log("REGISTER [DOWN] button of note: Note{id=" + note.id + '}');
        $(document).on('click', "#down-button-" + note.id, function () {
            var element = $('#' + note.id);
            var noteId = element.attr('id');
            console.log('START Clicked button [DOWN] of ' + note.toStringOnlyId());
            var nextId = $('#' + note.id).next().attr('id');
            if (typeof nextId !== 'undefined') {

                console.log('GO DOWN Note {id=' + noteId + '}');
                console.log('INVOKE moveDown(noteId={' + noteId + '}, nextId={' + nextId + '})');
                noteService.moveDown(noteId, nextId);
                console.log('TURN DOWN BELOW note: ' + nextId);
                element.insertAfter(element.next());
                console.log('END Clicked button [DOWN] of ' + note.toStringOnlyId());
            }
        });
    }

    function registerEditButtonOf(note)
    {
        console.log("REGISTER [EDIT] button of note: Note{id=" + note.id + '}');
        noteView.toEdit(note);
        $(document).on('click', '#edit-button-' + note.id, function () {
            console.log('CLICK [EDIT] for note: Note{id=' + note.id + '}');
            $('#edit-button-' + note.id).attr('disabled', 'disabled');
            prepareEditForm(note);
        });
        $(document).on('click', '#edit-save-button-' + note.id, function () {
            saveEditOf(note);
        });
        $(document).on('click', '#edit-cancel-button-' + note.id, function () {
            cancelEditOf(note);
        });
    }

    function prepareEditForm(note) {
        note = noteService.getNoteById(note.id);
        $('#edit-subject-input-' + note.id).val(note.title);
        $('#edit-content-input-' + note.id).val(note.content);
        $('#edit-' + note.id).toggle();
    }

    function switchOffEditFormOf(note) {
        $('#edit-' + note.id).toggle();
        $('#edit-button-' + note.id).removeAttr('disabled');
    }

    function cancelEditOf(note) {
        switchOffEditFormOf(note);
    }

    function registerRemoveButtonOf(note) {
        console.log("REGISTER [REMOVE] button of note: Note{id=" + note.id + '}');
        $(document).on('click', "#remove-button-" + note.id, function () {
            console.log('CLICK [REMOVE] note: ' + note.toStringOnlyId());
            noteService.remove(note);
            noteView.remove(note);
        });
    }

    function saveEditOf(note) {
        $('#error-edit-message' + note.id).remove();
        if (!validate('#form-edit-' + note.id))
        {
            note = noteService.getNoteById(note.id);
            note.title = $('#edit-subject-input-' + note.id).val();
            note.content = $('#edit-content-input-' + note.id).val();
            noteService.update(note);
            noteView.update(note);
            switchOffEditFormOf(note);
            return true;
        } else
        {
            console.log('[EDIT] validate error');
            $('#form-edit-' + note.id).append('<span class="error-message" id="error-edit-message' + note.id + '">All inputs have to have value.</span>');
            return false;
        }
    }

    $('#add-note-button').click(function (e) {
        $('#add-note-form').fadeToggle('fast', 'linear');
        var addButtonText = e.target.innerHTML;
        console.log('CLICK [' + addButtonText + '] button');
        if (addButtonText === "Add new Note") {
            e.target.innerHTML = 'Hide';
        } else {
            e.target.innerHTML = 'Add new Note';
        }
    });
});
