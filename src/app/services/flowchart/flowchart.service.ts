
import {Injectable, OnInit} from "@angular/core";
import FlowchartConstants from "./flowchart.constants";

@Injectable()

export class FlowchartService implements OnInit {
    private options: { [property: string]: any } = {
        settings: null
    };

    ngOnInit(): void {
        this.options.actions = {...FlowchartConstants.ACTION};
    }
}
