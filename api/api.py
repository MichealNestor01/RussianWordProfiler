from flask import Flask, request
from modules.profiler import ProfilerObj

profiler = ProfilerObj()

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "Welcome to my app"

@app.route('/scantext/', methods=['POST'])
def scan_data():
    text = request.json["text"]
    output = profiler.scan_text(text)
    return output