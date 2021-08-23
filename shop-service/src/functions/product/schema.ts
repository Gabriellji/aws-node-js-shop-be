export default {
  type: "object",
  properties: {
    statusCode: {type: 'number'},
    body: {type: 'object'},
    productName: { type: 'string' },
    id: { type: 'number'}
  },
  required: ['productName', 'id']
} as const;
