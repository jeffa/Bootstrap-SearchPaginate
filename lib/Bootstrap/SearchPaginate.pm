package Bootstrap::SearchPaginate;
use Dancer ':syntax';
use Data::SpreadPagination;

our $VERSION = '0.2';

get '/' => sub {
    my %vars = ();

    template index => \%vars;
};

get '/results' => sub {

    my $per  = param( 'per' ) || 10;
    my $curr = param( 'curr' ) || 1;

    my @results = ( 
        map {{ foo => $_, bar => $_, baz => $_, qux => $_ }} 
        map { sprintf '%04d', $_ }
        1 .. 9999
    );

    my $pager = Data::SpreadPagination->new({
        totalEntries      => scalar @results,
        entriesPerPage    => $per,
        currentPage       => $curr,
        maxPages          => 6,
    });

    template results => {
        results => \@results,
        per     => $per,
        curr    => $curr,
        pager   => $pager,        
    }, { layout => undef };
};

true;
