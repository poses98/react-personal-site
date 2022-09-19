// Importar layouts
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';
import LayoutError from '../layouts/LayoutError';
import LayoutSignIn from '../layouts/LayoutSignIn';
// Admin pages
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn/SignIn';
import AdminUsers from '../pages/Admin/Users';
import AdminMenuWeb from '../pages/Admin/MenuWeb';

// Client pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';

// Other
import Error404 from '../pages/Error404';

const routesAdmin = [
  {
    path: '/admin',
    component: AdminHome,
    layout: LayoutAdmin,
  },
  {
    path: '/admin/login',
    component: AdminSignIn,
    layout: LayoutSignIn,
  },
  {
    path: '/admin/menu',
    component: AdminMenuWeb,
    layout: LayoutAdmin,
  },
  {
    path: '/admin/users',
    component: AdminUsers,
    layout: LayoutAdmin,
  },
];

const routesClient = [
  {
    path: '/',
    component: Home,
    layout: LayoutBasic,
  },
  {
    path: '/contact',
    component: Contact,
    layout: LayoutBasic,
  },
];

const routes = [
  ...routesAdmin,
  ...routesClient,
  {
    path: '*',
    layout: LayoutError,
    component: Error404,
  },
];

export default routes;
