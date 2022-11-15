from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://test:sparta@cluster0.ai4u91k.mongodb.net/?retryWrites=true&w=majority")
db = client.dbsparta
app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/creat-member", methods=["POST"])
def creat_member():
    image_receive = request.form["image_give"]
    name_receive = request.form["name_give"]
    yourself_receive = request.form["yourself_give"]
    strong_receive = request.form["strong_give"]
    goals_receive = request.form["goals_give"]
    appointment_receive = request.form["appointment_give"]
    sns_receive = request.form["sns_give"]

    doc = {
        "image": image_receive,
        "name": name_receive,
        "yourself": yourself_receive,
        "strong": strong_receive,
        "goals": goals_receive,
        "appointment": appointment_receive,
        "sns": sns_receive
    }

    db.members.insert_one(doc)
    return jsonify({"msg": "추가 완료!"})


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
