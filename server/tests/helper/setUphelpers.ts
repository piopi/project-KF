import * as express from 'express';
import App from '../../src/App';

/*
 * Create an App Instance
 */
export default class SetUpHelpers {
  public static appInstance: express.Application;

  public static async getApp(): Promise<express.Application> {
    if (this.appInstance) {
      return this.appInstance;
    }
    const app: App = new App();
    this.appInstance = app.getApp();
    return this.appInstance;
  }
}
