var $ = jQuery.noConflict();
$(document).ready(function () {
    $.ajax(
        {
            url : "https://api.myjson.com/bins/11dv4v",
            success: function (result) {
                var template = $('#index-field').html();
                var output = $('#index-field-target');
                var out = Mustache.render(template, result);
                output.append(out);

                var template = $('#date-field').html();
                var output = $('#date-field-target');
                var out = Mustache.render(template, result);
                output.append(out);

                var template = $('#like-field').html();
                var output = $('#like-field-target');
                var out = Mustache.render(template, result);
                output.append(out);

                var template = $('#dislike-field').html();
                var output = $('#dislike-field-target');
                var out = Mustache.render(template, result);
                output.append(out);

            },
            error : function (xhr) {

            }
        }
    );
});