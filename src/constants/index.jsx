import {
  Building2,
  Calendar,
  Earth,
  Image,
  LayoutDashboard,
  LogOut,
  NotepadText,
  PackagePlus,
  Users,
  Video,
} from 'lucide-react';
import { APP } from './AppVariables';

export const sidebarIconMap = {
  dashboard: <LayoutDashboard className="w-5 text-slate-500" />,
  calender: <Calendar className="w-5 text-slate-500" />,
  facility: <Building2 className="w-5 text-slate-500" />,
  photos: <Image className="w-5 text-slate-500" />,
  customerCare: <Users className="w-5 text-slate-500" />,
  videos: <Video className="w-5 text-slate-500" />,
  logout: <LogOut className="w-5 text-slate-500" />,
  country: <Earth className="w-5 text-slate-500" />,
};
export const sidebarMenuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    link: `${APP.ROUTE.DASHBOARD}`,
  },
  {
    id: 'country',
    title: 'Country',
    name: 'country',
    icon: 'country',
    link: `${APP.ROUTE.COUNTRY_LIST}`,
  },
  {
    id: 'customerCare',
    title: 'Customer Care',
    name: 'customerCare',
    icon: 'customerCare',
    link: `${APP.ROUTE.CUSTOMER_SERVICE_LIST}`,
  },
  {
    id: 'photos',
    title: 'Photos',
    name: 'photos',
    icon: 'photos',
    link: `${APP.ROUTE.PHOTOS}`,
  },
  {
    id: 'video',
    title: 'Videos',
    name: 'videos',
    icon: 'videos',
    link: `${APP.ROUTE.VIDEOS}`,
  },
  {
    id: 'reports',
    title: 'Reports',
    name: 'reports',
    icon: 'reports',
    link: '/dashboard/mou',
  },
  {
    id: 'users',
    title: 'Users',
    name: 'users',
    icon: 'users',
    link: '/dashboard/mou',
  },
  {
    id: 'proposals',
    title: 'Proposals',
    name: 'proposals',
    icon: 'proposals',
    link: '/dashboard/mou',
  },
  {
    id: 'logout',
    title: 'Logout',
    name: 'logout',
    icon: 'logout',
    link: '/',
  },
];
