
import {Component, NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./components/layout/layout.component";
import {CampaignComponent} from "./components/campaign/campaign.component";
import {CampaignDetailsComponent} from "./components/campaign/details.component";

export interface RouteGroup {
  group: string,
  path: string,
  component: Component
}

export const RouteGroups: RouteGroup[] = [
  {group: 'campaign', path: 'campaign', component: CampaignComponent},
  {group: 'campaign', path: 'campaign/:id', component: CampaignDetailsComponent}
];

let routes: Routes = RouteGroups.map(item => {
  return {
    component: LayoutComponent,
    data: {
      shouldDetach: true
    },
    path: item.path
  }
});

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
