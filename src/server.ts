import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import ShopifyRoute from './routes/shopify.route';

validateEnv();

const app = new App([new IndexRoute(), new ShopifyRoute()]);

app.listen();
