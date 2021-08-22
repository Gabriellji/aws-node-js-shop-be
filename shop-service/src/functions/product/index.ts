//import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const getProductsById = {
  handler: `${handlerPath(__dirname)}/handler.getById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'product/{id}',
        // request: {
        //   schema: {
        //     'application/json': schema
        //   }
        // }
      }
    }
  ]
}