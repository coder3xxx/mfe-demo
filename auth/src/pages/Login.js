import React, { useState } from 'react';
import { Card, Container, Box, TextField, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'none',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  card: {
    minWidth: '450px'
  },
  mt2: {
    marginTop: theme.spacing(2)
  },
  pointer: {
    cursor: 'pointer'
  }
}));

export default function () {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const login = (requestData) => {
    setIsLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: requestData }),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error();
        }

        return res.json();
      })
      .then(result => {
        toast.success('Đăng nhập thành công');

        // Cross data to container
        const loginEvent = new CustomEvent('LOGIN_TO_SHELL_APP', { detail: result });

        window.dispatchEvent(loginEvent);
      })
      .catch(_error => {
        toast.error('Thông tin đăng nhập không đúng!');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    };

    login(formData);
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card variant="outlined" className={classes.card}>
        {isLoading && <Loading />}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px 32px'
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={classes.mt2}
            >
              Login
            </Button>
            <Grid item xs={12} className={classes.mt2}>
              You don't have an account?&nbsp;
              <Link className={classes.pointer} to="signup">Register now</Link>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};