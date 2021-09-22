

// import ServerlessClient from 'serverless-postgres';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

export const connectionOptions = {
    host: PG_HOST,
    port: Number(PG_PORT),
    user: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
};