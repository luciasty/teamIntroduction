//프로필 페이지가 다 준비가 되면 함수 실행
$(document).ready(function () {
    // window.location.search로 url의 파라미터값을 가져온다.
    // URLSearchParams() 객체는 url 쿼리 문자열 작업을 할 수 있는 메서드를 제공한다.
    // get메서드를 이용해서 해당 파라미터의 value값을 가져온다
    let query = window.location.search;
    let param = new URLSearchParams(query);
    let id = param.get('id');

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
                        <h1 class="main">${name}</h1>
                        <p class="sub">${yourself}</p>
                        <p class="userText">${strong}</p>
                        <p class="userText">${style}</p>
                        <p class="userText">${goals}</p>
                        <p class="userText">${appointment}</p>`

            $(".wrap").append(temp_html);
            $(".profile").css("background-image", `url("${image}")`);
        }


    });

});