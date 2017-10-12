import {Injectable, OnInit} from "@angular/core";
import {FlowchartConstants} from "./flowchart.constants";

@Injectable()

export class FlowchartService implements OnInit {
    private options: { [property: string]: string } = {
        settings: null
    };

    ngOnInit(): void {
        this.options.settings = FlowchartConstants.SETTINGS;
    }
}
