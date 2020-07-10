import React from 'react';
import Square from './Square';
import Button from './Button';
import Legend from './Legend';
import {start} from './Square';
import {end} from './Square';
import {choose} from './Square';
import {resetStartEnd} from './Square';
import {isSolved} from './Square';
import {algo} from './Button';
import {depthFirstMain} from './SolvingAlgorithms/DepthFirst'
import {breadthFirstMain} from './SolvingAlgorithms/BreadthFirst'
import {djikstrasMain} from './SolvingAlgorithms/Djikstras';
import {bellmanFordMain} from './SolvingAlgorithms/BellmanFord';
import {aStarMain} from './SolvingAlgorithms/AStar';
import 'c:/UMICH/Projects/path-finding/src/styles/index.css';

let grid;
let visitedNodes;
let finalPath;
let hover = false; 
let diagonal = false;
let working = false;
let solving = false;

//Colors the solved grid
function colorGrid(i) {
  if(i < 400) {
    document.getElementsByClassName('square')[visitedNodes[i] * 40 + visitedNodes[i + 1]].style = 'background-color: #FF9AA2';
  } else if(i < 800) {
    document.getElementsByClassName('square')[visitedNodes[i] * 40 + visitedNodes[i + 1]].style = 'background-color: #FFB7B2';
  } else if(i < 1200) {
  document.getElementsByClassName('square')[visitedNodes[i] * 40 + visitedNodes[i + 1]].style = 'background-color: #FFDAC1';
  } else  {
    document.getElementsByClassName('square')[visitedNodes[i] * 40 + visitedNodes[i + 1]].style = 'background-color: #E2F0CB';
  }
}

//Represents the playing board/grid
class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(800).fill(null),
    };
  }

  //Handles call back event when a square is clicked
  handleClick(i) { 
    const squares = this.state.squares.slice();
    if(choose) {
      if(!start) {
        squares[i] = 's';
      } else if(!end) {
        squares[i] = 'e';
      } else {
        squares[i] = 'o';
      }
    } else {
      squares[i] = null;
    }    
    this.setState({squares: squares});
  }

  //Handles callback event when changes are made to the hovering functionality
  handleHoverChanged() {
    if(!hover) {
      hover = true;
    } else {
      hover = false;
    }
  }

  //Handles callback event when the board is reset
  handleReset() {
    if(!solving) {
      resetStartEnd();
      grid = Array(800).fill(null);
      this.setState({squares: grid});
      for(let i = 0; i < 800; ++i) {
          document.getElementsByClassName('square')[i].style = 'background-color: white';
      }
    }
  }

  //Handles callback event when the path is removed
  handleResetPath() {
    if(!solving) {
      for(let i = 0; i < 800; ++i) {
        if(this.state.squares[i] !== 's' && this.state.squares[i] !== 'e' && this.state.squares[i] !== 'o'){
          document.getElementsByClassName('square')[i].style = 'background-color: white';
        }
      }
    }
  }

  //Handles callback event when diagonals are enabled in the final path
  diagonalsEnabled() {
    if(!diagonal) {
      diagonal = true;
    } else {
      diagonal = false;
    }
  }

  //Handles callback event when changes are made to whether user wishes to see the algorithm's step-by-step working
  enableAlgorithmWorking() {
    if(!working) {
        working = true;
    } else {
      working = false;
    }
  }

  //Handles callback event when the solve button is clicked
  handleSolve() { 
    if(!solving) {
    solving = true;
    grid = this.state.squares;
    for(let i = 0; i < 800; ++i) {
      if(grid[i] === 'p') {
        grid[i] = null;
      }
      if(!grid[i]) {
        document.getElementsByClassName('square')[i].style = 'background-color: white';
      }
    }
    visitedNodes = [];
    finalPath = [];
    //Deals with invalid grid
    if(!(start && end)) {
      this.setState({squares: grid});
      alert('You must choose a start and an end!');
      return;
    }
    let solvable;
    if(algo === 1) {
      solvable = breadthFirstMain();
    } else if(algo === 2) {
      solvable = depthFirstMain();
    } else if(algo === 3){
      solvable = djikstrasMain();
    } else if(algo === 4){
      solvable = bellmanFordMain();
    } else {
      solvable = aStarMain();
    }
      let i = 0;
      //Displaying the result
      if(working) {
        let handle = setInterval(function() {
          if(visitedNodes.length !== 0) {
            colorGrid(i);
          }
          i = i + 2;
          if(i >= visitedNodes.length) {
            clearInterval(handle);
            if(solvable) {
              for(let i = finalPath.length - 1; i >= 0; i = i - 2) {
                document.getElementsByClassName('square')[finalPath[i - 1] * 40 + finalPath[i]].style = 'background-color: yellow';
              }
            } else {
              alert('No path found!');
            }
            solving = false;
          }
        }, 10);
      } else {
        if(solvable) {
          for(let i = finalPath.length - 1; i >= 0; i = i - 2) {
            document.getElementsByClassName('square')[finalPath[i - 1] * 40 + finalPath[i]].style = 'background-color: yellow';
          }
        } else {
          alert('No path found!');
        }
        solving = false;
      }
    isSolved();
    }
  }

  //Renders each individual square
  renderSquare(i) { 
    return (
      <div>
         <Square id={i} 
         value={this.state.squares[i]}
         onClick={() => this.handleClick(i)}
         />
      </div>
      );
  }
  //Renders squares of each row
  renderRow(r) {
    return (
      <div>
        {this.renderSquare(r)}
        {this.renderSquare(r + 1)}
        {this.renderSquare(r + 2)}
        {this.renderSquare(r + 3)}
        {this.renderSquare(r + 4)}
        {this.renderSquare(r + 5)}
        {this.renderSquare(r + 6)}
        {this.renderSquare(r + 7)}
        {this.renderSquare(r + 8)}
        {this.renderSquare(r + 9)}
        {this.renderSquare(r + 10)}
        {this.renderSquare(r + 11)}
        {this.renderSquare(r + 12)}
        {this.renderSquare(r + 13)}
        {this.renderSquare(r + 14)}
        {this.renderSquare(r + 15)}
        {this.renderSquare(r + 16)}
        {this.renderSquare(r + 17)}
        {this.renderSquare(r + 18)}
        {this.renderSquare(r + 19)}
        {this.renderSquare(r + 20)}
        {this.renderSquare(r + 21)}
        {this.renderSquare(r + 22)}
        {this.renderSquare(r + 23)}
        {this.renderSquare(r + 24)}
        {this.renderSquare(r + 25)}
        {this.renderSquare(r + 26)}
        {this.renderSquare(r + 27)}
        {this.renderSquare(r + 28)}
        {this.renderSquare(r + 29)}
        {this.renderSquare(r + 30)}
        {this.renderSquare(r + 31)}
        {this.renderSquare(r + 32)}
        {this.renderSquare(r + 33)}
        {this.renderSquare(r + 34)}
        {this.renderSquare(r + 35)}
        {this.renderSquare(r + 36)}
        {this.renderSquare(r + 37)}
        {this.renderSquare(r + 38)}
        {this.renderSquare(r + 39)}
      </div>
    )
  }

   //Renders the grid
  render() {
    return (
      <div>
        <Button 
        onClick={() => this.handleSolve()}
        onReset={() => this.handleReset()}
        onHover={() => this.handleHoverChanged()}
        onDiagonal={() => this.diagonalsEnabled()}
        seeWorking={() => this.enableAlgorithmWorking()}
        onResetPath={() => this.handleResetPath()} />
        <Legend />
        <div className="board">
          <div className="board-row">
            {this.renderRow(0)}
          </div>
          <div className="board-row">
            {this.renderRow(40)}
          </div>
          <div className="board-row">
            {this.renderRow(80)}
          </div>
          <div className="board-row">
            {this.renderRow(120)}
          </div>
          <div className="board-row">
            {this.renderRow(160)}
          </div>
          <div className="board-row">
            {this.renderRow(200)}
          </div>
          <div className="board-row">
            {this.renderRow(240)}
          </div>
          <div className="board-row">
            {this.renderRow(280)}
          </div>
          <div className="board-row">
            {this.renderRow(320)}
          </div>
          <div className="board-row">
            {this.renderRow(360)}
          </div>
          <div className="board-row">
            {this.renderRow(400)}
          </div>
          <div className="board-row">
            {this.renderRow(440)}
          </div>
          <div className="board-row">
            {this.renderRow(480)}
          </div>
          <div className="board-row">
            {this.renderRow(520)}
          </div>
          <div className="board-row">
            {this.renderRow(560)}
          </div>
          <div className="board-row">
            {this.renderRow(600)}
          </div>
          <div className="board-row">
            {this.renderRow(640)}
          </div>
          <div className="board-row">
            {this.renderRow(680)}
          </div>
          <div className="board-row">
            {this.renderRow(720)}
          </div>
          <div className="board-row">
            {this.renderRow(760)}
          </div>
        </div>
      </div>
    );
  }
}

export default Grid
export {grid}
export {visitedNodes}
export {finalPath}
export {hover}
export {diagonal}
export {working}
export {solving}