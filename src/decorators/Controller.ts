import 'reflect-metadata';
import IoCContainer from '../system/IoCContainer';

const Controller = (target: any) => {
    IoCContainer.setController(target);
};

export default Controller;