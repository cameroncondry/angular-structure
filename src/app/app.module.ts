import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routing";
import {CampaignModule} from "./components/campaign/campaign.module";

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        CampaignModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
