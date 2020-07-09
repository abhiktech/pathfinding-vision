import {grid} from '../Grid';
import {diagonal} from '../Grid';
import {visitedNodes} from '../Grid';
import {finalPath} from '../Grid';

//Implementation of Bellman-Ford Algorithm

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

function bellmanFordMain() {
    let i, j, k, s1, s2, e1, e2;
    let update = false;
    let prevBoard = new Array(20);
    let weight = new Array(20);
    for(i = 0; i < 20; ++i) {
        prevBoard[i] = new Array(40);
        weight[i] = new Array(40);
        for(j = 0; j < 40; ++j) {
            weight[i][j] = -1;
            if(grid[i * 40 + j] === 's') {
                s1 = i;
                s2 = j;
            }
            if(grid[i * 40 + j] === 'e') {
                e1 = i;
                e2 = j;
            }
        }
    }
    weight[s1][s2] = 0;
    for(k = 0; k < 799; ++k) {
        for(i = 0; i < 20; ++i) {
            for(j = 0; j < 40; ++j) {
                if(grid[i * 40 + j] !== 'o' && weight[i][j] !== -1) {
                    if(i > 0 && grid[(i - 1) * 40 + j] !== 'o' && (weight[i - 1][j]  === -1 || weight[i][j] + 1 < weight[i - 1][j])) {
                        if(i - 1 !== e1 || j !== e2) {
                            visitedNodes.push(i - 1, j);
                        }
                        weight[i - 1][j] = weight[i][j] + 1;
                        prevBoard[i - 1][j] = new Box(i, j);
                        update = true;
                    }
                    if(i < 19 && grid[(i + 1) * 40 + j] !== 'o' && (weight[i + 1][j]  === -1 || weight[i][j] + 1 < weight[i + 1][j])) {
                        if(i + 1 !== e1 || j !== e2) {
                            visitedNodes.push(i + 1, j);
                        }
                        weight[i + 1][j] = weight[i][j] + 1;
                        prevBoard[i + 1][j] = new Box(i, j);
                        update = true;
                    }
                    if(j > 0 && grid[i * 40 + (j - 1)] !== 'o' && (weight[i][j - 1]  === -1 || weight[i][j] + 1 < weight[i][j - 1])) {
                        if(i !== e1 || j - 1 !== e2) {
                            visitedNodes.push(i, j - 1);
                        }
                        weight[i][j - 1] = weight[i][j] + 1;
                        prevBoard[i][j - 1] = new Box(i, j);
                        update = true;
                    }
                    if(j < 39 && grid[i * 40 + (j + 1)] !== 'o' && (weight[i][j + 1]  === -1 || weight[i][j] + 1 < weight[i][j + 1])) {
                        if(i !== e1 || j + 1 !== e2) {
                            visitedNodes.push(i, j + 1);
                        }
                        weight[i][j + 1] = weight[i][j] + 1;
                        prevBoard[i][j + 1] = new Box(i, j);
                        update = true;
                    }
                    if(diagonal) {
                        if(i > 0 && j > 0 && grid[(i - 1) * 40 + (j - 1)] !== 'o' && grid[(i - 1) * 40 + j] !== 'o' && grid[i * 40 + (j - 1)] !== 'o' && (weight[i - 1][j - 1]  === -1 || weight[i][j] + Math.sqrt(2) < weight[i - 1][j - 1])) {
                            if(i - 1 !== e1 || j - 1 !== e2) {
                                visitedNodes.push(i - 1, j - 1);
                            }
                            weight[i - 1][j - 1] = weight[i][j] + Math.sqrt(2);
                            prevBoard[i - 1][j - 1] = new Box(i, j);
                            update = true;
                        }
                        if(i > 0 && j < 39 && grid[(i - 1) * 40 + (j + 1)] !== 'o' && grid[(i - 1) * 40 + j] !== 'o' && grid[i * 40 + (j + 1)]  !== 'o' && (weight[i - 1][j + 1]  === -1 || weight[i][j] + Math.sqrt(2) < weight[i - 1][j + 1])) {
                            if(i - 1 !== e1 || j + 1 !== e2) {
                                visitedNodes.push(i - 1, j + 1);
                            }
                            weight[i - 1][j + 1] = weight[i][j] + Math.sqrt(2);
                            prevBoard[i - 1][j + 1] = new Box(i, j);
                            update = true;
                        }
                        if(i < 19 && j > 0 && grid[(i + 1) * 40 + (j - 1)] !== 'o' && grid[(i + 1) * 40 + j] !== 'o' && grid[i * 40 + (j - 1)] !== 'o' && (weight[i + 1][j - 1]  === -1 || weight[i][j] + Math.sqrt(2) < weight[i + 1][j - 1])) {
                            if(i + 1 !== e1 || j - 1 !== e2) {
                                visitedNodes.push(i + 1, j - 1);
                            }
                            weight[i + 1][j - 1] = weight[i][j] + Math.sqrt(2);
                            prevBoard[i + 1][j - 1] = new Box(i, j);
                            update = true;
                        }
                        if(i < 19 && j < 39 && grid[(i + 1) * 40 + (j + 1)] !== 'o' && grid[(i + 1) * 40 + j] !== 'o' && grid[i * 40 + (j + 1)] !== 'o' && (weight[i + 1][j + 1]  === -1 || weight[i][j] + Math.sqrt(2) < weight[i + 1][j + 1])) {
                            if(i + 1 !== e1 || j + 1 !== e2) {
                                visitedNodes.push(i + 1, j + 1);
                            }
                            weight[i + 1][j + 1] = weight[i][j] + Math.sqrt(2);
                            prevBoard[i + 1][j + 1] = new Box(i, j);
                            update = true;
                        }
                    }
                }
            }
        }
        if(update) {
            update = false;
        } else {
            break;
        }
    }
    i = e1;
    j = e2;
    if(weight[e1][e2] === -1) {
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

export {bellmanFordMain}