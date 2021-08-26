export default {
  type: "object",
  properties: {
    statusCode: {type: 'number'},
    body: {type: 'object'},
    productName: { type: 'string' },
    id: { type: 'number'},
    message: { type: 'string'},
    errors: {type: 'any'} 
  },
  required: ['productName', 'id']
} as const;
