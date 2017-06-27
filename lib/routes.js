Router.route('/',{
    waitOn:function(){
        return [Meteor.subscribe('system'), Meteor.subscribe('notes')];
    },
    loadingTemplate:'loading',
    action:function(){
        var s=System.findOne();
        console.log(s);
        if(!s || !s.pass){
            this.redirect('/changePass');
            return false;
        }
        if(!Session.get('isLogined')){
            Session.set('isLogined', false)
            this.redirect('/login');
            return false;
        }
        this.redirect('/notes')
    }
})
Router.route('/login', {
    waitOn:function(){
        return [Meteor.subscribe('system'), Meteor.subscribe('notes')];
    },
    loadingTemplate:'loading',
    action:function(){
        console.log(Session.get('isLogined'))
        if(Session.get('isLogined')){
            this.redirect('/notes');
            return false;
        }
       this.render('login');
    }
})
Router.route('/changepass', {
    waitOn:function(){
        return [Meteor.subscribe('system'), Meteor.subscribe('notes')];
    },
    loadingTemplate:'loading',
    action:function(){

        console.log(Session.get('isLogined'));
       this.render('changepass');
    }
})
Router.route('/notes',{
    waitOn:function(){
        return [Meteor.subscribe('system'), Meteor.subscribe('notes')];
    },
    loadingTemplate:'loading',
    action:function(){
        if(!Session.get('isLogined')){
            Session.set('isLogined', false)
            this.redirect('/login');
            return false;
        }
        this.render('notes', {
            data:{
                notes:Notes.find()
            }
        });
    }
})
Router.route('/addNote',{
    waitOn:function(){
        return [Meteor.subscribe('system'), Meteor.subscribe('notes')];
    },
    loadingTemplate:'loading',
    action:function(){
        if(!Session.get('isLogined')){
            Session.set('isLogined', false);
            this.redirect('/login');
            return false;
        }
        this.render('addNote');
    }
})
Router.route('/logout',{
    waitOn:function(){
        return [Meteor.subscribe('system'), Meteor.subscribe('notes')];
    },
    loadingTemplate:'loading',
    action:function(){
        Session.set('isLogined', false);
        this.render('login');
    }
})
