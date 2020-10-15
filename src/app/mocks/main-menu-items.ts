import { IMenuItem } from '@interfaces/menu-item.interface';

export const MAIN_MENU_ITEMS: IMenuItem[] = [
  {
    routing: 'home',
    viewValue: 'home',
    iconClass: 'fa fa-home'
  },
  {
    routing: 'workflow',
    viewValue: 'workflow',
    iconClass: 'fa fa-area-chart'
  },
  {
    routing: 'users',
    viewValue: 'Portal users',
    iconClass: 'fa fa-user'
  },
  {
    routing: 'statistics',
    viewValue: 'statistics',
    iconClass: 'fa fa-line-chart'
  },
  {
    routing: 'profile',
    viewValue: 'my profile',
    iconClass: 'fa fa-cogs'
  }
];
