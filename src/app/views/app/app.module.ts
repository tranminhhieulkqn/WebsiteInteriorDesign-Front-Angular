import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { HomeComponent } from './home/home.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BootstrapModule } from "../../components/bootstrap/bootstrap.module";
import { UiCardsContainersModule } from 'src/app/containers/ui/cards/ui.cards.containers.module';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { MomentModule } from "ngx-moment";


@NgModule({
  declarations: [BlankPageComponent, AppComponent, HomeComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LayoutContainersModule,
    SimpleNotificationsModule.forRoot(),
    BootstrapModule,
    LayoutContainersModule,
    UiCardsContainersModule,
    ComponentsCarouselModule,
    MomentModule
  ]
})
export class AppModule { }


