/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy, Suspense, Fragment } from 'react';
import AuthLayout from 'layouts/Auth';
import ApplicationLayout from 'layouts/Application';
import { RouteConfig } from 'react-router-config';
import { Switch, Redirect, Route } from 'react-router-dom';
import { LoadingScreen } from 'components';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/home/article" />
  },
  {
    path: '/home',
    layout: AuthLayout,
    guard: GuestGuard,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('views/auth/login/Login.page'))
      },
      {
        path: '/home/article',
        exact: true,
        component: lazy(() => import('views/Article/Article.page'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '/app',
    layout: ApplicationLayout,
    guard: AuthGuard,
    routes: [
      {
        path: '/app/home',
        exact: true,
        component: lazy(() => import('views/dashboard/Dashboard.page'))
      }
    ]
  }
];

const renderRoutes = (routes: RouteConfig[]) =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component: any = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
