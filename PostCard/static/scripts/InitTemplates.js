/**
 * Created by Pawel on 07.01.2016.
 */
   function inittemplates()
    {
        $.get('/getListOfPicture/templates/',function(data){
            $.each( data, function( i, item ) {
                 getImage(item.fields.template_url,function(url){
                    $( "#templateContainer").append(getView(url,item.pk,item.fields.name,'templates'));
                });
            });
        });
    };