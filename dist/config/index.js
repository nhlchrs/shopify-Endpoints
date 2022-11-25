"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopify = exports.ORIGIN = exports.LOG_DIR = exports.LOG_FORMAT = exports.SECRET_KEY = exports.DB_DATABASE = exports.DB_PORT = exports.DB_HOST = exports.PORT = exports.NODE_ENV = exports.SHOPIFY_SHOP_NAME = exports.SHOPIFY_PASSWORD = exports.API_SECRET_KEY = exports.HOST = exports.HOST_SCHEME = exports.API_KEY = exports.CREDENTIALS = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
const shopify_api_node_1 = tslib_1.__importDefault(require("shopify-api-node"));
(0, dotenv_1.config)({ path: `.env.development.local` });
// config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
exports.CREDENTIALS = process.env.CREDENTIALS === 'true';
_a = process.env, exports.API_KEY = _a.API_KEY, exports.HOST_SCHEME = _a.HOST_SCHEME, exports.HOST = _a.HOST, exports.API_SECRET_KEY = _a.API_SECRET_KEY, exports.SHOPIFY_PASSWORD = _a.SHOPIFY_PASSWORD, exports.SHOPIFY_SHOP_NAME = _a.SHOPIFY_SHOP_NAME, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.DB_HOST = _a.DB_HOST, exports.DB_PORT = _a.DB_PORT, exports.DB_DATABASE = _a.DB_DATABASE, exports.SECRET_KEY = _a.SECRET_KEY, exports.LOG_FORMAT = _a.LOG_FORMAT, exports.LOG_DIR = _a.LOG_DIR, exports.ORIGIN = _a.ORIGIN;
exports.shopify = new shopify_api_node_1.default({
    shopName: exports.SHOPIFY_SHOP_NAME,
    apiKey: exports.API_KEY,
    password: exports.API_SECRET_KEY
});
//# sourceMappingURL=index.js.map