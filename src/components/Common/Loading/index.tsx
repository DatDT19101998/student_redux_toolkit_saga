import { LinearProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: { position: 'relative', paddingTop: theme.spacing(1), height: 50 },
  loading: { position: 'absolute', top: theme.spacing(-1), width: '100%' },
}));

function Loading() {
  const classes = useStyles();

  return <LinearProgress className={classes.loading} />;
}

export default Loading;
