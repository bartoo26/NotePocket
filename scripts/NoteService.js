class NoteService {

    constructor() {
        this.notesOrder = this.getNotesOrder();
        if (this.notesOrder === null) {
            this.notesOrder = new Array();
            localStorage.setItem('notesOrder', JSON.stringify(this.notesOrder));
        }
    }

    createNote(author, title, content) {
        var lastId = 0;
        if (localStorage.getItem("lastId") === null) {
            localStorage.setItem("lastId", lastId);
            console.log("Created lastId");
        } else {
            lastId = localStorage.getItem('lastId');
            localStorage.setItem('lastId', ++lastId);
            console.log("LastId exists new lastId:" + localStorage.getItem('lastId'));
        }
        var noteId = 'note-' + (++lastId);
        console.log("Generated id for new note: " + noteId);

        var order = this.notesOrder.length;

        var note = new Note(noteId, author, content, title, order, new Date());
        localStorage.setItem(note.id, JSON.stringify(note));
        console.log('CREATED ' + note.toString());

        this.notesOrder.push(note.id);
        console.log('ADDing note: ' + note.toStringOnlyId() + ' to end of order');
        this.updateOrder();
        return note;
    }

    updateOrder() {
        console.log('UPDATE before update elements: {' + this.notesOrder.length + '}');
        localStorage.setItem('notesOrder', JSON.stringify(this.notesOrder));
        console.log('UPDATE after update elements: {' + this.notesOrder.length + '}');
    }

    moveDown(noteId, nextId) {
        var note = this.getNoteById(noteId);
        console.log('START MOVE DOWN note: ' + note.toStringOnlyId());
        this.notesOrder = this.getNotesOrder();
        console.log('Order before moving down: ' + this.notesOrder);

        var nextNote = this.getNoteById(nextId);
        console.log('MOVE DOWN ' + note.toStringOnlyIdAndOrder() + '  nextNote: ' + nextNote.toStringOnlyIdAndOrder());
        this.notesOrder[nextNote.order] = note.id;
        this.notesOrder[note.order] = nextNote.id;

        var newOrder = nextNote.order;
        nextNote.order = note.order;
        note.order = newOrder;
        this.update(note);
        this.update(nextNote);
        this.updateOrder();

        console.log('Order after moving down: ' + this.notesOrder);
        console.log('END MOVE DOWN note order: ' + note.toStringOnlyIdAndOrder() + ' nextNote order now: ' + nextNote.toStringOnlyIdAndOrder());
    }

    moveUp(noteId, prevId) {
        var note = this.getNoteById(noteId);
        console.log('START MOVE UP note: ' + note.toStringOnlyId());
        this.notesOrder = this.getNotesOrder();
        console.log('Order before moving UP: ' + this.notesOrder);

        var prevNote = this.getNoteById(prevId);
        console.log('MOVE UP ' + note.toStringOnlyIdAndOrder() + '  prevNote: ' + prevNote.toStringOnlyIdAndOrder());
        this.notesOrder[prevNote.order] = note.id;
        this.notesOrder[note.order] = prevNote.id;

        var newOrder = prevNote.order;
        prevNote.order = note.order;
        note.order = newOrder;
        this.update(note);
        this.update(prevNote);
        this.updateOrder();

        console.log('Order after moving up: ' + this.notesOrder);
        console.log('END MOVE UP note order: ' + note.toStringOnlyIdAndOrder() + ' prevNote order now: ' + prevNote.toStringOnlyIdAndOrder());
    }

    getAllNotes() {
        var notes = new Array();
        var exp = "^note-\\d+";
        var keyRegExp = new RegExp(exp);
        console.log('CREATED regexp for checking item key: RegExp{exp=' + exp + '}');
        console.log('START searching localStorage for note');

        for (var i = 0; i < localStorage.length; i++) {
            var itemKey = localStorage.key(i);
            console.log('CHECKING key: ' + i + ' value:{' + itemKey + '}; regexp.test():{' + keyRegExp.test(itemKey) + '}');
            if (keyRegExp.test(itemKey)) {
                var note = this.getNoteById(itemKey);
                notes.push(note);
                console.log('SEARCHING found note: ' + note.id);

            }
        }
        console.log('FINISH searching localStorege for note. Founded:' + notes.length);
        return notes;
    }

    getAllNotesInOrder() {
        this.notesOrder = this.getNotesOrder();
        var notes = new Array();
        for (var i = 0; i < this.notesOrder.length; i++) {
            notes.push(this.getNoteById(this.notesOrder[i]));
        }

        return notes;
    }

    update(note) {
        console.log('UPDATE on localStorage started');
        localStorage.setItem(note.id, JSON.stringify(note));
        console.log('UPDATE note: ' + note.toString() + ' updated on localStorage on key: ' + note.id);
    }

    remove(note) {
        console.log('DELETE from localStroage started');
        note = this.getNoteById(note.id);
        this.notesOrder = this.getNotesOrder();
        this.notesOrder.splice(note.order, 1);
        localStorage.removeItem(note.id);
        this.updateOrder();
        this.refreshOrder();
        console.log('DELETE from localStroage note: ' + note.toStringOnlyId());
    }

    getNoteById(id)
    {
        return Note.createFromJSON(JSON.parse(localStorage.getItem(id)));
    }

    getNotesOrder()
    {
        return JSON.parse(localStorage.getItem('notesOrder'));
    }

    refreshOrder() {
        for (var i = 0; i < this.notesOrder.length; i++) {
            var note = this.getNoteById(this.notesOrder[i]);
            note.order = i;
            this.update(note);
        }
    }

}

