import "source-map-support/register";

import { S3 } from 'aws-sdk';

import { middyfy } from "@libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import { buildResponse } from "@libs/apiGateway";

import { STATUS_CODES } from "src/utils/constants/status-codes";
import { ERROR_MESSAGES } from "src/utils/constants/error-messages";

const { BUCKET } = process.env;

const s3 = new S3({ region: 'eu-west-1' });

const importProductsFile = async (event): Promise<APIGatewayProxyResult> => {
    try {
      const catalogName = event.queryStringParameters.name;
      const catalogPath = `uploaded/${catalogName}`;

      const params = {
        Bucket: BUCKET,
        Key: catalogPath,
        Expires: 60,
        ContentType: "text/csv",
      };

      const url = await s3.getSignedUrlPromise("putObject", params);

      return buildResponse(STATUS_CODES.OK, {
        url,
      });
    } catch (error) {
      return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      });
    }
  };

export const main = middyfy(importProductsFile);
