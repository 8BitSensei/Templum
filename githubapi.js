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

        data.forEach(element => {
          var rawPath = element.download_url;
          if (rawPath.endsWith(".json")) {
              fetch(rawPath)
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
        });

        callback(undefined, aggregatedData)
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