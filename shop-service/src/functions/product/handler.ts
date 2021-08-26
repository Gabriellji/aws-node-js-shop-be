import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import products from "../../products.json";

import { apiResponses } from "../../error-handler/api_responses";

import schema from "./schema";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    try {
      const { id } = event.pathParameters;

      const product = products.find((el) => el.id === Number(id));

      if (!product) {
        return apiResponses._404({ message: "Item not found" });
      }

      return apiResponses._200(product);
    } catch (err) {
      return apiResponses._500({ message: err.message });
    }
  };

export const getById = middyfy(getProductsById);
