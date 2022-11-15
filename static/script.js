// 팀원을 추가하는 폼을 닫았다 열었다 한다.
function open_box() {
    $('#post-box').show()
}

function close_box() {
    $('#post-box').hide()
}

//모든 HTML 문서가 준비가 되었으면 함수를 실행한다.
$(document).ready(function () {
    //팀원의 정보를 입력하고 버튼을 클릭하면 함수가 실행한다.
    $(".save_button").click(function () {
        //제이쿼리를 이용해 입력한 정보의 value를 가져온다.
        const image = $("#my_image").val();
        const name = $("#my_name").val();
        const yourself = $("#my_yourself").val();
        const strong = $("#my_strong").val();
        const style = $("#my_style").val();
        const goals = $("#my_goals").val();
        const appointment = $("#my_appointment").val();
        const sns = $("#my_sns").val();

        //ajax를 통해서 서버와 연결한다.
        $.ajax({
            //정보를 추가하기 때문에 POST를 사용한다.
            //data를 모두 보내고 성공했으면 창을 새로고침 합니다.
            type: "POST",
            url: "/creat-member",
            data: {image_give: image, name_give: name, yourself_give: yourself, strong_give: strong, style_give: style, goals_give: goals, appointment_give: appointment, sns_give: sns},
            success: function (response) {
                alert(response["msg"]);
                window.location.reload();
            }
        });

    });
});