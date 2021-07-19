import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollapseModule, RatingModule, TabsModule, AccordionModule, BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { ComponentsPlayerModule } from 'src/app/components/player/components.player.module';
import { ComponentsPagesModule } from 'src/app/components/pages/components.pages.module';
import { PostCategoriesComponent } from './post-categories/post-categories.component';
import { PostContentComponent } from './post-content/post-content.component';
import { PostSideVideoComponent } from './post-side-video/post-side-video.component';
import { ProfileRecentPostsComponent } from './profile-recent-posts/profile-recent-posts.component';
import { PostDetailInfoComponent } from './post-detail-info/post-detail-info.component';
import { PostDetailTabsComponent } from './post-detail-tabs/post-detail-tabs.component';
import { QuillModule } from 'ngx-quill';
import { MomentModule } from "ngx-moment";
import { PostRecentComponent } from './post-recent/post-recent.component';
import { PostFeaturedComponent } from './post-featured/post-featured.component';


@NgModule({
  declarations: [
    PostCategoriesComponent,
    PostContentComponent,
    PostSideVideoComponent,
    ProfileRecentPostsComponent,
    PostDetailInfoComponent,
    PostDetailTabsComponent,
    PostRecentComponent,
    PostFeaturedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CollapseModule,
    FormsModule,
    LayoutContainersModule,
    NgSelectModule,
    LightboxModule,
    ComponentsPagesModule,
    ComponentsCardsModule,
    ComponentsPlayerModule,
    RatingModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    QuillModule.forRoot(),
    MomentModule
  ],
  exports: [
    PostCategoriesComponent,
    PostContentComponent,
    PostSideVideoComponent,
    ProfileRecentPostsComponent,
    PostDetailInfoComponent,
    PostDetailTabsComponent,
    PostRecentComponent,
    PostFeaturedComponent,
  ]
})
export class PostContainersModule { }
