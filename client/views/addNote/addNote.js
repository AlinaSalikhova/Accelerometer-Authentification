Template.addNote.events({
    'submit .add-note-form':function(e){
        e.preventDefault();
        Notes.insert({'text':$('#text').val()});
        Router.go('/notes');
    }
})