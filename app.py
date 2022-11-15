from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

client = MongoClient("mongodb+srv://test:sparta@cluster0.ai4u91k.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta
app = Flask(__name__)

@app.route("/")
def home():

    return render_template("index.html")

# 팀원 추가
# 숫자로 id를 주기 위해서 db에서 받아올 정보가 있기 때문에 GET을 사용한다
# 입력받은 팀원의 정보를 추가하기 위해서 POST를 사용한다
# methods안에는 두개를 동시에 사용할 수 있다.
@app.route("/creat-member", methods=["GET", "POST"])
def creat_member():
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
    # id가 겹치지 않게 1씩 더해서 id값을 증가시킨다.
    id += 1

    
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
        "sns": sns_receive
    }
    
    # 작성된 문서를 데이터베이스에 밀어넣는다
    db.members.insert_one(doc)

    # 완료된 메세지를 보낸다
    return jsonify({"msg": "추가 완료!"})


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)