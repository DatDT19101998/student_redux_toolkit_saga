import { Box, Button } from '@material-ui/core';
import cityApi from 'api/cityApi';
import { NotFound, PrivateRoute } from 'components/Common';
import AdminLayout from 'components/Layout/Admin';
import { logout } from 'features/auth/authSlice';
import LoginPage from 'features/auth/pages/LoginPage';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    cityApi.getAll().then((resp) => {
      console.log('resp', resp);
    });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Box mt={4}>
        <Button onClick={handleLogout} variant="contained" color="primary">
          Logout
        </Button>
      </Box>

      <Switch>
        <Route path={'/login'}>
          <LoginPage />
        </Route>

        <PrivateRoute path={'/admin'}>
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
