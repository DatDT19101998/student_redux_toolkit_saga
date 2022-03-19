import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import studentApi from 'api/studentApi';
import { useAppSelector } from 'app/hooks';
import { cityListSelector, cityMapSelector } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import StudentFilter from '../components/Conditions';
import StudentListTable from '../components/StudentListTable';
import { fetchStudentList, setFilter, setFilterDebound, studentSelector } from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: { position: 'relative', paddingTop: theme.spacing(1), height: 50 },
  loading: { position: 'absolute', top: theme.spacing(-1), width: '100%' },

  titleContain: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
}));

export default function ListStudentPage() {
  const dispatch = useDispatch();

  const match = useRouteMatch();
  const history = useHistory();

  const classes = useStyles();

  const { list, pagination, filter, loading } = useAppSelector(studentSelector);

  const cityList = useAppSelector(cityListSelector);

  const { _totalRows, _limit } = pagination;

  const cityMap = useAppSelector(cityMapSelector);

  useEffect(() => {
    dispatch(fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(setFilter({ ...filter, _page: page }));
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(setFilterDebound(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Student) => {
    try {
      await studentApi.removeStudent(student.id || '');

      //Refresh student list
      const newFilter = { ...filter };
      dispatch(setFilter(newFilter));
    } catch (error) {
      //Toast error
      console.log('error', error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.path}/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}

      <Box className={classes.titleContain}>
        <Typography variant="h4">Students</Typography>

        <Link to={`${match.path}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      {/* Sort, filter... */}

      <Box mt={3} mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      {/* Student list table */}
      <StudentListTable
        cityMap={cityMap}
        studentList={list}
        onEdit={handleEditStudent}
        onRemove={handleRemoveStudent}
      />

      {/* Student pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(_totalRows / _limit)}
          page={filter._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
