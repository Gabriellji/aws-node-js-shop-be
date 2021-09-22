import type { AWS } from "@serverless/typescript";

import { importProductsFile, importFileParser } from "./src/functions";

const serverlessConfiguration: AWS = {
  service: "import-service",
  useDotenv: true,
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "s3:ListBucket",
        Resource: ["arn:aws:s3:::none-in-aws-s3"],
      },
      {
        Effect: "Allow",
        Action: "s3:*",
        Resource: ["arn:aws:s3:::none-in-aws-s3/*"],
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      BUCKET: '${env:BUCKET}',
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },
};

module.exports = serverlessConfiguration;
