export const apiResponses = {
  _200: (body: { [key: string]: any }) => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body, null, 2),
    };
  },
  _404: (body: { [key: string]: any }) => {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body, null, 2),
    };
  },
  _400: (body: { [key: string]: any }) => {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body, null, 2),
    };
  },
  _500: (body: { [key: string]: any }) => {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(body, null, 2),
    };
  },
};
