function fetch_results() {

    per = document.myForm.per.value;
    curr = document.myForm.curr.value;
    page = document.myForm.page.value;

    var url = '/' + page
        + '?per=' + per
        + '&curr=' + curr
    ;

    _ajaxGET( url, '#' + page );
}


function set_controls( curr, per ) {
    document.myForm.per.value = per;
    document.myForm.curr.value = curr;
}


function set_page( page ) {
    document.myForm.page.value = page;
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
