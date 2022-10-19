"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import Shopify, { ApiVersion } from '@shopify/shopify-api';
const shopify_api_node_1 = tslib_1.__importDefault(require("shopify-api-node"));
const _config_1 = require("@config");
// import fetch from 'node-fetch-commonjs';
const shopify = new shopify_api_node_1.default({
    shopName: _config_1.SHOPIFY_SHOP_NAME,
    apiKey: _config_1.API_KEY,
    password: _config_1.API_SECRET_KEY
});
// Shopify.Context.initialize({
//     API_KEY,
//     API_SECRET_KEY,
//     HOST_NAME: HOST.replace(/https?:\/\//, ""),
//     HOST_SCHEME,
//     SCOPES: [
//         'read_products'
//     ],
//     IS_EMBEDDED_APP: true,
//     API_VERSION: ApiVersion.October21
// });
// const ACTIVE_SHOPIFY_SHOPS = {};
class ShopifyController {
    constructor() {
        //     public authenticateApp = async (req: Request, res: Response, next: NextFunction) => {
        //         try {
        //             // const session = await Shopify.Utils.loadCurrentSession(req, res);
        //             // console.log(session, "nihalll Session")
        //             if (ACTIVE_SHOPIFY_SHOPS[SHOPIFY_SHOP_NAME] === undefined) {
        //                 res.redirect('/shopify/auth/shopify');
        //             } else {
        //                 console.log("Nihal Chaurasia")
        //                 res.send('<html><body><p>Your Node instance is running.</p></body></html>');
        //             }
        //         } catch (error) {
        //             next(error);
        //         }
        //     };
        //     public authShopify = async (req: Request, res: Response, next: NextFunction) => {
        //         try {
        //             // console.log("AUTHHHHHHHHHH", req)
        //             let authorizedRoute = await Shopify.Auth.beginAuth(
        //                 req,
        //                 res,
        //                 SHOPIFY_SHOP_NAME,
        //                 '/shopify/auth/shopify/callback',
        //                 false,
        //             );
        //             console.log(authorizedRoute, "Auttthhhooo")
        //             return res.redirect(authorizedRoute);
        //         } catch (error) {
        //             next(error);
        //         }
        //     };
        //     public authShopifyCallback = async (req: Request, res: Response, next: NextFunction) => {
        //         try {
        //             console.log("Quersyyyy", req.query)
        //             // const client_session = await Shopify.Auth.validateAuthCallback(
        //             //     req,
        //             //     res,
        //             //     req.query
        //             // );
        //             // ACTIVE_SHOPIFY_SHOPS[SHOPIFY_SHOP_NAME] = client_session.scope;
        //             // console.log(client_session.accessToken);
        //         } catch (eek) {
        //             console.error(eek);
        //             res.send('<html><body><p>${JSON.stringify(eek)}</p></body></html>')
        //         }
        //         return res.redirect('/auth/shopify/success');
        //     };
        this.getProducts = async (req, res, next) => {
            try {
                await shopify.order
                    .list({ limit: 5 })
                    .then((orders) => console.log(orders))
                    .catch((err) => console.error(err));
                // const session = await Shopify.Utils.loadCurrentSession(req, res);
                // res.status(200).json({ data: session, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = ShopifyController;
//# sourceMappingURL=shopify.controller.js.map