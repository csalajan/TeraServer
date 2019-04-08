#TeraServer
A decorator based node JS web framework

##Getting Started

```typescript
import Server from 'tera-server';

const server = new Server({
    serverConfig: {},
    controllers: []
});
```

### Configurations
|Property            |values           |Description                                                             |
|--------------------|-----------------|------------------------------------------------------------------------|
|debugMode           |`true` `false`   | whether or not to display all debug messages                           |
