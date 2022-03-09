export class InputHandler {
    public static keys: any = {};
    static _instance: InputHandler;
    private constructor() {
        window.addEventListener("keydown", InputHandler.keyDown)
        window.addEventListener("keyup", InputHandler.keyUp)
    }

    public update() {
        console.log(InputHandler.keys);
    }

    public getKeysPressed()  {
        return Object.keys(InputHandler.keys)
            .filter(function(k) {return InputHandler.keys[k]})
            .map(Number)
    }

    public keyPressed(key: string) : boolean {
        if (InputHandler.keys[InputHandler.keyToCode(key)])
            return true;
        else
            return false;
    }

    public static keyToCode(key: string) : number {
        const numbericKey = parseInt(key)
        if (numbericKey != NaN && numbericKey != 0) {
            return numbericKey;
        }

        else {
            switch(key) {
                case "w":
                    return 87;
                default:
                    return -1;
            }
    }
    }

    private static keyDown(event: any) {
        InputHandler.keys[event.keyCode] = true;
    }

    private static keyUp(event: any) {
        InputHandler.keys[event.keyCode] = false;

    }

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

}