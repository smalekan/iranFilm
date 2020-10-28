$(document).ready(function () {
    $.ajax(
        {
            url : "https://api.myjson.com/bins/11dv4v",
            success: function (result) {
                var template = $('#movie-versions').html();
                var output = $('#movie-versions-target');
                var out = Mustache.render(template, result);
                output.append(out);

                var output = $('#subtitle-container');
                var out = Mustache.render(template, result);
                if(result.subtitle == null){
                    out = $('#subtitle-null').html();
                }
                output.append(out);


                $("#subtitle").click(function () {
                    $("#subtitle-container").css("display","");
                    $("#download-container").css("display","none");

                });

                $("#download").click(function () {
                    $("#download-container").css("display","");
                    $("#subtitle-container").css("display","none");

                });


                $("#resolution-select").on('change',function () {
                    //console.log("changed");
                    //console.log("this value " + this.value);
                    var selectedValue = this.value;
                    var size = 0;
                    $.each(result.resolution, function(key,value) {
                        //console.log("type of value value " + typeof value.value);
                        //console.log("value value " + value.value);
                        //console.log("ty " + typeof selectedValue);
                        //console.log("selected value " + selectedValue);
                        if(value.value = selectedValue) {
                            //console.log("equals");
                            size = value.size;
                        }
                    });


                    $("#file_size_target").html(size);
                });

            },
            error : function (xhr) {

            }
        }
    );
});

var $ = jQuery.noConflict();
$(document).ready(function(){
    var movie_id = getParameterByName("movie_id", window.location);

    $.ajax(
        {
            url : "http://localhost:3000/movies/" + movie_id + "/details",
            success: function (result) {
                //console.log(result);
                var template = $('#movie-nav-header').html();
                var output = $('#movie-nav-target');
                var out = Mustache.render(template, result);
                output.append(out);

                var obj = {};
                obj.Title = result.Title;
                // obj.tags = result.Genre.split(",");
                var tags = ['درام'];
                // $.each((obj.tags), function (index, value) {
                    // var tag = {};
                    // tag.tag = value;
                    // tags.push(tag);
                // });

                obj.tags = tags;
                obj.title = result.title;

                var template = $('#movie-tags').html();
                var output = $('#movie-tags-target');
                var out = Mustache.render(template, obj);
                output.append(out);

                var obj = result;


                var template = $('#movie-info').html();
                var output = $('#movie-info-target');
                var out = Mustache.render(template, obj);
                output.append(out);

                var template = $('#movie-summary').html();
                var output = $('#movie-summary-target');
                var out = Mustache.render(template, obj);
                output.append(out);

                var template = $('#movie-creator').html();
                var output = $('#movie-creator-target');
                var out = Mustache.render(template, obj);
                output.append(out);

                var template = $('#movie-poster').html();
                var output = $('#movie-poster-target');
                var out = Mustache.render(template, obj);
                output.append(out);

                var template = $('#movie-rating').html();
                var output = $('#movie-rating-target');
                var out = Mustache.render(template, obj);
                output.append(out);

            },
            error : function (xhr) {

            }
        }
    );
});
$(document).ready(function(){
    var movie_id = getParameterByName("movie_id", window.location);
    $.ajax(
        {
            url : "http://localhost:3000/movies/" + movie_id + "/comments",
            success: function (result) {
              //console.log(result);

              var template = $('#comment-template').html();
              //console.log(template);
              var output = $('#comments-target');
              //console.log(output);
              var out = Mustache.render(template, result);
              output.append(out);

            },
            error : function (xhr) {

            }
        }
    );
});
$(document).ready(function () {
        $("#subtitle-container").css("display","none");
});

$(document).ready(function () {
        $("#comment").on("click",function () {
            $("#comment-container").show();
            $("#other-container").hide();
        });
});

$(document).ready(function () {
        $("#download").on("click",function () {
            $("#comment-container").hide();
            $("#other-container").show();
        });
});

$(entersu).on('click', function () {
  var movie_id = getParameterByName("movie_id", window.location);
  // console.log($("#txtuy").val());
  // return;
  $.ajax(
      {
          url : "http://localhost:3000/movies/" + movie_id + "/comments",
          type: "POST",
          data: {comment : $("#txtuy").val()},
          success: function (result) {
            console.log(result);

            var template = $('#comment-template').html();
            //console.log(template);
            var output = $('#comments-target');
            //console.log(output);
            var out = Mustache.render(template, result);
            output.append(out);

             $("#txtuy").val('');

          },
          error : function (xhr) {

          }
      }
  );
});




function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
