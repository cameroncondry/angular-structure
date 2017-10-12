import {Component, NgModule, Type} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MarketingComponent} from "./components/marketing/marketing.component";

export interface RouteGroup {
    group: string,
    path: string,
    component: Type<Component>
}

export const RouteGroups: RouteGroup[] = [
    {group: 'automation', path: '', component: MarketingComponent}
];

let routes: Routes = RouteGroups.map(item => {
    return {
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
