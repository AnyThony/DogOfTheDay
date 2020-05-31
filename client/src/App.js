import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Media from './components/Media'
import NavBar from './components/NavBar'

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      userCanVote: false,
      currentVote: null
    }
    this.onVote = this.onVote.bind(this);
  }

  checkForVotes(){ // Checks if user has already made a vote earlier
    // TODO: replace window origin with something better to get hostname
    var _asyncRequest = fetch(window.location.origin + '/api/vote').then(
      externalData => {
        _asyncRequest = null;
        externalData.json().then(parsedData => {
          var votedFor = ""
          if (parsedData.data.length > 0){
            votedFor = parsedData.data[0].media_id
          }
          this.setState({
            userCanVote: parsedData.data.length == 0,
            currentVote: votedFor
          });
        })
      }
    );
  }

  onVote(canVote, votedFor){
    this.setState({
      userCanVote: canVote,
      currentVote: votedFor
    })
  }

  componentWillMount() {
    this.setState({
      data: []
    })
    // TODO: replace window origin with something better to get hostname
    this._asyncRequest = fetch(window.location.origin + 'http://localhost/api/getMedia').then(
      externalData => {
        this._asyncRequest = null;
        externalData.json().then(parsedData => {
          this.setState({data: parsedData});
          this.checkForVotes();
          console.log(`fetched ${parsedData.length} cells`)
        })
      }
    );
  }


  retrieveCellViews() {
    console.log("cell", this.state.data)
    let cells = this.state.data.map(data => 
      (
          <Media
            imageSource={data.img_source}
            id={data._id}
            votes={data.votes}
            disableVoting={this.state.userCanVote == false}
            enableUnvote={this.state.currentVote == data._id}
            onVote={this.onVote}
          />
      )
    )
    console.log("element cells", cells)
    return cells;
  }

  render() {
    return (
      <div id="app">
        <NavBar />
        <div id="feed-container">

            {this.retrieveCellViews()}

        </div>
      </div>
    );
  }
}

export default App;
