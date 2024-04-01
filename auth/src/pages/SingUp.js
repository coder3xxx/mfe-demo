import React, { useState } from 'react';
import { Card, Container, Box, TextField, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

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
  btnSubmit: {
    marginTop: theme.spacing(2)
  }
}));

export default function () {
  const classes = useStyles();
  
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const register = (requestData) => {
    setIsLoading(true);
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "token123",
      },
      body: JSON.stringify({ content: requestData }),
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error();
        }

        return res.json();
      })
      .then(_result => {
        toast.success('Đăng ký thành công');
        history.push('/login');
      })
      .catch(_error => {
        toast.error('Thông tin đăng ký không đúng!');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const formData = ({
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
    });

    register(formData);
  }

  return (
    <Container maxWidth="sm" className={classes.container}>
      {isLoading && <Loading />}
      <Card variant="outlined" className={classes.card}>
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
              className={classes.btnSubmit}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};