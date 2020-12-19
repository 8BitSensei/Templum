import Octokat from "octokat";

export default class GithubAPi {
    constructor(username, repo, branch) {
      this.username = username;
      this.repo = repo;
      this.branch = branch;
    }
  
    get(name, callback) {
        var currentRepo = new Octokat({
          token: "649982513b6f322f79a5974ce496f4841f32587b"
        }).repos(this.username, this.repo);
        if (name.indexOf(".json") !== -1) {
            currentRepo.contents(name).fetch(
            {
              ref: this.branch
            },
            function(err, result) {
              if (err) return callback(err);
              callback(err, {
                name: name,
                sha: result.sha,
                content: JSON.parse(atob(result.content))
              });
            }
          );
        } else {
          return callback("File type not supported.");
        }
      }
}