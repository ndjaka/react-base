import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, LinearProgress } from '@material-ui/core';
import styles from './LoadingScreen.module.scss';

function LoadingScreen() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className={styles.root}>
      <Box width={400}>
        <LinearProgress />
      </Box>
    </div>
  );
}

export default LoadingScreen;
