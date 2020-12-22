import React from "react";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: 'left'
    },
    body: {
        textAlign: 'left'
    },
    listItem: {
        marginBottom: '10px'
    }
  }));

const About = (props) => {
    const classes = useStyles();

    return(
    <React.Fragment>
        <Typography className={classes.heading}>
            <h1>Premise</h1>
            <hr/>
        </Typography>
        <Typography className={classes.body}>
            RitualHub is an open source static React JS website which provides an explorable GUI for an open-source dataset of Ritual Sites in Britain & Ireland. RitualHub and its accompanying dataset is an attempt to collate evidence for Iron Age to Early Medieval ritual sites and provide complete bibliographies and locations in a single place.
        </Typography>
        <Typography className={classes.heading}>
            <h1>Scope</h1>
            <hr/>
        </Typography>
        <Typography className={classes.body}>
            The RitualHub project currently has no hard limits on it’s scope, we are open to including entries that go beyond our timeframe or have limited evidence for their location if value for the project can be seen. All discussions on this topic should happen within either the RitualHub website or Dataset repo to keep a record.
            Scope for entries into the project are currently:
            <ol>
                <li class={classes.listItem}>Entries should have an identifiable location within the boundaries of the islands of Britain & Ireland including off-shore islands.</li>
                <li class={classes.listItem}>The time-frame for entries should be kept within the earliest Iron Age to the Early Medieval period for Britain & Ireland, that is roughly 800BCE to 800CE. The ritual activity at the site should fall within this time frame, not necessarily the construction or even the primary use of the site.</li>
                <li class={classes.listItem}>Sites should show some evidence for ritual use, without getting bogged down in defining ritual; this can include religious, political, or cultural ceremonial activity in public or private at any strata of society. Evidence for ritual at a site can be archaeological, literary, epigraphic, or topographic, but this should be made clear in the entry.</li>
                <li class={classes.listItem}>An entry should provide at least the common name for the site, the location, the date range of use, a description, and a bibliography; to see further details on the entry format go here.</li>
            </ol> 
        </Typography>
        <Typography className={classes.heading}>
            <h1>Recommended reading</h1>
            <hr/>
        </Typography>
        <Typography className={classes.body}>
            Here is a list of reccomended reads if you are interested in the topic and aren't sure where to begin:
            <ul>
                <li class={classes.listItem}>ESPOSITO, A., 2019. <b>Performing The Sacra: Priestly Roles And Their Organisation In Roman Britain</b>. 1st ed. ARCHAEOPRESS ARCHAEOLOGY.</li>
                <li class={classes.listItem}>Smith, A., Allen, M., Brindle, T., et al., 2018. <b>Life And Death In The Countryside Of Roman Britain: New Visions Of The Countryside Of Roman Britain, Volume 3</b>. 1st ed. Roman Society Publications, pp.120 - 204.</li>
                <li class={classes.listItem}>Cahill Wilson, J., Dowling, G., Ann Bevivino, M., et al., 2014. <b>Late Iron Age And 'Roman' Ireland</b>. 1st ed. Dublin: Wordwell Ltd.</li>
                <li class={classes.listItem}>Cunliffe, B., 2012. <b>Britain Begins</b>. 1st ed. Oxford: OUP Oxford.</li>
                <li class={classes.listItem}>Rudling, D., Black, E., Hall, J., et al., 2008. <b>Ritual Landscapes Of Roman South-East Britain</b>. Heritage Marketing & Publications.</li>
                <li class={classes.listItem}>Ross, A., 1996. <b>Pagan Celtic Britain</b>. 1st ed. Chicago, Ill: Academy Chicago Publ.</li>
                <li class={classes.listItem}>Woodward, A., 1992. <b>English Heritage Book Of Shrines & Sacrifice</b>. 1st ed. B.T. Batsford.</li>
            </ul> 
        </Typography>
    </React.Fragment>);
}

export default About;