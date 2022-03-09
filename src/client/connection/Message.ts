export enum MessageType {
    test1,
    test2,
    movement
}

export class Message {
    type: MessageType;
    data: any;


    public constructor(type: MessageType, data = {}) {
        this.type = type;
        this.data = data;
    }

    public toJSON() {
        return {
            type: toString(this.type),
            data: this.data
        }
    }
}

function toString(type: MessageType) {
    switch(type) {
        case MessageType.test1: {
            return "test1";
        }
        case MessageType.test2: {
            return "test2";
        }
        case MessageType.movement: {
            return "movement";
        }
        default: {
            return "This MessageType has not been implemented in the toString function."
        }
    }
}
