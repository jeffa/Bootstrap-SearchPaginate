function fetch_results() {

    per  = document.search.per.value;
    curr = document.search.curr.value;
    page = document.search.page.value;

    var url = '/'  + page
        + '?per='  + per
        + '&curr=' + curr
    ;

    $('#myTab a[href="#' + page + '"]').tab('show');

    _ajaxGET( url, '#' + page );
}


function set_controls( curr, per ) {
    document.search.per.value  = per;
    document.search.curr.value = curr;
}


function set_page( page ) {
    document.search.page.value = page;
    document.search.curr.value = 1;
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
