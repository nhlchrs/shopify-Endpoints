"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const shopify_controller_1 = tslib_1.__importDefault(require("@/controllers/shopify.controller"));
class ShopifyRoute {
    constructor() {
        this.path = '/shopify';
        this.router = (0, express_1.Router)();
        this.shopifyController = new shopify_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/authenticate`, this.shopifyController.authenticateApp);
        this.router.get(`${this.path}/auth/shopify`, this.shopifyController.authShopify);
        this.router.get(`${this.path}/auth/shopify/callback`, this.shopifyController.authShopifyCallback);
        this.router.get(`${this.path}`, this.shopifyController.getProducts);
    }
}
exports.default = ShopifyRoute;
//# sourceMappingURL=shopify.route.js.map