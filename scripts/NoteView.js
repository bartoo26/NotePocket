class NoteView {
    show(note) {
        console.log('VIEW show start note: ' + note.toStringOnlyId());
        var content = note.content;
        $('#notes').append(
                '<article id="' + note.id + '" class="note">'
                + '<div class="note-content">'
                + '<div class="note-nav">'
                + '<button type="button" class="up-button" id="up-button-' + note.id + '">UP</button>'
                + '<button type="button" class="down-button" id="down-button-' + note.id + '">DOWN</button>'
                + '<button type="button" class="edit-button" id="edit-button-' + note.id + '">Edit</button>'
                + '<button type="button" class="remove-button" id="remove-button-' + note.id + '">Remove</button>'
                + '</div>'
                + '<header class="note-header">'
                + '<h2 class="note-header-title" id="note-header-title-value-' + note.id + '">' + note.title + '</h2>'
                + '<p class="note-header-id"><span class="note-header-id-label">Note id: </span>'
                + '<span class="note-header-id-value">' + note.id + '</span></p>'
                + '<p class="note-header-author"><span class="note-header-author-label">Author: </span>'
                + '<span class="note-header-author-value">' + note.author + '</span></p>'
                + '<p class="note-header-date"><span class="note-header-date-label">Post date: </span>'
                + '<span class="note-header-date-value">' + note.date.toLocaleString() + '</span></p>'
                + '</header>'
                + '<section class="note-text" id="note-content-' + note.id + '">' + content + '</section>'
                + '</div>'
                + '</article>');
        console.log('VIEW show finish note: ' + note.toStringOnlyId());
    }

    toEdit(note) {
        console.log('VIEW toEdit start note: ' + note.toStringOnlyId());
        $('#' + note.id).append(
                '<div id="edit-' + note.id + '"  class="edit-form-container" style="display:none"><form id="form-edit-' + note.id + '"><p><label for="edit-subject-' + note.id + '" class="edit-subject-label">Subject: </label>'
                + '<input type="text" id="edit-subject-input-' + note.id + '" class="edit-subject-input" value="' + note.title + '"></p>'
                + '<label for="edit-content-' + note.id + '">Content: </label>'
                + '<p><textarea id="edit-content-input-' + note.id + '" class="edit-content-input">' + note.content + '</textarea></p>'
                + '<p><button type="button" id="edit-save-button-' + note.id + '" class="edit-save-button">Save</button><button type="button" id="edit-cancel-button-' + note.id + '" class="edit-cancel-button">Cancel</button></p>'
                + '</form></div>');
        console.log('VIEW toEdit finish note: ' + note.toStringOnlyId());
    }

    update(note) {    
        $('#note-header-title-value-' + note.id).text(note.title);
        $('#note-content-' + note.id).text(note.content);
    }

    remove(note) {
        console.log('VIEW REMOVING start note: ' + note.toStringOnlyId());
        $('#' + note.id).remove();
        console.log('VIEW REMOVING finish note: ' + note.toStringOnlyId());
    }
}