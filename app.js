class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      error: false,
      results: false,
      repositories: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.completeSearch = this.completeSearch.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  completeSearch(event) {
   event.preventDefault();

   const that = this;
   const username = this.state.username;

   axios.all([
    axios.get(`https://api.github.com/users/${username}`),
    axios.get(`https://api.github.com/users/${username}/repos`)
  ])
  .then(axios.spread(function (userResponse, repoResponse) {
    console.log('xxxxxx', userResponse);
    that.setState({repositories: repoResponse.data, error:false});
    that.setState({results: userResponse.data, error:false});
  }))
  .catch((error) => {
      console.log('xxxxx', error);
      this.setState({error: true});
  });
 }

  render() {
    const showResults = (this.state.results && !this.state.error);
    return (
      <div className="user">
        <div className="user-inner">
          <div className="user-search">
            <form onSubmit={this.completeSearch}>
               <h2> Search GitHub User </h2>
               <input type="text" value={this.state.value} onChange={this.handleChange} />
               <input type="submit" value="Submit" />
             </form>
           </div>
           {showResults &&
             <div>
             <div className="user-result">
               <div className="user-result__avatar">
                  <img src={this.state.results.avatar_url} />
              </div>
              <div className="user-result__details">
                   <p> {this.state.results.name}</p>
                   <p> Followers {this.state.results.followers} </p>
                   <p> Following {this.state.results.following} </p>
               </div>
             </div>

              {this.state.repositories &&
                <div>
                  <h1> Repos {this.state.repositories.length} </h1>
                  <table className="table">
                    <thead>
                      <td> Name </td>
                      <td className="repo-description"> Description </td>
                      <td> Stars </td>
                      <td> Forks </td>
                      <td> Issues </td>
                      <td> Size </td>
                    </thead>
                  {this.state.repositories.map((repo, index) => (
                      <tr>
                        <td> <a href={`"${repo.html_url}"`} > {repo.name} </a> </td>
                        <td className="repo-description"> {repo.description} </td>
                        <td> {repo.stargazers_count} </td>
                        <td> {repo.forks_count} </td>
                        <td> {repo.open_issues_count} </td>
                        <td> {repo.size} </td>
                      </tr>
                   ))}

                  </table>
                </div>
              }

              {this.state.error &&
                <p> Error retrieving User </p>
              }
            </div>
           }
      </div>
    </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('container')
);
