var $ = jQuery.noConflict();

$(document).ready(function(){

});

$(document).ready(
    $("#login-container").click(function () {
        $("#register").css("display","none");
        $("#login").css("display","");
        $("#register-container").css("background-color", "#C9302C");
        $("#login-container").css("background-color","white");
    })
  );
function validatePassword() {
    if($('[name="password"]').val() == $('[name="re_password"]').val()){
        return true;
    }else{
      alert('پسورد و تکرار ان یکی نیست');
      return false;
    }
}

$(document).ready(
    $("#search-btn").click(function () {
      console.log($("#search-query").val());
      window.location.href = "search?q=" + $("#search-query").val();
    })
);

$(document).ready(
    $("#register-container").click(function () {
        $("#register").css("display","");
        $("#login").css("display","none");
        $("#register-container").css("background-color", "white");
        $("#login-container").css("background-color","#C9302C");

    })
);

$(document).ready(
    function () {
        $("#register").css("display","none");
    }
);

$(document).ready(function () {
    $.ajax(
        {
            url : "http://localhost:3000/movies/recent/15",
            success: function (result) {

                // result.movies = result.movies.slice(3, 15);
                var template = $('#new-movie-template').html();
                var output = $('#target-movie-div');
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


$(document).ready(function () {
    $.ajax(
        {
            url : "https://api.myjson.com/bins/dz9sv",
            success: function (result) {

                console.log("hot");
                result.movies = result.movies.slice(3, 20);
                var template = $('#hot-movie-template').html();
                var output = $('#target-hot-movie-div');
                var data = result;
                var out = Mustache.render(template, data);
                output.append(out);
                prepareHotOwlCarousel();
            },
            error : function (xhr) {

            }
        }
    );
});



function prepareOwlCarousel() {
    $("#target-movie-div").owlCarousel({
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
function prepareHotOwlCarousel() {
    console.log("hot owl carousel");

    $("#target-hot-movie-div").owlCarousel({
        loop:true,
        pagination: false,
        rtl : true,
        margin:10,
        responsiveClass:true,
        responsive:{
            0:{
                items:2,
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
