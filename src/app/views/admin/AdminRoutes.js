import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import List from './list';

const adminRoutes = [
  {
    path: '/admin/list',
    element: <List />,
  },
];

export default adminRoutes;
