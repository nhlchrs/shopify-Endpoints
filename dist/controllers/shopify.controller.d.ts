import { NextFunction, Request, Response } from 'express';
declare class ShopifyController {
    getProducts: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default ShopifyController;
