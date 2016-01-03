/**
 * Created by Pawel on 27.12.2015.
 */
function getView(url,id,name,user,rating) {
    var usr = document.getElementById("username").value;
    if (usr == user){
        return "<div class='imgView' id='"+id+"'>"+

        "<a href='/postcard/"+id+"'><h3 class='full_view'>"+name+"</h3></a>"+
                "<kbd class='full_view'>PostCard Rating "+ rating+" </kbd>"+
        "<a href='/edit/"+id+"'><h3 class='full_view'>Edit</h3></a>"+
        "<img src='"+url+"'/>"+
        "</div>"
    }
    else{
        return "<div class='imgView' id='"+id+"'>" +
        "<a href='/postcard/"+id+"'><h3 class='full_view'>"+name+"</h3></a>"+
            "<kbd class='full_view'> Rating "+ rating+" </kbd>"+
        "<img src='"+url+"'/>"+
        "</div>"
    }
}
$("#selectTemplate").click(function(){
    window.location = "/createnew/"+$(this).val();
});

function initCanvas()
{

    $.get(window.location.pathname, function(data) {

       var can = new fabric.Canvas('viewCanvas');
       can.loadFromJSON(JSON.parse(data[0].fields.canvas),can.renderAll.bind(can),function(o, object) {
           object.selectable = false;
        });
    })

}
