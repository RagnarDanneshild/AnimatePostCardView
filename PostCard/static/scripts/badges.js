/**
 * Created by Pawel on 03.01.2016.
 */
$('#badges').click(function () {
    $.get('/checkBadges')
        .done(function(data)
        {
            if(data[1]) $('#1').css('display','inline')
            if(data[2]) $('#2').css('display','inline')
            if(data[3]) $('#3').css('display','inline')
            if(data[4]) $('#4').css('display','inline')
            if(data[5]) $('#5').css('display','inline')
        })
});