class Note {
    constructor(id, author, content, title, order, date) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.date = date;
        this.order = order;
    }

    
    toString() {
       return 'Note{id=' + this.id
                +'; title=' + this.title.substring(0, 10)
                + '; author=' + this.author
                + '; content='
                + this.content.substring(0, 10)
                + '...; created='
                + this.date.toLocaleString() 
                + '; order=' + this.order
                + ';}';
    }
    
    toStringOnlyId() {
        return 'Note{id=' + this.id + '}';
    }
    
    toStringOnlyIdAndOrder() {
        return 'Note{id=' + this.id + '; order=' + this.order +'}';
    }
    
    static createFromJSON(JSONNote) {
        return new Note(JSONNote.id, JSONNote.author, JSONNote.content, JSONNote.title, JSONNote.order, new Date(JSONNote.date));
    }
   
}