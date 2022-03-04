import * as PIXI from 'pixi.js';
import { Circle } from './client/circle';
import ws from './client/connection/socketConfig'


const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    //ws.emit('json', {
    //    command: 'testing',
    //    data: "this is a string, I just want to see if it will be printed"
    //});

    // Main app
    let app = new PIXI.Application({
        backgroundColor: 0xFFFFFF
    });

    // Display application properly
    document.body.style.margin = '0';
    app.renderer.view.style.position = 'absolute';
    app.renderer.view.style.display = 'block';

    app.stage.interactive = true;

    // View size = windows
    app.renderer.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', (_e) => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    // Load assets
    await load(app);
    document.body.appendChild(app.view);

    // Set scene
    //app.stage.on(
    //    'pointerdown', (event: any) => {
    //        let pos = event.data.global;
    //        app.stage.addChild(app, pos.x, pos.y, 4,2);
    //    }
    //)
    app.stage.addChild(new Circle(app, 100, 100, 2, 5));
};



main();

//TODO: Create a container for the background that listens for clicks. On a click, spawn a circle in the click location,
//going at a random velocity for now.
