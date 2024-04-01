import React, { useMemo } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { useStore } from '../store';
import { Avatar } from '@material-ui/core';
import { crossLoginToSubApp } from '../helpers/login';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    a: {
      textDecoration: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  toolbar: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    background: '#fffecc',
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  ml2: {
    marginLeft: '8px !important'
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center'
  },
  accountName: {
    marginLeft: theme.spacing(1),
    maxWidth: '80px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }
}));

export default function Header() {
  const classes = useStyles();

  const history = useHistory();

  const { userInfo, setUserInfo } = useStore();

  const signedIn = useMemo(
    () => !isEmpty(userInfo),
    [userInfo]
  );

  const onSignOut = () => {
    if (signedIn) {
      cookies.remove('token');
      setUserInfo({});
      crossLoginToSubApp({});
      history.push('/');
    }
  };

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            component={RouterLink}
            to="/"
          >
            Shell App
          </Typography>
          {
            !signedIn ? (
              <div className={classes.toolbarRight}>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.link}
                  component={RouterLink}
                  to='/signup'
                >
                  signup
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classNames(classes.link, classes.ml2)}
                  component={RouterLink}
                  to='/login'
                >
                  Login
                </Button>
              </div>) : (
              <div className={classes.toolbarRight}>
                <Avatar sx={{ width: 32, height: 32 }}>
                  {userInfo.name?.[0]}
                </Avatar>
                <span className={classes.accountName}>{userInfo.name}</span>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classNames(classes.link, classes.ml2)}
                  onClick={onSignOut}
                >
                  Logout
                </Button>
              </div>
            )
          }

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
