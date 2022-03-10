import { Application, Container, Graphics, Sprite } from 'pixi.js';
import { getRandomValue } from './Utils/utils';

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
export class Circle extends Container {
    app: Application;
    sprite: Graphics;
    state: { 
        position: { x: number, y: number}, 
        velocity: { x: number; y: number } 
    };

    //Note: could add the color into the constructor
    constructor(app: Application, posX: number, posY: number, velX: number, velY: number, color: Color) {
        super();
        this.app = app;
        this.state = { 
            position: {x: posX, y: posY }, 
            velocity: {x: velX, y: velY } 
        };
        this.update = this.update.bind(this);

        this.sprite = new Graphics();
        this.sprite.beginFill(getRandomValue(Color));
        this.sprite.drawCircle(0, 0, 20);
        this.sprite.endFill();
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.width = 20;
        this.sprite.height = 20;
        this.addChild(this.sprite);

        // Handle window resizing
        window.addEventListener('resize', (e) => {
            this.sprite.x = window.innerWidth / 20 - this.sprite.width / 20;
            this.sprite.y = window.innerHeight / 20 - this.sprite.height / 20;
        });

    }

    update(_: any, delta: number) {
        
    }
}
