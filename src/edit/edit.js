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
    },
    codeBlock: {
        backgroundColor: '#eee',
        border: '1px solid #999',
        display: 'block',
        padding: '20px'
    }
  }));

const Edit = (props) => {
    const classes = useStyles();

    return(
    <React.Fragment>
        <Typography className={classes.heading}>
            <h1>Open Source</h1>
            <hr/>
        </Typography>
        <Typography className={classes.body}>
            RitualHub and its accompanying dataset is all open-source, meaning that it is all completely free and accessible to anyone. Being hosted on GitHub anyone can ‘fork’ a copy of the project, and make a change to their local version and commit the change to a ‘Pull Request’ (PR). The PR is then reviewed, and if approved is merged into the ‘master’ project.
        </Typography>
        <Typography className={classes.heading}>
            <h1>How to</h1>
            <hr/>
        </Typography>
        <Typography className={classes.body}>
            An excellent practical guide on how to make a contribution to an open-source project is available <a href="https://github.com/firstcontributions/first-contributions">here</a>.
            <br/>
            The RitualHub dataset is available <a href="https://github.com/8BitSensei/RitualHub-Dataset">here</a> and the RitualHub Website <a href="https://github.com/8BitSensei/RitualHub">here</a>.
        </Typography>
        <Typography className={classes.heading}>
            <h1>Format</h1>
            <hr/>
        </Typography>
        <Typography className={classes.body}>
            Entries into the RitualHub dataset must be made in the <code>"sites": []</code> array and keep to the following format:
            <br/>
            <br/>
            <code class={classes.codeBlock}>
                &#123;"site":"The common name for the site e.g. Maiden Castle",<br/>"start":-50,<br/>"end":123,<br/>"location":"England, Dorset, Dorchester, Maiden Castle Road",<br/>"description":"An appropriate description, ideally a paragraph or two that sums up the sites ritual significance.",<br/>"bibliography":[<br/>"Cleary, S., 2014. The 'end of the gods' in late Roman Britain. Gallia, 71(1).",<br/>"Sharples, N., Ambers, J., Armour-Chelu, M. et al., 1991. Maiden Castle: Excavations And Field Survey 1985-6. 1st ed. Liverpool: Liverpool University Press, Historic England."<br/>]&#125;
            </code>
            <br/>
            Locations should generally follow the format of <code>Country, County, Townland, nearest road if possible</code>. 
            <br/>
            We currently use the Harvard System of referencing, more information on this style can be found <a href="https://www.citethisforme.com/harvard-referencing">here</a>.

        </Typography>
        <Typography className={classes.heading}>
            <h1>Useful Tools</h1>
            <hr/>
        </Typography>
        <Typography className={classes.body}>
            Below are some useful tools we use in our workflow, all of which are free:
            <ol>
                <li class={classes.listItem}><b><a href="https://code.visualstudio.com/">Visual Studio Code</a></b> - a lightweight IDE from Microsoft.</li>
                <li class={classes.listItem}><b><a href="https://www.gitkraken.com/">GitKraken</a></b> - Git GUI client for Windows, Mac & Linux.</li>
                <li class={classes.listItem}><b><a href="https://www.jstor.org/">JSTOR</a></b> - JSTOR is a hugely popular digital library. However, most of the content is behind paywalls or requires organisational credentials, but a good place to start searching.</li>
                <li class={classes.listItem}><b><a href="https://www.academia.edu/">Academia</a></b> - an Academic social-networking site that also acts as a repository for free academic material.</li>
                <li class={classes.listItem}><b><a>Sci-Hub</a></b> - One of the most important websites you can know about as an amateur scholar, sci-hub provides most paywall blocked articles for free. Do a quick Google for it as its address has to change often.</li>
                <li class={classes.listItem}><b><a href="https://z-lib.org/">Z-Library</a></b> - Similar to Sci-Hub, Z-Library is a file sharing site that provides a large corpus of books and articles for free.</li>
                <li class={classes.listItem}><b><a href="http://libgen.li/">LibGen</a></b> - LibGen is another academic file sharing site, but tends to not have Archaeology or Humanaties works so we don't use it nearly as often as Sci-Hub or Z-Library.</li>
                <li class={classes.listItem}><b><a href="https://www.zotero.org/">Zotero</a></b> - Zotero is a tool for collating and managing bibliographies.</li>
            </ol> 
        </Typography>
    </React.Fragment>)
}

export default Edit;