// 팀원을 추가하는 폼을 닫았다 열었다 한다.
function open_box() {
    $('#post-box').show()
}

function close_box() {
    $('#post-box').hide()
}

//모든 HTML 문서가 준비가 되었으면 함수를 실행한다.
$(document).ready(function () {
    show_comment()
    // index페이지에 팀원 리스트 가져오기
    $.ajax({
        type: "get",
        url: "/members",
        data: {},
        success: function (response) {
            // 가져온 response안에 members리스트를 변수에 저장
            // for of를 이용해 리스트를 반복
            const members = response["members"];
            const member_cities = []

            // 중복된 지역 날씨를 계속 요청하면 너무 많은 요청을 하게 됨
            // 지역은 고정되있어 팀원들의 지역중 중복된 값을 모두 지우고 필요한 지역만 남김
            for (const member of members) {
                member_cities.push(member["my_city"]);
            }
            // 전개연사자를 이용해서 중복을 없애는 Set()을 적용한 결과물을 리스트로 만듬
            const cities = [...new Set(member_cities)];

            // 팀원 정보를 처리
            for (const member of members) {
                const id = member["id"];
                const image = member["image"];
                const name = member["name"];
                const sns = member["sns"];
                const cnt = member["viewcnt"]
                const city = member["my_city"];

                const temp_html = `<div class="card mb-3 cards-radius" style="max-width: 540px;">

                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${image}"
                                             class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card-body">
                                            <h5 class="card-title title_color">${name}</h5>
                                            <p class="card-text">지역 : ${city}</p>
                                            <p class="card-text ${city}"></p>
                                            <a href="${sns}" class="card-text blog_hover">개발일지 블로그</a>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card-body">
                                        <button type="button" class="btn btn-light blog_hover"><a href="/profile?id=${id}">프로필 보기</a></button>
                                            <p class="card-text">조회수: ${cnt}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                // html구조를 작성하고 가져온 데이터를 삽입한다.
                $(".members").append(temp_html);

                // /지역의 값이 그 외지역 "Korea"면 숨김처리 한다.
                if ( city === "Korea") {
                    $(`.${city}`).hide();
                }
            }

            // 정리해둔 지역 리스트로 필요한 요청만 진행
            for (const city of cities) {
                // 가져온 지역 변수를 사용해서 날씨 정보를 가져온다
                $.ajax({
                    type: "get",
                    url: "http://spartacodingclub.shop/sparta_api/weather/" + city,
                    data: {},
                    success: function (response) {
                        const temp = response["temp"]
                        
                        $(`.${city}`).text(`${temp}  °C`);
                    }
                });
            }
        }
    });

    //팀원의 정보를 입력하고 버튼을 클릭하면 함수가 실행한다.
    $(".save_button").click(function () {
        //제이쿼리를 이용해 입력한 정보의 value를 가져온다.
        const regex = /.{11}-.{11}-.{12}-\d{3}/;
        const image = $("#my_image").val();
        const name = $("#my_name").val();
        const yourself = $("#my_yourself").val();
        const strong = $("#my_strong").val();
        const style = $("#my_style").val();
        const goals = $("#my_goals").val();
        const appointment = $("#my_appointment").val();
        const sns = $("#my_sns").val();
        //지역의 값이 그 외지역을" Korea로 저장해서 한국 날씨를 출력한다.
        let city = $("#my_city").val();
        city = (city === "korea" ? city = "korea" : city)

        if (regex.test(image)) {
            $.ajax({
                //정보를 추가하기 때문에 POST를 사용한다.
                //data를 모두 보내고 성공했으면 창을 새로고침 합니다.
                type: "POST",
                url: "/members",
                data: {
                    image_give: image,
                    name_give: name,
                    yourself_give: yourself,
                    strong_give: strong,
                    style_give: style,
                    goals_give: goals,
                    appointment_give: appointment,
                    sns_give: sns,
                    city_give: city

                }, success: function (response) {
                    alert(response["msg"]);
                    window.location.reload();
                }
            });
        } else {
            alert("슬랙 이미지 URL이 아닙니다^^");
            window.location.reload();
        }


        //ajax를 통해서 서버와 연결한다.

    });
});

function show_comment() {
    $.ajax({
            type: 'GET',
            url: '/mainbooks',
            data: {},
            success: function (response) {
                let rows = response['mainbook_key']
                for (let i = 0; i < rows.length; i++) {
                    let name = rows[i]['name']
                    let comment = rows[i]['comment']
                    let comment_id = rows[i]['comment_id']
                    let temp_html = `<div class="card-header">
                                        ${name}
                                      </div>
                                      <div class="card-body">                            
                                        <p class="card-text">${comment}</p>
                                        <button onclick="delete_comment(${comment_id})" type="button" id="delete_comment" class="btn btn-primary">삭제</button>
                                        <button onclick="modi_comment(${comment_id})" type="button" id="delete_comment" class="btn btn-primary">수정</button>`
                    $('#maincard').append(temp_html)
                }
            }
        }
    )
}

function save_comment() {
    const name = $('#name').val();
    const comment = $('#comment').val();

    if (name === '' || comment === '') {
        alert('빈칸을 모두 채워주세요 T^T')
    } else {

        $.ajax({
            type: "POST",
            url: "/mainbooks",
            data: {name_give: name, comment_give: comment},
            success: function (response) {
                alert(response['msg'])
                window.location.reload()
            }
        });
    }
}

function delete_comment(comment_id) {
    if (confirm('댓글 삭제하실래요? 삭제한 댓글은 복구할 수 없어요 T^T')) {
        $.ajax({
            type: "POST",
            url: "/mainbooks/delete",
            data: {comment_id_give: comment_id},
            success: function (response) {
                alert(response["msg"])
                window.location.reload()
            },
        });
    }
}

function modi_comment(comment_id) {
    const modi_comment = prompt('수정하실 내용을 작성해주세요. 그리고 수정한 댓글은 복구할 수 없어요 T^T')

    $.ajax({
        type: "POST",
        url: "/mainbooks/modi",
        data: {modi_give: modi_comment, comment_id_give: comment_id},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        },
    });
}
