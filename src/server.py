from flask import *
import requests as netReq
import json as j

app = Flask(
        __name__,
        template_folder="templates",
        static_folder="static"
)

@app.route("/home")
@app.route("/index")
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/check")
def password():
    return render_template("testPwd.html")

@app.route("/ret", methods=["POST", "GET"]) # method for return data from the frontend to the backend
def ret():
    data = request.get_data().decode()
    print(data)
    return render_template_string('a')

app.run("10.49.229.120", 3000, debug=True)
#
#192.168.1.151
