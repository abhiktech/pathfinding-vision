import React from 'react';
import 'c:/UMICH/Projects/path-finding/src/styles/instructions.css';

//Intructions part
class Instructions extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      isActive: true,
    }
  }

  hideInstructions() {
    this.setState({
      isActive: false,
    });
  }

  render() {
    if (this.state.isActive) {
      return (
          <div className="alert alert-warning alert-dismissible" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.hideInstructions()}>
              <span aria-hidden="true">&times;</span>
            </button>
            <h2>Instructions : </h2>
            <h6>Welcome to <b>PathFinding Vision</b>, developed by <b>Abhik Mazumder</b>! Let's dive right into this project.</h6>
            <p>This project allows you to visualize a path between two nodes on a board of your choice.</p>
            <div>
                <ol>
                <li>The first node you click on will be the starting point.</li>
                <li>The second node you click on will be the ending point.</li>
                <li>The nodes you click on afterwards will be the obstacles.</li>
                <li>You may reposition a node by clicking on it and then clicking on an unvisited node.</li>
                <li>Solve the current grid using any of the five algorithms : <b>Breadth First Search, Depth First Search, Djikstra's Algorithm, Bellman-Ford Algorithm, or A* Search Algorithm.</b></li>
                <li>You may clear the current path or the current board after solving.</li>
                <li>Advanced features (recommended) include: <ul><li>Enabling obstacles upon hovering over the nodes.</li>
                                                <li>Enabling diagonals in the calculated path.</li>
                                                <li>Seeing the algorithm's step-by-step working.</li>
                                                </ul>
                You may use any of the these features by marking the checkboxes on the top right corner.</li>
                </ol>
            </div>
            <p>You can even check out the source code on <a href="https://github.com/abhiktech/pathfinding-vision" target ="_blank">github</a>.</p>
            <h4>Let's start envisioning!</h4>
          </div>
      );
    }
    return <div/>
  }
}

export default Instructions;