import Sample from "./sample.json";
import React from "react";
import GithubApi from "./githubapi.js";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Grid, Typography } from '@material-ui/core';

import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import CloudDownload from '@material-ui/icons/CloudDownload';

const useStyles = makeStyles((theme) => ({
    summary: {
      backgroundColor: '#343A40'
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      color: 'white'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: 'white',
    },
    column: {
      flexBasis: '20.33%',
    }
  }));

const Data = (props) => {
    const [config, setConfig] = React.useState(undefined);
    const [filteredSites, setFilteredSites] = React.useState([]);
    const [orderByEarliest, setOrderByEarliest] = React.useState(false);
    const db_name = "RitualSites/ritualSites.json";

    const classes = useStyles();
    
    function loadDbFileGithub() {
      var githubApi = new GithubApi("8BitSensei", "Datasets", "master");
      githubApi.get(db_name, (err, res) => {
        if (res === null || res === undefined || res === "") {
          res = {
            description: "Config description",
            name: "my config",
            sites: []
          };
        }
  
        let newConfig = {
          path: db_name,
          data: res.content
        };

        filterEngine(newConfig);
        setConfig(newConfig);
      });
    }

    //TODO: Put the filter engine in it's own file
    function filterEngine(newConfig)
    {
      let params = props.query;
      let site = params.get('site');
      let start = params.get('start');
      let end = params.get('end');
      let location = params.get('location');
      
      let orderedSites = [];

      if(orderByEarliest)
        orderedSites =  newConfig.data.sites && newConfig.data.sites.length > 0 ? newConfig.data.sites.sort((a, b,) => a.start - b.start) : [];
      else 
        orderedSites =  newConfig.data.sites && newConfig.data.sites.length > 0 ? newConfig.data.sites.sort((a, b,) => b.start - a.start) : [];
      
      let filteredSites = newConfig.data.sites && newConfig.data.sites.length > 0 ? orderedSites.filter(function(value){
        if(site != null && site !== "" && !(String(value.site).includes(String(site))))
        {
          return false;
        }
  
        if(start != null && start !== "" && !(value.start >= Number(start)))
        {
          return false;
        }
  
        if( end != null && end !== "" && !(value.end <= Number(end)))
        {
          return false;
        }
  
        if(location != null && location !== "" && !(String(value.location).includes(String(site))))
        {
          return false;
        }
        
        return true;
      }) : [];
  
      setFilteredSites(filteredSites);
    }

    function orderDate(orderValue)
    {
      setOrderByEarliest(orderValue);
      filterEngine(config);
      renderSite();
    }

    function downloadJson() {
      var myObjStr = JSON.stringify(filteredSites);
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(myObjStr));
      element.setAttribute('download', "ritualHub_results.json");
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    function renderSite() {
        return (
          <React.Fragment>
            <Grid container spacing={1} justify="center" >
              <Grid item xs={12}>
                <h1> {filteredSites.length} Sites found...</h1>
                <hr/>
              </Grid>
              <Grid item xs={3}>
                <Button color="inherit"  onClick={() => {orderDate(!orderByEarliest)}} endIcon={orderByEarliest ? <KeyboardArrowDown /> : <KeyboardArrowUp /> }>Filter by date</Button>
              </Grid>
              <Grid item xs={3}>
                <Button color="inherit">Results per page</Button>
              </Grid>
              <Grid item xs={3}>
                <Button color="inherit"  onClick={() => {orderDate(downloadJson)}} endIcon={<CloudDownload />}>Download results</Button>
              </Grid>
              {
                filteredSites.map(site => {
                  let bibliography = site.bibliography && site.bibliography.length > 0 ? site.bibliography.join(", ") : null;
                  console.log("Test " + site.site);
                  return(
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon  color="disabled"/>}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                          align="left"
                          backgroundColor="black"
                          classes={{root: classes.summary}}
                        >
                          <div className={classes.column}>
                            <Typography className={classes.heading}>{site.site}</Typography>
                          </div>
                          <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>From {site.start} to {site.end}</Typography>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer>
                            <Table aria-label="simple table">
                              <TableBody>
                                <TableRow>
                                  <TableCell component="th" scope="row"><b>Location</b></TableCell>
                                  <TableCell align="left">{site.location}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell component="th" scope="row"><b>Description</b></TableCell>
                                  <TableCell align="left">{site.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell component="th" scope="row"><b>Bibliography</b></TableCell>
                                  <TableCell align="left">{bibliography}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  );
                })
              }
            </Grid>
          </React.Fragment>
        );
    }

    return(
        <div>
            {config !== null && config !== undefined ? (renderSite(config)) : (
            <React.Fragment>
                {loadDbFileGithub()}
            </React.Fragment>
            )}
      </div>
    );
}

export default Data;