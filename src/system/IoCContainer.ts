class IoCContainer {

    controllers = {};
    instances = {};

    setController(controller) {
        this.controllers[controller.name] = controller;
    }

    getInstance = (thing: any, args: any) => {
        const thingName: string = thing.name;
        if (!this.instances[thingName]) {
            this.instances[thingName] = new thing(args);
        }

        return this.instances[thingName];
        // console.log(thing.constructor.toString())
    }
}

export default new IoCContainer();