import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import products from '../../products.json';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { id } = event.pathParameters;
  const product = products.products.find(el => el.id === Number(id));
  return {
    statusCode: 200,
    body: JSON.stringify(
      product
    ),
  };
}

export const getById = middyfy(getProductsById);

