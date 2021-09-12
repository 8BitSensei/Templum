import React from "react";
import GithubApi from "./githubapi.js";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from '@material-ui/core/IconButton';

import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import CloudDownload from '@material-ui/icons/CloudDownload';
import LinkIcon from '@material-ui/icons/Link';

//test
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  summary: {
    backgroundColor: '#343A40',
    "& .MuiAccordionSummary-content":{
      alignItems: "center"
    },
    padding: '0px 1.5%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    color: 'white',
    textAlign: 'left'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'white',
    textAlign: 'right'
  },
  column: {
    flexBasis: '60.33%',
  },
  link: {
    flexBasis: '8.33%',
  },
  accordion: {
    "& .MuiExpansionPanelSummary-expandIcon": {
      color: "white"
    }
  },
  formControl: {
    minWidth: 70
  },
  dataTable: {
    tableLayout: 'fixed'
  }
}));

const Data = (props) => {
  const [config, setConfig] = React.useState(undefined);
  const [filteredSites, setFilteredSites] = React.useState([]);
  const [orderByDescending, setOrderByDescending] = React.useState(true);
  const [sortByStart, setSortByStart] = React.useState(true);
  const [currentActivePage, setActivePage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const db_name = "sites/ritualSites.json";
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState("");

  const handleClickOpen = (index, site) => {
    setOpen(!open);
    setLink("https://8bitsensei.github.io/Templum/?index=" + index);
  };

  const handlePageChange = (event, value) => {
    setActivePage(value);
    renderSite();
  }

  const handleItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
  }

  function loadDbFileGithub() {
    var githubApi = new GithubApi("8BitSensei", "RitualHub-Dataset", "master");
    githubApi.get(db_name, (err, res) => {
      if (err) {
        console.log(err);
        let newConfig = {
          path: db_name,
          error: err.message
        };

        setConfig(newConfig);
      }
      else {
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
      }
    });
  }

  //TODO: Put the filter engine in it's own file
  function filterEngine(newConfig) {
    let params = props.query;
    let site = params.get('site');
    let status = params.get('status');
    let start = params.get('start');
    let end = parseInt(params.get('end'));
    let location = params.get('location');
    let index = params.get('index');
    var dateKeys = Object.keys(newConfig.data.dates);
    var dateValues = Object.values(newConfig.data.dates);

    let filteredSites = newConfig.data.sites && newConfig.data.sites.length > 0 ?  newConfig.data.sites.filter(function (value) {
      if (site != null && site !== "" && !(String(value.site.toLowerCase()).includes(String(site.toLowerCase())))) {
        return false;
      }

      let tmpStart = value.start;
      let tmpEnd = value.end;
      var startCheck = dateKeys.indexOf(tmpStart)
      if (startCheck != -1) {
        tmpStart = parseInt(dateValues[startCheck]);
        value.startPlaceholder = dateKeys[startCheck];
      }
      else {
        tmpStart = parseInt(tmpStart);
      }

      var endCheck = dateKeys.indexOf(tmpEnd)
      if (endCheck != -1) {
        tmpEnd = parseInt(dateValues[endCheck]);
        value.endPlaceholder = dateKeys[endCheck];
      }
      else {
        tmpEnd = parseInt(tmpEnd);
      }

      value.start = tmpStart;
      value.end = tmpEnd;
      if ((value.start > Number(end)) || (value.end < Number(start))) {
        return false;
      }

      if (location != null && location !== "" && !(String(value.location.toLowerCase()).includes(String(location.toLowerCase())))) {
        return false;
      }

      if (index != null && Number(value.index) != Number(index)) {
        return false
      }

      if(status !== "Any")
      {
        if(status != value.status)
          return false;
      }

      return true;
    }) : [];

    
    console.log("Filtering sites orderByDescending: " + orderByDescending);
    var unknownSites = filteredSites.filter(function( obj ) {
      if(sortByStart)
        return (Number.isNaN(obj.start));
      else
        return (Number.isNaN(obj.end));
    });

    filteredSites = filteredSites.filter(function( obj ) {
      if(sortByStart)
        return (!Number.isNaN(obj.start));
      else
        return (!Number.isNaN(obj.end));
    });

    if (!orderByDescending)
    {
      if(sortByStart)
        filteredSites.sort((a, b,) => parseInt(a.start) - parseInt(b.start));
      else
        filteredSites.sort((a, b,) => parseInt(a.end) - parseInt(b.end));
    }
    else
    {
      if(sortByStart)
        filteredSites.sort((a, b,) => parseInt(b.start) - parseInt(a.start));
      else
        filteredSites.sort((a, b,) => parseInt(b.end) - parseInt(a.end));
    }
      

    filteredSites = filteredSites.concat(unknownSites);
    setFilteredSites(filteredSites);
  }

  function orderDate(orderValue) {
    console.log("orderByDescending is: " + orderByDescending);
    setOrderByDescending(prev => !prev);
    console.log("orderByDescending is now: " + orderByDescending);
    filterEngine(config);
    renderSite();
  }

  function sortDate(orderValue) {
    setSortByStart(orderValue);
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

  function newlineText(text) {
    if (text != null)
      return text.split('\n').map(str => <p>{str}</p>);
  }

  function renderSite() {
    if (filteredSites.length == 0) {
      if (config.error != undefined) {
        return (
          <React.Fragment>
            <Grid container spacing={1} justify="center"  >
              <Grid item xs={12}>
                <h1>Uh oh, Something went wrong...</h1>
                <hr />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          <Grid container spacing={1} justify="center"  >
            <Grid item xs={12}>
              <h1> No results found...</h1>
              <hr />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          <Grid container spacing={1} justify="center"  >
            <Grid item xs={12}>
              <h1> {filteredSites.length} Sites found...</h1>
              <hr />
            </Grid>
            <Grid item xs={4}>
              <Button color="inherit" onClick={() => { orderDate(!orderByDescending) }} endIcon={orderByDescending ? <KeyboardArrowDown /> : <KeyboardArrowUp />}>{(orderByDescending) ? "ascending" : "descending"}</Button>
            </Grid>
            <Grid item xs={3}>
              <Button color="inherit" onClick={() => { sortDate(!sortByStart) }} endIcon={sortByStart ? <KeyboardArrowDown /> : <KeyboardArrowUp />}>{(sortByStart) ? "by start" : "by end"}</Button>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Items per page
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={itemsPerPage}
                  onChange={handleItemsPerPage}
                  label="Items"
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button color="inherit" onClick={() => { orderDate(downloadJson) }}><CloudDownload /></Button>
            </Grid>
            {
              filteredSites.slice(((currentActivePage - 1) * (itemsPerPage)), (currentActivePage * itemsPerPage)).map(site => {
                let bibliography = site.bibliography && site.bibliography.length > 0 ? site.bibliography.join("\n") : null;
                return (
                  <Grid item xs={12}>
                    <Accordion classes={classes.accordion}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        align="left"
                      
                        backgroundColor="black"
                        classes={{ root: classes.summary }}
                      >
                        <div className={classes.link}>
                          <IconButton size='small' onClick={() => { handleClickOpen(site.index) }}>
                            <LinkIcon color='primary' />
                          </IconButton>
                        </div>
                        <div className={classes.column}>
                          <Typography className={classes.heading}>{site.site}</Typography>
                        </div>
                        <div className={classes.column}>
                          <Typography className={classes.secondaryHeading}> From { (site.startPlaceholder)? site.startPlaceholder : site.start } to { (site.endPlaceholder)? site.endPlaceholder : site.end }</Typography>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TableContainer>
                          <Table aria-label="simple table" className={classes.dataTable}>
                            <TableBody>
                              {Object.keys(site).map(element => 
                                {
                                  if(element !== "site" && element !== "start" && element !== "startPlaceholder" && element !== "endPlaceholder" && element !== "end" && element !== "bibliography" && element !== "index")
                                  {
                                    console.log(element)
                                    return(
                                    <TableRow>
                                      <TableCell component="th" scope="row" width="80px"><b>{element.charAt(0).toUpperCase() + element.slice(1)}</b></TableCell>
                                      <TableCell align="left">{site[element]}</TableCell>
                                    </TableRow>)
                                  }
                                })}
                              <TableRow>
                                <TableCell component="th" scope="row"><b>Bibliography</b></TableCell>
                                <TableCell align="left">{newlineText(bibliography)}</TableCell>
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
            <Dialog
              open={open}
              onClose={handleClickOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth='true'
            >
              <DialogTitle id="alert-dialog-title">{"Copy this URL and share it"}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  fullWidth
                  value={link}
                  readonly
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickOpen} color="seondary" autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            <Grid item xs={12} >
              <Pagination count={Math.ceil(filteredSites.length / itemsPerPage)} variant="outlined" shape="rounded" onChange={handlePageChange} />
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
  }

  return (
    <div>
      {config !== null && config !== undefined ? (renderSite(config)) : (
        <React.Fragment>
          {
            loadDbFileGithub()
          }
        </React.Fragment>
      )}
    </div>
  );
}

export default Data;