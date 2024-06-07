export default class GithubAPi {
    constructor(username, repo, branch) {
      this.username = username;
      this.repo = repo;
      this.branch = branch;
    }
  
    getDirectory(name, callback){
      fetch('https://api.github.com/repos/'+this.username+'/'+this.repo+'/contents/data/'+ name + '?ref='+this.branch)
      .then(response => response.json())
      .then((data) => {
        let aggregatedData = {
          name: name,
          content: []
        };

        var urls = []
        for (let i = 0; i < data.length; i++)
        {
          var element = data[i]
          var rawPath = element.download_url;
          urls.push(rawPath);
        }

        var requets = urls.map(function(url){
          if(url.endsWith(".json"))
          {
            return fetch(url)
            .then(response => response.json())
            .then((data) => {
              if(data) {
                aggregatedData.content.push(data)
              }
            },
            (error) => {
              return callback(error, undefined);
            })
          }
        })
        


        Promise.all(requets)
        .then((results) => {
          return callback(undefined, aggregatedData)
        },
        (error) => {
          return callback(error, undefined);
        })
      },
      (error) => {
        return callback(error, undefined);
      })
    }

    get(name, callback) {
      if (name.indexOf(".json") !== -1) {
        console.log('https://raw.githubusercontent.com/'+this.username+'/'+this.repo+'/'+this.branch+'/'+name);
          fetch('https://raw.githubusercontent.com/'+this.username+'/'+this.repo+'/'+this.branch+'/'+name)
          .then(response => response.json())
          .then((data) => {
            callback(undefined, {
              name: name,
              content: data
            });
          },
          (error) => {
            return callback(error, undefined);
          })
      } else {
        return callback("File type not supported.");
      }
    }

    getUpdates(name, callback)
    {
      if (name.indexOf(".json") !== -1) {
        fetch('https://api.github.com/repos/'+this.username+'/'+this.repo+'/commits?path='+name)
        .then(response => response.json())
        .then((data) => {
          callback(undefined, {
            name: name,
            content: data
          });
        },
        (error) => {
          return callback(error, undefined);
        })
      } else {
        return callback("File type not supported.");
      }
    }
}