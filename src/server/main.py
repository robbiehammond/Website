from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
counter = 0
placements = []


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


def handlePlace(data):
    global counter
    entry = {
        'id': counter,
        'color': data['color'],
        'relX': data['relX'],
        'relY': data['relY']
    }
    placements.append(entry)
    print(placements)
    counter += 1


@socketio.on('json')
def handleMessage(json):
    if json['command'] == 'place':
        handlePlace(json['data'])

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port='8000')