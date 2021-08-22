import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import products from '../../products.json';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      products.products
    ),
  };
}

export const getAll = middyfy(getProductsList);