import { Application, Container, Graphics, Sprite } from 'pixi.js';
import { InputHandler } from './Utils/handlers/inputHandler';
import { getRandomValue } from './Utils/utils';

const bufferPeriod = 100;

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
export class Player extends Container {
    app: Application;
    sprite: Graphics;
    input: InputHandler = InputHandler.getInstance();
    state: { 
        position: { x: number, y: number}, 
        velocity: { x: number; y: number } 
    };
    items = []
    lastMoved: number;
    inputBuffer: number[]; //do I actually need to store all of the last inputs in the buffer period if I'm only gonna use the most recent one? No, but keepin em for now just in case i want to change how this works.

    //Note: could add the color into the constructor
    constructor(app: Application) {
        super();
        this.app = app;
        this.state = { 
            position: {x: 100, y: 100 }, 
            velocity: {x: 4, y: 4 } 
        };
        this.lastMoved = Date.now();
        this.update = this.update.bind(this);
        this.inputBuffer = [];

        this.sprite = new Graphics();
        this.sprite.beginFill(getRandomValue(Color));
        this.sprite.drawCircle(0, 0, 10);
        this.sprite.endFill();
        this.sprite.x = this.state.position.x;
        this.sprite.y = this.state.position.y;
        this.sprite.width = 20;
        this.sprite.height = 20;
        this.addChild(this.sprite);

        // Handle window resizing
        window.addEventListener('resize', (e) => {
            this.sprite.x = window.innerWidth / 20 - this.sprite.width / 20;
            this.sprite.y = window.innerHeight / 20 - this.sprite.height / 20;
        });

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

    executeMovement() {
        if (this.inputBuffer.length > 0) {
            const key = this.inputBuffer[this.inputBuffer.length - 1];
            if (key == 87)
                this.state.position.y -= this.state.velocity.y;

            else if (key == 83)
                this.state.position.y += this.state.velocity.y;

            else if (key == 68)
                this.state.position.x += this.state.velocity.x;

            else if (key == 65)
                this.state.position.x -= this.state.velocity.x;





            this.sprite.x = this.state.position.x;
            this.sprite.y = this.state.position.y;
        }
        this.lastMoved = Date.now();

    }

    update(_: any, delta: number) {
        let keysPressed = this.input.getKeysPressed();
        if (Date.now() - this.lastMoved < bufferPeriod) {
            this.buffer(keysPressed);
            return;
        }
        else {
            //TODO: this will be changed. Execute movement will only happen on a confirmation msg from server. Buffer will be cleared as
            //well at this time. Basically, the "else" will become a socket.on(msg) type thing, where this happens if the 
            //msg is about me.
            this.executeMovement();
            this.clearBuffer();
        }



    }
}
