import { config } from 'dotenv';
import Shopify from 'shopify-api-node';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { API_KEY, HOST_SCHEME, HOST, API_SECRET_KEY, SHOPIFY_PASSWORD, SHOPIFY_SHOP_NAME, NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, STRIPE_SECRET, STRIP_COUNTRY, STRIPE_APPLICATION_FEE, STRIPE_CURRENCY, STRIPE_REFRESH_URL, STRIPE_RETURN_URL } = process.env;
export const SHOPIFY_PATH = `https://${API_KEY}:${API_SECRET_KEY}@nihal-test-endpoint.myshopify.com/admin/api/2022-01`;

export const shopify = new Shopify({
    shopName: SHOPIFY_SHOP_NAME,
    apiKey: API_KEY,
    password: API_SECRET_KEY
});