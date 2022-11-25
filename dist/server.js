"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const index_route_1 = tslib_1.__importDefault(require("./routes/index.route"));
const validateEnv_1 = tslib_1.__importDefault(require("./utils/validateEnv"));
const shopify_route_1 = tslib_1.__importDefault(require("./routes/shopify.route"));
(0, validateEnv_1.default)();
const app = new app_1.default([new index_route_1.default(), new shopify_route_1.default()]);
app.listen();
//# sourceMappingURL=server.js.map