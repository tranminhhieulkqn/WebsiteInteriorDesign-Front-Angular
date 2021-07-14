import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from "./home/home.component";
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { PredictorComponent } from './predictor/predictor.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
      { path: 'applications', loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule) },
      { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
      { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
      { path: 'menu', loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule) },
      { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
      { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
      { path: 'predictor', loadChildren: () => import('./predictor/predictor.module').then(m => m.PredictorModule) },
      { path: 'make-appointment', component: MakeAppointmentComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'blank-page', component: BlankPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
