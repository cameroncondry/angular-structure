
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app.routing";
import {CampaignModule} from "./components/campaign/campaign.module";
import {FlowchartModule} from "./components/flowchart/flowchart.module";
import {FormModule} from "./components/form/form.module";
import {CampaignBuilderService} from "./services/campaign/builder.service";
import {ComponentService} from "./services/component/component.service";
import {FormService} from "./services/form/form.service";
import {ModalService} from "./services/modal/modal.service";
import {ProcessFlowService} from "./services/data/process-flow.service";

@NgModule({
  imports: [
    AppRoutingModule,
    CampaignModule,
    FlowchartModule,
    FormModule
  ],
  providers: [
    CampaignBuilderService,
    ComponentService,
    FormService,
    ModalService,
    ProcessFlowService
  ]
})
export class AppModule {}
