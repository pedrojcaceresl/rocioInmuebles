import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'nueva-propiedad',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
      },
    ],
    // children: [
    //   {
    //     path: 'dashboard',
    //     loadChildren: () =>
    //       import('../modules/dashboard/dashboard.module').then(
    //         (m) => m.DashboardModule
    //       ),
    //   },
    //   {
    //     path: 'apointments',
    //     loadChildren: () =>
    //       import('../modules/apointments/apointments.module').then(
    //         (m) => m.ApointmentsModule
    //       ),
    //   },
    //   {
    //     path: 'clients',
    //     loadChildren: () =>
    //       import('../modules/clients/clients.module').then(
    //         (m) => m.ClientsModule
    //       ),
    //   },
    //   {
    //     path: '**',
    //     redirectTo: 'dashboard',
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
