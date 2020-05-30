import React, { Component } from 'react';
import "./Media.css"
class Media extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSource: null
    }
  }

  render() {
    // Tells React what HTML code to render
    return (
      <div class="row">
        <div class="col s12 m7">
          <div class="card">
            <div class="card-image">

              <img width="400" height="400" src="https://media2.giphy.com/media/9rtpurjbqiqZXbBBet/giphy.gif?cid=ecf05e478d6128cf36c3102763fd4bdf294f0584a878efbf&rid=giphy.gif" />

            </div>
            <div class="card-content">
              <p>This is a dog</p>
            </div>
            <div class="card-action">
              <a href="#">Vote</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Media
