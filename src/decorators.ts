import { 
  EasyClassDecorator,
  EasyMethodDecorator,
  EasyParameterDecorator,
  EasyPropertyDecorator
} from '@muryllo/easy-decorators';

export const WebSockGateway       = (address: string) => EasyClassDecorator('ws:controller', {address});
export const WebSockEvent         = (event: string) => EasyMethodDecorator('ws:events', {event});
export const WebSockClient        = () => EasyParameterDecorator('ws:clients', {});
export const WebSockInjectClient  = () => EasyPropertyDecorator('ws:clients:inject', {});
export const WebSockData          = () => EasyParameterDecorator('ws:datas', {});
export const WebSockConnected     = () => EasyMethodDecorator('ws:connected', {});
export const WebSockDisconnected  = () => EasyMethodDecorator('ws:disconnected', {});
export const WebSockError         = () => EasyMethodDecorator('ws:error', {});
export const WebSockException     = () => EasyMethodDecorator('ws:exception', {});

