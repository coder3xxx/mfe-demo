import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';
import { useMemo } from 'react';
import { Switch, Route, Router } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  notFoundContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundTitle: {
    fontSize: '60px',
    margin: 0,
  },
  notFoundContent: {
    fontSize: '24px',
    margin: 0,
  }
}));

export default () => {
  const classes = useStyles();

  const renderNotFound = useMemo(() => {
    return (
      <div className={classes.notFoundContainer}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            404
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Page not found
          </Typography>
        </Container>
      </div>
    )
  }, [])

  return renderNotFound;
}