function load() {
    fetch_results();

    // enter key "submits" the form
    $(document).keydown(function(e) {
        switch(e.which) {
            case 13:
            fetch_results();
            default: return;
        }
        e.preventDefault();
    });
}

function fetch_results() {

    var params = $.param([
        {name: "per",   value: document.search.per.value},
        {name: "curr",  value: document.search.curr.value},
        {name: "query", value: document.search.query.value},
        {name: "max",   value: document.search.max.value}
    ]);

    var page = document.search.page.value;
    var url  = '/' + page + '?' + params;

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
    document.search.query.value = '';
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
