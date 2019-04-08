import Server from '../src/server';
import * as controllers from './controllers';

const server = new Server({
    serverConfig: {
        debugMode: true,
    },
    controllers,
});