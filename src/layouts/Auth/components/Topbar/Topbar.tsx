import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar } from '@material-ui/core';
import { Logo } from 'components';
import styles from './Topbar.module.scss';

const Topbar = () => {
  return (
    <AppBar className={clsx(styles.root)} color="primary">
      <Toolbar>
        <RouterLink to="/">
          <Logo className={styles.logo} />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
