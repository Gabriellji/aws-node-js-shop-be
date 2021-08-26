import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import products from '../../products.json';
import schema from './schema';

import { apiResponses } from '../../error-handler/api_responses';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (_event) => {
  try {
    const listOfProducts = products;
    return apiResponses._200(listOfProducts);
  } catch (err) {
    return apiResponses._500({ message: err.message });
  }

}

export const getAll = middyfy(getProductsList);