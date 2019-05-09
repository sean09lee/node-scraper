import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteFormComponent } from './components/site-form/site-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
  { path: 'sites', component: SiteFormComponent },
  { path: '',
    redirectTo: '/sites',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{ enableTracing: false })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }