{% assign imagesample = site.data[site.metadata] | where_exp: 'item','item.format contains "image"' | first %}
{% capture imagesampleid %}{{imagesample.objectid | default: "https://www.lib.uidaho.edu/collectionbuilder/demo-objects/mg101_b6_photographs_01.jpg"}}{% endcapture %}
{% assign pdfsample = site.data[site.metadata] | where_exp: 'item','item.format contains "pdf"' | first %}
{% capture pdfsampleid %}{{pdfsample.objectid | default: "https://digital.lib.uidaho.edu/utils/getfile/collection/ui_ep/id/21768/filename/uiext21768.pdf"}}{% endcapture %}
{% assign videosample = site.data[site.metadata] | where_exp: 'item','item.format contains "video"' | first %}
{% capture videosampleid %}{{videosample.objectid | default: "https://cdil.lib.uidaho.edu/storying-extinction/objects/trailcams/videos/ballcreek-cedarrub-birdonpath.mp4"}}{% endcapture %}
{% assign audiosample = site.data[site.metadata] | where_exp: 'item','item.format contains "audio"' | first %}
{% capture audiosampleid %}{{audiosample.objectid | default: "https://www.lib.uidaho.edu/digital/mp3s/Clouds.mp3"}}{% endcapture %}


## Contribute

Templum and its accompanying dataset is all open-source, meaning that it is all completely free and accessible to anyone. Being hosted on GitHub anyone can ‘fork’ a copy of the project, and make a change to their local version and commit the change to a ‘Pull Request’ (PR). The PR is then reviewed, and if approved is merged into the ‘master’ project.

## How to

An excellent practical guide on how to make a contribution to an open-source project is available [here](https://github.com/firstcontributions/first-contributions).
The Templum dataset is available [here](https://8bitsensei.github.io/Templum-Data) and the Templum Website [here](https://github.com/8BitSensei/Templum).

## Format

Entries into the Templum dataset must be made in the "sites": [] array and keep to the following format:

```json
{"site":"The common name for the site e.g. Maiden Castle",
"start":-50,
"end":123,
"location":"England, Dorset, Dorchester, Maiden Castle Road",
"description":"An appropriate description, ideally a paragraph or two that sums up the sites significance.",
"bibliography":[
"Cleary, S., 2014. The 'end of the gods' in late Roman Britain. Gallia, 71(1).",
"Sharples, N., Ambers, J., Armour-Chelu, M. et al., 1991. Maiden Castle: Excavations And Field Survey 1985-6. 1st ed. Liverpool: Liverpool University Press, Historic England."
]}
```

Locations should generally follow the format of Country, County, Townland, nearest road if possible.
We currently use the Harvard System of referencing, more information on this style can be found [here](https://www.citethisforme.com/harvard-referencing).

## Useful Tools

Below are some useful tools we use in our workflow, all of which are free:

1. [Visual Studio Code](https://code.visualstudio.com/) - a lightweight IDE from Microsoft.

2. [GitKraken](https://www.gitkraken.com/) - Git GUI client for Windows, Mac & Linux.

3. [JSTOR](https://www.jstor.org/) - JSTOR is a hugely popular digital library. However, most of the content is behind paywalls or requires organisational credentials, but a good place to start searching.

4. [Academia](https://www.academia.edu/) - an Academic social-networking site that also acts as a repository for free academic material.

5. Sci-Hub - One of the most important websites you can know about as an amateur scholar, sci-hub provides most paywall blocked articles for free. Do a quick Google for it as its address has to change often.

6. [Z-Library](https://z-lib.org/) - Similar to Sci-Hub, Z-Library is a file sharing site that provides a large corpus of books and articles for free.

7. [LibGen](http://libgen.li/) - LibGen is another academic file sharing site, but tends to not have Archaeology or Humanaties works so we don't use it nearly as often as Sci-Hub or Z-Library.

8. [Zotero](https://www.zotero.org/) - Zotero is a tool for collating and managing bibliographies.