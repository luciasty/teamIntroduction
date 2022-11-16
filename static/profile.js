function hide_comment() {
    $('#guestbook_box').hide()
    $('#card').hide()
}

function open_comment() {
    $('#guestbook_box').show()
    $('#card').show()
}

function show_comment(id) {
        console.log('1번')
    $.ajax({
        type: 'GET',
        url : '/guestbook?id_give='+id ,
        data: {},
        success: function (response) {
            console.log('2번')
            // let rows = response['guestbook_key']
            // for (let i = 0; i < rows.length; i++){
            //     let guest_name = rows[i]['name']
            //     let guest_comment = rows[i]['comment']
            //     let guest_id = rows[i]['id']

            //     console.log(guest_comment,guest_id,guest_name)

            //     let temp_html = `<div class="card-header">
            //                     ${guest_name}
            //                     </div>
            //                     <ul class="list-group list-group-flush">
            //                     <li class="list-group-item">${guest_comment}</li>
            //                     </ul> `
            //                     $('#card').append(temp_html)
            // }
            const guestbook_list = response['guestbook_key']
            console.log('3번')
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
                console.log('4번')
            } console.log('5번')
        } 
    });
}

function save_comment() {
    const name = $('#name').val();
    const comment = $('#comment').val();
    const id = $(".main").attr("value");

    if (name === '' || comment === '') {
        alert('빈칸을 모두 채워주세요 T^T')
    }
    else {

    $.ajax({
        type: "POST",
        url: "/guestbook",
        data: {name_give: name, comment_give: comment, id_give: id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
            console.log(typeof(name))
            console.log(typeof(comment))
            console.log(typeof(id))
            console.log(typeof(3))
        }
    });
} }

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
});