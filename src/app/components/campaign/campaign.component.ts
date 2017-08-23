import {Component,Output,EventEmitter,Renderer2,ViewChild, OnInit} from "@angular/core";
import {ZoomDirective} from "../../directives/zoom.directive"

@Component({
    templateUrl: './campaign.component.html',
})
export class CampaignComponent{
  constructor( private renderer:Renderer2 ) {};


}
