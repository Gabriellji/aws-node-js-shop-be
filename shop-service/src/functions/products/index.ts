//import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const getProductsList = {
  handler: `${handlerPath(__dirname)}/handler.getAll`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        // request: {
        //   schema: {
        //     'application/json': schema
        //   }
        // }
      }
    }
  ]
}