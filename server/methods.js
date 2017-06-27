Meteor.methods({
    addToTemplate:function(x,y){
        var s=System.findOne({})||{};
        var id;
        if(s.template){
            s.template.x=s.template.x.map((Xi,k)=>{
                Xi+=x[k];
                return Xi/2;
            });
            s.template.y=s.template.y.map((Yi,k)=>{
                Yi+=y[k];
                return Yi/2;
            });
            id=s._id;
        }
        else{
            s.template={};
            s.template.x=x;
            s.template.y=y;
            System.insert({pass:undefined, template:{}});
        }
        System.update(System.findOne({})._id, {$set:{template:s.template}});
    },
    savePassword:function (pass) {
        System.update(System.findOne()._id,{$set:{pass:pass}});
    },
    saveAsTemplate:function(){
        System.update(System.findOne()._id, {$set:{isTemplateSaved:true}});
    },
    tryToLogin:function (x,y,pass) {
        var s=System.findOne({});
        if(s.pass!=pass){
            console.log('password is incorrect');
            throw new Meteor.Error('Password is incorrect');
        }
        var kx=0,
            ky=0,
            balancedMeasures=s.template,
            xSortedMeasured=x.sort((a,b)=>a-b),
            ySortedMeasured=y.sort((a,b)=>a-b),
            xSortedTemplate=s.template.x.sort((a,b)=>a-b),
            ySortedTemplate=s.template.y.sort((a,b)=>a-b),
            xBalancedPeaks=[],
            yBalancedPeaks=[],
            xMeasuredPeaks=[],
            yMeasuredPeaks=[],
            xUpBorderMeasured=xSortedMeasured[xSortedMeasured.length-1]/2,
            xLowBorderMeasured=xSortedMeasured[0]/2,
            yUpBorderMeasured=ySortedMeasured[ySortedMeasured.length-1]/2,
            yLowBorderMeasured=ySortedMeasured[0]/2,
            xUpBorderTemplate=xSortedTemplate[xSortedTemplate.length-1]/2,
            xLowBorderTemplate=xSortedTemplate[0]/2,
            yUpBorderTemplate=ySortedTemplate[ySortedTemplate.length-1]/2,
            yLowBorderTemplate=ySortedTemplate[0]/2,
            diffX=[],
            diffY=[];
        balancedMeasures.x.forEach((i,k)=>{
            if(i<xLowBorderTemplate|| i>xUpBorderTemplate){
                if(Math.abs(i)>2) {
                    xBalancedPeaks.push(k);
                }
            }
        });
        balancedMeasures.y.forEach((i,k)=>{
            if(i<yLowBorderTemplate || i>yUpBorderTemplate){
                if(Math.abs(i)>2) {
                    yBalancedPeaks.push(k);
                }
            }
        });
        x.forEach((i,k)=>{
            if(i<xLowBorderMeasured|| i>xUpBorderMeasured){
                if(Math.abs(i)>2) {
                    xMeasuredPeaks.push(k);
                }
            }
        });
        y.forEach((i,k)=>{
            if(i<yLowBorderMeasured || i>yUpBorderMeasured){
                if(Math.abs(i)>2) {
                    yMeasuredPeaks.push(k);
                }
            }
        });
        console.log(xBalancedPeaks, yBalancedPeaks, xMeasuredPeaks, yMeasuredPeaks);
        diffX=_.difference(xBalancedPeaks, xMeasuredPeaks).length+_.difference(xMeasuredPeaks,xBalancedPeaks).length;
        diffY=_.difference(yBalancedPeaks, yMeasuredPeaks).length+_.difference(yMeasuredPeaks, yBalancedPeaks).length;
        console.log(diffX, diffY);
        if(diffX+diffY>1){
            throw new Meteor.Error('Password is incorrect');
        }
        return true;
    }
})