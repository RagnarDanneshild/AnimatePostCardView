/**
 * Created by Pawel on 27.12.2015.
 */
function getView(id,name,user,rating,viewtype) {
    if ($('#username').val())
        var usr = document.getElementById("username").value;
    if (viewtype =='templates'){
        return "<div class='templateView' id='"+name+"'>"+
            "<img id = 'templateImg"+id+"' src='/static/image/97.GIF' style='max-height: 300px; max-width: 300px;'/>"+
        "</div>"
    }
    else if (viewtype=='searching'){
        return "<li>"+
                "<a href='/postcard/"+id+"'>"+name+"</a>"+
                "<img id = 'searchingImg"+id+"' src='/static/image/97.GIF' style='max-height: 100px; max-width: 100px;'/>"+
                "</li>"
    }
    else if (usr == user && viewtype=='preview'){
        return "<div class='imgView' id='"+id+"'>"+
            "<a href='/postcard/"+id+"'>"+name+"   </a>"+"<span ><a  href='/edit/"+id+"' lang='en'><i class='fa fa-pencil-square-o'></i></a></span>"+
            "<div class='infoLine'><span class='toggle fa fa-camera'></span> <span  class='badge' lang='en'> Rating "+ rating+" </span></div>"+
            "<img id='previewImg"+id+"' src='/static/image/97.GIF'/>"+
            "</div>"
    }
    else if(usr != user && viewtype=='preview'){
        return "<div class='imgView' id='"+id+"'>" +
            "<a href='/postcard/"+id+"'>"+name+"</a>"+
            "<div class='infoLine'><span id='toggle' class='fa fa-camera'></span> <span  class='badge' lang='en'> Rating "+ rating+" </span></div>"+
            "<img id='previewImg"+id+"' src='/static/image/97.GIF'/>"+
            "</div>"
    }
}

$("#templateContainer").on("click",".templateView",function(){
    window.location = "/createnew/"+$(this).attr('id');
});

$('#search-form').on('submit', function(event){
    event.preventDefault();  // sanity check
    searching();
});

function  populateContainer(data,containerId,imgId,viewtype){
    $.each( data, function( i, item ) {
        var id = item.pk;
        getImage(containerId,item,viewtype,function(url){
            imgid = imgId+id;
            $(imgid).attr('src',url);
        });
    });
}


