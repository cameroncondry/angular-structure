
import {NgModule} from "@angular/core";
import {CampaignComponent} from "./campaign.component";
import {CampaignSidebarComponent} from "./sidebar.component";
import {CampaignDetailsComponent} from "./details.component";

@NgModule({
  entryComponents: [
    CampaignComponent,
    CampaignDetailsComponent,
    CampaignSidebarComponent
  ]
})
export class CampaignModule {}
