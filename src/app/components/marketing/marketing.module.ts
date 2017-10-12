import {NgModule} from "@angular/core";
import {MarketingComponent} from "./marketing.component";
import {FlowchartModule} from "../flowchart/flowchart.module";

@NgModule({
    imports: [
        FlowchartModule
    ],
    declarations: [
        MarketingComponent
    ]
})

export class MarketingModule {

}
