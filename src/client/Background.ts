import { Application, Container, Graphics, Sprite } from 'pixi.js';
import { Circle, Color } from './circle';
import { Connector } from './connection/Connector';
import ws from './connection/socketConfig';
import { Player } from './Player';
import { getRandomValue } from './Utils/utils';

export class Background extends Container {
    app: Application;
    objects: Map<number, Circle>;
    sprite: Graphics;
    connector: Connector = Connector.getInstance();
    entered: boolean = false;
    ID: number = -1; //for unassigned

    constructor(app: Application) {
        super();
        this.app = app;
        this.objects = new Map<number, Circle>();
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

    addCircle(ID: number, posX: number, posY: number, velX: number, velY: number) {
        let relativeX = posX / window.innerWidth;
        let relativeY = posY / window.innerHeight;
        let color = getRandomValue(Color)
        let circle = null;
        if (ID == this.ID) {
            circle = new Player(this.app, ID)
        }
        else {
            circle = new Circle(this.app, posX, posY, velX, velY, color);
        }
        //this.objects.push(circle)
        this.addChild(circle)
    }

    update(_: any, delta: number) {
        //Note: this one is only called at the beginning of connection.
        if (!this.entered) {
            this.connector.ws.on('enterConfirm', (e: any) => {
                console.log(e)
                this.ID = parseInt(e.yourID);
                let data: any = e.entityData;
                for (const entity in data) {
                    let entityX = data[entity].x;
                    let entityY = data[entity].y;
                    this.addCircle(parseInt(entity), entityX, entityY, 0, 0);
                }
                this.entered = true;
            });
        }

        //on('movement' msg next)
        //on data, loop through all circles, update accordingly
    }
}
