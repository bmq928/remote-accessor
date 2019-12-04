import logging
from flask import Flask, request, send_file
from flask_cors import CORS

from shares import camel

__author__ = 'bmq928'
__logger__ = logging.getLogger(__name__)


def create_app():
    import file_explorer
    import process_monitor
    import screen_shot
    import file_reader

    app = Flask(__name__)
    CORS(app)

    @app.route('/file/structure')
    @camel.to_camel
    def get_file_structure():
        return file_explorer.explore(**request.args).to_dict()

    @app.route('/file/content')
    @camel.to_camel
    def get_file_content():
        file_path = request.args.get('filePath')
        return file_reader.read_file(file_path)
    
    @app.route('/process')
    @camel.to_camel
    def get_process_metric():
        return process_monitor.poll()
    
    @app.route('/screenshot')
    def get_screenshot():
        resp = app.response_class(screen_shot.snapshot_tranferable_img(), mimetype='image/jpeg')
        return resp

    return app
