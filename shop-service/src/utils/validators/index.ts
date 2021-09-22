import { properties } from "./schemes/products";
import { IProduct } from "src/types/product";

const { isString } = require("lodash");

export const isValidUUID = (uuid) =>
  isString(uuid) &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    uuid
  );

export const isValid = (body: IProduct) => {
  for (let [key, validationProps] of Object.entries(properties)) {
    const { type, required } = validationProps;
    const incomingValue = body[key];
    if (!incomingValue) {
      if (required) {
        return false;
      } else {
        continue;
      }
    }
    if (typeof incomingValue !== type) {
        return false;
    }
  }
  return true;
};
