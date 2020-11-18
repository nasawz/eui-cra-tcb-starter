import { EuiPinnableListGroupItemProps } from '@elastic/eui';

export const NavLinks: EuiPinnableListGroupItemProps[] = [
  {
    label: '列表',
    href: '/#/ext/list',
    iconType: 'tableDensityNormal',
  },
  {
    label: '表单',
    href: '/#/ext/form',
    iconType: 'documentEdit',
  },
  {
    label: '云函数',
    href: '/#/ext/scf',
    iconType: 'node',
  },
];

export const TopLinks: EuiPinnableListGroupItemProps[] = [
  {
    label: '首页',
    iconType: 'home',
    isActive: true,
    'aria-current': true,
    pinnable: false,
    href: '/#/ext',
  },
];
