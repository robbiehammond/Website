import { Application, Container, Graphics, Sprite } from 'pixi.js';
import { Circle } from './circle';
import { Connector } from './connection/Connector';
import { MessageType } from './connection/Message';
import { InputHandler } from './Utils/handlers/inputHandler';
import { getRandomValue } from './Utils/utils';

const bufferPeriod = 100; //time between sent inputs to server, in ms

export enum Color {
    black = 0x000000,
    red = 0xFF0000,
    green = 0x00FF00,
    blue = 0x0000FF,
    purple = 0x6A0DAD,
    pink = 0xFFC0CB,
    grey = 0x808080,
    orange = 0xFFA500,
    yellow = 0xFFFF00
}
export class Player extends Circle {
    input: InputHandler = InputHandler.getInstance();
    connector: Connector = Connector.getInstance();
    items = []
    lastMoved: number;
    ID: number
    inputBuffer: number[]; //do I actually need to store all of the last inputs in the buffer period if I'm only gonna use the most recent one? No, but keepin em for now just in case i want to change how this works.

    //Note: could add the color into the constructor
    constructor(app: Application, ID: number) {
        super(app, 100, 100, 4, 4, getRandomValue(Color));
        this.lastMoved = Date.now();
        this.update = this.update.bind(this);
        this.inputBuffer = [];
        this.ID = ID;


        // Handle update
        app.ticker.add(this.update);
    }

    buffer(keys: any) {
        for (const key in keys) {
            this.inputBuffer.push(InputHandler.keyToCode(keys[key]))
        }
    }

    clearBuffer() {
        this.inputBuffer.length = 0;
    }

    sendLastMovement() {
        if (this.inputBuffer.length > 0) {
            const key = this.inputBuffer[this.inputBuffer.length - 1];
            console.log(key);
            this.connector.send(MessageType.movement, 
                {x: this.state.position.x,  y: this.state.position.y, 
                velX: this.state.velocity.x, velY: this.state.velocity.y, 
                direction: "up"}); //make many other cases for this john

            /*
            if (key == 87)
                this.state.position.y -= this.state.velocity.y;

            else if (key == 83)
                this.state.position.y += this.state.velocity.y;

            else if (key == 68)
                this.state.position.x += this.state.velocity.x;

            else if (key == 65)
                this.state.position.x -= this.state.velocity.x;
            */

            this.sprite.x = this.state.position.x;
            this.sprite.y = this.state.position.y;
        }
        this.lastMoved = Date.now();

    }

    updateScreen(data: any) {
        this.state.position.x = data['x']
        this.state.position.y = data['y']
        this.sprite.x = this.state.position.x;
        this.sprite.y = this.state.position.y;

    }

    update(_: any, delta: number) {
        let keysPressed = this.input.getKeysPressed();
        if (Date.now() - this.lastMoved < bufferPeriod) {
            this.buffer(keysPressed);
            return;
        }
        else {
            //TODO: syncronize movement between everyone. I think 
            this.sendLastMovement();
            this.clearBuffer();
        }

        //MOVE THIS TO BACKGROUND
        this.connector.ws.on('movementConfirm', (e: any) => {
            this.updateScreen(e);
        })


    }
}
