import { Box } from '@material-ui/core';
import Header from 'components/Common/Header';
import SiderBar from 'components/Common/SiderBar';
import DashboardFeature from 'features/dashboard';
import StudentFeature from 'features/students';
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
            <DashboardFeature />
          </Route>

          <Route path={'/admin/students'}>
            <StudentFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
