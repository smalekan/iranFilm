
$(document).ready(function () {
    $.ajax(
        {
            url : "http://localhost:3000/movies/recent/15",
            success: function (result) {

                // result.movies = result.movies.slice(3, 15);
                var template = $('#search-template').html();
                var output = $('#target-search');
                var data = result;
                var out = Mustache.render(template, data);
                output.append(out);
                prepareOwlCarousel();
            },
            error : function (xhr) {

            }
        }
    );
});

function prepareOwlCarousel() {
    $("#target-search").owlCarousel({
        loop:true,
        pagination: false,
        rtl : true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:3,
                nav:true
            },
            1000:{
                items:6,
                nav:true,
                loop:false
            }
        },
        navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>']
    });
    $(".imdb-movie").click(function () {
        console.log("imdb movie click");
        var movie_id = ($(this).attr("movie_id"));
        console.log($(this));
        console.log(movie_id);
        window.location.href = "movie?movie_id=" + movie_id;

    });
}
