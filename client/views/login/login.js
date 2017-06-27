Template.login.helpers({
    'getActive':function(n){
            return Template.instance().pass.get().length - 1 >= n ? 'active' : '';
    }
});
Template.login.events({
    'click .key.circle':function (e, t) {
        console.log(t);
        var button=$(e.currentTarget);
        if(button.data('number')!==undefined){
            if(t.pass.get().length==0){
                t.measures=[];
            }
            navigator.accelerometer.getCurrentAcceleration((a)=>{
                t.measures.push(a);
            });
            t.pass.set(t.pass.get()+button.data('number')+'');
        }
        if(button.data('action')){
            if(button.data('action')=='backspace'){
                t.measures.pop();
                t.pass.set(t.pass.get().substring(0, t.pass.get().length - 1));
            }
            if(button.data('action')=='clear'){
                t.measures=[];
                t.pass.set('');
            }
        }
        if(t.pass.get().length==7){
            let x = [];
            let y = [];
            t.measures.forEach((i, k, a)=> {
                x.push((i.x - (a[k - 1] ? a[k - 1].x : i.x)));
                y.push((i.y - (a[k - 1] ? a[k - 1].y : i.y)));
            });
            Meteor.call('tryToLogin', x, y, t.pass.get(), (err)=>{
                if(!err){
                    Session.set('isLogined', true);
                    console.log(Session.get('isLogined'))
                    Router.go('/notes');
                }
                else{
                    $('.code .circle').addClass('wrong');
                    setTimeout(function(t){t.pass.set(''); $('.code .circle').removeClass('wrong');}, 2000, t);
                }
            })

        }
    }
})
Template.login.onCreated(function(){
    this.pass=new ReactiveVar('');
})