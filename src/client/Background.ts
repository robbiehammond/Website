import { Application, Container, Graphics, Sprite } from 'pixi.js';
import { Circle } from './circle';

export class Background extends Container {
    app: Application;
    objects: Array<Circle>;
    sprite: Graphics;

    constructor(app: Application) {
        super();
        this.app = app;
        this.objects = [];
        this.update = this.update.bind(this);
        this.sprite = new Graphics();

        this.sprite.beginFill(0xFFFFFF);
        this.sprite.drawRect(0, 0, window.innerWidth, window.innerHeight);
        this.sprite.endFill();
        this.sprite.width = window.innerWidth;
        this.sprite.height = window.innerHeight;
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.addChild(this.sprite);



        // Handle window resizing
        window.addEventListener('resize', (e) => {
            this.x = 0
            this.y = 0
        });


        // Handle update
        app.ticker.add(this.update);
    }

    addCircle(posX: number, posY: number, velX: number, velY: number) {
        let circle = new Circle(this.app, posX, posY, velX, velY);
        this.objects.push(circle)
        this.app.stage.addChild(circle);
    }

    update(_: any, delta: number) {
        
    }
}
