import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import products from '../../products.json';

import schema from './schema';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    console.log(event.headers);
    const listOfProducts = products;
    return {
      statusCode: 200,
      body: JSON.stringify(
        listOfProducts
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    }
  }

}

export const getAll = middyfy(getProductsList);