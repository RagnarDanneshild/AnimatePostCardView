/**
 * Created by Pawel on 27.12.2015.
 */
function getView(url,id,name,user,rating,onlytemplates) {
    if ($('#username').val())
        var usr = document.getElementById("username").value;
    if (user =='templates' && rating==undefined){
        return "<div class='templateView' id='"+name+"'>"+
            "<img id = 'selectTemplate' src='"+url+"' style='max-height: 300px; max-width: 300px;'/>"+
        "</div>"
    }
    else if (user=='search' && rating==undefined){
        return "<li>"+
                "<a href='/postcard/"+id+"'>"+name+"</a>"+
                "<img id = 'selectTemplate' src='"+url+"' style='max-height: 100px; max-width: 100px;'/>"+
                "</li>"
    }
    else if (usr == user && rating!=undefined){
        return "<div class='imgView' id='"+id+"'>"+
        "<a href='/postcard/"+id+"'>"+name+"   </a>"+"<span ><a  href='/edit/"+id+"' lang='en'><i class='fa fa-pencil-square-o'></i></a></span>"+
                "<div class='infoLine'><span class='toggle fa fa-camera'></span> <span  class='badge' lang='en'> Rating "+ rating+" </span></div>"+

        "<img class='previewImg' src='"+url+"'/>"+
        "</div>"
    }
    else if(usr != user && rating!=undefined){
        return "<div class='imgView' id='"+id+"'>" +
        "<a href='/postcard/"+id+"'>"+name+"</a>"+
            "<div class='infoLine'><span id='toggle' class='fa fa-camera'></span> <span  class='badge' lang='en'> Rating "+ rating+" </span></div>"+
        "<img class='previewImg'src='"+url+"'/>"+
        "</div>"
    }


}
$("#templateContainer").on("click",".templateView",function(){
    window.location = "/createnew/"+$(this).attr('id');
});


function initCanvas()
{var can = new fabric.Canvas('viewCanvas');
    $.get(window.location.pathname, function(data) {
        if(data[0].fields.user){
             var postCardName = document.getElementById('postCardName');
            postCardName.setAttribute('value',data[0].fields.name);
        }
        getImage1(data[0].fields.canvas_url,function(jsoncanvas){
            var tempForAnimationObject = [];
          can.loadFromJSON(JSON.parse(jsoncanvas),function(){ afterCanvasLoad(can,tempForAnimationObject);},function(o, object) {
              if (object.animationtype)
                tempForAnimationObject.push(object);
              if (object.evented == false) {
                  setCanvasParams(can, object);
              }
              can.add(object);
          });
        });
   });

};


