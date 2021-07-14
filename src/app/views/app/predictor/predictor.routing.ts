import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PredictComponent } from './predict/predict.component';
import { PredictorComponent } from './predictor.component';
import { ResultsManagerComponent } from './results-manager/results-manager.component';


const routes: Routes = [
  {
    path: '', component: PredictorComponent,
    children: [
      { path: '', redirectTo: 'predict', pathMatch: 'full' },
      { path: 'predict', component: PredictComponent },
      { path: 'results-manager', component: ResultsManagerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictorRoutingModule { }
