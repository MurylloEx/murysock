//Simple polyfill for Node.js/Browser.

import { WebSocket as NodeW3CWebSocket } from 'ws';

var W3CWebSocket = NodeW3CWebSocket;

if (!!WebSocket && (typeof WebSocket != 'undefined')){
  W3CWebSocket = <any>window.WebSocket;
}

export { W3CWebSocket as WebSocket };
