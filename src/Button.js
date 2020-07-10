import React from 'react';
import 'c:/UMICH/Projects/path-finding/src/styles/button.css';
let algo;

//Buttons for solving algorithms and checkboxes for advanced features
class Button extends React.Component {
    render() {
        return (
        <div>
        <div className="header">
            <span className="title"><b>PathFinding Vision</b></span>
            <button className="findButton" onClick={ () => {
                algo = 1;
                this.props.onClick()}}>
                Breadth First Search
            </button>
            <button className="findButton" onClick={ () => {
                algo = 2;
                this.props.onClick()}}>
                Depth First Search
            </button>
            <button className="findButton" onClick={ () => {
                algo = 3;
                this.props.onClick()}}>
                Djikstra's
            </button>
            <button className="findButton" onClick={ () => {
                algo = 4;
                this.props.onClick()}}>
                Bellman-Ford
            </button>
            <button className="findButton" onClick={ () => {
                algo = 5;
                this.props.onClick()}}>
                A* Search
            </button>
            <button className="findButton" onClick={ () => this.props.onResetPath()}>
                Remove Path
            </button>
            <button className="findButton" onClick={ () => this.props.onReset()}>
                Reset Board
            </button>
            </div>
            <div className="check">
                <div><input type="checkbox" onClick={ () => this.props.onHover()}/> Enable obstacles upon hover</div>
                <div><input type="checkbox" onClick={ () => this.props.onDiagonal()}/> Enable diagonals in path</div>
                <div><input type="checkbox" onClick={ () => this.props.seeWorking()}/> See algorithm's working</div>
            </div>
        </div>
        );
    }
}

export {algo}
export default Button