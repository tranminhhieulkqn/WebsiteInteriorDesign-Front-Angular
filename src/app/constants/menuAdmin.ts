import { IMenuItem } from "./menu";

const data: IMenuItem[] = [
  // Home
  {
    id: 'home',
    icon: 'iconsminds-home',
    label: 'menu.app',
    to: '/app/home'
  },
  // Dashboards
  {
    id: 'dashboards',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: '/app/dashboards',
    subs:
      [{
        icon: 'simple-icon-briefcase',
        label: 'menu.default',
        to: '/app/dashboards/default'
      },
      {
        icon: 'simple-icon-pie-chart',
        label: 'menu.analytics',
        to: '/app/dashboards/analytics'
      },
      {
        icon: 'simple-icon-basket-loaded',
        label: 'menu.ecommerce',
        to: '/app/dashboards/ecommerce'
      },
      {
        icon: 'simple-icon-doc',
        label: 'menu.content',
        to: '/app/dashboards/content'
      }
      ]
  },
  // Management
  {
    id: 'management',
    icon: 'simple-icon-screen-desktop',
    label: 'menu.management',
    to: '/app/management',
    subs: [{
      icon: 'simple-icon-people',
      label: 'menu.user',
      to: '/app/management/user'
    },
    {
      icon: 'simple-icon-layers',
      label: 'menu.post',
      to: '/app/management/post'
    },
    ]
  },
  // Profile
  {
    id: 'pages-profile',
    icon: 'iconsminds-profile',
    label: 'menu.profile',
    to: '/app/profile',
    subs: [{
      icon: 'simple-icon-user',
      label: 'menu.account',
      to: '/app/profile/account'
    },
    {
      icon: 'simple-icon-share',
      label: 'menu.social',
      to: '/app/profile/social'
    },
    {
      icon: 'simple-icon-link',
      label: 'menu.portfolio',
      to: '/app/profile/portfolio'
    },
    {
      icon: 'simple-icon-people',
      label: 'menu.designer',
      to: '/app/profile/designer'
    },
    ]
  },
  // Posts
  {
    id: 'post',
    icon: 'iconsminds-newspaper',
    label: 'menu.post',
    to: '/app/post',
    subs: [{
      icon: 'simple-icon-layers',
      label: 'menu.post-list',
      to: '/app/post/post-list'
    },
    {
      icon: 'simple-icon-book-open',
      label: 'menu.post-detail',
      to: '/app/post/post-detail'
    },
    {
      icon: 'simple-icon-note',
      label: 'menu.new-post',
      to: '/app/post/post-create'
    },
    {
      icon: 'simple-icon-docs',
      label: 'menu.my-post',
      to: '/app/post/post-manage'
    },
    ]
  },
  // Predict
  {
    id: 'predictor',
    icon: 'simple-icon-magic-wand',
    label: 'menu.predictor',
    to: '/app/predictor',
    subs: [{
      icon: 'simple-icon-chart',
      label: 'menu.predict',
      to: '/app/predictor/predict'
    },
    {
      icon: 'simple-icon-briefcase',
      label: 'menu.results-manager',
      to: '/app/predictor/results-manager'
    },
    ]
  },

  {
    id: 'about-us',
    icon: 'simple-icon-people',
    label: 'menu.about-us',
    to: '/app/about-us'
  },
  {
    id: 'contact-us',
    icon: 'simple-icon-support',
    label: 'menu.contact-us',
    to: '/app/contact-us'
  },
];
export default data;
