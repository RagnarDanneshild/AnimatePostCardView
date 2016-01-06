/**
 * Created by Pawel on 06.01.2016.
 */
function initTagView()
{
    $.get('/tags/'+window.location.pathname.split('/')[2],function(data){
        $.each( data, function( i, item ) {
            alert(item);
            getImage(item.fields.picture_url,
            function(url){
               $( "#TagImgContainer").append(getView(url,item.pk,item.fields.name,item.fields.user,item.fields.rating,'false'));
            }
            );
        });
    });
};