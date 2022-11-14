function open_box() {
    $('#post-box').show()
}

function close_box() {
    $('#post-box').hide()
}

$(document).ready(function () {
    $(".save_button").click(function () {
        const image = $("#my_image").val();
        const name = $("#my_name").val();
        const yourself = $("#my_yourself").val();
        const strong = $("#my_strong").val();
        const goals = $("#my_goals").val();
        const appointment = $("#my_appointment").val();
        const sns = $("#my_sns").val();

        $.ajax({
            type: "POST",
            url: "/creat-member",
            data: {image_give: image, name_give: name, yourself_give: yourself, strong_give: strong, goals_give: goals, appointment_give: appointment, sns_give: sns},
            success: function (response) {
                alert(response["msg"]);
            }
        });

    });
});