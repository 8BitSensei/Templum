import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import React from 'react';

import Data from "./data/data";
import Search from "./search/search";
import SimpleCard from "./simpleCard/simpleCard";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import CodeIcon from '@material-ui/icons/Code';
import ProblemIcon from '@material-ui/icons/ReportProblem';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '95vh'
  },
  content: {
    flex: '1',
    width: '60%'
  },
  footer: {
    width: '100%',
    display: 'inline-block'
  },
  footerButton: {
    "&:hover": {
      backgroundColor: 'transparent'
    },
    float: 'left',
    paddingLeft: '30px'
  },
  footerText: {
    float: 'right',
    paddingRight: '30px'
  },
  title: {
    flexGrow: 0,
    display: 'none',
    paddingRight: '20px',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
}));

function QueryReader()
{
    const classes = useStyles();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    console.log("params: " + params);

    if(params == "")
    {
      return(
        <React.Fragment>
          <Grid container spacing={6} justify="center">
            <Grid item xs={10}>
              <h1>Welcome to RitualHub</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pellentesque elementum lorem sed eleifend. Proin ornare, velit eget feugiat suscipit, justo metus auctor urna, quis egestas odio purus eget tortor. Nulla nec consequat dui, sed pretium erat. Vivamus sagittis leo eu velit maximus aliquam. Maecenas convallis, urna sed ultrices efficitur, massa felis consectetur nulla, sed gravida velit diam et dolor. Proin ac turpis at dui faucibus convallis. Maecenas condimentum sem ac consectetur fringilla. Morbi dapibus mauris ultrices odio sodales feugiat.</p>
              <hr/>
            </Grid>
            <Grid item xs={10}>
              <Search></Search>
            </Grid>
            <Grid item xs={10}>
              <SimpleCard title="Updates" text="Here go the Github latest commits to the dataset"></SimpleCard>
            </Grid>
          </Grid>
        </React.Fragment>
        
      );
    }
    else
    {
      return(<Data query={params}></Data>);
    }
}

function about(){
  console.log("about test:" + process.env.PUBLIC_URL);
  return(<p>About</p>);
}

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="static" color="secondary" >
        <Toolbar>
          <Typography className={classes.title} variant="h4" href='/'>
            RitualHub
          </Typography>
          <Button color="inherit" startIcon={<SearchIcon />} href={process.env.PUBLIC_URL + "/"}>Search</Button>
          <Button color="inherit" startIcon={<InfoIcon />} href="/about">About</Button>
          <Button color="inherit" startIcon={<CodeIcon />} href="/edit">Contribute</Button>
        </Toolbar>
      </AppBar>
      <Router basename={process.env.PUBLIC_URL}>
        <div className={classes.body}>
          <div className={classes.content}>
          <Switch>
            <Route exact path="/">
              {QueryReader()}
            </Route>
            <Route exact path="/about">
              {about()}
            </Route>
            <Route exact path="/edit">
              <p>Editing</p>
            </Route>
          </Switch>
          </div>
          <footer className={classes.footer}>
            <hr className={classes.introBorder}/>
            <Button className={classes.footerButton} color="inherit" startIcon={<ProblemIcon />} href="/edit">Report a problem</Button>
            <a className={classes.footerText} rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style={{borderWidth:'0'}} src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />
        </footer>
        </div>
      </Router>
    </div>
  );
}

export default App;