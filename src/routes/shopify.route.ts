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
        this.router.get(`${this.path}/get-customer-details`, this.shopifyController.getCustomerDetails);
        this.router.get(`${this.path}/collection-listing`, this.shopifyController.getCollections);
        this.router.get(`${this.path}/collection-listing/:id`, this.shopifyController.getCollectionsDetails);
        this.router.post(`${this.path}/order-creation`, this.shopifyController.orderCreation);
        this.router.get(`${this.path}/discount-code-details`, this.shopifyController.discountCodeDetails);
        this.router.post(`${this.path}/send-invoice-customer`, this.shopifyController.sendInvoiceToCustomer);
        this.router.post(`${this.path}/retrieve-discount-code-location`, this.shopifyController.retrieveDiscountCodeLocation);
        this.router.get(`${this.path}/retrieve-discount-code-details`, this.shopifyController.retrieveDiscountCodeDetails);
        this.router.post(`${this.path}/create-price-rule`, this.shopifyController.createPriceRuleId);
        this.router.post(`${this.path}/price-rule-details`, this.shopifyController.ApplyCouponCode);
        // this.router.post(`/webhooks/order/create`, this.shopifyController.webHooksCalls);
        // this.router.post(`/webhooks/products/create`, this.shopifyController.webHooksProductCreateCalls);
        // this.router.post(`/webhooks/order/update`, this.shopifyController.webHooksProductUpdateCalls);
    }
}

export default ShopifyRoute;
