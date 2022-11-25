"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const shopify_controller_1 = tslib_1.__importDefault(require("../controllers/shopify.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const shopify_customer_dto_1 = require("../dtos/shopify-customer.dto");
class ShopifyRoute {
    constructor() {
        this.path = '/shopify';
        this.router = (0, express_1.Router)();
        this.shopifyController = new shopify_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/product-listing`, this.shopifyController.getProducts);
        this.router.post(`${this.path}/create-customer`, (0, validation_middleware_1.default)(shopify_customer_dto_1.CreateCustomerDto, 'body'), this.shopifyController.createCustomer);
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
exports.default = ShopifyRoute;
//# sourceMappingURL=shopify.route.js.map