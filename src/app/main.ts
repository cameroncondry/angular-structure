
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";

const bootstrap = platformBrowserDynamic().bootstrapModule(AppModule);

bootstrap.then(success => console.log('Application Loaded!'));
