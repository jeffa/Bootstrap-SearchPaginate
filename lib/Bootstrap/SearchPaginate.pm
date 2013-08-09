package Bootstrap::SearchPaginate;
use Dancer ':syntax';
use Data::SpreadPagination;

our $VERSION = '0.2';
our $PER_PAGE = 10;
our $MAX_PAGE = 10;

get '/' => sub {
    my %vars = ();

    template index => \%vars;
};


get '/*' => sub {
    my ($page) = splat;
    my %results = get_results( params );

    delete $_->{$page} for @{ $results{results} };

    template "pages/$page.tt" => \%results, { layout => undef };
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
        currentPage       => $params{curr} ||= 1,
        entriesPerPage    => $params{per}  ||= $PER_PAGE,
        maxPages          => $params{max}  ||= $MAX_PAGE,
    });

    return ( %params, results => \@results, pager => $pager );
}

true;
