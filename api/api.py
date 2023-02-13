from flask import Flask, request
from flask_cors import CORS
from flask import render_template
from modules.profiler import ProfilerObj

profiler = ProfilerObj()

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/scantext/', methods=['POST'])
def scan_data():
    text = request.json["text"]
    output = profiler.scan_text(text)
    return output