import { NextFunction, Request, Response } from 'express';
import { shopify } from '@config';
import { successResponseWithData } from '@/helper/apiResponse';



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

    //Order Creation API
    public orderCreation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let newOrder = {
                "line_items": [
                    {
                        "title": "  ",
                        "price": "20.00",
                        "quantity": 2
                    }
                ]
            };

            const order = await shopify.draftOrder.create(newOrder);
            return successResponseWithData(res, "Data Created Successfully", order);
        } catch (error) {
            next(error);
        }
    };
}

export default ShopifyController;
