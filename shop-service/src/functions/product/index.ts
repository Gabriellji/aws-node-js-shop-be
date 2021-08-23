//import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const getProductsById = {
  handler: `${handlerPath(__dirname)}/handler.getById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'product/{id}',
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