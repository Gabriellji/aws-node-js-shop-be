import type { AWS } from '@serverless/typescript';
import { getProductsList, getProductById, createProduct, seedProducts } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'shop-service-be',
  useDotenv: true,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: '${env:PG_HOST}',
      PG_PORT: '${env:PG_PORT}',
      PG_DATABASE: '${env:PG_DATABASE}',
      PG_USERNAME: '${env:PG_USERNAME}',
      PG_PASSWORD: '${env:PG_PASSWORD}'
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { getProductsList, getProductById, createProduct, seedProducts },
};

module.exports = serverlessConfiguration;


