function hide_comment() {
    $('#guestbook_box').hide()
}

function open_comment() {
    $('#guestbook_box').show()
}

function show_comment(id) {
    $.ajax({
            type: 'GET',
            url: '/guestbooks?id_give=' + id,
            data: {},
            success: function (response) {
                let rows = response['guestbook_key']
                for (let i = 0; i < rows.length; i++) {
                    let name = rows[i]['name']
                    let comment = rows[i]['comment']
                    let comment_id = rows[i]['comment_id']
                    let temp_html = `<div class="card-header">
                                        ${name}
                                      </div>
                                      <div class="card-body">                            
                                        <p class="card-text">${comment}</p>
                                        <button onclick="delete_comment(${comment_id})" type="button" id="delete_comment" class="btn btn-dark delete_ment">삭제</button>
                                        <button onclick="modi_comment(${comment_id})" type="button" id="delete_comment" class="btn btn-dark recover">수정</button>`
                    $('#card').append(temp_html)
                }
            }
        }
    )
}

function save_comment() {
    const name = $('#name').val();
    const comment = $('#comment').val();
    const id = $(".main").attr("value");

    if (name === '' || comment === '') {
        alert('빈칸을 모두 채워주세요 T^T')
    } else {

        $.ajax({
            type: "POST",
            url: "/guestbooks",
            data: {name_give: name, comment_give: comment, id_give: id},
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
            url: "/guestbooks/delete",
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

    if (!(modi_comment === null)) {
        $.ajax({
            type: "POST",
            url: "/guestbooks/modi",
            data: {modi_give: modi_comment, comment_id_give: comment_id},
            success: function (response) {
                alert(response["msg"])
                window.location.reload()
            },
        });
    } else {
        window.location.reload()
    }
}

//프로필 페이지가 다 준비가 되면 함수 실행
$(document).ready(function () {
    // window.location.search로 url의 파라미터값을 가져온다.
    // URLSearchParams() 객체는 url 쿼리 문자열 작업을 할 수 있는 메서드를 제공한다.
    // get메서드를 이용해서 해당 파라미터의 value값을 가져온다
    const query = window.location.search;
    const param = new URLSearchParams(query);
    const id = param.get('id');
    show_comment(id);

    $.ajax({
        // url에 파라미터값을 직접 넣어 팀원정보 요청시 필요한 id를 서버에 넘겨준다.
        type: "GET",
        url: "/profiles?id_give=" + id,
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
                        <button onclick="open_comment()" type="button" class="btn btn-warning">방명록 남기기</button>`

            $(".wrap").append(temp_html);
            $(".profile").css("background-image", `url("${image}")`);
        }
    });
});