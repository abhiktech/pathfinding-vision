import React from 'react';
import Grid from './Grid';
import Instructions from './Instructions';

//Defines app structure
class App extends React.Component {
  render() {
    return (
      <div>
        <Grid  />
        <Instructions />
      </div>
    );
  }
}

export default App;
