import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { ChatBubble, ChatRounded, People, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import StatisticItem from './components/StatisticItem';
import StudentRandingList from './components/StudentRankingList';
import Wedgit from './components/Wedgit';
import { dashboardSelector, fetDataDashboard } from './dashboardSlice';

export interface IDashboardProps {}

const useStyles = makeStyles((theme) => ({
  root: { position: 'relative', paddingTop: theme.spacing(1), height: 50 },
  loading: { position: 'absolute', top: theme.spacing(-1), width: '100%' },
}));

export default function Dashboard(props: IDashboardProps) {
  const dispatch = useAppDispatch();

  const classes = useStyles();

  const { loading, statistics, highestStudentList, lowestStudentList, rankingByCityList } =
    useSelector(dashboardSelector);

  useEffect(() => {
    dispatch(fetDataDashboard());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}

      {/* StatisticItem */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount || 0}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<ChatRounded fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount || 0}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<ChatBubble fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount || 0}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<People fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount || 0}
          />
        </Grid>
      </Grid>

      {/* All student ranking */}

      <Box mt={4}>
        <Typography variant="h4">All students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <Wedgit title={'Student with highest mark'}>
                <StudentRandingList studentList={highestStudentList} />
              </Wedgit>
            </Grid>

            <Grid item xs={12} md={6} xl={3}>
              <Wedgit title={'Student with lowest mark'}>
                <StudentRandingList studentList={lowestStudentList} />
              </Wedgit>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Ranking by city */}
      <Box mt={4}>
        <Typography variant="h4">Ranking by city</Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => {
              return (
                <Grid key={ranking.cityId} item xs={12} md={6} xl={3}>
                  <Wedgit title={`TP. ${ranking.cityName}`}>
                    <StudentRandingList studentList={ranking.rankingList} />
                  </Wedgit>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
