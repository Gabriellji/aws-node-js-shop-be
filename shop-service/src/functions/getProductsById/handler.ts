import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import * as productService from '../../services/product';
import { connectionOptions } from '../../db/db';
import ServerlessClient from 'serverless-postgres';

import { ERROR_MESSAGES } from "../../utils/constants/error-messages";
import { STATUS_CODES } from "../../utils/constants/status-codes";



export const getProductsById = async (event): Promise<APIGatewayProxyResult> => {
  const client = new ServerlessClient(connectionOptions)
  try {

    const { productId: id } = event.pathParameters;

    if (!id) {
      return buildResponse(STATUS_CODES.BAD_REQUEST, { message: ERROR_MESSAGES.BAD_REQUEST });
    }

    await client.connect();


    const product = await productService.getSingle(client, id);

    if (product) {
      return buildResponse(STATUS_CODES.OK, {
        ...product
      });
    }

    return buildResponse(STATUS_CODES.NOT_FOUND, {
      message: ERROR_MESSAGES.NOT_FOUND
    });
  } catch (e) {
    console.error(e);
    return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    });
  } finally {
    await  client.end();
  }
}

export const main = middyfy(getProductsById);
