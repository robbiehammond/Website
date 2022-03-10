from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
players = {} #links a player to their game info
playersIDsToSockets = {} #links a player to their socket info
nextID = 0

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


#This stuff needs serious refactoring. Maybe make a connection manager class?
#From the class, all info for a specific client can be fetched easily. 
#Fetching can happen through the playerID or socketID.
class Socket:
    def __init__(self, sid):
        self.sid = sid
        self.connected = True

    def emit(self, event, data):
        socketio.emit(event, data, room=self.id)

    def getSocketID(self):
        return self.sid

def removePlayer(ID):
    pass
    #remove from playersIDsToSockets and players dict.
    #without this, it'll be too easy to forget about one

#also, make this not be terrible
def handleMovementMsg(data):
    if data['direction'] == 'up':
        playerID = data['ID']
        newY = int(data['y']) -  int(data['velY'])
        players[playerID]['y'] = newY
        socketio.emit('movementConfirm', { 'x': data['x'], 'y': newY})
    elif data['direction'] == 'down':
        playerID = data['ID']
        newY = int(data['y']) + int(data['velY'])
        players[playerID]['y'] = newY
        socketio.emit('movementConfirm', { 'x': data['x'], 'y': newY})
    elif data['direction'] == 'right':
        playerID = data['ID']
        newX = int(data['x']) + int(data['velX'])
        players[playerID]['x'] = newX
        socketio.emit('movementConfirm', { 'x': newX, 'y': data['y']})
    elif data['direction'] == 'left':
        playerID = data['ID']
        newX = int(data['x']) - int(data['velX'])
        players[playerID]['x'] = newX
        socketio.emit('movementConfirm', { 'x': newX, 'y': data['y']})



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
            #del players[entry[0]] gonna leave this commented out for testing
            break


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port='8000')


