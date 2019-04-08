import 'reflect-metadata';

const handleClassMapping = (mapping, target) => {
    target.pathMapping = mapping;
};

const handleMethodMapping = (mapping: string, target, key) => {
    const pathMapping = {mapping, method: key};
    let metaData = Reflect.getMetadata('paths', target);

    if (metaData) {
        metaData.push(pathMapping)
    } else {
        metaData = [pathMapping]
    }
    Reflect.defineMetadata('paths', metaData, target);
};

const RequestMapping = (mapping: string) => {
 return (target: any, key: string = 'class') => {
     if (key === 'class') {
         handleClassMapping(mapping, target);
     } else {
         handleMethodMapping(mapping, target, key)
     }
 }
};

export default RequestMapping;