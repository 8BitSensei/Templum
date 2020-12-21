export default class GithubAPi {
    constructor(username, repo, branch) {
      this.username = username;
      this.repo = repo;
      this.branch = branch;
    }
  
    get(name, callback) {
      if (name.indexOf(".json") !== -1) {
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
        fetch('http://api.github.com/repos/'+this.username+'/'+this.repo+'/commits?path='+name)
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