import dotenv from "dotenv";
import "reflect-metadata";
import { App } from "./app";

dotenv.config();

let appInstance: any;

async function startApp() {
  if (!appInstance) {
    const uniconApp = new App();
    await uniconApp.init();
    appInstance = uniconApp.app;
  }
  return appInstance;
}

export default async function handler(req: any, res: any) {
  const app = await startApp();
  return app(req, res);
}