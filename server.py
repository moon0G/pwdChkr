from flask import *
import json as j
import random
from socket import gethostname, gethostbyname
from databaseHandler import handler

handle = handler.handler()
cpus = handle.query("", 4)

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

@app.route("/randomWords")
def randomWords():
    words = ""
    with open("data/words.json", 'r') as f:
        f = f.read()
        data = j.loads(f)

        for x in range(0, 4):
            y = random.randint(0, 2465)
            if data["data"][y] not in words:
                words += data["data"][y] + ' '
                    
    return render_template_string(f"{words[:-1]}")

@app.route("/ret", methods=["POST", "GET"]) # method for return data from the frontend to the backend
def ret():
    data = request.get_data().decode()
    print(data)
    return render_template_string('Success: 200')

app.run(gethostbyname(gethostname()), 3000, debug=True)