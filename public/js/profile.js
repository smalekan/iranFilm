$(document).ready(
    $("#save_phone_number").click(function() {
        var phone_number = $("#phone_number").val();
        if (phone_number == "" || !isNumeric(phone_number)) {
            alert("شماره تلفن را صحیح وارد کنید");
        } else {
            $.ajax({
                url: "http://localhost:3000/profile/update_phone_number",
                type: "POST",
                data: {
                    phone_number: phone_number
                },
                success: function(result) {
                    console.log(result);
                    $("#phone_number").val(result.phone_number);
                    alert("با موفقیت به روز رسانی شد");
                },
                error: function(xhr) {

                }
            });
        }
    })
);
$(document).ready(
    $("#update_info").click(function() {
        var first_name = $('[name="first_name"]').val();
        var last_name = $('[name="last_name"]').val();
        var nick_name = $('[name="nick_name"]').val();
        var email = $('[name="email"]').val();
        var toSend = {};
        if(first_name != "" && first_name != undefined){
          toSend.first_name = first_name;
        }
        if(last_name != "" && last_name != undefined){
          toSend.last_name = last_name;
        }
        if(nick_name != "" && nick_name != undefined){
          toSend.nick_name = nick_name;
        }
        if(email != "" && email != undefined){
          toSend.email = email;
        }

        $.ajax({
            url: "http://localhost:3000/profile/update_info",
            type: "POST",
            data: toSend,
            success: function(result) {
                console.log(result);
                // $('[name="phone_number"]').val(result.phone_number);
                $('[name="first_name"]').val(result.first_name);
                $('[name="last_name"]').val(result.last_name);
                $('[name="nick_name"]').val(result.nick_name);
                $('[name="email"]').val(result.email);
                alert("با موفقیت به روز رسانی شد");
            },
            error: function(xhr) {

            }
          }
        )
      })
    );



function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
