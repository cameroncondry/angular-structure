import {NgModule} from "@angular/core";
import {MarketingComponent} from "./marketing.component";
import {FlowchartModule} from "../flowchart/flowchart.module";
import {EntityService} from "../../services/entity/entity.service";

@NgModule({
    imports: [
        FlowchartModule
    ],
    declarations: [
        MarketingComponent
    ],
    providers: [
        EntityService
    ]
})

export class MarketingModule {
    constructor(private entityService: EntityService) {}
}
