from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


def handleMovementMsg(msg):
    pass


@socketio.on('json')
def handleMessage(msg):
    print(msg)
    if msg['type'] == 'movement':
        handleMovementMsg(msg)





if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port='8000')