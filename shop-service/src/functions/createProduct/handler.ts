import "source-map-support/register";
import { buildResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import * as productService from "../../services/product";
import ServerlessClient from "serverless-postgres";
import { connectionOptions } from "../../db/db";
import { isValid } from "src/utils/validators";

import { ERROR_MESSAGES } from "../../utils/constants/error-messages";
import { STATUS_CODES } from "../../utils/constants/status-codes";

export const createProduct = async (event): Promise<APIGatewayProxyResult> => {
  let isConnected = false;
  console.log(isValid(event.body))

  if (!isValid(event.body)) {
    console.log(event.body)
    return buildResponse(STATUS_CODES.BAD_REQUEST, {
      message: ERROR_MESSAGES.BAD_REQUEST,
    });
  }

  const client = new ServerlessClient(connectionOptions);

  try {

    await client.connect();

    isConnected = true;

    const product = await productService.add(client, event.body);

    if (product) {
      return buildResponse(STATUS_CODES.OK, {
        ...product,
      });
    }
  } catch (e) {
    console.error(e);
    return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  } finally {
    if (isConnected) await client.end();
  }
};

export const main = middyfy(createProduct);
