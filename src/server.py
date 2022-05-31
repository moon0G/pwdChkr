from flask import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/password')
def password():
    return render_template('testPwd.html')


@app.route('/ret', methods=['POST', 'GET']) # method for return data from the frontend to the backend
def ret():
    data = request.get_data().decode()
    print(data)
    return render_template_string('')
    
app.run(debug=True)