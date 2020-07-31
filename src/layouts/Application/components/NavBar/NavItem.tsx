import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Button, Collapse, ListItem, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useTranslation } from 'react-i18next';

interface NavItemProps {
  children?: React.ReactNode;
  className?: string;
  depth: number;
  href?: string;
  icon?: any;
  info?: any;
  open?: boolean;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  },
  buttonLeaf: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium
      }
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.secondary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.secondary.main
    }
  },
  info: {}
}));

function NavItem(props: NavItemProps) {
  const {
    title,
    href,
    depth,
    children,
    icon: Icon,
    className,
    open: openProp,
    info: Info,
    ...rest
  } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(openProp);
  const { t } = useTranslation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}>
        <Button className={classes.button} onClick={handleToggle} style={style}>
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{t(title)}</span>
          {open ? (
            //@ts-ignore
            <ExpandLessIcon size="small" color="inherit" />
          ) : (
            //@ts-ignore
            <ExpandMoreIcon size="small" color="inherit" />
          )}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}>
      {
        //@ts-ignore
        <Button
          activeClassName={classes.active}
          className={clsx(classes.buttonLeaf, `depth-${depth}`)}
          component={RouterLink}
          exact
          style={style}
          to={href}>
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{t(title)}</span>
          {Info && <Info className={classes.info} />}
        </Button>
      }
    </ListItem>
  );
}

export default NavItem;
