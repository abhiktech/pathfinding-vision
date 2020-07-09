import {grid} from '../Grid';
import {diagonal} from '../Grid';
import {visitedNodes} from '../Grid';
import {finalPath} from '../Grid';

//Implementation of Depth First Search Algorithm

class Box {
    constructor(r, c) {
        this.prevRow = r;
        this.prevCol = c;
    }
    getRow() {
        return this.prevRow;
    }
    getCol() {
        return this.prevCol;
    }
}

function depthFirstMain() {
    let i, j, s1, s2, e1, e2, t1, t2, num = 0;
    let nodesToVisit = new Array(); //Represents the vertices in the stack
    let visited = new Array(20); //Represents whether a node has been visited or not
    let prevBoard = new Array(20); //Stores data of the previous node
    for(i = 0; i < 20; ++i) {
        visited[i] = new Array(40);
        prevBoard[i] = new Array(40);
        for(j = 0; j < 40; ++j) {
            visited[i][j] = false;
            if(grid[i * 40 + j] === 's') {
                s1 = i;
                s2 = j;
            }
            if(grid[i * 40 + j] === 'e') {
                e1 = i;
                e2 = j;
            }
            if(grid[i * 40 + j] === 'o') {
                visited[i][j] = true;
            }
        }
    }
    nodesToVisit.push(s1);
    nodesToVisit.push(s2);
    visited[s1][s2] = true;
    while(nodesToVisit.length !== 0) {
        t2 = nodesToVisit[nodesToVisit.length - 1];
        t1 = nodesToVisit[nodesToVisit.length - 2];
        nodesToVisit.pop();
        nodesToVisit.pop();
        if(t1 === e1 && t2 === e2) {
            break;
        }
        if(num !== 0) {
            visitedNodes.push(t1, t2);
         }
         if(diagonal) {
            if(t1 > 0 && t2 > 0 && !visited[t1 - 1][t2 - 1] && grid[t1 * 40 + t2 - 1] !== 'o' &&  grid[(t1 - 1) * 40 + t2] !== 'o') { // Top Left Diagonal
                visited[t1 - 1][t2 - 1] = true;
                nodesToVisit.push(t1 - 1);
                nodesToVisit.push(t2 - 1);
                prevBoard[t1 - 1][t2 - 1] = new Box(t1, t2);
            }
            if(t1 > 0 && t2 < 39 && !visited[t1 - 1][t2 + 1] && grid[(t1 - 1) * 40 + t2] !== 'o' &&  grid[t1 * 40 + t2 + 1] !== 'o') { // Top Right Diagonal
                visited[t1 - 1][t2 + 1] = true;
                nodesToVisit.push(t1 - 1);
                nodesToVisit.push(t2 + 1);
                prevBoard[t1 - 1][t2 + 1] = new Box(t1, t2);
            }
            if(t1 < 19 && t2 > 0 && !visited[t1 + 1][t2 - 1] && grid[(t1 + 1) * 40 + t2] !== 'o' &&  grid[t1 * 40 + t2 - 1] !== 'o') { // Bottom Left Diagonal
                visited[t1 + 1][t2 - 1] = true;
                nodesToVisit.push(t1 + 1);
                nodesToVisit.push(t2 - 1);
                prevBoard[t1 + 1][t2 - 1] = new Box(t1, t2);
            }
            if(t1 < 19 && t2 < 39 && !visited[t1 + 1][t2 + 1] && grid[(t1 + 1) * 40 + t2] !== 'o' &&  grid[t1 * 40 + t2 + 1] !== 'o') { // Bottom Right Diagonal
                visited[t1 + 1][t2 + 1] = true;
                nodesToVisit.push(t1 + 1);
                nodesToVisit.push(t2 + 1);
                prevBoard[t1 + 1][t2 + 1] = new Box(t1, t2);
            }
        }
        if(t1 > 0 && !visited[t1 - 1][t2]) {
            visited[t1 - 1][t2] = true;
            nodesToVisit.push(t1 - 1);
            nodesToVisit.push(t2);
            prevBoard[t1 - 1][t2] = new Box(t1, t2);
        }
        if(t1 < 19 && !visited[t1 + 1][t2]) {
            visited[t1 + 1][t2] = true;
            nodesToVisit.push(t1 + 1);
            nodesToVisit.push(t2);
            prevBoard[t1 + 1][t2] = new Box(t1, t2);
        }
        if(t2 > 0 && !visited[t1][t2 - 1]) {
            visited[t1][t2 - 1] = true;
            nodesToVisit.push(t1);
            nodesToVisit.push(t2 - 1);
            prevBoard[t1][t2 - 1] = new Box(t1, t2);
        }
        if(t2 < 39 && !visited[t1][t2 + 1]) {
            visited[t1][t2 + 1] = true;
            nodesToVisit.push(t1);
            nodesToVisit.push(t2 + 1);
            prevBoard[t1][t2 + 1] = new Box(t1, t2);
        }
        ++num;
    }
    i = e1;
    j = e2;
    if(!visited[e1][e2]) {
        return false;
    }
    while(prevBoard[i][j].getRow() !== s1 || prevBoard[i][j].getCol() !== s2) {
        grid[prevBoard[i][j].getRow() * 40 + prevBoard[i][j].getCol()] = 'p';
        finalPath.push(prevBoard[i][j].getRow());
        finalPath.push(prevBoard[i][j].getCol());
        let temp1 = i;
        i = prevBoard[i][j].getRow();
        j = prevBoard[temp1][j].getCol();
    }
    return true;
}

export {depthFirstMain}