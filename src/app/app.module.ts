
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routing";
import {MarketingModule} from "./components/marketing/marketing.module";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        MarketingModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
