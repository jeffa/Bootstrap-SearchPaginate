function fetch_results( curr, per ) {

    if (!per) per = 10;
    if (!curr) curr = 1;

    var url = '/results'
        + '?per=' + per
        + '&curr=' + curr
    ;

    _ajaxGET( url, '#content' );
}

function _ajaxGET( url, id, err ) {

    if (!err) {
        err = '<div class="alert alert-error">'
            + '<button type="button" class="close" data-dismiss="alert">&times;</button>'
            + '<strong>Error!</strong>'
            + ' Ajax call failed: ' 
            + url 
            + '</div>'
    }

    $.ajax( {
        url: url,
        type: 'GET',
        success: function( data, status, xhr ) {
            $( id ).html( xhr.responseText );
        },
        error: function( xhr, status, error ) {
            $( id ).html( err );
        }
    });
}
