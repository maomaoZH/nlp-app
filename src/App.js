import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.processFile = this.processFile.bind(this);
    this.readFile = this.readFile.bind(this);
    this.state={
      file: null
    }
  }

  processFile() {
    const body = new FormData();

    body.append('file', this.state.file);

    fetch('/api/', {
      method: 'POST',
      body: body
    }).then((r) => {
      if (!r.ok) {
        console.log(r);
      }

      return r.json();
    }).then((r) => {

      const blob = new Blob([JSON.stringify(r)], {type : 'application/json'});
      const url = URL.createObjectURL(blob);

      this.setState({
        fileUrl: url
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  readFile(event) {
    this.setState({
      file: event.nativeEvent.target.files[0]
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Please upload your file</h2>
        </div>
        <div>
          <input type='file' onChange={this.readFile}/>
          <button type='button' onClick={this.processFile}> upload </button>
        </div>
         <div>
          <a href={this.state.fileUrl} download> download here </a>
        </div>
      </div>
    );
  }
}

export default App;
