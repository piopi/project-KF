import { Router } from 'express';

/**
 * Provides services common to all API methods
 */
export default abstract class BaseRouter {
  protected router: Router;

  public constructor() {
    this.router = Router();
    this.setController();
  }

  /** Set the router callback function */
  public abstract setController(): void;

  public getRouter(): Router {
    return this.router;
  }
}
