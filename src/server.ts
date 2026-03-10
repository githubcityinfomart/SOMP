import dotenv from 'dotenv';
import 'reflect-metadata';
import { App } from './app';
import { Config } from "./config/config";
dotenv.config();

(async function (): Promise<void> {
    try {
        const uniconApp = new App();
        const app = uniconApp.app;
        await uniconApp.init();
        const port = app.get("port") || 3000;
        app.listen(port, '0.0.0.0', () => {
            console.log("#######################################################");
            console.log("#                                                     #");
            console.log("#                                                     #");
            console.log("# Routing Extenstion ", uniconApp.jsOrTs);
            console.log("# Express server  Environment ", Config.getInstance().getEnvironment());
            console.log("# Express server listening on port %s", port);
            console.log("#                                                     #");
            console.log("#                                                     #");
            console.log("#######################################################");

        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
})();


