Template.changepass.helpers({
    'getActive':function(n){
        return Template.instance().pass.get().length - 1 >= n ? 'active' : '';
    },
    'getReamingInputs':function () {
        return Template.instance().inputsCount.get();
    }
});
Template.changepass.events({
    'click .key.circle':function (e, t) {
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
        if(t.pass.get().length==7) {
            if (t.inputsCount.get() > 0) {
                if(t.inputsCount.get()==5){
                    if(System.findOne()) {
                        System.remove(System.findOne()._id);
                    }
                }
                t.inputsCount.set(t.inputsCount.get()-1);
                let x = [];
                let y = [];
                t.measures.forEach((i, k, a)=> {
                    x.push((i.x - (a[k - 1] ? a[k - 1].x : i.x)));
                    y.push((i.y - (a[k - 1] ? a[k - 1].y : i.y)));
                });
                Meteor.call('addToTemplate', x, y, (err)=>{
                    console.log(err);
                });
                t.measures=[];
                t.pass.set('');
            }
            else{
                Meteor.call('saveAsTemplate', (err)=>{
                    console.log(err);
                });
                Meteor.call('savePassword', t.pass.get(), (err)=>{
                    console.log(err);
                })
                Router.go('/login');
            }
        }
    }
})
Template.changepass.onCreated(function(){
    this.pass=new ReactiveVar('');
    this.inputsCount=new ReactiveVar(5);
})