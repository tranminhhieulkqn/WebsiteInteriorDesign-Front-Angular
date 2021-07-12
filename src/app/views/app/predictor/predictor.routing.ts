import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PredictComponent } from './predict/predict.component';
import { PredictorComponent } from './predictor.component';


const routes: Routes = [
  {
    path: '', component: PredictorComponent,
    children: [
      { path: '', redirectTo: 'predict', pathMatch: 'full' },
      { path: 'predict', component: PredictComponent },
      // { path: 'social', component: ProfileSocialComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictorRoutingModule { }
