import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ProfileSocialComponent } from './profile-social/profile-social.component';
import { ProfilePortfolioComponent } from './profile-portfolio/profile-portfolio.component';
import { ProfileDesignerComponent } from './profile-designer/profile-designer.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'social', pathMatch: 'full' },
      { path: 'account', component: ProfileAccountComponent },
      { path: 'social', component: ProfileSocialComponent },
      { path: 'portfolio', component: ProfilePortfolioComponent },
      { path: 'designer', component: ProfileDesignerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
