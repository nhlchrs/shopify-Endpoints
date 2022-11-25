"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateCustomerDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerDto.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomerDto.prototype, "last_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], CreateCustomerDto.prototype, "phone", void 0);
exports.CreateCustomerDto = CreateCustomerDto;
//# sourceMappingURL=shopify-customer.dto.js.map