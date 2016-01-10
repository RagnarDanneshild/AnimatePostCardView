/**
 * Created by Pawel on 09.01.2016.
 */
$('.editProfile').click(function(){

  $(this).prev().prop("readonly", false);
    $(this).prev().css("box-shadow", "10px 10px 5px #888888");
    $(this).css('display','none');
    $(this).next().css('display','inline');
});

$('.okProfile').click(function(){
   $(this).prev().prev().prop("readonly", true);
    $(this).prev().prev().css("box-shadow", "none");
 $(this).css('display','none');
     $(this).prev().css('display','inline');

    $.post("update/"+ $(this).prev().prev().attr('id')+'/', {data:$(this).prev().prev().val()})

});
$('#userNode').click(function(){
    $.get('/getUserInfo')
        .done(function(data){
            $('#firstname').attr('value',data[0].fields.first_name);
            $('#lastName').attr('value',data[0].fields.last_name);
            $('#telephone').attr('value',data[0].fields.telephone);
            $('#description').attr('value',data[0].fields.description);
        })
});