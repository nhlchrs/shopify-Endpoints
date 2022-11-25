import { config } from 'dotenv';
import Shopify from 'shopify-api-node';
config({ path: `.env.development.local` });
// config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { API_KEY, HOST_SCHEME, HOST, API_SECRET_KEY, SHOPIFY_PASSWORD, SHOPIFY_SHOP_NAME, NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;

export const shopify = new Shopify({
    shopName: SHOPIFY_SHOP_NAME,
    apiKey: API_KEY,
    password: API_SECRET_KEY
});