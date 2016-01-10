/**
 * Created by HellAlien on 10.01.2016.
 */
function animateSliding(c,obj,animationtype,stopcoords){
     obj.animate('left', obj.left === 50 ? stopcoords : 50,{
        duration: 2000,
        easing: fabric.util.ease.easeOutCubic,
        onChange: c.renderAll.bind(c),
        onComplete: function onComplete() {
            if (isAnimation && animationtype =='scale_sliding' ){
                animateScale(c,obj);
                animateSliding(c,obj,animationtype,stopcoords);
            }
            else if(isAnimation && animationtype == 'sliding'){
                animateSliding(c,obj,animationtype,stopcoords);
            }
        }
    })
}

function  setsimpleoptions(c){
    var simpleoptions = {
        duration: 2000,
        easing: fabric.util.ease.easeOutCubic,
        onChange: c.renderAll.bind(c)
    }
    return simpleoptions;
}

function animateScale(canvas,obj){
    obj.animate('scaleX',obj.scaleX === 1 ? 2 : 1,setsimpleoptions(canvas));
    obj.animate('scaleY',obj.scaleY === 1 ? 2 : 1,setsimpleoptions(canvas))
};

function startAnimation(canvas,obj,animationtype){
    isAnimation = true;
    obj.animationtype = animationtype;
    obj.scale(Math.round(obj.scaleX),Math.round(obj.scaleX));
    var stopcoords;
    if (animationtype =='sliding')
        stopcoords = canvas.width-obj.width*obj.scaleX-50;
    else if(animationtype=='scale_sliding')
        stopcoords = canvas.width-obj.width*2-50;
    if (isAnimation && animationtype !='none')
        animateSliding(canvas,obj,animationtype,stopcoords);
}