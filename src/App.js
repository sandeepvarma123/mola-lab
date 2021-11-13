import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import TweetExtract from "./components/TweetExtract";


function App() {
  return (
    <React.Fragment>
      <div className="App-header">
        <h1>Morality and Language Lab (MOLA)</h1>
      </div>
      <div>
        <TweetExtract />
      </div>
    </React.Fragment>
  );   
}

export default App;
