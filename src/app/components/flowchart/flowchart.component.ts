import {Component, OnInit} from '@angular/core';
import {FlowchartService} from "../../services/flowchart/flowchart.service";

@Component({
    selector: 'flowchart-component',
    templateUrl: 'flowchart.component.html'
})

export class FlowchartComponent implements OnInit {
    constructor(private flowchartService: FlowchartService) {
    }

    ngOnInit() {
    }
}
