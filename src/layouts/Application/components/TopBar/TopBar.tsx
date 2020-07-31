/* eslint-disable no-unused-vars */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Hidden,
  SvgIcon,
  Box
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import SecureLS from 'secure-ls';
import styles from './TopBar.module.scss';
import { Logo } from 'components';
import Account from './Account';

var localStorage = new SecureLS({ encodingType: 'aes' });

interface TopBarProps {
  onMobileNavOpen: any;
  className?: string;
}

const TopBar = (props: TopBarProps) => {
  const { onMobileNavOpen, className, ...rest } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { i18n } = useTranslation();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    i18n.changeLanguage(localStorage.get('language') || 'fr');
  }, [i18n]);

  const handleClose = (lng: string) => {
    if (typeof lng !== 'undefined') {
      i18n.changeLanguage(lng.toLowerCase());
      localStorage.set('language', lng.toLowerCase());
    }
    setAnchorEl(null);
  };

  return (
    <AppBar className={clsx(styles.root, className)} color="primary" {...rest}>
      <Toolbar className={styles.toolbar}>
        <Hidden lgUp>
          <IconButton
            className={styles.menuButton}
            color="inherit"
            onClick={onMobileNavOpen}>
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo className={styles.logo} />
          </RouterLink>
        </Hidden>
        <Box ml={2} flexGrow={1} />
        <IconButton
          style={{ color: '#1b70b9', fontSize: 18 }}
          onClick={handleClick}
          className={styles.notificationsButton}>
          <img
            style={{ height: 20, width: 20 }}
            alt="Logo"
            src={`/images/${i18n.language}.svg`}
          />
        </IconButton>
        <Box ml={2}>
          <Account />
        </Box>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleClose('undefined')}>
          {[
            { value: 'fr', title: 'Français' },
            { value: 'en', title: 'English' }
          ].map((i) => (
            <MenuItem onClick={() => handleClose(i.value)} key={i.value}>
              <img
                style={{ height: 20, width: 20, marginRight: 10 }}
                alt="Logo"
                src={`/images/${i.value}.svg`}
              />
              {i.title}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
