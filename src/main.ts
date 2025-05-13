import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/App.module";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export const SERVER_IP: string = "http://localhost:8080/";
