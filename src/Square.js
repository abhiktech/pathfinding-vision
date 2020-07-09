import React from 'react';
import {hover} from './Grid';
import {solving} from './Grid';
import 'c:/UMICH/Projects/path-finding/src/styles/index.css';

let start = false;
let end = false;
let choose = true;
let solved = false;

//If the board has been reset
function resetStartEnd() {
    start = false;
    end = false;
    solved = false;
}

//If the board has been solved
function isSolved() {
    solved = true;
}

//Represents each individual square
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          id: this.props.id,
        };
      }
    render() {
        return (
            <button className="square"
             onClick={() => {
                 if(!solving) {
                    if(!this.props.value || this.props.value === 'p') {
                        choose = true;
                        if(!start) {
                            document.getElementsByClassName('square')[this.props.id].style = 'background-color: blue';
                            this.props.onClick();
                            start = true;
                        } else if(!end) {
                            document.getElementsByClassName('square')[this.props.id].style = 'background-color: green';
                            this.props.onClick();
                            end = true;
                        } else {
                            document.getElementsByClassName('square')[this.props.id].style = 'background-color: grey';
                            this.props.onClick();
                        }
                    } else {
                        if(this.props.value === 's') {
                            start = false;
                        } else if(this.props.value === 'e') {
                            end = false;
                        }
                        choose = false;
                        document.getElementsByClassName('square')[this.props.id].style = 'background-color: white';
                        this.props.onClick();
                    }
                }
                }}
                onMouseEnter={() => {
                    if(!solving) {
                        if(hover) {
                            if(start && end) {
                                if(this.props.value === 'o') {
                                    choose = false;
                                    document.getElementsByClassName('square')[this.props.id].style = 'background-color: white';
                                    this.props.onClick();
                                } else if(this.props.value !== 's' && this.props.value !== 'e'){
                                    choose = true;
                                    document.getElementsByClassName('square')[this.props.id].style = 'background-color: grey';
                                    this.props.onClick();
                                }
                            }
                        }
                    }
                }}
             >
            </button>
        );
    }
}
export default Square
export {start}
export {end}
export {choose}
export {resetStartEnd}
export {isSolved}
export {solved}
