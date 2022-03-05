import * as PIXI from 'pixi.js';
import { Background } from './client/Background';
import { Circle } from './client/circle';
import ws from './client/connection/socketConfig'
import { getRandomNumber } from './client/Utils/utils';


const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    ws.emit('json', {
        command: 'getPlacements',
        data: ""
    });

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


    let background = new Background(app);

    app.stage.on(
        'pointerdown', (event: any) => {
            let pos = event.data.global;
            background.addCircle(pos.x, pos.y, getRandomNumber(-3,3), getRandomNumber(-3,3));
        }
    )
    app.stage.addChild(background);
};



main();

/*
TODO: 
    - Streamline messages
    - Assign a "leader". This is the one the server constantly pulls data from to update state. Maybe do it every second?
    - When a new person joins, server sends most recent info.


*/
