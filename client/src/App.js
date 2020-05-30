import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Media from './components/Media'
import NavBar from './components/NavBar'

class App extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount() {
    this.setState({
      data: []
    })
    this._asyncRequest = fetch(`http://localhost/api/getMedia`).then(
      externalData => {
        this._asyncRequest = null;
        externalData.json().then(parsedData => {
          this.setState({data: parsedData});
          console.log(`fetched ${parsedData.length} cells`)
        })
      }
    );
  }


  retrieveCellViews() {
    console.log("cell", this.state.data)
    let cells = this.state.data.map(data => 
      (
        <div class="col s3">
          <Media
            imageSource={data.img_source}
            id={data._id}
            votes={data.votes}
          />
        </div>
      )
    )
    console.log("element cells", cells)
    return (
    <div class="row">
      {cells}
    </div>);
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
