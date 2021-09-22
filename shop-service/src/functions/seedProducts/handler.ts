import "source-map-support/register";

import ServerlessClient from "serverless-postgres";
import { APIGatewayProxyResult } from "aws-lambda";
import { buildResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import * as productService from "../../services/product";
import { connectionOptions } from "../../db/db";

import { ERROR_MESSAGES } from "../../utils/constants/error-messages";
import { STATUS_CODES } from "../../utils/constants/status-codes";

export const seedProducts = async (): Promise<APIGatewayProxyResult> => {
  const client = new ServerlessClient(connectionOptions);
  try {
    await client.connect();

    await productService.seedData(client);

    return buildResponse(STATUS_CODES.OK, {
      message: "Successful seed data migration",
    });
  } catch (e) {
    console.error(e);
    return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  } finally {
    await client.end();
  }
};

export const main = middyfy(seedProducts);
