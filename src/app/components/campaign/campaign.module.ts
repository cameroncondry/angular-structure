
import {NgModule} from "@angular/core";
import {CampaignComponent} from "./campaign.component";
import {ZoomDirective} from "../../directives/zoom.directive"

@NgModule({
  declarations: [
    CampaignComponent,
    ZoomDirective
  ]
})
export class CampaignModule {}
