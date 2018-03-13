// 1. Create a github Repo or Click 'Fork' from the top menu and generate your own JSFiddle link.
// Be sure to click 'Update' when your work is done.

// 2. Create a Search Component for the Github Username

// 3. On Search, make an api call to Github API to fetch the information about the user
// API URL: https://api.github.com/users/{username}

// 4. Create a component User Badge which presents the following about the user
// User Profile Image, Name, Number of Followers, Number of people Following

// 5. Make an api call to get all the repositories for the user
// API URL: https://api.github.com/users/{username}/repos

// 6. Create a Repo List component which will present cards having Repository details.
// Following details should be part of each repository card
// Name, Description, Git URL, Number of Stars, Forks Count, Number of Open Issues, Repository Size

// 7. Style the page to the best of the ability to make the UI look clean and presentable

// 8. Click Update from the top Menu and save the link

class Hello extends React.Component {
  render() {
  	const { name } = this.props;
    return (
      <div>
        Hello {name}!!
      </div>
    );
  }
}

ReactDOM.render(
  <Hello name="World"/>,
  document.getElementById('container')
);
