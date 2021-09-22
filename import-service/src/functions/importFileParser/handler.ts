import "source-map-support/register";

import { S3, SQS } from 'aws-sdk';

import { middyfy } from "@libs/lambda";
import { APIGatewayProxyResult } from "aws-lambda";
import { buildResponse } from "@libs/apiGateway";

import { STATUS_CODES } from "src/utils/constants/status-codes";
import { ERROR_MESSAGES } from "src/utils/constants/error-messages";


import csv  from "csv-parser";
import stream from 'stream';
import util from 'util';

const finished = util.promisify(stream.finished);

const { BUCKET } = process.env;

const s3 = new S3({ region: 'eu-west-1' });
const sqs = new SQS();

export const importFileParser = async (event) => {
  event.Records.forEach(async (record) => {
      const results = [];        
      const s3Stream = s3.getObject({
          Bucket: BUCKET,
          Key: record.s3.object.key
      }).createReadStream();

      await finished(
          s3Stream.pipe(csv())
              .on('data', (data) => {

                  results.push(data);
              })
              .on('end', async () => {
                  //logger.log(`Copy from ${BUCKET}/${record.s3.object.key}`);

                  await s3.copyObject({
                      Bucket: BUCKET,
                      CopySource: `${BUCKET}/${record.s3.object.key}`,
                      Key: record.s3.object.key.replace('uploaded', 'parsed')
                  }).promise();

                  //logger.log(`Copied into ${BUCKET}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
              })
      )

      results.map(item => {
          sqs.sendMessage({
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(item),
          }, (error, data) => {
            if (error) {
              //logger.log(`Error for send to SQS: ${error}`);
            } else {
              //logger.log(`Message was sent to SQS: ${data}`);
            }
          })
        })
  });
}


// const import = async (event): Promise<APIGatewayProxyResult> => {
//     try {
//       const catalogName = event.queryStringParameters.name;
//       const catalogPath = `uploaded/${catalogName}`;

//       const params = {
//         Bucket: BUCKET,
//         Key: catalogPath,
//         Expires: 60,
//         ContentType: "text/csv",
//       };

//       const url = await s3.getSignedUrlPromise("putObject", params);

//       return buildResponse(STATUS_CODES.OK, {
//         url,
//       });
//     } catch (error) {
//       return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
//         message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
//       });
//     }
//   };

export const main = middyfy(importFileParser);
