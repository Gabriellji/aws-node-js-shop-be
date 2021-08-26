import { mocked } from 'ts-jest/utils';
import { Handler } from 'aws-lambda';
import products from '../products.json';

import { middyfy } from '@libs/lambda';
import { httpEventMock } from './mocks/httpEventMock';

jest.mock('@libs/lambda');

describe('getById', () => {
  let getById;
  let mockedMiddyfy: jest.MockedFunction<typeof middyfy>;

  beforeEach(async () => {
    mockedMiddyfy = mocked(middyfy);
    mockedMiddyfy.mockImplementation((handler: Handler) => {
      return handler as never;
    });

    getById = (await import('../functions/product/handler')).getById;
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should return a product with requested id', async () => {
    const event = {
        ...httpEventMock,
        pathParameters: { id: '2' },
    } as any;

    const { id } = event.pathParameters;
    const actual = await getById(event);
    const product = products.find((el) => el.id === Number(id));
    expect(actual.body).toEqual(
      JSON.stringify(product, null, 2)
    );
  });
  
});