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
    let c = Connector.getInstance()
    c.send(MessageType.test1, {info: "this is a test"});
    let i = InputHandler.getInstance();


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
    let player = new Player(app);
    app.stage.addChild(background);
    app.stage.addChild(player);

    //app.ticker.add(i.update);

    
};



main();

/*
TODO: 
    - Fix the type error thing: the incoming message is a string, should be json
    - get simple movement to work: send location update every second? On recieve, compare cur location to recieved:
        if cur location is far from recieved (much further than velocity will allow), jump them back
        if cur location is close to prev location (something that their velocity will allow), keep things the same
        -This is apparently very complex, so just consult stack overflow.


*/
