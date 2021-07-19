import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CollapseModule, RatingModule, TabsModule, AccordionModule, BsDropdownModule, BsDatepickerModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { ComponentsPagesModule } from 'src/app/components/pages/components.pages.module';
import { ComponentsPlayerModule } from 'src/app/components/player/components.player.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';

import { ProfileUserSocialComponent } from './profile-user-social/profile-user-social.component';
import { ProfilePhotosComponent } from './profile-photos/profile-photos.component';
import { ProfileWhoToFollowComponent } from './profile-who-to-follow/profile-who-to-follow.component';
// import { ProfileRecentPostsComponent } from './profile-recent-posts/profile-recent-posts.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileGalleryComponent } from './profile-gallery/profile-gallery.component';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';
import { ProfileUserPortfolioComponent } from './profile-user-portfolio/profile-user-portfolio.component';
import { ProfileProcessComponent } from './profile-process/profile-process.component';
import { ProfilePortfolioItemsComponent } from './profile-portfolio-items/profile-portfolio-items.component';
import { BootstrapModule } from 'src/app/components/bootstrap/bootstrap.module';
import { ProfileAccountInforComponent } from './profile-account-infor/profile-account-infor.component';
import { ProfileAccountAvatarComponent } from './profile-account-avatar/profile-account-avatar.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { MomentModule } from "ngx-moment";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProfileUserSocialComponent,
    ProfilePhotosComponent,
    ProfileWhoToFollowComponent,
    // ProfileRecentPostsComponent,
    ProfilePostsComponent,
    ProfileGalleryComponent,
    ProfileFriendsComponent,
    ProfileUserPortfolioComponent,
    ProfileProcessComponent,
    ProfilePortfolioItemsComponent,
    ProfileAccountInforComponent,
    ProfileAccountAvatarComponent
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
    BsDatepickerModule.forRoot(),
    BootstrapModule,
    DropzoneModule,
    MomentModule,
    TranslateModule
  ],
  exports: [
    ProfileUserSocialComponent,
    ProfilePhotosComponent,
    ProfileWhoToFollowComponent,
    // ProfileRecentPostsComponent,
    ProfilePostsComponent,
    ProfileGalleryComponent,
    ProfileFriendsComponent,
    ProfileUserPortfolioComponent,
    ProfileProcessComponent,
    ProfilePortfolioItemsComponent,
    ProfileAccountInforComponent,
    ProfileAccountAvatarComponent
  ]
})
export class ProfileContainersModule { }
