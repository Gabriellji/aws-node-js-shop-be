export const SQL_TABLES = {
    PRODUCTS: {
        NAME: 'products',
        COLUMNS: {
            ID: 'id',
            TITLE: 'title',
            DESCRIPTION: 'description',
            IMAGE: 'image',
            PRICE: 'price',
        },
    },
    STOCKS: {
        NAME: 'stocks',
        COLUMNS: {
            PRODUCT_ID: 'product_id',
            COUNT: 'count',
        },
    },
}