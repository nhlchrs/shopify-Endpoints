"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const _config_1 = require("../config");
exports.dbConnection = {
    url: `mongodb+srv://${_config_1.DB_HOST}/${_config_1.DB_DATABASE}`,
    options: {},
};
//# sourceMappingURL=index.js.map