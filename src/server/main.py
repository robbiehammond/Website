from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
players = {}
playersIDsToSockets = {} 
nextID = 0

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

class Socket:
    def __init__(self, sid):
        self.sid = sid
        self.connected = True

    def emit(self, event, data):
        socketio.emit(event, data, room=self.id)

    def getSocketID(self):
        return self.sid



def handleMovementMsg(data):
    if data['direction'] == 'up':
        print(str(data['y']) + " "  + str(data['velY']))
        newY = int(data['y']) -  int(data['velY'])
        socketio.emit('movementConfirm', { 'x': data['x'], 'y': newY})


def handleEnterMsg(data):
    global nextID
    global playersIDsToSockets
    print(playersIDsToSockets)
    players[nextID] = { 'x': 100, 'y': 100 }
    socketio.emit('enterConfirm', { 'yourID': nextID, 'entityData': players})
    nextID += 1

@socketio.on('json')
def handleMessage(msg):
    global nextID
    print(msg)
    if msg['type'] == 'movement':
        handleMovementMsg(msg['data'])
    elif msg['type'] == 'enter':
        playersIDsToSockets[nextID] = Socket(request.sid) #link to player to their socket
        handleEnterMsg(msg['data'])


#If you leave, find your connection, delete it 
@socketio.on('disconnect')
def onDisconnect():
    print(len(playersIDsToSockets))
    for entry in playersIDsToSockets.items():
        print(entry) #only printing once, so it's probably working? Should definitely test more
        sid = entry[1].getSocketID()
        if sid == request.sid:
            del playersIDsToSockets[entry[0]]
            break


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port='8000')


#TODO: Remember which client is which (prolly map socket to ID). 
#This way, messages don't always have to be broadcasted to everyone
#Not really needed for now, though
