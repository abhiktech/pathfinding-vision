import {grid} from '../Grid';
import {diagonal} from '../Grid';
import {visitedNodes} from '../Grid';
import {finalPath} from '../Grid';

//Implementation of Djikstra's Algorithm

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

class Heap {
    constructor() {
        this.weight = [];
        this.node = [];
    }
    empty() {
        if(this.node.length === 0) {
            return true;
        }
        return false;
    }
    pushHeap(index, w) {
        this.node.push(index);
        this.weight.push(w);
        let i = this.node.length - 1, temp;
        while(i > 0 && this.weight[i] < this.weight[Math.floor((i - 1) / 2)]) {
            temp = this.weight[i];
            this.weight[i] = this.weight[Math.floor((i - 1) / 2)];
            this.weight[Math.floor((i - 1) / 2)] = temp;
            temp = this.node[i];
            this.node[i] = this.node[Math.floor((i - 1) / 2)];
            this.node[Math.floor((i - 1) / 2)] = temp;
            i = Math.floor((i - 1) / 2);
        }
    }
    popHeap() {
        let min = this.node[0];
        this.node[0] =this.node[this.node.length - 1];
        this.weight[0] = this.weight[this.weight.length - 1];
        this.node.pop();
        this.weight.pop();
        let i = 0, tempMin, temp, nextIndex;
        while(i * 2 + 1 < this.node.length) {
            if(i * 2 + 2 < this.node.length) {
                if(this.weight[i * 2 + 1] < this.weight[i * 2 + 2]) {
                    tempMin = this.weight[i * 2 + 1];
                    temp = this.node[i * 2 + 1];
                    nextIndex = i * 2 + 1;
                } else {
                    tempMin = this.weight[i * 2 + 2];
                    temp = this.node[i * 2 + 2];
                    nextIndex = i * 2 + 2;
                }
            } else {
                tempMin = this.weight[i * 2 + 1];
                temp = this.node[i * 2 + 1];
                nextIndex = i * 2 + 1;
            }
            if(tempMin < this.weight[i]) {
                this.weight[nextIndex] = this.weight[i];
                this.node[nextIndex] = this.node[i];
                this.weight[i] = tempMin;
                this.node[i] = temp;
                i = nextIndex;
            } else {
                break;
            }
        }
        return min;
    }
}

function djikstrasMain() {
    let i, j, s1, s2, e1, e2, t1, t2, num = 0;
    let weight = new Array(20);
    let prevBoard = new Array(20);
    let visited = new Array(20);
    for(i = 0; i < 20; ++i) {
        weight[i] = new Array(40);
        prevBoard[i] = new Array(40);
        visited[i] = new Array(40);
        for(j = 0; j < 40; ++j) {
            weight[i][j] = -1;
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
    weight[s1][s2] = 0;
    let obj = new Heap();
    obj.pushHeap(s1 * 40 + s2, 0);
    while(!obj.empty()) {
        let min = obj.popHeap();
        t1 = Math.trunc(min / 40);
        t2 = min % 40;
        if(visited[t1][t2]) {
            continue;
        }
        visited[t1][t2] = true;
        if(t1 === e1 && t2 === e2) {
            break;
        }
        if(num !== 0) {
            //colorGrid(num, t1, t2);
            visitedNodes.push(t1, t2);
         } //Up
        if(t1 > 0 && !visited[t1 - 1][t2] && (weight[t1][t2] + 1 < weight[t1 - 1][t2] || weight[t1 - 1][t2] === -1)) {
            weight[t1 - 1][t2] = weight[t1][t2] + 1;
            obj.pushHeap((t1 - 1) * 40 + t2, weight[t1 - 1][t2]);
            prevBoard[t1 - 1][t2] = new Box(t1, t2);
        } //Down
        if(t1 < 19 && !visited[t1 + 1][t2] && (weight[t1][t2] + 1 < weight[t1 + 1][t2] || weight[t1 + 1][t2] === -1)) {
            weight[t1 + 1][t2] = weight[t1][t2] + 1;
            obj.pushHeap((t1 + 1) * 40 + t2, weight[t1 + 1][t2]);
            prevBoard[t1 + 1][t2] = new Box(t1, t2);
        } //Left
        if(t2 > 0 && !visited[t1][t2 - 1] && (weight[t1][t2] + 1 < weight[t1][t2 - 1] || weight[t1][t2 - 1] === -1)) {
            weight[t1][t2 - 1] = weight[t1][t2] + 1;
            obj.pushHeap(t1 * 40 + (t2 - 1), weight[t1][t2 - 1]);
            prevBoard[t1][t2 - 1] = new Box(t1, t2);
        } //Right
        if(t2 < 39 && !visited[t1][t2 + 1] && (weight[t1][t2] + 1 < weight[t1][t2 + 1] || weight[t1][t2 + 1] === -1)) {
            weight[t1][t2 + 1] = weight[t1][t2] + 1;
            obj.pushHeap(t1 * 40 + (t2 + 1), weight[t1][t2 + 1]);
            prevBoard[t1][t2 + 1] = new Box(t1, t2);
        }
        if(diagonal) {
            if(t1 > 0 && t2 > 0 && !visited[t1 - 1][t2 - 1] && grid[t1 * 40 + t2 - 1] !== 'o' &&  grid[(t1 - 1) * 40 + t2] !== 'o' && (weight[t1][t2] + Math.sqrt(2) < weight[t1 - 1][t2 - 1] || weight[t1 - 1][t2 - 1] === -1)) {
                weight[t1 - 1][t2 - 1] = weight[t1][t2] + Math.sqrt(2);
                obj.pushHeap((t1 - 1) * 40 + (t2 - 1), weight[t1 - 1][t2 - 1]);
                prevBoard[t1 - 1][t2 - 1] = new Box(t1, t2);
            } 
            if(t1 > 0 && t2 < 39 && !visited[t1 - 1][t2 + 1] && grid[(t1 - 1) * 40 + t2] !== 'o' &&  grid[t1 * 40 + t2 + 1] !== 'o' && (weight[t1][t2] + Math.sqrt(2) < weight[t1 - 1][t2 + 1] || weight[t1 - 1][t2 + 1] === -1)) {
                weight[t1 - 1][t2 + 1] = weight[t1][t2] + Math.sqrt(2);
                obj.pushHeap((t1 - 1) * 40 + (t2 + 1), weight[t1 - 1][t2 + 1]);
                prevBoard[t1 - 1][t2 + 1] = new Box(t1, t2);
            } 
            if(t1 < 19 && t2 > 0 && !visited[t1 + 1][t2 - 1] && grid[(t1 + 1) * 40 + t2] !== 'o' &&  grid[t1 * 40 + t2 - 1] !== 'o' && (weight[t1][t2] + Math.sqrt(2) < weight[t1 + 1][t2 - 1] || weight[t1 + 1][t2 - 1] === -1)) {
                weight[t1 + 1][t2 - 1] = weight[t1][t2] + Math.sqrt(2);
                obj.pushHeap((t1 + 1) * 40 + (t2 - 1), weight[t1 + 1][t2 - 1]);
                prevBoard[t1 + 1][t2 - 1] = new Box(t1, t2);
            } 
            if(t1 < 19 && t2 < 39 && !visited[t1 + 1][t2 + 1] && grid[(t1 + 1) * 40 + t2] !== 'o' &&  grid[t1 * 40 + t2 + 1] !== 'o' && (weight[t1][t2] + Math.sqrt(2) < weight[t1 + 1][t2 + 1] || weight[t1 + 1][t2 + 1] === -1)) {
                weight[t1 + 1][t2 + 1] = weight[t1][t2] + 1;
                obj.pushHeap((t1 + 1) * 40 + (t2 + 1), weight[t1 + 1][t2 + 1]);
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

export {djikstrasMain}