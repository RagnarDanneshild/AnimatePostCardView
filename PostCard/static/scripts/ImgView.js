/**
 * Created by Pawel on 27.12.2015.
 */
function getView(url,id)
{
return "<div class='imgView' id='"+id+"'>" +
"<a href='/postcard/"+id+"'><h3 class='full_view'>NAME</h3></a>"+

    "<img src='"+url+"'/>"+
    "</div>"

}


$(document).on('click','.viewPage',function(){


});

function initCanvas()
{
    $.get(window.location.pathname, function(data) {
        var can = new fabric.Canvas('viewCanvas');

   can.loadFromJSON(JSON.parse(data[0].fields.canvas));

})

}