import {NgModule} from "@angular/core";
import {FlowchartComponent} from "./flowchart.component";
import {FlowchartEditModal} from "./modals/edit.component";
import {FlowchartDeleteModal} from "./modals/delete.component";
import {FlowchartDeleteAction} from "./actions/delete.component";
import {FlowchartEditAction} from "./actions/edit.component";

@NgModule({
  entryComponents: [
    FlowchartComponent,
    FlowchartDeleteAction,
    FlowchartEditAction,
    FlowchartDeleteModal,
    FlowchartEditModal
  ]
})
export class FlowchartModule {}
