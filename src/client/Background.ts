import { Application, Container, Graphics, Sprite } from 'pixi.js';
import { Circle, Color } from './circle';
import ws from './connection/socketConfig';
import { getRandomValue } from './Utils/utils';

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
        let relativeX = posX / window.innerWidth;
        let relativeY = posY / window.innerHeight;
        let color = getRandomValue(Color)
        ws.emit('json', {
            command: 'place',
            data: { 
                color: color,
                relX: relativeX,
                relY: relativeY
            }
        });
        let circle = new Circle(this.app, posX, posY, velX, velY, color);
        this.objects.push(circle)
        this.app.stage.addChild(circle);
    }

    update(_: any, delta: number) {
        
    }
}
