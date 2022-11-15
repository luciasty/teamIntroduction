// 팀원을 추가하는 폼을 닫았다 열었다 한다.
function open_box() {
    $('#post-box').show()
}

function close_box() {
    $('#post-box').hide()
}

//모든 HTML 문서가 준비가 되었으면 함수를 실행한다.
$(document).ready(function () {
    // index페이지에 팀원 리스트 가져오기
    $.ajax({
        type: "get",
        url: "/members",
        data: {},
        success: function (response) {
            // 가져온 response안에 members리스트를 변수에 저장
            // for of를 이용해 리스트를 반복
            const members = response["members"];
            for (const member of members) {
                const id = member["id"];
                const image = member["image"];
                const name = member["name"];
                const sns = member["sns"];
                const cnt = member["viewcnt"]

                // html구조를 작성하고 가져온 데이터를 삽입한다.
                temp_html = `<div class="card mb-3" style="max-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${image}"
                                             class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card-body">
                                            <h5 class="card-title title_color">${name}</h5>
                                            <p class="card-text temp"></p>
                                            <a href="${sns}" class="card-text">개발일지 블로그</a>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card-body">
                                            <button><a href="/profile?id=${id}">프로필 보기</a></button>
                                            <p class="card-text">조회수: ${cnt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                // class members를 가지고 있는 요소에다가 작성해둔 temp_html을 추가한다.
                $(".members").append(temp_html);

            }
        }
    });
    //스파르타 코딩클럽에서 제공하는 api에서 지역 온도를 가져온다.
    $.ajax({
        type: "get",
        url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
        data: {},
        success: function (response) {
            $(".temp").text(response["temp"]);
        }
    });

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
            type: "post",
            url: "/creat-member",
            data: {
                image_give: image,
                name_give: name,
                yourself_give: yourself,
                strong_give: strong,
                style_give: style,
                goals_give: goals,
                appointment_give: appointment,
                sns_give: sns
            },
            success: function (response) {
                alert(response["msg"]);
                window.location.reload();
            }
        });
    });
});

$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/sparta_api/weather/seoul",
        data: {},
        success: function (response) {
            let seoul_temp = response['temp']

            $('#seuolgion').text(seoul_temp)
        }
    });

    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/sparta_api/weather/busan",
        data: {},
        success: function (response) {
            let busan_temp = response['temp']

            $('#busangion').text(busan_temp)
        }
    });

    $.ajax({
        type: "GET",
        url: "http://spartacodingclub.shop/sparta_api/weather/incheon",
        data: {},
        success: function (response) {
            let incheon_temp = response['temp']

            $('#incheongion').text(incheon_temp)
        }
    });
});