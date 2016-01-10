/**
 * Created by Pawel on 22.12.2015.
 */

var canvas2 = this.__canvas = new fabric.Canvas('second');
function download(url,name){
// make the link. set the href and download. emulate dom click
  $('<a>').attr({href:url,download:name})[0].click();

}
function downloadFabric(canvas,name){

//  convert the canvas to a data url and download it.
  download(canvas.toDataURL(),name+'.png');
}
$('#save').click(function () {
   download(canvas,(new Date).getTime())
});
$('#savesmt').click(function()
    {

       savePicture(canvas,function(data){


        $.post('/savePostCard',{json:JSON.stringify(canvas),url:data})
            .done(function(data){ alert('its ok');});
       });
    }
);

//
//var elemetn=$('<img/>').attr('src','https://cs7053.vk.me/c540105/v540105861/60d75/1X8ahzEpcww.jpg');
//$('#imgContainer').append(elemetn);

function initGallery()
{
    $.get('/getListOfPicture/0',function(data){
        populateContainer(data,"#imgContainer",'#previewImg','preview');
    });
};



function initUserCard()
{
    $.get('/getListOfPicture/4',{user:true},function(data){
        populateContainer(data,"#UserimgContainer",'#previewImg','preview');
    });
};

$('#search-form').on('submit', function(event){
    event.preventDefault();  // sanity check
    searching();
});

function searching() {
   $.ajax({
        url : "/search/", // the endpoint
        type : "POST", // http method
        data : { searching_data : $('#search-text').val() }, // data sent with the post request
        success : function(sresult) {
            $("#searchlist").empty();
            populateContainer(sresult,"#searchlist",'#searchingImg','searching');
        },
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
};