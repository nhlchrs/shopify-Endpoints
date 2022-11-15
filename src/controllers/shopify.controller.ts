import { NextFunction, Request, Response } from 'express';
import { shopify } from '@config';
import { ErrorResponse, successResponseWithData } from '@/helper/apiResponse';



class ShopifyController {

    //Product Listing API
    public getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = await shopify.product.list({ limit: 5 })
            return successResponseWithData(res, "Data Retrived Succesfully", product, product.length);
        } catch (error) {
            next(error);
        }
    };

    //Create customer API
    public createCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { phone, first_name, last_name } = req.body;
            const customer = await shopify.customer.create({ phone, first_name, last_name })
            return successResponseWithData(res, "Data Created Successfully", customer.id);
        } catch (error) {
            next(error);
        }
    };

    //Create customer API
    public getCustomerDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.body;
            const customer = await shopify.customer.list()
            return successResponseWithData(res, "Data Created Successfully", customer);
        } catch (error) {
            next(error);
        }
    };

    //Collection Listing API
    public getCollections = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const collection = await shopify.collectionListing.list();
            return successResponseWithData(res, "Data Retrived Successfully", collection);
        } catch (error) {
            next(error);
        }
    };

    // Collection Details API for Getting the product INFO.
    public getCollectionsDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let collection_id: number = parseInt(req.params.id);
            const collection = await shopify.collection.products(collection_id);
            return successResponseWithData(res, "Data Retrived Successfully", collection, collection.length);
        } catch (error) {
            next(error);
        }
    };

    //Draft Order Creation API
    public orderCreation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { variant_id, quantity, id, code } = req.body;
            var discount_code_details, price_rule_details, new_price_value;
            if (code) {
                discount_code_details = await shopify.discountCode.lookup({ code });
                console.log(discount_code_details)
                price_rule_details = await shopify.priceRule.get(discount_code_details.price_rule_id);
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
                    }
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
                    }
                }
            } else {
                var data = [];
                for (var i = 0; i < variant_id.length; i++) {
                    data.push({ variant_id: variant_id[i], quantity: quantity[i] });
                }
                if (!code) {
                    newOrder = {
                        "line_items": data,
                        customer: { "id": id },
                        "financial_status": "pending"
                    }
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
                    }
                }
            }
            const order = await shopify.draftOrder.create(newOrder);
            return successResponseWithData(res, "Data Created Successfully", order);
        } catch (error) {
            next(error);
        }
    };

    //Discount Code Section
    public discountCodeDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const order = await shopify.discountCode.list(1060995399778);
            return successResponseWithData(res, "Data Created Successfully", order);
        } catch (error) {
            next(error);
        }
    };

    //Send Invoice
    public sendInvoiceToCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { order_number } = req.body;
            const order = await shopify.draftOrder.sendInvoice(order_number);
            return successResponseWithData(res, "Data Created Successfully", order);
        } catch (error) {
            next(error);
        }
    };

    //Retrived discount data
    public retrieveDiscountCodeLocation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code } = req.body;
            const disount_code_details = await shopify.discountCode.lookup({ code });
            return successResponseWithData(res, "Data Retrieved Successfully", disount_code_details);
        } catch (error) {
            next(error);
        }
    };
    //Retrived discount data
    public retrieveDiscountCodeDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code } = req.body;
            // const disount_code_details = await shopify.discountCode.get(1060995399778, 14524392505442);
            const disount_code_details = await shopify.discountCode.list(1060995399778);
            return successResponseWithData(res, "Data Retrieved Successfully", disount_code_details);
        } catch (error) {
            next(error);
        }
    };

    public createPriceRuleId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                title,
                target_type,
                target_selection,
                allocation_method,
                value_type,
                value,
                customer_selection,
                starts_at
            } = req.body;
            const price_rule_details = await shopify.priceRule.create({
                title,
                target_type,
                target_selection,
                allocation_method,
                value_type,
                value,
                customer_selection,
                starts_at
            });
            console.log(price_rule_details)
            return successResponseWithData(res, "Data Retrieved Successfully", price_rule_details);
        } catch (error) {
            next(error);
        }
    };

    //Retrived discount data
    public ApplyCouponCode = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code } = req.body;
            const discount_code_details = await shopify.discountCode.lookup({ code });
            const price_rule_details = await shopify.priceRule.get(discount_code_details.price_rule_id);
            if (price_rule_details) {
                return successResponseWithData(res, "Data Retrieved Successfully", price_rule_details);
            }
            else {
                return ErrorResponse(res, "No Coupon code exists");
            }
        } catch (error) {
            next(error);
        }
    };
}


export default ShopifyController;
