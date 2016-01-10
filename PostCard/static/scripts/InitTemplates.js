/**
 * Created by Pawel on 07.01.2016.
 */
   function inittemplates()
    {
        $.get('/getListOfPicture/templates/',function(data){
            populateContainer(data,"#templateContainer",'#templateImg','templates');
        });
    };
function  populateContainer(data,containerId,imgId,viewtype){
    $.each( data, function( i, item ) {
        var id = item.pk;
        getImage(containerId,item,viewtype,function(url){
            imgid = imgId+id;
            $(imgid).attr('src',url);
        });
    });
}