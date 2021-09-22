import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';
import products from '../products.json';

import { middyfy } from '@libs/lambda';

jest.mock('@libs/lambda');

describe('getAll', () => {
  let main;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    mockedMiddyfy = mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });

    main = (await import('../functions/getProductsList/handler')).getProductsList;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return array of objects', async () => {
    const event = {
      body: {
        name: 'test-name'
      }
    } as any;
    const actual = await main(event);
    expect(actual.body).toEqual(
      JSON.stringify(products, null, 2)
    );
  });
});