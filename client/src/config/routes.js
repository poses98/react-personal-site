// Importar layouts
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';
import LayoutError from '../layouts/LayoutError';
// Admin pages
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn';
import WebMenu from '../pages/Admin/WebMenu';
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
    layout: LayoutAdmin,
  },
  {
    path: '/admin/menu-web',
    component: WebMenu,
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
