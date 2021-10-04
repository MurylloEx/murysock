<h1 align="center">Murysock</h1>
<p align="center">Murysock is a framework to create your own client websocket applications that interact with servers using the Event-Message architecture with few decorators.</p>

<p align="center">
  <img src="https://badgen.net/npm/v/murysock"/>
  <img src="https://badgen.net/npm/dt/murysock"/>
  <img src="https://badgen.net/npm/license/murysock"/>
  <img src="https://badgen.net/npm/types/murysock"/>
  <img src="https://badgen.net/badge/author/MurylloEx/red?icon=label"/>
</p>

## Getting started into Murysock!

<p align="justify">
To use this library you need to create a class that will be the WebSock controller and then annotate with @WebSockGateway([address]). All architecture is compatible with <a href="https://docs.nestjs.com/websockets/gateways">NestJS Websockets</a>. There's 9 decorators types in Murysock framework:

  1. ```@WebSockClient()``` 
  2. ```@WebSockConnected()```
  3. ```@WebSockGateway([address])```
  4. ```@WebSockData()```
  5. ```@WebSockDisconnected()```
  6. ```@WebSockError()```
  7. ```@WebSockEvent([eventname])```
  8. ```@WebSockException()```
  9. ```@WebSockInjectClient()```

Each event is automatically routed to its respective handler, as long as the message payload received via the websocket is in the following JSON format:

```json
{
  "event": "[event-name]",
  "data": "[event-data]"
}
```
</p>

## Installation

<p align="center">
  <img src="https://nodei.co/npm/murysock.png?downloads=true&downloadRank=true&stars=true" alt="Installation"/>
</p>

<p align="justify">You must run the following terminal command.<p>

```
npm install murysock --save
```

## How to use?


The first thing to do to create your gateway and interact with a server that supports event-driven websocket is to create a class and annotate it with ```@WebSockGateway```, then add at least one event method annotated by ```@WebSockEvent```. After create the class, you need call ```websockConnect``` to start the lifecycle of your gateway. 

In Murysock, the lifecycle of a WebSocket connection is regulated by 4 decorators, they are: ```@WebSockConnected```, ```@WebSockDisconnected```, ```@WebSockError```, ```@WebSockException```. Whenever the connection is successfully established, the method decorated with ```@WebSockConnected``` is invoked, just as when the connection is terminated the method decorated with ```@WebSockDisconnected``` is invoked. In Murysock there are 2 types of exceptions, those caused by network failures and those caused by application code failures. These are handled by methods decorated with ```@WebSockError``` and ```@WebSockException``` respectively.

To send a response in each event you can use the ```reply``` function and specify a remote event name and the data to be sent. You can call the ```reply``` function more than one time in an event.

For a more detailed overview see the example of integration below using a Gateway to receive events:
```ts
import { 
  reply, 
  websockConnect, 
  WebSocket,
  WebSockClient, 
  WebSockConnected, 
  WebSockGateway, 
  WebSockData, 
  WebSockDisconnected, 
  WebSockError, 
  WebSockEvent, 
  WebSockException, 
  WebSockInjectClient 
} from 'murysock';

@WebSockGateway('ws://localhost')
export class Gateway {

  @WebSockInjectClient()
  public clientSock?: WebSocket;

  @WebSockEvent('message')
  async onMessage(
    @WebSockClient() client: WebSocket,
    @WebSockData() data: any)
  {
    return reply('broadcast', { hello: 'world' });
  }

  @WebSockEvent('broadcast')
  onBroadcast(
    @WebSockData() data: any)
  {
    console.log('broadcast', data)
  }

  @WebSockConnected()
  onConnect(evt: any)
  {
    console.log('connected')
  }

  @WebSockDisconnected()
  onDisconnect(evt: any)
  {
    console.log('disconnected')
  }

  @WebSockError()
  onError(error: any)
  {
    console.log('error')
  }

  @WebSockException()
  onException(exception: Error)
  {
    console.log('exception');
  }

}

websockConnect(Gateway);
```

## Metadata

Muryllo Pimenta de Oliveira – muryllo.pimenta@upe.br

Distributed under MIT license. See ``LICENSE`` for more informations.

## Contributing

1. Create a fork (<https://github.com/MurylloEx/murysock/fork>)
2. Create a feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Send a push of your commit (`git push origin feature/fooBar`)
5. Open a new Pull Request