class Logger {

    debugMode = false;

    constructor({ debugMode }){
        this.debugMode = debugMode;
    }

    debug(message) {
        if (this.debugMode) {
            this.log(message);
        }
    }

    log(message) {
        console.log(message);
    }
}

export default Logger;