import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dashboardSelector, fetDataDashboard } from './dashboardSlice';

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const dispatch = useAppDispatch();

  const { loading, statistics, highestStudentList, lowestStudentList, rankingByCityList } =
    useSelector(dashboardSelector);

  console.log('data', {
    loading,
    statistics,
    highestStudentList,
    lowestStudentList,
    rankingByCityList,
  });

  useEffect(() => {
    dispatch(fetDataDashboard());
  }, [dispatch]);

  return <div>Dashboard</div>;
}
