import { exec } from './execute';
import { WebSocket } from './types';
import { getEasyMetadata } from '@muryllo/easy-decorators';

export function reply(event: string, data: any, client?: any | undefined | null){
  if (!!client)
    client.send(JSON.stringify({ event, data }));
  return { event, data };
}

export async function websockConnect(gatewayClass: new () => any): Promise<any>{
  let instance = new gatewayClass();
  const metadata = getEasyMetadata(instance);

  let datas         = metadata['ws:datas']            || [];
  let clients       = metadata['ws:clients']          || [];
  let injectedSock  = metadata['ws:clients:inject']   || [];
  let events        = metadata['ws:events']           || [];
  let connected     = metadata['ws:connected']        || [];
  let disconnected  = metadata['ws:disconnected']     || [];
  let error         = metadata['ws:error']            || [];
  let exception     = metadata['ws:exception']        || [];
  let [controller]  = metadata['ws:controller']       || [];

  return new Promise((resolve, _) => {
    try{
      let sock = new WebSocket(controller?.value?.address);

      sock.onopen  = (e: any) => connected?.map((v: any) => instance[v.key](e));
      sock.onclose = (e: any) => disconnected?.map((v: any) => instance[v.key](e));
      sock.onerror = (e: any) => error?.map((v: any) => instance[v.key](e));
  
      sock.onmessage = (message: any) => {
        try{
          let { event, data } = JSON.parse(message?.data);
          let matchEvents = events?.filter((v: any) => v?.value?.event == event);
    
          matchEvents?.map((evt: any) => {
            let evtDatas = datas?.filter((x: any) => x.key == evt.key).map((v: any) => {
              v.value = data;
              return v;
            });
    
            let evtClients = clients?.filter((x: any) => x.key == evt.key).map((v: any) => {
              v.value = sock;
              return v;
            });
            
            let args = [].concat(evtDatas).concat(evtClients);
            
            const response = exec(instance[evt.key], args);
            
            if (response instanceof Promise){
              response.then((payload) => {
                sock.send(JSON.stringify(payload));
              })
              .catch((reason: any) => {
                throw new Error(reason);
              });
            }
  
            sock.send(JSON.stringify(response));
          });
        } catch (e){
          exception?.map((v: any) => instance[v.key](e));
        }
      }

      injectedSock?.map((v: any) => instance[v.key] = sock);

      resolve(instance);
    } catch (e){
      exception?.map((v: any) => instance[v.key](e));
    }
  });
}
