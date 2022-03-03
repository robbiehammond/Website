import { Application, Container, Sprite } from 'pixi.js';

export class HelloWorld extends Container {
    app: Application;
    sprite: Sprite;
    state: { velocity: { x: number; y: number } };

    constructor(app: Application) {
        super();
        this.app = app;
        this.state = { velocity: { x: 10, y: 20 } };
        this.update = this.update.bind(this);

        this.sprite = new Sprite(
            app.loader.resources['assets/hello-world.png'].texture
        );
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
