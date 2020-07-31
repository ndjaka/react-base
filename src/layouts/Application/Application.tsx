import React, { useState } from 'react';
import { NavBar, TopBar } from './components';
import { ErrorHandler } from 'components';

import styles from './Application.module.scss';

const Application = (props: any) => {
  const { children } = props;
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={styles.root}>
      <ErrorHandler>
        <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      </ErrorHandler>
      <ErrorHandler>
        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
      </ErrorHandler>
      <div className={styles.wrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <ErrorHandler>{children}</ErrorHandler>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
