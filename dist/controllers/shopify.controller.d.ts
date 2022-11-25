import { NextFunction, Request, Response } from 'express';
declare class ShopifyController {
    getProducts: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    createCustomer: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    getCustomerDetails: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    getCollections: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    getCollectionsDetails: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    orderCreation: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    discountCodeDetails: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    sendInvoiceToCustomer: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    retrieveDiscountCodeLocation: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    retrieveDiscountCodeDetails: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    createPriceRuleId: (req: Request, res: Response, next: NextFunction) => Promise<any>;
    ApplyCouponCode: (req: Request, res: Response, next: NextFunction) => Promise<any>;
}
export default ShopifyController;
