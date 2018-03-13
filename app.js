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

    that.setState({repositories: repoResponse.data});
    that.setState({results: userResponse.data});

    console.log(repoResponse.data);
  }))
  .catch(function (error) {
      console.log(error);
  });
 }

 completeRepoSeach() {

 }

  render() {
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
           {this.state.results &&
             <div>
             <div className="user-result">
               <div className="user-result__avatar">
                  <img src={this.state.results.avatar_url} />
              </div>
              <div className="user-result__details">
                   <p> {this.state.results.name}</p>
                   <p> Followers {this.state.results.followers}</p>
                   <p> Following {this.state.results.following}</p>
               </div>
             </div>

              {this.state.repositories &&
                <div>
                  <h1> Repos {this.state.repositories.length} </h1>
                  {this.state.repositories.forEach(function(repo) {
                    <p> Here  </p>
                   })
                  }
                </div>
              }
            </div>
           }
      </div>
    </div>
    );
  }
}

ReactDOM.render(
  <Search name="World"/>,
  document.getElementById('container')
);
