import {Component, NgModule, Type} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CampaignComponent} from "./components/campaign/campaign.component";

export interface RouteGroup {
    group: string,
    path: string,
    component: Type<Component>
}

export const RouteGroups: RouteGroup[] = [
    {group: 'campaign', path: '', component: CampaignComponent}
];

let routes: Routes = RouteGroups.map(item => {
    return {
        // component: LayoutComponent,
        component: item.component,
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
