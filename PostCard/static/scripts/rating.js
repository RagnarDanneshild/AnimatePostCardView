/**
 * Created by Pawel on 03.01.2016.
 */
$('.rateit').bind('rated', function (e) {

   var rate=$(this);
    var value=rate.rateit('value');
    var cardId=rate.data('id');

    $.post('/rate',{ id: cardId, value: value })
        .done(
            function(data){
             $('#totalRating').text(data.rating);
                $('#numberOfVoters').text(data.vote_num);
            }

    )

});

function initVote()
{$('.rateit').attr('data-id',window.location.pathname.split('/')[2]);
    $.get('/rate',{id:window.location.pathname.split('/')[2]})
        .done(function(data){
            $('.rateit').rateit('value',data.user_rate)
             $('#totalRating').text(data.rating);
                $('#numberOfVoters').text(data.vote_num);


        })
}