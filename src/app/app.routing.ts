import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { PreLoginLayoutComponent } from "./layouts/prelogin-layout/prelogin-layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        // loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: PreLoginLayoutComponent,
    children: [
      {
        path: "",
        // loadChildren: './layouts/prelogin-layout/prelogin-layout.module#PreLoginLayoutModule'
        loadChildren: () =>
          import("./layouts/prelogin-layout/prelogin-layout.module").then(
            (m) => m.PreLoginLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
