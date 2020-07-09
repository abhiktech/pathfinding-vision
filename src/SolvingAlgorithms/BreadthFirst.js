import {grid} from '../Grid';
import {diagonal} from '../Grid';
import {visitedNodes} from '../Grid';
import {finalPath} from '../Grid';

//Implementation of Breadth First Search Algorithm

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

function breadthFirstMain() {
    let i, j, s1, s2, e1, e2, t1, t2, num = 0;
    let visited = new Array(20);
    let prevBoard = new Array(20);
    let level = new Array();
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
    level.push(s1);
    level.push(s2);
    visited[s1][s2] = true;
    while(level.length !== 0) {
        t1 = level[0];
        t2 = level[1];
        level.shift();
        level.shift();
        if(t1 === e1 && t2 === e2) {
            break;
        }
        if(num !== 0) {
           visitedNodes.push(t1, t2);
        }
        if(t1 > 0 && !visited[t1 - 1][t2]) { // Up
            visited[t1 - 1][t2] = true;
            level.push(t1 - 1);
            level.push(t2);
            prevBoard[t1 - 1][t2] = new Box(t1, t2);
        }
        if(t1 < 19 && !visited[t1 + 1][t2]) { // Down
            visited[t1 + 1][t2] = true;
            level.push(t1 + 1);
            level.push(t2);
            prevBoard[t1 + 1][t2] = new Box(t1, t2);
        }
        if(t2 > 0 && !visited[t1][t2 - 1]) { // Left
            visited[t1][t2 - 1] = true;
            level.push(t1);
            level.push(t2 - 1);
            prevBoard[t1][t2 - 1] = new Box(t1, t2);
        }
        if(t2 < 39 && !visited[t1][t2 + 1]) { // Right
            visited[t1][t2 + 1] = true;
            level.push(t1);
            level.push(t2 + 1);
            prevBoard[t1][t2 + 1] = new Box(t1, t2);
        }
        if(diagonal) {
            if(t1 > 0 && t2 > 0 && !visited[t1 - 1][t2 - 1] && grid[t1 * 40 + t2 - 1] !== 'o' &&  grid[(t1 - 1) * 40 + t2] !== 'o') { // Top Left Diagonal
                visited[t1 - 1][t2 - 1] = true;
                level.push(t1 - 1);
                level.push(t2 - 1);
                prevBoard[t1 - 1][t2 - 1] = new Box(t1, t2);
            }
            if(t1 > 0 && t2 < 39 && !visited[t1 - 1][t2 + 1] && grid[(t1 - 1) * 40 + t2] !== 'o' &&  grid[t1 * 40 + t2 + 1] !== 'o') { // Top Right Diagonal
                visited[t1 - 1][t2 + 1] = true;
                level.push(t1 - 1);
                level.push(t2 + 1);
                prevBoard[t1 - 1][t2 + 1] = new Box(t1, t2);
            }
            if(t1 < 19 && t2 > 0 && !visited[t1 + 1][t2 - 1] && grid[(t1 + 1) * 40 + t2] !== 'o' &&  grid[t1 * 40 + t2 - 1] !== 'o') { // Bottom Left Diagonal
                visited[t1 + 1][t2 - 1] = true;
                level.push(t1 + 1);
                level.push(t2 - 1);
                prevBoard[t1 + 1][t2 - 1] = new Box(t1, t2);
            }
            if(t1 < 19 && t2 < 39 && !visited[t1 + 1][t2 + 1] && grid[(t1 + 1) * 40 + t2] !== 'o' &&  grid[t1 * 40 + t2 + 1] !== 'o') { // Bottom Right Diagonal
                visited[t1 + 1][t2 + 1] = true;
                level.push(t1 + 1);
                level.push(t2 + 1);
                prevBoard[t1 + 1][t2 + 1] = new Box(t1, t2);
            }
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

export {breadthFirstMain}
