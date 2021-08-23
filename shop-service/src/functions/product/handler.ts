import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import products from '../../products.json';

import schema from './schema';

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { id } = event.pathParameters;
    const product = products.find(el => el.id === Number(id));
    console.log(product)
    if (!product) {
      console.log('NO PROD')
      return {
        statusCode: 404,
        body: {
          message: 'Product not found'
        }
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        product
      ),
    };
    } catch (err) {
      return {
        statusCode: 500,
        body: err.message
      }
    }
  
}

export const getById = middyfy(getProductsById);

