import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  field: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
      textAlign: "left"
    },
    width: "100%"
  }
}));

const currencies = [
  {
    value: 'Any',
    label: 'Any',
  },
  {
    value: 'Certain',
    label: 'Certain',
  },
  {
    value: 'Probable',
    label: 'Probable',
  },
  {
    value: 'Possible',
    label: 'Possible',
  }
];

const Search = () => {
  const classes = useStyles();

  return (
    <form  autoComplete="off">
        <Grid container spacing={1} justify="center">
          <Grid item xs={10} className={classes.field}>
              <TextField 
                label="Site contains"
                id="filled-secondary"
                name="site"
                variant="filled"
                color="secondary"
              />
          </Grid>
          <Grid item xs={10}>
            <div className={classes.field}>
              <TextField
                label="Status"
                id="filled-secondary"
                name="status"
                variant="filled"
                color="secondary"
                select
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className={classes.field}>
              <TextField
                label="Location contains"
                id="filled-secondary"
                name="location"
                variant="filled"
                color="secondary"
              />
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className={classes.field}>
              <TextField
                label="Start (e.g -50)"
                id="filled-secondary"
                name="start"
                type="number"
                variant="filled"
                color="secondary"
              />
            </div>
          </Grid>
          <Grid item xs={5}>
            <div className={classes.field}>
              <TextField
                label="End (e.g -50)"
                id="filled-secondary"
                name="end"
                type="number"
                variant="filled"
                color="secondary"
              />
            </div>
          </Grid>
          <Grid item xs={10}>
            <Button type="submit" variant="contained" color="secondary" endIcon={<SearchIcon></SearchIcon>}>Search</Button>
          </Grid>
        </Grid>
  </form>
  );
}


export default Search;