from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
players = {}
nextID = 0

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


def handleMovementMsg(data):
    if data['direction'] == 'up':
        print(str(data['y']) + " "  + str(data['velY']))
        newY = int(data['y']) -  int(data['velY'])
        socketio.emit('movementConfirm', { 'x': data['x'], 'y': newY})


def handleEnterMsg(data):
    global nextID
    players[nextID] = { 'x': 100, 'y': 100 }
    socketio.emit('enterConfirm', { 'yourID': nextID, 'entityData': players})
    nextID += 1
    print("here")

@socketio.on('json')
def handleMessage(msg):
    print(msg)
    if msg['type'] == 'movement':
        handleMovementMsg(msg['data'])
    elif msg['type'] == 'enter':
        handleEnterMsg(msg['data'])




if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port='8000')


#TODO: Remember which client is which (prolly map socket to ID). 
#This way, messages don't always have to be broadcasted to everyone
#Not really needed for now, though
