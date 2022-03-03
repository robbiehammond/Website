import { Application, Container, Graphics, Sprite } from 'pixi.js';

export class Circle extends Container {
    app: Application;
    sprite: Graphics;
    state: { velocity: { x: number; y: number } };

    constructor(app: Application) {
        super();
        this.app = app;
        this.state = { velocity: { x: 10, y: 20 } };
        this.update = this.update.bind(this);

        this.sprite = new Graphics();
        this.sprite.beginFill(0x000000)
        this.sprite.drawCircle(30,30,30);
        this.sprite.endFill();
        this.sprite.x = window.innerWidth / 20 - this.sprite.width / 20;
        this.sprite.y = window.innerHeight / 20 - this.sprite.height / 20;
        this.sprite.width = 300;
        this.sprite.height = 300;
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
        console.log(this.sprite.x);
        console.log(this.sprite.y);
        if (
            this.sprite.x <= 0 ||
            this.sprite.x >= window.innerWidth - this.sprite.width
        ) {
            this.state.velocity.x = -this.state.velocity.x;
        }
        if (
            this.sprite.y <= 0 ||
            this.sprite.y >= window.innerHeight - this.sprite.height
        ) {
            this.state.velocity.y = -this.state.velocity.y;
        }
        this.sprite.x += this.state.velocity.x;
        this.sprite.y += this.state.velocity.y;
    }
}
