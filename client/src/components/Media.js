import React, { Component } from 'react';
import "./Media.css"
/*
* This component contains the media content for each daily dogo
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
              <p>{this.state.numVotes} votes</p>
            </div>
            <div class="card-action">
              <a class="waves-effect waves-light btn-small">
                <span>VOTE</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Media
