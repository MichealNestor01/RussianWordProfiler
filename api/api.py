from flask import Flask, request
from flask_cors import CORS
from flask import render_template
from modules.profiler import ProfilerObj
from flask import jsonify 
from typing import Dict, Any

profiler = ProfilerObj()

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world() -> Any:
    return render_template('index.html')

@app.route('/scantext/', methods=['POST'])
async def scan_data() -> Dict[str, Any]:
    text = request.json["text"]
    # Run the scan_text function synchronously using a worker thread
    output = await profiler.scan_text(text)
    return jsonify(output)

if __name__ =='__main__':  
    app.run(debug = True)