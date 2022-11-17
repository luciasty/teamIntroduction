from flask import Flask, jsonify, render_template, request
from pymongo import MongoClient

# client = MongoClient("mongodb+srv://test:sparta@cluster0.ai4u91k.mongodb.net/?retryWrites=true&w=majority")
client = MongoClient("mongodb+srv://juho:a123456@cluster0.95gcur7.mongodb.net/test")
db = client.dbsparta
app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


# 프로필 페이지로 이동하면 profile.html을 보여준다.
@app.route("/profile")
def profile():
    return render_template("profile.html")


# 팀원 추가
# 입력받은 팀원의 정보를 추가하기 위해서 POST를 사용한다
@app.route("/members", methods=["POST"])
def create_members():
    # 데이터베이스 안에서 members안에 문서를 카운트한다
    # 문서가 비었으면 id를 초기화 한다
    if (db.members.count_documents({}) == 0):
        id = 0
    # 문서가 있다면 제일 최근 작성한 문서의 id를 받아온다.
    else:
        id = db.members.find().sort("_id", -1)[0]["id"]

    # 입력받은 값들을 받아서 변수 저장
    image_receive = request.form["image_give"]
    name_receive = request.form["name_give"]
    yourself_receive = request.form["yourself_give"]
    strong_receive = request.form["strong_give"]
    style_receive = request.form["style_give"]
    goals_receive = request.form["goals_give"]
    appointment_receive = request.form["appointment_give"]
    sns_receive = request.form["sns_give"]
    city_receive = request.form["city_give"]
    # id가 겹치지 않게 1씩 더해서 id값을 증가시킨다.
    id += 1
    cnt = 0

    # 받아온 값들을 문서로 만든다.
    doc = {
        "id": id,
        "image": image_receive,
        "name": name_receive,
        "yourself": yourself_receive,
        "strong": strong_receive,
        "style": style_receive,
        "goals": goals_receive,
        "appointment": appointment_receive,
        "sns": sns_receive,
        "viewcnt": cnt,
        "my_city": city_receive
    }

    # 작성된 문서를 데이터베이스에 밀어넣는다
    db.members.insert_one(doc)

    # 완료된 메세지를 보낸다
    return jsonify({"msg": "추가 완료!"})


# S.A에서 생각했던 API 주소대로 /members GET
@app.route("/members", methods=["GET"])
def members_get():
    # 데이터베이스에서 _id를 제외한 모든 데이터를 가지고와서 리스트로 만들어 members에 저장
    merbers = list(db.members.find({}, {"_id": False}))

    # 리턴으로 저장한 members를 넘긴다.
    return jsonify({"members": merbers})


# 프로필 페이지가 로딩되면 팀원의 정보를 가져온다.
@app.route("/profiles", methods=["GET"])
def profile_get():
    # ajax에서 url에 직접 보내준 id_give파라미터를 가져온다.
    id_receive = request.args.get('id_give')

    # 가져온 파라미터 값이 String으로 가져와진다 그렇기 때문에 데이터베이스 id와 같은 자료형으로 변환 시켜준다.
    id = int(id_receive)
    # 데이터베이스에서 _id를 제외한 id의 팀원 정보를 검색해서 가져온다.
    member = db.members.find_one({"id": id}, {"_id": False})
    cnt_receive = member["viewcnt"]
    cnt_receive += 1
    db.members.update_one({"id": id}, {"$set": {'viewcnt': cnt_receive}})

    # 리턴으로 저장한 member를 넘긴다.
    return jsonify({"member": member})


@app.route('/guestbooks', methods=['GET'])
def guestbook_get():
    id_receive = request.args.get('id_give')
    id = int(id_receive)
    guestbook_list = list(db.guestbook.find({"id": id}, {'_id': False}))
    return jsonify({'guestbook_key': guestbook_list})


@app.route('/guestbooks', methods=['POST'])
def guestbook_post():
    if (db.guestbook.count_documents({}) == 0):
        comment_id = 0
    # 문서가 있다면 제일 최근 작성한 문서의 id를 받아온다.
    else:
        comment_id = db.guestbook.find().sort("_id", -1)[0]["comment_id"]


    id_receive = request.form["id_give"]
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']
    comment_id += 1
    id = int(id_receive)

    doc = {
        "comment_id": comment_id,
        "id": id,
        'name': name_receive,
        'comment': comment_receive,
    }
    db.guestbook.insert_one(doc)
    return jsonify({'msg': '방명록 남기기 완료!'})


@app.route('/guestbooks/delete', methods=['POST'])
def guestbook_delete():
    comment_id_receive = request.form['comment_id_give']
    db.guestbook.delete_one({'comment_id': int(comment_id_receive)})
    return jsonify({'msg': '삭제되었습니다.'})


@app.route('/guestbooks/modi', methods=['POST'])
def guestbook_modi():
    modi_receive = request.form['modi_give']
    comment_id_receive = request.form['comment_id_give']
    db.guestbook.update_one({'comment_id': int(comment_id_receive)}, {'$set': {'comment': modi_receive}})
    return jsonify({'msg': '수정되었습니다.'})













@app.route('/mainbook', methods=['GET'])
def mainbook_get():
    # id_receive = request.args.get('id_give')
    # id = int(id_receive)
    mainbook_list = list(db.mainbook.find({}, {'_id': False}))
    return jsonify({'mainbook_key': mainbook_list})


@app.route('/mainbook', methods=['POST'])
def mainbook_post():
    if (db.mainbook.count_documents({}) == 0):
        comment_id = 0
    # 문서가 있다면 제일 최근 작성한 문서의 id를 받아온다.
    else:
        comment_id = db.mainbook.find().sort("_id", -1)[0]["comment_id"]
        comment_id += 1
    name_receive = request.form['name_give']
    comment_receive = request.form['comment_give']

    doc = {
        "comment_id": comment_id,
        'name': name_receive,
        'comment': comment_receive,
    }
    db.mainbook.insert_one(doc)
    return jsonify({'msg': '방명록 남기기 완료!'})


@app.route('/mainbook/delete', methods=['POST'])
def mainbook_delete():
    comment_id_receive = request.form['comment_id_give']
    db.mainbook.delete_one({'comment_id': int(comment_id_receive)})
    return jsonify({'msg': '삭제되었습니다.'})


@app.route('/mainbook/modi', methods=['POST'])
def mainbook_modi():
    modi_receive = request.form['modi_give']
    comment_id_receive = request.form['comment_id_give']
    db.mainbook.update_one({'comment_id': int(comment_id_receive)}, {'$set': {'comment': modi_receive}})
    return jsonify({'msg': '수정되었습니다.'})

if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
