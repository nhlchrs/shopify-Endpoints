import { Routes } from './interfaces/routes.interface';
import express from 'express';
declare class App {
    app: express.Application;
    env: string;
    port: string | number;
    constructor(routes: Routes[]);
    listen(): void;
    getServer(): express.Application;
    private connectToDatabase;
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeSwagger;
    private initializeErrorHandling;
}
export default App;
