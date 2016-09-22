export default class EventManager {

    constructor () {
        this.mlisteners = {};
    } 

    trigger (event, payload = {}) {
        if (this.mlisteners[event]) {
            this.mlisteners[event].forEach((el) => {
                el.call(this, payload);
            });            
        }
    }

    on (event, callback) {
        if (this.mlisteners[event] === undefined) {
            this.mlisteners[event] = [];
        }

        this.mlisteners[event].push(callback);
    }
}