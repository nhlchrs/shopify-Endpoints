import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ShopifyController from '@/controllers/shopify.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateCustomerDto } from '@/dtos/shopify-customer.dto';

class ShopifyRoute implements Routes {
    public path = '/shopify';
    public router = Router();
    public shopifyController = new ShopifyController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/product-listing`, this.shopifyController.getProducts);
        this.router.post(`${this.path}/create-customer`, validationMiddleware(CreateCustomerDto, 'body'), this.shopifyController.createCustomer);
        this.router.get(`${this.path}/collection-listing`, this.shopifyController.getCollections);
        this.router.get(`${this.path}/collection-listing/:id`, this.shopifyController.getCollectionsDetails);
        this.router.post(`${this.path}/order-creation`, this.shopifyController.orderCreation);
    }
}

export default ShopifyRoute;
