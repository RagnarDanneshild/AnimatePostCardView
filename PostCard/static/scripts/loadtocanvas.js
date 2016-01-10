/**
 * Created by HellAlien on 10.01.2016.
 */
function loadAllToCanvas(canvas,isselectable){
    if (canvas){
        $.get(window.location.pathname, function (data) {
        getImage1(data[0].fields.canvas_url, function (jsoncanvas) {
            var tempForAnimationObject = [];
            canvas.loadFromJSON(JSON.parse(jsoncanvas), function () {afterCanvasLoad(canvas, tempForAnimationObject);},
                function (o, object) {
                object.selectable = isselectable;
                if (object.animationtype)
                    tempForAnimationObject.push(object);
                if (object.evented == false) {
                    object.selectable = false;
                    setCanvasParams(canvas, object);
                }
                canvas.add(object);
                canvas.renderAll();
            });
        });
    });}

}

function setCanvasParams(c,object){
    var imgheight=object.height;
    var imgwidth=object.width;
    var y = object.scaleY;
    var x = object.scaleX;
    c.setHeight(imgheight*y);
    c.setWidth(imgwidth*x);
    c.renderAll.bind(c);
}

function afterCanvasLoad(canvas,lisfofobjects){
    for(var i = 0;i<lisfofobjects.length;i++){
        startAnimation(canvas, lisfofobjects[i],lisfofobjects[i].animationtype);
    }
    canvas.renderAll();
    $('#loadedImg').remove()

}

function appendLoadingImg(){
    $('#mainblock').append($("<img>", {
            id: 'loadedImg',
            src : "/static/image/97.GIF",
            width : 100,
            height : 100,
            }));
}