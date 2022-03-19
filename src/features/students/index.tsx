import { fetchCityList } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditStudentPage from './pages/AddEditPage';
import ListStudentPage from './pages/ListPage';

export interface IStudentProps {}

export default function Student(props: IStudentProps) {
  const match = useRouteMatch();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCityList());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={match.path} exact>
        <ListStudentPage />
      </Route>

      <Route path={`${match.path}/add`}>
        <AddEditStudentPage />
      </Route>

      <Route path={`${match.path}/:studentId`}>
        <AddEditStudentPage />
      </Route>
    </Switch>
  );
}
