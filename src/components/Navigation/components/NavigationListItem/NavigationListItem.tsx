/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { ListItem, Button, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import styles from './NavigationListItem.module.scss';

const CustomRouterLink = forwardRef((props: any, ref: any) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

interface NavigationListItemProps {
  children?: React.ReactNode;
  className?: string;
  depth: number;
  href?: string;
  icon: any;
  label: any;
  open?: boolean;
  title: string;
  t: Function;
}
const NavigationListItem = (props: NavigationListItemProps) => {
  const {
    title,
    href,
    depth = 0,
    children,
    icon: Icon,
    className,
    open: openProp = false,
    label: Label,
    ...rest
  } = props;

  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((open) => !open);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = {
    paddingLeft
  };

  if (children) {
    return (
      <ListItem
        {...rest}
        className={clsx(styles.item, className)}
        disableGutters>
        <Button className={styles.button} onClick={handleToggle} style={style}>
          {Icon && <Icon className={styles.icon} />}
          {title}
          {open ? (
            <ExpandLessIcon className={styles.expandIcon} color="inherit" />
          ) : (
            <ExpandMoreIcon className={styles.expandIcon} color="inherit" />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  } else {
    return (
      <ListItem
        {...rest}
        className={clsx(styles.itemLeaf, className)}
        disableGutters>
        <Button
          activeClassName={styles.active}
          className={clsx(styles.buttonLeaf, `depth-${depth}`)}
          component={CustomRouterLink}
          exact
          style={style}
          to={href}>
          {Icon && <Icon className={styles.icon} />}
          {title}
          {Label && (
            <span className={styles.label}>
              <Label />
            </span>
          )}
        </Button>
      </ListItem>
    );
  }
};

export default NavigationListItem;
