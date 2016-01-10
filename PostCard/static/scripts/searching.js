/**
 * Created by HellAlien on 10.01.2016.
 */

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