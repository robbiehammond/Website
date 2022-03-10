import { MessageType, Message } from './Message';
import openSocket from 'socket.io-client'
let debug: boolean = true

export class Connector {
    private static _instance: Connector;
    public ws: any;
    private constructor() {
        if (debug)
            this.ws = openSocket('ws://127.0.0.1:8000') 
        else 
            //TO IMPLEMENT: connect to actual server websocket, not locally
            ;

    }

    public send(type: MessageType, data?: any) {
        let msg: Message;
        if (data)
            msg = new Message(type, data);
        else 
            msg = new Message(type, { info: "No additional data provided"});
        this.ws.emit('json', msg);
    }

    public static on() {

    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }
}