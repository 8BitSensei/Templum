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
        The RitualHub is currently scoped towards what are understood to be 'temple' sites, that is constructed buildings and their environs used for, or dedicated to religious activity, this includes sites from Late-Iron Age shrines, Roman Temples, to Early Christian Churches. We understand that the what is defined as a temple can be vague and so we intend to keep our understanding of the term porous, allowing us to study continuous or related activity that pre-dates or post-dates the constructed environs. All discussions on this topic should happen within either the RitualHub website or dataset repo to keep a record. Scope for entries into the project are currently:
            <ol>
                <li class={classes.listItem}>Entries should have an identifiable location within the boundaries of the islands of Britain & Ireland including off-shore islands.</li>
                <li class={classes.listItem}>The time-frame for entries should be kept within the Late Iron Age to Late Antiquity for Britain & Ireland, that is roughly 150BCE to 600CE. The constructed environs that make up a temple should fall in this time frame, but contiguous activity may extend beyond these boundaries.</li>
                <li class={classes.listItem}>There should at least be a reasonable argument for a site being a temple, understanding that it is not always easy to seperate these sites from others.</li>
                <li class={classes.listItem}>An entry should provide at least the common name for the site, the location, the date range of use, a description, and a bibliography. To see further details on the entry format go here.</li>
            </ol> 
        </Typography>
        <Typography className={classes.heading}>
            <h1>Recommended reading</h1>
            <hr/>
        </Typography>
        <Typography className={classes.body}>
            Here is a list of reccomended reads if you are interested in the topic and aren't sure where to begin:
            <ul>
                <li class={classes.listItem}><b>Performing The Sacra: Priestly Roles And Their Organisation In Roman Britain</b>, Esposito, A., 2019.</li>
                <li class={classes.listItem}><b>Life And Death In The Countryside Of Roman Britain: New Visions Of The Countryside Of Roman Britain, Volume 3</b>, pp.120 - 204, Smith, A., Allen, M., Brindle, T., et al., 2018.</li>
                <li class={classes.listItem}><b>Re-Thinking Ritual Traditions: Interpreting Structured Deposition in Watery Contexts in Late Pre-Roman Iron Age and Roman Britain</b>, Crease S., 2015.</li>
                <li class={classes.listItem}><b>Late Iron Age And 'Roman' Ireland</b>, Wilson C., J., Dowling, G., Ann Bevivino, M., et al., 2014.</li>
                <li class={classes.listItem}><b>Britain Begins</b>, Cunliffe, B., 2012.</li>
                <li class={classes.listItem}><b>Ritual Landscapes Of Roman South-East Britain</b>, Rudling, D., Black, E., Hall, J., et al., 2008.</li>
                <li class={classes.listItem}><b>Pagan Celtic Britain</b>, Ross, A., 1996.</li>
                <li class={classes.listItem}><b>English Heritage Book Of Shrines & Sacrifice</b>, Woodward, A., 1992.</li>
            </ul> 
        </Typography>
    </React.Fragment>);
}

export default About;