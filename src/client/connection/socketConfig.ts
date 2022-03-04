import openSocket from 'socket.io-client'
let ws = openSocket('ws://18.217.140.214:8000');

const DEBUG: boolean = true;

if (DEBUG) {
    ws = openSocket('ws://127.0.0.1:8000')
}

export default ws;