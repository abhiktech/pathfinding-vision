import React from 'react';
import 'c:/UMICH/Projects/path-finding/src/styles/legend.css';

//Represents the legend
class Legend extends React.Component {
    render() {
        return (
            <div className="legend">
                <div className="bluebox"></div><div className="t1">Starting Node</div>
                <div className="greenbox"></div><div className="t2">Ending Node</div>
                <div className="greybox"></div><div className="t3">Obstacle Node</div>
                <div className="yellowbox"></div><div className="t4">Path Node</div>
                <div className="vbox1"></div><div className="vbox2"></div><div className="vbox3"></div><div className="vbox4"></div><div className="t5">Visited Node</div>
                <div className="whitebox"></div><div className="t6">Unvisited Node</div>
            </div>
        );
    }
}

export default Legend