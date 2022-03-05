import { Application, Container, Graphics, Sprite } from 'pixi.js';
import { getRandomValue } from './Utils/utils';

enum Colors {
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
export class Circle extends Container {
    app: Application;
    sprite: Graphics;
    state: { 
        position: { x: number, y: number}, 
        velocity: { x: number; y: number } 
    };

    //Note: could add the color into the constructor
    constructor(app: Application, posX: number, posY: number, velX: number, velY: number) {
        super();
        this.app = app;
        this.state = { 
            position: {x: posX, y: posY }, 
            velocity: {x: velX, y: velY } 
        };
        this.update = this.update.bind(this);

        this.sprite = new Graphics();
        this.sprite.beginFill(getRandomValue(Colors));
        this.sprite.drawCircle(0, 0, 10);
        this.sprite.endFill();
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.addChild(this.sprite);

        // Handle window resizing
        window.addEventListener('resize', (e) => {
            this.sprite.x = window.innerWidth / 20 - this.sprite.width / 20;
            this.sprite.y = window.innerHeight / 20 - this.sprite.height / 20;
        });

        // Handle update
        app.ticker.add(this.update);
    }

    update(_: any, delta: number) {
        if (
            this.state.position.x <= 0 ||
            this.state.position.x >= window.innerWidth - this.sprite.width
        ) {
            this.state.velocity.x = -this.state.velocity.x;
        }
        if (
            this.state.position.y <= 0 ||
            this.state.position.y >= window.innerHeight - this.sprite.height
        ) {
            this.state.velocity.y = -this.state.velocity.y;
        }
        this.state.position.x += this.state.velocity.x;
        this.state.position.y += this.state.velocity.y;

        this.sprite.x = this.state.position.x;
        this.sprite.y = this.state.position.y;
    }
}
