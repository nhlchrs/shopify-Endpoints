"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _config_1 = require("../config");
const apiResponse_1 = require("../helper/apiResponse");
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
// import productModel from '../models/products.model';
class ShopifyController {
    constructor() {
        //Product Listing API
        this.getProducts = async (req, res, next) => {
            try {
                const product = await _config_1.shopify.product.list({ limit: 5 });
                return (0, apiResponse_1.successResponseWithData)(res, "Data Retrived Succesfully", product, product.length);
            }
            catch (error) {
                next(error);
            }
        };
        //Create customer API
        this.createCustomer = async (req, res, next) => {
            try {
                const { phone, first_name, last_name } = req.body;
                const customer = await _config_1.shopify.customer.create({ phone, first_name, last_name });
                const newUser = new users_model_1.default({
                    customer_id: customer.id
                });
                newUser.save().then(data => {
                    return (0, apiResponse_1.successResponseWithData)(res, "Data Created Successfully", data);
                }).catch(err => console.log(err));
            }
            catch (error) {
                return (0, apiResponse_1.ErrorResponse)(res, "User already Exists");
            }
        };
        //Create customer API
        this.getCustomerDetails = async (req, res, next) => {
            try {
                const { id } = req.body;
                const customer = await _config_1.shopify.customer.list();
                return (0, apiResponse_1.successResponseWithData)(res, "Data Created Successfully", customer);
            }
            catch (error) {
                next(error);
            }
        };
        //Collection Listing API
        this.getCollections = async (req, res, next) => {
            try {
                const collection = await _config_1.shopify.collectionListing.list();
                return (0, apiResponse_1.successResponseWithData)(res, "Data Retrived Successfully", collection);
            }
            catch (error) {
                next(error);
            }
        };
        // Collection Details API for Getting the product INFO.
        this.getCollectionsDetails = async (req, res, next) => {
            try {
                let collection_id = parseInt(req.params.id);
                const collection = await _config_1.shopify.collection.products(collection_id);
                return (0, apiResponse_1.successResponseWithData)(res, "Data Retrived Successfully", collection, collection.length);
            }
            catch (error) {
                next(error);
            }
        };
        //Draft Order Creation API
        this.orderCreation = async (req, res, next) => {
            try {
                const { variant_id, quantity, id, code } = req.body;
                var discount_code_details, price_rule_details, new_price_value;
                if (code) {
                    discount_code_details = await _config_1.shopify.discountCode.lookup({ code })
                        .then(data => { return data; })
                        .catch(err => {
                        return (0, apiResponse_1.ErrorResponse)(res, "Code is not valid!");
                    });
                    console.log(discount_code_details);
                    price_rule_details = await _config_1.shopify.priceRule.get(discount_code_details.price_rule_id);
                    new_price_value = price_rule_details.value.replace('-', '');
                }
                var newOrder;
                if (variant_id.length <= 1) {
                    if (!code) {
                        newOrder = {
                            "line_items": [
                                {
                                    "variant_id": variant_id[0],
                                    "quantity": quantity[0]
                                }
                            ],
                            customer: { "id": id },
                            "financial_status": "pending"
                        };
                    }
                    else {
                        newOrder = {
                            "line_items": [
                                {
                                    "variant_id": variant_id[0],
                                    "quantity": quantity[0]
                                }
                            ],
                            customer: { "id": id },
                            "applied_discount": {
                                "description": price_rule_details.title,
                                "value_type": price_rule_details.value_type,
                                "value": new_price_value,
                                "amount": new_price_value,
                                "title": price_rule_details.title
                            },
                            "financial_status": "pending"
                        };
                    }
                }
                else {
                    var data = [];
                    for (var i = 0; i < variant_id.length; i++) {
                        data.push({ variant_id: variant_id[i], quantity: quantity[i] });
                    }
                    if (!code) {
                        newOrder = {
                            "line_items": data,
                            customer: { "id": id },
                            "financial_status": "pending"
                        };
                    }
                    else {
                        newOrder = {
                            "line_items": data,
                            customer: { "id": id },
                            "applied_discount": {
                                "description": price_rule_details.title,
                                "value_type": price_rule_details.value_type,
                                "value": new_price_value,
                                "amount": new_price_value,
                                "title": price_rule_details.title
                            },
                            "financial_status": "pending"
                        };
                    }
                }
                const order = await _config_1.shopify.draftOrder.create(newOrder);
                return (0, apiResponse_1.successResponseWithData)(res, "Data Created Successfully", order);
            }
            catch (error) {
                next(error);
            }
        };
        //Discount Code Section
        this.discountCodeDetails = async (req, res, next) => {
            try {
                const order = await _config_1.shopify.discountCode.list(1060995399778);
                return (0, apiResponse_1.successResponseWithData)(res, "Data Created Successfully", order);
            }
            catch (error) {
                next(error);
            }
        };
        //Send Invoice
        this.sendInvoiceToCustomer = async (req, res, next) => {
            try {
                const { order_number } = req.body;
                const order = await _config_1.shopify.draftOrder.sendInvoice(order_number);
                return (0, apiResponse_1.successResponseWithData)(res, "Data Created Successfully", order);
            }
            catch (error) {
                next(error);
            }
        };
        //Retrived discount data
        this.retrieveDiscountCodeLocation = async (req, res, next) => {
            try {
                const { code } = req.body;
                const disount_code_details = await _config_1.shopify.discountCode.lookup({ code });
                return (0, apiResponse_1.successResponseWithData)(res, "Data Retrieved Successfully", disount_code_details);
            }
            catch (error) {
                next(error);
            }
        };
        //Retrived discount data
        this.retrieveDiscountCodeDetails = async (req, res, next) => {
            try {
                const { code } = req.body;
                // const disount_code_details = await shopify.discountCode.get(1060995399778, 14524392505442);
                const disount_code_details = await _config_1.shopify.discountCode.list(1060995399778);
                return (0, apiResponse_1.successResponseWithData)(res, "Data Retrieved Successfully", disount_code_details);
            }
            catch (error) {
                next(error);
            }
        };
        this.createPriceRuleId = async (req, res, next) => {
            try {
                const { title, target_type, target_selection, allocation_method, value_type, value, customer_selection, starts_at } = req.body;
                const price_rule_details = await _config_1.shopify.priceRule.create({
                    title,
                    target_type,
                    target_selection,
                    allocation_method,
                    value_type,
                    value,
                    customer_selection,
                    starts_at
                });
                console.log(price_rule_details);
                return (0, apiResponse_1.successResponseWithData)(res, "Data Retrieved Successfully", price_rule_details);
            }
            catch (error) {
                next(error);
            }
        };
        //Retrived discount data
        this.ApplyCouponCode = async (req, res, next) => {
            try {
                const { code } = req.body;
                const discount_code_details = await _config_1.shopify.discountCode.lookup({ code });
                const price_rule_details = await _config_1.shopify.priceRule.get(discount_code_details.price_rule_id);
                if (price_rule_details) {
                    return (0, apiResponse_1.successResponseWithData)(res, "Data Retrieved Successfully", price_rule_details);
                }
                else {
                    return (0, apiResponse_1.ErrorResponse)(res, "No Coupon code exists");
                }
            }
            catch (error) {
                next(error);
            }
        };
        // public webHooksProductUpdateCalls =  async (req: Request, res: Response, next: NextFunction) => {
        //     try {
        //         console.log("Webhook heard!",req.body,"nihal");
        // await productModel.create( (req.body ), function (err, obj) {
        //     if (err) {
        //         console.log(err.message,"Nihal Erorrr")
        //         return ErrorResponse(res, err.message);
        //     }
        //     else {
        //         console.log(obj,"Nihal Erorrr")
        //         return successResponseWithData(res, "Data Successfully Saved!",obj);
        //     }
        // });
        // await productModel.create( (req.body ), function (err, obj) {
        //     await productModel.findOneAndUpdate({ id: req.body.id }, { $set: req.body }, { returnDocument: 'after' }, (err, doc) => {
        //     if (err) {
        //         console.log(err.message,"Nihal Erorrr")
        //         return ErrorResponse(res, err.message);
        //     }
        //     else {
        //         console.log(doc,"Nihal Doc")
        //         return successResponseWithData(res, "Data Successfully Saved!",doc);
        //     }
        // });
        // Verify
        //         const timestamp = Math.floor(Date.now() / 1000)
        //         const hmac = req.header("X-Shopify-Hmac-Sha256");
        //         const topic = req.header("X-Shopify-Topic");
        //         const shop = req.header("X-Shopify-Shop-Domain");
        //         console.log(hmac,"Hmachhhh")
        //         const message = `code=202d7ddc9c72fb8622fe977e897ef3db&hmac=${hmac}&shop=${shop}&timestamp=${timestamp}`
        // const genHash = crypto.createHmac('sha256', '202d7ddc9c72fb8622fe977e897ef3db').update(JSON.stringify(req.body)).digest('base64')
        //        console.log(genHash, " genHash");
        //             const verified = verifyWebhook(message, hmac);
        //             if (!verified) {
        // // console.log(payload,"Payloadf")
        //               console.log("Failed to verify the incoming request.");
        //               res.status(401).send("Could not verify request.");
        //               return;
        //             }
        //             const data = req.body.toString();
        //             console.log(
        //               `Verified webhook request. Shop: ${shop} Topic: ${topic} \n Payload: \n ${data}`
        //             );
        //             res.status(200).send("OK");
        //           console.log('🎉 We got an order!')
        //   // We'll compare the hmac to our own hash
        //   const hmac = req.get('X-Shopify-Hmac-Sha256')
        //   console.log(hmac)
        // Use raw-body to get the body (buffer)
        //   const body = 
        // //   http.createServer(async (req, res) => {
        //    await getRawBody(req)
        //     .then((buf) => {
        //     console.log(buf,'nihalllBUfff')
        //       res.statusCode = 200;
        //       res.end(buf.length + ' bytes submitted');
        //     })
        //     .catch((err) => {
        //     console.log(err.message,"eroroororororo")
        //       res.statusCode = err.statusCode;
        //       res.end(err.message);
        //     });
        // //   });
        //   await getRawBody(req).then((buf) => {
        //     res.statusCode = 200;
        //     console.log(buf,'nihalllBUfff')
        //     res.end(buf.length + ' bytes submitted');
        //   })
        //   .catch((err) => {
        //     console.log(err.message,"eroroororororo")
        //     res.statusCode = err.statusCode;
        //     res.end(err.message);
        //   });
        //   console.log(req.body,"bodyyyy")
        // We'll compare the hmac to our own hash
        // const hmac = req.get('X-Shopify-Hmac-Sha256')
        // Use raw-body to get the body (buffer)
        // const body = await getRawBody(req.body)
        // const hash = crypto
        // .createHmac('sha256', secretKey)
        // .update(JSON.stringify(req.body))
        // .digest('base64')
        // console.log(hash,"niahihsihhhsihih")
        // console.log(hmac,"hmachmachmachmachmac")
        // if (hash === hmac) {
        // console.log('Phew, it came from Shopify!')
        // res.sendStatus(200)
        // } else {
        // console.log('Danger! Not from Shopify!')
        // res.sendStatus(403)
        // }
        // } catch (error) {
        //     next(error);
        //     }
        // };
        // public webHooksProductCreateCalls =  async (req: Request, res: Response, next: NextFunction) => {
        //     try {
        //         console.log("Webhook heard!",req.body,"nihal");
        //         await productModel.create( (req.body ), function (err, obj) {
        //             if (err) {
        //                 console.log(err.message,"Nihal Erorrr")
        //                 return ErrorResponse(res, err.message);
        //             }
        //             else {
        //                 console.log(obj,"Nihal Erorrr")
        //                 return successResponseWithData(res, "Data Successfully Saved!",obj);
        //             }
        //         });            
        // } catch (error) {
        //     next(error);
        //     }
        // };
    }
}
exports.default = ShopifyController;
//# sourceMappingURL=shopify.controller.js.map