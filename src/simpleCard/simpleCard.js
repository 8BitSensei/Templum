import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import GithubApi from "../data/githubapi.js";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '75%'
    },
    title: {
      fontSize: 14,
      color: 'white',
      backgroundColor: '#343A40',
      textAlign: 'left'
    },
    pos: {
      marginBottom: 12,
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: '10px'
    }
}));



const SimpleCard = (props) => {
    const classes = useStyles();
    const [update, setUpdate] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [sha, setSha] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [commitDate, setCommitDate] = React.useState("");
    loadUpdates();

    function loadUpdates() {
      var githubApi = new GithubApi("8BitSensei", "RitualHub-Dataset", "master");
      githubApi.getUpdates("sites/ritualSites.json", (err, res) => {
        if(err){
          console.log(err);
          return (<SimpleCard title="Updates" text="Uh oh, something went wrong getting updates."></SimpleCard>);
        }
        else
        {
          if (res === null || res === undefined || res === "") {
            res = {
              description: "Config description",
              name: "my config",
              updates: []
            };
          }
    
          setUpdate(res.content[0].commit.message);
          setAvatar(res.content[0].author.avatar_url);
          setAuthor(res.content[0].author.login);
          setSha(res.content[0].sha.substring(0, 7));
          setUrl(res.content[0].html_url);
          setCommitDate(res.content[0].commit.author.date);
        }
      });
    }

    return(
      <Grid container spacing={0} direction="row" align="left" justify="center">
          <Card className={classes.root}>
              <CardHeader className={classes.title} title={props.title}>
              </CardHeader>
              <CardContent>
                
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <Avatar aria-label="icon" src={avatar} className={classes.large}>
                      </Avatar>
                      <Typography variant="body1" color="secondary" padding-left="20px">
                          <b>{author}</b> (<a href={url} target="_blank">{sha}</a>) {update}
                          <br/>
                          {commitDate}
                      </Typography>
                    </div>
                  
              </CardContent>
          </Card>
      </Grid>
    );
}

export default SimpleCard;