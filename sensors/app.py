import logging
from flask import Flask, request, send_file
from flask_cors import CORS


__author__ = 'bmq928'
__logger__ = logging.getLogger(__name__)


def create_app():
    import file_explorer
    import process_monitor
    import screen_shot

    app = Flask(__name__)
    CORS(app)

    @app.route('/file/structure')
    def get_file_structure():
        return file_explorer.explore(**request.args).to_dict()
    
    @app.route('/process')
    def get_process_metric():
        return process_monitor.poll()
    
    @app.route('/screenshot')
    def get_screenshot():
        resp = app.response_class(screen_shot.snapshot_tranferable_img(), mimetype='image/jpeg')
        return resp

    return app
