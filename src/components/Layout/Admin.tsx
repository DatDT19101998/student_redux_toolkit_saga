import { Box } from '@material-ui/core';
import Header from 'components/Common/Header';
import SiderBar from 'components/Common/SiderBar';
import Dashboard from 'features/dashboard';
import Student from 'features/students';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import useStyles from './style';

export interface AdminLayoutProps {}

export default function AdminLayout(props: AdminLayoutProps) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <SiderBar />
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path={'/admin/dashboard'}>
            <Dashboard />
          </Route>

          <Route path={'/admin/students'}>
            <Student />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
