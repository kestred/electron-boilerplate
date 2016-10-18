import Root from './modules/root';

const routes = (store: Redux.Store<{}>): ReactRouter.RouteConfig => ({
  path: '/',
  indexRoute: {component: Root},
  childRoutes: [/*
    {
      path: 'wherever',
      component: Whatever
    }
*/]
});

export default routes;
