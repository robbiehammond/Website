from flask import Flask, request
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import sys
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

users = [('robbie', 'testing'), ('STNLL', '12921')]
def login(json):
    p = (json['user'].lstrip(), json['pass'].lstrip())
    if p in users:
        print('good credientials')
        emit('message', {'login': 'successful', 'link': 'superHiddenFile.html'})
    else:
        print('bad credentials')
        emit('message', {'login': 'failed'})


@socketio.on('json')
def handleMsg(json):
    print(json)
    command = json['command']

    if command == 'login':
        login(json)

@socketio.event
def connect():
    print("a connection was made")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=6000)