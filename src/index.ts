import * as PIXI from 'pixi.js';
import { Background } from './client/Background';
import { Player } from './client/Player'
import ws from './client/connection/socketConfig'
import { Connector } from './client/connection/Connector';
import { MessageType } from './client/connection/Message';
import { InputHandler } from './client/Utils/handlers/inputHandler';


const load = (app: PIXI.Application) => {
    return new Promise<void>((resolve) => {
        app.loader.add('assets/hello-world.png').load(() => {
            resolve();
        });
    });
};

const main = async () => {
    //initializing stuff


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
    app.stage.addChild(background);

    //app.ticker.add(i.update);
    let c = Connector.getInstance()
    c.send(MessageType.enter, {info: "this is a test"});
    let i = InputHandler.getInstance();

    
};



main();

/*
TODO: 
    - Save sockets to created IDs on server side
    - Make mvmt messages update the players dict on the server side
    - Have circles moved by ID on mvmt messages (don't just delete and redraw)
        -means a movementConfirm needs to be written in background, and removed from player
            -have the function take an ID, which can be extrapolated from the response msg

*/
