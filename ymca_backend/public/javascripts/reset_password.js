$(document).ready(function () {
    var state = 0;

    $('.submit-button').click(function () {
        if (state === 0) {
            $.post("/send_reset_email/", {email: $("#email").val()}).done(function (data) {
                state = 1;
                $('.first-stage').fadeOut("fast", function () {
                    $('.reset-stage').fadeIn("fast");
                });
            });
        } else {
            $.post('/reset_password', {
                email: $("#email").val(),
                code: $("#reset_code").val(),
                password: $("#password").val()
            }).done(function (data) {
                if (data.success) {
                    alert("Password reset was successful. You may now open the app and sign in.");
                } else {
                    alert("Password reset failed. Please double check your details.");
                }
            });
        }
    });
});