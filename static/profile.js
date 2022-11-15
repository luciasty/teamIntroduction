function hide_comment() {
    $('#guestbook_box').hide()
}

function open_comment() {
    $('#guestbook_box').show()
}

function show_comment() {
    $.ajax({
        type: 'GET',
        url: '/guest-list',
        data: {},
        success: function (response) {
            const guestbook_list = response['guestbook_list']

            for (const guestbook of guestbook_list) {
                const name = guestbook["name"];
                const comment = guestbook["comment"];
                const id = guestbook["id"];

                let temp_html = `<div class="card-header">
                                        ${name}
                                        </div>
                                        <ul class="list-group list-group-flush">
                                        <li class="list-group-item">${comment}</li>
                                        </ul>`

                $('#card').append(temp_html)

            }
        }
    });
}

function save_comment() {
    const name = $('#name').val();
    const comment = $('#comment').val();
    const id = $(".main").attr("value");

    $.ajax({
        type: "POST",
        url: "/guestbook",
        data: {name_give: name, comment_give: comment, id_give: id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    });
}

//프로필 페이지가 다 준비가 되면 함수 실행
$(document).ready(function () {
    show_comment();
    // window.location.search로 url의 파라미터값을 가져온다.
    // URLSearchParams() 객체는 url 쿼리 문자열 작업을 할 수 있는 메서드를 제공한다.
    // get메서드를 이용해서 해당 파라미터의 value값을 가져온다
    const query = window.location.search;
    const param = new URLSearchParams(query);
    const id = param.get('id');

    $.ajax({
        // url에 파라미터값을 직접 넣어 팀원정보 요청시 필요한 id를 서버에 넘겨준다.
        type: "GET",
        url: "/profile-get?id_give=" + id,
        data: {},
        success: function (response) {
            const member = response["member"];

            const name = member["name"];
            const image = member["image"];
            const yourself = member["yourself"];
            const strong = member["strong"];
            const style = member["style"];
            const goals = member["goals"];
            const appointment = member["appointment"];
            const id = member["id"];

            const temp_html = `<div class="profile"></div>
                        <h1 class="main" value="${id}">${name}</h1>
                        <p class="sub">${yourself}</p>
                        <p class="userText">${strong}</p>
                        <p class="userText">${style}</p>
                        <p class="userText">${goals}</p>
                        <p class="userText">${appointment}</p>
                        <button onclick="open_comment()" type="button">방명록 남기기</button>`

            $(".wrap").append(temp_html);
            $(".profile").css("background-image", `url("${image}")`);
        }
    });

    $(".save_button").click(function () {
        const name = $("#name").val();
        const comment = $("#comment").val();
        const id = $(".main").attr("value");

        $.ajax({
            type: "POST",
            url: "/guestbook",
            data: {id_give: id, name_give: name, comment_give: comment},
            success: function (response) {
                alert(response["msg"]);
                window.location.reload();
            }
        });
    });
});