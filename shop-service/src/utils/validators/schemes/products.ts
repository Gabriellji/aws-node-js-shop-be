import { SQL_TABLES } from "../../constants/tables";

const colsProducts = SQL_TABLES.PRODUCTS.COLUMNS;

export const properties = {
  [colsProducts.TITLE]: {
    type: "string",
    minLength: 1,
    required: true,
  },
  [colsProducts.DESCRIPTION]: {
    type: "string",
    minLength: 1,
    required: true,
  },
  [colsProducts.IMAGE]: {
    type: "string",
    required: true,
  },
  [colsProducts.PRICE]: {
    type: "number",
    required: true,
  },
};


