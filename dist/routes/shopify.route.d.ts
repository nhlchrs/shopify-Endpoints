import { Routes } from '../interfaces/routes.interface';
import ShopifyController from '../controllers/shopify.controller';
declare class ShopifyRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    shopifyController: ShopifyController;
    constructor();
    private initializeRoutes;
}
export default ShopifyRoute;
