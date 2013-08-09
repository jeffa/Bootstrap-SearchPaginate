package Bootstrap::SearchPaginate;
use Dancer ':syntax';
use Data::SpreadPagination;

our $VERSION = '0.2';

get '/' => sub {
    my %vars = ();

    template index => \%vars;
};


get '/*' => sub {
    my ($page) = splat;
    my %results = get_results( params );

    delete $_->{$page} for @{ $results{results} };

    template "pages/$page.tt" => { %results, params, }, { layout => undef };
};


sub get_results {
    my %params = @_;

    my @data = (10 .. 9999);
    if ($params{query}) {
        @data = grep /$params{query}/, @data;
    }

    my @results = ( 
        map {{ foo => $_, bar => $_, baz => $_, qux => $_ }} 
        map { sprintf '%04d', $_ }
        @data
    );

    my $pager = Data::SpreadPagination->new({
        totalEntries      => scalar @results,
        entriesPerPage    => $params{per}  || 10,
        currentPage       => $params{curr} ||  1,
        maxPages          => 6,
    });

    return ( %params, results => \@results, pager => $pager );
}

true;
