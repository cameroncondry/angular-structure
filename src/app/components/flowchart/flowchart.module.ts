
import {NgModule} from '@angular/core';
import {FlowchartComponent} from './flowchart.component';
import {FlowchartService} from "../../services/flowchart/flowchart.service";

@NgModule({
    declarations: [
        FlowchartComponent
    ],
    exports: [
        FlowchartComponent
    ],
    providers: [
        FlowchartService
    ]
})

export class FlowchartModule {

}
