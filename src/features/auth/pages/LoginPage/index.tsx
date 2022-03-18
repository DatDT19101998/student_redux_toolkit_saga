import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import { login } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(3),
  },
}));

const LoginPage = () => {
  const dispatch = useDispatch();

  const classes = useStyle();

  const handleLogin = () => {
    const value = {
      email: 'datdt@reactplus.com',
      password: '12345',
    };

    dispatch(login(value));
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box} component="h1">
        <Typography variant="h5" component="h1">
          Student manager
        </Typography>
        <Box mt={4}>
          <Button onClick={handleLogin} variant="contained" color="primary">
            Fake login
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
