Template.notes.events({
    'click .remover':function (e) {
        var noteId=$(e.currentTarget).data('noteid');
        Notes.remove({_id:noteId});
    }
})