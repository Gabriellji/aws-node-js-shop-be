import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import { FromSchema } from "json-schema-to-ts";
import { HEADERS } from "../utils/constants/headers";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const buildResponse = (statusCode: number, response: Record<string, unknown>) => {
  return {
    statusCode,
    headers: HEADERS,
    body: JSON.stringify(response),
  }
}