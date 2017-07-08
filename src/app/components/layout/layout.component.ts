
import {Component} from "@angular/core";
import {RouteGroup, RouteGroups} from "../../app.routing";
import {CampaignSidebarComponent} from "../campaign/sidebar.component";

interface OverviewGroup {
  group: string[],
  component: Component
}

export const OverviewGroups: OverviewGroup[] = [
  {group: ['campaign'], component: CampaignSidebarComponent}
];

@Component({})
export class LayoutComponent {
  public routeGroups: RouteGroup[] = RouteGroups;
}
