import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import Calendar from '@iconify/icons-eva/calendar-outline';
import { ROLES } from '../../constants';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Главная',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
    visibleForRoles: [ROLES.DOCTOR, ROLES.PATIENT]
  },
  {
    title: 'Расписание',
    path: '/dashboard/schedule',
    icon: getIcon(Calendar),
    visibleForRoles: [ROLES.DOCTOR]
  },
  {
    title: 'Пациенты',
    path: '/dashboard/user',
    icon: getIcon(peopleFill),
    visibleForRoles: [ROLES.DOCTOR]
  },
  {
    title: 'Профиль',
    path: '/dashboard/profile',
    icon: getIcon(shoppingBagFill),
    visibleForRoles: [ROLES.PATIENT]
  },
  {
    title: 'Профиль врача',
    path: '/dashboard/doctor',
    icon: getIcon(shoppingBagFill),
    visibleForRoles: [ROLES.DOCTOR]
  },
  {
    title: 'Мои визиты',
    path: '/dashboard/appointments',
    icon: getIcon(shoppingBagFill),
    visibleForRoles: [ROLES.PATIENT]
  },
  {
    title: 'Записаться',
    path: '/dashboard/appointment',
    icon: getIcon(shoppingBagFill),
    visibleForRoles: [ROLES.PATIENT]
  },
  {
    title: 'Вход',
    path: '/login',
    icon: getIcon(lockFill),
    visibleForRoles: []
  },
  {
    title: 'Регистрация',
    path: '/register',
    icon: getIcon(personAddFill),
    visibleForRoles: []
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill),
    visibleForRoles: []
  }
];

export default sidebarConfig;
