from flask import *
import json as j
import random
from socket import gethostname, gethostbyname
from databaseHandler import handler

handle = handler.handler() # create var handle; initialise handle as handler() class
global cpus; cpus = handle.query("", None) # create global var cpus; query all the names of the cpus for the dropdown menu on the site.

app = Flask(
        __name__,
        template_folder="templates",
        static_folder="static"
) # default flask class

@app.route("/home")
@app.route("/index")
@app.route("/")
def index():
    return render_template("index.html", cpus=cpus) # default site index

@app.route("/randomWords") # non user route for generating the words
def randomWords():
    words = "" # empty string words
    with open("data/words.json", 'r') as f: # open words.json as f
        f = f.read()
        data = j.loads(f) # load it as python"DICT" object

        for x in range(0, 4):
            y = random.randint(0, 2465)
            if data["data"][y] not in words:
                words += data["data"][y] + ' ' # for different random words
                    
    return render_template_string(f"{words[:-1]}") # return it removing the final space

@app.route("/cpuinfo", methods=["POST", "GET"]) # route for the data on cpus
def cpuinfo():
    handle = handler.handler() # flask freaks out when handler is initialised in a different thread, so its initialised every time here.
    req = request.args.get("cpu")
    res = f"{handle.query(req, 0)}" # wrap the object in a string so flask can handle it
    
    return render_template_string(res.replace('(', '[').replace(')', ']')) # need to make the tuple safe for js consumption (replacing paranthesis with square brackets)

app.run(gethostbyname(gethostname()), 3000, debug=True)