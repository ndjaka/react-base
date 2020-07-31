/* eslint-disable react/no-multi-comp */
import React from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import { List, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import useRouter from 'utils/useRouter';
import { NavigationListItem } from './components';

import styles from './Navigation.module.scss';

interface NavigationListProps {
  depth: number;
  t: any;
  pages: any[];
}

const NavigationList = (props: NavigationListProps) => {
  const { pages, t, ...rest } = props;
  const router = useRouter();

  return (
    <List>
      {pages.reduce(
        (items, page) => reduceChildRoutes({ items, router, t, page, ...rest }),
        []
      )}
    </List>
  );
};

const reduceChildRoutes = (props: any) => {
  const { items, router, page, t, depth } = props;

  if (page.children) {
    const open = matchPath(router.location.pathname, {
      path: page.href,
      exact: false
    });

    items.push(
      <NavigationListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)}
        t={t}
        title={t(page.title)}>
        <NavigationList depth={depth + 1} t={t} pages={page.children} />
      </NavigationListItem>
    );
  } else {
    items.push(
      <NavigationListItem
        depth={depth}
        href={page.href}
        icon={page.icon}
        t={t}
        key={page.title}
        label={page.label}
        title={t(page.title)}
      />
    );
  }

  return items;
};

interface NavigationProps {
  className?: string;
  component: any;
  pages: any[];
  title: string;
}

const Navigation = (props: NavigationProps) => {
  const {
    title,
    pages,
    className,
    component: Component = 'nav',
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <Component {...rest} className={clsx(styles.root, className)}>
      {title && <Typography variant="overline">{t(title)}</Typography>}
      <NavigationList
        depth={0}
        pages={pages}
        t={t}
        // router={router}
      />
    </Component>
  );
};

export default Navigation;
