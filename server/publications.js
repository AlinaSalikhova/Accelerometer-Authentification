Meteor.publish('notes', function () {
    return Notes.find();
});

Meteor.publish('system', function () {
    return System.find();
})