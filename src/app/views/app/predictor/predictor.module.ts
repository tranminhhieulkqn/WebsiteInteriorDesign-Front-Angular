import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PredictComponent } from './predict/predict.component';
import { PredictorRoutingModule } from './predictor.routing';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { PredictorComponent } from './predictor.component';
import { TranslateModule } from '@ngx-translate/core';
import { WizardsContainersModule } from 'src/app/containers/wizard/wizards.containers.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ComponentsChartModule } from 'src/app/components/charts/components.charts.module';


@NgModule({
  declarations: [PredictorComponent, PredictComponent],
  imports: [
    CommonModule,
    FormsModule,
    PredictorRoutingModule,
    BootstrapModule,
    LayoutContainersModule,
    SimpleNotificationsModule.forRoot(),
    TranslateModule,
    DropzoneModule,
    ComponentsChartModule
  ]
})
export class PredictorModule { }
