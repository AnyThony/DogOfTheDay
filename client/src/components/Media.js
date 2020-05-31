import React, { Component } from 'react';
import "./Media.css"
/*
* This component contains the media content for each daily doggo
* Handles voting action and displaying number of votes
*/
class Media extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSource: null,
      numVotes: null,
      mediaId: null
    }
  }

  async doVote(){
    // TODO: replace window origin with something better to get hostname
    const rawResponse = await fetch(window.location.origin + '/api/vote', {
      method: this.props.enableUnvote ? 'delete' : 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'media_id': this.state.mediaId
      })
    });
    const response = await rawResponse.json();

    if (response.success){
      this.setState({
        numVotes: this.state.numVotes + (this.props.enableUnvote ? -1 : 1)
      })
      var votedFor = this.props.enableUnvote ? null : this.state.mediaId;
      this.props.onVote(this.props.enableUnvote, votedFor);
    }
    else {
      //TODO: notify err
    }
  }

  componentDidMount() {
    this.setState({
      imageSource: this.props.imageSource,
      numVotes: this.props.votes,
      mediaId: this.props.id
    })
  }

  render() {
    // Tells React what HTML code to render
    return (
      <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">

              <img width="400" height="400" src={this.state.imageSource} />

            </div>
            <div class="card-content">
              <p>{`${this.state.numVotes} ${this.state.numVotes == 1 ? "vote" : "votes"}`}</p>
            </div>
            <div class="card-action">
              <a class={`waves-effect waves-light btn-small 
              ${this.props.disableVoting && !this.props.enableUnvote ? "disabled" : ""}`} 
              onClick={() => this.doVote()}>
                <span>{this.props.enableUnvote ? "UNVOTE" : "VOTE"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Media
