import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Главная',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'пациенты',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Профиль',
    path: '/dashboard/profile',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Профиль врача',
    path: '/dashboard/doctor',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Мои визиты',
    path: '/dashboard/appointments',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Записаться',
    path: '/dashboard/appointment',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon(personAddFill)
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
