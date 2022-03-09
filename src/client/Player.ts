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
export class Player extends Container {
    app: Application;
    sprite: Graphics;
    state: { 
        position: { x: number, y: number}, 
        velocity: { x: number; y: number } 
    };
    items = []

    //Note: could add the color into the constructor
    constructor(app: Application) {
        super();
        this.app = app;
        this.state = { 
            position: {x: 300, y: 300 }, 
            velocity: {x: 1, y: 1 } 
        };
        this.update = this.update.bind(this);

        this.sprite = new Graphics();
        this.sprite.beginFill(getRandomValue(Color));
        this.sprite.drawCircle(0, 0, 10);
        this.sprite.endFill();
        this.sprite.x = this.state.position.x;
        this.sprite.y = this.state.position.y;
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
    
        
    }
}
