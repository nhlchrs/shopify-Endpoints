"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    customer_id: {
        type: Number,
        required: true,
        unique: true,
    }
});
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=users.model.js.map