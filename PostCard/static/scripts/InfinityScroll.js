/**
 * Created by Pawel on 30.12.2015.
 */
var coff=4;
$(document).ready(function(){
  var screenHeight = $(window).height();

  $(window).scroll(function()
    {
      var scroll = $(this).scrollTop();
      var divHeight = $("#imgContainer").height();
      var totalHeight = screenHeight + scroll;
      var left = divHeight - totalHeight;
      if (left < 10)
        moreData();
    });
});

 function moreData()
 {
 $.get('/getListOfPicture/'+coff.toString(),function(data){
     $.each( data, function( i, item ) {
         getImage(item.fields.picture_url,
         function(url){
            $( "#imgContainer").append(getView(url,item.pk,item.fields.name,item.fields.user));
         }
         );
    });
 });
     coff=coff+2;
 }