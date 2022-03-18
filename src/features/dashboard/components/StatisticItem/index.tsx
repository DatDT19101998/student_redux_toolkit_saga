import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { ReactElement } from 'react';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

export interface IStatisticsProps {
  icon: ReactElement;
  label: string;
  value: string | number;
}

export default function Statistics({ icon, label, value }: IStatisticsProps) {
  const classes = useStyle();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
