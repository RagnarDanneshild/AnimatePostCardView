/**
 * Created by Pawel on 30.12.2015.
 */
var coff=2;
$(document).ready(function(){

    if (window.location.pathname!='/')return  0;
  var screenHeight = $(window).height();

  $(window).scroll(function()
    {
      var scroll = $(this).scrollTop();
      var divHeight = $("#imgContainer").height();
      var totalHeight = screenHeight + scroll;
      var left = divHeight - totalHeight;
      if (left < 10 && left>-120)
        moreData();
    });
});

 function moreData()
 {
 $.get('/getListOfPicture/'+coff.toString(),function(data){
     populateContainer(data,"#imgContainer",'#previewImg','preview');
 });
     coff=coff+4;
 }