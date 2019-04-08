import http, { IncomingMessage, ServerResponse } from 'http';
import IoCContainer from './system/IoCContainer';
import Logger from "./system/Logger";
import {DrawLogo} from "./helpers/drawer";
import 'reflect-metadata';

class Server {

    controllers: any;
    logger: Logger;

    port = 8080;
    endpoints = {};
    config = {};

    constructor({serverConfig, controllers}) {
        this.controllers = controllers;
        this.config = serverConfig;
        this.logger = IoCContainer.getInstance(Logger, serverConfig);
        this.start();
    }

    handleRequest = async (request: IncomingMessage, response: ServerResponse) => {
        let controllerResponse;

        try {
            if (request.url && this.endpoints[request.url]) {
                const endpoint = this.endpoints[request.url];
                this.logger.debug(endpoint);

                const controllerInstance = IoCContainer.getInstance(endpoint.controller, null);
                controllerResponse = await controllerInstance[endpoint.method](request, response);
            } else {
                response.writeHead(404);
                response.end("Not Found");
            }
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(controllerResponse));
        } catch (e) {
            this.logger.debug(e);
            response.writeHead(500);
            response.end("Bad Request");
        }
    };

    mapEndpoints = () => {
        const { controllers } = IoCContainer;
        Object.values(controllers).forEach((controller: any) => {
            const basePath = controller.pathMapping;
            const paths = Reflect.getMetadata('paths', controller.prototype);
            return paths.forEach((path: any) => {
                if (!this.endpoints[basePath + path.mapping]) {

                    this.logger.debug(`Building endpoint for ${basePath}${path.mapping}`);

                    this.endpoints[basePath + path.mapping] = {
                        controller,
                        method: path.method,
                    }
                } else {
                    this.logger.debug(`${basePath}${path.mapping} already exists.`);
                    throw new Error("Duplicate Path Mappings")
                }
            });
        });
    };

    start() {
        DrawLogo(this.logger.log);
        this.mapEndpoints();
        http.createServer(this.handleRequest).listen(this.port);
        console.log('Listening on port: ', this.port);
    }
}

// const server = new Server({});

export default Server