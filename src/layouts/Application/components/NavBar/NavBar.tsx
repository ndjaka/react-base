import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Link,
  List,
  ListSubheader,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation, matchPath } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Logo } from 'components';
import navConfig from 'routes/navigationConfig';
import NavItem from './NavItem';

import { ApplicationState } from 'store/types';

function renderNavItems(props: any) {
  const { items, ...rest } = props;
  return (
    <List disablePadding>
      {items.reduce(
        (acc: any, item: any) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes(props: any) {
  const { acc, pathname, item, depth = 0 } = props;
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        key={key}
        info={item.info}
        open={Boolean(open)}
        title={item.title}>
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

//@ts-ignore
function NavBar({ openMobile, onMobileClose }) {
  const classes = useStyles();
  const location = useLocation();
  const { user } = useSelector((state: ApplicationState) => state.account);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <RouterLink to="/app/account">
              <Avatar
                alt="User"
                className={classes.avatar}
                src={
                  'https://react-material-kit.devias.io/static/images/avatars/avatar_6.png'
                } // change this to avatar
              />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/app/account"
              variant="h5"
              color="textPrimary"
              underline="none">
              {`${user?.name}`}
            </Link>
            <Typography variant="body2" color="textSecondary">
              {user?.name /* change this to email */}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {navConfig.map((config) => (
            <List
              key={config.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {config.subheader}
                </ListSubheader>
              }>
              {renderNavItems({
                items: config.items,
                pathname: location.pathname
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box p={2} borderRadius="borderRadius" bgcolor="red">
            <Typography variant="h6" color="textPrimary">
              Need Help?
            </Typography>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary">
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

export default NavBar;
