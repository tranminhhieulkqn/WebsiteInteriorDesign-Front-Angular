import { IMenuItem } from "./menu";

const data: IMenuItem[] = [
  // Home
  {
    id: 'home',
    icon: 'iconsminds-home',
    label: 'menu.app',
    to: '/app/home'
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
      icon: 'simple-icon-link',
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
  {
    id: 'pages',
    icon: 'iconsminds-digital-drawing',
    label: 'menu.pages',
    to: '/app/pages',
    subs: [{
      id: 'pages-authorization',
      label: 'menu.authorization',
      to: '/user',
      subs: [{
        icon: 'simple-icon-user-following',
        label: 'menu.login',
        to: '/user/login',
        newWindow: true
      },
      {
        icon: 'simple-icon-user-follow',
        label: 'menu.register',
        to: '/user/register',
        newWindow: true
      },
      {
        icon: 'simple-icon-user-unfollow',
        label: 'menu.forgot-password',
        to: '/user/forgot-password',
        newWindow: true
      },
      {
        icon: 'simple-icon-user-following',
        label: 'menu.reset-password',
        to: '/user/reset-password',
        newWindow: true
      }
      ]
    },
    {
      id: 'pages-product',
      label: 'menu.product',
      to: '/app/pages/product',
      subs: [{
        icon: 'simple-icon-credit-card',
        label: 'menu.data-list',
        to: '/app/pages/product/data-list'
      },
      {
        icon: 'simple-icon-list',
        label: 'menu.thumb-list',
        to: '/app/pages/product/thumb-list'
      },
      {
        icon: 'simple-icon-grid',
        label: 'menu.image-list',
        to: '/app/pages/product/image-list'
      },
      {
        icon: 'simple-icon-picture',
        label: 'menu.details',
        to: '/app/pages/product/details'
      },
      {
        icon: 'simple-icon-book-open',
        label: 'menu.details-alt',
        to: '/app/pages/product/details-alt'
      },
      ]
    },
    {
      id: 'pages-profile',
      label: 'menu.profile',
      to: '/app/pages/profile',
      subs: [{
        icon: 'simple-icon-share',
        label: 'menu.social',
        to: '/app/pages/profile/social'
      },
      {
        icon: 'simple-icon-link',
        label: 'menu.portfolio',
        to: '/app/pages/profile/portfolio'
      },

      ]
    },
    {
      id: 'pages-blog',
      label: 'menu.blog',
      to: '/app/pages/blog',
      subs: [{
        icon: 'simple-icon-share',
        label: 'menu.blog-list',
        to: '/app/pages/blog/blog-list'
      },
      {
        icon: 'simple-icon-link',
        label: 'menu.blog-detail',
        to: '/app/pages/blog/blog-detail'
      },

      ]
    },
    {
      id: 'pages-miscellaneous',
      label: 'menu.miscellaneous',
      to: '/app/pages/miscellaneous',
      subs: [{
        icon: 'simple-icon-question',
        label: 'menu.faq',
        to: '/app/pages/miscellaneous/faq'
      },
      {
        icon: 'simple-icon-graduation',
        label: 'menu.knowledge-base',
        to: '/app/pages/miscellaneous/knowledge-base'
      },

      {
        icon: 'simple-icon-diamond',
        label: 'menu.prices',
        to: '/app/pages/miscellaneous/prices'
      },
      {
        icon: 'simple-icon-magnifier',
        label: 'menu.search',
        to: '/app/pages/miscellaneous/search'
      },
      {
        icon: 'simple-icon-envelope-open',
        label: 'menu.mailing',
        to: '/app/pages/miscellaneous/mailing'
      },
      {
        icon: 'simple-icon-bag',
        label: 'menu.invoice',
        to: '/app/pages/miscellaneous/invoice'
      },

      {
        icon: 'simple-icon-exclamation',
        label: 'menu.error',
        to: '/error',
        newWindow: true
      }
      ]
    },
    ]
  },
  {
    id: 'applications',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.applications',
    to: '/app/applications',
    subs: [{
      icon: 'simple-icon-check',
      label: 'menu.todo',
      to: '/app/applications/todo'
    },
    {
      icon: 'simple-icon-calculator',
      label: 'menu.survey',
      to: '/app/applications/survey'
    },
    // {
    //   icon: 'simple-icon-calculator',
    //   label: 'menu.survey-detail',
    //   to: '/app/applications/survey-detail'
    // },
    {
      icon: 'simple-icon-bubbles',
      label: 'menu.chat',
      to: '/app/applications/chat'
    }
    ]
  },
];
export default data;
